# Claude Code Hooks - Fundamenty (Lekcja 1)

Dokument edukacyjny o fundamentach systemu hookow w Claude Code. Wersja dokumentu: 2026-04-17. Zrodlo kanoniczne: raport syntezy kampanii "Research Hooks Best Practices 2026", zwalidowany przez agenta Critic. Ta lekcja jest samodzielna - nie wymaga czytania innych dokumentow ani dostepu do internetu. Zawiera slownik pojec, liste 28 eventow cyklu zycia, opis czterech typow handlerow, filozofie kodow wyjscia i drabine precedensji ustawien.

## 1. Co to jest hook w Claude Code

Hook w Claude Code to uzytkownicki callback, czyli kawalek kodu, ktory uruchamia sie w scisle okreslonym momencie cyklu zycia agenta AI. Hook wykonuje prawdziwy kod (skrypt Bash, Python, wywolanie HTTP, prompt do modelu Haiku, lub pelnoprawny subagent) synchronicznie lub asynchronicznie i ma wladze nad tym, co Claude zrobi dalej. Ta wladza realizuje sie na dwa sposoby: przez kod wyjscia procesu (exit code) oraz przez strukturalny JSON wypisany na standardowe wyjscie.

Najwazniejsze rozroznienie: hook NIE jest tym samym co prompt engineering, regula w pliku CLAUDE.md ani instrukcja systemowa. Prompty i reguly sa doradcze - model moze je zignorowac. Hook wykonuje sie deterministycznie. Jesli hook PreToolUse zwroci exit code 2, Claude nie wykona narzedzia Edit. Kropka. To jest wlasciwa warstwa kontroli deterministycznej nad agentem.

Analogia do git hooks jest poprawna tylko czesciowo. Git hooks sa lokalnymi skryptami (pre-commit, post-commit, pre-push) ktore git uruchamia w kluczowych momentach cyklu zycia repozytorium. Podobnie hook w Claude Code uruchamia sie w kluczowym momencie cyklu zycia sesji agenta (SessionStart, PreToolUse, Stop, PreCompact). Roznica: hooki git najczesciej maja tylko jeden sposob zablokowania operacji (exit non-zero), a hooki Claude Code maja cala architekture (matcher, precedensja, JSON response, cztery typy handlerow, trzy warstwy konfiguracji). Lepsza analogia to middleware w frameworkach webowych (Express, Django): kazde zadanie HTTP przechodzi przez lancuch middleware, kazdy middleware moze je zmodyfikowac, zablokowac, zalogowac, przepuscic dalej. Hook Claude Code dziala identycznie dla wywolan narzedzi, promptow uzytkownika i granic sesji.

Hooki sa glowna deterministyczna warstwa kontrolna dla agenta. Istnieje tez druga warstwa - `permissions.deny` w settings.json, ktora jest jeszcze szybsza i nieobchodzalna przez zle skonfigurowane hooki. Jest tez trzecia warstwa - `sandbox` - deklaratywna, najszersza. Dobrze zaprojektowany system bezpieczenstwa uzywa wszystkich trzech: sandbox dla szerokiej redukcji powierzchni ataku, permissions.deny dla precyzyjnych regul dostepu, hooks dla dynamicznych decyzji wymagajacych kodu (na przyklad zapytanie do LLM, skanowanie AST, walidacja kontekstowa).

Hooki konfiguruje sie w pliku settings.json pod kluczem "hooks". Kazdy event ma nazwe (PreToolUse, PostToolUse, SessionStart, Stop, i tak dalej - 28 eventow lacznie), a pod nazwa eventu jest tablica grup matcherow. Kazda grupa matchera ma pole "matcher" (wzorzec) i tablice "hooks" (lista obiektow hooka). Kiedy event sie wyzwala, Claude Code sprawdza wszystkie grupy matcherow, a dla kazdej grupy ktorej matcher pasuje - uruchamia wszystkie hooki z tablicy "hooks" rownolegle. Identyczne polecenia (to samo pole "command") sa deduplikowane miedzy warstwami settings.json.

## 2. 28 eventow cyklu zycia - przeglad rodzin

Claude Code 2026 wystawia 28 udokumentowanych eventow cyklu zycia. Kazdy event ma wlasny moment wyzwolenia, wlasny zestaw danych w JSON na stdin i wlasna semantyke blokowania (nie kazdy event mozna zablokowac exit code 2). Pogrupowane w rodziny:

### 2.1 Rodzina Session - granice sesji

