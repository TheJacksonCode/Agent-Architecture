# RR6: Brief faktyczny (odpowiedzi na pytania Macieja)

Data researchu: 21 sierpnia 2026. Metoda: WebSearch + WebFetch (arXiv abstrakty). Bez em-dashy.

---

## 1. Google ADK (Agent Development Kit) v2.0 - graph-based execution engine

**Data GA:** Google ADK osiagnal general availability 19 maja 2026, a wariant **ADK Go 2.0** dostal osobne GA 30 czerwca 2026. To wlasnie wydanie 2.0 wprowadza nowy silnik.

**Czy przeszedl na graph-based execution (jak LangGraph): TAK.** Kluczowa zmiana w 2.0 to **Workflow Runtime** - silnik wykonania oparty na grafie. ADK przechodzi z modelu "hierarchicznego executora agentow" na model, w ktorym agenci, narzedzia i funkcje sa **wezlami (nodes) w grafie workflow**. Runtime wspiera: routing, fan-out/fan-in, petle, retry, zarzadzanie stanem, wezly dynamiczne, human-in-the-loop oraz zagniezdzone workflow. ADK 2.0 jest w duzej mierze kompatybilny wstecz z 1.x, ale ma kilka breaking changes.

**Czym rozni sie model grafowy od "orchestrator wywoluje subagentow" (Claude Code Task tool):**
- Model grafowy = **deklaratywny graf przeplywu**. Definiujesz z gory wezly i krawedzie (kto po kim, warunki, petle, punkty HITL). Runtime egzekwuje deterministyczny przeplyw, potrafi wznawiac stan, robic retry pojedynczego wezla, pauzowac na czlowieka. Kontrola jest w strukturze grafu.
- Model orchestrator+subagenci (Claude Code) = **imperatywny/dynamiczny**. Orchestrator (LLM) w czasie dzialania decyduje kogo wywolac przez Task tool, zbiera wynik, decyduje o kolejnym kroku. Elastyczne, ale mniej deterministyczne, brak wbudowanego state-checkpointu na poziomie grafu.

**Inspiracja dla wlasciciela projektu:** graf daje deterministyczne retry/resume, jawne bramy HITL i widoczne fan-out/fan-in - to warto podejrzec dla pipeline'ow, ktore maja byc powtarzalne i audytowalne (np. Deep Five Minds). Model dynamicznego orchestratora zostaje lepszy tam, gdzie sciezka nie jest znana z gory.

**Zrodla:**
- Oficjalny blog Google (ADK Go 2.0): https://developers.googleblog.com/announcing-adk-go-20/ (30.06.2026)
- Dokumentacja ADK 2.0: https://adk.dev/2.0/ oraz https://github.com/google/adk-docs/blob/main/docs/2.0/index.md
- LangGraph (porownanie graph orchestration): https://www.langchain.com/langgraph

---

## 2. arXiv 2606.10296 "The Confident Liar" (multi-agent debate, log-probs + LLM-as-Judge)

**Data:** 9 czerwca 2026. Tytul: "The Confident Liar: Diagnosing Multi-Agent Debate with Log-Probabilities and LLM-as-Judge".

**Jaki problem diagnozuja (prostym jezykiem):** systemy multi-agent debate ocenia sie zwykle tylko po tym, czy koncowa odpowiedz jest poprawna. Nikt nie sprawdza **jakosci samego rozumowania po drodze** - a to wlasnie debata ma poprawiac. Autorzy lacza trzy sygnaly: pewnosc modelu na poziomie tokenow (log-prob), ocene jakosci przez LLM-sedziego i realna trafnosc zadania. Testuja na trzech domenach: ocena wg rubryki, rozumowanie matematyczne, QA faktyczne.

**Glowny failure mode:** **"pewny klamca"** - asymetria rol. Agent typu **Constructor** ma silny zwiazek miedzy pewnoscia a jakoscia rozumowania (wykrywanie bledow AUROC ~0.804). Agent typu **Auditor** (ten co ma kwestionowac) ma ten zwiazek slaby (AUROC ~0.634). Innymi slowy: **pewnosc Auditora prawie nic nie mowi o tym, czy on ma racje** - potrafi byc bardzo pewny i bledny. Nie mozna ufac pewnosci agenta krytykujacego jako sygnalowi jakosci.

