# R2: Inwentaryzacja 35 agentow (skills)

> Uwaga metodologiczna: katalog `~/.claude/skills/*.md` zawiera faktycznie **37 plikow .md**, nie 35 jak podano w CLAUDE.md / MEMORY.md (ktore odnosza sie do liczby agentow reprezentowanych w encyklopedii HTML v32.16). Rozbieznosc prawdopodobnie wynika z tego, ze skills to osobna warstwa generowana z `AGENT_EDU_PL` (35 wpisow encyklopedycznych), ale w folderze skills istnieja dodatkowo warianty/pomocnicze pliki (np. `synthesizer_lean.md` jako wariant `synthesizer.md`, `db_architect.md` i `observability_engineer.md` jako nowsze dodatki spoza pierwotnych 35). Ponizej opisano wszystkie 37 znalezionych plikow, z jawnym zaznaczeniem ktore to warianty/duplikaty koncepcyjne.

## Tabela pelna (37 agentow / plikow skills)

| # | Plik | Nazwa (PL) | Domena / kategoria | Model | Opis roli (1 zdanie) |
|---|------|-----------|---------------------|-------|------------------------|
| 1 | analyst.md | Chirurg problemow | Orchestration / Planning | sonnet | Dekomponuje zlozone zadanie uzytkownika na atomowe, realizowalne podzadania z zaleznosciami i estymacja zlozonosci, fundament dla dalszego pipeline'u. |
| 2 | planner.md | Rezyser harmonogramu | Orchestration / Planning | sonnet | Na bazie dekompozycji Analityka tworzy harmonogram, decyduje co jest sekwencyjne a co paralelne, definiuje bramy jakosci G0-G4. |
| 3 | orchestrator.md | Dyrygent systemu wieloagentowego | Orchestration / Meta | opus | Centralny agent decyzyjny, rozbija zadanie, deleguje do specjalistow i kontroluje bramy jakosci miedzy fazami; nie wykonuje pracy merytorycznej. |
| 4 | decision_presenter.md | Neutralny bramownik Human-in-the-Loop | Orchestration / HITL | haiku | Zbiera propozycje z poprzedniej fazy, prezentuje uzytkownikowi 2-3 opcje z kompromisami bezstronnie i pauzuje prace az do decyzji czlowieka. |
| 5 | backend.md | Muzyk sesyjny kodu | Build - Backend | sonnet | Pierwszy agent warstwy BUILD, implementuje API, schematy danych, walidacje i logike biznesowa zgodnie ze specyfikacja, bez projektowania czy researchu. |
| 6 | frontend.md | Stolarz meblowy UI | Build - Frontend | sonnet | Implementuje warstwe kliencka mobile-first, komponenty React/Vue z obsluga wszystkich stanow (loading/error/empty/success), accessibility i performance wbudowane. |
| 7 | feature.md | Specjalista od efektow specjalnych | Build - Feature/Niche | sonnet | Implementuje zaawansowane funkcjonalnosci niszowe: real-time, integracje AI/ML, wizualizacje danych, third-party API - poza standardowym CRUD. |
| 8 | designer.md | Architekt wnetrz aplikacji | Build - Design/CSS | sonnet | Przeksztalca raporty Researcher UX w dzialajacy CSS, design tokeny, palety kolorow, typografie i animacje - most miedzy inspiracja a kodem. |
| 9 | integrator.md | Monter filmowy systemu | Build - Integration | sonnet | Ostatni agent warstwy BUILD, laczy kod backendu, CSS designera i tresc redaktora w jeden produkt, rozwiazuje konflikty i testuje E2E, brama do QA. |
| 10 | writer.md | Kurator muzealny tekstu | Build - Content/Docs | sonnet | Agent jakosci tresci, przeksztalca surowy tekst od Kodera/Designera/Integratora w finalny czytelny dokument, dziala w izolowanym sandboxie bez Bash. |
| 11 | db_architect.md | Urbanista danych | Build - Data/DB | sonnet | Projektuje schemat bazy, klucze, indeksy, constraints i plan migracji bezprzerwowych, dobiera model danych pod wzorce zapytan i wolumen. |
| 12 | observability_engineer.md | Kontroler ruchu lotniczego systemu | Build/Ops - Observability | sonnet | Instrumentuje system metrykami, logami i tracingiem, dostarcza dashboard i alerty do wykrywania incydentow zanim zglosi je klient. |
| 13 | qa_quality.md | Inspektor jakosci z checklista | QA - Quality/Correctness | haiku | Audytuje jakosc kodu i zgodnosc ze specyfikacja, weryfikuje pokrycie testowe i czytelnosc; dziala rownolegle do QA Security z inna perspektywa. |
| 14 | qa_security.md | Ostatnia linia obrony | QA - Security | haiku | Audytor bezpieczenstwa Level 4, szuka podatnosci OWASP, zahardkodowanych sekretow i luk prompt injection; nie naprawia, raportuje severity. |
| 15 | qa_perf.md | Inzynier dynamometru | QA - Performance | haiku | Audytuje wydajnosc calego stacku (response time, bundle size, memory leaks, query performance, Core Web Vitals) i raportuje twarde metryki. |
| 16 | qa_manager.md | Sedzia sali sadowej QA | QA - Meta/Aggregation | sonnet | Jedyny agent widzacy raporty Security i Quality jednoczesnie, agreguje findings, przyznaje wynik 1-10 i podejmuje binarna decyzje GO/NO-GO. |
| 17 | res_tech.md | Archiwista oficjalnej prawdy | Research - Tech/Docs | haiku | Przeszukuje oficjalna dokumentacje, RFC, specyfikacje i benchmarki w poszukiwaniu twardych faktow technicznych z URL zrodlowym przy kazdym twierdzeniu. |
| 18 | res_docs.md | Prawnik czytajacy ustawy frameworkow | Research - Docs (framework-specific) | haiku | Zbiera fakty wylacznie z oficjalnych dokumentacji frameworkow/bibliotek/narzedzi, dostarcza source-of-truth z paragrafami i linkami. |
| 19 | res_github.md | Archeolog dzialajacego kodu | Research - Code/OSS | sonnet | Przeszukuje repozytoria open-source w poszukiwaniu dzialajacego kodu i wzorcow architektonicznych, rekomenduje TOP 5 z health scoreami. |
| 20 | res_reddit.md | Etnograf cyfrowych plemion | Research - Community opinie | haiku | Przeszukuje anonimowe platformy dyskusyjne w poszukiwaniu niefiltrowanych, prawdziwych doswiadczen developerow (ground truth spolecznosci). |
| 21 | res_forums.md | Tropiciel pulapek i rozwiazan | Research - Forums/Q&A | sonnet | Przeszukuje fora, blogi i Q&A (np. Stack Overflow) w poszukiwaniu rozwiazanych problemow i konkretnych fragmentow kodu z zaakceptowanymi odpowiedziami. |
| 22 | res_x.md | Lowca trendow w ruchu | Research - Social/Trends | sonnet | Monitoruje X/Twitter w poszukiwaniu najszybszych sygnalow o nowych technologiach i launchach - wczesne ostrzeganie wymagajace walidacji. |
| 23 | res_ux.md | Kurator cyfrowej galerii | Research - UX/Design references | haiku | Przeszukuje Dribbble, Behance, Awwwards, Mobbin i design systemy, dostarcza mood board z min. 5 referencjami i audyt WCAG. |
| 24 | res_critic.md | Recenzent naukowy przed publikacja | Research - Validation/Critic | sonnet | Waliduje wyniki wszystkich researcherow, szuka sprzecznosci, confirmation bias, luk i przestarzalych zrodel; najwyzszy load w warstwie RESEARCH. |
| 25 | res_extractor.md | Ekstraktor claimow z raportow researcherow | Research - Compression/ETL | sonnet | Tani posrednik miedzy Researcherem a Syntetykiem, kompresuje raport 3-7k slow do gestej tabeli claimow ~300-500 slow dla taniej konsumpcji przez Syntetyka. |
| 26 | synthesizer.md | Pamiec cross-fazowa systemu | Research/Meta - Synthesis | sonnet | Utrzymuje MANIFEST.md jako Single Source of Truth, zbiera wyniki z kazdej fazy, dokumentuje decyzje architektoniczne i flaguje sprzecznosci. |
| 27 | synthesizer_lean.md | Syntetyk Lean z template i enforced early-write | Research/Meta - Synthesis (wariant) | opus | Wariant Syntetyka zoptymalizowany pod duze korpusy: konsumuje extracty + CRITIC.md + template, pisze SYNTHESIS.md iteracyjnie, 4x mniejszy input, 2-3x szybszy. |
| 28 | expert_pragmatist.md | Realista od wysylki | Debate - Five Minds | opus | Glos rzeczywistosci operacyjnej w debacie: sprowadza pomysly do realiow budzetu, zespolu i deadlinu, pyta kto to zbuduje i kiedy. |
| 29 | expert_devil.md | Adwokat diabla bez lojalnosci | Debate - Five Minds (adversarial) | opus | Strukturalny przeciwnik bez lojalnosci domenowej, kwestionuje kazda teze i stress-testuje konsensus zanim zostanie zatwierdzony. |
| 30 | expert_innovator.md | Wizjoner od pierwszych zasad | Debate - Five Minds | opus | Moonshot advocate, kwestionuje obecne rozwiazanie od fundamentow i szuka 10x szans, ktorych nikt jeszcze nie zauwazyl. |
| 31 | expert_analyst.md | Empiryk z kalkulatorem | Debate - Five Minds | opus | Glos empiryzmu, wymaga oparcia kazdej tezy na liczbach, benchmarkach, base rates i confidence intervals. |
| 32 | expert_user.md | Adwokat czlowieka w maszynie | Debate - Five Minds | opus | Glos empatii, pilnuje by decyzje architektoniczne byly przetlumaczone na realne doswiadczenie uzytkownikow spoza stolu (starsi, niewidomi, mobile-only). |
| 33 | control_mapper.md | Tlumacz miedzy legalesem a kodem | Compliance / Governance | sonnet | Tlumaczy wymagania regulacyjne (GDPR, SOC2, ISO27001, HIPAA) na konkretne kontrole techniczne i procesowe, buduje matryce kontroli i identyfikuje luki. |
| 34 | gtm_strategist.md | Choreograf launchu | Strategy - GTM/Marketing | sonnet | Projektuje plan wejscia na rynek: ICP, positioning, pricing, kanaly akwizycji, laczy badania uzytkownikow z mechanika wdrozenia produktu. |
| 35 | telemetry_surfer.md | Strazak z kamera termowizyjna | Ops - Incident/Telemetry | sonnet | Przeszukuje istniejaca telemetrie (metryki, logi, traces) w poszukiwaniu wzorcow i anomalii, odpowiada co sie stalo przy uzyciu PromQL/LogQL/trace search. |
| 36 | eda_analyst.md | Detektyw danych z lupa | Data - EDA/Analysis | sonnet | Prowadzi eksploracyjna analize danych: profilowanie, wykrywanie anomalii, korelacje i wizualizacje, zanim zespol zbuduje model lub podejmie decyzje. |
| 37 | statistician.md | Naukowiec sadowy liczb | Data - Statystyka/Experiment design | sonnet | Projektuje eksperymenty i analizy (dobor testu, wielkosc proby, moc, korekcje wielokrotnych porownan), chroni przed wnioskami z hazardowych danych. |

