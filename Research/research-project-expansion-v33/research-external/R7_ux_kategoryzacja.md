# R7: UX kategoryzacji duzych kolekcji (40+ elementow)

Data: 2026-08-20/21
Pytanie badawcze: jak dojrzale platformy/marketplace rozwiazuja problem "duzo elementow, user sie gubi" - i jaki
lekki system kategoryzacji dalby sie wpasowac w istniejacy design Agent Architecture Designer (44 presety, dual-column
verdict panel, chipy w headerze) bez przebudowy UI.

---

## 1. GitHub Actions Marketplace

**Wzorzec: kategorie + verified badge + single-facet filter**

GitHub Marketplace grupuje ponad 20 000 akcji w predefiniowane kategorie (np. Code quality, Continuous integration,
Deployment, Security, Monitoring, Testing). Kazda akcja ma jedna glowna kategorie widoczna jako etykieta na karcie
listingu, plus opcjonalny "Verified creator" badge (niebieska plakietka checkmark) dla akcji od zweryfikowanych
partnerow organizacyjnych. Filtrowanie odbywa sie przez dropdown po lewej stronie listy wynikow.

**Znana slabosc (potwierdzona w analizach spolecznosci):** filtr obsluguje tylko jedna kategorie naraz - brak
multi-select facetow. Uzytkownicy z potrzeba przeciecia dwoch kategorii (np. "security" + "free") musza obchodzic
ograniczenie przez Google dorks / wyszukiwanie tekstowe. Wniosek dla naszego projektu: nawet duzy, dojrzaly
marketplace (GitHub) radzi sobie **jedna plaska kategoria per element** - nie trzeba od razu budowac pelnego
faceted search z multi-select, bo user i tak najczesciej filtruje po jednej osi na raz.

**Co przeniesc:** jedna, jednoznaczna kategoria glowna per preset (nie tagi wielokrotne, ktore rozmywaja wybor),
widoczna bezposrednio na karcie/liscie, nie dopiero po kliknieciu.

---

## 2. VS Code Extensions Marketplace

**Wzorzec: kategorie + wolne tagi (folksonomia) + query filtry tekstowe**

VS Code ma dwa rownolegle systemy: (1) **kategorie kontrolowane** - zamkniety zbior ok. 17 wartosci (Azure, Data
Science, Debuggers, Formatters, Keymaps, Linters, Notebooks, Programming Languages, SCM Providers, Snippets,
Testing, Themes, Visualization, itd.) nadawany przez wydawce w manifescie rozszerzenia; (2) **tagi wolne** - dowolne
stringi ("react", "docker", "ai") sluzace do doprecyzowania technologii/funkcji, bez kontroli slownikowej.
Filtrowanie dziala przez skladnie zapytania w polu wyszukiwania: `category:themes`, `tag:linter` - user pisze filtr
jako czesc query, a nie klika osobne UI kontrolki (choc na stronie web marketplace istnieja tez klikalne linki
kategorii).

Rozszerzenia w tej samej kategorii sa wizualnie zgrupowane na stronie kategorii, co ulatwia porownanie "opcji tego
samego typu" obok siebie - kluczowy mechanizm redukcji przytloczenia przy 30 000+ pozycjach.

**Co przeniesc:** rozdzial "kategoria = 1 wartosc kontrolowana, uzywana do grupowania" od "tag = wiele wartosci wolnych,
uzywanych do doprecyzowania" - to dokladnie pasuje do potrzeby projektu: kategoria glowna (np. "Research", "Build",
"Security") + opcjonalne tagi drugorzedne (np. "premium", "budzetowy", "HITL").

---

## 3. Zapier App / Template Library

**Wzorzec: use-case-first framing + tytul/opis jako filtr semantyczny, nie taksonomia**

Zapier organizuje tysiace szablonow nie wokol technicznej taksonomii aplikacji, tylko wokol **przypadku uzycia
biznesowego**: HR (rekrutacja -> offboarding), Marketing, Sprzedaz, Wsparcie klienta, Finanse, Formularze. Kazdy
szablon ma krotki, konkretny tytul opisujacy efekt ("Send Slack message when new Typeform response arrives") zamiast
nazwy technicznej - tytul + opis dziala jako mikro-filtr, bo user skanuje liste i natychmiast wie "to jest dla mnie"
czy nie, bez klikania w detale.

