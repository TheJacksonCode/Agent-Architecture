# 02_DECISION_GUIDE - Claude Code MCP 2026

Kiedy uzywac MCP, a kiedy Skill, Command lub Hook. Decision tree + topologia.

---

## TL;DR - 5 sekund decyzji

- Potrzebujesz ZEWNETRZNEGO SYSTEMU (API, DB, cloud service, live data)? **MCP**.
- Potrzebujesz powtarzalnego PROMPTU z domain knowledge (review PR, napisz test, architektura dla X)? **Skill**.
- Potrzebujesz SKROTU (slash command) do gotowego zestawu instrukcji/actionow? **Command**.
- Potrzebujesz automatyki na EVENT (pre-tool, post-tool, session-start)? **Hook**.

W watpliwosci: zacznij od Skill. 80% potrzeb Claude Code to Skills. MCP wprowadzasz gdy musisz. (R5.C1, R5.C10)

---

## Decision Tree (pelny)

```
Czy potrzebujesz DANYCH Z ZEWNATRZ (API, DB, web) w real-time?
|
|-- TAK -> MCP server
|          |
|          Czy tylko lokalnie, jeden uzytkownik?
|          |-- TAK -> stdio transport
|          |-- NIE (multi-user, remote) -> Streamable HTTP + OAuth 2.1
|
|-- NIE -> Czy to POWTARZALNY PROMPT z expertise (jak myslec, jak pisac, jak audytowac)?
|          |
|          |-- TAK -> Skill
|          |         Skill = markdown z role + instrukcje + opcjonalnie toolset
|          |
|          |-- NIE -> Czy to SKROT do zestawu akcji/promptu?
|                     |
|                     |-- TAK -> Command (slash command)
|                     |
|                     |-- NIE -> Czy to AKCJA NA EVENT (przed/po tool, start/end sesji)?
|                                |
|                                |-- TAK -> Hook
|                                |
|                                |-- NIE -> Rozwaz zwykla instrukcje w CLAUDE.md
```

---

## Kryteria decyzji w tabelce

| Kryterium | MCP | Skill | Command | Hook |
|-----------|-----|-------|---------|------|
| Co to jest | Zewnetrzny serwer z tools/resources/prompts | Markdown z rola+ expertise +tools | Slash shortcut dla promptu | Event trigger shell cmd |
| Dziala gdzie | Kazdy klient MCP (Claude Code, Desktop, Cursor, Zed...) | Tylko Claude Code | Tylko Claude Code | Tylko Claude Code |
| Token cost upfront | Wysoki (tool defs w kontekscie) | Zero (laduje sie na wywolanie) | Zero | Zero |
| Token cost per use | Normal | Normal | Normal | Zero (hook nie ma API call) |
| Live data | TAK | NIE (static markdown) | NIE | NIE |
| Multi-user | TAK (HTTP transport) | NIE (lokalne markdown) | NIE | NIE |
| Typowa liczba | 3-5 aktywnych | 10-30 | 20-50 | 3-10 |
| Security surface | Duza (runtime code + network) | Mala (tylko prompt) | Zero | Srednia (shell exec) |
| Maintenance | Wysoki (infra, deps) | Niski (edit markdown) | Niski | Sredni |

(R5.C4, R5.C5, R5.C6, R5.C7)

---

## Kiedy MCP (konkretnie)

MCP jest wlasciwym wyborem gdy speklnione >=1 z:

1. **Live external data** - musisz zapytac API, DB, web w czasie sesji. Przyklady: GitHub issues, Sentry errors, Slack messages, Stripe charges, internal product DB. (R5.C8)

2. **Write operations do zewnetrznego systemu** - create issue, send email, update record, deploy. Skill nie moze wykonac sam HTTP call do API. (R5.C9)

3. **Cross-client reuse** - piszesz raz, chcesz uzywac w Claude Code, Cursor, Zed, Desktop. MCP dziala wszedzie. (R5.C11)

4. **Domain-specific tooling** - masz wlasny engineering stack (CI system, internal search, feature flags), ktore nie ma "general-purpose" odpowiednika. (R7.C14)

5. **Multi-user SaaS** - budujesz produkt gdzie klienci lacza swoje Claude z Twoim backendem. OAuth 2.1 + HTTP to must.

