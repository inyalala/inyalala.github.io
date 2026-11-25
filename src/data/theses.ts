import rawThesisDetails from './thesis-details.json';
import { PUBLICATIONS } from './publications';

export interface ThesisChapter {
  label: string;
  title: string;
  venue: string;
  year: number;
  doi?: string;
  slug?: string;
}

export interface ThesisFigure {
  title?: string;
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export interface ThesisBenchmarkRow {
  study: string;
  venue: string;
  method: string;
  result: string;
}

export interface ThesisDetailSection {
  id: string;
  title: string;
  paragraphs?: string[];
  figure?: { title?: string; src: string; caption: string; alt?: string };
  figures?: { title?: string; src: string; caption: string; alt?: string }[];
  table?: { title: string; caption?: string; headers: string[]; rows: string[][] };
}

export interface ThesisHighlight {
  value: string;
  label: string;
  sublabel?: string;
}

export interface ThesisTable {
  title: string;
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface ThesisMonograph {
  slug: string;
  degree: string;
  shortLabel: string;
  title: string;
  institution: string;
  department: string;
  location: string;
  period: string;
  year: number;
  supervisors: string;
  scholarship?: string;
  summary: string;
  archivalNote: string;
  abstract?: string;
  teaserImage?: string;
  teaserCaption?: string;
  highlights?: ThesisHighlight[];
  resultsSummary?: string;
  methods: string[];
  figures?: ThesisFigure[];
  benchmarkRows?: ThesisBenchmarkRow[];
  extraTables?: ThesisTable[];
  detailSections?: ThesisDetailSection[];
  chapters: ThesisChapter[];
  bibtex: string;
}

const phdRich = (rawThesisDetails as any).phd || {};
const mscRich = (rawThesisDetails as any).msc || {};

export const THESES: ThesisMonograph[] = [
  {
    slug: 'phd-dissertation-2023',
    degree: 'Doctor of Philosophy (Ph.D.) in Engineering',
    shortLabel: 'Ph.D. Dissertation · NAU 2023',
    title: 'Research on Agricultural Products Volume Estimation Method Based on Depth Imaging and Machine Learning Technology',
    institution: 'Nanjing Agricultural University',
    department: 'Agricultural Electrification and Automation Engineering, College of Engineering',
    location: 'Nanjing, China',
    period: 'September 2017 - December 2023',
    year: 2023,
    supervisors: 'Prof. Chen Kunjie',
    scholarship: 'China Scholarship Council (CSC) Ph.D. Scholarship',
    summary:
      'Doctoral research formulating calibrated RGB, depth-camera imaging, and 3-D point-cloud reconstruction pipelines paired with machine learning estimators for non-destructive volume and mass quantification across tomatoes, eggs, and poultry carcasses.',
    archivalNote:
      `Indexed separately on this personal archive as a degree monograph and excluded from the ${PUBLICATIONS.length} journal articles, peer-reviewed conference papers, and manuscripts under review tally. All six peer-reviewed doctoral chapter publications host standalone companion pages under /papers/ alongside their permanent DOIs.`,
    abstract: phdRich.abstract,
    teaserImage: phdRich.teaserImage,
    teaserCaption: phdRich.teaserCaption,
    highlights: phdRich.highlights,
    resultsSummary: phdRich.resultsSummary,
    extraTables: phdRich.tables,
    detailSections: phdRich.detailSections,
    methods: [
      'Depth Sensor Calibration & 3-D Surface Reconstruction',
      '2-D Geometric & Occlusion-Tolerant Shape Features',
      'Support Vector, Gradient Boosting & Neural Regression Models',
      'Inline High-Throughput Poultry & Horticultural Metrology'
    ],
    figures: [
      {
        title: 'Calibrated Overhead Kinect Acquisition Station (0.7 m)',
        src: '/images/theses/phd-tomato-station.webp',
        alt: 'Overhead Kinect depth imaging station calibrated at 0.7 meters above a moving cherry tomato conveyor',
        caption: 'Overhead Kinect depth acquisition rig (0.7 m height) capturing multi-orientation cherry tomato silhouettes without contact.',
        width: 1422,
        height: 998
      },
      {
        title: 'Conveyor Occlusion Contour Approximation',
        src: '/images/theses/phd-occlusion-split.webp',
        alt: 'Polygon approximation and watershed segmentation splitting partially occluded tomato clusters on a conveyor belt',
        caption: 'Concave-convex contour approximation splitting touching tomato clusters prior to RBF-SVM volume estimation (R² = 0.982).',
        width: 938,
        height: 596
      },
      {
        title: 'Broiler Carcass Depth Silhouette & 3-D Mesh Pipeline',
        src: '/images/theses/phd-carcass-3d.webp',
        alt: 'Calibrated Kinect v2 depth silhouettes and 3-D point clouds of poultry carcasses on a shackle line',
        caption: 'Multi-stage depth background subtraction and 3-D surface-integration point clouds for live broiler carcass grading (R² = 0.9988).',
        width: 1300,
        height: 1326
      }
    ],
    benchmarkRows: [
      {
        study: 'Cherry Tomatoes (Single)',
        venue: 'J. Food Engineering (2019)',
        method: 'RBF-SVR + Allometric Power Law',
        result: '96.94% vol. acc · 97.06% mass acc · Power-law R² = 0.9824'
      },
      {
        study: 'Chicken Eggs (Isolated & Occluded)',
        venue: 'J. Food Engineering (2020)',
        method: 'Curvature + M-Circle + Exp. GPR',
        result: 'R² = 0.984 · RMSE = 1.175 cm³ (1.080 / 1.294 occluded)'
      },
      {
        study: 'Occluded Tomato Clusters',
        venue: 'Int. J. Food Properties (2021)',
        method: 'Polygon Split + RBF-SVM / Bayesian ANN',
        result: 'R² = 0.982 (vol., RMSE 1.268 cm³) · R² = 0.971 (weight)'
      },
      {
        study: 'Broiler Carcass & 4 Commercial Cuts',
        venue: 'Poultry Science (2021)',
        method: 'Active Shape Model + Bayesian ANN / RBF-SVR',
        result: 'Whole R² = 0.9981 · Wings R² = 0.9896 · Head/neck R² = 0.9847'
      },
      {
        study: '3-D Conveyor Carcass Reconstruction',
        venue: 'Poultry Science (2024)',
        method: 'Kinect v2 3-D Mesh + Bagged Tree',
        result: 'R² = 0.9988 · RMSE = 5.335 cm³ · ARE = 2.125% · < 1.6 s'
      }
    ],
    chapters: [
      {
        label: 'Chapter Publication I',
        title: 'Tomato volume and mass estimation using computer vision and machine learning algorithms: Cherry tomato model',
        venue: 'Journal of Food Engineering (Elsevier), Vol. 263, pp. 288-298',
        year: 2019,
        doi: '10.1016/j.jfoodeng.2019.07.012',
        slug: 'cherry-tomato-volume-2019'
      },
      {
        label: 'Chapter Publication II',
        title: 'Egg volume estimation based on image processing and computer vision',
        venue: 'Journal of Food Engineering (Elsevier), Vol. 283, 110041',
        year: 2020,
        doi: '10.1016/j.jfoodeng.2020.110041',
        slug: 'egg-volume-cv-2020'
      },
      {
        label: 'Chapter Publication III',
        title: 'Weight and volume estimation of single and occluded tomatoes using machine vision',
        venue: 'International Journal of Food Properties (Taylor & Francis), Vol. 24, pp. 818-832',
        year: 2021,
        doi: '10.1080/10942912.2021.1933024',
        slug: 'occluded-tomatoes-2021'
      },
      {
        label: 'Chapter Publication IV',
        title: 'Weight and volume estimation of poultry and products based on computer vision systems: a review',
        venue: 'Poultry Science (Elsevier), Vol. 100, 101072',
        year: 2021,
        doi: '10.1016/j.psj.2021.101072',
        slug: 'poultry-cv-review-2021'
      },
      {
        label: 'Chapter Publication V',
        title: 'On-line weight estimation of broiler carcass and cuts by a computer vision system',
        venue: 'Poultry Science (Elsevier), Vol. 100, 101474',
        year: 2021,
        doi: '10.1016/j.psj.2021.101474',
        slug: 'broiler-carcass-weight-2021'
      },
      {
        label: 'Chapter Publication VI',
        title: 'Online chicken carcass volume estimation using depth imaging and 3-D reconstruction',
        venue: 'Poultry Science (Elsevier), Vol. 103, 104232',
        year: 2024,
        doi: '10.1016/j.psj.2024.104232',
        slug: 'chicken-carcass-3d-2024'
      }
    ],
    bibtex: `@phdthesis{nyalala2023volume,\n  title={Research on Agricultural Products Volume Estimation Method Based on Depth Imaging and Machine Learning Technology},\n  author={Nyalala, Innocent},\n  school={Nanjing Agricultural University},\n  department={College of Engineering, Agricultural Electrification and Automation Engineering},\n  address={Nanjing, China},\n  year={2023},\n  note={Supervisor: Prof. Chen Kunjie}\n}`
  },
  {
    slug: 'msc-thesis-2016',
    degree: 'Master of Science (M.Sc.) in Engineering',
    shortLabel: 'M.Sc. Thesis · NAU 2016',
    title: 'Intelligent Control and Monitoring System Based on Arduino for the Greenhouse Environment',
    institution: 'Nanjing Agricultural University',
    department: 'Computer Science and Technology',
    location: 'Nanjing, China',
    period: 'September 2013 - July 2016',
    year: 2016,
    supervisors: 'Prof. Bai Zhentian and Prof. Xu Huanliang',
    scholarship: 'China Scholarship Council (CSC) Master’s Scholarship',
    summary:
      'Master of Science in Engineering thesis designing and building an embedded Arduino microcontroller architecture combining temperature, soil moisture, humidity, and light sensing with closed-loop actuation rules and serial telemetry for protected crop cultivation.',
    archivalNote:
      `Indexed separately on this personal archive as a degree monograph and excluded from the ${PUBLICATIONS.length} journal articles, peer-reviewed conference papers, and manuscripts under review tally.`,
    abstract: mscRich.abstract,
    highlights: mscRich.highlights,
    extraTables: mscRich.tables,
    methods: [
      'Arduino Microcontroller Firmware & Interrupt Loops',
      'Multi-Sensor Microclimate Telemetry Calibration',
      'Threshold & Hysteresis Actuation Control',
      'Real-Time Serial Monitoring Interface'
    ],
    chapters: [
      {
        label: 'Monograph Record',
        title: 'Intelligent Control and Monitoring System Based on Arduino for the Greenhouse Environment',
        venue: 'Nanjing Agricultural University (M.Sc. in Engineering Thesis Monograph, Supervisors: Prof. Bai Zhentian & Prof. Xu Huanliang)',
        year: 2016
      }
    ],
    bibtex: `@mastersthesis{nyalala2016greenhouse,\n  title={Intelligent Control and Monitoring System Based on Arduino for the Greenhouse Environment},\n  author={Nyalala, Innocent},\n  school={Nanjing Agricultural University},\n  department={Computer Science and Technology},\n  address={Nanjing, China},\n  year={2016},\n  note={Supervisors: Prof. Bai Zhentian and Prof. Xu Huanliang}\n}`
  }
];
