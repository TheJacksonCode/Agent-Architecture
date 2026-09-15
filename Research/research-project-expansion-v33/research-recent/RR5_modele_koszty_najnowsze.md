# RR5: Najnowsze modele i koszty (luty-sierpien 2026)

Data raportu: 21 sierpnia 2026. Zakres: wylacznie zmiany z ostatnich 6 miesiecy (luty-sierpien 2026), pod katem projektowania systemow multi-agent (routing modeli wedlug kosztu/jakosci) dla Agent Architecture Designer.

## 1. Kontekst i metoda

Ten raport laczy dwa zrodla:

1. **Dane autorytatywne z wewnetrznej bazy wiedzy Claude API** (cache z 2026-06-24, pochodzacy bezposrednio z dokumentacji Anthropic dla SDK/API) - to jest zrodlo pierwszorzedne dla ID modeli, cen i mozliwosci API.
2. **Web search** (sierpien 2026) - dla dat wydan i kontekstu rynkowego.

Uwaga metodologiczna: podczas web searchu natrafiono na kilka serwisow (aitoolsreview.co.uk, emergent.sh, felloai.com, scriptbyai.com) twierdzacych, ze istnieje juz "Claude Opus 5" (rzekomo wydany 24 lipca 2026). **Te twierdzenia sa NIEPOTWIERDZONE i prawdopodobnie bledne** - autorytatywna baza API (bezposrednio z systemu dokumentacji Anthropic, aktualizowana na biezaco) nie zawiera modelu "Opus 5" ani takiego ID modelu; najnowszy model w rodzinie Opus to **Opus 4.8**. Serwisy te maja cechy tresci generowanych automatycznie/SEO-farm i myla prawdopodobnie "Sonnet 5" z rzekomym "Opus 5", lub ekstrapoluja nazewnictwo. W tym raporcie polegam na zrodle autorytatywnym (baza API) jako rozstrzygajacym dla nazw modeli i cen; daty wydan traktuje jako orientacyjne z web searchu.

## 2. Tabela modeli - stan na sierpien 2026

| Model | ID modelu | Data wydania (orientacyjnie) | Kontekst | Max output | Input $/1M | Output $/1M | Kluczowe nowe mozliwosci |
|---|---|---|---|---|---|---|---|
| **Claude Fable 5** | `claude-fable-5` | ok. 9-czerwca-2026 (chwilowo wstrzymany, przywrocony 1 lipca z powodu compliance eksportowego) | 1M (domyslnie max) | 128K | $10.00 | $50.00 | Najbardziej zaawansowany szeroko dostepny model Anthropic. Thinking zawsze wlaczone (nie da sie wylaczyc), brak surowego chain-of-thought (tylko streszczenia), wymaga 30-dniowej retencji danych (brak ZDR), refusal fallback do Opus 4.8 |
| **Claude Mythos 5** | `claude-mythos-5` | ok. 9 czerwca 2026 | 1M | 128K | $10.00 | $50.00 | Identyczny z Fable 5, dostepny tylko w ramach Project Glasswing (nastepca Claude Mythos Preview) |
| **Claude Opus 4.8** | `claude-opus-4-8` | ok. 28 maja 2026 | 1M | 128K | $5.00 | $25.00 | Najnowszy model tier Opus. State-of-the-art w agentic execution dlugoterminowym, mid-conversation system messages (bez beta headera), fast mode (do 2.5x szybszy output), 1M kontekst w standardowej cenie (brak dopłaty za dlugi kontekst) |
| **Claude Opus 4.7** | `claude-opus-4-7` | ok. 16 kwietnia 2026 | 1M | 128K | $5.00 | $25.00 | Poprzednia generacja Opus - wysoka rozdzielczosc vision (2576px), task budgets, effort `xhigh` |
| **Claude Opus 4.6** | `claude-opus-4-6` | ok. 5 lutego 2026 (na granicy okna 6-miesiecznego) | 1M | 128K | $5.00 | $25.00 | Adaptive thinking wprowadzone, effort parameter |
| **Claude Sonnet 5** | `claude-sonnet-5` | ok. 30 czerwca 2026 | 1M | 128K | $3.00 (promocyjnie $2.00 do 2026-08-31) | $15.00 (promocyjnie $10.00) | Jakosc zblizona do Opus przy koszcie Sonnet, szczegolnie w coding/agentic. Adaptive thinking domyslnie wlaczone. Nowy tokenizer (~30% wiecej tokenow dla tego samego tekstu vs Sonnet 4.6, ale cena/token niezmieniona). Wsparcie dla `effort: xhigh` (pierwszy model tier Sonnet z tym poziomem) |
| **Claude Sonnet 4.6** | `claude-sonnet-4-6` | przed lutym 2026 | 1M | 128K | $3.00 | $15.00 | Poprzednia generacja Sonnet |
| **Claude Haiku 4.5** | `claude-haiku-4-5` | przed okresem raportu | 200K | 64K | $1.00 | $5.00 | Bez zmian cenowych w ostatnim polroczu - nadal najtanszy/najszybszy model |

