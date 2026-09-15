# R4: Routing i katalog presetow

Zrodla: `C:\Users\macie\.claude\PRESET_CATALOG.md` (272 linie, 42 presety) i sekcja "Agent Architecture (v32.16)" w `C:\Users\macie\.claude\CLAUDE.md`.

---

## Jak dziala

Mechanizm auto-routingu to **czysto promptowy** system (brak kodu, brak embeddingow, brak fuzzy-matchingu) oparty na tym, ze `~/.claude/CLAUDE.md` jest zawsze zaladowany w kontekscie (globalne instrukcje uzytkownika, "override any default behavior"), a `PRESET_CATALOG.md` jest czytany na zadanie, dopiero gdy Claude uzna ze uzytkownik opisuje zadanie bez podania konkretnego presetu.

Krok po kroku:

1. **Trigger.** Uzytkownik pisze naturalnym jezykiem opis zadania (np. "zrob mi research o X", "potrzebuje zaudytowac bezpieczenstwo", "zbuduj MVP") **bez** jawnego `/nazwa-presetu`. Instrukcja w CLAUDE.md explicite podaje te trzy przyklady jako wzorzec wyzwalajacy.
2. **Odczyt katalogu.** Claude czyta caly plik `PRESET_CATALOG.md` (jednorazowo, na zadanie - "zero kosztu tokenow do momentu uzycia", jak zaznaczono w CLAUDE.md).
3. **Dopasowanie.** Claude ma "dopasowac 1-3 najlepsze presety po keywords i zlozonosci zadania". To kluczowe zdanie - implikuje istnienie ustrukturyzowanych "keywords" w katalogu, ale w rzeczywistosci katalog **nie ma dedykowanego pola `keywords:`** dla zadnego presetu (patrz sekcja nizej). Zamiast tego model musi wnioskowac trafnosc z trzech nieustrukturyzowanych zrodel tekstu:
   - **Przewodnik decyzyjny** (linie 5-28) - lista 18 kategorii-buckets typu "Szybki fix / bug / refactor -> `/solo`, `/quick-fix`, `/bug-hunt`", gdzie kategoria jest krotkim skrotem myslowym, nie lista slow kluczowych.
   - **Sekcje per-preset** (linie 34-210) - kazdy preset ma **"Uzyj gdy:"** (lista scenariuszy/fraz oddzielonych przecinkami, pisanych jako przyklady sytuacji, np. "literowka w UI, brakujacy import, zmiana jednej linii") oraz **"NIE uzywaj gdy:"** (kryteria wykluczajace, czesto z odsylaczem do wlasciwego presetu).
   - **Drzewo eskalacji** (linie 228-261) - 9 sciezek eskalacji pogrupowanych po domenie (Research, Bezpieczenstwo, Performance, itd.), pokazujace kolejnosc od najmniejszego do najwiekszego presetu w danej rodzinie.
4. **Ranking wg zlozonosci/kosztu.** Zasada explicite podana w katalogu (linia 28) i w CLAUDE.md (punkt 5: "przy watpliwosciach wybieraj mniejszy preset") - przy niejednoznacznosci Claude ma preferowac tanszy/mniejszy zespol. Wspomaga to "Macierz kosztow" (linie 214-224) z 5 kubelkami cenowymi (TANI/SREDNI/DROGI/PREMIUM/FLAGOWY) mapujacymi kazdy preset na szacunkowy koszt USD.
5. **Propozycja.** Claude proponuje uzytkownikowi najlepszy preset z krotkim uzasadnieniem, np. "Proponuje `/security-multi-vector` (9 agentow) - multi-vector skan + STRIDE, pasuje do audytu bezpieczenstwa" (wzorzec z CLAUDE.md).
6. **Potwierdzenie i wywolanie.** Jesli uzytkownik potwierdzi ("ok/tak/dawaj"), Claude wywoluje `/nazwa-presetu zadanie` - preset ladujacy odpowiednie pliki skill dla kazdego z agentow.
7. **Fallback.** Jesli zaden z 42 presetow nie pasuje (sekcja "Fallback: custom pipeline", linie 264-272), katalog instruuje Claude aby: (a) powiedziec wprost ze nie ma gotowego presetu, (b) zapytac o kluczowe potrzeby (research? build? QA? debata?), (c) zaproponowac reczny zespol 3-8 agentow z 35 dostepnych, z uzasadnieniem doboru modelu per agent (Opus=krytyczne decyzje, Sonnet=praca, Haiku=lekkie zadania).