**Anti-wybor MCP:**
- Statyczny content (documentation, style guide, zasady kodowania) - to Skill / CLAUDE.md.
- Preferencje uzytkownika (model, formatowanie, language) - to config / Skill.
- One-off script - to Bash tool + Command.

---

## Kiedy Skill (konkretnie)

Skill jest wlasciwym wyborem gdy:

1. **Powtarzalna rola / ekspertyza** - "zachowaj sie jak senior Python dev / security auditor / product manager". Pakowalne w markdown z tools whitelist. (R5.C12)

2. **Domain knowledge bez live data** - "jak testujemy w naszym projekcie", "konwencje naming", "nasz style guide". Static knowledge, update raz na miesiac.

3. **Workflow z kilku krokow** - "gdy audit security: (1) skanuj deps, (2) sprawdz CVE, (3) lint config, (4) wygeneruj report". Skill wplata to w role prompt + tools: `Bash, Read, Grep`.

4. **Eksperymentujesz z promptami** - Skill to plik markdown, edytujesz i widzisz efekt od razu. MCP to kod, deploy, restart.

5. **Team reuse w Claude Code** - checkinujesz Skill do repo, kazdy w zespole ma ta sama expertize. (R5.C13)

**Anti-wybor Skill:**
- Potrzebujesz live API call - Skill nie moze, dodaj MCP.
- Multi-client (Cursor + Claude Code) - Skill jest Claude Code only.

---

## Kiedy Command (konkretnie)

Command jest wlasciwym wyborem gdy:

1. **Skrot do dlugiego promptu** - `/review-pr` zamiast pisac "przejrzyj PR, sprawdz testy, styl, security, wydaj verdict" kazdorazowo. (R5.C14)

2. **Parametryzowany shortcut** - `/write-test <funkcja>` laduje prompt template z substitucja parametru.

3. **Szybki onboarding** - nowy czlonek zespolu wpisuje `/` i widzi liste dostepnych skrotow. Natural discoverability.

4. **Command uruchamia Skill** - meta pattern: Command `/audit-security` w body woła Skill + podaje scope.

**Anti-wybor Command:**
- Skomplikowana logika z if/else - to Skill (ma "brain" w prompcie) albo bezposredni prompt.
- Trzeba live data - Command nie robi API calls, uzywaj MCP.

---

## Kiedy Hook (konkretnie)

Hook jest wlasciwym wyborem gdy:

1. **Automation na lifecycle event** - pre-tool-use (przed kazdym Bash), post-tool-use (log wynik), session-start (load context), session-end (archiwizacja). (R5.C15)

2. **Guard rail / safety** - blokada commits gdy pre-commit hook wykryje tajne. Pre-Bash hook sprawdza `rm -rf` i aborts.

3. **Integration z external system** - session-end hook wysyla summary do Slack. post-tool-use hook inkrementuje counter w Prometheus.

4. **Logging / audit** - kazde tool call -> append do structured log.

**Anti-wybor Hook:**
- Logika decyzyjna LLM-based (hook to zwykly shell) - to Skill.
- Reusable across projects - hook jest per-config, kopiuj recznie. Skill lepszy jesli reuse.

**Ryzyko bezpieczenstwa:** CVE-2025-59536 pokazal ze hook z malicious repo moze odpalic RCE. Zawsze review hooks. (R3.C1)

---

## Overlap zones (gdzie granica sie rozmywa)

**MCP vs Skill:**
Jesli Twoj "API" to tak naprawde set static instructions + whitelist toolow Claude Code, zrob Skill. MCP ma sens gdy cos realnie leci przez siec. (R5.C17)

**MCP resources vs Skill:**
Oba moga "dostarczyc context". Roznica: MCP resources = LIVE data (pull on demand), Skill = STATIC content w markdown. (R4.C10, R7.C15)

**Command vs Skill:**
Command moze byc 3-linijkowym skrotem do Skill. Skill moze byc 200-linijkowym prompt-engineering dzielem. Command = fast-path. Skill = depth.

**Hook vs Command:**
Hook trigguje automatycznie. Command wywolujesz recznie slash. Jesli chcesz "pamietaj zeby to zrobic po X" -> Hook.

---

## Typowa topologia projektu 2026

Wedlug adopted patterns (R7.C17):

