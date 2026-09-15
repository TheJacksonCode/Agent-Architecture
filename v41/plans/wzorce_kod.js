/* Canonical source for the Patterns (Wzorce) module as of 2026-09-15 (moved from
   v39/plans/, which is now frozen dev history and stays out of the public repo).
   Deploy into the HTML with the marker-replacing script. Exception: wzSyncLang() lives
   in the HTML itself, outside the deploy markers. */

/* =====================================================================
   WZORCE - cztery etapy jako jeden system. Kod do wklejenia, v39.
   ---------------------------------------------------------------------
   Co ten plik zawiera:
     1. WZ_CSS            - komplet regul .wz- (nowe + jawnie oznaczone
                            modyfikacje istniejacych) jako tablica linii
     2. wzWstrzyknijCSS() - wstrzykniecie CSS (albo wklej WZ_CSS recznie
                            do bloku <style> trybu Wzorce)
     3. DANE              - grupy, ksztalty, relacje, adnotacje uczciwosci,
                            pary domyslne. Komplet PL i EN, zero TODO.
     4. RYSUNEK           - generator SVG, 7 ukladow, etykiety z istniejacych
                            danych howItWorks (zero nowej tresci na etykiety)
     5. RENDER            - wzRenderKatalog, wzBento (zamienniki),
                            wzRenderGuide (opcjonalny zamiennik),
                            wzSelect (zamiennik), tryb zestawienia
   ---------------------------------------------------------------------
   Zasady, ktorych ten plik pilnuje:
     - ES5: var / function, zero arrow functions, zero const/let.
     - Zero zaleznosci, zero sieci, jeden plik.
     - Kolory wylacznie z tokenow --bg0..3, --t1, --t2, --brd, --accent1..4,
       --mn, --bd. Zadnego szesnastkowego koloru motywu.
     - Polskie znaki tylko w tekscie dla czytelnika. Nazwy klas, identyfikatory
       i wartosci data-* sa czysto ASCII (DD49).
     - Zero dlugich mysliników. Tylko "-".
     - W napisach angielskich nie ma apostrofow.
     - prefers-reduced-motion jest deklarowane per komponent, nie globalnie.
     - Stan nigdy nie jest niesiony samym kolorem (WCAG 1.4.1).
   ---------------------------------------------------------------------
   Zaleznosci od kodu, ktory JUZ jest w aplikacji:
     G, currentLang, WZ_ORDER, WZ_META, WZ_NAME, WZ_CUR, WZ_PL, WZ_EN,
     WZ_GUIDE_PL, WZ_GUIDE_EN, wzEsc, wzT, wzData, wzGuide, wzAgentName,
     wzGoAgent. Ten plik ich nie redefiniuje (poza wzSelect, wzRenderKatalog,
     wzBento, wzRenderGuide - to sa zamierzone zamienniki).
   ===================================================================== */

/* ===================================================================
   1. CSS
   Legenda znacznikow w komentarzach:
     [NOWE]  - regula, ktorej dzis nie ma
     [ZMIANA] - modyfikacja reguly istniejacej w bloku <style> trybu Wzorce
   =================================================================== */
