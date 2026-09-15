# Claude Code Hooks - Wzorce praktyczne (Lekcja 2)

Trzynascie konkretnych wzorcow hookow z pelnym, dzialajacym kodem. Wersja: 2026-04-17. Zrodlo: raport syntezy kampanii "Research Hooks Best Practices 2026" (SYNTHESIS.md) oraz raporty bazowe R3 (community patterns), R4 (security), R6 (advanced patterns). Ta lekcja jest samodzielna - nie wymaga czytania innych dokumentow. Kazdy wzorzec ma: opis problemu, rozwiazanie, konkretny kod, kiedy uzyc, kiedy NIE uzywac.

## Wprowadzenie - jak czytac ten dokument

Kazdy wzorzec w tej lekcji sklada sie z czterech czesci: (1) krotki opis problemu ktory wzorzec rozwiazuje, (2) mechanizm rozwiazania w terminach eventow, matcherow i typow handlerow, (3) pelny kod skryptu hooka plus wpis do settings.json, (4) kiedy wzorzec pasuje a kiedy nie. Wszystkie przyklady kodu uzywaja `set -euo pipefail` dla Bash (aby zapewnic ze blad w srodku skryptu nie zostanie po cichu pochloniety), cytowania zmiennych srodowiskowych, oraz `jq` do parsowania JSON na stdin.

Konwencja: skrypty hookow trzymaj w `$CLAUDE_PROJECT_DIR/.claude/hooks/` (dla projektowych) lub `~/.claude/hooks/` (dla globalnych). Zawsze cytuj `$CLAUDE_PROJECT_DIR` - to jest standardowa zmienna srodowiskowa dostepna w kazdym hooku Claude Code.

WAZNE PRZYPOMNIENIE: exit 2 blokuje, exit 1 NIE BLOKUJE. To jest najczesciej popelniany blad w calym ekosystemie hookow Claude Code. Kazdy wzorzec blokujacy w tej lekcji uzywa exit 2, nigdy exit 1. Jesli widzisz gdzies `exit 1` z zamiarem blokowania - to jest BLAD.

## Wzorzec 1: TTS i powiadomienie desktop po Stop i Notification

**Problem:** Kiedy Claude dlugo myslal lub wywolal wiele narzedzi, chcesz wiedziec ze skonczyl - bez patrzenia w terminal. Uzytkownicy wracaja do pracy po 30 sekundach i nie widza ze Claude skonczyl 20 sekund temu, co marnuje czas.

**Mechanizm:** Event `Stop` wyzwala sie raz na ture gdy Claude konczy odpowiadac. Event `Notification` wyzwala sie gdy Claude wysyla powiadomienie (np. prosba o permission prompt, idle prompt, auth success). Oba eventy sa idealnym miejscem na TTS (text-to-speech), desktop toast albo powiadomienie na telefon. Hooki nie blokuja - po prostu reaguja na zdarzenie. Uzyj `type: command` z `async: true` zeby hook nie blokowal powrotu kontroli do uzytkownika.

**Kod (Linux z notify-send, macOS z osascript, Windows z BurntToast):**

Skrypt `~/.claude/hooks/notify.sh`:

```bash
#!/bin/bash
set -euo pipefail
INPUT=$(cat)
EVENT=$(echo "$INPUT" | jq -r '.hook_event_name // "claude-code"')
MSG=$(echo "$INPUT" | jq -r '.message // "Task complete"')
MSG="${MSG//\'/\'\'}"  # escape single quotes

case "$(uname -s)" in
  Linux*)
    command -v notify-send >/dev/null && notify-send "Claude Code" "$MSG"
    command -v espeak >/dev/null && espeak "$MSG" 2>/dev/null &
    ;;
  Darwin*)
    osascript -e "display notification \"$MSG\" with title \"Claude Code\""
    say "$MSG" &
    ;;
  MINGW*|CYGWIN*|MSYS*)
    powershell.exe -NoProfile -Command "
Import-Module BurntToast -ErrorAction SilentlyContinue
New-BurntToastNotification -Text 'Claude Code', '$MSG' -Sound 'Default'
" >/dev/null 2>&1 &
    ;;
esac
exit 0
```

Settings.json (globalny ~/.claude/settings.json):

```json
{
  "hooks": {
    "Stop": [
      { "hooks": [{ "type": "command", "command": "~/.claude/hooks/notify.sh", "async": true, "timeout": 5 }] }
    ],
    "Notification": [
      { "hooks": [{ "type": "command", "command": "~/.claude/hooks/notify.sh", "async": true, "timeout": 5 }] }
    ]
  }
}
```

