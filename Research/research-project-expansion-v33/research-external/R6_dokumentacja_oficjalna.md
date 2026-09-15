# R6: Dokumentacja oficjalna Anthropic

**Data researchu:** 2026-08-21
**Zrodla:** docs.claude.com (przekierowane na platform.claude.com i code.claude.com), anthropic.com/engineering, claude.com/blog
**Metoda:** WebSearch + WebFetch bezposrednio na oficjalna dokumentacje Anthropic

---

## (a) Projektowanie Claude Skills/Subagentow dla zadan INNYCH niz kodowanie

Oficjalna strona `platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices` ("Skill authoring best practices") jest pisana jako uniwersalny przewodnik - nie zaklada, ze Skill dotyczy kodu. Kluczowy cytat wskazujacy explicite na zadania non-coding:

> "**Example 1: Research synthesis workflow** (for Skills without code): [...] This example shows how workflows apply to analysis tasks that don't require code. The checklist pattern works for any complex, multistep process."

Dokumentacja podaje pelny wzorzec checklisty dla researchu (nie kodu):

```
Research Progress:
- [ ] Step 1: Read all source documents
- [ ] Step 2: Identify key themes
- [ ] Step 3: Cross-reference claims
- [ ] Step 4: Create structured summary
- [ ] Step 5: Verify citations
```

Rowniez wzorzec feedback loop jest opisany w wersji bez kodu, dla pracy redakcyjnej/edytorskiej:

> "**Example 1: Style guide compliance** (for Skills without code): 1. Draft your content following the guidelines in STYLE_GUIDE.md 2. Review against the checklist [...] This shows the validation loop pattern using reference documents instead of scripts. The 'validator' is STYLE_GUIDE.md, and Claude performs the check by reading and comparing."

**Zasada nadrzedna - "Claude jest juz bardzo madry":**

> "**Default assumption:** Claude is already very smart. Only add context Claude doesn't already have. Challenge each piece of information: 'Does Claude really need this explanation?' 'Can I assume Claude knows this?' 'Does this paragraph justify its token cost?'"

To ma bezposrednie zastosowanie do agentow "miekkich" (pisarz, analityk, researcher) - dokumentacja ostrzega przed tlumaczeniem oczywistosci (np. czym jest PDF), co jest czestym bledem w promptach dla agentow non-technicznych.

**Stopien swobody (degrees of freedom)** - kluczowa koncepcja dla zadan tworczych/analitycznych, gdzie "wiele podejsc jest poprawnych":

> "**High freedom** (text-based instructions). Use when: Multiple approaches are valid; Decisions depend on context; Heuristics guide the approach [...] **Analogy:** Think of Claude as a robot exploring a path: Open field with no hazards: Many paths lead to success. Give general direction and trust Claude to find the best route (high freedom). Example: code reviews where context determines the best approach."

Dla agentow typu writer/analyst/researcher rekomendowany jest wysoki stopien swobody (heurystyki, nie sztywne skrypty) - w przeciwienstwie do agentow wykonujacych operacje fragile (np. migracje bazy danych), gdzie wymagane jest low freedom.

**Wzorzec "template" z dwoma trybami** - istotny dla agentow raportujacych/piszacych:

> "**For strict requirements** (such as API responses or data formats): ALWAYS use this exact template structure [...] **For flexible guidance** (when adaptation is useful): Here is a sensible default format, but use your best judgment based on the analysis [...] Adjust sections as needed for the specific analysis type."

**Wzorzec "examples pattern"** - szczegolnie wazny dla zadan pisarskich, gdzie styl trudno opisac slowami:

> "For Skills where output quality depends on seeing examples, provide input/output pairs just like in regular prompting [...] Examples convey the desired style and level of detail to Claude more clearly than descriptions alone."

**Rozwoj iteracyjny z Claude jako wspoltworca** - metoda Anthropic dla kazdego typu Skill (nie tylko coding):

> "The most effective Skill development process involves Claude itself. Work with one instance of Claude ('Claude A') to create a Skill that is used by other instances ('Claude B'). Claude A helps you design and refine instructions, while Claude B tests them in real tasks."

Konkretny przyklad podany w dokumentacji dotyczy analizy danych biznesowych (BigQuery), nie kodowania - pokazuje ze metoda evaluation-driven jest uniwersalna:

