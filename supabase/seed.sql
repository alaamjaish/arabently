-- Arabently Seed Data
-- Complete course data: 10 Units, 50 Lessons, Scripts, and Roadmap Steps
-- Run this after schema.sql

-- ============================================
-- CLEANUP: Remove existing data (in correct order for foreign keys)
-- ============================================
DELETE FROM student_progress WHERE course_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
DELETE FROM roadmap_steps WHERE course_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
DELETE FROM scripts WHERE lesson_id IN (
  SELECT id FROM lessons WHERE unit_id IN (
    SELECT id FROM units WHERE course_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
  )
);
DELETE FROM lessons WHERE unit_id IN (
  SELECT id FROM units WHERE course_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
);
DELETE FROM units WHERE course_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
DELETE FROM courses WHERE id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

-- ============================================
-- COURSE
-- ============================================
INSERT INTO courses (id, title, title_ar, slug, description, total_units, is_published)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Foundational Arabic Course',
  'كورس تأسيس العربية السعودية',
  'foundational-arabic',
  'Master conversational Saudi Arabic from scratch. Learn to speak like a local with our comprehensive 50-lesson course.',
  10,
  true
);

-- ============================================
-- UNITS (10 Units)
-- ============================================
INSERT INTO units (id, course_id, unit_number, title, title_ar, total_lessons) VALUES
('11111111-0001-0001-0001-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 1, 'Greetings & Basic Phrases', 'التحيات والعبارات الأساسية', 5),
('11111111-0001-0001-0001-000000000002', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 2, 'Introducing Yourself', 'التعريف بنفسك', 5),
('11111111-0001-0001-0001-000000000003', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 3, 'Family & Relationships', 'العائلة والعلاقات', 5),
('11111111-0001-0001-0001-000000000004', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 4, 'Daily Routines', 'الروتين اليومي', 5),
('11111111-0001-0001-0001-000000000005', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 5, 'Food & Dining', 'الأكل والمطاعم', 5),
('11111111-0001-0001-0001-000000000006', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 6, 'Shopping & Money', 'التسوق والفلوس', 5),
('11111111-0001-0001-0001-000000000007', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 7, 'Directions & Places', 'الاتجاهات والأماكن', 5),
('11111111-0001-0001-0001-000000000008', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 8, 'Health & Emergencies', 'الصحة والطوارئ', 5),
('11111111-0001-0001-0001-000000000009', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 9, 'Work & Business', 'العمل والأعمال', 5),
('11111111-0001-0001-0001-000000000010', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 10, 'Culture & Traditions', 'الثقافة والتقاليد', 5);

-- ============================================
-- LESSONS (50 Lessons - 5 per unit)
-- Videos from: https://www.youtube.com/@Arabently
-- ============================================

-- Unit 1: Greetings & Basic Phrases
INSERT INTO lessons (id, unit_id, lesson_number, title, title_ar, video_urls, content) VALUES
('22222222-0001-0001-0001-000000000001', '11111111-0001-0001-0001-000000000001', 1, 'Hello & Goodbye', 'هلا ومع السلامة', '["https://www.youtube.com/embed/KqHWtjLHBk0"]', 'Learn the most common ways to greet people and say goodbye in Saudi Arabic.'),
('22222222-0001-0001-0001-000000000002', '11111111-0001-0001-0001-000000000001', 2, 'How Are You?', 'كيفك؟ شلونك؟', '["https://www.youtube.com/embed/u_wxzZi9CpM"]', 'Master different ways to ask and respond to "How are you?" in Saudi dialect.'),
('22222222-0001-0001-0001-000000000003', '11111111-0001-0001-0001-000000000001', 3, 'Nice to Meet You', 'تشرفنا', '["https://www.youtube.com/embed/Ke9878-C2q0"]', 'Learn polite expressions for meeting someone new.'),
('22222222-0001-0001-0001-000000000004', '11111111-0001-0001-0001-000000000001', 4, 'Thank You & Please', 'شكراً ولو سمحت', '["https://www.youtube.com/embed/C70c12S4DZY"]', 'Essential polite expressions for daily interactions.'),
('22222222-0001-0001-0001-000000000005', '11111111-0001-0001-0001-000000000001', 5, 'Unit 1 Review', 'مراجعة الوحدة الأولى', '["https://www.youtube.com/embed/vE97942ic8s"]', 'Review and practice all greetings learned in Unit 1.');

-- Unit 2: Introducing Yourself
INSERT INTO lessons (id, unit_id, lesson_number, title, title_ar, video_urls, content) VALUES
('22222222-0001-0001-0001-000000000006', '11111111-0001-0001-0001-000000000002', 1, 'What''s Your Name?', 'شو اسمك؟', '["https://www.youtube.com/embed/C44hvXo3sOM"]', 'Learn to ask and share names in different contexts.'),
('22222222-0001-0001-0001-000000000007', '11111111-0001-0001-0001-000000000002', 2, 'Where Are You From?', 'من وين أنت؟', '["https://www.youtube.com/embed/9x-Juat7_es"]', 'Talk about countries, cities, and nationalities.'),
('22222222-0001-0001-0001-000000000008', '11111111-0001-0001-0001-000000000002', 3, 'What Do You Do?', 'وش شغلك؟', '["https://www.youtube.com/embed/9DsPdro8Udw"]', 'Discuss professions and occupations.'),
('22222222-0001-0001-0001-000000000009', '11111111-0001-0001-0001-000000000002', 4, 'How Old Are You?', 'كم عمرك؟', '["https://www.youtube.com/embed/XzN9sUdJVwc"]', 'Numbers and age expressions in Arabic.'),
('22222222-0001-0001-0001-000000000010', '11111111-0001-0001-0001-000000000002', 5, 'Full Introduction', 'تقديم كامل', '["https://www.youtube.com/embed/mhEvMzc4IZs"]', 'Put it all together - introduce yourself completely.');

-- Unit 3: Family & Relationships
INSERT INTO lessons (id, unit_id, lesson_number, title, title_ar, video_urls, content) VALUES
('22222222-0001-0001-0001-000000000011', '11111111-0001-0001-0001-000000000003', 1, 'Family Members', 'أفراد العائلة', '["https://www.youtube.com/embed/26mk0D4lwiI"]', 'Learn vocabulary for all family members.'),
('22222222-0001-0001-0001-000000000012', '11111111-0001-0001-0001-000000000003', 2, 'Describing People', 'وصف الناس', '["https://www.youtube.com/embed/5WtcrbHJnqY"]', 'Adjectives to describe appearance and personality.'),
('22222222-0001-0001-0001-000000000013', '11111111-0001-0001-0001-000000000003', 3, 'Married or Single?', 'متزوج ولا عزابي؟', '["https://www.youtube.com/embed/hnSELDgAWXA"]', 'Talk about marital status and relationships.'),
('22222222-0001-0001-0001-000000000014', '11111111-0001-0001-0001-000000000003', 4, 'Talking About Kids', 'الكلام عن العيال', '["https://www.youtube.com/embed/r9UfVceetuY"]', 'Discuss children, ages, and family size.'),
('22222222-0001-0001-0001-000000000015', '11111111-0001-0001-0001-000000000003', 5, 'Unit 3 Review', 'مراجعة الوحدة الثالثة', '["https://www.youtube.com/embed/KqHWtjLHBk0"]', 'Practice family conversations.');

-- Unit 4: Daily Routines
INSERT INTO lessons (id, unit_id, lesson_number, title, title_ar, video_urls, content) VALUES
('22222222-0001-0001-0001-000000000016', '11111111-0001-0001-0001-000000000004', 1, 'Morning Routine', 'روتين الصباح', '["https://www.youtube.com/embed/u_wxzZi9CpM"]', 'Describe what you do every morning.'),
('22222222-0001-0001-0001-000000000017', '11111111-0001-0001-0001-000000000004', 2, 'At Work', 'في الشغل', '["https://www.youtube.com/embed/Ke9878-C2q0"]', 'Talk about your workday activities.'),
('22222222-0001-0001-0001-000000000018', '11111111-0001-0001-0001-000000000004', 3, 'After Work', 'بعد الشغل', '["https://www.youtube.com/embed/C70c12S4DZY"]', 'Evening activities and relaxation.'),
('22222222-0001-0001-0001-000000000019', '11111111-0001-0001-0001-000000000004', 4, 'Weekend Plans', 'خطط نهاية الأسبوع', '["https://www.youtube.com/embed/vE97942ic8s"]', 'Discuss weekend activities and hobbies.'),
('22222222-0001-0001-0001-000000000020', '11111111-0001-0001-0001-000000000004', 5, 'Time Expressions', 'عبارات الوقت', '["https://www.youtube.com/embed/C44hvXo3sOM"]', 'Master time-related vocabulary.');

-- Unit 5: Food & Dining
INSERT INTO lessons (id, unit_id, lesson_number, title, title_ar, video_urls, content) VALUES
('22222222-0001-0001-0001-000000000021', '11111111-0001-0001-0001-000000000005', 1, 'Ordering Food', 'طلب الأكل', '["https://www.youtube.com/embed/9x-Juat7_es"]', 'Learn to order at restaurants.'),
('22222222-0001-0001-0001-000000000022', '11111111-0001-0001-0001-000000000005', 2, 'Saudi Dishes', 'الأكلات السعودية', '["https://www.youtube.com/embed/9DsPdro8Udw"]', 'Famous Saudi foods and how to describe them.'),
('22222222-0001-0001-0001-000000000023', '11111111-0001-0001-0001-000000000005', 3, 'At a Restaurant', 'في المطعم', '["https://www.youtube.com/embed/XzN9sUdJVwc"]', 'Complete restaurant dialogues.'),
('22222222-0001-0001-0001-000000000024', '11111111-0001-0001-0001-000000000005', 4, 'Coffee Culture', 'ثقافة القهوة', '["https://www.youtube.com/embed/mhEvMzc4IZs"]', 'Arabic coffee traditions and café vocabulary.'),
('22222222-0001-0001-0001-000000000025', '11111111-0001-0001-0001-000000000005', 5, 'Food Preferences', 'تفضيلات الأكل', '["https://www.youtube.com/embed/26mk0D4lwiI"]', 'Express likes, dislikes, and dietary needs.');

-- Unit 6: Shopping & Money
INSERT INTO lessons (id, unit_id, lesson_number, title, title_ar, video_urls, content) VALUES
('22222222-0001-0001-0001-000000000026', '11111111-0001-0001-0001-000000000006', 1, 'At the Market', 'في السوق', '["https://www.youtube.com/embed/5WtcrbHJnqY"]', 'Navigate traditional markets (souks).'),
('22222222-0001-0001-0001-000000000027', '11111111-0001-0001-0001-000000000006', 2, 'Prices & Numbers', 'الأسعار والأرقام', '["https://www.youtube.com/embed/hnSELDgAWXA"]', 'Ask about prices and understand numbers.'),
('22222222-0001-0001-0001-000000000028', '11111111-0001-0001-0001-000000000006', 3, 'Bargaining', 'المفاصلة', '["https://www.youtube.com/embed/r9UfVceetuY"]', 'The art of negotiating prices.'),
('22222222-0001-0001-0001-000000000029', '11111111-0001-0001-0001-000000000006', 4, 'Clothes Shopping', 'شراء الملابس', '["https://www.youtube.com/embed/KqHWtjLHBk0"]', 'Sizes, colors, and clothing vocabulary.'),
('22222222-0001-0001-0001-000000000030', '11111111-0001-0001-0001-000000000006', 5, 'Paying & Returns', 'الدفع والإرجاع', '["https://www.youtube.com/embed/u_wxzZi9CpM"]', 'Payment methods and return policies.');

-- Unit 7: Directions & Places
INSERT INTO lessons (id, unit_id, lesson_number, title, title_ar, video_urls, content) VALUES
('22222222-0001-0001-0001-000000000031', '11111111-0001-0001-0001-000000000007', 1, 'Asking for Directions', 'السؤال عن الطريق', '["https://www.youtube.com/embed/Ke9878-C2q0"]', 'Essential phrases for asking directions.'),
('22222222-0001-0001-0001-000000000032', '11111111-0001-0001-0001-000000000007', 2, 'Giving Directions', 'إعطاء الاتجاهات', '["https://www.youtube.com/embed/C70c12S4DZY"]', 'Learn to give clear directions.'),
('22222222-0001-0001-0001-000000000033', '11111111-0001-0001-0001-000000000007', 3, 'Transportation', 'المواصلات', '["https://www.youtube.com/embed/vE97942ic8s"]', 'Taxis, buses, and getting around.'),
('22222222-0001-0001-0001-000000000034', '11111111-0001-0001-0001-000000000007', 4, 'City Landmarks', 'معالم المدينة', '["https://www.youtube.com/embed/C44hvXo3sOM"]', 'Common places and landmarks.'),
('22222222-0001-0001-0001-000000000035', '11111111-0001-0001-0001-000000000007', 5, 'Navigation Practice', 'تمرين التنقل', '["https://www.youtube.com/embed/9x-Juat7_es"]', 'Practice real navigation scenarios.');

-- Unit 8: Health & Emergencies
INSERT INTO lessons (id, unit_id, lesson_number, title, title_ar, video_urls, content) VALUES
('22222222-0001-0001-0001-000000000036', '11111111-0001-0001-0001-000000000008', 1, 'Body Parts', 'أعضاء الجسم', '["https://www.youtube.com/embed/9DsPdro8Udw"]', 'Essential body vocabulary.'),
('22222222-0001-0001-0001-000000000037', '11111111-0001-0001-0001-000000000008', 2, 'Feeling Sick', 'لما تكون مريض', '["https://www.youtube.com/embed/XzN9sUdJVwc"]', 'Describe symptoms and how you feel.'),
('22222222-0001-0001-0001-000000000038', '11111111-0001-0001-0001-000000000008', 3, 'At the Doctor', 'عند الدكتور', '["https://www.youtube.com/embed/mhEvMzc4IZs"]', 'Medical visit conversations.'),
('22222222-0001-0001-0001-000000000039', '11111111-0001-0001-0001-000000000008', 4, 'At the Pharmacy', 'في الصيدلية', '["https://www.youtube.com/embed/26mk0D4lwiI"]', 'Get medicines and understand instructions.'),
('22222222-0001-0001-0001-000000000040', '11111111-0001-0001-0001-000000000008', 5, 'Emergency Phrases', 'عبارات الطوارئ', '["https://www.youtube.com/embed/5WtcrbHJnqY"]', 'Critical phrases for emergencies.');

-- Unit 9: Work & Business
INSERT INTO lessons (id, unit_id, lesson_number, title, title_ar, video_urls, content) VALUES
('22222222-0001-0001-0001-000000000041', '11111111-0001-0001-0001-000000000009', 1, 'Professions', 'المهن', '["https://www.youtube.com/embed/hnSELDgAWXA"]', 'Common jobs and career vocabulary.'),
('22222222-0001-0001-0001-000000000042', '11111111-0001-0001-0001-000000000009', 2, 'Office Vocabulary', 'مصطلحات المكتب', '["https://www.youtube.com/embed/r9UfVceetuY"]', 'Workplace items and activities.'),
('22222222-0001-0001-0001-000000000043', '11111111-0001-0001-0001-000000000009', 3, 'Business Meetings', 'اجتماعات العمل', '["https://www.youtube.com/embed/KqHWtjLHBk0"]', 'Formal business language.'),
('22222222-0001-0001-0001-000000000044', '11111111-0001-0001-0001-000000000009', 4, 'Phone Calls', 'المكالمات الهاتفية', '["https://www.youtube.com/embed/u_wxzZi9CpM"]', 'Professional phone etiquette.'),
('22222222-0001-0001-0001-000000000045', '11111111-0001-0001-0001-000000000009', 5, 'Networking', 'بناء العلاقات', '["https://www.youtube.com/embed/Ke9878-C2q0"]', 'Social and professional networking.');

-- Unit 10: Culture & Traditions
INSERT INTO lessons (id, unit_id, lesson_number, title, title_ar, video_urls, content) VALUES
('22222222-0001-0001-0001-000000000046', '11111111-0001-0001-0001-000000000010', 1, 'Saudi Traditions', 'التقاليد السعودية', '["https://www.youtube.com/embed/C70c12S4DZY"]', 'Core cultural practices and customs.'),
('22222222-0001-0001-0001-000000000047', '11111111-0001-0001-0001-000000000010', 2, 'Holidays & Celebrations', 'الأعياد والاحتفالات', '["https://www.youtube.com/embed/vE97942ic8s"]', 'Major holidays and how to celebrate.'),
('22222222-0001-0001-0001-000000000048', '11111111-0001-0001-0001-000000000010', 3, 'Hospitality', 'الضيافة', '["https://www.youtube.com/embed/C44hvXo3sOM"]', 'The famous Saudi hospitality customs.'),
('22222222-0001-0001-0001-000000000049', '11111111-0001-0001-0001-000000000010', 4, 'Social Etiquette', 'آداب المجتمع', '["https://www.youtube.com/embed/9x-Juat7_es"]', 'Do''s and don''ts in Saudi society.'),
('22222222-0001-0001-0001-000000000050', '11111111-0001-0001-0001-000000000010', 5, 'Course Finale', 'ختام الكورس', '["https://www.youtube.com/embed/9DsPdro8Udw"]', 'Celebrate your achievement and plan next steps!');

-- ============================================
-- SCRIPTS (Audio content for listening practice)
-- Using YouTube videos as audio sources
-- ============================================
INSERT INTO scripts (id, lesson_id, title, audio_url, script_text, type) VALUES
-- Unit 1
('33333333-0001-0001-0001-000000000001', '22222222-0001-0001-0001-000000000001', 'Greetings Dialogue 1', 'https://www.youtube.com/embed/XzN9sUdJVwc', 'هلا والله! - هلا فيك! كيفك؟ - الحمدلله بخير، وانت؟', 'dialogue'),
('33333333-0001-0001-0001-000000000002', '22222222-0001-0001-0001-000000000002', 'How Are You Practice', 'https://www.youtube.com/embed/mhEvMzc4IZs', 'كيف الحال؟ - تمام الحمدلله. شلونك؟ - ماشي الحال.', 'input'),
('33333333-0001-0001-0001-000000000003', '22222222-0001-0001-0001-000000000003', 'Meeting Someone New', 'https://www.youtube.com/embed/26mk0D4lwiI', 'تشرفنا. - العفو، التشرف لي. شو اسمك؟', 'dialogue'),
('33333333-0001-0001-0001-000000000004', '22222222-0001-0001-0001-000000000004', 'Polite Expressions', 'https://www.youtube.com/embed/5WtcrbHJnqY', 'شكراً جزيلاً. - العفو، ما سوينا شي. لو سمحت، وين المطعم؟', 'input'),

-- Unit 2
('33333333-0001-0001-0001-000000000005', '22222222-0001-0001-0001-000000000006', 'Name Exchange', 'https://www.youtube.com/embed/hnSELDgAWXA', 'شو اسمك؟ - اسمي أحمد، وانت؟ - اسمي سارة.', 'dialogue'),
('33333333-0001-0001-0001-000000000006', '22222222-0001-0001-0001-000000000007', 'Origin Conversation', 'https://www.youtube.com/embed/r9UfVceetuY', 'من وين انت؟ - أنا من الرياض. وانت من وين؟ - أنا من جدة.', 'dialogue'),
('33333333-0001-0001-0001-000000000007', '22222222-0001-0001-0001-000000000008', 'Job Discussion', 'https://www.youtube.com/embed/KqHWtjLHBk0', 'وش شغلك؟ - أنا مهندس. وانت وش تشتغل؟ - أنا دكتور.', 'dialogue'),

-- Unit 3
('33333333-0001-0001-0001-000000000008', '22222222-0001-0001-0001-000000000011', 'Family Introduction', 'https://www.youtube.com/embed/u_wxzZi9CpM', 'هذا أبوي وهذي أمي. عندي أخ واحد وأختين.', 'input'),
('33333333-0001-0001-0001-000000000009', '22222222-0001-0001-0001-000000000012', 'Describing Family', 'https://www.youtube.com/embed/Ke9878-C2q0', 'أختي طويلة وشعرها أسود. أخوي قصير بس قوي.', 'input'),

-- Unit 4
('33333333-0001-0001-0001-000000000010', '22222222-0001-0001-0001-000000000016', 'Morning Routine', 'https://www.youtube.com/embed/C70c12S4DZY', 'أصحى الساعة سبعة. أفطر وأشرب قهوة. بعدين أروح الشغل.', 'input'),
('33333333-0001-0001-0001-000000000011', '22222222-0001-0001-0001-000000000017', 'Work Day', 'https://www.youtube.com/embed/vE97942ic8s', 'أوصل المكتب الساعة تسعة. أشتغل لين الساعة خمسة.', 'input'),

-- Unit 5
('33333333-0001-0001-0001-000000000012', '22222222-0001-0001-0001-000000000021', 'Restaurant Order', 'https://www.youtube.com/embed/C44hvXo3sOM', 'أبي كبسة لو سمحت. - حاضر، تبي شي ثاني؟ - لا شكراً، بس كذا.', 'dialogue'),
('33333333-0001-0001-0001-000000000013', '22222222-0001-0001-0001-000000000024', 'Coffee Shop', 'https://www.youtube.com/embed/9x-Juat7_es', 'أعطني قهوة عربية. - تبيها سادة ولا بهيل؟ - بهيل لو سمحت.', 'dialogue'),

-- Unit 6
('33333333-0001-0001-0001-000000000014', '22222222-0001-0001-0001-000000000026', 'Market Shopping', 'https://www.youtube.com/embed/9DsPdro8Udw', 'بكم هذا؟ - هذا بخمسين ريال. - غالي! أعطيك أربعين.', 'dialogue'),
('33333333-0001-0001-0001-000000000015', '22222222-0001-0001-0001-000000000028', 'Bargaining Practice', 'https://www.youtube.com/embed/XzN9sUdJVwc', 'آخر سعر؟ - طيب خمسة وأربعين. - تم، خلاص.', 'dialogue'),

-- Unit 7
('33333333-0001-0001-0001-000000000016', '22222222-0001-0001-0001-000000000031', 'Asking Directions', 'https://www.youtube.com/embed/mhEvMzc4IZs', 'وين المطار؟ - روح على طول، بعدين لف يمين.', 'dialogue'),
('33333333-0001-0001-0001-000000000017', '22222222-0001-0001-0001-000000000033', 'Taking a Taxi', 'https://www.youtube.com/embed/26mk0D4lwiI', 'وديني البرج الكبير. - إن شاء الله. الطريق زحمة شوي.', 'dialogue'),

-- Unit 8
('33333333-0001-0001-0001-000000000018', '22222222-0001-0001-0001-000000000037', 'Feeling Sick', 'https://www.youtube.com/embed/5WtcrbHJnqY', 'وش فيك؟ - عندي صداع قوي وحرارة. - لازم تروح الدكتور.', 'dialogue'),
('33333333-0001-0001-0001-000000000019', '22222222-0001-0001-0001-000000000038', 'At the Doctor', 'https://www.youtube.com/embed/hnSELDgAWXA', 'وش تحس؟ - عندي ألم في بطني. - من متى؟ - من أمس.', 'dialogue'),

-- Unit 9
('33333333-0001-0001-0001-000000000020', '22222222-0001-0001-0001-000000000043', 'Business Meeting', 'https://www.youtube.com/embed/r9UfVceetuY', 'نبدأ الاجتماع؟ - أي، تفضل. موضوعنا اليوم المشروع الجديد.', 'dialogue'),
('33333333-0001-0001-0001-000000000021', '22222222-0001-0001-0001-000000000044', 'Phone Call', 'https://www.youtube.com/embed/KqHWtjLHBk0', 'آلو، السلام عليكم. - وعليكم السلام. معك مين؟', 'dialogue'),

-- Unit 10
('33333333-0001-0001-0001-000000000022', '22222222-0001-0001-0001-000000000048', 'Hospitality', 'https://www.youtube.com/embed/u_wxzZi9CpM', 'أهلاً وسهلاً! تفضل اجلس. - شكراً، الله يعطيك العافية.', 'dialogue'),
('33333333-0001-0001-0001-000000000023', '22222222-0001-0001-0001-000000000050', 'Final Dialogue', 'https://www.youtube.com/embed/Ke9878-C2q0', 'مبروك! خلصت الكورس! - شكراً! كانت رحلة حلوة.', 'dialogue');

-- ============================================
-- ROADMAP STEPS (The Next Step system)
-- ============================================
INSERT INTO roadmap_steps (id, course_id, step_order, step_type, lesson_id, script_id, description) VALUES
-- Unit 1 Steps
('44444444-0001-0001-0001-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 1, 'lesson', '22222222-0001-0001-0001-000000000001', NULL, 'Watch: Hello & Goodbye'),
('44444444-0001-0001-0001-000000000002', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 2, 'script', NULL, '33333333-0001-0001-0001-000000000001', 'Listen: Greetings Dialogue'),
('44444444-0001-0001-0001-000000000003', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 3, 'lesson', '22222222-0001-0001-0001-000000000002', NULL, 'Watch: How Are You?'),
('44444444-0001-0001-0001-000000000004', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 4, 'script', NULL, '33333333-0001-0001-0001-000000000002', 'Listen: How Are You Practice'),
('44444444-0001-0001-0001-000000000005', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 5, 'review_script', NULL, '33333333-0001-0001-0001-000000000001', 'Review: Greetings Dialogue'),
('44444444-0001-0001-0001-000000000006', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 6, 'lesson', '22222222-0001-0001-0001-000000000003', NULL, 'Watch: Nice to Meet You'),
('44444444-0001-0001-0001-000000000007', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 7, 'script', NULL, '33333333-0001-0001-0001-000000000003', 'Listen: Meeting Someone New'),
('44444444-0001-0001-0001-000000000008', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 8, 'lesson', '22222222-0001-0001-0001-000000000004', NULL, 'Watch: Thank You & Please'),
('44444444-0001-0001-0001-000000000009', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 9, 'script', NULL, '33333333-0001-0001-0001-000000000004', 'Listen: Polite Expressions'),
('44444444-0001-0001-0001-000000000010', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 10, 'review_script', NULL, '33333333-0001-0001-0001-000000000002', 'Review: How Are You Practice'),
('44444444-0001-0001-0001-000000000011', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 11, 'lesson', '22222222-0001-0001-0001-000000000005', NULL, 'Watch: Unit 1 Review'),

-- Unit 2 Steps
('44444444-0001-0001-0001-000000000012', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 12, 'lesson', '22222222-0001-0001-0001-000000000006', NULL, 'Watch: What''s Your Name?'),
('44444444-0001-0001-0001-000000000013', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 13, 'script', NULL, '33333333-0001-0001-0001-000000000005', 'Listen: Name Exchange'),
('44444444-0001-0001-0001-000000000014', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 14, 'lesson', '22222222-0001-0001-0001-000000000007', NULL, 'Watch: Where Are You From?'),
('44444444-0001-0001-0001-000000000015', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 15, 'script', NULL, '33333333-0001-0001-0001-000000000006', 'Listen: Origin Conversation'),
('44444444-0001-0001-0001-000000000016', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 16, 'review_script', NULL, '33333333-0001-0001-0001-000000000003', 'Review: Meeting Someone New'),
('44444444-0001-0001-0001-000000000017', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 17, 'review_script', NULL, '33333333-0001-0001-0001-000000000005', 'Review: Name Exchange'),
('44444444-0001-0001-0001-000000000018', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 18, 'lesson', '22222222-0001-0001-0001-000000000008', NULL, 'Watch: What Do You Do?'),
('44444444-0001-0001-0001-000000000019', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 19, 'script', NULL, '33333333-0001-0001-0001-000000000007', 'Listen: Job Discussion'),
('44444444-0001-0001-0001-000000000020', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 20, 'lesson', '22222222-0001-0001-0001-000000000009', NULL, 'Watch: How Old Are You?'),
('44444444-0001-0001-0001-000000000021', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 21, 'review_script', NULL, '33333333-0001-0001-0001-000000000006', 'Review: Origin Conversation'),
('44444444-0001-0001-0001-000000000022', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 22, 'lesson', '22222222-0001-0001-0001-000000000010', NULL, 'Watch: Full Introduction'),

-- Unit 3 Steps
('44444444-0001-0001-0001-000000000023', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 23, 'lesson', '22222222-0001-0001-0001-000000000011', NULL, 'Watch: Family Members'),
('44444444-0001-0001-0001-000000000024', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 24, 'script', NULL, '33333333-0001-0001-0001-000000000008', 'Listen: Family Introduction'),
('44444444-0001-0001-0001-000000000025', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 25, 'lesson', '22222222-0001-0001-0001-000000000012', NULL, 'Watch: Describing People'),
('44444444-0001-0001-0001-000000000026', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 26, 'script', NULL, '33333333-0001-0001-0001-000000000009', 'Listen: Describing Family'),
('44444444-0001-0001-0001-000000000027', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 27, 'review_script', NULL, '33333333-0001-0001-0001-000000000007', 'Review: Job Discussion'),
('44444444-0001-0001-0001-000000000028', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 28, 'lesson', '22222222-0001-0001-0001-000000000013', NULL, 'Watch: Married or Single?'),
('44444444-0001-0001-0001-000000000029', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 29, 'lesson', '22222222-0001-0001-0001-000000000014', NULL, 'Watch: Talking About Kids'),
('44444444-0001-0001-0001-000000000030', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 30, 'review_script', NULL, '33333333-0001-0001-0001-000000000008', 'Review: Family Introduction'),
('44444444-0001-0001-0001-000000000031', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 31, 'lesson', '22222222-0001-0001-0001-000000000015', NULL, 'Watch: Unit 3 Review'),

-- Unit 4 Steps
('44444444-0001-0001-0001-000000000032', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 32, 'lesson', '22222222-0001-0001-0001-000000000016', NULL, 'Watch: Morning Routine'),
('44444444-0001-0001-0001-000000000033', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 33, 'script', NULL, '33333333-0001-0001-0001-000000000010', 'Listen: Morning Routine Audio'),
('44444444-0001-0001-0001-000000000034', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 34, 'lesson', '22222222-0001-0001-0001-000000000017', NULL, 'Watch: At Work'),
('44444444-0001-0001-0001-000000000035', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 35, 'script', NULL, '33333333-0001-0001-0001-000000000011', 'Listen: Work Day Audio'),
('44444444-0001-0001-0001-000000000036', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 36, 'lesson', '22222222-0001-0001-0001-000000000018', NULL, 'Watch: After Work'),
('44444444-0001-0001-0001-000000000037', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 37, 'review_script', NULL, '33333333-0001-0001-0001-000000000010', 'Review: Morning Routine'),
('44444444-0001-0001-0001-000000000038', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 38, 'lesson', '22222222-0001-0001-0001-000000000019', NULL, 'Watch: Weekend Plans'),
('44444444-0001-0001-0001-000000000039', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 39, 'lesson', '22222222-0001-0001-0001-000000000020', NULL, 'Watch: Time Expressions'),

-- Unit 5 Steps
('44444444-0001-0001-0001-000000000040', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 40, 'lesson', '22222222-0001-0001-0001-000000000021', NULL, 'Watch: Ordering Food'),
('44444444-0001-0001-0001-000000000041', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 41, 'script', NULL, '33333333-0001-0001-0001-000000000012', 'Listen: Restaurant Order'),
('44444444-0001-0001-0001-000000000042', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 42, 'lesson', '22222222-0001-0001-0001-000000000022', NULL, 'Watch: Saudi Dishes'),
('44444444-0001-0001-0001-000000000043', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 43, 'lesson', '22222222-0001-0001-0001-000000000023', NULL, 'Watch: At a Restaurant'),
('44444444-0001-0001-0001-000000000044', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 44, 'review_script', NULL, '33333333-0001-0001-0001-000000000012', 'Review: Restaurant Order'),
('44444444-0001-0001-0001-000000000045', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 45, 'lesson', '22222222-0001-0001-0001-000000000024', NULL, 'Watch: Coffee Culture'),
('44444444-0001-0001-0001-000000000046', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 46, 'script', NULL, '33333333-0001-0001-0001-000000000013', 'Listen: Coffee Shop'),
('44444444-0001-0001-0001-000000000047', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 47, 'lesson', '22222222-0001-0001-0001-000000000025', NULL, 'Watch: Food Preferences'),

-- Unit 6 Steps
('44444444-0001-0001-0001-000000000048', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 48, 'lesson', '22222222-0001-0001-0001-000000000026', NULL, 'Watch: At the Market'),
('44444444-0001-0001-0001-000000000049', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 49, 'script', NULL, '33333333-0001-0001-0001-000000000014', 'Listen: Market Shopping'),
('44444444-0001-0001-0001-000000000050', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 50, 'lesson', '22222222-0001-0001-0001-000000000027', NULL, 'Watch: Prices & Numbers'),
('44444444-0001-0001-0001-000000000051', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 51, 'lesson', '22222222-0001-0001-0001-000000000028', NULL, 'Watch: Bargaining'),
('44444444-0001-0001-0001-000000000052', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 52, 'script', NULL, '33333333-0001-0001-0001-000000000015', 'Listen: Bargaining Practice'),
('44444444-0001-0001-0001-000000000053', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 53, 'review_script', NULL, '33333333-0001-0001-0001-000000000014', 'Review: Market Shopping'),
('44444444-0001-0001-0001-000000000054', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 54, 'lesson', '22222222-0001-0001-0001-000000000029', NULL, 'Watch: Clothes Shopping'),
('44444444-0001-0001-0001-000000000055', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 55, 'lesson', '22222222-0001-0001-0001-000000000030', NULL, 'Watch: Paying & Returns'),

-- Unit 7 Steps  
('44444444-0001-0001-0001-000000000056', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 56, 'lesson', '22222222-0001-0001-0001-000000000031', NULL, 'Watch: Asking for Directions'),
('44444444-0001-0001-0001-000000000057', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 57, 'script', NULL, '33333333-0001-0001-0001-000000000016', 'Listen: Asking Directions'),
('44444444-0001-0001-0001-000000000058', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 58, 'lesson', '22222222-0001-0001-0001-000000000032', NULL, 'Watch: Giving Directions'),
('44444444-0001-0001-0001-000000000059', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 59, 'lesson', '22222222-0001-0001-0001-000000000033', NULL, 'Watch: Transportation'),
('44444444-0001-0001-0001-000000000060', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 60, 'script', NULL, '33333333-0001-0001-0001-000000000017', 'Listen: Taking a Taxi'),
('44444444-0001-0001-0001-000000000061', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 61, 'review_script', NULL, '33333333-0001-0001-0001-000000000016', 'Review: Asking Directions'),
('44444444-0001-0001-0001-000000000062', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 62, 'lesson', '22222222-0001-0001-0001-000000000034', NULL, 'Watch: City Landmarks'),
('44444444-0001-0001-0001-000000000063', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 63, 'lesson', '22222222-0001-0001-0001-000000000035', NULL, 'Watch: Navigation Practice'),

-- Unit 8 Steps
('44444444-0001-0001-0001-000000000064', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 64, 'lesson', '22222222-0001-0001-0001-000000000036', NULL, 'Watch: Body Parts'),
('44444444-0001-0001-0001-000000000065', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 65, 'lesson', '22222222-0001-0001-0001-000000000037', NULL, 'Watch: Feeling Sick'),
('44444444-0001-0001-0001-000000000066', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 66, 'script', NULL, '33333333-0001-0001-0001-000000000018', 'Listen: Feeling Sick'),
('44444444-0001-0001-0001-000000000067', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 67, 'lesson', '22222222-0001-0001-0001-000000000038', NULL, 'Watch: At the Doctor'),
('44444444-0001-0001-0001-000000000068', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 68, 'script', NULL, '33333333-0001-0001-0001-000000000019', 'Listen: At the Doctor'),
('44444444-0001-0001-0001-000000000069', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 69, 'review_script', NULL, '33333333-0001-0001-0001-000000000018', 'Review: Feeling Sick'),
('44444444-0001-0001-0001-000000000070', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 70, 'lesson', '22222222-0001-0001-0001-000000000039', NULL, 'Watch: At the Pharmacy'),
('44444444-0001-0001-0001-000000000071', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 71, 'lesson', '22222222-0001-0001-0001-000000000040', NULL, 'Watch: Emergency Phrases'),

-- Unit 9 Steps
('44444444-0001-0001-0001-000000000072', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 72, 'lesson', '22222222-0001-0001-0001-000000000041', NULL, 'Watch: Professions'),
('44444444-0001-0001-0001-000000000073', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 73, 'lesson', '22222222-0001-0001-0001-000000000042', NULL, 'Watch: Office Vocabulary'),
('44444444-0001-0001-0001-000000000074', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 74, 'lesson', '22222222-0001-0001-0001-000000000043', NULL, 'Watch: Business Meetings'),
('44444444-0001-0001-0001-000000000075', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 75, 'script', NULL, '33333333-0001-0001-0001-000000000020', 'Listen: Business Meeting'),
('44444444-0001-0001-0001-000000000076', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 76, 'lesson', '22222222-0001-0001-0001-000000000044', NULL, 'Watch: Phone Calls'),
('44444444-0001-0001-0001-000000000077', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 77, 'script', NULL, '33333333-0001-0001-0001-000000000021', 'Listen: Phone Call'),
('44444444-0001-0001-0001-000000000078', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 78, 'review_script', NULL, '33333333-0001-0001-0001-000000000020', 'Review: Business Meeting'),
('44444444-0001-0001-0001-000000000079', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 79, 'lesson', '22222222-0001-0001-0001-000000000045', NULL, 'Watch: Networking'),

-- Unit 10 Steps
('44444444-0001-0001-0001-000000000080', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 80, 'lesson', '22222222-0001-0001-0001-000000000046', NULL, 'Watch: Saudi Traditions'),
('44444444-0001-0001-0001-000000000081', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 81, 'lesson', '22222222-0001-0001-0001-000000000047', NULL, 'Watch: Holidays & Celebrations'),
('44444444-0001-0001-0001-000000000082', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 82, 'lesson', '22222222-0001-0001-0001-000000000048', NULL, 'Watch: Hospitality'),
('44444444-0001-0001-0001-000000000083', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 83, 'script', NULL, '33333333-0001-0001-0001-000000000022', 'Listen: Hospitality'),
('44444444-0001-0001-0001-000000000084', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 84, 'lesson', '22222222-0001-0001-0001-000000000049', NULL, 'Watch: Social Etiquette'),
('44444444-0001-0001-0001-000000000085', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 85, 'lesson', '22222222-0001-0001-0001-000000000050', NULL, 'Watch: Course Finale'),
('44444444-0001-0001-0001-000000000086', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 86, 'script', NULL, '33333333-0001-0001-0001-000000000023', 'Listen: Final Dialogue');

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
-- Seed data loaded successfully!
-- Course: Foundational Arabic
-- Units: 10
-- Lessons: 50 (with YouTube videos)
-- Scripts: 23 (with YouTube audio sources)
-- Roadmap Steps: 86
--
-- Videos from: https://www.youtube.com/@Arabently
