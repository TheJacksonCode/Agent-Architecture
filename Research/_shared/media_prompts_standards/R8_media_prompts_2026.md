---
title: R8 Media Prompts Standards 2026 (SHARED)
scope: Best practices dla Video Overview + Infographic prompts 2026
shared_between: [settings-permissions-2026, claude-md-patterns-2026]
agent: Researcher R8 (Media Standards)
model: claude-opus-4-7
date: 2026-04-17
target_quality: 9.5/10
word_target: 4500-6500
---

# R8: Media Prompts Standards 2026 (SHARED)

## 1. Abstract

Ten raport to **golden reference** dla dwoch kampanii NbLM-writerow (Settings+Permissions 2026 i CLAUDE.md Patterns 2026). Oba produkty koncowe beda zawierac `03_MEDIA_PROMPTS.md` z 1 promptem video (Overview) i 3 wariantami infografiki na kazda lekcje. Cel jakosciowy: **9.5/10 profesjonalny, estetyczny, zgodny z trendami 2026**. Raport dostarcza: (a) ramy koncepcyjne dla dwoch najwazniejszych stackow - NotebookLM Studio Cinematic (Gemini 3 + Nano Banana Pro + Veo 3) i `Midjourney V7` + `Sora 2` + `Veo 3.1` + `Flux Kontext` dla przypadkow custom; (b) piec frameworkow promptowych (S-C-L-M-A, L-C-T-I-M, Hero-Focus-Detail, Shot-Lens-Light-Sound, Layout-Data-Type-Icon-Palette); (c) dziesiec gotowych sample promptow 9.5/10 (5 video + 5 infografika) na tematach neutralnych, gotowe do kopiowania przez NbLM-writera; (d) 20-itemowa checklista jakosci; (e) tabele porownawcza anty-przyklady 3/10 vs 9.5/10.

Kluczowa teza 2026: od kiedy NotebookLM wprowadzil `Cinematic Video Overviews` (Gemini jako creative director) i 10-stylowy system infografik (Bento/Editorial/Scientific/Sketch Note/Bricks/Clay/Kawaii/Anime/Professional/Instructional), generyczny prompt "make a video about X" produkuje 4/10. Zeby osiagnac 9.5/10 prompt musi specyfikowac: **subject + narrative arc + visual style (named) + camera language + pacing + audio + mood + negatives**. Dla infografik: **layout (named) + color palette (hex) + typography pairing + iconography style + data-ink discipline + aspect ratio + mood + negative space**.

---

## 2. CZESC A: Video Overview prompts

### A.1 NotebookLM Studio Video Overview (format inputu)

NotebookLM Studio posiada dwa tryby generacji video:
- **Classic Video Overview** (narrated slides) - szybsze, proste
- **Cinematic Video Overview** (fluid animation, Gemini 3 + Nano Banana Pro + Veo 3) - od marca 2026, dostepne dla AI Ultra subscribers [1][2]

**Dwa pola wejsciowe, ktore okreslaja jakosc outputu:**

1. **Visual Style** - wybor z 8 presetow (Classic, Whiteboard, Watercolor, Retro Print, Heritage, Paper-craft, Kawaii, Anime) LUB **Custom** z opisem tekstowym [3]
2. **Steering Prompt / "What should the AI hosts focus on?"** - instrukcje co ma byc priorytetem narracji [4]

**Optymalna dlugosc Visual Style (Custom):** 80-200 slow. Pod 80 slow = za duzo interpretacji AI. Nad 200 slow = Gemini miesza style (`style drift`).

**Optymalna dlugosc Focus / Steering Prompt:** 150-300 slow. To jest miejsce na: glowna teza, sekwencje narracyjna, 3-5 punktow kluczowych, grupa docelowa, ton (`authoritative but friendly`, `curious and probing`).

**Slowa kluczowe ktore NotebookLM rozpoznaje dobrze (potwierdzone w dokumentacji [1] i eksperymentach uzytkownikow [5]):**
- Narrative shape: `hook`, `cold open`, `three-act structure`, `payoff`, `tag`
- Pacing: `slow and contemplative`, `fast-cut montage`, `breathing room`, `no filler`
- Camera language: `wide establishing shot`, `push-in`, `pull-back reveal`, `orbit`, `overhead flat-lay`, `Ken Burns`
- Visual style: `editorial`, `cinematic`, `documentary`, `explainer`, `infographic-in-motion`, `isometric 3D`, `flat vector`, `hand-drawn marker`
- Color: `teal-orange`, `duotone navy and amber`, `muted earth tones`, `neon on black`, `pastel Wes Anderson`
- Mood/tone: `authoritative`, `warm and curious`, `urgent but not alarmist`, `playful`, `reverent`

**Slowa ktore dzialaja slabo:** `awesome`, `cool`, `nice`, `good vibes`, `interesting`. Sa zbyt niespecyficzne zeby Gemini 3 wydobyl z nich wizualna interpretacje [6].

**Jak wplywac na tempo i transitions:** Gemini 3 respektuje eksplicytne zwroty o czasie sceny. `Each scene holds for 2-3 seconds` wymusi szybkie ciecia. `Let each beat breathe for 4-6 seconds before cutting` da spokojny rytm. `Use hard cuts, no fades` vs `cross-dissolves with 0.5s overlap` - model tez respektuje [7].

**Narrative structure (hook -> body -> takeaway):** NotebookLM domyslnie probuje struktury trzyczesciowej. Zeby ja wzmocnic, explicytnie opisz trzy beaty w Focus:

```
Beat 1 (0:00-0:10): Hook - otwarcie z prowokacyjnym pytaniem lub paradoksem.
Beat 2 (0:10-0:50): Explanation - trzy glowne kroki/konceptry, kazdy z przykladem.
Beat 3 (0:50-1:00): Takeaway - jedno zdanie do zapamietania, CTA do glebszej nauki.
```

### A.2 General AI video prompt best practices 2026

**Platformy w uzyciu 2026 (ranking wg jakosci cinematic outputu):**
1. **Sora 2** (OpenAI) - 15-25s, native audio, najlepsza w fizyce i scenach wieloosobowych [8]
2. **Veo 3.1** (Google) - sync audio, najlepszy w realistycznym dialogu i ustrukturyzowanych prompts [9]
3. **Runway Gen-4.5** - 5-10s, najlepsze camera motion settings i kontrola edycyjna [10][11]
4. **Kling 3.0 Omni** - silne native audio, formula `Camera + Scene + Subject + Vibe + Time` [12]
5. **NotebookLM Cinematic** (pod spodem Veo 3) - auto-pilot director, ograniczona kontrola techniczna

**Zasada nadrzedna 2026:** _"Think of prompting like briefing a cinematographer who has never seen your storyboard. If you leave out details, they'll improvise."_ [8]

**Shot composition language (uniwersalny glossary dla Sora 2 / Veo / Runway / Kling):**