> "**Evaluation-driven development:** 1. Identify gaps: Run Claude on representative tasks without a Skill [...] 2. Create evaluations: Build three scenarios that test these gaps [...] This approach ensures you're solving actual problems rather than anticipating requirements that may never materialize."

**Wniosek dla zadan non-coding:** oficjalna dokumentacja nie robi rozroznienia architektonicznego miedzy Skills do kodowania i innych - te same zasady (concise, degrees of freedom, progressive disclosure, workflows z checklista, feedback loops, evaluation-first) stosuja sie wprost do researchu, pisania i analizy. Roznica jest tylko w tym, ze sekcja "Advanced: Skills with executable code" (solve-dont-defer, utility scripts, package dependencies) jest jawnie oznaczona jako opcjonalna i pomijalna dla Skills czysto tekstowych: "If your Skill uses only markdown instructions, skip to Checklist for effective Skills."

---

## (b) Kategoryzacja/tagowanie duzych kolekcji agentow/skills dla nawigacji

To jest najbardziej bezposrednio istotna sekcja dla projektu Agent Architecture Designer (37 agentow, 44 presetow).

**Skala odniesienia - dokumentacja mowi wprost o "100+ Skills":**

> "Each Skill has exactly one description field. The description is critical for skill selection: Claude uses it to choose the right Skill from potentially 100+ available Skills."

To potwierdza, ze mechanizm dyskryminacji miedzy duza liczba agentow/skills jest projektowany centralnie wokol pola `description`, NIE wokol osobnej warstwy tagow/kategorii w samym formacie SKILL.md. Metadata (`name` + `description`) sa jedynym mechanizmem preloadowanym do system promptu przy starcie:

> "At startup, only the metadata (name and description) from all Skills is pre-loaded. Claude reads SKILL.md only when the Skill becomes relevant."

**Konwencje nazewnictwa (gerund form) jako mechanizm porzadkujacy kolekcje:**

> "Consider using **gerund form** (verb + -ing) for Skill names, as this clearly describes the activity or capability the Skill provides. [...] **Good naming examples (gerund form):** processing-pdfs, analyzing-spreadsheets, managing-databases, testing-code, writing-documentation [...] **Avoid:** Vague names: helper, utils, tools; Overly generic: documents, data, files; Inconsistent patterns within your skill collection."

Uzasadnienie wprost dotyczy nawigacji po duzej kolekcji:

> "Consistent naming makes it easier to: Reference Skills in documentation and conversations; Understand what a Skill does at a glance; Organize and search through multiple Skills; Maintain a professional, cohesive skill library."

**Description jako jedyny "tag" dyskryminujacy - musi zawierac trigger slowa:**

> "**Be specific and include key terms**. Include both what the Skill does and specific triggers/contexts for when to use it." Przyklad: "description: Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction."

Ta sama zasada dla subagentow (`code.claude.com/docs/en/subagents`):

> "Claude uses each subagent's description to decide when to delegate tasks. When you create a subagent, write a clear description so Claude knows when to use it." Rekomendowane frazy triggerujace: "**Include action triggers**: Use phrases like 'use proactively' to encourage automatic delegation."

**Organizacja fizyczna duzych kolekcji subagentow - foldery, nie plaski tag system:**

> "Claude Code scans `.claude/agents/` and `~/.claude/agents/` recursively, so you can organize definitions into subfolders such as `agents/review/` or `agents/research/`. The subdirectory path doesn't affect how a subagent is identified or invoked, because identity comes only from the `name` frontmatter field."

To jest istotne rozgraniczenie: struktura katalogow sluzy WYLACZNIE czlowiekowi/utrzymaniu (developer experience), nie ma wplywu na to, jak model wybiera agenta - selekcja idzie zawsze przez `description`, nigdy przez sciezke czy folder.

**Progressive disclosure jako technika kategoryzacji tresci (nie samych agentow), przydatna przy budowie duzych encyklopedii:**

> "**Pattern 2: Domain-specific organization** For Skills with multiple domains, organize content by domain to avoid loading irrelevant context. [...] Good: reference/finance.md, reference/sales.md [...] Bad: docs/file1.md, docs/file2.md" oraz "**Organize for discovery:** Structure directories by domain or feature."