- **SessionStart** - wyzwala sie raz, na poczatku sesji lub po jej wznowieniu. Jego matcher akceptuje wartosci `startup`, `resume`, `clear`, `compact`. Nie blokuje exit code 2. Typowe zastosowanie: wstrzykniecie kontekstu (git status, biezacy sprint, przypomnienie "uzywaj Bun nie npm"), ustawienie zmiennych srodowiskowych przez specjalny plik CLAUDE_ENV_FILE. Hook SessionStart jest miejscem, gdzie integruje sie direnv z Claude Code.

- **SessionEnd** - wyzwala sie raz, gdy sesja sie konczy. Matcher akceptuje `clear`, `resume`, `logout`, `prompt_input_exit`, `bypass_permissions_disabled`, `other`. Nie blokuje. Typowe zastosowanie: flush metryk do bazy, zamkniecie polaczenia, cleanup plikow scratch.

### 2.2 Rodzina Prompt - input uzytkownika

- **UserPromptSubmit** - wyzwala sie raz na ture, ZANIM Claude przetworzy prompt uzytkownika. Nie ma matchera (zawsze sie wyzwala). BLOKUJE exit code 2 (wtedy prompt jest wymazany i Claude nie zobaczy go). Typowe zastosowanie: redakcja sekretow z promptu, wstrzykniecie dodatkowego kontekstu. Mozna tez zwrocic JSON z polem `hookSpecificOutput.additionalContext`, ktore zostanie dopisane do promptu.

### 2.3 Rodzina Tool - wywolania narzedzi

Tu jest serce systemu hookow. Wiekszosc produkcyjnych uzyc dotyczy tej rodziny.

- **PreToolUse** - wyzwala sie per kazde wywolanie narzedzia, ZANIM narzedzie zostanie wykonane. Matcher to nazwa narzedzia (`Bash`, `Edit`, `Write`, `Edit|Write` jako lista OR, `mcp__github__.*` jako regex). BLOKUJE exit code 2 - wywolanie narzedzia jest anulowane, stderr jest zwracany Claude'owi. Hook moze tez zwrocic JSON z `hookSpecificOutput.updatedInput` aby zmodyfikowac argumenty narzedzia, lub z `permissionDecision: "deny"/"allow"/"ask"/"defer"`. To wlasnie PreToolUse jest miejscem na blokowanie destruktywnych komend Bash, ochrony plikow, walidacji argumentow, elicitacji z fast-model Haiku.

- **PostToolUse** - wyzwala sie per wywolanie narzedzia, PO jego udanym wykonaniu. Matcher - nazwa narzedzia. BLOKUJE exit code 2, ale uwaga: narzedzie juz sie wykonalo, nie da sie cofnac (np. plik juz zostal zapisany). Blokowanie po fakcie oznacza tylko pokazanie bledu Claude'owi. Typowe zastosowanie: auto-format kodu po Edit/Write (prettier, black, gofmt), auto-run testow, logowanie do JSONL, wyzwalanie lintera.

- **PostToolUseFailure** - wyzwala sie per wywolanie narzedzia, ale tylko gdy wywolanie SIE NIE UDALO. Matcher - nazwa narzedzia. NIE blokuje. Typowe zastosowanie: telemetria bledow, retry logic.

### 2.4 Rodzina Agent - subagenty i zadania

- **SubagentStart** - wyzwala sie, gdy Claude spawnuje subagenta. Matcher - typ agenta. Nie blokuje. Zastosowanie: tracking rownoleglej pracy w observability.

- **SubagentStop** - wyzwala sie, gdy subagent konczy prace. BLOKUJE exit code 2 (zatrzymanie subagenta nie zachodzi, musi kontynuowac). Zastosowanie: agregacja wynikow, bramy jakosci, wymuszenie "testy musza przejsc zanim subagent skonczy".

- **TaskCreated** - wyzwala sie, gdy nowe zadanie jest tworzone (przez narzedzie TaskCreate w Agent SDK). BLOKUJE exit code 2 (tworzenie zadania zostaje cofniete). Zastosowanie: walidacja "czy ticket istnieje zanim Claude utworzy zadanie".

- **TaskCompleted** - wyzwala sie, gdy zadanie jest oznaczone jako ukonczone. BLOKUJE (zapobiega zamknieciu). Zastosowanie: bramy akceptacji.

- **TeammateIdle** - wyzwala sie, gdy teammate w agent-team ma przejsc w idle. BLOKUJE. Zastosowanie: re-assigning pracy.

### 2.5 Rodzina Permissions - autoryzacja

