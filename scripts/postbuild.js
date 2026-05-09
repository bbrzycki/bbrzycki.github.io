import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const indexPath = join("dist", "index.html");
const fallbackPath = join("dist", "404.html");

if (existsSync(indexPath)) {
  copyFileSync(indexPath, fallbackPath);
}
