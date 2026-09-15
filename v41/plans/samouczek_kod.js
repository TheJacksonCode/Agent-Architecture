/* ===== SAMOUCZEK: POCZATEK ===== */
/* SAMOUCZEK v41 - DANE KROKOW. Faza 2.
   JEDYNE MIEJSCE EDYCJI. Do pliku HTML ten blok trafia skryptem wdrozeniowym
   (wdroz_samouczek_v41.js), ktory podmienia zawartosc miedzy znacznikami
   POCZATEK i KONIEC. Nie edytowac go bezposrednio w HTML - zmiana przepadnie
   przy najblizszym wdrozeniu.

   ZASADA, KTORA PRZESADZA O WSZYSTKIM
   Kroki sa DANYMI, nie kodem. Silnik (faza 3) nie zna zadnej nazwy z tej tablicy
   i nie wie nic o tresci. Dodanie sekcji do aplikacji = dopisanie JEDNEGO wiersza
   tutaj, bez dotykania silnika.

   KOTWICA TO WYLACZNIE id ELEMENTU. Nigdy selektor CSS, nigdy "trzeci przycisk
   w rzedzie", nigdy wspolrzedne. Powod nie jest estetyczny, tylko zmierzony:
   dwanascie kotwic kregoslupa sprawdzono w wersjach v32 do v40 - dziewiec wersji,
   zero zmian nazw, zero znikniec. Jedyna roznica to hookiBtn, ktorego nie ma
   w v32 i v33, bo tryb Hooki powstal dopiero w v34. Nazwy id sa w tym pliku
   stabilniejsze niz klasy, uklad i kolejnosc razem wziete.

   POLA WIERSZA
     id      - stabilny klucz do localStorage i do testow. Nigdy nie pokazywany.
     akt     - 1 = kregoslup na pierwsze wejscie, 2 = reszta, na zadanie.
     kotw    - id elementu, ktory krok podswietla.
     dod     - dodatkowe id obejmowane tym samym podswietleniem. Moze byc puste.
     tPL/tEN - tytul.
     oPL/oEN - opis.
     akcja   - mikro-zacheta czekajaca na klik uzytkownika.
               W AKCIE 1 ZAWSZE null, patrz nota "SYMULACJA" nizej. Pole zostaje
               w schemacie, bo Akt 2 bedzie go potrzebowal, a zmiana ksztaltu
               danych pozniej kosztuje wiecej niz jedno nieuzywane pole teraz.

   DECYZJE MACIEJA WBUDOWANE W TE TABLICE (2026-09-14)
     D1  start automatyczny, z jednym widocznym wyjsciem i bez blokowania reszty.
     D4  koszt ZOSTAJE w Akcie 1, ale tylko jako MIEJSCE - krok nie namawia
         do otwierania rozbicia. Symulacja WYPADA z Aktu 1.
     D3  PIEC krokow, nie cztery. Synteza rekomendowala cztery do pieciu, a ja
         proponowalem cztery; Maciej poprosil o osobny krok na encyklopedie
         i o wzmianke o wlasnym agencie w kroku drugim. Piatka miesci sie
         w rekomendacji, a rozdzielenie encyklopedii od powrotu naprawia przy
         okazji blad sumowania odleglych prostokatow (patrz krok 4).
     D9  wariant B: encyklopedia wskazywana przez istniejace przyciski "Poznaj ten
         preset" i "Poznaj tego agenta", ktore dostaly wspolne id encyklBtn.

   CO Z TEGO WYNIKLO ZA DARMO
   Po decyzji D4 zaden krok Aktu 1 nie prosi uzytkownika o klikniecie czegokolwiek
   pod spodem. Wszystkie piec jest czysto opisowych, wiec silnik moze miec JEDNA
   modalnosc zamiast rozstrzygania jej per krok. Odpada cala warstwa opisana
   w PLAN_BUDOWY sekcja 6.6: powrot fokusu do dymka po interakcji z elementem.
   To najwieksze uproszczenie, jakie dala ktorakolwiek decyzja tej fazy.

   SYMULACJA - DLACZEGO JEJ TU NIE MA
   Symulacja to POKAZ, nie miejsce. Jako krok mapy jest slaba, bo trzeba ja odpalic
   i czekac, az sie skonczy. Maciej zdecydowal, ze wypada z Aktu 1. Kandydat do Aktu 2.

   TRZY RZECZY, KTORE MOGA ZGASIC KROK - i tak ma byc
   Krok bez WIDOCZNEJ kotwicy jest po cichu pomijany dla uzytkownika i glosny
   dla testu. To nie jest teoria, dotyczy trzech konkretnych wierszy nizej:

   1. sL znika calkowicie ponizej 700px (.side-l{display:none}). Na waskim ekranie
      samouczek ma cztery kroki zamiast pieciu. Zgodnie z decyzja D8 przyjmujemy
      ciche pominiecie: na takim ekranie tego panelu naprawde nie ma, wiec mowienie
      o nim byloby klamstwem, a nie pomoca.

   2. encyklBtn jest renderowany z TRZECH miejsc, nie z jednego: pokazWezel (agent
      kliknety na canvasie), pokazDef (agent z palety) i pokazInfoPr (preset).
      Wszystkie trzy pisza do G('srS').innerHTML, czyli do JEDNEGO kontenera
      nadpisywanego w calosci, wiec w DOM istnieje zawsze najwyzej jeden z nich
      i moga dzielic to samo id.

      Zostaja dwa stany, w ktorych prawy panel nie ma zadnego przycisku encyklopedii,
      wiec krok czwarty gasnie: gdy nic nie jest zaznaczone (domyslna podpowiedz)
      oraz przy zaznaczeniu wielu agentow naraz (pokazZazn). Przy pierwszym wejsciu
      ani jeden, ani drugi nie zachodzi, bo ladujPreset('deep_five_minds') chodzi
      w starcie i wola pokazInfoPr.

      HISTORIA TEJ NOTY, zeby nie powtorzyc bledu: najpierw id dostal TYLKO przycisk
      presetu i wyciagnalem z tego wniosek, ze "encyklopedia znika przy agencie".
      Nieprawda - agenci maja swoje wlasne przyciski encyklopedii, po prostu nie
      policzylem miejsc renderowania. Wniosek z jednego miejsca o zachowaniu trzech.

   3. tutBtn byl UKRYTY do konca fazy 2, bo tutStart() jeszcze nie istnial - i dlatego
      nie mogl wtedy byc kotwica. Faza 3 dolozyla silnik i przycisk jest juz zywy,
      wiec od tej pory jest normalna kotwica kroku piatego.

   REGULA, KTORA WYSZLA Z DWOCH BLEDOW POD RZAD (canvas i encyklopedia):
   pole dod sluzy do rzeczy lezacych OBOK SIEBIE, jak canvas i pasek faz nad nim.
   Elementy w odleglych czesciach ekranu nie moga dzielic jednego kroku, bo pierscien
   rysuje SUME ich prostokatow i powstaje wielkie pudlo, ktore nie wskazuje niczego.
   Jesli dwie rzeczy sa daleko od siebie, to sa dwa kroki, a nie jeden.
*/