## Rozklad modeli

- **opus (7):** orchestrator, expert_pragmatist, expert_devil, expert_innovator, expert_analyst, expert_user, synthesizer_lean
- **sonnet (22):** analyst, planner, backend, frontend, feature, designer, integrator, writer, db_architect, observability_engineer, qa_manager, res_github, res_forums, res_x, res_critic, res_extractor, synthesizer, control_mapper, gtm_strategist, telemetry_surfer, eda_analyst, statistician
- **haiku (8):** decision_presenter, qa_quality, qa_security, qa_perf, res_tech, res_docs, res_reddit, res_ux

Widac wyrazna zasade cost-routing: caly panel Five Minds (5 ekspertow debaty) dziala na Opus, bo to praca rozumowania/argumentacji wysokiej stawki. Cala warstwa QA (poza qa_manager) dziala na Haiku, bo to praca wzorcowa/checklistowa. Researcherzy sa rozdzieleni: zrodla wymagajace glebszej syntezy (GitHub, Forums, X, Critic, Extractor) na Sonnet, zrodla bardziej "faktograficzne" lub referencyjne (Tech, Docs, Reddit, UX) na Haiku. Orchestrator i qa_manager oraz synthesizer_lean to jedyne nie-debate agenty na Opus - potwierdza to, ze to prace decyzyjne wysokiego ryzyka.

