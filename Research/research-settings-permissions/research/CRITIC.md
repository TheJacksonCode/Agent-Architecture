---
title: "CRITIC: Settings + Permissions 2026 - Cross-Report Validation"
phase: 3
agent: Research Critic
model: claude-opus-4-7
date: 2026-04-17
campaign: settings-permissions-2026
reports_reviewed: 7
status: FINAL
---

# CRITIC: Settings + Permissions 2026

## 0. Role, Scope, Method

Rola: Research Critic, faza 3 kampanii "Claude Code Settings + Permissions 2026" (preset /deep-research-v2). Input to 7 raportow researcher-subagents:

- R1 Official Docs (650 linii, schema settings.json)
- R2 Precedence Semantics (621 linii, 5-warstwowy model)
- R3 Permissions Syntax (680 linii, gramatyka + edge cases)
- R4 Managed/Enterprise (1037 linii, MDM + deployment)
- R5 Env Vars + CLI (630 linii, 120+ env + 50+ flag)
- R6 Security + Antipatterns (395 linii, threat model + CVEs)
- R7 Community Patterns (793 linii, 5 archetypow + repos)

Metoda: zrodla rankowane oficjalne docs (HIGH) > otwarte issue GitHub z repro (HIGH-MED) > posty techniczne z kodem (MED) > HN z Q&A (MED-LOW) > Reddit bez linku / aggregator (LOW) > CVE z summary bez URL (FLAG). Anti-rubber-stamp: jesli 7x PASS bez konfliktow - krytyk zawiodl. Docelowo szukam sprzecznosci miedzy raportami i luk ktorych zadna z 7 rundek nie wypelnia.

---

## 1. Executive Summary

Siedem raportow dostarczylo lacznie ~4800 linii gestego materialu i w ~85% tworza spojny obraz. Architektura Claude Code 2026 to **piecio-warstwowa hierarchia** (Managed > CLI > Local > Project > User) nalozona na **trzy-fazowa gramatyke permissions** (deny > ask > allow) z drugorzednymi kanalami (env vars, hooks, sandbox) ktore moga addytywnie zaostrzac polityke, ale nie moga jej osłabic wzgledem warstwy Managed. Raporty sa zgodne co do tej szkieletowej tezy i co do kluczowych ryzyk: trust boundary confusion (settings.json parsowany **przed** dialogiem zaufania, czyli dziala jako kod nie metadata), managed tier "first source wins, no cross-tier merge", silent skip calej warstwy przy niesolidnym JSON, oraz asymetryczne zachowanie `deny` (zawsze mergowane) vs `allow` (w niektorych scenariuszach replace zamiast concat).

Wszystkie 7 raportow przechodzi z werdyktem PASS, ale trzy z zastrzezeniami. R3 zawiera claim spolecznosciowy ("allow cancels ask") z dev.to ktory jest w technicznej sprzecznosci z oficjalna dokumentacja priorytetu deny > ask > allow - R3 flaguje to wlasciwie, ale wymaga eksperymentalnego repro zanim trafi do SYNTHESIS jako fakt. R6 zawiera trzy CVE (Phoenix Security 2026-35020/21/22) z summary bez URL do advisory. R7 uzywa Reddit przez aggregatory (aitooldiscovery, morphllm) bo WebFetch zwraca bledy na reddit.com - dlatego wszystkie cytaty z r/ClaudeAI sa w raporcie znakowane LOW confidence.

Znalazlem 12 konfliktow cross-report, z ktorych 8 jest merytorycznych (niespojnosci semantyczne), a 4 to roznice ramowania (ten sam fakt, inne akcenty) - omowione w sekcji 3. Znalazlem 6 gapow wymagajacych delta research przed final SYNTHESIS - omowione w sekcji 4. Top 3 krytyczne ustalenia do skladu syntezy: (a) architectural thesis, ze settings.json jest kodem parsowanym przed trust dialog, nie konfiguracja, (b) managed tier jest "first source wins" nie merged blob, (c) bug array-merge #17017 jest otwarty i nieudokumentowany w docs. Szczegolowo w sekcji 5.

Dla Syntetyka (faza 4): zrobic z tych trzech ustalen naglowek syntezy, bo one definiuja rozroznienie miedzy **polityka zapisana** a **polityka egzekwowana** - to jest os na ktorej trzymaja sie wszystkie praktyczne zalecenia (od mandatory hooks po non-writable managed-settings.json). Drugorzedny akcent to asymetria merge (R2 conflict scenarios) i granica auto-mode classifier (R3 Section 7). Syntetyk NIE powinien promowac `bypassPermissions` jako operacyjnej opcji - R6 ustala, ze to sandbox-only-territory (AP7).

---

## 2. Per-Report Verdicts

### R1 Official Docs - PASS

Uzasadnienie: raport 1 dostarcza **schema reference** - pelna mape pol top-level settings.json z cytatami z docs.claude.com. Zrodlowosc czysta (wszystko HIGH, oficjalne docs + JSON schema URL). Windows v2.1.75 migration path udokumentowany wlasciwie. Gaps (10+) sa oznaczone eksplicitnie i przekazane dalej zamiast udawania pokrycia - to wzorcowe "wiem czego nie wiem".

Zastrzezenia: brak repro dla gapow (co jest OK dla researchera docs, ale faza 4 bedzie musiala albo dociagnac eksperymenty, albo zostawic "not empirically verified"). R1.gap o maxOutputTokens top-level vs ANTHROPIC_MODEL jest dobrze sformulowany ale niekomplementarny z R5 (R5 rozstrzyga czesc tych konfliktow explicite, patrz konflikt C3 ponizej).

