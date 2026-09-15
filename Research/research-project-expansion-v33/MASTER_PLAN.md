# MASTER_PLAN - research-project-expansion-v33

## Faza RESEARCH - 7 pytan badawczych (lokalny skan, nie web)

**R1 - Inwentaryzacja projektow.** Przeskanuj `C:/Projekty Claude Code/` (wszystkie foldery obok Agent_Architecture).
Dla kazdego projektu: nazwa, cel/opis (z README/CLAUDE.md jesli jest), stack technologiczny, status (aktywny/porzucony -
po dacie ostatniej modyfikacji), typ zadania (webapp, skrypt, research, config, inne). Efekt: tabela projektow +
wnioski o powtarzajacych sie wzorcach pracy uzytkownika.

**R2 - Inwentaryzacja 35 agentow (skills).** Przeczytaj wszystkie `~/.claude/skills/*.md`. Dla kazdego: nazwa, domena/kategoria,
model routing, 1-zdaniowy opis roli. Pogrupuj w klastry tematyczne. Wskaz potencjalne duplikaty/nakladajace sie kompetencje.

**R3 - Inwentaryzacja 42 presetow (commands).** Przeczytaj wszystkie `~/.claude/commands/*.md`. Dla kazdego: nazwa, liczba agentow,
wzorzec (fan-out/hierarchia/petla), do jakiego typu zadania sluzy. Pogrupuj tematycznie, wskaz nakladanie sie presetow.

**R4 - Routing i katalog.** Przeanalizuj `~/.claude/PRESET_CATALOG.md` i `~/.claude/CLAUDE.md` (sekcja Agent Architecture).
Jak dziala auto-dobor presetu, jakie sa keywords per preset, czy sa oczywiste luki w keywordach (typy zadan bez pokrycia).

**R5 - Faktyczne uzycie (memory + historia sesji).** Przeszukaj `~/.claude/projects/*/memory/*.md` (auto-memory, szczegolnie
MEMORY.md indexy z innych projektow jesli dostepne) oraz katalogi projektow pod katem wzmianek o uzytych presetach/agentach
(np. project_*.md pliki opisujace shipped work). Zbuduj liste: ktore presety/agenty maja udokumentowane realne uzycie,
do jakich zadan, jak czesto. Zaznacz brak danych tam gdzie nie da sie ustalic.

**R6 - Istniejacy research w repo (reuse, NIE duplikowac).** Przeczytaj `Agent_Architecture/Research/*/SYNTHESIS.md` lub
rownowazne pliki syntezy z 8 istniejacych kampanii (research-preset-routing, research-context-engineering,
research-hooks-best-practices, research-mcp-servers, research-prompt-caching, research-settings-permissions,
research-skills-architecture, research-subagents-task-tool) + `docs/SKILLS_ARCHITECTURE.md` + `docs/ROUTING_SYSTEM.md` +
`VERSIONS.md`. Streszczenie: co juz ustalono o architekturze skills/presetow, jakie rekomendacje juz padly a nie zostaly
wdrozone.

**R7 - Cross-reference: luki i martwe elementy.** Na podstawie R1 (co user faktycznie robi) vs R2+R3 (co system oferuje)
vs R5 (co jest realnie uzywane): zidentyfikuj (a) typy zadan z R1 bez dedykowanego agenta/presetu, (b) agentow/presety
bez zadnego sladu uzycia w R5, (c) konkretne kandydatury do dodania/zmiany/usuniecia z uzasadnieniem opartym na dowodach.

## Target output
SYNTHESIS.md: 8-10k slow, 5-7 Parts (Executive Summary, Profil pracy uzytkownika, Stan agentow, Stan presetow,
Routing i luki, Rekomendacje z priorytetyzacja, Appendix - zrodla).
