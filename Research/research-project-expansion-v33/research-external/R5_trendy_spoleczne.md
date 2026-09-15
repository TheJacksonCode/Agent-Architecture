# R5: Trendy spoleczne (X/social) w agentach AI

Data researchu: sierpien 2026. Zrodla: web search (brak bezposredniego dostepu do X/Twitter API w tym srodowisku - research oparty na artykulach, blogach tech i medium, ktore cytuja/relacjonuja watki i demo z X, plus strony produktowe startupow aktywnie promujacych sie na X).

## Kontekst i metoda

Pytanie badawcze dotyczylo czterech powiazanych obszarow: (1) orkiestracja agentow (agent orchestration), (2) agenci do pisania tresci (content-writing agents), (3) agenci nasladujacy styl konkretnej osoby ("personal voice/style copywriter"), (4) konsumenckie agenty badawcze (personal research agents, nie software-dev). Ponizej sekcje per trend/wzorzec, nastepnie "Kto to buduje", na koniec wnioski dla projektu Agent Architecture Designer.

---

## Trend 1: "Voice DNA" / klonowanie stylu pisania jako osobny prymityw

Najsilniej wybrzmiewajacy nowy wzorzec nazewniczy w 2026 to "Voice DNA" - nie jest to juz jeden prompt typu "pisz w moim stylu", tylko osobny artefakt: ustrukturyzowany profil (czesto plik markdown lub JSON) ekstrahowany z probek tekstu, ktory agent odczytuje przy kazdym zadaniu pisarskim. W ekosystemie Claude Code pojawily sie gotowe "Skills" pod nazwami takimi jak `voice-dna-creator`, `ghost-writer`, `voice-analyzer` publikowane na marketplace'ach skilli (LobeHub, mcpmarket.com) i w publicznych repo GitHub (np. `BayramAnnakov/founder-voice-ghostwriter`, `chichak/claude-code-starterkit` z folderem `.claude/skills/voice-dna/SKILL.md`). Mechanika jest spojna miedzy narzedziami: agent analizuje probki tekstu i wyciaga nie tylko to, co osoba pisze (rytm zdan, dobor slownictwa, ton, tiki jezykowe), ale rowniez czego unika - slowa, struktury i "poprawki", ktore AI normalnie by wprowadzilo, a ktore trzeba explicite zablokowac regulami override. To bezposrednio odpowiada na znany problem: model poproszony o wiecej niz ok. 2000 slow w cudzym glosie "przestaje brzmiec jak ta osoba i zaczyna brzmiec jak chatbot obslugi klienta z dyplomem creative writing" (cytat z artykulu o AI ghostwritingu, CEO Gotham Ghostwriters, poczatek 2026).

Ten sam wzorzec widac w narzedziach konsumenckich spoza Claude Code:
- **Oiti** (ghostwriting-ai.com) - czyta LinkedIn i strone www uzytkownika w 30 sekund i buduje "digital clone": kim jestes, w co wierzysz, profil glosu, filary marki, strategie tresci, bolaczki idealnego klienta (ICP).
- **Ghostwriter** (Glean AI Agent Library i inne) - "reverse-engineeruje" glos z probek pisania w reuzywalny profil.
- **Sudowrite** (fiction) - funkcja "Style Examples" trenuje wlasny model Muse na probkach prozy autora, tak by generowany tekst zachowywal kadencje i slownictwo; hasla marketingowe wprost brzmia "you remain the author, Sudowrite amplifies what makes your writing yours".

**Wniosek dla nazewnictwa presetow:** "Voice DNA" jako nazwa wzorca jest juz na tyle rozpoznawalna (osobne Skille, osobne playbooki na claudecodehq.com), ze warto rozwazyc agenta/preset o tej dokladnie nazwie zamiast ogolnego "copywriter" - to zwieksza szanse trafienia w istniejacy dyskurs wyszukiwan.

---

## Trend 2: Multi-agent jako odpowiedz na "AI slop" w ghostwritingu

Drugi powiazany trend to explicit framing multi-agentowosci jako remedium na jakosc, nie tylko na szybkosc. Artykul "AI Ghostwriting vs AI Slop: The Multi-Agent Fix" (artofthestart.com, 2026) opisuje przesuniecie od "jednego modelu w czarnej skrzynce" do "skoordynowanego zespolu specjalistow", gdzie glos (voice) jest pierwszoklasowym inputem, a nie afterthough. Typowy rozklad rol w takim pipeline: agent researchu (fakty/zrodla), agent draftu w konkretnym voice profile, agent redaktorski/linter sprawdzajacy zgodnosc ze stylem, agent factchecka. To dokladnie mapuje sie na wzorzec "Content Pipeline" / "Tech Writing Pipeline" juz obecny w architekturze Agent Architecture Designer, ale trend wskazuje, ze rynek explicite oczekuje kroku "voice/style QA" jako osobnej roli, nie jako czesci redaktora.