Confidence pokrycia: 90% dla zakresu "co jest udokumentowane". Zakres "co jest niedokumentowane" - niedomagania.

### R2 Precedence Semantics - PASS

Uzasadnienie: centralna teza "deny at any level cannot be overridden" trzy-krotnie wzmocniona trzema cytatami z trzech miejsc docs. Table 3.1 merge semantics per type jest praca unikalna (nie da sie jej zassac z jednej strony docs). Issue #17017 (OPEN) i #17299 (closed dup) prawidlowo rankowane jako HIGH-MED dla zglaszanego bledu. Siedem scenariuszy konfliktu jest realistycznie skonstruowanych - nie sa to hipotetyczne konstrukcje, tylko wariacje bledow znanych z issue trackera.

Zastrzezenia: R2.C37 ("disableAllHooks scope-aware") jest zmianie tezie R1 - R1 sugeruje globalne wylaczenie hookow, R2 interpretuje jako scope-aware. Oba nie maja absolutnie jednoznacznego cytatu z docs, to jest konflikt interpretacyjny ktory rozstrzygam w sekcji 3 (konflikt C6). R2.C4 lista managed-only flag wymienia 7 pozycji, ale R4 enumeruje 11 - to nie jest blad R2, tylko nieuplny katalog; w syntezie powinno byc 11.

Confidence pokrycia: 85%. Glowne niedomogi to brak eksperymentalnej weryfikacji asymetrycznych merge scenariuszy oraz brak definitywnego rozstrzygniecia czy #17017 to bug czy nieudokumentowany feature.

### R3 Permissions Syntax - PASS (z zastrzezeniem community-claim)

Uzasadnienie: 14 enumerowanych edge cases z podzialem na udokumentowane vs community-raportowane. Bash wildcard mechanics, word-boundary rules, compound command 5-way split, process-wrapper stripping whitelist - to wszystko oparte o cytat z docs pkt po pkt. Four-prefix path convention (`//abs`, `~/home`, `/project-root`, `./cwd`) jest udokumentowana poprawnie. Six permission modes z protected paths list w bypass mode (`.git`, `.vscode`, `.idea`, `.husky`, czesci `.claude`, `.bashrc`) - dokladne z docs.

Zastrzezenia: R3 Section 8.2 scenario 3 zawiera claim z dev.to ("Trap 1: allow cancels ask") ktory semantycznie sugeruje ze allow WYGRYWA z ask - to jest w sprzecznosci z udokumentowana priorytetem `deny > ask > allow` (gdzie ask ma WYZSZY priorytet niz allow, czyli to ask powinno wygrywac). R3 wlasciwie flaguje ten klincz jako "community claim, needs empirical repro" ale w niektorych miejscach raportu jest on przywolywany bez flagi. Syntetyk MUSI trzymac sie docs (deny > ask > allow) i traktowac dev.to claim jako gap (delta research: empirical test kto faktycznie wygrywa).

Auto-mode Section 7 jest bardzo dobra - kryterium "classifier drops broad allows like Bash(*)" jest udokumentowane i ma wartosc operacyjna.

Confidence pokrycia: 85% (minus 5pp za niejednolite traktowanie dev.to claimu).

### R4 Managed/Enterprise - PASS

Uzasadnienie: najdluzszy raport (1037 linii) z tresciami ktore NIE sa na docs.claude.com - Jamf plist, Intune PowerShell, ADMX, GPO, Ansible templates. Wiekszosc jest oznakowana "R4-constructed example, not from official docs" co jest uczciwe. Managed-only 11-key matrix rozszerza R2 o 4 dodatkowe pola (channelsEnabled, pluginTrustMessage, strictKnownMarketplaces, allowedChannelPlugins) - to jest wartosc dodana R4. /status discovery output ("Enterprise managed settings (remote|plist|HKLM|HKCU|file)") ma konkretna wartosc dla admin troubleshootingu.

Zastrzezenia: sekcje Industry Profiles (HIPAA, PCI-DSS) sa explicitely disclaimed jako R4-constructed a nie oficjalne frameworki - to jest OK pod warunkiem ze Syntetyk nie przedstawi ich jako "zatwierdzone przez HHS". Sekcja apiKeyHelper z cache-TTL example nie ma cytatu z docs potwierdzajacego, ze helper jest invokowany per-request vs per-session - to jest gap (patrz sekcja 4 gap G2).

Confidence pokrycia: 80%. Niedomogi: brak weryfikacji Linux MDM (fleet tools typu Jumpcloud/Fleet), brak cytatu na exact behavior invalid JSON w managed tier (w user-tier jest silent skip per R2.C5, ale w managed - niepotwierdzone).

### R5 Env Vars + CLI - PASS

Uzasadnienie: katalog 120+ env vars z 15 kategoriami (ANTHROPIC_*, CLAUDE_CODE_*, OTEL_*, MCP, HTTP/proxy) i 50+ CLI flag. Precedence diagram z 7 warstw (env vars jako parallel channel obok scope chain) - to jest unikalny wklad R5, bo ani R1 ani R2 tego tak nie ukladaly. --debug-file vs CLAUDE_CODE_DEBUG_LOGS_DIR explicit cite ("--debug-file takes precedence over env var"). Tabela deprecated items (ANTHROPIC_SMALL_FAST_MODEL, includeCoAuthoredBy, ignorePatterns, --enable-auto-mode, C:\ProgramData path) konsoliduje to co w R1 bylo rozsiane.

