# MICROSERVICES — Dekompozycja Monolitu

## Kompletny Przewodnik | Tier 4 ENTERPRISE | Gold Standard 2026

**Preset ID:** `microservices` | **Tier:** 4 (ENTERPRISE) | **Agentow:** 11
**Wzorzec:** Monolith Decomposition (4-Phase Pipeline + Parallel Build + Triple QA)
**Tokeny:** ~350-600K | **Koszt:** $0.35-$0.90 | **Latencja:** ~8-15 min

---

## 1. Wprowadzenie — Dlaczego dekompozycja wymaga 11 agentow?

### Analogia: Urbanistyka — centrum handlowe vs dzielnica sklepow

Masz w miescie jeden gigantyczny budynek — centrum handlowe. Piekarnia, apteka,
kino, bank, supermarket — wszystko pod jednym dachem. Awaria windy blokuje CALY
budynek. Remont jednej sciany zamyka WSZYSTKIE sklepy na tydzien.

Urbanista decyduje: rozbijmy to na dzielnice. Kazdy sklep dostaje wlasny
budynek. Ale zeby to zrobic, potrzebujesz:
- **Analityka** — ktore sklepy naprawde sa niezalezne, a ktore wspoldziela magazyn?
- **Planisty** — w jakiej kolejnosci przenosic, zeby nikt nie stracil pradu?
- **Badacza** — jakie technologie laczyc miedzy budynkami?
- **4 ekip budowlanych** — fundamenty, wnetrza, drogi/rury, witryny
- **3 inspektorow** — bezpieczenstwo, jakosc, odbiór koncowy

To jest preset Microservices: 11 specjalistow rozbijajacych monolit na
ekosystem niezaleznych uslug. Jak transformacja centrum handlowego w
dobrze zaplanowana dzielnice — kazdy sklep niezalezny, ale polaczony
drogami i mediami.

> **Czy wiesz, ze...?**
> Ponad **77% organizacji enterprise** migruje do mikroserwisow, ale **62%**
> przyznaje, ze pierwsza proba skonczyla sie "distributed monolith" — najgorszym
> z obu swiatow. Preset Microservices istnieje, zeby twoja dekompozycja nie
> dolaczyla do tych 62%.

> **Uwaga!**
> To NAJCIEZSZE narzedzie Tier 4. NIE uzywaj do: prostych CRUD (Solo),
> jednorazowych skryptow, ani feature'ow niedotyczacych dekompozycji.

---

## 2. Sklad zespolu — 11 specjalistow dekompozycji

### Orkiestrator (A-00)

| Parametr | Wartosc |
|----------|---------|
| **Rola** | STRATEGIA — koordynacja 10 agentow, routing, decyzje |
| **Model** | Claude Opus ($15/$75 za 1M tokenow) |
| **Load** | 80/100 | **Tokeny:** ~30-50K |

Przyjmuje zadanie, uruchamia 4 fazy sekwencyjnie, koordynuje paralelizm
w Fazie 3 (4 builderow), zbiera GO/NO-GO z Fazy 4, decyduje PASS/FAIL.

### Faza 1 — Planowanie: Analyst (P-01) + Planner (P-02)

**Analyst** | Sonnet | Load 70 | ~25-40K tokenow
- Skanuje monolit, mapuje bounded contexts (DDD), wykrywa coupling, shared state
- OUTPUT: mapa zaleznosci + rekomendacja granic serwisow

**Planner** | Sonnet | Load 75 | ~25-40K tokenow
- Tworzy **Service Dependency DAG** — graf zaleznosci miedzy serwisami
- Ustala **deployment order** (topological sort), definiuje API contracts
- Planuje migration path (Strangler Fig / Blue-Green / Canary)
- Przydziela zadania 4 builderom w Fazie 3

**Dlaczego Planner jest KLUCZOWY?** Bez DAG builderzy buduja w losowej
kolejnosci. Serwis A zalezy od B, ale B nie istnieje. Integrator laczy cos
bez stabilnego API. Planner eliminuje chaos.

### Faza 2 — Research: Researcher Tech (R-01)

| Sonnet | Load 70 | ~20-35K tokenow | Narzedzia: Read, Grep, WebSearch, WebFetch |

