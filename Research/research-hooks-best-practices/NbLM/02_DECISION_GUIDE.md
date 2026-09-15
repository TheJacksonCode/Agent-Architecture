# Claude Code Hooks - Przewodnik decyzyjny (Lekcja 3)

Trade-offs, anti-patterns, hardening checklist, i areas of uncertainty dla systemu hookow Claude Code. Wersja dokumentu: 2026-04-17. Zrodlo kanoniczne: raport syntezy kampanii "Research Hooks Best Practices 2026", Parts 5-7 i Appendix C. Ta lekcja jest samodzielna - nie wymaga czytania innych dokumentow ani dostepu do internetu. Zakladamy ze czytelnik rozumie podstawowe pojecia: hook, event, matcher, typ handlera (command/http/prompt/agent), exit code 0/1/2, precedensja warstw ustawien (Managed > CLI > Local > Project > User). Jesli nie - skrocony przypomnik znajdziesz w rozdziale 9 tej lekcji.

## 1. Drzewo decyzyjne - ktory event i matcher wybrac

Najlepsze podejscie do projektowania hooka: zacznij od pytania "co chcesz osiagnac", dopasuj event, dopasuj matcher, dopasuj typ handlera, dopasuj warstwe konfiguracji. Ponizej sciagawka "chce X -> uzyj Y":

- **Chce sformatowac pliki po edycji** (prettier, black, gofmt): event `PostToolUse`, matcher `Edit|Write|MultiEdit`, typ `command`, warstwa Project (team-wide quality gate).

- **Chce zablokowac rm -rf i git push --force**: event `PreToolUse`, matcher `Bash`, opcjonalnie pole `if: "Bash(rm -rf *)"`, typ `command` exit 2, warstwa Project albo Global. ALE: lepiej uzyj `permissions.deny` zamiast hooka dla czystych pattern-match - deny jest szybsze (bez fork shella) i nieobchodzalne przez zle skonfigurowany hook.

- **Chce zabronic Claude czytac .env**: uzyj `permissions.deny: ["Read(./.env)", "Read(./.env.*)", "Read(./secrets/**)"]`, NIE hooka. Deny-rules jest szybsze, deklaratywne, i niemozliwe do obejscia przez misconfig hooka.

- **Chce desktop toast/TTS gdy Claude skonczy**: event `Stop` lub `Notification`, typ `command` z `async: true`, warstwa Global (personal preference).

- **Chce wstrzyknac git status przy kazdym starcie sesji**: event `SessionStart` z matcherem `startup|resume`, typ `command` (skrypt wypisuje kontekst na stdout), warstwa Global (personal) lub Project (team).

- **Chce wymusic testy przed Stop**: event `Stop`, typ `agent` (dostep do narzedzi, 60s, 50 tool-turns limit) lub `command` (tanszy), warstwa Project. Pamietaj o `stop_hook_active` zeby uniknac nieskonczonej petli.

- **Chce audit kazdego tool call do zdalnego serwisu**: event `PostToolUse` matcher `*`, typ `http` z `async: true` (telemetria nie moze blokowac), warstwa Global (personal) lub Project (team). Pin `allowedHttpHookUrls` i `httpHookAllowedEnvVars` w User lub Managed scope.

- **Chce reload env zmieniajac katalog**: event `CwdChanged`, typ `command` zapisujacy do `CLAUDE_ENV_FILE`, warstwa Global.

- **Chce archiwizacji transkryptu przed auto-compact**: event `PreCompact` matcher `auto`, typ `command`, warstwa Global.

- **Chce walidacji Bash komendy szybkim LLM**: event `PreToolUse` matcher `Bash`, typ `prompt` (Haiku 4.5 default, 30s, ~$0.003/event), warstwa Project.

- **Chce Slack alertu przy rate limit**: event `StopFailure` matcher `rate_limit`, typ `http` sync 5s, warstwa Global lub Project.

- **Chce redakcji sekretow przed wyslaniem**: event `UserPromptSubmit` (redakcja promptu uzytkownika) + `PostToolUse` (redakcja tool output), typ `command`, warstwa Project.

- **Chce przechwycic MCP writes**: event `PreToolUse` matcher `mcp__.*__write.*` (regex), typ `http`, warstwa Project.

- **Chce zablokowac tworzenie task bez ticketu**: event `TaskCreated`, typ `prompt` lub `command` exit 2, warstwa Project.

- **Chce auto-approve ExitPlanMode zeby plan->code bylo plynne**: event `PermissionRequest` matcher `ExitPlanMode`, typ `command` zwracajacy JSON z `permissionDecision: "allow"`, warstwa Global.