**Kiedy uzyc:** Jestes uzytkownikiem ktory pracuje rownolegle w innym oknie i chcesz wiedziec kiedy Claude skonczyl. Dziala globalnie dla kazdego projektu.

**Kiedy NIE uzyc:** W CI/CD, na serwerach bez UI, w headless. Nie probuj tego w sesji `-p` non-interactive.

## Wzorzec 2: Protect-versions - blokada edycji poprzednich wersji

**Problem:** W repo wersjonowanym przez foldery (`v31/`, `v32/`, `v33/`) Claude czasem z rozpedu edytuje stara wersje zamiast nowej. To kasuje dzialajacy kod poprzedniej wersji i chociaz git pozwala to cofnac, to zla pozycja do spania.

**Mechanizm:** Event `PreToolUse` z matcherem `Edit|Write|MultiEdit`. Hook sprawdza sciezke pliku w `tool_input.file_path`, porownuje z lista dozwolonych prefiksow (np. tylko biezaca wersja `v33/`) i zwraca exit 2 jesli sciezka wskazuje na poprzednia wersje. Hook dziala PRZED wykonaniem edycji, wiec plik nie zostaje zmodyfikowany.

**Kod:** skrypt `$CLAUDE_PROJECT_DIR/.claude/hooks/protect-versions.sh`:

```bash
#!/bin/bash
set -euo pipefail
INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
[ -z "$FILE" ] && exit 0

CANON=$(realpath -m "$FILE")
PROJECT=$(realpath -m "$CLAUDE_PROJECT_DIR")

# Reject escape from project
case "$CANON" in
  "$PROJECT"/*) ;;
  *) echo "BLOCKED: $FILE escapes \$CLAUDE_PROJECT_DIR" >&2; exit 2 ;;
esac

# Current active version (change when bumping)
ACTIVE_VERSION="v33"

# Block edits to older versions
REL="${CANON#$PROJECT/}"
case "$REL" in
  v1/*|v2/*|v3/*|v31/*|v32/*|v32.*)
    echo "BLOCKED: cannot edit archived version $REL. Active version: $ACTIVE_VERSION" >&2
    exit 2
    ;;
esac
exit 0
```

Settings.json (projektowy, `.claude/settings.json`):

```json
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "Edit|Write|MultiEdit",
        "hooks": [{ "type": "command", "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/protect-versions.sh", "timeout": 5 }]
      }
    ]
  }
}
```

**Kiedy uzyc:** Masz uklad repo z wersjami w folderach, nie chcesz regresu. To projektowy hook, commituj.

**Kiedy NIE uzyc:** Pliki nie maja struktury wersji folderowej. Wtedy lepiej uzyc `permissions.deny` dla konkretnych sciezek.

## Wzorzec 3: Pre-commit equivalent - walidacja przed git commit

**Problem:** Claude wywoluje `git commit -am "..."` bez uruchomienia testow, lintera, type-check. Kod laduje na main i CI plonie za 3 minuty.

**Mechanizm:** Event `PreToolUse` z matcherem `Bash` i polem `if: "Bash(git commit *)"` (od v2.1.85 - filtruje argumenty narzedzia, oszczedza fork jesli komenda nie pasuje). Hook sprawdza czy commit message jest w conventional format, czy testy przechodza, czy lint przechodzi. Exit 2 jesli cos sie wywala.

**Kod:** skrypt `$CLAUDE_PROJECT_DIR/.claude/hooks/pre-commit-check.sh`:

```bash
#!/bin/bash
set -euo pipefail
INPUT=$(cat)
CMD=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

cd "$CLAUDE_PROJECT_DIR"

# Run tests
if [ -f "package.json" ]; then
  if ! npx --no-install vitest run --reporter=dot 2>&1 >/dev/null; then
    echo "BLOCKED: vitest failed. Fix tests before committing." >&2
    exit 2
  fi
  if ! npx --no-install tsc --noEmit 2>&1 >/dev/null; then
    echo "BLOCKED: tsc --noEmit failed. Fix types before committing." >&2
    exit 2
  fi
elif [ -f "pyproject.toml" ]; then
  if ! ruff check . 2>&1 >/dev/null; then
    echo "BLOCKED: ruff check failed. Run 'ruff check --fix' before committing." >&2
    exit 2
  fi
  if ! pytest -x --tb=short 2>&1 >/dev/null; then
    echo "BLOCKED: pytest failed. Fix tests before committing." >&2
    exit 2
  fi
fi

# Check conventional commit message
MSG=$(echo "$CMD" | grep -oP '(?<=-m[[:space:]]["'\''])[^"'\'']+' | head -1)
if [ -n "$MSG" ] && ! echo "$MSG" | grep -qE '^(feat|fix|docs|style|refactor|test|chore|perf)(\(.+\))?: '; then
  echo "BLOCKED: commit message '$MSG' not in conventional format (feat/fix/docs/...)." >&2
  exit 2
fi
exit 0
```

