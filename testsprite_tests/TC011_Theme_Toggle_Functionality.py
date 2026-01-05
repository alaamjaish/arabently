import asyncio
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None
    
    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()
        
        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )
        
        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)
        
        # Open a new page in the browser context
        page = await context.new_page()
        
        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:3000", wait_until="commit", timeout=10000)
        
        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass
        
        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass
        
        # Interact with the page elements to simulate user flow
        # -> Click the theme toggle button to switch theme
        frame = context.pages[-1]
        # Click the theme toggle button to switch theme
        elem = frame.locator('xpath=html/body/div[2]/div[4]/header/div/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click the theme toggle button again to switch back to the original theme and verify no UI glitches
        frame = context.pages[-1]
        # Click the theme toggle button again to switch back to the original theme
        elem = frame.locator('xpath=html/body/div[2]/div[4]/header/div/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=ع').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Arabently').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Log in').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Sign up').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=✨ Next Step System').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Learn the Saudi Dialect').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=The Smart Way').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Stop guessing what to study next. Our guided learning system takes you step by step from complete beginner to conversational fluency in Saudi Arabic.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Start Learning Free').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=See How It Works').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Already have an account? Log in').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=50 Lessons').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Spaced Repetition').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Saudi Dialect').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=How It Works').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=A simple, effective system designed for real progress').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Watch Video Lessons').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Professional video content teaches you vocabulary, grammar, and cultural context.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Practice Listening').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Listen to native speakers. We remind you when to re-listen for optimal retention.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Follow the Next Step').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Never wonder what to do. Just follow your personalized next step each session.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=What You\'ll Learn').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=1').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Greetings & Introductions').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Master phrases like مرحبا and كيفك؟').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Daily Conversations').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Talk about family, work, food: وش شغلك؟').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=3').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Real Saudi Dialect').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=How Saudis speak: يلا نروح (let\'s go)').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=❖').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=“Finally a course that teaches REAL Saudi Arabic! After 3 months, I can chat with my Saudi colleagues naturally.”').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=— Sarah M., USA').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Ready to Start Your Journey?').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Join thousands of learners mastering conversational Arabic.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Start Your Journey').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=No credit card required. Start learning in under a minute.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Privacy').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Terms').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Contact').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=© 2025 Arabently. All rights reserved.').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    