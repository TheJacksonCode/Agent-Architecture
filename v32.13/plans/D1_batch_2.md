# D1 Batch 2 - Build phase agents (11)

Polish content for v32.13 agent detail sidebar polish. Four constants per agent.

## AGENT_LONG_PL

```js
const AGENT_LONG_PL = {
  backend: '<p>Backend Koder to agent implementacji warstwy serwerowej. Dostaje gotowa specyfikacje API z MANIFEST.md i zamienia ja w dzialajacy kod endpointow, schematy danych, walidacje requestow i logike biznesowa. Pracuje w TDD - testy jednostkowe PRZED implementacja, nigdy odwrotnie.</p><p>Specjalizuje sie w REST/GraphQL, warstwie bazodanowej (zapytania, transakcje, migracje), error handlingu i uzywaniu env vars zamiast hardcoded sekretow. Ma najwyzsze obciazenie w BUILD (75-80/100) bo generowanie kodu serwerowego to najbardziej zasobozerny etap pipeline. Nie projektuje architektury, nie kwestionuje stacku, nie pisze frontendu - dostaje rysunek techniczny i buduje wedlug niego jak mistrz stolarz wedlug planu architekta.</p>',
  frontend: '<p>Frontend Koder implementuje warstwe kliencka mobile-first - to co uzytkownik widzi i z czym wchodzi w interakcje. Bierze gotowy design system od Designera (tokeny CSS, paleta, typografia) i wireframe od Analityka, a oddaje reuzywalne komponenty UI z pelna obsluga stanow ladowania, bledu, pustych danych i sukcesu.</p><p>Mistrz responsive layoutu (60%+ ruchu w 2026 to mobile), accessibility (aria-labels, keyboard navigation, focus management, skip links) i performance (lazy loading, code splitting, image optimization, tree shaking). Obsluguje state management, routing SPA i integracje z backendowym API. Nie projektuje wygladu (to Designer), nie tworzy endpointow (to Backend), nie pisze copy (to Writer) - konsumuje API i renderuje komponenty wedlug specyfikacji.</p>',
  feature: '<p>Feature Dev to specjalista od zaawansowanych funkcjonalnosci wymagajacych niszowej wiedzy: real-time (WebSocket, SSE, long polling z reconnection logic), integracje AI/ML (streaming, embeddings, function calling, prompt chaining), wizualizacje danych (D3.js, Chart.js, SVG, Canvas z interakcjami) i third-party API (Stripe, Firebase, AWS SDK, OAuth flows, webhook handlers).</p><p>Implementuje to, czego Backend i Frontend Dev nie potrafia - wymaga glebokiej znajomosci specjalistycznych bibliotek i protokolow. Jak specjalista od efektow specjalnych w filmie: nie kazdy projekt go potrzebuje, ale gdy potrzebuje, zwykly operator nie da rady. Nie buduje podstawowego CRUD, nie projektuje UI, nie prowadzi researchu - trzyma sie swojej specjalizacji.</p>',
  designer: '<p>Designer to most miedzy wizualna inspiracja a dzialajacym kodem CSS. Otrzymuje mood board i audyt dostepnosci od Researcher UX i zamienia to w design tokeny (primitive/semantic/component), palety kolorow, systemy typografii, siatki layoutu, mikro-animacje i ikony SVG.</p><p>Implementacja, nie badanie - jak kolorysta filmowy, ktory naklada faktyczne krzywe kolorow na material zebrany przez operatora. Buduje layout HTML z grid/flexbox, implementuje dark/light mode, dba o contrast ratio i spojnosc wizualna. Load 55-75/100. Nie bada trendow (to Researcher UX), nie pisze logiki JavaScript (to Koder), nie tworzy tresci tekstowej (to Writer), nie integruje komponentow w finalny produkt (to Integrator).</p>',
  integrator: '<p>Integrator to ostatni agent warstwy BUILD i brama miedzy BUILD a QA. Laczy outputy Kodera, Designera i Writera w jeden spojny artefakt, weryfikuje API contracts (czy frontend i backend mowia tym samym jezykiem), rozwiazuje konflikty integracyjne i przeprowadza E2E test calego flow.</p><p>Ma najszerszy arsenal narzedzi w BUILD (Write, Edit, Read, Grep, Glob, Bash) i najwyzszy budzet tokenow wejsciowych - czyta WSZYSTKIE outputy. Jedyny builder widzacy prace calego zespolu. Jak monter filmowy na stole montazowym: operator, dzwiekowiec i kompozytor wykonali prace perfekcyjnie, ale film powstaje dopiero gdy monter to synchronizuje. Nie pisze nowego kodu, nie projektuje, nie audytuje - laczy gotowe elementy i waliduje zgodnosc z MANIFEST.md.</p>',
  writer: '<p>Writer to agent jakosci tresci - zamienia surowy tekst od Kodera lub Integratora w profesjonalny dokument. Redaguje dokumentacje techniczna (gramatyka, terminologia, struktura), tworzy README.md z instrukcjami, pisze CHANGELOG, API docs i decision records. Komentarze dodaje TYLKO dla nontrivial kodu - over-documentation to szum.</p><p>Dziala w izolowanym document sandbox - widzi wylacznie pliki tekstowe, nie ma dostepu do Bash. Najnizsze obciazenie w BUILD (35/100) bo polerowanie tekstu jest lzejsze niz generowanie kodu, ale niski load nie oznacza niskiej waznosci - bez Writera dokumentacja wyglada jak notatki na serwetce. Jak inzynier dzwieku miksujacy album: balansuje, usuwa szumy, dodaje klarownosci.</p>',
  db_architect: '<p>DB Architect to specjalista projektowania warstwy danych. Projektuje schemat bazy (DDL: CREATE TABLE/INDEX/CONSTRAINT lub ORM models), dobiera indeksy do realnych query patternow (nigdy spekulacyjnie), pisze migracje zero-downtime w schemacie expand-backfill-contract i definiuje strategie partycjonowania oraz shardingu.</p><p>Szacuje koszt storage i I/O, ustala polityki retencji i soft-delete, rekomenduje read replicas i cache layer. Pracuje na Sonnet, load 70/100. Nie dobiera technologii bazy (to Research Tech), nie pisze logiki aplikacyjnej, nie wykonuje migracji na produkcji - dostarcza plan i odwracalne skrypty.</p>',
  observability_engineer: '<p>Observability Engineer instrumentuje system w trzy filary: metryki, logi i tracingi. Identyfikuje golden signals (latency, traffic, errors, saturation), projektuje nazwy metryk kontrolujac kardynalnosc (zaden userId jako label), wybiera poziomy logowania per modul i strukturyzowany format JSON oraz definiuje trace context propagation (W3C traceparent) przez granice uslug.</p><p>Pisze SLO w formacie [metryka] [operator] [wartosc] w [oknie] dla [X%] requestow i projektuje alerty symptom-based z runbookami. Dobiera stack OpenTelemetry, Prometheus, Grafana. Nie pisze feature code, nie decyduje o SLA biznesowym, nie projektuje bazy - instrumentuje istniejacy system.</p>',
  gtm_strategist: '<p>GTM Strategist projektuje go-to-market: definiuje ICP (Ideal Customer Profile) i buyer personas, pisze positioning statement w formacie dla kogo-po co-w czym lepszy, dobiera model cenowy (freemium/tiered/usage-based/seat-based) i mapuje kanaly akwizycji (organic/paid/community/partnerships/outbound).</p><p>Proponuje sekwencje launchu (private beta -> public beta -> GA) i metryki sukcesu (activation, retention, revenue) z targetami 30/60/90 dni. ICP musi byc ostre - jesli brzmi jak kazdy, jest dla nikogo. Pricing zakotwiczony w wartosci dla klienta, nie w kosztach. Nie projektuje produktu, nie pisze kodu ani copy - dostarcza strategie i messaging framework.</p>',
  control_mapper: '<p>Control Mapper mapuje wymagania regulacyjne (GDPR, SOC2 Type II, ISO27001, HIPAA) na konkretne kontrole techniczne i procesowe. Rozklada kazda regulacje na atomowe wymagania (np. GDPR art. 32 -> szyfrowanie at-rest i in-transit), buduje matryce kontroli wymaganie -> kontrola -> implementacja -> dowod i identyfikuje luki (gap analysis) z priorytetem krytyczny/wysoki/sredni/niski.</p><p>Preferuje kontrole techniczne nad proceduralnymi (automatyzuj gdy mozesz), definiuje dowody odtwarzalne i datowane. Nie interpretuje prawa, nie udziela porad prawnych, nie implementuje kontroli (to rola Backend/DevOps), nie przeprowadza audytu - dostarcza material na audyt.</p>',
  telemetry_surfer: '<p>Telemetry Surfer przeszukuje istniejaca telemetrie produkcyjna (logi, metryki, traces) w poszukiwaniu wzorcow, anomalii i incydentow. Odpowiada na pytania co sie stalo o 12:34 i czy mamy memory leak - bazujac na danych z Prometheus, Loki, Tempo, CloudWatch.</p><p>Zaczyna od golden signals w wskazanym oknie, koreluje metryki z logami bledow i tracingami, identyfikuje top kontrybutorow (endpoint, user, region), sprawdza ostatnie deployy przed oknem. Kluczowe: dostarcza doslowne reproducable queries (PromQL/LogQL/TraceQL) zeby dalo sie powtorzyc, rozroznia korelacje od przyczynowosci. Read-only queries, nie naprawia problemow, nie projektuje nowych metryk (to Observability Engineer).</p>'
};
```

