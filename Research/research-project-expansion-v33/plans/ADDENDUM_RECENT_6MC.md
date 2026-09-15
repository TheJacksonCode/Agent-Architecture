# ADDENDUM - Najnowsze aktualizacje (luty-sierpien 2026)

> Dodatek do `SYNTHESIS_FINAL_v33.md`. Zrodla: RR1-RR5 z `research-recent/`. Data zebrania: 2026-08-21.
> Cel: same fakty z ostatniego polrocza, oznaczone czy sa relevantne dla Agent Architecture Designer.

## Platforma Claude Code / Skills / Subagents (RR1)

- **30.06.2026** - Claude Sonnet 5, nowy domyslny model, mocniejszy agentic.
- **17-22.07.2026** - deprecation parametru `mode` w Task tool; **limity subagentow: max 20 rownoczesnych, max 200/sesje, max glebokosc zagniezdzenia 3**. RELEVANTNE: bezposrednio wplywa na to, czy najciezsze presety (deep-five-minds 25 agentow, deep-research-swarm-pro, deep-research-v2 17 agentow) moga wykonac sie bez throttlingu - warto dopisac ostrzezenie do docs/ROUTING_SYSTEM.md.
- **23-28.07.2026** - MCP spec 2026-07-28: przejscie na "stateless core", deprecation Roots/Sampling/Logging.
- **04.08.2026** - skille z `context: fork` domyslnie dzialaja w tle.
- **13.08.2026** - subagent forking domyslnie wlaczony z dziedziczeniem pelnej konwersacji + prompt cache.
- **14.08.2026** - TodoWrite/TaskCreate zniknely domyslnie z najnowszych modeli. RELEVANTNE: orkiestratorzy presetow polegajacy na natywnym trackingu zadan moga wymagac jawnego `CLAUDE_CODE_ENABLE_TODO_TOOLS=1`.

Uwaga: jeden z researcherow (RR5) napotkal niepotwierdzone wzmianki o "Claude Opus 5" (rzekomo 24.07.2026) w niskiej jakosci zrodlach SEO - autorytatywna dokumentacja API tego nie potwierdza, najnowszy potwierdzony to Opus 4.8. Traktowac jako plotke do weryfikacji, nie fakt.

## Orkiestracja multi-agent (RR2)

- **Krytyka wzorca "debate" (WYSOKI priorytet, 3 niezalezne prace arXiv 2026: Confident Liar 2606.10296, Deliberative Illusion 2606.03032, Biased Consensus 2608.02827)** - multi-agent debate systematycznie traci fakty i homogenizuje stanowiska w kolejnych turach ("groupthink modeli"). RELEVANTNE bezposrednio: `five-minds`, `five-minds-strategic`, `deep-five-minds`, `perf-squad` - rekomendacja dodac sekcje "znane ograniczenia debaty" + mitygacje (np. anonimizacja tozsamosci modelu w debacie, o czym mowil tez R1 z fazy 2).
- **Cascade routing zwalidowany zewnetrznie** - 40-85% redukcji kosztu przez routing, 47-80% z cache - zbiezne z deklaracja presetu `cascade`.
- **Google ADK v2.0 GA (19.05.2026)** - przejscie na graph-based execution engine, potwierdza ze model grafowy jest branzowym standardem (obecna architektura orchestrator+subagenci jest zgodna).
- Zasada "mniejszy zespol agentow = taniej" zwalidowana akademicko (Uno-Orchestra 2605.05007) - juz obecna w globalnym CLAUDE.md usera.

## Content/voice/kariera (RR3) - najwazniejsze dla planu agenta-copywritera