Ciekawostka spoleczna: paradoksalnie ten sam trend napedza kontr-narracje - "AI robi ghostwriterow bardziej wartosciowymi, nie mniej", bo klienci probuja podejscia AI-only, odkrywaja "problem glosu" i wracaja do ludzi, by to naprawic. To sugeruje, ze najlepiej pozycjonowany produkt to nie "AI zamiast ghostwritera" tylko "AI jako junior ghostwriter pod nadzorem czlowieka" - human-in-the-loop framing.

---

## Trend 3: "Agent swarms" w tresci i researchu (nie w software)

"Agent swarms" jako termin przeniosl sie z kontekstu inzynierskiego (swarm koderow) do kontekstu tworzenia tresci i researchu konsumenckiego. Konkretny, czesto cytowany przyklad: tworca contentu opisuje na Medium ("I Replaced My Entire Content Research Process With AI Agent Swarms"), jak z nocnego researchu po 200+ zrodlach dostaje rano: 40-stronicowy raport researchowy, 3000-slowowy blog post, karuzele na LinkedIn, watek na Twitterze (12 tweetow) i outline scenariusza na YouTube - wszystko z jednego uruchomienia swarmu. Podobny wzorzec opisany w kontekscie akademickim: 40 PDF-ow zaladowanych i przetworzonych przez 40 agentow skoordynowanych w jednym kroku merge, dajac 100 000-slowowy literature review z pelnym cytowaniem w mniej niz 20 minut.

Jezykowo, na X/Twitter i w blogach tech powtarzaja sie okreslenia: "agent swarms", "command and execute" (framing z 2026 - agent sam rozumie niuans trendujacego tematu i dostosowuje glos marki w czasie rzeczywistym), oraz nowe pojecie **"Persona Ecosystem"** - w kontekscie platform typu Moltbook (spoleczna siec zbudowana dla agentow AI), gdzie generuje sie i waliduje persony konwersacyjne na bazie dziesiatek tysiecy postow (cytowany paper: 41 300 postow uzytych do budowy person). To pokazuje, ze "persona" jako slowo kluczowe rozdwaja sie na dwa znaczenia: (a) persona jako glos konkretnej realnej osoby (voice cloning), (b) persona jako fikcyjny, zaprojektowany charakter agenta dzialajacego autonomicznie w sieci spolecznej.

Naduzycia: rownolegle rosnie niepokoj spoleczny wokol "syntetycznego consensusu" - jeden operator moze wdrozyc tysiace "glosow" AI, ktore wygladaja autentycznie i mowia jak lokalni mieszkancy, uruchamiajac miliony mikrotestow przekazow perswazyjnych. Ten watek (manipulacja/dezinformacja) pojawia sie regularnie w kontekscie AI-Twitter dyskursu o agent swarms i warto go miec na uwadze przy promowaniu presetow "social media agent" jako edukacyjny disclaimer, zgodnie z misja projektu (edukacja, nie tylko "jak zbudowac farme botow").

---

## Trend 4: Digital clones / "cyfrowe drugie ja" jako produkt konsumencki

Poza samym pisaniem, silny trend 2025-2026 to pelne "digital twins" - klony person eksperckich zdolne prowadzic rozmowy, spotkania, a nie tylko pisac teksty. Najczesciej cytowany przyklad: **Delphi** (delphi.ai, zalozone listopad 2022 przez Dara Ladjevardiana i Sama Spelsberga). Delphi pozwala ekspertom tworzyc interaktywne cyfrowe awatary odzwierciedlajace ich sposob mowienia i myslenia, wdrazane na stronach www, w Slacku, przez telefon. Wspolzalozyciel Delphi trenowal wlasny klon do prowadzenia spotkan w jego imieniu - klienci uznawali to za "charming gimmick", a nie oszustwo, bo bylo transparentnie oznaczone. Od beta w grudniu 2023 platforma wygenerowala ponad 5 mln USD przychodu z subskrypcji, z ponad 150 ekspertami. Prognoza wspolzalozyciela: rok 2026 to "tipping point" adopcji cyfrowych klonow.

