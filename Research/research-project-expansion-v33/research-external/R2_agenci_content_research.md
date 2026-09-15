# R2: Agenci do research i content creation

Raport researchu webowego na potrzeby rozszerzenia "Agent Architecture Designer" o agentow dla userow spoza software engineering: research decyzyjny/konsumencki, pisanie CV/cover letters, copywriting, content strategy, personal branding, i - kluczowe - naśladowanie stylu pisania konkretnej osoby.

---

## 1. Agenci do research decyzyjnego / konsumenckiego

### Wzorzec: "Shopping Research" (OpenAI ChatGPT)
OpenAI wprowadzil dedykowany tryb "shopping research" w ChatGPT, ktory zamienia product discovery w konwersacje: agent zadaje pytania doprecyzowujace co userowi zalezy, ciagnie dane z wiarygodnych zrodel, i wraca z opcjami do refinementu. To wzorzec wieloturowy (multi-turn), nie jednorazowy prompt - agent najpierw **elicituje kryteria decyzyjne**, potem dopiero szuka i porownuje.
Zrodlo: [Introducing shopping research in ChatGPT (OpenAI)](https://openai.com/index/chatgpt-shopping-research/)

### Wzorzec: strukturalny prompt rekomendacyjny z constraintami
Sprawdzony wzorzec promptu dla agenta rekomendacji zakupowych ma jawnie wypisane sloty: **Relacja/kontekst -> Zainteresowania/kryteria -> Budzet -> Ograniczenia (np. termin dostawy) -> Format outputu (np. 3 opcje, min. rating, uzasadnienie per opcja odnoszace sie do kryteriow)**. To praktycznie szablon "constraint satisfaction + justified ranking", ktory dobrze mapuje sie na agenta typu "researcher + comparator".
Zrodlo: [Bizway - Creative ChatGPT Prompts for Consumer Behavior](https://www.bizway.io/blog/creative-chatgpt-prompts-for-consumer-behavior-and-purchase-decision-processes)

### Wzorzec: market/consumer research prompt sets
Publiczne zbiory promptow do "market research" typowo dziela zadanie na fazy: (1) motywacje zakupowe w danej kategorii, (2) pain points na kazdym etapie buyer journey, (3) content/decision angles adresujace kazdy pain point. To sugeruje architekture 3-fazowa: **discovery -> pain-point mapping -> decision framing**, mozliwa do zaimplementowania jako 3 kolejne role agentow lub jeden agent z 3 sekcjami promptu.
Zrodlo: [Juma - 28 ChatGPT Prompts for Market Research](https://juma.ai/blog/chatgpt-prompts-for-market-research)

**Wniosek dla projektu:** brak gotowego "agent researchera konsumenckiego" jako publicznego software'owego wzorca (Claude Code subagent) - to bialy obszar rynkowy. Istniejace wzorce to prompty/konwersacje w ChatGPT, nie multi-agent pipeline. Agent Architecture Designer moze byc pierwszym, ktory to sformalizuje jako pipeline: `criteria-elicitor -> comparator -> recommender`.

---

## 2. Agenci do CV / cover letter / kariery

To jedyny obszar poza software engineeringiem, ktory ma juz dojrzale, publiczne repo subagentow na wzor tych z Claude Code marketplace.

### ResumeSkills (Paramchoudhary/ResumeSkills)
Repozytorium GitHub z **20 wyspecjalizowanymi skillami**, zorganizowanymi wielo-frameworkowo (`.claude/skills`, `.cursor/skills`, `.gemini/skills`, `.windsurf/skills`, `.opencode/skills` - kazdy framework ma swoj folder z tymi samymi skillami). To bezposredni precedens architektoniczny dla obecnego systemu Agent Architecture Designer (ktory tez generuje skille per-agent z jednego zrodla).

Kategorie skilli:
- **Resume optimization (5):** `resume-ats-optimizer`, `resume-bullet-writer` (slabe stwierdzenia -> osiagniecia z metrykami), `resume-quantifier`, `resume-formatter`, `resume-section-builder`
- **Job search strategy (4):** `job-description-analyzer` (match scoring + gap analysis), `resume-tailor`, `resume-version-manager`, `offer-comparison-analyzer`
- **Supporting materials (3):** `cover-letter-generator`, `linkedin-profile-optimizer`, `portfolio-case-study-writer`
- **Interview & negocjacje (2):** `interview-prep-generator` (generuje STAR stories, pytania cwiczeniowe), `salary-negotiation-prep` (market research + kontroferty)
- **Specjalizacje (6):** warianty dla tech, executive, academic, creative, career-transition

Zrodlo: [Paramchoudhary/ResumeSkills](https://github.com/Paramchoudhary/ResumeSkills), [cover-letter-generator SKILL.md](https://github.com/Paramchoudhary/ResumeSkills/blob/main/skills/cover-letter-generator/SKILL.md)

### ATS Resume Agent (NullSpace-BitCradle/ats-resume-agent)
Agent Claude Code, ktory tailoruje resume do konkretnego job description z ATS optimization i outputem LaTeX/PDF. Kluczowa cecha architektoniczna: **"zero fabrication - kazdy claim zrodlowany z career document usera"** - czyli agent ma wbudowany guardrail przeciw halucynacji osiagniec, dziala na bazie ustrukturyzowanego "career document" jako zrodla prawdy, a nie generuje z powietrza. To wazny wzorzec do skopiowania: agent CV nie powinien "wymyslac" doswiadczenia, tylko re-formatowac/podkreslac fakty z inputu usera.
Zrodlo: [NullSpace-BitCradle/ats-resume-agent](https://github.com/NullSpace-BitCradle/ats-resume-agent)

### Cover Letter skill (CAR framework)
Publiczny skill "Resume & Cover Letter Writer" automatyzuje tailoring aplikacji do job description uzywajac frameworku **CAR (Challenge - Action - Result)** - klasyczny framework do przeksztalcania doswiadczenia w narracje z dowodem wplywu. Warto zaimplementowac to jako explicit reasoning step w promptcie agenta cover letter (nie tylko "napisz list", ale "dla kazdego przywolanego doswiadczenia zidentyfikuj Challenge/Action/Result").
Zrodlo: [mcpmarket.com - Resume & Cover Letter Writer](https://mcpmarket.com/tools/skills/resume-cover-letter-writer)

**Wniosek:** to jest gotowy blueprint - Agent Architecture Designer moze wprost zaadaptowac podzial na ~6-8 rol (career-document-builder, resume-tailor, cover-letter-writer, ats-optimizer, linkedin-optimizer, interview-prep, salary-negotiator) zamiast wymyslac od zera.

---

## 3. Copywriting / content strategy - narzedzia komercyjne jako wzorce architektury

### Jasper AI - "Brand Voice"
Mechanizm dzialania: user uploaduje przykladowe tresci (strone www, style guide, najlepsze artykuly) -> Jasper analizuje skladnie, ton i strukture zdan -> tworzy reużywalny **"Voice Profile"**, ktory sklada sie z: (1) tone descriptors (przymiotniki opisujace komunikacje, np. "pomocny, ale nie nachalny"), (2) writing style notes (dlugosc zdan, humor, poziom formalnosci), (3) things to avoid (buzzwordy/frazy niepasujace do marki), (4) sample content jako referencja. Ten profil jest potem aplikowany automatycznie do kazdej generacji (blog, LinkedIn post, product description).
Zrodlo: [Jasper Help Center - Brand Voice](https://help.jasper.ai/hc/en-us/articles/18618693085339-Brand-Voice), [Jasper blog - Introducing Brand Voice](https://www.jasper.ai/blog/introducing-brand-voice)

**Kluczowy wzorzec architektoniczny:** oddzielenie "profilu stylu" (dane, reużywalny artefakt) od "generatora" (agent, ktory konsumuje profil + brief tematyczny). To dokladnie mapuje sie na architekture dwuagentowa: `style-profiler` (jednorazowo analizuje probki i produkuje profil w YAML/markdown) + `voice-writer` (za kazdym razem czyta profil + zadanie i generuje output).

### Personal Branding Architect - wzorzec 3-fazowy
Znaleziony wzorzec promptu dla agenta personal brandingu dzieli prace na 3 fazy:
1. **Discovery** - agent jako coach zadaje pytania introspekcyjne (kim jestes, co cenisz, jaka jest twoja unikalna perspektywa)
2. **Articulation** - pomaga zdefiniowac ton i tworzy brand statements
3. **Amplification** - dopracowuje jezyk i tworzy "Personal Brand Manifesto"

To wzorzec, ktory dobrze pasuje do multi-turn agenta z pamiecia miedzy fazami (nie jednorazowy generator).
Zrodlo: [smartchoicelinks.com - Mastering Multi-Format AI Content Agents](https://www.smartchoicelinks.com/mastering-multi-format-ai-content-agents-the-production-grade-prompt/)

### Workflow LinkedIn content agent
Udokumentowany real-world workflow: **Agent researches -> Agent plans -> Agent drafts -> Agent repurposes -> Human reviews -> Publish**. AI wykonuje egzekucje, czlowiek dostarcza ekspertyze i judgment na koncu (human-in-the-loop gate przed publikacja). To wzorzec zgodny z filozofia Agent Architecture Designer (HITL gates).
Zrodlo: [LinkedIn - How I built an AI Agent that creates and posts viral LinkedIn content](https://www.linkedin.com/pulse/how-i-built-ai-agent-creates-posts-viral-linkedin-content-de-jager-ovfke)

---

## 4. Wzorce dla agenta stylu pisania (copywriter/ghostwriter) — sekcja kluczowa

To najwazniejsza czesc researchu, bo user chce dodac agenta, ktory uczy sie stylu pisania konkretnej osoby z probek i pisze w tym stylu maile/posty.

### 4.1 Podstawowy wzorzec: "Voiceprint" / multi-dimensional style vector
Powtarzajacy sie termin w narzedziach komercyjnych (HyperWrite, Junia AI, Oiti/ghostwriting-ai) to **"Voiceprint"** lub "Voice DNA" - wielowymiarowy wektor stylu zbudowany z analizy probek tekstu, ktory ma gwarantowac, ze kazde wygenerowane slowo brzmi autentycznie jak dana osoba.
Zrodla: [HyperWrite - AI Write in My Style](https://www.hyperwriteai.com/aitools/ai-write-in-my-style), [Junia AI Ghostwriter](https://www.junia.ai/tools/ai-ghostwriter), [Oiti - AI Ghostwriter for LinkedIn](https://www.ghostwriting-ai.com/)

### 4.2 Ile probek i jakiego typu
Konsensus w narzedziach: **3-5 probek** rzeczywistego tekstu (LinkedIn posty, maile, artykuly blogowe) wystarcza, zeby AI zaczelo rozpoznawac niuanse komunikacji. Niektore narzedzia dzialaja juz na 2 przykladach + opisie stylu tekstowym.
Zrodla: [medium.com/aiforwriters - How to Clone Yourself with ChatGPT](https://medium.com/aiforwriters/how-to-clone-yourself-with-chatgpt-d58a6339e148), [instacopy.ai blog](https://instacopy.ai/blog/how-to-ghostwrite-with-ai/)

### 4.3 Konkretny, udokumentowany case study: Jeremy Morgan "Hey AI, Write Like Me"
To najbardziej szczegolowy, powtarzalny opis metody znaleziony w tym researchu:

**Krok 1 - zbierz probki:** autor skonsolidowal 255 artykulow blogowych w jeden plik (markdown okazal sie efektywniejszy niz PDF - mniej szumu/overhead dla modelu).

**Krok 2 - system prompt z jawna instrukcja analityczna:**
> "Make an agent who writes exactly like [Person]. Write in the same voice and style, and mimic any unique expressions or writing patterns."

Nastepnie explicit lista wymiarow do analizy w probkach:
> "Analyze Provided Writing Samples: Content Themes, Vocabulary, Style and Tone, Sentence Structure, Punctuation and Formatting, Narrative Flow, Engagement Techniques, Figurative Language and Personal Touches"

**Krok 3 - generacja:** po uploadzie skonsolidowanego materialu, user podaje tylko temat/zadanie, a agent generuje w wywnioskowanym stylu.

**Znalezione limity (wazne dla projektowania agenta):** nawet przy duzej liczbie probek model dokladal cechy niewystepujace w zrodle (np. nadmierny entuzjazm, nieoczekiwane zmiany tonu) - czyli **czysty few-shot bez explicit constraints nie wystarcza**, potrzebny jest krok walidacji/porownania z oryginalem.
Zrodlo: [Jeremy Morgan - Hey AI, Write Like Me](https://www.jeremymorgan.com/blog/generative-ai/hey-ai-write-like-me/)

### 4.4 Framework "5 filarow" (deconstruction approach)
Inny udokumentowany wzorzec dekomponuje styl na **5 pilarow**, ktore razem tworza "master style guide": sentence rhythm (rytm zdan), vocabulary (slownictwo), empathy mapping (jak autor odnosi sie do czytelnika/emocji), visual formatting (formatowanie - naglowki, listy, dlugosc akapitow), narrative perspective (perspektywa narracyjna). Te 5 wymiarow jest potem syntetyzowane w jeden style guide, ktory zasila oddzielny "execution prompt" do faktycznego pisania.
Zrodlo: [smartpromptsforai.substack.com - 7 Prompts to Clone Your Writing Style](https://smartpromptsforai.substack.com/p/7-prompts-to-clone-your-writing-style)

Podobny, rozszerzony framework (15-punktowy) pojawia sie w innych zrodlach, ktore mowia o analizie "sentence rhythm, metaphor density, sarcasm level" jako kluczowych sygnalow rozpoznawczych.

### 4.5 Praktyczny checklist wymiarow stylu (zsyntetyzowany z wielu zrodel)
Powtarzajace sie w roznych zrodlach wymiary, ktore agent powinien ekstrachowac z probek:
- Dlugosc i struktura zdan (krotkie/urwane vs zlozone)
- Poziom formalnosci i slownictwa
- Ulubione przejscia/spojniki ("favorite transitions")
- Uzycie pytan retorycznych
- Humor, sarkazm, ciepło (warmth)
- Formatowanie wizualne: dlugosc akapitow, naglowki, listy, emoji
- Hooki otwierajace i CTA na koniec
- Osobiste anegdoty jako element narracyjny
- Rzeczy, ktorych dana osoba NIGDY nie uzywa (negative constraints - lista "unikaj")
Zrodla: [pressmaster.ai](https://www.pressmaster.ai/article/ai-writing-prompts-consistent-recognizable-brand-voice), [ligma.blog - The Way of the Voice in AI Prompts](https://ligma.blog/post4/), [podglue.com - AI Voice Profile Guide](https://podglue.com/ai-voice-profile)

### 4.6 Naukowe zaplecze (arXiv) - potwierdza i pogłębia podejscie
- **"GhostWriter: Augmenting Collaborative Human-AI Writing Experiences Through Personalization and Agency"** (arXiv 2402.08855) - opisuje wzorzec projektowy, w ktorym system wyprowadza lekki "style profile" z wczesniejszych tekstow autora i warunkuje sugestie AI na tym profilu, tak by sugestie byly odbierane jako "przedluzenie intencji autora", a nie automatyzacja z zewnatrz. Kluczowy insight: personalizacja stylu zwieksza poczucie "ownership" i adopcje AI-generowanego tekstu przez samego autora.
Zrodlo: [arxiv.org/pdf/2402.08855](https://arxiv.org/pdf/2402.08855)

- **"Evaluating Style-Personalized Text Generation: Challenges and Directions"** (arXiv 2508.06374) - swiezy paper (2026) wprost o ewaluacji jakosci personalizacji stylu - potwierdza, ze to aktywny, nierozwiazany research problem, nie tylko produkt komercyjny.
Zrodlo: [arxiv.org/pdf/2508.06374](https://arxiv.org/pdf/2508.06374)

- **"AuthorMix: Modular Authorship Style Transfer via Layer-wise Adapter Mixing"** (arXiv 2603.23069) - podejscie bardziej techniczne (adapter-based fine-tuning), mniej relevantne dla prompt-based agentow w Claude Code, ale potwierdza kierunek: styl autora jako modularny, kompozycyjny artefakt.

- **"Authorship style transfer with inverse transfer data augmentation"** (ScienceDirect) - opisuje "inverse transfer data augmentation": LLM generuje pary neutralny-tekst -> stylizowany-tekst, zeby zrekompensowac maly rozmiar in-context demonstracji. Przydatne jako technika, gdy user ma malo probek (np. tylko 2-3 maile) - agent moze wygenerowac dodatkowe syntetyczne pary treningowe do lepszego uchwycenia stylu.
Zrodlo: [sciencedirect.com/science/article/pii/S2666651024000135](https://www.sciencedirect.com/science/article/pii/S2666651024000135)

### 4.7 Konkretny, gotowy do adaptacji wzorzec dwuagentowej architektury
Syntetyzujac powyzsze zrodla, wylania sie spojny, dwuetapowy wzorzec architektury (rozne narzedzia dochodza do tego samego niezaleznie):

**Agent A: "style-profiler"** (uruchamiany raz lub przy aktualizacji probek)
- Input: 3-5+ probek tekstu usera (maile, posty, artykuly)
- Zadanie: ekstrahowac ustrukturyzowany profil stylu wedlug checklisty z 4.5 (dlugosc zdan, slownictwo, ton, formatowanie, hooki, negative constraints)
- Output: zapisany artefakt (np. `style-profile.md` lub YAML) - reużywalny, wersjonowalny

**Agent B: "voice-writer"** (uruchamiany za kazdym razem gdy user chce nowy tekst)
- Input: `style-profile.md` + brief zadania (temat, format - mail/LinkedIn/CV cover letter, dlugosc)
- Zadanie: napisac tekst zgodny z profilem
- Opcjonalny krok walidacji: porownanie wygenerowanego tekstu z profilem/probkami, sprawdzenie czy nie doszlo do driftu (nadmiernego entuzjazmu, obcych fraz - patrz limit z 4.3)

Ten podzial (profiler + writer + opcjonalny validator) jest bezposrednio kompatybilny z filozofia Agent Architecture Designer (role wyspecjalizowane, pipeline, HITL/critic gate).

---

## 5. Rekomendacje - jakich agentow dodac do v33

Na podstawie calosci researchu, rekomendowane nowe agenty/skille (nie-software-engineering):

1. **`style-profiler`** - analizuje 3-5+ probek tekstu usera i produkuje reużywalny profil stylu (wzorzec z sekcji 4.7, Jasper Brand Voice + Jeremy Morgan method). To fundament dla wszystkich nastepnych.

2. **`voice-writer` (ghostwriter)** - pisze maile/posty/artykuly w danym stylu na podstawie profilu z (1). Kluczowa nowa funkcja, ktorej user chce najbardziej.

3. **`career-document-builder`** - buduje ustrukturyzowany "career document" (zrodlo prawdy o doswiadczeniu), na wzor ats-resume-agent - zapobiega halucynacjom w CV.

4. **`resume-tailor` / `cv-writer`** - tailoruje CV do konkretnej oferty pracy na bazie career document, z ATS optimization.

5. **`cover-letter-writer`** - generuje cover letter uzywajac frameworku CAR (Challenge-Action-Result), opcjonalnie skladany z `voice-writer` zeby brzmial jak user.

6. **`interview-prep-agent`** - generuje STAR stories i pytania cwiczeniowe z career document.

7. **`decision-research-agent`** (consumer/purchase) - 3-fazowy pipeline: criteria-elicitor (dopytuje o kryteria/budzet/ograniczenia) -> comparator (zbiera i porownuje opcje) -> recommender (uzasadniona rekomendacja per kryterium). Bialy obszar rynkowy - brak gotowego publicznego wzorca subagenta, ale jasny wzorzec promptowy z ChatGPT shopping research.

8. **`personal-brand-strategist`** - 3-fazowy agent (Discovery -> Articulation -> Amplification) do budowy pozycjonowania osobistego i "brand manifesto", multi-turn z pamiecia miedzy fazami.

9. **`linkedin-content-planner`** - pipeline research -> plan -> draft -> repurpose -> human review gate (wzorzec z LinkedIn case study), spina sie z `voice-writer` do generowania w stylu usera.

10. **`salary-negotiation-prep`** - market research + przygotowanie kontrofert, mniejszy priorytet ale latwy do dodania z istniejacego wzorca ResumeSkills.

**Uwaga architektoniczna:** `style-profiler` + `voice-writer` to prawdopodobnie najwazniejszy nowy modul - warto go zaprojektowac jako reużywalny w calym systemie (nie tylko do LinkedIn, ale tez do CV cover letter, maili, wszelkich tresci), tak zeby kazdy inny agent contentowy mogl "wpiac sie" pod istniejacy profil stylu usera zamiast pisac generycznie.

---

## Zrodla (zbiorczo)

- [OpenAI - Introducing shopping research in ChatGPT](https://openai.com/index/chatgpt-shopping-research/)
- [Bizway - Creative ChatGPT Prompts for Consumer Behavior and Purchase Decision Processes](https://www.bizway.io/blog/creative-chatgpt-prompts-for-consumer-behavior-and-purchase-decision-processes)
- [Juma - 28 ChatGPT Prompts for Market Research](https://juma.ai/blog/chatgpt-prompts-for-market-research)
- [Paramchoudhary/ResumeSkills (GitHub)](https://github.com/Paramchoudhary/ResumeSkills)
- [ResumeSkills - cover-letter-generator SKILL.md](https://github.com/Paramchoudhary/ResumeSkills/blob/main/skills/cover-letter-generator/SKILL.md)
- [NullSpace-BitCradle/ats-resume-agent (GitHub)](https://github.com/NullSpace-BitCradle/ats-resume-agent)
- [mcpmarket.com - Resume & Cover Letter Writer skill](https://mcpmarket.com/tools/skills/resume-cover-letter-writer)
- [Jasper Help Center - Brand Voice](https://help.jasper.ai/hc/en-us/articles/18618693085339-Brand-Voice)
- [Jasper blog - Introducing Brand Voice](https://www.jasper.ai/blog/introducing-brand-voice)
- [smartchoicelinks.com - Mastering Multi-Format AI Content Agents](https://www.smartchoicelinks.com/mastering-multi-format-ai-content-agents-the-production-grade-prompt/)
- [LinkedIn - How I built an AI Agent that creates and posts viral LinkedIn content](https://www.linkedin.com/pulse/how-i-built-ai-agent-creates-posts-viral-linkedin-content-de-jager-ovfke)
- [HyperWrite - AI Write in My Style](https://www.hyperwriteai.com/aitools/ai-write-in-my-style)
- [Junia AI - Free AI Ghostwriter](https://www.junia.ai/tools/ai-ghostwriter)
- [Oiti - AI Ghostwriter for LinkedIn](https://www.ghostwriting-ai.com/)
- [medium.com/aiforwriters - How to Clone Yourself with ChatGPT](https://medium.com/aiforwriters/how-to-clone-yourself-with-chatgpt-d58a6339e148)
- [Instacopy - How to Ghostwrite with AI](https://instacopy.ai/blog/how-to-ghostwrite-with-ai/)
- [Jeremy Morgan - Hey AI, Write Like Me](https://www.jeremymorgan.com/blog/generative-ai/hey-ai-write-like-me/)
- [smartpromptsforai.substack.com - 7 Prompts to Clone Your Writing Style](https://smartpromptsforai.substack.com/p/7-prompts-to-clone-your-writing-style)
- [pressmaster.ai - AI Writing Prompts for Consistent Brand Voice](https://www.pressmaster.ai/article/ai-writing-prompts-consistent-recognizable-brand-voice)
- [ligma.blog - The Way of the Voice in AI Prompts, A Field Guide](https://ligma.blog/post4/)
- [podglue.com - AI Voice Profile Guide](https://podglue.com/ai-voice-profile)
- [arXiv 2402.08855 - GhostWriter: Augmenting Collaborative Human-AI Writing Experiences](https://arxiv.org/pdf/2402.08855)
- [arXiv 2508.06374 - Evaluating Style-Personalized Text Generation: Challenges and Directions](https://arxiv.org/pdf/2508.06374)
- [arXiv 2603.23069 - AuthorMix: Modular Authorship Style Transfer via Layer-wise Adapter Mixing](https://arxiv.org/pdf/2603.23069)
- [ScienceDirect - Authorship style transfer with inverse transfer data augmentation](https://www.sciencedirect.com/science/article/pii/S2666651024000135)