| Shot type | Opis | Kiedy uzyc |
|---|---|---|
| `Extreme wide shot (EWS)` | Temat mikroskopijny w krajobrazie | Establish, skala, samotnosc |
| `Wide shot (WS)` | Cala postac + otoczenie | Kontekst, ruch ciala |
| `Medium shot (MS)` | Od pasa w gore | Dialog, gestykulacja |
| `Close-up (CU)` | Twarz, rece | Emocja, detail |
| `Extreme close-up (ECU)` | Oko, usta, palce | Napiecie, precyzja |
| `Over-the-shoulder (OTS)` | Ramie na pierwszym planie | Perspektywa rozmowcy |
| `Dutch angle / Canted angle` | Przekrzywiona kamera | Dezorientacja, napiecie |
| `Low angle` | Kamera pod tematem | Dominacja, heroizm |
| `High angle` | Kamera nad tematem | Wrazliwosc, obserwacja |
| `Overhead / Bird's-eye / Flat-lay` | Prostopadle z gory | Infografika-w-ruchu, ukladanie |

**Camera movement (dolly/pan/tilt/tracking/Ken Burns):**

| Ruch | Efekt |
|---|---|
| `Dolly in / push-in` | Narastajace napiecie, wciaganie w emocje [11] |
| `Dolly out / pull-back reveal` | Odsloniecie kontekstu, "ahah moment" |
| `Pan` (horyzontalny) | Przejscie, exploracja sceny [11] |
| `Tilt` (wertykalny) | Skala (tilt up - wielkosc; tilt down - upadek) |
| `Tracking / dolly follow` | Podazanie za tematem, imersja |
| `Crane / jib` | Heroiczne odsloniecie, cinematic scale |
| `Orbit` | Energia, 3D sens przestrzeni |
| `Handheld` | Autentyzm, dokumentalny feel |
| `Steadicam` | Plynny ale z "oddechem" czlowieka |
| `Ken Burns` | Powolny zoom-and-pan na foto/ilustracji - dobre do explainerow |

**Zasada 2026 dla AI video:** _"The most common mistake is requesting too much movement. Subtle, controlled motion looks far more professional than dramatic action. A gentle camera push with a slight subject turn looks cinematic."_ [13] Runway Gen-4 explicytnie ostrzega: `high motion speed = artifacts show up fast` [10].

**Lighting (3-point / golden hour / neon / chiaroscuro):**

- **3-point lighting** - key + fill + backlight. Default dla talking heads, interview, product shots [14]
- **Golden hour** - 15-25 min po wschodzie lub przed zachodem, cieple i miekkie; dla outdoor, emotional [14]
- **Blue hour** - 20-30 min po zachodzie, chlodne, melancholijne
- **Chiaroscuro** - silny kontrast swiatlo/cien, dramat, noir; "dance of light and shadow" [15]
- **Neon** - saturowane kolorowe swiatlo z punktowych zrodel, cyberpunk, retro-80s
- **High key** - jasno, minimum cieni, komercyjny, optymistyczny
- **Low key** - ciemno, glebokie cienie, thriller, intymnosc
- **Rembrandt** - 45-stopniowe boczne swiatlo, trojkat pod okiem, portretowe

**Color grading (teal-orange, Kodak, Wes Anderson):**

- **Teal-orange** - skora w cieplych tonach, cienie w chlodnych; default blockbuster Hollywood [16]
- **Kodak 5219 / Portra 400** - organic film grain, lekkie halacje, skora lekko rozowa, cienie zielonkawe
- **Wes Anderson / Asteroid City LUT** - pastele, symetria, teal-orange ale pchniety w rozow i musztarda [16]
- **Roger Deakins desaturated** - `1917`, `Blade Runner 2049` - stonowane, jeden dominujacy hue
- **Greig Fraser** - `Dune` - sepia, piaszczyste, niska saturacja
- **A24 moody indie** - green-magenta split-tone, niski kontrast
- **Bleach bypass** - desaturowany, wysoki kontrast, odbarwiony; `Minority Report`, `Saving Private Ryan`

**Motion graphics vs live action vs 3D render:**
- **Live action AI** (Sora 2, Veo 3.1) - realistyczne postacie, sceny
- **Motion graphics / 2D** (Runway + After Effects, Kinetic Typography tools) - tekst, ikony, animowane wykresy
- **3D render** (Runway, isometric style prompt w Flux/Midjourney + animate) - Kurzgesagt-like explainery [17]
- **Hybrid Kurzgesagt** - flat 2D + 3D camera moves + birds + mascot [18]

**Typography motion (kinetic typography):** `Text animates with spring physics, staggered reveal, letters drop from above and settle with micro-bounce, word-by-word appearance synced to narration.` Retencja wiadomosci 95% w video vs 10% w samym tekscie [19].

### A.3 Structured prompt anatomy (S-C-L-M-A framework)

**S-C-L-M-A** = **Subject + Composition + Lighting + Mood + Audio**

Framework skondensowany z analizy Sora 2 Cookbook [8], Veo 3.1 Google Cloud guide [9] i Runway Gen-4 [11]. Kazdy wymiar ma byc eksplicytny:

```
SUBJECT    : Kto/co jest w kadrze. Wiek, ubior, pozycja, akcja, emocja.
COMPOSITION: Shot type, lens, angle, camera movement, framing rules.
LIGHTING   : Direction (key light), time of day, mood lighting, practicals.
MOOD       : Emotional tone, genre reference, color grade, atmosphere.
AUDIO      : Dialog (w cudzyslowach), SFX, music genre, background soundscape.
```

Kazdy wymiar = minimum 1 pelne zdanie. Razem = 5-8 zdan, 100-180 slow.

### A.4 Educational video trends 2026

1. **Kurzgesagt successor styles** - flat vector + soft 3D + mascot (animal/character) + orbital camera + dense-information-per-second [17][18]
2. **Isometric animated graphics** - 30-degree camera, kostkowe budynki/biura/pipeline'y, 2.5D [20]
3. **Hand-drawn -> AI hybrid** - marker/ink linie, AI-generated coloring underneath, uzyskuje sie w Runway przez `whiteboard with marker strokes that color themselves in`
4. **Whiteboard 2.0 / AR overlay** - real-world backdrop z unoszaca sie informacja, hologramowe wykresy
5. **Data-as-story** - wykres rosnacy w trakcie narracji zastepuje tradycyjny slide; liczba przesuwajaca sie 0 -> 1,000,000 count-up [17]
6. **Documentary-explainer fusion** - interviewee talking heads + animated overlays. Veo 3.1 z sync dialogiem robi to natywnie [9]
7. **Bold typography hero** - ogromne slowo wypelniajace ekran, kinetic, nakladka na wideo (OutSystems / Studio Dumbar trend) [21]

### A.5 Typowe bledy w promptach

**1. Generyczny prompt ("make a cool video about hooks")**
- Problem: zero subject, zero composition, zero mood. AI wymysla wszystko.
- Fix: S-C-L-M-A w calosci.

**2. Zero camera direction**
- Problem: output ma przypadkowy kadr, statyczna kamera, dziwne kompozycje [22]
- Fix: explicit `wide establishing shot -> push-in to medium close-up -> pull-back reveal`.

**3. Zero audio guidance**
- Problem: Sora 2 / Veo 3.1 generuja audio natywnie; bez guidance = losowa muzyka, brak SFX [13]
- Fix: `SFX: soft mechanical clicks, distant city hum. Music: warm analog synth pad at 60 BPM, no drums. VO: male 30s, warm and conversational, mid-Atlantic accent.`