```
Project/
  CLAUDE.md                     # 1 plik, projekt rules
  .claude/
    settings.json               # MCP servers + hooks config
    skills/
      security-audit.md         # 5-10 skills
      test-writer.md
      style-reviewer.md
      ...
    commands/
      review-pr.md              # 10-20 commands
      deploy-staging.md
      ...
    hooks/
      pre-commit.sh             # 3-5 hooks
      session-start.sh
      ...
```

**Token budget typowy:**
- CLAUDE.md: ~500 tokens
- 2-3 MCP servers active: ~15k tokens tool defs
- Skills laduja sie on-demand (zero upfront)
- Commands same (zero upfront)
- Hooks zero token cost (shell level)

Total upfront: ~15-20k z 200k budget. 90% zostaje na prace. (R6.C19)

**Counter-pattern: "install everything":**
- 10 MCP servers = 50k+ upfront
- 0-3 tools actually used per sesja
- 80% context zjedzone na capabilities nigdy nie uzyte

---

## Decyzja 30-sekundowa (flowchart prosty)

```
"Chce dodac capability X"
  |
  v
Czy X wymaga HTTP calls / DB query / external state?
  |
  |-- TAK -> MCP
  |
  |-- NIE -> Czy to KROKI ktore robie wielokrotnie?
              |
              |-- TAK (z prompt expertise) -> Skill
              |-- TAK (bez expertise, czysty skrot) -> Command
              |-- NIE (event-driven) -> Hook
```

---

## Decyzja: Ile serverow MCP miec?

**Rule of thumb:** 2-5 active servers. (R6.C20)

**Zalecany baseline:**
1. Filesystem (lokalny, tanio, potrzebne)
2. GitHub lub podobny VCS jesli pracujesz w repo
3. Playwright jesli robisz web-related work

**Dodawaj gdy konkretnie potrzebujesz:**
- Slack, Gmail, Calendar - tylko gdy Claude ma realnie wysylac/czytac messages
- Sentry, Grafana - tylko gdy aktywnie diagnozujesz production
- Postgres/Snowflake - tylko gdy live DB query potrzebne

**Gdy masz wiecej niz 5-7 aktywnych:**
- Rozwaz `/mcp disable <name>` dla rzadziej uzywanych
- Rozwaz aggregator (Rube, docker/mcp-gateway) dla kolekcji tools
- Enable Tool Search Tool (Q1 2026, -46.9% context)

---

## Cost comparison (approx tokens)

| Strategia | Upfront token cost | Flexibility |
|-----------|---------------------|-------------|
| All Skills, 0 MCP | 0 upfront | Brak live data |
| 2 MCP + 10 Skills + 15 Commands | ~10k | Sweet spot |
| 5 MCP + 20 Skills + 30 Commands | ~25k | Power user |
| 10 MCP + wszystko z awesome-mcp | 50-70k | Anti-pattern, context pressure |

(R6.C2, R6.C19)

---

## Cheat sheet (drukuj i przypnij)

**Pytaj siebie w kolejnosci:**

1. Czy to live data / external mutation? -> MCP
2. Czy to powtarzalna rola/wiedza? -> Skill
3. Czy to skrot do promptu? -> Command
4. Czy to akcja na event? -> Hook

**Czerwone flagi MCP:**
- "dodam 10 MCP z awesome list" - zle, context explode
- "MCP dla mojego style guide" - zle, to Skill
- "MCP dla user preferences" - zle, to config

**Czerwone flagi Skill:**
- "Skill zeby wyslac email" - zle, musi byc MCP
- "Skill zeby sprawdzic live status CI" - zle, to MCP
- "Skill z 500 linii intro, 2 linie actual task" - bloated, tnie

**Czerwone flagi Command:**
- Command z `if/else` logic w body - Skill lepszy
- Command ktory "musi cos pobrac z netu" - brak, dodaj MCP

**Czerwone flagi Hook:**
- Hook z wlasnym LLM-like reasoning - to Skill
- Hook z unchecked `rm -rf` - security
- Hook ktory nie rejestruje bledow - debugowanie piekielne

---

## Dalej

- Chcesz zobaczyc jak to wyglada w praktyce? -> `01_PATTERNS.md`
- Chcesz fundamentals (protocol details)? -> `00_FUNDAMENTALS.md`
- Pelna synteza z trust ratings? -> `../plans/SYNTHESIS.md`

---

*Zrodlo: E5_mcp_vs_skill_vs_command.json + SYNTHESIS Part 5. Citation R<N>.C<M>. Data: 2026-04-17.*
