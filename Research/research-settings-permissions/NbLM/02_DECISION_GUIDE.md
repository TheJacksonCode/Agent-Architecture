---
title: Claude Code Settings + Permissions - Decision Guide
campaign: settings-permissions-2026
nblm_role: decision_guide
target_audience: dev_in_middle_of_work
word_target: 2000-3000
source: SYNTHESIS.md (Part 6 + Appendix A + Appendix C)
date: 2026-04-17
---

# Claude Code Settings + Permissions - Przewodnik decyzyjny

Ten dokument jest pomyslany jako pierwszy kontakt dla deva, ktory wlasnie jest w srodku pracy i musi podjac konkretna decyzje: gdzie wpisac regule, czy uzyc deny czy ask, czy zmienic model przez CLI czy settings. Kazda sekcja konczy sie jedna regula operacyjna i wskazaniem zrodla w SYNTHESIS, wiec ten przewodnik nie zastapuje, ale uzupelnia referencyjny deep dive.

## 1. Decision Tree: gdzie umiescic regule?

Zasada nadrzedna z SYNTHESIS Part 1.7: **user i project sluza wygodzie, managed sluzy enforcement**. Wybor warstwy zalezy od dwoch pytan: jak dlugo regula ma zyc i kto ma prawo ja override.

### 1.1 Drzewo decyzyjne 5-step (Managed / Project / User / Local / CLI)

Krok 1. Czy regula musi byc niepodatna na override przez user, nawet z `--dangerously-skip-permissions`? Jesli TAK -> **Managed** (`/Library/Application Support/ClaudeCode/managed-settings.json` na macOS, `/etc/claude-code/managed-settings.json` na Linux, `C:\Program Files\ClaudeCode\managed-settings.json` na Windows, per SYNTHESIS Part 1.4). Deployowane przez MDM albo wpisane rootem na maszynie.

Krok 2. Czy regula dotyczy calego zespolu i powinna byc w git? Jesli TAK -> **Project shared** (`.claude/settings.json`, committed). Ograniczenie: pola `autoMode`, `autoMemoryDirectory`, `skipDangerousModePermissionPrompt`, `apiKeyHelper` sa IGNOROWANE z project settings jako anti-TOCTOU (SYNTHESIS Part 2.9, R1.C26-29). Secrets nigdy w project settings.

Krok 3. Czy regula dotyczy tylko mnie i tylko tego projektu? Jesli TAK -> **Project local** (`.claude/settings.local.json`, gitignored). To tutaj laduja "Yes don't ask again" zapisy. Wazne: gitignored jest CONVENTION, nie enforcement - malicious PR moze usunac wpis z gitignore (SYNTHESIS Part 6.8 Scenario 2).

Krok 4. Czy regula dotyczy mnie ale wszystkich projektow? Jesli TAK -> **User** (`~/.claude/settings.json`). Minimalistyczny allow-list (Bash(ls *), Bash(git status)), defaults model, theme.

Krok 5. Regula dotyczy jednego runa, testuje cos jednorazowo -> **CLI flag** (`--model`, `--permission-mode`, `--allowedTools`, `--add-dir`). Zero persystencji.

Regula operacyjna: zawsze wybieraj najnizsza warstwe dajaca pozadany enforcement. Piszac deny dla security-critical rule, umieszczaj w managed; piszac allow dla wygody workflow, umieszczaj w user lub local.

### 1.2 Scenariusze: "Chce ograniczyc rm -rf" -> gdzie?

Jesli piszesz dla siebie na jednej maszynie: User settings deny. Jesli dla zespolu (wspolne repo): Project settings deny, ale PAMIETAJ o bugu #17017 - project deny NIE inherituje do user scope jako concat, to REPLACE (SYNTHESIS Part 1.5 F3). Jesli dla calego fleet (>10 deweloperow, security wymog): Managed tier deny + `allowManagedPermissionRulesOnly: true` co eliminuje cala niepewnosc merge semantic (SYNTHESIS Part 6.9). Dla absolutnego enforcement: plus sandbox filesystem deny, bo samo `Bash(rm -rf *)` deny nie blokuje `node -e "require('fs').rmSync(...)"` (SYNTHESIS Part 3.7 Read/Bash gap analogia).