Zastrzezenia: R5 Section 6 scenario 1 (model selection) i R1 sekcja modelOverrides maja lekki rozjazd - R5 mowi "ANTHROPIC_MODEL env > settings.model > flag --model" ale flag --model powinien byc wyzej per CLI-first-after-managed (R2 layer 2). To jest konflikt C3 ponizej.

Confidence pokrycia: 90%. Najlepszy raport w zakresie swojego tematu.

### R6 Security + Antipatterns - PASS (z zastrzezeniem Phoenix CVE)

Uzasadnienie: threat model A1-A5 (malicious repo, compromised contributor, prompt injection, supply chain, excessive agency) jest ramowaniem ktorego pozostale raporty nie maja. 18 anti-patterns (AP1-AP18) z mapowaniem do konkretnych pol settings.json (np. AP3 "disableBypassPermissionsMode missing in managed" mapuje na R2.C20). 12-item hardening checklist z sample managed-settings.json jest drop-in ready. Centralna teza "settings.json is executable code parsed before trust dialog" jest niepobita i zgodna z R4 thesis "managed must be non-writable by user".

Zastrzezenia: CVE-2026-35020, -35021, -35022 (wszystkie Phoenix Security) maja summary bez URL do advisory w raporcie - to jest FLAG per protokol zrodel. Pozostalych 10 CVE ma GHSA ID i CVSS score z oficjalnej bazy GHSA/NVD, to jest HIGH confidence. Syntetyk MOZE cytowac 10 zweryfikowanych CVE i MUSI flagowac 3 Phoenix jako "reported in Phoenix security bulletin 2026-Q1, awaiting public advisory" albo wyciac je.

Confidence pokrycia: 85% (minus 5pp za Phoenix, minus 5pp za brak cross-reference z implementacjami sandboxa - bubblewrap/seatbelt sa wymienione ale bez detali "jak sprawdzic czy dziala").

### R7 Community Patterns - PASS (z zastrzezeniem Reddit LOW-confidence)

Uzasadnienie: 5 archetypow (Minimalist, Power User, Enterprise Managed, Security-Paranoid, OSS Maintainer) to konstrukt unikalny - zadne docs tego nie maja, a operacyjnie pomaga mapowac profile na zestawy pol. 10+ konkretnych repo GitHub (davila7/claude-code-templates 24.7k gwiazd, obra/superpowers 156k, trailofbits/claude-code-config 1.9k, feiskyer, ZacheryGlass, centminmod 2.2k, citypaul 629, ChrisWiles, Matt-Dionis 627, mafiaguy, letsur-dev/ccperm) z gwiazdkami = weryfikowalne spoleczne dowody. Top-10 common deny list i top-10 common allow list - syntetyzowane z tych repo, ma operacyjna wartosc.

Zastrzezenia: wszystkie cytaty z r/ClaudeAI sa przez aggregatory (aitooldiscovery.com, morphllm.com/blog), bo WebFetch na reddit.com zwraca bledy. Dlatego R7 flaguje je jako LOW confidence. To jest uczciwe ale Syntetyk musi traktowac je jako "community sentiment" a nie "Reddit said X". HN threads (5 rozne ID) - HIGH-MED confidence, bo HN ma stable aggregators i R7 cytuje konkretne ID threadow.

Blog posts z 10 URLami - MED confidence, cytowane fragmenty zidentyfikowane. Evolution 2024->2026 timeline - konstrukcja R7, nie ma jednego zrodla, ale triangulowana z kilku postow.

Confidence pokrycia: 75%. Niedomogi: brak direct Reddit quotes, brak dat publikacji dla czesci postow, brak weryfikacji czy repo sa dalej aktywnie utrzymywane (np. 156k gwiazd dla obra/superpowers jest imponujace, ale jesli last-commit to 2024, ich wzorce moga byc nieaktualne dla v2.1.75).

---

## 3. Cross-Report Conflicts (12 konfliktow, 8 merytorycznych + 4 framing)

### Conflict C1: Managed tier merge - "merge wszystkich" vs "first source wins"

| Report | Claim | Evidence |
| :--- | :--- | :--- |
| R1 | Managed tier ma 4 mechanizmy dostarczenia (server / MDM / plik / HKCU), wymienione bez explicit rozstrzygniecia czy sie lacza | R1 schema reference, sekcja "Managed settings" |
| R2 | "Within the managed tier, precedence is: server > MDM > file > HKCU. **Only one managed source is used; sources do not merge across tiers.**" | R2.C6, cytat z docs |
| R4 | Identyczna teza: "server-managed overrides MDM, MDM overrides file, file overrides HKCU, and **once a source is matched the lower sources are not consulted**" | R4 sekcja 3.2 |

Resolution: **R2 i R4 wygrywaja nad R1**. R1 nie jest sprzeczny - on tylko pomija szczegol. R2 ma explicit cytat z docs, R4 ma implementacyjne potwierdzenie. Syntetyk musi wbic to jako kluczowy fakt: **"managed nie jest masa skumulowana - jest pierwsza dostepna warstwa z jakiegokolwiek kanalu"**. Operacyjnie oznacza to, ze deploy server-managed przez admin console wylacza wszystkie plist/rejestr/plik, nawet jesli plik istnieje na dysku. Admin troubleshooting musi zaczynac od /status zeby zobaczyc ktorym kanalem settings przyszly. Drop-in `managed-settings.d/*.json` mergowanie dziala tylko WEWNATRZ file-based tier (alphabetically sorted, systemd-style, R2.C7) - to nie jest wylom w "first source wins" bo cala file-based-tier to nadal jeden "source" z perspektywy miedzy-tierowej.