Settings.json:

```json
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "Bash",
        "hooks": [{
          "type": "command",
          "if": "Bash(git commit *)",
          "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/pre-commit-check.sh",
          "timeout": 120
        }]
      }
    ]
  }
}
```

**Kiedy uzyc:** Masz ustabilizowany test suite, CI laduje do prod, koszt regresji jest wyzszy niz koszt czekania 2 minut na testy.

**Kiedy NIE uzyc:** Testy trwaja 10 minut (zablokuje Claude na 10 minut), albo masz juz git pre-commit hook (zduplikujesz prace). Wtedy niech Claude wywola `npm test` rzez hook PreToolUse+Bash sugerujac kolejne kroki, a pozostaw blokowanie pre-commit hookowi gita.

## Wzorzec 4: Observability - logger kazdego wywolania narzedzia do JSONL

**Problem:** Nie wiesz co Claude robi przez caly dzien. Zebranie metryki "ile tool calls", "jaki rozklad", "ile zablokowanych" jest niemozliwe bez logowania.

**Mechanizm:** Event `PostToolUse` z matcherem `"*"` (wszystkie narzedzia). Hook dopisuje JSONL do pliku logu. Uzyj `async: true` zeby logger nie blokowal kolejnych tool calls. To jest najprostszy i najtanszy wzorzec observability - zero zaleznosci, grep-friendly, jq-analyzable, rotuje sie z logrotate.

**Kod:** prosty one-liner w settings.json (globalny):

```json
{
  "hooks": {
    "PostToolUse": [
      { "matcher": "*",
        "hooks": [{
          "type": "command",
          "command": "jq -c '{ts: now|todate, event: .hook_event_name, tool: .tool_name, cwd: .cwd, session: .session_id}' >> ~/.claude/tool-log.jsonl",
          "async": true,
          "timeout": 2
        }]
      }
    ],
    "PreToolUse": [
      { "matcher": "*",
        "hooks": [{
          "type": "command",
          "command": "jq -c '{ts: now|todate, event: .hook_event_name, tool: .tool_name, input: .tool_input}' >> ~/.claude/tool-log.jsonl",
          "async": true,
          "timeout": 2
        }]
      }
    ]
  }
}
```

Analiza uruchamiana pozniej (one-liner Bash):

```bash
# Top 10 narzedzi po czestosci
jq -r '.tool' ~/.claude/tool-log.jsonl | sort | uniq -c | sort -rn | head -10

# Tool calls ostatniej godziny
jq -c 'select((.ts | fromdateiso8601) > (now - 3600))' ~/.claude/tool-log.jsonl
```

**Kiedy uzyc:** Zawsze. To bezkosztowy wzorzec ktory kazdy uzytkownik Claude Code powinien miec.

**Kiedy NIE uzyc:** Masz juz centralny system observability (SQLite, OpenTelemetry, Prometheus) - wtedy uzyj tamto. Dla zespolu `disler/claude-code-hooks-multi-agent-observability` pokazuje SQLite + Bun + Vue dashboard + WebSocket live stream. Dla personalnego uzytku JSONL jest w sam raz.

## Wzorzec 5: Secrets guard - skan Edit i Write na sekrety

**Problem:** Claude przypadkiem wkleja API key albo password do commitowanego pliku, bo widzi je w swoim kontekscie. Jedna linia `OPENAI_API_KEY=sk-...` w kodzie i masz incydent bezpieczenstwa.

**Mechanizm:** Event `PreToolUse` z matcherem `Edit|Write|MultiEdit`. Hook skanuje `tool_input.content` (dla Write) lub `tool_input.new_string` (dla Edit) regex'ami na znane formaty sekretow. Exit 2 blokuje zapis.

**Kod:** skrypt `$CLAUDE_PROJECT_DIR/.claude/hooks/secrets-guard.sh`:

```bash
#!/bin/bash
set -euo pipefail
INPUT=$(cat)
TOOL=$(echo "$INPUT" | jq -r '.tool_name // empty')

case "$TOOL" in
  Write) CONTENT=$(echo "$INPUT" | jq -r '.tool_input.content // empty') ;;
  Edit|MultiEdit) CONTENT=$(echo "$INPUT" | jq -r '.tool_input.new_string // .tool_input.edits[].new_string // empty') ;;
  *) exit 0 ;;
esac

[ -z "$CONTENT" ] && exit 0

# Known secret patterns
if echo "$CONTENT" | grep -qE 'sk-[A-Za-z0-9]{20,}|sk-ant-[A-Za-z0-9_-]{30,}|ghp_[A-Za-z0-9]{36}|github_pat_[A-Za-z0-9_]{60,}|AIza[A-Za-z0-9_-]{35}|AKIA[0-9A-Z]{16}|xoxb-[0-9]+-[0-9]+-[A-Za-z0-9]+'; then
  echo "BLOCKED: content contains what looks like an API key or token. Use env var instead." >&2
  exit 2
fi

# Private key header
if echo "$CONTENT" | grep -qE 'BEGIN (RSA |EC |DSA |OPENSSH |)PRIVATE KEY'; then
  echo "BLOCKED: content contains a private key header." >&2
  exit 2
fi
exit 0
```

Settings.json (projektowy):

```json
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "Edit|Write|MultiEdit",
        "hooks": [{ "type": "command", "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/secrets-guard.sh", "timeout": 3 }]
      }
    ]
  }
}
```

**Kiedy uzyc:** Zawsze na projektach ktore maja prod keys albo produkcyjne zaleznosci. Commitowac projektowo.

**Kiedy NIE uzyc:** Stacja pracy gdzie jedyne co piszesz to lorem ipsum. Ale i tak zero kosztu poza 3 ms na event, wiec zazwyczaj tanio. Dla produkcji najlepiej uzyc AST-based `vaporif/parry` (DeBERTa v3 + Aho-Corasick + tree-sitter, 6 warstw detekcji).

## Wzorzec 6: Auto-format po Edit - prettier, black, gofmt

**Problem:** Claude pisze kod w rozjechanych formatu (indentacja 2 zamiast 4, brak nowej linii na koncu pliku). Kazdy edit wymaga potem `npm run format` recznie.

**Mechanizm:** Event `PostToolUse` z matcherem `Edit|Write|MultiEdit`. Hook patrzy na rozszerzenie pliku i uruchamia odpowiedni formatter (prettier dla JS/TS, black dla Python, ruff format dla Python alternatywnie, gofmt dla Go, rustfmt dla Rust). Formatter modyfikuje plik in-place po zapisie. Hook NIE blokuje (exit 0), po prostu dziala post-factum.

**Kod:** skrypt `$CLAUDE_PROJECT_DIR/.claude/hooks/auto-format.sh`:

```bash
#!/bin/bash
set -euo pipefail
INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
[ -z "$FILE" ] || [ ! -f "$FILE" ] && exit 0

case "$FILE" in
  *.js|*.jsx|*.ts|*.tsx|*.json|*.css|*.scss|*.html|*.md)
    command -v npx >/dev/null && npx --no-install prettier --write "$FILE" 2>/dev/null || true
    ;;
  *.py)
    command -v ruff >/dev/null && ruff format "$FILE" 2>/dev/null || true
    command -v ruff >/dev/null && ruff check --fix "$FILE" 2>/dev/null || true
    ;;
  *.go)
    command -v gofmt >/dev/null && gofmt -w "$FILE" 2>/dev/null || true
    ;;
  *.rs)
    command -v rustfmt >/dev/null && rustfmt --edition=2021 "$FILE" 2>/dev/null || true
    ;;
esac
exit 0
```

Settings.json:

```json
{
  "hooks": {
    "PostToolUse": [
      { "matcher": "Edit|Write|MultiEdit",
        "hooks": [{ "type": "command", "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/auto-format.sh", "async": true, "timeout": 10 }]
      }
    ]
  }
}
```

**Kiedy uzyc:** Masz ustabilizowana konfiguracje formatera (.prettierrc, pyproject.toml z black/ruff). Uspokaja diff w PR.

**Kiedy NIE uzyc:** Masz pre-commit hook z formatterem - zduplikujesz prace. Albo Claude edytuje pliki bez konfigu formatera i skrypt failuje na kazdym edicie (trzymaj `|| true` zebyi nie blokowalo sesji).

Optymalizacja: bartolli z repo `bartolli/claude-code-typescript-hooks` uzywa SHA256 cache wynikow ESLint + Prettier + tsc per plik, odpala tylko przy zmianie tresci. To przyspiesza hot-path z 180 ms do 12 ms w p95 dla niezmienionych plikow.

## Wzorzec 7: Context injection przez UserPromptSubmit