Bada service mesh options (Istio/Linkerd), API gateway patterns (Kong/Ambassador),
konteneryzacje (Docker/K8s), messaging (REST/gRPC vs Kafka/RabbitMQ).
Dostarcza evidence-based tech recommendations na bazie wynikow Fazy 1.

### Faza 3 — Build: 4 rownoleglych builderow

| Agent | Rola | Load | Tokeny |
|-------|------|------|--------|
| **Backend (B-01)** | Core domain services, database-per-service, migracje, health checks | 85 | ~40-60K |
| **Feature Dev (B-02)** | Saga pattern, CQRS, business validation, domain events | 80 | ~35-55K |
| **Integrator (B-03)** | API Gateway, service mesh, circuit breaker, distributed tracing | 80 | ~35-50K |
| **Frontend BFF (B-04)** | Backend-For-Frontend, API aggregation, GraphQL, caching | 75 | ~30-45K |

Wszystkich 4 na modelu Sonnet ($3/$15). Pracuja ROWNOLEGLE — kazdy dostaje
TYLKO swoja czesc planu (Narrow Context = mniej halucynacji).

### Faza 4 — Triple QA z Managerem

**QA Security (Q-01)** | Sonnet | Load 75 | ~25-35K
- mTLS, auth per service, secret management, network policies, OWASP per endpoint

**QA Quality (Q-02)** | Sonnet | Load 75 | ~25-35K
- Unit testy (>80% coverage), contract testy (Pact), integration, data consistency

**QA Manager (Q-03)** | Sonnet | Load 70 | ~20-30K
- Zbiera raporty Security + Quality, sprawdza kompletnosc
- Waliduje API contract consistency end-to-end
- **Decyzja GO/NO-GO** — binarna, z uzasadnieniem i routingiem do buildera

---

## 3. Diagram architektury

```
+=======================================================================+
|                   PRESET: MICROSERVICES (11 agentow)                  |
|              Tier 4 ENTERPRISE | Monolith Decomposition               |
+=======================================================================+
|                      +------------------+                             |
|                      |   ORKIESTRATOR   |                             |
|                      | Opus | Load 80   |                             |
|                      +--------+---------+                             |
|              FAZA 1:          |                                       |
|         +----------+----------+----------+                            |
|         v                                v                            |
|   +-----------+                   +-----------+                       |
|   |  ANALYST  |                   |  PLANNER  |                       |
|   | Sonnet 70 |                   | Sonnet 75 |                       |
|   +-----+-----+                   +-----+-----+                       |
|         +----------------+---------------+                            |
|              FAZA 2:     v                                            |
|                   +-----------+                                       |
|                   | RESEARCHER|                                       |
|                   | Sonnet 70 |                                       |
|                   +-----+-----+                                       |
|              FAZA 3:    v  (4 rownolegle)                             |
|    +----------+----------+----------+----------+                      |
|    v          v          v          v                                 |
| +--------+ +--------+ +--------+ +--------+                          |
| |BACKEND | |FEATURE | |INTEGR. | |FRONT.  |                          |
| |Snnt 85 | |Snnt 80 | |Snnt 80 | |Snnt 75 |                          |
| +---+----+ +---+----+ +---+----+ +---+----+                          |
|     +----------+----------+----------+                                |
|              FAZA 4:    v  (Triple QA)                                |
|    +-----------+-----------+-----------+                              |
|    v           v           v                                          |
| +--------+ +--------+ +----------+                                   |
| |QA SEC. | |QA QUAL.| |QA MANAGER|                                   |
| |Snnt 75 | |Snnt 75 | | Snnt 70  |                                   |
| +---+----+ +---+----+ +----+-----+                                   |
|     +----------+-----------+                                          |
|                v                                                      |
|         [GO / NO-GO] → Orkiestrator                                  |
+=======================================================================+
| Polaczenia: 10 dwukierunkowych | Hub-and-Spoke                       |
| Tokeny: ~350-600K | Koszt: $0.35-$0.90 | ~8-15 min                  |
+=======================================================================+
```

---

## 4. Wzorzec — Monolith Decomposition Pattern