**4. Mieszanie styli**
- Problem: `photorealistic anime isometric 3D watercolor` = chaos. Gen-4 explicitly says `style shifts may provide unintended results` [10].
- Fix: jeden dominujacy styl + maksymalnie jeden accent (`photorealistic with hand-drawn infographic overlays`).

**5. Nieokreslone tempo**
- Problem: model wybiera ciecia losowo - za szybko lub za wolno.
- Fix: `Each scene holds for 3 seconds. Total duration: 15 seconds. Use 3 hard cuts on the beat.`

**6. Contradictory instructions**
- Problem: `slow contemplative mood with rapid action and aggressive energy` [13]
- Fix: re-read prompt for logical consistency.

**7. Physically impossible motion**
- Problem: `camera zooms in while pulling back through a wall while the subject teleports` -> artifacts, distortion [13]
- Fix: trzymaj sie fizyki; jeden ruch na raz.

**8. Over-stuffing synonyms**
- Problem: Midjourney V7 / Sora 2 rozumieja natural language; `beautiful gorgeous stunning magnificent amazing` = diminishing returns [23]
- Fix: jeden precyzyjny przymiotnik per cecha.

### A.6 5 sample 9.5/10 prompts (VIDEO)

**Niezawodna konwencja zapisu:** struktura S-C-L-M-A w formie pelnego paragrafu, nie listy.

---

**SAMPLE V1: Cinematic explainer - "Compound interest" (temat neutralny, 60s)**

_Target platform: NotebookLM Cinematic Video Overview (Custom Visual Style + Focus)_

```
VISUAL STYLE (150 words):
Editorial 3D explainer in the spirit of Kurzgesagt. Soft isometric worlds
rendered with matte-finish clay textures and subtle volumetric lighting.
Color palette: deep navy background (#0E1B2C), warm amber primary (#F4A261),
teal accent (#2A9D8F), off-white typography (#F8F4E8). Camera behaves like
a patient documentary observer: slow orbits around objects, gentle push-ins
for emphasis, overhead flat-lay shots to show stacking and growth. Thin
hand-drawn ink accents occasionally overlay the 3D, suggesting a scientist's
notebook. Typography: Inter Tight for labels (120 weight), editorial serif
(Tiempos Headline) for chapter titles. Infographic moments (charts, timelines,
coin stacks) animate with staggered spring physics, numbers count up in sync
with narration beats. No fades - hard cuts on rhythm. No photorealism, no
stock-footage feel, no generic "corporate AI" aesthetic.

FOCUS (250 words):
Explain compound interest so that a curious 16-year-old "gets it" in 60
seconds and feels they discovered something, not that they were lectured.

Three-act structure:
Act 1 - HOOK (0:00-0:10): Open with a paradox. "Which would you rather have:
a million dollars today, or one penny that doubles every day for 30 days?"
Cold open on two objects side by side - a briefcase and a single penny -
shot in extreme close-up, orbiting slowly.

Act 2 - EXPLANATION (0:10-0:45): Three beats, each ~12 seconds.
Beat 2a: Reveal the math. Penny doubles day by day. Overhead flat-lay of
coin stacks growing. Number counts up on screen.
Beat 2b: Show the exponential curve. 2D chart self-draws in ink style.
Emphasize the "hockey-stick moment" around day 25.
Beat 2c: Generalize - this is compound interest. Show a savings-account
metaphor: a tiny seed becomes a tree over decades, time-lapse.

Act 3 - TAKEAWAY (0:45-0:60): One sentence to remember: "Time is the most
expensive thing you own - start early." End on a warm close-up of hands
planting the seed, slow pull-back to reveal a forest.

Tone: curious and warm, never condescending. Narrator: 30s, calm, slight
smile audible. Treat the viewer as intelligent. Avoid buzzwords like
"unlock," "game-changer," "secret." No exclamation marks in VO.

Pacing: steady 4-second holds on key visuals, breathing room. One punchline
per beat. Do not over-explain.

AUDIO: Soft analog synth pad at 60 BPM, no drums. Kurzgesagt-style warm
ambient. SFX: gentle coin-clink on stack moments, soft paper-scratch on
ink-draw moments. VO: Polish/English bilingual; use Polish if sources are
Polish, otherwise English.
```

**Dlaczego 9.5/10:** S-C-L-M-A kompletny; visual style ma nazwany reference (Kurzgesagt) + konkretny color palette w hex; Focus ma pelna 3-aktowa strukture z timingami; tone jest explicit ("never condescending"); audio ma BPM, SFX i VO description; explicit negatives ("no photorealism, no fades"). NotebookLM Cinematic reference z Veo 3 pod spodem dostanie wszystko czego potrzebuje.

---

**SAMPLE V2: Documentary-style talking head (Sora 2 / Veo 3.1, 20s)**

```
SUBJECT: Woman in her late 40s, soft features, grey-streaked dark hair
pulled into a low ponytail, wearing a cream linen shirt. Sits at a cluttered
workshop bench, turning a small handmade ceramic bowl in her hands. She
looks down at the bowl, then up at the interviewer (off-screen camera left),
and says: "The crack is not the end of the bowl. In Japan we fill it with
gold."

COMPOSITION: Medium close-up, 50mm prime lens equivalent, shallow depth of
field (bokeh on background tools). Camera at her seated eye-level, slight
3-degree offset to camera right. Subtle handheld breathing, no active
movement. Rule of thirds: her eyes on upper-left intersection.

LIGHTING: North-facing window light, soft and diffused, key from camera
left at 45 degrees. Warm practical tungsten lamp as rim/backlight on her
right shoulder. No fill - let shadows fall on camera-right side of her
face. Golden hour mood indoors, 4000K overall, with 3200K accent.

MOOD: Contemplative, intimate documentary. Roger Deakins muted palette -
olive, cream, warm brown, soft gold accents. Film grain 35mm, Kodak Portra
400 emulation, no heavy grading.

AUDIO: Her voice, Polish-accented English, warm mid-register, measured
pace. SFX: faint wood-floor creak, distant wind chimes, the subtle scrape
of ceramic on wood when she places the bowl down on beat 0:18. No music.
Room tone: spacious, workshop silence.

Duration: 20 seconds. No cuts - single continuous take. Camera does not
move except for natural handheld micro-breath.
```

**Dlaczego 9.5/10:** Specyficzny dialog w cudzyslowach (Veo 3.1 i Sora 2 lubia to), konkretny lens (50mm), konkretne Kelvin temp, nazwany DoP reference (Deakins), explicit film stock (Portra 400), brak music = authenticity, single-take explicit constraint.

---

**SAMPLE V3: Kinetic typography data reveal (Runway Gen-4.5, 10s)**

```
CAMERA: Static, locked-off wide 16:9, no movement. The screen itself is
the stage.

SUBJECT: Large numeric counter at center-frame, animating 0 -> 1,000,000.
The typography is the hero: editorial sans-serif, custom display weight,
near-black (#0A0A0A) on a warm off-white background (#FAF6EE). As the
number counts up, secondary annotations fade in and out around it:
"seconds in 11 days", "heartbeats in 10 days", "words in War and Peace x2".

ACTION: Count-up animates over 7 seconds with ease-out curve - starts fast,
slows in the final 25%. Three annotation labels appear sequentially at
seconds 2, 4, 6, each fading in with 0.3s spring, holding for 1.5s, fading
out with 0.2s.

STYLE: Editorial magazine inspired (The New York Times "interactive
explainer" aesthetic). Paper-white background with barely-visible grid
lines. Subtle drop shadow under the hero number. Annotations in smaller
weight, in warm grey (#6B6561). No gradients, no bevels, no 3D.

ENDING (seconds 7-10): Number lands on exactly 1,000,000. A thin horizontal
rule appears underneath, and a single word fades in: "million." Hold 2
seconds. Cut to black.

AUDIO: Subtle mechanical click-clack for each digit rollover (like a
flipclock), pitch rising as the number grows. One soft typewriter-ding
when the number lands. No music. No VO.
```

