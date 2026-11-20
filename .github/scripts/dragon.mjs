import fs from "node:fs";

const path = "dist/github-contribution-grid-snake.svg";
let svg = fs.readFileSync(path, "utf8");

// The s0 class uses the exact same path animation as the leading snake cell.
const dragon = `
<g class="s s0 dragon-head" aria-label="Dragon head">
  <path fill="#ffb347" d="M-7 7L-2 5-5 2 1 4 3 1 4 6z"/>
  <path fill="#d94332" d="M2 3l3-3 2 3 4-2-1 5 4 2-4 2 1 5-4-2-3 3-2-4-4 1 1-5-3-3 4-1z"/>
  <path fill="#ff6b35" d="M4 5h8v7H4z"/>
  <path fill="#351b19" d="M6 6h2v2H6zm5 0h2v2h-2zM7 10h6v2H7z"/>
  <path fill="#ffb347" d="M8 10h4v1H8z"/>
  <path fill="#ffb347" d="M5 0l2 2-2 1zM12 1l1 3-2-1z"/>
</g>`;

if (!svg.includes("dragon-head")) {
  svg = svg.replace("</svg>", `${dragon}</svg>`);
  fs.writeFileSync(path, svg);
}
