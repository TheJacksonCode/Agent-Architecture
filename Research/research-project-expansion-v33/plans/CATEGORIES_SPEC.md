# CATEGORIES_SPEC - kategoryzacja wizualna presetow (1C)

> Wersja 1 do oceny przez Macieja. 8 kategorii use-case, kazdy preset przypisany do JEDNEJ kategorii glownej.
> Kategoria WIZUALNA (dla czlowieka przegladajacego) - NIE miesza sie z routingiem (description w skillach).
> Kolory kategorii sa NIEZALEZNE od istniejacych per-preset kolorow ikon (te zostaja).

## 8 kategorii (id, label PL, label EN, emoji, kolor sugerowany dark/light)

| id | PL | EN | emoji | kolor dark | kolor light |
|----|----|----|-------|-----------|-------------|
| research | Research i analiza | Research & Analysis | 🔍 | #38BDF8 | #0284C7 |
| build | Budowa i feature | Build & Feature | 🔨 | #34D399 | #059669 |
| quality | Jakosc i bezpieczenstwo | Quality & Security | ✅ | #F87171 | #DC2626 |
| content | Tresc i pisanie | Content & Writing | ✍️ | #FCD34D | #A16207 |
| strategy | Strategia i decyzje | Strategy & Decisions | 🧠 | #FBBF24 | #B45309 |
| ops | Ops i migracje | Ops & Migration | ⚙️ | #94A3B8 | #64748B |
| data | Dane i analityka | Data & Analytics | 📊 | #A78BFA | #7C3AED |
| design | Design i UI | Design & UI | 🎨 | #F472B6 | #DB2777 |

## Przypisanie 45 presetow (42 w HTML + 3 nowe v33)

**research (5):** recon, research, deep_research_swarm_pro, deep_research_v2 (nowy), kb_constructor
**build (15):** solo, quick_fix, trio, plan_exec, feature_sprint, standard, startup, saas, microservices, api_modern, full, deep, fullstack_premium, cascade, prd_to_launch
**quality (8):** bug_hunt, test_suite, review, reflect, security, security_multi_vector, perf_boost, perf_squad
**content (3):** content, tech_writing_pipe, voice (nowy)
**strategy (4):** five_minds, five_minds_strategic, deep_five_minds, ab_test_lab
**ops (4):** incident_war_room, migration_crew, legacy, soc2_sweep
**data (2):** data_pipe, data_analysis_pipe
**design (4):** design_sys, ui_overhaul, a11y, bento_redesign (nowy)

## Przypadki dyskusyjne (do decyzji Macieja)
- `prd_to_launch` -> dalem w build, ale ma silny komponent strategy/GTM. Alternatywa: strategy.
- `cascade` -> build, ale to bardziej "tryb optymalizacji kosztu" niz kategoria zadania. Moze zaslugiwac na osobny tag/wymiar (koszt), nie kategorie.
- `kb_constructor` -> research, ale buduje tez tresc (baza wiedzy). Alternatywa: content.
- `deep` -> build (research+build), ale mozna argumentowac research.
- `reflect` -> quality (kod+review), ale to tez maly build. 
- build ma 15 pozycji (najwiecej) - odzwierciedla dev-centryczna biblioteke. Przy 2. wymiarze (rozmiar/koszt) mozna to dodatkowo rozbic w pozniejszej iteracji.

## Jak zaimplementowac (v33 HTML, po akceptacji wzorca)
- Dodac obiekt JS `PRESET_CATEGORIES = { preset_id: 'category_id', ... }` obok PRESET_COLORS_*.
- Dodac `CATEGORY_META = { id: {pl, en, emoji, colorDark, colorLight}, ... }`.
- Przy renderze kafelka presetu dodac maly chip kategorii (emoji + label + kolorowa kropka/tlo).
- W headerze rzad chipow-filtrow (toggle), czysty JS filtruje widoczne presety wg aktywnych kategorii.
- Podwojne kodowanie kolor + tekst (emoji + label), nigdy sam kolor (dostepnosc).
- Zero nowych zaleznosci, zero zmiany layoutu poza dodaniem paska filtrow i chipow.