function tutT(pl,en){return (typeof currentLang!=='undefined'&&currentLang==='en')?en:pl}

var TUT_KROKI=[

/* 1. CANVAS. Zaczynamy od tego, na co uzytkownik i tak juz patrzy. To tez jedyny
      krok, ktory cos WYJASNIA, a nie tylko lokalizuje. Fakt sprawdzony:
      ladujPreset('deep_five_minds') odpala sie w inicjalizacji, wiec canvas
      NIGDY nie jest pusty przy pierwszym wejsciu.

      KOTWICA TO cvA, NIE svg. Pierwsza wersja wskazywala #svg i podswietlenie
      wychodzilo krzywo: zaslanialo prawy panel, a lewa czesc canvasu zostawala
      przyciemniona. Powod: #svg ma na sztywno 6000x6000 px i siedzi w .cv-transform,
      ktory jest przesuwany i skalowany - jego prostokat zaczyna sie tam, gdzie
      akurat stoi panoramowanie, i wychodzi daleko poza ekran. cvA (.cv-area) to
      widoczny obszar canvasu z overflow:hidden, czyli to, co uzytkownik naprawde
      widzi. Nauka ogolna: kotwica ma byc elementem, ktory WYZNACZA WIDOK,
      a nie elementem, ktory niesie tresc. */
{id:'canvas', akt:1, kotw:'cvA', dod:['phaseBar'], akcja:null,
 tPL:'Tu stoi Twój zespół',
 tEN:'Your team lives here',
 oPL:'Na środku stoi gotowy zespół, który wczytał się sam. Każdy kafelek to jeden agent, linie pokazują, kto komu przekazuje pracę, a pasek u góry dzieli ją na fazy.',
 oEN:'A ready team is already on the canvas, loaded for you. Each tile is one agent, the lines show who hands work to whom, and the bar at the top splits it into phases.'},

/* 2. LEWY PANEL. Kotwica to sL, czyli CALA kolumna, a nie panAg.
      Powod: pasek trzech zakladek lezy w .sl-tabs, POZA panAg, a opis mowi
      o wszystkich trzech. Podswietlenie panAg pokazywaloby liste agentow
      i przemilczalo to, o czym zdanie mowi. */
{id:'biblioteka', akt:1, kotw:'sL', dod:[], akcja:null,
 tPL:'Stąd bierzesz elementy',
 tEN:'Your building blocks',
 oPL:'Agenci to pojedynczy specjaliści, Presety to gotowe zespoły jak ten na canvasie, a Zapisane to Twoje własne układy. Przyciskiem Custom Agent zbudujesz też własnego agenta od zera.',
 oEN:'Agents are single specialists, Presets are ready teams like the one on the canvas, and Saved holds your own layouts. The Custom Agent button lets you build an agent of your own from scratch.'},

/* 3. KOSZT. Decyzja D4: pokazujemy GDZIE to jest, nie namawiamy do zagladania
      do srodka.

      NAZWY "Centrum kosztow" i "Cost Command Center" sa PRZEPISANE Z APLIKACJI,
      nie wymyslone: to dokladnie te napisy, ktore uzytkownik zobaczy w naglowku
      modalu po kliknieciu (klucz slownika 'Centrum kosztów' -> 'Cost Command Center',
      ustawiany na cbmTitleText w aktStatHTML). Test pilnuje, ze te nazwy nadal
      zgadzaja sie z aplikacja - gdyby ktos przemianowal modal, samouczek zaczalby
      klamac, a to najgorszy rodzaj bledu w czyms, co ma uczyc gdzie co jest.

      UWAGA NA GRANICE Z D4: zdanie mowi, CO SIE STANIE po kliknieciu, ale nie
      namawia do klikniecia. Wczesniejsza wersja konczyla sie trybem rozkazujacym
      "Kliknij, zeby zobaczyc rozbicie na agentow" - to wypadlo, bo to juz nie mapa,
      tylko
      zadanie, a Akt 1 ma byc mapa.
      Dlaczego ten krok w ogole zostaje w Akcie 1, wbrew syntezie, ktora zsylala
      go do Aktu 2: CLAUDE.md mowi wprost, ze celem aplikacji jest zrozumiec,
      ile zespol kosztuje, ZANIM wydasz token. Uzytkownik, ktory konczy samouczek
      nie wiedzac, ze aplikacja to liczy, przegapil funkcje sztandarowa. */
{id:'koszt', akt:1, kotw:'costHud', dod:[], akcja:null,
 tPL:'Ile to kosztuje',
 tEN:'What it costs',
 oPL:'Tu na bieżąco widzisz, ile ten zespół kosztuje, zanim go uruchomisz. Licznik przelicza się przy każdej zmianie składu, a kliknięcie otwiera Centrum kosztów z pełnym rozbiciem.',
 oEN:'This is where you see what the team costs before you run it. The counter recalculates every time the line-up changes, and clicking it opens the Cost Command Center with a full breakdown.'},

/* 4. ENCYKLOPEDIA. Wskazuje DOKLADNIE przycisk otwierajacy encyklopedie i nic wiecej.

      DLACZEGO TO OSOBNY KROK OD PIATEGO (Maciej, 2026-09-14): pierwsza wersja miala
      jeden krok z kotwica encyklBtn i tutBtn w dod. To bylo zle, i to tym samym bledem,
      co kotwica canvasu: encyklBtn renderuje sie w PRAWYM PANELU, a tutBtn stoi
      w NAGLOWKU, wiec pierscien rysowal SUME tych dwoch prostokatow - wielkie pudlo
      od naglowka w dol przez caly prawy panel, ktore nie wskazywalo niczego.
      Elementy w odleglych czesciach ekranu NIE MOGA dzielic jednego kroku.
      Pole dod jest do rzeczy lezacych obok siebie, jak canvas i pasek faz. */
{id:'encyklopedia', akt:1, kotw:'encyklBtn', dod:[], akcja:null,
 tPL:'Gdzie poznać agentów i zespoły',
 tEN:'Where to get to know agents and teams',
 oPL:'Ten przycisk otwiera encyklopedię. Każdy agent i każdy zespół ma tam swoją stronę: co robi, czego nie robi, ile kosztuje i kiedy lepiej go nie używać.',
 oEN:'This button opens the encyclopedia. Every agent and every team has a page there: what it does, what it does not do, what it costs and when you are better off not using it.'},

/* 5. POWROT. Ostatni krok wskazuje WLASNE WEJSCIE samouczka.
      To czesc z najmocniejszym poparciem w researchu (R7: encyklopedie rozwiazuja
      orientacje trwala nawigacja, a nie jednorazowa wycieczka), wiec niech bedzie
      ostatnia rzecza, jaka uzytkownik zobaczy. Zdejmuje tez presje z calej reszty:
      nikt nie musi zapamietac czterech poprzednich krokow za pierwszym razem. */
{id:'powrot', akt:1, kotw:'tutBtn', dod:[], akcja:null,
 tPL:'Wrócisz tu, kiedy zechcesz',
 tEN:'Come back whenever you like',
 oPL:'Ten samouczek odpalisz ponownie w każdej chwili, tym przyciskiem z latarką. Nic nie musisz zapamiętać za pierwszym razem.',
 oEN:'You can run this tutorial again at any moment with this flashlight button. Nothing here has to stick on the first pass.'}

/* AKT 2 - PARKING, NIE DO BUDOWY TERAZ.
   Kandydaci z gotowymi kotwicami, kazdy to jeden wiersz w dniu, w ktorym Maciej
   powie "teraz Akt 2": panSv (zapisane), simBtn (symulacja, z akcja), skrotyBtn
   (skroty klawiszowe), themeToggle (motyw), langBtn (jezyk), hookiBtn, wzorceBtn,
   dol canvasu, kreator wlasnego agenta, zakladki prawego panelu.
   Teksty do nich NIE sa napisane - to swiadome, zeby nie produkowac tresci,
   ktorej nikt jeszcze nie zamowil. */

];