**Wniosek dla (b):** Anthropic nie definiuje osobnego systemu tagow/taksonomii (np. `category: research` jako pole formalne wplywajace na routing) - jedynym oficjalnie wspieranym mechanizmem dyskryminacji miedzy dziesiatkami/setkami agentow jest jakosc pola `description` (konkretne slowa kluczowe + kontekst uzycia) w polaczeniu z konsekwentna konwencja nazewnictwa. Kategorie/foldery sa dozwolone i zalecane wylacznie jako narzedzie porzadkowania plikow na dysku dla czlowieka.

---

## (c) Wzorce UX dla "agent marketplace" / katalogow wyboru

Oficjalna dokumentacja Anthropic **nie publikuje** dedykowanego przewodnika UX dla "marketplace" wyboru agentow (nie znaleziono strony docs.claude.com ani anthropic.com/engineering opisujacej wzorce interfejsu do przegladania/wybierania agentow). Dostepne sa natomiast posrednie wskazowki, ktore rzutuja na UX:

1. **Model dyskryminacji = jezyk naturalny, nie klikanie w liste.** Skoro caly mechanizm wyboru Skill/subagenta opiera sie o dopasowanie zapytania uzytkownika do pola `description` (patrz sekcja b), oficjalny "UX" domyslny to zero-UI: uzytkownik po prostu opisuje zadanie, a model sam wybiera z potencjalnie 100+ opcji. To sugeruje, ze katalog wizualny (jak projekt Agent Architecture Designer) jest warstwa DODATKOWA ponad oficjalny mechanizm - user-facing edukacja/przegladalnosc, nie zamiennik.

2. **Test z realnymi uzytkownikami jako metoda walidacji UX wyboru:**

> "**Gathering team feedback:** Share Skills with teammates and observe their usage. Ask: Does the Skill activate when expected? Are instructions clear? What's missing?"

3. **Z blogu "How and when to use subagents in Claude Code" (claude.com/blog) - wzorzec dla interfejsow prezentujacych agentow uzytkownikowi:**

> "For multi-stage tasks, chaining subagents with explicit handoffs between phases keeps each stage focused" oraz "subagents are worth the overhead cost when context isolation, parallelism, or a fresh perspective actually helps."

To sugeruje, ze dobry interfejs wyboru powinien komunikowac uzytkownikowi WHY (kiedy warto uzyc wieloagentowego zespolu vs pojedynczego agenta), a nie tylko WHAT (lista nazw) - co jest zgodne z podejsciem "Verdict Panel" (green/red) juz zaimplementowanym w v32.11 projektu.

4. **Z "Building Effective AI Agents" (anthropic.com/engineering)** - zasada transparentnosci jako wzorzec UX aplikowalny do interfejsu wyboru:

> "Prioritize **transparency** by explicitly showing the agent's planning steps."

**Wniosek dla (c):** Brak formalnej, dedykowanej dokumentacji Anthropic o UX katalogow/marketplace agentow. Pisane wskazowki sa posrednie i wywodza sie z zasad projektowania samych Skills/subagentow (jasny opis + trigger words + transparentnosc + test z realnymi userami). Projekt Agent Architecture Designer, jako edukacyjna wizualna encyklopedia, wypelnia realna luke - Anthropic nie definiuje wzorca dla tej warstwy, co oznacza wieksza swobode projektowa, ale tez brak "oficjalnego wzorca" do ktorego mozna sie odwolac wprost.

---

## (d) Najnowsze funkcje/prymitywy wplywajace na projekt multi-agent w 2026

**Skills - architektura oparta o filesystem, nie o pelne zaladowanie kontekstu:**

> "Skills run in a code execution environment with filesystem access, bash commands, and code execution capabilities. [...] No context penalty for large files: Reference files, data, or documentation don't consume context tokens until actually read."

Kluczowa zmiana wzgledem starszych wzorcow (system prompt "z gory zaladowany") - to model progresywnego ujawniania, gdzie tylko `name`+`description` sa w system prompt, a cala reszta (SKILL.md, pliki referencyjne, skrypty) jest odkrywana on-demand przez bash Read.

**MCP - fully qualified tool names jako wymog przy wielu serwerach:**

