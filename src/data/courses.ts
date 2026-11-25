export interface CourseLink {
  label: string;
  href: string;
  kind?: 'pdf' | 'html' | 'pptx' | 'colab' | 'lab' | 'tutorial' | 'hub';
}

export interface CourseModule {
  code: string;
  weeks: string;
  title: string;
  summary: string;
  readings?: string;
  assignment?: string;
  portalAnchor?: string;
  hubHref?: string;
  slides: CourseLink[];
  labHref?: string;
  colabHref?: string;
  notebookHref?: string;
}

export interface GradingItem {
  component: string;
  weight: number;
  weightLabel?: string;
  note: string;
}

export interface TextbookItem {
  title: string;
  authors: string;
  role: 'Required' | 'Reference';
  note?: string;
}

export interface CourseResourceItem {
  category: string;
  title: string;
  href: string;
  description: string;
}

export interface CourseData {
  slug: string;
  teachingSiteSlug: string;
  code: string;
  title: string;
  program: 'BS' | 'MTech';
  courseType: 'Core' | 'Elective' | 'Lab';
  status: 'active' | 'previous';
  term: string;
  academicYear: string;
  credits: string;
  coInstructor?: { name: string; institution: string };
  summary: string;
  overviewNote?: string;
  crossLink?: { label: string; href: string };
  schedule: { session: string; frequency: string; details: string }[];
  prerequisites: string[];
  outcomes: string[];
  modules: CourseModule[];
  grading: GradingItem[];
  textbooks: TextbookItem[];
  onlineResources: CourseResourceItem[];
  software?: string[];
  policies: { label: string; text: string }[];
  links: {
    teachingSiteHome: string;
    questionBank?: string;
    assignments?: string;
    syllabusPdf?: string;
    githubRepo: string;
    classroomUrl?: string;
  };
  supplementaryDocs?: CourseLink[];
}

const TEACH_BASE = 'https://inyalala.github.io/iitmz-teaching-site/courses';
const COLAB_BASE = 'https://colab.research.google.com/github/inyalala/iitmz-teaching-site/blob/main/courses';

interface PdsSpec {
  dir: string;
  code: string;
  weeks: string;
  title: string;
  summary: string;
  readings: string;
  assignment?: string;
  isReview?: boolean;
}

const PDS_MODULES: PdsSpec[] = [
  {
    dir: '00-oop-then-algorithms',
    code: 'M1',
    weeks: '1',
    title: 'Object-Oriented Programming, then Algorithms',
    summary: 'Python classes, encapsulation, inheritance, polymorphism, and asymptotic Big-O complexity.',
    readings: 'Lafore ch. 1; CLRS ch. 3',
    assignment: 'A1 (Week 2): OOP Class Hierarchy'
  },
  {
    dir: '01-arrays-dynamic-arrays',
    code: 'M2',
    weeks: '2',
    title: 'Arrays and Dynamic Arrays',
    summary: 'Contiguous memory layout, searching, rotation, and dynamic resizing strategies.',
    readings: 'Lafore ch. 2; CLRS ch. 17',
    assignment: 'A2 (Week 4): Arrays & Amortized Analysis'
  },
  {
    dir: '02-stacks-queues',
    code: 'M3',
    weeks: '3',
    title: 'Stacks and Queues',
    summary: 'Stack ADT, expression parsing, circular buffers, and priority queues.',
    readings: 'Lafore ch. 4',
    assignment: 'A3 (Week 6): MinStack & Queues'
  },
  {
    dir: '03-linked-lists',
    code: 'M4',
    weeks: '4',
    title: 'Linked Lists',
    summary: 'Singly and doubly linked lists, pointer updates, insertion, deletion, and locality trade-offs.',
    readings: 'Lafore ch. 5'
  },
  {
    dir: '04-simple-sorting',
    code: 'M5',
    weeks: '5',
    title: 'Simple Sorting Algorithms',
    summary: 'Bubble, selection, and insertion sort with empirical runtime measurement.',
    readings: 'Lafore ch. 3'
  },
  {
    dir: '05-advanced-sorting',
    code: 'M6',
    weeks: '6',
    title: 'Advanced Sorting Algorithms',
    summary: 'Merge sort, quicksort partitioning, randomized quicksort, and comparison bounds.',
    readings: 'Lafore ch. 6; CLRS ch. 7-8',
    assignment: 'A4 (Week 8): MergeSort, HeapSort & BST'
  },
  {
    dir: '06-binary-trees',
    code: 'M7',
    weeks: '7',
    title: 'Binary Trees and Balance',
    summary: 'Tree traversals (inorder, preorder, postorder), binary search trees, and balanced variants.',
    readings: 'Lafore ch. 8; CLRS ch. 12-13'
  },
  {
    dir: '07-hash-tables-heaps',
    code: 'M8',
    weeks: '8',
    title: 'Hash Tables and Heaps',
    summary: 'Binary min/max heaps, heapify, hash functions, collision handling, and load factor.',
    readings: 'Lafore ch. 9-10; CLRS ch. 11, 19'
  },
  {
    dir: '08-dynamic-programming',
    code: 'M9',
    weeks: '9',
    title: 'Dynamic Programming',
    summary: 'Overlapping subproblems, memoization, tabulation, 0/1 knapsack, LCS, and edit distance.',
    readings: 'Lafore ch. 11; CLRS ch. 14-15',
    assignment: 'A5 (Week 10): DP & Greedy'
  },
  {
    dir: '09-greedy-algorithms',
    code: 'M10',
    weeks: '10',
    title: 'Greedy Algorithms',
    summary: 'Activity selection, fractional knapsack, Huffman coding, and exchange arguments.',
    readings: 'Lafore ch. 11; CLRS ch. 14-15'
  },
  {
    dir: '10-intro-graphs',
    code: 'M11',
    weeks: '11',
    title: 'Introduction to Graphs',
    summary: 'Adjacency matrices vs. adjacency lists, directed/weighted graphs, and memory constraints.',
    readings: 'Lafore ch. 12; CLRS ch. 20'
  },
  {
    dir: '11-graph-algorithms',
    code: 'M12',
    weeks: '12-13',
    title: 'Graph Algorithms: BFS, DFS, Dijkstra, A*, and MSTs',
    summary: 'Graph traversals, topological sort, shortest paths (Dijkstra, Bellman-Ford, A*), and Prim/Kruskal MST.',
    readings: 'Lafore ch. 12; CLRS ch. 21-23',
    assignment: 'A6 (Week 12): Shortest Path & MSTs'
  },
  {
    dir: '12-parallel-randomized',
    code: 'M13',
    weeks: '14',
    title: 'Parallel and Randomized Algorithms',
    summary: 'MapReduce patterns, parallel sorting/search, Monte Carlo methods, and skip lists.',
    readings: 'Lafore ch. 13; CLRS ch. 34',
    assignment: 'A7 (Week 14): Comprehensive Design'
  },
  {
    dir: '13-project-review',
    code: 'M14',
    weeks: '15',
    title: 'Project Presentations, Rubric, and Exam Review',
    summary: 'Course project demonstrations, evaluation rubric, cumulative review, and exam preparation.',
    readings: 'Full semester notes',
    assignment: 'Final Project Submission',
    isReview: true
  }
];

function buildPdsModules(_courseSlug: 'z2005' | 'z5007'): CourseModule[] {
  return PDS_MODULES.map((m) => ({
    code: m.code,
    weeks: m.weeks,
    title: m.title,
    summary: m.summary,
    readings: m.readings,
    assignment: m.assignment,
    slides: []
  }));
}

const PDS_COMMON_RESOURCES: CourseResourceItem[] = [
  {
    category: 'Visualizer',
    title: 'VisuAlgo',
    href: 'https://visualgo.net/en',
    description: 'Interactive animations for arrays, trees, heaps, hash tables, sorting, and graphs.'
  },
  {
    category: 'Visualizer',
    title: 'USFCA Data Structure Visualizations',
    href: 'https://www.cs.usfca.edu/~galles/visualization/Algorithms.html',
    description: 'Step-by-step trace tool suited for binary search trees, balanced trees, and hashing.'
  },
  {
    category: 'Execution Trace',
    title: 'Python Tutor',
    href: 'https://pythontutor.com/',
    description: 'Line-by-line visualization of Python call stacks, recursion, and object references.'
  },
  {
    category: 'Video Series',
    title: 'MIT 6.006: Introduction to Algorithms',
    href: 'https://www.youtube.com/playlist?list=PLBZBJbE_rGRV8D7XZ08LK6z-4zPoWzu5H',
    description: 'Theoretical foundations and algorithm analysis lectures.'
  },
  {
    category: 'Practice',
    title: 'LeetCode & HackerRank Data Structures',
    href: 'https://www.hackerrank.com/domains/data-structures',
    description: 'Optional ungraded coding exercises for extra practice outside lab sessions.'
  }
];

const STANDARD_POLICIES = [
  {
    label: 'Attendance',
    text: 'Attendance is expected at all lectures and labs. Lab exercises are completed and submitted before each session ends.'
  },
  {
    label: 'Late Work',
    text: 'Deadlines are fixed in advance. Late submissions are not accepted unless pre-approved under official institute procedures.'
  },
  {
    label: 'Academic Integrity',
    text: 'Discussing concepts with peers is encouraged; copying or sharing code is prohibited. Every submitted line must be your own work that you can explain.'
  },
  {
    label: 'Use of AI Tools',
    text: 'AI coding assistants may be used to clarify concepts, diagnose error messages, or review code you wrote, not to generate submitted solutions or written proofs.'
  }
];

