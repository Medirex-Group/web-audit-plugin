# Web Audit

Audit obsahu a SEO webu. Napíšte bežnými slovami, čo skontrolovať, a dostanete prehľad.

## Požiadavky
Node.js a Google Chrome. Ak ich už máte, tento krok preskočte. Chrome sa na konci raz otvorí, potom ho môžete zavrieť.

**Mac**
```sh
brew install node
brew install --cask google-chrome
open -a "Google Chrome"
```

**Windows**
```powershell
winget install OpenJS.NodeJS.LTS
winget install Google.Chrome
Start-Process chrome
```

## Inštalácia pluginu

**Aplikácia ChatGPT**
1. Otvorte `Settings`, potom `Plugins`.
2. Pridajte marketplace, zadajte `Medirex-Group/web-audit-plugin`, potvrďte.
3. Nájdite `web-audit` v zozname, zvoľte `Install`.
4. Spustite nový chat.

**Aplikácia Claude Code**
1. V záložke `Code` zvoľte tlačidlo `+`, potom `Add plugins`.
2. Pridajte marketplace, zadajte `Medirex-Group/web-audit-plugin`, potvrďte.
3. Nájdite `web-audit`, zvoľte `Install`, vyberte rozsah `User`.
4. Spustite nový chat.

**Claude Code CLI**
```sh
claude plugin marketplace add Medirex-Group/web-audit-plugin
claude plugin install web-audit@web-audits --scope user
```

## Použitie
Začnite správu `@web-audit`, v Claude Code `/web-audit:web-audit`, a povedzte, čo skontrolovať.
- `@web-audit skontroluj, či má každý článok blogu na medirex.sk autora`
- `@web-audit sprav SEO audit na medirex.sk/blog`

## Ukladanie do Google Sheetu
Správca vám pošle URL a kľúč. Raz ich pošlite v novom chate.
```text
@web-audit nastav Google Sheet - URL <URL od správcu> - kľúč <kľúč od správcu>
```

Agent potom ponúkne uloženie po každom prehľade. Každé uloženie pridá novú záložku.
