# REVIEW CHECKLIST - v33 (do sprawdzenia punkt po punkcie)

> Cel: po fazie szybkiej produkcji przejsc przez KAZDA rzecz stworzona w sesji 2026-08-29/30
> i doprowadzic do tip-top. Zaznaczaj [x] gdy sprawdzone i OK. [!] gdy wymaga poprawki (opisz obok).
> Legenda: [ ] do sprawdzenia | [x] sprawdzone OK | [!] znaleziony problem do poprawy
>
> Kolejnosc rekomendowana: A (walidacja techniczna) -> B (encyklopedia wizualnie w przegladarce)
> -> C (tresc agentow) -> D (warstwa operacyjna) -> E (dlugi/niespojnosci) -> F (pozostale do zrobienia).

---

## A. WALIDACJA TECHNICZNA HTML (v33/AGENT_TEAMS_CONFIGURATOR_v33.html)

- [ ] A1. Parse JS 0 bledow: `cd v33 && node <scratchpad>/checkjs.js` (juz przechodzi, potwierdzic finalnie)
- [ ] A2. AD ma 45 agentow (35 starych + 10 nowych) - `grep -cE "^\{cat:'[^']+',id:'"`
- [ ] A3. Kazdy z 10 nowych agentow ma komplet 21 struktur (11 PL + 10 EN) - brak sierot
- [ ] A4. Brak zdublowanych kluczy w AGENT_EDU_PL / I18N_EN.eduAgent
- [ ] A5. Wszystkie ID nowych agentow spojne wszedzie (AD.id == klucze w EDU/KNOWLEDGE/kolory/ikony)
- [ ] A6. AGENT_SVG ma wpis dla kazdego nowego agenta (inaczej pusta ikona)
- [ ] A7. Kolory light+dark dla kazdego nowego agenta (brak = domyslny/zlamany render)

## B. ENCYKLOPEDIA - PRZEGLAD WIZUALNY W PRZEGLADARCE (kazdy agent osobno)

Dla KAZDEGO z 10 agentow otworzyc wpis w PL i EN i sprawdzic:
- [ ] B1. voice_writer (Pisarz w Twoim Glosie) - bento renderuje sie, 10 sekcji, stat Effort widoczny, PL+EN
- [ ] B2. style_profiler (Profiler Glosu)
- [ ] B3. voice_qa (Straznik Glosu)
- [ ] B4. social_strategist (Strateg Tresci Social)
- [ ] B5. career_document_builder (Architekt Dokumentow Kariery)
- [ ] B6. interview_coach (Trener Rozmow)
- [ ] B7. recipe_scout (Zwiadowca Przepisow)
- [ ] B8. taste_recommender (Doradca Smaku)
- [ ] B9. recipe_filter (Filtr Kuchenny)
- [ ] B10. decision_advisor (Doradca Decyzyjny)
- [ ] B11. Ikony SVG kazdego agenta wygladaja sensownie (nie pusty/polamany ksztalt)
- [ ] B12. Kolory rodzin spojne: voice/content=fiolet, kariera=cyan, kuchmistrz=amber, decyzja=niebieski
- [ ] B13. Przelacznik PL/EN dziala na wszystkich nowych wpisach (pelny parytet)
- [ ] B14. Linki relatedAgents klikalne i prowadza do istniejacych agentow
- [ ] B15. Nowe agenty pojawiaja sie poprawnie w grafie/kartach (nie psuja layoutu przy 45 agentach)

## C. TRESC AGENTOW - JAKOSC MERYTORYCZNA I JEZYKOWA

- [ ] C1. Zero em-dashy/en-dashy w calym nowym tekscie (tylko zwykle myslniki) - grep sprawdzic
- [ ] C2. Literowki PL - szczegolna uwaga: interview_coach analogia ("moze przyjsc" - bylo poprawiane)
- [ ] C3. Spojnosc nazw agentow miedzy PL i EN (np. Doradca Smaku = Taste Advisor wszedzie tak samo)
- [ ] C4. realExample kazdego agenta jest wiarygodny i konkretny (nie generyczny)
- [ ] C5. Staty (load, tokeny, model, effort) sensowne i spojne z plikiem skilla
- [ ] C6. doesNotDo poprawnie odsyla do wlasciwych agentow (np. "to Doradca Smaku")
- [ ] C7. Tlumaczenia EN naturalne, nie kalka z PL (przejrzec eduAgent EN kazdego)
- [ ] C8. Glossary terminy trafne, definicje poprawne

## D. WARSTWA OPERACYJNA (skills + commands + katalog)

Skills (~/.claude/skills/):
- [ ] D1. 10 nowych skilli - format zgodny z writer.md (ROLE..REPORT FORMAT), frontmatter komplet
- [ ] D2. Pole effort w 47 skillach - rozklad 24 high/10 low/6 medium/7 xhigh, mapowanie sensowne
- [ ] D3. Czy mapowanie effort per agent faktycznie pasuje (przejrzec brzegowe: res_critic=medium? style_profiler=medium?)

Commands (~/.claude/commands/):
- [ ] D4. 5 nowych presetow (voice, content-social, kariera, kuchmistrz, decision-research) - orkiestracja, bramy, HITL
- [ ] D5. Referencje do skilli w komendach wskazuja istniejace pliki i wlasciwe modele
- [ ] D6. Anti-groupthink w deep-five-minds / five-minds-strategic / perf-squad - poprawne bramy, sensowne
- [ ] D7. five-minds.md przepisany na 9 agentow - zgodny z katalogiem, realna faza debaty, spojny opis

