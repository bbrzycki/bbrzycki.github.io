import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  publications,
  talks,
  projects,
  profile,
  links,
  websites,
} from "../src/data/content.js";
import { legacyMarkdown } from "../src/data/legacyContent.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function uniqueSlugs(items, label) {
  const seen = new Set();
  for (const item of items) {
    assert(item.slug, `${label} is missing a slug`);
    assert(!seen.has(item.slug), `${label} has duplicate slug: ${item.slug}`);
    seen.add(item.slug);
  }
}

function localAsset(path, label) {
  if (!path || !path.startsWith("/")) return;
  const clean = path.split("#")[0].split("?")[0];
  assert(
    existsSync(join(root, "public", clean)) || existsSync(join(root, clean)),
    `${label} references missing asset ${path}`,
  );
}

uniqueSlugs(publications, "publication");
uniqueSlugs(talks, "talk");
uniqueSlugs(projects, "project");
uniqueSlugs(websites, "website");

assert(profile.name === "Bryan Brzycki", "profile name changed unexpectedly");
assert(publications.length >= 7, "expected at least 7 publications");
assert(talks.length >= 10, "expected at least 10 talks");
assert(projects.length >= 5, "expected at least 5 projects");
assert(websites.length >= 3, "expected at least 3 websites");
for (const item of websites) assert(item.url?.startsWith("https://"), `${item.title} is missing a secure URL`);
assert(links.social.some((link) => link.href === "https://letterboxd.com/bryanbrzycki/"), "Letterboxd link is missing");
assert(links.social.some((link) => link.href === "https://www.youtube.com/@bryanbrzycki"), "YouTube handle link is missing");

for (const item of publications) localAsset(item.localPdf, item.title);
for (const item of talks) localAsset(item.slides, item.title);
for (const item of projects) localAsset(item.image, item.title);
for (const item of websites) localAsset(item.image, item.title);
for (const link of links.primary) localAsset(link.href, link.label);

assert(legacyMarkdown.about?.includes("Hi! My name's Bryan"), "legacy about markdown is missing");
assert(legacyMarkdown.usaaao?.includes("USA Astronomy and Astrophysics Competition Foundation"), "legacy USAAAO markdown is missing");
for (const item of publications) assert(legacyMarkdown.publications[item.slug], `${item.title} is missing legacy publication markdown`);
for (const item of talks) assert(legacyMarkdown.talks[item.slug], `${item.title} is missing legacy talk markdown`);
for (const item of projects) assert(legacyMarkdown.projects[item.slug], `${item.title} is missing legacy project markdown`);

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`OK: ${publications.length} publications, ${talks.length} talks, ${projects.length} projects, ${websites.length} websites.`);