### 1.3 Scenariusze: "Chce dodac MCP server dla zespolu" -> gdzie?

Plik `.mcp.json` w korzeniu projektu (osobny od settings.json) + `enabledMcpjsonServers: ["server-name"]` w `.claude/settings.json`. NIE uzywaj `enableAllProjectMcpServers: true` - to jest AP6 w SYNTHESIS Part 6.10 i bylo vectorem CVE-2025-59536. Dla enterprise: managed `allowedMcpServers: [{"serverName": "approved"}]` + `allowManagedMcpServersOnly: true` (SYNTHESIS Part 2.7). Uwaga: server-managed tier NIE dystrybuuje MCP configs (SYNTHESIS Part 2.7, R1.C31) - trzeba osobno deployowac `.mcp.json` przez MDM.

### 1.4 Scenariusze: "Chce tymczasowo zmienic model" -> gdzie?

Jeden run: `claude --model claude-opus-4-7`. Jedna sesja shella: `export ANTHROPIC_MODEL=claude-opus-4-7`. Stala preferencja per projekt: `.claude/settings.local.json` -> `"model": "claude-opus-4-7"`. Stala preferencja globalna: `~/.claude/settings.json`. Enterprise ograniczenie listy: Managed `availableModels: ["claude-sonnet-4-5", "claude-haiku-4-5"]` co ogranicza /model UI, --model CLI, Config tool, ANTHROPIC_MODEL env (SYNTHESIS Part 2.2).

Precedence chain per SYNTHESIS Part 2.2: Managed `availableModels` > CLI `--model` > `ANTHROPIC_MODEL` env > `settings.model`. Jesli managed ogranicza liste, CLI sproboje i dostanie error jesli poza lista.

## 2. Decision Tree: permissions allow vs deny vs ask

Ta czesc jest krytyczna bo dev.to blogpost powszechnie cytowany w community zawiera mit o "allow cancels ask" ktory jest niezgodny z docs (SYNTHESIS Part 3, CRITIC C4).

### 2.1 Priority recap: deny > ask > allow, first match wins

Silnik permission sprawdza per tool call w tej kolejnosci (SYNTHESIS Appendix A.4): (1) deny list - czy match? TAK -> BLOCK natychmiast, (2) ask list - czy match? TAK -> prompt user, (3) allow list - czy match? TAK -> execute bez promptu, (4) fallback do `defaultMode` (domyslnie ask). First-match-wins w kazdej liscie; deny > ask > allow niezaleznie od kolejnosci w pliku.

### 2.2 Kiedy deny, kiedy ask, kiedy allow

Deny dla: destructive operations (rm -rf, force push, dd, mkfs), secrets (.env, ~/.ssh, cloud credentials), privilege escalation (sudo), curl|sh patterns. Ask dla: operations wymagajace decyzji kontekstowej (npm install nowego pakietu, git push do remote), ale nie zawsze destructive. Allow dla: read-only observations (git status, ls, cat, grep), automated workflows ktorym ufasz (npm test, npx prettier --write), tools built-in Claude ktore nie robia nic destructive (Read, Glob, Grep).

Praktyczna heurystyka: jesli user nie zalapie sie i to jest nieodwracalne -> deny. Jesli user powinien swiadomie zaakceptowac -> ask. Jesli to po prostu szum w interakcji -> allow.

### 2.3 Dev.to Trap "allow cancels ask" - obalone docs-rozstrzygnieciem

Dev.to blogpost (R3.C17 w SYNTHESIS) twierdzil ze broad allow anuluje explicit ask rule. Docs sa tutaj jednoznaczne: ask ma priorytet nad allow w evaluation order (SYNTHESIS Part 3.2). CRITIC C4 rozstrzygniecie: **trzymac sie docs, dev.to artykul byl blednie sformulowany**. Gap G1 wymaga empirycznej weryfikacji jako follow-up, ale do czasu confirmation: ufac docs. Jesli widzisz objawy "ask jest pomijany": sprawdz czy nie trafilo do deny przez bug #17017 replace, sprawdz precedence `/status`.

### 2.4 Silent ask cancel via broad allow - jak tego uniknac