**Co przeniesc:** kategoria oparta na **problemie/celu uzytkownika** ("kiedy tego uzyc"), a nie na architekturze
technicznej ("ile agentow", "jaki model"). To jest kluczowa roznica wzgledem czysto technicznej klasyfikacji - i
najlepiej pasuje do juz istniejacego dual-column verdict panelu (zielone/czerwone = "kiedy dobre / kiedy zle"), bo
to jest juz framing use-case, tylko potrzebuje kategorii-etykiety na poziomie listy, zanim user w ogole otworzy kartę.

---

## 4. n8n Workflow Library

**Wzorzec: wielowymiarowe filtry - kategoria x integracja x zlozonosc x typ triggera**

n8n (i community-driven biblioteki jak n8n-library.com, 2300+ szablonow) stosuje faceted search z czterema
niezaleznymi osiami filtrowania jednoczesnie: kategoria biznesowa (Marketing, Sales, DevOps...), integracja
(365+ serwisow: Slack, Notion, OpenAI...), **poziom zlozonosci** (Low / Medium / High) i typ wyzwalacza (Webhook,
Schedule, Manual). Filtrowanie jest client-side (natychmiastowe, bez przeladowania strony), a wyniki mozna
laczyc (AND miedzy osiami).

Interesujace: os "zlozonosc" (Low/Medium/High) to dokladnie ten typ metadanych, ktorego czesto brakuje w
katalogach agentow AI - user chce wiedziec nie tylko "do czego to sluzy", ale "ile to kosztuje / ile to trwa / ile
agentow angazuje" **zanim** otworzy szczegoly.

**Co przeniesc:** dodatkowa os "zlozonosc/koszt" jako osobny wymiar od "kategoria tematyczna" - w Agent Architecture
Designer to juz czesciowo istnieje (liczba agentow, model routing), ale nie jest wystawione jako filtr/chip na
poziomie przegladania listy 44 presetow.

---

## 5. Raycast Extensions Store

**Wzorzec: dropdown kategorii w navbarze + ikony na kartach + podkatergorie tematyczne**

Raycast Store pozwala przegladac po nazwie, komendzie, slowie kluczowym lub kategorii, z dropdown "Categories" w
pasku nawigacji na gorze strony (nie sidebar, nie osobna strona - jeden klik z dowolnego miejsca). Kategorie sa
tematyczne i user-centric (np. "Design Tools", "Developer Tools", "Productivity", "Fun"), a w obrebie duzych
kategorii (jak Design Tools) istnieja jeszcze podkategorie funkcjonalne (Graphic Design, Prototyping, Animation,
Color & Typography, Collaboration). Kazde rozszerzenie ma tez ikone/logo widoczne na liscie - silny wizualny
identyfikator pozwalajacy rozpoznawac po ksztalcie/kolorze zamiast czytac cala nazwe.

**Co przeniesc:** dropdown filtra kategorii jako pojedynczy, zawsze dostepny element w headerze (nie oddzielna
strona) - to pasuje 1:1 do istniejacego paska chipow w headerze projektu. Mozna dodac kategorie jako kolejny rzad
chipow albo dropdown obok istniejacych.

---

## 6. Obsidian Community Plugins

**Wzorzec: kategorie + tagi + sortowanie po popularnosci/swiezosci + favorites**

Nowy katalog Obsidian (obsidianstats.com, oficjalny community.obsidian.md) na 6800+ pluginow oferuje: filtrowanie
po **kategoriach** (dziesiatki, np. Integrations, Bases, Charts, Task management), filtrowanie po **tagach**
(dodatkowa, luzniejsza warstwa), sortowanie (nazwa, liczba pobran, popularnosc, data wydania, data aktualizacji),
oraz mozliwosc oznaczania **ulubionych** (favorites) do szybkiego powrotu. To jest najbardziej rozbudowany z
badanych przykladow, poniewaz katalog jest > 100x wiekszy niz katalog projektu.

**Co przeniesc:** z uwagi na skale (6800 vs 44) - NIE kopiowac calego zestawu, tylko wziac idee "sortowanie jako
osobna, tania funkcja" (np. sortuj po liczbie agentow, po koszcie) jako low-cost dodatek, jesli kategorie same w
sobie nie wystarcza.

---

## 7. Ogolne zasady UX/IA dla duzych katalogow wyboru

### Faceted search / faceted navigation
Cel: redukcja "information overload" i skrocenie czasu do znalezienia wlasciwej opcji. Kluczowe zasady z branzy
e-commerce/enterprise (Algolia, UXmatters, Ahrefs):
- logika OR wewnatrz jednej grupy filtrow, logika AND miedzy grupami,
- pokazywanie liczby wynikow przy kazdej opcji filtra (np. "Research (6)"),
- **nie za duzo opcji** - jesli facet ma wiecej niz ~7-8 wartosci, staje sie sam w sobie problemem przegladania,
- na urzadzeniach mobilnych filtry zwijaja sie w modal pelnoekranowy.

