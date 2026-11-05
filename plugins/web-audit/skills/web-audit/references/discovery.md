# Contract 2 - Discovery, and Contract 3 - Preview and confirm

Resolves each scope into a concrete URL list, then confirms it with the user. Browsing starts here.

## Input
The confirmed Audit Plan from Contract 1.

## Discovery per scope
Goal - resolve the scope into a concrete list of in-scope page URLs from whatever source fits. Tool names are hints, use the browser MCP as the page needs.

Sources, used alone or combined -
- explicit list - use `resolution.urls` as given, one or more, no fetch. A single page is a list of one.
- sitemap - open `resolution.base_url` (`browser_navigate`) and read its page URLs (`browser_evaluate`), following child sitemaps if the root is a `<sitemapindex>`.
- crawl - open `resolution.base_url`, collect links (`browser_evaluate`, resolving relative links to absolute), following pagination or scrolling the listing until no new in-scope links appear.
- nav or section links - open the page and collect the links in its main navigation or a named section, the set the user meant.

When a URL pattern fits, keep URLs matching `include_pattern` and drop those matching `exclude_pattern` - a source that already defines the set (for example the nav links) needs no pattern.

Then normalize so URLs compare cleanly - force `https`, lowercase the host, drop the fragment and a trailing slash, drop a query string that is not part of a used pattern - and remove duplicates.

## Fallback
If a source fails or yields no in-scope URLs, try another - for example crawl the listing, or read the nav. Derive a listing URL from the scope's base path when one fits (for example `https://www.medirex.sk/blog`). Tell the user the source changed. Ask the user only when no source fits.

## Page Set
The internal list discovery produces, not shown to the user. One record per URL, ordered as discovered.
```text
{ scope_id, url }
```

## Contract 3 - Preview and confirm
One stop, run top to bottom. Discovery already set the page count. Contract 3 previews and confirms, it does not recompute the count. Clarifying answers change only the probe.

1. For each scope, run Contract 4 on its first URL. Set and lock that scope's checks' `probe` values - `locate` (how to find the target element or region), `extract` (the exact facts to read), `pass_criteria` (the threshold mapping facts to `pass`/`partial`/`fail`). Verify on this page that `locate` returns only the intended element, for example the products section and not the whole page, refining until it does. Keep each result as that scope's Result #1. Before freezing a check's `probe`, `browser_resize` to that check's screen - group the page's checks by screen and resize once per screen, so each `probe` is frozen at the screen it will be judged at. For a quality-intent check, compose here the concrete signals that define it on this site - for example no horizontal overflow, every image loads, no console errors, key regions present and non-empty - and freeze them as the `probe` like any check.
2. If judging that page is unclear, ask all open questions at once, numbered. Answer anything the user asks back, re-ask what remains over as many rounds as needed until clear.
3. Show per scope - the checks in the readable plan layout from `audit-plan.md`, the page count, and the estimated time. For a quality intent, show in plain words the concrete signals it will check, so the user confirms what "broken" means. Time is at least `count` x 3s for the pages themselves, and more for any check that opens product pages or verifies links, which can multiply it. Showing the checks here lets the one go-ahead confirm both the interpretation and the scope.
4. Ask to proceed. Start the full audit only on an explicit go-ahead. The user may cancel here. This is the only forced stop in a run.

Internal result of Contract 3 - the Confirmed Set, with each check's `probe` frozen and each scope's Result #1 kept. Not shown beyond the preview in step 3.
