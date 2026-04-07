# LEGACY REFACTOR -- Modernizacja Systemow Odziedziczonych

## Kompletny Przewodnik | Tier 4 ENTERPRISE | Gold Standard 2026

**Seria:** Architektura Agentow AI -- Presety i Konfiguracje
**Preset ID:** `legacy_refactor`
**Nazwa:** Legacy Refactor (Modernizacja Odziedziczona)
**Ikona:** 🏗️
**Tier:** 4 (ENTERPRISE)
**Liczba agentow:** 9
**Wzorzec:** Legacy Modernization Pipeline
**Koszt tokenowy:** ~250-420K | **Koszt dolarowy:** $0.25-$0.65
**Latencja:** ~300-600 sekund
**Data:** Kwiecien 2026

---

## 1. Wprowadzenie -- Najtrudniejsze zadanie w software

Wyobraz sobie remont domu -- ale NIE MOZESZ SIE WYPROWADZIC. Kazda sciana, ktora burzysz, musi byc natychmiast zastapiona nowa. Kazda rura, ktora wycinasz, wymaga tymczasowego bypassa, zeby woda nadal plynela. Musisz mieszkac w kurzu i chaosie -- a dom musi byc FUNKCJONALNY kazdego dnia.

To jest legacy refactoring. System dziala w produkcji PODCZAS modernizacji. Kazda zmiana musi byc kompatybilna wstecz. Kazda migracja musi miec rollback. Zero przestojow, zero regresji.

Druga analogia: wymiana silnika w samolocie podczas lotu. Pasazerowie (uzytkownicy) nie moga zauwazyc zmian. Trzecia: transplantacja trzech organow jednoczesnie -- trzy zespoly chirurgiczne (Backend, Frontend, Integrator) pracuja ROWNOCZESNIE, a przed operacja pelna diagnostyka (Research), po operacji dwa zespoly kontroli (Dual QA).

Dlatego Legacy Refactor wymaga DZIEWIECIU agentow. Nie dlatego, ze lubimy zlozonosc -- ale dlatego, ze refaktoryzacja dzialajacego systemu jest wielowymiarowo trudna.

> **Czy wiesz, ze...?**
> Programisci spedzaja srednia **42% czasu pracy** na legacy code (Stripe 2023). McKinsey szacuje globalny dlug techniczny na **3 biliony USD**. Legacy to nie egzotyczny problem -- to DOMYSLNY stan wiekszosci kodu produkcyjnego.

---

## 2. Sklad zespolu -- Dziewiatka modernizacyjna

### Orkiestrator (A-00) -- Opus | 30-50K tokenow | $0.04-0.08

**Rola:** STRATEGIA -- plan migracji, koordynacja faz, decyzje GO/NO-GO.
**Narzedzia:** Agent, TaskCreate, TaskUpdate, Read | **Zakaz:** Write, Edit, Bash, WebSearch

Tworzy Migration Plan, koordynuje trzy fazy (RESEARCH → BUILD → QA), zarzadza ryzykiem z rollback planami, decyduje GO/NO-GO miedzy fazami, scala wyniki Builderow i QA.

### Analyst (R-00) -- Sonnet | 25-40K tokenow | $0.03-0.06

**Rola:** ANALIZA -- mapowanie istniejacego kodu legacy.
**Narzedzia:** Read, Grep, Glob, Bash | **Zakaz:** Write, Edit, Agent, WebSearch

Mapuje zaleznosci (cykliczne, hotspoty, dead modules), wykonuje archeologe kodu (git blame, komentarze), produkuje raport stanu: "340 plikow, 12 cyklicznych zaleznosci, test coverage 23%."

### Researcher Tech (R-01) -- Haiku | 20-35K tokenow | $0.02-0.04

**Rola:** RESEARCH -- nowe technologie i wzorce migracji.
**Narzedzia:** WebSearch, WebFetch, Read, Grep, Glob | **Zakaz:** Write, Edit, Bash, Agent

Szuka targetowych technologii, porownuje sciezki migracji (3+ opcji z pros/cons), identyfikuje breaking changes, tworzy compatibility matrix.

### Researcher GitHub (R-02) -- Haiku | 20-35K tokenow | $0.02-0.04

**Rola:** RESEARCH -- prawdziwe migracje z GitHub (KLUCZOWY agent presetu).
**Narzedzia:** WebSearch, WebFetch, Read, Grep, Glob | **Zakaz:** Write, Edit, Bash, Agent

Wyszukuje REALNE migracje (PR-y, commity, changelogi), analizuje jak Shopify migrowalo Rails, jak Airbnb przeszlo na RTL. Identyfikuje pitfalls z Issues i post-mortemow, ekstrahuje sprawdzone strategie (Strangler Fig, Branch by Abstraction).

### Backend Dev (B-01) -- Sonnet | 35-60K tokenow | $0.05-0.10

**Rola:** BUILD -- restrukturyzacja backendu.
**Narzedzia:** Read, Write, Edit, Bash, Grep, Glob | **Zakaz:** Agent, WebSearch

Refaktoryzuje modele/controllery/serwisy, migruje baze danych (schemat, indeksy), aktualizuje API z wersjonowaniem, pisze testy backendu.