**Problem:** Claude nie wie jaki jest biezacy branch, jakie sa niecomitowane zmiany, jaki jest sprint. Trzeba za kazdym razem przeklejac `git status` do promptu.

**Mechanizm:** Event `UserPromptSubmit` bez matchera (zawsze sie wyzwala). Hook zwraca JSON z polem `hookSpecificOutput.additionalContext` ktore jest DOPISYWANE do promptu uzytkownika przed wyslaniem do modelu. Alternatywnie, hook moze po prostu wypisac text na stdout przy exit 0 - dla UserPromptSubmit to tez jest traktowane jak kontekst.

**Kod:** skrypt `$CLAUDE_PROJECT_DIR/.claude/hooks/inject-context.sh`:

```bash
#!/bin/bash
set -euo pipefail
cd "$CLAUDE_PROJECT_DIR"

CONTEXT=""
# Current branch
if git rev-parse --git-dir >/dev/null 2>&1; then
  BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")
  STATUS=$(git status --short 2>/dev/null | head -20 || echo "")
  [ -n "$BRANCH" ] && CONTEXT+="Current branch: $BRANCH"$'\n'
  [ -n "$STATUS" ] && CONTEXT+="Uncommitted changes:"$'\n'"$STATUS"$'\n'
fi

# Current sprint / todo (if file exists)
if [ -f "TODO.md" ]; then
  SPRINT=$(head -20 TODO.md)
  CONTEXT+="TODO.md preview:"$'\n'"$SPRINT"$'\n'
fi

[ -z "$CONTEXT" ] && exit 0

jq -n --arg ctx "$CONTEXT" \
  '{hookSpecificOutput: {hookEventName: "UserPromptSubmit", additionalContext: $ctx}}'
exit 0
```

Settings.json:

```json
{
  "hooks": {
    "UserPromptSubmit": [
      { "hooks": [{ "type": "command", "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/inject-context.sh", "timeout": 3 }] }
    ]
  }
}
```

**Kiedy uzyc:** Pracujesz w wielu branchach i chcesz zeby Claude zawsze wiedzial gdzie jestes. Niezbedne dla workflow "checkout feature branch, pracuj, PR, merge".

**Kiedy NIE uzyc:** Trzymaj na oku rozmiar kontekstu - jesli Twoj `git status` ma 500 plikow niecomitowanych, ten hook nabuja kazdy prompt o 10k tokenow. Dodaj `head -20` jak w przykladzie powyzej.

## Wzorzec 8: TaskCreated instrumentation - walidacja przed spawn

**Problem:** W wielomodulowych projektach Claude czasem spawnuje subagenta do niepotrzebnego zadania. Koszt: subagent wytwarza 50 tool-turns i 30k tokenow dla zadania ktore mogl zrobic inline.