### 4-fazowy pipeline

```
PLANOWANIE (Analyst+Planner) → RESEARCH → BUILD (4x parallel) → TRIPLE QA
```

| Podejscie | Fazy | Ryzyko distributed monolith |
|-----------|------|----------------------------|
| Naiwne (Build→QA) | 2 | ~62% |
| Z planowaniem | 3 | ~35% |
| **Pelne (Plan→Research→Build→QA)** | **4** | **~12%** |

### Service Dependency DAG

DAG tworzony przez Plannera to najwazniejszy artefakt Fazy 1:

```
[Auth Service] ──→ [User Service] ──→ [Order Service] ──→ [Notification]
[Auth Service] ──→ [Payment Service] ──→ [Order Service]
[Email Gateway] ──→ [Notification]
```

Deployment order = topological sort: 1) Auth + Email GW → 2) User + Payment →
3) Order → 4) Notification. Bez DAG builderzy buduja w losowej kolejnosci.

### Zlozonosc komunikacyjna

Dzeki hub-and-spoke (wszystko przez Orkiestratora) preset ma TYLKO 10 kanalow
zamiast teoretycznych 55 (full mesh dla 11 agentow).

---

## 5. Workflow krok po kroku

### Faza 1: PLANOWANIE (~2-3 min, ~50-80K tokenow)

Analyst i Planner pracuja ROWNOLEGLE:
- Analyst skanuje kod, mapuje domeny, wykrywa coupling
- Planner analizuje wymagania, tworzy DAG, definiuje contracts

### Faza 2: RESEARCH (~1-2 min, ~20-35K tokenow)

Researcher dostaje wyniki Fazy 1 i bada optymalny tech stack:
service mesh, gateway, messaging patterns, konteneryzacja.

### Faza 3: BUILD (~3-5 min, ~140-210K tokenow) — NAJDROZSZA

4 builderow pracuje ROWNOLEGLE z precyzyjnymi instrukcjami:
- **Backend:** "Wyodrebnij 3 core services, database-per-service, migracje"
- **Feature Dev:** "Saga pattern dla Order→Payment, CQRS dla read model"
- **Integrator:** "Istio mesh, Kong gateway, Jaeger tracing, circuit breaker"
- **Frontend BFF:** "Agregujace /api/v1 endpoints, caching, mobile vs web"

### Faza 4: TRIPLE QA (~2-4 min, ~70-100K tokenow)

QA Security i Quality testuja rownolegle. QA Manager agreguje, decyduje:
- **GO** = wszystkie serwisy PASS security + quality + contracts
- **NO-GO** = lista issues + routing do konkretnego buildera

### Timeline

```
t=0     Orkiestrator analizuje
t=0.5   Faza 1: Analyst || Planner
t=2.5   Faza 2: Researcher Tech
t=4.5   Faza 3: Backend || Feature || Integrator || Frontend
t=9.0   Faza 4: QA Security || QA Quality || QA Manager
t=13.0  GO/NO-GO → Orkiestrator: PASS lub iteracja
```

---

## 6. INPUT i OUTPUT

### INPUT

| Element | Opis |
|---------|------|
| **Monolit codebase** | Istniejacy kod monolityczny (repo) |
| **Service boundaries** | Proponowane granice serwisow |
| **API contracts** | Oczekiwane interfejsy (OpenAPI draft) |
| **Tech constraints** | Ograniczenia (np. "must run on K8s") |
| **Migration strategy** | Strangler Fig / Big Bang / Parallel Run |

### OUTPUT

| Artefakt | Tworca |
|----------|--------|
| Dependency map monolitu | Analyst |
| Service DAG + deployment order | Planner |
| API contracts (final, OpenAPI/gRPC) | Planner + Integrator |
| Core services z bazami danych | Backend |
| Saga/CQRS business logic | Feature Dev |
| API Gateway + Service Mesh config | Integrator |
| BFF layer | Frontend |
| Security audit report | QA Security |
| Quality + contract test report | QA Quality |
| GO/NO-GO decision | QA Manager |

---

## 7. 4 Builderow — kto robi co