var WZ_CSS = [

/* ---------- WSPOLNY JEZYK: glif grupy ---------- */
'/* [NOWE] */',
'.wz-glif{width:14px;height:14px;flex:0 0 14px;display:inline-block;vertical-align:-2px;color:var(--t2)}',
'.wz-glif path,.wz-glif circle{vector-effect:non-scaling-stroke}',

/* ---------- WSPOLNY JEZYK: chmurka (hover I fokus) ---------- */
'/* [NOWE] Chmurka spelnia SC 1.4.13 w trzech punktach naraz:',
'   - Hoverable: pointer-events:auto plus niewidzialny mostek pod dymkiem,',
'     zeby przejscie myszy z etykiety na dymek go nie gasilo,',
'   - Dismissible: Escape (uchwyt w sekcji 9) i zwykle wyjscie Tabem,',
'   - dostepna programowo: tresc jest PRAWDZIWYM wezlem DOM powiazanym przez',
'     aria-describedby, nie trescia z content:attr() w ::after, ktorej zaden',
'     czytnik ekranu nie wystawia. Przy okazji polskie znaki nie musza siedziec',
'     w wartosci atrybutu data-* (DD49).',
'   Szerokosc jest przycieta do szerokosci okna, zeby przy 320 px dymek nie',
'   wyszedl poza ekran (ryzyko R3 z WZORCE_A11Y.md). */',
'.wz-tip{position:relative}',
'.wz-tip-tr{position:absolute;bottom:calc(100% + 8px);left:0;width:max-content;',
'  max-width:min(260px,calc(100vw - 28px));',
'  background:var(--bg3);color:var(--t1);border:1px solid var(--brd);border-radius:9px;',
'  padding:8px 11px;font-family:var(--bd);font-size:10.5px;font-weight:400;line-height:1.5;',
'  text-align:left;letter-spacing:0;text-transform:none;white-space:normal;',
'  box-shadow:0 8px 24px rgba(0,0,0,.35);z-index:9200;opacity:0;visibility:hidden;',
'  pointer-events:none;transition:opacity .12s}',
'.wz-tip-tr::after{content:"";position:absolute;left:0;right:0;top:100%;height:10px}',
'.wz-tip-tr.wz-tip-pr{left:auto;right:0}',
'/* v41: wariant W DOL. Dotad chmurka miala wpisane na sztywno',
'   "bottom:calc(100% + 8px)", czyli otwierala sie WYLACZNIE do gory. Wariant poziomy',
'   (wz-tip-pr) istnial od poczatku, pionowego nie bylo wcale - wiec etykieta stojaca',
'   wysoko (SILNIK jest najwyzej) wypychala chmurke poza gorna krawedz i praktycznie',
'   nie bylo jej widac. Mostek ::after TEZ musi zmienic strone: przy chmurce w dol',
'   pas lapiacy mysz ma isc w gore, inaczej chmurka gasnie w polowie przejazdu. */',
'.wz-tip-tr.wz-tip-dol{bottom:auto;top:calc(100% + 8px)}',
'.wz-tip-tr.wz-tip-dol::after{top:auto;bottom:100%}',
'.wz-tip:hover>.wz-tip-tr,.wz-tip:focus>.wz-tip-tr,.wz-tip:focus-visible>.wz-tip-tr,',
'.wz-tip-tr:hover{opacity:1;visibility:visible;pointer-events:auto}',
'.wz-tip:focus-visible{outline:2px solid var(--accent1);outline-offset:3px;border-radius:4px}',
'@media(prefers-reduced-motion:reduce){.wz-tip-tr{transition:none}}',

/* ---------- ETAP 1: grupy chipow (wariant B) ---------- */
'/* [NOWE] WARIANT UKLADU SIEDZI W SZESCIU ZMIENNYCH, NIE W SZESCIU REGULACH.',
'   Cala roznica miedzy "etykieta z boku" a "etykieta nad grupa" jest w jednej',
'   regule .wz-grupy ponizej. Wariant odwrotu (uklad zgodny z PatternFly',
'   i Primerem) to podmiana tych szesciu wartosci - zero zmian w HTML i JS.',
'   Wartosci odwrotu sa dokladnie te same, ktore juz dzis dziala przy 640 px,',
'   wiec wariant zapasowy nie jest niesprawdzony: jest codziennie renderowany',
'   na waskim ekranie. Szczegoly w WZORCE_SYSTEM.md, sekcja "wariant odwrotu". */',
'.wz-grupy{display:flex;flex-direction:column;gap:13px;margin:0 0 6px;',
'  --wz-gkol:136px 1fr;--wz-ggap:13px;--wz-gwyr:right;--wz-gjust:flex-end;',
'  --wz-gbr:2px solid var(--brd);--wz-gbl:0;--wz-gpad:6px 11px 6px 0}',
'.wz-grupa{display:grid;grid-template-columns:var(--wz-gkol);gap:var(--wz-ggap);align-items:start}',
'.wz-getykieta{border:0;border-right:var(--wz-gbr);border-left:var(--wz-gbl);',
'  padding:var(--wz-gpad);text-align:var(--wz-gwyr);',
'  background:none;font:inherit;color:inherit;cursor:help;display:block;width:100%;min-height:34px}',
'.wz-gnazwa{font-family:var(--mn);font-size:9.5px;letter-spacing:.06em;text-transform:uppercase;',
'  color:var(--t1);display:flex;gap:6px;align-items:center;justify-content:var(--wz-gjust);line-height:1.35}',
'.wz-gprosto{font-size:10.5px;color:var(--t2);display:block;line-height:1.35;margin-top:3px}',
'.wz-getykieta .wz-tip-tr{left:0;right:auto}',
'/* Waski ekran: te same szesc zmiennych, wartosci wariantu "etykieta nad grupa". */',
'@media(max-width:640px){',
'  .wz-grupy{--wz-gkol:1fr;--wz-ggap:7px;--wz-gwyr:left;--wz-gjust:flex-start;',
'    --wz-gbr:0;--wz-gbl:2px solid var(--brd);--wz-gpad:0 0 0 10px}',
'  .wz-getykieta{min-height:24px}',
'}',
'/* [NOWE] Zdanie o pochodzeniu podzialu. Widoczne na stale, nie w chmurce:',
'   podzial na trzy grupy jest nasza synteza, a nie ustalona taksonomia,',
'   i czytelnik ma to widziec bez najezdzania na cokolwiek. */',
'.wz-zrodlo{font-size:10.5px;line-height:1.5;color:var(--t2);margin:0 0 18px;',
'  padding-left:10px;border-left:1px solid var(--brd);max-width:640px}',

/* ---------- ETAP 1: chipy ---------- */
'/* [ZMIANA] .wz-chips mialo margin:0 0 18px - odstepy trzyma teraz .wz-grupy */',
'.wz-chips{display:flex;flex-wrap:wrap;gap:8px;margin:0}',
'/* v41: skasowane .wz-chip-wrap i .wz-rzadki - oba obslugiwaly plakietke "rzadki",',
'   ktora zostala usunieta. Martwy CSS zostawiony w pliku podpowiadalby przy nastepnej',
'   zmianie, ze taki element istnieje. */',
'/* [NOWE] Zaznaczenie NIE jest niesione samym kolorem obwodki (WCAG 1.4.1):',
'   kropka zmienia sie z obwarzanka w krazek, a przycisk ma aria-pressed. */',
'.wz-kropka{width:9px;height:9px;border-radius:50%;border:1.5px solid var(--t2);',
'  flex:0 0 9px;box-sizing:border-box;background:transparent}',
'.wz-chip.on .wz-kropka{background:var(--accent1);border-color:var(--accent1)}',
'.wz-chip:focus-visible{outline:2px solid var(--accent1);outline-offset:2px}',
'@media(prefers-reduced-motion:reduce){.wz-chip{transition:none}.wz-chip:hover{transform:none}}',

/* ---------- ETAP 3: hero z ksztaltem ---------- */
'/* [ZMIANA] .wz-hero bylo flex z ikona 56x56 po lewej. Teraz siatka:',
'   po lewej rysunek ksztaltu, po prawej nazwa, jedno zdanie i wejscie',
'   do zestawienia. Akapit whatIs wyprowadzony do wlasnej karty. */',
'.wz-hero{grid-column:1/-1;display:grid;grid-template-columns:minmax(230px,380px) 1fr;',
'  gap:16px;align-items:center}',
'@media(max-width:720px){.wz-hero{grid-template-columns:1fr}}',
'/* [NOWE] */',
'.wz-ksztalt{background:var(--bg0);border:1px solid var(--brd);border-radius:12px;',
'  padding:10px 10px 8px;width:100%;max-width:380px}',
'.wz-ksztalt svg{width:100%;height:auto;display:block;color:var(--t2)}',
'.wz-ksztalt-slowo{font-family:var(--mn);font-size:9.5px;letter-spacing:.05em;',
'  text-transform:uppercase;color:var(--t2);text-align:center;margin-top:8px}',
'.wz-hero-txt{min-width:0}',
'.wz-hero-txt h3{margin:0 0 4px;font-size:22px;font-weight:800}',
'.wz-plakietka{display:inline-flex;align-items:center;gap:6px;font-family:var(--mn);',
'  font-size:9px;letter-spacing:.06em;text-transform:uppercase;color:var(--t2);',
'  border:1px solid var(--brd);border-radius:999px;padding:3px 9px;margin:0 0 7px}',
'.wz-cmp-btn{margin-top:10px;padding:7px 13px;border-radius:9px;border:1px solid var(--brd);',
'  background:var(--bg1);color:var(--t1);font-size:11.5px;font-weight:700;cursor:pointer;',
'  min-height:30px;transition:border-color .15s,color .15s}',
'.wz-cmp-btn:hover{border-color:var(--accent1);color:var(--accent1)}',
'.wz-cmp-btn:focus-visible{outline:2px solid var(--accent1);outline-offset:2px}',
'.wz-sam{margin-top:10px;border-left:2px solid var(--brd);padding-left:10px;',
'  font-size:11.5px;color:var(--t2);line-height:1.5}',
'@media(prefers-reduced-motion:reduce){.wz-cmp-btn{transition:none}}',

/* ---------- ETAP 3: warstwa rysunku (SVG) ---------- */
'/* [NOWE] Rysunek jest w calosci statyczny - nie ma czego wylaczac',
'   przy prefers-reduced-motion i to jest decyzja, nie przeoczenie. */',
'.wz-shp-box{fill:var(--bg2);stroke:var(--t2);stroke-width:1.3}',
'.wz-shp-box.wz-shp-dim{fill:var(--bg1);opacity:.7}',
'.wz-shp-box.wz-shp-prz{stroke-dasharray:4 3}',
'.wz-shp-ram{fill:none;stroke:var(--accent1);stroke-width:1.6;stroke-dasharray:5 4}',
'.wz-shp-lin{stroke:var(--t2);stroke-width:1.3;fill:none}',
'.wz-shp-grot{fill:var(--t2)}',
'.wz-shp-gate{fill:var(--accent1)}',
'.wz-shp-dot{fill:var(--t2)}',
'.wz-shp-t{font-family:var(--mn);fill:var(--t1)}',
'.wz-shp-t.wz-shp-dimt{fill:var(--t2)}',
'.wz-shp-nr{fill:var(--accent1)}',
'.wz-shp-nrt{font-family:var(--mn);font-weight:700;fill:var(--bg0)}',

/* ---------- ETAP 2: powiazane wzorce ---------- */
'/* [NOWE] Legenda trzech typow relacji, widoczna na stale - patrz wzRelLegenda(). */',
'.wz-rellegenda{display:flex;flex-wrap:wrap;gap:8px 16px;margin:0 0 11px;',
'  padding-bottom:9px;border-bottom:1px dashed var(--brd)}',
'.wz-rellegenda-i{display:inline-flex;align-items:baseline;gap:5px;font-family:var(--mn);',
'  font-size:9px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--t1)}',
'.wz-rellegenda-p{font-family:var(--bd);font-size:10.5px;font-weight:400;letter-spacing:0;',
'  text-transform:none;color:var(--t2)}',
'/* [NOWE] Rodzaj relacji niesie SLOWO, nie kolor paska. Kolizja ma',
'   dodatkowo pasek przerywany - drugi kanal poza kolorem. */',
'.wz-relw{display:flex;flex-direction:column;gap:8px}',
'.wz-relw-i{border-left:3px solid var(--brd);padding:9px 12px;border-radius:0 9px 9px 0;',
'  background:var(--bg1);font-size:12px;line-height:1.5;display:flex;gap:10px;',
'  align-items:flex-start;flex-wrap:wrap}',
'.wz-relw-i.wz-uzywa{border-left-color:var(--accent2)}',
'.wz-relw-i.wz-zamiast{border-left-color:var(--accent3)}',
'.wz-relw-i.wz-kolizja{border-left-color:var(--accent4);border-left-style:dashed}',
'.wz-relw-b{font-family:var(--mn);font-size:9px;font-weight:700;letter-spacing:.06em;',
'  text-transform:uppercase;color:var(--t1);white-space:nowrap;border-bottom:1px dotted var(--t2);',
'  cursor:help;min-height:24px;display:inline-flex;align-items:center;gap:5px;flex:0 0 auto}',
'.wz-relw-tresc{flex:1 1 200px;min-width:0}',
'.wz-relw-n{font-weight:800;display:inline-flex;align-items:center;gap:5px}',
'.wz-relw-akcje{display:flex;gap:6px;flex-wrap:wrap;flex:0 0 auto}',
'.wz-relw-akcje button{min-height:26px;padding:4px 10px;border-radius:8px;',
'  border:1px solid var(--brd);background:var(--bg-card);color:var(--t1);',
'  font-size:10.5px;font-weight:700;cursor:pointer;transition:border-color .15s,color .15s}',
'.wz-relw-akcje button:hover{border-color:var(--accent1);color:var(--accent1)}',
'.wz-relw-akcje button:focus-visible{outline:2px solid var(--accent1);outline-offset:2px}',
'@media(prefers-reduced-motion:reduce){.wz-relw-akcje button{transition:none}}',
'@media(max-width:640px){.wz-relw-i{flex-direction:column;gap:6px}}',

/* ---------- adnotacja uczciwosci ---------- */
'/* [NOWE] */',
'.wz-uwaga{font-size:11.5px;color:var(--t2);line-height:1.55;margin-top:12px;',
'  padding-top:9px;border-top:1px dashed var(--brd)}',
'.wz-uwaga b{color:var(--t1);font-weight:700}',

/* ---------- ETAP 4: zestawienie pary ---------- */
'/* [NOWE] */',
'.wz-zbar{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:10px 14px;',
'  background:var(--bg-card);border:1px solid var(--brd);border-radius:11px;margin:0 0 12px}',
'.wz-zbar-h{font-family:var(--mn);font-size:9px;letter-spacing:.11em;text-transform:uppercase;color:var(--t2)}',
'.wz-zbar-a{font-size:12px;font-weight:800;color:var(--t1);display:inline-flex;align-items:center;gap:6px}',
'.wz-zbar-k{font-family:var(--mn);font-size:10px;color:var(--t2)}',
'.wz-zbar select{min-height:30px;font-family:var(--mn);font-size:11px;background:var(--bg0);',
'  color:var(--t1);border:1px solid var(--brd);border-radius:8px;padding:5px 8px;max-width:100%}',
'.wz-zbar select:focus-visible{outline:2px solid var(--accent1);outline-offset:2px}',
'.wz-zspacer{flex:1 1 8px}',
'.wz-zx{width:30px;height:30px;min-width:30px;border-radius:9px;border:1px solid var(--brd);',
'  background:var(--bg1);color:var(--t1);cursor:pointer;font-size:14px;line-height:1}',
'.wz-zx:focus-visible{outline:2px solid var(--accent1);outline-offset:2px}',
'.wz-teza{border:1px solid var(--brd);border-left:3px solid var(--accent1);',
'  border-radius:0 12px 12px 0;background:var(--bg-card);padding:12px 15px;margin:0 0 12px}',
'.wz-teza-h{font-family:var(--mn);font-size:9px;letter-spacing:.11em;text-transform:uppercase;',
'  color:var(--t2);margin:0 0 5px}',
'.wz-teza-z{font-size:12.5px;line-height:1.55;color:var(--t1);margin:0}',
'.wz-teza-k{font-size:11px;line-height:1.5;color:var(--t2);margin:6px 0 0}',
'.wz-zestaw{display:grid;grid-template-columns:1fr 1fr;gap:12px}',
'@media(max-width:720px){.wz-zestaw{grid-template-columns:1fr}}',
'.wz-zcol{border:1px solid var(--brd);border-radius:14px;padding:15px 16px;',
'  background:var(--bg-card);display:flex;flex-direction:column;gap:12px;min-width:0}',
'.wz-zcol h4{margin:0;font-size:16px;font-weight:800}',
'.wz-zcol .wz-tag{font-size:11.5px;color:var(--t2);line-height:1.5}',
'/* [ZMIANA] Uklad zlozenia dla par UZYWA (wzZlozenieHtml) - PRAWDZIWE ZAGNIEZDZENIE.',
'   Poprzednio oba bloki byly RODZENSTWEM, a miedzy nimi stala strzalka w dol.',
'   To w tym samym module jest jezyk SEKWENCJI: dokladnie tak rysowany jest',
'   Prompt Chaining (krok 1 -> krok 2 -> krok 3). Czytelnik, ktory dwa ekrany',
'   wczesniej nauczyl sie tej konwencji, mogl przeczytac "najpierw',
'   Orchestrator-Worker, potem Routing", podczas gdy fakt jest taki, ze Routing',
'   siedzi w SRODKU i dziala przez caly czas jego pracy. Teraz blok wewnetrzny',
'   lezy fizycznie w ramce zewnetrznego: zawieranie pokazane zawieraniem.',
'   Skutek uboczny, zamierzony: znika potrzeba oznaczania bloku zewnetrznego',
'   kolorem (stara regula dawala mu krawedz w akcencie). Ramka sama go wyznacza,',
'   wiec nosnikiem informacji przestaje byc barwa - WCAG 1.4.1 bez dodatkowej',
'   pracy. Etykiety ZEWNETRZNY/WEWNETRZNY zostaja jako nosnik tekstowy. */',
'.wz-zloz{display:flex;flex-direction:column;gap:2px;max-width:520px}',
'.wz-zloz-cz{border:1px solid var(--brd);border-radius:14px;padding:14px 16px;',
'  background:var(--bg-card);display:flex;flex-direction:column;gap:4px}',
'/* Karta zewnetrzna: to ona jest teraz pojemnikiem, wiec potrzebuje oddechu pod',
'   zagniezdzonym dzieckiem. Zadnego koloru - sama ramka. */',
'.wz-zloz-zewn{padding-bottom:16px}',
'/* Karta w karcie. --bg-card jest POLPRZEZROCZYSTY (rgba .5 w ciemnym, .7',
'   w jasnym), wiec zagniezdzenie samo NAKLADA przezroczystosci i wewnetrzna',
'   wychodzi ciemniejsza - glebia warstwy bez ani jednego nowego koloru.',
'   Kreska przerywana zostaje: to ten sam jezyk "przerywane = wewnatrz", co',
'   .wz-shp-ram w rysunkach (sekcja RYSUNEK). */',
'.wz-zloz-wewn{border-style:dashed;margin:2px 0 0 18px}',
'/* Podpis prowadzacy do zagniezdzonej karty - mowi wprost, ze to nie jest',
'   nastepny krok, tylko srodek. */',
'.wz-zloz-wsrodku{font-family:var(--mn);font-size:9px;letter-spacing:.08em;',
'  text-transform:uppercase;color:var(--t2);margin:12px 0 0}',
'.wz-zloz-etyk{font-family:var(--mn);font-size:8.5px;letter-spacing:.09em;text-transform:uppercase;',
'  color:var(--t2)}',
'.wz-zloz h4{margin:2px 0 0;font-size:15px;font-weight:800}',
'.wz-zloz-opis{font-size:12px;line-height:1.6;color:var(--t1);margin:10px 0 0}',
'/* Waski ekran: wciecie znika, ale karta nadal lezy WEWNATRZ ramki zewnetrznej,',
'   wiec zagniezdzenie zostaje czytelne bez wciecia. */',
'@media(max-width:520px){.wz-zloz-wewn{margin-left:0}}',

/* ---------- naglowek grupy w Przewodniku ---------- */
'/* [NOWE] Ta sama taksonomia co w Etapie 1, zeby tabela i katalog',
'   nie uczyly dwoch roznych podzialow. */',
'.wz-tbl tr.wz-tbl-g td{padding-top:16px;border-bottom:0}',
'.wz-tbl-gl{display:inline-flex;align-items:center;gap:7px;font-family:var(--mn);font-size:9px;',
'  letter-spacing:.1em;text-transform:uppercase;color:var(--t1)}',
'.wz-tbl-gp{font-family:var(--bd);font-size:10.5px;letter-spacing:0;text-transform:none;color:var(--t2)}',

/* ---------- opcjonalna latka na chmurke globalna ---------- */
'/* [ZMIANA - OPCJONALNA, poza modulem Wzorce] Globalna klasa .tt ma dzis',
'   wylacznie :hover, i to niedzialajacy: oryginalna regula',
'   .tt:hover::after{...pointer-events:none...} nie pozwala nawet myszy wejsc',
'   na sam dymek (SC 1.4.13 Hoverable, WZORCE_A11Y.md N1). Pierwsza wersja tej',
'   latki dopisywala WYLACZNIE .tt:focus::after z osobnym pointer-events:auto -',
'   to nie naprawialo myszy w ogole, bo selektor :focus nie nadpisuje reguly',
'   :hover (to dwa rozne selektory, zadna kaskada miedzy nimi nie zachodzi).',
'   Ta wersja dopisuje .tt:hover do TEGO SAMEGO selektora co .tt:focus, wiec',
'   ta regula (zaladowana PO oryginale - patrz wzWstrzyknijCSS) wygrywa z',
'   oryginalnym .tt:hover::after przy rownej specyficznosci przez kolejnosc',
'   w kaskadzie i realnie zmienia pointer-events na auto takze dla samej myszy,',
'   bez fokusu. Naprawia to samo miejsce dla myszy i dla klawiatury jedna regula.',
'   UWAGA, zeby nie powtorzyc nieprawdy z dema: to NIE naprawia "kazdego',
'   pojecia w encyklopedii". Sciezka .tt/dodajTooltip uruchamia sie dzis',
'   wylacznie dla agentow dodanych recznie przez "+ Custom Agent" - wszystkie',
'   60 agentow i 62 presety wbudowane ida sciezka .enc-term z atrybutem title',
'   (WZORCE_A11Y.md, TL;DR pkt 3 i ryzyko R1). .enc-term wymaga osobnej',
'   poprawki i osobnego pola z trescia, bo nie ma data-tip. To jest tu',
'   nazwane, a nie zalatwione.',
'   Do tego dochodzi DRUGA zaleznosc, tym razem od kodu poza tym plikiem:',
'   dopoki funkcja dodajTooltip() (aplikacja, nie ten plik) nie doda tabindex="0"',
'   do generowanego <span class="tt">, ta regula NIE MA jak dostac fokusu -',
'   czesc :focus ponizej zostaje martwa dla 60 wbudowanych agentow i 62',
'   presetow, dopoki ten drugi patch nie wejdzie. Gotowy, minimalny patch na',
'   dodajTooltip() jest w WZORCE_PATCH_TOOLTIP.md - CELOWO nie w tym pliku,',
'   bo ta funkcja zyje w aplikacji, nie w module Wzorce. */',
'.tt:hover::after,.tt:focus::after{content:attr(data-tip);position:absolute;bottom:calc(100% + 6px);',
'  left:50%;transform:translateX(-50%);background:var(--bg3);color:var(--t1);font-family:var(--bd);',
'  font-size:10px;font-weight:400;line-height:1.5;padding:8px 12px;border-radius:8px;',
'  border:1px solid var(--brd);box-shadow:0 8px 24px rgba(0,0,0,.4);white-space:normal;',
'  width:max-content;max-width:min(280px,calc(100vw - 28px));z-index:200;pointer-events:auto}',
'.tt:focus::before{content:"";position:absolute;bottom:calc(100% + 2px);left:50%;',
'  transform:translateX(-50%);border:5px solid transparent;border-top-color:var(--bg3);z-index:201}',
'.tt:focus-visible{outline:2px solid var(--accent1);outline-offset:2px;border-radius:2px}'

].join('\n');

