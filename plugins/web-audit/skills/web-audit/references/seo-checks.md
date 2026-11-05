# SEO check preset

A fixed set of standard on-page SEO checks. Loaded only when the request asks for an SEO audit. These are ordinary checks - they carry stable ids, flow through discovery, get a frozen `probe` at Contract 3, and report like any other check. They are predefined, so Contract 1 does not ask the user to define them.

If the request also names content checks, run both sets in one pass. If a preset check duplicates a content check the user already asked for, keep one.

## Checks
```text
- check_id: seo-title
  assertion: The page has a title, 10 to 60 characters long.
  parts: []
- check_id: seo-meta-description
  assertion: A meta description is present, 50 to 160 characters long.
  parts: []
- check_id: seo-single-h1
  assertion: The page has exactly one H1.
  parts: []
- check_id: seo-heading-order
  assertion: Headings nest in order, no heading level is skipped.
  parts: []
- check_id: seo-canonical
  assertion: A canonical link is present and is an absolute URL.
  parts: []
- check_id: seo-indexable
  assertion: The page is not set to noindex.
  parts: []
- check_id: seo-open-graph
  assertion: Open Graph tags are present.
  parts: [og-title, og-description, og-image]
- check_id: seo-image-alt
  assertion: Every content image has non-empty alt text.
  parts: []
- check_id: seo-html-lang
  assertion: The html element has a lang attribute.
  parts: []
- check_id: seo-structured-data
  assertion: At least one JSON-LD structured-data block is present.
  parts: []
- check_id: seo-url-readable
  assertion: The URL is clear, relevant, and not needlessly long.
  parts: []
```

## Readable form
```text
SEO checks on each page
1. Title present, 10 to 60 characters
2. Meta description present, 50 to 160 characters
3. Exactly one H1
4. Headings in order, no level skipped
5. Canonical link present and absolute
6. Page is indexable, not noindex
7. Open Graph tags - title, description, image
8. Every content image has alt text
9. Page language set
10. Structured data present
11. URL clear and not too long
```