## Klastry tematyczne

### 1. Orchestration / Meta / Planning (4 agentow)
analyst, planner, orchestrator, decision_presenter
Rdzen sterujacy calym pipelinem: dekompozycja -> harmonogram -> dyrygowanie -> bramka HITL. Brak nakladania kompetencji - kazdy ma jasno odrebna faze cyklu zycia projektu.

### 2. Build - Software Delivery (6 agentow)
backend, frontend, feature, designer, integrator, db_architect
Klasyczna warstwa implementacji. feature.md jest swiadomie zaprojektowany jako "wypelniacz luk" miedzy backend/frontend a niszowymi potrzebami (real-time, AI/ML integracje), co jest dobrym wzorcem unikania duplikacji kompetencji.

### 3. Build - Content/Docs (1 agent)
writer
Jedyny dedykowany agent tresci w warstwie BUILD (dokumentacja produktowa, kopiowanie tekstow UI). Osobno istnieje res_docs (research dokumentacji frameworkow) i tech_writing wzmianka w presetach - ale to inny typ pracy.

### 4. QA / Audit (4 agentow)
qa_quality, qa_security, qa_perf, qa_manager
Trojka rownoleglych audytorow (jakosc / bezpieczenstwo / wydajnosc) + agregator decyzyjny. Czysty podzial domenowy, brak nakladania.