/* ===================================================================
   SILNIK. Faza 3.

   Silnik nie zna ANI JEDNEJ nazwy z tablicy powyzej. Dostaje wiersz, czyta
   kotwice i teksty, i tyle. Dzieki temu nowa sekcja aplikacji dopisuje sie
   do samouczka jednym wierszem danych, a nie zmiana w kodzie.

   CO ODPADLO PO DECYZJI D4
   Zaden krok Aktu 1 nie prosi uzytkownika o klikniecie elementu pod spodem,
   wiec silnik ma JEDNA modalnosc dla wszystkich krokow. Odpadla cala warstwa
   z PLAN_BUDOWY 6.6: rozstrzyganie modal/non-modal per typ kroku i powrot
   fokusu do dymka po interakcji z podswietlonym elementem.

   DLACZEGO NIE MA aria-live
   Przy zmianie kroku fokus przenosi sie na dymek, ktory jest role="dialog"
   z aria-labelledby i aria-describedby - czytnik ekranu oglasza wtedy nazwe
   i opis sam z siebie. Dolozenie do tego regionu aria-live dalo by podwojne
   czytanie tej samej tresci. WCAG 4.1.3 jest spelnione przez przeniesienie
   fokusu, a nie przez region statusu. To jest swiadome odejscie od zapisu
   w PLAN_BUDOWY sekcja 6.5.

   DLACZEGO NIE MA PULAPKI FOKUSU
   aria-modal="false" i zadnego zamykania Tab w petli. Warunek z decyzji D1
   brzmial "zero blokowania interakcji poza dymkiem", a pulapka fokusu jest
   dokladnie takim blokowaniem. Przy okazji znika ryzyko naruszenia
   WCAG 2.1.2 No Keyboard Trap, ktore jest najczestszym bledem bibliotek tourow.
   =================================================================== */