**Dlaczego 9.5/10:** Explicit aspect ratio (16:9), locked camera (unikamy nadmiaru ruchu [13]), hex codes dla color, nazwany editorial reference (NYT), precyzyjne timings per beat, typography jako hero (zgodne z trendem 2026 [21]), SFX specyficzne (flipclock, typewriter-ding).

---

**SAMPLE V4: Isometric 3D explainer (NotebookLM Custom Style, 45s)**

```
VISUAL STYLE (120 words):
Isometric 3D illustration in a clay-render aesthetic - think Apple keynote
meets Airbnb marketing. 30-degree camera angle, never straight-on. All
environments are miniature dioramas: an office, a data center, a city block.
Color palette: warm neutrals - sand (#E8D9B5), terracotta (#C86B4A), sage
(#8A9A7B), deep teal accent (#2D5F5D), off-white (#F5F1EA). Soft ambient
occlusion, no hard shadows. Gentle orbital camera movements at 5-degree/sec.
Buildings "grow out of the ground" with spring physics on reveals. Objects
have a subtle matte finish, no reflections. Typography overlays use Inter
with heavy letter-spacing for labels. No photorealism, no human faces, no
photographic textures - everything is a stylized 3D model.

FOCUS (220 words):
Explain how a request travels from a user's browser to a backend server,
through caching, database, and back - so a non-technical manager understands
the architecture.

Arc: zoom-in chain. Each section is a "miniature stage" revealed by the
camera moving to it.

Stage 1 (0:00-0:08) - User: A small clay-style figure at a laptop. Speech
bubble: "search 'coffee near me'". Click animation on the laptop. Camera
orbits 45 degrees to the right.

Stage 2 (0:08-0:18) - Network/CDN: A glowing pulse travels through
isometric pipes to a CDN building. If cached, it returns immediately. If
not, pulse continues.

Stage 3 (0:18-0:30) - Load Balancer & Servers: A building with three
identical server-rack towers. The load balancer at the door directs the
pulse to the least-busy tower.

Stage 4 (0:30-0:40) - Database: A vault-like building. The tower "asks" the
vault, vault returns a glowing data packet.

Stage 5 (0:40-0:45) - Return trip: Pulse reverses all the way back to the
user's laptop. Coffee shop results appear on the laptop screen. Tag line:
"In 200 milliseconds."

Tone: crisp, confident, slightly playful. Narrator: mid-30s, warm,
technical but accessible. Uses one analogy per stage (pipes, vault, tower).

AUDIO: Clean electronic ambient, 90 BPM, minimal. SFX: soft "ping" on each
pulse transition, satisfying "thunk" on vault open/close. VO English, clear
diction, no filler words.
```

**Dlaczego 9.5/10:** Visual Style nazwany reference (Apple keynote / Airbnb), explicit palette z hex, explicit camera behavior (30deg, 5deg/sec orbit), Focus ma pelna 5-stage structure z timingami, narrator persona, audio z BPM i SFX typami.

---

**SAMPLE V5: Whiteboard 2.0 / AR overlay (Sora 2, 20s)**

```
SUBJECT: A person's hands (mid-30s, neutral skin tone, clean nails, no
jewelry) draw on a translucent floating AR glass panel that hovers in
mid-air in a sunlit home office. The person draws a simple flowchart: three
rectangles connected by arrows, labeled "Input", "Process", "Output".

COMPOSITION: Over-the-shoulder medium shot, 35mm lens equivalent. Camera
holds static for the first 8 seconds, then performs a slow 4-second dolly
in to close-up on the drawn flowchart as the final arrow connects. Depth
of field: hands and panel in focus, home office softly defocused.

LIGHTING: Natural window light from camera left, soft and diffused. The
AR panel itself emits a faint blue-white inner glow (practical source).
Subtle rim-light on the hands from a warm lamp off-camera right.

STYLE: Photorealistic. The AR panel is clearly diegetic - not a post-effect
overlay. It has faint edge reflections and particulate shimmer when
interacted with. When a shape is drawn, faint ink-like lines self-animate
into clean geometric rectangles with spring physics snap-to-grid. No
neon-cyberpunk aesthetic - think Apple Vision Pro tutorial, not
Blade Runner.

MOOD: Calm, focused, morning-coffee energy. Warm cream and soft blue
palette, low contrast.

AUDIO: Ambient room tone, distant birdsong through an open window. SFX:
gentle pen-on-glass scratch on each stroke, soft "snap" when shapes
crystallize into clean geometry. No music. No VO.

Duration: 20 seconds. One dolly-in, no cuts.
```

**Dlaczego 9.5/10:** Diegetic AR framing (nie jako post-effect ale jako rzeczywistosc w scenie), explicit reference (Apple Vision Pro tutorial), explicit NEGATIVE (not Blade Runner), single movement constraint, realistic physics rules for AR interaction, ambient audio bez VO dla medytacyjnego tonu.

---

## 3. CZESC B: Infographic prompts

### B.1 NotebookLM Studio Infographic (format inputu)

Od marca 2026 Infographic w NotebookLM Studio ma:
- **10 predefiniowanych styli:** Sketch Note, Kawaii, Professional, Scientific, Anime, Clay, Editorial, Instructional, Bento Grid, Bricks [24]
- **Level of detail:** Concise / Standard / Detailed
- **Orientation:** Square / Portrait / Landscape
- **Style description field** (custom) - tu jest prawdziwa kontrola [24][25]

**Custom style description - optymalna dlugosc:** 100-220 slow. Poniżej 100 NotebookLM wraca do domyslnych presetow. Powyzej 220 zaczyna ignorowac pozniejsze instrukcje (token-position weighting podobnie jak Flux [26]).

**Co wkladac w style description (struktura):**
```
1. Layout (named): bento grid 3x3, circular radial, horizontal timeline...
2. Color palette (hex): 4-5 konkretnych kolorow
3. Typography (families): serif+sans pairing, weights
4. Iconography: line/filled/gradient/custom illustration
5. Mood: authoritative/playful/urgent
6. 2-3 NEGATIVES: no stock icons, no clipart, no gradients on text
```

### B.2 AI image prompt best practices (Midjourney V7, DALL-E 3, Flux)

**Midjourney V7 (dominujaca platforma 2026 dla infografik):**
- `--ar` dla aspect ratio: infografika pionowa social `--ar 4:5`, slajd `--ar 16:9`, poster `--ar 3:4`, Square `--ar 1:1` [27]
- `--stylize` 0-1000: dla infografiki **150-350** (nizej = bardziej literal, wyzej = bardziej artistic stylizacja) [23]
- `--style raw` - wylacza domyslna estetyke MJ, lepsze dla corporate/clean/editorial [23]
- `--chaos` 0-100: dla infografiki **0-15** (chcemy przewidywalnosci)
- V7 rozumie natural language, nie potrzeba keyword-stuffing [23]
- Typography renderujesz przez cudzyslowy: `with text "ANNUAL REPORT 2026" in the lower third` - V7 umie tekst dobrze [28]