Katalog i routing:
- [ ] D8. PRESET_CATALOG.md - 49 presetow, przewodnik decyzyjny, macierz kosztow, drzewo eskalacji, fallback (liczby 49/47)
- [ ] D9. ~/.claude/CLAUDE.md - "47 agentow, 49 presetow", sekcja effort, prog aktywacji
- [ ] D10. docs/ROUTING_SYSTEM.md - sekcja effort + korekta budget_tokens, liczby 49/47
- [ ] D11. Spojnosc liczb miedzy wszystkimi plikami routingu (49 komend / 47 skilli na dysku)

## E. DLUGI I NIESPOJNOSCI DO ROZSTRZYGNIECIA

- [ ] E1. Pole `effort` w AD: dodane TYLKO do 10 nowych agentow, brak w 35 starych - ujednolicic (backfill w HTML?)
- [ ] E2. decision_advisor: phase w AD = 'strategy', a skill mowi 'synthesis' - swiadoma decyzja, potwierdzic
- [x] E3. Liczniki w HTML: brak globalnego zaszytego "35/42" w UI (liczby dynamiczne z AD/PM, auto-update).
        Zmieniono badge naglowka "v32 Phase 1"->"v33" i <title>->"v33 | 45 agentow, 49 presetow". Nazwa appu bez zmian.
        UWAGA drobne (nie-krytyczne): niektore FAKTY w AGENT_KNOWLEDGE mowia "Obecny w 7 z 29 presetow" itp. -
        stale liczby w tresci per-agent, do ewentualnej korekty przy okazji (nie licznik globalny).
- [ ] E4. repo CLAUDE.md (public): "35 agents, 42 presets" - opisuje v32.16 (shipped); zdecydowac kiedy zmienic
- [ ] E5. CAVEAT REGENERACJI: reczne edycje (effort, anti-groupthink, nowe byty) zostana NADPISANE przez
        generate_skills.js/generate_commands.js z HTML. Wniesc do zrodla HTML PRZED regeneracja - potwierdzic plan
- [ ] E6. Dane osobowe: voice_profile.md, profil_gustu.md, dane kariery - NIGDY do publicznego repo (sprawdzic .gitignore)
- [ ] E7. Kolor decision_advisor = 'bl' (niebieski) - czy abbrev 'bl' istnieje w palecie AD (res_tech uzywa 'bl' - OK, potwierdzic)

## F. POZOSTALE DO ZROBIENIA (nie zaczete lub czesciowe)

- [x] F1. 7 PRESETOW do encyklopedii DONE (2026-08-31): voice, content_social, kariera, kuchmistrz,
        decision_research, deep_research_v2, bento_redesign. Wszystkie 20 struktur (9 PL + 7 EN + PCAT +
        PRESET_CATEGORIES + graf PR/PC). PM=49, PRESET_EDU_PL=49, eduPreset EN=49. Parse 0 bledow.
        DO WERYFIKACJI W PRZEGLADARCE (sekcja B-styl, ale dla presetow): otworz kazdy z 7 presetow,
        sprawdz bento (18 pol), graf zespolu (wszystkie wezly widoczne), PL/EN, chip-filtr kategorii.
        SZCZEGOLNIE deep_research_v2: graf ma 17 wezlow (7 researcher + 7 extractor + critic + synth) - sprawdz
        czy wszystkie sie renderuja (dodano res_extractor + synthesizer_lean do AD w tym celu).
- [ ] F1b. res_extractor + synthesizer_lean: dodane do AD (palette+pokazDef+graf) ale BEZ AGENT_EDU_PL (bento).
        Decyzja: czy chcemy im pelne wpisy encyklopedyczne (10-sekcyjne bento) czy zostaja jako agenty operacyjne
        widoczne tylko w palecie i grafie deep_research_v2. Na razie: operacyjne (wykluczone z bento przez filtr AD∩EDU).
- [ ] F2. MEDIA_PROMPTS.md: tylko voice_writer wypelniony; 9 agentow + 7 presetow to placeholdery "do uzupelnienia"
- [ ] F3. Infografiki base64 dla nowych bytow (decyzja: generowac hurtem przy publikacji)
- [ ] F4. Szlif wizualny kategoryzacji 1C (wyglad + umiejscowienie) - odlozony na koniec
- [ ] F5. Mirror v33 -> index.html (przy publikacji)
- [ ] F6. Test /kariera na realnym CV (d:\Projekty\NaukaAI\CV\cv_lean_ai_engineer.html) gdy user poda role
- [ ] F7. Test /voice na czystych probkach maili/postow (gdy user doda)
- [ ] F8. Filmy PL/ENG + instrukcja instalacji (przed publikacja)
- [ ] F9. Publikacja researchu (zanonimizowana) + wpis awesome-claude-code (przed publikacja)
- [ ] F10. Reddit delta-research - w gotowosci, czeka na potwierdzenie usera
- [ ] F11. Decyzja o nazwie projektu - na SAM koniec przed publikacja GitHub
- [ ] F12. Warstwa edukacyjna: blackboard + guardrails jako wpisy encyklopedyczne (koncept, iteracja 2/3)
- [ ] F13. Effort FAZA 2: rewizja model-routingu w komendach (Sonnet5+xhigh zamiast Opus gdzie coding/agentic)

---

## Notatki z przegladu (wpisywac tu znalezione problemy)

(pusto - wypelniac podczas review)
