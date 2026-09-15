# MEDIA_PROMPTS - prompty video + infografika dla nowych bytow v33

> Osobny dokument z promptami do generacji materialow wizualnych (video + infografika) dla nowych agentow
> i presetow v33. Decyzja HITL (2026-08-29): prompty trzymamy TU, nie w plikach skilli ani jako pole w AGENT_EDU_PL.
> Infografiki base64 generujemy hurtem przy publikacji - na razie zbieramy same prompty.
>
> Format per byt: (1) kontekst 1-zdaniowy, (2) PROMPT INFOGRAFIKA (obraz statyczny, 1:1 lub 16:9),
> (3) PROMPT VIDEO (klip 5-10s), oba w wersji PL i EN. Styl spojny z istniejaca encyklopedia:
> ciemne tlo, akcent kolorem kategorii agenta, minimalistyczny, edukacyjny, bez tekstu w obrazie
> (tekst dodajemy osobno), material bezpieczny do publikacji (brak danych osobowych).

---

## AGENCI

### voice_writer - Pisarz w Twoim Glosie (PILOT, wzorzec formatu)

Kontekst: agent piszacy tekst uzytkowy (maile, posty, CV) w osobistym glosie autora, bez generycznego AI slop.
Kolor kategorii: fiolet (vi, #C4B5FD). Ikona: pioro / quill.

**PROMPT INFOGRAFIKA (PL):**
Minimalistyczna infografika edukacyjna na ciemnym granatowym tle. Centralny motyw: swiecace fioletowe pioro
(quill) piszace linie tekstu, ktore plynnie zamieniaja sie w falę glosu (waveform). Wokol trzy male ikony
orbitujace: koperta (mail), symbol LinkedIn/kwadrat, dokument CV - kazda polaczona cienka fioletowa linia
z piorem. Subtelny efekt swiatla, gradient fioletu do granatu, duzo pustej przestrzeni, estetyka premium
edukacyjna, plaskie ikony line-art, bez zadnego tekstu w obrazie. Proporcje 16:9.

**PROMPT INFOGRAFIKA (EN):**
Minimalist educational infographic on a dark navy background. Central motif: a glowing violet quill pen writing
lines of text that smoothly morph into a voice waveform. Three small icons orbit around it: an envelope (email),
a LinkedIn/square glyph, a CV document - each connected to the quill by a thin violet line. Subtle light bloom,
violet-to-navy gradient, generous negative space, premium educational aesthetic, flat line-art icons, no text
anywhere in the image. Aspect ratio 16:9.

**PROMPT VIDEO (PL):**
Klip 6-8 sekund, ciemne granatowe tlo. Fioletowe pioro sunie w prawo, zostawiajac swiecacy slad tekstu, ktory
w polowie kadru przeksztalca sie w pulsujaca fale glosu. Na koncu fala rozdziela sie na trzy delikatne strumienie
swiatla trafiajace w ikony: koperte, symbol social, dokument CV. Ruch plynny, elegancki, tempo spokojne,
oswietlenie miekkie, estetyka premium, bez tekstu i bez ludzi. Kamera lekko najeżdza (slow push-in).

**PROMPT VIDEO (EN):**
A 6-8 second clip on a dark navy background. A violet quill glides to the right, leaving a glowing trail of text
that, at mid-frame, transforms into a pulsing voice wave. At the end the wave splits into three gentle light
streams hitting three icons: an envelope, a social glyph, a CV document. Smooth elegant motion, calm pacing,
soft lighting, premium aesthetic, no text and no people. Slow camera push-in.

---

### style_profiler - Profiler Glosu
_(do uzupelnienia w tej samej strukturze co voice_writer)_

### voice_qa - Straznik Glosu
_(do uzupelnienia)_

### social_strategist - Strateg Tresci Social
_(do uzupelnienia)_

### decision_advisor - Doradca Decyzyjny
_(do uzupelnienia)_

### career_document_builder - Architekt Dokumentow Kariery
_(do uzupelnienia)_

### interview_coach - Trener Rozmow
_(do uzupelnienia)_

### recipe_scout - Zwiadowca Przepisow
_(do uzupelnienia)_

### taste_recommender - Doradca Smaku
_(do uzupelnienia)_

### recipe_filter - Filtr Kuchenny
_(do uzupelnienia)_

---

## PRESETY

### /voice, /content-social, /kariera, /kuchmistrz, /decision-research + zalegle /deep-research-v2, /bento-redesign
_(do uzupelnienia w tej samej strukturze - kazdy preset dostaje prompt infografika + video PL/EN)_

---

## Status
- [x] voice_writer - PILOT gotowy (wzorzec formatu zatwierdzony przez build)
- [ ] pozostale 9 agentow + 7 presetow - do uzupelnienia rownolegle z wpisami encyklopedycznymi
- [ ] generacja realnych infografik base64 z tych promptow - przy publikacji (decyzja HITL)