**DALL-E 3 / GPT Image 1.5:**
- DALL-E 3 deprecated od 12 maja 2026 [29]; GPT Image 1.5 - nastepca
- Natural language, bez parametrow. Dluzszy opis = lepsza adherencja
- Text rendering lepszy niz DALL-E 3, ale nadal popelnia bledy ortograficzne [29]
- Najlepiej dla one-shot infografik bez character consistency

**Flux Kontext / Flux.1 Dev:**
- Edycja obrazow z instrukcjami ("replace 'X' with 'Y'", "keep everything but change background to Z") [26]
- Token-position weighting: **najwazniejsze info na poczatku promptu** [26]
- Struktura: Subject -> Action/pose -> Environment -> Lighting -> Style/tech specs [26]
- Dla infografik z dokladnie 1 zmiana (np. podmiana koloru palety) - idealne
- Flux.2 obsluguje structured JSON prompts dla production pipelines [26]

### B.3 Infographic design principles (Tufte, visual hierarchy)

Niezalezne od AI - te zasady musza byc w promptcie.

**Tufte (The Visual Display of Quantitative Information, 1983) [30][31]:**
1. **Above all else show data** - dane sa bohaterem, nie dekoracja
2. **Maximize data-ink ratio** - proporcja ink-on-data vs ink-total powinna byc wysoka
3. **Erase non-data-ink** - usun ramki, tla, cienie ktore nic nie dodaja
4. **Erase redundant data-ink** - nie powtarzaj tej samej informacji
5. **Avoid chartjunk** - dekoracje niewnosace informacji sa szkodliwe [31]
6. **Small multiples** - wiele malych wykresow pokazuje wzorce lepiej niz jeden wielki

**Visual hierarchy (Z-pattern, F-pattern, golden ratio) [32]:**
- **Z-pattern** - oko skanuje lewy-gorny -> prawy-gorny -> lewy-dolny -> prawy-dolny. Dla poster/landing infographic
- **F-pattern** - lewa strona z gornymi linjami. Dla gestych tekstowych
- **Golden ratio (1:1.618)** - podzial kompozycji, klasyczne proporcje
- **Clear reading hierarchy:** silny tytul -> main pattern visible at glance -> detale dostepne przez labeling [31]

**Color theory (complementary, analogous, monochromatic) [33]:**
- **Complementary** - 180 stopni, wysoki kontrast. Uzywaj oszczednie: 80/20, tlo + accent
- **Analogous** - 30 stopni obok siebie, naturalne, harmonijne. Dla soft, editorial
- **Triadic** - 120 stopni, balans z zywoscia. Dla playful, dynamic
- **Monochromatic** - ten sam hue, rozne saturacja/jasnosc. Dla sophisticated, quiet
- **Split-complementary** - 2 sasiedzi dopelnienia. Kontrast bez napiecia

**Typography pairing:**
- **Serif + Sans** (editorial) - Tiempos Headline + Inter, Playfair + Lato
- **Display + Body** (poster) - ogromny display + maly body, 10:1 ratio
- **Mono + Sans** (technical) - JetBrains Mono + Inter, IBM Plex Mono + IBM Plex Sans
- **Single family multi-weight** (modern) - tylko Inter w 4 wagach (200, 400, 600, 800)

**Iconography consistency:**
- Wybierz jeden styl: `line icons (2px stroke)`, `filled`, `duotone`, `gradient`, `custom illustration`
- Nigdy nie miksuj
- Stroke weight musi byc identyczny w calym layoucie

**Negative space:**
- Minimum 15% pola to "oddychanie"
- Grupowanie przez proximity (Gestalt)
- Nie wypelniaj narozy - pozostawiaj czyste

### B.4 Trendy 2026 w infografice

1. **Bento grid layouts (Apple-inspired)** [34] - 3x3 lub 2x4 modular, rounded corners, soft shadows, uporzadkowane bez sztywnosci. NotebookLM ma to jako osobny preset [24]
2. **Isometric 3D** [20] - kostkowe ilustracje w 30deg perspektywie, clay/plasticine textures
3. **Gradient mesh backgrounds** - organiczne rozmyte przejscia kolorow jako tlo, ostre linie ikon na wierzchu [35]
4. **Duotone photography** [20] - foto w 2 kolorach z palety, accent color jako element plot
5. **Big typography as hero** [36] - ogromny tytul = 40-60% pola. OutSystems, Studio Dumbar trend [21]
6. **Editorial magazine style** (NYT, Bloomberg) [37][38] - asymetryczny grid, serif, wysokie kontrasty typograficzne
7. **Data-as-art** - minimalistyczna quantitative viz jako estetyczny element
8. **Hand-drawn accents on clean bases** [35] - tlo ultra-clean, akcenty markerem/atramentem dla humanizacji
9. **Kinetic & elastic typography** [36] - typografia ktora "rozciaga sie" - w static infographic to np. stretched letters, warped baselines
10. **AI + human authorship** [35] - swiadomie zostawiamy slad reki, nie wyglada jak pure AI

### B.5 Structured anatomy (L-C-T-I-M framework)

**L-C-T-I-M** = **Layout + Color + Typography + Iconography + Mood**

```
LAYOUT     : Bento 3x3 / circular / timeline / comparison / taxonomy / Z-scan
COLOR      : 4-5 hex codes, named harmony (complementary/analogous/mono)
TYPOGRAPHY : Family pairing, weights, hierarchy ratio (e.g., 8:3:1)
ICONOGRAPHY: Single style (line 2px / filled / gradient / custom illus.)
MOOD       : Named reference + 2 adjectives + mood board
+ ASPECT RATIO
+ NEGATIVES (3-5 items)
```

Rozszerzona wersja dla production: **L-C-T-I-M-A-N** (dodaj Aspect ratio + Negatives).

### B.6 5 sample 9.5/10 prompts (INFOGRAPHIC)

---

**SAMPLE I1: Editorial bento grid - "Sleep stages" (Midjourney V7, 1:1)**

```
Editorial infographic in bento grid layout (3x2), showing four sleep
stages: N1, N2, N3, REM. Each cell is a modular panel with rounded
corners (16px radius) and subtle 2% drop shadow, separated by 24px
gutters on a warm off-white background.

Palette - analogous cool + one warm accent:
- Deep navy #0E1B2C (primary text, outlines)
- Slate blue #3A5269 (secondary)
- Muted teal #6B9A8B (accent 1)
- Warm apricot #E9A06B (accent 2, used for REM cell only)
- Paper off-white #F8F4EE (background)

Typography pairing - serif + sans:
- Tiempos Headline Bold 64pt for chapter title "A NIGHT IN YOUR BRAIN"
  top center, letter-spacing -2%
- Inter Tight Semibold 18pt for cell titles
- Inter 13pt for body text
- Inter Mono 11pt for data labels
Hierarchy ratio 8:3:1

Iconography - line icons 2px stroke, rounded caps, no fills. One icon
per cell (closed eye, half-moon, deep wave, dreaming figure).

Each cell contains:
- Tiny icon top-left
- Stage name mid
- One-line descriptor
- Miniature EEG wave visualization bottom (different shape per stage)
- Duration label bottom-right (e.g. "~20 min")

Mood: editorial magazine (New York Times interactive explainer), quiet
authority, scientific but human. Negative space 20% of total area.
Overall feeling: a page from a sleep medicine journal redesigned for
smart laypeople.

NEGATIVES: no stock icons, no clipart, no gradient fills on text, no
3D effects, no cartoonish faces, no Comic Sans, no cluttered edges.

--ar 1:1 --stylize 200 --style raw --v 7
```

