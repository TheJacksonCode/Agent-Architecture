# MANIFEST - research-project-expansion-v33

## Zadanie
Deep research (analiza, ZERO zmian w kodzie) pod rozwoj danych (agenci + presety) Agent Architecture Designer v32.16,
oparty na faktycznym profilu pracy uzytkownika (Maciej). Cel: raport ktory user zatwierdzi PRZED jakimikolwiek zmianami.

## Decyzje Architektoniczne
- DD01: Adaptacja preset deep-research-v2 z web-research (Reddit/X/GitHub/Forums) na LOCAL filesystem research
  (7 ad-hoc researcherow skanujacych lokalne foldery zamiast internetu) - preset explicit dopuszcza ta zamiane.
- DD02: Brak fazy EXTRACT (Haiku) w tej turze - raporty to inwentaryzacje lokalnych plikow, nie duzy raw corpus
  wymagajacy kompresji; Syntetyk czyta raporty R1-R7 bezposrednio + CRITIC.

## Stack Technologiczny
N/A (research, nie build)

## Known Risks
- Historia sesji Claude Code moze byc trudno dostepna/duza - researcher R5 ma ja przeszukac selektywnie (memory + recent project dirs), nie parsowac calego JSONL.
- Brak internetu wymagany - wszystko lokalne.

## Open Questions
- Czy "master CV2" z oryginalnej wiadomosci to pomylka dyktowania - do wyjasnienia z userem po raporcie jesli cos wyjdzie niejasne.