var tutOpen=false, tutIdx=0, tutLista=[];

var TUT_CSS=''+
/* Podswietlenie to JEDEN element, nie cztery przyciete prostokaty i nie canvas.
   Ogromny box-shadow przyciemnia wszystko poza pierscieniem, nie zakrywajac
   samej kotwicy. pointer-events:none sprawia, ze klikniecia PRZECHODZA do
   aplikacji - to wprost warunek trzeci decyzji D1. A border daje kontrast
   obwodki wymagany przez WCAG 1.4.11. Trzy rzeczy zalatwione jedna regula. */
/* BEZ przejscia na pozycji i rozmiarze. Pierwsza wersja miala tu
   transition:top/left/width/height .26s i pierscien WIDOCZNIE jechal miedzy krokami,
   a dymek skakal natychmiast - z czego robilo sie wrazenie zacinania. Maciej to
   wylapal od razu. Podswietlenie ma byc w nowym miejscu OD RAZU; jedyna animacja
   to krotkie pojasnienie przy otwarciu, ktore odpala sie samo, bo element wychodzi
   z display:none (animacje restartuja sie przy takim przejsciu, wiec miedzy krokami
   juz sie nie powtarza). */
'.tut-ring{position:fixed;pointer-events:none;z-index:10500;border-radius:12px;'+
'border:2px solid var(--accent1);box-shadow:0 0 0 9999px rgba(6,6,10,.72);'+
'animation:tutPojaw .12s ease-out}'+
'[data-theme="light"] .tut-ring{box-shadow:0 0 0 9999px rgba(16,18,30,.5)}'+
'@keyframes tutPojaw{from{opacity:0}to{opacity:1}}'+
'@media (prefers-reduced-motion:reduce){.tut-ring,.tut-bub{animation:none}}'+
/* z-index 10500 i 10510 stoja nad wszystkim, co w pliku juz jest: najwyzsze
   dotychczas to .mo-zoom z 10000, potem .skip-link 9999 i modale 1000. */