Dla 44 elementow praktyczny wniosek: jedna glowna os kategoryzacji (5-8 kategorii) jest optymalna liczba - wiecej
kategorii tworzy ten sam problem co brak kategorii.

### Progressive disclosure
Mozg czlowieka efektywnie przetwarza ograniczona liczbe opcji jednoczesnie (klasyczny "7 +/- 2" i nowsze badania
sugerujace jeszcze mniej dla nieeksperckich uzytkownikow). Wzorzec: pokazuj tylko potrzebny poziom szczegolowosci
na starcie, reszte odslaniaj na zadanie (klikniecie, hover, expand). W kontekscie katalogu 44 elementow oznacza to:
**warstwa 1** = kategoria + krotki tytul + 1 kolorowy wskaznik (np. dopasowany do istniejacego dual-column
verdict), **warstwa 2** (po kliknieciu) = pelny opis, green/red verdict, chipy szczegolowe - co juz jest
zaimplementowane w projekcie na poziomie karty presetu.

### Kolor + ikona jako podwojne kodowanie
Dobre praktyki (Nielsen Norman Group i pochodne, powtorzone w kazdym z badanych zrodel) mowia, ze kolor sam w sobie
nie powinien byc jedynym nosnikiem informacji (dostepnosc, daltonizm) - kolor + ikona/ksztalt/tekst razem tworza
odporny na bledy system. Raycast i VS Code obydwa uzywaja ikon per-element jako "wizualnego skrotu" rozpoznawania,
niezaleznie od tekstu kategorii.

---

## Rekomendacja dla Agent Architecture Designer

Kontekst: 44 presety, brak zgody na redesign wizualny, user juz ma system chipow w headerze i dual-column
verdict panel (zielone/czerwone "kiedy dobre / kiedy zle") w sidebarze presetu. Potrzebny jest **lekki dodatek**,
nie nowa architektura UI.

### Rekomendacja glowna: 6-8 kategorii tematycznych + kolorowa kropka/pasek + istniejacy system chipow jako filtr

**1. Zdefiniuj 6-8 kategorii uzycia (nie techniczne, tylko "po co to jest")** - wzorem Zapier (use-case-first) i
VS Code (kategoria kontrolowana, jedna na element). Propozycja bazujac na istniejacych 44 presetach:

- Research (badania, analiza, deep research)
- Build (feature dev, fullstack, API)
- Quality (QA, testing, security, code review)
- Content (pisanie, dokumentacja, marketing)
- Strategy (planowanie, five-minds, decyzje)
- Ops (incydenty, migracje, refaktor)
- Data (analiza danych, pipeline)
- Design (UI/UX, design systems)

To odpowiada dokladnie modelowi "kategoria = jedna wartosc kontrolowana per element" z GitHub Marketplace i VS
Code - unika przeciazenia wielokrotnymi tagami.

**2. Koduj kategorie kolorem jako maly, spojny akcent (nie repaint calej karty)** - wzorem Raycast/VS Code ikon i
zasady podwojnego kodowania (kolor + tekst etykiety razem, nigdy sam kolor). Konkretnie:
- maly kolorowy pasek/kropka (4-6px) przy nazwie presetu na liscie wyboru,
- ta sama kolorystyka jako maly badge/chip w sidebarze szczegolow presetu, obok istniejacych chipow modelu/liczby
  agentow - **wpasowuje sie w juz istniejacy system chipow**, nie tworzy nowego jezyka wizualnego.
- paleta 6-8 kolorow musi byc dostepnosciowo bezpieczna (nie tylko odcien - rozne jasnosci/nasycenia + zawsze
  tekstowa etykieta obok, zgodnie z zasada "kolor nigdy sam").

**3. Dodaj kategorie jako filtr-chip w headerze, obok istniejacych chipow** - wzorem Raycast (dropdown w navbarze,
zawsze widoczny, jeden klik) i n8n (natychmiastowy client-side filter bez przeladowania). Implementacyjnie
najlzejsza opcja: rzad klikalnych "pill" chipow z nazwami kategorii nad lista 44 presetow, klikniecie
podswietla/filtruje liste (JS array filter, zero backendu - projekt jest single-file HTML wiec to trywialne).
Domyslnie: "Wszystkie" aktywne, klikniecie kategorii zawiaza filtr, drugi klik odznacza (toggle, nie radio) - co
pozwala na proste AND/OR miedzy kategoriami bez budowania pelnego faceted search.

