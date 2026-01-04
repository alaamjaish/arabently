// Arabently Mock Data - Foundational Arabic Course (Saudi Dialect)
// Complete course structure: 10 Units, 50 Lessons, Scripts, and Roadmap

// ============================================
// TYPES
// ============================================
export interface Instructor {
  name: string
  nameAr: string
  avatar: string
  bio: string
  bioAr: string
}

export interface MockCourse {
  id: string
  title: string
  titleAr: string
  slug: string
  description: string
  descriptionAr: string
  totalUnits: number
  totalLessons: number
  isPublished: boolean
}

export interface MockUnit {
  id: string
  courseId: string
  unitNumber: number
  title: string
  titleAr: string
  totalLessons: number
  description: string
}

export interface MockLesson {
  id: string
  unitId: string
  lessonNumber: number
  title: string
  titleAr: string
  videoUrls: string[]
  content: string
  durationMinutes: number
}

export interface MockScript {
  id: string
  lessonId: string | null
  title: string
  titleAr: string
  audioUrl: string
  scriptText: string
  type: 'input' | 'dialogue' | 'practice'
}

export interface RoadmapStepMock {
  id: string
  courseId: string
  stepOrder: number
  stepType: 'lesson' | 'script' | 'review_script'
  lessonId: string | null
  scriptId: string | null
  description: string
}

// ============================================
// INSTRUCTOR
// ============================================
export const instructor: Instructor = {
  name: "Bassam",
  nameAr: "بسام",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bassam&backgroundColor=b8860b",
  bio: "Native Saudi Arabic speaker with 10+ years of teaching experience. Specialized in helping non-native speakers achieve conversational fluency in the Saudi dialect.",
  bioAr: "متحدث أصلي للعربية السعودية مع أكثر من ١٠ سنين خبرة في التدريس. متخصص في مساعدة الناس يتعلمون اللهجة السعودية بطلاقة."
}

// ============================================
// COURSE
// ============================================
export const mockCourse: MockCourse = {
  id: "course-foundational-001",
  title: "Foundational Arabic Course",
  titleAr: "كورس تأسيس العربية السعودية",
  slug: "foundational-arabic",
  description: "Master conversational Saudi Arabic from scratch. Learn to speak like a local with our comprehensive 50-lesson course covering greetings, introductions, family, daily life, food, shopping, travel, and more.",
  descriptionAr: "تعلم العربية السعودية من الصفر. تكلم مثل أهل البلد مع كورسنا الشامل - ٥٠ درس يغطي التحيات، التعريف بالنفس، العائلة، الحياة اليومية، الأكل، التسوق، السفر، وأكثر.",
  totalUnits: 10,
  totalLessons: 50,
  isPublished: true
}

// ============================================
// UNITS (10 Units)
// ============================================
export const mockUnits: MockUnit[] = [
  {
    id: "unit-001",
    courseId: "course-foundational-001",
    unitNumber: 1,
    title: "Greetings & Basic Phrases",
    titleAr: "التحيات والعبارات الأساسية",
    totalLessons: 5,
    description: "Learn essential greetings, farewells, and polite expressions in Saudi Arabic."
  },
  {
    id: "unit-002",
    courseId: "course-foundational-001",
    unitNumber: 2,
    title: "Introducing Yourself",
    titleAr: "التعريف بنفسك",
    totalLessons: 5,
    description: "Learn to introduce yourself, share personal details, and ask about others."
  },
  {
    id: "unit-003",
    courseId: "course-foundational-001",
    unitNumber: 3,
    title: "Family & Relationships",
    titleAr: "العائلة والعلاقات",
    totalLessons: 5,
    description: "Talk about family members, relationships, and describe people."
  },
  {
    id: "unit-004",
    courseId: "course-foundational-001",
    unitNumber: 4,
    title: "Daily Routines",
    titleAr: "الروتين اليومي",
    totalLessons: 5,
    description: "Describe your daily activities, schedules, and time expressions."
  },
  {
    id: "unit-005",
    courseId: "course-foundational-001",
    unitNumber: 5,
    title: "Food & Dining",
    titleAr: "الأكل والمطاعم",
    totalLessons: 5,
    description: "Order food, discuss Saudi cuisine, and navigate restaurant situations."
  },
  {
    id: "unit-006",
    courseId: "course-foundational-001",
    unitNumber: 6,
    title: "Shopping & Money",
    titleAr: "التسوق والفلوس",
    totalLessons: 5,
    description: "Shop at markets, bargain, discuss prices, and handle money."
  },
  {
    id: "unit-007",
    courseId: "course-foundational-001",
    unitNumber: 7,
    title: "Directions & Places",
    titleAr: "الاتجاهات والأماكن",
    totalLessons: 5,
    description: "Ask for and give directions, discuss locations and landmarks."
  },
  {
    id: "unit-008",
    courseId: "course-foundational-001",
    unitNumber: 8,
    title: "Health & Emergencies",
    titleAr: "الصحة والطوارئ",
    totalLessons: 5,
    description: "Describe symptoms, visit doctors, and handle emergency situations."
  },
  {
    id: "unit-009",
    courseId: "course-foundational-001",
    unitNumber: 9,
    title: "Work & Business",
    titleAr: "العمل والأعمال",
    totalLessons: 5,
    description: "Talk about professions, workplaces, and business conversations."
  },
  {
    id: "unit-010",
    courseId: "course-foundational-001",
    unitNumber: 10,
    title: "Culture & Traditions",
    titleAr: "الثقافة والتقاليد",
    totalLessons: 5,
    description: "Understand Saudi culture, traditions, holidays, and social customs."
  }
]