### Frontend Dev (B-02) -- Sonnet | 35-60K tokenow | $0.05-0.10

**Rola:** BUILD -- modernizacja frontendu.
**Narzedzia:** Read, Write, Edit, Bash, Grep, Glob | **Zakaz:** Agent, WebSearch

Migruje UI (jQuery/Backbone → React/Vue/Svelte), modernizuje state management, aktualizuje build pipeline (Gulp → Vite), pisze component testy i visual regression.

### Integrator (B-03) -- Sonnet | 30-50K tokenow | $0.04-0.08

**Rola:** BUILD -- mosty miedzy starym a nowym kodem (agent-most).
**Narzedzia:** Read, Write, Edit, Bash, Grep, Glob | **Zakaz:** Agent, WebSearch

Tworzy Adapter Pattern miedzy starym a nowym API, implementuje Feature Flags do przelaczania, buduje Data Bridge (synchronizacja schematow), realizuje Strangler Fig -- stopniowe oplatanie starego kodu nowym.

### QA Security (Q-01) -- Sonnet | 25-40K tokenow | $0.03-0.06

**Rola:** QA -- audyt bezpieczenstwa migracji.
**Narzedzia:** Read, Grep, Glob, Bash | **Zakaz:** Write, Edit, Agent, WebSearch

Skanuje luki (nowe zaleznosci, endpointy, surface area), audytuje autentykacje/autoryzacje, sprawdza CVE w nowych bibliotekach, produkuje raport critical/high/medium/low.

### QA Quality (Q-02) -- Sonnet | 25-40K tokenow | $0.03-0.06

**Rola:** QA -- jakosc kodu i regresje.
**Narzedzia:** Read, Grep, Glob, Bash | **Zakaz:** Write, Edit, Agent, WebSearch

Testuje regresje (stara funkcjonalnosc po migracji), audytuje code quality (linting, complexity, coverage delta), porownuje performance before/after, sprawdza compatibility z NIEzmigrowanymi modulami.

### Diagram architektury

```
                 ┌──────────────────┐
                 │   ORKIESTRATOR   │
                 │  (A-00, Opus)    │
                 └──┬──┬──┬──┬──┬──┘
        ┌───────────┤  │  │  │  ├───────────┐
        ↓           ↓  │  ↓  │  ↓           │
  ┌──────────┐ ┌────────┐ ┌────────┐        │
  │ ANALYST  │ │RESEARCH│ │RESEARCH│        │
  │ R-00     │ │TECH    │ │GITHUB  │        │
  │ Sonnet   │ │R-01    │ │R-02    │        │
  └────┬─────┘ └───┬────┘ └───┬────┘        │
       └──────┬────┴──────────┘              │
              ↓ BRAMA #1 GO/NO-GO            │
  ╔═══════════════════════════════════╗      │
  ║  ┌────────┐┌────────┐┌─────────┐ ║      │
  ║  │BACKEND ││FRONTEND││INTEGRAT.│ ║      │
  ║  │B-01    ││B-02    ││B-03     │ ║      │
  ║  └───┬────┘└───┬────┘└───┬─────┘ ║      │
  ╚══════╪════════╪═════════╪════════╝      │
         └────┬───┴─────────┘               │
              ↓ BRAMA #2 GO/FIX/ROLLBACK    │
  ╔═══════════════════════════════════╗      │
  ║  ┌───────────┐  ┌───────────┐    ║      │
  ║  │QA SECURITY│  │QA QUALITY │    ║      │
  ║  │Q-01       │  │Q-02       │    ║      │
  ║  └─────┬─────┘  └─────┬─────┘   ║      │
  ╚════════╪══════════════╪══════════╝      │
           └──────┬───────┘                 │
                  ↓ BRAMA #3 SHIP           │
           FINAL REPORT ←──────────────────┘
```

---

## 3. Workflow -- Research → Parallel Build → Parallel QA

### FAZA 1: RESEARCH (sekwencyjna, ~80-140K tokenow)

```
KROK 1: Orkiestrator → Migration Brief (scope, target, constraints)
KROK 2: Analyst → Codebase Map (dependency graph, hotspots, dead code, coverage)
KROK 3: Researcher Tech → Target Report (compatibility matrix, breaking changes)
KROK 4: Researcher GitHub → Real Migration Report (PR-y, post-mortemy, strategies)
KROK 5: Orkiestrator → BRAMA #1: GO / PIVOT / ABORT
```

Faza Research jest SEKWENCYJNA -- kazdy agent buduje na wynikach poprzedniego. Analyst musi zmapowac codebase ZANIM Researcherzy wiedza czego szukac. GitHub Researcher potrzebuje target technology od Tech Researchera, zeby szukac odpowiednich migracji.

### FAZA 2: BUILD (rownolegla, ~100-180K tokenow)

```
KROK 6: Orkiestrator → Migration Execution Plan (scope per builder)
KROK 7: ROWNOLEGLE:
   ├── Backend Dev: restrukturyzacja serwerowa
   ├── Frontend Dev: modernizacja UI
   └── Integrator: mosty, adaptery, feature flags
KROK 8: Orkiestrator → BRAMA #2: GO / FIX / ROLLBACK
```