**Mitygacje:** proponuja framework diagnostyczny - dwuagentowa debata + LLM-as-judge oceniajacy trzy wymiary: przestrzeganie instrukcji, jakosc uzasadnienia i ugruntowanie w dowodach. Zalecaja szersze badania cross-domenowe nad asymetria pewnosci zaleznie od roli. To bardziej narzedzie diagnozy niz gotowa lata.

**Zrodlo:** https://arxiv.org/abs/2606.10296 (9.06.2026)

---

## 3. arXiv 2606.03032 "The Deliberative Illusion" (factual attrition + stance homogenization)

**Data:** 2 czerwca 2026. Tytul: "The Deliberative Illusion: Diagnosing Factual Attrition and Stance Homogenization in Multi-Agent LLM Deliberation".

**Factual attrition (utrata faktow) - prostym jezykiem:** w miare jak agenci "dyskutuja", stopniowo **gubia fakty istotne dla sprawy**. Wspolny kontekst sie kurczy. Badanie pokazuje, ze dyskusja potrafi wymazac **do 72% kluczowych faktow** w testowanych scenariuszach, a to co zostaje moze zniekształcac obraz problemu.

**Stance homogenization (homogenizacja stanowisk / groupthink):** **rozne poczatkowe opinie zapadaja sie w jeden konsensus.** Agenci dochodza do zgody, ale ta zgoda to zludzenie - koncowe stanowiska nadal sa napedzane poczatkowymi biasami modelu, a legalne rozbieznosci znikaja. Efekt: system "wyglada" jakby przemyslal sprawe (deliberative illusion), a naprawde stracil wiedze i roznorodnosc zdania.

**Dodatkowe ryzyko:** wystarczy **jeden zlosliwy agent**, by wstrzyknac dezinformacje do kurczacego sie wspolnego kontekstu - reszta ja przejmuje.

**Co autorzy radza:** przestac oceniac deliberacje tylko po tym, czy osiagnieto konsensus. Trzeba mierzyc **ktore fakty, niepewnosci i uzasadnione rozbieznosci przetrwaly interakcje** - czyli protokoly ewaluacji sledzace zachowanie informacji, nie tylko zgode koncowa.

**Praktyczny wniosek dla projektu Macieja:** to mocny argument za rola typu Devil's Advocate / krytyka, ktory pilnuje zachowania faktow i rozbieznosci w pipeline'ach debatowych (Five Minds, Deep Five Minds).

**Zrodlo:** https://arxiv.org/abs/2606.03032 (2.06.2026)

---

## 4. Mockin - toolkit kariera/interview dla projektantow UX/UI

**Co to jest:** profesjonalny **AI career toolkit dla projektantow UX/UI i Product Designer**. Rdzen to **AI mock-interview simulator** (symulator rozmowy kwalifikacyjnej), dostepny w 7 jezykach. Opisywany szeroko okolo poczatku maja 2026, #1 Product of the Day na Product Hunt, ponad 15 000 projektantow uzyло narzedzia.

**Funkcje:**
- **Mock interviews** oparte na NLP - ponad 200 pytan branzowych (od behawioralnych po techniczne wyzwania designerskie). Kluczowe: nie zadaje sztywnej listy pytan, tylko **mysli i dopytuje na podstawie twoich odpowiedzi** (follow-up).
- **Feedback w czasie rzeczywistym** - ocenia tresc, jasnosc, strukture i design thinking.
- **Ocena CV i portfolio.**
- **Optymalizacja profilu LinkedIn.**
- **Job matching** (dopasowanie ofert).

**Czy to AI mock-interview:** tak, to rdzen produktu, plus szersza otoczka kariery (CV, portfolio, LinkedIn, oferty).

**URL:** https://mockin.work/ (Product Hunt: https://www.producthunt.com/products/mockin-for-product-designers). Data opisu: ok. 3 maja 2026.

---

## 5. Oiti - "AI Ghostwriter for LinkedIn, Posts in Your Voice"

**Co robi:** **AI ghostwriter wylacznie dla LinkedIn**, zaprojektowany pod nowy algorytm LinkedIn. Projektuje, pisze i **planuje/publikuje posty w twoim glosie**, uczac sie z twoich edycji. Publikuje przez oficjalne API LinkedIn.

**Jak dziala model "w twoim glosie" (na podstawie czego uczy sie stylu):**
- W ok. 30 sekund **czyta twoj profil LinkedIn i strone WWW** i buduje **"digital clone"**: kim jestes, w co wierzysz, profil glosu (voice profile), filary marki (brand pillars), strategia tresci i bolaczki ICP (idealnego odbiorcy).
- Dziala na **long-term memory** - kazdy kolejny post ma byc lepszy, bo model uczy sie z twojego feedbacku i poprawek.
- Dodatkowo: znajduje trendujace newsy w niszy, generuje pytania i "viral angles", tworzy infografiki do postow.