// ============================================
// LESSONS (50 Lessons - 5 per unit)
// ============================================
export const mockLessons: MockLesson[] = [
  // Unit 1: Greetings & Basic Phrases
  { id: "lesson-001", unitId: "unit-001", lessonNumber: 1, title: "Hello & Goodbye", titleAr: "هلا ومع السلامة", videoUrls: [], content: "Learn the most common ways to greet people and say goodbye in Saudi Arabic.", durationMinutes: 25 },
  { id: "lesson-002", unitId: "unit-001", lessonNumber: 2, title: "How Are You?", titleAr: "كيفك؟ شلونك؟", videoUrls: [], content: "Master different ways to ask and respond to 'How are you?' in Saudi dialect.", durationMinutes: 30 },
  { id: "lesson-003", unitId: "unit-001", lessonNumber: 3, title: "Nice to Meet You", titleAr: "تشرفنا", videoUrls: [], content: "Learn polite expressions for meeting someone new.", durationMinutes: 25 },
  { id: "lesson-004", unitId: "unit-001", lessonNumber: 4, title: "Thank You & Please", titleAr: "شكراً ولو سمحت", videoUrls: [], content: "Essential polite expressions for daily interactions.", durationMinutes: 30 },
  { id: "lesson-005", unitId: "unit-001", lessonNumber: 5, title: "Unit 1 Review", titleAr: "مراجعة الوحدة الأولى", videoUrls: [], content: "Review and practice all greetings learned in Unit 1.", durationMinutes: 35 },

  // Unit 2: Introducing Yourself
  { id: "lesson-006", unitId: "unit-002", lessonNumber: 1, title: "What's Your Name?", titleAr: "شو اسمك؟", videoUrls: [], content: "Learn to ask and share names in different contexts.", durationMinutes: 25 },
  { id: "lesson-007", unitId: "unit-002", lessonNumber: 2, title: "Where Are You From?", titleAr: "من وين أنت؟", videoUrls: [], content: "Talk about countries, cities, and nationalities.", durationMinutes: 30 },
  { id: "lesson-008", unitId: "unit-002", lessonNumber: 3, title: "What Do You Do?", titleAr: "وش شغلك؟", videoUrls: [], content: "Discuss professions and occupations.", durationMinutes: 25 },
  { id: "lesson-009", unitId: "unit-002", lessonNumber: 4, title: "How Old Are You?", titleAr: "كم عمرك؟", videoUrls: [], content: "Numbers and age expressions in Arabic.", durationMinutes: 30 },
  { id: "lesson-010", unitId: "unit-002", lessonNumber: 5, title: "Full Introduction", titleAr: "تقديم كامل", videoUrls: [], content: "Put it all together - introduce yourself completely.", durationMinutes: 35 },

  // Unit 3: Family & Relationships
  { id: "lesson-011", unitId: "unit-003", lessonNumber: 1, title: "Family Members", titleAr: "أفراد العائلة", videoUrls: [], content: "Learn vocabulary for all family members.", durationMinutes: 25 },
  { id: "lesson-012", unitId: "unit-003", lessonNumber: 2, title: "Describing People", titleAr: "وصف الناس", videoUrls: [], content: "Adjectives to describe appearance and personality.", durationMinutes: 30 },
  { id: "lesson-013", unitId: "unit-003", lessonNumber: 3, title: "Married or Single?", titleAr: "متزوج ولا عزابي؟", videoUrls: [], content: "Talk about marital status and relationships.", durationMinutes: 25 },
  { id: "lesson-014", unitId: "unit-003", lessonNumber: 4, title: "Talking About Kids", titleAr: "الكلام عن العيال", videoUrls: [], content: "Discuss children, ages, and family size.", durationMinutes: 30 },
  { id: "lesson-015", unitId: "unit-003", lessonNumber: 5, title: "Unit 3 Review", titleAr: "مراجعة الوحدة الثالثة", videoUrls: [], content: "Practice family conversations.", durationMinutes: 35 },

  // Unit 4: Daily Routines
  { id: "lesson-016", unitId: "unit-004", lessonNumber: 1, title: "Morning Routine", titleAr: "روتين الصباح", videoUrls: [], content: "Describe what you do every morning.", durationMinutes: 25 },
  { id: "lesson-017", unitId: "unit-004", lessonNumber: 2, title: "At Work", titleAr: "في الشغل", videoUrls: [], content: "Talk about your workday activities.", durationMinutes: 30 },
  { id: "lesson-018", unitId: "unit-004", lessonNumber: 3, title: "After Work", titleAr: "بعد الشغل", videoUrls: [], content: "Evening activities and relaxation.", durationMinutes: 25 },
  { id: "lesson-019", unitId: "unit-004", lessonNumber: 4, title: "Weekend Plans", titleAr: "خطط نهاية الأسبوع", videoUrls: [], content: "Discuss weekend activities and hobbies.", durationMinutes: 30 },
  { id: "lesson-020", unitId: "unit-004", lessonNumber: 5, title: "Time Expressions", titleAr: "عبارات الوقت", videoUrls: [], content: "Master time-related vocabulary.", durationMinutes: 35 },

  // Unit 5: Food & Dining
  { id: "lesson-021", unitId: "unit-005", lessonNumber: 1, title: "Ordering Food", titleAr: "طلب الأكل", videoUrls: [], content: "Learn to order at restaurants.", durationMinutes: 25 },
  { id: "lesson-022", unitId: "unit-005", lessonNumber: 2, title: "Saudi Dishes", titleAr: "الأكلات السعودية", videoUrls: [], content: "Famous Saudi foods and how to describe them.", durationMinutes: 30 },
  { id: "lesson-023", unitId: "unit-005", lessonNumber: 3, title: "At a Restaurant", titleAr: "في المطعم", videoUrls: [], content: "Complete restaurant dialogues.", durationMinutes: 25 },
  { id: "lesson-024", unitId: "unit-005", lessonNumber: 4, title: "Coffee Culture", titleAr: "ثقافة القهوة", videoUrls: [], content: "Arabic coffee traditions and café vocabulary.", durationMinutes: 30 },
  { id: "lesson-025", unitId: "unit-005", lessonNumber: 5, title: "Food Preferences", titleAr: "تفضيلات الأكل", videoUrls: [], content: "Express likes, dislikes, and dietary needs.", durationMinutes: 35 },

  // Unit 6: Shopping & Money
  { id: "lesson-026", unitId: "unit-006", lessonNumber: 1, title: "At the Market", titleAr: "في السوق", videoUrls: [], content: "Navigate traditional markets (souks).", durationMinutes: 25 },
  { id: "lesson-027", unitId: "unit-006", lessonNumber: 2, title: "Prices & Numbers", titleAr: "الأسعار والأرقام", videoUrls: [], content: "Ask about prices and understand numbers.", durationMinutes: 30 },
  { id: "lesson-028", unitId: "unit-006", lessonNumber: 3, title: "Bargaining", titleAr: "المفاصلة", videoUrls: [], content: "The art of negotiating prices.", durationMinutes: 25 },
  { id: "lesson-029", unitId: "unit-006", lessonNumber: 4, title: "Clothes Shopping", titleAr: "شراء الملابس", videoUrls: [], content: "Sizes, colors, and clothing vocabulary.", durationMinutes: 30 },
  { id: "lesson-030", unitId: "unit-006", lessonNumber: 5, title: "Paying & Returns", titleAr: "الدفع والإرجاع", videoUrls: [], content: "Payment methods and return policies.", durationMinutes: 35 },

  // Unit 7: Directions & Places
  { id: "lesson-031", unitId: "unit-007", lessonNumber: 1, title: "Asking for Directions", titleAr: "السؤال عن الطريق", videoUrls: [], content: "Essential phrases for asking directions.", durationMinutes: 25 },
  { id: "lesson-032", unitId: "unit-007", lessonNumber: 2, title: "Giving Directions", titleAr: "إعطاء الاتجاهات", videoUrls: [], content: "Learn to give clear directions.", durationMinutes: 30 },
  { id: "lesson-033", unitId: "unit-007", lessonNumber: 3, title: "Transportation", titleAr: "المواصلات", videoUrls: [], content: "Taxis, buses, and getting around.", durationMinutes: 25 },
  { id: "lesson-034", unitId: "unit-007", lessonNumber: 4, title: "City Landmarks", titleAr: "معالم المدينة", videoUrls: [], content: "Common places and landmarks.", durationMinutes: 30 },
  { id: "lesson-035", unitId: "unit-007", lessonNumber: 5, title: "Navigation Practice", titleAr: "تمرين التنقل", videoUrls: [], content: "Practice real navigation scenarios.", durationMinutes: 35 },

  // Unit 8: Health & Emergencies
  { id: "lesson-036", unitId: "unit-008", lessonNumber: 1, title: "Body Parts", titleAr: "أعضاء الجسم", videoUrls: [], content: "Essential body vocabulary.", durationMinutes: 25 },
  { id: "lesson-037", unitId: "unit-008", lessonNumber: 2, title: "Feeling Sick", titleAr: "لما تكون مريض", videoUrls: [], content: "Describe symptoms and how you feel.", durationMinutes: 30 },
  { id: "lesson-038", unitId: "unit-008", lessonNumber: 3, title: "At the Doctor", titleAr: "عند الدكتور", videoUrls: [], content: "Medical visit conversations.", durationMinutes: 25 },
  { id: "lesson-039", unitId: "unit-008", lessonNumber: 4, title: "At the Pharmacy", titleAr: "في الصيدلية", videoUrls: [], content: "Get medicines and understand instructions.", durationMinutes: 30 },
  { id: "lesson-040", unitId: "unit-008", lessonNumber: 5, title: "Emergency Phrases", titleAr: "عبارات الطوارئ", videoUrls: [], content: "Critical phrases for emergencies.", durationMinutes: 35 },

  // Unit 9: Work & Business
  { id: "lesson-041", unitId: "unit-009", lessonNumber: 1, title: "Professions", titleAr: "المهن", videoUrls: [], content: "Common jobs and career vocabulary.", durationMinutes: 25 },
  { id: "lesson-042", unitId: "unit-009", lessonNumber: 2, title: "Office Vocabulary", titleAr: "مصطلحات المكتب", videoUrls: [], content: "Workplace items and activities.", durationMinutes: 30 },
  { id: "lesson-043", unitId: "unit-009", lessonNumber: 3, title: "Business Meetings", titleAr: "اجتماعات العمل", videoUrls: [], content: "Formal business language.", durationMinutes: 25 },
  { id: "lesson-044", unitId: "unit-009", lessonNumber: 4, title: "Phone Calls", titleAr: "المكالمات الهاتفية", videoUrls: [], content: "Professional phone etiquette.", durationMinutes: 30 },
  { id: "lesson-045", unitId: "unit-009", lessonNumber: 5, title: "Networking", titleAr: "بناء العلاقات", videoUrls: [], content: "Social and professional networking.", durationMinutes: 35 },

  // Unit 10: Culture & Traditions
  { id: "lesson-046", unitId: "unit-010", lessonNumber: 1, title: "Saudi Traditions", titleAr: "التقاليد السعودية", videoUrls: [], content: "Core cultural practices and customs.", durationMinutes: 25 },
  { id: "lesson-047", unitId: "unit-010", lessonNumber: 2, title: "Holidays & Celebrations", titleAr: "الأعياد والاحتفالات", videoUrls: [], content: "Major holidays and how to celebrate.", durationMinutes: 30 },
  { id: "lesson-048", unitId: "unit-010", lessonNumber: 3, title: "Hospitality", titleAr: "الضيافة", videoUrls: [], content: "The famous Saudi hospitality customs.", durationMinutes: 25 },
  { id: "lesson-049", unitId: "unit-010", lessonNumber: 4, title: "Social Etiquette", titleAr: "آداب المجتمع", videoUrls: [], content: "Do's and don'ts in Saudi society.", durationMinutes: 30 },
  { id: "lesson-050", unitId: "unit-010", lessonNumber: 5, title: "Course Finale", titleAr: "ختام الكورس", videoUrls: [], content: "Celebrate your achievement and plan next steps!", durationMinutes: 35 }
]

