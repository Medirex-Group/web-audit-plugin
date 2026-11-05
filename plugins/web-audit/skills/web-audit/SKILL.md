---
name: web-audit
description: Audit a live website's content and SEO with a headless browser. Use when the user asks to check, verify, or audit pages, articles, or sections, or to run an SEO audit, on a live site.
---

Audit live website content with the bundled headless Playwright MCP server. Run the five contracts in order. Address every scope and check by its stable id, never by its text. Return the report inline. Write a file only if the user asks.

## Contracts
1. Audit Plan - parse the request into scopes and atomic checks. Ask only to clear ambiguities, then proceed. Scope and checks lock here. See `references/audit-plan.md`. If the request asks for an SEO audit, take the checks from `references/seo-checks.md` instead of defining them, and run both sets if content checks are also named.
2. Discovery - resolve each scope into a Page Set of URLs by whatever source fits - sitemap, crawl, the page's nav or section links, or a list. See `references/discovery.md`.
3. Preview and confirm - check one page per scope, freeze each check's probe, ask only if judging is unclear, then show the checks, page count, and estimated time and ask to proceed. This is the one forced stop. See `references/discovery.md`.
4. Per-page audit - visit each remaining URL, judge each check from extracted facts, wait at least 3s between page visits. See `references/judging.md`.
5. Report - combine Result records into one inline report. See `references/report.md`. If the user asked to save to the Sheet, send the rows after the report - if they did not ask, offer to save after the report and send only if they accept. See `references/sheet-output.md`.

## Rules
- Browsing starts at discovery, only after any Contract 1 questions are answered.
- Start the full audit only after the Contract 3 go-ahead.
- Pace - wait at least 3s from loading one page to loading the next. This is a gap between pages, not a time limit per page.
- A page error records `error` for that page and the run continues.
- Verdicts come from facts the probe extracts, not visual guesses, so re-running the same page gives the same verdict. For a quality intent, the agent composes those signals at the Gate 3 sample and freezes them.
- Interaction checks are supported - a check may click, type, or select, then assert the result. Every browser tool is allowed except `browser_run_code_unsafe`.
- A scope or check may name a screen - mobile, desktop, or a width like 961px. Resize to it before judging, default desktop. "Both screens" is two checks, one per screen.
- Contract 3 freezes each check's `probe` - locate, extract, pass criteria - from one sample page of the scope. Every page in the scope is judged with that same frozen probe, never re-derived.
- Never show the user technical internals - no selectors, DOM talk, link counts, or how something was found. Speak in plain words. Do whatever it takes under the hood, and when genuinely unsure ask the user a plain-language question.
- The inline report always runs. The Sheet write happens when the user asks, or when they accept the offer made after the report, and never blocks or replaces the inline report.