> "If your Skill uses MCP (Model Context Protocol) tools, always use fully qualified tool names to avoid 'tool not found' errors. **Format:** ServerName:tool_name [...] Without the server prefix, Claude may fail to locate the tool, especially when multiple MCP servers are available."

To ma znaczenie dla projektow z wieloma zintegrowanymi MCP (jak srodowisko uzytkownika z Gmail/Calendar/Drive/Vercel) - agenci powinni byc instruowani o pelnych nazwach narzedzi.

**Subagents (Task tool) - kontrola modelu, uprawnien i narzedzi na poziomie definicji:**

> Pola `model` (sonnet/haiku/inherit/pelne ID), `tools`/`disallowedTools` (allowlist/denylist), `permissionMode` (default/acceptEdits/auto/dontAsk/bypassPermissions/plan), oraz mozliwosc ograniczania ktore subagenty moga spawnowac kolejne: "**Spawn restrictions**: Limit which subagents can be spawned: tools: Agent(worker, researcher), Read, Bash."

Model resolution order pokazuje hierarchie kontroli:

> "**Model resolution order** (highest to lowest priority): 1. CLAUDE_CODE_SUBAGENT_MODEL environment variable 2. Per-invocation model parameter 3. Subagent definition's model field 4. Main conversation's model."

**Multi-agent systems - kiedy NIE budowac (kontrapunkt wazny dla projektu z 44 presetami):**

> "A well-designed single agent with appropriate tools can accomplish far more than many developers expect." oraz "Multi-agent implementations typically use 3-10x more tokens than single-agent approaches for equivalent tasks."

To bezposrednio uzasadnia istniejaca w projekcie zasade "przy watpliwosciach wybieraj mniejszy preset" (z CLAUDE.md uzytkownika) - jest to zgodne z oficjalnym stanowiskiem Anthropic.

**Zasady podzialu pracy miedzy agentow (task decomposition) - "dziel wedlug granic kontekstu, nie wedlug rol":**

> "Dividing by context boundaries means an agent handling a feature should also handle its tests, because it already possesses the necessary context." oraz jako przyklad zlego podzialu: "Sequential phases of the same work. Planning, implementation, and testing of the same feature share too much context." Dodatkowo: "context pollution occurs" gdy agent gromadzi informacje nieistotne dla kolejnych podzadan.

**Wzorzec orchestrator-worker i weryfikator jako odrebny agent:**

> "A hierarchical model where a lead agent spawns and manages specialized subagents for specific subtasks." oraz "A dedicated agent whose sole responsibility is testing or validating the main agent's work succeeds because verification requires minimal context transfer."

To bezposrednio odpowiada strukturze projektu (orchestrator + QA agenci jako odrebna faza).

**Dane liczbowe z multi-agent research systemu Anthropic (Opus lead + Sonnet subagents):**

> "In internal evaluations, a system with Claude Opus 4 as the lead agent and Claude Sonnet 4 as supporting subagents outperformed a single-agent setup by more than 90 percent."

Potwierdza to model-routing zasade juz stosowana w projekcie (Orchestrator=Opus, Researchers=Sonnet, Extractors=Haiku - patrz `feedback_deep_research_v2_model_routing.md`).

---

## Zgodnosc obecnej architektury z oficjalnymi best practices

**Mocne strony (zgodne z dokumentacja):**

1. **Konwencja folderow dla duzej kolekcji** - `~/.claude/skills/*.md` (35-37 agentow) i `~/.claude/commands/*.md` (42-44 presetow) jest w linii z zalecana organizacja "scan recursively, organize into subfolders" - choc obecnie skills sa plaskie (jeden folder), nie pogrupowane wg fazy (research/build/qa/debate). Dokumentacja sugeruje `agents/review/`, `agents/research/` - projekt mogloby to wdrozyc formalnie w plikach (obecnie phase jest tylko polem w YAML, nie strukturą katalogow).

2. **Model routing (opus dla strategii/debaty, sonnet dla build, haiku dla QA/research low-stakes)** jest dokladnie zgodny z oficjalnym wzorcem Opus-lead + Sonnet-subagents + Haiku dla tanich zadan.

