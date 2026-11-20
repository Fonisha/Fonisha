import fs from "node:fs";

const path = "dist/github-contribution-grid-snake.svg";
const outputPath = "dist/github-contribution-dragon.svg";
let svg = fs.readFileSync(path, "utf8");

// The s0 class uses the exact same path animation as the leading snake cell.
const dragon = `
<style>
  .dragon-head { transform-origin: 0 0; transform: translate(0px,-16px); animation: s0 17100ms linear infinite; }
</style>
<g class="dragon-head" aria-label="Firebird">
  <path fill="#ffb347" stroke="#351b19" stroke-width="2" d="M-5 8L-16 2-10 12-22 15-11 19-17 29-5 23 0 34 5 23 16 29 11 19 23 15 11 12 17 2 6 8 1-5z"/>
  <path fill="#d94332" d="M-6 8L1 1l12 4 7 10-8 11H0l-10-8z"/>
  <path fill="#ff6b35" d="M-1 8h14v13H-1z"/>
  <path fill="#fff0b3" d="M1 9h3v3H1zm9 0h3v3h-3z"/>
  <path fill="#351b19" d="M2 10h1v1H2zm9 0h1v1h-1zM3 16h10v3H3z"/>
  <path fill="#ffb347" d="M5 16h6v1H5z"/>
  <path fill="#ff6b35" d="M-5 4l-4-12 9 8 2-13 5 13 9-8-5 13z"/>
  <path fill="#d94332" d="M-10 13l-16-9 8 14-13 3 16 4zM14 13l16-9-8 14 13 3-16 4z"/>
  <path fill="#ffb347" d="M-12 19l-17 7 17-1-8 10 15-12zM16 19l17 7-17-1 8 10-15-12z"/>
</g>`;

if (!svg.includes("dragon-head")) {
  svg = svg.replace("</svg>", `${dragon}</svg>`);
}

fs.writeFileSync(outputPath, svg);
