import fs from "node:fs";

const path = "dist/github-contribution-grid-snake.svg";
const outputPath = "dist/firebird-contributions-v2.svg";
let svg = fs.readFileSync(path, "utf8");
const duration = svg.match(/\.s\{[^}]*animation:none linear (\d+ms) infinite/)?.[1];
if (!duration || !svg.includes("@keyframes s0")) throw new Error("Snake animation not found");

// The s0 class uses the exact same path animation as the leading snake cell.
const dragon = `
<style>
  .dragon-head { transform-origin: 0 0; transform: translate(0px,-16px); animation: s0 ${duration} linear infinite; }
</style>
<g class="dragon-head" aria-label="Firebird">
  <path fill="#a92320" stroke="#ffb347" stroke-width="1" d="M8 11C-1 5-8 3-15-3c2 8 6 14 14 17-8 0-12-1-17-3 4 7 11 10 20 9z"/>
  <path fill="#f05b2d" d="M3 13C-6 8-10 6-14 2c3 8 10 12 16 14z"/>
  <path fill="#ffba50" d="M-4 18l-15 7 14-3-7 7 13-7z"/>
  <path fill="#d43927" stroke="#74201a" stroke-width="1" d="M3 11C5 4 12 2 18 6l4-2-2 5c0 7-5 13-13 12z"/>
  <path fill="#ff9a38" d="M7 11c3-4 7-5 11-3-1 5-4 8-9 9z"/>
  <path fill="#ffe4a1" d="M14 8h2v2h-2z"/>
  <path fill="#ffcf59" d="M19 10l6 2-6 2zM12 5l-1-6 4 5 2-5 1 7z"/>
  <path fill="#ffb347" d="M3 21l-12 11 5-10zM7 22L2 35l10-14z"/>
</g>`;

if (!svg.includes("dragon-head")) {
  svg = svg.replace("</svg>", `${dragon}</svg>`);
}

fs.writeFileSync(outputPath, svg);