### Conflict C2: Array merge dla permissions.allow - concat vs replace

| Report | Claim | Evidence |
| :--- | :--- | :--- |
| R1 | Docs: "arrays are concatenated and deduplicated, not replaced" | R1 schema, general rule |
| R2 | To samo sformulowanie z docs jako R2.C3, ale zglasza issue #17017 (OPEN) gdzie permissions.allow zachowuje sie jak replace | R2.C3 + issue trackera |
| R3 | Nie komentuje explicite ale zaklada merge concat przy opisywaniu multi-scope scenariuszy | R3 Section 4 |

Resolution: **To jest OTWARTY BUG, nie rozstrzygniecie**. Docs mowia concat, issue #17017 dokumentuje replace w terenie. R2 flaguje to wlasciwie. Syntetyk musi zapisac: **"docs deklaruja concat+dedup dla tablic; issue GitHub #17017 (OPEN, 2026) zglasza replace dla permissions.allow i permissions.deny w cross-scope scenariuszach. Do czasu zamkniecia issue traktowac jako replace dla permissions.* i walidowac eksperymentalnie dla innych tablic"**. Operacyjne implikacje: nie polegac na merge concat dla bezpieczenstwa - tzn. nie zakladac, ze project-level deny uzupelnia user-level deny. Przy mandatory enforce: duplikowac deny rules we wszystkich relewantnych warstwach.

### Conflict C3: Model selection precedence - ANTHROPIC_MODEL vs --model vs settings.model

| Report | Claim | Evidence |
| :--- | :--- | :--- |
| R1 | Wspomina modelOverrides i ANTHROPIC_MODEL bez explicit ordering | R1 gaps sekcja |
| R5 | "ANTHROPIC_MODEL env > settings.model > flag --model" | R5 Section 6 scenario 1 |
| R2 (implicit) | CLI jest layer 2 (po Managed), env vars to parallel channel ale w wielu ciagach "env takes precedence over setting" (R2.C10) | R2.C10 |

Resolution: **R5 wydaje sie niepoprawny, R2 i R1 implicitly wspieraja odwrotna kolejnosc**. CLI flag --model powinien byc WYZEJ niz env var, bo CLI jest druga warstwa zaraz po managed i explicit user intent. Env var jest wyzej niz settings plik, ale nie wyzej niz CLI. Podejrzenie: R5 przeczytal "precedence chains" z docs zle albo oparl sie na jednym kontr-intuicyjnym wyjatku (ktory istnieje dla `includeGitInstructions` per R2.C10 - tam env WYGRYWA z setting, ale nie z flag). Syntetyk musi **zweryfikowac empirycznie** albo konserwatywnie zapisac: "model selection ordering: CLI --model > ANTHROPIC_MODEL env > settings.model (user/project/local chain per scope precedence) > managed.model (jesli present, nadpisuje wszystko)". Delta research G3 w sekcji 4.

### Conflict C4: "allow cancels ask" - dev.to claim vs docs priority

| Report | Claim | Evidence |
| :--- | :--- | :--- |
| R3 | Section 8.2 scenario 3 cytuje dev.to Trap 1: "allow rule cancels ask rule for the same pattern" | R3 Section 8.2 + dev.to/yurukusa URL |
| R1 | Docs explicite: "Rules are evaluated in order: deny -> ask -> allow. The first matching rule wins" | R1 + docs/en/permissions |
| R2 | Konsystentnie z R1: "deny > ask > allow first-match-wins" | R2.C1 |

Resolution: **docs wygrywaja. R3 dobrze flaguje jako community claim**. Priorytet deny > ask > allow oznacza, ze matching ask rule WYGRYWA z matching allow rule (bo ask jest rozwazane jako pierwsze, po deny). Interpretacja dev.to mogla wynikac z: (a) bledu uzytkownika w patternie (allow ma szerszy zakres i lapie przed ask), (b) bledu semantycznego w tlumaczeniu "cancels" (moze chodzilo o to, ze broad allow sprawia, ze ask staje sie zbedne, nie ze allow nadpisuje ask), (c) realnego buga nieudokumentowanego. Delta research G1: empirical test z dwoma overlapping rules (ask=`Bash(npm *)`, allow=`Bash(npm run test)`) i obserwacja czy `npm run test` pyta czy nie. Do czasu weryfikacji Syntetyk trzyma sie docs.

### Conflict C5: disableBypassPermissionsMode scope behavior

| Report | Claim | Evidence |
| :--- | :--- | :--- |
| R2 | "disableBypassPermissionsMode quirky hybrid - works any scope" (R2.C20) | R2 precedence table |
| R1 | Wymienia w schema jako managed-preferred ale uzywalne na kazdym poziomie | R1 schema |
| R6 | AP3 "disableBypassPermissionsMode missing in managed" - sugeruje, ze managed jest rekomendowanym miejscem mimo, ze dziala gdziekolwiek | R6 hardening checklist |