- **PermissionRequest** - wyzwala sie, kiedy mialby pojawic sie dialog permission prompt. Matcher - nazwa narzedzia. BLOKUJE exit code 2 (odmowa permission). Zastosowanie: niestandardowe reguly allow/deny, auto-approve znanych-bezpiecznych wzorcow.

- **PermissionDenied** - wyzwala sie, kiedy klasyfikator trybu Auto odmowi operacji. Matcher - nazwa narzedzia. NIE blokuje (juz zostalo odmowione). Mozna zwrocic `{retry: true}` w JSON aby pozwolic modelowi sprobowac ponownie (nowe w v2.1.90). Zastosowanie: audit trail odmow, auto-retry dla trybu Auto Max-tier.

### 2.6 Rodzina Notification - powiadomienia

- **Notification** - wyzwala sie, gdy Claude wysyla powiadomienie do uzytkownika. Matcher: `permission_prompt`, `idle_prompt`, `auth_success`, `elicitation_dialog`. NIE blokuje. Zastosowanie: desktop toast, TTS, Slack, Telegram, ntfy.sh, BurntToast na Windows, notify-send na Linux, osascript na macOS.

- **Stop** - wyzwala sie raz na ture, gdy Claude konczy odpowiadac. Nie ma matchera. BLOKUJE exit code 2 (zapobiega zatrzymaniu, wymusza "keep working"). Zastosowanie: "Task complete" TTS, LLM-generated summary, self-healing loop "pracuj dopoki testy nie przejda". Uwaga: trzeba strzec sie nieskonczonych petli przez pole `stop_hook_active` w input JSON.

- **StopFailure** - wyzwala sie, gdy tura konczy sie z powodu bledu API. Matcher: `rate_limit`, `authentication_failed`, `billing_error`, `invalid_request`, `server_error`, `max_output_tokens`, `unknown`. NIE blokuje. Zastosowanie: alerty, observability.

### 2.7 Rodzina Compact - kompaktowanie kontekstu

- **PreCompact** - wyzwala sie przed kompaktowaniem kontekstu. Matcher: `manual` (uzytkownik uruchomil `/compact`) lub `auto` (Claude Code auto-kompaktuje bo zblizyl sie do limitu). BLOKUJE exit code 2 (od wersji v2.1.105 - wczesniej nie blokowalo). Zastosowanie: archiwizacja transkryptu zanim bedzie stracony, ochrona cennego kontekstu przed skasowaniem.

- **PostCompact** - wyzwala sie po kompaktowaniu. Matcher: `manual` lub `auto`. NIE blokuje. Zastosowanie: re-inject kluczowego kontekstu po kompakcji (przypomnienie zasad projektu, przypomnienie biezacego zadania).

### 2.8 Eventy konfiguracyjne i filesystemowe

- **InstructionsLoaded** - wyzwala sie, gdy CLAUDE.md lub `.claude/rules/*.md` jest ladowany. Matcher: `session_start`, `nested_traversal`, `path_glob_match`, `include`, `compact`. NIE blokuje. Zastosowanie: audit co Claude zaladowal do pamieci.

- **ConfigChange** - wyzwala sie, gdy plik konfiguracyjny sie zmienia. Matcher: `user_settings`, `project_settings`, `local_settings`, `policy_settings`, `skills`. BLOKUJE exit code 2 (zmiana nie zachodzi). Zastosowanie: enforce polityki administratora, audit trail zmian settings.json.

- **CwdChanged** - wyzwala sie, gdy cwd sie zmienia. Nie ma matchera. NIE blokuje. Zastosowanie: przeladowanie env (integracja z direnv przez CLAUDE_ENV_FILE).

- **FileChanged** - wyzwala sie, gdy obserwowany plik sie zmieni. Matcher: literalne nazwy plikow oddzielone `|` (UWAGA: to NIE jest regex, to literal match z pipe). NIE blokuje. Zastosowanie: reload env vars gdy .envrc sie zmieni.

- **WorktreeCreate** - wyzwala sie, gdy tworzony jest worktree git. Nie ma matchera. BLOKUJE (kazdy non-zero exit anuluje tworzenie). Zastosowanie: niestandardowy layout worktreow, integracja z Agent tool `isolation.worktree: true`. Hook moze zwrocic `worktreePath` w JSON.

- **WorktreeRemove** - wyzwala sie, gdy worktree jest usuwany. Nie ma matchera. NIE blokuje. Zastosowanie: cleanup.

