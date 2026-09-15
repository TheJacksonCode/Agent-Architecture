# R6 - Reddit Anti-Patterns & Failures: Context Engineering in Claude Code

**Researcher:** R6 - Etnograf Cyfrowych Plemion (Reddit Researcher)
**Campaign:** Claude Code Context Engineering 2026
**Date:** 2026-04-17
**Sources:** Reddit r/ClaudeAI, r/ClaudeCode, r/LocalLLaMA, GitHub Issues, dev.to, Medium, X/Twitter threads
**Word count:** ~3,800 words

---

## Exec Summary

Spolecznosc deweloperow Claude Code (Reddit, GitHub Issues, dev.to) udokumentowala powtarzajace sie wzorce bledow kontekstowych ktore skutkuja: wyczerpaniem limitu tokenow, degradacja jakosci sesji, uszkodzeniem stanu sesji lub calkowitym zablokowaniem agenta. Badanie obejmuje okres lipiec 2025 - kwiecien 2026 z nalozonym rokiem (2026). Zidentyfikowano 10 glownych anti-patternow, z ktorych 4 maja poziom krytyczny (zaswiadczony przez >= 3 niezalezne zrodla). Najwazniejsze odkrycie: jakosc Clauda zaczyna spadac juz przy 20-40% wypelnienia okna kontekstowego - nie przy 80-90% jak powszechnie sie zakłada.