'.tut-bub{position:fixed;z-index:10510;width:320px;max-width:calc(100vw - 28px);'+
'background:var(--bg-card);backdrop-filter:blur(16px) saturate(140%);'+
'-webkit-backdrop-filter:blur(16px) saturate(140%);border:1px solid var(--brd);'+
'border-radius:14px;padding:14px 16px 12px;box-shadow:0 18px 50px rgba(0,0,0,.5);'+
'animation:tutPojaw .12s ease-out}'+
'.tut-bub:focus{outline:2px solid var(--accent1);outline-offset:3px}'+
'.tut-bub h4{margin:0 0 6px;font-family:var(--hd);font-size:14px;font-weight:700;color:var(--t1)}'+
'.tut-bub p{margin:0;font-size:12.5px;line-height:1.55;color:var(--t2)}'+
'.tut-foot{display:flex;align-items:center;gap:8px;margin-top:14px}'+
'.tut-dots{display:flex;align-items:center;gap:5px;margin-right:auto}'+
'.tut-dot{width:6px;height:6px;border-radius:50%;background:var(--brd);transition:all .2s}'+
'.tut-dot.on{width:18px;border-radius:3px;background:var(--accent1)}'+
'@media (prefers-reduced-motion:reduce){.tut-dot{transition:none}}'+
/* WCAG 2.5.8 Target Size (Minimum): 24x24 px klikalnego obszaru. Stoi 26. */
'.tut-b{min-width:26px;min-height:26px;padding:5px 12px;border-radius:8px;'+
'border:1px solid var(--brd);background:transparent;color:var(--t2);cursor:pointer;'+
'font-family:var(--mn);font-size:11px;transition:all .18s}'+
'.tut-b:hover{color:var(--t1);border-color:var(--accent1)}'+
'.tut-b.pri{background:var(--accent1);border-color:var(--accent1);color:#08090f;font-weight:700}'+
'@media (prefers-reduced-motion:reduce){.tut-b{transition:none}}';

function tutEsc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}

/* TEST WIDOCZNOSCI - najwazniejsze trzydziesci wierszy calego przedsiewziecia.
   Powod jest udokumentowany i swiezy: ukrycie trybu Live przez display:none
   zostawia przycisk w DOM. Sprawdzenie "czy element istnieje" przeszloby na
   zielono, a uzytkownik dostalby podswietlenie na niewidocznym guziku.

   ROBOTNIKIEM JEST PIERWSZY WARUNEK, nie getComputedStyle. Element wewnatrz
   rodzica z display:none ma WLASNE display rowne block - i tylko prostokat
   zerowej wielkosci to zdradza. Dokladnie taki jest przypadek panelu bocznego
   ponizej 700px (.side-l{display:none}). */
function tutWidoczny(el){
  if(!el||!el.getBoundingClientRect)return false;
  var r=el.getBoundingClientRect();
  if(r.width<1||r.height<1)return false;
  if(r.bottom<0||r.top>window.innerHeight||r.right<0||r.left>window.innerWidth)return false;
  var cs=null;try{cs=window.getComputedStyle(el)}catch(e){}
  if(cs){
    if(cs.display==='none'||cs.visibility==='hidden')return false;
    if(parseFloat(cs.opacity)===0)return false;
  }
  return true;
}

/* Krok bez WIDOCZNEJ kotwicy: po cichu pominiety dla uzytkownika, glosny dla testu. */
function tutZbierzKroki(akt){
  var out=[];
  for(var i=0;i<TUT_KROKI.length;i++){
    var k=TUT_KROKI[i];
    if(k.akt!==akt)continue;
    if(!tutWidoczny(document.getElementById(k.kotw))){
      try{console.warn('[samouczek] krok "'+k.id+'" pominiety - kotwica "'+k.kotw+'" niewidoczna')}catch(e){}
      continue;
    }
    out.push(k);
  }
  return out;
}

/* Prostokat obejmujacy kotwice i jej elementy dodatkowe. Niewidoczne pomijamy,
   zeby ukryty tutBtn w kroku czwartym nie rozciagal pierscienia na pol ekranu. */
function tutProstokatUnii(ids){
  var r=null;
  for(var i=0;i<ids.length;i++){
    var el=document.getElementById(ids[i]);
    if(!tutWidoczny(el))continue;
    var b=el.getBoundingClientRect();
    if(!r)r={top:b.top,left:b.left,right:b.right,bottom:b.bottom};
    else{
      if(b.top<r.top)r.top=b.top;
      if(b.left<r.left)r.left=b.left;
      if(b.right>r.right)r.right=b.right;
      if(b.bottom>r.bottom)r.bottom=b.bottom;
    }
  }
  /* PRZYCIECIE DO OKNA - siatka bezpieczenstwa, nie ozdoba.
     Kotwica moze byc wieksza od ekranu albo czesciowo poza nim: #svg ma 6000x6000 px
     i siedzi w przesuwanym kontenerze, wiec jego prostokat potrafi zaczynac sie
     w polowie canvasu i konczyc daleko za prawa krawedzia okna. Bez przyciecia
     pierscien rysowal sie wtedy przez prawy panel, a lewa czesc canvasu zostawala
     przyciemniona. Kotwice kroku pierwszego juz poprawilem na cvA, ale przyciecie
     zostaje, zeby ta klasa bledu nie wrocila przy kolejnej dopisanej kotwicy. */
  if(r){
    if(r.top<0)r.top=0;
    if(r.left<0)r.left=0;
    if(r.right>window.innerWidth)r.right=window.innerWidth;
    if(r.bottom>window.innerHeight)r.bottom=window.innerHeight;
    if(r.right<=r.left||r.bottom<=r.top)return null;
  }
  return r;
}