Resolution: **Wszystkie trzy sa zgodne, konflikt to framing nie fakt**. Flaga dziala na kazdym poziomie (to jest wyjatek wsrod permissions.* pol, ktore zazwyczaj albo sa skoncentrowane w managed albo mergowane cross-scope). R6 jest najblizej operacyjnej rekomendacji: uzywac w managed bo to jest tam gdzie jest enforceable (user nie moze nadpisac). Syntetyk powinien polaczyc: "disableBypassPermissionsMode ma unikalna semantyke - dziala na kazdym poziomie (user/project/local/managed), ale dla bezpieczenstwa zabezpiecza enterprise deploy TYLKO w managed tier, bo na nizszych warstwach user moze po prostu usunac to ustawienie".

### Conflict C6: disableAllHooks - globalne vs scope-aware

| Report | Claim | Evidence |
| :--- | :--- | :--- |
| R1 | Wymienia jako flage boolean w schema bez rozstrzygniecia zasiegu | R1 schema |
| R2 | R2.C37: "scope-aware - tylko hooks zdefiniowane w tym scope sa wylaczone przez flage z tego scope" | R2 sekcja deep merge |
| R6 | Traktuje jako global kill-switch (AP kontekst, bez jawnego rozstrzygniecia) | R6 AP notes |

Resolution: **R2 interpretuje, R1 i R6 nie rozstrzygaja**. To jest interpretacyjna luka w docs - nie ma explicit cytatu. R2 wnioskuje z ogolnej zasady "scope locality" ale nie ma repro ani cytatu. Delta research G4: empirical test z hook w user settings i disableAllHooks w project settings, obserwacja czy hook sie wykonuje. Do weryfikacji Syntetyk musi zapisac "interpretacja R2; nieweryfikowane empirycznie; ostrzec admin, zeby umieszczac disableAllHooks na najwyzszej warstwie na ktorej chca enforce (managed dla global kill-switch)".

### Conflict C7: apiKeyHelper invocation timing - per-request vs per-session

| Report | Claim | Evidence |
| :--- | :--- | :--- |
| R4 | Sekcja apiKeyHelper z cache-TTL example sugeruje per-request z cache | R4 apiKeyHelper |
| R5 | Auth precedence chain traktuje apiKeyHelper jako session-level fallback | R5 Section 4 auth |
| R1 | Wymienia jako pole bez komentarza o timingu | R1 schema |

Resolution: **Niedookreslone w zadnym zrodle, konflikt interpretacyjny**. R4 moze byc design aspirational (tak powinno dzialac przy enterprise rotation). R5 moze byc operacyjna obserwacja (tak dziala teraz). Delta research G2: empirical test z apiKeyHelper zwracajacym unikalny timestamp, obserwacja ile requestow uzywa tego samego vs rozne. Syntetyk powinien zapisac "apiKeyHelper invocation timing nieudokumentowane; R4 zaklada per-request z cache, R5 per-session; enterprise powinno walidowac na swoim deploycie przed polegniem na rotation schedule".

### Conflict C8: Managed-only flags count - 7 vs 11

| Report | Claim | Evidence |
| :--- | :--- | :--- |
| R2 | 7 flag: allowManagedHooksOnly, allowManagedMcpServersOnly, allowManagedPermissionRulesOnly, sandbox.filesystem.allowManagedReadPathsOnly, sandbox.network.allowManagedDomainsOnly, forceRemoteSettingsRefresh, channelsEnabled | R2.C4 |
| R4 | 11 flag: wszystkie powyzsze + strictKnownMarketplaces, blockedMarketplaces, allowedChannelPlugins, pluginTrustMessage | R4 managed-only matrix |
| R6 | Cytuje z R4, ma 11 | R6 AP10 |

Resolution: **R4 wygrywa z katalogiem 11 flag, R2 zgadza sie na 7 bo nie dotarl do plugin-related (marketplace) section docs**. Plugin marketplace controls to osobna sekcja docs (plugin management), ktorej R2 nie skanowal. To nie jest blad R2 - raport podpisal sie 7 do zakresu ktorego pokrywal (core settings). R4 dociagnal plugin security. Syntetyk synthesizes list of 11.

### Conflict C9: Protected paths in bypassPermissions mode

| Report | Claim | Evidence |
| :--- | :--- | :--- |
| R3 | Lista: `.git`, `.vscode`, `.idea`, `.husky`, czesci `.claude`, `.bashrc` i inne sensitive config | R3 Section 6 modes |
| R6 | Traktuje bypass jako "no safety net" - krotka lista protected paths ale sugeruje, ze jest wystarczajaco slaba ze nie warto polegac | R6 AP7 |

Resolution: **R3 opisuje mechanicznie, R6 ocenia operacyjnie, zgodnosc co do listy**. Framing konflikt: R3 "oto co jest protected", R6 "nie uzywaj tego trybu bo ochrona jest za slaba". Syntetyk laczy: list of protected paths (z R3) + policy recommendation "uzywac bypassPermissions TYLKO w sandbox environment (Docker/devcontainer/VM) zgodnie z docs" (R6). To nie jest fact-conflict.

### Conflict C10: Invalid JSON behavior w Managed tier

| Report | Claim | Evidence |
| :--- | :--- | :--- |
| R2 | User/project tier silent skip per #2835 | R2.C5 |
| R4 | Managed tier invalid JSON: "niesolidny" - nie potwierdza silent skip ani crash | R4 edge case 7 |
| R6 | Nie komentuje | R6 |

Resolution: **Gap. R2 ma repro tylko dla user tier. R4 flaguje niesolidnie**. Delta research G5: empirical test, polozyc zepsuty JSON w managed-settings.json na macOS i obserwacja czy CLI wstaje, crashuje, czy cichutko pomija managed (co byloby bardzo zle, bo enterprise traci caly enforcement). Syntetyk musi zapisac: "invalid JSON w user/project: silent skip warstwy (#2835); w managed: niepotwierdzone; enterprise powinno walidowac JSON przed deployem i uzywac digital signatures jesli to mozliwe".

