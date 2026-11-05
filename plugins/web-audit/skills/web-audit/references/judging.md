# Contract 4 - Per-page audit

Visits each confirmed URL and judges every check, producing one Result record per check per page.

## Input
The Confirmed Set from Contract 3, plus the checks from the Audit Plan.

Contract 3 already judged one URL per scope as that scope's Result #1 and froze each check's `probe`. Audit every URL in the Confirmed Set except those already-judged sample URLs, applying each check's frozen `probe` unchanged to its pages.

## Per URL, in order
1. `browser_navigate` to the URL - the navigation returns after the page loads. If the content a check needs is rendered after load, `browser_wait_for` a known text or element on that content before judging.
2. If the HTTP status is >=400, the navigation times out, or the page is a firewall block page (title or body says the request was blocked, not the real content), record `error` for every check on that page with the status or reason, then continue to the next URL. Never abort the whole run.
3. Group this page's checks by their resolved screen. For each screen group, `browser_resize` to that screen once before judging the group, always setting the group's screen rather than assuming the prior size. `browser_resize` is not a navigation and adds no 3s gap.
4. For each check that has `steps`, perform them in order with the interaction tools - `browser_click`, `browser_type`, `browser_fill_form`, `browser_select_option`, `browser_hover`, `browser_press_key`, `browser_handle_dialog`. After a step that triggers async content, `browser_wait_for` the expected text or element before the next step.
5. For each check, `browser_evaluate` to run the check's frozen `probe` - `locate` the target, `extract` the facts, apply `pass_criteria`. Use the same `probe` on every page, never re-derive it. If `locate` finds nothing, record `fail` with the missing target as evidence.
6. Judge each part of a multi-part check against the frozen `pass_criteria`.

A check may need to open linked pages - a product page to confirm it is still on sale, or a link to confirm it opens. A link is working when it returns status `200`. A status check is light and needs no 3s gap, but avoid large bursts to the same host. Opening a full page counts as a page visit and keeps the 3s gap.

## Interaction and state
Interactions run against the live site and may submit forms, add to cart, or fire analytics - this is accepted. Cookies and storage persist within a run, so a check sensitive to first-visit state (for example a modal shown once per session) must clear the relevant storage with `browser_evaluate` before its steps, or record the residual state in `evidence`.

## Pacing
Keep at least 3s between consecutive `browser_navigate` calls, measured navigation-start to navigation-start. 3s is the default, raise it per site if one rate-limits. No pre-wait before the first page.

## Verdicts
Per check.
- `pass` - all parts satisfied.
- `partial` - some parts satisfied. Only for checks that have parts.
- `fail` - the criteria are not met.
- `error` - the page could not be loaded or judged.

A verdict may be decided per page from the page's own facts, or across the collected results when the check is about the set - an outlier, consistency, how many pages share a trait. The probe extracts the facts per page the same way either way, only where the verdict is decided differs.

## Result record
One per check per page.
```text
{ scope_id, check_id, url, verdict, parts: [{part, verdict}], evidence }
```
- `verdict` - one of the four above.
- `parts` - per-part verdicts, empty when the check has no parts.
- `evidence` - a short extracted quote or element description proving the verdict. For `fail` or `partial`, name what was missing. For `error`, hold the status or reason.

## Reliability rule
Each check runs the same frozen `probe` and `pass_criteria` on every page in its scope, so the same page yields the same verdict. A `probe` may read several signals at once (for example overflow, image loads, console errors) - that is still one frozen probe. The `probe` is fixed once in Contract 3 and never re-derived mid-run. Always record the extracted evidence so a human can check any call.

## Progress display
A one-line tick every 10 pages, counting pages not checks. A page is `clean` when every check on it is `pass`, else it has issues. Plus one line per `error` page. No per-page spam.
```text
Auditing 119 articles, pacing 3s each, plus link and product checks.

[10/119] done - 8 clean, 2 with issues
[20/119] done - 14 clean, 6 with issues
[47/119] /blog/some-article - page error 500, recorded as error, continuing
...
[119/119] done - 90 clean, 29 with issues
```