/* Sciezka zalecana: wklej zawartosc WZ_CSS wprost do bloku <style> trybu
   Wzorce (linie 37315-37380 w HTML), za istniejace reguly. Ta funkcja jest
   sciezka zapasowa dla wklejenia samego JS.
   UWAGA: arkusz LADUJE SIE NA KONIEC BODY, nie do <head>. Blok <style> trybu
   Wzorce siedzi w body, wiec arkusz w <head> przegralby z nim przy rownej
   specyficznosci - a dwie reguly ([ZMIANA] na .wz-chips i .wz-hero) musza
   wygrac z istniejacymi. */
function wzWstrzyknijCSS(){
  if(document.getElementById('wzCssEtapy')) return;
  var s=document.createElement('style');
  s.id='wzCssEtapy';
  s.appendChild(document.createTextNode(WZ_CSS));
  (document.body||document.documentElement).appendChild(s);
}

/* ===================================================================
   2. DANE
   =================================================================== */

/* --- 2.1 Trzy grupy. Nazwa fachowa + proste slowo WIDOCZNE NA STALE,
       chmurka tylko poglebia. Identyfikatory bez polskich znakow.

       UWAGA REDAKCYJNA, wazniejsza niz wyglada. Pierwsza wersja tych trzech
       chmurek mowila "TOPOLOGIE to realne alternatywy: wybierasz jedna z nich"
       oraz "WARSTWY dokladasz do wybranej topologii, OBOJETNIE KTOREJ".
       Oba zdania sa falszywe wobec tresci tej samej aplikacji: Przewodnik
       mowi "te wzorce nie sa alternatywami - to klocki, ktore laczysz",
       a tabela relacji ponizej ma dwie KOLIZJE miedzy warstwa a topologia.
       Zamiana braku informacji na informacje nieprawdziwa jest pogorszeniem,
       nie poprawa - dlatego chmurki mowia teraz to, co jest. --- */
var WZ_GRUPY=[
  {id:'silnik',
   nazwaPL:'SILNIK', nazwaEN:'ENGINE',
   prostoPL:'jak myśli jeden agent', prostoEN:'how one agent thinks',
   tipPL:'Pętla działania pojedynczego agenta. Pozostałe wzorce ją składają, nie zastępują. Tak to widzi część źródeł: jedna praca (preprint bez recenzji) właśnie z tego powodu wyklucza ReAct z listy wzorców. Szczegóły w karcie "Czym jest".',
   tipEN:'The action loop of a single agent. The other patterns compose it, they do not replace it. That is how some sources see it: one paper (a preprint, not peer reviewed) excludes ReAct from the pattern list for exactly this reason. Details in the "What it is" card.',
   wzorce:['react']},
  {id:'topologia',
   nazwaPL:'TOPOLOGIE', nazwaEN:'TOPOLOGIES',
   prostoPL:'kształt pracy', prostoEN:'the shape of the work',
   tipPL:'Kształt przepływu pracy między krokami albo agentami. Część z nich wybierasz zamiast siebie (stały łańcuch albo zwrotnica), część dokładasz na wierzch innego kształtu (Reflection, Debate). Często jeden siedzi w drugim: Orchestrator-Worker w środku używa Routingu.',
   tipEN:'The shape work takes between steps or agents. Some of them you pick instead of one another (a fixed chain or a switch), some you add on top of another shape (Reflection, Debate). Often one sits inside another: Orchestrator-Worker uses Routing inside itself.',
   wzorce:['prompt_chaining','routing','orchestrator_worker','map_reduce','reflection','debate','blackboard']},
  {id:'warstwa',
   nazwaPL:'WARSTWY', nazwaEN:'LAYERS',
   prostoPL:'dokładane na wierzch', prostoEN:'added on top',
   tipPL:'Nie wybierasz ich zamiast topologii. Dokładasz je DO wybranej topologii, prawie każdej. Blackboard bez kontrolera zapisu jest wyjątkiem: barierka nie ma tam czego pilnować. Dlatego na rysunku są ramką wokół przepływu, a nie kolejnym pudełkiem w nim.',
   tipEN:'You do not pick these instead of a topology. You add them TO the topology you picked, almost any of them. Blackboard with no write controller is the exception: a guardrail has nothing to watch there. That is why the drawing shows them as a frame around the flow, not as one more box inside it.',
   wzorce:['hitl','guardrails']}
];

/* Zdanie o pochodzeniu podzialu, widoczne na stale pod trzema grupami.
   Podzial na silnik / topologie / warstwy nie jest cytatem z zadnego
   katalogu - jedna granica (Guardrails jako warstwa) jest mocno
   udokumentowana, druga (HITL) sporna, trzecia (ReAct jako silnik) stoi
   na jednej pracy bez recenzji, a caly uklad trzech grup razem nie
   wystepuje nigdzie. To ma byc napisane, a nie przemilczane. */
var WZ_ZRODLO={
  pl:'Ten podział na trzy grupy to nasza synteza katalogów branżowych, a nie ustalony standard. Jedna granica jest dobrze udokumentowana (Guardrails jako warstwa), druga sporna (Human-in-the-Loop), trzecia stoi na jednej pracy bez recenzji (ReAct jako silnik). Kto co twierdzi, piszemy przy każdym z tych wzorców w karcie "Czym jest".',
  en:'This split into three groups is our own synthesis of industry catalogs, not an established standard. One boundary is well documented (Guardrails as a layer), the second is contested (Human-in-the-Loop), the third rests on a single paper that was never peer reviewed (ReAct as an engine). Who claims what is written out for each of those patterns in the "What it is" card.'
};

/* --- 2.2 Ksztalt wzorca.
   `uklad`      - jezykowo neutralna nazwa geometrii (7 ukladow na 10 wzorcow).
   `przerywane` - indeksy GNIAZD rysowanych linia przerywana (opcjonalnosc,
                  fallback, oponent).
   `wezly`      - ktory krok z howItWorks trafia do ktorego gniazda ukladu.
                  Domyslnie [0,1,2,3]. Potrzebne, bo dwa wzorce moga dzielic
                  geometrie, a miec inna kolejnosc krokow: Orchestrator-Worker
                  ma "Delegacja" na rozejsciu i "Rownolegla praca" w kolumnie,
                  a Map-Reduce odwrotnie - "Rownolegly przebieg" w kolumnie,
                  a "Zebranie" na zbiegu.
   `strzalka`   - dla ukladu wachlarz: po ktorej stronie stoi numer kroku,
                  ktory nie ma wlasnego pudelka ('wyjscie' albo 'wejscie').
   GNIAZDA PER UKLAD (kolejnosc w `wezly`):
     linia     : pudelko 1, pudelko 2, pudelko 3, pudelko 4
     petla     : pudelko 1, pudelko 2, pudelko 3, podpis strzalki powrotnej
     wachlarz  : pudelko lewe, numer na strzalkach, kolumna srodkowa, pudelko prawe
     zwrotnica : pudelko zrodla, numer na rozjezdzie, galaz srodkowa, galaz dolna
     krag      : kolumna rownorzednych, numer na starciu, pudelko oponenta, pudelko syntezy
     tablica   : tablica, kolumna zrodel, kontroler, numer na strzalce
     warstwa   : brama lewa, brama prawa, numer na dole ramki, numer na gorze ramki --- */
var WZ_KSZTALT={
  react:              {uklad:'petla'},
  reflection:         {uklad:'petla'},
  prompt_chaining:    {uklad:'linia',     przerywane:[2]},
  orchestrator_worker:{uklad:'wachlarz',  wezly:[0,1,2,3], strzalka:'wyjscie'},
  map_reduce:         {uklad:'wachlarz',  wezly:[0,2,1,3], strzalka:'wejscie'},
  routing:            {uklad:'zwrotnica', przerywane:[3]},
  debate:             {uklad:'krag',      przerywane:[2]},
  blackboard:         {uklad:'tablica'},
  hitl:               {uklad:'warstwa'},
  guardrails:         {uklad:'warstwa'}
};

/* --- 2.3 Proste slowo na ksztalt. Klucz to UKLAD, nie wzorzec - dzieki
       temu dwa wzorce o tym samym ukladzie maja dokladnie to samo slowo
       i porownywarka moze powiedziec "ten sam ksztalt". --- */
var WZ_KSZTALT_SLOWO={
  petla:     {pl:'pętla',     en:'a loop'},
  linia:     {pl:'linia',     en:'a line'},
  wachlarz:  {pl:'wachlarz',  en:'a fan'},
  zwrotnica: {pl:'zwrotnica', en:'a switch'},
  krag:      {pl:'krąg',      en:'a ring'},
  tablica:   {pl:'tablica',   en:'a board'},
  warstwa:   {pl:'warstwa',   en:'a layer'}
};

