# Web Audit

Audit obsahu a SEO webu cez headless prehliadač. Napíšte bežnými slovami, dostanete prehľad pass/fail.

## Požiadavky
- Node.js 18 alebo novší. Nainštalujte cez `brew install node`.

## Inštalácia - aplikácia ChatGPT
1. Otvorte `Settings`, potom `Plugins`.
2. Pridajte marketplace, zadajte `<owner>/<repo>`, potvrďte.
3. Nájdite `web-audit` v zozname, zvoľte `Install`.
4. Spustite nový chat.

## Inštalácia - aplikácia Claude Code
1. V záložke `Code` zvoľte tlačidlo `+`, potom `Add plugins`.
2. Pridajte marketplace, zadajte `<owner>/<repo>`, potvrďte.
3. Nájdite `web-audit`, zvoľte `Install`, vyberte rozsah `User`.
4. Spustite nový chat.

## Inštalácia - Claude Code CLI
Spustite v termináli, potom otvorte novú reláciu.
```sh
claude plugin marketplace add <owner>/<repo>
claude plugin install web-audit@web-audits --scope user
```

## Použitie
Napíšte `@web-audit` a povedzte, čo skontrolovať.
- `@web-audit skontroluj, či má každý článok blogu na medirex.sk autora a aspoň jeden súvisiaci článok`
- `@web-audit sprav SEO audit na medirex.sk/blog`

Agent sa spýta, len ak je niečo nejasné, ukáže rozsah a kontroly na potvrdenie, potom spustí a vráti prehľad.

## Uloženie výsledkov do Google Sheetu
Agent ponúkne uloženie po každom prehľade, takže ho môžete prijať vtedy namiesto žiadania vopred.

Na každom počítači, ktorý odosiela, pridajte dva riadky do `~/.zshenv`.
```sh
export WEB_AUDIT_SHEET_URL="URL web aplikácie"
export WEB_AUDIT_SHEET_KEY="rovnaký kľúč"
```
Potom požiadajte, napríklad `@web-audit sprav SEO audit na medirex.sk/blog a ulož to do sheetu`. Každý beh pridá novú záložku.
