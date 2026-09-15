# PROGRESS - v33 iteracja 1

## >>> RESUME PO COMPAKCIE (czytaj to pierwsze) <<<
STAN NA 2026-08-31 (Track F ZAKONCZONY):
- Warstwa OPERACYJNA gotowa: 49 presetow / 47 skills (zsync w PRESET_CATALOG + ~/.claude/CLAUDE.md + docs/ROUTING_SYSTEM.md).
- Iteracja 1 DONE. Iteracja 2 tracki A-E DONE. **TRACK F (encyklopedia HTML) DONE.**
- **TRACK F ZROBIONE (2026-08-31):** plik v33/AGENT_TEAMS_CONFIGURATOR_v33.html, parse 0 bledow.
  * 10 nowych AGENTOW w encyklopedii (PL+EN) - z poprzedniej sesji. AGENT_EDU_PL=45.
  * 7 NOWYCH PRESETOW w pelni zintegrowanych (voice, content_social, kariera, kuchmistrz, decision_research,
    deep_research_v2, bento_redesign). Struktury: PM/PDESC/PR/PC/PRESET_SVG/PRESET_KNOWLEDGE/PRESET_LONG_PL/
    PRESET_MID_PL/PRESET_GREEN_PL/PRESET_RED_PL/PRESET_EDU_PL (9 PL) + eduPreset/presetLong/presetMid/presetGreen/
    presetRed/presetNames/presetDescs (7 EN) + PCAT (kubelki rozmiaru) + PRESET_CATEGORIES (use-case) + graf PR/PC.
    LICZBY: PM=49, PRESET_EDU_PL=49, eduPreset EN=49. Wszystkie 7 obecne wszedzie.
  * 2 AGENTY POMOCNICZE dodane do AD (res_extractor, synthesizer_lean) - bo graf deep_research_v2 ich uzywa a nie
    bylo ich w AD. Pelne: AD + AGENT_SVG + AGENT_COLORS_DARK/LIGHT + AGENT_SPEECH + AGENT_KNOWLEDGE. AD=40 teraz.
    NIE maja AGENT_EDU_PL (celowo - to agenty operacyjne, wykluczone z bento encyklopedii przez filtr AD∩EDU
    w linii ~31067). Renderuja sie w palecie + pokazDef, bento ich pomija (poprawnie).
  * SYNC LICZNIKOW: brak globalnego zaszytego "35/42" w UI (liczby dynamiczne z AD/PM). Zmieniono badge naglowka
    "v32 Phase 1"->"v33" i <title> na "v33 | 45 agentow, 49 presetow". Nazwa APPU bez zmian (decyzja na koniec).
  * Backupy: scratchpad/v33_backup_presets_{plsmall,pledu,complete,final}.html.

NOWE ZASADY OD MACIEJA (2026-08-31), zapisane tez w pamieci:
- ZERO generowania infografik/filmow przez Claude - Maciej robi sam w NotebookLM/Gemini. [[feedback_no_media_generation]]
- Kazde upublicznianie/udostepnianie TYLKO za wyrazna zgoda i dopiero na SAM KONIEC. [[feedback_publikacja_zgoda]]

NASTEPNY KROK: (a) mirror v33->index.html przy publikacji (NIE teraz, za zgoda); (b) ewentualne pelne wpisy
encyklopedyczne (AGENT_EDU_PL) dla res_extractor+synthesizer_lean jesli chcemy je w bento (opcjonalne);
(c) review Macieja wg REVIEW_CHECKLIST; (d) MEDIA_PROMPTS tekstowe jako input dla NotebookLM (opcjonalnie).
WALIDATOR: cd v33 && node <scratchpad>/checkjs.js. ANCHOR STRATEGIA: dopisywac przed stabilnym wpisem-kotwica
lub na koncu struktury (uwaga na trailing comma).