/* --- 2.4 Relacje. Jedna tabela dla obu kierunkow: zdanie opisuje RELACJE,
       nie jeden z dwoch wzorcow, wiec czyta sie tak samo w karcie a i b.
       Rodzaje: uzywa (jeden potrzebuje drugiego w srodku),
                zamiast (prawdziwa alternatywa, tu sie myli),
                kolizja (da sie zlozyc, ale placisz dwa razy). --- */
var WZ_REL=[
  {a:'orchestrator_worker', b:'routing',    typ:'uzywa',
   pl:'dzieli zadanie, a potem kieruje każdy kawałek tam, gdzie trzeba',
   en:'splits the task, then sends every piece where it belongs'},
  {a:'orchestrator_worker', b:'map_reduce', typ:'zamiast',
   pl:'jeden wymyśla podzadania w locie, drugi ma je z góry',
   en:'one invents the subtasks on the fly, the other has them up front'},
  {a:'orchestrator_worker', b:'blackboard', typ:'zamiast',
   pl:'sterowanie z jednego miejsca kontra wspólna pamięć bez centrali',
   en:'control from one place against shared memory with no center'},
  {a:'react',               b:'reflection', typ:'uzywa',
   pl:'krok obserwacji to już zalążek krytyki własnej pracy',
   en:'the observe step is already the seed of criticizing your own work'},
  {a:'debate',              b:'reflection', typ:'zamiast',
   pl:'wiele niezależnych głosów kontra jeden krytyk w pętli',
   en:'many independent voices against one critic in a loop'},
  {a:'debate',              b:'map_reduce', typ:'zamiast',
   pl:'to samo zadanie u wszystkich kontra inny kawałek u każdego',
   en:'the same task for everyone against a different piece for each'},
  {a:'hitl',                b:'guardrails', typ:'uzywa',
   pl:'brama dla człowieka to szczególny rodzaj barierki',
   en:'a gate for a human is one particular kind of guardrail'},
  {a:'guardrails',          b:'react',      typ:'uzywa',
   pl:'pętla bez barierki potrafi się nie skończyć',
   en:'a loop with no guardrail can fail to end'},
  {a:'blackboard',          b:'guardrails', typ:'kolizja',
   pl:'bez kontrolera zapisu barierka nie ma czego pilnować',
   en:'with no write controller the guardrail has nothing to watch'},
  {a:'debate',              b:'hitl',       typ:'kolizja',
   pl:'arbiter i człowiek naraz: dwa razy ten sam koszt, raz ta sama decyzja',
   en:'an arbiter and a human at once: twice the same cost, once the same decision'},
  {a:'prompt_chaining',     b:'routing',    typ:'zamiast',
   pl:'stały łańcuch kontra wybór gałęzi',
   en:'a fixed chain against a choice of branch'}
];

/* prostoPL/prostoEN to LEGENDA, widoczna na stale w karcie POWIAZANE WZORCE
   (wzRelLegenda). tipPL/tipEN zostaje w chmurce i poglebia - legenda niesie
   podstawe, zgodnie z regula systemu "chmurka nigdy nie niesie podstaw"
   (WZORCE_DYDAKTYKA_CHECK.md, punkt 2: definicje relacji byly dostepne
   WYLACZNIE po najechaniu, co lamalo te sama regule). */
var WZ_REL_OPIS={
  uzywa:   {slowoPL:'UŻYWA',   slowoEN:'USES',       glif:'+',
            prostoPL:'jeden mieści się w drugim',    prostoEN:'one fits inside the other',
            tipPL:'Jeden wzorzec potrzebuje drugiego w środku. Nie wybierasz między nimi - budujesz jeden z drugiego.',
            tipEN:'One pattern needs the other inside it. You do not choose between them - you build one out of the other.'},
  zamiast: {slowoPL:'ZAMIAST', slowoEN:'INSTEAD OF', glif:'/',
            prostoPL:'prawdziwy wybór, tu najłatwiej o pomyłkę', prostoEN:'a real choice, this is where mix-ups happen',
            tipPL:'Prawdziwa alternatywa: wybierasz jeden albo drugi. Tu najczęściej dochodzi do pomyłki, bo oba wyglądają podobnie.',
            tipEN:'A real alternative: you pick one or the other. This is where the mix-up usually happens, because the two look alike.'},
  kolizja: {slowoPL:'KOLIZJA', slowoEN:'CLASH',      glif:'&#215;',
            prostoPL:'da się połączyć, ale płacisz dwa razy', prostoEN:'you can combine them, but you pay twice',
            tipPL:'Dają się połączyć, ale wtedy płacisz dwa razy za to samo. Zwykle znaczy to, że jeden z nich jest zbędny.',
            tipEN:'They can be combined, but then you pay twice for the same thing. Usually it means one of them is redundant.'}
};

/* --- 2.5 Adnotacje uczciwosci. Pieciu wzorcom przyznajemy wprost, ze
       w katalogach branzowych nie stoja rowno z reszta. --- */
var WZ_UWAGA={
  react:{
    pl:'Grupa SILNIK stoi na wąskiej podstawie i trzeba to powiedzieć wprost. Jedna praca (preprint arXiv 2605.13850, bez recenzji) wyklucza ReAct z listy wzorców jako "zewnętrzną pętlę wykonawczą". Jedyne sprawdzone źródło, które naprawdę ma osobną warstwę silnika (Google ADK), umieszcza w niej sekwencję, równoległość i pętlę - czyli rzeczy, które u nas siedzą w topologiach - a ReActa nie ma tam w ogóle. Trzymamy go osobno, bo to jest prawda o tym systemie: każdy agent tutaj pracuje w tej pętli. Nie jest to jednak ustalony podział branżowy.',
    en:'The ENGINE group stands on a narrow base and that has to be said plainly. One paper (the arXiv preprint 2605.13850, not peer reviewed) excludes ReAct from the pattern list as an "outer execution loop". The only source checked that really does keep a separate engine layer (Google ADK) puts sequence, parallelism and loop in it - the very things we keep among the topologies - and ReAct is not there at all. We keep it apart because it is true of this system: every agent here works in that loop. It is not, however, an established industry split.'},
  reflection:{
    pl:'Część źródeł dzieli to na więcej niż dwie odrębne architektury (pętla generator-krytyk, ciągłe doszlifowywanie jednego wyniku i inne warianty) - do czterech, zależnie od źródła. Tutaj rysujemy dla całego wzorca jeden kształt (pętlę) i nie twierdzimy, że wszystkie te warianty naprawdę dzielą tę samą geometrię - to uproszczenie tego katalogu, nie ustalony fakt.',
    en:'Some sources split this into more than two separate architectures (a generator-critic loop, continuous polishing of one result, and other variants) - up to four, depending on the source. Here we draw one shape (a loop) for the whole pattern, and we do not claim that all of those variants really share that geometry - this is a simplification of this catalog, not an established fact.'},
  blackboard:{
    /* v41: pierwsze zdanie mowilo o znaczniku "rzadki" przy kafelku. Znacznik zostal
       usuniety, wiec zdanie odsylaloby do czegos, czego juz nie ma na ekranie. Sama tresc
       (skad ta nazwa i dlaczego ja trzymamy) zostaje bez zmian - to ona niosla informacje,
       a nie plakietka. */
    pl:'Ta nazwa (lata 80., systemy eksperckie) nie występuje jako osobny, nazwany wzorzec w żadnym z sześciu sprawdzonych katalogów 2025-2026 - nowsze źródła opisują tę samą ideę jako "dzielony stan" albo "topologię typu mesh". Trzymamy ją, bo ten system naprawdę na niej stoi: plik MANIFEST.md pełni rolę tablicy. Warto wiedzieć, że w tym jednym miejscu idziemy własną drogą.',
    en:'This name (1980s expert systems) does not appear as a separate, named pattern in any of the six catalogs checked for 2025-2026 - newer sources describe the same idea as "shared state" or "a mesh topology". We keep it because this system really does stand on it: the MANIFEST.md file plays the role of the board. It is worth knowing that here, in this one place, we go our own way.'},
  guardrails:{
    pl:'To najlepiej udokumentowana z naszych trzech granic, ale nie jednogłośna. Anthropic, OpenAI Agents SDK i AWS traktują to jako warstwę bezpieczeństwa nakładaną na dowolny wzorzec - AWS ma dla tego całkowicie osobny dokument, poza katalogiem wzorców orkiestracji. Preprint arXiv 2605.13850 idzie inaczej: wciska to w komórkę swojej siatki pod nazwą "Guardrail Sandwich", którą jego autorzy musieli wymyślić, bo żaden istniejący termin tam nie pasował.',
    en:'This is the best documented of our three boundaries, but it is not unanimous. Anthropic, the OpenAI Agents SDK and AWS treat it as a safety layer laid over any pattern - AWS keeps a completely separate document for it, outside the orchestration pattern catalog. The arXiv preprint 2605.13850 goes the other way: it forces this into a cell of its grid under the name "Guardrail Sandwich", a name its own authors had to invent because no existing term fit there.'},
  hitl:{
    pl:'Tu zgody nie ma. Trzy sprawdzone źródła (Anthropic, OpenAI SDK, AWS) traktują to jako punkt kontrolny nakładany na dowolną topologię. Dwa mówią inaczej: Google ADK ma to jako pełnoprawny, równorzędny wzorzec, a preprint arXiv 2605.13850 daje mu własną komórkę w siatce ("Approval Gate"). Postawiliśmy je w warstwach, bo tak robi większość - ale to jest wybór, nie fakt.',
    en:'Here there is no agreement. Three of the sources checked (Anthropic, OpenAI SDK, AWS) treat this as a checkpoint laid over any topology. Two say otherwise: Google ADK keeps it as a full, equal pattern, and the arXiv preprint 2605.13850 gives it a cell of its own in the grid ("Approval Gate"). We placed it among the layers because that is what the majority does - but it is a choice, not a fact.'}
};

/* Wzorce ze znacznikiem "rzadki" przy kafelku.
   Znacznik jest zbudowany wg wzorca GOV.UK Tag (W4, najlepiej udokumentowana
   czesc tamtego researchu): PRZYMIOTNIK, nie czasownik ("rzadki", nie
   "uzywaj ostroznie"); prawdziwy tekst, wiec kolor nigdy nie jest jedynym
   nosnikiem; wariant neutralny (szary), stosowany spojnie w calej aplikacji;
   stoi OBOK nazwy wzorca, nie zamiast niej - dokladnie jak "React: ready"
   w statusach komponentow Primera. */
var WZ_RZADKI={blackboard:1};

/* --- 2.6 Pary domyslne dla zestawienia. Wylacznie w obrebie jednej grupy:
       zestawianie silnika z warstwa nie wydobywa zasady, tylko klei dwie
       niewspolmierne rzeczy. ReAct nie ma pary i to jest pointa. --- */
var WZ_PARA={
  prompt_chaining:'routing',
  routing:'prompt_chaining',
  orchestrator_worker:'map_reduce',
  map_reduce:'orchestrator_worker',
  reflection:'debate',
  debate:'reflection',
  blackboard:'orchestrator_worker',
  hitl:'guardrails',
  guardrails:'hitl'
};

/* Stan trybu zestawienia. Zawsze startuje od widoku pojedynczego,
   nie jest zapamietywany miedzy otwarciami nakladki. */
var WZ_TRYB='jeden';
var WZ_PARTNER=null;

/* --- 2.7 Dwie podmiany w danych, ktore MUSZA wejsc razem z grupowaniem.

   (a) Wzorzec startowy. Dzis modul otwiera sie na Blackboardzie: na wzorcu,
       ktorego nie ma w zadnym katalogu, ze znacznikiem "rzadki" i z akapitem
       tlumaczacym sie ze swojej obecnosci. To sa najgorsze mozliwe drzwi
       wejsciowe (DD46 plus W3: pierwszy wzorzec ucz solo). ReAct jest pierwszy
       w ukladzie grup i dotyczy kazdego agenta w tym systemie.

   (b) Pierwsze zdanie Przewodnika mowi dzis "te wzorce nie sa alternatywami",
       co wprost przeczy nowym naglowkom grup. Dwie zakladki jednego modulu
       nie moga twierdzic rzeczy przeciwnych. Podmieniamy je tak, zeby mowily
       to samo co chmurki grup - czyli prawde o obu przypadkach naraz.
   Jesli wolisz zmienic to w samym HTML, skasuj ten blok. --- */