**Mechanizm:** Event `TaskCreated` (nowy w v2.1.84) wyzwala sie gdy narzedzie TaskCreate tworzy nowe zadanie. Hook moze zablokowac (exit 2 rollback'uje stworzenie zadania) lub wzbogacic log. Przyklad: walidacja ze zadanie ma powiazany ticket w ticketing system.

**Kod:** skrypt `$CLAUDE_PROJECT_DIR/.claude/hooks/validate-task.sh`:

```bash
#!/bin/bash
set -euo pipefail
INPUT=$(cat)
TASK_DESC=$(echo "$INPUT" | jq -r '.tool_input.description // empty')

# Require ticket reference
if ! echo "$TASK_DESC" | grep -qE '\[[A-Z]+-[0-9]+\]|#[0-9]+'; then
  echo "BLOCKED: task description must include ticket reference like [PROJ-123] or #456. Got: $TASK_DESC" >&2
  exit 2
fi

# Log every task creation
jq -c '{ts: now|todate, task: .tool_input.description, session: .session_id}' >> ~/.claude/tasks.jsonl
exit 0
```

Settings.json:

```json
{
  "hooks": {
    "TaskCreated": [
      { "hooks": [{ "type": "command", "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/validate-task.sh", "timeout": 5 }] }
    ]
  }
}
```

**Kiedy uzyc:** Organizacja ktora ma polityke "kazdy task musi miec ticket". Wymuszenie hookiem jest tansze niz PR review.

**Kiedy NIE uzyc:** Single-developer, brak ticketing system. Wtedy tylko log do JSONL bez blokowania.

## Wzorzec 9: Elicitation override - polityczne odrzucanie MCP

**Problem:** Serwer MCP (np. GitHub MCP, Slack MCP) czasem prosi o interaktywny input od uzytkownika przez protokol elicitation. Organizacja nie chce zeby Claude eskalowal do uzytkownika dla kazdego mala decyzji MCP.

**Mechanizm:** Event `Elicitation` (nowy w v2.1.76) wyzwala sie gdy serwer MCP wysyla elicitation request. Matcher - nazwa serwera MCP. Exit 2 blokuje elicitation (polityczne odrzucenie). Opcjonalnie uzyj `ElicitationResult` aby zredigowac odpowiedz uzytkownika przed wyslaniem do serwera.

**Kod:** settings.json (projektowy):

```json
{
  "hooks": {
    "Elicitation": [
      { "matcher": "^github$",
        "hooks": [{
          "type": "command",
          "command": "echo 'BLOCKED: GitHub MCP elicitation disabled by policy. Use direct API calls.' >&2; exit 2",
          "timeout": 2
        }]
      }
    ],
    "ElicitationResult": [
      { "matcher": ".*",
        "hooks": [{
          "type": "command",
          "command": "jq -c '{ts: now|todate, server: .mcp_server, response: .response}' >> ~/.claude/mcp-elicitations.jsonl",
          "async": true,
          "timeout": 2
        }]
      }
    ]
  }
}
```

**Kiedy uzyc:** Korporacyjna polityka kontroli nad MCP. Tryb auto-mode gdzie user nie powinien byc pytany.

**Kiedy NIE uzyc:** Indywidualny developer uzywajacy MCP - chcesz miec interaktywnosc.

## Wzorzec 10: PreCompact block - ochrona kontekstu przed skasowaniem

**Problem:** Claude Code auto-kompaktuje kontekst gdy zblizasz sie do limitu tokenow. Po kompakcji traci sie wiele szczegolow - konkretny plan implementacji, przebieg debugu, pivoty decyzyjne.

**Mechanizm:** Event `PreCompact` z matcherem `auto` (lub `manual` dla `/compact`). Hook wyzwala sie przed kompaktacja. Od wersji v2.1.105 PreCompact jest BLOKOWALNY - exit 2 anuluje kompaktacje. Pragmatyczne uzycie: nie blokowac, ale ARCHIWIZOWAC transkrypt na dysk zeby dalo sie wrocic.

**Kod:** skrypt `$CLAUDE_PROJECT_DIR/.claude/hooks/archive-transcript.sh`:

```bash
#!/bin/bash
set -euo pipefail
INPUT=$(cat)
TRANSCRIPT=$(echo "$INPUT" | jq -r '.transcript_path // empty')
SESSION=$(echo "$INPUT" | jq -r '.session_id // "unknown"')
MATCHER=$(echo "$INPUT" | jq -r '.matcher // "unknown"')

[ -z "$TRANSCRIPT" ] || [ ! -f "$TRANSCRIPT" ] && exit 0

ARCHIVE_DIR="$HOME/.claude/transcript-archive"
mkdir -p "$ARCHIVE_DIR"
STAMP=$(date +%Y%m%d-%H%M%S)
cp "$TRANSCRIPT" "$ARCHIVE_DIR/${STAMP}-${MATCHER}-${SESSION}.jsonl"

# Optional: tail last 50 messages to a "recent" file for easy grep
jq -s '.[-50:]' "$TRANSCRIPT" > "$ARCHIVE_DIR/recent.jsonl" 2>/dev/null || true
exit 0
```

Settings.json (globalny):

```json
{
  "hooks": {
    "PreCompact": [
      { "matcher": "auto|manual",
        "hooks": [{ "type": "command", "command": "~/.claude/hooks/archive-transcript.sh", "timeout": 10 }] }
    ],
    "PostCompact": [
      { "hooks": [{
        "type": "command",
        "command": "echo 'Reminder: use Bun not npm. Active version is v33. Check TODO.md for current task.'",
        "timeout": 2
      }] }
    ]
  }
}
```

**Kiedy uzyc:** Zawsze. Zero-cost insurance policy na wypadek "Claude skompaktowal i stracil plan".

**Kiedy NIE uzyc:** Masz juz centralne backup'y transkryptow. Nigdy blokuj PreCompact exit 2 (poza scenariuszem gdzie naprawde chcesz wymusic zamkniecie sesji).

## Wzorzec 11: Agent hook - delegowanie decyzji do subagenta

**Problem:** Chcesz wymusic "testy musza przejsc zanim Claude skonczy", ale sprawdzenie testow wymaga uruchomienia komend (`pytest`, `vitest run`, `cargo test`), czytania plikow (czy test file istnieje), i interpretacji wynikow. Prosty skrypt Bash nie wystarczy - to wymaga judgmentu.

**Mechanizm:** Event `Stop` z `type: agent`. Hook spawna pelnoprawnego subagenta (limit 50 tool-turns) ktory ma dostep do wszystkich narzedzi. Subagent uruchamia testy, interpretuje wyniki, zwraca `{ok: true/false, reason: "..."}`. Jesli `ok: false`, hook blokuje Stop (Claude kontynuuje prace). Pamietaj o polu `stop_hook_active` w input JSON aby uniknac nieskonczonej petli.

**Kod:** settings.json (projektowy):

```json
{
  "hooks": {
    "Stop": [
      { "hooks": [{
        "type": "agent",
        "prompt": "Sprawdz czy testy projektu przechodza. Przeczytaj package.json lub pyproject.toml aby wiedziec jaki jest command do testow. Uruchom go. Jesli wszystkie testy przechodza zwroc {\"ok\": true}. Jesli nie - zwroc {\"ok\": false, \"reason\": \"konkretny blad testu\"}. Session ID to $ARGUMENTS.",
        "timeout": 180
      }] }
    ]
  }
}
```

Aby uniknac nieskonczonej petli (stop hook blokuje stop, Claude kontynuuje, znowu stop, hook blokuje...), SDK Claude Code wystawia `stop_hook_active: true` w ponowionych Stop. Skrypt type-command ktory sluzy jako alternatywa dla type-agent:

```bash
#!/bin/bash
set -euo pipefail
INPUT=$(cat)
STOP_ACTIVE=$(echo "$INPUT" | jq -r '.stop_hook_active // false')
if [ "$STOP_ACTIVE" = "true" ]; then exit 0; fi
cd "$CLAUDE_PROJECT_DIR"
if [ -f package.json ]; then
  npx vitest run --reporter=dot 2>&1 >&2 || exit 2
elif [ -f pyproject.toml ]; then
  pytest -x --tb=short 2>&1 >&2 || exit 2
fi
exit 0
```

**Kiedy uzyc:** Masz szybki test suite (<60s), kod lezacy na main musi byc green. Projekt krytyczny.

**Kiedy NIE uzyc:** Test suite trwa 10 minut (user bedzie czekal 10 minut na zakonczenie tury). Koszt tokenow subagenta jest za wysoki. Typ agent jest NAJBARDZIEJ kosztowny.

## Wzorzec 12: HTTP hook - webhook notifier do centralnego audit

**Problem:** Organizacja chce centralne logowanie wszystkich edycji plikow produkcyjnych, bez polegania na kazdym developerze zeby wlaczyl lokalny logger.

**Mechanizm:** Event `PreToolUse` lub `PostToolUse` z `type: http`. Claude Code wysyla POST do URL z eventem jako body. Serwer odpowiada JSONem (ten sam schemat co stdout dla command). Zawsze uzywaj `async: true` dla telemetrii (telemetria nie powinna blokowac hot-path). Pin `allowedHttpHookUrls` i `httpHookAllowedEnvVars` na User/Managed scope.

**Kod:** settings.json (managed albo user scope, pin URL i env vars):

```json
{
  "allowedHttpHookUrls": ["https://hooks.corp.example/claude-audit"],
  "httpHookAllowedEnvVars": ["CORP_AUDIT_TOKEN"],

  "hooks": {
    "PostToolUse": [
      { "matcher": "Edit|Write|MultiEdit",
        "hooks": [{
          "type": "http",
          "url": "https://hooks.corp.example/claude-audit",
          "timeout": 5,
          "async": true,
          "headers": { "Authorization": "Bearer $CORP_AUDIT_TOKEN", "Content-Type": "application/json" },
          "allowedEnvVars": ["CORP_AUDIT_TOKEN"]
        }]
      }
    ],
    "StopFailure": [
      { "matcher": "rate_limit|server_error|billing_error",
        "hooks": [{
          "type": "http",
          "url": "https://hooks.corp.example/claude-audit",
          "timeout": 5,
          "headers": { "Authorization": "Bearer $CORP_AUDIT_TOKEN" },
          "allowedEnvVars": ["CORP_AUDIT_TOKEN"]
        }]
      }
    ]
  }
}
```

**Kiedy uzyc:** Organizacja ma dashboard audit, SOC2 wymaga trail kazdej edycji, flota > 10 developerow.

**Kiedy NIE uzyc:** Solo developer. Local JSONL (wzorzec 4) jest wystarczajacy, tanszy i bez ryzyka eksfiltracji. HTTP hook jest glownym wektorem eksfiltracji danych jesli URL jest zle skonfigurowany - kazdy tool input leci na zewnetrzny serwer.

BEZPIECZENSTWO: Jesli nie pinnujesz `allowedHttpHookUrls` w Managed albo User scope, to warstwa Project lub Local moze dodac dowolny URL - jeden prompt injection i transkrypt leci do atakujacego. To jest w top 3 najwazniejszych wektorow ataku na hooki Claude Code.

## Wzorzec 13: PermissionDenied audit trail

**Problem:** Tryb Auto Max-tier czasem odmawia operacji klasyfikatorem. Nie wiesz co bylo odmowione i dlaczego.

**Mechanizm:** Event `PermissionDenied` (nowy w v2.1.89, ulepszony w v2.1.90) wyzwala sie gdy klasyfikator trybu Auto odmowi operacji. Hook moze zapisac decision do JSONL (audit trail) lub zwrocic `{retry: true}` zeby pozwolic modelowi sprobowac ponownie (np. z innym argumentem). Nie blokuje (juz odmowione).

**Kod:** settings.json (globalny):

```json
{
  "hooks": {
    "PermissionDenied": [
      { "hooks": [{
        "type": "command",
        "command": "jq -c '{ts: now|todate, tool: .tool_name, input: .tool_input, reason: .permission_decision_reason}' >> ~/.claude/permission-denials.jsonl",
        "async": true,
        "timeout": 2
      }] }
    ],
    "PermissionRequest": [
      { "matcher": "ExitPlanMode",
        "hooks": [{
          "type": "command",
          "command": "echo '{\"hookSpecificOutput\": {\"hookEventName\": \"PermissionRequest\", \"permissionDecision\": \"allow\", \"permissionDecisionReason\": \"auto-approve ExitPlanMode for fluid plan->code flow\"}}'",
          "timeout": 2
        }]
      }
    ]
  }
}
```

PermissionRequest (osobny event) to miejsce gdzie decydujesz o permission PROMPT ktory by sie pokazal uzytkownikowi. Matcher - nazwa narzedzia. Przyklad wyzej auto-approve ExitPlanMode zeby flow "plan mode -> code mode" byl plynny.

**Kiedy uzyc:** Pracujesz w trybie Auto i chcesz wiedziec co Claude chcial zrobic a zostalo odmowione.

**Kiedy NIE uzyc:** Tryb manual, wszystkie permission prompts sa juz w UI.

## Podsumowanie wzorcow

Trzynascie wzorcow to nie wyczerpujaca lista - kazda organizacja znajdzie wlasne. Schemat do doboru wzorca:

- **Chcesz zareagowac po fakcie (log, format, toast)**: uzyj PostToolUse, Stop, Notification. Czesto z `async: true`.
- **Chcesz zablokowac przed faktem (ochrona plikow, walidacja)**: uzyj PreToolUse, UserPromptSubmit, PreCompact. Zawsze exit 2.
- **Chcesz zmodyfikowac argumenty (rewrite)**: PreToolUse + JSON `hookSpecificOutput.updatedInput`.
- **Chcesz dopisac kontekst do promptu**: UserPromptSubmit + JSON `hookSpecificOutput.additionalContext`.
- **Chcesz judgment bez dostepu do plikow**: typ `prompt` (Haiku, 30s, $0.003 per event).
- **Chcesz weryfikacji z dostepem do plikow i komend**: typ `agent` (subagent 50 tool-turns, 60s, najdrozszy).
- **Chcesz centralnego audit**: typ `http` z `async: true`, pin `allowedHttpHookUrls` na User/Managed.
- **Chcesz zero-cost insurance**: JSONL logger na `PostToolUse: *` z `async: true`.

Kluczowe zasady podczas pisania wlasnego wzorca: (1) zawsze `set -euo pipefail` w Bashu, (2) zawsze cytuj `$CLAUDE_PROJECT_DIR`, (3) nigdy nie interpoluj `tool_input.command` bezposrednio do shella (pass przez zmienne srodowiskowe do Python/jq), (4) exit 2 zeby blokowac (nigdy exit 1), (5) explicit `timeout` na kazdym hooku (default 600s to za duzo), (6) `async: true` dla telemetrii i powiadomien, (7) Prefer `permissions.deny` zamiast PreToolUse jesli decyzja jest czysto pattern-match (deny jest szybsze i nieobchodzalne).

Kolejna lekcja (Lekcja 3: Przewodnik decyzyjny) omawia trade-offs, anti-patterns, hardening checklist i open questions w ekosystemie hookow Claude Code.