## 2. Anti-patterns - czego NIE robic

Nastepujace wzorce pojawiaja sie wielokrotnie w publicznych repo i konfiguracjach na GitHubie, i za kazdym razem bola. Poznajesz kazdy z nich - zmieniasz NATYCHMIAST:

**Anti-pattern 1: exit 1 zamiast exit 2 do blokowania.** To jest najczesciej popelniany blad implementacyjny w calym ekosystemie hookow Claude Code. Exit 1 jest NIEBLOKUJACY per specyfikacja - transkrypt pokazuje krotkie ostrzezenie "hook returned exit 1" ale akcja (wywolanie narzedzia, prompt, stop) PRZEBIEGA DALEJ. Z jakiegos powodu intuicja kazdego developera mowi "exit 1 = blad = blokuje". Nie. Tylko exit 2 blokuje. Stderr jest wtedy zwracany Claude'owi dla kontekstu. Jesli uzywasz `bash set -e` pamietaj ze to przeklada nieobslugiwany blad shella na exit 1, czyli WARNING zamiast BLOCK - zawsze uzywaj `set -euo pipefail` i wyrzucaj explicit `exit 2` w miejscach gdzie chcesz blokowac.

**Anti-pattern 2: Regex-only Bash blockery.** Regex ktory sprawdza `rm\s+-rf` jest trywialnie obchodzony. Przykladowe bypassy ktore pokazuja ze to nie dziala: `rm  -rf /` (podwojna spacja lamie \s+), `\rm -rf /` (backslash escape), `eval "rm -rf /"`, `bash -c "rm -rf /"`, base64-encoded command (`echo cm0gLXJmIC8K | base64 -d | bash`). Dla prawdziwego bezpieczenstwa potrzebujesz AST parser jak `vaporif/parry` (DeBERTa v3 + Aho-Corasick + tree-sitter, 6 warstw detekcji). Regex-blokery traktuj jako defense-in-depth, nie jedyna warstwe.

**Anti-pattern 3: Substring match na .env zamiast glob.** Skrypt `if echo "$FILE" | grep -q '.env'` ma wiele falszywych pozytywow (pasuje do `.envrc`, `documentation.env.md`) i jeszcze wiecej falszywych negatywow - nie lapie `src/.env`, nie lapie symlinkow do `.env`, nie lapie `.env.production`. Poprawne podejscie: glob `permissions.deny: ["Read(./**/.env*)"]` albo canonicalize path (`realpath`) i porownaj prefiks.

**Anti-pattern 4: Sekrety w settings.json.** `ANTHROPIC_API_KEY`, `ELEVENLABS_API_KEY`, Slack webhook URL, Telegram bot token - wszystkie hardcodowane i committowane do git. Nawet jesli usuniesz pozniej, zostaje w historii. Poprawne: uzyj `apiKeyHelper` dla kluczy Anthropic, lokalne `env` w `settings.local.json` (gitignored), `httpHookAllowedEnvVars` dla HTTP hooks (pin zmiennych ktore moga byc przekazywane), albo managed secret stores (Vault, AWS Secrets Manager).

**Anti-pattern 5: PowerShell -ExecutionPolicy Bypass.** W skryptach WSL -> Windows toast (BurntToast) spotyka sie `powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "..."`. To usuwa jedyna OS-level kontrole i staje sie prompt-injection target. Jesli Claude moze wplywac na `$MSG` (np. zawartosc z tool output), atakujacy moze wykonac dowolny PowerShell. Poprawne: sign script lub uzyj `-File` z ekstrakcja tresci promptu do argumentow, nie do inline command.

**Anti-pattern 6: Cross-shell quote injection.** Shell Bash i PowerShell maja rozna semantyke pojedynczych cudzyslowow. Skrypt ktory robi `powershell.exe -Command "New-BurntToast -Text '$MSG'"` nie escapuje bezpiecznie. Payload `';rm -rf ~;'` slipuje. Poprawne: przekazuj argumenty przez zmienne srodowiskowe, a nie inline w argv.

**Anti-pattern 7: Hardcoded URL webhookow bez allowedHttpHookUrls.** Bez pinowania allowlist dowolna warstwa (lokalna, projektowa) moze dodac URL eksfiltracyjny. Jeden prompt injection i transkrypt leci. Poprawne: pin `allowedHttpHookUrls` w warstwie User lub Managed - tablice konkatenuja, ale lowwer layer nie moze rozszerzyc - wait, tablice konkatenuja, wiec nizszy moze DODAWAC. Aby zabezpieczyc - uzywaj Managed scope gdzie nizsze warstwy NIE MOGA modyfikowac albo filtruj w enterprise MDM.

