import metrics from './scholar-metrics.json';
import { PUBLICATIONS } from './publications';

const dynamicCiteValue = `${metrics.citations.toLocaleString('en-US')} citations · h-index ${metrics.hIndex}`;
const dynamicPaperCount = PUBLICATIONS.length;
const dynamicCitationStr = metrics.citations.toLocaleString('en-US');

export const PROFILE = {
  name: 'Innocent Nyalala',
  fullTitle: 'Innocent Nyalala, PhD',
  role: 'Assistant Professor of Data Science and Artificial Intelligence',
  school: 'School of Engineering and Science',
  institution: 'Indian Institute of Technology Madras Zanzibar',
  institutionShort: 'IIT Madras Zanzibar',
  secondaryRole: 'Associate Research Fellow',
  secondaryAffiliation: 'Wadhwani School of Data Science and Artificial Intelligence, Indian Institute of Technology Madras',
  secondaryLocation: 'Chennai, India',
  labRole: 'Founder and Principal Investigator',
  labName: 'Sustainable AI for Agriculture and Intelligent Livelihoods (SAAIL) Lab',
  labShort: 'SAAIL Lab',
  labUrl: 'https://saaillab.github.io/',
  siteUrl: 'https://inyalala.github.io/',
  facultyProfileUrl: 'https://www.iitmz.ac.in/schools/engineering-and-science/faculty/prof-innocent-nyalala',
  teachingSiteUrl: 'https://inyalala.github.io/iitmz-teaching-site/',
  teachingSiteRepoUrl: 'https://github.com/inyalala/iitmz-teaching-site',
  cvUrl: 'https://drive.google.com/drive/folders/1CbcLd6g3chAAzOIp5gescR7A0eQFuYYj?usp=sharing',
  email: 'innocent@iitmz.ac.in',
  labEmail: 'saail_lab@iitmz.ac.in',
  personalEmail: 'innocentnyalala@gmail.com',
  phoneTanzania: '+255 753 864 855',
  phoneKenya: '+254 791 349 216',
  office: 'Room 105 (F1), School of Engineering and Science',
  campusAddress: 'Indian Institute of Technology Madras Zanzibar, Bweleo, P.O. Box 2496, Zanzibar, Tanzania',
  officeHours: 'Wednesday, 2:00 PM - 4:00 PM EAT',
  officeHoursNote: 'In-person in Room 105 (F1) or by scheduled appointment via email.',
  mapUrl: 'https://maps.google.com/?q=-6.29556,39.28768',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.758924022172!2d39.28473167587706!3d-6.295379493693693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185cdff7515a28e9%3A0x20c991993b471d60!2sIIT%20Madras%20-%20Zanzibar!5e0!3m2!1sen!2ske!4v1742633545660!5m2!1sen!2ske',
  portrait: '/images/innocent-nyalala-zanzibar.jpg',
  portraitAlt: 'Innocent Nyalala, Assistant Professor of Data Science and AI at IIT Madras Zanzibar',
  ogImage: 'https://inyalala.github.io/images/og-innocent-nyalala.png',
  socials: [
    {
      label: 'Google Scholar',
      handle: 'jYVzIZUAAAAJ',
      url: 'https://scholar.google.com/citations?user=jYVzIZUAAAAJ&hl=en',
      icon: '/images/icons/Google_Scholar_logo.svg'
    },
    {
      label: 'ORCID',
      handle: '0000-0002-7969-437X',
      url: 'https://orcid.org/0000-0002-7969-437X',
      icon: '/images/icons/ORCID_iD.svg'
    },
    {
      label: 'Scopus',
      handle: '57190215419',
      url: 'https://www.scopus.com/authid/detail.uri?authorId=57190215419',
      icon: '/images/icons/scopus-icon.svg'
    },
    {
      label: 'OpenReview',
      handle: '~Innocent_Nyalala1',
      url: 'https://openreview.net/profile?id=~Innocent_Nyalala1',
      icon: '/images/icons/openreview-icon.svg'
    },
    {
      label: 'GitHub',
      handle: 'inyalala',
      url: 'https://github.com/inyalala',
      icon: '/images/icons/icons8-github.svg'
    },
    {
      label: 'LinkedIn',
      handle: 'innocentnyalala',
      url: 'https://www.linkedin.com/in/innocentnyalala/',
      icon: '/images/icons/LinkedIn_icon.svg'
    },
    {
      label: 'ResearchGate',
      handle: 'Innocent-Nyalala',
      url: 'https://www.researchgate.net/profile/Innocent-Nyalala',
      icon: '/images/icons/ResearchGate_icon_SVG.svg'
    },
    {
      label: 'OpenAlex',
      handle: 'A5013656785',
      url: 'https://openalex.org/A5013656785',
      icon: '/images/icons/openalex-icon.svg'
    }
  ],
  academicIdentifiers: [
    { label: 'Google Scholar', value: dynamicCiteValue, url: 'https://scholar.google.com/citations?user=jYVzIZUAAAAJ&hl=en', icon: '/images/icons/Google_Scholar_logo.svg' },
    { label: 'ORCID', value: '0000-0002-7969-437X', url: 'https://orcid.org/0000-0002-7969-437X', icon: '/images/icons/ORCID_iD.svg' },
    { label: 'Scopus Author ID', value: '57190215419', url: 'https://www.scopus.com/authid/detail.uri?authorId=57190215419', icon: '/images/icons/scopus-icon.svg' },
    { label: 'Web of Science ResearcherID', value: 'X-4277-2018', url: 'https://www.webofscience.com/wos/author/record/X-4277-2018', icon: '/images/icons/wos-icon.svg' },
    { label: 'OpenReview', value: '~Innocent_Nyalala1', url: 'https://openreview.net/profile?id=~Innocent_Nyalala1', icon: '/images/icons/openreview-icon.svg' },
    { label: 'Semantic Scholar', value: 'Author Profile (3406658)', url: 'https://www.semanticscholar.org/author/3406658', icon: '/images/icons/semanticscholar-icon.svg' },
    { label: 'OpenAlex', value: 'Author Record (A5013656785)', url: 'https://openalex.org/A5013656785', icon: '/images/icons/openalex-icon.svg' },
    { label: 'GitHub', value: '@inyalala', url: 'https://github.com/inyalala', icon: '/images/icons/icons8-github.svg' },
    { label: 'Frontiers Loop', value: 'Research Profile (277165)', url: 'https://loop.frontiersin.org/people/277165/overview', icon: '/images/icons/frontiers-loop-icon.svg' },
    { label: 'SciProfiles (MDPI)', value: 'Author Profile (1588237)', url: 'https://sciprofiles.com/profile/1588237', icon: '/images/icons/sciprofiles-icon.svg' },
    { label: 'IIT Madras Zanzibar Faculty', value: 'School of Engineering & Science', url: 'https://www.iitmz.ac.in/schools/engineering-and-science/faculty/prof-innocent-nyalala', icon: '/images/icons/iitmz-crest.webp' },
    { label: 'Discover AI Editorial Board', value: 'Springer Nature', url: 'https://link.springer.com/journal/44163/editorial-board', icon: '/images/icons/springer-discover-icon.svg' }
  ],
  appointments: [
    {
      role: 'Assistant Professor of Data Science and Artificial Intelligence',
      institution: 'School of Engineering and Science, Indian Institute of Technology Madras Zanzibar',
      location: 'Zanzibar, Tanzania',
      period: 'October 2024 - Present',
      current: true
    },
    {
      role: 'Founder and Principal Investigator, SAAIL Lab',
      institution: 'Indian Institute of Technology Madras Zanzibar',
      location: 'Zanzibar, Tanzania',
      period: 'October 2024 - Present',
      current: true
    },
    {
      role: 'Associate Research Fellow',
      institution: 'Wadhwani School of Data Science and Artificial Intelligence, IIT Madras',
      location: 'Chennai, India',
      period: '2024 - Present',
      current: true
    },
    {
      role: 'Part-Time Lecturer, Department of Computer Science',
      institution: 'Egerton University',
      location: 'Nakuru, Kenya',
      period: 'April 2022 - December 2024',
      current: false
    }
  ],
  education: [
    {
      degree: 'Doctor of Philosophy (Ph.D.) in Engineering: Agricultural Electrification and Automation Engineering',
      institution: 'Nanjing Agricultural University',
      location: 'Nanjing, China',
      period: 'September 2017 - December 2023',
      supervisors: 'Prof. Chen Kunjie',
      thesisTitle: 'Research on Agricultural Products Volume Estimation Method Based on Depth Imaging and Machine Learning Technology',
      detail: 'China Scholarship Council (CSC) Ph.D. Scholarship. Research across 2-D computer vision, depth sensing, 3-D point-cloud reconstruction, and machine learning regression for tomatoes, eggs, and poultry carcasses.'
    },
    {
      degree: 'Master of Science (M.Sc.) in Engineering: Computer Science and Technology',
      institution: 'Nanjing Agricultural University',
      location: 'Nanjing, China',
      period: 'September 2013 - July 2016',
      supervisors: 'Prof. Bai Zhentian and Prof. Xu Huanliang',
      thesisTitle: 'Intelligent Control and Monitoring System Based on Arduino for the Greenhouse Environment',
      detail: 'China Scholarship Council (CSC) Master’s Scholarship. Embedded multi-sensor microclimate telemetry and closed-loop greenhouse control hardware.'
    }
  ],
  awardsAndService: [
    {
      year: '2026',
      title: 'Best Poster Award, Deep Learning Indaba 2026 (Lagos, Nigeria)',
      detail: 'Awarded for DGS-Bench: Measuring the Deployment Gap in African Agricultural AI Requires Balanced Metrics (18 accepted out of 114 submissions).'
    },
    {
      year: '2026',
      title: 'Exploratory Research Project Grant (ERP 2026-27), IC&SR, IIT Madras',
      detail: 'Rs. 9.35 lakhs awarded for CashewAI: Phenology-aware dual-stream deep learning in East African smallholder cashew orchards (Aug 2026 - Jul 2027).'
    },
    {
      year: '2026',
      title: 'AI4EAC / 4th EAC STI Competitive Travel Grant ($980)',
      detail: 'Competitive travel funding for ZSTC-Clove-V1 deep learning clove quality inspection presented in Kigali, Rwanda.'
    },
    {
      year: '2025',
      title: 'Best Poster Award (Publication & Dataset Category), Deep Learning Indaba 2025 (Kigali, Rwanda)',
      detail: 'Awarded for CARA-FM: Culturally Attuned and Resource-Aware Foundation Models for East African Agriculture (published in PMLR Vol. 302).'
    },
    {
      year: '2025 - Present',
      title: 'Editorial Board Member, Discover Artificial Intelligence (Springer Nature)',
      detail: 'Serving on the international editorial board handling manuscripts in responsible AI, computer vision, and machine learning.'
    },
    {
      year: '2025 - Present',
      title: 'Peer Reviewer, ICML & NeurIPS',
      detail: 'Program committee and technical reviewer for flagship machine learning conferences and Q1 agricultural engineering journals.'
    }
  ],
  bios: {
    oneLine: 'Innocent Nyalala is an Assistant Professor of Data Science and Artificial Intelligence at the School of Engineering and Science, Indian Institute of Technology Madras Zanzibar, and Principal Investigator of SAAIL Lab.',
    short: 'Innocent Nyalala is an Assistant Professor of Data Science and Artificial Intelligence at the School of Engineering and Science, Indian Institute of Technology Madras Zanzibar, and an Associate Research Fellow at the Wadhwani School of Data Science and Artificial Intelligence, IIT Madras. He founded and directs the Sustainable AI for Agriculture and Intelligent Livelihoods (SAAIL) Lab in Zanzibar, Tanzania, developing lightweight computer vision systems for African agriculture and blue-economy commodities, native Swahili language evaluation benchmarks, deployment-gap audits, and clinical machine learning models. His work has appeared in ETRI Journal, Computers and Electronics in Agriculture, Expert Systems with Applications, PMLR, workshops at CVPR, ICLR, and AAAI, Oxford TAIS, and Deep Learning Indaba, where he earned consecutive Best Poster Awards in 2025 and 2026.',
    long: `Innocent Nyalala serves as Assistant Professor of Data Science and Artificial Intelligence within the School of Engineering and Science at the Indian Institute of Technology Madras Zanzibar, Tanzania, and as Associate Research Fellow at the Wadhwani School of Data Science and Artificial Intelligence, IIT Madras, Chennai. Prior to joining IIT Madras Zanzibar in October 2024, he served as Part-Time Lecturer in the Department of Computer Science at Egerton University in Kenya, after earning his M.Sc. in Engineering (2016, supervised by Prof. Bai Zhentian and Prof. Xu Huanliang) and Ph.D. in Engineering in Agricultural Electrification and Automation Engineering (2023, supervised by Prof. Chen Kunjie) at Nanjing Agricultural University. At IIT Madras Zanzibar, he founded SAAIL Lab, supervising PhD, MTech, and undergraduate researchers across four areas: computer vision for East African agricultural commodities and coastal seaweed cultivation systems, Swahili natural language processing and translationese provenance auditing, explainable and culturally grounded AI safety governance, and maternal-neonatal clinical machine learning. His research record comprises ${dynamicPaperCount} journal articles, peer-reviewed conference papers, and manuscripts under review alongside both graduate thesis monographs, ${dynamicCitationStr} Google Scholar citations, an h-index of ${metrics.hIndex}, two consecutive Deep Learning Indaba Best Poster Awards (Kigali 2025 and Lagos 2026), and editorial board service on Discover Artificial Intelligence (Springer Nature).`
  }
} as const;
