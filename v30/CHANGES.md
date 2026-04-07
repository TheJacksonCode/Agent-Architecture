# v30 — International Edition (PL/EN)

## Zmiany wzgledem v29

### Nowe funkcje
- **Przelacznik jezyka PL/EN** w topbarze (flaga obok theme toggle)
- **Pelne tlumaczenie EN** — wszystkie elementy UI, promptow, encyklopedii
- **localStorage `acV30_lang`** — zapamiętywanie wybranego jezyka
- **Domyslny jezyk: EN** (dla globalnej publicznosci GitHub)

### Przetlumaczone elementy
| Element | Ilosc | Status |
|---------|-------|--------|
| Prompty agentow | 28 | Przetlumaczone |
| Encyklopedia agentow (AGENT_KNOWLEDGE) | 28 | Przetlumaczone |
| Encyklopedia presetow (PRESET_KNOWLEDGE) | 29 | Przetlumaczone |
| Nazwy i opisy agentow | 28 | Przetlumaczone |
| Nazwy i opisy presetow | 29 | Przetlumaczone |
| Speech bubbles (AGENT_SPEECH) | 28 | Przetlumaczone |
| UI (przyciski, tooltips, labels) | ~150 stringow | Przetlumaczone |
| Glossary | 11 terminow | Przetlumaczone |
| HITL gates | 3 bramy | Przetlumaczone |
| Kategorie agentow/presetow | 12 | Przetlumaczone |
| Final Prompt generator | ~15 stringow | Przetlumaczone |
| Hero overlay | 3 stringi | Przetlumaczone |

### Architektura i18n
- Obiekt `I18N` z kluczami `pl` i `en` zawiera wszystkie tlumaczenia
- Funkcja `getLang()` zwraca aktualny jezyk
- Funkcja `switchLang(lang)` przelacza jezyk i przeladowuje UI
- Funkcje renderujace uzywaja getterow: `t(key)`, `getAgentName(id)`, `getPrompt(id)`, itp.
- Istniejace dane PL zachowane jako domyslne, EN dodane jako warstwa

### Szacowany rozmiar
- v29: ~3531 linii
- v30: ~5500-6000 linii (+2000 linii tlumaczen)

### localStorage
- Klucz konfiguracji: `acV30` (zmieniony z acV29)
- Klucz motywu: `acV30_theme`
- Klucz jezyka: `acV30_lang`