WZ_CUR='react';

if(typeof WZ_GUIDE_PL!=='undefined'){
  WZ_GUIDE_PL.when='Te wzorce nie ustawiają się w jednym rzędzie. ReAct jest silnikiem: każdy pojedynczy agent i tak pracuje w tej pętli, cokolwiek zbudujesz wyżej. Topologie to kształty przepływu - część wybierasz zamiast siebie (stały łańcuch albo zwrotnica), część dokładasz na wierzch innego kształtu (Reflection, Debate), a bardzo często jeden siedzi w drugim: Orchestrator-Worker w środku używa Routingu. Human-in-the-Loop i Guardrails to warstwy: dokładasz je do wybranej topologii, prawie każdej - Blackboard bez kontrolera zapisu jest wyjątkiem, bo barierka nie ma tam czego pilnować. Realny system wieloagentowy używa kilku naraz.';
}
if(typeof WZ_GUIDE_EN!=='undefined'){
  WZ_GUIDE_EN.when='These patterns do not line up in one row. ReAct is the engine: every single agent works in that loop anyway, whatever you build on top. Topologies are shapes of flow - some you pick instead of one another (a fixed chain or a switch), some you add on top of another shape (Reflection, Debate), and very often one sits inside another: Orchestrator-Worker uses Routing inside itself. Human-in-the-Loop and Guardrails are layers: you add them to the topology you picked, almost any of them - Blackboard with no write controller is the exception, because a guardrail has nothing to watch there. A real multi-agent system uses several at once.';
}

/* ===================================================================
   3. POMOCNICZE
   =================================================================== */

if(typeof wzEsc!=='function'){
  window.wzEsc=function(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')};
}
if(typeof wzT!=='function'){
  window.wzT=function(pl,en){return (typeof currentLang!=='undefined'&&currentLang==='en')?en:pl};
}
function wzGrupaId(id){
  for(var i=0;i<WZ_GRUPY.length;i++){
    if(WZ_GRUPY[i].wzorce.indexOf(id)>=0) return WZ_GRUPY[i].id;
  }
  return 'topologia';
}
function wzGrupaObj(gid){
  for(var i=0;i<WZ_GRUPY.length;i++){ if(WZ_GRUPY[i].id===gid) return WZ_GRUPY[i]; }
  return WZ_GRUPY[1];
}
function wzGrupaNazwa(g){return wzT(g.nazwaPL,g.nazwaEN)}
function wzGrupaProsto(g){return wzT(g.prostoPL,g.prostoEN)}

/* Glif grupy. Ksztalt, nie kolor: petla, rozwidlenie, dwie warstwy. */
function wzGlif(gid){
  var w='<svg class="wz-glif" viewBox="0 0 14 14" aria-hidden="true" focusable="false">';
  if(gid==='silnik'){
    w+='<circle cx="7" cy="7.4" r="4.4" fill="none" stroke="currentColor" stroke-width="1.4" stroke-dasharray="21 7"/>';
    w+='<path d="M10.2 3.1 L12.1 5.2 L9.3 5.6 Z" fill="currentColor"/>';
  }else if(gid==='topologia'){
    w+='<path d="M1.4 7 L6 7 M6 7 L12.2 3 M6 7 L12.2 11" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>';
  }else{
    w+='<path d="M1.4 4.6 L12.6 4.6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 2" stroke-linecap="round"/>';
    w+='<path d="M1.4 9.6 L12.6 9.6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>';
  }
  return w+'</svg>';
}

/* Chmurka: tresc w prawdziwym elemencie, nie w data-*. */
var WZ_TIP_N=0;
function wzTip(tresc,naPrawo){
  WZ_TIP_N++;
  var id='wzTip'+WZ_TIP_N;
  return {id:id, html:'<span class="wz-tip-tr'+(naPrawo?' wz-tip-pr':'')+'" role="tooltip" id="'+id+'">'+wzEsc(tresc)+'</span>'};
}

/* ===================================================================
   4. RYSUNEK KSZTALTU
   Etykiety pochodza z istniejacego pola howItWorks[i].label - zero nowej
   tresci na etykiety i zero ryzyka rozjazdu PL/EN.
   Kazdy z czterech krokow ma w rysunku swoj numer. Tekst dostaja tylko
   te kroki, dla ktorych jest miejsce - reszte czyta sie w karcie
   JAK DZIALA pod tym samym numerem. To jest wiazanie przez numer,
   a nie powtorzenie tego samego zdania dwa razy.
   =================================================================== */

/* Etykieta do rysunku: ucinamy nawias na koncu ("Bramka (opcjonalnie)"
   -> "Bramka"). Opcjonalnosc niesie linia przerywana, nie slowo. */
function wzKrotka(s){return String(s==null?'':s).replace(/\s*\([^)]*\)\s*$/,'')}

/* Lamanie tekstu na linie. Dlugie slowo lamiemy twardo, zeby nigdy nie
   wyszlo poza pudelko. */
function wzWrap(txt,maxCh,maxLin){
  var slowa=String(txt).split(/\s+/), linie=[], b='';
  for(var i=0;i<slowa.length;i++){
    var s=slowa[i];
    while(s.length>maxCh){
      if(b){linie.push(b);b='';}
      linie.push(s.slice(0,maxCh-1)+'-');
      s=s.slice(maxCh-1);
    }
    if(!b){b=s;}
    else if((b+' '+s).length<=maxCh){b=b+' '+s;}
    else {linie.push(b);b=s;}
  }
  if(b) linie.push(b);
  if(linie.length>maxLin){
    linie=linie.slice(0,maxLin);
    linie[maxLin-1]=linie[maxLin-1].slice(0,Math.max(1,maxCh-1))+'.';
  }
  return linie;
}

function wzShpTxt(cx,cy,txt,w,fs,maxLin,dim){
  var maxCh=Math.max(4,Math.floor((w-8)/(fs*0.6)));
  var linie=wzWrap(txt,maxCh,maxLin||2);
  var lh=fs*1.28, y0=cy-((linie.length-1)*lh)/2+fs*0.35, o='';
  for(var i=0;i<linie.length;i++){
    o+='<text class="wz-shp-t'+(dim?' wz-shp-dimt':'')+'" x="'+cx+'" y="'+(y0+i*lh).toFixed(1)+
       '" font-size="'+fs+'" text-anchor="middle">'+wzEsc(linie[i])+'</text>';
  }
  return o;
}
function wzShpBox(x,y,w,h,txt,fs,prz,dim){
  var o='<rect class="wz-shp-box'+(prz?' wz-shp-prz':'')+(dim?' wz-shp-dim':'')+
        '" x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="6"/>';
  if(txt) o+=wzShpTxt(x+w/2,y+h/2,txt,w,fs||8,h>=34?3:2,dim);
  return o;
}
function wzShpNr(x,y,n){
  return '<rect class="wz-shp-nr" x="'+x+'" y="'+y+'" width="14" height="12" rx="3"/>'+
         '<text class="wz-shp-nrt" x="'+(x+7)+'" y="'+(y+8.8)+'" font-size="8" text-anchor="middle">'+n+'</text>';
}
function wzShpArr(mk,x1,y1,x2,y2,dbl){
  return '<path class="wz-shp-lin" d="M'+x1+' '+y1+' L'+x2+' '+y2+'" marker-end="url(#'+mk+')"'+
         (dbl?' marker-start="url(#'+mk+')"':'')+'/>';
}
function wzShpPath(mk,d){
  return '<path class="wz-shp-lin" d="'+d+'" marker-end="url(#'+mk+')"/>';
}

/* Zwraca {h, tresc} - wysokosc viewBox i zawartosc SVG.
   L to tablica GNIAZD: L[i]={t:'etykieta', n:numer kroku}. Numer zawsze
   pochodzi z oryginalnej kolejnosci howItWorks, nawet gdy `wezly` przestawia
   etykiety - inaczej rysunek i lista JAK DZIALA rozjechalyby sie numerami. */
function wzUklad(k,L,mk){
  var prz=k.przerywane;
  function P(i){return prz&&prz.indexOf(i)>=0}
  function T(i){return L[i]?L[i].t:''}
  function N(i){return L[i]?L[i].n:(i+1)}
  var o='', h=100;

  if(k.uklad==='linia'){
    h=58;
    var xs=[1,78,155,232], i;
    for(i=0;i<4;i++){
      o+=wzShpBox(xs[i],14,65,42,T(i),7.5,P(i));
      o+=wzShpNr(xs[i]+3,8,N(i));
    }
    for(i=0;i<3;i++){ o+=wzShpArr(mk,xs[i]+66,35,xs[i+1]-2,35); }

  }else if(k.uklad==='petla'){
    h=96;
    var xp=[2,108,214], j;
    for(j=0;j<3;j++){
      o+=wzShpBox(xp[j],14,84,42,T(j),8,P(j));
      o+=wzShpNr(xp[j]+3,8,N(j));
    }
    o+=wzShpArr(mk,88,35,106,35);
    o+=wzShpArr(mk,194,35,212,35);
    o+=wzShpPath(mk,'M256 58 L256 72 L46 72 L46 59');
    o+=wzShpNr(143,66,N(3));
    o+=wzShpTxt(150,88,T(3),240,8,1);

  }else if(k.uklad==='wachlarz'){
    h=106;
    o+=wzShpBox(1,41,74,42,T(0),8,P(0));
    o+=wzShpNr(4,35,N(0));
    o+=wzShpBox(112,6,76,24,'',8,P(2),true);
    o+=wzShpBox(112,44,76,24,T(2),8,P(2));
    o+=wzShpBox(112,82,76,24,'',8,P(2),true);
    o+=wzShpNr(115,38,N(2));
    o+=wzShpBox(224,41,74,42,T(3),8,P(3));
    o+=wzShpNr(227,35,N(3));
    o+=wzShpArr(mk,75,62,110,20)+wzShpArr(mk,75,62,110,56)+wzShpArr(mk,75,62,110,92);
    o+=wzShpArr(mk,190,20,222,62)+wzShpArr(mk,190,56,222,62)+wzShpArr(mk,190,92,222,62);
    o+=wzShpNr(k.strzalka==='wejscie'?196:86,56,N(1));

  }else if(k.uklad==='zwrotnica'){
    h=106;
    o+=wzShpBox(1,41,86,42,T(0),8,P(0));
    o+=wzShpNr(4,35,N(0));
    o+='<path class="wz-shp-lin" d="M88 62 L101 62"/>';
    o+='<circle class="wz-shp-dot" cx="104" cy="62" r="3"/>';
    o+=wzShpBox(134,6,164,24,'',8,false,true);
    o+=wzShpBox(134,44,164,24,T(2),8,P(2));
    o+=wzShpBox(134,82,164,24,T(3),8,P(3),true);
    o+=wzShpNr(137,38,N(2));
    o+=wzShpNr(137,76,N(3));
    o+=wzShpArr(mk,107,62,132,20)+wzShpArr(mk,107,62,132,56)+wzShpArr(mk,107,62,132,92);
    o+=wzShpNr(110,44,N(1));

  }else if(k.uklad==='krag'){
    h=118;
    o+=wzShpBox(1,44,62,38,T(2),7.5,P(2));
    o+=wzShpNr(4,38,N(2));
    o+=wzShpBox(92,4,96,24,'',8,false,true);
    o+=wzShpBox(92,46,96,24,T(0),8,P(0));
    o+=wzShpBox(92,88,96,24,'',8,false,true);
    o+=wzShpNr(95,40,N(0));
    o+=wzShpBox(222,42,76,42,T(3),8,P(3));
    o+=wzShpNr(225,36,N(3));
    o+=wzShpArr(mk,64,63,90,16)+wzShpArr(mk,64,63,90,58)+wzShpArr(mk,64,63,90,100);
    o+=wzShpArr(mk,140,30,140,44,true);
    o+=wzShpArr(mk,140,72,140,86,true);
    o+=wzShpNr(146,30,N(1));
    o+=wzShpArr(mk,189,16,220,63)+wzShpArr(mk,189,58,220,63)+wzShpArr(mk,189,100,220,63);

  }else if(k.uklad==='tablica'){
    h=134;
    o+=wzShpBox(6,8,88,22,'',7.5,false,true);
    o+=wzShpBox(106,8,88,22,T(1),7.5,P(1));
    o+=wzShpBox(206,8,88,22,'',7.5,false,true);
    o+=wzShpNr(109,2,N(1));
    o+=wzShpBox(30,54,240,36,T(0),9,P(0));
    o+=wzShpNr(33,48,N(0));
    o+=wzShpArr(mk,50,32,50,52,true);
    o+=wzShpArr(mk,150,32,150,52,true);
    o+=wzShpArr(mk,250,32,250,52,true);
    o+=wzShpNr(43,36,N(3));
    o+=wzShpBox(80,108,140,24,T(2),8,P(2));
    o+=wzShpNr(83,102,N(2));
    o+=wzShpArr(mk,150,107,150,92);

  }else{ /* warstwa */
    h=100;
    o+='<rect class="wz-shp-ram" x="74" y="10" width="152" height="80" rx="12"/>';
    o+=wzShpBox(86,36,128,28,wzT('dowolna topologia','any topology'),7,false,true);
    o+='<rect class="wz-shp-gate" x="70" y="32" width="8" height="36" rx="2"/>';
    o+='<rect class="wz-shp-gate" x="222" y="32" width="8" height="36" rx="2"/>';
    o+=wzShpNr(60,14,N(0));
    o+=wzShpNr(226,14,N(1));
    o+=wzShpTxt(35,52,T(0),70,8,3);
    o+=wzShpTxt(265,52,T(1),70,8,3);
    o+=wzShpNr(143,84,N(2));
    o+=wzShpNr(143,4,N(3));
  }
  return {h:h,tresc:o};
}