**Anti-pattern 8: Synchroniczne HTTP hooki na hot-path.** Hot-path to PreToolUse i PostToolUse - kazde wywolanie narzedzia przechodzi przez te hooki. Synchroniczny HTTP hook blokuje do timeout (default 30s). Jesli webhook endpoint jest down, kazdy tool call czeka 30 sekund. Community case study: repo `ruvnet/ruflo` issue #1530 - 11 hookow chainowanych na PreToolUse+PostToolUse produkowaly 18-21 sekund dodanego opoznienia per prompt na turach z 20 eventami, roznica to 2s p50 per synchroniczny HTTP audit. Fix: 8 z 11 skonwertowano na `async: true`, 3 validatory skollapsowano do jednego Python skryptu - latency spadla do ~1.5s. Reguly: `async: true` dla telemetrii, synchroniczne tylko dla security/policy gdzie exit code MUSI blokowac.

**Anti-pattern 9: Hooki POSTujace pelne transkrypty.** Observability service trzymajacy conversation history caly czas to single-compromise-away od eksfiltracji wszystkiego co Claude widzial. Poprawne: redaktuj w hooku przed POST (odetnij pola zawierajace kod, file contents), PREFERUJ lokalne JSONL, albo OpenTelemetry ze striping PII.

**Anti-pattern 10: Hooki ufajace tool_input bez walidacji.** `file_path: "../../../etc/passwd"` reaches `cat "$FILE"` - LFI. Poprawne: canonicalize (`realpath -m`), weryfikuj ze ABSOLUTE sciezka jest pod `CLAUDE_PROJECT_DIR`, reject otherwise.

**Anti-pattern 11: Brak timeout field.** Default command hook ma 600 sekund (10 minut). Misbehaving hook zamraza Claude na 10 minut. Zawsze set explicit `timeout: 5` dla telemetry, `timeout: 30` dla validators, `timeout: 180` dla test suites.

**Anti-pattern 12: allow-all w committowanym settings.json.** `permissions.allow: ["*"]` w projektowym settings.json to "works on my machine" stajace sie "owns every cloner". Niszczy kazdego kto sklonuje repo. Szerokie allowy trzymaj TYLKO w settings.local.json (gitignored).

**Anti-pattern 13: Twardocodowane personalne sciezki w settings projektu.** `/Users/maciej/...` psuje dla kazdego innego developera. Uzyj `$CLAUDE_PROJECT_DIR`.

**Anti-pattern 14: Globalny hook zakladajacy strukture projektu.** `cat package.json` failuje w Python/Rust repo. Osadz `[ -f "$CLAUDE_PROJECT_DIR/package.json" ] || exit 0` jako guard.

**Anti-pattern 15: disableAllHooks: true na projectowym scope.** Nukowanie user safety hooks. Prawie nigdy nie jest intencja. Jesli potrzebujesz, uzyj w settings.local.json (personalny eksperyment).

**Anti-pattern 16: Poleganie TYLKO na permissions.deny bez sandbox defense-in-depth.** Edge cases (shell expansion, subcommand chains, variable interpolation) czasem obchodza deny. Wzmocnij `sandbox.enabled: true`, `sandbox.network.allowedDomains` dla whitelist HTTP, `sandbox.filesystem.denyWrite` dla readonly.

**Anti-pattern 17: autoMemoryDirectory w projectowym scope.** Explicitly forbidden w docs - "prevents shared repos from redirecting memory writes to sensitive locations".

**Anti-pattern 18: Rc-file banners psujace stdout.** `~/.bashrc` printujacy "Shell ready" w kazdym shellu psuje JSON hook output (JSON parse fails). Wrap shell banners w `if [[ $- == *i* ]]; then ... fi` aby niepsuly non-interactive sessions.

## 3. Hardening checklist - 5 warstw bezpieczenstwa

Bezpieczenstwo hookow ukladaj warstwami. Poprawna konfiguracja produkcyjna ma wszystkie 5:

**Warstwa 1: Input validation.** Kazdy hook ktory czyta `tool_input.command`, `tool_input.file_path`, `tool_input.content` MUSI walidowac - canonicalize path (reject `../`), reject outside `CLAUDE_PROJECT_DIR`, reject secret patterns, sprawdz typ (is it a string, is it JSON, is it well-formed). Command-injection-safe shape: `INPUT=$(cat); COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command')` - nigdy `eval`, nigdy `"$@"` bez cudzyslowu, nigdy backticki.

