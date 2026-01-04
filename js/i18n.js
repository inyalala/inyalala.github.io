/**
 * INTERNATIONALIZATION (i18n)
 * Lightweight multilingual support for Swahili and Chinese
 */

(function() {
    'use strict';

    const I18n = {
        // Available languages
        languages: {
            en: 'English',
            sw: 'Kiswahili',
            zh: '中文'
        },

        // Current language
        currentLang: 'en',

        // Translation data
        translations: {
            en: {
                'nav.profile': 'Profile',
                'nav.news': 'News',
                'nav.research': 'Research',
                'nav.publications': 'Publications',
                'nav.conferences': 'Conferences',
                'nav.teaching': 'Teaching',
                'nav.contact': 'Contact',
                'hero.subtitle': 'AI Researcher & Assistant Professor of Data Science and AI',
                'hero.affiliation1': 'School of Engineering and Science, IIT Madras Zanzibar',
                'hero.affiliation2': 'Associate Research Fellow, Wadhwani School of Data Science & AI, IIT Madras Chennai',
                'hero.lab': 'Principal Investigator, SAAIL Lab (Est. June 2025)',
                'hero.bio': 'I am passionate about leveraging <strong>Artificial Intelligence</strong>, <strong>Machine Learning</strong>, and <strong>Deep Learning</strong> to create positive real-world impact, particularly in <strong>agriculture</strong> and <strong>healthcare</strong> across <strong>East Africa</strong>. As the Principal Investigator of <strong>SAAIL Lab</strong> (Sustainable AI for Agriculture & Intelligent Livelihoods) at <strong>IIT Madras Zanzibar</strong>, I lead research developing transformative <strong>AI solutions for agriculture</strong>, <strong>precision farming</strong>, <strong>crop disease detection</strong>, <strong>healthcare AI</strong>, and <strong>medical imaging</strong> in <strong>Tanzania</strong>, <strong>Kenya</strong>, and across the <strong>African continent</strong> through ethical innovation and sustainable development.',
                'stats.publications': 'Publications',
                'stats.citations': 'Citations',
                'section.news.title': 'Latest News',
                'section.news.subtitle': 'Recent updates, achievements, and announcements',
                'section.research.title': 'Research',
                'section.research.subtitle': 'Advancing AI for sustainable development and real-world impact',
                'section.publications.title': 'Publications',
                'section.publications.subtitle': 'Selected peer-reviewed publications in top-tier journals',
                'section.conferences.title': 'Conferences & Speaking',
                'section.conferences.subtitle': 'Keynotes, presentations, and academic engagements',
                'section.teaching.title': 'Education & Teaching',
                'section.contact.title': 'Contact',
                'section.contact.subtitle': "Let's connect and collaborate",
                'btn.downloadCV': 'Download CV',
                'btn.visitLab': 'Visit SAAIL Lab',
                'btn.viewAll': 'View All Publications on Google Scholar',
                'contact.primaryEmail': 'Primary Email',
                'contact.secondaryEmail': 'Secondary Email',
                'contact.phone': 'Phone',
                'contact.office': 'Office Address',
                'footer.rights': '© 2026 Innocent Nyalala. All rights reserved.',
                'toast.copied': 'Email copied to clipboard!',
                'toast.offline': 'You are offline. Some features may not work.',
                'toast.online': 'Back online!'
            },
            sw: {
                'nav.profile': 'Wasifu',
                'nav.news': 'Habari',
                'nav.research': 'Utafiti',
                'nav.publications': 'Machapisho',
                'nav.conferences': 'Mikutano',
                'nav.teaching': 'Ufundishaji',
                'nav.contact': 'Mawasiliano',
                'hero.subtitle': 'Mtafiti wa AI na Profesa Msaidizi wa Sayansi ya Data na AI',
                'hero.affiliation1': 'Shule ya Uhandisi na Sayansi, IIT Madras Zanzibar',
                'hero.affiliation2': 'Mwanachama wa Utafiti Msaidizi, Shule ya Wadhwani ya Sayansi ya Data & AI, IIT Madras Chennai',
                'hero.lab': 'Mkuu wa Utafiti, Maabara ya SAAIL (Imeanzishwa Juni 2025)',
                'hero.bio': 'Nina shauku ya kutumia <strong>Akili Bandia</strong>, <strong>Kujifunza kwa Mashine</strong>, na <strong>Kujifunza kwa Kina</strong> kuunda athari chanya duniani, hasa katika <strong>kilimo</strong> na <strong>afya</strong> katika <strong>Afrika Mashariki</strong>. Kama Mkuu wa Utafiti wa <strong>Maabara ya SAAIL</strong> (AI Endelevu kwa Kilimo na Maisha Bora) katika <strong>IIT Madras Zanzibar</strong>, naongoza utafiti wa kuunda <strong>suluhisho za AI kwa kilimo</strong>, <strong>kilimo sahihi</strong>, <strong>ugunduzi wa magonjwa ya mazao</strong>, <strong>AI ya afya</strong>, na <strong>picha za kimatibabu</strong> katika <strong>Tanzania</strong>, <strong>Kenya</strong>, na katika <strong>bara la Afrika</strong> kupitia ubunifu wa kimaadili na maendeleo endelevu.',
                'stats.publications': 'Machapisho',
                'stats.citations': 'Nukuu',
                'section.news.title': 'Habari za Hivi Karibuni',
                'section.news.subtitle': 'Masasisho ya hivi karibuni, mafanikio, na matangazo',
                'section.research.title': 'Utafiti',
                'section.research.subtitle': 'Kuendeleza AI kwa maendeleo endelevu na athari halisi',
                'section.publications.title': 'Machapisho',
                'section.publications.subtitle': 'Machapisho yaliyopitiwa na wenzao katika majarida ya hali ya juu',
                'section.conferences.title': 'Mikutano na Hotuba',
                'section.conferences.subtitle': 'Hotuba kuu, mawasilisho, na ushiriki wa kitaaluma',
                'section.teaching.title': 'Elimu na Ufundishaji',
                'section.contact.title': 'Mawasiliano',
                'section.contact.subtitle': 'Hebu tuungane na kushirikiana',
                'btn.downloadCV': 'Pakua CV',
                'btn.visitLab': 'Tembelea Maabara ya SAAIL',
                'btn.viewAll': 'Tazama Machapisho Yote kwenye Google Scholar',
                'contact.primaryEmail': 'Barua Pepe ya Msingi',
                'contact.secondaryEmail': 'Barua Pepe ya Pili',
                'contact.phone': 'Simu',
                'contact.office': 'Anwani ya Ofisi',
                'footer.rights': '© 2026 Innocent Nyalala. Haki zote zimehifadhiwa.',
                'toast.copied': 'Barua pepe imenakiliwa kwenye ubao wa kunakili!',
                'toast.offline': 'Uko nje ya mtandao. Baadhi ya vipengele vinaweza kutofanya kazi.',
                'toast.online': 'Umerudi mtandaoni!'
            },
            zh: {
                'nav.profile': '简介',
                'nav.news': '新闻',
                'nav.research': '研究',
                'nav.publications': '出版物',
                'nav.conferences': '会议',
                'nav.teaching': '教学',
                'nav.contact': '联系',
                'hero.subtitle': '人工智能研究员和数据科学与人工智能助理教授',
                'hero.affiliation1': 'IIT马德拉斯桑给巴尔工程与科学学院',
                'hero.affiliation2': 'IIT马德拉斯钦奈Wadhwani数据科学与人工智能学院副研究员',
                'hero.lab': 'SAAIL实验室首席研究员（成立于2025年6月）',
                'hero.bio': '我热衷于利用<strong>人工智能</strong>、<strong>机器学习</strong>和<strong>深度学习</strong>创造积极的现实影响，特别是在<strong>东非</strong>的<strong>农业</strong>和<strong>医疗保健</strong>领域。作为<strong>IIT马德拉斯桑给巴尔</strong>的<strong>SAAIL实验室</strong>（农业与智能生计可持续人工智能）首席研究员，我领导研究开发<strong>农业人工智能解决方案</strong>、<strong>精准农业</strong>、<strong>作物病害检测</strong>、<strong>医疗人工智能</strong>和<strong>医学影像</strong>，在<strong>坦桑尼亚</strong>、<strong>肯尼亚</strong>和整个<strong>非洲大陆</strong>通过道德创新和可持续发展实现转型。',
                'stats.publications': '出版物',
                'stats.citations': '引用',
                'section.news.title': '最新动态',
                'section.news.subtitle': '最新更新、成就和公告',
                'section.research.title': '研究',
                'section.research.subtitle': '推进人工智能促进可持续发展和实际影响',
                'section.publications.title': '出版物',
                'section.publications.subtitle': '顶级期刊中经过同行评审的精选出版物',
                'section.conferences.title': '会议与演讲',
                'section.conferences.subtitle': '主题演讲、报告和学术活动',
                'section.teaching.title': '教育与教学',
                'section.contact.title': '联系方式',
                'section.contact.subtitle': '让我们联系并合作',
                'btn.downloadCV': '下载简历',
                'btn.visitLab': '访问SAAIL实验室',
                'btn.viewAll': '在Google Scholar上查看所有出版物',
                'contact.primaryEmail': '主要邮箱',
                'contact.secondaryEmail': '次要邮箱',
                'contact.phone': '电话',
                'contact.office': '办公地址',
                'footer.rights': '© 2026 Innocent Nyalala。保留所有权利。',
                'toast.copied': '电子邮件已复制到剪贴板！',
                'toast.offline': '您已离线。某些功能可能无法使用。',
                'toast.online': '重新联网！'
            }
        },

        // Initialize
        init: function() {
            // Load saved language preference
            const savedLang = localStorage.getItem('preferredLanguage');
            const browserLang = this.detectBrowserLanguage();

            this.currentLang = savedLang || browserLang || 'en';

            // Create language switcher
            this.createLanguageSwitcher();

            // Apply translations
            this.applyTranslations();

            // Update HTML lang attribute
            document.documentElement.lang = this.currentLang;
        },

        // Detect browser language
        detectBrowserLanguage: function() {
            const lang = navigator.language || navigator.userLanguage;
            const langCode = lang.split('-')[0];

            // Check if we support this language
            if (this.translations[langCode]) {
                return langCode;
            }

            return 'en';
        },

        // Create language switcher UI
        createLanguageSwitcher: function() {
            const switcher = document.createElement('div');
            switcher.className = 'language-switcher';
            switcher.innerHTML = `
                <button class="lang-toggle" aria-label="Change language">
                    <i class="fas fa-globe"></i>
                    <span class="current-lang">${this.languages[this.currentLang]}</span>
                </button>
                <div class="lang-menu">
                    ${Object.keys(this.languages).map(lang => `
                        <button class="lang-option ${lang === this.currentLang ? 'active' : ''}"
                                data-lang="${lang}">
                            ${this.languages[lang]}
                        </button>
                    `).join('')}
                </div>
            `;

            document.body.appendChild(switcher);

            // Event listeners
            const toggle = switcher.querySelector('.lang-toggle');
            const menu = switcher.querySelector('.lang-menu');
            const options = switcher.querySelectorAll('.lang-option');

            toggle.addEventListener('click', () => {
                menu.classList.toggle('open');
            });

            options.forEach(option => {
                option.addEventListener('click', () => {
                    const lang = option.dataset.lang;
                    this.switchLanguage(lang);
                    menu.classList.remove('open');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!switcher.contains(e.target)) {
                    menu.classList.remove('open');
                }
            });
        },

        // Switch language
        switchLanguage: function(lang) {
            if (!this.translations[lang]) return;

            this.currentLang = lang;
            localStorage.setItem('preferredLanguage', lang);

            // Update UI
            this.applyTranslations();
            document.documentElement.lang = lang;

            // Update current lang display
            const currentLangSpan = document.querySelector('.current-lang');
            if (currentLangSpan) {
                currentLangSpan.textContent = this.languages[lang];
            }

            // Update active state
            document.querySelectorAll('.lang-option').forEach(option => {
                option.classList.toggle('active', option.dataset.lang === lang);
            });

            // Show notification
            if (window.QuickEnhancements) {
                window.QuickEnhancements.showToast(
                    `Language changed to ${this.languages[lang]}`,
                    'success'
                );
            }
        },

        // Apply translations
        applyTranslations: function() {
            const translations = this.translations[this.currentLang];

            // Translate elements with data-i18n attribute
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.dataset.i18n;
                if (translations[key]) {
                    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        element.placeholder = translations[key];
                    } else {
                        element.innerHTML = translations[key];
                    }
                }
            });

            // Update page title
            if (this.currentLang !== 'en') {
                const titleMap = {
                    sw: 'Dkt. Innocent Nyalala | Mtafiti wa AI, Profesa Msaidizi | IIT Madras Zanzibar',
                    zh: 'Innocent Nyalala博士 | 人工智能研究员，助理教授 | IIT马德拉斯桑给巴尔'
                };
                document.title = titleMap[this.currentLang] || document.title;
            }
        },

        // Get translation
        t: function(key) {
            return this.translations[this.currentLang][key] || key;
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => I18n.init());
    } else {
        I18n.init();
    }

    // Expose globally
    window.I18n = I18n;

})();
