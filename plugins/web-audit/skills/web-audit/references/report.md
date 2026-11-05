# Contract 5 - Report

Combines all Result records into one inline analytical report. Tables and counts, not prose. State facts, never editorialize (no `likely`, no `bad for SEO`).

## Input
All Result records from Contract 4.

## Report shown to the user, in order
1. Scope line - pages audited, per scope.
2. Results table - one row per check, columns `check`, `pass`, `partial`, `fail`, `error`. Head each check row with the check's readable wording from the plan.
3. Exceptions, per check - a table of only the non-pass pages, columns `url`, `verdict`, `detail`. Do not list passing pages.
4. Site-wide table - findings that repeat across many pages, columns `finding`, `affected`, `scope or cause`.

Group by scope, then by check. Within a check, order `error`, `fail`, `partial`.

## Format
Markdown tables, inline in the chat reply. No sentences outside tables except the scope line. Write a file only if the user asks.

## Optional Sheet output
If the user asked to save to a Sheet, or accepts the offer made after the report, the same rows also go there. See `sheet-output.md`. The inline report still runs regardless.

## Example
Illustrative only, not the scope above.
```text
Scope - 119 blog articles on medirex.sk.

| check | pass | partial | fail | error |
| --- | --- | --- | --- | --- |
| Author shown as a card | 117 | 0 | 2 | 0 |
| Products linked, max 3, on sale | 112 | 5 | 2 | 0 |
| Newsletter link present | 119 | 0 | 0 | 0 |
| At least 1 related article | 118 | 0 | 1 | 0 |
| Main heading H1 present | 0 | 0 | 119 | 0 |
| Title matches content | 116 | 0 | 3 | 0 |
| URL clear and short | 119 | 0 | 0 | 0 |
| All images load | 0 | 0 | 119 | 0 |
| Photos have caption and source | 110 | 6 | 3 | 0 |
| All links return 200 | 115 | 0 | 3 | 1 |

Main heading H1 present
| url | verdict | detail |
| --- | --- | --- |
| all 119 | fail | no H1 element on the article template |

All links return 200
| url | verdict | detail |
| --- | --- | --- |
| /blog/article-x | fail | 2 links return 404 |
| /blog/article-y | error | page timed out |

Site-wide
| finding | affected | scope or cause |
| --- | --- | --- |
| No H1 heading | 119 of 119 | article template |
| One image fails to load | 119 of 119 | shared template image |
```