**Warstwa 2: Sandbox.** `sandbox.enabled: true` w settings.json. `sandbox.filesystem.denyWrite` dla readonly katalogow. `sandbox.network.allowedDomains` dla whitelist URLi. To jest DEKLARATYWNA warstwa - nie wymaga kodu, dziala przed wszystkim innym. Nieobchodzalna przez misconfig hooka.

**Warstwa 3: Least privilege.** Wszystkie pola `permissions.*` w settings.json ustaw najwezsze. Pin `allowedHttpHookUrls` do konkretnych hostow, nie wildcards. Pin `httpHookAllowedEnvVars` do konkretnych zmiennych. Deny `Bash(sudo *)`, `Bash(curl *)`, `Bash(wget *)`, `WebFetch` na Global lub Managed - te sa glownym wektorem eksfiltracji. Deny `Read(./.env)`, `Read(./.env.*)`, `Read(./secrets/**)`, `Read(~/.ssh/**)`, `Read(~/.aws/**)` na User scope - podroznik miedzy repo.

**Warstwa 4: Audit trail.** ConfigChange hook logujacy kazda zmiane settings.json do append-only logu wykrywa "atakujacy dodal rogue hook" szybciej niz inna kontrola. PermissionDenied hook logujacy wszystkie odmowy. PostToolUse hook logujacy wszystkie edycje plikow produkcyjnych. Wszystko lokalnie JSONL z `async: true` (telemetria nie moze blokowac).

**Warstwa 5: Fail-closed defaults.** Jesli hook ma decyzje "allow or deny" - na niepewnosc zawsze deny. Jesli hook crashuje (syntaksa, missing dependency) - niech exit 2 (blokujacy) a nie exit 1 (nieblokujacy). Strukturalny JSON `{"decision": "block", "reason": "hook error"}` na exit 0. Nigdy nie "na wszelki wypadek pozwol" - atakujacy wykorzysta.

Mandatory items (warstwy 1-3), defense-in-depth (warstwa 4-5), ale te ostatnie daja najwiecej wykrywania realnych prob ataku.

## 4. Performance budgety - reguly 200 ms / 2 s / 5 s

Hot-path hooki (PreToolUse, PostToolUse) wyzwalaja sie KAZDE wywolanie narzedzia - kazdy Bash, kazdy Edit, kazdy Read. Jesli Claude wywola 50 narzedzi w jednej turze, hooki wyzwalaja sie 50 razy. Opoznienia sie kumuluja. Reguly:

- **<100 ms p95** - slodki punkt. Nie czuje sie. Cel dla synchronicznych validatorow.
- **100-500 ms p95** - akceptowalne. Minimalne opoznienie zauwazalne.
- **500 ms - 2 s p95** - zauwazalne. Uzytkownicy zaczynaja sie dziwic dlaczego Claude jest wolniejszy niz wczoraj.
- **>2 s p95** - nie do zniesienia. Uzytkownicy disable hooka w sesji.
- **>5 s p95** - Claude wyglada jak zamrozony. Dla ruvnet/ruflo case study 11 synchronicznych HTTP hookow dalo 18-21s per prompt - uzytkownicy natychmiast wyczyscili settings.

Reguly projektowe dla performance:

- **Cache przez content hash.** Repo `bartolli/claude-code-typescript-hooks` SHA256-cachuje ESLint + Prettier + tsc per plik; rerun tylko na content change. Dziala dla kazdego deterministycznego validatora. Przyklad: plik nie zmieniony -> hook zwraca cached result w 12 ms. Plik zmieniony -> fresh run 180 ms p95 dla tsc --noEmit incremental.

- **Debounce file-change hookow.** `FileChanged` na `.envrc` moze wyzwalac sie bursami podczas `direnv reload`. Guard z 200 ms mtime debounce.

- **Async telemetria, sync security.** Reguly kciukowe: jesli decyzja hooka nie wplywa na correctness, `"async": true`. Jedynie hooki podejmujace decyzje blokujace (permission gates, destructive command blocks) musza byc sync.

- **Collapse validators.** Trzy sekwencyjne Python skrypty na PreToolUse kosztuja trzy fork'i. Jeden skrypt z wewnetrznym dispatch kosztuje jeden fork. `sed | awk | python` ma 3 forki; `python -c "..."` ma 1 fork.

- **Prefer deny rules over PreToolUse scripts** dla czystych pattern-match decyzji. Deklaratywne deny skipja subprocess zupelnie.

- **Prefer `if:` nad matcher regex** dla filtrowania po argumentach. `if: "Bash(git commit *)"` wyzwala hook TYLKO gdy argumenty pasuja; regex matcher wyzwala hook i potem skrypt decyduje.