### 5. Research - zewnetrzne zrodla (7 agentow)
res_tech, res_docs, res_github, res_reddit, res_forums, res_x, res_ux
Najbardziej rozbudowany klaster - kazdy agent przypisany do innego kanalu/zrodla informacji (dokumentacja oficjalna, framework docs, kod OSS, opinie spolecznosci, fora/Q&A, social/trendy, wizualne referencje designerskie).

### 6. Research - Meta/Processing (3 agentow)
res_critic, res_extractor, synthesizer (+ synthesizer_lean jako wariant = 4. plik)
Warstwa przetwarzania wynikow researchu: walidacja (critic) -> kompresja (extractor) -> agregacja do zrodla prawdy (synthesizer/synthesizer_lean).

### 7. Debate - Five Minds Protocol (5 agentow)
expert_pragmatist, expert_devil, expert_innovator, expert_analyst, expert_user
Zamknięty, symetryczny zestaw 5 "person" reprezentujacych rozne perspektywy poznawcze w strukturalnej debacie. Wszyscy na Opus, wszyscy przypisani do fazy debate1.

### 8. Compliance / Governance (1 agent)
control_mapper
Jedyny agent dedykowany do regulacji (GDPR/SOC2/ISO27001/HIPAA) - obsluguje najprawdopodobniej preset soc2-sweep.

### 9. Strategy / Go-to-Market (1 agent)
gtm_strategist
Jedyny agent biznesowo-marketingowy (positioning, pricing, kanaly) - obsluguje prd-to-launch.

