import fs from "node:fs";

const token = process.env.GH_TOKEN;
if (!token) throw new Error("PRIVATE_STATS_TOKEN is not configured");

const headers = { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" };
const totals = new Map();

for (let page = 1; page <= 10; page += 1) {
  const response = await fetch(`https://api.github.com/user/repos?visibility=all&affiliation=owner,collaborator,organization_member&per_page=100&page=${page}`, { headers });
  if (!response.ok) throw new Error(`Repositories request failed: ${response.status}`);
  const repos = await response.json();
  if (!repos.length) break;
  for (const repo of repos) {
    if (repo.fork) continue;
    const languagesResponse = await fetch(repo.languages_url, { headers });
    if (!languagesResponse.ok) continue;
    for (const [language, bytes] of Object.entries(await languagesResponse.json())) {
      totals.set(language, (totals.get(language) ?? 0) + bytes);
    }
  }
  if (repos.length < 100) break;
}

const colors = { "C#": "#b83224", Java: "#e87524", JavaScript: "#f1c40f", TypeScript: "#3178c6", Python: "#3776ab", PowerShell: "#5391fe", HTML: "#e34f26", CSS: "#1572b6" };
const entries = [...totals.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
const total = entries.reduce((sum, [, bytes]) => sum + bytes, 0) || 1;
const rows = entries.map(([name, bytes], index) => {
  const y = 48 + index * 27;
  const percent = ((bytes / total) * 100).toFixed(1);
  const color = colors[name] ?? "#ff6b35";
  return `<circle cx="28" cy="${y - 5}" r="5" fill="${color}"/><text x="42" y="${y}" fill="#f4f1ed" font-size="14">${name}</text><text x="250" y="${y}" fill="#ffb347" font-size="14" text-anchor="end">${percent}%</text>`;
}).join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="${Math.max(190, 70 + entries.length * 27)}" viewBox="0 0 300 ${Math.max(190, 70 + entries.length * 27)}"><rect width="300" height="100%" rx="18" fill="#1a1b26"/><text x="22" y="28" fill="#ffb347" font-size="17" font-weight="700">Most Used Languages</text>${rows}</svg>`;
fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync("dist/languages.svg", svg);