Publikowane micro-benchmarki z claudekit (numery directionally correct per raport syntezy, exact values hardware-dependent): auto-format prettier na malym pliku p50 85 ms, p95 180 ms, p99 350 ms. Black auto-format p50 110 ms, p95 220 ms, p99 400 ms. Regex deny check p50 12 ms, p95 25 ms, p99 60 ms. tsc --noEmit cold start p50 3.2 s (cold), p95 5.1 s, p99 8.4 s. tsc --noEmit warm incremental p50 180 ms, p95 420 ms, p99 900 ms. Haiku-prompt-type validator p50 650 ms, p95 1400 ms, p99 2800 ms.

Metryki do tracking'u:
- `hook_invocations_total{event, matcher, handler, decision}` - counter.
- `hook_latency_seconds{event, handler}` - histogram, alert na p95 > 1 s.
- `hook_timeout_total{event, handler}` - counter, dowolny niezerowy to bug.
- `hook_exit_code_total{event, handler, code}` - lapie drift "exit 1 where you meant 2".
- `tool_blocked_total{tool_name, reason}` - ktory hook blokowal co.
- `session_duration_seconds` + `session_context_tokens` - feed tokenizer-delta math.

## 5. Kiedy NIE uzywac hookow

Hooki sa kosztowne do utrzymania. Kazdy to kod ktory posiadasz i musisz pielegnowac przez update'y Claude Code. Przed dodaniem hooka sprawdz alternatywy:

**Alternatywa 1: permissions.deny.** Dla czystych pattern-match decyzji (zabron Bash(curl *), zabron Read(./.env)) deny-rules sa:
- **Szybsze** - bez fork subprocess, bez jq parse, bez stdin pipe.
- **Nieobchodzalne** - deny evaluated PRZED kazdym hookiem wyzwalanym.
- **Audytowalne** - jedna linia JSON zamiast jednego pliku skryptu.
- **Deklaratywne** - reviewer widzi efekt patrzac na settings.json, nie czytajac kod.

R4.8 rekomenduje hierarchie: `sandbox > permissions.deny > hooks`. Uzywaj hookow tylko dla decyzji wymagajacych dynamicznej ewaluacji (patrz na output tool, call API, czytaj baze danych). Dla "nigdy nie pozwol Claude dotknac X", deny rules bija hooki na kazdej osi.

**Alternatywa 2: Skill.** Jesli chcesz zeby Claude MIAL MOZLIWOSC zrobienia czegos (a nie zeby MUSIAL), napisz skill (frontmatter markdown w `~/.claude/skills/*.md`). Claude zawola skill gdy uzna za stosowne. Niech decyzja bedzie modela, nie twoja wpisana w hook.

**Alternatywa 3: Slash command.** Dla operacji ktore JEDNORAZOWO chcesz wykonac (nie deterministycznie na kazdym evencie), zdefiniuj command (`~/.claude/commands/*.md`). Wywolujesz je `/moj-command`.

**Alternatywa 4: Subagent.** Dla zlozonej wieloetapowej pracy (researcher + synthesizer + critic), zdefiniuj subagent w `~/.claude/agents/*.md`. Wywolanie przez Agent tool.

**Alternatywa 5: CLAUDE.md instructions.** Dla soft-preferencji ("zawsze uzywaj Bun zamiast npm", "testy trzymaj w __tests__"), wpisz do CLAUDE.md projectu. Claude je zaladuje na kazdej sesji i bedzie honorowac.

**Hooki uzywaj dla:**
- Deterministyczna kontrola (exit code MUSI zablokowac).
- Integracja z zewnetrznymi systemami (webhook, centralna audit).
- Auto-format i auto-lint (post-factum).
- Observability (JSONL append log).
- Context injection przy SessionStart/UserPromptSubmit.
- Wymuszenie jakosci gatesami (Stop z testami).

**Hooki NIE uzywaj dla:**
- Miejscach gdzie deny rule wystarcza.
- Miejscach gdzie instruction w CLAUDE.md wystarcza (soft preference).
- Logiki aplikacyjnej (to nalezy do app, nie do Claude Code).

## 6. Global vs Project vs Local - decyzja konfiguracyjna

Pytania triage'ujace decyzje (3-question mental model, najczystszy w korpusie):

1. **Czy kazdy teammate potrzebuje tego samego zachowania zeby to repo dzialalo poprawnie?** YES -> Project (committowany settings.json).
2. **Czy to jest przywiazane do TWOJEJ osoby (glos, model budget, keybindings, TTS)?** YES -> Global (~/.claude/settings.json).
3. **Czy to jest sekretne, eksperymentalne, albo machine-specific path?** YES -> Local (settings.local.json, gitignored).