- **Elicitation** - wyzwala sie, gdy serwer MCP zada inputu od uzytkownika. Matcher - nazwa serwera MCP. BLOKUJE (odmowa elicitacji). Zastosowanie: polityki organizacyjne odrzucajace niebezpieczne prosby MCP.

- **ElicitationResult** - wyzwala sie po odpowiedzi uzytkownika na elicitation. Matcher - nazwa serwera MCP. BLOKUJE (zamienia odpowiedz na odmowe). Zastosowanie: redakcja odpowiedzi przed wyslaniem do serwera MCP.

- **Setup** - wyzwala sie podczas setup sesji (tylko TypeScript SDK). Nie blokuje. Zastosowanie: inicjalizacja.

Kazdy event ma wspolne pola w JSON na stdin: `session_id`, `transcript_path`, `cwd`, `permission_mode`, `hook_event_name`, oraz w przypadku subagenta `agent_id` i `agent_type`. Eventy rodziny Tool dodaja `tool_name` i `tool_input`. UserPromptSubmit dodaje `prompt`. SessionStart dodaje `source`. Stop i SubagentStop dodaja `stop_hook_active`. ConfigChange dodaje `source` i `file_path`.

## 3. Cztery typy handlerow - Command, HTTP, Prompt, Agent

Kazdy obiekt hooka ma pole `type`, ktore mowi jakim rodzajem procesu jest obslugiwany. Istnieja cztery typy, kazdy z innym profilem uzycia, innymi domyslnymi timeoutami i innym modelem kosztowym:

- **type: command** - najprostszy i najpowszechniejszy typ hooka. Uruchamia polecenie shella (Bash, Python, Node, dowolny wykonywalny plik). Na stdin dostaje JSON z eventem. Na stdout moze zwrocic JSON ze struktura kontrolna. Exit code decyduje o blokowaniu. Domyslny timeout: 600 sekund (10 minut). UWAGA: w literaturze spotyka sie mylne twierdzenie, ze domyslny timeout to 60 sekund - to jest blad, zweryfikowane zrodla kanoniczne mowia 600 sekund. Uzywaj command dla deterministycznej polityki, lokalnych skryptow, integracji z CLI (prettier, black, ruff, tsc, pytest).

- **type: http** - hook wysyla POST do zdalnego URL z eventem jako body. Zdalny serwis odpowiada JSONem w tym samym schemacie co stdout dla command. Domyslny timeout: 30 sekund. Uzywaj http dla flota-wide audit (centralny logger), centralnej polityki (serwer korporacyjny ktory decyduje o blokowaniu), dashboardow observability. UWAGA bezpieczenstwa: http hooki sa glowny wektor eksfiltracji danych - kazdy tool input moze trafic na zewnetrzny serwer. Pin `allowedHttpHookUrls` i `httpHookAllowedEnvVars` w warstwie User albo Managed.

- **type: prompt** - hook wysyla prompt do szybkiego modelu (domyslnie Haiku). Odpowiedz modelu musi byc JSONem `{ok: true/false, reason: "..."}`. Domyslny timeout: 30 sekund. Uzywaj prompt dla decyzji wymagajacych judgmentu ktorych deterministyczne reguly nie oddaja (czy ten commit message jest dobry, czy ta komenda Bash jest niebezpieczna w kontekscie projektu, czy ten prompt uzytkownika pachnie injektakiem). W szablonie promptu mozna uzyc `$ARGUMENTS` ktore zostaje zastapione kontekstem eventu. Koszt: Haiku 4.5 to 1 USD/MTok input + 5 USD/MTok output, co daje okolo 0.003 USD na event przy 2k input i 200 output.

- **type: agent** - hook spawna pelnoprawnego subagenta z limitem 50 tool-turns. Subagent ma dostep do plikow i komend, nie tylko do LLM. Odpowiada JSONem `{ok, reason}`. Domyslny timeout: 60 sekund. Uzywaj agent dla weryfikacji ktora MUSI czytac pliki lub uruchamiac komendy (np. "uruchom testy przed pozwoleniem Claude skonczyc"). Najbardziej kosztowny typ w tokenach; uzywaj oszczednie, zwlaszcza na eventach wysokiej czestotliwosci jak PreToolUse.

Tabela porownawcza typow handlerow (domyslne timeouty sa kluczowe do zapamietania):

