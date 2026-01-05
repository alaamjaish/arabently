# TestSprite MCP Test Report — Arabently

## 1) Document metadata
- **Project**: Arabently
- **Date**: 2026-01-05
- **Test type**: Frontend (Playwright E2E via TestSprite MCP)
- **Base URL**: `http://localhost:3000`
- **Artifacts**:
  - **Raw report**: `testsprite_tests/tmp/raw_report.md`
  - **Structured results**: `testsprite_tests/tmp/test_results.json`
  - **Generated tests**: `testsprite_tests/TC0xx_*.py`

## 2) Executive summary
- **Total tests**: 15
- **Passed**: 4 (TC007, TC008, TC011, TC012)
- **Failed**: 11
- **Pass rate**: 26.67%

### Primary blocker (root cause)
Most failures are caused by **Supabase authentication requests failing with `net::ERR_EMPTY_RESPONSE` / `TypeError: Failed to fetch`** because the app is configured with placeholder Supabase values (tests show calls to `https://example.supabase.co/...`).

**Impact**: Any test that needs signup/login (and therefore access to dashboard/course pages) is blocked.

## 3) Requirement groups & coverage

| Requirement Group | Test Cases | Result |
|---|---:|---|
| Authentication & approval gating | TC001, TC002 | ❌ Blocked by Supabase connectivity |
| Dashboard “Next Step” | TC003, TC004 | ❌ Blocked by login failure |
| Spaced repetition scheduling | TC005 | ❌ Blocked by auth gate (no test user) |
| TTS API endpoints (`/api/tts`) | TC007, TC008, TC014 | ✅ GET/POST passed; ❌ auth-gated UI error-path test blocked |
| Learning path sequence enforcement | TC010 | ❌ Blocked by signup failure |
| Progress persistence | TC009 | ❌ Blocked by login failure |
| Audio playback UX (lesson/script pages) | TC006, TC013 | ❌ Blocked by auth gate |
| Theme & responsive UI | TC011, TC012 | ✅ Passed |
| Performance under load | TC015 | ❌ Blocked by login failure |

## 4) Detailed results (grouped)

### A) Authentication & approval gating

#### TC001 — User Signup and Approval Workflow — ❌ Failed
- **Evidence**: `testsprite_tests/TC001_User_Signup_and_Approval_Workflow.py`
- **Finding**: Signup triggers a request to Supabase (`/auth/v1/signup`) which fails with `ERR_EMPTY_RESPONSE` / `Failed to fetch`.
- **Likely cause**: `NEXT_PUBLIC_SUPABASE_URL` points to a placeholder (`https://example.supabase.co`) or invalid/blocked endpoint.
- **Fix**:
  - Configure real Supabase env vars locally (see “Key fixes” section).
  - Or intercept/mock Supabase HTTP calls in Playwright for CI.

#### TC002 — Authentication and Access Control Enforcement — ❌ Failed (partial)
- **Evidence**: `testsprite_tests/TC002_Authentication_and_Access_Control_Enforcement.py`
- **Finding**:
  - ✅ Unauthenticated `/dashboard` redirects to login (works).
  - ❌ Login with “unapproved” user fails due to Supabase token request failing (`/auth/v1/token?...`).
- **Fix**: same as TC001 (Supabase env/mocks).

### B) Dashboard “Next Step” flow

#### TC003 — Dashboard Loading and Next Step Display — ❌ Failed
- **Evidence**: `testsprite_tests/TC003_Dashboard_Loading_and_Next_Step_Display.py`
- **Finding**: Login step fails due to Supabase token request failing; test cannot reach dashboard.
- **Fix**: same as TC001 (Supabase env/mocks).

#### TC004 — Next Step Navigation Flow — ❌ Failed
- **Evidence**: `testsprite_tests/TC004_Next_Step_Navigation_Flow.py`
- **Finding**: Blocked on signup step due to Supabase signup request failing.
- **Fix**: same as TC001.

### C) Spaced repetition & progress

