# Contract 1 - Audit Plan

Turns the user's free-text request into a confirmed plan. No browsing happens in this contract.

## Input
One free-text request from the user, naming one or more targets and what to check.

Checks can also come from a preset instead of the request. If the request asks for an SEO audit, load the checks from `seo-checks.md` - they carry stable ids, are predefined, and skip the ambiguity questions below. Preset and request checks can run together, keep one if a preset check duplicates a requested one. Scope is always parsed and confirmed as normal.

## Agent steps
1. Split the request into scopes - one scope per distinct target area.
2. Split each scope into atomic checks - one check per single assertion.
3. Break a multi-part check into named parts - each part is judged and reported on its own.
4. Write each check as a pass condition - a concrete check is a yes/no test now, a quality intent (nothing broken) is carried as intent and made concrete at the Gate 3 sample.
5. Resolve each check's `screen` from the words - the check's mention, else the scope's mention, else `desktop` - split a both-screens request into two checks, one per screen.
6. Derive `resolution` for each scope - see fields below.
7. Assign a stable `scope_id` and `check_id` to every scope and check - lower-kebab-case.
8. If the scope or target is ambiguous (which pages, which site), ask all open questions at once as a numbered list. Answer any question the user asks back, and re-ask what remains over as many rounds as needed until the scope is clear. Do not guess. What a quality intent means is settled at the Gate 3 sample, not here.
9. Once clear, build the plan internally and proceed to discovery. Scope and checks lock here and do not change in later stages. The checks are shown to the user once, at Contract 3.

## Internal structured plan
Kept by the agent, never shown to the user. One block per scope.

```text
scope_id: blog-articles
label: All medirex.sk blog articles
resolution:
  method: sitemap            # or crawl, nav or section links, or an explicit list
  base_url: https://www.medirex.sk/sitemap.xml
  include_pattern: ^https://www\.medirex\.sk/blog/[^/]+$
  exclude_pattern: /blog/kategoria/
  urls: []                   # used only for an explicit list
checks:
  - check_id: guarantor-box
    assertion: Bottom guarantor box with photo, name, credentials, description.
    parts: [photo, name, credentials, description]
    screen: desktop
  - check_id: related-products-3
    assertion: At least 3 links to product pages, each link showing a price on the article.
    parts: []
```

### resolution fields
- `method` - how the scope's URLs are found. Use whatever source fits - the sitemap, crawling a listing, reading a page's navigation or a section's links, or an explicit list. Combine sources when needed.
- `base_url` - the page to start from - the sitemap, the listing, or the page whose nav or links are read. Ignored for an explicit list.
- `include_pattern` - optional regex a URL must match, used only when a URL pattern fits the scope. Omit when the source already defines the set, for example the main-nav links.
- `exclude_pattern` - optional regex that drops a matched URL. Empty means drop nothing.
- `urls` - explicit URLs for a list, one or more. A single page is a list of one.

### check fields
- `check_id` - stable id. Results address this check by id, never by its text.
- `steps` - optional ordered interactions to perform before judging - click, type, fill, select, hover, press key. Empty for a static content check.
- `assertion` - the pass condition, evaluated after any steps. Either a precise yes/no test, or a quality intent (for example `nothing looks broken`) that the agent turns into concrete extracted signals at the Gate 3 sample and freezes as the `probe`.
- `parts` - named sub-requirements. Empty when the check is a single assertion.
- `probe` - empty at plan time. Set and frozen in Contract 3 from one sample page - `locate`, `extract`, `pass_criteria`. See `discovery.md` and `judging.md`. This check's frozen `probe` is reused on every page in the scope.
- `screen` - which screen the check is judged at.
  - Resolved from the words - the check's own mention, else the scope's mention, else `desktop`.
  - Presets - `desktop` 1280x720, `mobile` 390x844, an explicit width `N` means N x 720.
  - A request to test both screens becomes two checks, same assertion, one per screen, each with its own `check_id`.
  - A non-default screen shows in the readable wording, for example `Guarantor box at the bottom - mobile`. When both are tested, suffix each side `- desktop` and `- mobile`.

### Interaction check example
A check with `steps` performs actions, then asserts the result.
```text
  - check_id: newsletter-modal
    steps:
      - click: button "Subscribe"
    assertion: A newsletter modal becomes visible after the click.
    parts: []
```
Readable form - `Click Subscribe, a newsletter modal opens`.

## Readable plan
Shown to the user once at Contract 3 for the single confirm. No ids, no regex. The page count is added at Contract 3 after discovery.

```text
Scope
- All medirex.sk blog articles

Checks on each article
1. Guarantor box at the bottom, with all of:
   - photo
   - name
   - credentials
   - description
2. At least 3 links to product pages, each link showing a price on the article
```

Multiple scopes render as repeated `Scope` + `Checks` blocks, one per scope.

## Ambiguity and lock
The agent asks only when something is ambiguous. It asks all open questions at once, numbered, and keeps the exchange open - the user may answer, answer partly, or ask the agent to explain a question. Repeat rounds until the scope is clear, then proceed - what a quality intent means is settled at the Gate 3 sample. With no scope ambiguity it proceeds to discovery without showing anything. Scope and checks lock here. The checks are shown once at Contract 3, the one approval stop.

## Rules
- One assertion per check. A compound request is split into separate checks.
- A check with parts reports each part pass/fail, not one combined verdict.
- Every scope and check carries a stable id before leaving this contract.