// ============================================
// SCRIPTS (Audio content for listening practice)
// ============================================
export const mockScripts: MockScript[] = [
  // Unit 1 Scripts
  { id: "script-001", lessonId: "lesson-001", title: "Greetings Dialogue 1", titleAr: "حوار التحيات ١", audioUrl: "", scriptText: "هلا والله! - هلا فيك! كيفك؟ - الحمدلله بخير، وانت؟", type: "dialogue" },
  { id: "script-002", lessonId: "lesson-002", title: "How Are You Practice", titleAr: "تمرين كيفك", audioUrl: "", scriptText: "كيف الحال؟ - تمام الحمدلله. شلونك؟ - ماشي الحال.", type: "input" },
  { id: "script-003", lessonId: "lesson-003", title: "Meeting Someone New", titleAr: "مقابلة شخص جديد", audioUrl: "", scriptText: "تشرفنا. - العفو، التشرف لي. شو اسمك؟", type: "dialogue" },
  { id: "script-004", lessonId: "lesson-004", title: "Polite Expressions", titleAr: "عبارات مهذبة", audioUrl: "", scriptText: "شكراً جزيلاً. - العفو، ما سوينا شي. لو سمحت، وين المطعم؟", type: "input" },
  
  // Unit 2 Scripts
  { id: "script-005", lessonId: "lesson-006", title: "Name Exchange", titleAr: "تبادل الأسماء", audioUrl: "", scriptText: "شو اسمك؟ - اسمي أحمد، وانت؟ - اسمي سارة.", type: "dialogue" },
  { id: "script-006", lessonId: "lesson-007", title: "Origin Conversation", titleAr: "محادثة الأصل", audioUrl: "", scriptText: "من وين انت؟ - أنا من الرياض. وانت من وين؟ - أنا من جدة.", type: "dialogue" },
  { id: "script-007", lessonId: "lesson-008", title: "Job Discussion", titleAr: "نقاش العمل", audioUrl: "", scriptText: "وش شغلك؟ - أنا مهندس. وانت وش تشتغل؟ - أنا دكتور.", type: "dialogue" },
  
  // Unit 3 Scripts
  { id: "script-008", lessonId: "lesson-011", title: "Family Introduction", titleAr: "تعريف العائلة", audioUrl: "", scriptText: "هذا أبوي وهذي أمي. عندي أخ واحد وأختين.", type: "input" },
  { id: "script-009", lessonId: "lesson-012", title: "Describing Family", titleAr: "وصف العائلة", audioUrl: "", scriptText: "أختي طويلة وشعرها أسود. أخوي قصير بس قوي.", type: "input" },
  
  // Unit 4 Scripts
  { id: "script-010", lessonId: "lesson-016", title: "Morning Routine", titleAr: "روتين الصباح", audioUrl: "", scriptText: "أصحى الساعة سبعة. أفطر وأشرب قهوة. بعدين أروح الشغل.", type: "input" },
  { id: "script-011", lessonId: "lesson-017", title: "Work Day", titleAr: "يوم العمل", audioUrl: "", scriptText: "أوصل المكتب الساعة تسعة. أشتغل لين الساعة خمسة.", type: "input" },
  
  // Unit 5 Scripts
  { id: "script-012", lessonId: "lesson-021", title: "Restaurant Order", titleAr: "طلب المطعم", audioUrl: "", scriptText: "أبي كبسة لو سمحت. - حاضر، تبي شي ثاني؟ - لا شكراً، بس كذا.", type: "dialogue" },
  { id: "script-013", lessonId: "lesson-024", title: "Coffee Shop", titleAr: "المقهى", audioUrl: "", scriptText: "أعطني قهوة عربية. - تبيها سادة ولا بهيل؟ - بهيل لو سمحت.", type: "dialogue" },
  
  // Unit 6 Scripts
  { id: "script-014", lessonId: "lesson-026", title: "Market Shopping", titleAr: "التسوق من السوق", audioUrl: "", scriptText: "بكم هذا؟ - هذا بخمسين ريال. - غالي! أعطيك أربعين.", type: "dialogue" },
  { id: "script-015", lessonId: "lesson-028", title: "Bargaining", titleAr: "المفاصلة", audioUrl: "", scriptText: "آخر سعر؟ - طيب خمسة وأربعين. - تم، خلاص.", type: "dialogue" },
  
  // Unit 7 Scripts
  { id: "script-016", lessonId: "lesson-031", title: "Asking Directions", titleAr: "السؤال عن الطريق", audioUrl: "", scriptText: "وين المطار؟ - روح على طول، بعدين لف يمين.", type: "dialogue" },
  { id: "script-017", lessonId: "lesson-033", title: "Taking a Taxi", titleAr: "ركوب التاكسي", audioUrl: "", scriptText: "وديني البرج الكبير. - إن شاء الله. الطريق زحمة شوي.", type: "dialogue" },
  
  // Unit 8 Scripts
  { id: "script-018", lessonId: "lesson-037", title: "Feeling Sick", titleAr: "تحس بمرض", audioUrl: "", scriptText: "وش فيك؟ - عندي صداع قوي وحرارة. - لازم تروح الدكتور.", type: "dialogue" },
  { id: "script-019", lessonId: "lesson-038", title: "At the Doctor", titleAr: "عند الدكتور", audioUrl: "", scriptText: "وش تحس؟ - عندي ألم في بطني. - من متى؟ - من أمس.", type: "dialogue" },
  
  // Unit 9 Scripts
  { id: "script-020", lessonId: "lesson-043", title: "Business Meeting", titleAr: "اجتماع عمل", audioUrl: "", scriptText: "نبدأ الاجتماع؟ - أي، تفضل. موضوعنا اليوم المشروع الجديد.", type: "dialogue" },
  { id: "script-021", lessonId: "lesson-044", title: "Phone Call", titleAr: "مكالمة هاتفية", audioUrl: "", scriptText: "آلو، السلام عليكم. - وعليكم السلام. معك مين؟", type: "dialogue" },
  
  // Unit 10 Scripts
  { id: "script-022", lessonId: "lesson-048", title: "Hospitality", titleAr: "الضيافة", audioUrl: "", scriptText: "أهلاً وسهلاً! تفضل اجلس. - شكراً، الله يعطيك العافية.", type: "dialogue" },
  { id: "script-023", lessonId: "lesson-050", title: "Final Dialogue", titleAr: "الحوار الأخير", audioUrl: "", scriptText: "مبروك! خلصت الكورس! - شكراً! كانت رحلة حلوة.", type: "dialogue" }
]