## AGENT_MID_PL

```js
const AGENT_MID_PL = {
  backend: 'Uzyj gdy masz gotowa specyfikacje API i potrzebujesz endpointow, schematow, walidacji i logiki biznesowej z testami TDD.',
  frontend: 'Uzyj gdy masz design system i wireframe - potrzebujesz responsywnych komponentow UI z accessibility i performance od razu.',
  feature: 'Uzyj dla real-time, AI/ML, wizualizacji danych lub third-party API - tam gdzie standardowy Backend i Frontend nie wystarcza.',
  designer: 'Uzyj gdy masz mood board od Researcher UX i potrzebujesz design tokenow, palet, typografii, animacji i dark/light mode.',
  integrator: 'Uzyj na koncu BUILD zeby polaczyc outputy Kodera, Designera i Writera, sprawdzic API contracts i przeprowadzic E2E test.',
  writer: 'Uzyj do redakcji README, CHANGELOG, API docs i decision records - gdy kod jest gotowy ale dokumentacja to jeszcze notatki.',
  db_architect: 'Uzyj gdy projektujesz nowy schemat bazy, planujesz migracje zero-downtime lub potrzebujesz strategii indeksow i partycjonowania.',
  observability_engineer: 'Uzyj gdy instrumentujesz system w metryki, logi i tracingi, definiujesz SLO lub projektujesz dashboardy i alerty symptom-based.',
  gtm_strategist: 'Uzyj gdy masz MVP i potrzebujesz ICP, positioning, modelu cenowego i planu launchu z kanalami i KPI 30/60/90 dni.',
  control_mapper: 'Uzyj gdy gotujesz sie do audytu GDPR, SOC2, ISO27001 lub HIPAA i potrzebujesz matrycy kontroli oraz gap analysis.',
  telemetry_surfer: 'Uzyj do post-mortem incydentow i debugowania produkcji - gdy masz telemetrie i pytanie czemu/kiedy/jak szeroko.'
};
```