**Kluczowa obserwacja architektoniczna:** system nazywa sie "keyword routing" w CLAUDE.md, ale katalog nie zawiera zadnej ustrukturyzowanej listy keywordow (np. `keywords: [auth, security, owasp]`). Dopasowanie odbywa sie przez semantyczne rozumienie przez LLM calego bloku "Uzyj gdy / NIE uzywaj gdy" - to jest routing oparty o few-shot przyklady sytuacyjne, nie o token matching. To ma zalety (odpornosc na synonimy, model rozumie kontekst) i wady (brak deterministycznosci, trudno "zgrepowac" pokrycie tak jak grepuje sie prawdziwy keyword index).

---

## Pelna lista keywordow (zrekonstruowana z "Uzyj gdy")

Ponizej wypisano dla kazdego z 42 presetow faktyczny material sluzacy jako "keywords" - czyli frazy z pola "Uzyj gdy:" plus etykieta kategorii z Przewodnika decyzyjnego. Format zapisu w katalogu: **nazwa presetu (liczba agentow) - jednozdaniowy opis roli**, potem `Uzyj gdy:` (fraza-lista) i `NIE uzywaj gdy:` (fraza-lista z cross-referencjami).

| Preset | Agentow | Kategoria (Przewodnik) | "Uzyj gdy" - faktyczne frazy dopasowania |
|---|---|---|---|
| `/solo` | 2 | Szybki fix/bug/refactor | naprawic buga w jednym module, zrefaktorowac klase, napisac skrypt migracyjny, jednorazowe zadanie z walidacja |
| `/quick-fix` | 2 | Szybki fix/bug/refactor | literowka w UI, brakujacy import, zmiana jednej linii, produkcja sie sypie i wiesz gdzie |
| `/reflect` | 2 | (brak w Przewodniku) | napisac kod i od razu poprawic, refaktor z dbaniem o jakosc, nauka przez code review |
| `/trio` | 3 | Nowa funkcja/feature | maly feature (formularz, CRUD, endpoint), planowanie + test, standardowe zadanie dev |
| `/recon` | 3 | Research/analiza | szybki zwiad ("jakie sa opcje na auth?"), porownanie 2-3 technologii, rozpoznanie przed praca |
| `/bug-hunt` | 4 | Szybki fix/bug/refactor | bug produkcyjny nieznane zrodlo, root cause analysis, blad wracajacy po fixie, regression |
| `/content` | 4 | Dokumentacja/content | blog post, newsletter, landing page copy, dokumentacja uzytkownika, content marketing |
| `/plan-exec` | 4 | Nowa funkcja/feature | feature wymagajacy przemyslenia, implementacja z planem, wiele krokow |
| `/perf-boost` | 4 | Performance | wolna strona, slabe Core Web Vitals, optymalizacja SQL, zmniejszenie bundle size |
| `/startup` | 5 | Caly produkt/SaaS | MVP w weekend, prototyp na demo, hackathon, POC dla klienta |
| `/cascade` | 5 | (brak w Przewodniku) | ograniczony budzet tokenowy, kontrola kosztow, projekt bez wymogu najwyzszej jakosci |
| `/test-suite` | 5 | Testy | dopisywanie testow, zwiekszanie coverage, e2e testy, audyt jakosci testow |
| `/a11y` | 5 | Testy | audyt WCAG, poprawki dostepnosci, aria-labels, kontrast kolorow, screen reader |
| `/security` | 6 | Bezpieczenstwo | ogolny audyt bezpieczenstwa, OWASP top 10, przeglad auth/authz, fix po incydencie |
| `/review` | 6 | (brak w Przewodniku) | review duzego PR, audyt jakosci kodu, przeglad przed mergem, sprawdzenie cudzego kodu |
| `/design-sys` | 6 | Frontend/UI | component library od zera, design tokens, Storybook setup, ustandaryzowanie UI |
| `/api-modern` | 7 | API/backend | migracja REST->GraphQL, wersjonowanie API, przebudowa endpointow, ujednolicenie kontraktow |
| `/ui-overhaul` | 7 | Frontend/UI | redesign istniejacego UI, przebudowa nawigacji, modernizacja UI, zmiana design systemu |
| `/feature-sprint` | 7 | Nowa funkcja/feature | duzy feature (platnosci, dashboard, chat), pelny cykl dev, sprint z deadlinem |
| `/data-pipe` | 7 | Dane/analityka | budowa pipeline danych, ETL/ELT, integracja zrodel, schedulowane joby danych |
| `/ab-test-lab` | 7 | A/B testy | projektowanie A/B testow, analiza statystyczna wynikow, ochrona przed p-hackingiem |
| `/standard` | 8 | Nowa funkcja/feature | typowy sredni projekt, "nie wiem co wybrac" (bezpieczny default), potrzebna kazda faza |
| `/research` | 8 | Research/analiza | analiza rynku, state of the art, porownanie frameworkow, zbieranie info z wielu zrodel |
| `/legacy` | 8 | Migracja/legacy | modernizacja starego kodu, refaktor duzego systemu, dlug techniczny, upgrade frameworka |
| `/tech-writing-pipe` | 8 | Dokumentacja/content | dokumentacja techniczna, tutoriale, API docs, README, ADR, diagramy |
| `/perf-squad` | 8 | Performance | zlozony problem performance (DB+front+back), debata o podejsciu, optymalizacja wielowarstwowa |
| `/microservices` | 9 | API/backend | rozdzielanie monolitu, granice serwisow, kontrakty API miedzy serwisami |
| `/soc2-sweep` | 9 | Compliance/Bezpieczenstwo | audyt SOC2/GDPR/ISO27001, gap analysis, macierz kontroli, polityki bezpieczenstwa |
| `/security-multi-vector` | 9 | Bezpieczenstwo | audyt 5 wektorow (SAST, DAST, secrets, supply chain, config), przed release, po incydencie |
| `/data-analysis-pipe` | 9 | Dane/analityka | analiza danych A-Z, eksploracja datasetu, budowa modelu, raport z wizualizacjami |
| `/five-minds` | 9 | Decyzja architektoniczna | trudna decyzja architektoniczna (monorepo vs polyrepo), trade-off, kontrowersyjny wybor technologii |
| `/deep-research-swarm-pro` | 10 | Research/analiza | najwyzsza jakosc researchu, analiza wielorodlowa, decision paper, due diligence technologiczny |
| `/migration-crew` | 10 | Migracja/legacy | migracja frameworka, bazy danych, clouda, upgrade major version |
| `/kb-constructor` | 10 | Dokumentacja/content | budowa wiki/bazy wiedzy z wielu zrodel, dokumentacja wewnetrzna, onboarding pack |
| `/incident-war-room` | 10 | Incident/awaria | incident produkcyjny, debugging na zywo, postmortem, "cos padlo i nie wiem dlaczego" |
| `/saas` | 10 | Caly produkt/SaaS | budowa aplikacji SaaS, platforma z auth+billing+dashboard, produkt webowy na produkcje |
| `/prd-to-launch` | 11 | Launch produktu | nowy produkt od pomyslu do wdrozenia, JTBD, PRD+design+kod+GTM, startup launch |
| `/deep` | 11 | (brak w Przewodniku) | projekt wymagajacy researchu przed budowa, "zbadaj i zbuduj", nowy feature w nieznanej domenie |
| `/full` | 12 | (brak w Przewodniku) | duzy projekt enterprise, kazdy typ agenta, projekt wielomiesiczny |
| `/fullstack-premium` | 12 | (brak w Przewodniku) | duzy projekt fullstack najwyzszej jakosci, SaaS z monitoringiem, DB architektura+observability |
| `/five-minds-strategic` | 13 | Decyzja architektoniczna | wielka decyzja strategiczna z researchem, architektura calego systemu, wybor stacku dla firmy |
| `/deep-five-minds` | 27 | Mega-projekt, krytyczny | najbardziej krytyczny projekt, decyzja nieodwracalna, wysoka stawka, maximum jakosci/kontroli |