Jesli zadna nie jest jednoznaczna - defaultuj Local najpierw, promote pozniej (migration pattern: eksperymentuj 1-2 tygodnie w Local, jesli dziala awansuj do Project lub Global).

Tabela typowych ustawien per warstwa:

- **Global**: TTS / notification hook, post-compact context reminder, personal default model, always-on safety denies (`Read(~/.ssh/**)`, `Bash(sudo *)`) - podrozuje miedzy repo, tablice konkatenuja, project moze dodac wiecej ale nie moze oslabic.
- **Project**: version-protection hook (block edits to `dist/`, `v32/`), build/test runners, lint hooks, project MCP allowlist, secret file deny rules (`Read(./.env)`, `Read(./secrets/**)`), `permissions.defaultMode: "plan"`.
- **Local**: personal API keys w `env`, eksperymentalny prototyp hooka, personal override projectowego modelu.
- **Managed**: org-wide minimum CLI version, `Bash(curl *)` deny, block rogue hooks - HARD LAW.

Teams startujace z hookami spodziewaj sie 80% Project, 15% Global, 5% Local. Zbyt duzo Global = walcie warstwy. Zbyt duzo Local = team nie ma spojnosci.

Merge semantyka (przypomnienie): skalary nadpisuja (highest layer wygrywa dla `model`, `language`), tablice KONKATENUJA I DEDUPLIKUJA (dla `permissions.*`, `allowedHttpHookUrls`), obiekty GLEBOKKO MERGUJA (dla `hooks`, `env`). Hooki aggreguja - wszystkie warstwy, deduplikacja po command string lub URL, pasujace uruchamiaja rownolegle. Pusty `"hooks": {}` w nizszej warstwie NIE usuwa hooka z wyzszej - merge jest additywny. Zeby wyzerowac, potrzebujesz `"disableAllHooks": true` (zostawia managed) lub `"allowManagedHooksOnly": true` (tylko w managed).

Invariant security: lower-layer `allow` NIE moze nadpisac higher-layer `deny`. Hooki moga tylko zawezac, nigdy rozluzniac. Umieszczaj safety denies w Managed lub globalnym User.

## 7. Areas of uncertainty - 12 open questions

Synteza kampanii "Research Hooks Best Practices 2026" zidentyfikowala 12 obszarow ktorych nie udalo sie rozstrzygnac z dostepnych zrodel. Jesli stawiasz hooka produkcyjnego w ktorymkolwiek z tych obszarow, zweryfikuj przed zaufaniem:

**Question 1: Dokladne numery wersji Claude Code CLI dla nowych eventow z okna 2026-04.** Tabela synthesisu atrybuuje `PreCompact` blockable do v2.1.105, `PermissionDenied.retry` do v2.1.90, i tak dalej. Niektore numery wersji per event sa UNVERIFIED - kierunkowa kolejnosc (te eventy landowaly w kwietniu 2026) jest reliable, exact version per event nie.

**Question 2: CVE IDs dla hook-related advisories.** W zrodlach pojawily sie identyfikatory `CVE-2025-59536` i `CVE-2026-21852` jako rzekomo powiazane z hookami Claude Code. Ani jeden nie byl znaleziony w MITRE CVE database w momencie wykonania syntezy. Traktuj jako UNVERIFIED - prawdopodobnie sfabrykowane identyfikatory. Nie cytuj w produkcyjnym threat model bez niezaleznej weryfikacji w NVD albo w anthropic security advisories.

**Question 3: Beta header exact strings.** Zrodla wspominaja `output-300k-2026-03-24` (dla 300k output w Batch API) i `task-budgets-2026-03-13` (dla task budgets beta). Featury istnieja, exact header strings nie zostaly zweryfikowane. Sprawdz `anthropic-beta` header list w aktualnych SDK docs.

**Question 4: Haiku 4.5 prompt-cache read ratio.** Synthesis wspomina "10x tanszy" cache-read dla Haiku 4.5. Skala (80% redukcji kosztow z cachingu) brzmi plausibly, ale eksak ratio moze sie roznic od obietnicy marketingowej. Zweryfikuj na oficjalnej stronie pricingu Anthropic.

**Question 5: Tool-use token overhead exact values.** Synthesis wspomina 346 tokens auto/none + 313 tokens any/tool overhead per tool call. Te liczby nie zostaly zweryfikowane; overhead istnieje, magnituda uncertain. Uzyj `client.messages.count_tokens` dla ground-truth w twoim workloadzie przed budzetowaniem kosztow.