function tutKoliduje(t,l,W,H,r){return !(l+W<r.left||l>r.right||t+H<r.top||t>r.bottom)}
/* WCAG 2.4.11 Focus Not Obscured (Minimum, AA) zabrania zaslonienia CALKOWITEGO.
   Czesciowe nachodzenie jest na tym poziomie dopuszczalne - i dobrze, bo kotwica
   kroku pierwszego to caly canvas, ktorego nie da sie obejsc dookola. */
function tutZaslaniaCalkowicie(t,l,W,H,r){return l<=r.left&&t<=r.top&&l+W>=r.right&&t+H>=r.bottom}

function tutUstawDymek(r){
  var b=document.getElementById('tutBub');if(!b)return;
  var W=b.offsetWidth||320, H=b.offsetHeight||150, M=14;
  var vw=window.innerWidth, vh=window.innerHeight, kand=[];
  if(r){
    kand.push({t:r.bottom+M, l:Math.min(r.left, vw-W-M)});
    kand.push({t:r.top-H-M,  l:Math.min(r.left, vw-W-M)});
    kand.push({t:Math.min(r.top, vh-H-M), l:r.right+M});
    kand.push({t:Math.min(r.top, vh-H-M), l:r.left-W-M});
  }
  kand.push({t:(vh-H)/2, l:(vw-W)/2});
  var wyb=null;
  for(var i=0;i<kand.length;i++){
    var c=kand[i];
    if(c.t<M||c.l<M||c.t+H>vh-M||c.l+W>vw-M)continue;
    if(r&&tutKoliduje(c.t,c.l,W,H,r))continue;
    wyb=c;break;
  }
  if(!wyb){
    /* Ostatnia deska ratunku: rog. Uzywana wtedy, gdy kotwica jest tak duza,
       ze dookola niej nie ma miejsca - czyli przy canvasie. Dymek 320px nie jest
       w stanie zakryc takiej kotwicy calkowicie, wiec kryterium 2.4.11 stoi. */
    wyb={t:Math.max(M, vh-H-M), l:Math.max(M, vw-W-M)};
    if(r&&tutZaslaniaCalkowicie(wyb.t,wyb.l,W,H,r)){
      try{console.warn('[samouczek] dymek zaslania kotwice calkowicie - WCAG 2.4.11')}catch(e){}
    }
  }
  b.style.top=Math.round(wyb.t)+'px';
  b.style.left=Math.round(wyb.l)+'px';
}

function tutSync(){
  if(!tutOpen)return;
  var k=tutLista[tutIdx];if(!k)return;
  var ring=document.getElementById('tutRing');if(!ring)return;
  var r=tutProstokatUnii([k.kotw].concat(k.dod||[]));
  if(!r){
    /* Kotwica zniknela juz W TRAKCIE przejscia (ktos przewinal, zmienil rozmiar
       okna, przelaczyl panel). Gasimy pierscien i stawiamy dymek na srodku -
       swiadomie NIE przewijamy kroku dalej, bo to potrafiloby sie zapetlic. */
    ring.style.display='none';
    tutUstawDymek(null);
    return;
  }
  var P=6;
  ring.style.display='block';
  ring.style.top=(r.top-P)+'px';
  ring.style.left=(r.left-P)+'px';
  ring.style.width=(r.right-r.left+P*2)+'px';
  ring.style.height=(r.bottom-r.top+P*2)+'px';
  tutUstawDymek(r);
}

function tutZbuduj(){
  if(!document.getElementById('tutCss')){
    var s=document.createElement('style');s.id='tutCss';
    s.textContent=TUT_CSS;document.head.appendChild(s);
  }
  if(document.getElementById('tutBub'))return;
  var ring=document.createElement('div');
  ring.id='tutRing';ring.className='tut-ring';ring.style.display='none';
  document.body.appendChild(ring);
  var b=document.createElement('div');
  b.id='tutBub';b.className='tut-bub';b.style.display='none';
  b.setAttribute('role','dialog');
  b.setAttribute('aria-modal','false');
  b.setAttribute('aria-labelledby','tutTyt');
  b.setAttribute('aria-describedby','tutOpis');
  b.setAttribute('tabindex','-1');
  document.body.appendChild(b);
}