**Uwaga o zliczeniu:** Przewodnik decyzyjny (linie 9-26) definiuje tylko **18 kategorii** dla 42 presetow. Kilka presetow (`/reflect`, `/cascade`, `/review`, `/deep`, `/full`, `/fullstack-premium`) nie ma zadnej etykiety-kategorii w przewodniku i jest odnajdywalne wylacznie przez wlasna sekcje "Uzyj gdy" nizej w dokumencie - co oznacza, ze model musi przeczytac caly katalog (nie tylko przewodnik), aby je rozwazyc.

---

## Czy struktura keywordow jest spojna

**Nie w pelni - jest to hybryda dwoch formatow o roznej granulacji, bez dedykowanego pola tagow:**

1. **Brak jednolitego, atomowego pola `keywords`.** Zaden preset nie ma listy pojedynczych slow kluczowych (np. `keywords: auth, oauth, jwt, login`). Zamiast tego kazdy ma zdanie-liste scenariuszy w jezyku naturalnym. To dziala dobrze dla LLM-routingu (semantyka), ale nie da sie tego zgrepowac/zindeksowac w prosty sposob i nie da sie latwo zmierzyc "pokrycia" bez pelnego czytania.

2. **Dwupoziomowa hierarchia niespojnie wypelniona.** Przewodnik decyzyjny (poziom 1, kategorie ogolne) obejmuje tylko 18 z 42 presetow bezposrednio (czesc kategorii wskazuje na 2-3 presety naraz, np. "Bezpieczenstwo -> `/security`, `/security-multi-vector`, `/soc2-sweep`"), a 6 presetow nie ma zadnej etykiety kategorii. Poziom 2 (sekcje szczegolowe) jest kompletny (42/42), ale zroznicowany stylistycznie - niektore "Uzyj gdy" sa bardzo konkretne i techniczne (np. `/api-modern`: "migracja REST->GraphQL"), inne bardzo ogolne (np. `/standard`: "typowy sredni projekt, nie wiesz co wybrac").