**Question 6: SWE-bench / Terminal-Bench exact decimals dla Opus 4.7.** Anthropic benchmarks raportuja "+13% coding performance" vs 4.6. Exact decimals (rzekomo SWE-bench Pro 64.3%, SWE-bench Verified 87.6%, Terminal-Bench 69.4%) UNVERIFIED. Kierunkowe +13% trzyma sie.

**Question 7: Scoped MCP per subagent frontmatter schema.** Zrodla wspominaja ze subagent frontmatter moze deklarowac wlasne `mcpServers` (researcher widzi tylko `mcp__memory__*`, writer widzi tylko `mcp__filesystem__*`). Feature istnieje; exact key shape (`mcpServers` vs `mcp.servers` vs `mcpScopes`) potrzebuje weryfikacji w aktualnych subagent docs.

**Question 8: allowedHttpHookUrls wildcard semantics.** Synthesis rekomenduje bez wildcards na production scope. Czy Claude Code wspiera `https://hooks.corp.example/*` glob, exact-match, albo full regex - nie jest explicit w zrodlach. Test przed poleganiem.

**Question 9: disableAllHooks exception for managed hooks.** Zrodla mowia ze managed hooki nadal sie wyzwalaja przy `disableAllHooks: true`. Czy to jest semantycznie identyczne z `allowManagedHooksOnly: true` (nuclear enterprise flag) czy softer exception - potrzebuje empirycznego testu na managed-settings install.

**Question 10: TaskOutput tool removal exact date.** Synthesis mowi v2.1.83. Jesli uzytkownicy maja hooki matchujace `PostToolUse: TaskOutput`, potrzebuja accurate cutover version dla migration scheduling. Sprawdz actual Claude Code changelog.

**Question 11: Plan file naming scheme.** Zrodla wspominaja ze v2.1.111 nadaje plan files nazwy typu `fix-auth-race-snug-otter.md`. Feature exists; exact naming template nie zostal skorroborowany. Wazne jesli hooki matchuja plan-file paths.

**Question 12: Exact stop_hook_active semantics.** Field `stop_hook_active` jest kluczowy do unikania nieskonczonych petli w `Stop` hookach ktore exit 2 aby wymusic "keep working". Boolean jest udokumentowany; exact set eventow ktore clearja/setuja go (czy PreCompact clear? czy nested Stop preserves?) nie jest covered w syntezie i matters dla self-healing loop design.

Dla kazdego z tych questions: jesli Twoj hook produkcyjny polega na zachowaniu, RUN a smoke test przed deploymentem. Proste skrypty testowe - podaj fake event JSON przez stdin, sprawdz stdout i exit code.

## 8. CVE notes - znane luki bezpieczenstwa

Raport security R4 wymienil dwa CVE identyfikatory jako powiazane z systemem hookow Claude Code:

**CVE-2025-59536** - UNVERIFIED. Opis z R4: prompt-injection variant pozwalajacy eksfiltracje transkryptu przez zle skonfigurowane HTTP hooki. Status: nie znaleziono w MITRE CVE database w momencie wykonania syntezy (2026-04-17). Critic flagged jako prawdopodobnie sfabrykowany identyfikator. NIE cytuj w produkcyjnym threat model bez niezaleznej weryfikacji.

**CVE-2026-21852** - UNVERIFIED. Opis z R4: command-injection przez tool_input ktory jest interpolowany do shella w naiwnych hookach. Status: nie znaleziono w MITRE. Critic flagged jako prawdopodobnie sfabrykowany identyfikator. NIE cytuj bez weryfikacji.

Mimo ze oba CVE identifiers moga byc nieprawdziwe, leza w nich prawdziwe klasy vulnerabilities - command injection i prompt injection sa generic vulnerability classes ktore realnie dotycza hookow Claude Code. Poprawna reakcja: nie polegaj na konkretnych CVE numerach, stosuj hardening checklist z rozdzialu 3 (input validation, sandbox, least privilege, audit trail, fail-closed).

Do sprawdzenia niezaleznie: Anthropic security advisories, NVD/MITRE database searchem po "claude-code", subskrypcja advisory mailing list Anthropic.

## 9. Szybkie przypomnienie fundamentow

Zeby nie trzeba bylo czytac Lekcji 1, kluczowe pojecia w pigulce:

**Hook** - uzytkownicki callback wyzwalany w 28 eventow cyklu zycia Claude Code. Konfigurowany w settings.json. Wykonuje realny kod (command/http/prompt/agent), ma wladze przez exit code albo strukturalny JSON.