export const COURSES: CourseData[] = [
  {
    slug: 'z2005',
    teachingSiteSlug: 'z2005',
    code: 'Z2005',
    title: 'Programming and Data Structures',
    program: 'BS',
    courseType: 'Core',
    status: 'previous',
    term: 'Reference Archive · BS Odd Semester (Campus Faculty in 2026-27)',
    academicYear: '2026-27',
    credits: '15 Credits (Core)',
    summary: 'Foundations of programming and classical data structures in Python, covering OOP, stacks, queues, linked lists, sorting, trees, hashing, dynamic programming, greedy methods, and graphs.',
    overviewNote: 'Reference archive for the BS Programming and Data Structures curriculum taught on campus by colleague faculty in Odd Semester 2026-27. Dr. Nyalala teaches Z5007 (MTech Core) and co-teaches Z3003 (BS Core) with Dr. Mahendran V this term.',
    crossLink: {
      label: 'Viewing BS Reference Archive (Z2005): Open Active MTech Section (Z5007) ->',
      href: '/courses/z5007/'
    },
    schedule: [
      { session: 'Lectures', frequency: '4 sessions per week', details: 'Monday, Wednesday, Thursday, and Friday (2026-27 colleague-taught; active instructor schedule)' },
      { session: 'Laboratory', frequency: '2 sessions per week', details: 'Hands-on implementation and testing (active instructor schedule)' },
      { session: 'Office Hours', frequency: 'Active instructor schedule', details: 'For Z5007/Z3003 inquiries with Dr. Nyalala: Room 105 (F1) Wednesdays 2:00-4:00 PM EAT' }
    ],
    prerequisites: [
      'Introduction to Programming in Python (functions, loops, conditionals, and debugging basic Python error traces).'
    ],
    outcomes: [
      'Design and implement Python classes using encapsulation, inheritance, and polymorphism.',
      'Write, test, and debug recursive functions cleanly.',
      'Build stacks, queues, linked lists, binary trees, hash tables, and heaps from first principles.',
      'Analyze algorithm runtime using asymptotic Big-O notation.',
      'Implement and benchmark elementary and O(n log n) sorting algorithms.',
      'Apply dynamic programming and greedy strategies to optimization problems.',
      'Represent graphs and solve shortest-path and reachability tasks using BFS, DFS, Dijkstra, and A*.'
    ],
    modules: buildPdsModules('z2005'),
    grading: [
      { component: 'In-Class Lab Assignments', weight: 10, note: 'Seven biweekly lab assignments across Weeks 2 to 14.' },
      { component: 'Quizzes', weight: 30, note: 'Short in-class quizzes through the semester.' },
      { component: 'Course Project', weight: 20, note: 'Proposal, two milestones, final code, and presentation (from-scratch ML or recommender).' },
      { component: 'End-Semester Examination', weight: 40, note: 'Combined practical and written final examination.' }
    ],
    textbooks: [
      {
        title: 'Data Structures and Algorithms in Python (1st ed.)',
        authors: 'Robert Lafore, Ami Broder, and Jeremy Canning (Addison Wesley, 2022)',
        role: 'Required'
      },
      {
        title: 'The Algorithm Design Manual (2nd ed.)',
        authors: 'Steven S. Skiena (Springer, 2008)',
        role: 'Reference'
      }
    ],
    onlineResources: PDS_COMMON_RESOURCES,
    software: ['Python 3.11+', 'Jupyter / Google Colab', 'pytest', 'Git & GitHub Classroom'],
    policies: STANDARD_POLICIES,
    links: {
      teachingSiteHome: `${TEACH_BASE}/z2005/index.html`,
      syllabusPdf: '/syllabi/z2005-z5007-institute-outline.pdf',
      githubRepo: 'https://github.com/inyalala/iitmz-teaching-site/tree/main/courses/z2005',
      classroomUrl: ''
    }
  },
  {
    slug: 'z5007',
    teachingSiteSlug: 'z5007',
    code: 'Z5007',
    title: 'Programming and Data Structures',
    program: 'MTech',
    courseType: 'Core',
    status: 'active',
    term: 'Odd Semester, Oct 5, 2026 - Jan 28, 2027 (Exams Feb 1-5, 2027)',
    academicYear: '2026-27',
    credits: '15 Credits (MTech Core)',
    summary: 'Graduate core course in Python data structures and algorithms, pairing implementation from first principles with asymptotic and amortized analysis, formal proofs, balanced trees, hashing, heaps, dynamic programming, greedy algorithms, and graph search.',
    crossLink: {
      label: 'Viewing Active MTech Section (Z5007): View BS Reference Archive (Z2005) ->',
      href: '/courses/z2005/'
    },
    schedule: [
      { session: 'Lectures', frequency: '4 sessions per week', details: 'Monday, Wednesday, Thursday, and Friday (Mon 9:00-9:50 AM, Wed 11:00-11:50 AM, Thu 10:00-10:50 AM, Fri 11:00-11:50 AM)' },
      { session: 'Laboratory', frequency: 'Thursday, 2:00 PM - 4:40 PM EAT', details: '2 hr 40 min weekly lab; four In-Class Assignments run 2:00-2:45 PM' },
      { session: 'Office Hours', frequency: 'Tuesday, 2:00 PM - 4:00 PM EAT', details: 'Room 105 (F1) or email with Z5007 in subject' }
    ],
    prerequisites: [
      'Foundational Python proficiency (functions, recursion basics, loops, OOP classes, and reading Python error traces) plus discrete mathematics.'
    ],
    outcomes: [
      'CLO1: Analyze the time and memory cost of algorithms using Big-O notation, recurrences, and amortized analysis.',
      'CLO2: Implement arrays, stacks, queues, linked lists, trees, hash tables, heaps, and graphs from first principles in Python.',
      'CLO3: Prove algorithm correctness and reason about lower bounds such as sorting n log n limits.',
      'CLO4: Design solutions using sorting, recursion, dynamic programming, greedy algorithms, and graph search.',
      'CLO5: Evaluate empirical performance by profiling, benchmarking, and choosing data structures with evidence.',
      'CLO6: Apply data structures plus parallel and randomized methods to large datasets.'
    ],
    modules: [
      {
        code: 'W1',
        weeks: '1',
        portalAnchor: '#week-01',
        title: 'Course Orientation, RAM Model & Big-O Asymptotics',
        summary: 'Scaling motivation, duplicate detection in Python, RAM operation counting, and Big-O rules (Oct 5-9).',
        readings: 'Canning, Broder & Lafore Ch. 1-2',
        slides: [
          { label: 'Mon: Orientation (PDF)', href: `${TEACH_BASE}/z5007/week-01/slides/W01_Mon_Oct05_Course_Orientation.pdf`, kind: 'pdf' },
          { label: 'Wed: Asymptotic Analysis (PDF)', href: `${TEACH_BASE}/z5007/week-01/slides/W01_Wed_Oct07_Asymptotic_Analysis.pdf`, kind: 'pdf' },
          { label: 'Thu: Data Structures Intro (PDF)', href: `${TEACH_BASE}/z5007/week-01/slides/W01_Thu_Oct08_Foundations_Data_Structures.pdf`, kind: 'pdf' },
          { label: 'Fri: Big-O Made Simple (PDF)', href: `${TEACH_BASE}/z5007/week-01/slides/W01_Fri_Oct09_BigO_Made_Simple.pdf`, kind: 'pdf' },
          { label: 'LaTeX Notes & Worksheet (PDF)', href: `${TEACH_BASE}/z5007/week-01/notes/W01_Asymptotic_Analysis_Notes.pdf`, kind: 'pdf' }
        ]
      },
      {
        code: 'W2',
        weeks: '2',
        portalAnchor: '#week-02',
        title: 'Arrays, Binary Search, Dynamic Arrays & Elementary Sorts',
        summary: 'Contiguous byte indexing, invariant-based binary search, dynamic doubling, bubble sort, and selection sort (Oct 12-16).',
        readings: 'Canning, Broder & Lafore Ch. 2-3',
        slides: [
          { label: 'Mon: Arrays & Binary Search (PDF)', href: `${TEACH_BASE}/z5007/week-02/slides/W02_Mon_Oct12_Arrays_Binary_Search.pdf`, kind: 'pdf' },
          { label: 'Thu: Dynamic Arrays & Amortized (PDF)', href: `${TEACH_BASE}/z5007/week-02/slides/W02_Thu_Oct15_Dynamic_Arrays_Amortized.pdf`, kind: 'pdf' },
          { label: 'Fri: Bubble & Selection Sort (PDF)', href: `${TEACH_BASE}/z5007/week-02/slides/W02_Fri_Oct16_Sorting_Bubble_Selection.pdf`, kind: 'pdf' },
          { label: 'LaTeX Notes & Worksheet (PDF)', href: `${TEACH_BASE}/z5007/week-02/notes/W02_Arrays_Dynamic_Arrays_Sorts_Notes.pdf`, kind: 'pdf' }
        ],
        colabHref: `${COLAB_BASE}/z5007/week-02/labs/W02_Thu_Oct15_Lab1_Arrays.ipynb`,
        notebookHref: `${TEACH_BASE}/z5007/week-02/labs/W02_Thu_Oct15_Lab1_Arrays.ipynb`
      },
      {
        code: 'W3',
        weeks: '3',
        portalAnchor: '#week-03',
        title: 'Insertion Sort & Stacks (Arrays vs. Linked Nodes)',
        summary: 'Inversion bounds on insertion sort, LIFO ADT, bracket matching, and array versus linked stacks (Oct 19-22).',
        readings: 'Canning, Broder & Lafore Ch. 3-4',
        assignment: 'ICA 1 (Thu Oct 22)',
        slides: [
          { label: 'Mon: Insertion Sort (PDF)', href: `${TEACH_BASE}/z5007/week-03/slides/W03_Mon_Oct19_Insertion_Sort_v3.pdf`, kind: 'pdf' },
          { label: 'Wed: Stacks LIFO (PDF)', href: `${TEACH_BASE}/z5007/week-03/slides/W03_Wed_Oct21_Stacks.pdf`, kind: 'pdf' },
          { label: 'Thu: Stack Implementations (PDF)', href: `${TEACH_BASE}/z5007/week-03/slides/W03_Thu_Oct22_Stacks_at_Work_Expression.pdf`, kind: 'pdf' },
          { label: 'LaTeX Notes & Worksheet (PDF)', href: `${TEACH_BASE}/z5007/week-03/notes/W03_Insertion_Sort_and_Stacks_Notes.pdf`, kind: 'pdf' }
        ],
        colabHref: `${COLAB_BASE}/z5007/week-03/labs/W03_Thu_Oct22_Lab2_Sorts_Stacks.ipynb`,
        notebookHref: `${TEACH_BASE}/z5007/week-03/labs/W03_Thu_Oct22_Lab2_Sorts_Stacks.ipynb`
      },
      {
        code: 'W4',
        weeks: '4',
        portalAnchor: '#week-04',
        title: 'Circular Queues, Linked Lists, Sentinels & LRU Cache',
        summary: 'Modular ring buffers, singly linked pointer updates, doubly linked sentinels, and O(1) LRU cache design (Oct 28-30).',
        readings: 'Canning, Broder & Lafore Ch. 4-5',
        slides: [
          { label: 'Wed: Circular Queues (PDF)', href: `${TEACH_BASE}/z5007/week-04/slides/W04_Wed_Oct28_Implementing_Queues.pdf`, kind: 'pdf' },
          { label: 'Thu: Linked Lists (PDF)', href: `${TEACH_BASE}/z5007/week-04/slides/W04_Thu_Oct29_Linked_Lists.pdf`, kind: 'pdf' },
          { label: 'Fri: Doubly Linked & LRU Cache (PDF)', href: `${TEACH_BASE}/z5007/week-04/slides/W04_Fri_Oct30_Doubly_LRU.pdf`, kind: 'pdf' },
          { label: 'LaTeX Notes & Worksheet (PDF)', href: `${TEACH_BASE}/z5007/week-04/notes/W04_Queues_Linked_Lists_LRU_Notes.pdf`, kind: 'pdf' }
        ],
        colabHref: `${COLAB_BASE}/z5007/week-04/labs/W04_Thu_Oct29_Lab3_Queues_Linked_Lists.ipynb`,
        notebookHref: `${TEACH_BASE}/z5007/week-04/labs/W04_Thu_Oct29_Lab3_Queues_Linked_Lists.ipynb`
      },
      {
        code: 'W5',
        weeks: '5',
        portalAnchor: '#week-05',
        title: 'Recursion, Merge Sort, Quicksort & Master Theorem',
        summary: 'Base cases, call stack frames, stable Merge Sort, Lomuto Quicksort and Quickselect, and recursion trees (Nov 2-6).',
        readings: 'Canning, Broder & Lafore Ch. 6-7; CLRS Ch. 4',
        assignment: 'ICA 2 (Thu Nov 5)',
        slides: [
          { label: 'Mon: Thinking Recursively (PDF)', href: `${TEACH_BASE}/z5007/week-05/slides/W05_Mon_Nov02_Thinking_Recursively.pdf`, kind: 'pdf' },
          { label: 'Wed: Merge Sort (PDF)', href: `${TEACH_BASE}/z5007/week-05/slides/W05_Wed_Nov04_Merge_Sort.pdf`, kind: 'pdf' },
          { label: 'Thu: Quicksort & Quickselect (PDF)', href: `${TEACH_BASE}/z5007/week-05/slides/W05_Thu_Nov05_Quicksort_Quickselect.pdf`, kind: 'pdf' },
          { label: 'Fri: Master Theorem (PDF)', href: `${TEACH_BASE}/z5007/week-05/slides/W05_Fri_Nov06_Recurrences_Master_Theorem.pdf`, kind: 'pdf' },
          { label: 'LaTeX Notes & Worksheet (PDF)', href: `${TEACH_BASE}/z5007/week-05/notes/W05_Recursion_Sorting_Recurrences_Notes.pdf`, kind: 'pdf' }
        ],
        colabHref: `${COLAB_BASE}/z5007/week-05/labs/W05_Thu_Nov05_Lab4_Recursion_Sorting.ipynb`,
        notebookHref: `${TEACH_BASE}/z5007/week-05/labs/W05_Thu_Nov05_Lab4_Recursion_Sorting.ipynb`
      },
      {
        code: 'W6',
        weeks: '6',
        portalAnchor: '#week-06',
        title: 'Quiz 1 Review & Practice Bank (Ch. 1-7)',
        summary: 'Cumulative review covering Big-O, arrays, stacks, queues, linked lists, recursion, and sorting ahead of Quiz 1 (Nov 12-14).',
        readings: 'Canning, Broder & Lafore Ch. 1-7',
        assignment: 'Quiz 1 (Nov 12-14)',
        slides: [
          { label: 'Quiz 1 Practice (40 Qs PDF)', href: `${TEACH_BASE}/z5007/week-06/practice/Z5007_Quiz1_Practice40.pdf`, kind: 'pdf' }
        ]
      },
      {
        code: 'W7',
        weeks: '7',
        portalAnchor: '#week-07',
        title: 'Linear Sorts, Binary Trees & Binary Search Trees',
        summary: 'Counting sort, Radix sort, binary tree properties, four traversals, BST invariants, search, insert, and 3-case deletion (Nov 16-20).',
        readings: 'Canning, Broder & Lafore Ch. 8; CLRS Ch. 8, 12',
        slides: [
          { label: 'Mon: Counting & Radix Sort (PDF)', href: `${TEACH_BASE}/z5007/week-07/slides/W07_Mon_Nov16_Counting_Radix_Sort.pdf`, kind: 'pdf' },
          { label: 'Wed: Binary Trees & Traversals (PDF)', href: `${TEACH_BASE}/z5007/week-07/slides/W07_Wed_Nov18_Binary_Trees_Traversals.pdf`, kind: 'pdf' },
          { label: 'Thu: Binary Search Trees (PDF)', href: `${TEACH_BASE}/z5007/week-07/slides/W07_Thu_Nov19_Binary_Search_Trees.pdf`, kind: 'pdf' },
          { label: 'Fri: BST Delete & Balance (PDF)', href: `${TEACH_BASE}/z5007/week-07/slides/W07_Fri_Nov20_BST_Delete_Balance.pdf`, kind: 'pdf' },
          { label: 'LaTeX Notes & Worksheet (PDF)', href: `${TEACH_BASE}/z5007/week-07/notes/W07_Linear_Sorts_Trees_BST_Notes.pdf`, kind: 'pdf' }
        ],
        colabHref: `${COLAB_BASE}/z5007/week-07/labs/W07_Thu_Nov19_Lab5_Sorting_Trees_BST.ipynb`,
        notebookHref: `${TEACH_BASE}/z5007/week-07/labs/W07_Thu_Nov19_Lab5_Sorting_Trees_BST.ipynb`
      },
      {
        code: 'W8',
        weeks: '8',
        portalAnchor: '#week-08',
        title: 'AVL Trees, Red-Black Trees, Heaps & Hash Tables',
        summary: 'Self-balancing height invariants, single/double AVL rotations, binary heaps, priority queues, and open-addressing/chaining hash tables (Nov 23-27).',
        readings: 'Canning, Broder & Lafore Ch. 8, 10, 11, 13; CLRS Ch. 11, 13',
        slides: [
          { label: 'Mon: AVL Trees (PDF)', href: `${TEACH_BASE}/z5007/week-08/slides/W08_Mon_Nov23_AVL_Trees.pdf`, kind: 'pdf' },
          { label: 'Mon: AVL LaTeX Notes & Worksheet (PDF)', href: `${TEACH_BASE}/z5007/week-08/notes/W08_Mon_Nov23_AVL_Trees_Notes.pdf`, kind: 'pdf' },
          { label: 'Summary Notes: AVL, Heaps & Hashing (PDF)', href: `${TEACH_BASE}/z5007/week-08/notes/W08_Trees_AVL_Heaps_Hash_Tables_Summary.pdf`, kind: 'pdf' },
          { label: 'Python Reference Code (.py)', href: `${TEACH_BASE}/z5007/week-08/code/w08_heaps_hash_tables.py`, kind: 'lab' }
        ],
        colabHref: `${COLAB_BASE}/z5007/week-08/labs/W08_Heaps_PriorityQueues_HashTables.ipynb`,
        notebookHref: `${TEACH_BASE}/z5007/week-08/labs/W08_Heaps_PriorityQueues_HashTables.ipynb`
      },
      {
        code: 'W9',
        weeks: '9',
        portalAnchor: '#week-09',
        title: 'Graph Representations, BFS, DFS & Topological Sort',
        summary: 'Adjacency lists vs. matrices, breadth-first levels, depth-first discovery/finish timestamps, cycle detection, and Kahn topological ordering (Nov 30-Dec 4).',
        readings: 'Canning, Broder & Lafore Ch. 14; CLRS Ch. 20',
        assignment: 'ICA 3 (Thu Dec 3)',
        slides: [
          { label: 'Summary Notes (PDF)', href: `${TEACH_BASE}/z5007/week-09/notes/W09_Graph_Traversals_Summary.pdf`, kind: 'pdf' },
          { label: 'Python Reference Code (.py)', href: `${TEACH_BASE}/z5007/week-09/code/w09_graphs_traversals_topo.py`, kind: 'lab' }
        ],
        colabHref: `${COLAB_BASE}/z5007/week-09/labs/W09_Graph_Representations_BFS_DFS.ipynb`,
        notebookHref: `${TEACH_BASE}/z5007/week-09/labs/W09_Graph_Representations_BFS_DFS.ipynb`
      },
      {
        code: 'W10',
        weeks: '10',
        portalAnchor: '#week-10',
        title: 'Shortest Paths: Dijkstra & Bellman-Ford',
        summary: 'Edge relaxation invariants, priority-queue Dijkstra, negative-weight Bellman-Ford, negative-cycle checks, and DAG shortest paths (Dec 7-11).',
        readings: 'Canning, Broder & Lafore Ch. 14-15; CLRS Ch. 22',
        slides: [
          { label: 'Summary Notes (PDF)', href: `${TEACH_BASE}/z5007/week-10/notes/W10_Shortest_Paths_Summary.pdf`, kind: 'pdf' },
          { label: 'Python Reference Code (.py)', href: `${TEACH_BASE}/z5007/week-10/code/w10_shortest_paths.py`, kind: 'lab' }
        ],
        colabHref: `${COLAB_BASE}/z5007/week-10/labs/W10_Shortest_Paths_Dijkstra_BellmanFord.ipynb`,
        notebookHref: `${TEACH_BASE}/z5007/week-10/labs/W10_Shortest_Paths_Dijkstra_BellmanFord.ipynb`
      },
      {
        code: 'W11',
        weeks: '11',
        portalAnchor: '#week-11',
        title: 'Greedy Algorithms & Minimum Spanning Trees (Kruskal & Prim)',
        summary: 'Greedy-choice proofs, interval scheduling, Huffman coding, cut property, Kruskal MST, and Prim priority-queue MST (Dec 14-18).',
        readings: 'Skiena Ch. 7-10; CLRS Ch. 15, 21',
        slides: [
          { label: 'Summary Notes (PDF)', href: `${TEACH_BASE}/z5007/week-11/notes/W11_Greedy_and_MST_Summary.pdf`, kind: 'pdf' },
          { label: 'Python Reference Code (.py)', href: `${TEACH_BASE}/z5007/week-11/code/w11_greedy_mst.py`, kind: 'lab' }
        ],
        colabHref: `${COLAB_BASE}/z5007/week-11/labs/W11_Greedy_and_MST_Kruskal_Prim.ipynb`,
        notebookHref: `${TEACH_BASE}/z5007/week-11/labs/W11_Greedy_and_MST_Kruskal_Prim.ipynb`
      },
      {
        code: 'W12',
        weeks: '12',
        portalAnchor: '#week-12',
        title: 'Dynamic Programming Foundations',
        summary: 'Optimal substructure, overlapping subproblems, top-down memoization vs. bottom-up tabulation, 0/1 knapsack, coin change, and LIS (Dec 21-24).',
        readings: 'Skiena Ch. 10; CLRS Ch. 14',
        assignment: 'Quiz 2 (Dec 22-24)',
        slides: [
          { label: 'Summary Notes (PDF)', href: `${TEACH_BASE}/z5007/week-12/notes/W12_Dynamic_Programming_Summary.pdf`, kind: 'pdf' },
          { label: 'Python Reference Code (.py)', href: `${TEACH_BASE}/z5007/week-12/code/w12_dynamic_programming.py`, kind: 'lab' }
        ],
        colabHref: `${COLAB_BASE}/z5007/week-12/labs/W12_Dynamic_Programming.ipynb`,
        notebookHref: `${TEACH_BASE}/z5007/week-12/labs/W12_Dynamic_Programming.ipynb`
      },
      {
        code: 'W13',
        weeks: '13',
        portalAnchor: '#week-13',
        title: 'Advanced Dynamic Programming: Edit Distance, Matrix Chain & Tree DP',
        summary: 'Sequence alignment, LCS reconstruction, matrix-chain parenthesization, bitmask states, and dynamic programming on trees.',
        readings: 'CLRS Ch. 14; Skiena Ch. 10',
        slides: [
          { label: 'Summary Notes (PDF)', href: `${TEACH_BASE}/z5007/week-13/notes/W13_Advanced_Dynamic_Programming_Summary.pdf`, kind: 'pdf' },
          { label: 'Python Reference Code (.py)', href: `${TEACH_BASE}/z5007/week-13/code/w13_advanced_dp.py`, kind: 'lab' }
        ],
        colabHref: `${COLAB_BASE}/z5007/week-13/labs/W13_Advanced_Dynamic_Programming.ipynb`,
        notebookHref: `${TEACH_BASE}/z5007/week-13/labs/W13_Advanced_Dynamic_Programming.ipynb`
      },
      {
        code: 'W14',
        weeks: '14',
        portalAnchor: '#week-14',
        title: 'String Matching (KMP, Rabin-Karp) & Prefix Tries',
        summary: 'Rolling hashes, Knuth-Morris-Pratt prefix function, prefix tries for autocomplete, and pattern-matching benchmarks.',
        readings: 'CLRS Ch. 32',
        assignment: 'ICA 4 (Thu Jan 14)',
        slides: [
          { label: 'Summary Notes (PDF)', href: `${TEACH_BASE}/z5007/week-14/notes/W14_String_Matching_and_Tries_Summary.pdf`, kind: 'pdf' },
          { label: 'Python Reference Code (.py)', href: `${TEACH_BASE}/z5007/week-14/code/w14_string_matching_tries.py`, kind: 'lab' }
        ],
        colabHref: `${COLAB_BASE}/z5007/week-14/labs/W14_String_Matching_and_Tries.ipynb`,
        notebookHref: `${TEACH_BASE}/z5007/week-14/labs/W14_String_Matching_and_Tries.ipynb`
      },
      {
        code: 'W15',
        weeks: '15',
        portalAnchor: '#week-15',
        title: 'Union-Find, Path Compression & Amortized Analysis',
        summary: 'Disjoint-set forest with union-by-rank and path compression, aggregate, accounting, and potential amortized methods.',
        readings: 'CLRS Ch. 16, 19',
        slides: [
          { label: 'Summary Notes (PDF)', href: `${TEACH_BASE}/z5007/week-15/notes/W15_Union_Find_Amortized_Summary.pdf`, kind: 'pdf' },
          { label: 'Python Reference Code (.py)', href: `${TEACH_BASE}/z5007/week-15/code/w15_union_find_amortized.py`, kind: 'lab' }
        ],
        colabHref: `${COLAB_BASE}/z5007/week-15/labs/W15_Union_Find_Amortized_Review.ipynb`,
        notebookHref: `${TEACH_BASE}/z5007/week-15/labs/W15_Union_Find_Amortized_Review.ipynb`
      },
      {
        code: 'W16',
        weeks: '16',
        portalAnchor: '#week-16',
        title: 'NP-Completeness, Reductions & Approximation Algorithms',
        summary: 'P vs. NP, polynomial-time reductions (3-SAT, Clique, Vertex Cover, TSP), and bounded approximation guarantees.',
        readings: 'CLRS Ch. 34, 35',
        slides: [
          { label: 'Summary Notes (PDF)', href: `${TEACH_BASE}/z5007/week-16/notes/W16_NP_Completeness_Reductions_Summary.pdf`, kind: 'pdf' },
          { label: 'Python Reference Code (.py)', href: `${TEACH_BASE}/z5007/week-16/code/w16_np_completeness_approx.py`, kind: 'lab' }
        ],
        colabHref: `${COLAB_BASE}/z5007/week-16/labs/W16_NP_Completeness_Reductions.ipynb`,
        notebookHref: `${TEACH_BASE}/z5007/week-16/labs/W16_NP_Completeness_Reductions.ipynb`
      },
      {
        code: 'W17',
        weeks: '17',
        portalAnchor: '#week-17',
        title: 'Capstone Synthesis, Project Vivas & Final Examinations',
        summary: 'Full-semester synthesis spanning complexity, trees, hashing, graphs, DP, and NP reductions, pair project vivas, practical lab exam (Jan 28), and theory exam (Feb 1-5).',
        readings: 'Canning, Broder & Lafore; CLRS; Skiena',
        assignment: 'Practical Jan 28; Theory Feb 1-5',
        slides: [
          { label: 'Summary Notes (PDF)', href: `${TEACH_BASE}/z5007/week-17/notes/W17_Capstone_Exam_Synthesis_Summary.pdf`, kind: 'pdf' },
          { label: 'Python Reference Code (.py)', href: `${TEACH_BASE}/z5007/week-17/code/w17_capstone_synthesis.py`, kind: 'lab' }
        ],
        colabHref: `${COLAB_BASE}/z5007/week-17/labs/W17_Final_Capstone_Synthesis.ipynb`,
        notebookHref: `${TEACH_BASE}/z5007/week-17/labs/W17_Final_Capstone_Synthesis.ipynb`
      }
    ],
    grading: [
      { component: 'Quiz 1', weight: 10, note: 'Nov 12-14 (institute window) · Written closed book covering Weeks 1-5 (Ch. 1-7).' },
      { component: 'Quiz 2', weight: 10, note: 'Dec 22-24 (institute window) · Written closed book covering Weeks 7-11 (Trees, Hashing, Heaps, DP, Greedy).' },
      { component: 'In-Class Assignments (4 ICAs)', weight: 12, note: 'Thu labs 2:00-2:45 PM (Oct 22, Nov 5, Dec 3, Jan 14) · Offline auto-tested coding.' },
      { component: 'Weekly Labs', weight: 8, note: 'Every Thursday 2:00-4:40 PM · Best 9 of 11 graded weekly laboratory notebooks.' },
      { component: 'Course Project (Pairs)', weight: 20, note: 'Nov 6 to Jan 28 · Pair engineering project with proposal, checkpoint, report, and viva.' },
      { component: 'End-Semester Practical', weight: 20, note: 'Thu Jan 28 in lab (2 hr 40 min) · Offline coding examination across full course.' },
      { component: 'End-Semester Theory', weight: 20, note: 'Feb 1-5 institute exam timetable · Comprehensive written closed-book examination.' }
    ],
    textbooks: [
      {
        title: 'Data Structures & Algorithms in Python',
        authors: 'John Canning, Alan Broder, and Robert Lafore (Addison-Wesley, 2022)',
        role: 'Required',
        note: 'Core textbook followed chapter by chapter (Ch. 1-16).'
      },
      {
        title: 'The Algorithm Design Manual (3rd ed.)',
        authors: 'Steven S. Skiena (Springer, 2020)',
        role: 'Reference',
        note: 'Dynamic programming, greedy algorithms, A* search, and randomized methods.'
      },
      {
        title: 'Introduction to Algorithms (4th ed.)',
        authors: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, and Clifford Stein (MIT Press, 2022)',
        role: 'Reference',
        note: 'Optional full proofs and formal asymptotics reference.'
      }
    ],
    onlineResources: PDS_COMMON_RESOURCES,
    software: ['Python 3.12+', 'VS Code', 'Jupyter / Google Colab', 'pytest', 'Git'],
    policies: [
      {
        label: 'Attendance',
        text: 'Attendance is expected at all four weekly lectures and Thursday labs. Bring a charged laptop to every session.'
      },
      {
        label: 'Late Work',
        text: 'Late submissions lose 10% per day and are not accepted after 3 days. Notify Dr. Nyalala before the deadline for emergencies.'
      },
      {
        label: 'Academic Integrity',
        text: 'Discussing ideas with classmates is encouraged; sharing or copying code is prohibited. You must be able to explain every line you submit.'
      },
      {
        label: 'Use of AI Tools',
        text: 'AI coding assistants may be used to clarify concepts and inspect error messages, not to generate submitted lab solutions, ICA code, or written proofs.'
      }
    ],
    links: {
      teachingSiteHome: `${TEACH_BASE}/z5007/index.html`,
      questionBank: `${TEACH_BASE}/z5007/question-bank/index.html`,
      syllabusPdf: `${TEACH_BASE}/z5007/syllabus/Z5007_Institute_Syllabus.pdf`,
      githubRepo: 'https://github.com/inyalala/iitmz-teaching-site/tree/main/courses/z5007',
      classroomUrl: ''
    },
    supplementaryDocs: [
      { label: 'Algorithms Master Cheat Sheet (PDF)', href: `${TEACH_BASE}/z5007/resources/Z5007_Algorithms_Master_Cheatsheet.pdf`, kind: 'pdf' },
      { label: 'Midterm Review Worked Solutions (PDF)', href: `${TEACH_BASE}/z5007/resources/Z5007_Midterm_Review_Solutions.pdf`, kind: 'pdf' },
      { label: 'Quiz 1 Practice Bank (40 Questions PDF)', href: `${TEACH_BASE}/z5007/week-06/practice/Z5007_Quiz1_Practice40.pdf`, kind: 'pdf' }
    ]
  },
  {
    slug: 'z3003',
    teachingSiteSlug: 'dm-scale',
    code: 'Z3003',
    title: 'Data Mining: Scaling to Large Data',
    program: 'BS',
    courseType: 'Core',
    status: 'active',
    term: 'Odd Semester, October 2026 - January 2027',
    academicYear: '2026-27',
    credits: '12 Credits (BS Core · Weeks 1-6: Dr. Nyalala | Weeks 7-15: Dr. Mahendran V)',
    coInstructor: { name: 'Dr. Mahendran V', institution: 'IIT Tirupati (Weeks 7-15)' },
    summary: 'Large-scale data mining methods covering Bayesian ML, feature selection, ensembles, MapReduce and PySpark, Locality-Sensitive Hashing, PageRank, Apriori, and streaming filters.',
    overviewNote: 'Dr. Innocent Nyalala teaches Weeks 1-6 (ML basics, imbalance, ensembles, MapReduce, LSH, frequent patterns, and Tutorials T1-T6). Dr. Mahendran V teaches Weeks 7-15.',
    schedule: [
      { session: 'Lectures', frequency: '3 lectures per week', details: 'Weeks 1-6 taught by Dr. Nyalala' },
      { session: 'Tutorials', frequency: '1 session per week (T1-T6)', details: 'Graded Python (.py) submissions: dm[TT]t[RR].py' },
      { session: 'Office Hours', frequency: 'Wednesday, 2:00 PM - 4:00 PM EAT', details: 'Room 105 (F1) or by email' }
    ],
    prerequisites: [
      'Python, NumPy, pandas, scikit-learn, introductory probability/statistics, and SQL (DBMS). PySpark is introduced from scratch in Week 4.'
    ],
    outcomes: [
      'Apply Bayesian Decision Theory and Maximum Likelihood Estimation under uncertainty.',
      'Select features via Information Gain and reduce dimensions with PCA and LDA.',
      'Address class imbalance with sampling and build AdaBoost, Gradient Boosting, and Random Forest ensembles.',
      'Build distributed MapReduce and PySpark RDD pipelines for log and text analysis.',
      'Implement MinHash and Locality-Sensitive Hashing (LSH) plus PageRank power iteration.',
      'Apply the Apriori algorithm and Bloom filters for frequent itemsets and stream membership queries.'
    ],
    modules: [
      {
        code: 'W1',
        weeks: '1',
        portalAnchor: '#week-01',
        title: 'Introduction & Bayesian ML Review',
        summary: 'Scaling challenges, Bayesian Decision Theory, Maximum Likelihood Estimation, and NumPy/SciPy review.',
        readings: 'MMDS Ch. 1',
        slides: [
          { label: 'Tutorial 1: Simulating Random Variables', href: `${TEACH_BASE}/dm-scale/tutorials/t1.html`, kind: 'tutorial' },
          { label: 'Course Overview Page', href: `${TEACH_BASE}/dm-scale/index.html`, kind: 'hub' }
        ],
        labHref: `${TEACH_BASE}/dm-scale/labs/lab1.html`
      },
      {
        code: 'W2',
        weeks: '2',
        portalAnchor: '#week-02',
        title: 'Feature Selection & Dimensionality Reduction',
        summary: 'Information gain, mutual information, PCA eigendecomposition, LDA, and missing-value imputation.',
        readings: 'ESL Ch. 3',
        slides: [
          { label: 'Tutorial 2: Feature Selection & PCA', href: `${TEACH_BASE}/dm-scale/tutorials/t2.html`, kind: 'tutorial' }
        ]
      },
      {
        code: 'W3',
        weeks: '3',
        portalAnchor: '#week-03',
        title: 'Class Imbalance & Ensemble Methods',
        summary: 'Differential losses, SMOTE, AdaBoost, Gradient Boosting, Bagging, Random Forests, and stacking.',
        readings: 'ESL Ch. 10',
        slides: [
          { label: 'Tutorial 3: Ensemble Methods', href: `${TEACH_BASE}/dm-scale/tutorials/t3.html`, kind: 'tutorial' }
        ]
      },
      {
        code: 'W4',
        weeks: '4',
        portalAnchor: '#week-04',
        title: 'MapReduce & Introduction to PySpark',
        summary: 'Why single-node memory fails, map/shuffle/reduce stages, and Spark RDD transformations and actions.',
        readings: 'MMDS Ch. 2',
        slides: [
          { label: 'Tutorial 4: MapReduce with PySpark', href: `${TEACH_BASE}/dm-scale/tutorials/t4.html`, kind: 'tutorial' }
        ],
        labHref: `${TEACH_BASE}/dm-scale/labs/lab1.html`
      },
      {
        code: 'W5',
        weeks: '5',
        portalAnchor: '#week-05',
        title: 'Locality-Sensitive Hashing & PageRank',
        summary: 'k-shingling, Jaccard similarity, MinHash signatures, LSH banding, and PageRank power iteration.',
        readings: 'MMDS Ch. 3, 5',
        slides: [
          { label: 'Tutorial 5: MinHash & LSH', href: `${TEACH_BASE}/dm-scale/tutorials/t5.html`, kind: 'tutorial' }
        ]
      },
      {
        code: 'W6',
        weeks: '6',
        portalAnchor: '#week-06',
        title: 'Frequent Pattern Mining & Stream Mining Intro',
        summary: 'Support/confidence association rules, Apriori pruning, stream model, Bloom filters, and Flajolet-Martin.',
        readings: 'MMDS Ch. 4, 6',
        slides: [
          { label: 'Tutorial 6: Apriori & Bloom Filters', href: `${TEACH_BASE}/dm-scale/tutorials/t6.html`, kind: 'tutorial' }
        ]
      },
      {
        code: 'W7-15',
        weeks: '7-15',
        title: 'Clustering, Stream Windows & Graph/Recommender Mining',
        summary: 'Part II taught by Dr. Mahendran V (IIT Tirupati): CURE, DBSCAN, spectral clustering, DGIM, reservoir sampling, and matrix factorization.',
        readings: 'MMDS Ch. 7, 9',
        slides: [
          { label: 'Full Syllabus & Schedule', href: `${TEACH_BASE}/dm-scale/index.html#syllabus`, kind: 'hub' }
        ]
      }
    ],
    grading: [
      { component: 'Weekly Tutorials (T1-T6)', weight: 30, note: 'Six .py coding submissions following dm[TT]t[RR].py.' },
      { component: 'Quiz 1', weight: 15, note: 'Covers Weeks 1-3 (ML foundations, dimensionality reduction, ensembles).' },
      { component: 'Quiz 2', weight: 15, note: 'Covers Weeks 4-6 (MapReduce, LSH, PageRank, Apriori, streams).' },
      { component: 'Mini-Project (Weeks 1-6)', weight: 20, note: 'End-to-end scaling pipeline on a real public dataset (groups of 2-3).' },
      { component: 'End-Semester Examination', weight: 20, note: 'Cumulative 15-week written examination jointly set by both instructors.' }
    ],
    textbooks: [
      {
        title: 'Mining of Massive Datasets (3rd ed.)',
        authors: 'Anand Rajaraman, Jeffrey Ullman, and Jure Leskovec (Cambridge University Press)',
        role: 'Required',
        note: 'Free textbook PDF available at mmds.org.'
      },
      {
        title: 'The Elements of Statistical Learning (2nd ed.)',
        authors: 'Trevor Hastie, Robert Tibshirani, and Jerome Friedman (Springer)',
        role: 'Reference'
      },
      {
        title: 'Pattern Recognition and Machine Learning',
        authors: 'Christopher M. Bishop (Springer, 2006)',
        role: 'Reference'
      }
    ],
    onlineResources: [
      {
        category: 'Free Textbook PDF',
        title: 'Mining of Massive Datasets (mmds.org)',
        href: 'http://www.mmds.org',
        description: 'Official free publisher-authorized textbook PDF.'
      },
      {
        category: 'Free Textbook PDF',
        title: 'Elements of Statistical Learning',
        href: 'https://web.stanford.edu/~hastie/ElemStatLearn/',
        description: 'Covers Weeks 1-3 statistical learning theory in depth.'
      },
      {
        category: 'Stanford Slides',
        title: 'Stanford CS246 Slide Archive',
        href: 'https://snap.stanford.edu/class/cs246-2024/',
        description: 'Chapter-matched lecture slides for large-scale mining.'
      }
    ],
    software: ['numpy', 'pandas', 'scipy', 'scikit-learn', 'pyspark', 'datasketch', 'mlxtend', 'matplotlib'],
    policies: STANDARD_POLICIES,
    links: {
      teachingSiteHome: `${TEACH_BASE}/dm-scale/index.html`,
      questionBank: `${TEACH_BASE}/dm-scale/question-bank/index.html`,
      githubRepo: 'https://github.com/inyalala/iitmz-teaching-site/tree/main/courses/dm-scale',
      classroomUrl: ''
    },
    supplementaryDocs: [
      { label: 'Data Mining Formula Cheat Sheet (PDF)', href: `${TEACH_BASE}/dm-scale/resources/Z3003_Data_Mining_Formula_Cheatsheet.pdf`, kind: 'pdf' },
      { label: 'Mini-Project Brief (PDF)', href: `${TEACH_BASE}/dm-scale/resources/Mini_Project_Brief.pdf`, kind: 'pdf' },
      { label: 'Mini-Project Starter Notebook (.ipynb)', href: `${TEACH_BASE}/dm-scale/labs/MP01_Mini_Project_Starter.ipynb`, kind: 'notebook' }
    ]
  },
  {
    slug: 'z2004',
    teachingSiteSlug: 'z2004',
    code: 'Z2004',
    title: 'Database Management Systems',
    program: 'BS',
    courseType: 'Core',
    status: 'previous',
    term: 'Even Semester, March - July 2026',
    academicYear: '2025-26',
    credits: '10 Credits (Core · 3-1-0-0-6-10)',
    summary: 'Theory and engineering of database systems from ER modeling, relational algebra, and SQL through normalization, indexing, ACID transactions, NoSQL, vector databases, and RAG pipelines.',
    schedule: [
      { session: 'Lectures', frequency: '3 sessions per week', details: '50 minutes each' },
      { session: 'Tutorials', frequency: '1 session per week', details: 'SQL problem sets and schema design' }
    ],
    prerequisites: ['Introductory Python programming and discrete structures.'],
    outcomes: [
      'Design ER schemas and translate them into normalized relational tables.',
      'Write relational algebra and tuple/domain relational calculus queries.',
      'Compose complex SQL queries with joins, CTEs, window functions, triggers, and stored procedures.',
      'Apply functional dependencies and normalize schemas through BCNF and 4NF.',
      'Explain disk storage layout, B-tree/hash indexing, ACID transactions, 2PL, and recovery.',
      'Contrast relational, document, key-value, and vector databases and build a RAG pipeline.'
    ],
    modules: [
      {
        code: 'M1',
        weeks: '1-2',
        title: 'Foundations & Entity-Relationship Modeling',
        summary: 'DBMS architecture, ER diagrams, weak entity sets, and extended ER concepts.',
        slides: [
          { label: 'L01 (PDF)', href: `${TEACH_BASE}/z2004/lectures/L01.pdf`, kind: 'pdf' },
          { label: 'L02 (PDF)', href: `${TEACH_BASE}/z2004/lectures/L02.pdf`, kind: 'pdf' },
          { label: 'L03 (PDF)', href: `${TEACH_BASE}/z2004/lectures/L03.pdf`, kind: 'pdf' },
          { label: 'L04 (PDF)', href: `${TEACH_BASE}/z2004/lectures/L04.pdf`, kind: 'pdf' },
          { label: 'L05 (PDF)', href: `${TEACH_BASE}/z2004/lectures/L05.pdf`, kind: 'pdf' },
          { label: 'L06 (PDF)', href: `${TEACH_BASE}/z2004/lectures/L06.pdf`, kind: 'pdf' }
        ]
      },
      {
        code: 'M2',
        weeks: '3',
        title: 'Relational Model & ER Mapping',
        summary: 'Relations, schemas, primary/foreign keys, integrity constraints, and ER-to-relational translation.',
        slides: [
          { label: 'L07 (PDF)', href: `${TEACH_BASE}/z2004/lectures/L07.pdf`, kind: 'pdf' },
          { label: 'L08 (PDF)', href: `${TEACH_BASE}/z2004/lectures/L08.pdf`, kind: 'pdf' },
          { label: 'L09 Mapping (PDF)', href: `${TEACH_BASE}/z2004/lectures/L09_ER_to_Relational_Mapping.pdf`, kind: 'pdf' }
        ]
      },
      {
        code: 'M3',
        weeks: '4-5',
        title: 'Relational Algebra & Relational Calculus',
        summary: 'Selection, projection, joins, set operations, division, TRC, and DRC.',
        slides: [
          { label: 'L10 RA I (PDF)', href: `${TEACH_BASE}/z2004/lectures/L10_Relational_Algebra_I.pdf`, kind: 'pdf' },
          { label: 'L11 RA II (PDF)', href: `${TEACH_BASE}/z2004/lectures/L11_Relational_Algebra_II.pdf`, kind: 'pdf' },
          { label: 'L12 RA III (PDF)', href: `${TEACH_BASE}/z2004/lectures/L12_Relational_Algebra_III.pdf`, kind: 'pdf' },
          { label: 'L13 TRC (PDF)', href: `${TEACH_BASE}/z2004/lectures/L13_Tuple_Relational_Calculus.pdf`, kind: 'pdf' },
          { label: 'L14 DRC (PDF)', href: `${TEACH_BASE}/z2004/lectures/L14_Domain_Relational_Calculus.pdf`, kind: 'pdf' }
        ]
      },
      {
        code: 'M4',
        weeks: '6-7',
        title: 'SQL Foundations (DDL & DML)',
        summary: 'Schema creation, constraints, SELECT filtering, sorting, INSERT, UPDATE, and DELETE.',
        slides: [
          { label: 'L15 DDL (PDF)', href: `${TEACH_BASE}/z2004/lectures/L15_SQL_DDL.pdf`, kind: 'pdf' },
          { label: 'L16 SELECT (PDF)', href: `${TEACH_BASE}/z2004/lectures/L16_SQL_Basic_SELECT.pdf`, kind: 'pdf' },
          { label: 'L17 DML (PDF)', href: `${TEACH_BASE}/z2004/lectures/L17_SQL_DML_Insert_Update_Delete.pdf`, kind: 'pdf' }
        ]
      },
      {
        code: 'M5',
        weeks: '8-9',
        title: 'Intermediate SQL: Aggregation, Joins & Subqueries',
        summary: 'GROUP BY, HAVING, inner/outer joins, correlated subqueries, and nested expressions.',
        slides: [
          { label: 'L18 Aggregation (PDF)', href: `${TEACH_BASE}/z2004/lectures/L18_SQL_Aggregation.pdf`, kind: 'pdf' },
          { label: 'L19 (PDF)', href: `${TEACH_BASE}/z2004/lectures/L19.pdf`, kind: 'pdf' },
          { label: 'L20 (PDF)', href: `${TEACH_BASE}/z2004/lectures/L20.pdf`, kind: 'pdf' },
          { label: 'L21 (PDF)', href: `${TEACH_BASE}/z2004/lectures/L21.pdf`, kind: 'pdf' }
        ]
      },
      {
        code: 'M6',
        weeks: '10',
        title: 'Advanced SQL: CTEs & Window Functions',
        summary: 'Recursive common table expressions, ranking/analytic windows, triggers, and stored procedures.',
        slides: [
          { label: 'L24 CTEs (PDF)', href: `${TEACH_BASE}/z2004/lectures/L24_CTEs_Recursive_Queries.pdf`, kind: 'pdf' },
          { label: 'L25 Windows I (PDF)', href: `${TEACH_BASE}/z2004/lectures/L25_Window_Functions_I.pdf`, kind: 'pdf' },
          { label: 'L26 Windows II (PDF)', href: `${TEACH_BASE}/z2004/lectures/L26_Window_Functions_II.pdf`, kind: 'pdf' }
        ]
      },
      {
        code: 'M7',
        weeks: '11-12',
        title: 'Functional Dependencies & Normalization',
        summary: "Armstrong's axioms, lossless join decompositions, 1NF through BCNF, and 4NF.",
        slides: [
          { label: 'L30 FDs (PDF)', href: `${TEACH_BASE}/z2004/lectures/L30_Functional_Dependencies.pdf`, kind: 'pdf' },
          { label: 'L31 Views & Index (PDF)', href: `${TEACH_BASE}/z2004/lectures/L31_Views_and_Index.pdf`, kind: 'pdf' },
          { label: 'L32 1NF-BCNF (PDF)', href: `${TEACH_BASE}/z2004/lectures/L32_Normal_Forms_1NF_BCNF.pdf`, kind: 'pdf' },
          { label: 'L33 4NF/5NF (PDF)', href: `${TEACH_BASE}/z2004/lectures/L33_4NF_5NF_Decomposition.pdf`, kind: 'pdf' }
        ]
      },
      {
        code: 'M8',
        weeks: '13',
        title: 'Storage, Indexing & Revision Notes',
        summary: 'B+ trees, hash indexing, heap files, buffer management, and quiz/ICA revision notes.',
        slides: [
          { label: 'L34 (HTML)', href: `${TEACH_BASE}/z2004/lectures/L34.html`, kind: 'html' },
          { label: 'L35 (HTML)', href: `${TEACH_BASE}/z2004/lectures/L35.html`, kind: 'html' },
          { label: 'L36 (HTML)', href: `${TEACH_BASE}/z2004/lectures/L36.html`, kind: 'html' },
          { label: 'L37 (HTML)', href: `${TEACH_BASE}/z2004/lectures/L37.html`, kind: 'html' },
          { label: 'L38 (HTML)', href: `${TEACH_BASE}/z2004/lectures/L38.html`, kind: 'html' }
        ]
      },
      {
        code: 'M9',
        weeks: '14',
        title: 'Query Processing & Transactions',
        summary: 'Query optimization pipeline, ACID guarantees, two-phase locking (2PL), and ARIES recovery.',
        slides: [
          { label: 'L28 Transactions (PDF)', href: `${TEACH_BASE}/z2004/lectures/L28_Transactions_SQL.pdf`, kind: 'pdf' },
          { label: 'L39 (HTML)', href: `${TEACH_BASE}/z2004/lectures/L39.html`, kind: 'html' },
          { label: 'L40 (HTML)', href: `${TEACH_BASE}/z2004/lectures/L40.html`, kind: 'html' },
          { label: 'L41 (HTML)', href: `${TEACH_BASE}/z2004/lectures/L41.html`, kind: 'html' }
        ]
      },
      {
        code: 'M10',
        weeks: '15-17',
        title: 'Modern & AI Data Systems (NoSQL, Vectors & RAG)',
        summary: 'Document/key-value stores, vector indexing, embeddings, RAG architectures, and cloud databases.',
        slides: [
          { label: 'L42 NoSQL (HTML)', href: `${TEACH_BASE}/z2004/lectures/L42.html`, kind: 'html' },
          { label: 'L43 Vectors (HTML)', href: `${TEACH_BASE}/z2004/lectures/L43.html`, kind: 'html' },
          { label: 'L44 RAG (HTML)', href: `${TEACH_BASE}/z2004/lectures/L44.html`, kind: 'html' },
          { label: 'L45 Cloud DB (HTML)', href: `${TEACH_BASE}/z2004/lectures/L45.html`, kind: 'html' },
          { label: 'L45 Cloud DB (PDF)', href: `${TEACH_BASE}/z2004/lectures/L45_Cloud_Databases.pdf`, kind: 'pdf' }
        ]
      }
    ],
    supplementaryDocs: [
      { label: 'SQL & Normalization Cheat Sheet (PDF)', href: `${TEACH_BASE}/z2004/resources/Z2004_SQL_Normalization_Cheatsheet.pdf`, kind: 'pdf' },
      { label: 'Worked SQL & Normalization Workbook (PDF)', href: `${TEACH_BASE}/z2004/resources/Z2004_Worked_SQL_and_Normalization_Workbook.pdf`, kind: 'pdf' },
      { label: 'Course Schedule (PDF)', href: `${TEACH_BASE}/z2004/lectures/schedule.pdf`, kind: 'pdf' },
      { label: 'SQL Reference Sheet (PDF)', href: `${TEACH_BASE}/z2004/lectures/sql-reference.pdf`, kind: 'pdf' },
      { label: 'Semester Project Guidelines (PDF)', href: `${TEACH_BASE}/z2004/lectures/project-guidelines.pdf`, kind: 'pdf' }
    ],
    grading: [
      { component: 'In-Class Assignments (ICA)', weight: 10, note: 'Fortnightly SQL exercises and schema sketches.' },
      { component: 'Quiz 1', weight: 15, note: 'Covers ER modeling, relational model, and relational algebra (M1-M3).' },
      { component: 'Quiz 2', weight: 20, note: 'Covers basic through advanced SQL (M4-M6).' },
      { component: 'Semester Project', weight: 20, note: 'RAG pipeline or recommendation backend with full relational schema.' },
      { component: 'End-Semester Examination', weight: 35, note: 'Full syllabus examination emphasizing M7-M10.' }
    ],
    textbooks: [
      {
        title: 'Database System Concepts (7th ed.)',
        authors: 'Abraham Silberschatz, Henry Korth, and S. Sudarshan (McGraw-Hill, 2019)',
        role: 'Required'
      },
      {
        title: 'Fundamentals of Database Systems (7th ed.)',
        authors: 'Ramez Elmasri and Shamkant Navathe (Pearson, 2015)',
        role: 'Reference'
      },
      {
        title: 'Learning SQL (3rd ed.)',
        authors: "Alan Beaulieu (O'Reilly, 2020)",
        role: 'Reference'
      }
    ],
    onlineResources: [
      {
        category: 'Client Tooling',
        title: 'DBeaver Community Edition',
        href: 'https://dbeaver.io/',
        description: 'Cross-platform database GUI supporting PostgreSQL, SQL Server, and SQLite.'
      },
      {
        category: 'Primary Engine',
        title: 'PostgreSQL 16 Documentation',
        href: 'https://www.postgresql.org/docs/16/',
        description: 'Official SQL, indexing, and transaction reference.'
      }
    ],
    software: ['PostgreSQL 16', 'SQL Server 2022 / Azure SQL Edge', 'SSMS', 'DBeaver', 'Python + pgvector'],
    policies: STANDARD_POLICIES.slice(0, 3),
    links: {
      teachingSiteHome: `${TEACH_BASE}/z2004/index.html`,
      questionBank: `${TEACH_BASE}/z2004/question-bank/index.html`,
      githubRepo: 'https://github.com/inyalala/iitmz-teaching-site/tree/main/courses/z2004',
      classroomUrl: ''
    }
  },
  {
    slug: 'z5008',
    teachingSiteSlug: 'z5008',
    code: 'Z5008',
    title: 'Big Data Lab',
    program: 'MTech',
    courseType: 'Lab',
    status: 'previous',
    term: 'Even Semester, March - July 2026',
    academicYear: '2025-26',
    credits: 'MTech Core Lab · 15 Sessions',
    summary: 'Hands-on distributed engineering covering Dockerized Spark, Delta Lake, Apache Iceberg, Airflow, Kafka streaming, Structured Streaming, MLlib, MLflow, BentoML, Prometheus, and Grafana.',
    schedule: [
      { session: 'Laboratory', frequency: 'Monday, 2:00 PM - 4:40 PM EAT', details: '2 hr 40 min weekly build session (15 sessions)' }
    ],
    prerequisites: ['Python programming, SQL fundamentals, and Linux command-line basics.'],
    outcomes: [
      'Run containerized PySpark jobs and diagnose DAG stages in the Spark UI.',
      'Manage ACID tables, time travel, and schema evolution in Delta Lake and Apache Iceberg.',
      'Tune PySpark SQL joins and adaptive query execution (AQE) against data skew.',
      'Orchestrate batch pipelines using Apache Airflow DAGs.',
      'Build stateful real-time streaming pipelines with Apache Kafka and Spark Structured Streaming.',
      'Track distributed ML experiments in MLflow and serve models behind BentoML/Docker APIs with Prometheus and Grafana monitoring.'
    ],
    modules: [
      {
        code: 'Lab 01',
        weeks: '1',
        title: 'Course Overview & Containerized PySpark Environment',
        summary: 'Docker Compose cluster setup, first PySpark job, Delta Lake write, and Spark UI inspection.',
        slides: [{ label: 'Lab 01 Slides (PDF)', href: `${TEACH_BASE}/z5008/slides/lab01_lab01_course_overview.pdf`, kind: 'pdf' }]
      },
      {
        code: 'Lab 02',
        weeks: '2',
        title: 'Lakehouse Architecture & Delta Lake',
        summary: 'ACID transaction logs, time travel queries, schema enforcement, and MERGE/UPSERT operations.',
        slides: [{ label: 'Lab 02 Slides (PDF)', href: `${TEACH_BASE}/z5008/slides/lab02_lab02_lakehouse.pdf`, kind: 'pdf' }]
      },
      {
        code: 'Lab 03',
        weeks: '3',
        title: 'Delta Lake & Apache Iceberg Governance',
        summary: 'Iceberg hidden partitioning, snapshot isolation, schema evolution, and catalog patterns.',
        slides: [{ label: 'Lab 03 Slides (PDF)', href: `${TEACH_BASE}/z5008/slides/lab03_lab03_delta_iceberg.pdf`, kind: 'pdf' }]
      },
      {
        code: 'Lab 04',
        weeks: '4',
        title: 'Apache Spark Foundations & DataFrame API',
        summary: 'Parquet/CSV/JSON ingestion, narrow vs. wide transformations, and catalyst execution.',
        slides: [{ label: 'Lab 04 Slides (PDF)', href: `${TEACH_BASE}/z5008/slides/lab04_lab04_spark_foundations.pdf`, kind: 'pdf' }]
      },
      {
        code: 'Lab 05',
        weeks: '5',
        title: 'Spark SQL & Query Performance Tuning',
        summary: 'Window queries, broadcast joins, salting skewed keys, and Adaptive Query Execution.',
        slides: [{ label: 'Lab 05 Slides (PDF)', href: `${TEACH_BASE}/z5008/slides/lab05_lab05_spark_sql_tuning.pdf`, kind: 'pdf' }]
      },
      {
        code: 'Lab 06',
        weeks: '6',
        title: 'Workflow Orchestration with Apache Airflow',
        summary: 'Authoring scheduled DAGs, task retries, XComs, and triggering batch Spark pipelines.',
        slides: [{ label: 'Lab 06 Slides (PDF)', href: `${TEACH_BASE}/z5008/slides/lab06_lab06_airflow.pdf`, kind: 'pdf' }]
      },
      {
        code: 'Lab 07',
        weeks: '7',
        title: 'Real-Time Event Streaming with Apache Kafka',
        summary: 'Topics, partitions, consumer groups, and streaming event ingestion into lakehouse sinks.',
        slides: [{ label: 'Lab 07 Slides (PDF)', href: `${TEACH_BASE}/z5008/slides/lab07_lab07_kafka_streaming.pdf`, kind: 'pdf' }]
      },
      {
        code: 'Lab 08',
        weeks: '8',
        title: 'Spark Structured Streaming',
        summary: 'Event-time watermarks, sliding window aggregations, and checkpointing.',
        slides: [{ label: 'Lab 08 Slides (PDF)', href: `${TEACH_BASE}/z5008/slides/lab08_lab08_structured_streaming.pdf`, kind: 'pdf' }]
      },
      {
        code: 'Lab 09',
        weeks: '9',
        title: 'Big Data Visualization & Analytics Interfaces',
        summary: 'Interactive dashboards and analytical reporting over lakehouse tables.',
        slides: [{ label: 'Lab 09 Slides (PDF)', href: `${TEACH_BASE}/z5008/slides/lab09_lab09_visualization.pdf`, kind: 'pdf' }]
      },
      {
        code: 'Lab 10',
        weeks: '10',
        title: 'Distributed Machine Learning',
        summary: 'Spark MLlib pipelines and distributed model training across partitioned datasets.',
        slides: [{ label: 'Lab 10 Slides (PDF)', href: `${TEACH_BASE}/z5008/slides/lab10_lab10_distributed_ml.pdf`, kind: 'pdf' }]
      },
      {
        code: 'Lab 11',
        weeks: '11',
        title: 'MLOps & Experiment Tracking with MLflow',
        summary: 'Logging parameters, metrics, artifacts, and model registry stage promotions.',
        slides: [{ label: 'Lab 11 Slides (PDF)', href: `${TEACH_BASE}/z5008/slides/lab11_lab11_mlops_mlflow.pdf`, kind: 'pdf' }]
      },
      {
        code: 'Lab 12',
        weeks: '12',
        title: 'DevOps, Docker, Kubernetes & CI/CD',
        summary: 'Containerizing data and ML pipelines with Docker, Kubernetes orchestration basics, and automated CI/CD workflows.',
        slides: [{ label: 'Lab 12 Slides (PDF)', href: `${TEACH_BASE}/z5008/slides/lab12_lab12_deployment.pdf`, kind: 'pdf' }]
      },
      {
        code: 'Lab 13',
        weeks: '13',
        title: 'Observability: Prometheus vs. Grafana',
        summary: 'Metrics scraping, latency/throughput telemetry, and operational alerting dashboards.',
        slides: [{ label: 'Lab 13 Slides (PDF)', href: `${TEACH_BASE}/z5008/slides/lab13_prometheus_vs_grafana.pdf`, kind: 'pdf' }]
      },
      {
        code: 'Lab 14',
        weeks: '14',
        title: 'End-to-End Pipeline Integration',
        summary: 'Integrating ingestion, orchestration, streaming, MLflow tracking, and monitoring.',
        slides: [{ label: 'Lab 14 Slides (PDF)', href: `${TEACH_BASE}/z5008/slides/lab14_lab14_project_integration.pdf`, kind: 'pdf' }]
      },
      {
        code: 'Lab 15',
        weeks: '15',
        title: 'Course Review, Emerging Technologies & Career Paths',
        summary: 'Comprehensive capstone review, emerging big-data tooling, final presentations, and industry career paths.',
        slides: [{ label: 'Lab 15 Slides (PDF)', href: `${TEACH_BASE}/z5008/slides/lab15_lab15_presentations.pdf`, kind: 'pdf' }]
      }
    ],
    grading: [
      { component: 'Weekly Lab Deliverables', weight: 30, weightLabel: '30% (Indicative)', note: 'Submitted at the conclusion of each weekly lab session.' },
      { component: 'Quiz 1', weight: 15, note: 'Written theory quiz (90 min) covering Labs 1-6 lakehouse & Spark foundations.' },
      { component: 'End-to-End Course Project', weight: 30, weightLabel: '30% (Indicative)', note: 'Integrated batch, streaming, MLOps, and monitoring pipeline.' },
      { component: 'End-Semester Examination', weight: 25, weightLabel: '25% (Indicative)', note: 'Theory and practical laboratory evaluation.' }
    ],
    textbooks: [
      {
        title: 'Learning Spark (2nd ed.)',
        authors: "Jules Damji, Brooke Wenig, Tathagata Das, and Denny Lee (O'Reilly, 2020)",
        role: 'Required'
      },
      {
        title: 'Delta Lake: The Definitive Guide',
        authors: "Denny Lee, Tristen Wentling, Scott Haines, and Prashanth Babu (O'Reilly, 2024)",
        role: 'Reference'
      },
      {
        title: 'Machine Learning Engineering with MLflow',
        authors: 'Natu Lauchande (Packt, 2021)',
        role: 'Reference'
      }
    ],
    onlineResources: [
      {
        category: 'Documentation',
        title: 'Apache Spark 3.5 Docs',
        href: 'https://spark.apache.org/docs/latest/',
        description: 'Official DataFrame, Spark SQL, and Structured Streaming reference.'
      },
      {
        category: 'Lakehouse',
        title: 'Delta Lake & Apache Iceberg Docs',
        href: 'https://docs.delta.io/',
        description: 'ACID transaction logs, time travel, and open table formats.'
      }
    ],
    software: ['Docker Compose', 'Apache Spark 3.5', 'Delta Lake', 'Apache Iceberg', 'Airflow', 'Kafka', 'MLflow', 'Prometheus', 'Grafana'],
    policies: STANDARD_POLICIES.slice(0, 3),
    links: {
      teachingSiteHome: `${TEACH_BASE}/z5008/index.html`,
      questionBank: `${TEACH_BASE}/z5008/question-bank/index.html`,
      githubRepo: 'https://github.com/inyalala/iitmz-teaching-site/tree/main/courses/z5008',
      classroomUrl: ''
    },
    supplementaryDocs: [
      { label: 'Big Data & Lakehouse Cheat Sheet (PDF)', href: `${TEACH_BASE}/z5008/resources/Z5008_BigData_Lakehouse_Cheatsheet.pdf`, kind: 'pdf' },
      { label: 'Spark & Streaming Architecture Workbook (PDF)', href: `${TEACH_BASE}/z5008/resources/Z5008_Spark_Streaming_Architecture_Workbook.pdf`, kind: 'pdf' }
    ]
  }
];