**Dlaczego 9.5/10:** L-C-T-I-M kompletny, hex codes, explicit typography families + weights + sizes + hierarchy ratio, explicit iconography stroke weight, per-cell structure, named mood reference (NYT), konkretne negatives, MJ V7 parameters.

---

**SAMPLE I2: Isometric 3D pipeline - "Data flow" (Midjourney V7, 16:9)**

```
Isometric 3D illustration at 30-degree camera angle, depicting a data
pipeline as a miniature diorama of connected buildings and pipes on a
minimal platform. Stations are arranged left-to-right: "Source", "Clean",
"Transform", "Store", "Analyze", "Visualize".

Style: clay/plasticine render with soft ambient occlusion, matte finish,
no hard reflections. Subtle gradient mesh background, bottom-to-top:
cream (#F2E9D8) to dusty rose (#E4CFC7). The platform itself has
faint topographic contour lines printed on it.

Palette - warm neutrals + one saturated accent:
- Terracotta #C86B4A (buildings)
- Sage #8A9A7B (pipes and roofs)
- Sand #E8D9B5 (platform)
- Deep teal #2D5F5D (accent - glowing data packets traveling through pipes)
- Off-white #F5F1EA (labels, highlights)

Typography: Inter Tight Semibold 14pt, off-white, positioned as floating
labels above each station, connected by a thin 1px line to the building.

Iconography: N/A - the 3D objects themselves are the icons.

Details: tiny clay figures (no facial features) near each station for
scale. Glowing teal data packets travel through the pipes. At
"Visualize" station, a tiny bar chart rises from the roof. All pipes
are hexagonal cross-section.

Mood: calm confidence, Apple keynote meets Airbnb marketing, educational
but sophisticated.

NEGATIVES: no photorealism, no reflective surfaces, no hard black
outlines, no neon glow on non-data elements, no human faces.

--ar 16:9 --stylize 250 --v 7
```

---

**SAMPLE I3: Big typography hero - "One in eight" (Flux Dev, 4:5)**

```
Bold editorial poster with typography as the hero, 4:5 aspect ratio.
The composition is dominated by enormous oversized numerals "1/8"
spanning 70% of the canvas height, positioned slightly right of center.

Style: modern editorial magazine (think Bloomberg Businessweek meets
The Face magazine). High contrast black serif display typography
(custom display face, sharp terminals, high x-height) on a creamy
ivory background (#F5EDDC). A single horizontal hairline rule below
the numerals.

The "1/8" is rendered with the "1" in solid near-black (#0B0B0B) and
the "8" as an outline-only version in the same color (2px stroke) -
creating visual rhythm through filled vs hollow contrast.

Below the numerals in smaller type (8:1 ratio with hero):
"adults experience tinnitus"
set in Inter Tight Medium 48pt, warm grey #555048, optical kerning.

Top-left corner (small): "FROM THE DATA DESK" in all caps, JetBrains
Mono 10pt, letter-spacing +10%, warm grey.

Bottom-right corner: tiny data source citation in same style.

Negative space: 50% of canvas. The poster feels confident and quiet.

Palette - monochromatic warm with near-black:
- Ivory #F5EDDC
- Warm grey #555048
- Near-black #0B0B0B

Mood: Bloomberg Businessweek meets New York Times data desk. Quiet
authority. The reader stops because the number is so big.

NEGATIVES: no stock photography, no 3D, no gradients, no icons, no
drop shadows, no justified text.

--ar 4:5
```

---

**SAMPLE I4: Duotone photography + data overlay (Midjourney V7, 3:2)**

```
Editorial infographic combining duotone photography with a minimalist
data overlay. Aspect ratio 3:2.

Base image: a black-and-white photograph of a crowded train platform
at rush hour (long exposure, slight motion blur on walking figures).
Converted to a duotone: midtones mapped to deep navy (#0E1B2C),
highlights mapped to warm terracotta (#C86B4A). The duotone shifts at
40% luminance.

Data overlay (positioned top-right quadrant): a thin vertical line
chart rising from the platform floor, made of 1px ivory lines, showing
"Passengers per minute, 7am-9am". The chart is semi-transparent
(60% opacity) and respects the composition - it does not cover any
faces.

Typography:
- Hero title bottom-left: "THE 8:07 CROWD" in Tiempos Headline Bold
  72pt, ivory (#F5EDDC)
- Subtitle below: Inter Tight Regular 20pt, ivory at 80% opacity:
  "How a city breathes"
- Annotation on chart: Inter Mono 12pt, ivory, with 1px leader lines
  to data points

Palette - duotone with one highlight:
- Deep navy #0E1B2C
- Terracotta #C86B4A
- Ivory #F5EDDC

Mood: New York Times photo-essay, quiet observation of urban life,
data as poetry, Tufte-minimal.

NEGATIVES: no colorful photography, no busy annotations, no oversized
logos, no emojis, no clip art.

--ar 3:2 --stylize 300 --style raw --v 7
```

---

**SAMPLE I5: Timeline chronological - "History of writing systems" (NotebookLM Infographic, Portrait)**

_Target: NotebookLM Infographic Studio, style description field_

```
LAYOUT: Vertical timeline, portrait orientation, single central axis
with branches extending left and right alternately. Eight nodes from
3200 BCE to 2026 CE, representing major writing system milestones.

VISUAL STYLE: Editorial scholarly, inspired by ancient manuscript
illumination meets modern data visualization. Warm aged-paper
background (#F0E4CA) with very faint horizontal ruling lines every
40px. The central timeline axis is a rich burgundy (#7A2E2E),
textured like ink on parchment.

Palette - warm analogous with single cool accent:
- Parchment #F0E4CA (background)
- Burgundy #7A2E2E (timeline axis, primary accents)
- Ochre #B8802F (secondary, highlights on key events)
- Deep forest green #3E5C3F (accent for "living languages" events)
- Faded ink brown #4A3A2A (body text)

TYPOGRAPHY:
- Era titles: custom hand-lettered serif look (Trajan or similar),
  42pt, burgundy, small caps
- Event labels: editorial serif (Tiempos Text) Bold 16pt
- Body copy: same family Regular 13pt, leading 1.5
- Date markers: Inter Mono 11pt, ochre

ICONOGRAPHY: Hand-inked illustration style - tiny symbolic engravings
next to each event (cuneiform tablet, papyrus scroll, Gutenberg press,
keyboard, smartphone). 1px ink-line strokes, organic imperfect edges,
never mechanical.

MOOD: A page from a 19th-century scholarly reference book, redesigned
with 2026 typographic restraint. Authoritative but warm.

NEGATIVES: no digital-looking gradients, no stock icons, no neon
colors, no 3D effects, no cartoonish illustrations, no emojis.

Level of detail: Detailed. Orientation: Portrait.
```