/* Pelny blok rysunku z podpisem "ksztalt: <proste slowo>". */
function wzKsztaltHtml(id){
  var k=WZ_KSZTALT[id]; if(!k) return '';
  var d=(typeof wzData==='function')?wzData(id):null; if(!d||!d.howItWorks) return '';
  var wez=k.wezly||[0,1,2,3], L=[],i,krok;
  for(i=0;i<4;i++){
    krok=wez[i]; if(typeof krok!=='number') krok=i;
    L.push({t:wzKrotka(d.howItWorks[krok]?d.howItWorks[krok].label:''), n:krok+1});
  }
  var mk='wzGrot_'+id;
  var u=wzUklad(k,L,mk);
  var svg='<svg viewBox="0 0 300 '+u.h+'" aria-hidden="true" focusable="false" role="presentation">'+
    '<defs><marker id="'+mk+'" viewBox="0 0 8 8" refX="7.2" refY="4" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse">'+
    '<path class="wz-shp-grot" d="M0 0 L8 4 L0 8 Z"/></marker></defs>'+u.tresc+'</svg>';
  var sl=WZ_KSZTALT_SLOWO[k.uklad]||{pl:'',en:''};
  return '<div class="wz-ksztalt">'+svg+'<div class="wz-ksztalt-slowo">'+
    wzT('kształt: ','shape: ')+wzEsc(wzT(sl.pl,sl.en))+'</div></div>';
}

/* ===================================================================
   5. ETAP 1: grupy chipow
   =================================================================== */
/* v41: plakietka "rzadki" USUNIETA na prosbe Macieja. Cala jej tresc stoi juz na stale
   na karcie wzorca w bloku "Uczciwie:" (WZ_UWAGA), wiec nie ginie zadna informacja -
   znika tylko drugie, gorsze miejsce podania tej samej rzeczy: male, szare slowo
   z chmurka, ktorej trzeba szukac mysza. WZ_RZADKI zostaje w pliku jako dane, bo
   opisuje fakt o wzorcach (nie wystepuja w katalogach), a nie sposob ich rysowania. */
function wzChip(id){
  return '<button type="button" class="wz-chip'+(id===WZ_CUR?' on':'')+'" aria-pressed="'+
    (id===WZ_CUR?'true':'false')+'" onclick="wzSelect(\''+id+'\')">'+
    '<span class="wz-kropka" aria-hidden="true"></span>'+
    (WZ_META[id]?WZ_META[id].icon:'')+' '+wzEsc(WZ_NAME[id])+'</button>';
}

function wzGrupyHtml(){
  var h='<div class="wz-grupy">',gi;
  var uzyte={};
  for(gi=0;gi<WZ_GRUPY.length;gi++){
    var g=WZ_GRUPY[gi], lista=[], k;
    for(k=0;k<g.wzorce.length;k++){
      if(WZ_NAME[g.wzorce[k]]){ lista.push(g.wzorce[k]); uzyte[g.wzorce[k]]=1; }
    }
    /* Siatka bezpieczenstwa: wzorzec dodany do WZ_ORDER, a nie dopisany
       do zadnej grupy, laduje w topologiach zamiast zniknac z ekranu. */
    if(g.id==='topologia'){
      for(k=0;k<WZ_ORDER.length;k++){
        if(!uzyte[WZ_ORDER[k]] && !wzWGrupie(WZ_ORDER[k])) { lista.push(WZ_ORDER[k]); uzyte[WZ_ORDER[k]]=1; }
      }
    }
    var t=wzTip(wzT(g.tipPL,g.tipEN));
    /* aria-labelledby na kontenerze grupy jest OBOWIAZKOWE niezaleznie od tego,
       czy etykieta jest widoczna z boku, nad grupa, czy wcale (W4: kazdy
       sprawdzony system tego wymaga). Bez tego czytnik ekranu slyszy plaska
       liste dziesieciu przyciskow i cala nauka z grupowania przepada. */
    /* [D6] Etykieta nie robi nic po Enter/Spacji - w <button> to byloby martwy
       przystanek Tab, oglaszany czytnikowi ekranu jako "przycisk" bez zadnej
       akcji (WZORCE_QA.md, zarzut D6). Ten sam plik ma juz poprawny wzorzec dla
       "tresc niesie chmurke, ale nie jest przyciskiem": .wz-relw-b to
       <span tabindex="0">, nie <button>. Etykieta grupy idzie ta sama drogą -
       fokusowalna dla chmurki, bez falszywej semantyki "przycisk". */
    h+='<div class="wz-grupa" role="group" aria-labelledby="wzg-'+g.id+'">'+
       '<span tabindex="0" id="wzg-'+g.id+'" class="wz-getykieta wz-tip" aria-describedby="'+t.id+'">'+
         '<span class="wz-gnazwa">'+wzGlif(g.id)+wzEsc(wzGrupaNazwa(g))+'</span>'+
         '<span class="wz-gprosto">'+wzEsc(wzGrupaProsto(g))+'</span>'+t.html+
       '</span>'+
       '<div class="wz-chips">';
    for(k=0;k<lista.length;k++){ h+=wzChip(lista[k]); }
    h+='</div></div>';
  }
  h+='</div>';
  h+='<p class="wz-zrodlo">'+wzEsc(wzT(WZ_ZRODLO.pl,WZ_ZRODLO.en))+'</p>';
  return h;
}
function wzWGrupie(id){
  for(var i=0;i<WZ_GRUPY.length;i++){ if(WZ_GRUPY[i].wzorce.indexOf(id)>=0) return true; }
  return false;
}

/* ===================================================================
   6. ETAP 2: powiazane wzorce
   =================================================================== */
function wzRelacjeDla(id){
  var out=[],i,r,kol={zamiast:0,uzywa:1,kolizja:2};
  for(i=0;i<WZ_REL.length;i++){
    r=WZ_REL[i];
    if(r.a===id) out.push({inny:r.b,typ:r.typ,nota:wzT(r.pl,r.en),k:kol[r.typ]});
    else if(r.b===id) out.push({inny:r.a,typ:r.typ,nota:wzT(r.pl,r.en),k:kol[r.typ]});
  }
  out.sort(function(x,y){return x.k-y.k});
  return out;
}
/* zewn/wewn (dodane dla wzZlozenieHtml, etap 4): dla relacji typu 'uzywa' pole
   `a` w WZ_REL jest zawsze wzorcem, KTORY UZYWA drugiego - czyli tym zewnetrznym,
   w ktorego srodku siedzi ten drugi. Zwracamy to niezaleznie od tego, w jakiej
   kolejnosci wywolujacy poda (a,b), bo widok zestawienia moze dostac pare
   w dowolnym kierunku (wzZestaw(id, sasiad) - id jest raz a, raz b w WZ_REL). */
function wzRelacjaMiedzy(a,b){
  for(var i=0;i<WZ_REL.length;i++){
    var r=WZ_REL[i];
    if(r.a===a&&r.b===b) return {typ:r.typ,nota:wzT(r.pl,r.en),zewn:r.a,wewn:r.b};
    if(r.a===b&&r.b===a) return {typ:r.typ,nota:wzT(r.pl,r.en),zewn:r.a,wewn:r.b};
  }
  return null;
}
/* [NOWE] Legenda trzech typow relacji, widoczna NA STALE (nie w chmurce).
   Definicje UZYWA/ZAMIAST/KOLIZJA byly dostepne wylacznie po najechaniu na slowo
   relacji - to lamalo wlasna regule systemu "chmurka poglebia, nie niesie
   podstaw" (WZORCE_SYSTEM.md 1.4, WZORCE_DYDAKTYKA_CHECK.md punkt 2). Krotka
   legenda tutaj niesie podstawe; chmurka na kazdym slowie relacji ponizej
   dalej dziala i dalej poglebia. */
function wzRelLegenda(){
  var kolej=['zamiast','uzywa','kolizja'], h='<div class="wz-rellegenda">',i,o;
  for(i=0;i<kolej.length;i++){
    o=WZ_REL_OPIS[kolej[i]];
    h+='<span class="wz-rellegenda-i"><b aria-hidden="true">'+o.glif+'</b> '+
       wzEsc(wzT(o.slowoPL,o.slowoEN))+' <span class="wz-rellegenda-p">'+
       wzEsc(wzT(o.prostoPL,o.prostoEN))+'</span></span>';
  }
  return h+'</div>';
}

function wzRelacjeHtml(id){
  var lista=wzRelacjeDla(id); if(!lista.length) return '';
  var h='<div class="wz-card wz-full"><div class="wz-h">'+
        wzT('POWIĄZANE WZORCE','RELATED PATTERNS')+'</div>'+wzRelLegenda()+'<div class="wz-relw">',i;
  for(i=0;i<lista.length;i++){
    var w=lista[i], o=WZ_REL_OPIS[w.typ];
    var t=wzTip(wzT(o.tipPL,o.tipEN));
    var gid=wzGrupaId(w.inny);
    var taSama=(gid===wzGrupaId(id));
    h+='<div class="wz-relw-i wz-'+w.typ+'">'+
       '<span class="wz-relw-b wz-tip" tabindex="0" aria-describedby="'+t.id+'">'+
         '<span aria-hidden="true">'+o.glif+'</span>'+wzEsc(wzT(o.slowoPL,o.slowoEN))+t.html+'</span>'+
       '<span class="wz-relw-tresc"><span class="wz-relw-n">'+wzGlif(gid)+wzEsc(WZ_NAME[w.inny])+
         '</span> - '+wzEsc(w.nota)+'</span>'+
       '<span class="wz-relw-akcje">'+
         '<button type="button" onclick="wzSelect(\''+w.inny+'\')">'+wzT('Otwórz','Open')+'</button>'+
         (taSama?'<button type="button" onclick="wzZestaw(\''+id+'\',\''+w.inny+'\')">'+
           wzT('Zestaw','Compare')+'</button>':'')+
       '</span></div>';
  }
  return h+'</div></div>';
}

/* ===================================================================
   7. ETAP 4: zestawienie pary
   =================================================================== */
function wzPeersGrupy(id){
  var g=wzGrupaObj(wzGrupaId(id)), out=[],i;
  for(i=0;i<g.wzorce.length;i++){ if(g.wzorce[i]!==id && WZ_NAME[g.wzorce[i]]) out.push(g.wzorce[i]); }
  return out;
}
function wzZestaw(a,b){
  var peers=wzPeersGrupy(a);
  if(!peers.length) return;
  if(!b || peers.indexOf(b)<0) b=(WZ_PARA[a] && peers.indexOf(WZ_PARA[a])>=0)?WZ_PARA[a]:peers[0];
  WZ_CUR=a; WZ_PARTNER=b; WZ_TRYB='para';
  wzRenderKatalog(); wzDoGory();
}
function wzZestawZmien(el){ WZ_PARTNER=el.value; wzRenderKatalog(); }
function wzZestawKoniec(){ WZ_TRYB='jeden'; WZ_PARTNER=null; wzRenderKatalog(); wzDoGory(); }
function wzDoGory(){
  var b=document.querySelector('#wzOverlay .wz-body');
  if(b) b.scrollTop=0;
}

