# NotebookLM Ready Video - Context Engineering

## SEKCJA 1: Video - Opis niestandardowego stylu wizualnego

Dark-first Anthropic, tlo #141413, tekst #faf9f5, jeden cieply akcent #d97757 dla CTA i alertow, mono-blue #6a9bcc dla liczb i metryk. Typografia: Poppins heading, Lora body, JetBrains Mono dla wszystkich liczb, tokenow, kodu i nazw plikow. Layout: Bento 2.0, 5-8 kafelkow, corner radius 16-20px, dense ale bez overload. Pacing Fireship: ciecia co 2-3s, split screen terminal vs `/context` output, code-on-screen z syntax highlight, kinetic typography przy liczbach-hero. B-roll co 2-3s, zero dead air. Burned-in polskie captions, master 16:9 Explainer + auto-crop 9:16 Brief. Deadpan humor, zero hype, zero Ghibli.

## SEKCJA 2: Video - Na czym powinni sie skupiac prezenterzy AI

Cold open 0-3s: czarny ekran, pojawia sie jedna liczba monospace `652 069` w orange, voiceover "Tyle tokenow mozesz stracic jedna komenda. Bez jednego prompta." - wizual + audio + tekst uderzaja rownoczesnie.

Potem backtrack "jak to zrobilismy" i 4 kluczowe insighty z efektownymi liczbami, kazdy 15-20s retention checkpoint:

1. **Context rot nie jest na 100%, tylko na 20-40%.** Nominalny auto-compact to 95%, efektywny **83.5%** - ale jakosc modelu zaczyna sie sypac juz od 20-40% fillu. Czterdziestotrzypunktowe okno degradacji ktorego nikt nie widzi.
2. **CLAUDE.md to illuzja kontekstu.** Tylko **7.4%** zawartosci jest relewantne per sesja. 10K-tokenowy plik = 5K tokenow zmarnowanych **kazdej tury**. Target community: <500 tokenow global, <200 linii project.
3. **Skill vs Command to 800x roznicy.** Skill w pluginie laduje pelne body od startu (3900-5500 tokenow), skill standalone z frontmatter tylko 61-100 tokenow dopoki nie invoked. Command files: **0 tokenow baseline, 2-3 tokeny cached po pierwszym wywolaniu.**
4. **--resume jest live-threat.** Issue #41930, ponad 300 komentarzy, drenuje **652 069 phantom tokenow** bez user prompts. Jeden "morning resume" = 15% Max 5x limitu.

Payoff 60-75s: session per task doctrine - **$2.87 -> $0.94** empiric savings. "Nowy topik = nowy chat. Bez wyjatkow."

Unikac: korporacyjnego tonu, "revolutionary AI", hype slow. Zadnych generic stock motion graphics, zadnego Ghibli/Kawaii - senior devowie rozpoznaja After Effects template w sekunde. Liczby zawsze w JetBrains Mono, nigdy w Poppins. CTA konkretne - URL do repo, nie "sprawdz kanal".