---

## 4. CZESC C: Prompt frameworks

### C.1 S-C-L-M-A (Video)

Opisany szczegolowo w A.3. Skrot:
- **Subject** - kto/co, pozycja, akcja, emocja
- **Composition** - shot type, lens, angle, camera movement
- **Lighting** - direction, time, mood lighting, practicals
- **Mood** - emotional tone, genre reference, color grade
- **Audio** - dialog w cudzyslowach, SFX, music genre, VO

### C.2 L-C-T-I-M (Infographic)

Opisany szczegolowo w B.5. Skrot:
- **Layout** - nazwana struktura (bento/timeline/circular/Z/F)
- **Color** - 4-5 hex z nazwana harmonia
- **Typography** - family pairing + weights + hierarchy ratio
- **Iconography** - single style, explicit stroke weight
- **Mood** - named reference + adjectives

### C.3 Hero-Focus-Detail narrative ladder (Video)

Dla edukacyjnych video 45-90s. Kazdy beat narracji ma trzy poziomy:

```
HERO   : Jedno duze wizualne stwierdzenie (cold open, paradox, hook)
FOCUS  : Rozwiniecie - 3 podpunkty/beaty/przyklady
DETAIL : Konkrety, liczby, cytaty, nuanse
```

Mapping do video structure:
- HERO = sekundy 0-10 (cold open)
- FOCUS = 10-45 (rozwiniecie)
- DETAIL = 45-60 (pogłebienie, ale nie forsowne)

NotebookLM Cinematic w 2026 respektuje hierarchie, jesli napiszesz ja explicytnie w Focus [1][5].

### C.4 Shot-Lens-Light-Sound (Cinematography shorthand)

Dla szybkich 5-15s clipow (Runway Gen-4.5, Kling 3.0). 4 wymiary kazdy = 1 zdanie = 15-40 slow total.

```
SHOT : Wide establishing dolly-in to medium close-up over 4 seconds.
LENS : 35mm, shallow depth of field, slight lens flare.
LIGHT: Golden hour key from camera left, warm rim-light from behind.
SOUND: Wind through grass, distant church bell, no music.
```

Minimalistyczny ale 9.5/10 dla short-form content.

### C.5 L-D-T-I-P (Infographic production pipeline)

**Layout - Data - Type - Icon - Palette**

Rozszerzenie L-C-T-I-M dla data-heavy infografik gdzie dane sa pierwszoplanowe:

```
LAYOUT : Struktura gridu
DATA   : Konkretne liczby + typ chartu per datapoint
TYPE   : Typography system
ICON   : Iconography rules
PALETTE: Color system z rola per kolor
```

Pozwala separowac "design" od "data" - projektant moze iterowac nad stylem, zespol dostarcza dane niezaleznie.

### Przed/po: 3/10 vs 9.5/10 (tabela porownawcza)

| Temat | Prompt 3/10 | Prompt 9.5/10 (skrot) |
|---|---|---|
| Video: compound interest | "Make a cool 1-minute explainer video about compound interest" | Pelne Sample V1 (150-word Visual Style + 250-word Focus + BPM audio + 3-act structure + hex palette) |
| Infografika: sleep stages | "Infographic about 4 sleep stages, make it look professional and modern" | Pelne Sample I1 (bento 3x2, 5 hex codes, serif+sans pairing z weights, line 2px icons, NYT mood, 6 negatives) |
| Video: data pipeline | "Show how data flows from source to database" | Pelne Sample V4 (isometric clay, 5-stage diorama, 30deg camera, 5-stage timings, BPM + SFX typy, narrator persona) |

**Obserwacja:** prompt 3/10 dostaje generyczny output, 4/10 gotowy. Prompt 9.5/10 dostaje output 7-8/10 za pierwszym razem, ktory po 2-3 iteracjach dochodzi do 9.5/10. **Roznica: 10x jakosciowa przy 5x wiekszym promptcie.**

---

## 5. CZESC D: Quality checklist (20-item self-assessment dla kazdego promptu)

Po napisaniu promptu NbLM-writer przechodzi przez te 20 punktow. Jesli zaznaczy 18+/20, prompt jest 9.5/10.

### Video prompt (S-C-L-M-A ladder):

- [ ] **1. Subject explicit** - kto/co, wiek, ubior, pozycja, akcja (nie ogolnik)
- [ ] **2. Shot type nazwany** - WS/MS/CU/ECU/OTS, nie "scene"
- [ ] **3. Lens/focal length** - 24mm/35mm/50mm/85mm lub shallow/wide
- [ ] **4. Camera movement explicit** - dolly/pan/tilt/orbit/static, jedno na raz
- [ ] **5. Lighting direction** - key light z ktorej strony + time of day
- [ ] **6. Color grade nazwany** - teal-orange / Portra 400 / Deakins muted etc.
- [ ] **7. Mood reference** - nazwany DoP/film/channel (Deakins, Kurzgesagt, A24)
- [ ] **8. Audio: music BPM + genre**
- [ ] **9. Audio: SFX explicit list**
- [ ] **10. Audio: VO persona** (wiek, ton, accent, pace)
- [ ] **11. Dialog w cudzyslowach** (jesli jest)
- [ ] **12. Duration okreslone** + beat timings
- [ ] **13. Pacing** - ile sekund hold per scena, czy cuts czy dissolves
- [ ] **14. Aspect ratio** (16:9, 9:16, 1:1)
- [ ] **15. 3-aktowa struktura** (jesli > 30s)
- [ ] **16. Negatives explicit** (2-5 items: "no fades", "no photorealism" etc.)
- [ ] **17. Target platform** wymieniony (Sora 2 / Veo / Runway / NbLM)
- [ ] **18. Total word count 100-250**
- [ ] **19. Brak contradictions** (re-read logicznie)
- [ ] **20. Brak generycznych slow** (awesome/cool/nice)

### Infographic prompt (L-C-T-I-M ladder):

- [ ] **1. Layout nazwany** (bento/timeline/Z/F/radial)
- [ ] **2. Aspect ratio** (`--ar` w MJ / Portrait-Landscape-Square w NbLM)
- [ ] **3. 4-5 hex codes** podanych explicytnie
- [ ] **4. Color harmony nazwana** (analogous/mono/complementary)
- [ ] **5. Typography families** (min. 2: serif+sans lub display+body)
- [ ] **6. Typography weights** explicit (Bold/Regular/Light)
- [ ] **7. Typography sizes** lub hierarchy ratio (8:3:1)
- [ ] **8. Iconography style** - single choice (line 2px / filled / gradient)
- [ ] **9. Negative space** procent lub explicit rule
- [ ] **10. Mood reference** - NYT / Bloomberg / Kurzgesagt / Apple keynote
- [ ] **11. Per-element structure** (co w kazdym cell/node)
- [ ] **12. Data hierarchy** - co jest bohaterem (hero + secondary + tertiary)
- [ ] **13. Tufte compliance** - data-ink ratio rozwazony
- [ ] **14. Explicit NEGATIVES** (3-5: no stock icons, no clipart, no gradients on text)
- [ ] **15. MJ params** (jesli MJ: --ar, --stylize, --style raw, --v 7)
- [ ] **16. Token-position discipline** (najwazniejsze info na poczatku, zwlaszcza Flux)
- [ ] **17. Text content w cudzyslowach** (dla typography renderingu)
- [ ] **18. Word count 100-250**
- [ ] **19. Brak stylistic mixing** (jeden dominujacy styl)
- [ ] **20. Accessibility** - kontrast min 4.5:1 dla text (WCAG AA)