function wzTezaHtml(a,b){
  var r=wzRelacjaMiedzy(a,b);
  var zd;
  if(r){
    zd='<b>'+wzEsc(WZ_NAME[a])+'</b> '+wzT('kontra','against')+' <b>'+wzEsc(WZ_NAME[b])+'</b>: '+wzEsc(r.nota)+'.';
  }else{
    zd=wzT('Te dwa wzorce nie mają w tym katalogu opisanej wspólnej granicy - przeczytaj obie kolumny i nazwij różnicę sam.',
           'These two patterns have no shared boundary described in this catalog - read both columns and name the difference yourself.');
  }
  var ka=WZ_KSZTALT[a]?WZ_KSZTALT[a].uklad:'', kb=WZ_KSZTALT[b]?WZ_KSZTALT[b].uklad:'';
  var sa=WZ_KSZTALT_SLOWO[ka]||{pl:'',en:''}, sb=WZ_KSZTALT_SLOWO[kb]||{pl:'',en:''};
  var kl;
  if(ka && ka===kb){
    kl=wzT('Ten sam kształt: ','The same shape: ')+wzEsc(wzT(sa.pl,sa.en))+'. '+
       wzT('Różnica nie siedzi w rysunku - siedzi w zdaniu powyżej.',
           'The difference does not sit in the drawing - it sits in the sentence above.');
  }else{
    kl=wzT('Kształt: ','Shape: ')+wzEsc(wzT(sa.pl,sa.en))+' '+wzT('kontra','against')+' '+wzEsc(wzT(sb.pl,sb.en))+'.';
  }
  return '<div class="wz-teza"><div class="wz-teza-h">'+wzT('RÓŻNICA','THE DIFFERENCE')+'</div>'+
    '<p class="wz-teza-z">'+zd+'</p><p class="wz-teza-k">'+kl+'</p></div>';
}

function wzKolumnaHtml(id){
  var d=wzData(id); if(!d) return '<div class="wz-zcol"></div>';
  var gid=wzGrupaId(id), g=wzGrupaObj(gid),i;
  var h='<div class="wz-zcol">';
  h+=wzKsztaltHtml(id);
  h+='<div><span class="wz-plakietka">'+wzGlif(gid)+wzEsc(wzGrupaNazwa(g))+'</span>'+
     '<h4>'+wzEsc(WZ_NAME[id])+'</h4>'+
     '<div class="wz-tag">'+wzEsc(d.tagline)+'</div></div>';
  h+='<div><div class="wz-h">'+wzT('KIEDY UŻYWAĆ','WHEN TO USE')+'</div><ul class="wz-list">';
  for(i=0;i<d.whenUse.length;i++){ h+='<li>'+wzEsc(d.whenUse[i])+'</li>'; }
  h+='</ul></div>';
  h+='<div><div class="wz-h">'+wzT('KIEDY UNIKAĆ','WHEN TO AVOID')+'</div><ul class="wz-list">';
  for(i=0;i<d.whenAvoid.length;i++){ h+='<li>'+wzEsc(d.whenAvoid[i])+'</li>'; }
  h+='</ul></div>';
  return h+'</div>';
}

/* [NOWE] Uklad dla par typu UZYWA (etap 4). WZORCE_DYDAKTYKA_CHECK.md, punkt 3:
   wzKolumnaHtml (kontrast KIEDY UZYWAC / KIEDY UNIKAC dwoch rownorzednych kolumn)
   jest wlasciwym narzedziem dla ZAMIAST (prawdziwa alternatywa), ale dla UZYWA
   sugeruje wybor jednego z dwoch, podczas gdy chodzi o zlozenie jednego w drugim.
   Ten uklad nie udaje kontrastu: pokazuje, ktory wzorzec jest zewnetrzny (caly
   przeplyw), ktory wewnetrzny (element wewnatrz niego) i w ktorym miejscu ten
   drugi sie wpina - zdaniem z tej samej relacji (WZ_REL), nie nowym polem danych. */
function wzZlozenieHtml(zewn,wewn,nota){
  var dz=wzData(zewn), dw=wzData(wewn);
  if(!dz||!dw) return '';
  var gz=wzGrupaObj(wzGrupaId(zewn)), gw=wzGrupaObj(wzGrupaId(wewn));
  /* Karta wewnetrzna jest DZIECKIEM zewnetrznej, nie jej rodzenstwem. To cala
     zmiana: strzalka w dol zostala usunieta, bo dwa pudelka ze strzalka miedzy
     nimi czytaja sie jako kolejnosc krokow, a nie jako "jeden w drugim". */
  var h='<div class="wz-zloz">';
  h+='<div class="wz-zloz-cz wz-zloz-zewn">'+wzKsztaltHtml(zewn)+
     '<div class="wz-zloz-etyk">'+wzT('ZEWNĘTRZNY - CAŁY PRZEPŁYW','OUTER - THE WHOLE FLOW')+'</div>'+
     '<span class="wz-plakietka">'+wzGlif(gz.id)+wzEsc(wzGrupaNazwa(gz))+'</span>'+
     '<h4>'+wzEsc(WZ_NAME[zewn])+'</h4><div class="wz-tag">'+wzEsc(dz.tagline)+'</div>'+
     '<p class="wz-zloz-wsrodku">'+wzT('W ŚRODKU UŻYWA','INSIDE IT USES')+'</p>'+
     '<div class="wz-zloz-cz wz-zloz-wewn">'+wzKsztaltHtml(wewn)+
       '<div class="wz-zloz-etyk">'+wzT('WEWNĘTRZNY - WPINA SIĘ TUTAJ','INNER - PLUGS IN HERE')+'</div>'+
       '<span class="wz-plakietka">'+wzGlif(gw.id)+wzEsc(wzGrupaNazwa(gw))+'</span>'+
       '<h4>'+wzEsc(WZ_NAME[wewn])+'</h4><div class="wz-tag">'+wzEsc(dw.tagline)+'</div>'+
     '</div>'+
     '</div>';
  h+='<p class="wz-zloz-opis"><b>'+wzEsc(WZ_NAME[zewn])+'</b> '+wzT('używa','uses')+' <b>'+
     wzEsc(WZ_NAME[wewn])+'</b>: '+wzEsc(nota)+'.</p>';
  return h+'</div>';
}

function wzZestawHtml(a,b){
  var peers=wzPeersGrupy(a),i;
  var wybor;
  if(peers.length>1){
    wybor='<label class="wz-zbar-h" for="wzPartner">'+wzT('kontra','against')+'</label>'+
      '<select id="wzPartner" onchange="wzZestawZmien(this)">';
    for(i=0;i<peers.length;i++){
      wybor+='<option value="'+peers[i]+'"'+(peers[i]===b?' selected':'')+'>'+wzEsc(WZ_NAME[peers[i]])+'</option>';
    }
    wybor+='</select>';
  }else{
    wybor='<span class="wz-zbar-k">'+wzT('kontra','against')+'</span>'+
          '<span class="wz-zbar-a">'+wzGlif(wzGrupaId(b))+wzEsc(WZ_NAME[b])+'</span>';
  }
  var h='<div class="wz-zbar">'+
    '<span class="wz-zbar-h">'+wzT('ZESTAWIENIE','SIDE BY SIDE')+'</span>'+
    '<span class="wz-zbar-a">'+wzGlif(wzGrupaId(a))+wzEsc(WZ_NAME[a])+'</span>'+
    wybor+
    '<span class="wz-zspacer"></span>'+
    '<button type="button" class="wz-zx" onclick="wzZestawKoniec()" aria-label="'+
      wzT('Zamknij zestawienie','Close the side by side')+'" title="'+
      wzT('Zamknij zestawienie','Close the side by side')+'">&#10005;</button></div>';
  h+=wzTezaHtml(a,b);
  /* [ZMIANA] Kontrast dwoch kolumn KIEDY UZYWAC / KIEDY UNIKAC pasuje do relacji
     ZAMIAST (prawdziwa alternatywa), ale dla UZYWA sugerowalby wybor jednego
     z dwoch - podczas gdy chodzi o zlozenie jednego w drugim. Rel typu 'uzywa'
     dostaje wlasny uklad (wzZlozenieHtml); wszystko inne (zamiast, kolizja,
     brak opisanej relacji miedzy rowiesnikami z tej samej grupy) zostaje przy
     dotychczasowym kontrascie. */
  var r=wzRelacjaMiedzy(a,b);
  if(r && r.typ==='uzywa'){
    h+=wzZlozenieHtml(r.zewn,r.wewn,r.nota);
  }else{
    h+='<div class="wz-zestaw">'+wzKolumnaHtml(a)+wzKolumnaHtml(b)+'</div>';
  }
  return h;
}

/* ===================================================================
   8. RENDER GLOWNY - zamienniki funkcji produkcyjnych
   =================================================================== */

/* [ZAMIENNIK] Klikniecie dowolnego chipa zawsze wychodzi z zestawienia. */
function wzSelect(id){ WZ_CUR=id; WZ_TRYB='jeden'; WZ_PARTNER=null; wzRenderKatalog(); }

/* [ZAMIENNIK] */
function wzRenderKatalog(){
  var pane=G('wzPaneKat'); if(!pane) return;
  var h=wzGrupyHtml();
  if(WZ_TRYB==='para' && WZ_PARTNER && WZ_PARTNER!==WZ_CUR){
    h+=wzZestawHtml(WZ_CUR,WZ_PARTNER);
  }else{
    WZ_TRYB='jeden';
    h+='<div class="wz-bento">'+wzBento(WZ_CUR)+'</div>';
  }
  pane.innerHTML=h;
}