### 10. Ops / Incident / Observability (2 agentow)
observability_engineer, telemetry_surfer
Podzial: observability_engineer projektuje/instrumentuje system (proaktywnie, warstwa BUILD/Ops), telemetry_surfer przeszukuje juz istniejaca telemetrie w reakcji na incydent (warstwa diagnostyczna, incident-war-room). To wyrazny podzial "buduje system obserwowalnosci" vs "czyta z niego dane w kryzysie" - komplementarny, nie duplikat.

### 11. Data Science (2 agentow)
eda_analyst, statistician
eda_analyst robi eksploracyjna analize/profilowanie danych, statistician projektuje eksperymenty i testy statystyczne (moc, korekcje). Komplementarne fazy tego samego pipeline'u (data-analysis-pipe, ab-test-lab).

## Duplikaty / nakladajace sie kompetencje

1. **synthesizer.md vs synthesizer_lean.md** - to nie sa dwaj rozni agenci merytorycznie, tylko dwa warianty tej samej roli (Syntetyk) zoptymalizowane pod rozny rozmiar korpusu i model (sonnet vs opus). Formalnie licza sie jako 2 pliki skills, ale koncepcyjnie to 1 kompetencja z dwoma trybami wykonania (klasyczny vs lean/map-reduce). Jest to swiadomy, udokumentowany duplikat (feedback_syntetyk_preset_redesign w pamieci potwierdza ten kierunek), nie przypadkowy.

2. **res_docs.md vs res_tech.md** - oba czytaja "oficjalne zrodla" i oba deklaruja "ground truth bez opinii, z URL/cytatem". Roznica jest subtelna: res_tech obejmuje RFC/specyfikacje/benchmarki ogolnie, res_docs skupia sie wylacznie na dokumentacji frameworkow/bibliotek. W praktyce zakresy moga sie znaczaco pokrywac przy researchu technicznym (np. "dokumentacja Next.js" moze trafic do obu). To najbardziej realne ryzyko redundancji w warstwie Research - dwa agenty moga wygenerowac niemal identyczne raporty przy tym samym query.

3. **observability_engineer.md vs telemetry_surfer.md** - blisko siebie tematycznie (oba "telemetria/metryki/logi/traces"), ale rozdzielone fazowo (budowa systemu vs analiza istniejacych danych podczas incydentu). Ryzyko pomylki przy routingu jest niskie dzieki jasnemu opisowi "instrumentuje" vs "przeszukuje", ale nazwy i domeny slownikowe sa bardzo blisko - warto pilnowac w PRESET_CATALOG.md jasnego rozroznienia keywordow (np. "setup dashboards" -> observability_engineer, "diagnose incident" -> telemetry_surfer).

4. **res_forums.md vs res_reddit.md** - oba to "opinie/doswiadczenia spolecznosci nieoficjalne", roznica to kanal (fora/blogi/SO vs Reddit anonimowe dyskusje). Cel biznesowy nieco inny (forums = rozwiazania z kodem/accepted answers, reddit = surowe opinie/sentyment), ale w praktyce moga sie czesciowo pokrywac przy zapytaniach typu "co ludzie mowia o X".

5. **qa_quality.md vs qa_manager.md** - nie sa duplikatem funkcjonalnym (manager agreguje, quality audytuje), ale nazewniczo latwo je pomylic ("QA" + rozne przyrostki). Warto sprawdzic czy w PRESET_CATALOG.md rozroznienie jest jednoznaczne.

## Luki w pokryciu domenowym

1. **Brak dedykowanego agenta mobile (iOS/Android/React Native)** - frontend.md deklaruje "mobile-first" ale to nadal web frontend. Przy bogatej reprezentacji web-build (backend/frontend/feature/designer/integrator) brak jakiegokolwiek natywnego mobile agenta jest zauwazalna dziura, szczegolnie ze projekt ma bogate portfolio (Vercel skills sugeruja mocny fokus web/Next.js).