// ============================================
// ROADMAP STEPS (The Next Step system)
// Pattern: Lesson → Script → Review Script (after 2 lessons)
// ============================================
export const mockRoadmapSteps: RoadmapStepMock[] = [
  // Unit 1
  { id: "step-001", courseId: "course-foundational-001", stepOrder: 1, stepType: "lesson", lessonId: "lesson-001", scriptId: null, description: "Watch: Hello & Goodbye" },
  { id: "step-002", courseId: "course-foundational-001", stepOrder: 2, stepType: "script", lessonId: null, scriptId: "script-001", description: "Listen: Greetings Dialogue" },
  { id: "step-003", courseId: "course-foundational-001", stepOrder: 3, stepType: "lesson", lessonId: "lesson-002", scriptId: null, description: "Watch: How Are You?" },
  { id: "step-004", courseId: "course-foundational-001", stepOrder: 4, stepType: "script", lessonId: null, scriptId: "script-002", description: "Listen: How Are You Practice" },
  { id: "step-005", courseId: "course-foundational-001", stepOrder: 5, stepType: "review_script", lessonId: null, scriptId: "script-001", description: "Review: Greetings Dialogue" },
  { id: "step-006", courseId: "course-foundational-001", stepOrder: 6, stepType: "lesson", lessonId: "lesson-003", scriptId: null, description: "Watch: Nice to Meet You" },
  { id: "step-007", courseId: "course-foundational-001", stepOrder: 7, stepType: "script", lessonId: null, scriptId: "script-003", description: "Listen: Meeting Someone New" },
  { id: "step-008", courseId: "course-foundational-001", stepOrder: 8, stepType: "lesson", lessonId: "lesson-004", scriptId: null, description: "Watch: Thank You & Please" },
  { id: "step-009", courseId: "course-foundational-001", stepOrder: 9, stepType: "script", lessonId: null, scriptId: "script-004", description: "Listen: Polite Expressions" },
  { id: "step-010", courseId: "course-foundational-001", stepOrder: 10, stepType: "review_script", lessonId: null, scriptId: "script-002", description: "Review: How Are You Practice" },
  { id: "step-011", courseId: "course-foundational-001", stepOrder: 11, stepType: "lesson", lessonId: "lesson-005", scriptId: null, description: "Watch: Unit 1 Review" },
  
  // Unit 2
  { id: "step-012", courseId: "course-foundational-001", stepOrder: 12, stepType: "lesson", lessonId: "lesson-006", scriptId: null, description: "Watch: What's Your Name?" },
  { id: "step-013", courseId: "course-foundational-001", stepOrder: 13, stepType: "script", lessonId: null, scriptId: "script-005", description: "Listen: Name Exchange" },
  { id: "step-014", courseId: "course-foundational-001", stepOrder: 14, stepType: "lesson", lessonId: "lesson-007", scriptId: null, description: "Watch: Where Are You From?" },
  { id: "step-015", courseId: "course-foundational-001", stepOrder: 15, stepType: "script", lessonId: null, scriptId: "script-006", description: "Listen: Origin Conversation" },
  { id: "step-016", courseId: "course-foundational-001", stepOrder: 16, stepType: "review_script", lessonId: null, scriptId: "script-003", description: "Review: Meeting Someone New" },
  { id: "step-017", courseId: "course-foundational-001", stepOrder: 17, stepType: "review_script", lessonId: null, scriptId: "script-005", description: "Review: Name Exchange" },
  { id: "step-018", courseId: "course-foundational-001", stepOrder: 18, stepType: "lesson", lessonId: "lesson-008", scriptId: null, description: "Watch: What Do You Do?" },
  { id: "step-019", courseId: "course-foundational-001", stepOrder: 19, stepType: "script", lessonId: null, scriptId: "script-007", description: "Listen: Job Discussion" },
  { id: "step-020", courseId: "course-foundational-001", stepOrder: 20, stepType: "lesson", lessonId: "lesson-009", scriptId: null, description: "Watch: How Old Are You?" },
  { id: "step-021", courseId: "course-foundational-001", stepOrder: 21, stepType: "review_script", lessonId: null, scriptId: "script-006", description: "Review: Origin Conversation" },
  { id: "step-022", courseId: "course-foundational-001", stepOrder: 22, stepType: "lesson", lessonId: "lesson-010", scriptId: null, description: "Watch: Full Introduction" },
  
  // Unit 3
  { id: "step-023", courseId: "course-foundational-001", stepOrder: 23, stepType: "lesson", lessonId: "lesson-011", scriptId: null, description: "Watch: Family Members" },
  { id: "step-024", courseId: "course-foundational-001", stepOrder: 24, stepType: "script", lessonId: null, scriptId: "script-008", description: "Listen: Family Introduction" },
  { id: "step-025", courseId: "course-foundational-001", stepOrder: 25, stepType: "lesson", lessonId: "lesson-012", scriptId: null, description: "Watch: Describing People" },
  { id: "step-026", courseId: "course-foundational-001", stepOrder: 26, stepType: "script", lessonId: null, scriptId: "script-009", description: "Listen: Describing Family" },
  { id: "step-027", courseId: "course-foundational-001", stepOrder: 27, stepType: "review_script", lessonId: null, scriptId: "script-007", description: "Review: Job Discussion" },
  { id: "step-028", courseId: "course-foundational-001", stepOrder: 28, stepType: "lesson", lessonId: "lesson-013", scriptId: null, description: "Watch: Married or Single?" },
  { id: "step-029", courseId: "course-foundational-001", stepOrder: 29, stepType: "lesson", lessonId: "lesson-014", scriptId: null, description: "Watch: Talking About Kids" },
  { id: "step-030", courseId: "course-foundational-001", stepOrder: 30, stepType: "review_script", lessonId: null, scriptId: "script-008", description: "Review: Family Introduction" },
  { id: "step-031", courseId: "course-foundational-001", stepOrder: 31, stepType: "lesson", lessonId: "lesson-015", scriptId: null, description: "Watch: Unit 3 Review" },
  
  // Continue pattern for remaining units...
  { id: "step-032", courseId: "course-foundational-001", stepOrder: 32, stepType: "lesson", lessonId: "lesson-016", scriptId: null, description: "Watch: Morning Routine" },
  { id: "step-033", courseId: "course-foundational-001", stepOrder: 33, stepType: "script", lessonId: null, scriptId: "script-010", description: "Listen: Morning Routine" },
  { id: "step-034", courseId: "course-foundational-001", stepOrder: 34, stepType: "lesson", lessonId: "lesson-017", scriptId: null, description: "Watch: At Work" },
  { id: "step-035", courseId: "course-foundational-001", stepOrder: 35, stepType: "script", lessonId: null, scriptId: "script-011", description: "Listen: Work Day" },
  
  // Unit 5
  { id: "step-036", courseId: "course-foundational-001", stepOrder: 36, stepType: "lesson", lessonId: "lesson-021", scriptId: null, description: "Watch: Ordering Food" },
  { id: "step-037", courseId: "course-foundational-001", stepOrder: 37, stepType: "script", lessonId: null, scriptId: "script-012", description: "Listen: Restaurant Order" },
  { id: "step-038", courseId: "course-foundational-001", stepOrder: 38, stepType: "lesson", lessonId: "lesson-024", scriptId: null, description: "Watch: Coffee Culture" },
  { id: "step-039", courseId: "course-foundational-001", stepOrder: 39, stepType: "script", lessonId: null, scriptId: "script-013", description: "Listen: Coffee Shop" },
  
  // Unit 6
  { id: "step-040", courseId: "course-foundational-001", stepOrder: 40, stepType: "lesson", lessonId: "lesson-026", scriptId: null, description: "Watch: At the Market" },
  { id: "step-041", courseId: "course-foundational-001", stepOrder: 41, stepType: "script", lessonId: null, scriptId: "script-014", description: "Listen: Market Shopping" },
  { id: "step-042", courseId: "course-foundational-001", stepOrder: 42, stepType: "lesson", lessonId: "lesson-028", scriptId: null, description: "Watch: Bargaining" },
  { id: "step-043", courseId: "course-foundational-001", stepOrder: 43, stepType: "script", lessonId: null, scriptId: "script-015", description: "Listen: Bargaining Practice" }
]