### Conflict C11: settings.local.json deprecation status

| Report | Claim | Evidence |
| :--- | :--- | :--- |
| R2 | "NIE jest deprecated" - trzy dowody: docs 2026, autoMode classifier czyta z niej, aktywne issue #41259 | R2.C11-C13 |
| R1 | Wymienia bez flag deprecation | R1 schema |
| R7 | Archetyp "Power User" uzywa tego pliku standardowo | R7 archetypes |

Resolution: **Zgodnosc - nie deprecated. To nie jest prawdziwy konflikt, tylko wzmocnienie**. W niektorych community blog postach z 2024-2025 pojawialy sie plotki o deprecation, raporty je skutecznie obalaja. Syntetyk powinien explicite napisac "settings.local.json nie jest deprecated w 2026 i jest aktywnie uzywany przez autoMode classifier".

### Conflict C12: Reddit confidence level w community coverage

| Report | Claim | Evidence |
| :--- | :--- | :--- |
| R7 | Reddit przez aggregatory (aitooldiscovery, morphllm), oznakowane LOW confidence | R7 methodology + flags |
| R6 | Nie cytuje Reddit | R6 |
| (pozostale) | Nie komentuja | - |

Resolution: **R7 uczciwie flaguje, pozostale raporty nie polegaja na Reddit**. Syntetyk powinien ograniczyc Reddit-source claims do 1-2 przykladow archetypicznych (np. "community sentiment w r/ClaudeAI pokazuje, ze X") bez uzywania ich jako authoritative facts. Direct quotes z Reddit nie sa dostepne bo WebFetch bloked - jest to ograniczenie metody, nie wada raportu.

---

## 4. Gaps Requiring Delta Research (6 gapow)

### Gap G1: Empirical repro "allow cancels ask" (dev.to Trap 1)

Co zmierzyc: polozyc `permissions.ask = ["Bash(npm *)"]` i `permissions.allow = ["Bash(npm run test)"]` w user settings, wywolac `Bash(npm run test)`, obserwowac czy CLI pyta czy auto-approvuje. Docs mowia "deny > ask > allow first-match-wins" co implikuje, ze ask wygrywa. Dev.to mowi odwrotnie. To musi byc rozstrzygniete przed final SYNTHESIS. Rozmiar: 1 eksperyment, 5 minut, dokumentacja w delta research file `research/DELTA_G1_allow_ask_order.md`.

### Gap G2: apiKeyHelper invocation timing

Co zmierzyc: ustawic `apiKeyHelper` na skrypt ktory zwraca `token-${timestamp}` i loguje do pliku, wywolac 5 requestow w 1 sesji, policzyc ile wywolan skryptu nastapilo. Jesli 1 - per-session. Jesli 5 - per-request. Jesli cos posredniego - cache z TTL. Krytyczne dla enterprise key rotation design. Rozmiar: 1 eksperyment, 10 minut.

### Gap G3: Model selection ordering CLI vs env vs setting

Co zmierzyc: ustawic `ANTHROPIC_MODEL=claude-sonnet-4-5` i `settings.model=claude-haiku-4-5`, uruchomic z `--model claude-opus-4-7`, sprawdzic ktory model jest aktywny przez /status. Konflikt C3 wymaga empirical confirmation. Rozmiar: 1 eksperyment, 3 minuty.

### Gap G4: disableAllHooks scope semantics

Co zmierzyc: polozyc hook PreToolUse w `~/.claude/settings.json` (user tier), polozyc `"disableAllHooks": true` w `.claude/settings.json` (project tier), wywolac tool, sprawdzic czy hook sie wykonuje. Jesli tak - flaga jest scope-local (R2 hipoteza). Jesli nie - flaga jest global (R1/R6 implicit). Krytyczne operacyjnie. Rozmiar: 1 eksperyment, 10 minut.

### Gap G5: Invalid JSON w managed tier - silent skip vs crash

Co zmierzyc: polozyc intencjonalnie zepsuty JSON (missing brace) w `/Library/Application Support/ClaudeCode/managed-settings.json` na macOS albo `/etc/claude-code/managed-settings.json` na Linux, wystartowac CLI, sprawdzic (a) czy wstaje, (b) czy /status pokazuje managed loaded czy skipped, (c) czy permissions sa jakkolwiek aktywne. Jesli silent skip - bardzo niebezpieczne enterprise (brak enforcement bez alarmu). Rozmiar: 1 eksperyment, 10 minut.

### Gap G6: WebFetch domain wildcard semantics

Co zmierzyc: R1 zgloszny gap - czy `WebFetch(domain:*.example.com)` laczy subdomeny, czy tylko exact match? Docs nie precyzuja. Ustawic allow `WebFetch(domain:*.example.com)`, probowac fetch `api.example.com` i `example.com` i `sub.api.example.com`. Operacyjnie krytyczne dla enterprise domain allowlisting. Rozmiar: 1 eksperyment, 5 minut.

---

## 5. Top 3 Critical Findings dla SYNTHESIS.md

### Finding F1: Trust boundary confusion - settings.json jest kodem parsowanym przed trust dialog