Powiazany news z CES 2026 (Euronews): oprogramowanie tworzace cyfrowe klony pracownikow zostalo pokazane publicznie - przesuniecie z "klon eksperta/influencera" do "klon pracownika firmowego" jako kolejna fala.

**Wniosek:** to inny poziom abstrakcji niz "voice DNA do pisania" - Delphi-style klony to pelnoprawny konwersacyjny agent-persona, nie tylko generator tekstu. Dla Agent Architecture Designer to potencjalny nowy typ agenta/presetu: "Digital Twin / Expert Clone" jako osobna kategoria od "Ghostwriter".

---

## Trend 5: Konsumenckie agenty badawcze (personal research, nie dev)

W obszarze "personal research agent" (nie software) dominuja trzy narracje:

1. **NotebookLM -> "Gemini Notebook"** (Google, przemianowany 16 lipca 2026) - z "pasywnego asystenta" na "aktywnego agenta". Aktualizacja z 8 czerwca 2026 (Gemini 3.5 + Antigravity) dala NotebookLM zdolnosc budowania repozytorium zrodel z luznych pomyslow (nie tylko analizy gotowego zestawu), wlasny "bezpieczny komputer w chmurze" per notatnik do pisania i wykonywania kodu, oraz eksport do wykresow, PDF, arkuszy, plikow danych i PowerPointa. Wedlug Google Trends, NotebookLM/Gemini Notebook jest juz popularniejsze wyszukiwaniowo niz sam Gemini - silny sygnal masowej, konsumenckiej adopcji narzedzia badawczego.

2. **Perplexity** pozostaje punktem odniesienia dla "cited research agent" (Pro Search do wieloetapowych zapytan badawczych z linkami zrodlowymi) - ale to juz "stary" gracz, mniej nowosciowy w dyskursie 2026.

3. **Manus AI i Genspark** - agenty typu "super agent" / "general AI agent", ktore w 2025 (Manus) i 2026 (Genspark) staly sie punktem odniesienia w porownaniach na X i blogach tech. Genspark uzywa architektury "Mixture-of-Agents": centralny orchestrator rozklada zadanie na podzadania i routuje do 8-9 wyspecjalizowanych modeli wspieranych przez 80+ zintegrowanych narzedzi. W demo Genspark planuje 5-dniowa podroz, liczy dystanse piesze, mapuje transport publiczny i uzywa agenta glosowego do dzwonienia i rezerwacji restauracji z uwzglednieniem alergii pokarmowych. Manus vs Genspark to regularnie cytowany "battle" w artykulach porownawczych (wynik GAIA benchmark: Genspark 87.8% vs Manus 86%), co samo w sobie jest wzorcem spolecznym - publiczne "agent battles" jako format contentu napedzajacego dyskusje.

---

## Kto to buduje (mapa graczy)

| Kategoria | Gracz | Co robi | Status/sygnal |
|---|---|---|---|
| Voice cloning / ghostwriting | **Oiti** (ghostwriting-ai.com) | Klon glosu z LinkedIn+www w 30s, posty LinkedIn w Twoim glosie | Produkt komercyjny, aktywne marketing |
| Voice cloning / ghostwriting | **Delphi** | Pelne "digital minds" ekspertow - chat + glos, wdrazane wszedzie | $2.7M funding, $5M+ revenue z subskrypcji, 150+ ekspertow |
| Fiction / creative writing | **Sudowrite** (model wlasny "Muse") | Voice-preserving fiction writing, Canvas 2.0 z agentami do planowania fabuly | Ugruntowany gracz, ceny 10-44 USD/mies |
| Claude Code ecosystem | Spolecznosc OSS (LobeHub, mcpmarket, GitHub indie devs) | Skille "voice-dna-creator", "ghost-writer", "voice-analyzer" | Rosnaca liczba publicznych repo/skilli, bottom-up trend |
| General/super agent | **Manus AI** | Pisze kod, wdraza aplikacje, przegladarka, dziala przez Telegram/WhatsApp/LINE/Slack bez nadzoru | "Breakout hit 2025" wg wielu zrodel |
| General/super agent | **Genspark** | Mixture-of-Agents orchestrator, 8-9 modeli, 80+ narzedzi, prezentacje/dokumenty/dzwonienie | Aktywnie porownywany z Manus w 2026 |
| Personal research | **Google NotebookLM / Gemini Notebook** | Agentic research: budowa zrodel, kod w chmurze, eksport wielu formatow | Rebranding lipiec 2026, popularniejsze niz Gemini w Trends |
| Personal research | **Perplexity** | Cited multi-step research | Ugruntowany, punkt odniesienia |
| Social/persona agents | **NotPeople.ai** | "AI agents for X, Threads & Reddit. Your voice, your approval" | Nowy produkt z explicit human-approval framing |
| Persona ecosystems (research) | Akademicki - Persona Ecosystem Playground na Moltbook | Generowanie/walidacja person konwersacyjnych z postow agentow | Publikacja naukowa (arXiv 2026), sygnal ze temat "AI personas on AI social networks" wchodzi do akademii |
| Enterprise assistant | **Lindy**, **Naoma** | Kolaps email/kalendarz/CRM w jeden layer asystenta; demo produktow B2B z voice w 33 jezykach | Cytowane jako #1 w rankingach startupow asystenckich 2026 |

