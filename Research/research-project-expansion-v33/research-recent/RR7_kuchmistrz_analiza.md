# RR7: Kuchmistrz - analiza rynku i rekomendacje

Data: 21 sierpnia 2026
Typ: research zewnetrzny (skan rynku) + ocena pomyslu usera + rekomendacja architektury agenta/presetu
Kontekst: user rozwaza dodanie agenta/presetu kulinarnego "kuchmistrz" do systemu Agent Architecture (v33). Poni, ej ocena co juz istnieje na rynku, co z tego czerpac, i jak to zaprojektowac jako agenta Claude Code (skill / preset), a nie jako osobna aplikacje.

---

## Skan rynku (tabela)

Ponizej porownanie glownych rozwiazan wzgledem 6 wymiarow, ktore user uznaje za wazne: (1) start od skladnikow z lodowki, (2) nauka gustu uzytkownika, (3) nowe potrawy w podziale na kategorie, (4) filtr trudnosci, (5) rozroznienie czasu AKTYWNEGO od CALKOWITEGO, (6) research/wyszukiwanie nowych przepisow.

| Produkt | Start od skladnikow (fridge-to-table) | Nauka gustu | Filtr trudnosc | Filtr czas | Czas AKTYWNY vs CALKOWITY | Czego brakuje wzgledem pomyslu usera |
|---|---|---|---|---|---|---|
| **SuperCook** | Tak, rdzen produktu. Pantry glosowe + 2000 skladnikow, dopasowuje przepisy tak by zuzyc jak najwiecej tego co masz. 11 mln przepisow z 18 tys. stron, 20 jezykow. | Slabo. Filtry po typie posilku/kuchni/wykluczeniach, ale bez uczenia sie gustu w czasie. | Ograniczony | Podstawowy (typ posilku) | **Nie** | Brak personalizacji uczacej sie, brak rozroznienia czasu pracy vs tla, brak "nowosci" celowo dobieranej. |
| **Samsung Food (dawniej Whisk)** | Czesciowo. AI moze wkomponowac skladniki "in-stock", ale start nie jest od lodowki jak w SuperCook. | Tak, najlepsza w zestawie. Rekomendacje z danych zdrowotnych, preferencji dietetycznych, ulubionych kuchni; Food AI przerabia przepis (wersja wegan, fusion, zmiana skill level/czasu). | Tak (mozna zmienic skill level przepisu) | Tak (mozna zmienic cook time) | **Nie** (jest cook time, ale nie rozdziela pracy aktywnej od tla) | Nie startuje czysto od lodowki; brak twardego rozroznienia czasu aktywnego. Zamkniety ekosystem Samsung/SmartThings. |
| **Mealime** | Nie. Planer tygodniowy oparty na preferencjach, nie na aktualnej zawartosci lodowki. | Czesciowo. Onboarding: diety, alergie, ~100 nielubianych skladnikow (twarde wykluczenia), ale to statyczny profil, nie uczenie z zachowania. | Tak (przepisy "approachable", filtr <30 min) | Tak (filtr czasu gotowania) | **Nie** | Brak startu od lodowki; profil statyczny nie uczy sie z ocen; brak czasu aktywnego. |
| **Paprika** | Czesciowo (pantry sledzi co masz + daty waznosci), ale nie generuje przepisow z lodowki. | Nie. To manager przepisow, nie rekomender. | Nie | Sortowanie po czasie tylko jesli przepis ma metadane | **Nie** | To organizer, nie doradca. Planowanie posilkow bardzo podstawowe (kalendarz + notatki). Zero AI-rekomendacji. |
| **ChatGPT / Gemini / Claude (recipe assistant)** | Tak, jesli podasz skladniki w prompt. Elastyczny generator. | **Slabo strukturalnie.** Zapomina preferencje miedzy czatami; pamiec ogolna, opt-in, limitowana. Trzeba tlumaczyc "bez cebuli" za kazdym razem. | Tak (opisowo) | Tak (opisowo) | **Tak, ale tylko jesli wprost poprosisz** (LLM potrafi rozdzielic, ale nie robi tego domyslnie ani spojnie) | Brak trwalej struktury gustu, brak twardych regul (alergie jako hard rule), niespojnosc miedzy sesjami. |
| **Cook Smarts** | Nie (kuratorowane plany tygodniowe). | Nie (kuracja redakcyjna). | Tak | **Tak, i to mocno** | **Czesciowo tak** - projektowa zasada: "active hands-on time" kazdego dania < 30 min, tag "Quick and Easy". | Nie startuje od lodowki; brak personalizacji AI; czas aktywny to zasada redakcyjna, nie filtrowalny wymiar per przepis. |
| **Serious Eats (redakcja)** | Nie. | Nie. | Nie (opisowo) | Tak | **Tak, jawnie** - przepisy podaja "Active time" i "Total time" osobno (np. samosa: total 2h40m, active 1h40m). | To baza przepisow, nie narzedzie personalizacji; brak startu od lodowki; brak filtra po active time. |
| **Wyspecjalizowane AI (RecipePT, MealThinker, Pann, WeeknightChef)** | Czesciowo. | Tak, to ich USP - budowane wlasnie po to, by pokonac zapominanie ChatGPT: trzymaja alergie jako twarda regule i ucza sie z tego co oceniasz i gotujesz. | Tak | Tak (WeeknightChef: constraints czasowe, preset "Quick Meals") | **Nie jako osobny filtr** | Zadne nie wystawia czasu aktywnego jako pierwszoklasowego, filtrowalnego wymiaru. |