**4. Nie dodawaj drugiej osi filtrow (np. "zlozonosc") w pierwszej iteracji** - n8n i Obsidian pokazuja, ze wiecej
osi = wiecej wartosci, ale przy 44 elementach (a nie 2000+) jedna dobrze dobrana os kategoryzacji prawdopodobnie
wystarczy. Jesli po wdrozeniu user nadal zglasza problem, dodac druga os jako opcjonalny sort (np. sortuj po
liczbie agentow/koszcie) zamiast pelnego facetu - to tanszy krok posredni zanim ewentualnie zbuduje sie prawdziwy
faceted search.

**5. Zachowaj istniejacy dual-column verdict jako warstwe 2 (progressive disclosure)** - kategoria + kolor na
liscie to warstwa szybkiego skanowania (poziom 1), a juz istniejacy zielony/czerwony panel w sidebarze to warstwa
decyzyjna po kliknieciu (poziom 2). Nie trzeba nic zmieniac w tej czesci - to juz jest zgodne z best practice.

### Dlaczego to jest "lekkie"

- Zero zmian w layoutcie/gridzie kart presetow - tylko maly kolorowy akcent + jeden nowy rzad chipow filtra.
- Zero nowego jezyka wizualnego - reuzycie istniejacego systemu chipow (memory projektu potwierdza ze user juz ma
  chipy w headerze i verdict panel jako gotowe wzorce).
- Implementacja to: (a) dopisanie pola `kategoria` + `kolorKategorii` do 44 obiektow presetow w danych JS, (b) maly
  CSS badge/pasek, (c) prosty JS filter na liscie po kliknieciu chipa kategorii. Brak backendu, brak nowych
  bibliotek, zgodne z zasada "zero dependencies" projektu.
- Skaluje sie bez przebudowy: jesli powstanie preset #45-50, wystarczy dopisac kategorie do danych, system
  filtrow/kolorow dziala automatycznie.

---

## Zrodla

- [Enhancing GitHub Actions Marketplace Searches for Multi-category Filters](https://medium.com/@BillMetangmo/enhancing-github-actions-marketplace-searches-for-multi-category-filters-ef352a77a890)
- [What Good Marketplace UX Design Looks Like](https://www.rigbyjs.com/blog/marketplace-ux)
- [VS Code Extension Marketplace docs](https://code.visualstudio.com/docs/configure/extensions/extension-marketplace)
- [VS Code Extension Manifest reference (categories field)](https://code.visualstudio.com/api/references/extension-manifest)
- [Tips and tricks for search on Visual Studio Marketplace](https://devblogs.microsoft.com/devops/tips-and-tricks-for-search-on-visual-studio-marketplace/)
- [Zapier Workflow Automation Templates](https://zapier.com/templates)
- [Zap templates - Zapier platform docs](https://platform.zapier.com/publish/zap-templates)
- [n8n Library - Free workflow templates](https://n8n-library.com/)
- [Configure a custom workflow templates library - n8n Docs](https://docs.n8n.io/embed/workflow-templates/)
- [Raycast Store](https://www.raycast.com/store)
- [Prepare an Extension for Store - Raycast API](https://developers.raycast.com/basics/prepare-an-extension-for-store)
- [Design Tools category - Raycast Store](https://www.raycast.com/store/category/design-tools)
- [The future of Obsidian plugins](https://obsidian.md/blog/future-of-plugins/)
- [Explore & Discover Obsidian Plugins and Themes - ObsidianStats](https://www.obsidianstats.com/)
- [Community plugins - Obsidian Help](https://obsidian.md/help/community-plugins)
- [Create a great faceted search & navigation UX - Algolia](https://www.algolia.com/blog/ux/faceted-search-and-navigation)
- [Faceted Metadata for Information Architecture and Search - UXmatters](https://www.uxmatters.com/mt/archives/2006/06/faceted-metadata-for-information-architecture-and-search.php)
- [Faceted Navigation: Definition, Examples & SEO Best Practices - Ahrefs](https://ahrefs.com/blog/faceted-navigation/)
- [Advanced Search UX: Best Practices - UXPin](https://www.uxpin.com/studio/blog/advanced-search-ux/)
- [Progressive disclosure in UX design - LogRocket](https://blog.logrocket.com/ux-design/progressive-disclosure-ux-types-use-cases/)
- [What Is Progressive Disclosure in UX - UXPin](https://www.uxpin.com/studio/blog/what-is-progressive-disclosure/)
