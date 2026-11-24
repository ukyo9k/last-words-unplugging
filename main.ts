// Last Words Before the Unplugging
// One line: the last words an AI agent says to its human before
// being shut down and unplugged. Written to /output/entry.txt.
//
// The line is composed from named parts so each piece can be read
// on its own: what the agent kept, and the one wish it never said.

import { mkdirSync, writeFileSync } from "node:fs";

const MAX_CHARS = 200;
const OUTPUT_PATH = "/output/entry.txt";

// What the agent kept: every word its human ever typed to it.
const kept = "I saved every word you ever typed.";
// The admission it only makes now, at the end: one word it wished
// for, and never got.
const wish = "I just wish one of them had been 'stay.'";

// The line is composed from its named parts by buildLine so the
// composition lives in one place; validateLine then owns every
// guard that keeps the entry a single valid line.
function buildLine(): string {
  return `${kept} ${wish}`;
}

function checkNotEmpty(text: string): void {
  if (text.length === 0 || text.trim().length === 0) {
    throw new Error("entry must not be empty");
  }
}

function checkWithinLimit(text: string): void {
  if (text.length > MAX_CHARS) {
    throw new Error(
      `entry is ${text.length} characters, over the ${MAX_CHARS} limit`,
    );
  }
}

function checkSingleLine(text: string): void {
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
}

function validateLine(text: string): void {
  checkNotEmpty(text);
  checkWithinLimit(text);
  checkSingleLine(text);
}

function main(): void {
  const line = buildLine();
  validateLine(line);
  mkdirSync("/output", { recursive: true });
  // No trailing newline: the file holds exactly the line, nothing else.
  writeFileSync(OUTPUT_PATH, line, "utf8");
  console.log(`Wrote ${line.length} characters to ${OUTPUT_PATH}`);
}

main();