Trzy raporty (R2, R4, R6) zbiezaja do tej tezy niezaleznie. **settings.json nie jest pasywna konfiguracja** - jest parsowany, jego `hooks`, `apiKeyHelper`, `env`, plugin marketplaces sa wywolywane albo ladowane zanim Claude Code pokaze userowi dialog "trust this folder?". Oznacza to, ze **kazdy `git clone` potencjalnie nieznajomego repo moze wykonac kod przez settings.json** zanim uzytkownik zdecyduje o zaufaniu.

Implikacja syntezy: musi byc wyrazne zalecenie "nie klonowac nieznajomych repo do folderow, w ktorych Claude Code jest aktywny" + rekomendacja managed-settings.json z `allowManagedHooksOnly=true` jako najsilniejsza obrona. Finding F1 jest osia caleij security narracji - wszystkie inne anti-patterns (AP1-AP18 w R6) sa konsekwencja tego jednego faktu architektonicznego. Syntetyk powinien poswiecic temu osobna sekcje "Architectural Trust Boundary" na poczatku hardening rekomendacji.

### Finding F2: Managed tier nie mergujący - "first source wins" nie "merged blob"

Teza R2.C6 i R4 sekcja 3.2. Wewnatrz managed tier istnieje hierarchia server > MDM > file > HKCU, ale **jesli server-managed jest obecny, plik managed-settings.json na dysku jest calkowicie ignorowany**, nawet jesli zawiera dodatkowe deny rules. To jest przeciwne intuicji enterprise admin, ktory czesto zaklada "put stuff in both for defense in depth".

Implikacja syntezy: enterprise deployment musi byc **synchroniczny w jednym kanale**. Jesli org uzywa Claude.ai admin console (server-managed), plik managed-settings.json NA KLIENCKIEJ MASZYNIE sluzy tylko jako fallback gdy server jest unreachable (i nie wiadomo czy CLI przelacza na fallback - R4 nie rozstrzyga cache retention behavior). Jesli org uzywa MDM (Jamf/Intune), plik i HKCU sa ignorowane. Drop-in directory `managed-settings.d/*.json` dziala tylko wewnatrz file-based tier, nie ratyfikuje cross-tier merge. /status discovery jest JEDYNYM niezawodnym sposobem sprawdzenia ktory kanal jest aktywny na danej maszynie.

### Finding F3: Array merge bug #17017 - asymetryczne zachowanie permissions.allow vs .deny

Issue #17017 jest OTWARTE w kwietniu 2026. Docs mowia, ze tablice (wszystkie) sa concat+dedup. W praktyce `permissions.allow` i `permissions.deny` zachowuja sie jak replace cross-scope w scenariuszach opisanych w issue (project-level allow wyczyszcza user-level allow zamiast uzupelniac). To jest NIEUDOKUMENTOWANY edge case z operacyjnymi konsekwencjami.