3. **Niespojna ziarnistosc miedzy presetami podobnymi.** Np. `/content` vs `/tech-writing-pipe` roznia sie tylko przez wzajemne odwolanie w "NIE uzywaj gdy" ("piszesz dokumentacje techniczna -> uzyj tech-writing-pipe"), a nie przez jednoznaczny, rozlaczny zestaw keywordow - model musi umiec odroznic "dokumentacja uzytkownika" (content) od "dokumentacja techniczna" (tech-writing-pipe), co jest granica plynna w naturalnym jezyku.

4. **Format "NIE uzywaj gdy" jest jedynym mechanizmem rozstrzygania kolizji.** To dziala jak rozgraniczajacy regex tylko dla par presetow ktore autor przewidzial (np. `/quick-fix` explicite odsyla do `/bug-hunt` gdy "nie wiesz gdzie jest bug"). Presety spoza przewidzianych par (np. `/perf-boost` vs `/incident-war-room` gdy produkcja jest wolna i to jest incydent) nie maja jawnego rozroznienia.

5. **Macierz kosztow i drzewo eskalacji sa dodatkowymi, czesciowo redundantnymi strukturami** (nie kazdy preset jest w drzewie eskalacji - np. `/reflect`, `/cascade`, `/review`, `/ab-test-lab`, `/soc2-sweep` osobno, `/incident-war-room`, `/prd-to-launch`, `/kb-constructor`, `/full` nie maja wlasnej sciezki eskalacji), co pogarsza spojnosc calosci - dokument miesza trzy niezalezne taksonomie (kategoria tematyczna, koszt USD, pozycja w lancuchu eskalacji) bez jednego wspolnego klucza laczacego.