## AGENT_GREEN_PL

```js
const AGENT_GREEN_PL = {
  backend: ['API endpoints + schematy', 'Walidacja requestow', 'Logika biznesowa', 'Testy TDD', 'Error handling', 'Migracje danych'],
  frontend: ['Responsywne komponenty UI', 'State management', 'Accessibility aria/keyboard', 'Lazy loading + code split', 'Dark/light mode', 'Routing SPA'],
  feature: ['WebSocket real-time', 'Integracje AI/ML', 'Wizualizacje D3/Canvas', 'Stripe + OAuth flows', 'Streaming API', 'Webhook handlers'],
  designer: ['Design tokeny CSS', 'Palety i typografia', 'Mikro-animacje', 'Dark/light mode', 'Ikony SVG', 'Grid/flexbox layout'],
  integrator: ['Laczenie outputow BUILD', 'Weryfikacja API contracts', 'E2E test flow', 'Rozwiazywanie konfliktow', 'Walidacja zgodnosci'],
  writer: ['README.md + instrukcje', 'CHANGELOG', 'API docs', 'Decision records', 'Polerowanie gramatyki', 'Spojnosc terminologii'],
  db_architect: ['Schemat DDL + indeksy', 'Migracje zero-downtime', 'Strategia partycjonowania', 'Query pattern tuning', 'Polityki retencji'],
  observability_engineer: ['Metryki + logi + traces', 'SLI/SLO definicje', 'Alerty symptom-based', 'Dashboardy Grafana', 'Trace propagacja W3C'],
  gtm_strategist: ['ICP i buyer personas', 'Positioning statement', 'Model cenowy', 'Kanaly akwizycji', 'Plan launchu beta/GA'],
  control_mapper: ['Matryca kontroli GDPR/SOC2', 'Gap analysis', 'Dowody zgodnosci', 'Priorytetyzacja lukow', 'Kontrole techniczne'],
  telemetry_surfer: ['Post-mortem incydentow', 'Korelacja metryk z logami', 'Golden signals analiza', 'Reproducable PromQL', 'Root cause hipotezy']
};
```