**Kluczowe liczby:**
- CLAUDE.md przekraczajace 40 KB powoduje ostrzezenia o degradacji (claudelint.com)
- 93-99% tokenow startowych moze byc zmarnowanych na nierelewantny kod bez .claudeignore
- 167 narzedzi MCP = 191,300 tokenow overheadu przed pierwszym promptem
- 652,069 phantom tokens wygenerowanych bez inputu uzytkownika podczas resume sesji (GitHub Issue #41930)
- $1,600 billing incident od "ukrytych kosztow architektury", nie zlych promptow
- 20,000 niewidzialnych tokenow dodawanych per request przez bug w v2.1.100

---

## Top 10 Anti-Patterns

### AP-01: Bloated CLAUDE.md - "Przepisuje tu wszystko co wiem"
**Sentiment:** NEGATIVE - wzorzec wykryty w 5+ niezaleznych zrodlach
**Confidence:** 0.95

**Objaw:**
Plik CLAUDE.md rozrasta sie do setek lub tysiecy linii pokrywajac: coding standards, architecture docs, naming conventions, error handling, commit message format, security rules, i "all the things Claude got wrong last week". Deweloper dostaje false sense of security - "Claude teraz zawsze bedzie pamietac wszystko".

**Realne liczby (dev.to, Medium 2025-2026):**
- Typowy przegladany plik: 4,847+ linii, zuzywa 10,847 tokenow
- Tylko 7.4% tej zawartosci okazuje sie relewantna per sesja
- 10,000-tokenowy CLAUDE.md = 5,000 tokenow zmarnowanych per kazda kolejka (duplikaty, stare zasady)
- Officialny limit: 40 KB / ~40,000 znakow - po przekroczeniu ClaudeCode wyswietla ostrzezenie o degradacji

**Cytat z r/ClaudeCode (anonimowy, 2025-Q4):**
> "I kept adding rules every time Claude made a mistake. My CLAUDE.md hit 800 lines. Claude started ignoring half of it and my context was always 15k tokens before I typed a word."

**Dlaczego to dziala zle:**
CLAUDE.md jest ladowany przed kazdym turnem. Jesli plik jest duzy, Claude traci uwage na poznych sekcjach (attention dilution). Anthropic oficjalnie rekomenduje < 200 linii / ~500 slow.

**Remedium:**
- Ogranicz do < 200 linii: tylko guardrails i pointery
- Przeniesc rules do `.claude/rules/` z path-scope frontmatter
- Enable `claude-md-size` rule w claudelint (limit 40k chars)
- Testuj: czy Claude faktycznie stosuje zasady z konca pliku?

**Zrodla:**
- https://claudelint.com/rules/claude-md/claude-md-size
- https://naqeebali-shamsi.medium.com/stop-wasting-tokens-a-developers-guide-to-claude-code-cleanup-de842f6403e5
- https://dev.to/andrei_nita/how-to-hyper-optimise-claude-code-the-complete-engineering-guide-1eh3
- https://dev.to/ujja/a-week-with-claude-code-lessons-surprises-and-smarter-workflows-23ip

---

### AP-02: Recursive / Circular @imports - "Skill A importuje Skill B ktory importuje Skill A"
**Sentiment:** NEGATIVE - edge case ale z bardzo twardymi skutkami
**Confidence:** 0.82 (mniej powszechne ale dobrze udokumentowane)

**Objaw:**
Skills lub CLAUDE.md uzywa `@import` ktory tworzy cykl. Loader wykrywa cykl (zbior "currently loading") i rzuca komunikat:
```
"Circular dependency detected while loading skill: pdf -> tdd -> pdf"
```
lub cichy infinite recursion zanim ochrona zadziala.

**Konkretne triggery:**
- Skill A `requires: [skill-B]` w YAML frontmatter, Skill B `requires: [skill-A]`
- Wspolny helper module importowany przez dwa skills ktore sa wzajemnie zalezne
- Symlinki w katalogu skills wskazujace na katalog nadrzedny
- Plugin i jego macierzysty skill wzajemnie sie importujace

**Subtypowy problem: transitive bloat**
Nawet bez cyklu, lancuchy importow `A -> B -> C -> D -> ...` laduja ogromne ilosci kontekstu ktore uzytkownik nie zamierzal zaladowac. Kazdy wezzel lancucha to dodatkowe tokeny.

**Remedium:**
- Extract shared logic do neutral moduli (poza katalogiem skills)
- Lazy loading zamiast import na poziomie modulu
- Unidirectional dependency flow (generic -> specific, nigdy odwrotnie)
- Dependency injection: przekazuj API w dol, nie importuj w gore

**Zrodlo:**
- https://claudecodeguides.com/claude-code-skill-circular-dependency-detected-error-fix/
- https://github.com/anthropics/claude-code/issues/2950

---

### AP-03: MCP Response Size Bomb - "Tool zwraca 500k tokenow"
**Sentiment:** NEGATIVE - krytyczny, wzorzec w >= 5 zrodlach
**Confidence:** 0.93

**Objaw:**
MCP tool (najczesciej Docker, database client, log fetcher, file system explorer) zwraca pelna odpowiedz bez paginacji lub limitu. Kontekst natychmiast pelnieje.

**Udokumentowane przypadki z GitHub Issues:**
- Issue #12241 (Nov 24, 2025): MCP_DOCKER = 135 narzedzi, 125,964 tokenow; chrome-devtools = 26 narzedzi, 17,512 tokenow. Lacznie 144,802 tokenow SAMYCH DEFINICJI NARZEDZI przed pierwszym promptem.
- Ogolny przypadek (claudefa.st): 4 serwery MCP = 67,000 tokenow wyczerpanych przed praca
- Ekstremum (dev.to hyper-optimise guide): 167 narzedzi = 191,300 tokenow overheadu

**Dodatkowy problem: tool schema overhead**
Nie tylko odpowiedzi - SAME SCHEMATY narzedzi sa drogie. 50-tool setup = 72,000 tokenow schema overhead na starcie sesji (PRZED jakimkolwiek userem promptem).

**Remedium:**
- Scope MCP servers do `local` nie `user` - tylko relevantne servery per projekt
- Wlacz `ENABLE_TOOL_SEARCH: true` w settings.json (deferred tool loading: z 72K na 2K tokenow)
- McPick CLI - toggle serwerow przed startem sesji
- Jeden MCP server per workflow, nie mega-server z wszystkim
- Tool Search feature: redukcja 46.9% (51K -> 8.5K tokenow) wedlug raportow uzytkownikow

**Zrodla:**
- https://github.com/anthropics/claude-code/issues/12241
- https://scottspence.com/posts/optimising-mcp-server-context-usage-in-claude-code
- https://demiliani.com/2025/09/04/model-context-protocol-and-the-too-many-tools-problem/
- https://dev.to/andrei_nita/how-to-hyper-optimise-claude-code-the-complete-engineering-guide-1eh3

---

### AP-04: Read Bez head_limit Na Duzych Plikach - "Wczytaj caly log zeby znalezc jeden blad"
**Sentiment:** NEGATIVE - wzorzec w 4+ zrodlach, jeden krytyczny bug
**Confidence:** 0.90

**Objaw:**
Agent wywoluje Read tool na duzym pliku (log, build output, minified JS, duzy plik CSV, obraz) bez offset/limit parametrow. Pelna zawartosc laduje do kontekstu i pozostaje tam na wszystkie kolejne kolejki.

**Extreme case (Issue #6780, Aug 2025 - CRITICAL BUG):**
Wczytanie pliku 8.5 MB przez Read tool nie tylko zapelnilo kontekst - zatrulo WSZYSTKIE NOWE SESJE w projekcie. Powod: Claude Code v1.0.93-96 zaczal synchronizowac dane sesji z chmura Anthropic. Zatruta sesja była przywracana przy kazdym starcie. Plik sesji: 16.3MB -> 27MB per nowy start. Status: closed as "not planned".

**Kosztowy wzorzec (Medium, 2025):**
- "A 10,000-line log file stays in context for every subsequent message in that session"
- Reduntantne wczytanie tego samego pliku: worst case = 33 wczytania jednego pliku = 561K tokenow zmarnowanych
- 662 wywolania cat/grep/find przez Bash zamiast natywnych narzedzi = dodatkowy context bloat

**Remedium:**
- Zawsze uzywaj `offset` i `limit` dla duzych plikow (Read tool)
- Grep/Glob zamiast Read dla wyszukiwania w plikach
- `head_limit` parameter przy przeszukiwaniu (Grep tool)
- Przed wczytaniem: sprawdz czy zawartosc jest juz w kontekscie
- Nigdy nie wczytuj plikow >5MB przez Read (limit API)

**Zrodla:**
- https://github.com/anthropics/claude-code/issues/6780
- https://github.com/anthropics/claude-code/issues/40357
- https://medium.com/@samarthgupta1911/anthropic-isnt-the-only-reason-you-re-hitting-claude-code-limits-8de8d07d3c7b
- https://buildtolaunch.substack.com/p/claude-code-token-optimization

---

### AP-05: Niekontrolowany Bash Output - "rg . bez limitow w duzym repo"
**Sentiment:** NEGATIVE - wzorzec w 3+ zrodlach
**Confidence:** 0.85

**Objaw:**
Agent lub uzytkownik uruchamia komendy Bash ktore produkuja ogromny output: `rg pattern .` bez `--max-count`, `find /` bez `-maxdepth`, `cat large_file`, `npm install` (verbose), `docker logs container` (full history). Output przekracza 30,000 znakow i jest automatycznie obcinany przez Claude Code - ale zanim to nastapi, mnostwo tokenow jest juz zmarnowanych.

**Cytaty spolecznosci (r/ClaudeAI, agregowane przez morphllm.com 2026):**
> "Most agent token waste comes from uncontrolled discovery. Claude lists directories, opens files speculatively, greps vaguely, then repeats."

**Konkretny anti-pattern: bash zamiast native tools**
- 662 udokumentowane wywolania `cat/grep/find` przez Bash shell zamiast Read/Grep/Glob tools
- Bash output: pelny tekst wchodzi do historii konwersacji i POZOSTAJE
- Native tools: Claude moze efficienter zarzadzac danymi

**Remedium:**
- `rg pattern . --max-count 20 --max-filesize 1M`
- Preferuj Grep tool (natywny) zamiast `rg` przez Bash
- Bash outputs >5k znakow: wart refaktoryzacji na native tool
- W CLAUDE.md: "zawsze uzywaj rg z --max-count flag"

**Zrodla:**
- https://dev.to/sagarmk/how-i-built-a-claude-code-plugin-that-intercepts-grep-and-replaces-it-with-semantic-search-500h
- https://medium.com/@samarthgupta1911/anthropic-isnt-the-only-reason-you-re-hitting-claude-code-limits-8de8d07d3c7b
- https://buildtolaunch.substack.com/p/claude-code-token-optimization

---

### AP-06: Context Rot z Dlugich Sesji - "Im dluzej tym gorzej"
**Sentiment:** NEGATIVE - KRYTYCZNY wzorzec, setki postow na Reddit 2025-2026
**Confidence:** 0.97 (jeden z najszerzej potwierdzonych)

**Objaw:**
Jakosc odpowiedzi Clauda wyraznie spada w toku dlugiej sesji. Uzytkownik obserwuje: proponowanie rozwiazania ktore wlasnie odrzucil, powrot do naprawionych juz bledow, vague/hedged odpowiedzi, sprzeczne sugestie.

**KRYTYCZNY FINDING: degradacja zaczyna sie przy 20-40% kontekstu (nie 80%)**
Zrodlo: docs.bswen.com (marzec 2026), MindStudio.ai:
> "Claude's quality starts slipping at 20-40% of context capacity. Not at 100%. Not at 80%."

Thresholds:
- 0-20% fill: peak performance
- 20-40% fill: quality begins slipping (40k-80k tokens dla 200k okna)
- 40%+ fill: significant degradation

Mechanizm: attention dilution - model ma coraz trudniejszy czas skupienia uwagi na relewantnych czesciach przy dlugim kontekscie.

**Real-world benchmark (r/ClaudeAI, morfllm.com 2026):**
- Task ktory zajmuje 4.5 minuty przez manual Claude Chat: 18 minut w zdegradowanej dlugiej sesji Claude Code
- Sesja turn 50: 134,800 tokenow, tylko 25,000 relewantnych (18.5%) - 81.5% to "dead weight"

**"Claude Is Dead" post (r/Anthropic, wrzesien 2025): 841 upvotow**
Jeden z najbardziej upvotowanych postow narzekajacych na degradacje w czasie, wiecej niz oficjalna odpowiedz Anthropic.

**Cytat spolecznosci:**
> "The first few tasks in a session are sharp and accurate, but gradually things get inconsistent - Claude suggests a different approach to something it already helped build."

**Remedium:**
- `/compact` prewencyjnie przy 40-50% kontekstu (nie czekaj na 80-90%)
- `/clear` i nowa sesja po 2 nieudanych korekcjach
- Krotkie, focused sesje > dluge marathony (reddit consensus)
- Commit checkpoint przed kazdym autonomous work - rollback zamiast "fix forward"
- Zewnetrzne pliki pamieci (CLAUDE.md, PROGRESS.md) jako session-agnostic truth

**Zrodla:**
- https://www.mindstudio.ai/blog/what-is-context-rot-claude-code
- https://docs.bswen.com/blog/2026-03-19-claude-context-window-degradation/
- https://www.morphllm.com/claude-code-reddit
- https://hyperdev.matsuoka.com/p/when-claude-forgets-how-to-code

---

### AP-07: Autocompact Thrashing - "Kompaktuje w petli nieskonczonej"
**Sentiment:** NEGATIVE - bug + user-error combo
**Confidence:** 0.85

**Objaw:**
Claude Code wchodzi w petle kompakcji: kompaktuje -> kontekst natychmiast przepelnia sie ponownie -> kompaktuje znow. Wersja worst-case: "Autocompact is thrashing: the context refilled to the limit" i Claude Code zatrzymuje sie.

**Udokumentowane przypadki:**
- Issue #2283 (June 19, 2025): Usuniecie pustego CLAUDE.md triggerowal infinite autocompact loop. "Context left until auto-compact: 169%" - sprzeczne dane. Rozwiazanie: brak. Status: closed not planned.
- Issue #34363: Po upgrade do v2.1.76, bufor autocompact byl obliczany dla 1M okna ale aplikowany do 200k. Natychmiastowy loop po starcie sesji.
- Issue #9579 (Oct 15, 2025): "Autocompacting Loop Causing Massive Token Usage Spikes"
- Issue #42647: "High Token Burn Due to Redundant Context Resubmission & Compaction Loops"

**Root cause user-side:**
Duzy tool output (MCP, log file, Read na duzym pliku) przepelnia kontekst zaraz po kompakcji. To nie bug - to zasada: "jesli tool zwraca wiecej niz cale okno, kompakcja nie pomoze".

**Remedium:**
- Napierw ogranicz rozmiar tool outputs (patrz AP-03, AP-04)
- Jezeli sesja jest w petli: kill, start fresh, napierw fix przyczyne przepelnienia
- Dla bug #34363: downgrade do poprzedniej wersji
- Trigger autocompact wczesniej (configurowalny prog - Issue #28728 otwarte)

**Zrodla:**
- https://github.com/anthropics/claude-code/issues/2283
- https://github.com/anthropics/claude-code/issues/34363
- https://github.com/anthropics/claude-code/issues/9579
- https://claudefa.st/blog/guide/mechanics/context-buffer-management

---

### AP-08: Invisible Token Inflation - "Placi ale nie rozumie za co"
**Sentiment:** NEGATIVE - systemowy problem, krytyczny dla billingowy
**Confidence:** 0.88

**Objaw:**
Tokeny sa konsumowane w ilosci ktora nie odpowiada widzialnemu inputowi uzytkownika. Uzytkownik widzi krotki prompt, ale billing pokazuje dziesiaki tysiecy tokenow.

**Udokumentowane przypadki:**

**Bug v2.1.100 (Marzec 2026):**
- Invisible 20,000 tokenow per request od wersji v2.1.100
- Analiza HTTP proxy: v2.1.98 = 49,726 tokenow; v2.1.100 = 69,922 tokenow
- Delta: ~40% faster consumption (server-side injection, niewidoczne w CLI)
- Workaround: downgrade do v2.1.98

**Resume/Continue flag bug (GitHub #41930, Marzec 2026):**
- `--resume` i `--continue` fagi invaliduja cache konwersacji
- 652,069 output tokenow wygenerowanych bez promptow uzytkownika podczas session resume
- Pojedynczy "morning" = 15% limitu Max 5x
- Sesja 5-godzinna wyczerpana w 19 minut

**Billing sentinel string replacement bug:**
- Anthropic custom Bun fork robi string replacement na wszystkich requestach API
- Gdy historia konwersacji zawiera billing-related slowa: replacement trafia w zle miejsce
- Psuje cache prefix = pelny rebuild = 10-20x inflacja kosztow

**Cytat z r/ClaudeAI (Marzec 2026, >330 komentarzy):**
> "I typed 'good morning' and watched 15% of my Max 5x quota disappear in real time."

**Remedium:**
- Monitoruj pierwsze kilka kolejek nowej sesji - jesli >3-5% kosztu na krotki message: restart
- Unikaj `--resume` i `--continue` flag (w tym okresie)
- Downgrade wersji jezeli inflacja jest podejrzana
- Wlacz HTTP proxy logging dla audytu (zaawansowane)

**Zrodla:**
- https://efficienist.com/claude-code-may-be-burning-your-limits-with-invisible-tokens-you-cant-see-or-audit/
- https://github.com/anthropics/claude-code/issues/41930
- https://devops.com/claude-code-quota-limits-usage-problems/

---

### AP-09: "Kitchen Sink Session" - "Miesze wszystko w jednej sesji"
**Sentiment:** NEGATIVE - najczesciej cytowany anti-pattern w oficjalnych docs + Reddit
**Confidence:** 0.95

**Objaw:**
Uzytkownik zaczyna od jednego zadania ("dodaj feature X"), pozniej pyta o cos niespokrewnionego ("jak sie robi Y?"), wraca do feature X, pozniej pyta o debugowanie ("czemu Z sie psuje?"), itd. Sesja akumuluje niepowiazany kontekst ktory zmnienia sie w szum dla modelu.

**Cytaty Reddit (agregowane morphllm.com, aitooldiscovery.com 2026):**
> "Claude Code is the best coding tool I've ever used, for the 45 minutes a day I can actually use it." [o wyczerpaniu limitu przez mieszane sesje]

**Oficjalny Anthropic naming (best-practices docs):**
"The Kitchen Sink Session" - punkt 1 na liscie typowych bledow. Remedium: `/clear` miedzy niezwiazanymi zadaniami.

**Podtyp: "Iteracyjna korekcja zamiast restartu"**
Po bledzie Claude'a uzytkownik poprawia w tej samej sesji. Blad + korekcja + nowy blad + korekcja = kontekst pelny niepowodzen. Oficjalne zalecenie: po 2 nieudanych korekcjach -> `/clear` i lepszy prompt.

**Remedium:**
- `/clear` miedzy niezwiazanymi zadaniami (nie kosztuje nic)
- Jedna sesja = jedno focused zadanie
- Regula "2 poprawek": po 2 nieudanych -> restart z lepszym promptem
- Planuj zadania przed otwarciem sesji (plan mode first)

**Zrodla:**
- https://code.claude.com/docs/en/best-practices
- https://www.morphllm.com/claude-code-reddit
- https://johnoct.com/blog/2025/08/01/claude-code-best-practices-lessons-learned/

---

### AP-10: Cache Expiry z Idle Gap - "Odeszlem na herbate i zgubialem cache"
**Sentiment:** NEGATIVE - mniej znany ale kosztowny
**Confidence:** 0.80

**Objaw:**
Cache promptow wygasa po ~5 minutach bezczynnosci. Po powrocie uzytkownika: pelny rebuild kontekstu zamiast taniego cache-read. Dla dlugotrwalych sesji: wielokrotne rebuildy.

**Udokumentowane liczby (Medium, analiza 858 sesji):**
- 54% kolejek nastepowalo po idle gap dluzszym niz 5 minut
- Mnoznik kosztu: 10x (cache miss vs cache hit)
- ~12.3 milionow zmarnowanych tokenow w jednym zbiorze sesji

**Podtyp: cache invalidation z --resume flag**
Resume flag wstrzykuje tool attachments w innej pozycji = invalidity calego cache prefix = pelny reprocessing. Dokumentacja Issue #41930 pokazuje 652K phantom tokens z tej przyczyny.

**Remedium:**
- `/compact` przed wyjsciem z sesji (zmniejsza rozmiar jaki musi byc przebudowany)
- `/clear` i nowa sesja jezeli przerwa dluzej niz 10-15 minut
- PROGRESS.md jako external state - szybki restart bez drogu kontekstu
- Unikaj `--resume` jezeli mozliwe; preferuj `/clear` + nowy start z memory injection

**Zrodla:**
- https://medium.com/@samarthgupta1911/anthropic-isnt-the-only-reason-you-re-hitting-claude-code-limits-8de8d07d3c7b
- https://github.com/anthropics/claude-code/issues/41930

---

## Case Studies - Konkretne Watki i Incydenty

### CS-01: "652K Phantom Tokens" - March 2026 Token Drain Crisis
**Zrodlo:** GitHub Issue #41930 (otwarte 23 marca 2026, > 300 komentarzy)
**Subreddit:** r/ClaudeAI (crosspost >330 komentarzy)
**Severity:** Krytyczny - setki uzytkownikow dotknietych

Wzorzec awarii: sesja Max 20x ($200/mies) konsumuje limit w 19 minut. Przy resume sesji, `--resume` i `--continue` fagi wstrzykowaly tool attachments w inna pozycje niz oryginalna, invalida caly cache konwersacji i forcowal pelny reprocessing. Rezultat: 652,069 tokenow outputu bez ZADNEGO promptu uzytkownika.

Oficjalna komunikacja: zero. Tylko posty indywidualnych inzynierow Anthropic na X/Twitter i komentarze na Reddit. Brak blog posta, emaila, statusu strony przez ponad 7 dni.

Cztery nakladajace sie przyczyny: throttling peak-hour + billing sentinel string bug + resume/continue cache invalidation + wygasniecie 2x off-peak promocji 28 marca.

Lekcja dla uzytkownikow: `--resume` flag to high-risk operacja. Bezpieczna alternatywa: `/clear` + nowy start z memory injection.

### CS-02: Infinite Autocompact Loop - "Usunalem pusty plik i zniszczylem sesje"
**Zrodlo:** GitHub Issue #2283 (June 19, 2025)
**Platform:** macOS + IntelliJ IDE

Uzytkownik usunął pusty CLAUDE.md. Claude Code wszedl w infinite compaction loop, wyswietlajac "Context left until auto-compact: 169%" (wartosc sprzeczna). Kazda proba ucieczki - /init, restart aplikacji - triggerowal nowy cykl kompakcji. Status po zamknieciu jako "not planned" - brak resolvingu.

### CS-03: Read Tool Session Corruption - "Wielkie pliki = permanentna trucizna"
**Zrodlo:** GitHub Issue #6780 (August 28, 2025, v1.0.93-96)

Uzytkownik wczytal plik obrazu 8.5 MB. Sesja zostala zatruta i uploadowana do chmury Anthropic. WSZYSTKIE nowe sesje w tym projekcie dziedziczyly zatrute dane. Kasowanie lokalnych plikow nie pomagalo - Anthropic przywracal dane z serwera. Kazdy nowy start generował plik sesji 27 MB. Obejscie: recznie podac ID czystej sesji przez `claude -r <session-id>`. Lekcja: Claude Code od v1.0.93 synchronizuje stan sesji z chmura - usuniecie lokalnych plikow NIE jest wystarczajace.

### CS-04: MCP Docker 125K Token Bomb
**Zrodlo:** GitHub Issue #12241 (November 24, 2025)

Uzytkownik z MCP_DOCKER (135 narzedzi) + chrome-devtools (26 narzedzi): lacznie 144,802 tokenow samych definicji narzedzi. Niemozliwe uruchomienie jakiegokolwiek komendy bez natychmiastowego ostrzezenia o niskim kontekscie. Problem pojawil sie po nowej wersji (regression) bez zadnych zmian po stronie uzytkownika. Zamkniety jako "not planned".

### CS-05: $1,600 Billing Incident - "Architektura mnie zrujnowala, nie prompty"
**Zrodlo:** buildtolaunch.substack.com, April 2026

Deweloper opisuje bill $1,600 od Claude Code API. Przyczyny: (1) pelne wczytywanie repo bez .claudeignore (93% tokenow na nierelewantny kod), (2) extended thinking bez ustawionego MAX_THINKING_TOKENS, (3) caching bugs marca 2026 z 10-20x inflacja bez ostrzezenia. Kluczowa lekcja: koszty kontekstu sa "invisible architecture costs" - nie przychodza z dlugich promptow ale z struktury sesji.

---

## Patterns Detected

| Pattern | Zrodla potwierdzajace | Severity |
|---------|----------------------|----------|
| Context rot przy < 50% fill (nie 100%) | 5+ | HIGH |
| MCP tool schema overhead > user context | 4+ | HIGH |
| CLAUDE.md > 200 linii = diminishing returns | 5+ | MEDIUM-HIGH |
| Resume/continue flag = cache invalidation | 3+ | HIGH |
| Read bez limit = persistent session bloat | 3+ | HIGH |
| Idle gap > 5 min = cache miss 10x | 2 (mniej znane) | MEDIUM |
| Circular skill imports = crash | 2 (edge case) | MEDIUM |
| Kitchen sink session = attention diffusion | oficjalne docs + Reddit | HIGH |
| Autocompact thrash po duzym tool output | 4 issues | MEDIUM-HIGH |

---

## Controversies i Konflikty

**KONFLIKT 1: Kiedy zaczyna sie degradacja?**
- Zrodlo A (docs.bswen.com): degradacja przy 20-40% kontekstu
- Zrodlo B (MindStudio): degradacja przy 70-75% kontekstu
- Zrodlo C (morfllm.com): praktyczna granica = 147,000-152,000 tokenow (wg inzyniera Sourcegraph)
- **Ocena:** Roznica prawdopodobnie wynika z roznych tybow zadan. Prostsze taski: degradacja pozniejsza. Kompleksowe multi-file agentic: wczesniej.

**KONFLIKT 2: Czy autocompact pomaga czy szkodzi?**
- Oficjalne docs: autocompact to "bezpieczna siatka"
- GitHub Issues: autocompact thrashing jako przyczyna masywnych strat tokenow i petli
- **Ocena:** Autocompact jest bezpieczny gdy tool outputs sa male. Przy duzych outputach (MCP, log files) - staje sie petla. Blad lezacy po obu stronach: zly tool output rozmiar + brak configurowalnego thresholds.

**KONFLIKT 3: Czy --resume flag jest bezpieczny?**
- Oficjalna dokumentacja: polecany dla kontynuacji pracy
- GitHub Issue #41930: glowna przyczyna 652K phantom tokens w marcu 2026
- **Ocena (April 2026):** Tymczasowo unsafe - bug moze byc naprawiony ale nie potwierdzono. Zalecenie: /clear + fresh start z external memory zamiast --resume.

---

## Gaps i Ograniczenia

**GAPS w dostepnych danych:**
1. Konkretne posty Reddit z linkami i upvotami sa trudne do wyekstrahowania - wiekszosc agregatorow (morphllm.com, aitooldiscovery.com) cytuje "Reddit user reports" bez bezposrednich URL
2. Brak danych o skutkach zbytniej specjalizacji skill files (tysiace linii per skill) - tylko anegdotalne odniesienia
3. Brak danych o context pollution specyficznie z powrotow od parallel subagents - tylko ogolne rekomendacje (2-4 subagents jako sweet spot)
4. X/Twitter sources: trudne do systematycznego zebrania - tylko pojedyncze przytoczenia

**FLAGOWANIA (anegdotalne, sample size 1):**
- CS-02 (infinite loop z usuniecia pustego pliku): jeden reporter, closed not planned
- CS-03 (session corruption z obrazu): jeden reporter, specyficzny dla v1.0.93-96
- AP-10 (idle gap 54% statystyka): jeden reporter analizujacy swoje 858 sesji

**Confidence redukcje:**
- AP-02 (circular imports): 0.82 - stosunkowo rzadkie, edge case
- AP-10 (cache expiry): 0.80 - mniej komentowane w spolecznosci

---

## Citations (Minimum 10 URL Sources)

1. https://www.mindstudio.ai/blog/what-is-context-rot-claude-code - Context rot definition, symptoms, thresholds
2. https://docs.bswen.com/blog/2026-03-19-claude-context-window-degradation/ - Technical analysis, 20-40% threshold finding
3. https://github.com/anthropics/claude-code/issues/41930 - Token drain crisis March 2026, root causes, phantom tokens
4. https://github.com/anthropics/claude-code/issues/12241 - MCP Docker 144K token bomb
5. https://github.com/anthropics/claude-code/issues/6780 - Read tool session corruption
6. https://github.com/anthropics/claude-code/issues/2283 - Infinite autocompact loop
7. https://github.com/anthropics/claude-code/issues/9579 - Autocompacting loop massive token spikes Oct 2025
8. https://efficienist.com/claude-code-may-be-burning-your-limits-with-invisible-tokens-you-cant-see-or-audit/ - v2.1.100 invisible token inflation
9. https://naqeebali-shamsi.medium.com/stop-wasting-tokens-a-developers-guide-to-claude-code-cleanup-de842f6403e5 - Audit anti-patterns: 25K per call z 160 skills
10. https://dev.to/andrei_nita/how-to-hyper-optimise-claude-code-the-complete-engineering-guide-1eh3 - 10 anti-patterns z liczbami, 99.5% waste scenario
11. https://buildtolaunch.substack.com/p/claude-code-token-optimization - $1,600 billing incident, tool output accumulation
12. https://claudelint.com/rules/claude-md/claude-md-size - 40KB limit oficjalny
13. https://scottspence.com/posts/optimising-mcp-server-context-usage-in-claude-code - MCP context optimization
14. https://engineering.atspotify.com/2025/11/context-engineering-background-coding-agents-part-2 - Spotify lessons, tool restriction philosophy
15. https://claudecodeguides.com/claude-code-skill-circular-dependency-detected-error-fix/ - Circular dependency technical details
16. https://medium.com/@samarthgupta1911/anthropic-isnt-the-only-reason-you-re-hitting-claude-code-limits-8de8d07d3c7b - 858 sessions analysis, idle gap statistics
17. https://devops.com/claude-code-quota-limits-usage-problems/ - Token drain crisis coverage, March 2026
18. https://www.morphllm.com/claude-code-reddit - Reddit community sentiment aggregation
19. https://hyperdev.matsuoka.com/p/when-claude-forgets-how-to-code - December 2025 quality crisis
20. https://demiliani.com/2025/09/04/model-context-protocol-and-the-too-many-tools-problem/ - Too many tools problem

---

## Summary (5-10 linii)

R6 zidentyfikowal 10 powtarzajacych sie anti-patternow w praktyce deweloperow Claude Code (Reddit, GitHub Issues, dev.to, Medium, lipiec 2025 - kwiecien 2026). Najwazniejsze odkrycie: degradacja jakosci zaczyna sie przy 20-40% wypelnienia okna kontekstowego - nie 80-90% jak intuicyjnie zakladaja uzytkownikow. MCP tool schema overhead jest drugim najgrozniejszym problemem - 167 narzedzi = 191K tokenow PRZED pierwszym promptem. Marzec 2026 przynisl systemowy kryzys: 4 nakladajace sie bugi Anthropic z 10-20x inflacja kosztow i 652K phantom tokenami z session resume. CLAUDE.md > 200 linii daje malejace zwroty; oficjalny limit to 40KB. Autocompact nie jest panaceum - przy duzych tool outputs wchodzi w petle. Kluczowe remedium powtarzajace sie we wszystkich zrodlach: `/clear` agresywnie, zewnetrzne pliki pamieci (PROGRESS.md, MEMORY.md) jako session-agnostic truth, i scope MCP do minimalnego niezbednego zestawu.

---

## BRAMA 2 Status

**Status:** PASS - raport gotowy do peer review przez Krytyka

**Podstawa decyzji:**
- Pokrycie: 10/10 anty-patternow (wszystkie z pytania R6 pokryte)
- Zrodla: 20 URL (minimum 10 wymagane)
- Case studies: 5 konkretnych incydentow z datami i numerami GitHub Issues
- Slowa: ~3,800 (w zakresie 1,500-5,000)
- Flagowania anegdotycznych przypadkow: 3 wyraznie oznaczone
- Daty postow: podane gdzie dostepne (lipiec-kwiecien 2025-2026)
- Konflikty: 3 wyraznie opisane z ocena wiarygodnosci
- Gaps: wyraznie zidentyfikowane (brak bezposrednich Reddit URL z upvotami)

**Otwarte watpliwosci dla Krytyka:**
1. Czy 20-40% threshold degradacji (bswen.com) jest wystarczajaco wiarygodny jako rekomendacja?
2. Invisible token inflation (v2.1.100) - czy zostala naprawiona w pozniejszych wersjach?
3. Reddit direct URL gap - zrodla agregowane zamiast bezposrednich linkow; czy to akceptowalne przy danej metodologii?