| Builder | Ekspertyza | Odpowiedzialnosc |
|---------|-----------|-----------------|
| **Backend** | Data modeling, domain services | DB schemas, migracje, health checks, event sourcing |
| **Feature Dev** | Business workflows | Saga orchestration, CQRS, validation rules, handlers |
| **Integrator** | Networking, mesh | API Gateway routing, service mesh, circuit breaker, tracing |
| **Frontend BFF** | API aggregation | BFF endpoints, GraphQL, response composition, caching |

Jeden builder robiacy wszystko = kontekst ~180K tokenow (poza optymalnym oknem).
4 builderow po ~40-50K = sweet spot. Kazdy dostaje TYLKO swoja czesc planu.

---

## 8. Triple QA — dlaczego 3 dla mikroserwisow?

Monolit ma JEDEN zestaw ryzyk. Mikroserwisy maja TRZY klasy:

**Klasa 1 — Security:** Kazdy nowy serwis = nowy endpoint = nowy wektor ataku.
N serwisow = N zestawow credentials. Komunikacja w sieci = przechwycenie.

**Klasa 2 — Quality:** Rozproszone transakcje = eventual consistency = nowe bugi.
N baz danych = N schematow migracji. Contract breaking = cascading failures.

**Klasa 3 — Integration (Manager):** Czy WSZYSTKIE serwisy komunikuja sie
poprawnie end-to-end? Czy API contracts sa spójne? Czy deployment order respected?

QA Manager NIE testuje — AGREGUJE i DECYDUJE. To meta-QA oszczedzajacy
cenny kontekst Opus Orkiestratora.

---

## 9. Analiza kosztow

| Agent | Model | Tokeny | Koszt |
|-------|-------|--------|-------|
| Orkiestrator | Opus | ~30-50K | $0.08-$0.15 |
| Analyst | Sonnet | ~25-40K | $0.02-$0.04 |
| Planner | Sonnet | ~25-40K | $0.02-$0.04 |
| Researcher | Sonnet | ~20-35K | $0.02-$0.03 |
| Backend | Sonnet | ~40-60K | $0.04-$0.06 |
| Feature Dev | Sonnet | ~35-55K | $0.03-$0.05 |
| Integrator | Sonnet | ~35-50K | $0.03-$0.05 |
| Frontend BFF | Sonnet | ~30-45K | $0.03-$0.04 |
| QA Security | Sonnet | ~25-35K | $0.02-$0.03 |
| QA Quality | Sonnet | ~25-35K | $0.02-$0.03 |
| QA Manager | Sonnet | ~20-30K | $0.02-$0.03 |
| **SUMA** | — | **~350-600K** | **$0.35-$0.90** |

### Porownanie z innymi presetami

| Preset | Agentow | Koszt | Czas |
|--------|---------|-------|------|
| Solo | 2 | $0.04-$0.15 | <30s |
| Quick Fix | 3 | $0.08-$0.20 | ~90s |
| Feature Sprint | 7 | $0.25-$0.70 | ~5min |
| **Microservices** | **11** | **$0.35-$0.90** | **~8-15min** |
| Full Gold Standard | 14 | $0.50-$2.00+ | ~10min |

**ROI:** $0.60 za 13 min vs ~30h recznej pracy zespolu = **138x zwrot**.

---

## 10. Use cases i anti-patterny

### Idealne use cases

| Use Case | Kontekst |
|----------|---------|
| Java/Spring monolit → Spring Boot services | Klasyczna dekompozycja |
| Django monolit → FastAPI services | Python decomposition |
| Legacy .NET → .NET Core services | Modernizacja |
| Database-first decomposition | Wydzielanie schematow per service |
| Event-driven migration | Wprowadzenie event sourcing/CQRS |

### Anti-patterny

**1. Distributed Monolith** — Rozdzieliles kod na serwisy, ale wszystkie
uzywaja jednej bazy i wywoluja sie synchronicznie. To monolit z opoznieniem
sieciowym. Planner wymusza database-per-service w DAG.

**2. Nano-services** — 47 serwisow z 12 domen. Kazdy ma 50 linii kodu.
Analyst identyfikuje bounded contexts (nie klasy), Planner grupuje funkcje.

