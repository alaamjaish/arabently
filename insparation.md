<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>استوديو الذكاء الاصطناعي</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body class="bg-[#0f172a] min-h-screen text-white overflow-x-hidden">
    <!-- Background Orbs -->
    <div class="orb-1"></div>
    <div class="orb-2"></div>

    <!-- Landing Page -->
    <div id="landing-page" class="landing-page min-h-screen flex flex-col relative z-10">
        <!-- Header -->
        <header class="p-6 md:p-8">
            <div class="flex items-center gap-3 stagger-1">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center shadow-lg">
                    <span class="text-white font-bold text-lg">A</span>
                </div>
                <span class="text-white font-semibold text-lg">AI Studio</span>
            </div>
        </header>

        <!-- Hero Section -->
        <main class="flex-1 flex flex-col items-center justify-center px-6 text-center -mt-16">
            <!-- Badge -->
            <div class="stagger-1 mb-6">
                <span class="px-4 py-2 rounded-full glass text-green-400 text-sm border border-green-500/20">
                    مدعوم بـ Gemini 3 pro
                </span>
            </div>

            <!-- Main Headline -->
            <h1 class="stagger-2 text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                <span class="gradient-text">حوّل أفكارك</span>
                <br>
                <span class="text-white">إلى صور مذهلة</span>
            </h1>

            <!-- Subheadline -->
            <p class="stagger-3 text-slate-400 text-lg md:text-xl max-w-2xl mb-6 leading-relaxed">
                استوديو ذكاء اصطناعي متكامل لتصوير المنتجات، تحويل الرسومات، وإنشاء صور شخصية احترافية
            </p>
        </main>

        <!-- Features Section -->
        <section class="px-6 pb-8">
            <div class="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
                <!-- Feature 1 -->
                <div class="feature-card glass rounded-2xl p-6 text-center transition-all duration-300 hover:border-green-500/20 stagger-3">
                    <div class="feature-icon w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-400/20 flex items-center justify-center">
                        <svg class="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                        </svg>
                    </div>
                    <h3 class="text-white font-semibold text-lg mb-2">استوديو المنتجات</h3>
                    <p class="text-slate-500 text-sm leading-relaxed">ارفع صورة منتجك واحصل على تصوير احترافي بخلفيات مذهلة</p>
                </div>

                <!-- Feature 2 -->
                <div class="feature-card glass rounded-2xl p-6 text-center transition-all duration-300 hover:border-green-500/20 stagger-4">
                    <div class="feature-icon w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-400/20 flex items-center justify-center">
                        <svg class="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                        </svg>
                    </div>
                    <h3 class="text-white font-semibold text-lg mb-2">من رسمة إلى حقيقة</h3>
                    <p class="text-slate-500 text-sm leading-relaxed">ارسم فكرتك وحوّلها إلى صورة واقعية بأنماط فنية متعددة</p>
                </div>

                <!-- Feature 3 -->
                <div class="feature-card glass rounded-2xl p-6 text-center transition-all duration-300 hover:border-green-500/20 stagger-5">
                    <div class="feature-icon w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-400/20 flex items-center justify-center">
                        <svg class="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                    </div>
                    <h3 class="text-white font-semibold text-lg mb-2">مختبر الشخصيات</h3>
                    <p class="text-slate-500 text-sm leading-relaxed">حوّل صورتك الشخصية إلى أنماط فنية مثل أنمي، 3D، وغيرها</p>
                </div>
            </div>
        </section>

        <!-- How to Use Section -->
        <section class="px-6 pb-12">
            <div class="max-w-3xl mx-auto">
                <div id="landing-howto-card" class="glass rounded-2xl p-8">
                    <h2 class="text-2xl font-bold text-white mb-6 text-center">
                        <span class="gradient-text">كيف تبدأ؟</span>
                    </h2>

                    <!-- Steps -->
                    <div class="space-y-4">
                        <!-- Step 1 -->
                        <div class="flex gap-4 items-start">
                            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center text-white font-bold text-sm">
                                1
                            </div>
                            <div class="flex-1">
                                <h3 class="text-white font-semibold mb-1">افتح Google AI Studio</h3>
                                <p class="text-slate-400 text-sm leading-relaxed">
                                    انتقل إلى
                                    <a href="https://aistudio.google.com" target="_blank" class="text-green-400 hover:text-green-300 underline">aistudio.google.com</a>
                                    وسجّل الدخول بحساب Google الخاص بك
                                </p>
                            </div>
                        </div>

                        <!-- Step 2 -->
                        <div class="flex gap-4 items-start">
                            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center text-white font-bold text-sm">
                                2
                            </div>
                            <div class="flex-1">
                                <h3 class="text-white font-semibold mb-1">احصل على مفتاح API</h3>
                                <p class="text-slate-400 text-sm leading-relaxed">
                                    اضغط على "Get API key" في القائمة اليسرى، ثم اضغط "Create API key" لإنشاء مفتاح جديد
                                </p>
                            </div>
                        </div>

                        <!-- Step 3 -->
                        <div class="flex gap-4 items-start">
                            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center text-white font-bold text-sm">
                                3
                            </div>
                            <div class="flex-1">
                                <h3 class="text-white font-semibold mb-1">فعّل الفوترة (مهم جداً!)</h3>
                                <p class="text-slate-400 text-sm leading-relaxed">
                                    Gemini 2.5 Flash يتطلب فوترة مفعّلة. ستحصل على $300 كرصيد مجاني لأول 90 يوم
                                </p>
                            </div>
                        </div>

                        <!-- Step 4 -->
                        <div class="flex gap-4 items-start">
                            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center text-white font-bold text-sm">
                                4
                            </div>
                            <div class="flex-1">
                                <h3 class="text-white font-semibold mb-1">انسخ المفتاح وأدخله في التطبيق</h3>
                                <p class="text-slate-400 text-sm leading-relaxed">
                                    انسخ مفتاح API المُنشأ، ثم اضغط على ⚙️ الإعدادات في التطبيق والصق المفتاح
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Note -->
                    <div class="mt-6 p-4 rounded-xl bg-slate-800/50 border border-white/5">
                        <p class="text-slate-500 text-xs text-center">
                            <svg class="w-4 h-4 inline-block ml-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                            </svg>
                            مفتاح API يُحفظ محلياً في متصفحك فقط ولا يُرسل لأي خادم خارجي
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="px-6 pb-16 text-center">
            <!-- CTA Button -->
            <button onclick="enterApp()" class="group inline-flex items-center gap-3 py-4 px-10 bg-gradient-to-l from-emerald-500 to-green-400 rounded-2xl font-semibold text-white text-lg glow-pulse transition-all duration-300 hover:scale-105">
                <span>ابدأ الآن</span>
                <svg class="w-5 h-5 rotate-180 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
            </button>

            <!-- Quick Stats -->
            <div class="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-8 text-sm text-slate-500">
                <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    <span>دقة 4K</span>
                </div>
                <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    <span>نتائج فورية</span>
                </div>
                <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    <span>عربي بالكامل</span>
                </div>
            </div>
        </section>
    </div>

    <!-- App Container (Hidden Initially) -->
    <div id="app-container" class="app-container">
        <!-- Sidebar -->
        <aside class="fixed right-0 top-0 h-full w-20 glass flex flex-col items-center py-6 z-50">
            <!-- Logo -->
            <div onclick="goToLanding()" title="العودة للرئيسية" class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center mb-8 shadow-lg neon-glow cursor-pointer transition-all duration-300 hover:scale-110">
                <span class="text-white font-bold text-xl">A</span>
            </div>

            <!-- Navigation -->
            <nav class="flex-1 flex flex-col items-center gap-4 mt-4">
                <!-- Product Studio -->
                <button onclick="switchTab('product')" id="nav-product" class="nav-btn relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-green-500/20 nav-active bg-green-500/10">
                    <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                    </svg>
                </button>

                <!-- Sketch to Life -->
                <button onclick="switchTab('sketch')" id="nav-sketch" class="nav-btn relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-green-500/20">
                    <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                    </svg>
                </button>

                <!-- Avatar Lab -->
                <button onclick="switchTab('avatar')" id="nav-avatar" class="nav-btn relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-green-500/20">
                    <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                </button>
            </nav>

            <!-- Settings -->
            <button onclick="openSettings()" class="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-slate-700/50">
                <svg class="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
            </button>
        </aside>

        <!-- Main Content -->
        <main class="mr-20 min-h-screen p-6 md:p-8 lg:p-12 relative z-10">
            <!-- Product Studio Tab -->
            <div id="tab-product" class="tab-content active fade-in">
                <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
                    <span class="gradient-text">استوديو المنتجات</span>
                </h1>

                <div class="grid lg:grid-cols-2 gap-6">
                    <!-- Upload Section -->
                    <div class="glass rounded-2xl p-6">
                        <h2 class="text-xl font-semibold text-white mb-4">رفع صورة المنتج</h2>

                        <!-- Drop Zone -->
                        <div id="product-dropzone" class="border-2 border-dashed border-green-500/30 rounded-xl p-8 text-center cursor-pointer transition-all duration-300 hover:border-green-500/60 pulse-border">
                            <input type="file" id="product-file" accept="image/*" class="hidden">
                            <div id="product-preview-container" class="hidden">
                                <img id="product-preview" class="max-h-48 mx-auto rounded-lg mb-4" alt="Preview">
                                <button onclick="clearProductUpload()" class="text-red-400 hover:text-red-300 text-sm">إزالة الصورة</button>
                            </div>
                            <div id="product-upload-placeholder">
                                <svg class="w-12 h-12 mx-auto text-green-500/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                                </svg>
                                <p class="text-slate-400 mb-2">اسحب وأفلت الصورة هنا</p>
                                <p class="text-slate-500 text-sm">أو انقر للاختيار</p>
                            </div>
                        </div>
                    </div>

                    <!-- Scene Description -->
                    <div class="glass rounded-2xl p-6">
                        <h2 class="text-xl font-semibold text-white mb-4">وصف المشهد</h2>

                        <textarea id="product-prompt" rows="4" placeholder="صف المشهد الذي تريد وضع المنتج فيه..." class="w-full bg-slate-800/50 border border-white/10 rounded-xl p-4 text-white placeholder-slate-500 resize-none input-glow focus:outline-none transition-all duration-300"></textarea>

                        <!-- Quick Prompts -->
                        <div class="flex flex-wrap gap-2 mt-4">
                            <button onclick="updatePrompt('على طاولة رخامية بيضاء فاخرة مع إضاءة استوديو احترافية')" class="px-3 py-1 rounded-full bg-slate-700/50 hover:bg-green-500/30 text-green-300 text-sm border border-white/10 transition">رخام أبيض</button>
                            <button onclick="updatePrompt('في الطبيعة الخضراء مع ضوء الشمس الذهبي')" class="px-3 py-1 rounded-full bg-slate-700/50 hover:bg-green-500/30 text-green-300 text-sm border border-white/10 transition">طبيعة</button>
                            <button onclick="updatePrompt('خلفية متدرجة حديثة باللون الأزرق والأخضر')" class="px-3 py-1 rounded-full bg-slate-700/50 hover:bg-green-500/30 text-green-300 text-sm border border-white/10 transition">متدرج</button>
                            <button onclick="updatePrompt('على رمال الشاطئ الذهبية مع موج البحر')" class="px-3 py-1 rounded-full bg-slate-700/50 hover:bg-green-500/30 text-green-300 text-sm border border-white/10 transition">شاطئ</button>
                        </div>

                        <!-- Generate Button -->
                        <button onclick="generateProduct()" class="w-full mt-6 py-3 px-6 bg-gradient-to-l from-emerald-500 to-green-400 rounded-xl font-semibold text-white neon-glow transition-all duration-300 hover:opacity-90">
                            توليد الصورة
                        </button>
                    </div>
                </div>

                <!-- Result Section -->
                <div id="product-result" class="hidden mt-6 glass rounded-2xl p-6 fade-in">
                    <h2 class="text-xl font-semibold text-white mb-4">النتيجة</h2>
                    <img id="product-result-img" class="max-w-full rounded-xl mx-auto" alt="Generated">
                    <button onclick="downloadResult('product-result-img')" class="mt-4 py-2 px-6 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl text-white border border-white/10 transition-all duration-300 neon-glow">
                        <span class="flex items-center gap-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                            </svg>
                            تحميل الصورة
                        </span>
                    </button>
                </div>
            </div>

            <!-- Sketch to Life Tab -->
            <div id="tab-sketch" class="tab-content fade-in">
                <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
                    <span class="gradient-text">من رسمة إلى حقيقة</span>
                </h1>

                <div class="grid lg:grid-cols-3 gap-6">
                    <!-- Canvas Section -->
                    <div class="lg:col-span-2 glass rounded-2xl p-6">
                        <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
                            <h2 class="text-xl font-semibold text-white">لوحة الرسم</h2>

                            <!-- Drawing Tools -->
                            <div class="flex items-center gap-4">
                                <!-- Color Picker -->
                                <div class="flex items-center gap-2">
                                    <label class="text-slate-400 text-sm">اللون:</label>
                                    <input type="color" id="brush-color" value="#000000" class="w-8 h-8 rounded cursor-pointer border-none bg-transparent">
                                </div>

                                <!-- Brush Size -->
                                <div class="flex items-center gap-2">
                                    <label class="text-slate-400 text-sm">الحجم:</label>
                                    <input type="range" id="brush-size" min="1" max="50" value="5" class="w-24">
                                    <span id="brush-size-value" class="text-green-400 text-sm w-6">5</span>
                                </div>
                            </div>
                        </div>

                        <!-- Canvas -->
                        <div class="canvas-container bg-white rounded-xl overflow-hidden">
                            <canvas id="sketch-canvas" class="w-full cursor-crosshair"></canvas>
                        </div>

                        <!-- Canvas Actions -->
                        <div class="flex gap-3 mt-4">
                            <button onclick="undoCanvas()" class="py-2 px-4 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl text-white border border-white/10 transition-all duration-300">
                                <span class="flex items-center gap-2">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
                                    </svg>
                                    تراجع
                                </span>
                            </button>
                            <button onclick="clearCanvas()" class="py-2 px-4 bg-red-500/20 hover:bg-red-500/30 rounded-xl text-red-400 border border-red-500/20 transition-all duration-300">
                                <span class="flex items-center gap-2">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                    </svg>
                                    مسح
                                </span>
                            </button>
                        </div>
                    </div>

                    <!-- Style Selection -->
                    <div class="glass rounded-2xl p-6">
                        <h2 class="text-xl font-semibold text-white mb-4">اختر النمط</h2>

                        <div class="grid grid-cols-2 gap-3" id="style-grid">
                            <button onclick="selectStyle('3d-render')" data-style="3d-render" class="style-card py-3 px-4 bg-slate-800/50 hover:bg-green-500/20 rounded-xl text-slate-300 border border-white/10 transition-all duration-300 neon-glow text-sm">
                                تصيير ثلاثي الأبعاد
                            </button>
                            <button onclick="selectStyle('oil-paint')" data-style="oil-paint" class="style-card py-3 px-4 bg-slate-800/50 hover:bg-green-500/20 rounded-xl text-slate-300 border border-white/10 transition-all duration-300 neon-glow text-sm">
                                رسم زيتي
                            </button>
                            <button onclick="selectStyle('watercolor')" data-style="watercolor" class="style-card py-3 px-4 bg-slate-800/50 hover:bg-green-500/20 rounded-xl text-slate-300 border border-white/10 transition-all duration-300 neon-glow text-sm">
                                ألوان مائية
                            </button>
                            <button onclick="selectStyle('digital-art')" data-style="digital-art" class="style-card py-3 px-4 bg-slate-800/50 hover:bg-green-500/20 rounded-xl text-slate-300 border border-white/10 transition-all duration-300 neon-glow text-sm">
                                فن رقمي
                            </button>
                            <button onclick="selectStyle('pencil')" data-style="pencil" class="style-card py-3 px-4 bg-slate-800/50 hover:bg-green-500/20 rounded-xl text-slate-300 border border-white/10 transition-all duration-300 neon-glow text-sm">
                                رصاص
                            </button>
                            <button onclick="selectStyle('cyberpunk')" data-style="cyberpunk" class="style-card py-3 px-4 bg-slate-800/50 hover:bg-green-500/20 rounded-xl text-slate-300 border border-white/10 transition-all duration-300 neon-glow text-sm">
                                سايبربانك
                            </button>
                            <button onclick="selectStyle('anime')" data-style="anime" class="style-card py-3 px-4 bg-slate-800/50 hover:bg-green-500/20 rounded-xl text-slate-300 border border-white/10 transition-all duration-300 neon-glow text-sm">
                                أنمي
                            </button>
                            <button onclick="selectStyle('realistic')" data-style="realistic" class="style-card py-3 px-4 bg-slate-800/50 hover:bg-green-500/20 rounded-xl text-slate-300 border border-white/10 transition-all duration-300 neon-glow text-sm">
                                صورة واقعية
                            </button>
                        </div>

                        <!-- Generate Button -->
                        <button onclick="generateSketch()" class="w-full mt-6 py-3 px-6 bg-gradient-to-l from-emerald-500 to-green-400 rounded-xl font-semibold text-white neon-glow transition-all duration-300 hover:opacity-90">
                            تحويل الرسمة
                        </button>
                    </div>
                </div>

                <!-- Result Section -->
                <div id="sketch-result" class="hidden mt-6 glass rounded-2xl p-6 fade-in">
                    <h2 class="text-xl font-semibold text-white mb-4">النتيجة</h2>
                    <img id="sketch-result-img" class="max-w-full rounded-xl mx-auto" alt="Generated">
                    <button onclick="downloadResult('sketch-result-img')" class="mt-4 py-2 px-6 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl text-white border border-white/10 transition-all duration-300 neon-glow">
                        <span class="flex items-center gap-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                            </svg>
                            تحميل الصورة
                        </span>
                    </button>
                </div>
            </div>

            <!-- Avatar Lab Tab -->
            <div id="tab-avatar" class="tab-content fade-in">
                <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
                    <span class="gradient-text">مختبر الشخصيات</span>
                </h1>

                <div class="grid lg:grid-cols-2 gap-6">
                    <!-- Upload Section -->
                    <div class="glass rounded-2xl p-6">
                        <h2 class="text-xl font-semibold text-white mb-4">رفع صورة شخصية</h2>

                        <!-- Drop Zone -->
                        <div id="avatar-dropzone" class="border-2 border-dashed border-green-500/30 rounded-xl p-8 text-center cursor-pointer transition-all duration-300 hover:border-green-500/60 pulse-border">
                            <input type="file" id="avatar-file" accept="image/*" class="hidden">
                            <div id="avatar-preview-container" class="hidden">
                                <div class="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-green-500/30 mb-4">
                                    <img id="avatar-preview" class="w-full h-full object-cover" alt="Preview">
                                </div>
                                <button onclick="clearAvatarUpload()" class="text-red-400 hover:text-red-300 text-sm">إزالة الصورة</button>
                            </div>
                            <div id="avatar-upload-placeholder">
                                <svg class="w-12 h-12 mx-auto text-green-500/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                </svg>
                                <p class="text-slate-400 mb-2">اسحب وأفلت صورتك هنا</p>
                                <p class="text-slate-500 text-sm">أو انقر للاختيار</p>
                            </div>
                        </div>
                    </div>

                    <!-- Style Selection -->
                    <div class="glass rounded-2xl p-6">
                        <h2 class="text-xl font-semibold text-white mb-4">اختر النمط</h2>

                        <select id="avatar-style" class="w-full bg-slate-800/50 border border-white/10 rounded-xl p-4 text-white input-glow focus:outline-none transition-all duration-300 cursor-pointer">
                            <option value="professional">احترافي</option>
                            <option value="anime">أنمي</option>
                            <option value="clay">طين (Clay 3D)</option>
                            <option value="cartoon">كرتون ثلاثي الأبعاد</option>
                            <option value="fantasy">فانتازيا</option>
                            <option value="cyberpunk">سايبربانك</option>
                            <option value="watercolor">ألوان مائية</option>
                            <option value="pixel-art">بكسل آرت</option>
                        </select>

                        <p class="text-slate-500 text-sm mt-4">اختر النمط الذي تريد تحويل صورتك إليه</p>

                        <!-- Generate Button -->
                        <button onclick="generateAvatar()" class="w-full mt-6 py-3 px-6 bg-gradient-to-l from-emerald-500 to-green-400 rounded-xl font-semibold text-white neon-glow transition-all duration-300 hover:opacity-90">
                            تحويل الصورة
                        </button>
                    </div>
                </div>

                <!-- Result Section -->
                <div id="avatar-result" class="hidden mt-6 glass rounded-2xl p-6 fade-in">
                    <h2 class="text-xl font-semibold text-white mb-4">النتيجة</h2>
                    <img id="avatar-result-img" class="max-w-full rounded-xl mx-auto" alt="Generated">
                    <button onclick="downloadResult('avatar-result-img')" class="mt-4 py-2 px-6 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl text-white border border-white/10 transition-all duration-300 neon-glow">
                        <span class="flex items-center gap-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                            </svg>
                            تحميل الصورة
                        </span>
                    </button>
                </div>
            </div>
        </main>
    </div>

    <!-- Settings Modal -->
    <div id="settings-modal" class="fixed inset-0 z-[100] hidden">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="closeSettings()"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl p-4">
            <div class="glass rounded-2xl p-6 fade-in">
                <div class="flex flex-col gap-6 lg:flex-row lg:items-start">
                    <div class="flex-1">
                        <div class="flex items-center justify-between mb-6">
                            <h2 class="text-xl font-semibold text-white">الإعدادات</h2>
                            <button onclick="closeSettings()" class="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-700/50 transition-colors">
                                <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>

                        <div class="space-y-4">
                            <div>
                                <label class="block text-slate-400 text-sm mb-2">مفتاح API الخاص بـ Gemini</label>
                                <div class="relative">
                                    <input type="password" id="api-key-input" placeholder="أدخل مفتاح API..." class="w-full bg-slate-800/50 border border-white/10 rounded-xl p-4 pl-12 text-white placeholder-slate-500 input-glow focus:outline-none transition-all duration-300">
                                    <button onclick="toggleApiKeyVisibility()" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300">
                                        <svg id="eye-icon" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <!-- Remember Me Checkbox -->
                            <label class="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" id="remember-key-checkbox" class="w-4 h-4 rounded border-slate-600 bg-slate-700 text-green-500 focus:ring-green-500 focus:ring-offset-slate-900">
                                <span class="text-slate-400 text-sm">حفظ المفتاح للزيارات القادمة (تذكر مفتاحي)</span>
                            </label>

                            <!-- Security Warning -->
                            <div class="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                                <p class="text-yellow-400 text-xs leading-relaxed">
                                    <svg class="w-4 h-4 inline-block ml-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                                    </svg>
                                    <strong>افتراضياً:</strong> يُحذف المفتاح عند إغلاق التبويب (آمن على الأجهزة المشتركة). عند تفعيل "تذكر مفتاحي"، يبقى المفتاح محفوظاً في المتصفح.
                                </p>
                            </div>

                            <div class="flex gap-3">
                                <button onclick="saveApiKey()" class="flex-1 py-3 px-6 bg-gradient-to-l from-emerald-500 to-green-400 rounded-xl font-semibold text-white neon-glow transition-all duration-300 hover:opacity-90">
                                    حفظ المفتاح
                                </button>
                                <button onclick="clearApiKey()" class="py-3 px-6 bg-red-500/20 hover:bg-red-500/30 rounded-xl font-semibold text-red-400 border border-red-500/30 transition-all duration-300">
                                    مسح
                                </button>
                            </div>

                            <p class="text-slate-500 text-xs text-center">
                                المفتاح يُحفظ محلياً في متصفحك فقط ولا يُرسل لأي خادم
                            </p>
                        </div>
                    </div>
                    <div id="api-key-steps" class="hidden w-full lg:w-[420px]"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- Loading Overlay -->
    <div id="loading-overlay" class="fixed inset-0 z-[200] hidden bg-black/70 backdrop-blur-sm flex items-center justify-center">
        <div class="text-center">
            <div class="relative w-24 h-24 mx-auto mb-6">
                <div class="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-green-400 loading-orb opacity-30"></div>
                <div class="absolute inset-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-400 pulse-scale"></div>
                <div class="absolute inset-4 rounded-full bg-[#0f172a]"></div>
                <div class="absolute inset-6 rounded-full bg-gradient-to-r from-emerald-500 to-green-400 pulse-scale" style="animation-delay: 0.3s;"></div>
            </div>
            <p class="text-white text-xl font-semibold">جاري التوليد...</p>
            <p class="text-slate-400 text-sm mt-2">يرجى الانتظار</p>
        </div>
    </div>

    <!-- Toast Notification -->
    <div id="toast" class="fixed bottom-6 left-6 z-[300] hidden">
        <div class="glass rounded-xl px-6 py-4 flex items-center gap-3 fade-in">
            <span id="toast-icon"></span>
            <span id="toast-message" class="text-white"></span>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