| Typ | Input | Output | Default timeout | Uzyj gdy |
|-----|-------|--------|-----------------|----------|
| command | JSON na stdin | exit code + stdout + stderr | 600 s | deterministyczna polityka, lokalne skrypty |
| http | JSON jako POST body | JSON response | 30 s | centralny audit, flota, dashboardy |
| prompt | prompt z $ARGUMENTS | {ok, reason} | 30 s | judgment bez dostepu do plikow |
| agent | prompt + dostep do narzedzi | {ok, reason} | 60 s | weryfikacja wymagajaca czytania plikow |

Pola wspolne dla wszystkich typow: `timeout` (override default), `statusMessage` (custom spinner text), `once` (run once per session, tylko skills), `async` (fire-and-forget, nie blokuje tury), `if` (filter permission-rule syntax, tylko dla tool events, v2.1.85+). Dodanie `if` do non-tool eventu po cichu wylacza hooka.

## 4. Kody wyjscia - filozofia 0, 1, 2

Kody wyjscia to najczesciej popelniany blad implementacyjny w calym ekosystemie hookow Claude Code. Kazdy zasob spolecznosciowy ostrzega przed tym bledem, kazdy implementator i tak w niego wpada. Zasady:

- **exit 0** - sukces. Stdout jest parsowane jako JSON (lub dla UserPromptSubmit i SessionStart dopisywane do kontekstu jako plain text). Jesli stdout jest pusty, hook po prostu zakonczyl sie pomyslnie bez akcji kontrolnej.

- **exit 1** - blad NIEBLOKUJACY. Transkrypt pokazuje jednolinijkowa informacje ("hook returned exit 1"), ale akcja (wywolanie narzedzia, prompt, stop) PRZEBIEGA DALEJ. Stdout i JSON sa IGNOROWANE. To jest pulapka: 1 to konwencjonalny Unixowy kod bledu, wiec kazdy probuje blokowac przez exit 1. To NIE DZIALA. Jesli pisze hook ktory ma blokowac operacje i wpisze `exit 1`, operacja sie wykona, a na ekranie bedzie notatka o bledzie - najgorszy z mozliwych rezultatow.

- **exit 2** - blad BLOKUJACY. To jest JEDYNY sposob zablokowania akcji przez kod wyjscia. Stderr jest zwracany Claude'owi (dla tool events) lub pokazywany uzytkownikowi (dla non-tool events). JSON na stdout NIE jest parsowany. Uzywaj zawsze gdy chcesz zablokowac.

- **inne kody** - traktowane jak exit 1 (nieblokujace).

Jesli uzywasz `bash set -e` (exit on error), pamietaj ze to przeklada nieobslugiwany blad shella na exit 1, czyli WARNING zamiast BLOCK. Uzywaj `set -euo pipefail` i wyrzucaj explicit `exit 2` w miejscach gdzie chcesz blokowac.

Dlaczego exit 2? To historyczna konwencja w Unixie: exit 0 sukces, exit 1 zwykly blad, exit 2 "misuse of shell builtins" lub "szczegolny blad semantyczny". Anthropic wybralo exit 2 jako kanalowy sygnal "specjalnego" bledu ktory blokuje, zeby nie kolidowac ze zwyklymi bledami programow wywolywanych w hookach.

Alternatywa dla exit 2 jest strukturalny JSON zwrocony przy exit 0:

```json
{
  "continue": true,
  "stopReason": "wiadomosc gdy continue false",
  "suppressOutput": false,
  "systemMessage": "ostrzezenie inline",
  "decision": "block",
  "reason": "powod dla Claude",
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "...",
    "updatedInput": { "field": "new_value" },
    "additionalContext": "dodatkowy kontekst",
    "retry": true
  }
}
```

Sciezka exit 2 i sciezka JSON-na-exit-0 sa WZAJEMNIE WYKLUCZAJACE. Wybierz jedna na hook, nigdy nie miksuj. Mieszanie produkuje niezdefiniowane zachowanie.

Dla PreToolUse, kiedy kilka hookow pasuje i zwracaja rozne decyzje, precedensja jest: `deny > defer > ask > allow`. Hook moze zawezic (tightening) uprawnienia, nigdy nie moze ich rozluznic (loosening). To jest niezmiennik bezpieczenstwa: `allow` z hooka NIE nadpisuje `deny` z settings.json. Ta regula pozostaje nienaruszalna od wersji v2.1.98.

## 5. Drabina precedensji ustawien

Hooki i wszystkie inne ustawienia Claude Code sa rozproszone w piciu warstwach konfiguracji. Warstwy ukladaja sie w drabine precedensji, od najwyzszej do najnizszej:

1. **Managed** - najwyzsza warstwa. Polityka administratora/organizacji. Na macOS w `/Library/Application Support/ClaudeCode/managed-settings.json`, na Linux/WSL w `/etc/claude-code/managed-settings.json`, na Windows w `C:\Program Files\ClaudeCode\managed-settings.json` lub w rejestrze `HKLM\SOFTWARE\Policies\ClaudeCode`. Managed jest HARD LAW - nie moze byc oslabione przez nizsze warstwy. Jesli admin zabroni `Bash(curl *)`, projekt ani lokalna konfiguracja nie moga tego cofnac.

2. **Command line** - flagi CLI (na przyklad `--model sonnet`, `--permission-mode plan`). Obowiazuja tylko w tej sesji.

3. **Local** - `<repo>/.claude/settings.local.json`. To jest Twoj personalny plik w tym repo, automatycznie dodany do `.gitignore`. Trafiaja tu: klucze API, eksperymentalne hooki, osobiste override'y.

4. **Project** - `<repo>/.claude/settings.json`. Plik committowany do git, wspolny dla calego zespolu. Tu trafiaja: reguly budowania, hooki quality-gate, projektowe MCP allowlists, ochrona wersjonowanych folderow.

5. **User (Global)** - `~/.claude/settings.json`. Twoj personalny plik globalny, dziala w kazdym repo. Tu trafiaja: osobiste preferencje (TTS, motyw), uniwersalne safety denies (`Read(~/.ssh/**)`, `Bash(sudo *)`), personalny wybor modelu.

Istnieja tez dodatkowe lokalizacje: `hooks/hooks.json` wewnatrz pluginu, `<repo>/.mcp.json` dla konfiguracji MCP projektu, `~/.claude.json` dla personalnych ustawien typu OAuth, motyw, per-project trust (to NIE jest settings.json).

Na Windows dodatkowo dziala rejestr: `HKLM\SOFTWARE\Policies\ClaudeCode` dla adminskiej polityki calego systemu, `HKCU\SOFTWARE\Policies\ClaudeCode` dla polityki konkretnego uzytkownika.

Managed ma tez konwencje drop-in podobna do systemd: plik bazowy `managed-settings.json`, a obok katalog `managed-settings.d/` z plikami `*.json` sortowanymi alfabetycznie (z numerycznymi prefiksami typu `10-telemetry.json`, `20-security.json`). Kazdy kolejny plik merguje sie na gore - pozniejsze pliki nadpisuja skalary, tablice sa konkatenowane, obiekty glebokko mergowane.

Merge nie jest zwyklym nadpisywaniem. Jest TYPOWO-ZALEZNY:
- Skalary (`model`, `language`, `defaultShell`): najwyzsza warstwa wygrywa.
- Tablice (`permissions.allow`, `permissions.deny`, `permissions.additionalDirectories`, `allowedHttpHookUrls`, `httpHookAllowedEnvVars`): KONKATENOWANE I DEDUPLIKOWANE ze wszystkich warstw.
- Obiekty (`hooks`, `env`, `enabledPlugins`, `sandbox.network`): glebokko mergowane.
- Hooki (specjalna regula): wszystkie wpisy ze wszystkich warstw sie agreguja, `type: command` deduplikowane po stringu komendy, `type: http` deduplikowane po URL, pasujace hooki uruchamiaja sie rownolegle.

Ma to kluczowa konsekwencje bezpieczenstwa: `permissions.deny` z wyzszej warstwy NIE MOZE byc nadpisany przez `permissions.allow` z nizszej warstwy. Umieszczaj safety denies jak najwyzej (Managed lub globalny User), a projektowe konkretne denies w Project. To daje strategie defense-in-depth.

Pusty `"hooks": {}` w nizszej warstwie NIE usuwa hookow z wyzszej warstwy (merge jest additywny). Zeby wylaczyc wszystkie hooki, potrzebujesz `"disableAllHooks": true` (nuklearne - zostawia tylko managed hooki) lub `"allowManagedHooksOnly": true` (tylko w managed - blokuje wszystko co nie jest managed/SDK/force-enabled-plugin).

## 6. Kontrakt JSON hooka - co wchodzi, co wychodzi

Kazdy hook dostaje na stdin obiekt JSON z eventem. Pola wspolne:

```json
{
  "session_id": "uuid",
  "transcript_path": "/sciezka/do/transcript.jsonl",
  "cwd": "/sciezka/do/projektu",
  "permission_mode": "default|plan|acceptAll|bypassPermissions",
  "hook_event_name": "PreToolUse",
  "agent_id": "opcjonalne",
  "agent_type": "opcjonalne"
}
```