**Wniosek:** struktura jest "spojna w duchu" (kazdy preset ma ten sam szablon: nazwa, liczba agentow, opis, Uzyj gdy, NIE uzywaj gdy) ale **niespojna w pokryciu przez kategorie nadrzedne** i **calkowicie pozbawiona atomowych keywordow** nadajacych sie do prostego dopasowania tekstowego. To celowy wybor projektowy (routing jest robiony przez LLM, nie przez string matching), ale sprawia, ze trudno jest audytowac pokrycie tematyczne bez pelnej lektury pliku przez czlowieka lub agenta.

---

## Luki w pokryciu

Ponizej sprawdzono 11 typowych kategorii pracy programistycznej pod katem: czy istnieje preset ktorego "Uzyj gdy" jednoznacznie to pokrywa, czy trzeba zgadywac, i jak silne jest ryzyko zlego routingu.

### 1. Deployment (wdrozenia, CI/CD, release management)
**Brak dedykowanego presetu i brak keywordu.** Zaden z 42 presetow nie wspomina "deploy", "CI/CD", "release pipeline", "rollout", "canary", "blue-green". Najblizej jest `/security-multi-vector` ("przed release" - ale w kontekscie skanu bezpieczenstwa, nie samego wdrozenia) i `/saas` ("deploy" jest wymieniony jako jeden z 4 skladnikow zespolu "front + back + DB + auth + deploy", ale nie jako osobny scenariusz uzycia). Zadanie typu "skonfiguruj mi pipeline CI/CD do wdrazania na produkcje" nie ma jednoznacznego trafienia - Claude prawdopodobnie zaproponowalby `/standard` (bezpieczny default) lub eskalowal do fallbacku custom pipeline. **Ryzyko: wysokie** - to bardzo czesta kategoria pracy, calkowicie nieopisana.

### 2. Monitoring / observability
**Czesciowo pokryte, ale ukryte.** `/fullstack-premium` wspomina "Observability" jako jeden z 12 agentow ("7 core dev + DB Architect + Observability + UX Research"), a `/incident-war-room` ma agenta "Observability" w opisie ("Telemetry Surfer + Observability + Backend + Devil"). Natomiast zadne "Uzyj gdy" nie zawiera fraz typu "dodaj monitoring", "skonfiguruj alerty", "zbuduj dashboard metryk", "wdroz OpenTelemetry". Ktos piszacy "chce dodac monitoring do mojej appki" ma szanse trafic w `/fullstack-premium` (zbyt duzy, 12 agentow, drogi) tylko jesli model skojarzy "monitoring"="Observability" - niejawne, zalezne od interpretacji. **Ryzyko: srednie-wysokie**, brak malego/sredniego presetu pod ten temat.

### 3. Migracje danych (nie frameworka, tylko danych - np. przenosiny bazy, ETL migration, data backfill)
**Czesciowo pokryte, ale dwuznaczne miedzy trzema presetami.** `/migration-crew` explicite wymienia "bazy danych (MySQL->Postgres)" jako scenariusz - to dobrze pokrywa migracje schematu/silnika bazy. `/data-pipe` pokrywa ETL/ELT budowany od zera, nie migracje istniejacych danych. `/solo` wymienia "napisac skrypt migracyjny" jako jeden ze scenariuszy prostego zadania. Zatem dla "migracji danych" istnieja trzy nakladajace sie kandydatury w zaleznosci od skali (skrypt jednorazowy vs infrastruktura vs cala baza) - katalog nie podaje jasnego kryterium rozgraniczajacego rozmiar/typ migracji danych (w odroznieniu od migracji frameworka/clouda, gdzie granica jest czytelna). **Ryzyko: srednie**, wymaga dodatkowego pytania doprecyzowujacego.

