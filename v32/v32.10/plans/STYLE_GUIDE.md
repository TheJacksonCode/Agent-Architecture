# v32.10 STYLE GUIDE - opisy presetow

**Odbiorca:** osoba nietechniczna (PM, business owner, HR, marketing) ktora zobaczy aplikacje pierwszy raz. Musi w 10 sekund zrozumiec "co to robi i czy mi sie przyda".

## Filozofia

1. **Prosty polski**. Zero angielskiego gdy istnieje dobry polski odpowiednik. Lista w sekcji "Zamienniki" ponizej.
2. **Konkret**. Nie "optymalizuje workflow" tylko "przyspiesza strone ktora sie dlugo ladowala".
3. **Przyklady z zycia**. Uzyj analogii do codziennych sytuacji ("to jak zespol 3 osob siedzacych w jednym pokoju" > "hub-and-spoke pattern").
4. **Bez zargonu IT**. Jesli musisz uzyc technicznego terminu, od razu go wyjasnij w nawiasie.
5. **Nie sprzedawaj, tlumacz**. Zamiast "rewolucyjne rozwiazanie" napisz "ten zespol sprawdza, czy w tekscie nie ma bledow".

## Zamienniki (obowiazkowe)

| NIE pisz | Pisz |
|---|---|
| pipeline | zespol / przeplyw pracy / kroki |
| workflow | kroki pracy / przeplyw |
| research | zbieranie informacji / badanie |
| root cause | pierwotna przyczyna / glowny powod |
| deploy / deployment | wdrozenie / wypuszczenie na produkcje |
| observability | monitoring dzialajacej aplikacji |
| PRD | dokument wymagan produktu |
| JTBD | problem klienta do rozwiazania |
| stack / tech stack | zestaw technologii |
| ticket | zadanie do wykonania |
| feature | funkcja / nowa mozliwosc |
| refactor | sprzatanie kodu |
| legacy | stary system |
| breaking change | zmiana psujaca stare rzeczy |
| hot path | najczesciej uzywana czesc |
| boilerplate | powtarzajacy sie szablon |
| scope | zakres prac |
| CI/CD | automatyczne testowanie i wypuszczanie |
| STRIDE | metodyka szukania dziur bezpieczenstwa |
| CVSS | system oceny wagi bledu bezpieczenstwa |
| SRM | blad w losowaniu uzytkownikow do testu |
| p-hacking | naciaganie statystyk |
| power calc | obliczenie ile osob trzeba do testu |
| MDE | najmniejsza zmiana ktora chcemy zlapac |
| NEW | NEW (badge zostaje) |
| HITL | decyzja czlowieka / zatwierdzenie przez czlowieka |
| SLO / SLA | obietnica jakosci uslugi |
| CVE | znana dziura w bibliotece |
| DAG | mapa kolejnosci zadan |
| scratchpad | wspolna notatka |
| parallel | rownolegle |
| cascade | po kolei (od taniego do drogiego) |
| backend / frontend | backend / frontend (ok, znane) |

## Slowa dozwolone bez tlumaczenia (uniwersalne)

agent, preset, bug, kod, test, QA, API, SOC2, SaaS, MVP, produkcja, dashboard, design, launch, audyt, security, backend, frontend, Claude, Opus, Sonnet, Haiku

## Format PRESET_MID_PL (krotki opis "KIEDY UZYWAC")

- **Dlugosc**: 2-4 zdania, max ~35 slow.
- **Pierwsze zdanie**: konkret co to robi. Zaczyna sie od rzeczownika lub "Kiedy..."
- **Drugie/trzecie zdanie**: jaki jest typowy przypadek uzycia (przyklady) lub czego unikac.
- **Ton**: przyjazny, konkretny, bez marketingowego belkotu.
- **Bez nazw specjalistycznych wzorcow** (no "Lead Researcher pattern", "hub-and-spoke").

### Przyklad dobry (solo, uproszczony):
```
Jeden agent bierze jedno proste zadanie. Zero dodatkowej koordynacji, zero oczekiwania na innych. Dobry wybor gdy zadanie jest jasne, male i nie wymaga drugiej pary oczu - na przyklad drobny bug albo poprawka literowki.
```

### Przyklad ZLY (solo, zbyt techniczny - tak NIE pisz):
```
Single-agent execution with zero orchestration overhead, ~100-250K token envelope. Use for well-scoped atomic tasks.
```

## Format PRESET_LONG_PL (szczegolowy opis)

- **Dlugosc calkowita**: ~130-200 slow.
- **5 sekcji** (bold headery, uzywaj `<strong>...:</strong>` HTML bo pole renderuje przez innerHTML):

### Sekcje (w tej kolejnosci):

1. **`<strong>Pomysl:</strong>`** (40-60 slow)
   Analogia/metafora z codziennego zycia + jaki jest problem ktory ten preset rozwiazuje. "Wyobraz sobie ze...", "To jak gdy...", "Problem jest taki ze...". Zero kodu, zero papierow naukowych. Wyjasnij mamie.

