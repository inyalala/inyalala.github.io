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
                'nav.fullList': 'Full List',
                'hero.subtitle': 'AI Researcher & Assistant Professor of Data Science and AI',
                'hero.affiliation1': 'School of Engineering and Science, IIT Madras Zanzibar',
                'hero.affiliation2': 'Associate Research Fellow, Wadhwani School of Data Science & AI, IIT Madras Chennai',
                'hero.lab': 'Principal Investigator, SAAIL Lab',
                'hero.bio': 'I am passionate about leveraging <strong>Artificial Intelligence</strong>, <strong>Machine Learning</strong>, and <strong>Deep Learning</strong> to create positive real-world impact, particularly in <strong>agriculture</strong> and <strong>healthcare</strong> across <strong>East Africa</strong>. As the Principal Investigator of <strong>SAAIL Lab</strong> (Sustainable AI for Agriculture & Intelligent Livelihoods) at <strong>IIT Madras Zanzibar</strong>, I lead research developing transformative <strong>AI solutions for agriculture</strong>, <strong>precision farming</strong>, <strong>crop disease detection</strong>, <strong>healthcare AI</strong>, and <strong>medical imaging</strong> in <strong>Tanzania</strong>, <strong>Kenya</strong>, and across the <strong>African continent</strong> through ethical innovation and sustainable development.',
                'stats.publications': 'Publications',
                'stats.citations': 'Citations',
                'stats.hindex': 'h-index',
                'stats.i10index': 'i10-index',
                'section.news.title': 'Latest News',
                'section.news.subtitle': 'Recent updates, achievements, and announcements',
                'section.research.title': 'Research',
                'section.research.subtitle': 'Advancing AI for sustainable development and real-world impact',
                'section.publications.title': 'Publications',
                'section.publications.subtitle': 'Selected peer-reviewed publications in top-tier journals',
                'section.publications.subtitle2': 'Peer-reviewed research in top-tier journals and international conferences',
                'section.conferences.title': 'Conferences & Speaking',
                'section.conferences.subtitle': 'Keynotes, presentations, and academic engagements',
                'section.teaching.title': 'Experience & Teaching',
                'section.teaching.subtitle': 'Academic positions, institutional affiliations, and courses taught',
                'section.contact.title': 'Contact',
                'section.contact.subtitle': "Let's connect and collaborate",
                'section.press.title': 'Press & In the Media',
                'section.press.subtitle': 'Research coverage, features, and public impact',
                'section.service.title': 'Academic Service',
                'section.service.subtitle': 'Peer reviewer, editorial board member, and committee contributor',
                'btn.downloadCV': 'View CV',
                'btn.visitLab': 'Visit SAAIL Lab',
                'btn.exploreLab': 'Explore SAAIL Lab',
                'btn.viewAll': 'View All Publications on Google Scholar',
                'btn.viewFullList': 'View Full Publications List',
                'btn.allOnScholar': 'All 30+ on Google Scholar',
                'btn.inviteSpeak': 'Invite Me to Speak',
                'btn.moreOnScholar': 'More on Scholar',
                'btn.getInTouch': 'Get in Touch',
                'lab.description': 'Leading transformative AI research for East Africa through ethical innovation, sustainable development, and cutting-edge technology. Our mission is to develop AI solutions that address critical challenges in agriculture and healthcare across the African continent.',
                'lab.tag.precisionAg': 'Precision Agriculture',
                'lab.tag.healthcareAI': 'Healthcare AI',
                'lab.tag.deepLearning': 'Deep Learning',
                'lab.tag.responsibleAI': 'Responsible AI',
                'lab.tag.swahiliNLP': 'Swahili NLP',
                'lab.tag.blockchain': 'Blockchain',
                'news.cvpr2026.title': '🎉 SAAIL Lab Paper Accepted at CVPR 2026 — Vision for Agriculture Workshop, Denver',
                'news.cvpr2026.excerpt': 'CLOVES-4603: the first public benchmark dataset for clove quality grading — 4,603 images, 99.67% deep learning accuracy. A proud moment for SAAIL Lab at one of AI\'s most prestigious venues.',
                'news.iclr2026.title': 'Paper Accepted at ICLR 2026 — Trustworthy AI Workshop, Rio de Janeiro',
                'news.iclr2026.excerpt': 'Can one framework make AI fairer, more robust, and more generalizable at once? SAAIL Lab\'s accepted paper at ICLR 2026\'s Trustworthy AI Workshop says yes — and shows exactly how.',
                'news.carafm.title': 'CARA-FM Poster — Best Poster at DLI 2025, Featured by AI4Africa',
                'news.carafm.excerpt': 'What if AI was built for Africa from the ground up? This award-winning poster at Deep Learning Indaba 2025 caught the attention of AI4Africa\'s global network. See why it\'s sparking conversations about the future of AI on the continent.',
                'news.eacsti.title': 'Paper at 4th EAC STI Conference — Kigali, Rwanda · Travel Grant $980',
                'news.eacsti.excerpt': 'Zanzibar\'s most valuable spice — graded by AI for the first time. Built with farmers, not just for them. This work earned a competitive travel grant and a stage in Kigali to tell Africa\'s story.',
                'news.editorial.title': 'Appointed as Editorial Board Member - Discover Artificial Intelligence',
                'news.editorial.excerpt': 'Honored to join the editorial board of Discover Artificial Intelligence, a Springer Nature open access journal advancing AI research and innovation.',
                'news.fumba.title': 'Featured in Fumba Times: The Final Mosquito Hunt',
                'news.fumba.excerpt': 'Published article highlighting how AI is helping Zanzibar achieve malaria elimination through innovative technology and smart mosquito traps.',
                'news.graduation.title': 'IIT Madras Zanzibar First Degree Distribution Ceremony Featured in Indian Express',
                'news.graduation.excerpt': 'Historic graduation ceremony as IIT Madras Zanzibar celebrates its inaugural MTech Data Science and AI batch. Read the full coverage.',
                'news.compag.title': 'New Publication in Computers and Electronics in Agriculture',
                'news.compag.excerpt': 'Our paper on "Rectifying the extremely weakened signals for cassava leaf disease detection" published (IF: 7.7).',
                'news.joinIITMZ.title': 'Joined IIT Madras Zanzibar as Assistant Professor',
                'news.joinIITMZ.excerpt': 'Thrilled to join IIT Madras Zanzibar Campus as Assistant Professor of Data Science & AI, establishing SAAIL Lab for transformative AI research in East Africa.',
                'news.tag.academicService': 'Academic Service',
                'news.tag.media': 'Media',
                'news.tag.mediaCoverage': 'Media Coverage',
                'news.tag.publication': 'Publication',
                'news.tag.careerMilestone': 'Career Milestone',
                'research.spotlight.badge': 'Featured Project',
                'research.spotlight.title': 'AI for Clove Quality Grading — Zanzibar, Tanzania',
                'research.spotlight.desc': 'In collaboration with the <strong>Zanzibar State Trading Corporation (ZSTC)</strong>, we develop deep learning CNN models for automated quality grading of cloves — Zanzibar\'s most important export spice. This work integrates computer vision with indigenous farmer knowledge to build a novel annotated Zanzibar clove dataset and AI grading pipeline that directly supports smallholder farmers and the national spice industry.',
                'research.spotlight.tag1': 'Deep Learning (CNN)',
                'research.spotlight.tag2': 'Computer Vision',
                'research.spotlight.tag3': 'Participatory AI Design',
                'research.spotlight.tag4': 'ZSTC Partnership',
                'research.spotlight.btn1': 'EAC STI 2026 — $980 Travel Grant',
                'research.spotlight.btn2': 'Related Publications',
                'research.interests.title': 'Research Interests',
                'research.projects.title': 'Current Research Projects',
                'research.collabs.title': 'Research Collaborations',
                'research.interest.ai': 'Artificial Intelligence (AI)',
                'research.interest.cv': 'Computer Vision',
                'research.interest.ml': 'Machine Learning (ML)',
                'research.interest.dl': 'Deep Learning',
                'research.interest.nlp': 'Natural Language Processing (NLP)',
                'research.interest.iot': 'Internet of Things (IoT)',
                'research.interest.robotics': 'Robotics',
                'research.interest.dip': 'Digital Image Processing',
                'research.interest.embedded': 'Embedded Systems',
                'research.interest.ds': 'Data Science',
                'research.interest.agritech': 'Agricultural Technology',
                'research.interest.health': 'Healthcare Informatics',
                'research.proj1.title': 'AI for Smart Agriculture',
                'research.proj1.desc': 'Developing AI techniques to enhance agricultural practices, improve resource management, and promote sustainability across East Africa. Focus on crop disease detection, yield prediction, and precision farming.',
                'research.proj2.title': 'Medical Imaging - Placental Analysis',
                'research.proj2.desc': 'Application of AI to analyze placental images for improved maternal and fetal health diagnostics and monitoring.',
                'research.proj3.title': 'Swahili Speech & Text Processing',
                'research.proj3.desc': 'Developing NLP tools for the Swahili language, with applications in agriculture and healthcare for East African communities.',
                'research.proj4.title': 'Blockchain for Spice Supply Chain',
                'research.proj4.desc': 'Investigating blockchain technology to improve transparency, traceability, and efficiency in Zanzibar\'s famous spice supply chain.',
                'pub.verifiedProfile': 'Verified Profile',
                'pub.filter.all': 'All',
                'pub.mostCited.title': 'Most Cited Works',
                'pub.mostCited.sub': 'From 1,073+ total citations · h-index 15',
                'pub.cited': 'cited',
                'conf.type.paper': 'Paper',
                'conf.type.invitedTalk': 'Invited Talk',
                'conf.type.facultyTalk': 'Faculty Talk',
                'conf.type.confPaper': 'Conference Paper',
                'conf.type.bestPoster': 'Best Poster',
                'conf.bestPosterAward': 'Best Poster Award',
                'conf.v4aWorkshop': 'V4A Workshop',
                'exp.badge.current': 'Current',
                'exp.badge.past': 'Past',
                'exp.job1.title': 'Assistant Professor, Data Science and AI',
                'exp.job1.dept': 'School of Engineering and Science',
                'exp.job2.title': 'Associate Research Fellow',
                'exp.job3.title': 'Part-Time Lecturer, Computer Science',
                'exp.job4.title': 'Doctoral Researcher',
                'teaching.courses.title': 'Courses at IIT Madras Zanzibar',
                'teaching.course.activeBadge': 'Active · Mar–Jul 2026 (Even Sem)',
                'teaching.course1.name': 'Database Management Systems',
                'teaching.course1.level': 'BS Core',
                'teaching.course1.desc': 'Relational databases, SQL, schema design, normalization, transactions, and query optimization.',
                'teaching.course2.name': 'Big Data Lab',
                'teaching.course2.level': 'MTech Lab',
                'teaching.course2.desc': 'Hands-on with Apache Spark, Apache Kafka, Apache Iceberg, Delta Lake, and modern large-scale data engineering tools.',
                'mentorship.stat.mtech': 'MTech Supervised',
                'mentorship.stat.phd': 'PhD Co-supervised',
                'mentorship.stat.graduated': 'Graduated (2025)',
                'mentorship.stat.grants': 'Grants Submitted',
                'mentorship.graduated.title': 'Graduated Student',
                'mentorship.mtech.title': 'Current MTech Students',
                'mentorship.phd.title': 'PhD Co-supervision',
                'mentorship.phd.count': '— 5 candidates',
                'teaching.prospective.title': 'Prospective Students',
                'teaching.prospective.desc': 'I am actively seeking motivated MTech and PhD students interested in AI for agriculture, healthcare AI, computer vision, or NLP. Join SAAIL Lab to work on cutting-edge research with real-world impact in East Africa.',
                'service.stat.peerReviews': 'Peer Reviews',
                'service.stat.journalsReviewed': 'Journals Reviewed',
                'service.stat.editorialBoard': 'Editorial Board',
                'service.stat.bestPoster': 'Best Poster Award',
                'service.stat.committees': 'Committees (IITMZ)',
                'service.award.badge': 'Award',
                'service.award.title': 'Best Poster Award — Deep Learning Indaba 2025',
                'service.award.desc': 'Awarded the <strong>Best Poster (Publication &amp; Dataset Category)</strong> at Deep Learning Indaba 2025 in Kigali, Rwanda for the CARA-FMs framework — a context-aware and responsible AI approach for East African agriculture. The work also received an oral presentation slot at the Responsible AI Workshop, placing SAAIL Lab\'s research at the centre of Africa\'s leading ML conference.',
                'service.peerReviewer.title': 'Peer Reviewer · 19 Journals',
                'service.editorialBoard.title': 'Editorial Board',
                'service.institutional.title': 'Institutional Service',
                'contact.primaryEmail': 'Primary Email',
                'contact.secondaryEmail': 'Secondary Email',
                'contact.phone': 'Phone',
                'contact.phoneTZ': 'Phone (Tanzania)',
                'contact.phoneKE': 'Phone (Kenya)',
                'contact.office': 'Office Address',
                'contact.officeDetails': 'School of Engineering and Science<br>IIT Madras Zanzibar Campus<br>Office 105, Door F6<br>P.O. Box 394, Zanzibar 71101, Tanzania',
                'contact.connectTitle': 'Connect With Me',
                'footer.brandDesc': 'Assistant Professor of Data Science & AI at IIT Madras Zanzibar. Principal Investigator of SAAIL Lab — building ethical AI for agriculture and healthcare in East Africa.',
                'footer.quickLinks': 'Quick Links',
                'footer.affiliations': 'Affiliations',
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
                'nav.fullList': 'Orodha Kamili',
                'hero.subtitle': 'Mtafiti wa AI na Profesa Msaidizi wa Sayansi ya Data na AI',
                'hero.affiliation1': 'Shule ya Uhandisi na Sayansi, IIT Madras Zanzibar',
                'hero.affiliation2': 'Mwanachama wa Utafiti Msaidizi, Shule ya Wadhwani ya Sayansi ya Data & AI, IIT Madras Chennai',
                'hero.lab': 'Mkuu wa Utafiti, Maabara ya SAAIL',
                'hero.bio': 'Nina shauku ya kutumia <strong>Akili Bandia</strong>, <strong>Kujifunza kwa Mashine</strong>, na <strong>Kujifunza kwa Kina</strong> kuunda athari chanya duniani, hasa katika <strong>kilimo</strong> na <strong>afya</strong> katika <strong>Afrika Mashariki</strong>. Kama Mkuu wa Utafiti wa <strong>Maabara ya SAAIL</strong> (AI Endelevu kwa Kilimo na Maisha Bora) katika <strong>IIT Madras Zanzibar</strong>, naongoza utafiti wa kuunda <strong>suluhisho za AI kwa kilimo</strong>, <strong>kilimo sahihi</strong>, <strong>ugunduzi wa magonjwa ya mazao</strong>, <strong>AI ya afya</strong>, na <strong>picha za kimatibabu</strong> katika <strong>Tanzania</strong>, <strong>Kenya</strong>, na katika <strong>bara la Afrika</strong> kupitia ubunifu wa kimaadili na maendeleo endelevu.',
                'stats.publications': 'Machapisho',
                'stats.citations': 'Nukuu',
                'stats.hindex': 'Faharisi-h',
                'stats.i10index': 'Faharisi-i10',
                'section.news.title': 'Habari za Hivi Karibuni',
                'section.news.subtitle': 'Masasisho ya hivi karibuni, mafanikio, na matangazo',
                'section.research.title': 'Utafiti',
                'section.research.subtitle': 'Kuendeleza AI kwa maendeleo endelevu na athari halisi',
                'section.publications.title': 'Machapisho',
                'section.publications.subtitle': 'Machapisho yaliyopitiwa na wenzao katika majarida ya hali ya juu',
                'section.publications.subtitle2': 'Utafiti uliopitiwa na wenzao katika majarida bora na mikutano ya kimataifa',
                'section.conferences.title': 'Mikutano na Hotuba',
                'section.conferences.subtitle': 'Hotuba kuu, mawasilisho, na ushiriki wa kitaaluma',
                'section.teaching.title': 'Uzoefu na Ufundishaji',
                'section.teaching.subtitle': 'Nyadhifa za kitaaluma, uhusiano wa kitaasisi, na masomo yaliyofundishwa',
                'section.contact.title': 'Mawasiliano',
                'section.contact.subtitle': 'Hebu tuungane na kushirikiana',
                'section.press.title': 'Vyombo vya Habari',
                'section.press.subtitle': 'Uandishi wa habari za utafiti, makala maalum, na athari za umma',
                'section.service.title': 'Huduma ya Kitaaluma',
                'section.service.subtitle': 'Mkaguzi wa wenzao, mwanabodi wa uhariri, na mchangiaji wa kamati',
                'btn.downloadCV': 'Tazama CV',
                'btn.visitLab': 'Tembelea Maabara ya SAAIL',
                'btn.exploreLab': 'Chunguza Maabara ya SAAIL',
                'btn.viewAll': 'Tazama Machapisho Yote kwenye Google Scholar',
                'btn.viewFullList': 'Tazama Orodha Kamili ya Machapisho',
                'btn.allOnScholar': 'Machapisho 30+ yote kwenye Google Scholar',
                'btn.inviteSpeak': 'Nialika Kuzungumza',
                'btn.moreOnScholar': 'Zaidi kwenye Scholar',
                'btn.getInTouch': 'Wasiliana Nami',
                'lab.description': 'Kuongoza utafiti wa mabadiliko wa AI kwa Afrika Mashariki kupitia ubunifu wa kimaadili, maendeleo endelevu, na teknolojia ya kisasa. Lengo letu ni kuunda suluhisho za AI zinazoshughulikia changamoto muhimu za kilimo na afya katika bara la Afrika.',
                'lab.tag.precisionAg': 'Kilimo Sahihi',
                'lab.tag.healthcareAI': 'AI ya Afya',
                'lab.tag.deepLearning': 'Kujifunza kwa Kina',
                'lab.tag.responsibleAI': 'AI ya Kuwajibika',
                'lab.tag.swahiliNLP': 'Usindikaji wa Kiswahili',
                'lab.tag.blockchain': 'Mnyororo wa Vitalu',
                'news.cvpr2026.title': '🎉 Makala ya Maabara ya SAAIL Imekubaliwa katika CVPR 2026 — Warsha ya Vision for Agriculture, Denver',
                'news.cvpr2026.excerpt': 'CLOVES-4603: seti ya kwanza ya data ya umma ya viwango vya ubora wa karafuu — picha 4,603, usahihi wa 99.67% kwa kujifunza kwa kina. Wakati wa fahari kwa Maabara ya SAAIL katika moja ya maeneo ya AI yenye hadhi zaidi.',
                'news.iclr2026.title': 'Makala Imekubaliwa katika ICLR 2026 — Warsha ya AI Inayoaminika, Rio de Janeiro',
                'news.iclr2026.excerpt': 'Je, mfumo mmoja unaweza kufanya AI kuwa ya haki zaidi, imara zaidi, na ya jumla zaidi kwa wakati mmoja? Makala iliyokubaliwa ya Maabara ya SAAIL katika Warsha ya AI Inayoaminika ya ICLR 2026 inasema ndiyo.',
                'news.carafm.title': 'Bango la CARA-FM — Tuzo ya Bora ya Bango katika DLI 2025, Imeangaziwa na AI4Africa',
                'news.carafm.excerpt': 'Vipi kama AI iliundwa kwa ajili ya Afrika tangu mwanzo? Bango hili lenye tuzo katika Deep Learning Indaba 2025 lilivutia tahadhari ya mtandao wa kimataifa wa AI4Africa.',
                'news.eacsti.title': 'Makala katika Mkutano wa 4 wa EAC STI — Kigali, Rwanda · Ruzuku ya Safari $980',
                'news.eacsti.excerpt': 'Kiungo cha thamani zaidi cha Zanzibar — kilipimwa ubora na AI kwa mara ya kwanza. Kiliundwa pamoja na wakulima, si tu kwa ajili yao. Kazi hii ilipata ruzuku ya ushindani na jukwaa huko Kigali.',
                'news.editorial.title': 'Amechaguliwa Kuwa Mwanabodi wa Uhariri — Discover Artificial Intelligence',
                'news.editorial.excerpt': 'Ninafurahi kujiunga na bodi ya uhariri ya Discover Artificial Intelligence, jarida la wazi la Springer Nature linaloendeleza utafiti na ubunifu wa AI.',
                'news.fumba.title': 'Imeangaziwa katika Fumba Times: Uwindaji wa Mwisho wa Mbu',
                'news.fumba.excerpt': 'Makala iliyochapishwa inayoonyesha jinsi AI inavyosaidia Zanzibar kufikia uondoaji wa malaria kupitia teknolojia ya kisasa na mitego ya akili ya mbu.',
                'news.graduation.title': 'Sherehe ya Kwanza ya Kutoa Shahada ya IIT Madras Zanzibar Imeangaziwa katika Indian Express',
                'news.graduation.excerpt': 'Sherehe ya kihistoria ya kuhitimu ambapo IIT Madras Zanzibar inaadhimisha kikosi chake cha kwanza cha MTech cha Sayansi ya Data na AI.',
                'news.compag.title': 'Chapisho Jipya katika Computers and Electronics in Agriculture',
                'news.compag.excerpt': 'Makala yetu kuhusu "Kurekebisha ishara zilizodhoofika sana kwa ugunduzi wa magonjwa ya majani ya mihogo" imechapishwa (IF: 7.7).',
                'news.joinIITMZ.title': 'Amejiunga na IIT Madras Zanzibar kama Profesa Msaidizi',
                'news.joinIITMZ.excerpt': 'Ninafurahi kujiunga na Chuo cha IIT Madras Zanzibar kama Profesa Msaidizi wa Sayansi ya Data na AI, na kuanzisha Maabara ya SAAIL kwa utafiti wa mabadiliko wa AI Afrika Mashariki.',
                'news.tag.academicService': 'Huduma ya Kitaaluma',
                'news.tag.media': 'Vyombo vya Habari',
                'news.tag.mediaCoverage': 'Uandishi wa Habari',
                'news.tag.publication': 'Chapisho',
                'news.tag.careerMilestone': 'Hatua Muhimu ya Kazi',
                'research.spotlight.badge': 'Mradi Maalum',
                'research.spotlight.title': 'AI kwa Upimaji wa Ubora wa Karafuu — Zanzibar, Tanzania',
                'research.spotlight.desc': 'Kwa kushirikiana na <strong>Shirika la Biashara la Serikali ya Zanzibar (ZSTC)</strong>, tunaunda mifano ya CNN ya kujifunza kwa kina kwa upimaji wa ubora wa karafuu kwa njia ya kiotomatiki — kiungo muhimu zaidi cha mauzo ya nje cha Zanzibar. Kazi hii inaunganisha maono ya kompyuta na maarifa ya asili ya wakulima ili kuunda seti ya data ya karafuu ya Zanzibar iliyoandikewa maelezo na mstari wa AI wa upimaji unaowasiliana moja kwa moja na wakulima wadogo na sekta ya taifa ya viungo.',
                'research.spotlight.tag1': 'Kujifunza kwa Kina (CNN)',
                'research.spotlight.tag2': 'Maono ya Kompyuta',
                'research.spotlight.tag3': 'Muundo wa AI Shirikishi',
                'research.spotlight.tag4': 'Ushirikiano na ZSTC',
                'research.spotlight.btn1': 'EAC STI 2026 — Ruzuku ya Safari $980',
                'research.spotlight.btn2': 'Machapisho Yanayohusiana',
                'research.interests.title': 'Maslahi ya Utafiti',
                'research.projects.title': 'Miradi ya Utafiti ya Sasa',
                'research.collabs.title': 'Ushirikiano wa Utafiti',
                'research.interest.ai': 'Akili Bandia (AI)',
                'research.interest.cv': 'Maono ya Kompyuta',
                'research.interest.ml': 'Kujifunza kwa Mashine (ML)',
                'research.interest.dl': 'Kujifunza kwa Kina',
                'research.interest.nlp': 'Usindikaji wa Lugha Asilia (NLP)',
                'research.interest.iot': 'Mtandao wa Vitu (IoT)',
                'research.interest.robotics': 'Roboti',
                'research.interest.dip': 'Usindikaji wa Picha za Dijiti',
                'research.interest.embedded': 'Mifumo Iliyojengwa',
                'research.interest.ds': 'Sayansi ya Data',
                'research.interest.agritech': 'Teknolojia ya Kilimo',
                'research.interest.health': 'Taarifa za Afya',
                'research.proj1.title': 'AI kwa Kilimo Bora',
                'research.proj1.desc': 'Kuunda mbinu za AI ili kuboresha mazoea ya kilimo, usimamizi wa rasilimali, na kukuza uendelevu kote Afrika Mashariki. Mkazo wa ugunduzi wa magonjwa ya mazao, utabiri wa mavuno, na kilimo sahihi.',
                'research.proj2.title': 'Picha za Kimatibabu - Uchambuzi wa Kondo la Nyuma',
                'research.proj2.desc': 'Matumizi ya AI kuchambua picha za kondo la nyuma kwa uchunguzi bora na ufuatiliaji wa afya ya mama na mtoto.',
                'research.proj3.title': 'Usindikaji wa Hotuba na Maandishi ya Kiswahili',
                'research.proj3.desc': 'Kuunda zana za NLP kwa lugha ya Kiswahili, zenye matumizi katika kilimo na afya kwa jamii za Afrika Mashariki.',
                'research.proj4.title': 'Mnyororo wa Vitalu kwa Mnyororo wa Usambazaji wa Viungo',
                'research.proj4.desc': 'Kuchunguza teknolojia ya mnyororo wa vitalu ili kuboresha uwazi, ufuatiliaji, na ufanisi katika mnyororo wa usambazaji wa viungo maarufu vya Zanzibar.',
                'pub.verifiedProfile': 'Wasifu Uliothibitishwa',
                'pub.filter.all': 'Yote',
                'pub.mostCited.title': 'Kazi Zilizotajwa Zaidi',
                'pub.mostCited.sub': 'Kutoka kwa nukuu 1,073+ jumla · faharisi-h 15',
                'pub.cited': 'imetajwa',
                'conf.type.paper': 'Makala',
                'conf.type.invitedTalk': 'Hotuba ya Mwaliko',
                'conf.type.facultyTalk': 'Hotuba ya Kitaaluma',
                'conf.type.confPaper': 'Makala ya Mkutano',
                'conf.type.bestPoster': 'Bango Bora',
                'conf.bestPosterAward': 'Tuzo ya Bango Bora',
                'conf.v4aWorkshop': 'Warsha ya V4A',
                'exp.badge.current': 'Sasa',
                'exp.badge.past': 'Iliyopita',
                'exp.job1.title': 'Profesa Msaidizi, Sayansi ya Data na AI',
                'exp.job1.dept': 'Shule ya Uhandisi na Sayansi',
                'exp.job2.title': 'Mwanachama wa Utafiti Msaidizi',
                'exp.job3.title': 'Mhadhiri wa Muda, Sayansi ya Kompyuta',
                'exp.job4.title': 'Mtafiti wa Uzamili',
                'teaching.courses.title': 'Masomo katika IIT Madras Zanzibar',
                'teaching.course.activeBadge': 'Inafanyika · Mar–Jul 2026 (Sem. Sawa)',
                'teaching.course1.name': 'Mifumo ya Usimamizi wa Hifadhidata',
                'teaching.course1.level': 'Msingi wa BS',
                'teaching.course1.desc': 'Hifadhidata za uhusiano, SQL, muundo wa skimu, ukawaida, miamala, na uboreshaji wa maswali.',
                'teaching.course2.name': 'Maabara ya Data Kubwa',
                'teaching.course2.level': 'Maabara ya MTech',
                'teaching.course2.desc': 'Uzoefu wa vitendo na Apache Spark, Apache Kafka, Apache Iceberg, Delta Lake, na zana za kisasa za uhandisi wa data kubwa.',
                'mentorship.stat.mtech': 'MTech Wanaosimamiwa',
                'mentorship.stat.phd': 'PhD Wanaoshirikisiwa',
                'mentorship.stat.graduated': 'Waliohitimu (2025)',
                'mentorship.stat.grants': 'Maombi ya Ruzuku',
                'mentorship.graduated.title': 'Mwanafunzi Aliyehitimu',
                'mentorship.mtech.title': 'Wanafunzi wa MTech wa Sasa',
                'mentorship.phd.title': 'Usimamiaji Shirikishi wa PhD',
                'mentorship.phd.count': '— wagombea 5',
                'teaching.prospective.title': 'Wanafunzi Wanaotarajiwa',
                'teaching.prospective.desc': 'Ninatafuta wanafunzi wenye ari wa MTech na PhD wanaovutiwa na AI kwa kilimo, AI ya afya, maono ya kompyuta, au NLP. Jiunge na Maabara ya SAAIL kufanya utafiti wa kisasa wenye athari halisi Afrika Mashariki.',
                'service.stat.peerReviews': 'Ukaguzi wa Wenzao',
                'service.stat.journalsReviewed': 'Majarida Yaliyokaguliwa',
                'service.stat.editorialBoard': 'Bodi ya Uhariri',
                'service.stat.bestPoster': 'Tuzo ya Bango Bora',
                'service.stat.committees': 'Kamati (IITMZ)',
                'service.award.badge': 'Tuzo',
                'service.award.title': 'Tuzo ya Bango Bora — Deep Learning Indaba 2025',
                'service.award.desc': 'Alitunukiwa <strong>Bango Bora (Kategoria ya Uchapishaji na Seti ya Data)</strong> katika Deep Learning Indaba 2025 huko Kigali, Rwanda kwa mfumo wa CARA-FMs — mbinu ya AI inayojibu muktadha na ya kuwajibika kwa kilimo cha Afrika Mashariki. Kazi hiyo pia ilipata nafasi ya uwasilishaji wa mdomo katika Warsha ya AI ya Kuwajibika.',
                'service.peerReviewer.title': 'Mkaguzi wa Wenzao · Majarida 19',
                'service.editorialBoard.title': 'Bodi ya Uhariri',
                'service.institutional.title': 'Huduma ya Kitaasisi',
                'contact.primaryEmail': 'Barua Pepe ya Msingi',
                'contact.secondaryEmail': 'Barua Pepe ya Pili',
                'contact.phone': 'Simu',
                'contact.phoneTZ': 'Simu (Tanzania)',
                'contact.phoneKE': 'Simu (Kenya)',
                'contact.office': 'Anwani ya Ofisi',
                'contact.officeDetails': 'Shule ya Uhandisi na Sayansi<br>Chuo cha IIT Madras Zanzibar<br>Ofisi 105, Mlango F6<br>S.L.P. 394, Zanzibar 71101, Tanzania',
                'contact.connectTitle': 'Unganika Nami',
                'footer.brandDesc': 'Profesa Msaidizi wa Sayansi ya Data na AI katika IIT Madras Zanzibar. Mkuu wa Utafiti wa Maabara ya SAAIL — kujenga AI ya kimaadili kwa kilimo na afya Afrika Mashariki.',
                'footer.quickLinks': 'Viungo vya Haraka',
                'footer.affiliations': 'Uhusiano wa Kitaasisi',
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
                'nav.fullList': '完整列表',
                'hero.subtitle': '人工智能研究员和数据科学与人工智能助理教授',
                'hero.affiliation1': 'IIT马德拉斯桑给巴尔工程与科学学院',
                'hero.affiliation2': 'IIT马德拉斯钦奈Wadhwani数据科学与人工智能学院副研究员',
                'hero.lab': 'SAAIL实验室首席研究员',
                'hero.bio': '我热衷于利用<strong>人工智能</strong>、<strong>机器学习</strong>和<strong>深度学习</strong>创造积极的现实影响，特别是在<strong>东非</strong>的<strong>农业</strong>和<strong>医疗保健</strong>领域。作为<strong>IIT马德拉斯桑给巴尔</strong>的<strong>SAAIL实验室</strong>（农业与智能生计可持续人工智能）首席研究员，我领导研究开发<strong>农业人工智能解决方案</strong>、<strong>精准农业</strong>、<strong>作物病害检测</strong>、<strong>医疗人工智能</strong>和<strong>医学影像</strong>，在<strong>坦桑尼亚</strong>、<strong>肯尼亚</strong>和整个<strong>非洲大陆</strong>通过道德创新和可持续发展实现转型。',
                'stats.publications': '出版物',
                'stats.citations': '引用',
                'stats.hindex': 'h指数',
                'stats.i10index': 'i10指数',
                'section.news.title': '最新动态',
                'section.news.subtitle': '最新更新、成就和公告',
                'section.research.title': '研究',
                'section.research.subtitle': '推进人工智能促进可持续发展和实际影响',
                'section.publications.title': '出版物',
                'section.publications.subtitle': '顶级期刊中经过同行评审的精选出版物',
                'section.publications.subtitle2': '顶级期刊和国际会议中的同行评审研究',
                'section.conferences.title': '会议与演讲',
                'section.conferences.subtitle': '主题演讲、报告和学术活动',
                'section.teaching.title': '经历与教学',
                'section.teaching.subtitle': '学术职位、机构联系和所授课程',
                'section.contact.title': '联系方式',
                'section.contact.subtitle': '让我们联系并合作',
                'section.press.title': '媒体报道',
                'section.press.subtitle': '研究报道、专题报道和公众影响',
                'section.service.title': '学术服务',
                'section.service.subtitle': '同行评审员、编委会成员和委员会贡献者',
                'btn.downloadCV': '查看简历',
                'btn.visitLab': '访问SAAIL实验室',
                'btn.exploreLab': '探索SAAIL实验室',
                'btn.viewAll': '在Google Scholar上查看所有出版物',
                'btn.viewFullList': '查看完整出版物列表',
                'btn.allOnScholar': 'Google Scholar上的30+篇全部出版物',
                'btn.inviteSpeak': '邀请我演讲',
                'btn.moreOnScholar': '更多Scholar内容',
                'btn.getInTouch': '联系我',
                'lab.description': '通过道德创新、可持续发展和前沿技术，引领东非的变革性人工智能研究。我们的使命是开发人工智能解决方案，解决非洲大陆农业和医疗保健领域的关键挑战。',
                'lab.tag.precisionAg': '精准农业',
                'lab.tag.healthcareAI': '医疗人工智能',
                'lab.tag.deepLearning': '深度学习',
                'lab.tag.responsibleAI': '负责任的人工智能',
                'lab.tag.swahiliNLP': '斯瓦希里语NLP',
                'lab.tag.blockchain': '区块链',
                'news.cvpr2026.title': '🎉 SAAIL实验室论文被CVPR 2026录用——农业视觉研讨会，丹佛',
                'news.cvpr2026.excerpt': 'CLOVES-4603：第一个公开的丁香质量分级基准数据集——4,603张图像，深度学习准确率99.67%。SAAIL实验室在人工智能最负盛名的会场之一的骄傲时刻。',
                'news.iclr2026.title': '论文被ICLR 2026录用——可信人工智能研讨会，里约热内卢',
                'news.iclr2026.excerpt': '一个框架能否同时使人工智能更公平、更鲁棒、更具泛化能力？SAAIL实验室在ICLR 2026可信人工智能研讨会上被录用的论文给出了肯定回答。',
                'news.carafm.title': 'CARA-FM海报——DLI 2025最佳海报，被AI4Africa特别报道',
                'news.carafm.excerpt': '如果人工智能从一开始就是为非洲而设计的呢？这张在Deep Learning Indaba 2025获奖的海报吸引了AI4Africa全球网络的关注，引发了关于非洲人工智能未来的讨论。',
                'news.eacsti.title': '第四届EAC STI会议论文——卢旺达基加利·旅行补助金$980',
                'news.eacsti.excerpt': '桑给巴尔最珍贵的香料——首次由人工智能进行质量分级。为农民而建，不只是为农民。这项工作获得了竞争性旅行补助金，并在基加利的舞台上讲述了非洲的故事。',
                'news.editorial.title': '受任编委会成员——Discover Artificial Intelligence',
                'news.editorial.excerpt': '荣幸加入Discover Artificial Intelligence编委会，这是一本Springer Nature开放获取期刊，致力于推进人工智能研究与创新。',
                'news.fumba.title': '刊登于Fumba Times：最后的捕蚊行动',
                'news.fumba.excerpt': '发表文章重点介绍人工智能如何通过创新技术和智能捕蚊器帮助桑给巴尔实现疟疾消除。',
                'news.graduation.title': 'IIT马德拉斯桑给巴尔首届学位颁发典礼被Indian Express报道',
                'news.graduation.excerpt': '历史性的毕业典礼，IIT马德拉斯桑给巴尔庆祝其首届MTech数据科学和人工智能班。阅读完整报道。',
                'news.compag.title': 'Computers and Electronics in Agriculture新发表论文',
                'news.compag.excerpt': '我们关于"纠正木薯叶病害检测中极度微弱信号"的论文已发表（影响因子：7.7）。',
                'news.joinIITMZ.title': '加入IIT马德拉斯桑给巴尔担任助理教授',
                'news.joinIITMZ.excerpt': '很高兴以数据科学和人工智能助理教授的身份加入IIT马德拉斯桑给巴尔，并创建SAAIL实验室，为东非的变革性人工智能研究服务。',
                'news.tag.academicService': '学术服务',
                'news.tag.media': '媒体',
                'news.tag.mediaCoverage': '媒体报道',
                'news.tag.publication': '出版物',
                'news.tag.careerMilestone': '职业里程碑',
                'research.spotlight.badge': '特色项目',
                'research.spotlight.title': '丁香质量分级人工智能——坦桑尼亚桑给巴尔',
                'research.spotlight.desc': '与<strong>桑给巴尔国家贸易公司（ZSTC）</strong>合作，我们开发深度学习CNN模型，用于丁香的自动质量分级——桑给巴尔最重要的出口香料。这项工作将计算机视觉与当地农民的传统知识相结合，建立新型带注释的桑给巴尔丁香数据集和人工智能分级流水线，直接支持小农户和国家香料产业。',
                'research.spotlight.tag1': '深度学习（CNN）',
                'research.spotlight.tag2': '计算机视觉',
                'research.spotlight.tag3': '参与式人工智能设计',
                'research.spotlight.tag4': 'ZSTC合作',
                'research.spotlight.btn1': 'EAC STI 2026 — $980旅行补助金',
                'research.spotlight.btn2': '相关出版物',
                'research.interests.title': '研究兴趣',
                'research.projects.title': '当前研究项目',
                'research.collabs.title': '研究合作',
                'research.interest.ai': '人工智能（AI）',
                'research.interest.cv': '计算机视觉',
                'research.interest.ml': '机器学习（ML）',
                'research.interest.dl': '深度学习',
                'research.interest.nlp': '自然语言处理（NLP）',
                'research.interest.iot': '物联网（IoT）',
                'research.interest.robotics': '机器人学',
                'research.interest.dip': '数字图像处理',
                'research.interest.embedded': '嵌入式系统',
                'research.interest.ds': '数据科学',
                'research.interest.agritech': '农业技术',
                'research.interest.health': '医疗信息学',
                'research.proj1.title': '智慧农业人工智能',
                'research.proj1.desc': '开发人工智能技术以改善农业实践、提高资源管理效率并促进东非各地的可持续发展。重点在于作物病害检测、产量预测和精准农业。',
                'research.proj2.title': '医学影像——胎盘分析',
                'research.proj2.desc': '将人工智能应用于分析胎盘图像，以改善母婴健康诊断和监测。',
                'research.proj3.title': '斯瓦希里语语音与文本处理',
                'research.proj3.desc': '为斯瓦希里语开发自然语言处理工具，应用于东非社区的农业和医疗保健。',
                'research.proj4.title': '香料供应链区块链技术',
                'research.proj4.desc': '研究区块链技术以提高桑给巴尔著名香料供应链的透明度、可追溯性和效率。',
                'pub.verifiedProfile': '已验证档案',
                'pub.filter.all': '全部',
                'pub.mostCited.title': '被引用最多的论文',
                'pub.mostCited.sub': '共1,073+次引用 · h指数15',
                'pub.cited': '被引',
                'conf.type.paper': '论文',
                'conf.type.invitedTalk': '受邀报告',
                'conf.type.facultyTalk': '教师报告',
                'conf.type.confPaper': '会议论文',
                'conf.type.bestPoster': '最佳海报',
                'conf.bestPosterAward': '最佳海报奖',
                'conf.v4aWorkshop': 'V4A研讨会',
                'exp.badge.current': '当前',
                'exp.badge.past': '过去',
                'exp.job1.title': '助理教授，数据科学与人工智能',
                'exp.job1.dept': '工程与科学学院',
                'exp.job2.title': '副研究员',
                'exp.job3.title': '兼职讲师，计算机科学',
                'exp.job4.title': '博士研究员',
                'teaching.courses.title': 'IIT马德拉斯桑给巴尔课程',
                'teaching.course.activeBadge': '进行中 · 2026年3月–7月（偶数学期）',
                'teaching.course1.name': '数据库管理系统',
                'teaching.course1.level': 'BS核心课程',
                'teaching.course1.desc': '关系数据库、SQL、模式设计、规范化、事务和查询优化。',
                'teaching.course2.name': '大数据实验室',
                'teaching.course2.level': 'MTech实验课',
                'teaching.course2.desc': '实践Apache Spark、Apache Kafka、Apache Iceberg、Delta Lake和现代大规模数据工程工具。',
                'mentorship.stat.mtech': 'MTech指导',
                'mentorship.stat.phd': 'PhD联合指导',
                'mentorship.stat.graduated': '已毕业（2025）',
                'mentorship.stat.grants': '已提交资助申请',
                'mentorship.graduated.title': '已毕业学生',
                'mentorship.mtech.title': '当前MTech学生',
                'mentorship.phd.title': 'PhD联合指导',
                'mentorship.phd.count': '— 5名候选人',
                'teaching.prospective.title': '准学生',
                'teaching.prospective.desc': '我正在积极寻找对农业人工智能、医疗人工智能、计算机视觉或自然语言处理感兴趣的有进取心的MTech和PhD学生。加入SAAIL实验室，在东非从事具有现实影响的前沿研究。',
                'service.stat.peerReviews': '同行评审',
                'service.stat.journalsReviewed': '已评审期刊',
                'service.stat.editorialBoard': '编委会',
                'service.stat.bestPoster': '最佳海报奖',
                'service.stat.committees': '委员会（IITMZ）',
                'service.award.badge': '奖项',
                'service.award.title': '最佳海报奖——Deep Learning Indaba 2025',
                'service.award.desc': '在卢旺达基加利举办的Deep Learning Indaba 2025上荣获<strong>最佳海报奖（出版物与数据集类别）</strong>，奖励CARA-FMs框架——一种适应情境和负责任的东非农业人工智能方法。该研究还获得了负责任人工智能研讨会的口头报告机会，使SAAIL实验室的研究处于非洲领先机器学习会议的中心。',
                'service.peerReviewer.title': '同行评审员 · 19种期刊',
                'service.editorialBoard.title': '编委会',
                'service.institutional.title': '机构服务',
                'contact.primaryEmail': '主要邮箱',
                'contact.secondaryEmail': '次要邮箱',
                'contact.phone': '电话',
                'contact.phoneTZ': '电话（坦桑尼亚）',
                'contact.phoneKE': '电话（肯尼亚）',
                'contact.office': '办公地址',
                'contact.officeDetails': '工程与科学学院<br>IIT马德拉斯桑给巴尔校区<br>105办公室，F6门<br>邮政信箱394，桑给巴尔71101，坦桑尼亚',
                'contact.connectTitle': '与我联系',
                'footer.brandDesc': 'IIT马德拉斯桑给巴尔数据科学与人工智能助理教授。SAAIL实验室首席研究员——为东非的农业和医疗保健构建道德人工智能。',
                'footer.quickLinks': '快速链接',
                'footer.affiliations': '机构联系',
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

            // Insert into navbar before the hamburger toggle
            const navToggle = document.getElementById('navToggle');
            if (navToggle && navToggle.parentNode) {
                navToggle.parentNode.insertBefore(switcher, navToggle);
            } else {
                document.body.appendChild(switcher);
            }

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