### 4. Integracje API third-party (np. integracja ze Stripe, Twilio, zewnetrznym API)
**Brak jednoznacznego trafienia.** `/api-modern` dotyczy modernizacji WLASNEGO API (REST->GraphQL, wersjonowanie), nie integracji z cudzym API. `/data-pipe` dotyczy "integracja zrodel" ale w kontekscie danych/ETL, nie ogolnej integracji uslug trzecich (platnosci, SMS, mapy). Zadanie "zintegruj Stripe do checkout" najprawdopodobniej wyladuje w `/trio` lub `/feature-sprint` (jako "nowa funkcja"), co jest rozsadne, ale nie ma explicite dopasowania. **Ryzyko: niskie-srednie** - prawdopodobnie trafi do ogolnej kategorii "Nowa funkcja", co jest akceptowalne, ale nie idealnie precyzyjne.

### 5. Mobile (aplikacje mobilne, React Native, iOS/Android specyfika)
**Calkowity brak.** Zero wzmianek o "mobile", "iOS", "Android", "React Native", "Flutter" w calym katalogu. Wszystkie sformulowania sa web-centryczne (Core Web Vitals, bundle size, strona, UI). **Ryzyko: wysokie dla uzytkownikow mobile** - jesli Maciej lub jego wspolpracownicy kiedykolwiek robia mobile dev, zaden preset nie sygnalizuje dopasowania i model musi improwizowac (prawdopodobnie `/trio` lub `/standard` z generycznym "Frontend").

### 6. ML/AI features (dodanie modelu ML, integracja LLM do produktu, prompt engineering feature)
**Brak dedykowanego presetu.** `/data-analysis-pipe` wspomina "budowa modelu" ale w kontekscie analizy danych/statystyki (EDA, Statistician), nie wdrazania modelu ML/LLM do produktu produkcyjnego. Nie ma zadnego presetu z keywordem "LLM", "prompt", "RAG", "embedding", "fine-tuning", "AI feature". Zadanie "dodaj funkcje AI-chat do naszej appki" nie ma naturalnego trafienia - najblizsze byloby `/feature-sprint` lub `/trio` po prostu jako generyczny "nowy feature", tracac cala domenowa specyfike (wybor modelu, koszt tokenow, ewaluacja jakosci LLM). **Ryzyko: wysokie**, szczegolnie ironiczne biorac pod uwage ze to jest projekt o systemach multi-agent AI.

### 7. UX research (osobno od designu - wywiady z uzytkownikami, testy uzytecznosci, persony)
**Czesciowo pokryte jako skladnik, nie jako cel sam w sobie.** "UX Researcher" pojawia sie jako agent w `/a11y` i "UX Research" jako skladnik `/ui-overhaul` i `/fullstack-premium`, ale zadne "Uzyj gdy" nie opisuje scenariusza czysto badawczego typu "przeprowadz wywiady z uzytkownikami", "zbuduj persony", "test uzytecznosci prototypu". `/recon` dotyczy researchu technologicznego, nie UX. Brak jednoznacznego celu dla samodzielnego zadania UX research bez towarzyszacego designu/frontendu. **Ryzyko: srednie**, prawdopodobnie zle dopasowanie do `/a11y` (ktory jest o dostepnosci, nie ogolnym UX) lub do `/ui-overhaul` (zbyt duzy, zaklada tez implementacje).