// ============================================
// TESTIMONIALS
// ============================================
export interface Testimonial {
  id: string
  name: string
  nameAr: string
  avatar: string
  text: string
  textAr: string
  rating: number
  country: string
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Mitchell",
    nameAr: "سارة ميتشل",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah&backgroundColor=f59e0b",
    text: "Finally a course that teaches REAL Saudi Arabic! After 3 months, I can chat with my Saudi colleagues naturally.",
    textAr: "أخيراً كورس يعلم اللهجة السعودية الحقيقية! بعد ٣ شهور قدرت أتكلم مع زملائي السعوديين بشكل طبيعي.",
    rating: 5,
    country: "USA"
  },
  {
    id: "t2",
    name: "Ahmed Khan",
    nameAr: "أحمد خان",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed&backgroundColor=10b981",
    text: "The 'Next Step' system is genius! No more confusion about what to study. I just follow the path.",
    textAr: "نظام 'الخطوة الجاية' عبقري! ما عاد أحتار شو أدرس. بس أمشي مع الخطة.",
    rating: 5,
    country: "Pakistan"
  },
  {
    id: "t3",
    name: "Emma Johnson",
    nameAr: "إيما جونسون",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma&backgroundColor=8b5cf6",
    text: "I tried 5 Arabic courses before. This is the first one that actually works. The repetition system helps so much!",
    textAr: "جربت ٥ كورسات عربي قبل. هذا أول واحد فعلاً ينفع. نظام التكرار يساعد كثييير!",
    rating: 5,
    country: "UK"
  },
  {
    id: "t4",
    name: "Michael Chen",
    nameAr: "مايكل تشين",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael&backgroundColor=ef4444",
    text: "Living in Riyadh now and people are impressed by my Arabic! Thanks Arabently!",
    textAr: "الحين أعيش في الرياض والناس منبهرين من عربيّتي! شكراً Arabently!",
    rating: 5,
    country: "China"
  }
]