function tutKrok(i){
  if(!tutOpen)return;
  if(i<0)i=0;
  if(i>=tutLista.length){tutKoniec('koniec');return}
  tutIdx=i;
  var k=tutLista[i], b=document.getElementById('tutBub');if(!b)return;
  var kropki='';
  for(var j=0;j<tutLista.length;j++)kropki+='<span class="tut-dot'+(j===i?' on':'')+'"></span>';
  /* Licznik "krok N z M" idzie tekstem dla czytnika ekranu. Kropki sa ozdoba
     z aria-hidden, wiec postep NIE jest niesiony wylacznie ksztaltem i kolorem
     (WCAG 1.4.1). */
  var licznik=tutT('Krok ','Step ')+(i+1)+tutT(' z ',' of ')+tutLista.length;
  b.innerHTML=
    '<span class="sr-only">'+tutEsc(licznik)+'</span>'+
    '<h4 id="tutTyt">'+tutEsc(tutT(k.tPL,k.tEN))+'</h4>'+
    '<p id="tutOpis">'+tutEsc(tutT(k.oPL,k.oEN))+'</p>'+
    '<div class="tut-foot">'+
      '<div class="tut-dots" aria-hidden="true">'+kropki+'</div>'+
      (i>0?'<button type="button" class="tut-b" onclick="tutWstecz()">'+tutEsc(tutT('Wstecz','Back'))+'</button>':'')+
      '<button type="button" class="tut-b pri" onclick="tutDalej()">'+
        tutEsc(i===tutLista.length-1?tutT('Koniec','Done'):tutT('Dalej','Next'))+'</button>'+
      /* JEDEN przycisk wyjscia, nie dwa (Pomin i X) - decyzja D7. */
      '<button type="button" class="tut-b" onclick="tutKoniec(\'pomin\')" aria-label="'+
        tutEsc(tutT('Zamknij samouczek','Close tutorial'))+'">&#215;</button>'+
    '</div>';
  tutSync();
  try{b.focus()}catch(e){}
}

function tutDalej(){tutKrok(tutIdx+1)}
function tutWstecz(){tutKrok(tutIdx-1)}

/* Klawiatura BEZ dotykania istniejacego kodu. W pliku sa juz dwa globalne uklady
   klawiszy, w tym lancuch Escape z kolejnoscia hitlActive, liveRunning, simRunning,
   learnOpen, .mo.show, connMode. Samouczek do tego lancucha NIE wchodzi - rejestruje
   sie na fazie PRZECHWYTYWANIA, ktora biegnie przed bulgotaniem, wiec dostaje
   zdarzenie pierwszy i przy obsluzonym klawiszu wola stopPropagation.
   Ten sam wzorzec jest juz w pliku uzyty przy lightboxie (mzKey z true). */
function tutKey(e){
  if(!tutOpen)return;
  var k=(e.key||'').toLowerCase();
  if(k==='escape'){e.stopPropagation();e.preventDefault();tutKoniec('pomin');return}
  if(k==='arrowright'){e.stopPropagation();e.preventDefault();tutDalej();return}
  if(k==='arrowleft'){e.stopPropagation();e.preventDefault();tutWstecz();return}
}

function tutStart(akt){
  if(tutOpen)return;
  /* Tryby pelnoekranowe zaslaniaja dokladnie to, co samouczek ma pokazac.
     Zamkniecie ich to jedyne miejsce, w ktorym silnik klika za uzytkownika -
     i nie jest to sprzeczne z decyzja D2, bo D2 mowi o wykonywaniu ZADAN
     uzytkownika, a nie o usunieciu zaslony z ekranu, ktory ma byc opisany. */
  try{if(typeof learnOpen!=='undefined'&&learnOpen&&typeof zamknijEncykl==='function')zamknijEncykl()}catch(e){}
  try{var w=document.getElementById('wzOverlay');
      if(w&&w.classList.contains('show')&&typeof zamknijWzorce==='function')zamknijWzorce()}catch(e){}
  try{var h=document.getElementById('hkOverlay');
      if(h&&h.classList.contains('show')&&typeof zamknijHooki==='function')zamknijHooki()}catch(e){}

  tutZbuduj();
  tutLista=tutZbierzKroki(akt||1);
  if(!tutLista.length){
    try{console.warn('[samouczek] zaden krok nie ma widocznej kotwicy - nie otwieram')}catch(e){}
    return;
  }
  tutOpen=true;
  document.addEventListener('keydown',tutKey,true);
  window.addEventListener('resize',tutSync);
  window.addEventListener('scroll',tutSync,true);
  document.getElementById('tutBub').style.display='block';
  tutKrok(0);
}

