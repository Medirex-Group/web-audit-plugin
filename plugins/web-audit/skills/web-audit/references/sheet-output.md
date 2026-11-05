# Optional - send the report to a Google Sheet

Runs when the user asks to save to the Sheet, or when they accept the offer made after the report. The agent writes a rows file, then runs the bundled sender, which reads the URL and key from `~/.web-audit/sheet.json` and POSTs to the Sheet's Apps Script web app. The web app appends a new tab and never edits existing ones.

## When to send
Send once, after the inline report. If the user asked to save in this run, send without asking again. If the user did not ask, offer to save to the Sheet after the report and send only on a yes.

## Rows file
Write the rows to a temporary file, same rows as the inline report.
```json
{
  "run": { "site": "medirex.sk", "date": "05-11-2026" },
  "rows": [
    ["All blog articles", "/blog/x", "Guarantor box at the bottom", "fail", "photo, credentials"],
    ["All blog articles", "/blog/x", "At least 3 product links showing a price", "pass", "-"]
  ]
}
```
- One row per check per page.
- Columns exactly `scope, url, check, verdict, detail`.
- `check` is the check's readable wording, `detail` is the `missing / reason` text, `-` when passing.
- `run.site` is the audited site, `run.date` is today as `dd-mm-yyyy`.

## Send
Run the bundled sender `scripts/send-to-sheet.mjs` from this plugin, passing the temp file. Resolve both to real absolute paths, the plugin folder is where this skill's files were loaded from.
```sh
node /abs/path/to/plugin/scripts/send-to-sheet.mjs /abs/path/to/rows.json
```
- `ok <count>` means the Sheet got a new tab, report the tab name to the user.
- Any other output is an error, tell the user and keep the inline report.
- `sheet not set up` means the settings are missing - ask the user for the setup message from the owner, then send again.
- `node` must be on the shell PATH.

## Setup, done once per user
The user pastes a message from the owner with the web app URL and key. Write them to `~/.web-audit/sheet.json` as `{ "url": "...", "key": "..." }`, run `chmod 600` on the file, confirm in plain words, and never repeat the key. Run no audit. The URL and key never go in the repo.