### FAZA 3: QA (rownolegla, ~50-80K tokenow)

```
KROK 9: ROWNOLEGLE:
   ├── QA Security: audyt bezpieczenstwa
   └── QA Quality: testy regresji + performance
KROK 10: Orkiestrator → BRAMA #3: SHIP / FIX / ROLLBACK
KROK 11: Finalny raport migracyjny
```

Rownoleglosc Builderow skraca czas ~3x. Zamiast 900s sekwencyjnie, mamy ~300s na trzech rownolegle. Rownoleglosc QA oznacza, ze security i quality sa sprawdzane JEDNOCZESNIE -- nie trzeba wybierac.

---

## 4. INPUT: legacy codebase + migration target + constraints

```json
{
  "legacy_codebase": {
    "path": "/src", "language": "JavaScript (ES5) + jQuery 1.x",
    "framework": "Express 3.x + Backbone.js", "loc": "~45,000", "test_coverage": "12%"
  },
  "migration_target": {
    "backend": "Fastify 5.x", "frontend": "React 19", "build": "Vite 6.x"
  },
  "constraints": {
    "zero_downtime": true, "backward_compatible": true, "timeline": "incremental"
  }
}
```

Opcjonalnie: known pain points, previous migration attempts, compliance (GDPR/SOC2), external API dependencies.

---

## 5. OUTPUT: modernized code + migration guide + test results

1. **Migration Report** -- co bylo, co jest, co zrobiono, co zostalo
2. **Modernized Code** -- zrefaktoryzowany kod z adapterami i feature flags
3. **Migration Guide** -- instrukcja wdrozenia krok po kroku
4. **Test Results** -- regresje, security audit, performance benchmarki
5. **Rollback Plan** -- procedura cofniecia KAZDEJ zmiany
6. **Dependency Map** -- before/after graf zaleznosci

```
OUTPUT STRUCTURE:
├── migration-report.md           # raport z faz R→B→QA
├── migration-guide.md            # instrukcja wdrozenia
├── rollback-plan.md              # procedury cofania per modul
├── src/
│   ├── adapters/                 # mosty stary↔nowy (Integrator)
│   ├── backend/                  # zrefaktoryzowany backend
│   ├── frontend/                 # zmodernizowany frontend
│   └── feature-flags/            # system przelacznikow
├── tests/
│   ├── regression/               # QA Quality
│   ├── security/                 # QA Security
│   └── performance/              # benchmarki before/after
└── dependency-map.json           # graf zaleznosci
```

---

## 6. Dlaczego GitHub Researcher jest kluczowy

Researcher Tech przeszuka dokumentacje: "Migracja z jQuery do React wymaga zastapienia manipulacji DOM komponentami." Researcher GitHub przeszuka prawdziwe repozytoria: "Shopify migrowalo 200K linii w 18 miesiecy. Uzyli Strangler Fig. 3 najczestsze bledy: event bubbling, brak odpowiednikow pluginow, SEO regression."

| Aspekt | Researcher Tech | Researcher GitHub |
|--------|----------------|-------------------|
| Zrodlo | Dokumentacja, blogi | PR-y, commity, issues |
| Perspektywa | "Co jest mozliwe" | "Co naprawde zadzialo" |
| Ryzyko | "Moze byc trudne" | "Zabralo 3 miesiace dluzej" |
| Strategia | "Strangler Fig zalecany" | "Oto PR implementujacy Strangler Fig w 50K LOC" |

Zespoly korzystajace z wzorcow z istniejacych migracji konczyly projekty **35% szybciej** z **60% mniej critical bugow**.

---

## 7. Trzech Builderow rownolegle

**Backend Dev** -- restrukturyzuje fundamenty:
- PRZED: `routes.js` (1200 linii), `db.js` (surowy SQL), `app.js` (God Object)
- PO: `routes/` (per-domain), `models/` (ORM), `services/`, `middleware/`, czysty `app.js`

**Frontend Dev** -- modernizuje interfejs:
- PRZED: `jquery.min.js`, `backbone.min.js`, monolityczny `app.js` (2000 linii), jeden `styles.css`
- PO: `components/` (React), `hooks/`, `stores/`, CSS Modules, `vite.config.js`

**Integrator** -- buduje mosty (NAJWAZNIEJSZY dla zero-downtime):
- Feature Flags: przelaczanie stary/nowy kod per modul bez deploymentu
- Adapter Pattern: React komponent w jQuery kontenerze (i odwrotnie)
- Event Bridge: synchronizacja jQuery events ↔ React callbacks
- Data Bridge: translacja miedzy starym a nowym schematem danych
- Strangler Fig: stopniowe oplatanie starego kodu nowym, az stary obumrze

```
CZAS:   0s ──────── 100s ──────── 200s ──────── 300s
BACKEND ████████████████████████████████████████████ restructure
FRONTEND████████████████████████████████████████████ modernize
INTEGRAT████████████████████████████████████████████ bridge
```

Trzy domeny sa naturalnie podzielne. Kazdy Builder ma swoj scope. Integrator jest swiadomy pracy obu pozostalych i zapewnia kompatybilnosc.