Dla eventow rodziny Tool dochodza pola:

```json
{
  "tool_name": "Bash",
  "tool_input": { "command": "ls -la" }
}
```

Dla UserPromptSubmit:

```json
{
  "prompt": "tekst promptu uzytkownika"
}
```

Dla SessionStart: `source` (`startup`, `resume`, `clear`, `compact`). Dla Stop i SubagentStop: `stop_hook_active` (boolean - kluczowe pole do unikania nieskonczonych petli). Dla ConfigChange: `source` i `file_path`. Dla PreCompact: `matcher` (`manual` albo `auto`).

Odpowiedz hooka ma dwie formy: albo exit code (0 / 1 / 2) z ewentualnym stdout, albo exit 0 + strukturalny JSON na stdout. JSON ma pola:

- `continue` (bool) - czy kontynuowac ture (domyslnie true).
- `stopReason` (string) - wiadomosc gdy `continue: false`.
- `suppressOutput` (bool) - czy ukryc debug output.
- `systemMessage` (string) - ostrzezenie inline w transkrypcie.
- `decision` (string) - dla tool eventow: `"block"` lub `"approve"`.
- `reason` (string) - zwracany Claude'owi dla kontekstu.
- `hookSpecificOutput` (object) - event-specific fields:
  - `hookEventName` - duplicate event name for clarity.
  - `permissionDecision` - dla PreToolUse: `"deny" | "allow" | "ask" | "defer"`.
  - `permissionDecisionReason` - string reason.
  - `updatedInput` - rewrite tool arguments.
  - `additionalContext` - dopisz do promptu (dla UserPromptSubmit / SessionStart).
  - `retry` - bool dla PermissionDenied, pozwolic modelowi sprobowac ponownie.

## 7. Matcher - jak powiazac hook z konkretnym narzedziem

Pole `matcher` decyduje czy dany hook uruchomi sie dla danego wywolania. Syntax:

- `"*"` albo `""` albo pominiecie - pasuje do wszystkiego (hook zawsze sie wyzwala).
- Tylko znaki `[A-Za-z0-9_|]` - traktowane jako literal string lub lista oddzielona pipe. Na przyklad `"Bash"` pasuje tylko do narzedzia Bash. `"Edit|Write"` pasuje do Edit LUB Write (OR list). `"Edit|Write|MultiEdit"` dla trzech narzedzi.
- Zawiera inny znak (np. `.`, `*`, `^`, nawias, backslash) - traktowane jako JavaScript regex. Na przyklad `"^Notebook"` pasuje do dowolnego narzedzia zaczynajacego sie od "Notebook". `"mcp__memory__.*"` pasuje do dowolnego narzedzia serwera MCP "memory". `"^mcp__"` pasuje do dowolnego wywolania MCP.

MCP tools maja kanoniczny format `mcp__<server>__<tool>`. Przyklady: `mcp__memory__create_entities`, `mcp__filesystem__read_file`, `mcp__github__search_repositories`. Regex `"^mcp__"` lapie wszystkie wywolania MCP. Regex `"mcp__.*__write.*"` lapie kazde narzedzie zapisu dowolnego serwera MCP.

Pole `if` (od v2.1.85) idzie dalej niz matcher - filtruje argumenty narzedzia wedlug skladni regul permission. Dziala tylko dla tool events. Przyklad:

```json
{ "matcher": "Bash",
  "hooks": [{ "type": "command", "if": "Bash(git *)", "command": "..." }] }
```

Taki hook uruchomi sie tylko gdy Claude wywolal Bash Z ARGUMENTEM pasujacym do wzorca `git *`. Oszczedza to fork/startup shell kiedy argument nie pasuje.

## 8. Timeouty - domyslne wartosci per typ handlera

Domyslne timeouty zaleza od typu handlera i sa nietrywialnym detalem ktorego uchwyt jest wart:

- **type: command** - 600 sekund (10 minut). To jest zaskakujaco dlugo - misbehaving hook moze zamrozic Claude na cala minute. W literaturze spotyka sie blednie "60 sekund" (pojawia sie to w jednym z niezweryfikowanych raportow), kanoniczne zrodlo Anthropic mowi 600 sekund. Uzywaj explicit `timeout: 5` dla telemetrii, `timeout: 30` dla walidatorow, `timeout: 180` dla test suites.