**Kluczowa obserwacja cenowa:** Ceny per-token w warstwach Opus ($5/$25) i Haiku ($1/$5) **nie zmienily sie** mimo wzrostu mozliwosci modeli - Anthropic dostarcza wieksza jakosc bez podnoszenia cennika w tych tierach. Sonnet 5 ma promocyjna obnizke ceny (~33% taniej niz standardowa $3/$15) do konca sierpnia 2026 - warto to uwzglednic w kalkulacjach kosztow do konca miesiaca. Fable 5/Mythos 5 to nowa, droga warstwa powyzej Opus ($10/$50) - 2x drozsza od Opus, przeznaczona tylko do najtrudniejszych zadan.

## 3. Zmiany w API Anthropic wplywajace na multi-agent (luty-sierpien 2026)

### 3.1 Adaptive Thinking zastapil manualny "thinking budget"

Najwazniejsza zmiana architektoniczna tego polrocza: **`thinking: {type: "enabled", budget_tokens: N}` zostal calkowicie usuniety** (zwraca blad 400) na modelach Fable 5, Opus 4.7, Opus 4.8 i Sonnet 5. Zastapiony przez `thinking: {type: "adaptive"}` w polaczeniu z parametrem `output_config.effort` (`low`/`medium`/`high`/`xhigh`/`max`).

**Wplyw na routing modeli:** dotychczasowa strategia "daj Haiku maly budzet tokenow na myslenie, Opusowi duzy" jest przestarzala. Teraz kontrola kosztu/jakosci odbywa sie przez parametr `effort`, a nie przez budzet tokenow. Rekomendacja dla 42 presetow: kazdy agent powinien miec przypisany nie tylko model, ale i poziom `effort` - subagenci wykonawczy (Sonnet) moga dzialac na `medium`, agenci orkiestrujacy (Opus) na `high`/`xhigh`, a Haiku (bez adaptive thinking w pelnym zakresie) zostaje przy prostych, jednokrotnych zadaniach.

### 3.2 Nowy poziom effort: `xhigh`

Wprowadzony wraz z Opus 4.7, teraz dostepny takze w Sonnet 5. To najlepsze ustawienie dla zadan coding/agentic - w Claude Code jest domyslnym poziomem. Dla architektury 42 presetow oznacza to nowa "gorna polke" jakosci bez przechodzenia na drozszy model - preset np. `/deep-five-minds` mogłby uzywac Sonnet 5 + `effort: xhigh` zamiast automatycznie eskalowac do Opus, obnizajac koszt przy zachowaniu jakosci bliskiej Opus.

### 3.3 Prompt caching - bez zmian fundamentalnych, ale nowosc: mid-conversation system messages

Mechanizm cache'owania (prefiks, TTL 5 min / 1h, progi minimalne 1024-4096 tokenow w zaleznosci od modelu) pozostaje taki sam jak wczesniej. Nowosc: na **Opus 4.8** mozna wstrzykiwac instrukcje operatora w trakcie konwersacji jako `{"role": "system", ...}` w tablicy `messages[]` (bez naruszania cache'a systemowego prefiksu) - to bezpieczniejsza alternatywa dla wzorca `<system-reminder>` wstrzykiwanego w tresc uzytkownika, odporna na prompt injection.

**Wplyw:** w architekturze presetow, gdzie orkiestrator czesto musi "doinstruowac" subagenta w trakcie dlugiej sesji (np. zmiana trybu, nowy kontekst), mozna teraz robic to bez inwalidacji calego cache'a systemowego promptu - potencjalna oszczednosc kosztow w dlugich sesjach multi-agent.

### 3.4 Context window i tokenizer