**3. Missing Contract Tests** — Unit testy sa, contract testow brak. Serwis A
zmienia format, B oczekuje starego. QA Quality explicite sprawdza Pact testy.

**4. Shared Library Hell** — 5 serwisow wspoldzieli "common-utils". Zmiana
= redeploy WSZYSTKIEGO. Researcher rekomenduje minimalny shared code.

**5. Sync Chain of Death** — A→B→C→D synchronicznie. Latencja = suma,
failure = kaskada. Integrator konfiguruje circuit breakery, Feature Dev
implementuje saga pattern.

---

## 11. Scenariusze

### Scenariusz 1: E-commerce Django monolit (80K LOC)

**Faza 1:** Analyst: "6 bounded contexts, Orders-Payments coupling przez
wspolna tabele." Planner: "DAG: Auth→Users→Products→Payments→Orders→
Notifications. Strangler Fig. Payment first."

**Faza 2:** Researcher: "FastAPI, PostgreSQL per DB, Kafka async, Kong GW,
Istio mesh, Docker+K8s."

**Faza 3:** Backend: 6 FastAPI services. Feature Dev: Saga (Order→Payment).
Integrator: Kong+Istio+Jaeger. Frontend BFF: /api/v1 aggregated.

**Faza 4:** QA Security: "WARNING — hardcoded DB password w Payments."
QA Manager: "NO-GO → Backend fix → re-check → GO."
**Wynik:** 6 niezaleznych serwisow, 13 min, $0.60.

### Scenariusz 2: Java monolit z 120-tabelowa baza (150K LOC)

**Faza 1:** Analyst: "120 tabel, 8 schematow, 23 cross-schema JOINs."
Planner: "Database-first decomposition, 8 serwisow."

**Faza 2:** "Spring Boot 3, Debezium CDC, gRPC internal, Envoy mesh."

**Faza 3:** Backend: 8 Spring Boot services + Flyway. Feature Dev: Replace
23 JOINs with event-driven reads. Integrator: Envoy + Debezium CDC.

**Faza 4:** QA Manager: "GO. Coverage 87%. Zero hardcoded secrets."

---

## 12. Porownanie z innymi presetami

| Aspekt | Feature Sprint (7) | Microservices (11) | Full GS (14) |
|--------|-------------------|-------------------|---------------|
| Builderow | 2 | 4 | 5+ |
| QA | 1-2 | 3 (z Managerem) | 3+ |
| Fazy | 3 | 4 | 4-5 |
| Specjalizacja | Feature-focused | Decomposition | Universal |
| Koszt | $0.25-$0.70 | $0.35-$0.90 | $0.50-$2.00+ |

### Kiedy co uzywac?

| Sytuacja | Preset |
|----------|--------|
| Prosty CRUD | Solo / Quick Fix |
| Nowy feature | Feature Sprint |
| **Dekompozycja monolitu** | **Microservices** |
| **Database splitting** | **Microservices** |
| Pelny system od zera | Full Gold Standard |

### Eskalacja / deeskalacja

- Plan & Execute (4) → **Microservices (11)**: "dodaj serwis" staje sie "rozbij monolit"
- **Microservices (11)** → Feature Sprint (7): monolit rozbity, dodajemy feature
- **Microservices (11)** → Full Gold Standard (14): dekompozycja + redesign UI + DevOps

---

## 13. Quick Reference + Glossary

```
+================================================================+
|  MICROSERVICES — Monolith Decomposition                        |
|  Tier 4 ENTERPRISE | 11 agentow | 4 fazy | Triple QA          |
+================================================================+
|  Orkiestrator (Opus)     → Koordynacja 10 agentow              |
|  Analyst + Planner       → Faza 1: mapowanie + DAG             |
|  Researcher Tech         → Faza 2: tech stack                  |
|  Backend+Feature+Integr. → Faza 3: 4x parallel build           |
|  +Frontend BFF           →                                     |
|  QA Sec + Qual + Manager → Faza 4: Triple QA + GO/NO-GO       |
+================================================================+
|  350-600K tokenow | $0.35-$0.90 | 8-15 min                    |
|  Service Mesh | API Gateway | Konteneryzacja                   |
+================================================================+
```

### Glossary