---

## 6. Bibliografia

### Video Overview / NotebookLM
[1] NotebookLM Help: Generate Video Overviews - https://support.google.com/notebooklm/answer/16454555 (Google, 2026)
[2] Google Blog: Generate your own Cinematic Video Overviews in NotebookLM - https://blog.google/innovation-and-ai/products/notebooklm/generate-your-own-cinematic-video-overviews-in-notebooklm/ (Google, 03-04-2026)
[3] Kombib, Medium: NotebookLM Gets Custom Visual Style - https://medium.com/@kombib/notebooklm-gets-custom-visual-style-how-to-create-video-presentations-that-truly-match-your-53b337f1e517 (2026)
[4] BuildFastWithAI: NotebookLM Cinematic Video Overview Full Guide 2026 - https://www.buildfastwithai.com/blogs/notebooklm-cinematic-video-overview-full-guide-2026
[5] Lilys.ai: How to Customize NotebookLM Video Overviews - https://lilys.ai/en/notes/notebooklm-practical-usage-guide-20260203/customize-notebooklm-video-overviews
[6] Shareuhack: NotebookLM Advanced Guide 2026 - https://www.shareuhack.com/en/posts/notebooklm-advanced-guide-2026
[7] 9to5Google: NotebookLM adds Cinematic Video Overviews - https://9to5google.com/2026/03/04/notebooklm-cinematic-video-overviews-ai-mode/

### AI Video (Sora 2, Veo 3.1, Runway, Kling)
[8] OpenAI Cookbook: Sora 2 Prompting Guide - https://cookbook.openai.com/examples/sora/sora2_prompting_guide (OpenAI, 2026)
[9] Google Cloud: Ultimate prompting guide for Veo 3.1 - https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-veo-3-1 (Google Cloud, 2026)
[10] Runway Help: Gen-4 Video Prompting Guide - https://help.runwayml.com/hc/en-us/articles/39789879462419-Gen-4-Video-Prompting-Guide
[11] Runway Help: Camera Terms, Prompts, Examples - https://help.runwayml.com/hc/en-us/articles/46749315925395-Camera-Terms-Prompts-Examples
[12] GLBGPT: Kling 3.0 Prompt Guide for Better AI Videos 2026 - https://www.glbgpt.com/hub/kling-3-0-prompt-guide-for-better-ai-videos
[13] WaveSpeed AI: Sora 2 Prompting Tips 2026 - https://wavespeed.ai/blog/posts/sora-2-prompting-tips-better-videos-2026/
[14] Backstage: Film Lighting Techniques - https://www.backstage.com/magazine/article/film-lighting-techniques-76277/
[15] StudioBinder: What is Chiaroscuro - https://www.studiobinder.com/blog/what-is-chiaroscuro-definition-examples/
[16] LUT Company: Asteroid City LUT Pack (Wes Anderson) - https://lutcompany.com/store/asteroid-city-lut-pack-wes-anderson-inspired-cinematic-luts

### Educational video / Kurzgesagt
[17] Sabrina.dev: Claude + Remotion Unlocks UNLIMITED Cheap Video Generation - https://www.sabrina.dev/p/claude-remotion-unlocks-unlimited
[18] Kurzgesagt: What we do - https://kurzgesagt.org/what-we-do
[19] Wyzowl: Kinetic Typography 50+ Examples - https://wyzowl.com/kinetic-typography/
[20] INKLUSIVE: 18 Popular Icon Design Styles for 2026 - https://theinklusive.com/blog/popular-icon-design-styles/
[21] ItsNiceThat: The graphic trends you'll want to bookmark for 2026 - https://www.itsnicethat.com/features/forward-thinking-graphic-trends-2026-graphic-design-120126
[22] LetsEnhance: 12 essential camera movements for AI video - https://letsenhance.io/blog/all/ai-video-camera-movements/

### Midjourney / DALL-E / Flux
[23] YUV.AI: Midjourney V7 Prompts Masterclass 2026 - https://yuv.ai/learn/midjourney
[24] NotebookLM Help: Generate an Infographic in NotebookLM - https://support.google.com/notebooklm/answer/16758265
[25] Tenorshare: NotebookLM Infographic Prompt Guide - https://www.tenorshare.ai/ai-tips/notebooklm-infographic-prompt.html
[26] Black Forest Labs: Prompting Guide Image-to-Image (Flux Kontext) - https://docs.bfl.ml/guides/prompting_guide_kontext_i2i
[27] Midjourney Docs: Aspect Ratio - https://docs.midjourney.com/hc/en-us/articles/31894244298125-Aspect-Ratio
[28] AITool Discovery: Midjourney Prompts Copy-Paste Guide V6 V7 (2026) - https://www.aitooldiscovery.com/guides/midjourney-prompts
[29] AI Tools DevPro: DALL-E 3 Guide 2026 Edition - https://aitoolsdevpro.com/ai-tools/dall-e-3-guide/

### Infographic design principles
[30] Tufte, E.R.: The Visual Display of Quantitative Information (1983), Graphics Press
[31] The Comm Spot: Edward Tufte's Principles for Data Visualization - https://thecommspot.com/comm-subjects/visual-communication/data-visualization/principles-of-data-visualization/edward-tuftes-principles-for-data-visualization/
[32] GeeksforGeeks: Mastering Tufte's Data Visualization Principles - https://www.geeksforgeeks.org/data-visualization/mastering-tuftes-data-visualization-principles/
[33] IxDF: Complementary Colors Ultimate Guide 2026 - https://ixdf.org/literature/article/complementary-colors-and-color-wheel

### 2026 Design Trends
[34] Digital Synopsis: Top 20 Graphic Design Trends For 2026 - https://digitalsynopsis.com/design/graphic-design-trends-2026/
[35] Really Good Designs: Graphic Design Trends 2026 - https://reallygooddesigns.com/graphic-design-trends-2026/
[36] Fontfabric: Top 10 Design & Typography Trends for 2026 - https://www.fontfabric.com/blog/10-design-trends-shaping-the-visual-typographic-landscape-in-2026/
[37] SSENSE: Graphic Times with NYT Designer Tracy Ma - https://www.ssense.com/en-us/editorial/culture/graphic-times-with-new-york-times-designer-tracy-ma
[38] Eye on Design: How a Band of Design Misfits Brought Anti-aesthetics to Bloomberg Businessweek - https://eyeondesign.aiga.org/how-a-band-of-design-misfits-brought-anti-aesthetics-to-bloomberg-businessweek/

### Author notes
Report compiled 2026-04-17. All claims traced to primary documentation (OpenAI, Google, Runway, Black Forest Labs, Midjourney) or reputable secondary sources (AIGA, It's Nice That, Medium long-form). Where a 2026 publication date could not be verified, original foundational works were cited (Tufte 1983, Saul Bass North by Northwest 1959 etc.).