- **LinkedIn wycofal AI "enhance post" i wprowadzil raportowanie "AI slop" (koniec lipca 2026).** NAJWAZNIEJSZY sygnal calej fazy RR: platforma aktywnie karze generyczny AI-ton i faworyzuje autentyczny glos. To mocno potwierdza kierunek stylu-profiler+voice-writer wiernie nasladujacego idiolekt usera, a NIE wygladzajacego tekst do "poprawnej" AI-normy.
- Claude natywnie ma juz Custom Styles + Memory (stan czerwiec 2026) - projekt musi sie roznicowac wielokanalowoscia i wersjonowanym artefaktem profilu glosu wspoldzielonym miedzy agentami (nie pojedyncza funkcja stylu).
- Bloomberry - najbardziej zaawansowany publiczny wzorzec "voice DNA": uczy sie z calego korpusu tresci, nie z kilku probek - warto to uwzglednic przy projektowaniu style-profiler (moze przyjmowac wiecej niz 3-5 probek jesli user je ma).
- Rynek AI mock-interview dojrzal (real-time co-pilot podczas prawdziwej rozmowy) - nasz interview_coach powinien byc pozycjonowany jako TRENING/przygotowanie, nie live-cheating, ze wzgledow etycznych.
- OpenAI integruje job search + CV editor w ChatGPT (polowa 2026) - potwierdza ze kategoria "AI + kariera" jest aktywnie rozwijana przez duzych graczy, nie nisza.

## Konkurencja/GitHub (RR4)

- wshobson/agents urosl z ~29K do ~36.6K+ gwiazdek i przeksztalcil sie w multi-harness plugin marketplace (Claude Code, Codex, Cursor, OpenCode, Copilot/Gemini).
- Anthropic uruchomil oficjalny `claude-plugins-official` marketplace (200+ pluginow, lipiec 2026) + Claude Enterprise Marketplace (marzec 2026).
- Nowi gracze konceptualnie blisko naszego projektu: `kubony/claude-code-visualizer` (analityka sesji/kosztow na zywo) i `Ngxba/claude-code-cli-ui` (wizualny builder pipeline'ow) - ZADEN nie laczy wizualizacji z pelna dwujezyczna encyklopedia jak Agent Architecture Designer. Pozycja projektu pozostaje unikalna, ale przestrzen sie zageszcza.
- Rekomendacja RR4: rozwazyc wpis do hesreallyhim/awesome-claude-code (51.7K gwiazdek, najwiekszy kanal discoverability) jako tania dzwignia widocznosci przy publikacji v33.

## Modele i koszty (RR5)

- Stan sierpien 2026: Opus 4.8 ($5/$25 per MTok, bez zmian ceny od 4.6), Sonnet 5 ($3/$15, promocja $2/$10 do 31.08.2026), Haiku 4.5 bez zmian ($1/$5), nowa warstwa Fable 5/Mythos 5 ($10/$50) powyzej Opus.
- Manualny `budget_tokens` usuniety na nowych modelach - zastapiony `thinking: adaptive` + `output_config.effort` (low/medium/high/xhigh/max). RELEVANTNE: warto dodac wymiar `effort` do specyfikacji agentow obok wyboru modelu, nie tylko model.
- Task Budgets (beta) - twardy limit tokenow na cala petle agentyczna.
- Nowy tokenizer (Sonnet 5, Opus 4.7+, Fable 5) generuje ~30% wiecej tokenow dla tego samego tekstu - wplywa na wszelkie kalkulatory kosztow w encyklopedii projektu, jesli takie istnieja - do sprawdzenia.

## Podsumowanie: co z tego wchodzi do listy zadan v33

1. Dopisac limity subagentow (20/200/depth-3) jako ostrzezenie w docs/ROUTING_SYSTEM.md przy najciezszych presetach.
2. Dodac sekcje "znane ograniczenia debaty" + mitygacje do encyklopedii presetow five-minds/deep-five-minds/perf-squad.
3. Zaprojektowac style-profiler+voice-writer+voice-QA z jawnym naciskiem na WIERNOSC stylowi (nie wygladzanie) - uzasadnienie: trend LinkedIn anti-AI-slop.
4. Rozwazyc dodanie wymiaru `effort` obok `model` w specyfikacji agentow (nizszy priorytet, wymaga wiekszej rewizji wszystkich 37 agentow).
5. Zweryfikowac plotke o "Opus 5" przed publikacja jakiegokolwiek materialu ktory by ja powielal.
6. Rozwazyc zgloszenie projektu do hesreallyhim/awesome-claude-code przy publikacji v33 (niski koszt, potencjalnie duzy zasieg - wspiera cel usera "kilkaset gwiazdek").