>>> TRYB PRACY PO COMPAKCIE = ROWNOLEGLY (ustalone 2026-08-30): <<<
- JA (Claude): lece dalej z Track F - buduje 7 PRESETOW do encyklopedii, potem sync liczb + reszta. Bez czekania na review.
- MACIEJ: niezaleznie czyta materialy i weryfikuje to co JUZ wprowadzone, wg plans/REVIEW_CHECKLIST.md
  (sekcje A walidacja -> B encyklopedia wizualnie w przegladarce -> C tresc -> D operacyjne -> E dlugi -> F pozostale).
- Poprawki: gdy Maciej zglosi problem (ustnie albo [!] w REVIEW_CHECKLIST sekcja "Notatki z przegladu"),
  nanosze je priorytetowo. Moja praca nad presetami NIE unieważnia jego review agentow (presety = inne struktury: PM/PDESC/PRESET_EDU_PL,
  nie ruszaja AGENT_EDU_PL). Maciej po mojej partii moze odswiezyc przegladarke, by zobaczyc nowe presety.
- START po compakcie: przeczytac PROGRESS + REVIEW_CHECKLIST, potem OD RAZU zmapowac struktury presetow w HTML i produkowac.

Zasada pracy: <50% kontekstu = lec task-by-task bez pytania; pytaj dopiero >50%. Zapisuj wszystko do PROGRESS
(user chce moc pozniej korygowac). Nazwa projektu: decyzja na SAM koniec przed publikacja.
WALIDATOR zapisany na stale w scratchpadzie: <scratchpad>/checkjs.js (kopia tez /tmp/checkjs.js). Czyta HTML,
wyciaga <script> bez src, robi new vm.Script na kazdym, liczy bledy. Uzywac po KAZDEJ partii insertow do HTML:
`cd v33 && node <scratchpad>/checkjs.js`. Backupy HTML: scratchpad/v33_backup_{pilot,3,6,9,10}agents.html.
Sciezka scratchpad: C:/Users/macie/AppData/Local/Temp/claude/C--Projekty-Claude-Code-Agent-Architecture/9c11e053-c1cd-4eb4-9b0a-bd70b5772d71/scratchpad