2. **`<strong>Jak to dziala:</strong>`** (30-50 slow)
   Kto co robi, bardzo ogolnie. "Najpierw jeden agent czyta caly kod, potem trzech innych sprawdza rownolegle bezpieczenstwo, blad w bazie i bledy w layoucie, a na koncu ktos dorzuca wniosek". Bez nazw wzorcow architektonicznych.

3. **`<strong>Co dostajesz:</strong>`** (25-40 slow)
   Konkretne rzeczy ktore wyjda z pipeline. "Raport z 5 sekcjami", "Dokument z listq zadan do zrobienia", "Poprawiony kod gotowy do wdrozenia". Konkrety.

4. **`<strong>Idealne dla:</strong>`** (25-40 slow)
   3-5 konkretnych sytuacji-przykladow. "Gdy wdrazasz platnosci online", "Gdy klient pyta o raport z ostatniego miesiaca", "Gdy przepisyjesz stary system na nowy framework".

5. **`<strong>Nie uzywaj:</strong>`** (20-35 slow)
   2-3 sytuacje kiedy to jest zle. "Gdy masz 5 minut na decyzje" (za ciezkie), "Gdy masz jeden plik do zmiany" (przerost formy), "Gdy nie masz dostepu do produkcji".

### Separatory
Miedzy sekcjami daj dwa `<br><br>` (to istniejacy pattern w aktualnym PRESET_LONG_PL).

### Apostrofy
Pole jest JS string literal z pojedynczymi cudzyslowami. Jesli uzyjesz "Devil's Advocate" - napisz `Devil\\'s Advocate` albo po prostu przetlumacz na "Adwokat Diabla".

### Zakazane zwroty
- "rewolucyjne", "przelomowe", "najlepszy w klasie"
- "pattern", "blueprint" (pisz "wzorzec" albo w ogole nie pisz)
- "state-of-the-art", "cutting-edge"
- em-dash (-), en-dash (-). Tylko zwykly minus -.

### Przyklad dobry SZCZEGOLOWY OPIS (fikcyjny preset "auth_setup"):

```
<strong>Pomysl:</strong> Dodanie logowania do aplikacji wyglada prosto, ale kryje sie tam duzo pulapek - zle hasla, wyciek tokenow, brak resetu. To jak zamek w drzwiach: wyglada na latwy element, a wlamywacze i tak znajda sposob jesli sie go zle zamontuje.<br><br><strong>Jak to dziala:</strong> Jeden agent projektuje baze danych uzytkownikow, drugi pisze kod rejestracji i logowania, trzeci sprawdza czy wszystko jest bezpieczne (silne hasla, szyfrowanie), a na koncu czlowiek zatwierdza gotowe rozwiazanie.<br><br><strong>Co dostajesz:</strong> Gotowy system logowania z rejestracja, resetem hasla i zabezpieczeniem kont. Dokumentacja jak go uruchomic i raport ze sprawdzenia bezpieczenstwa.<br><br><strong>Idealne dla:</strong> nowe aplikacje ktore potrzebuja kont uzytkownikow, dodanie logowania do istniejacego projektu, migracja ze starego systemu logowania, wymogi zgodnosci (RODO).<br><br><strong>Nie uzywaj:</strong> gdy juz masz dzialajacy login, gdy uzywasz gotowego dostawcy jak Google czy Facebook (nie ma co konfigurowac), gdy projekt jest zabawka bez prawdziwych uzytkownikow.
```

## Walidacja po napisaniu (self-check)

Przed oddaniem sprawdz kazdy wpis:
1. Czy osoba nietechniczna zrozumie KAZDE zdanie? (przeczytaj sobie na glos jakby mame)
2. Czy nie ma slow z listy "NIE pisz"?
3. Czy pierwsze zdanie jest konkretne a nie marketingowe?
4. Czy "Idealne dla" ma konkretne przyklady z zycia a nie "use cases"?
5. Czy zachowany jest format `<strong>...:</strong>` i `<br><br>` separatory?
6. Czy apostrofy sa escaped (`\\'`)?
7. Czy brak em/en-dash (tylko minus -)?

## Output format dla agenta

Zwrocic POJEDYNCZY JS snippet postaci:

```js
// PRESET_MID_PL entries:
solo: 'Pelen nowy opis kiedy uzywac.',
quick_fix: 'Kolejny opis.',
...

// PRESET_LONG_PL entries:
solo: '<strong>Pomysl:</strong> ...<br><br><strong>Jak to dziala:</strong> ...<br><br><strong>Co dostajesz:</strong> ...<br><br><strong>Idealne dla:</strong> ...<br><br><strong>Nie uzywaj:</strong> ...',
quick_fix: '...',
...
```

Agent ma oddac oba bloki dla KAZDEGO ze swoich przypisanych presetow. Bez komentarzy miedzy wpisami, bez wprowadzenia - tylko surowy JS gotowy do wklejenia.
