# Web Audit

Audit obsahu a SEO webu cez headless prehliadač. Napíšte bežnými slovami, dostanete prehľad pass/fail.

## Požiadavky
- Node.js 18 alebo novší. Nainštalujte cez `brew install node`.

## Inštalácia - aplikácia ChatGPT
1. Otvorte `Settings`, potom `Plugins`.
2. Pridajte marketplace, zadajte `Medirex-Group/web-audit-plugin`, potvrďte.
3. Nájdite `web-audit` v zozname, zvoľte `Install`.
4. Spustite nový chat.

## Inštalácia - aplikácia Claude Code
1. V záložke `Code` zvoľte tlačidlo `+`, potom `Add plugins`.
2. Pridajte marketplace, zadajte `Medirex-Group/web-audit-plugin`, potvrďte.
3. Nájdite `web-audit`, zvoľte `Install`, vyberte rozsah `User`.
4. Spustite nový chat.

## Inštalácia - Claude Code CLI
Spustite v termináli, potom otvorte novú reláciu.
```sh
claude plugin marketplace add Medirex-Group/web-audit-plugin
claude plugin install web-audit@web-audits --scope user
```

## Použitie
Napíšte `@web-audit` a povedzte, čo skontrolovať.
- `@web-audit skontroluj, či má každý článok blogu na medirex.sk autora a aspoň jeden súvisiaci článok`
- `@web-audit sprav SEO audit na medirex.sk/blog`

Agent sa spýta, len ak je niečo nejasné, ukáže rozsah a kontroly na potvrdenie, potom spustí a vráti prehľad.

## Uloženie výsledkov do Google Sheetu
Pred prvým uložením raz pošlite v chate správu so súkromnými údajmi od správcu. Postup je rovnaký v aplikácii ChatGPT, aplikácii Claude Code aj v Claude Code CLI.
```text
@web-audit nastav Google Sheet - URL <URL od správcu> - kľúč <kľúč od správcu>
```

Agent potom ponúkne uloženie po každom prehľade. Môžete oň požiadať aj vopred, napríklad `@web-audit sprav SEO audit na medirex.sk/blog a ulož to do sheetu`. Každé uloženie pridá novú záložku.