---

## Nazwy wzorcow zdobywajace popularnosc (slownik trendow)

- **Voice DNA** - najbardziej "swiezy" i konkretny termin, juz zaadaptowany jako nazwa Skilli w ekosystemie Claude Code.
- **Digital clone / digital twin / digital mind** - uzywane zamiennie dla pelnych konwersacyjnych klonow osob (Delphi).
- **Agent swarms** - przeniesione z dev-swarms do content/research swarms, silnie kojarzone z "overnight batch output" (raporty rano po nocnym uruchomieniu).
- **Mixture-of-Agents** - terminologia architektoniczna od Genspark, konkuruje z prostszym "orchestrator + subagents".
- **Command and Execute** - nowy framing dla agentow social media, ktore same rozumieja kontekst trendu i dzialaja bez mikrozarzadzania.
- **Persona Ecosystem** - termin z pogranicza akademii i social media, dla agentow-postaci dzialajacych na platformach zbudowanych dla AI (np. Moltbook).
- **AI slop** - negatywny termin-kontrapunkt, uzywany do uzasadnienia potrzeby multi-agentowego, voice-aware podejscia zamiast jednego promptu.
- **Human-in-the-loop / "your voice, your approval"** - kontr-trend do pelnej autonomii, widoczny explicit w produktach typu NotPeople.ai jako odpowiedz na obawy o utrate kontroli i wiarygodnosc.

---

## Wnioski dla Agent Architecture Designer (v33)

1. **Nowa kategoria agenta: "Voice DNA Writer" / "Ghostwriter Agent"** - rynek juz uzywa dokladnie tej nazwy jako osobnego prymitywu (nie generycznego "copywritera"). Warto rozwazyc agenta ktory (a) ekstrahuje profil stylu z probek tekstu do reuzywalnego artefaktu, (b) ma explicit "unikaj X / nie poprawiaj Y" reguly, (c) jest oddzielony od agenta faktow/researchu.

2. **Preset "Voice QA" jako osobna rola** - trend multi-agentowego ghostwritingu explicite wyroznia agenta walidujacego zgodnosc stylu (nie tylko gramatyke/redakcje). To dobrze pasuje do istniejacego wzorca "Content Pipeline" - mozna dodac krok "voice-consistency checker".

3. **Nowa kategoria presetu: "Digital Twin / Expert Clone"** - inspirowana Delphi, dla scenariuszy konwersacyjnych (nie jednorazowy tekst, ale trwaly, odpytywalny "klon" wiedzy/glosu osoby). To wieksza roznica architektoniczna niz zwykly ghostwriter - wymaga pamieci/kontekstu persystentnego.

4. **Human-in-the-loop jako explicit selling point** - biorac pod uwage obawy spoleczne o "syntetyczny consensus" i botfarmy, kazdy preset typu "social media agent" / "swarm" w projekcie edukacyjnym powinien miec wyrazny opis roli czlowieka (approval gate), zgodnie zreszta z duchem projektu (edukacja o tym "jak to dziala i ile kosztuje", a nie "jak zautomatyzowac boty").

5. **"Agent swarms for research" jako demo-case** - overnight batch: research -> raport -> multi-format output (blog, LinkedIn carousel, Twitter thread, video script) to bardzo silny, konkretny i "sprzedawalny" edukacyjnie scenariusz uzycia istniejacego presetu typu Content Pipeline / Deep Research - mozna go uzyc jako przykladowy user story w dokumentacji v33.

6. **Terminologia do uzycia w opisach PL/EN** - "Voice DNA", "digital twin/clone", "agent swarm", "persona" - to slowa kluczowe ktore realnie funkcjonuja w dyskursie 2026 i moga zwiekszyc trafnosc SEO/rozpoznawalnosci projektu, jesli zostana uzyte w nazwach lub opisach nowych agentow/presetow.

---

## Zrodla