// ============================================
// DAILY QUOTES - Saudi Proverbs
// ============================================
export interface DailyQuote {
  arabic: string
  english: string
  author?: string
}

export const dailyQuotes: DailyQuote[] = [
  { arabic: "اللي ما يعرف الصقر يشويه", english: "Those who don't know the falcon's worth will roast it", author: "مثل سعودي" },
  { arabic: "يلي يبي الحلو يصبر على مره", english: "Those who want sweetness must endure bitterness", author: "مثل سعودي" },
  { arabic: "خطوة خطوة تمشي ألف ميل", english: "Step by step you walk a thousand miles", author: "مثل عربي" },
  { arabic: "العلم نور والجهل ظلام", english: "Knowledge is light and ignorance is darkness", author: "مثل عربي" },
  { arabic: "من جدّ وجد", english: "Those who strive will succeed", author: "مثل عربي" },
  { arabic: "الصبر مفتاح الفرج", english: "Patience is the key to relief", author: "مثل عربي" }
]

// ============================================
// HELPERS
// ============================================
export const getGreeting = (hour: number): { arabic: string; english: string } => {
  if (hour >= 5 && hour < 12) return { arabic: "صباح الخير", english: "Good morning" }
  if (hour >= 12 && hour < 17) return { arabic: "مساء الخير", english: "Good afternoon" }
  if (hour >= 17 && hour < 21) return { arabic: "مساء النور", english: "Good evening" }
  return { arabic: "تصبح على خير", english: "Good night" }
}

export const getRandomQuote = (): DailyQuote => {
  const today = new Date()
  const index = today.getDate() % dailyQuotes.length
  return dailyQuotes[index]
}

// Stats for landing page
export const mockStats = {
  totalStudents: 1247,
  lessonsCompleted: 18500,
  averageRating: 4.9,
  countriesReached: 42
}