function tutKoniec(powod){
  if(!tutOpen)return;
  tutOpen=false;
  document.removeEventListener('keydown',tutKey,true);
  window.removeEventListener('resize',tutSync);
  window.removeEventListener('scroll',tutSync,true);
  var ring=document.getElementById('tutRing');if(ring)ring.style.display='none';
  var b=document.getElementById('tutBub');if(b)b.style.display='none';
  /* Zapamietanie wyniku. Faza 4 (auto-start) bedzie z tego czytac; dzis tylko pisze,
     zeby ten, kto przeszedl samouczek reka, nie dostal go pozniej automatem. */
  try{localStorage.setItem('acV32_tut',powod==='koniec'?'done':'skip')}catch(e){}
  /* Fokus wraca tam, skad przyszedl - WCAG 2.4.3 Focus Order. */
  var t=document.getElementById('tutBtn');if(t&&t.focus){try{t.focus()}catch(e){}}
}


/* ===================================================================
   AUTOMATYCZNY START. Faza 4. Decyzja D1.

   Maciej wybral start automatyczny, a synteza postawila do niego trzy warunki.
   Dwa z nich byly juz spelnione przez sam silnik: jeden widoczny przycisk wyjscia
   (krzyzyk, decyzja D7) i zero blokowania interakcji poza dymkiem (pierscien ma
   pointer-events:none). Trzeci - "start po PELNYM zaladowaniu interfejsu, nie
   w trakcie animacji wejscia" - to wlasnie ta sekcja.

   TRZECI WARUNEK NIE JEST TEORETYCZNY. Przy pierwszym wejsciu ladujPreset wola
   pokazHero(), ktore zakrywa canvas pelna zaslona (.hero-overlay, inset:0,
   tlo rgba(6,6,10,0.92), blur 12px) i samo znika dopiero po 3 SEKUNDACH albo
   po kliknieciu. Samouczek odpalony wczesniej podswietlalby elementy ZA zaslona -
   uzytkownik zobaczylby dymek opisujacy cos, czego nie widac.
   =================================================================== */

function tutOverlayOtwarty(id){
  var el=document.getElementById(id);
  return !!(el&&el.classList&&el.classList.contains&&el.classList.contains('show'));
}

/* Czy automat MA PRAWO wystartowac w tej chwili.
   Wydzielone z tutAutoStart celowo: dzieki temu cala decyzja daje sie sprawdzic
   testem bez czekania na zegary, a tutAutoStart zostaje sama orkiestracja czasu. */
function tutAutoDozwolony(){
  if(tutOpen)return false;
  var zapis=null;
  try{zapis=localStorage.getItem('acV32_tut')}catch(e){return false}
  /* Kto juz widzial samouczek - przeszedl go albo zamknal - nie dostaje go ponownie.
     Decyzja D6: NIE pytamy drugi raz na podstawie liczby wizyt. Przycisk z latarka
     zostaje na swoim miejscu i to on jest droga powrotna. */
  if(zapis)return false;
  /* Jesli uzytkownik zdazyl sam otworzyc tryb pelnoekranowy, nie wchodzimy mu w droge.
     Recznie odpalony samouczek te tryby ZAMYKA, automat NIE - to jest roznica miedzy
     "poprosilem o oprowadzenie" a "wtargnal na ekran". */
  if(typeof learnOpen!=='undefined'&&learnOpen)return false;
  if(tutOverlayOtwarty('wzOverlay'))return false;
  if(tutOverlayOtwarty('hkOverlay'))return false;
  return true;
}

function tutAutoStart(){
  if(!tutAutoDozwolony())return;
  var proby=0;
  function sprobuj(){
    if(!tutAutoDozwolony())return;
    if(tutOverlayOtwarty('heroOverlay')){
      /* Ekran powitalny jeszcze stoi. Czekamy, ale ze skonczona cierpliwoscia:
         40 prob co 250 ms to 10 sekund. Gdyby zaslona z jakiegos powodu nie znikla,
         samouczek ma sie PODDAC, a nie odpalic sie na slepo pod nia. */
      if(proby<40){proby++;setTimeout(sprobuj,250);return}
      return;
    }
    tutStart(1);
  }
  /* 600 ms zapasu po zaladowaniu: tyle, zeby uklad sie ustal i zeby samouczek
     nie wyskoczyl w tej samej klatce, w ktorej znika ekran powitalny. */
  setTimeout(sprobuj,600);
}

/* Podpiecie do zdarzenia load, a nie do konca parsowania. load czeka na obrazy,
   czcionki i reszte - czyli na to, co warunek trzeci nazywa "pelnym zaladowaniem". */
if(typeof window!=='undefined'&&window.addEventListener){
  if(typeof document!=='undefined'&&document.readyState==='complete')setTimeout(tutAutoStart,0);
  else window.addEventListener('load',tutAutoStart);
}
/* ===== SAMOUCZEK: KONIEC ===== */