### 8. Dokumentacja techniczna (ADR, API docs, README)
**Dobrze pokryte.** `/tech-writing-pipe` explicite: "dokumentacja techniczna, tutoriale, API docs, README, architecture decision records, diagramy" - to jeden z najbardziej precyzyjnych i kompletnych wpisow w calym katalogu, z jasnym rozroznieniem od `/content` (marketing) i `/solo` (jeden plik). **Ryzyko: brak.**

### 9. Onboarding (dokumentacja dla nowych pracownikow, onboarding pack)
**Pokryte posrednio przez `/kb-constructor`** ("onboarding pack" jest explicite wymieniony w "Uzyj gdy"), wiec ta kategoria jest zaskakujaco dobrze zaadresowana mimo ze nie ma wlasnej kategorii w przewodniku decyzyjnym glownym. **Ryzyko: niskie.**

### 10. Code review
**Dobrze pokryte.** `/review` (6 ag) explicite: "review duzego PR, audyt jakosci kodu, przeglad przed mergem, sprawdzenie czyjegos kodu", z jasnym rozroznieniem od `/reflect` (maly PR, self-review). **Ryzyko: brak.** Jedyna drobna niespojnosc: `/review` nie ma wlasnej etykiety w Przewodniku decyzyjnym (poziom 1), wiec jest odnajdywalny tylko przy pelnym czytaniu katalogu.

### 11. Incident response
**Dobrze pokryte.** `/incident-war-room` (10 ag) explicite: "incident produkcyjny, debugging na zywo, postmortem, cos padlo i nie wiesz dlaczego", z jasnym rozgraniczeniem od `/bug-hunt` ("bug jest znany i zlokalizowany -> uzyj bug-hunt"). Ma tez wlasna kategorie w Przewodniku ("Incident/awaria"). **Ryzyko: niskie.**

### Podsumowanie luk (od najgorszej)

| Kategoria | Pokrycie | Ryzyko | Rekomendacja |
|---|---|---|---|
| Mobile dev | Brak | Wysokie | Dodac wzmianke w istniejacych presetach lub nowy `/mobile-*` |
| ML/AI features (LLM w produkcie) | Brak | Wysokie | Priorytet - dodac preset lub keywords do `/feature-sprint`/`/trio` |
| Deployment / CI/CD | Brak | Wysokie | Dodac keyword do `/saas` lub nowy maly preset `/deploy` |
| Monitoring/observability | Ukryte w 2 duzych presetach | Srednie-wysokie | Dodac maly preset lub jawny keyword |
| UX research (samodzielny) | Czesciowe, myli sie z a11y/ui-overhaul | Srednie | Doprecyzowac granice w "Uzyj gdy" |
| Integracje API third-party | Brak jednoznacznego, spada do generycznych | Niskie-srednie | Dodac przyklad do `/trio` lub `/api-modern` |
| Migracje danych | Rozdzielone na 3 presety bez kryterium | Srednie | Dodac kryterium rozmiaru w "NIE uzywaj gdy" |
| Dokumentacja techniczna | Dobre | Brak | - |
| Onboarding | Dobre (w kb-constructor) | Niskie | - |
| Code review | Dobre | Brak | - |
| Incident response | Dobre | Brak | - |

Ogolny wzorzec: katalog jest silny tam, gdzie autor mial jasny mentalny model kategorii (bezpieczenstwo, research, dokumentacja, dane-jako-ETL, incident), a slaby tam, gdzie kategoria jest "poprzeczna" wzgledem istniejacej struktury lub nowoczesna/wschodzaca (AI features, mobile, DevOps/deployment, observability jako wlasny temat). Zadna z tych brakujacych kategorii nie ma nawet czastkowego wpisu w Przewodniku decyzyjnym (poziom 1), co oznacza ze model musi je zidentyfikowac wylacznie poprzez brak dopasowania i przejscie do sekcji Fallback - co jest zaprojektowanym mechanizmem awaryjnym, ale skutkuje mniej precyzyjnym doborem zespolu niz przy jawnym trafieniu w preset.