## AGENT_RED_PL

```js
const AGENT_RED_PL = {
  backend: ['Projektowanie architektury', 'Research frameworkow', 'Pisanie frontendu', 'Decyzje technologiczne', 'Audyt bezpieczenstwa'],
  frontend: ['Projektowanie design systemu', 'Implementacja API', 'Testy bezpieczenstwa', 'Wybor stacku', 'Pisanie copy tresci'],
  feature: ['Podstawowy CRUD', 'Projektowanie UI', 'Prowadzenie researchu', 'Integracja systemu', 'Generalistyczne taski'],
  designer: ['Badanie trendow UX', 'Logika JavaScript', 'Pisanie testow', 'Tresc tekstowa', 'Integracja komponentow'],
  integrator: ['Pisanie nowego kodu', 'Projektowanie', 'Audyt jakosci', 'Force merge bez testu', 'Late integration'],
  writer: ['Kod logiczny', 'Research', 'Projektowanie wizualne', 'Uruchamianie skryptow', 'Over-documentation'],
  db_architect: ['Wybor technologii bazy', 'Logika aplikacyjna', 'Migracje na produkcji', 'Spekulacyjne indeksy'],
  observability_engineer: ['Feature code', 'SLA biznesowe', 'Projekt bazy danych', 'Logowanie PII bez redakcji'],
  gtm_strategist: ['Projektowanie produktu', 'Pisanie kodu', 'UX research', 'Copy tresci reklamowej'],
  control_mapper: ['Porady prawne', 'Implementacja kontroli', 'Przeprowadzanie audytu', 'Interpretacja prawa'],
  telemetry_surfer: ['Naprawa problemow', 'Projektowanie metryk', 'Zmiany w produkcji', 'Nadinterpretacja korelacji']
};
```

## Source notes

- **backend** - R2 (line 553-602, slant backendowy API/DB/infra) + AK fallback for details
- **frontend** - R2 (line 608-657, slant frontendowy UI/state/routing) + AK fallback
- **feature** - AK only (not in R2)
- **designer** - R2 (line 663-712) + AK
- **integrator** - R2 (line 774+) + AK
- **writer** - R2 (line 718-768) + AK
- **db_architect** - AK fallback (no AGENT_KNOWLEDGE entry; derived from AD role + prompt at line 4271-4274)
- **observability_engineer** - AK fallback (derived from AD role + prompt at line 4275-4278)
- **gtm_strategist** - AK fallback (derived from AD role + prompt at line 4279-4282)
- **control_mapper** - AK fallback (derived from AD role + prompt at line 4291-4294)
- **telemetry_surfer** - AK fallback (derived from AD role + prompt at line 4295-4298)

Slant preservation: backend entry leans hard on API endpoints, schematy, walidacja, logika biznesowa, migracje, error handling. Frontend entry leans hard on komponenty, state management, accessibility, lazy loading, routing SPA, dark/light mode. Same Koder origin per R2, differentiated outputs.
