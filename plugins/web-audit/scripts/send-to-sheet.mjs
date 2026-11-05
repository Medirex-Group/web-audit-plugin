import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const COLUMN_COUNT = 5;
const SEND_TIMEOUT_MS = 60000;
const settingsFilePath = join(homedir(), '.web-audit', 'sheet.json');

let settings;
try {
  settings = JSON.parse(readFileSync(settingsFilePath, 'utf8'));
} catch (settingsError) {
  console.error('sheet not set up - ' + settingsError.message);
  process.exit(1);
}

const webAppUrl = settings?.url;
const sharedKey = settings?.key;
if (!webAppUrl || !sharedKey) {
  console.error('sheet not set up - url or key missing');
  process.exit(1);
}

const rowsFilePath = process.argv[2];
if (!rowsFilePath) {
  console.error('usage - send-to-sheet.mjs <rows.json>');
  process.exit(1);
}

let report;
try {
  report = JSON.parse(readFileSync(rowsFilePath, 'utf8'));
} catch (readError) {
  console.error('cannot read rows file - ' + readError.message);
  process.exit(1);
}

const rows = report?.rows;
const rowsAreValid = Array.isArray(rows) && rows.length > 0 && rows.every((row) => Array.isArray(row) && row.length === COLUMN_COUNT);
if (!rowsAreValid) {
  console.error('rows file invalid - needs at least one row, each with ' + COLUMN_COUNT + ' columns');
  process.exit(1);
}

let responseText;
try {
  const response = await fetch(webAppUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: sharedKey, run: report.run, rows }),
    signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
  });
  responseText = await response.text();
} catch (sendError) {
  console.error('send failed - ' + sendError.message);
  process.exit(1);
}

if (!responseText.startsWith('ok')) {
  console.error('sheet rejected - ' + responseText);
  process.exit(1);
}
console.log(responseText);