#### TC005 — Spaced Repetition Scheduling for Review Steps — ❌ Failed
- **Evidence**: `testsprite_tests/TC005_Spaced_Repetition_Scheduling_for_Review_Steps.py`
- **Finding**: Test is blocked by authentication gating (cannot access learning content without account).
- **Fix**:
  - Provide a seeded test account and bypass approval for test env, or
  - Add an E2E “test mode” that uses mocked Supabase + seeded course/progress.

#### TC009 — Progress Persistence and Accuracy — ❌ Failed
- **Evidence**: `testsprite_tests/TC009_Progress_Persistence_and_Accuracy.py`
- **Finding**: Blocked by login failure (`Failed to fetch` to Supabase token endpoint).
- **Fix**: same as TC001.

### D) Learning path enforcement

#### TC010 — Learning Path Sequence Enforcement — ❌ Failed
- **Evidence**: `testsprite_tests/TC010_Learning_Path_Sequence_Enforcement.py`
- **Finding**: Blocked by signup failure (`Failed to fetch` to Supabase signup endpoint).
- **Fix**: same as TC001.

### E) TTS

#### TC007 — `/api/tts` POST Functionality — ✅ Passed
- **Evidence**: `testsprite_tests/TC007_API_Endpoint_TTS_apitts_POST_Functionality.py`
- **Finding**: The endpoint responds without crashing and returns expected status behavior for the test’s checks.

#### TC008 — `/api/tts` GET Functionality — ✅ Passed
- **Evidence**: `testsprite_tests/TC008_API_Endpoint_TTS_apitts_GET_Functionality.py`
- **Finding**: The endpoint returns availability and model/voice metadata as expected.

#### TC014 — Error Handling for Unavailable TTS Service — ❌ Failed
- **Evidence**: `testsprite_tests/TC014_Error_Handling_for_Unavailable_TTS_Service.py`
- **Finding**: Blocked because the test tries to authenticate before validating UI behavior and login fails due to Supabase connectivity.
- **Fix**:
  - Refactor the test to validate `/api/tts` error paths without requiring auth, or
  - Fix Supabase env/mocks first.

#### TC006 — TTS Audio Generation and Playback — ❌ Failed
#### TC013 — Audio Player Cross-Browser Compatibility — ❌ Failed
- **Evidence**: `testsprite_tests/TC006_TTS_Audio_Generation_and_Playback.py`, `testsprite_tests/TC013_Audio_Player_Cross_Browser_Compatibility.py`
- **Finding**: Both are blocked by auth gating (cannot reach lesson/script pages).
- **Fix**: Provide test accounts + seed data, or a mock mode for E2E.

### F) UI

#### TC011 — Theme Toggle Functionality — ✅ Passed
- **Evidence**: `testsprite_tests/TC011_Theme_Toggle_Functionality.py`
- **Finding**: Theme toggle works and core landing-page elements remain visible.

#### TC012 — Responsive Design Across Devices — ✅ Passed
- **Evidence**: `testsprite_tests/TC012_Responsive_Design_Across_Devices.py`
- **Finding**: Key pages render correctly across viewport interactions used by the test.

#### TC015 — UI Performance Under Load — ❌ Failed
- **Evidence**: `testsprite_tests/TC015_UI_Performance_Under_Load.py`
- **Finding**: Blocked by login failure.
- **Fix**: same as TC001.

## 5) Key fixes to unblock most tests

### Fix 1 — Provide real Supabase environment variables for local testing
Create a local env file (not committed) with:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Then restart `npm run dev` and re-run TestSprite.

### Fix 2 — Make tests CI-friendly (recommended)
If you want these to run without real Supabase:
- Add Playwright routing to **mock Supabase HTTP** calls, or
- Provide a dedicated test Supabase project + seeded data + a test account that is already approved, or
- Add an app “test mode” that swaps Supabase with a local stub.

## 6) Next steps
- After fixing Supabase env/mocking, re-run TestSprite. Most of the 11 failures should become actionable feature validations instead of infra blocks.