**Model biznesowy:** SaaS subskrypcyjny, **49-79 USD/miesiac**, 7-dniowy trial. Deklaruje 1263+ tworcow.

**URL:** https://www.ghostwriting-ai.com/ (oficjalna nazwa "Oiti"). Kontekst 2026.

---

## 6. Bloomberry - AI personal brand platform ("best 2026")

**Co to jest:** **platforma personal branding oparta na AI**, ktora uczy sie jak piszesz i zamienia **jeden pomysl w posty na LinkedIn, watki na X i artykuly blogowe - w twoim glosie**. Pozycjonuje sie dla founderow, operatorow i executives, ktorzy chca skalowac tresci bez ghostwritera/agencji PR. Zapowiada tez przejscie na **open source**.

**Architektura uczenia sie glosu (kluczowe rozroznienie dla Macieja):** Bloomberry analizuje **caly korpus twoich istniejacych tresci, nie tylko kilka probek** - buduje **voice model**, ktory zapisuje: wzorce zdaniowe, preferencje slownictwa, sygnatury tonalne i nawyki strukturalne (kadencja, struktura). Ten voice model jest potem warstwa ksztaltujaca kazda generacje, wiec glos zostaje spojny post po poscie. To roznica wobec narzedzi uczacych sie z paru probek (Oiti startuje z profilu + WWW; Bloomberry akcentuje pelny body of work).

**Funkcje:** generacja cross-platform (LinkedIn, X, long-form), "format intelligence" (co dziala na LinkedIn) polaczone z voice-aware generation, pamiec kontekstu, zachowanie glosu.

**URL:** https://www.bloomberry.ai/ (kontekst rankingow "best 2026", np. https://www.bloomberry.ai/blog/best-ai-personal-branding-2026).

---

## 7. OpenAI / ChatGPT jako platforma kariery

Trzeba rozdzielic **dwie rzeczy**:

**A) Funkcja w ChatGPT - juz wprowadzona (czerwiec 2026):** ChatGPT dziala teraz jako **wyszukiwarka ofert pracy + edytor CV**.
- **Job search:** pokazuje **na zywo oferty pracy i zlecenia freelance** ze zrodel takich jak Indeed, Upwork, Appcast i z sieci; wyniki personalizowane wg doswiadczenia, umiejetnosci i celow uzytkownika.
- **CV/resume:** mozna wgrac lub stworzyc CV w ChatGPT, dopasowac je do konkretnej roli i pobrac w dopracowanym formacie.
- **Zasieg:** wyszukiwanie ofert **poczatkowo tylko USA** (plany Free, Go, Plus, Pro). Narzedzie do CV - **globalnie, po angielsku, przez web, wszystkie plany.**

**B) Osobna "OpenAI Jobs Platform" - zapowiedziana, jeszcze nie wystartowala:** samodzielny marketplace hiringowy (konkurent LinkedIn/Indeed), dopasowujacy kandydatow po **udowodnionych kompetencjach AI**, a nie slowach kluczowych w CV. Cel: **do polowy 2026** - ale **wg stanu na sierpien 2026 termin przesunieto**: brak public beta, brak waitlisty, brak nowej daty. Powiazany program **certyfikacji "AI Foundations"** (badge przez Credly/Pearson).

**Zrodla:**
- OpenAI robi z ChatGPT platforme kariery (job search + CV): https://the-decoder.com/openai-turns-chatgpt-into-a-career-platform-with-job-search-and-cv-editor/ (czerwiec 2026)
- Live job search via Indeed/Upwork: https://aiweekly.co/alerts/chatgpt-gains-live-job-search-via-indeed-and-upwork
- Zapowiedz standalone platformy (mid-2026): https://campustechnology.com/articles/2025/09/10/openai-to-launch-ai-powered-jobs-platform-by-mid-2026.aspx

---

*Uwaga o pewnosci: sekcje 2 i 3 opieraja sie na abstraktach arXiv pobranych przez WebFetch (liczby jak 72% i wartosci AUROC pochodza z abstraktow). Daty ADK potwierdzone przez oficjalny blog Google i adk.dev. Sekcje 4-7 opieraja sie na stronach produktowych i pokryciu medialnym z 2026 - dane marketingowe (ceny, liczby uzytkownikow) moga sie zmieniac.*