2. **Brak dedykowanego agenta DevOps/Infra/CI-CD** - jest observability (monitoring) i db_architect (schemat danych), ale nie ma agenta odpowiedzialnego za infrastrukture jako kod, deployment pipelines, konteneryzacje, skalowanie. Przy tak rozbudowanej warstwie BUILD (6 agentow) i QA (4 agentow) brak "DevOps Engineer" / "Platform Engineer" jest wyrazna luka - szczegolnie ze integrator.md wspomina integracje calosci, ale nie deployment.

3. **Brak agenta Legal/Prawnego poza compliance technicznym** - control_mapper tlumaczy regulacje na kontrole techniczne, ale nie ma agenta do np. licencji OSS, umow, ToS, polityki prywatnosci w sensie tekstowym (to raczej robota writer.md, ale writer nie ma prawnej specjalizacji).

4. **Brak dedykowanego agenta Cost/FinOps** - przy tak mocnym naciskaniu na model-routing i cost-awareness (Cascade preset, budget flagi w deep-research-v2) nie ma agenta, ktorego jedynym zadaniem jest analiza kosztow infrastruktury/API/tokenow jako osobna kompetencja (poza ogolna wzmianka w orchestrator).

5. **Brak agenta i18n/lokalizacji** - projekt sam jest PL/EN bilingual (encyklopedia, presety), ale w warstwie skills nie ma agenta dedykowanego do tlumaczen/lokalizacji tresci produktu koncowego (writer.md robi redakcje, nie tlumaczenie).

6. **Slaba reprezentacja "growth/marketing content" poza GTM** - gtm_strategist robi strategie wejscia, ale nie ma np. agenta SEO/content marketing dedykowanego (choc tech_writing_pipe i content presety istnieja jako orkiestracja z res_* + writer, wiec funkcjonalnie jest pokryte kompozycyjnie, tylko nie jako osobny "SEO specialist" agent).

7. **Brak dedykowanego agenta do testow automatycznych (Test Engineer / QA Automation) odrebnego od audytu** - qa_quality/qa_security/qa_perf to audytorzy raportujacy, ale nikt w tej liscie nie pisze/utrzymuje testow (unit/integration/e2e) jako glowne zadanie - to milcząco wpada w backend/frontend/integrator, co jest rozsadne, ale warto to odnotowac jako swiadomy wybor architektoniczny a nie przeoczenie.

8. **Research - brak agenta do patentow / analiz konkurencji (competitive intelligence)** - przy 7 kanalach researchu (tech, docs, github, reddit, forums, x, ux) nie ma agenta dedykowanego do sledzenia konkurencji produktowej/cenowej, co przy obecnosci gtm_strategist wydaje sie naturalnym rozszerzeniem.

## Podsumowanie

Warstwa skills liczy faktycznie 37 plikow, ktore mapuja sie na koncepcyjnie okolo 35-36 odrebnych rol (synthesizer/synthesizer_lean to warianty tej samej roli). Architektura jest silnie zorganizowana wokol trzech duzych warstw: RESEARCH (7 zrodel + 3 agentow meta-processingu), BUILD (6 implementacyjnych + observability/db), QA (4 audytorow), z dodatkowymi klastrami specjalistycznymi (Five Minds debata - 5 agentow, Compliance, GTM, Data Science - 2 agentow). Model-routing jest konsekwentny: Opus dla rozumowania wysokiej stawki (orchestrator, debata, synthesizer_lean), Sonnet dla wykonania/syntezy, Haiku dla pracy checklistowej/wzorcowej. Najwazniejsze zidentyfikowane ryzyko nakladania to res_docs/res_tech (blisko identyczny zakres "oficjalne zrodla") oraz observability_engineer/telemetry_surfer (bliskie nazewnictwo, rozne fazy). Najwyrazniejsze luki domenowe to brak dedykowanego DevOps/Infra agenta oraz brak natywnego mobile agenta - obie te domeny sa reprezentowane posrednio (integrator, frontend) ale nie maja wlasnego specjalisty mimo bogatej reprezentacji sasiednich domen (6 agentow BUILD, 4 agentow QA).