Wszystkie aktualne modele (Fable 5, Opus 4.6-4.8, Sonnet 4.6/5) maja **1M tokenow kontekstu jako WARTOSC DOMYSLNA** (nie tylko maksimum do odblokowania) przy **standardowej cenie** - brak dopłaty za dlugi kontekst, co bylo wczesniej typowe. Haiku 4.5 pozostaje przy 200K.

**Nowy tokenizer** (wprowadzony z Opus 4.7, uzywany takze w Sonnet 5, Fable 5): ten sam tekst generuje **~30% wiecej tokenow** przy migracji z Sonnet 4.6 lub ~1x-1.35x wiecej przy migracji ze starszych modeli (Opus 4.6 i starsze). Cena per-token pozostaje ta sama, ale **calkowity koszt zadania rosnie** mimo niezmienionego cennika - to krytyczne dla budzetowania: trzeba przeliczyc `count_tokens()` na nowo, a nie zakladac ze stare pomiary sa nadal aktualne.

### 3.5 Task Budgets (beta)

Nowy mechanizm (Fable 5, Sonnet 5, Opus 4.7/4.8): `output_config.task_budget` daje modelowi swiadomosc limitu tokenow na cala petle agentyczna (nie tylko na jedna odpowiedz jak `max_tokens`) - model sam sie tempuje i konczy prace elegancko zamiast zostac ucietym. Minimum 20 000 tokenow.

**Wplyw na multi-agent:** to bezposrednio adresuje problem "agent zuzywa caly budzet i zostaje ucienty w polowie zadania" - warto wdrozyc w dlugotrwalych presetach (np. `/deep-research-v2`, `/swarm`) jako twardy limit kosztow per-agent zamiast reczengo liczenia iteracji.

### 3.6 Batch API - bez zmian cenowych

Batch API nadal oferuje **50% znizki** na wszystkie tokeny, wyniki dostepne przez 29 dni, limit 100K requestow/256MB na batch. Rabat sumuje sie z prompt caching. Zadnych nowych ograniczen ani podwyzek w tym polroczu. Dla architektury 42 presetow: dobre miejsce na batch to non-interaktywne fazy (np. masowa ekstrakcja danych w `research` presecie) - nadal warty rozwazenia tam, gdzie nie ma wymogu czasu rzeczywistego.

### 3.7 Fast Mode (nowosc, beta) - tylko Opus 4.8

Nowy tryb `speed: "fast"` (beta header `fast-mode-2026-02-01`) na Opus 4.8 (Opus 4.7 mial fast mode, ale jest wygaszany) - do 2.5x wiecej tokenow/sekunde przy premium cenie. Osobny limit rate-limit. Nie dziala z Batch API, Priority Tier ani platformami trzecimi.

**Wplyw:** dla presetow wymagajacych szybkiej odpowiedzi interaktywnej (np. `/quick-fix`) na Opus, fast mode moze byc alternatywa dla przejscia na Sonnet - szybciej, ale drozej niz standardowy Opus.

### 3.8 Refusal + fallback (nowosc, dotyczy glownie Fable 5)

Fable 5 ma bardziej restrykcyjne klasyfikatory bezpieczenstwa (cyber, bio) - moze zwrocic `stop_reason: "refusal"` z HTTP 200. Zaimplementowano mechanizm server-side fallback (`fallbacks` parameter + beta `server-side-fallback-2026-06-01`) - automatyczny retry na Opus 4.8 w tym samym wywolaniu przy odmowie. To istotne jesli ktos w projekcie planuje uzywac Fable 5 do najtrudniejszych zadan badawczych - bez wlaczenia fallbackow request po prostu sie zatrzyma.

### 3.9 Web search / web fetch - nowe wersje z dynamicznym filtrowaniem

Nowe typy narzedzi `web_search_20260209` i `web_fetch_20260209` (dostepne na Opus 4.6+, Sonnet 4.6+) wprowadzaja dynamiczne filtrowanie wynikow (Claude pisze i wykonuje kod filtrujacy wyniki przed trafieniem do kontekstu) - poprawia dokladnosc i efektywnosc tokenowa researchu. To bezposrednio dotyczy presetow typu `/research`, `/deep-research-v2`, `/deep-research-swarm-pro` w projekcie - warto sprawdzic, czy uzywana wersja narzedzia to `_20260209`, a nie starsza `_20250305`.

### 3.10 Code execution - nowa wersja narzedzia