Zrodla do tabeli:
- SuperCook: https://www.supercook.com/ , https://play.google.com/store/apps/details?id=com.supercook.app , https://www.producthunt.com/products/supercook
- Samsung Food / Whisk: https://news.samsung.com/global/samsung-announces-global-launch-of-samsung-food-an-ai-powered-personalized-food-and-recipe-service , https://mealthinker.com/blog/samsung-food-alternative
- Mealime: https://www.plantoeat.com/blog/2023/04/mealime-app-review-pros-and-cons/ , https://apps.apple.com/us/app/mealime-meal-plans-recipes/id1079999103
- Paprika: https://www.paprikaapp.com/ , https://www.plantoeat.com/blog/2023/07/paprika-app-review-pros-and-cons/
- ChatGPT jako recipe assistant: https://recipept.com/blog/chatgpt-meal-planner-doesnt-remember-preferences/ , https://mealthinker.com/blog/chatgpt-vs-meal-planning-app
- Cook Smarts: https://www.cooksmarts.com/ , https://www.cooksmarts.com/weekly-meal-planner/pricing-features/
- Serious Eats (active/total time): https://smallpantry.substack.com/p/interpreting-cook-times-in-recipes
- WeeknightChef: https://apps.apple.com/mx/app/weeknightchef/id6757376319

### Kluczowa weryfikacja: czy ktokolwiek rozdziela czas AKTYWNY od CALKOWITEGO?

To jest sedno pytania usera, bo uwaza to za swoj wyroznik. Werdykt: **user ma w duzej mierze racje, to faktycznie rzadkie jako FUNKCJA, choc nie jest zupelnie nowym pojeciem.**

Trzeba rozdzielic trzy poziomy:

1. **Pojecie istnieje w swiecie redakcyjnym.** Serious Eats jawnie drukuje "Active time" i "Total time" osobno przy przepisach (https://smallpantry.substack.com/p/interpreting-cook-times-in-recipes). Cook Smarts opiera caly produkt na zasadzie "active hands-on time < 30 min" (https://www.cooksmarts.com/). Wiec jako koncepcja edytorska to jest znane i uzywane.

2. **Standard danych go NIE ma.** schema.org/Recipe, ktory karmi wiekszosc wyszukiwarek i importerow przepisow, ma tylko `prepTime`, `cookTime`, `totalTime`. Nie ma pola `activeTime` ani `handsOnTime`. Google zaleca podawac prepTime i cookTime osobno "bo uzytkownik moze chciec wiedziec ile jest aktywnej pracy vs pieczenia/odpoczywania", ale to obejscie, nie dedykowane pole (https://developer.yoast.com/features/schema/pieces/recipe/ , https://developers.google.com/gmail/markup/reference/types/Recipe). Efekt: nawet gdy przepis ma dane, "czas aktywny" jest zwykle niedostepny maszynowo.

3. **Zadna z mainstreamowych appek nie wystawia czasu aktywnego jako osobnego, FILTROWALNEGO wymiaru.** SuperCook, Mealime, Samsung Food, Paprika filtruja po jednym czasie (zwykle total lub cook). Cook Smarts trzyma active time jako zasade redakcyjna, nie jako slider per danie. Nikt nie pozwala powiedziec "pokaz mi dania z max 10 min pracy rak, ale total moze byc 2h".

**Wniosek:** rozroznienie active/total jako pojecie nie jest wynalazkiem usera, ale jako **filtrowalna, per-danie os decyzyjna w narzedziu rekomendujacym** jest luka rynkowa. To jest realny, obronialny wyroznik, pod warunkiem ze agent potrafi ten czas oszacowac (bo dane zrodlowe go czesto nie zawieraja - patrz sekcja o trudnosciach).

---

## Wzorce do zaczerpniecia

Z ktorych rozwiazan i JAK czerpac przy projektowaniu naszego agenta:

1. **SuperCook - model "pantry-first" i maksymalizacja pokrycia.** Wzorzec: user podaje liste skladnikow, agent dobiera dania tak, by zuzyc jak najwiecej tego co jest, a wyraznie oznacza czego brakuje. Do zaczerpniecia wprost: kazda propozycja powinna miec sekcje "masz wszystko / brakuje X, Y" oraz rozroznienie usera na "brak = latwo dostepny w sklepie" vs "brak = rzadka wyprawa". SuperCook tego drugiego nie robi, wiec to nasza przewaga. Zrodlo: https://www.supercook.com/

2. **Samsung Food - transformacja przepisu przez AI.** Wzorzec: nie tylko znajdz przepis, ale przerob go pod uzytkownika (wersja wegan, zmiana skill level, zmiana czasu, fusion). To pokazuje, ze wartosc jest w modyfikacji, nie tylko w wyszukaniu. Do zaczerpniecia: agent powinien umiec powiedziec "ten przepis mozna uproscic do 10 min pracy jesli pominiesz krok X" albo "podbij trudnosc jesli chcesz efekt restauracyjny". Zrodlo: https://news.samsung.com/global/samsung-announces-global-launch-of-samsung-food-an-ai-powered-personalized-food-and-recipe-service

3. **Mealime - twarde wykluczenia jako reguly, nie sugestie.** Wzorzec: alergie i "nienawidzi cebuli" to hard rules, ktore nigdy nie sa lamane, w odroznieniu od miekkich preferencji. To jest wazna nauka o separacji dwoch warstw gustu. Do zaczerpniecia: profil gustu = twarde reguly (alergie, wykluczenia religijne/etyczne, absolutne "nie") + miekkie wagi (lubie ostre, wole kuchnie azjatycka, unikam nabialu ale nie krytycznie). Zrodlo: https://www.plantoeat.com/blog/2023/04/mealime-app-review-pros-and-cons/

4. **Cook Smarts + Serious Eats - active time jako obietnica produktu.** Wzorzec: uczyn czas aktywny widocznym i obiecywanym, nie ukrytym. Serious Eats drukuje go jawnie, Cook Smarts robi z niego rdzen. Do zaczerpniecia: kazda propozycja dania podaje DWIE liczby, np. "praca rak: 8 min, total: 35 min (27 min gotowanie w tle)". Zrodla: https://www.cooksmarts.com/ , https://smallpantry.substack.com/p/interpreting-cook-times-in-recipes

5. **Wyspecjalizowane AI (RecipePT/MealThinker/Pann) - pamiec jako USP przeciw ChatGPT.** Wzorzec: caly ich pitch to "ChatGPT zapomina, my pamietamy". To dowod, ze trwala pamiec preferencji jest realna bolaczka i realnym rozniznikiem. Dla nas: profil gustu musi byc trwaly (plik/memory), nie zyc tylko w oknie kontekstu. Zrodlo: https://recipept.com/blog/chatgpt-meal-planner-doesnt-remember-preferences/

6. **Recommender systems (badania) - jak formalnie uczyc gustu.** Collaborative filtering opiera sie na zalozeniu, ze podobni uzytkownicy maja podobne przyszle gusta; content-based dopasowuje po cechach dania. Dla pojedynczego uzytkownika bez duzej bazy innych ludzi bardziej pasuje **content-based + jawny profil wag** (bo nie mamy tlumu do porownan). Zrodla: https://medium.com/@perstarke/collaborative-filtering-and-content-based-methods-in-recommender-systems-for-personalized-recipe-b4356e6eae87 , https://ieeexplore.ieee.org/document/10205379/

---

## Ocena pomyslu usera

### Co jest mocne

- **Rozroznienie czasu aktywnego od calkowitego jako filtr.** To najlepszy element pomyslu. Jak pokazano wyzej, koncepcja jest znana redakcyjnie, ale nikt nie robi z niej filtrowalnej osi w narzedziu rekomendujacym. Dla realnego uzytkownika to bardzo trafne: "mam 10 min zaangazowania, ale piekarnik moze pracowac godzine" to inny scenariusz niz "mam 25 min i musze stac nad garnkiem caly czas". Ten drugi wymiar realnie decyduje o tym, czy ugotujesz cos w tygodniu.
- **Rozroznienie "latwo dostepne" vs "rzadka wyprawa po skladnik".** Rowniez luka rynkowa. SuperCook mowi tylko czego brakuje, nie ocenia kosztu zdobycia. Nasz agent moze klasyfikowac braki: w kazdym sklepie / trzeba do wiekszego / sklep specjalistyczny / zamow online. To bardzo praktyczne.
- **Nowosc dobierana celowo, per kategoria.** Wymuszanie roznorodnosci (nie proponuj trzeci raz tego samego makaronu) to sensowny mechanizm anty-nuda, ktorego statyczne appki nie maja.
- **Dopasowanie do LLM/agenta.** Caly pomysl siedzi idealnie w tym, w czym LLM jest dobry: rozumienie luznego opisu lodowki, rozumowanie o substytucjach, generowanie i modyfikacja przepisow, oszacowanie trudnosci i czasu z tekstu. To nie jest zadanie, ktore wymaga bazy 11 mln przepisow - wystarczy dobry research + rozumowanie.

### Co warto dodac

- **Dwuwarstwowy profil gustu** (twarde reguly + miekkie wagi) zapozyczony z Mealime. Bez tego "uczenie gustu" bedzie mgliste.
- **Jawny mechanizm feedbacku.** Po propozycji: "zrobilem / nie zrobilem / bylo super / za ostre / za dlugo trwalo". Bez petli oceny agent nie ma z czego sie uczyc. To odpowiednik ratings z recommender systems.
- **Substytucje.** "Nie masz smietany 30%, mozesz uzyc jogurtu greckiego" - to naturalna przewaga LLM nad SuperCook.
- **Sezonowosc / lokalnosc** (opcjonalnie) - bo dostepnosc "rzadkiego skladnika" zalezy od pory roku i kraju (user jest w Polsce, wiec np. dostepnosc pewnych warzyw i produktow rozni sie od baz US).

### Co jest technicznie trudne

- **"Uczenie gustu" bez trwalej bazy.** To najwieksze wyzwanie. LLM sam z siebie nie pamieta miedzy sesjami (dokladnie problem ChatGPT z https://recipept.com/blog/chatgpt-meal-planner-doesnt-remember-preferences/). Rozwiazanie w naszym ekosystemie: **profil jako plik** (np. `~/.claude/kuchmistrz/profil_gustu.md`) lub wpis w MEMORY.md, ktory agent czyta na starcie i dopisuje po feedbacku. To daje trwalosc bez zadnej bazy danych. To realistyczne i zgodne z tym jak dziala reszta systemu usera (memory + pliki jako source of truth).
- **Czas aktywny czesto nie istnieje w danych zrodlowych.** Wiekszosc przepisow w sieci podaje tylko total albo prep+cook, a schema.org nie ma pola active time. Agent bedzie musial **estymowac czas aktywny z tresci instrukcji** (liczba krokow wymagajacych obecnosci, krojenie/mieszanie vs pieczenie/duszenie). To jest wykonalne dla LLM, ale bedzie przyblizeniem, nie pomiarem. Trzeba to komunikowac uczciwie ("szacowany czas pracy ~8 min").
- **Ocena trudnosci jest subiektywna** i zalezy od wprawy usera. Lepiej kalibrowac ja wzgledem historii ("dla ciebie to srednie, bo robiles juz risotto") niz absolutnie.
- **Halucynacje przepisow.** LLM potrafi wymyslic przepis, ktory nie dziala (zle proporcje, brak kroku). Dlatego faza researchu (oparcie o realne zrodla) jest wazna, a nie tylko generowanie z glowy - co user zreszta sam wskazal ("najpierw robi dokladny research przepisow").

---

## Rekomendacja architektury (2-3 warianty)

Kontekst: to ma byc czesc systemu Agent Architecture usera (skills + presety Claude Code), a nie osobna aplikacja. Wiec "architektura" = czy jeden skill, czy maly preset z kilku agentow, plus gdzie trzymac profil gustu.

### Wariant A: Pojedynczy agent "kuchmistrz" (skill) + plik profilu

Jeden skill `kuchmistrz.md`, ktory na starcie czyta `profil_gustu.md`, przyjmuje stan lodowki i constraints (czas aktywny, czas total, trudnosc, kategoria), robi lekki research i proponuje 2-4 dania. Po feedbacku dopisuje do profilu.

- Zalety: najtanszy (1 model, zwykle Sonnet), najszybszy, najprostszy w utrzymaniu, w pelni pokrywa 80% codziennego uzycia ("co dzis na obiad z tego co mam"). Trwala pamiec przez plik rozwiazuje problem gustu.
- Wady: research przepisow plytki (jeden agent robi wszystko w jednym przebiegu); przy zadaniu "znajdz mi cos zupelnie nowego i zweryfikuj" jakosc researchu bedzie slabsza niz w dedykowanym swarmie.
- Kiedy: domyslny tryb dnia codziennego. **Rekomendowany jako baza.**

### Wariant B: Maly preset 3-agentowy "kuchmistrz-research" (rekomendowany jako drugi tryb)

Preset uruchamiany, gdy user chce glebiej ("znajdz nowe przepisy", "przeszukaj i zaproponuj cos czego jeszcze nie robilem"):

1. **Researcher przepisow** (Sonnet) - realny web research, zbiera kandydatow z podanych skladnikow/kategorii, cytuje zrodla, zbiera surowe czasy i kroki. Mozliwosc odpalenia rownolegle 2 researcherow (np. jeden "z tego co masz", drugi "cos nowego/ambitnego").
2. **Rekomender / kalibrator gustu** (Sonnet lub Opus) - czyta `profil_gustu.md`, filtruje i szereguje kandydatow wg twardych regul + miekkich wag, dobiera nowosc per kategoria, klasyfikuje braki (latwo dostepne vs rzadka wyprawa).
3. **Filtr trudnosc/czas** (moze byc Haiku - tanie, deterministyczne) - dla kazdego finalisty estymuje CZAS AKTYWNY (praca rak) osobno od CZASU CALKOWITEGO, przypisuje poziom trudnosci skalibrowany do historii usera, odrzuca to co nie miesci sie w constraintach.

Wyjscie: 2-4 dania z dwoma liczbami czasu, poziomem trudnosci, lista brakow z klasyfikacja dostepnosci, linkami zrodlowymi.

- Zalety: jakosc researchu i separacja odpowiedzialnosci; kazdy agent robi jedna rzecz dobrze; naturalnie mapuje sie na 3 filary pomyslu usera (znajdz -> dopasuj do gustu -> przefiltruj czas/trudnosc). Cascade kosztowy (Haiku na filtrze) trzyma cene w ryzach.
- Wady: wolniejszy i drozszy niz wariant A; przesada dla "co dzis na szybko".
- Kiedy: tryb odkrywczy / weekendowy / "zaskocz mnie". **Rekomendowany jako drugi tryb, obok A.**

### Wariant C: Rozbudowany preset z pamiecia i planowaniem tygodnia (opcja "maksymalna")

Wariant B + agent-planer tygodniowy (uklada menu na 5-7 dni, dba o roznorodnosc miedzy dniami i o zuzycie skladnikow zanim sie zepsuja) + bardziej formalny modul profilu gustu (dwuwarstwowy: hard rules + wagi, aktualizowany po kazdym feedbacku). Zblizone funkcjonalnie do Samsung Food + Cook Smarts, ale w ekosystemie Claude Code i z rozroznieniem czasu aktywnego, ktorego tamci nie maja.

- Zalety: pelny produkt, najbardziej "wow", pokrywa scenariusz planowania zakupow i redukcji marnowania jedzenia.
- Wady: najwiekszy narzut, najwiecej tokenow, wiecej stanu do utrzymania (profil + plan + pantry). Ryzyko przeinzynierowania na start.
- Kiedy: dopiero gdy A i B sie sprawdza i user chce isc w planowanie tygodniowe. Nie na pierwsza iteracje.

### Rekomendacja wiodaca

Zbuduj **A jako domyslny skill** i **B jako preset odkrywczy**, wspoldzielace jeden plik `profil_gustu.md`. To pokrywa realne uzycie (codzienne szybkie + okazjonalne glebokie) minimalnym kosztem, i jest spojne z filozofia systemu usera (male presety, cascade kosztowy, pliki/memory jako trwala pamiec). C zostaw jako backlog po walidacji.

Model routing sugerowany (zgodnie ze standardem usera): researcher Sonnet, rekomender Sonnet (Opus opcjonalnie flaga --premium), filtr czas/trudnosc Haiku. Profil gustu: plik markdown czytany na starcie, dopisywany po feedbacku - to rozwiazuje "uczenie gustu bez bazy danych".

---

## Wnioski

1. **Rynek jest gesty, ale fragmentaryczny.** SuperCook wygrywa fridge-to-table, Samsung Food wygrywa personalizacje i transformacje przepisu, Mealime wygrywa twarde wykluczenia, Cook Smarts/Serious Eats jako jedyni traktuja czas aktywny powaznie. Nikt nie laczy wszystkich pi, ciu filarow usera naraz, a zwlaszcza nie laczy fridge-first + uczenie gustu + filtrowalny czas aktywny.

2. **Wyroznik usera (active vs total time) jest realny, z zastrzezeniem.** Jako pojecie znane redakcyjnie (Serious Eats, Cook Smarts), ale jako **filtrowalna os per danie w narzedziu rekomendujacym - luka rynkowa**. Ostrzezenie: dane zrodlowe (schema.org) tego pola nie maja, wiec agent musi ten czas ESTYMOWAC z tresci instrukcji i uczciwie to komunikowac. To wykonalne dla LLM i jest dobra przewaga.

3. **Drugi cichy wyroznik: klasyfikacja brakow "latwo dostepne vs rzadka wyprawa".** Tego nie robi nikt z przebadanych. Warty wyeksponowania rowno z czasem aktywnym.

4. **"Uczenie gustu" rozwiaz plikiem, nie baza.** Trwaly `profil_gustu.md` (twarde reguly + miekkie wagi + log feedbacku) rozwiazuje dokladnie te bolaczke, na ktorej wyspecjalizowane appki (RecipePT, MealThinker, Pann) buduja caly pitch przeciw ChatGPT. To wpisuje sie w istniejaca filozofie systemu usera (memory + pliki).

5. **Architektura: dwa tryby.** Skill A (codzienny, szybki, tani) + preset B (3 agenci: research -> rekomender gustu -> filtr czas/trudnosc, cascade z Haiku na koncu). To pokrywa oba realne scenariusze bez przeinzynierowania. Wariant C (planer tygodnia + formalny modul gustu) do backlogu.

6. **Ryzyka do pilnowania:** halucynacje przepisow (mitygacja: faza researchu z realnych zrodel, ktora user sam przewidzial), subiektywnosc trudnosci (mitygacja: kalibracja do historii), estymacja czasu aktywnego jako przyblizenie (mitygacja: jawne "szacowany" i mozliwosc korekty przez feedback).

### Zrodla (zbiorczo)

- SuperCook: https://www.supercook.com/ , https://www.producthunt.com/products/supercook
- Samsung Food / Whisk: https://news.samsung.com/global/samsung-announces-global-launch-of-samsung-food-an-ai-powered-personalized-food-and-recipe-service , https://mealthinker.com/blog/samsung-food-alternative
- Mealime: https://www.plantoeat.com/blog/2023/04/mealime-app-review-pros-and-cons/
- Paprika: https://www.paprikaapp.com/ , https://www.plantoeat.com/blog/2023/07/paprika-app-review-pros-and-cons/
- ChatGPT jako recipe assistant (pamiec): https://recipept.com/blog/chatgpt-meal-planner-doesnt-remember-preferences/ , https://mealthinker.com/blog/chatgpt-vs-meal-planning-app , https://recipept.com/blog/best-ai-recipe-app/
- Cook Smarts (active time): https://www.cooksmarts.com/ , https://www.cooksmarts.com/weekly-meal-planner/pricing-features/
- Serious Eats active vs total time: https://smallpantry.substack.com/p/interpreting-cook-times-in-recipes
- schema.org / Google recipe time fields: https://developer.yoast.com/features/schema/pieces/recipe/ , https://developers.google.com/gmail/markup/reference/types/Recipe
- WeeknightChef: https://apps.apple.com/mx/app/weeknightchef/id6757376319
- Recipe recommender systems (uczenie gustu): https://medium.com/@perstarke/collaborative-filtering-and-content-based-methods-in-recommender-systems-for-personalized-recipe-b4356e6eae87 , https://ieeexplore.ieee.org/document/10205379/