| Termin | Definicja |
|--------|----------|
| **Bounded Context** | Granica logiczna domeny biznesowej (DDD) |
| **DAG** | Directed Acyclic Graph — graf skierowany bez cykli |
| **Service Mesh** | Infrastruktura komunikacji miedzyserwisoswej (Istio, Linkerd) |
| **API Gateway** | Centralny punkt wejscia do mikroserwisow (Kong, Ambassador) |
| **BFF** | Backend For Frontend — warstwa agregujaca dane dla UI |
| **Saga Pattern** | Transakcje rozproszone przez sekwencje lokalnych transakcji |
| **CQRS** | Command Query Responsibility Segregation |
| **Circuit Breaker** | Ochrona przed kaskadowymi awariami (Hystrix, Resilience4j) |
| **mTLS** | Mutual TLS — obustronny certyfikat service-to-service |
| **Strangler Fig** | Nowe serwisy stopniowo przejmuja ruch od monolitu |
| **Contract Test** | Weryfikacja zgodnosci API producent-konsument (Pact) |
| **CDC** | Change Data Capture — przechwytywanie zmian w bazie (Debezium) |
| **Database-per-Service** | Kazdy mikroserwis ma wlasna baze danych |
| **Distributed Monolith** | Anti-pattern: serwisy rozdzielone, ale scisle powiazane |

### Zrodla