`code_execution_20260521` to aktualna wersja (poprzednio `_20260120`). Kontenery persystuja 30 dni, darmowe przy laczeniu z web search/fetch, poza tym $0.05/h po 1550 darmowych godzinach/miesiac na organizacje.

## 4. Podsumowanie zmian cenowych rok-do-roku w tym polroczu

- **Haiku 4.5**: $1/$5 - bez zmian.
- **Sonnet**: $3/$15 na Sonnet 4.6 i Sonnet 5 (Sonnet 5 z promocja $2/$10 do 2026-08-31) - **cena nominalnie identyczna**, ale jakosc/token wzrosla znaczaco (Sonnet 5 zblizony do jakosci Opus), a tokenizer generuje wiecej tokenow dla tego samego tekstu (~30% wiecej vs 4.6), co w praktyce podnosi koszt calkowity zadania mimo tej samej ceny nominalnej.
- **Opus**: $5/$25 utrzymane przez cala rodzine 4.6/4.7/4.8 - trzy generacje ulepszen bez podwyzki cennika.
- **Nowa warstwa powyzej Opus**: Fable 5/Mythos 5 za $10/$50 (2x Opus) - to pierwszy w tym roku model wyraznie drozszy od dotychczasowego "sufitu" cenowego Opus.

## 5. Czy nasz routing modeli wymaga aktualizacji

**Tak, w trzech konkretnych miejscach:**

1. **Parametr `effort` musi wejsc do specyfikacji kazdego z 35 agentow.** Obecny model "Opus dla decyzji / Sonnet dla wykonania / Haiku dla prostych zadan" opisuje TYLKO wybor modelu, ale od momentu wprowadzenia adaptive thinking (luty-kwiecien 2026) prawdziwa dzwignia kosztu/jakosci to kombinacja **model + effort**. Rekomendacja: dodac kolumne "effort" do specyfikacji kazdego agenta w encyklopedii (np. Orchestrator = Opus + high/xhigh, Researcher = Sonnet + medium, Extractor = Haiku + low/brak thinking) - to bardziej precyzyjny routing niz sam wybor modelu.

2. **Rozwazyc Sonnet 5 + `effort: xhigh` jako tanszy substytut Opus w niektorych presetach.** Skoro Sonnet 5 osiaga jakosc zblizona do Opus w coding/agentic przy cenie Sonnet (nawet nizszej do konca sierpnia), warto zrewidowac te z 42 presetow, ktore dzis eskaluja do Opus "z automatu" - czesc z nich moze przejsc na Sonnet 5 przy wysokim effort i zaoszczedzic ~40-60% kosztu bez utraty jakosci na zadaniach coding/agentic (choc NIE na czysto analitycznych/decyzyjnych, gdzie Opus wciaz przoduje).

3. **Zaktualizowac dokumentacje "token budget" na "effort + task budget".** Skoro `budget_tokens` zostal usuniety z nowych modeli, wszelkie wzmianki w `docs/ROUTING_SYSTEM.md` czy `PRESET_CATALOG.md` o "budzecie tokenow myslenia" per agent sa przestarzale dla agentow dzialajacych na Fable 5/Opus 4.7+/Opus 4.8/Sonnet 5. Zamiast tego: `effort` (poziom myslenia/dzialania) + opcjonalnie `task_budget` (twardy limit tokenow na cala petle agentyczna, beta, min. 20K) dla dlugich sesji multi-agent.

**Dodatkowo, mniej pilne:** warto tez dodac wzmianke w encyklopedii, ze najnowszy tokenizer (Sonnet 5, Opus 4.7+, Fable 5) zuzywa wiecej tokenow na ten sam tekst niz starsze modele - kalkulatory kosztow w projekcie oparte na starych pomiarach moga zanizac szacowany koszt sesji na nowszych modelach nawet o ~30%.

**Nie wymaga zmian:** podstawowa hierarchia trzech tierow (Opus/Sonnet/Haiku) jako koncepcja pozostaje aktualna i sluszna - zaden nowy model nie zastapil tej logiki, jedynie ja uszczegolowil o wymiar `effort`.

---

*Zrodla: wewnetrzna baza wiedzy Claude API (cache 2026-06-24, oparta na dokumentacji Anthropic - platform.claude.com); web search (sierpien 2026) dla dat wydan i kontekstu rynkowego z zastrzezeniem nizszej wiarygodnosci serwisow trzecich cytowanych w sekcji dat.*
