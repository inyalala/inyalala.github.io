export interface AbcResearchRef {
  title: string;
  venue: string;
  year: number;
  note: string;
  href: string;
}

export interface AbcEntry {
  letter: string;
  slug: string;
  title: string;
  subdomain: string;
  image: string;
  thumb: string;
  imageAlt: string;
  credit: string;
  plainSummary: string;
  stateOfTheArt: string;
  openProblems: string;
  ourResearch?: {
    lead: string;
    refs: AbcResearchRef[];
  };
}

export const ABCS_ENTRIES: AbcEntry[] = [
  {
    letter: 'A',
    slug: 'a-autonomous-tractors',
    title: 'Autonomous Tractors',
    subdomain: 'Field Robotics & Control',
    image: '/images/writing/abcs/a-autonomous-tractors.webp',
    thumb: '/images/thumbs/writing/abcs/a-autonomous-tractors.webp',
    imageAlt: 'High-clearance precision row-crop tractor working across an open agricultural field',
    credit: 'Wikimedia Commons (USDAgov, Public domain)',
    plainSummary:
      'An autonomous tractor steers, modulates speed, raises implements at headlands, and avoids field obstacles using GNSS positioning, LiDAR, stereo cameras, and controller area network (CAN-bus) actuation rather than continuous steering wheel input from an operator.',
    stateOfTheArt:
      'Commercial units combine RTK-GNSS centimeter navigation with multi-camera perception stacks and automated emergency stop watchdogs during primary tillage and seeding.',
    openProblems:
      'Reliable hazard perception through dense harvest dust, steep smallholder contours, fragmented unmapped plot boundaries, and affordable retrofits for aging mechanical tractors remain open engineering targets.'
  },
  {
    letter: 'B',
    slug: 'b-big-data',
    title: 'Big Data',
    subdomain: 'Distributed Ingestion & Telemetry',
    image: '/images/writing/abcs/b-big-data.webp',
    thumb: '/images/thumbs/writing/abcs/b-big-data.webp',
    imageAlt: 'Systems engineer inspecting a laptop next to high-density compute server racks',
    credit: 'Wikimedia Commons (Derrick Coetzee, CC0)',
    plainSummary:
      'Agricultural big data spans multi-terabyte collections defined by the five Vs: Volume (multi-year imagery and telemetry), Velocity (real-time weather and cold-chain feeds), Variety (leaf photographs, satellite rasters, market prices, Swahili SMS advisories), Veracity (sensor drift and uncalibrated phone photographs), and Value (actionable farm decisions).',
    stateOfTheArt:
      'Distributed lakehouse pipelines running Apache Spark and Parquet partitions join multi-season yield histories, satellite time series, and regional market price registries into reproducible feature tables.',
    openProblems:
      'Harmonizing missing weather logs, linking farm observations without disclosing smallholder identities, and processing offline mobile uploads across rural cellular networks remain difficult.',
    ourResearch: {
      lead: 'Taught at IIT Madras Zanzibar inside Z3003 (Data Mining: Scaling to Large Data) and Z5008 (Big Data Lab) using PySpark ETL and large-scale partitioning:',
      refs: [
        {
          title: 'Z3003 Data Mining: Scaling to Large Data (BS Core)',
          venue: 'IIT Madras Zanzibar · Odd Semester 2026-27',
          year: 2026,
          note: 'Covers MapReduce, PySpark RDDs, MinHash LSH, and streaming analytics across large tabular and sensor archives.',
          href: '/courses/z3003/'
        },
        {
          title: 'Z5008 Big Data Lab (MTech Core Lab)',
          venue: 'IIT Madras Zanzibar · Archive',
          year: 2026,
          note: 'Hands-on distributed processing pipelines for structured and semi-structured scientific datasets.',
          href: '/courses/z5008/'
        }
      ]
    }
  },
  {
    letter: 'C',
    slug: 'c-computer-vision',
    title: 'Computer Vision',
    subdomain: 'Calibrated RGB & Depth Perception',
    image: '/images/writing/abcs/c-computer-vision.webp',
    thumb: '/images/thumbs/writing/abcs/c-computer-vision.webp',
    imageAlt: 'Pipeline diagram from Nyalala et al. (2019) mapping RGB-depth tomato imaging to volume and mass estimation',
    credit: 'Nyalala et al., Journal of Food Engineering (2019)',
    plainSummary:
      'Computer vision extracts measurable geometry, color distributions, lesion boundaries, and texture patterns from digital photographs, depth cameras, or processing-line videos so farms and packing lines inspect produce non-destructively.',
    stateOfTheArt:
      'Hybrid CNN-Transformer backbones and calibrated stereo depth rigs quantify size, count defects, and segment infected crop regions on offline Android handsets in milliseconds.',
    openProblems:
      'Strong afternoon glare, dusty camera lenses, leaf wind blur, and shortcut correlations on laboratory grey backgrounds still cause models to degrade in open fields.',
    ourResearch: {
      lead: 'Foundational focus of SAAIL Lab spanning horticultural fruit sizing, egg geometry modeling, and 3-D poultry depth vision:',
      refs: [
        {
          title: 'Tomato volume and mass estimation using computer vision and machine learning algorithms: Cherry tomato model',
          venue: 'Journal of Food Engineering (Vol. 263)',
          year: 2019,
          note: 'Benchmarked calibrated depth-RGB morphological features paired with SVR and ANN mass/volume estimators.',
          href: 'https://doi.org/10.1016/j.jfoodeng.2019.07.012'
        },
        {
          title: 'Online chicken carcass volume estimation using depth imaging and 3-D reconstruction',
          venue: 'Poultry Science (Vol. 103)',
          year: 2024,
          note: 'Reconstructed live moving poultry carcass volume from paired depth maps at line speed.',
          href: 'https://doi.org/10.1016/j.psj.2024.104232'
        },
        {
          title: 'Egg volume estimation based on image processing and computer vision',
          venue: 'Journal of Food Engineering (Vol. 283)',
          year: 2020,
          note: 'Non-contact geometric parameter extraction and polynomial volume calibration.',
          href: 'https://doi.org/10.1016/j.jfoodeng.2020.110041'
        }
      ]
    }
  },
  {
    letter: 'D',
    slug: 'd-disease-detection',
    title: 'Disease Detection',
    subdomain: 'Pathology Screening & Early Warning',
    image: '/images/writing/abcs/d-disease-detection.webp',
    thumb: '/images/thumbs/writing/abcs/d-disease-detection.webp',
    imageAlt: 'Five East African cassava leaf classes showing CMD, CBSD, CGM, CBB, and healthy foliage',
    credit: 'SAAIL Lab field dataset archive (East Africa)',
    plainSummary:
      'Automated disease detection helps extension officers and farmers distinguish viral mosaics, fungal lesions, bacterial blights, and nutrient stress early in a season before symptoms devastate regional food security.',
    stateOfTheArt:
      'Lightweight cross-crop models deduplicated via perceptual hashing (pHash) suppress subtle foliar noise and report per-class sensitivity rather than inflated aggregate accuracy.',
    openProblems:
      'Field co-infections where multiple pathogens appear on the same leaf, healthy leaves falsely flagged for severe disease, and scarce annotated cohorts in new districts remain central risks.',
    ourResearch: {
      lead: 'Spanning cross-crop leaf networks, weakened-signal cassava restoration, and early livestock screening:',
      refs: [
        {
          title: 'CropGuardNet: A Unified Lightweight CNN-Transformer Framework with Multi-Scale Attention and Explainable AI',
          venue: 'SAAIL Lab (Under Review)',
          year: 2026,
          note: '481,574 parameters (5.00 ms CPU ONNX) trained on 35,420 UUID- and pHash-deduplicated leaf images across 8 crops and 38 classes (99.17% accuracy).',
          href: 'https://saaillab.github.io/papers/cropguardnet/'
        },
        {
          title: 'Rectifying the extremely weakened signals for cassava leaf disease detection',
          venue: 'Computers and Electronics in Agriculture',
          year: 2025,
          note: 'Recovers faint early chlorosis and mosaic cues across field cassava imagery.',
          href: 'https://doi.org/10.1016/j.compag.2025.110107'
        },
        {
          title: 'MAIANet: Signal modulation in cassava leaf disease classification',
          venue: 'Computers and Electronics in Agriculture',
          year: 2024,
          note: 'Multi-scale feature modulation adapted for Ugandan smallholder field photographs.',
          href: 'https://doi.org/10.1016/j.compag.2024.109351'
        },
        {
          title: 'A machine vision system for early detection and prediction of sick birds: A broiler chicken model',
          venue: 'Biosystems Engineering (Vol. 188)',
          year: 2019,
          note: 'Automated behavioral feature monitoring predicting Newcastle infection prior to flock spread.',
          href: 'https://doi.org/10.1016/j.biosystemseng.2019.09.015'
        }
      ]
    }
  },
  {
    letter: 'E',
    slug: 'e-edge-computing',
    title: 'Edge Computing',
    subdomain: 'Offline Mobile & Microcontroller AI',
    image: '/images/writing/abcs/e-edge-computing.webp',
    thumb: '/images/thumbs/writing/abcs/e-edge-computing.webp',
    imageAlt: 'Compact Raspberry Pi single-board computer with attached optical camera ribbon module',
    credit: 'Wikimedia Commons (ZippeyKeys12, CC BY-SA 4.0)',
    plainSummary:
      'Edge computing runs neural models directly on smartphones, Jetson modules, or solar field boxes right at the farm plot so diagnosis requires zero cellular signal or cloud GPU fees.',
    stateOfTheArt:
      'INT8 quantization, depthwise separable convolutions, and ONNX Runtime / TensorFlow Lite export bring sub-2 MB classifiers down to single-digit milliseconds on standard Android CPUs.',
    openProblems:
      'Balancing compact parameter footprints against cross-field accuracy, thermal throttling under tropical noon sun, and verifiable model version updates in disconnected clinics.',
    ourResearch: {
      lead: 'All SAAIL Lab mobile field models target strict memory and latency budgets suitable for low-cost devices:',
      refs: [
        {
          title: 'CARA-FM: Culturally Attuned and Resource-Aware Foundation Models for East African Agriculture',
          venue: 'PMLR Vol. 302 · Deep Learning Indaba Best Poster 2025',
          year: 2026,
          note: 'Formulates sub-5 MB edge-first architectural constraints alongside solar-aware rural adaptation.',
          href: 'https://saaillab.github.io/papers/cara-fm/'
        },
        {
          title: 'CropGuardNet ONNX CPU Benchmark (1.84 MB, 5.00 ms Latency)',
          venue: 'SAAIL Lab · GitHub Release',
          year: 2026,
          note: 'Demonstrates 200 FPS CPU inference without external cloud dependencies.',
          href: 'https://saaillab.github.io/papers/cropguardnet/'
        }
      ]
    }
  },
  {
    letter: 'F',
    slug: 'f-forecasting',
    title: 'Forecasting',
    subdomain: 'Microclimate & Monsoon Modeling',
    image: '/images/writing/abcs/f-forecasting.webp',
    thumb: '/images/thumbs/writing/abcs/f-forecasting.webp',
    imageAlt: 'Automatic rural weather station mast beneath overcast coastal skies',
    credit: 'Wikimedia Commons (Calum Young, CC BY-SA 2.0)',
    plainSummary:
      'Agricultural forecasting predicts localized rainfall onset, heat-stress windows, evapotranspiration, and pest outbreaks days or weeks ahead so planting schedules and coastal aquaculture harvests adapt before losses occur.',
    stateOfTheArt:
      'Physics-informed graph weather networks and bias-corrected ensemble forecasts fuse satellite reanalysis grids with local automatic weather station records.',
    openProblems:
      'East African coastal islands experience steep topographic and sea-breeze microclimates that coarse global models miss when station density is sparse.'
  },
  {
    letter: 'G',
    slug: 'g-gps-guidance',
    title: 'GPS Guidance',
    subdomain: 'Sub-Decimeter Track & Boundary Control',
    image: '/images/writing/abcs/g-gps-guidance.webp',
    thumb: '/images/thumbs/writing/abcs/g-gps-guidance.webp',
    imageAlt: 'Aerial farmland parcel showing parallel tractor tramlines across green crops',
    credit: 'Wikimedia Commons (Dietmar Rabich, CC BY-SA 4.0)',
    plainSummary:
      'GNSS and Real-Time Kinematic (RTK) guidance steer tractors and sprayer booms along repeatable sub-decimeter tramlines, stopping double-passes that waste diesel, fertilizer, and seed.',
    stateOfTheArt:
      'Dual-frequency multi-constellation GNSS receivers maintain controlled traffic tracks and automatic section shutoffs on irregular headlands.',
    openProblems:
      'Multi-story smallholder agroforestry plots, dense tropical tree canopies that attenuate satellite signals, and sparse public RTK base stations across rural districts.'
  },
  {
    letter: 'H',
    slug: 'h-harvest-robots',
    title: 'Harvest Robots',
    subdomain: 'Occluded Perception & Manipulation',
    image: '/images/writing/abcs/h-harvest-robots.webp',
    thumb: '/images/thumbs/writing/abcs/h-harvest-robots.webp',
    imageAlt: 'Segmentation plate from Nyalala et al. (2021) separating single and heavily occluded tomato clusters',
    credit: 'Nyalala et al., Int. J. Food Properties (2021)',
    plainSummary:
      'Robotic harvesters pair ripeness perception and 3-D pose localization with compliant end-effectors to pick delicate tomatoes, citrus, or orchard berries without bruising nearby stems.',
    stateOfTheArt:
      'Instance segmentation combined with watershed cluster separation and RGB-D depth estimation predicts harvest readiness even when fruit overlaps in bunches.',
    openProblems:
      'Heavy foliage occlusion, peduncle localization hidden behind leaves, rapid outdoor exposure changes, and capital payback thresholds relative to seasonal labor markets.',
    ourResearch: {
      lead: 'Published occlusion-resistant cluster segmentation and early flower stage detectors directly supporting robotic harvesting pipelines:',
      refs: [
        {
          title: 'Weight and volume estimation of single and occluded tomatoes using machine vision',
          venue: 'International Journal of Food Properties (Vol. 24)',
          year: 2021,
          note: 'Solved multi-fruit watershed separation on partially occluded horticultural clusters.',
          href: 'https://doi.org/10.1080/10942912.2021.1933024'
        },
        {
          title: 'Detecting the Early Flowering Stage of Tea Chrysanthemum Using the F-YOLO Model',
          venue: 'Agronomy (Vol. 11)',
          year: 2021,
          note: 'Lightweight YOLO variant isolating optimal bud harvest windows in outdoor plots.',
          href: 'https://doi.org/10.3390/agronomy11050834'
        }
      ]
    }
  },
  {
    letter: 'I',
    slug: 'i-iot-sensors',
    title: 'IoT Sensors',
    subdomain: 'Embedded Telemetry & Closed-Loop Control',
    image: '/images/writing/abcs/i-iot-sensors.webp',
    thumb: '/images/thumbs/writing/abcs/i-iot-sensors.webp',
    imageAlt: 'Arduino Uno microcontroller board prepared for multi-sensor telemetry and control loops',
    credit: 'Wikimedia Commons (open hardware documentation photography)',
    plainSummary:
      'Agricultural Internet of Things (IoT) nodes connect low-power microcontrollers to probes measuring ambient humidity, leaf wetness, soil moisture, light intensity, and temperature, logging readings or triggering irrigation relays automatically.',
    stateOfTheArt:
      'LoRaWAN mesh radios paired with photovoltaic batteries and lightweight MQTT brokers stream multi-hectare microclimate telemetry across months without mains power.',
    openProblems:
      'Capacitive probe corrosion in saline or clay soils, biofouling in coastal aquaculture ponds, and silent sensor drift unless calibrated on schedule.',
    ourResearch: {
      lead: 'Roots of Dr. Nyalala’s graduate engineering work uniting embedded greenhouse controllers and distributed sensor localization:',
      refs: [
        {
          title: 'Design and Implementation of an Intelligent Greenhouse Control and Monitoring System Based on Arduino',
          venue: 'M.Sc. Thesis Monograph · Nanjing Agricultural University',
          year: 2016,
          note: 'Integrated multi-sensor greenhouse telemetry with closed-loop actuation rules and serial monitoring.',
          href: '/publications/theses/msc-thesis-2016/'
        },
        {
          title: 'Research on range-based localisation algorithm with virtual force and time synchronisation in wireless sensor and actor networks',
          venue: 'Int. Journal of Communication Networks and Distributed Systems (IJCNDS)',
          year: 2016,
          note: 'Improved spatial self-localization accuracy across distributed field sensor nodes.',
          href: 'https://doi.org/10.1504/ijcnds.2016.076650'
        }
      ]
    }
  },
  {
    letter: 'J',
    slug: 'j-judgement',
    title: 'Judgement',
    subdomain: 'Human-in-the-Loop & Co-Design',
    image: '/images/writing/abcs/j-judgement.webp',
    thumb: '/images/thumbs/writing/abcs/j-judgement.webp',
    imageAlt: 'East African smallholder maize plot near Moshi, Tanzania requiring local agronomic judgement',
    credit: 'Wikimedia Commons (Ramadhani Mushi, CC BY 4.0)',
    plainSummary:
      'AI models output statistical probabilities, whereas experienced farmers, cooperative graders, and agronomists bring local soil memory, seasonal risk judgment, and final accountability for irrigation, spray, or trade choices.',
    stateOfTheArt:
      'Structured human-in-the-loop workflows expose uncertainty flags, calibrated class confidence, and expert co-design rubrics rather than issuing opaque yes/no commands.',
    openProblems:
      'When mobile tools fail to distinguish severe blight from healthy foliage or contradict local trade grading rules, premature trust causes unnecessary chemical costs or disputed payouts.',
    ourResearch: {
      lead: 'Grounded in ethnographic co-design with Zanzibar clove graders and systemic audits of why East African agritech tools lose adoption:',
      refs: [
        {
          title: 'From Art to Algorithms: Co-Designing AI for Clove Grading with Zanzibar’s Indigenous Experts',
          venue: 'AfriCHI 2025 · ACM',
          year: 2025,
          note: 'Co-designed grading decision criteria and explainability expectations directly with ZSTC master graders.',
          href: 'https://saaillab.github.io/papers/clove-codesign-africhi2025/'
        },
        {
          title: 'Launched, Celebrated, Forgotten: A Critical Review of Why Digital and AI-Enabled Agriculture Platforms Fail, Stall, or Survive in East Africa',
          venue: 'SAAIL Lab (Under Review)',
          year: 2026,
          note: 'Examines trust breakdown, incentive mismatch, and governance gaps behind post-pilot platform abandonment.',
          href: 'https://saaillab.github.io/papers/digital-ag-platform-failure-east-africa/'
        }
      ]
    }
  },
  {
    letter: 'K',
    slug: 'k-knowledge-graphs',
    title: 'Knowledge Graphs',
    subdomain: 'Structured Agronomic Semantics',
    image: '/images/writing/abcs/k-knowledge-graphs.webp',
    thumb: '/images/thumbs/writing/abcs/k-knowledge-graphs.webp',
    imageAlt: 'Structured agricultural knowledge graph linking crop varieties, disease symptoms, field telemetry, grading standards, and Swahili advisories',
    credit: 'Editorial schematic created for this SAAIL Lab primer',
    plainSummary:
      'Knowledge graphs organize pests, host cultivars, soil thresholds, regional trade grades, and verified extension guidelines as connected nodes and typed edges so advisories obey biological constraints instead of guessing text statistically.',
    stateOfTheArt:
      'Graph-grounded retrieval (GraphRAG) restricts chatbot recommendations to validated agro-ecological zones, chemical safe pre-harvest intervals, and national extension registries.',
    openProblems:
      'Encoding unwritten farmer taxonomy across local languages such as Kiunguja and Kipemba into machine-readable schemas remains under-resourced.'
  },
  {
    letter: 'L',
    slug: 'l-large-language-models',
    title: 'Large Language Models',
    subdomain: 'Multilingual & Coastal Swahili Advisory',
    image: '/images/writing/abcs/l-large-language-models.webp',
    thumb: '/images/thumbs/writing/abcs/l-large-language-models.webp',
    imageAlt: 'CARA-FM diagram (Nyalala & Bhatt, PMLR Vol. 302) linking data-centric AI, cultural attunement, resource awareness, and ethical AI',
    credit: 'Nyalala & Bhatt, PMLR Vol. 302 (DLI 2025 Best Poster)',
    plainSummary:
      'Language models translate dense agronomic bulletins, soil lab readouts, and voice queries into natural everyday speech, provided they actually understand regional dialects rather than English-translated filler.',
    stateOfTheArt:
      'Compact culturally attuned adapters trained on curated local corpora paired with speech-to-text interfaces outperform giant generic cloud models across domain vocabulary.',
    openProblems:
      'Machine-translated evaluation benchmarks fail to penalize fabricated chemical dosages, syntactic English calquing, or dropped coastal Swahili agricultural idioms.',
    ourResearch: {
      lead: 'Developing native coastal Swahili language curation, provenance auditing, and culturally grounded foundation model principles:',
      refs: [
        {
          title: 'CARA-FM: Culturally Attuned and Resource-Aware Foundation Models for East African Agriculture',
          venue: 'PMLR Vol. 302 · Deep Learning Indaba Best Poster 2025',
          year: 2026,
          note: 'Establishes evaluation criteria spanning indigenous knowledge systems, low-footprint deployment, and local language grounding.',
          href: 'https://saaillab.github.io/papers/cara-fm/'
        },
        {
          title: 'Kiunguja, Kipemba, Mainland & Kenyan Swahili: Why Dialect Diversity Matters in NLP',
          venue: 'Faculty Research Note · inyalala.github.io',
          year: 2026,
          note: 'Analyzes coastal vs. mainland dialect structure and the Dira translationese provenance pipeline.',
          href: '/writing/kiunguja-swahili-coastal-dialect-nlp/'
        }
      ]
    }
  },
  {
    letter: 'M',
    slug: 'm-machine-learning',
    title: 'Machine Learning',
    subdomain: 'Classical Tabular & Deep Representation Learning',
    image: '/images/writing/abcs/m-machine-learning.webp',
    thumb: '/images/thumbs/writing/abcs/m-machine-learning.webp',
    imageAlt: 'CLOVES-4603 benchmark chart comparing HOG+SVM, Texture+SVM, ResNet-50, MobileNetV3, EfficientNet-B0, and ViT-B/16',
    credit: 'Ndowo & Nyalala, CV4A @ CVPR 2026',
    plainSummary:
      'Machine learning spans everything from decision trees and support vector machines fit on soil chemistry tables up to convolutional and transformer neural networks trained across thousands of crop photographs.',
    stateOfTheArt:
      'Honest empirical evaluation pairs random forest or SVM baselines on domain texture descriptors against fine-tuned neural vision models under controlled cross-session splits.',
    openProblems:
      'Deep models frequently memorize subtle session-day background lighting rather than biological traits unless evaluated cleanly on held-out acquisition sessions.',
    ourResearch: {
      lead: 'Direct empirical comparisons across classical handcrafted descriptors and deep backbones in horticultural and spice grading:',
      refs: [
        {
          title: 'CLOVES-4603: Benchmarking Classical Texture Features and Fine-Tuned Deep Models for Clove Quality Grading',
          venue: 'CV4A Workshop @ CVPR 2026',
          year: 2026,
          note: 'Demonstrates 92.94% classical GLCM-LBP texture accuracy alongside 99.67% fine-tuned CNN benchmarks.',
          href: 'https://saaillab.github.io/papers/cloves-4603/'
        },
        {
          title: 'Tomato volume and mass estimation using computer vision and machine learning algorithms: Cherry tomato model',
          venue: 'Journal of Food Engineering (Vol. 263)',
          year: 2019,
          note: 'Head-to-head comparison across SVR kernels, linear models, and neural regression.',
          href: 'https://doi.org/10.1016/j.jfoodeng.2019.07.012'
        }
      ]
    }
  },
  {
    letter: 'N',
    slug: 'n-ndvi',
    title: 'NDVI (Normalized Difference Vegetation Index)',
    subdomain: 'Multispectral Canopy Vigor',
    image: '/images/writing/abcs/n-ndvi.webp',
    thumb: '/images/thumbs/writing/abcs/n-ndvi.webp',
    imageAlt: 'NASA Landsat and Sentinel-2 NDVI map visualizing crop canopy health changes across agricultural blocks',
    credit: "Wikimedia Commons (NASA's Scientific Visualization Studio, Public domain)",
    plainSummary:
      'NDVI compares how brightly crop leaves reflect invisible near-infrared light (NIR) versus how strongly chlorophyll absorbs red light (Red): NDVI = (NIR - Red) / (NIR + Red). Values near +0.8 mark healthy dense canopy; values near +0.1 signal bare soil or stress.',
    stateOfTheArt:
      'Free 10-meter Sentinel-2 acquisitions combined with SAR cloud-penetrating radar track regional drought stress, crop emergence, and coastal tidal vegetation at 5-day intervals.',
    openProblems:
      'Dense equatorial cloud cover during rainy seasons obscures optical bands, and NDVI alone saturates in high-biomass orchards where red-edge indices (NDRE) perform better.'
  },
  {
    letter: 'O',
    slug: 'o-object-detection',
    title: 'Object Detection',
    subdomain: 'Localization & Counting in Dense Canopies',
    image: '/images/writing/abcs/o-object-detection.webp',
    thumb: '/images/thumbs/writing/abcs/o-object-detection.webp',
    imageAlt: 'Fresh chrysanthemum blossoms sorted on greenhouse grading tables requiring individual flower localization',
    credit: 'Wikimedia Commons (Swamianandabhay, CC BY-SA 4.0)',
    plainSummary:
      'Unlike image-level classification (naming a whole frame), object detection draws bounding boxes around every individual bud, fruit, pest insect, or grain kernel inside complex scenes so machines count and grade targets one by one.',
    stateOfTheArt:
      'Anchor-free single-stage architectures (YOLO families, RT-DETR) run multi-object detection in real time on portable GPUs and edge accelerators.',
    openProblems:
      'Tiny tightly clustered grains or blossoms overlapping in windy field foliage still induce false merges and missed partial occlusions.',
    ourResearch: {
      lead: 'Published lightweight YOLO bloom localization and touching-kernel morphological separation for crops:',
      refs: [
        {
          title: 'Detecting the Early Flowering Stage of Tea Chrysanthemum Using the F-YOLO Model',
          venue: 'Agronomy (Vol. 11)',
          year: 2021,
          note: 'Engineered compact multi-scale detector isolating early bloom stages under uneven farm illumination.',
          href: 'https://doi.org/10.3390/agronomy11050834'
        },
        {
          title: 'Separation of partially occluded rice kernels and variety classification based on computer vision',
          venue: 'International Agricultural Engineering Journal',
          year: 2020,
          note: 'Separated overlapping seed instances prior to morphometric cultivar scoring.',
          href: '/papers/rice-kernels-separation-2020/'
        }
      ]
    }
  },
  {
    letter: 'P',
    slug: 'p-precision-agriculture',
    title: 'Precision Agriculture',
    subdomain: 'Variable-Rate Mechanics & Input Efficiency',
    image: '/images/writing/abcs/p-precision-agriculture.webp',
    thumb: '/images/thumbs/writing/abcs/p-precision-agriculture.webp',
    imageAlt: 'Instrumented red deep-tillage subsoiler test rig mounted inside a calibrated soil-bin laboratory (Nyalala et al., 2021)',
    credit: 'Nyalala et al., Scientific Reports (2021)',
    plainSummary:
      'Precision agriculture drops the one-size-fits-all blanket rule: water, fertilizer, tillage depth, and crop protection are matched cleanly to measured variability per soil zone or plant.',
    stateOfTheArt:
      'Discrete Element Method (DEM) soil-tool simulations combined with variable-rate sprayers and automated nozzle pulse modulation cut nutrient runoff and mechanical draft energy.',
    openProblems:
      'Adapting precision mechanics and calibration workflows for low-capital cooperative machinery fleets in sub-Saharan Africa.',
    ourResearch: {
      lead: 'Combined discrete element soil simulation with physical soil-bin validation for precision tillage:',
      refs: [
        {
          title: 'Prediction of precise subsoiling based on analytical method, discrete element simulation and experimental data from soil bin',
          venue: 'Scientific Reports · Nature (Vol. 11)',
          year: 2021,
          note: 'Validated analytical and DEM tillage draft models against instrumented laboratory soil-bin trials.',
          href: 'https://doi.org/10.1038/s41598-021-90682-w'
        }
      ]
    }
  },
  {
    letter: 'Q',
    slug: 'q-quality-grading',
    title: 'Quality Grading',
    subdomain: 'Export Inspection & Objective Lot Standards',
    image: '/images/writing/abcs/q-quality-grading.webp',
    thumb: '/images/thumbs/writing/abcs/q-quality-grading.webp',
    imageAlt: 'Commercial Zanzibar whole clove bud specimens from the ZSTC grading dataset showing morphological differences across grades',
    credit: 'SAAIL Lab ZSTC commercial clove dataset samples',
    plainSummary:
      'Automated quality grading inspects harvested spices, fruits, poultry cuts, or grain lots for crown intactness (mpeta), moisture blemish, weight class, and foreign matter before buyers price export batches.',
    stateOfTheArt:
      'Segmentation-first pipelines isolate the commodity pixels, quantify calibrated defects explicitly, and enforce transparent rule audit trails instead of opaque end-to-end scores.',
    openProblems:
      'Hidden lighting or tray differences across harvest days (acquisition-session confounding) easily deceive standard classifiers during warehouse trials.',
    ourResearch: {
      lead: 'Partnering directly with Zanzibar State Trading Corporation (ZSTC) on commercial cloves and automated meat inspection:',
      refs: [
        {
          title: 'ZSTC-Clove-V1: Deep Learning Feasibility Study for Automated Clove Quality Classification',
          venue: 'AI4EAC / 4th EAC STI Conference (Kigali)',
          year: 2026,
          note: 'Created the 5,298-sample expert-graded Zanzibar clove corpus in partnership with ZSTC.',
          href: 'https://saaillab.github.io/papers/zstc-clove-v1/'
        },
        {
          title: 'Capture-session confounding undermines the measurement validity of deep learning clove grading',
          venue: 'SAAIL Lab (Under Review)',
          year: 2026,
          note: 'Exposed how 16 of 17 neural networks collapse from 99% to 29-47% on unseen acquisition sessions.',
          href: 'https://saaillab.github.io/papers/capture-session-confounding-cloves/'
        },
        {
          title: 'On-line weight estimation of broiler carcass and cuts by a computer vision system',
          venue: 'Poultry Science (Vol. 100)',
          year: 2021,
          note: 'Automated processing-line carcass segmentation and cut-weight grading.',
          href: 'https://doi.org/10.1016/j.psj.2021.101474'
        }
      ]
    }
  },
  {
    letter: 'R',
    slug: 'r-remote-sensing',
    title: 'Remote Sensing',
    subdomain: 'Multi-Spectral & Radar Earth Observation',
    image: '/images/writing/abcs/r-remote-sensing.webp',
    thumb: '/images/thumbs/writing/abcs/r-remote-sensing.webp',
    imageAlt: 'High-resolution Sentinel-2 orbital image showing geometric agricultural parcels and coastal inlet near Rome',
    credit: 'Wikimedia Commons (SentinelHub, CC BY 2.0)',
    plainSummary:
      'Remote sensing measures electromagnetic radiation reflected from fields aboard satellites and aircraft so ministries and cooperatives track crop acreage, irrigation compliance, and coastal seaweed health across thousands of square kilometers without driving to every field.',
    stateOfTheArt:
      'Multimodal transformers fuse Sentinel-1 synthetic aperture radar (which sees cleanly through clouds) with Sentinel-2 optical series and PlanetScope daily mosaics.',
    openProblems:
      'Sub-1-hectare intercropped African plots fall below standard 10-meter satellite pixel resolution, creating mixed spectral signatures across adjacent maize and bean patches.'
  },
  {
    letter: 'S',
    slug: 's-soil-sensing',
    title: 'Soil Sensing',
    subdomain: 'Root-Zone Moisture, Salinity & Nutrients',
    image: '/images/writing/abcs/s-soil-sensing.webp',
    thumb: '/images/thumbs/writing/abcs/s-soil-sensing.webp',
    imageAlt: 'Field soil moisture probes and depth measuring tape installed cleanly inside an exposed root-zone pit',
    credit: 'Wikimedia Commons (UBC Micrometeorology, CC BY 2.0)',
    plainSummary:
      'Soil sensing pairs capacitance dielectric probes, tensiometers, and portable near-infrared spectrometers with soil cores to measure volumetric moisture, electrical conductivity (salinity), pH, and carbon status across root depth.',
    stateOfTheArt:
      'Low-cost visible-near-infrared spectroscopy calibrated locally against wet chemistry datasets delivers field estimates of organic carbon and available nitrogen at a fraction of lab turnaround time.',
    openProblems:
      'Factory dielectric calibrations shift sharply across sandy coastal Unguja soils versus heavy vertisol clays or stony volcanic highland profiles.'
  },
  {
    letter: 'T',
    slug: 't-training-data',
    title: 'Training Data',
    subdomain: 'Deduplication, Skew & Representation Audits',
    image: '/images/writing/abcs/t-training-data.webp',
    thumb: '/images/thumbs/writing/abcs/t-training-data.webp',
    imageAlt: 'DGS-Bench plot (DLI 2026 Best Poster) showing deployment gap scores across minority disease classes',
    credit: 'SAAIL Lab DGS-Bench (DLI 2026 Best Poster Award)',
    plainSummary:
      'Training data shapes everything an agricultural model ever learns: near-duplicate splits leak inflated validation scores, severe class imbalance masks rare pests behind inflated top-1 accuracy, and uncurated GAN images corrupt pretrained features.',
    stateOfTheArt:
      'Perceptual deduplication (pHash), prevalence-balanced evaluation metrics (DGS), and representativeness scorecards audit dataset provenance prior to any model comparison.',
    openProblems:
      'Open benchmarks remain heavily skewed toward clean lab photographs from temperate North America and Europe rather than wet smallholder conditions across sub-Saharan Africa.',
    ourResearch: {
      lead: 'Four recent SAAIL Lab studies quantifying benchmark leakage, GAN failure regimes, and representation gaps:',
      refs: [
        {
          title: 'DGS-Bench: Measuring the Deployment Gap in African Agricultural AI Requires Balanced Metrics',
          venue: 'Deep Learning Indaba 2026 · Best Poster Award (Lagos)',
          year: 2026,
          note: '40 controlled runs proving minority disease collapse hides behind seemingly high accuracy numbers.',
          href: 'https://saaillab.github.io/papers/dgs-bench/'
        },
        {
          title: 'When Synthetic Data Hurts: DCGAN Augmentation Failure Under Extreme Data Scarcity',
          venue: 'Data Science Africa 2026 (Oral · Makerere University)',
          year: 2026,
          note: 'Measured a 23.2-percentage-point average macro-F1 drop when unregularized DCGAN fills sparse classes.',
          href: 'https://saaillab.github.io/papers/dcgan-cassava-dsa2026/'
        },
        {
          title: 'Auditing Representation in Crop Disease Benchmark Datasets Intended for Sub-Saharan African Deployment',
          venue: 'Data Science Africa 2026 (Makerere University)',
          year: 2026,
          note: 'Scores geographic origin, field-imaging realism, and morphological balance across major benchmarks.',
          href: 'https://saaillab.github.io/papers/auditing-crop-datasets-dsa2026/'
        }
      ]
    }
  },
  {
    letter: 'U',
    slug: 'u-uavs',
    title: 'UAVs (Unmanned Aerial Vehicles)',
    subdomain: 'High-Resolution Orthomosaics & Spot Spraying',
    image: '/images/writing/abcs/u-uavs.webp',
    thumb: '/images/thumbs/writing/abcs/u-uavs.webp',
    imageAlt: 'Multi-rotor agricultural drone flying low over rice paddies during a precision spraying demonstration',
    credit: 'Wikimedia Commons (Christopher Hedreyd / PIA, Public domain)',
    plainSummary:
      'Agricultural drones (UAVs) collect sub-5-centimeter RGB, thermal, and multispectral orthomosaics below cloud decks and target micro-spraying passes over steep terrain or flooded rice and seaweed plots.',
    stateOfTheArt:
      'Automated flight photogrammetry pipelines extract digital surface height maps, plant stand counts, and targeted prescription spray zones within hours of flight.',
    openProblems:
      'Short 20-minute LiPo battery flight durations, coastal monsoon gusts across Unguja and Pemba, and civil aviation permit processes constrain continuous cooperative operations.'
  },
  {
    letter: 'V',
    slug: 'v-vertical-farming',
    title: 'Vertical Farming',
    subdomain: 'Controlled Environment Hydroponics',
    image: '/images/writing/abcs/v-vertical-farming.webp',
    thumb: '/images/thumbs/writing/abcs/v-vertical-farming.webp',
    imageAlt: 'Vertical hydroponic greenhouse towers paired with optical and nutrient monitoring probes',
    credit: 'Documentary greenhouse photograph created for this SAAIL Lab primer',
    plainSummary:
      'Vertical farms grow leafy greens and high-value botanicals in stacked hydroponic or aeroponic racks where AI regulates tunable LED spectra, electrical conductivity (EC), pH, airflow, and root-zone dosing.',
    stateOfTheArt:
      'Closed-loop vision plus environmental control schedules dynamic dimming tied to hourly grid tariff forecasts and growth-stage transpiration rates.',
    openProblems:
      'High lighting and HVAC electricity loads make vertical farms economically brittle outside premium fresh greens unless integrated cleanly with low-cost solar generation.'
  },
  {
    letter: 'W',
    slug: 'w-weed-detection',
    title: 'Weed Detection',
    subdomain: 'In-Row Segmentation & Chemical Reduction',
    image: '/images/writing/abcs/w-weed-detection.webp',
    thumb: '/images/thumbs/writing/abcs/w-weed-detection.webp',
    imageAlt: 'Top-down mechanical precision weeding guidance across crop rows avoiding main stems',
    credit: 'Wikimedia Commons (Einboeck.official, CC BY-SA 4.0)',
    plainSummary:
      'Weed detection distinguishes crop seedlings from emerging weeds in real time so boom-mounted precision nozzles or mechanical tines destroy only invasive weeds, saving herbicide expenditure and topsoil biology.',
    stateOfTheArt:
      'High-speed semantic segmentation mounted on tractor booms drives spot micro-dosing nozzles (green-on-green targeting) at travel speeds above 15 km/h.',
    openProblems:
      'Young monocot grass weeds look nearly identical visually to emerging maize or rice shoots, and dense crop shadows degrade rapid color segmentation.'
  },
  {
    letter: 'X',
    slug: 'x-xai',
    title: 'XAI (Explainable AI)',
    subdomain: 'Post Hoc vs. Compositional Transparency',
    image: '/images/writing/abcs/x-xai.webp',
    thumb: '/images/thumbs/writing/abcs/x-xai.webp',
    imageAlt: 'Comparison grid from ETRI Journal 2026 contrasting Grad-CAM, LIME, GradientSHAP, and compositional segmentation masks across clove grades',
    credit: 'Nyalala & Ndowo, ETRI Journal 48(5) (2026)',
    plainSummary:
      'Explainable AI verifies why a model graded a clove, fruit, or leaf a given way, testing whether evidence came from authentic biological traits (crown buds, necrotic halos) rather than plastic tray shadows or sky regions.',
    stateOfTheArt:
      'Compositional segmentation-first architectures isolate the object mask first and execute transparent rule attribution, achieving measurable 100% Explanation Evidence Ratios (EER) rather than blurry post hoc heatmaps.',
    openProblems:
      'Popular post hoc saliency tools (Grad-CAM, LIME, SHAP) routinely spill over onto background tables even when classification accuracy looks high.',
    ourResearch: {
      lead: 'Direct quantitative audits of four post hoc XAI families and segmentation-first compositional designs:',
      refs: [
        {
          title: 'Explainable AI for clove quality grading: Benchmarking post hoc XAI and compositional interpretability under domain shift',
          venue: 'ETRI Journal Vol. 48, Issue 5',
          year: 2026,
          note: 'Achieved 99.45% macro-F1 and 100% Explanation Evidence Ratio (EER) across 4,603 ZSTC clove samples.',
          href: 'https://doi.org/10.4218/etrij.2026-0225'
        },
        {
          title: 'CropGuardNet Four-Family XAI Faithfulness Audit (Deletion & Insertion AUC)',
          venue: 'SAAIL Lab',
          year: 2026,
          note: 'Audits Grad-CAM++, HiResCAM, ScoreCAM, and EigenCAM across 8 crop species.',
          href: 'https://saaillab.github.io/papers/cropguardnet/'
        }
      ]
    }
  },
  {
    letter: 'Y',
    slug: 'y-yield-prediction',
    title: 'Yield Prediction',
    subdomain: 'Pre-Harvest Volume & Commodity Forecasting',
    image: '/images/writing/abcs/y-yield-prediction.webp',
    thumb: '/images/thumbs/writing/abcs/y-yield-prediction.webp',
    imageAlt: 'Combine harvester cutting golden wheat across an open grain field during yield collection',
    credit: 'Wikimedia Commons (Larsz / Lars Plougmann, CC BY-SA 2.0)',
    plainSummary:
      'Yield prediction estimates final harvested tonnes per hectare or dressed carcass weight days to weeks before harvest so cooperatives reserve cold storage, negotiate transport, and balance regional food reserves early.',
    stateOfTheArt:
      'Biomass regressions, crop-simulation data assimilation, and morphometric vision estimators predict grain weight, fruit mass, and carcass cut weights without destructive sampling.',
    openProblems:
      'Late-season heat shocks, windstorms, and unrecorded local fertilizer splits still disrupt purely historical regressions.',
    ourResearch: {
      lead: 'Published computer vision biomass yield regressions alongside poultry weight prediction syntheses:',
      refs: [
        {
          title: 'Wheat Grain Yield Estimation Based on Image Morphological Properties and Wheat Biomass',
          venue: 'Journal of Sensors',
          year: 2020,
          note: 'Combined extracted spike morphological attributes with crop biomass measurements to predict final wheat yield.',
          href: 'https://doi.org/10.1155/2020/1571936'
        },
        {
          title: 'Weight and volume estimation of poultry and products based on computer vision systems: a review',
          venue: 'Poultry Science (Vol. 100)',
          year: 2021,
          note: 'Comprehensive technical review indexing calibration accuracy across non-contact vision yield models.',
          href: 'https://doi.org/10.1016/j.psj.2021.101072'
        }
      ]
    }
  },
  {
    letter: 'Z',
    slug: 'z-zone-mapping',
    title: 'Zone Mapping',
    subdomain: 'Site-Specific Management Units',
    image: '/images/writing/abcs/z-zone-mapping.webp',
    thumb: '/images/thumbs/writing/abcs/z-zone-mapping.webp',
    imageAlt: 'Aerial view of graded, contour-leveled agricultural management parcels designed for uniform irrigation',
    credit: 'Wikimedia Commons (USDAgov, Public domain)',
    plainSummary:
      'Zone mapping clusters spatial soil depth, slope drainage, electrical conductivity, and multi-year NDVI histories into clean prescription polygons so operators dose lime, water, or fertilizer per zone instead of blindly across a whole block.',
    stateOfTheArt:
      'Spatially constrained k-means clustering transforms raw sensor rasters into clean ISOXML prescription zones loaded straight onto precision implement displays.',
    openProblems:
      'Smallholder cooperatives manage fragmented sub-hectare plots where manual knapsack sprayers and cooperative labor rosters require simple paper or smartphone zone charts rather than tractor ISOXML telemetry.'
  }
];