- Sam Newman, "Building Microservices" (O'Reilly, 2nd Ed. 2021)
- Sam Newman, "Monolith to Microservices" (O'Reilly, 2019)
- Chris Richardson, "Microservices Patterns" (Manning, 2018)
- Eric Evans, "Domain-Driven Design" (Addison-Wesley, 2003)
- Ambassador Labs, "State of Microservices 2025"
- CNCF, "Service Mesh Interface Specification" (2024)
- Anthropic, "Claude Agent Architecture — Gold Standard 2026"

---

# PROMPT DO WIDEO

> Opisz wideo edukacyjne, ktore chcesz utworzyc.

```
Stworz 7-8 minutowe wideo edukacyjne o presecie MICROSERVICES z architektury
Gold Standard 2026 multi-agent AI.

MOTYW WIZUALNY:
- Kolor glowny: Orange (#F97316) — energia, transformacja, dekompozycja
- Kolor pomocniczy: Deep Navy (#0F172A) tlo
- Akcent: Teal (#14B8A6) dla polaczen i mesh
- Motyw graficzny: PUZZLE / MESH — monolit rozpadajacy sie na polaczone
  puzzle pieces, siatka mesh miedzy kawalkami
- Styl: tech-infographic z 3D puzzle animations
- Czcionka: bold geometric sans-serif (Space Grotesk / Inter)
- Separatory: pomaranczowe puzzle edges z glow effect

SEKCJA 1: HOOK — PROBLEM MONOLITU (0:00-0:45)
- Gigantyczny szary blok "500K LOC" powoli peka z pomaranczowym swiatlem
- "Jeden deploy. Wszystko albo nic."
- Blok eksploduje slow-motion na 11 puzzle pieces, kazdy leci na miejsce
  w hexagonal grid
- Tytul: "MICROSERVICES" bold #F97316 z mesh-pattern fill
- Badges: "Tier 4" | "11 Agentow" | "$0.35-$0.90"

SEKCJA 2: 11 AGENTOW REVEAL (0:45-2:30)
- Centralny hexagon: ORKIESTRATOR pulsujacy pomaranczowo
- Reveal w 4 grupach po fazach:
  FAZA 1 (amber): Analyst + Planner wylatuja z lewej
  FAZA 2 (teal): Researcher Tech z gory
  FAZA 3 (orange): 4 Builderow z prawej
  FAZA 4 (red): 3 QA z dolu
- Kazdy agent: hexagon card z nazwa, modelem, load bar
- Mesh linie lacza wszystkich przez Orkiestratora
- Counter: "1/11" → "11/11"

SEKCJA 3: MONOLITH DECOMPOSITION PATTERN (2:30-3:30)
- 4-fazowy pipeline animowany:
  [PLAN] ──→ [RESEARCH] ──→ [BUILD x4] ──→ [QA x3]
- Zoom Faza 1: Analyst (lupa nad kodem) + Planner (rysuje DAG)
- DAG animacja: wezly po kolei, strzalki rosna, topological sort
- Bar chart: 2 fazy (62% fail) vs 3 (35%) vs 4 (12%) — dramatyczny spadek

SEKCJA 4: PARALLEL BUILD (3:30-4:45)
- Split screen 4 czesci, kazda z innym akcentem:
  Backend (#F97316): DB schemas, domain services
  Feature (#EAB308): Saga, CQRS, business rules
  Integrator (#14B8A6): Gateway, mesh, tracing
  Frontend (#8B5CF6): BFF, GraphQL, composition
- Typewriter code w kazdym panelu, timer biegnie rownolegle
- Puzzle pieces z 4 builderow SKLADAJA SIE w jedno puzzle

SEKCJA 5: TRIPLE QA — GO/NO-GO (4:45-5:45)
- 3 terminale QA side-by-side:
  Security: "mTLS ok | Auth ok | Secrets HARDCODED!" — red flash
  Quality: "Coverage 84% ok | Contracts 12/12 ok"
  Manager: merge reports → waga → NO-GO → routing → fix → re-check → GO
- Pipeline zielony end-to-end, checkmark na kazdej fazie

SEKCJA 6: ANTI-PATTERNS (5:45-6:30)
- 5 kart carousel z puzzle motywem:
  Distributed Monolith: pieces polaczone lancuchami
  Nano-services: 47 malutkich puzzli, chaos
  Missing Contracts: 2 pieces nie pasuja
  Shared Library Hell: pieces na wspolnej plytce
  Sync Chain of Death: lancuch, domino fall
- Kazda karta: ZLE (red X) → DOBRZE (green check) flip

SEKCJA 7: POROWNANIE (6:30-7:15)
- Bar chart: Solo ($0.04) → ... → Microservices ($0.35-$0.90, podswietlony)
  → Full GS ($0.50-$2.00+)
- ROI kalkulator: "$0.60 / 13 min vs 30h = 138x ROI"
- Decision tree: monolit? → TAK → Microservices

SEKCJA 8: OUTRO (7:15-7:45)
- Szary monolit rozklada sie na kolorowe puzzle pieces
- Mesh lines lacza pieces — pulsujacy teal glow
- "Monolit to nie wyrok. To punkt wyjscia."
- CTA: "Poznaj Full Gold Standard — pelna orkiestra"

MUZYKA: Electronic progressive, 100-130 BPM, bass drop przy eksplozji
  monolitu, ambient przy DAG, upbeat przy parallel build, tension przy
  NO-GO, triumph przy GO
NARRATOR: Pewny, techniczny ale przystepny, pauzy przy anti-patternach,
  energetyczny przy build, autorytatywny przy GO/NO-GO
```

---

# PROMPT DO INFOGRAFIKI

> Opisz infografike, ktora chcesz utworzyc.

```
Stworz pionowa infografike (1080x3500px) o presecie MICROSERVICES
z architektury Gold Standard 2026 multi-agent AI.

STYL WIZUALNY:
- Tlo: ciemny grafit (#111827) z hexagonal mesh pattern (opacity 5%)
- Kolor glowny: Orange (#F97316)
- Akcent: Teal (#14B8A6) dla polaczen mesh
- Planowanie: Amber (#F59E0B)
- Tekst: bialy (#FFFFFF) i jasny szary (#D1D5DB)
- Pozytywny: zielony (#10B981) | Negatywny: czerwony (#EF4444)
- Font: bold geometric sans-serif (Space Grotesk / Inter)
- Motyw: PUZZLE MESH — hexagonal puzzles polaczone mesh liniami
- Separatory: pomaranczowa linia z mesh-node dots

SEKCJA 1: NAGLOWEK (300px)
- "MICROSERVICES" bold Orange z mesh-pattern fill i glow (blur 15px)
- Podtytul: "Dekompozycja Monolitu — 11 Agentow"
- Ikona: puzzle piece (100px) rozpadajacy sie na 4 mniejsze
- Badges: "Tier 4 ENTERPRISE" | "11 Agentow" | "4 Fazy" |
  "$0.35-$0.90" | "8-15 min" w pill shapes (#1E293B)

SEKCJA 2: MONOLIT → SERWISY (350px)
- Lewo: szary blok "MONOLIT" z lista modulow wewnatrz
- Strzalka: "── DECOMPOSE ──→" w pomaranczowym
- Prawo: 6 hexagonow polaczonych teal mesh liniami
- "500K LOC → 6 bounded contexts → 6 independent services"

SEKCJA 3: 11 AGENTOW — HEXAGONAL MAP (500px)
- Centralny hex: ORKIESTRATOR (orange border, glow)
- 4 grupy hexagonow (po fazie, kolorowe border):
  Amber: Analyst + Planner (FAZA 1)
  Teal: Researcher (FAZA 2)
  Orange: 4 Builderow (FAZA 3)
  Red: 3 QA (FAZA 4)
- Mesh linie od kazdego do Orkiestratora
- "11 Agentow | 10 Polaczen"

SEKCJA 4: PIPELINE (400px)
- Horizontal: [PLAN] → [RESEARCH] → [BUILD x4] → [QA x3]
- Timeline: "t=0 → t=2.5 → t=4.5 → t=9.0 → t=13min"
- "Faza 3 = 4 parallel strumienie (~$0.15-$0.30)"
- Feedback loop: NO-GO → routing do fazy naprawczej

SEKCJA 5: DAG (350px)
- Graf 6 serwisow z deployment order numerami
- Topological sort: Auth+Email→User+Payment→Order→Notification
- "Planner tworzy DAG — builderzy buduja w tej kolejnosci"

SEKCJA 6: 4 BUILDEROW (350px)
- Siatka 4 kolumn z kolorowym naglowkiem:
  Backend (#F97316): DB, services, health
  Feature (#F59E0B): Sagas, CQRS, rules
  Integrator (#14B8A6): Gateway, mesh, tracing
  Frontend (#8B5CF6): BFF, GraphQL, cache
- "4 x parallel = 4x szybciej"

SEKCJA 7: TRIPLE QA FLOW (300px)
- 3 karty: Security (shield) + Quality (check) → Manager (gavel)
- Decision diamond: GO (zielony) / NO-GO (czerwony)
- NO-GO → routing do buildera z "FIX REQUIRED"

SEKCJA 8: ANTI-PATTERNY (300px)
- Siatka 2x3 kart, kazda red border + czerwony X:
  Distributed Monolith | Nano-services | Missing Contracts |
  Shared Library Hell | Sync Chain of Death
- "Preset zapobiega KAZDEMU z tych anti-patternow"

SEKCJA 9: POROWNANIE (250px)
- Bar chart: Solo→Quick Fix→Trio→Feature Sprint→
  **Microservices (podswietlony)**→Full GS
- "ROI: $0.60 / 13 min vs 30h recznej pracy = 138x"

SEKCJA 10: SCENARIUSZ E-COMMERCE (250px)
- 5 paneli mini-story:
  Monolit → Analyst+Planner → 4 Builderow → NO-GO→GO → 6 hexagonow
- "Done: 13 min, $0.60, 6 niezaleznych serwisow"

SEKCJA 11: QUICK REFERENCE (200px)
- Box (#0F172A) z pomaranczowym border, 2 kolumny danych
- "Service Mesh | API Gateway | Konteneryzacja | Triple QA"

SEKCJA 12: STOPKA (100px)
- "Gold Standard 2026 | MICROSERVICES | Tier 4 ENTERPRISE"
- Puzzle mesh icon

DEKORACJE:
- Hexagonal mesh grid na tle (opacity 5%, #F97316)
- Mesh-node dots na separatorach
- Puzzle piece ikony jako numeracja: "01 //", "02 //", etc.
- Teal glow na liniach polaczen, orange glow na kluczowych elementach
```

---

*Dokument wygenerowany dla systemu Gold Standard 2026 Multi-Agent AI Architecture.*
*Preset: Microservices — Monolith Decomposition | Tier: 4 ENTERPRISE | Wzorzec: 4-Phase Pipeline + Parallel Build + Triple QA*