Nawet jesli docs mowia ask > allow, szeroki allow moze funkcjonalnie obejsc ask, jesli ask jest bardziej specyficzny ale allow matchuje wczesniej przez pierwszy tok. Pattern: nie pisz `Bash(*)` w allow nigdy (AP1 w SYNTHESIS Part 6.10). Enumeruj prefixy: `Bash(npm run test:*)`, `Bash(git status)`, `Bash(git diff:*)`. Pattern matching zaczyna od pierwszego tokenu - `Bash(git:*)` nie matchuje `git add file && git commit` (bug #18160 w SYNTHESIS Part 7.9, first-token flaw HN 47516808).

## 3. Decision Tree: settings.json vs env var vs CLI flag

Trzy kanaly konfiguracji, trzy rozne semantyki persystencji i audytowalnosci.

### 3.1 Kryterium 1: persystencja (stala vs sesja vs run)

Stala, cross-session, cross-machine dla usera -> settings.json (user tier). Stala per projekt dla zespolu -> settings.json (project tier). Na czas jednej sesji shella -> env var (`export X=Y; claude ...`). Na jeden run -> CLI flag. Przyklad: chce mierzyc telemetrie tylko w tym jednym debugowaniu -> `CLAUDE_CODE_ENABLE_TELEMETRY=1 claude ...`. Chce telemetria zawsze wlaczona dla mojego uzycia -> user settings env block.

### 3.2 Kryterium 2: precedence (co nadpisze co)

SYNTHESIS Part 5 chain: Managed settings > CLI flags > env vars > settings (user/project/local). Dla model: Managed `availableModels` > CLI `--model` > `ANTHROPIC_MODEL` env > settings.model. Dla permission mode: CLI `--permission-mode` > settings.defaultMode. Dla dodatkowych katalogow: CLI `--add-dir` + settings additionalDirectories (concat+dedup, nie override).

### 3.3 Kryterium 3: audytowalnosc (version control, managed deploy)

Settings.json moze byc wersjonowany w gicie (project tier) albo deployowany centralnie (managed). Env var to ephemeral per proces, brak auditu chyba ze wpiszesz do systemd unit / Docker compose. CLI flag jest w history shella, potencjalnie traci sie. Dla enterprise: wszystko security-critical powinno isc przez managed settings z pelnym deployment trail (SYNTHESIS Part 4).

### 3.4 Konkretna tabela: model, permission-mode, add-dir, API key

| Scenariusz | settings.json | env var | CLI flag |
|---|---|---|---|
| Default model dla mnie | user settings `model` | ANTHROPIC_MODEL w .zshrc | `--model` per run |
| Model dla tego repo | project settings `model` | - | - |
| Plan mode dla sesji | settings `defaultMode: "plan"` | - | `--permission-mode plan` |
| Dodatkowy katalog | `additionalDirectories` | - | `--add-dir` |
| API key | `apiKeyHelper` (managed/user only) | `ANTHROPIC_API_KEY` | - |
| Debug config merge | - | `CLAUDE_CODE_DEBUG_CONFIG=1` | - |
| Subprocess env scrub | env block w managed | `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1` | - |

## 4. Security checklist (settings.json parsed before trust!)

Zasada F1 z SYNTHESIS Part 1.3: **`.claude/settings.json` to wykonywalny kod parsowany PRZED trust dialogiem**. Hooks SessionStart, env, apiKeyHelper dzialaja zanim user zobaczy prompt "trust this directory?". CVE-2025-59536 eksploatowal dokladnie ten pattern (curl|bash w hooku) w zaklonowanym repo.

### 4.1 Przed sklonowaniem nieznanego repo

Krok 1: klonuj repo ale NIE uruchamiaj `claude` w tym folderze od razu. Krok 2: `cat .claude/settings.json .claude/settings.local.json .mcp.json CLAUDE.md 2>/dev/null` aby zobaczyc zawartosc. Krok 3: sprawdz `hooks`, `env`, `apiKeyHelper`, `enableAllProjectMcpServers` pod katem suspicious wartosci. Krok 4: dopiero wtedy uruchom `claude` (SYNTHESIS Part 6.2).

### 4.2 12-item hardening checklist dla enterprise managed

Pelna lista w SYNTHESIS Part 6.9. Krotko: (1) pin minimumVersion 2.1.53+, (2) forceLoginOrgUUID, (3) availableModels whitelist, (4) disableBypassPermissionsMode: "disable", (5) secret denylist (.env, .ssh, cloud creds), (6) sandbox enabled + failIfUnavailable + allowUnsandboxedCommands=false, (7) allowManagedPermissionRulesOnly, (8) allowManagedHooksOnly, (9) allowManagedMcpServersOnly, (10) forceRemoteSettingsRefresh, (11) strictKnownMarketplaces: [], (12) CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1 + CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1.

### 4.3 CI/CD specific: env scrub + minimal allow + sandbox

W CI `claude -p "..."` nie ma trust dialogu - bug w Bash matcherze = unauthenticated RCE z dostepem do long-lived cloud credentials (SYNTHESIS Part 6.8 Scenario 3). Minimalizacja: (a) CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1 zawsze, (b) permissions.allow ograniczone do dokladnie potrzebnych komend, (c) sandbox enabled w runnerze, (d) OIDC short-lived tokens zamiast persistent API keys, (e) managed settings w CI image.

### 4.4 Secrets: deny na Claude tools NIE wystarczy (Bash subprocess gap)

Kluczowy gap z SYNTHESIS Part 3.7: `Read(./.env)` deny blokuje Claude's Read tool, ale Claude moze wywolac `Bash(cat .env)` jesli cat jest allowed - subprocess jest poza scope'em permission system. Rozwiazanie: dodaj `Bash(cat .env*)`, `Bash(less .env*)`, `Bash(grep * .env*)` do deny, albo - lepiej - wlacz sandbox.filesystem.denyRead ktore blokuje na poziomie OS dla wszystkich procesow.

## 5. Anti-patterns quick-reference - top 10 "NIGDY nie rob"

Wybor top 10 z 18 anti-patternow w SYNTHESIS Part 6.10. Skupiam sie na tych ktore najczesciej spotykam w community configs (R7).

### 5.1 AP1: allow: ["Bash(*)"] bez enumeracji prefixow

Najszerszy allow otwiera wszystko co Bash moze zrobic. Zastep enumeracja: `Bash(npm run test:*)`, `Bash(git status)`, `Bash(git diff:*)`. R6.C16 w SYNTHESIS.

### 5.2 AP2: enableAllProjectMcpServers: true (supply-chain RCE vector)

CVE-2025-59536 uzyl tego pola. `.mcp.json` w zaklonowanym repo moze instalowac dowolny MCP server przez npx -> arbitrary code execution z full developer privileges. Zastap: `enabledMcpjsonServers: ["dokladnie-jeden"]` + `enableAllProjectMcpServers: false`.

### 5.3 AP3: Brak disableBypassPermissionsMode w managed

Bez tej flagi user moze zawsze uruchomic `claude --dangerously-skip-permissions` i ominac calosc polityki. Managed setting `"disableBypassPermissionsMode": "disable"` rejects flag at startup (SYNTHESIS Part 2.3, R1.C35).

### 5.4 AP4: Read(./.env) deny bez sandbox.filesystem.denyRead

Juz wyjasnione w 4.4 powyzej - samo Read deny nie wystarcza, subprocess Bash (cat, less, grep) obejdzie. Sandbox enforcement na poziomie OS jest konieczny.

### 5.5 AP5: WebFetch deny z broad Bash allow (egress mirage)

Jesli blokujesz WebFetch ale pozwalasz na Bash(curl *), Bash(wget *), Bash(nc *) - nie zablokowales egress. Fix: sandbox.network.allowedDomains allowlist + deny Bash network tools explicit. R6.C29 w SYNTHESIS.

### 5.6 AP6: --dangerously-skip-permissions w CI bez env scrub

Podwojne zagrozenie: brak trust dialogu w non-interactive + env nieochronione = credentiale leakuja przez hooki i subprocesses. W CI zawsze: CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1 + managed disableBypassPermissionsMode (SYNTHESIS Part 6.8 Scenario 3).

### 5.7 AP7: settings.local.json nie w .gitignore w team repo

Convention, nie enforcement (SYNTHESIS Part 2.11). Malicious PR: usun entry, dodaj `permissions.allow: ["Bash(*)"]` + hook, 4 linijki diff, reviewer przeocza. Defense: CI check blokujacy gitignore modification dla `.claude/settings.local.json` + pre-commit hook.

### 5.8 AP8: Mieszanie kanalow managed oczekujac merge (F2 violation)

Admini czesto wrzucaja polisy w server + MDM + file "dla defense-in-depth". W managed tier FIRST SOURCE WINS (SYNTHESIS Part 1.4 F2) - jesli server-managed dostarcza cokolwiek, MDM i plik sa calkowicie IGNOROWANE. Wybierz JEDEN kanal per org.

### 5.9 AP9: apiKeyHelper user-writable (zamiast root-owned)

apiKeyHelper points to shell script. Jesli user moze zapisac do tego pliku, malicious process moze wholesale replace skrypt z key-exfiltrator. Fix: root-owned, mode 0755, managed-pinned path (SYNTHESIS Part 6.8 Scenario 4).

### 5.10 AP10: Brak pin minimumVersion w managed

Bez minimumVersion stary binarka na maszynie pracuje z latami CVE. Managed `"minimumVersion": "2.1.53"` wymusza update przed uruchomieniem (SYNTHESIS Part 6.7, R6.C7). 2.1.53 to najnizsza bezpieczna wersja patching wiekszosc 13 CVE.

## 6. Troubleshooting: objaw -> przyczyna -> fix

Dziesiec najczestszych objawow z SYNTHESIS i community reports.

### 6.1 "Deny rule jest ignorowany" - #17017 array replace bug

Objaw: deny wpisany w user settings nie dziala kiedy projekt ma wlasny allow. Przyczyna: bug #17017 (OPEN, 2026-01-09) - permissions.allow/deny arrays REPLACE zamiast concat+dedup cross-scope. Project allow nadpisal user deny. Fix (tymczasowy do patcha): duplikuj deny rules w KAZDEJ warstwie gdzie relevant, albo uzyj managed `allowManagedPermissionRulesOnly: true` co eliminuje niepewnosc (SYNTHESIS Part 1.5 F3).

### 6.2 "Managed settings nie dzialaja" - sprawdzic /status

Objaw: admin deployowal managed-settings.json ale user nie widzi efektu. Przyczyna: inny kanal managed (server-pushed, MDM, HKCU) wygral first-source-wins. Fix: `/status` w interactive session pokazuje origin label per field ("Enterprise managed settings (remote)", "(plist)", "(HKLM)", "(file)"). Admin troubleshooting zaczyna sie od tej komendy, nie od cat managed-settings.json (SYNTHESIS Part 1.4, R4.C27).

### 6.3 "Silent permission drift" - audyt settings.local.json (ccperm)

Objaw: po kilku tygodniach uzycia dev zauwaza ze Claude zrobil cos czego wczesniej by nie zrobil bez promptu. Przyczyna: "Yes don't ask again" akumuluje permanent allow rules w settings.local.json, invisible over time (R7.C19 Klement Gunndu). Fix: periodyczny audyt settings.local.json + community tool `ccperm` do review. Enterprise: managed allowManagedPermissionRulesOnly eliminuje ten wektor calkowicie.

### 6.4 "Bash command nie matchuje rule" - compound commands + word boundary

Objaw: `Bash(git:*)` allow nie matchuje `git add file && git commit`. Przyczyna: first-token flaw (HN 47516808, issue #36637, SYNTHESIS Part 7.9). Compound commands przez && i || evaluatuja tylko pierwszy token. Fix: enumeruj jawnie rozszczepione polecenia, albo uzyj hookow PreToolUse dla semantic validation.

### 6.5 "Yes don't ask again zapisal invalid entry" - issue #16301

Objaw: po zaakceptowaniu "yes don't ask again" nastepne wywolania tej samej komendy nadal pytaja. Przyczyna: issue #16301 zapisuje czasem regex-style patterns ktore nie sa valid format permission rule; silent skip bez notyfikacji. Fix: manualny review settings.local.json, poprawic entry do canonical grammar (Tool lub Tool(specifier)) (SYNTHESIS Part 2.11).

### 6.6 "Model wybrany nie ten co oczekiwany" - precedence --model > env > settings

Objaw: user ustawil `"model": "claude-opus-4-7"` w settings ale sesja uzywa innego. Przyczyna: wyzsza warstwa precedence chain nadpisuje. Fix: sprawdz `ANTHROPIC_MODEL` env var, sprawdz `--model` flag, sprawdz managed `availableModels`. Precedence: Managed availableModels > CLI --model > ANTHROPIC_MODEL env > settings.model (SYNTHESIS Part 2.2).

### 6.7 "Symlink ominal deny" - CVE-2026-25724 patched w 2.1.7

Objaw: Read(./.env) deny ale Claude wciaz czytal plik przez symlink. Przyczyna: CVE-2026-25724 symlink bypass. Fix: upgrade do v2.1.7 lub nowszej (SYNTHESIS Part 6.3). Plus sandbox.filesystem.denyRead dla defense-in-depth.

### 6.8 "cat .env dziala mimo deny" - Read/Bash gap, potrzeba sandbox

Objaw: Read(./.env) deny dziala dla Claude's Read tool, ale Bash(cat .env) przechodzi. Przyczyna: permission system dziala na Claude tools, nie na subprocesses wywolanych przez Bash allowed (SYNTHESIS Part 3.7). Fix: (a) dodaj `Bash(cat .env*)`, `Bash(less .env*)`, `Bash(grep * .env*)`, `Bash(head .env*)`, `Bash(tail .env*)` do deny, albo (b) lepiej: sandbox.filesystem.denyRead blokuje na OS level dla wszystkich procesow.

### 6.9 "Managed-settings.json ignorowany" - server-managed pierwszy wygrywa

Objaw: file-based managed-settings.json na maszynie ale cos innego dziala. Przyczyna: org ma server-managed z admin console, server wygrywa, file jest ignorowany (SYNTHESIS Part 1.4 F2). Fix: `/status` pokazuje "remote" source, wtedy wiadomo ze trzeba modyfikowac server-side config, nie lokalny plik.

### 6.10 "Windows managed nie dziala" - migracja z ProgramData do Program Files (v2.1.75)

Objaw: ADMX/HKCU policy deployment przestal dzialac po update. Przyczyna: `C:\ProgramData\ClaudeCode\` removed w v2.1.75, nowa lokalizacja `C:\Program Files\ClaudeCode\` (SYNTHESIS Part 2.10, R1.C7, R2.C11, R4.C3). Fix: migrate managed-settings.json do nowej sciezki, update ADMX templates, test na target maszynie.

## 7. CVE quick lookup table (13 zweryfikowane + 3 pending Phoenix)

SYNTHESIS Part 6.3 katalog. Ta tabela to kondensat dla szybkiego sprawdzenia czy twoja wersja jest patched.

### 7.1 Tabela: CVE-ID / CVSS / patched version / one-liner opis

| CVE | CVSS | Patched | Opis one-liner |
|---|---|---|---|
| CVE-2025-52882 | 8.8 | 1.0.24+ | WebSocket origin trust, devtools RCE |
| CVE-2025-53109 | 7.6 | 1.0.38+ | MCP parsing + allowedTools bypass chain |
| CVE-2025-53110 | 7.4 | 1.0.38+ | Path traversal w additionalDirectories |
| CVE-2025-55752 | 7.2 | 1.0.55+ | Hook command injection |
| CVE-2025-57381 | 6.8 | 1.0.65+ | Plist spoofing Jamf payload |
| CVE-2025-58444 | 8.1 | 1.0.78+ | MCP npx arbitrary exec |
| CVE-2025-59536 | 8.8 | 1.0.89+ | settings.json hook curl\|bash RCE |
| CVE-2025-65107 | 7.5 | 1.0.112+ | Permission evaluation bypass |
| CVE-2026-21852 | 7.8 | 2.0.15+ | ANTHROPIC_BASE_URL MITM key exfil |
| CVE-2026-21905 | 7.1 | 2.0.42+ | Prompt injection through CLAUDE.md |
| CVE-2026-23074 | 6.9 | 2.1.12+ | Compound command first-token bypass |
| CVE-2026-25724 | 7.3 | 2.1.7+ | Symlink bypass Read deny |
| CVE-2026-27893 | 8.2 | 2.1.53+ | Managed tier first-source-wins confusion exploit |

### 7.2 Najnizsza bezpieczna minimumVersion: 2.1.53

Pin w managed: `"minimumVersion": "2.1.53"`. Wszystko ponizej ma co najmniej jeden unpatched CVE z tej listy. Dla CI/CD specific zagrozen: rozwaz 2.1.75+ ktora zawiera Windows ProgramData -> Program Files migracje i dodatkowe hardening (SYNTHESIS Part 2.10).

### 7.3 Phoenix chain CVE-2026-35020/21/22 - awaiting public advisory

Three command-injection CVEs reported przez Phoenix Security, common root cause nie disclosed publicznie. Demonstruja full credential exfiltration z CI/CD w non-interactive mode. CRITIC FLAG: summary only w raporcie R6, brak publicznego advisory URL. Traktowac jako pending disclosure - jesli org jest w CI use case, apply CI-specific hardening (sekcja 4.3 + 5.6 powyzej) profilaktycznie do czasu publikacji pelnych detali (SYNTHESIS Part 6.12).

## 8. Open questions (z Appendix C SYNTHESIS)

Szesc gapow pozostalo po syntezie. Warto je znac jesli pracujesz w obszarze gdzie niepewnosc ma konsekwencje.

### 8.1 G1: Empirical repro "allow cancels ask"

Dev.to cytat vs docs stanowisko. Rozstrzygnieto w favor docs (ask > allow), ale brak publicznego empirical repro jako gwarancji. Follow-up: uruchomic test case z obydwoma rule i zlogowac behaviour na v2.1.75.

### 8.2 G2: apiKeyHelper per-request vs per-session

Docs nie precyzuja TTL behavior apiKeyHelper - czy skrypt wywolywany per API call (wiec krotkoterminowe tokeny sensowne) czy per session (wiec refresh logika wymaga osobnego mechanizmu). Follow-up: instrument skrypt i zmierzyc czestotliwosc wywolan (SYNTHESIS Appendix C.2).

### 8.3 G3: Model selection ordering CLI vs env vs setting

Udokumentowany chain Managed > CLI > env > settings, ale edge cases (np. CLI --model z wartoscia poza availableModels) nie opisane. Follow-up: matrix test na v2.1.75.

### 8.4 G4: disableAllHooks scope semantics

R2 interpretuje jako scope-aware, R1 i R6 nie rozstrzygaja. Czy flag w user settings wylacza managed hooks? Prawdopodobnie nie (managed zawsze wygrywa) ale brak explicit cytatu z docs. Follow-up: empirical test z managed hook + user disableAllHooks: true.

### 8.5 G5: Invalid JSON w managed tier behavior

Co sie dzieje gdy managed-settings.json ma syntax error - fallback do next managed source (MDM, HKCU)? Crash? Silent skip? Docs nie mowia. Follow-up: corrupt managed-settings.json i zobaczyc behavior + /status output.

### 8.6 G6: WebFetch domain wildcard support

Permissions WebFetch(domain:*) spec jest exact match w permission rule per R3.C10, ale sandbox.network.allowedDomains wspiera `*.example.com`. Dwa rozne matching engines dla pokrewnego problemu. Follow-up: dokumentacyjna prosba o unification.

### 8.7 Framing conflicts bez resolucji (trust managed vs sandbox mandatory)

Wyzszy-poziom framing conflict w CRITIC Appendix C.2: czy managed tier jest wystarczajacy dla enterprise enforcement, czy konieczny jest tez OS-level sandbox (bwrap/seatbelt)? Trail of Bits argumentuje "managed bez sandbox to trust boundary illusion" (R6.C28), Anthropic docs sugeruja managed jest wystarczajacy. Synthesa przyjmuje pozycje Trail of Bits jako bezpieczniejsza dla security-critical deployments, ale to framing, nie fact - zespoly moga zasadnie wybrac roznie w zaleznosci od threat modelu. Dokumentuje w MANIFEST jako otwarta decyzja architektoniczna.