> Source of truth po compakcji. Po kazdej czesci aktualizowany. Checklista tez zywa w harness Task list (#1-#11).
> Zasada pracy: po KAZDEJ czesci pytam Macieja czy kontynuowac (zeby mogl w pore poprosic o /compact).
> Mozna uzywac agentow do przyspieszenia, ale priorytet = jakosc.

## Legenda
[x] done | [~] w toku | [ ] todo | [BG] dziala w tle

## Part 0 - Setup  [~]
- [x] Plan iteracji 1 zatwierdzony kierunkowo (plans/ITERATION_1_PLAN.md)
- [x] Checklista widoczna (Task #1-#11)
- [x] PROGRESS.md utworzony
- [BG] Research kuchmistrza odpalony (RR7, iter2 prep)
- [x] Decyzje setup: probki glosu = bootstrap z historii rozmow + memory (rejestr terminalowy != mail,
      Maciej doda dopracowane probki pozniej); kategorie = 8 (Research/Build/Quality/Content/Strategy/Ops/Data/Design)
- [ ] CHECKPOINT: czekam na "start 1A" od Macieja

## Part 1A - Higiena P0  [x] DONE
- [x] #2 deep-research-v2 (17ag, PREMIUM) + bento-redesign (7ag, DROGI) dodane do PRESET_CATALOG.md
      (przewodnik decyzyjny + pelne wpisy + macierz kosztow + drzewo eskalacji)
- [x] #3 licznik deep-five-minds 27->25 (wszedzie), tytul katalogu 42->44, fallback 35->37 agentow,
      global ~/.claude/CLAUDE.md liczby 37/44 + DODANY inteligentny prog aktywacji auto-routingu
      (nie skanuj katalogu przy prostych pytaniach), limity subagentow 20/200/depth-3 do docs/ROUTING_SYSTEM.md
- [ ] ODLOZONE: sync liczb w repo CLAUDE.md (public) + HTML encyklopedii 42->44/35->37 -> idzie RAZEM z dodaniem
      wpisow encyklopedycznych dla deep-research-v2 + bento-redesign (praca w iteracji budowy encyklopedii, nie 1A,
      zeby nie bylo niespojnosci doc vs HTML)

## Part 1B - Pipeline pisarski  [x] DONE
- [x] #4 style_profiler.md (sonnet) - ~/.claude/skills/, format wg writer.md
- [x] #5 voice_writer.md (sonnet) - uczy sie z edycji usera (edit_delta)
- [x] #6 voice_qa.md (haiku) - werdykt PASS/REVISE, anty-AI-slop, negative constraints
- [x] #7 voice.md (komenda /voice) - pipeline PROFIL->PISANIE->WALIDACJA->HITL, dodane do PRESET_CATALOG
- [x] #8 voice_profile.md profil startowy Macieja z korpusu roboczego - ZAPISANY LOKALNIE ~/.claude/ (NIE w repo),
      z jawnymi lukami (formalny/LinkedIn/CV/EN) i notka ze literowki = artefakty, nie styl
- LICZBY zsync: 45 komend / 40 skills (katalog + global CLAUDE.md + ROUTING_SYSTEM.md)

## Part 1C - Kategoryzacja wizualna v1  [~] W TOKU (czeka na ocene wzorca)
- [x] #9 8 kategorii zdefiniowane + przypisane 45 presetow (plans/CATEGORIES_SPEC.md)
      kategorie: research/build/quality/content/strategy/ops/data/design (emoji+kolor+PL/EN)
- [x] Prototyp zaakceptowany przez Macieja ("mozemy zostawic") + domyslne przypisania OK
- [~] #10 ZINTEGROWANE w v33/AGENT_TEAMS_CONFIGURATOR_v33.html (nowy plik, kopia v32). Wysłane do wizualnej oceny.
      INSIGHT: sidebar juz grupowal po ROZMIARZE (PCAT: MICRO/MALE/SREDNIE/DUZE/ENTERPRISE) - use-case dodany
      jako DRUGA OS (nie zastapienie): pasek 8 chipow-filtrow (#prCatFilter) + emoji-chip kategorii na kazdym
      presecie + filtrowanie JS. Zero zmiany grupowania po rozmiarze. Edycje: CATEGORY_META+PRESET_CATEGORIES
      +renderPrCatFilter (po PCAT ~24628), rPresety filtr+chip, kontener w panPr (2420), CSS .prcf-*/.pr-cat-tag (~744).
- [x] ZAAKCEPTOWANE przez Macieja ("mozemy to zostawic"). Prosi o finalny szlif WYGLADU/UMIEJSCOWIENIA na
      samym koncu (zapisane w backlog). Mirror v33->index.html ODLOZONY do publikacji.

## ITERACJA 1 ZAMKNIETA (1A+1B+1C done).

## ITERACJA 2 - w toku
### Track A: Suite kariery [x] DONE
- [x] #12 career_document_builder.md (sonnet) - CV/list/LinkedIn, zero-fabrication, ATS, reuzywa voice_profile
- [x] #13 interview_coach.md (sonnet) - mock Q&A z follow-upami, STAR, tryb TRENINGU nie sciaganie
- [x] #14 kariera.md (/kariera, 4 ag) - research roli -> dokumenty -> przygotowanie -> HITL, dodane do PRESET_CATALOG
- LICZBY zsync: 46 komend / 42 skills (katalog + global CLAUDE.md + ROUTING_SYSTEM)
- DO ENCYKLOPEDII (pozniej): wpisy dla career_document_builder, interview_coach, /kariera + video/infografika prompts

### Track B: Kuchmistrz [x] DONE
- [x] #15 recipe_scout.md (sonnet, web), taste_recommender.md (sonnet, profil_gustu), recipe_filter.md (haiku,
      czas aktywny vs calkowity + dostepnosc skladnikow)
- [x] #16 kuchmistrz.md (/kuchmistrz, 3 ag, cascade) + koncept profil_gustu.md, dodane do PRESET_CATALOG
- LICZBY zsync: 47 komend / 45 skills (katalog + global CLAUDE.md + ROUTING_SYSTEM)

### Track C: Decision-research + Content social [x] DONE
- [x] #17 social_strategist.md (sonnet) - Strateg Tresci Social: kat/hook/format/CTA per platforma (LinkedIn/FB/X),
      NIE pisze finalu (to voice_writer), anti-AI-slop, flaguje gdzie potrzeba konkretu autora
- [x] #18 content-social.md (/content-social, 4 ag) - profiler(opt)+strateg+voice_writer+voice_qa+HITL, reuzywa voice_profile
- [x] #19 decision_advisor.md (sonnet) - Doradca Decyzyjny: werdykt (rekomendacja+tradeoffs+pewnosc+dla kogo),
      wazy sygnal powtarzalny ponad n=1, nie zmysla danych spoza sentymentu
- [x] #20 decision-research.md (/decision-research, 4 ag) - res_reddit+res_forums(+res_x opt, +res_critic --strict)
      -> decision_advisor + HITL. Tani, reuzywa istniejacych researcherow. Eskalacja do /deep-research-v2 gdy trzeba twardych danych
- [x] #21 LICZBY zsync: 49 komend / 47 skills (PRESET_CATALOG + global CLAUDE.md + ROUTING_SYSTEM)

### Track D: Anti-groupthink (operacyjny) [x] DONE
- [x] #22 deep-five-minds.md - sekcja "Anti-groupthink (ograniczenia debaty)" po FIVE MINDS #1 + brama
- [x] #23 five-minds-strategic.md - sekcja anti-groupthink po FIVE MINDS (debate) + brama
- [x] #24 perf-squad.md - wersja pod audyt wydajnosci (mylace metryki, p95/p99, spor rozstrzyga pomiar) + brama
- 5 mitygacji zgrounowanych w arXiv: niezalezne stanowiska / dissent preservation / Cien z zebami /
  dowod ponad pewnosc / nie wymuszaj konwergencji. Zamiast tylko wpisu encyklopedycznego - REALNE instrukcje operacyjne.
- [x] #25 BUG NAPRAWIONY (decyzja Macieja: recznie): five-minds.md przepisany na kanoniczne 9 agentow
      (Orkiestrator + Analityk + 5 ekspertow + Syntetyk + Prezenter Decyzji), realna faza FIVE MINDS (debate),
      anti-groupthink, poprawny header/opis. Czysta debata: bez researchu (to /five-minds-strategic) i bez budowania.
- CAVEAT REGENERACJI: te edycje (anti-groupthink + 5 nowych presetow/agentow + POLE EFFORT w 47 skillach tej sesji)
  sa RECZNE w plikach ~/.claude/commands + skills. generate_commands.js/generate_skills.js z HTML by je NADPISALY.
  Przy iteracji budowy encyklopedii trzeba: (a) dodac pole effort do AGENT_EDU_PL w HTML + do generate_skills.js,
  (b) wniesc anti-groupthink + nowe byty do zrodla HTML ZANIM sie regeneruje, albo zregenerowac i re-applikowac.

### Track E: Effort per agent [x] DONE (Faza 1 - metadata)
- [x] #26 pole `effort` dodane do frontmatter WSZYSTKICH 47 skilli. Rozklad: 24 high / 10 low / 6 medium / 7 xhigh.
      Mapowanie zgrounowane w RR5: xhigh=decyzyjno-krytyczne (5 ekspertow+orchestrator+synthesizer_lean),
      high=build/coding/pisanie, medium=zbieranie researchu, low=haiku mechaniczne. Bez `max` (drogie).
- [x] Instrukcja globalna w ~/.claude/CLAUDE.md: orchestrator przekazuje model+effort z frontmatter przy spawnie.
- [x] Sekcja "Effort per agent" + korekta budget_tokens->effort w docs/ROUTING_SYSTEM.md (z tabela i zrodlami RR5+R1).
- [ ] FAZA 2 (osobno, ostrozniej): rewizja model-routingu w komendach (Sonnet 5 + xhigh zamiast Opus tam gdzie
      coding/agentic, -40-60% kosztu; NIE ruszac czysto analityczno-decyzyjnych). Wyzsze ryzyko - z okiem Macieja.

### Track F: Encyklopedia HTML [~] W TOKU - PILOT DONE
- [x] #27 PILOT voice_writer w PELNI zintegrowany w v33 HTML przez WSZYSTKIE struktury PL+EN:
      AGENT_SVG (ikona quill), color light/dark (#C4B5FD/#7C3AED), AGENT_SPEECH, AGENT_KNOWLEDGE,
      AGENT_LONG/MID/GREEN/RED_PL, AD (cat BUILD, color vi, model sonnet, effort high, load 40),
      AGENT_EDU_PL (18 pol + stat Effort), oraz EN: agentNames/agentDescs/prompts/knowledge/speech/
      agentLong/agentMid/agentGreen/agentRed/eduAgent. JS PARSE: 0 bledow (walidator /tmp/checkjs.js).
      AD ma teraz 36 agentow. relatedAgents: style_profiler/voice_qa/social_strategist.
- [x] MEDIA_PROMPTS.md utworzony (plans/) z wpisem pilotowym voice_writer (infografika+video PL/EN) - wzorzec.
- WALIDATOR: node /tmp/checkjs.js wyciaga <script> i sprawdza vm.Script - uzywac po KAZDEJ partii insertow.
- [x] style_profiler (Profiler Glosu) - PELNA integracja PL+EN, parse 0 bledow. cat BUILD, color vi, sonnet, effort medium.
- [x] voice_qa (Straznik Glosu) - PELNA integracja PL+EN, parse 0 bledow. cat BUILD, color vi, haiku, effort low.
- >>> TRIO /voice KOMPLETNE w encyklopedii (style_profiler + voice_writer + voice_qa), AD ma 38 agentow. <<<
- ANCHOR STRATEGIA (dziala): kazdy nowy agent wstawiac PRZED wpisem voice_writer w kazdej strukturze (anchory
  voice_writer sa stabilne, nowe agenty stackuja sie przed nim). 11 struktur PL + 10 EN = 21 insertow/agenta.
  Kolejnosc: batch terse PL (SVG/color x2/speech/long/mid/green/red) -> AD+KNOWLEDGE -> AGENT_EDU_PL(18 pol) ->
  batch terse EN (names/descs/prompts/speech/long/mid) -> EN green/red/knowledge -> EN eduAgent(18 pol). Parse po kazdym agencie.
- [x] social_strategist (Strateg Tresci Social) - PELNA PL+EN, parse 0. cat BUILD, color vi, sonnet, effort high. AD=39.
- [x] career_document_builder (Architekt Dokumentow Kariery) - PELNA PL+EN, parse 0. cat BUILD, color cy, sonnet, effort high. AD=40.
- [x] interview_coach (Trener Rozmow) - PELNA PL+EN, parse 0. cat BUILD, color cy, sonnet, effort high. AD=41.
- [x] recipe_scout (Zwiadowca Przepisow) - PELNA PL+EN, parse 0. cat RESEARCH, color am, sonnet, effort medium. AD=42.
- [x] taste_recommender (Doradca Smaku) - PELNA PL+EN, parse 0. cat BUILD, color am, sonnet, effort high. AD=43.
- [x] recipe_filter (Filtr Kuchenny) - PELNA PL+EN, parse 0. cat BUILD, color am, haiku, effort low. AD=44.
- [x] decision_advisor (Doradca Decyzyjny) - PELNA PL+EN, parse 0. cat STRATEGIA, color bl, sonnet, effort high. AD=45.
- >>> WSZYSTKIE 10 NOWYCH AGENTOW KOMPLETNE W ENCYKLOPEDII (PL+EN), AD=45, parse 0 bledow. <<<
- backupy: scratchpad/v33_backup_{6,9,10}agents.html
- Rodziny kolorow: voice/content=vi(fiolet), kariera=cy(cyan), kuchmistrz=am(amber), decyzja=bl(niebieski).
- POZOSTALO W TRACK F: 7 presetow (/voice, /content-social, /kariera, /kuchmistrz, /decision-research
  + zalegle deep-research-v2, bento-redesign) w strukturach PM/PDESC/PRESET_EDU_PL + PRESET_LONG/MID/GREEN/RED + EN.
  TRZEBA NAJPIERW zmapowac struktury presetow (jak przy agentach). Potem SYNC LICZNIKOW: tytul/naglowki
  "35 agentow / 42 presety" -> realne (45 agentow / X presetow) w HTML + repo CLAUDE.md.
  (/voice, /content-social, /kariera, /kuchmistrz, /decision-research + zalegle deep-research-v2, bento-redesign)
  wg tej samej receptury. KANDYDAT NA DELEGACJE do subagentow (Maciej pozwolil uzywac agentow do przyspieszenia)
  PO akceptacji wzorca pilota. Kazdy tez wpis w MEDIA_PROMPTS.
- SYNC LICZB (dlug): po dodaniu wszystkich - zaktualizowac tytul/liczniki "35 agentow/42 presety" w HTML +
  repo CLAUDE.md na realne. Presety: struktury PM/PDESC/PRESET_EDU_PL + PRESET_LONG/MID/GREEN/RED + EN (analog).

### Pozostale tracki iteracji 2 (do wyboru, po encyklopedii):
- warstwa edukacyjna: blackboard/guardrails jako wpisy encyklopedyczne (HTML)
- effort FAZA 2: model-routing Sonnet+xhigh substytucja Opus (ostroznie)

## STAN OGOLNY v33 (po tej sesji)
Nowe byty: 10 agentow (style_profiler, voice_writer, voice_qa, career_document_builder, interview_coach,
recipe_scout, taste_recommender, recipe_filter, social_strategist, decision_advisor) + 5 presetow
(/voice, /kariera, /kuchmistrz, /content-social, /decision-research). Kategoryzacja 1C w v33 HTML. Liczby 49/47.
DUZY DLUG DO SPLACENIA PRZED PUBLIKACJA: wpisy encyklopedyczne HTML (AGENT_EDU_PL/PRESET_EDU_PL) + PL/EN I18N
+ video/infografika prompts dla wszystkich 10 agentow + 7 presetow (5 nowych + zalegle deep_research_v2/bento_redesign),
sync liczb w repo CLAUDE.md + HTML, mirror do index.html, szlif wizualny 1C, decyzja o nazwie.

## RECEPTURA ENCYKLOPEDII (odkryta 2026-08-29, HITL zatwierdzony) - czytaj przed buildem HTML
Plik: v33/AGENT_TEAMS_CONFIGURATOR_v33.html (27524 linii, ALE ~3.3M tokenow przez base64 inline -
NIGDY nie czytaj calego, tylko celowane offsety/grep).
Renderer: rysujBentoAgenta(aid) -> rysujBentoAgentaV14 JESLI istnieje AGENT_EDU_PL[aid], inaczej legacy.
AGENT_MEDIA (base64 infografiki) OPCJONALNE - renderer dziala bez grafiki.

DECYZJE HITL (2026-08-29):
- Prompty video/infografika -> OSOBNY doc MEDIA_PROMPTS (nie w skillach, nie nowe pole w EDU).
- Infografiki base64 -> POMIN teraz, generuj hurtem przy publikacji. Buduj pelne wpisy tekstowe PL/EN.
- Tempo -> PILOT voice_writer w pelni, pokaz wzorzec, potem reszta.

STRUKTURY GDZIE ZYJE JEDEN AGENT (wzorzec: 'writer', trzeba dodac wpis w kazdej):
PL: (1) icon SVG map ~2783, (2) color light map ~3036, (3) color dark map ~3050, (4) AGENT_SPEECH ~3140,
(5) AGENT_KNOWLEDGE ~3174, (6) AGENT_LONG_PL ~4385, (7) AGENT_MID_PL ~4423, (8) AGENT_GREEN_PL ~4461,
(9) AGENT_RED_PL ~4499, (10) AD ~4540 (cat/id/name/icon/color/model/load/phase/role/tools/prompt),
(11) AGENT_EDU_PL ~4710 (18 pol: tagline/missionShort/whoIs/analogy/howItWorks/inputs/outputs/does/doesNotDo/
antiPatterns/keyConcepts/stats/bestFor/worstFor/relatedAgents/glossary/learningQuote/realExample).
EN (I18N_EN ~11444): agentNames, agentDescs, prompts, knowledge, speech, agentLong, agentMid, agentGreen,
agentRed, eduAgent. => ~12 PL + ~10 EN insertow na agenta. Presety analogicznie (PM/PDESC/PRESET_EDU_PL +7).
AD_MAP budowane z AD (~11207). Kolory: skroty 'mu'/'am'/'vi'/'cy'/'bl' -> paleta. Wzorzec writer: cat BUILD,
color 'mu', model sonnet. voice_writer: cat BUILD/CONTENT, model sonnet, effort high.
CAVEAT: te wpisy trzeba tez ostatecznie wpiac do generate_skills.js/HTML zrodla (patrz caveat regeneracji).

WZORCE ZEBRANE (agent 'writer' jako szablon, wszystkie odczytane 2026-08-29):
- AD ~4609: {cat:'BUILD',id:'writer',name:'Redaktor',icon:emoji,color:'mu',model:'sonnet',load:35,phase:'build',role,tools,prompt}
- AGENT_EDU_PL ~6134: 18 pol (pelny wzorzec odczytany)
- AGENT_KNOWLEDGE ~3604: {who, analogy, does[], doesNot[], antiPatterns[], facts[]}
- AGENT_SPEECH ~3158: writer:["4 krotkie dymki..."]
- AGENT_LONG_PL ~4403: '<p>..2 akapity HTML..</p>' | MID ~4441: 'jedno zdanie Uzyj do..' |
  GREEN ~4479: [6 pozycji kiedy uzyc] | RED ~4517: [5 pozycji kiedy NIE]
- color light ~3036: writer:'#FCD34D' | dark ~3050: writer:'#A16207' (keyed by agent id)
- kolory-abbrev w AD.color: 'am'/'vi'/'cy'/'bl'/'mu' (znane; synthesizer='vi')
- EN I18N_EN (~11444): eduAgent (mirror 18 pol), agentNames, agentDescs, prompts, knowledge, speech,
  agentLong, agentMid, agentGreen, agentRed - kazdy keyed by id. EN speech writer ~24108.

WARTOSCI PILOTA voice_writer (gotowe do wstawienia): cat:'BUILD', id:'voice_writer', name:'Pisarz w Twoim Glosie',
color:'vi', model:'sonnet', load:~40, phase:'build', effort high. hex light '#C4B5FD' / dark '#7C3AED'.
Wstawiac ZAWSZE po wpisie 'writer' w kazdej strukturze (writer jest content-adjacent, anchory unikalne).
Po insertach PL: sprawdzic parse (node -e "require+eval" albo otworzyc w przegladarce). Potem EN. Potem MEDIA_PROMPTS doc.

## Iteracja 2 (prep)
- [x] #11 analiza kuchmistrza RR7 GOTOWA (research-recent/RR7_kuchmistrz_analiza.md) - do czytania podczas iter 1

## Do zrobienia w warstwie encyklopedii (HTML, pozniej)
- Wpisy encyklopedyczne (AGENT_EDU_PL / PRESET_EDU_PL) dla nowych bytow: style_profiler, voice_writer, voice_qa,
  preset /voice + zalegle deep-research-v2, bento-redesign. KAZDY wpis encyklopedyczny konczy sie promptami
  video + infografika (standard projektu - dotyczy encyklopedii, NIE operacyjnych plikow skills, ktore ich nie maja).
- Dwujezycznosc PL/EN (I18N_EN namespaces jak w v32.16).
- Sync liczb 42->44 / 35->37 w HTML przy tej okazji.

## Notatki
- Kuchmistrz PRZENIESIONY na iteracje 2 (decyzja Macieja), ale analiza robiona teraz do czytania podczas iter 1.
- Build robimy na nowym pliku wersji (v33.0), NIE nadpisujemy v32.16.
- Nazwa projektu: decyzja odlozona na sam koniec przed publikacja GitHub.