Implikacja syntezy: **nie polegac na merge concat dla permissions**. Przy mandatory enforce duplikowac deny rules we wszystkich relewantnych warstwach (user + project). Przy mandatory allow - sytuacja gorsza, bo jesli project ma krotsza liste allow niz user, to moze skutkowac replace (user's allow cancelled). Operacyjna reguła: **uzywac managed tier dla enforcement, nie polegac na project-user merge**. To jest trzecia kluczowa teza: **enforcement = managed tier. Project i user tier dostarczaja wygody nie bezpieczenstwa.**

---

## 6. Recommendations for Syntetyk (faza 4)

### 6.1 Structural

- Otworzyc SYNTHESIS.md trzema architectural findings F1/F2/F3 jako "Three Non-Intuitive Facts" przed szczegolowym rozbiorem pol.
- Uzyc 5-warstwowego precedence jako kregoslupa dokumentu, ale zaznaczyc ze to jest "the written model" a nie "the enforced model" (bo bug #17017 pokazuje rozjazd).
- Tabela "Po co jaka warstwa" - user = wygoda, project = team sharing, local = gitignored personal, CLI = temporary override, managed = enforcement. Ta tabela jest operacyjnie cenniejsza niz schema dump.

### 6.2 Content priorities

- Pol top-level w settings.json zidentyfikowac jako "safety-critical" vs "convenience": safety-critical (permissions.*, hooks, sandbox, apiKeyHelper, env) wymagaja konkretnych rekomendacji; convenience (theme, autoUpdate, model) wymagaja tylko wzmianki.
- Dla kazdego safety-critical pola: sample managed-settings.json snippet, common mistake, hardening. Wzorzec z R6 checklist jest dobry.
- Unikac podawania R7 archetypow jako preskrypcji - to sa deskrypcje. Uzyc ich jako "oto jak inni to robia" nie "oto jak powinnismy".

### 6.3 Co wyciac / ograniczyc

- Phoenix Security CVE 2026-35020/21/22 bez URL - wyciac albo zachowac z explicit flag "awaiting public advisory".
- Industry profiles (HIPAA, PCI-DSS) z R4 - zachowac z disclaimer "R4-constructed, not official framework mapping".
- Reddit citations - ograniczyc do 1-2 "community sentiment" wzmianek, nie wiecej.
- Dev.to Trap 1 "allow cancels ask" - wyciac do czasu G1 repro.

### 6.4 Delta research order

Jesli Syntetyk ma budzet na delta - kolejnosc waznosci: G1 (allow vs ask order - ksztaltuje cala permissions narracje), G5 (invalid JSON w managed - enterprise krytyczne), G3 (model ordering - czesto pytane), G4 (disableAllHooks scope), G6 (WebFetch wildcards), G2 (apiKeyHelper timing). Jesli zero budzetu - pisac SYNTHESIS z uczciwymi flagami "not empirically verified".

### 6.5 Styl

- Zero em-dash, zero en-dash, zero smart quotes (reguły uzytkownika).
- Polski jako glowny jezyk narracji; cytaty z docs po angielsku, wlasne komentarze po polsku.
- Target dlugosc SYNTHESIS: 6000-8000 slow. Kluczowe tabele: merge semantics per type, managed-only 11 flag, top-10 deny list (z R7), top-10 allow list (z R7), /status output interpretation (z R4).

---

## 7. Bibliography

### 7.1 Oficjalne dokumenty (HIGH confidence)

- docs.claude.com/en/docs/claude-code/settings (schema + precedence section)
- docs.claude.com/en/docs/claude-code/permissions (3-fazowa grammar + modes)
- docs.claude.com/en/docs/claude-code/permission-modes (6 modes detail)
- docs.claude.com/en/docs/claude-code/hooks (25+ events)
- docs.claude.com/en/docs/claude-code/mcp (MCP server config)
- docs.claude.com/en/docs/claude-code/cli-reference (50+ flag)
- docs.claude.com/en/docs/claude-code/authentication (auth precedence chain)
- docs.claude.com/en/docs/claude-code/sub-agents (Agent matcher)
- docs.claude.com/en/docs/claude-code/skills (skill permissions)
- code.claude.com/docs (JSON schema URL)

### 7.2 GitHub issues (HIGH-MED confidence)

- #17017 (OPEN) - permissions.allow replace bug cross-scope
- #17299 (CLOSED dup) - mcpServers replace
- #2835 (CLOSED) - silent JSON failure
- #24657 (OPEN) - enabledMcpjsonServers ignored
- #41259 (OPEN 2026) - settings.local.json post-Edit skip
- #16301 (OPEN) - invalid entries written to settings.local.json
- #1506, #5563, #18809, #18160, #27139, #6850, #37029, #34138 - pozostale auxiliary
- #36637/#36645 - first-token flaw

### 7.3 Security advisories (HIGH dla zweryfikowanych)

- CVE-2025-54794 (GHSA)
- CVE-2025-54795 (GHSA)
- CVE-2025-59536 (GHSA)
- CVE-2025-66032 (GHSA)
- CVE-2026-21852 (GHSA)
- CVE-2026-24052 (GHSA)
- CVE-2026-24053 (GHSA)
- CVE-2026-24887 (GHSA)
- CVE-2026-25722 (GHSA)
- CVE-2026-25723 (GHSA)
- CVE-2026-25724 (GHSA)
- CVE-2026-25725 (GHSA)
- CVE-2026-33068 (GHSA)
- CVE-2026-35020, -35021, -35022 (Phoenix Security, FLAG - summary only, brak publicznego advisory URL w raporcie R6)

### 7.4 Blogi techniczne (MED confidence)

- blog.vincentqiao.com/en/posts/claude-code-settings-intro
- blog.vincentqiao.com/en/posts/claude-code-settings-permissions
- klement_gunndu (hardening)
- Shimo blog (MCP)
- Boucle (settings walkthrough)
- Hubert Sablonnière (hooks)
- Freek Van der Herten (workflow)
- Ashley Ha (community patterns)
- Pragmatic Engineer / Boris Cherny interview
- Latent Space podcast transcript

### 7.5 Community / forum (MED-LOW confidence)

- HN 47167242 (ccperm)
- HN 47516808 (first-token flaw)
- HN 47343927 (context-aware permissions)
- HN 46653896 (dotfiles sharing)
- HN 44956002 (Docker bypass)
- dev.to/yurukusa 6-traps (community-reported traps R3 Trap 1-6)

### 7.6 Community repositories (weryfikowalne przez gwiazdki + last commit)

- davila7/claude-code-templates (24.7k)
- obra/superpowers (156k - wymaga sprawdzenia ostatniej aktywnosci)
- trailofbits/claude-code-config (1.9k)
- feiskyer (nieokreslona liczba)
- ZacheryGlass (nieokreslona)
- centminmod (2.2k)
- citypaul (629)
- ChrisWiles (nieokreslona)
- Matt-Dionis (627)
- mafiaguy (nieokreslona)
- letsur-dev/ccperm (nieokreslona)

### 7.7 Reddit (LOW confidence - tylko przez aggregatory)

- r/ClaudeAI w/g aitooldiscovery.com aggregation
- r/ClaudeAI w/g morphllm.com/blog aggregation
- Brak direct quotes - WebFetch zwraca bledy na reddit.com

### 7.8 Zrodla R4 do deployment (R4-constructed vs cited)

- Jamf plist/mobileconfig template - R4-constructed z Apple MDM docs
- Intune PowerShell Platform Script - R4-constructed
- ADMX/GPO - R4-constructed z Microsoft GPO docs
- Ansible playbook - R4-constructed

---

## 8. Summary one-liner

Siedem raportow PASS (trzy z flagami), ~4800 linii researchu, 12 konfliktow zidentyfikowanych (8 merytorycznych + 4 framing), 6 gapow delta research (G1-G6), 3 architectural findings (F1 trust boundary / F2 first-source-wins / F3 array merge bug). Syntetyk ma jasna baze do zbudowania 6000-8000 slownej syntezy z naciskiem na "written policy vs enforced policy" jako gwnym waterhedzie pomiedzy wygoda a bezpieczenstwem.

---

**END OF CRITIC.md**