- **type: http** - 30 sekund. Rozsadne dla remote call, ale synchroniczne HTTP na scieczce goracej moze zablokowac cala ture jesli endpoint jest down. Uzywaj `async: true` dla telemetrii.

- **type: prompt** - 30 sekund. Ogarniajacy Haiku RTT + some slack. Jesli przekroczy, timeout przerywa.

- **type: agent** - 60 sekund. Ale realny sufit to limit 50 tool-turns subagenta, nie timeout zegarowy. Agent moze pracowac 3 minuty jesli tylko potrzebuje 50 tool-turns.

Reguly performance-owe dla hot-path (PreToolUse, PostToolUse - wyzwalaja sie per kazde wywolanie narzedzia):
- p95 > 500 ms - zauwazalne opoznienie, uzytkownicy zaczynaja wylaczac hook w sesji.
- p95 > 100 ms - nie czuje sie natychmiastowo, ale akceptowalne.
- p95 < 100 ms - slodki punkt dla sync walidatorow.

Hooki pasujace do tego samego eventu uruchamiaja sie ROWNOLEGLE. Event blokuje sie do najwolniejszego hooka lub do timeout. Dodanie drugiego hooka ktory zajmuje 200 ms do eventu ktory juz ma 200 ms hook NIE podwaja latency; dodanie hooka ktory zajmuje 3 sekundy przybija caly event do 3 sekund.

## 9. Gdzie konfigurujemy hooki

Struktura JSON w settings.json:

```json
{
  "hooks": {
    "<EventName>": [
      {
        "matcher": "<pattern>",
        "hooks": [
          {
            "type": "command",
            "command": "/sciezka/do/skryptu.sh",
            "timeout": 30,
            "statusMessage": "Walidacja...",
            "async": false
          }
        ]
      }
    ]
  }
}
```

Zawsze-dostepne zmienne srodowiskowe w hookach:
- `CLAUDE_PROJECT_DIR` - korzen projektu. ZAWSZE cytuj: `"$CLAUDE_PROJECT_DIR"/.claude/hooks/skrypt.sh`.
- `CLAUDE_PLUGIN_ROOT` i `CLAUDE_PLUGIN_DATA` - katalogi instalacji plugina i persistent data.
- `CLAUDE_CODE_REMOTE` - string `"true"` w srodowiskach webowych.
- `CLAUDE_ENV_FILE` - specjalna zmienna dla SessionStart, CwdChanged, FileChanged. Hook dopisuje linie `export VAR=value` do tego pliku, a Claude Code aplikuje je przed kazdym kolejnym wywolaniem Bash. To jest oficjalnie rekomendowana integracja z direnv.

Zeby zweryfikowac co jest zaladowane, uruchom `/status` w Claude Code. Wylistuje kazda warstwe konfiguracji, zrodlo pliku/rejestru, bledy parsowania. `/hooks` jest read-only browserem wszystkich hookow pogrupowanych po evencie, matcherze, typie i zrodle (User / Project / Local / Plugin / Session / Built-in).

## 10. Podsumowanie fundamentow

Hook w Claude Code to deterministyczny callback uzytkownika, ktory wyzwala sie w jednym z 28 eventow cyklu zycia, wykonuje realny kod (command / http / prompt / agent), i moze zablokowac akcje przez exit code 2 lub przez strukturalny JSON z `decision: "block"`. Hooki konfiguruja sie w settings.json w pieciu warstwach precedensji (Managed > CLI > Local > Project > User), mergujacych sie typowo-zaleznie (skalary nadpisuja, tablice konkatenuja, hooki agreguja i deduplikuja).

Kluczowe zasady do zapamietania: exit 2 blokuje, exit 1 NIE BLOKUJE (to pulapka numer 1 w calym ekosystemie). PreToolUse blokuje wywolanie narzedzia przed wykonaniem, PostToolUse reaguje po fakcie. Hooki deduplikuja sie po stringu komendy lub URL, uruchamiaja rownolegle, a najwolniejszy okresla latency eventu. Domyslny timeout command to 600 sekund (nie 60), http to 30, prompt to 30, agent to 60. `permissions.deny` z wyzszej warstwy nie moze byc nadpisany przez `permissions.allow` z nizszej warstwy - hooki moga tylko zawezac, nigdy rozluzniac.

Kolejna lekcja (Lekcja 2: Wzorce) pokazuje 13 konkretnych wzorcow hookow z pelnym dzialajacym kodem. Lekcja 3 (Przewodnik decyzyjny) omawia trade-offs, anti-patterns i hardening checklist.