/* [ZAMIENNIK] */
function wzBento(id){
  var d=wzData(id); if(!d) return '';
  var gid=wzGrupaId(id), g=wzGrupaObj(gid), h='',i;

  /* --- hero: ksztalt po lewej, tozsamosc po prawej --- */
  var peers=wzPeersGrupy(id);
  var dom=(WZ_PARA[id] && peers.indexOf(WZ_PARA[id])>=0)?WZ_PARA[id]:(peers.length?peers[0]:null);
  var wejscie;
  if(dom){
    wejscie='<button type="button" class="wz-cmp-btn" onclick="wzZestaw(\''+id+'\',\''+dom+'\')">'+
      wzT('Porównaj z: ','Compare with: ')+wzEsc(WZ_NAME[dom])+'</button>';
  }else{
    wejscie='<div class="wz-sam">'+wzEsc(wzT(
      'Ten wzorzec nie ma pary do zestawienia - jest jedyny w swojej grupie. Porównywać da się topologie ze sobą, nie silnik z topologią.',
      'This pattern has no partner to line up with - it is the only one in its group. Topologies compare against each other, an engine does not compare against a topology.'))+'</div>';
  }
  h+='<div class="wz-card wz-hero">'+wzKsztaltHtml(id)+
     '<div class="wz-hero-txt">'+
       '<span class="wz-plakietka">'+wzGlif(gid)+wzEsc(wzGrupaNazwa(g))+' &middot; '+wzEsc(wzGrupaProsto(g))+'</span>'+
       '<h3>'+(WZ_META[id]?WZ_META[id].icon+' ':'')+wzEsc(WZ_NAME[id])+'</h3>'+
       '<div class="wz-tag">'+wzEsc(d.tagline)+'</div>'+wejscie+
     '</div></div>';

  /* --- czym jest + adnotacja uczciwosci --- */
  var uw=WZ_UWAGA[id];
  h+='<div class="wz-card"><div class="wz-h">'+wzT('CZYM JEST','WHAT IT IS')+'</div>'+
     '<p style="margin:0;font-size:12.5px;line-height:1.6">'+wzEsc(d.whatIs)+'</p>'+
     (uw?'<div class="wz-uwaga"><b>'+wzT('Uczciwie: ','In fairness: ')+'</b>'+wzEsc(wzT(uw.pl,uw.en))+'</div>':'')+
     '</div>';

  /* --- jak dziala: te same numery, co w rysunku --- */
  h+='<div class="wz-card"><div class="wz-h">'+wzT('JAK DZIAŁA','HOW IT WORKS')+'</div><div class="wz-steps">';
  for(i=0;i<d.howItWorks.length;i++){
    h+='<div class="wz-step"><div class="wz-n">'+(i+1)+'</div><div><b>'+wzEsc(d.howItWorks[i].label)+
       '</b><br><span>'+wzEsc(d.howItWorks[i].desc)+'</span></div></div>';
  }
  h+='</div></div>';

  /* --- powiazane wzorce (etap 2) --- */
  h+=wzRelacjeHtml(id);

  /* --- reszta bento, bez zmian merytorycznych --- */
  h+='<div class="wz-card wz-sys wz-full"><div class="wz-h">'+wzT('W TYM SYSTEMIE','IN THIS SYSTEM')+
     '</div><p style="margin:0;font-size:12px;line-height:1.6">'+wzEsc(d.inThisSystem)+'</p></div>';

  h+='<div class="wz-card wz-good"><div class="wz-h">'+wzT('ZALETY','BENEFITS')+'</div><ul class="wz-list">';
  for(i=0;i<d.benefits.length;i++){ h+='<li>'+wzEsc(d.benefits[i])+'</li>'; }
  h+='</ul></div>';

  h+='<div class="wz-card wz-bad"><div class="wz-h">'+wzT('PUŁAPKI','PITFALLS')+'</div><ul class="wz-list">';
  for(i=0;i<d.pitfalls.length;i++){ h+='<li>'+wzEsc(d.pitfalls[i])+'</li>'; }
  h+='</ul></div>';

  h+='<div class="wz-card wz-good"><div class="wz-h">'+wzT('KIEDY UŻYWAĆ','WHEN TO USE')+'</div><ul class="wz-list">';
  for(i=0;i<d.whenUse.length;i++){ h+='<li>'+wzEsc(d.whenUse[i])+'</li>'; }
  h+='</ul></div>';

  h+='<div class="wz-card wz-bad"><div class="wz-h">'+wzT('KIEDY UNIKAĆ','WHEN TO AVOID')+'</div><ul class="wz-list">';
  for(i=0;i<d.whenAvoid.length;i++){ h+='<li>'+wzEsc(d.whenAvoid[i])+'</li>'; }
  h+='</ul></div>';

  h+='<div class="wz-card"><div class="wz-h">'+wzT('KLUCZOWE POJĘCIA','KEY CONCEPTS')+'</div><div class="wz-kc">';
  for(i=0;i<d.keyConcepts.length;i++){
    h+='<div class="wz-kc-item"><b>'+wzEsc(d.keyConcepts[i].term)+'</b> - '+wzEsc(d.keyConcepts[i].def)+'</div>';
  }
  h+='</div></div>';

  h+='<div class="wz-card"><div class="wz-h">'+wzT('POWIĄZANI AGENCI','RELATED AGENTS')+'</div><div class="wz-rel">';
  for(i=0;i<d.relatedAgents.length;i++){
    h+='<button type="button" onclick="wzGoAgent(\''+d.relatedAgents[i]+'\')">'+
       wzEsc(wzAgentName(d.relatedAgents[i]))+' &rarr;</button>';
  }
  h+='</div></div>';

  h+='<div class="wz-card wz-full"><div class="wz-h">'+wzT('PRZYKŁAD Z ŻYCIA','REAL EXAMPLE')+
     '</div><div class="wz-ex">'+wzEsc(d.example)+'</div></div>';

  return h;
}

/* [ZAMIENNIK - OPCJONALNY] Przewodnik dostaje te same trzy grupy, zeby
   tabela i katalog nie uczyly dwoch roznych podzialow. */
function wzRenderGuide(){
  var pane=G('wzPaneGd'); if(!pane) return;
  var g=wzGuide(), i, gi;
  var h='<div class="wz-gsec"><h3>'+wzT('Kiedy który wzorzec','Which pattern when')+'</h3><p>'+wzEsc(g.when)+'</p>';
  h+='<table class="wz-tbl"><tr><th>'+wzT('Wzorzec','Pattern')+'</th><th>'+wzT('Kiedy','When')+
     '</th><th>'+wzT('W tym systemie','In this system')+'</th></tr>';
  /* Mapa nazwa wiersza -> id wzorca, zeby wiersze dalo sie pogrupowac
     bez dopisywania nowego pola do WZ_GUIDE. */
  var poNazwie={},k;
  for(k=0;k<WZ_ORDER.length;k++){ poNazwie[WZ_NAME[WZ_ORDER[k]]]=WZ_ORDER[k]; }
  for(gi=0;gi<WZ_GRUPY.length;gi++){
    var gr=WZ_GRUPY[gi], wiersze=[];
    for(i=0;i<g.rows.length;i++){
      var id=poNazwie[g.rows[i].p];
      if(!id){ /* nazwa w tabeli nie zgadza sie z WZ_NAME - dopasowanie po prefiksie */
        for(k=0;k<WZ_ORDER.length;k++){ if(WZ_NAME[WZ_ORDER[k]].indexOf(g.rows[i].p)===0){id=WZ_ORDER[k];break;} }
      }
      if(id && wzGrupaId(id)===gr.id) wiersze.push(g.rows[i]);
    }
    if(!wiersze.length) continue;
    h+='<tr class="wz-tbl-g"><td colspan="3"><span class="wz-tbl-gl">'+wzGlif(gr.id)+
       wzEsc(wzGrupaNazwa(gr))+' <span class="wz-tbl-gp">'+wzEsc(wzGrupaProsto(gr))+'</span></span></td></tr>';
    for(i=0;i<wiersze.length;i++){
      h+='<tr><td><b>'+wzEsc(wiersze[i].p)+'</b></td><td>'+wzEsc(wiersze[i].q)+
         '</td><td>'+wzEsc(wiersze[i].a)+'</td></tr>';
    }
  }
  h+='</table></div>';
  h+='<div class="wz-gsec"><h3>'+wzT('Wspólne anty-wzorce','Common anti-patterns')+'</h3>';
  for(i=0;i<g.antipatterns.length;i++){
    h+='<div class="wz-anti"><b>'+wzEsc(g.antipatterns[i].b)+':</b> '+wzEsc(g.antipatterns[i].t)+'</div>';
  }
  h+='</div>';
  pane.innerHTML=h;
}

/* ===================================================================
   9. KLAWIATURA
   Warstwy Escape, w fazie przechwytywania, zeby istniejacy uchwyt
   zamykajacy cala nakladke nie zadzialal przedwczesnie:
     1. otwarta chmurka -> zamknij chmurke
     2. tryb zestawienia -> wroc do widoku pojedynczego
     3. reszta -> istniejacy uchwyt zamyka nakladke
   =================================================================== */
document.addEventListener('keydown',function(e){
  if(e.key!=='Escape') return;
  var ov=G('wzOverlay');
  if(!ov||!ov.classList.contains('show')) return;
  var a=document.activeElement;
  if(a&&a.classList&&a.classList.contains('wz-tip')){ a.blur(); e.stopPropagation(); return; }
  if(WZ_TRYB==='para'){ wzZestawKoniec(); e.stopPropagation(); }
},true);

/* ===================================================================
   9b. KIERUNEK CHMURKI (v41)
   Sam CSS tego nie rozstrzygnie - o tym, czy nad kotwica jest miejsce,
   wiadomo dopiero po zmierzeniu. Stad jedna funkcja mierzaca i dwa
   nasluchy na zdarzeniach, ktore poprzedzaja pokazanie chmurki.
   Nasluch siedzi na dokumencie w fazie przechwytywania, bo tresc nakladki
   jest przerysowywana i nasluch na samych chmurkach ginalby po kazdym
   przerysowaniu. Pierwsza linia kazdego wywolania to wyjscie, gdy nakladka
   Wzorcow jest zamknieta - czyli przez wiekszosc zycia aplikacji.
   =================================================================== */
/* Krawedzie, o ktore chmurka naprawde sie obija. W trybie Wzorce przycina .wz-body
   (ma overflow:auto), a nie okno przegladarki - naglowek nakladki stoi nad nim i zabiera
   miejsce, ktorego chmurka nie moze uzyc. Gdy pojemnika nie ma (inny kontekst, atrapa
   w tescie), wracamy do krawedzi okna. */
function wzGranicePrzyciecia(el){
  var p=el&&el.parentNode;
  while(p&&p.getBoundingClientRect){
    if(p.classList&&p.classList.contains('wz-body')){
      var pr=p.getBoundingClientRect();
      return {gora:pr.top,dol:pr.bottom};
    }
    p=p.parentNode;
  }
  return {gora:0,dol:(typeof window!=='undefined'&&window.innerHeight)||0};
}
function wzKierunekChmurki(kotwica){
  if(!kotwica||!kotwica.querySelector||!kotwica.getBoundingClientRect)return;
  var tip=kotwica.querySelector('.wz-tip-tr');
  if(!tip||!tip.classList)return;
  /* Zawsze wracamy do wariantu podstawowego: kotwica mogla sie przesunac
     od poprzedniego najechania (przewijanie, zmiana rozmiaru okna). */
  tip.classList.remove('wz-tip-dol');
  var r=kotwica.getBoundingClientRect();
  /* offsetHeight dziala mimo visibility:hidden - taki element ma pudelko
     w ukladzie, tylko nie jest malowany. Przy display:none bylo by 0. */
  var h=tip.offsetHeight||0;
  if(!h)return;
  var potrzeba=h+12;
  /* v41 poprawka druga: mierzymy sie z krawedzia POJEMNIKA, ktory przycina, a nie z oknem.
     Pierwsza wersja czytala r.top wzgledem okna i przez to doliczala sobie wysokosc
     naglowka nakladki jako "miejsce nad etykieta". Skutek: SILNIK (na samej gorze) przerzucal
     sie poprawnie, ale TOPOLOGIE - lezace tylko troche nizej - wychodzily na plus w rachunku
     i chmurka zostawala u gory, gdzie .wz-body ja obcinalo. Widac to bylo jako ucieta
     chmurke przy pelnej zgodnosci z wyliczeniem, czyli najgorszy rodzaj bledu: kod liczyl
     dobrze, tylko nie to co trzeba. */
  var g=wzGranicePrzyciecia(kotwica);
  var pozostaloNad=r.top-g.gora;
  var pozostaloPod=g.dol-r.bottom;
  /* Przerzucamy tylko wtedy, gdy u gory NIE MIESCI SIE, a na dole MIESCI.
     Pierwsza wersja tego warunku brzmiala "na dole jest wiecej miejsca niz u gory"
     i przy niskim oknie potrafila przerzucic chmurke dla zysku dziesieciu pikseli,
     czyli zamienic jeden nieczytelny widok na drugi. Gdy nie miesci sie po zadnej
     stronie, zostajemy przy zachowaniu domyslnym - przynajmniej jest przewidywalne. */
  if(pozostaloNad < potrzeba && pozostaloPod >= potrzeba) tip.classList.add('wz-tip-dol');
}
function wzChmurkaZdarzenie(e){
  var ov=(typeof G==='function')?G('wzOverlay'):null;
  if(!ov||!ov.classList||!ov.classList.contains('show'))return;
  var t=e&&e.target;
  if(!t||!t.closest)return;
  var k=t.closest('.wz-tip');
  if(k)wzKierunekChmurki(k);
}
if(typeof document!=='undefined'&&document.addEventListener){
  document.addEventListener('mouseover',wzChmurkaZdarzenie,true);
  document.addEventListener('focusin',wzChmurkaZdarzenie,true);
}

/* ===================================================================
   10. START
   Wstrzykniecie CSS przy pierwszym otwarciu. Jesli WZ_CSS trafi recznie
   do bloku <style> trybu Wzorce, to wywolanie jest bezczynne.
   =================================================================== */
if(typeof otworzWzorce==='function'){
  var wzOtworzOrg=otworzWzorce;
  otworzWzorce=function(){ wzWstrzyknijCSS(); wzOtworzOrg(); };
}