- [AI Ghostwriting vs AI Slop: The Multi-Agent Fix](https://artofthestart.com/ai-ghostwriting-multi-agent-writing/)
- [GitHub - BayramAnnakov/founder-voice-ghostwriter](https://github.com/BayramAnnakov/founder-voice-ghostwriter)
- [AI Ghostwriter for LinkedIn — Posts in Your Voice | Oiti](https://www.ghostwriting-ai.com/)
- [Ghostwriter agent | Glean AI Agent Library](https://www.glean.com/agent-library/ghostwriter)
- [Voice DNA: Clone Your Writing Style | Claude Code Playbooks](https://www.claudecodehq.com/playbooks/voice-dna-writing-clone)
- [voice-dna-creator | Skills Marketplace · LobeHub](https://lobehub.com/skills/az9713-ai-co-writing-claude-skills-voice-dna-creator)
- [Voice Analyzer: Claude Code Skill for Writing Style Analysis](https://mcpmarket.com/tools/skills/voice-analyzer-1)
- [ghost-writer | Skills Marketplace · LobeHub](https://lobehub.com/skills/robertguss-claude-code-toolkit-ghost-writer)
- [Voice DNA Creator | Claude Code Skill for Authentic AI Writing](https://mcpmarket.com/tools/skills/voice-dna-creator)
- [claude-code-starterkit voice-dna SKILL.md](https://github.com/chichak/claude-code-starterkit/blob/main/.claude/skills/voice-dna/SKILL.md)
- [The Claude Skills That Finally Made AI Write Like Me](https://aiblewmymind.substack.com/p/claude-skills-ai-write-like-you)
- [I Replaced My Entire Content Research Process With AI Agent Swarms | Medium](https://medium.com/@alexrozdolskiy/i-replaced-my-entire-content-research-process-with-ai-agent-swarms-174caf81bc44)
- [AI agents for social media: a no-hype guide for 2026](https://www.admove.ai/blog/ai-agents-for-social-media-guide)
- [Worried About AI? Try AI Swarms. | Kim Bellard, Medium](https://kimbellard.medium.com/worried-about-ai-try-ai-swarms-b5da370f5faa)
- [NotPeople — AI agents for X, Threads & Reddit](https://notpeople.ai/)
- [How to Run 300 AI Agents From One Prompt | YouMind](https://youmind.com/landing/x-viral-articles/run-300-ai-agents-prompt)
- [US Startup Delphi Launches AI Digital Clone Service](https://www.aibase.com/news/1187)
- [How Delphi leverages AI to create digital clones of thought leaders | AssemblyAI](https://www.assemblyai.com/customers/delphi-customer-story)
- [You can now make an AI clone of yourself — or anyone else — with Delphi | VentureBeat](https://venturebeat.com/ai/you-can-now-make-an-ai-clone-of-yourself-or-anyone-else-living-or-dead-with-delphi)
- [AI software that can create digital clones of employees unveiled at CES 2026 | Euronews](https://euronews.com/next/2026/01/07/ai-software-that-can-create-digital-clones-of-employees-unveiled-at-ces-2026)
- [Genspark AI Super Agent Review 2026](https://www.allaboutai.com/ai-reviews/genspark/)
- [Genspark's Super Agent ups the ante in the general AI agent race | VentureBeat](https://venturebeat.com/ai/gensparks-super-agent-ups-the-ante-in-the-general-ai-agent-race)
- [Manus AI vs Genspark AI: Which Agent Actually Gets the Work Done?](https://discover.oreateai.com/discover/manus-ai-vs-genspark-ai-which-agent-actually-gets-the-work-done)
- [NotebookLM Update June 8, 2026: Agentic Research, Gemini 3.5](https://nerova.ai/news/google-notebooklm-june-8-2026-agentic-research-update)
- [NotebookLM in 2026: What Changed and What Matters | Jeff Su](https://www.jeffsu.org/notebooklm-changed-completely-heres-what-matters-in-2026/)
- [Sudowrite Review 2026: Best AI for Fiction Writers?](https://computertech.co/sudowrite-review/)
- [Best AI for Creative Writing in 2026: Tested and Compared | Sudowrite](https://sudowrite.com/blog/best-ai-for-creative-writing-in-2026-tested-and-compared/)
- [The Best AI Personal Assistants of 2026 | Mastra Blog](https://mastra.ai/blog/best-personal-ai-assistants-in-2026)
- [AI Agents for Content Creation: 2026 Buyer's Guide | Naturaily](https://naturaily.com/blog/ai-agents-for-content-creation)