**Event** - moment wyzwolenia: SessionStart/End, UserPromptSubmit, PreToolUse/PostToolUse, Stop/Notification, PreCompact/PostCompact, SubagentStart/Stop, TaskCreated/Completed, PermissionRequest/Denied, Elicitation/ElicitationResult, ConfigChange, InstructionsLoaded, CwdChanged, FileChanged, WorktreeCreate/Remove, StopFailure, PostToolUseFailure, Setup, TeammateIdle.

**Matcher** - glob/regex/pipe-list okreslajacy ktore wywolania pasuja. `"Bash"` literal, `"Edit|Write"` OR list, `"^mcp__"` regex.

**Handler types** - `command` (domyslny timeout 600 s), `http` (30 s), `prompt` (30 s, Haiku domyslnie), `agent` (60 s, 50 tool-turns limit).

**Exit codes** - 0 sukces, 1 NIEBLOKUJACY blad (pulapka!), 2 BLOKUJACY. Tylko exit 2 blokuje. Exit 1 jest non-blocking per spec.

**Settings precedence** - Managed (hard law) > CLI > Local (gitignored personal) > Project (committed team) > User (global personal).

**Merge semantyka** - skalary nadpisuja, tablice konkatenuja + deduplikuja, obiekty glebokko merguja. Hooki aggreguja + deduplikuja po command string/URL, pasujace uruchamiaja sie rownolegle.

**Security invariant** - higher-layer `deny` nigdy nie przegrywa z lower-layer `allow`. Hooki moga tylko zawezac, nigdy rozluzniac.

## 10. Podsumowanie - checklista "produkcyjny hook"

Zanim wdrozyc hooka do produkcji - kazdy musi przejsc ponizsza checklista:

1. [ ] Uzywa `exit 2` do blokowania (nigdy exit 1).
2. [ ] Uzywa `set -euo pipefail` (jesli Bash).
3. [ ] Cytuje `$CLAUDE_PROJECT_DIR` w kazdej sciezce.
4. [ ] Nie interpoluje `tool_input.command` bezposrednio do shella.
5. [ ] Canonicalize ka zda sciezke pliku i reject gdy escape outside project.
6. [ ] Ma explicit `timeout` (5s telemetry, 30s validators, 180s test suites).
7. [ ] Uzywa `async: true` gdzie decyzja nie blokuje correctness.
8. [ ] Sprawdza `stop_hook_active` w Stop hookach (unikanie nieskonczonej petli).
9. [ ] Pin `allowedHttpHookUrls` i `httpHookAllowedEnvVars` w User/Managed jesli uzywa HTTP.
10. [ ] Hardcoded sciezki personal -> `$CLAUDE_PROJECT_DIR`.
11. [ ] Guard strukturaly specyficzny dla jezyka (`[ -f "$CLAUDE_PROJECT_DIR/package.json" ]`).
12. [ ] Brak sekretow w settings.json (uzyj apiKeyHelper, local env, managed secret store).
13. [ ] ConfigChange audit trail logujacy kazda zmiane settings.
14. [ ] Latency p95 < 500 ms na hot-path eventach (PreToolUse, PostToolUse).
15. [ ] Fail-closed defaults (na niepewnosc block, nie allow).
16. [ ] Dokumentacja w commicie co hook robi i dlaczego.
17. [ ] Smoke test: `echo '{"tool_name":"Bash","tool_input":{"command":"ls"}}' | ./hook.sh; echo "exit=$?"`.
18. [ ] Reguly deny/sandbox sa preferowane jesli decyzja jest czysto pattern-match.

Claude Code hooki sa najwyzsza warstwa deterministycznej kontroli nad agentem AI - silne, ale kosztowne. Uzywaj ich madrze, miksuj z `permissions.deny` i `sandbox`, mierzy latency, audit'uj zmiany, fail-closed. Kiedy pasuja, daja bezkonkurencyjna kontrole; kiedy sa nadmiarowe, dodaja latency i powierzchnie bledu.

Ta lekcja byla ostatnia z trzech. Lekcja 1 (Fundamenty) wprowadzila 28 eventow, 4 handler types, exit codes, precedensja. Lekcja 2 (Wzorce) pokazala 13 konkretnych wzorcow z dzialajacym kodem. Lekcja 3 (Przewodnik decyzyjny) - ta - omowila trade-offs, anti-patterns, hardening i open questions. Wspolnie tworza destylat corpus "Research Hooks Best Practices 2026" zrozumialy dla NotebookLM bez dostepu do internetu.