---

## 8. Dual QA -- security lapie luki, quality lapie regresje

Migracja wprowadza DWA typy ryzyk jednoczesnie. Jeden QA musi wybierac. Dwa QA sprawdzaja OBA rownolegle.

**QA Security:** nowe zaleznosci (npm audit), CVE check, auth/authz po migracji, injection points, CORS/CSP, secrets exposure.
**QA Quality:** testy regresji, nowe testy (coverage >80%), performance before/after (tolerancja +10%), compatibility zmigrowane ↔ NIEzmigrowane.

Synergia: Security znajduje "endpoint bez auth", Quality znajduje "endpoint zwraca 3x wiecej danych". Razem = "nieautentykowany endpoint wystawia nadmierne dane" -- CRITICAL.

---

## 9. Analiza kosztow

| Agent | Model | Tokeny | Koszt |
|-------|-------|--------|-------|
| Orkiestrator | Opus | ~30-50K | $0.04-0.08 |
| Analyst | Sonnet | ~25-40K | $0.03-0.06 |
| Researcher Tech | Haiku | ~20-35K | $0.02-0.04 |
| Researcher GitHub | Haiku | ~20-35K | $0.02-0.04 |
| Backend Dev | Sonnet | ~35-60K | $0.05-0.10 |
| Frontend Dev | Sonnet | ~35-60K | $0.05-0.10 |
| Integrator | Sonnet | ~30-50K | $0.04-0.08 |
| QA Security | Sonnet | ~25-40K | $0.03-0.06 |
| QA Quality | Sonnet | ~25-40K | $0.03-0.06 |
| **TOTAL** | | **~250-420K** | **$0.25-0.65** |

Smart Model Routing: Opus 12% kosztu (strategia), Sonnet 80% (robota), Haiku 8% (research). ROI: 200-400% vs ad-hoc refactoring.

---

## 10. Przypadki uzycia

**Migracja frameworka (Rails 5 → 7):** Analyst mapuje Gemfile (12 gemow bez wsparcia), Researcher Tech znajduje guide, Researcher GitHub znajduje 8 repo z taka migracja + "ActiveStorage gotcha". Buildery aktualizuja, Integrator tworzy shims, QA weryfikuje. ~$0.50.

**Rozklad monolitu (5000-liniowy app.js):** Analyst identyfikuje 7 domen, GitHub Researcher potwierdza "modular monolith jako pierwszy krok" (90% case studies). Backend wydziela moduly, Frontend rozdziela bundles, Integrator tworzy event bus.

**API Versioning (v1 → v2):** Analyst mapuje 200 endpointow i konsumentow. Researcherzy znajduja wzorce z Stripe/Twilio/GitHub API. Integrator tworzy wartswe translacji v1↔v2. QA weryfikuje 100% kompatybilnosc wsteczna.

**Tech Debt Sprint:** Analyst priorytetyzuje 47 issues (impact/effort). Trzy Buildery naprawiaja top 15 (5 per builder) rownolegle. QA sprawdza zero regresji.

---

## 11. Anty-wzorce

**Big Bang Rewrite** -- "Przepiszemy wszystko od nowa." Netscape stracilo 3 lata i wiodaca pozycje. Nowy system ZAWSZE ma mniej edge case'ow niz stary. Legacy Refactor zapobiega: Integrator implementuje Strangler Fig, inkrementalne przejscie.

**Incomplete Migration** -- Polowa modulow zmigrowana, polowa nie, na wiecznosc. Dwa systemy do utrzymywania. Legacy Refactor zapobiega: Feature flags sleedza % migracji per modul, QA Quality weryfikuje kompatybilnosc.

**Untested Bridge** -- Adaptery istnieja, ale nikt nie testuje CZY dzialaja. Moga po cichu gubic dane lub tworzyc race conditions. Legacy Refactor zapobiega: QA Quality testuje adaptery (poprawnosc + performance), QA Security sprawdza bypasy auth.

**Migration Without Rollback** -- "Juz nie da sie wrocic." Kazdy krok w Migration Guide ma sekcje ROLLBACK. Feature flags pozwalaja wylaczac nowy kod na poziomie modulow.

**Ignoring Research Phase** -- "Wiemy co robic." Orkiestrator wymusza bramke GO/NO-GO. Bez raportu Analyst + 2 Researcherow -- Buildery NIE startuja.

---

## 12. Scenariusz: jQuery → React (frontend focus)

```
WEJSCIE: "jQuery 1.12, 150 plikow JS. Chcemy React 19."

Analyst → "87 pluginow, 23 Backbone views, 40 utils. 12 pluginow bez React odpowiednika."
Researcher Tech → "3 strategie: full rewrite, gradual, iframe."
Researcher GitHub → "14 repo jQuery→React. 78% uzylo gradual + jquery-react-bridge (2.3K stars)."
BRAMA #1: GO (gradual migration)

Backend Dev → API adaptery (REST → React-friendly JSON)
Frontend Dev → migruje top 20 komponentow jQuery → React
Integrator → jquery-react-bridge + feature flags
BRAMA #2: GO

QA Security → "Nowy CSP header potrzebny. 2 XSS vectors zamkniete."
QA Quality → "18/20 komponentow OK. 2 regression IE11 (accepted)."
BRAMA #3: SHIP

OUTPUT: 20 zmigrowanych komponentow + bridge + testy
KOSZT: ~320K tokenow, $0.45 | CZAS: ~420 sekund
```

