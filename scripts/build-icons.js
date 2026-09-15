// Generates a self-hosted, subsetted Font Awesome build containing ONLY the
// icons actually used on the site, instead of loading the full library from
// the cdnjs CDN. Run: node scripts/build-icons.js
const { fontawesomeSubset } = require("fontawesome-subset");

const solid = [
  "arrow-left", "arrow-right", "arrow-up", "arrow-up-right-from-square",
  "bars", "book", "brain", "briefcase", "bullseye", "calendar", "camera",
  "chalkboard", "chalkboard-teacher", "chalkboard-user", "chart-line",
  "check", "chevron-down", "chevron-left", "chevron-right", "circle",
  "circle-dot", "circle-play", "circle-question", "clock",
  "clock-rotate-left", "code-branch", "compass", "download", "envelope",
  "envelope-open", "external-link-alt", "eye", "file-alt", "file-lines",
  "file-pdf", "filter", "flask", "folder-open", "graduation-cap",
  "handshake", "heartbeat", "home", "language", "lightbulb", "link",
  "lock-open", "magnifying-glass", "map-marker-alt", "microphone",
  "microscope", "moon", "network-wired", "newspaper", "phone",
  "quote-left", "robot", "rotate", "search", "seedling", "sun",
  "triangle-exclamation", "trophy", "user-graduate", "users-rectangle",
  "xmark",
];

const brands = ["github", "linkedin-in", "orcid", "researchgate", "twitter"];
const regular = ["copy"];

fontawesomeSubset(
  { solid, brands, regular },
  "fonts/fontawesome",
  { package: "free" }
).then(() => console.log("Font Awesome subset built: fonts/fontawesome/"));