3. **PRESET_CATALOG.md jako mechanizm auto-routingu na podstawie keywords** odpowiada dokladnie oficjalnemu modelowi: dyskryminacja miedzy duza liczba opcji (42-44 presetow) przez dopasowanie opisu/slow kluczowych do zadania - to jest wlasnie to, co dokumentacja Anthropic definiuje jako jedyny wspierany mechanizm wyboru z "potentially 100+ available Skills".

4. **Zasada "przy watpliwosciach wybieraj mniejszy preset"** jest zgodna z oficjalnym ostrzezeniem o 3-10x kosztowym narzucie multi-agent i rekomendacja "start simple".

**Luki / rekomendacje do aktualizacji:**

1. **Format YAML skills projektu nie zawiera dedykowanego, "trigger-words" zorientowanego pola `description` w stylu oficjalnym.** Obecny format ma `description: "Full mission statement"` - dlugi opis misji, a nie zwiezle zdanie z konkretnymi slowami-wyzwalaczami typu "Use when the user mentions X, Y, Z". Warto dodac osobne pole lub przeredagowac `description` wedlug wzorca: "Co robi + kiedy uzyc + kluczowe slowa" (max ok. 1-2 zdania), bo to jest JEDYNY mechanizm, ktorym model realnie dyskryminuje miedzy dziesiatkami agentow - dlugi opis misji nie pelni tej funkcji rownie dobrze.

2. **Brak formalnego rozgraniczenia "gerund form" w nazewnictwie.** Nazwy typu `res_tech`, `qa_security`, `expert_devil` sa spojne wewnetrznie, ale nie stosuja rekomendowanej konwencji gerund (`researching-technical-sources`, `reviewing-security`). To drobna rozbieznosc, niekrytyczna, ale dokumentacja jawnie to zaleca dla duzych kolekcji.

3. **Brak jawnej sekcji "degrees of freedom" w promptach agentow.** Warto rozwazyc dodanie do kazdego skill pliku jawnej wskazowki, czy dany agent dziala w trybie high/medium/low freedom (np. `expert_*` = high freedom/heurystyki, `qa_security` = low freedom/checklisty) - to pomogloby zarowno w promptach, jak i w warstwie edukacyjnej encyklopedii HTML.

4. **Progressive disclosure nie jest wykorzystane w skills** - kazdy skill to jeden plik ~1000 tokenow zaladowany w calosci. Dla agentow o duzej roznorodnosci zadan (np. `writer.md`) dokumentacja sugerowalaby wzorzec "SKILL.md + reference/*.md" z odsylaczami, zeby nie ladowac calego kontekstu za kazdym razem. Przy 35-37 agentach to moze byc source niepotrzebnego zuzycia tokenow, ale przy obecnym rozmiarze (~1000 tok/agent) prawdopodobnie nie krytyczne.

5. **Brak formalnych evaluations (3+ scenariusze testowe na agenta/preset)** wedlug metody "evaluation-driven development" opisanej w dokumentacji. Projekt ma bogata warstwe edukacyjna (encyklopedia), ale nie ma udokumentowanego procesu testowania skutecznosci promptow agentow na rzeczywistych zadaniach z baseline.

6. **UX katalogu (Agent Architecture Designer jako wizualna encyklopedia) nie ma oficjalnego wzorca odniesienia** - Anthropic nie publikuje wytycznych dla tej warstwy, wiec obecne rozwiazania (Verdict Panel, bento sections, model routing UI) sa autorska innowacja projektu, nie odtworzeniem czyjegos wzorca. To jest neutralne/pozytywne - warto to explicite zakomunikowac jako unique value proposition projektu, bo nie ma z czym go "porownac" formalnie.

**Podsumowanie:** Architektura projektu jest fundamentalnie zgodna z oficjalnymi zasadami Anthropic (routing przez keywords/opis, hierarchia orchestrator-worker, model routing wedlug kosztu/zlozonosci, ostroznosc przed nadmiarowa komplikacja). Najwazniejsza rekomendowana zmiana do v33 to przeredagowanie pol `description` w plikach skills wedlug oficjalnego wzorca "what + when + trigger words", bo to jedyny mechanizm, ktorym model faktycznie wybiera miedzy duza liczba agentow - a obecna forma (dlugi mission statement) nie jest zoptymalizowana pod ta funkcje.