---

## 13. Porownanie: Legacy 9 vs Feature Sprint 8 vs Plan&Execute 4

| Aspekt | Legacy Refactor (9) | Feature Sprint (8) | Plan & Execute (4) |
|--------|--------------------|--------------------|---------------------|
| **Focus** | Modernizacja istniejacego | Budowa nowego | Planowanie + wykonanie |
| **Fazy** | R(4) → B(3) → QA(2) | R(2) → B(3) → QA(2) | Plan(2) → Exec(2) |
| **Researcherow** | 2 (Tech + GitHub) | 1 (Tech) | 1 |
| **Unikat** | GitHub Researcher + Integrator | Designer | Faza planowania |
| **Tokeny** | ~250-420K | ~200-350K | ~100-180K |
| **Koszt** | $0.25-0.65 | $0.20-0.55 | $0.10-0.30 |

**Kluczowa roznica:** Feature Sprint DODAJE cos nowego. Legacy Refactor ZMIENIA to, co istnieje. Feature Sprint ma Designera (nowy UI). Legacy Refactor ma Integratora (most stary↔nowy) i GitHub Researchera (dowody ze swiata realnego).

---

## 14. Quick Reference + Glossary + Zrodla

```
╔════════════════════════════════════════════════════════════╗
║  🏗️ LEGACY REFACTOR | Tier 4 ENTERPRISE | 9 agentow      ║
╠════════════════════════════════════════════════════════════╣
║  Wzorzec: Research(4) → Parallel Build(3) → Parallel QA(2)║
║  Tokeny: ~250-420K | Koszt: $0.25-0.65 | Czas: 300-600s  ║
║  Bramy: 3x GO/NO-GO | Rollback: na kazdym kroku          ║
║  Zasada: Nigdy Big Bang. Zawsze inkrementalnie.           ║
╚════════════════════════════════════════════════════════════╝
```

| Termin | Definicja |
|--------|-----------|
| **Legacy code** | Kod odziedziczony -- dzialajacy w produkcji, trudny do zmiany, slabo przetestowany |
| **Strangler Fig** | Nowy kod "oplata" stary jak fikus dusiciel, az stary obumiera naturalnie |
| **Branch by Abstraction** | Warstwa abstrakcji nad starym kodem, nowy kod za abstrakcja, przelaczenie |
| **Feature Flag** | Przelacznik wl./wyl. funkcjonalnosci bez deploymentu -- kluczowy w migracji |
| **Tech Debt** | Skumulowane skroty i hacki wymagajace splaty |
| **Zero-downtime migration** | Migracja bez przerwy -- uzytkownicy nie zauwazaja zmiany |
| **Rollback** | Procedura cofniecia zmiany -- plan B kazdej migracji |

**Zrodla:** Stripe Developer Survey 2023 (42% legacy time) | McKinsey Tech Debt Report (3 bln USD) | Anthropic Model Pricing 2026 | Martin Fowler: Strangler Fig Application | Sam Newman: Monolith to Microservices | OWASP Migration Security Checklist | Gold Standard Agent Architecture 2026

---

## PROMPT DO PREZENTACJI WIDEO

> Opisz prezentacje, ktora chcesz utworzyc.

Stworz 6-8 minutowa prezentacje wideo o presecie **Legacy Refactor** (Modernizacja Systemow Odziedziczonych) z systemu architektur wieloagentowych AI. Prezentacja powinna byc edukacyjna, wizualnie bogata i prowadzic widza od zrozumienia problemu legacy code do pelnego opanowania 9-agentowej architektury modernizacyjnej.

### Struktura prezentacji:

**[0:00-0:40] HOOK -- Remont domu bez przeprowadzki**
Ekran: Animacja domu w przekroju. Na parterze rodzina oglada TV. Na pietrze robotnicy burza sciane. Kurz spada na kanape. Tekst glitch: "42% czasu developera = legacy code". Pytanie retoryczne: "Jak zrefaktoryzowac system, ktory NIE MOZE przestac dzialac?" Szybki montaz: stary kod jQuery, stare terminale, migajace servery -- transformacja w nowoczesny stack z plynna animacja morphing. Paleta: amber (#F59E0B) na warm dark (#1C1917).

**[0:40-1:40] PROBLEM -- Dlaczego legacy refactoring jest tak trudny**
Trzy animowane scenki (po 20s kazda):
1. Wymiana silnika w samolocie podczas lotu -- samolot leci, mechanicy wymieniaja czesci, pasazerowie nie zauwazaja. Tekst: "Zero downtime migration".
2. Transplantacja trzech organow jednoczesnie -- trzy zespoly chirurgow, jeden pacjent, monitory zycia. Tekst: "3 Buildery rownolegle".
3. Saper rozbraja bombe -- kazdy przewod moze byc tym zlym, kazda zmiana moze zepsuc produkcje. Tekst: "Dual QA weryfikacja".
Statystyka: "3 biliony USD globalnego dlugu technicznego (McKinsey)" -- liczba animuje sie od 0 z efektem slotmaszyny. Tlo: ciemna budowa, ostrzegawcze tasmy amber/black.

**[1:40-3:00] ARCHITEKTURA 9 AGENTOW -- Budowanie diagramu**
Animacja budowania diagramu krok po kroku na ciemnym tle z amber liniami:
1. Pojawia sie Orkiestrator (centralny wezel, bursztynowy, pulsujacy) -- "Mozg operacji"
2. Pojawiaja sie 4 agenty Research phase (po lewej): Analyst (fioletowy, skanowanie kodu), Researcher Tech (niebieski, wyszukiwarka), Researcher GitHub (zielony, scrollowanie PR-ow). Polaczenia animuja sie jako swietlne linie.
3. BRAMA #1 -- animacja semafora GO/NO-GO, zielone swiatlo zapala sie
4. Pojawiaja sie 3 Buildery (srodek, rownolegle): Backend Dev (pomaranczowy, refaktoryzacja), Frontend Dev (rozowy, modernizacja UI), Integrator (zolty, budowanie mostow). Trzy paski postepu rownolegle zapelniaja sie jednoczesnie.
5. BRAMA #2 -- zielone swiatlo
6. Pojawiaja sie 2 QA (po prawej): QA Security (czerwona tarcza, skanowanie vulnerabilities), QA Quality (niebieski checkmark, uruchamianie testow)
7. BRAMA #3 -- SHIP! Confetti animation w kolorze amber.

**[3:00-4:30] KLUCZOWY AGENT -- GitHub Researcher**
Ekran podzielony na dwa:
- LEWA: "Researcher Tech" -- czyta dokumentacje, output: "Migracja jQuery→React jest mozliwa". Tekst: TEORIA. Niebieski motyw.
- PRAWA: "Researcher GitHub" -- przeszukuje PR-y, output: "Shopify zrobilo to w 18 miesiecy. Oto ich pitfalls. Oto ich adapter." Tekst: DOWODY. Zielony motyw.
Animacja: tekst TEORIA blednie, tekst DOWODY rosnie i swieci amber. Strzalka: "35% szybciej z real-world patterns". Tabela porownawcza: Zrodlo, Perspektywa, Ryzyko, Strategia -- dla obu Researcherow. Statystyka: "14 repozytoriow → 3 proven strategies → 1 rekomendacja"

**[4:30-5:30] 3 BUILDERY ROWNOLEGLE -- Wizualizacja podzialu pracy**
Ekran podzielony na 3 kolumny (jak monitory w centrum dowodzenia):
- LEWA: Backend Dev -- God Object rozpada sie na 6 modulow (animacja explode → organize)
- SRODEK: Frontend Dev -- jQuery UI dissolves, React UI materializes (morphing animation)
- PRAWA: Integrator -- swietlne mosty rosna miedzy lewa a prawa strona, feature flags wlaczaja sie jeden po drugim
Timer na gorze: "300s" odlicza. Trzy amber progress bary rosna rownolegle. Merge animation na koncu -- trzy strumienie laczal sie w jeden zloty potok.

**[5:30-6:30] DUAL QA -- Dwie perspektywy**
Ekran: Jeden modul kodu po srodku. Dwa "promienie" skanuja go z dwoch stron:
- LEWY promien (czerwony, QA Security): "Znaleziono: nowy endpoint bez auth, 2 CVE w zaleznosach"
- PRAWY promien (niebieski, QA Quality): "Znaleziono: regression w module platnosci, latency +5%"
Overlay: oba findings laicza sie w srodku: "Nieautentykowany endpoint + nadmierne dane = CRITICAL"
Komunikat na amber tle: "Jeden QA znalazlby polowe. Dwa QA znajduja WSZYSTKO."

**[6:30-7:20] SCENARIUSZ LIVE -- jQuery → React w 420 sekund**
Speed-run animowany: User request → Analyst skanuje (87 pluginow, 23 views) → Researcher Tech (3 strategie) → Researcher GitHub (14 repo, top pattern: gradual + bridge) → BRAMA GO (semafor) → 3 Buildery rownolegle (trzy progress bary) → BRAMA GO → 2 QA (Security: OK shield, Quality: 18/20 checkmarks) → BRAMA SHIP → "Koszt: $0.45 | Czas: 420s | 20 komponentow zmigrowanych". Animacja before/after kodu -- jQuery dissolves w amber particles, React materializes z zielonymi particles.

**[7:20-8:00] ZAMKNIECIE -- Anti-patterns i CTA**
Szybka galeria 5 anty-patternow jako "wanted posters" z czerwonymi X na amber tle:
1. Big Bang Rewrite -- "Netscape stracilo 3 lata"
2. Incomplete Migration -- "Polowa-polowa na wiecznosc"
3. Untested Bridge -- "Adapter po cichu gubi dane"
4. No Rollback -- "Juz nie da sie wrocic"
5. Skip Research -- "Wiemy co robic (narrator: nie wiedzieli)"
Finalny ekran (amber gradient): "Nie przepisuj od nowa. Nie migruj na slepo. Modernizuj INKREMENTALNIE."
Ikony: 🔍 Research → 🏗️ Build → ✅ QA → 🚀 Ship
Call to action: "Nastepnym razem gdy legacy code cie przytlacza -- odpal Legacy Refactor."

### Styl wizualny:
- **Paleta glowna:** Amber (#F59E0B) jako kolor przewodni na ciemnym tle (#1C1917 -- warm dark)
- **Akcenty:** Orange (#F97316) dla builderow, Red (#EF4444) dla zagrozen, Green (#10B981) dla sukcesu, Blue (#3B82F6) dla researchu, Purple (#8B5CF6) dla analyst
- **Motyw graficzny:** Budowa/renowacja -- rusztowania, dzwigi, plany architektoniczne, helmety, ostrzegawcze tasmy amber/black. Transformacja starego w nowe jako leitmotiv.
- **Ikony agentow:** Orkiestrator=kompas, Analyst=lupa+kod, Researcher Tech=dokumentacja, Researcher GitHub=octocat+lupa, Backend=serwer, Frontend=monitor, Integrator=most, QA Security=tarcza, QA Quality=checkmark
- **Animacje:** Morphing (stary kod → nowy kod), parallel progress bars, flow particles na polaczeniach, budowanie diagramu wezel-po-wezle, confetti na SHIP, dissolve/materialize transitions
- **Typografia:** Nowoczesny sans-serif (Inter lub similar), duze naglowki, monospace dla kodu
- **Muzyka:** Industrialna ale elegancka -- dzwieki budowy przetworzone elektronicznie. Narastajaca podczas Research. Energetyczna podczas parallel Build. Triumfalna podczas QA pass. Epiczna na SHIP.
- **Tempo:** Dynamiczne w architektura/buildery, wolniejsze w scenariuszu. Kazdy slajd 5-15s. Efekt "centrum dowodzenia".
- **Branding:** "Agent Architecture Designer 2026 | Gold Standard" w rogu. "Legacy Refactor | Tier 4 ENTERPRISE" jako watermark.

---

## PROMPT DO INFOGRAFIKI

> Opisz infografike, ktora chcesz utworzyc.

Stworz pionowa infografike (1080x3500px) o presecie **Legacy Refactor** (Modernizacja Systemow Odziedziczonych) z systemu architektur wieloagentowych AI. Infografika powinna byc czytelna, logicznie zorganizowana, wizualnie bogata i prowadzic czytelnika od problemu legacy code do pelnego zrozumienia 9-agentowej architektury.

### Struktura infografiki (od gory do dolu):

**[NAGLOWEK -- 1080x300px]**
Tytul: "LEGACY REFACTOR -- Modernizacja Systemow Odziedziczonych" w duzym, boldnym foncie (36-42px). Ikona rusztowania 🏗️ po lewej. Podtytul: "Tier 4 ENTERPRISE | 9 Agentow | Legacy Modernization Pipeline". Tlo: gradient od warm dark (#1C1917) do stone (#292524). Dekoracja: subtelne linie blueprintu architektonicznego, ostrzegawcza tasma amber/black jako gorny border. Badge: "42% czasu developera = legacy code (Stripe 2023)".

**[SEKCJA 1: PROBLEM -- 1080x300px]**
Tytul: "Dlaczego Legacy Refactoring Jest Najtrudniejszy". Trzy ikony w rzedzie:
- Dom w remoncie z rodzina w srodku: "Remont bez przeprowadzki"
- Samolot z mechanikami: "Wymiana silnika w locie"
- Chirurdzy przy stole: "Transplantacja trzech organow"
Wielki napis: "3 BILIONY USD globalnego dlugu technicznego". Strzalka amber w dol.

**[SEKCJA 2: 9 AGENTOW -- 1080x600px]**
Tytul: "Dziewiatka Modernizacyjna". Trzy rzedy = trzy fazy:
- RZAD 1 (RESEARCH): Orkiestrator (amber border, kompas, "Opus | 30-50K"), Analyst (fioletowy, lupa+kod, "Sonnet | 25-40K"), Researcher Tech (niebieski, dokumentacja, "Haiku | 20-35K"), Researcher GitHub (zielony, octocat, "Haiku | 20-35K")
- RZAD 2 (BUILD): Backend Dev (pomaranczowy, serwer, "Sonnet | 35-60K"), Frontend Dev (rozowy, monitor, "Sonnet | 35-60K"), Integrator (zolty, most, "Sonnet | 30-50K")
- RZAD 3 (QA): QA Security (czerwony, tarcza, "Sonnet | 25-40K"), QA Quality (granatowy, checkmark, "Sonnet | 25-40K")
Strzalki miedzy rzedami z etykietami faz. Bramki GO/NO-GO jako sygnalizatory swietlne.

**[SEKCJA 3: FLOW DIAGRAM -- 1080x450px]**
Tytul: "Pipeline Modernizacji". Pionowy timeline 12 krokow:
1. User Request → 2. Migration Brief → 3. Codebase Mapping → 4. Target Technologies → 5. Real Migration Patterns → 6. BRAMA #1 GO/NO-GO → 7. PARALLEL: Backend+Frontend+Integrator (3 paski) → 8. BRAMA #2 → 9. PARALLEL: Security+Quality (2 paski) → 10. BRAMA #3 → 11. Final Report → 12. "$0.25-0.65 | 300-600s"

**[SEKCJA 4: GITHUB RESEARCHER SPOTLIGHT -- 1080x350px]**
Tytul: "Kluczowy Agent: GitHub Researcher". Podwojny ekran:
- LEWA (niebieski): "Researcher Tech" → "Migracja jest MOZLIWA" → etykieta TEORIA
- PRAWA (zielony): "Researcher GitHub" → "Oto JAK to zrobiono" → etykieta DOWODY
Tabela 4 rzedy: Zrodlo, Perspektywa, Ryzyko, Strategia. Badge: "35% szybciej, 60% mniej bugow z real-world patterns"

**[SEKCJA 5: 3 BUILDERY -- 1080x350px]**
Tytul: "Trojka Budowlana -- Rownolegle Domeny". Trzy kolumny:
- Backend Dev: before (God Object 1200 linii) → after (6 modulow). "RESTRUCTURE"
- Frontend Dev: before (jQuery spaghetti) → after (React components). "MODERNIZE"
- Integrator: most laczacy obie strony, feature flags, adaptery. "BRIDGE"
Timer: "~300s" z trzema rownoleglymi amber progress barami.

**[SEKCJA 6: DUAL QA -- 1080x250px]**
Tytul: "Podwojna QA". Dwa promienie skanujace jeden modul kodu:
- QA Security (czerwony): CVE, auth, injection, secrets
- QA Quality (niebieski): regression, performance, coverage, compatibility
Overlap: "Jeden QA = 50%. Dwa QA = 100%."

**[SEKCJA 7: ANTY-WZORCE -- 1080x300px]**
Tytul: "5 Smiertelnych Bledow Migracji". Lista z czerwonymi X:
1. ❌ Big Bang Rewrite -- "Netscape stracilo 3 lata i pozycje lidera"
2. ❌ Incomplete Migration -- "Polowa zmigrowana na wiecznosc"
3. ❌ Untested Bridge -- "Adapter po cichu gubi dane"
4. ❌ No Rollback Plan -- "Juz nie da sie wrocic"
5. ❌ Skip Research -- "Wiemy co robic (narrator: nie wiedzieli)"

**[SEKCJA 8: USE CASES -- 1080x250px]**
Cztery kolorowe badge: Amber "Migracja frameworka" (Rails 5→7) | Orange "Rozklad monolitu" | Blue "API Versioning" (v1→v2) | Green "Tech Debt Sprint"

**[SEKCJA 9: POROWNANIE -- 1080x250px]**
Tabela Legacy 9 vs Feature Sprint 8 vs Plan&Execute 4. Kolumny: Agentow, Research, Build, QA, Koszt. Legacy podswietlony amber. Strzalka: "Legacy = ZMIENIASZ. Feature = DODAJESZ."

**[SEKCJA 10: QUICK REFERENCE -- 1080x200px]**
Amber box: Wzorzec: R(4)→B(3)→QA(2) | Agentow: 9 (1 Opus + 6 Sonnet + 2 Haiku) | Tokeny: ~250-420K | Koszt: $0.25-0.65 | Czas: 300-600s | Bramy: 3x GO/NO-GO | Zasada: "Nigdy Big Bang. Zawsze inkrementalnie. Zawsze z rollbackiem."

**[STOPKA -- 1080x100px]**
"Agent Architecture Designer 2026 | Gold Standard Architecture | Legacy Refactor Tier 4 ENTERPRISE"

### Styl wizualny:
- **Paleta:** Amber (#F59E0B) przewodni, warm dark (#1C1917) tlo, stone (#292524) sekcje
- **Akcenty:** Orange (#F97316) buildery, Red (#EF4444) security/zagrozenia, Green (#10B981) sukces/GitHub, Blue (#3B82F6) research/quality, Purple (#8B5CF6) analyst
- **Typografia:** Sans-serif, H1 36-42px bold, H2 24px semibold, body 14px regular, mono dla kodu/liczb
- **Ikony:** Outline style, budowlane/industrialne (rusztowanie, dzwig, helm, most, tarcza)
- **Styl:** Flat design, subtele cienie, zaokraglone rogi 8-12px, amber glowing borders
- **Motyw:** Budowa/renowacja -- blueprint lines, construction tape amber/black, transformation arrows, before→after
- **Separatory:** Amber/black construction tape pattern miedzy sekcjami
- **Contrast:** Bialy (#FFFFFF) i amber (#F59E0B) na ciemnym tle. Ciemny (#1C1917) na jasnych kartach.

---

*Dokument opracowany na podstawie Gold Standard Agent Architecture 2026, MASTERCLASS Agent Teams, AGENT_TEAMS_CONFIGURATOR v8/v9/v12 oraz analiz legacy migration patterns z GitHub. Dane kosztowe aktualne na kwiecien 2026.*