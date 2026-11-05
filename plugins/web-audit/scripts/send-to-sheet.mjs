import { readFileSync } from 'node:fs';

const webAppUrl = process.env.WEB_AUDIT_SHEET_URL;
const sharedKey = process.env.WEB_AUDIT_SHEET_KEY;
if (!webAppUrl || !sharedKey) {
  console.error('set WEB_AUDIT_SHEET_URL and WEB_AUDIT_SHEET_KEY');
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

let responseText;
try {
  const response = await fetch(webAppUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: sharedKey, run: report.run, rows: report.rows }),
    signal: AbortSignal.timeout(20000),
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
