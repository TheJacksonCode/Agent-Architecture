# R1 - API Spec + Cache Control (Prompt Caching Claude API 2026)

**Researcher:** Docs (oficjalne Anthropic documentation, API reference)
**Data raportu:** 2026-04-17
**Zakres:** cache_control parameter, ephemeral type, breakpoint semantics, minimum tokens, supported content types, response fields, automatic vs explicit caching.

## Summary

Prompt caching w Claude API to mechanizm ponownego uzycia prefiksu prompta miedzy kolejnymi requestami, oparty na jawnym parametrze `cache_control` ze stalym typem `ephemeral` (inne typy nie istnieja na dzien 2026-04). Kazdy request moze miec **maksymalnie 4 breakpointy** ustawione jawnie plus opcjonalny automatyczny breakpoint top-level, ktory samoczynnie przesuwa sie w miare narastania konwersacji. Cache dziala WYLACZNIE jako prefiks, czyli od poczatku requestu do bloku oznaczonego `cache_control` wlacznie; wszystko po breakpoincie jest niecachowalne w obrebie tego samego bloku. Hierarchia przetwarzania jest sztywna: `tools -> system -> messages` i zmiana w dowolnej warstwie uniewaznia te warstwe i wszystkie ponizej.

Minimum token requirement zalezy od modelu i jest krytyczne - ponizej progu cache nie zadziala i zostanie zignorowany (fail silent, tylko response.usage pokaze `cache_creation_input_tokens: 0`). Dla **Sonnet 4.6** minimum to 2048 tokenow, dla **Opus 4.7** i **Haiku 4.5** to 4096 tokenow, dla starszych Sonnet/Opus 4.x - 1024 tokeny.

Responsowe pole usage niesie pelne rozbicie: `input_tokens` (tokeny po breakpoincie), `cache_creation_input_tokens` (nowo zapisane), `cache_read_input_tokens` (hit cache), plus breakdown w `cache_creation` na `ephemeral_5m_input_tokens` i `ephemeral_1h_input_tokens`. Pelna suma input = `cache_read + cache_creation + input_tokens`.

## Details

### 1. Skladnia cache_control

Parametr `cache_control` jest obiektem z polem `type` (zawsze `"ephemeral"`) i opcjonalnie `ttl` (domyslnie 5 minut, alternatywnie `"1h"` dla 1 godziny).

```python
# Minimum
"cache_control": {"type": "ephemeral"}

# Z 1h TTL
"cache_control": {"type": "ephemeral", "ttl": "1h"}
```

Mozna go umiescic na trzy sposoby:

**1a. Automatic (top-level):**
```python
client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    cache_control={"type": "ephemeral"},
    system="You are an AI assistant...",
    messages=[...]
)
```
System sam umiesci breakpoint na ostatnim cacheable bloku i przesuwa go do przodu w kolejnych turach. Zalecane dla multi-turn conversations.

**1b. Explicit na system block:**
```python
system=[
    {
        "type": "text",
        "text": "You are a legal assistant...\n\n[30,000-char contract]",
        "cache_control": {"type": "ephemeral"}
    }
]
```

**1c. Explicit na wybranym message content block:**
```python
messages=[{
    "role": "user",
    "content": [{
        "type": "text",
        "text": "Long static context...",
        "cache_control": {"type": "ephemeral"}
    }]
}]
```

Source: [platform.claude.com/docs/en/build-with-claude/prompt-caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching), confidence 1.0.

### 2. Limit breakpointow i lookback

"A call supports up to 4 cache_control parameters. If more than 4 are specified, only the most recent 4 (from back to front) will be used." Oznacza to, ze jezeli klient zalaczy wiecej niz 4 breakpointy w jednym requestcie, najnowsze 4 (czytane od konca do poczatku) sa zachowane, reszta jest ignorowana silently.

Automatyczny breakpoint zajmuje 1 slot breakpointow. Jezeli w requestcie jest juz 4 explicit breakpointy + automatic, API zwroci 400 error. Trzeba wybrac - albo jawne 4, albo jawne 3 + automatic.

**Lookback window:** dla kazdego breakpointa system sprawdza 20 poprzedzajacych blokow content w poszukiwaniu cache hit. Jezeli nic nie dopasuje, nie ma hit. "Place `cache_control` on the last block whose prefix is identical across requests. The lookback does not find stable content behind the breakpoint; it only finds entries that earlier requests already wrote."

### 3. Minimum tokens per model

Rozbicie per model group (April 2026 snapshot):

| Model Group | Min tokens |
|-------------|-----------|
| Claude Opus 4.7, 4.6, 4.5, Claude Mythos Preview | 4096 |
| Claude Haiku 4.5 | 4096 |
| Claude Sonnet 4.6 | 2048 |
| Claude Sonnet 4.5, 4, 3.7, Opus 4.1, Opus 4 | 1024 |
| Claude Haiku 3.5, 3 | 2048 |

**Krytyczne:** ponizej progu cache "fails silently without error". Aplikacja nie dostaje bledu - po prostu request jest niecachowalny. Programista musi sprawdzic `response.usage.cache_creation_input_tokens` - jezeli 0 przy pierwszym wywolaniu z oczekiwanym cachem, pattern jest zly.

### 4. Hierarchia zawartosci i invalidation

Cache jest budowany w sekwencji:

```
tools  ->  system  ->  messages
```

Zmiana w wyzszej warstwie uniewaznia te warstwe i wszystkie ponizej. Konkretne triggery inwalidacji zdokumentowane przez oficjalne docs:

| Change type | Tools | System | Messages |
|-------------|-------|--------|----------|
| Tool definitions modify | invalidate | invalidate | invalidate |
| Web search toggle | invalidate | keep | keep |
| Citations toggle | invalidate | keep | keep |
| Speed setting | invalidate | keep | keep |
| tool_choice | invalidate | invalidate | keep |
| Images added/removed | invalidate | invalidate | keep |
| Thinking parameters | invalidate | invalidate | keep |

Dodatkowo: zmiana modelu (nawet o patch version) uniewaznia cache calkowicie, bo "caches are per-model. Opus and Haiku have separate caches." Zmiana capitalization nawet w drobnym fragmencie systemu lamie prefix matching: "Changing capitalization of TWO letters broke the entire cache," invalidating 2,727 tokens of stored computation.

### 5. Cacheable content types

Wszystkie ponizsze bloki sa cacheable:
- **Tools array** - pelne definicje narzedzi, w tym description i input_schema
- **System blocks** - tablica stringow lub blokow typu text
- **messages.content blocks** - w userze i assistante
- **tool_use / tool_result blocks** - w obu rolach
- **Images / documents** - tylko w user turns

**Niecacheowalne:**
- Thinking blocks (nie mozna ustawic `cache_control` bezposrednio na nich). JEDNAK thinking blocks w poprzednich assistant turns SA cacheowane jezeli w kolejnym requestcie pojawiaja sie tool_result blocks. Liczone jako input tokens przy odczycie z cache.
- Sub-content blocks (citations)
- Empty text blocks

### 6. Response usage fields

Przykladowa odpowiedz API z prompt cachingiem:

```json
{
  "usage": {
    "input_tokens": 50,
    "cache_read_input_tokens": 100000,
    "cache_creation_input_tokens": 248,
    "output_tokens": 503,
    "cache_creation": {
      "ephemeral_5m_input_tokens": 456,
      "ephemeral_1h_input_tokens": 100
    }
  }
}
```

Interpretacja:
- `input_tokens` to tokeny PO ostatnim breakpoincie (nie biora udzialu w cache). 
- `cache_read_input_tokens` to tokeny pobrane z istniejacego cache (tanie, 0.1x).
- `cache_creation_input_tokens` to tokeny nowo wpisane do cache (drogie, 1.25x lub 2x).
- `cache_creation` rozbija kreacje na dwie polki TTL.

**Wzor total:**
```
total_input = input_tokens + cache_read_input_tokens + cache_creation_input_tokens
```

Jezeli `cache_read_input_tokens` konsekwentnie = 0 w multi-turn konwersacji, caching nie dziala - najczestsza przyczyna to zmiana tools/system lub niska dlugosc prompta ponizej minimum.

### 7. Automatic vs Explicit - trade-offy

**Automatic:**
- Pro: prostota, samoczynnie przesuwa breakpoint do przodu, 1 linia kodu.
- Con: jeden breakpoint - nie rozroznisz zmiany statycznego CLAUDE.md od zmieniajacych sie tool resultow. Wszystko albo nic.

**Explicit:**
- Pro: mozna ustawic dwa breakpointy na roznych granicach (np. jeden po tools, drugi po long context document, trzeci po system message). Kazdy breakpoint cache'uje niezaleznie.
- Con: manualne zarzadzanie. Wymaga zrozumienia hierarchii.

Dodawanie wiekszej liczby breakpointow NIE zwieksza kosztow - platnosc bazuje na tym co faktycznie zostalo cacheowane i odczytane. Breakpointy to tylko kontrola granularnosci.

### 8. Mixing TTLs (5m + 1h w jednym requestcie)

Rzadko stosowane, ale wspierane. Constraint: 1-hour cache entries must appear BEFORE 5-minute entries w requestcie (kolejnosc fizyczna).

Billing calculation dla mixa:
1. Pozycja A: najwiekszy cache hit token count
2. Pozycja B: najwiekszy 1-hour `cache_control` block po A
3. Pozycja C: ostatni `cache_control` block

Oplaty:
- Cache read tokens dla A (0.1x)
- 1-hour write tokens dla (B - A) - czyli delta miedzy A i B (2x)
- 5-minute write tokens dla (C - B) - delta miedzy B i C (1.25x)

### 9. Supported models (April 2026)

Wszystkie aktywne Claude modele wspieraja prompt caching:
- Opus 4.7, 4.6, 4.5, 4.1, 4
- Sonnet 4.6, 4.5, 4, 3.7 (4.5 i 4.6 rekomendowane)
- Haiku 4.5, 3.5, 3
- Claude Mythos Preview

Deprecated modele (Opus 3, Sonnet 3, Haiku 3) technicznie wspieraja, ale Anthropic nie rekomenduje.

### 10. Workspace isolation (2026 update)

"Starting February 5, 2026, prompt caching will use workspace-level isolation instead of organization-level isolation, with caches isolated per workspace to ensure data separation."

To duza zmiana: wczesniej wszyscy w ramach organizacji dzielili cache prefix, teraz per workspace. Oznacza to, ze zespoly w roznych projektach nie wspoldzielaja cache nawet jezeli ich system prompt jest identyczny, ale rowniez daje lepsze separacje bezpieczenstwa.

## Issues / Flags

### Konflikty zrodel
- **Konflikt 1:** Niektore drugorzedne tutoriale (Medium, Dev.to) twierdza ze minimum token requirement = 1024 dla wszystkich modeli. Oficjalne docs jasno mowia, ze Opus 4.7 i Haiku 4.5 wymagaja 4096. Source of truth: [platform.claude.com docs](https://platform.claude.com/docs/en/build-with-claude/prompt-caching), nie blogi.
- **Konflikt 2:** Spring AI blog (2025-10-27) pisze ze "cache is a beta feature". Na 2026-04 caching jest General Availability od konca 2024. Source wymaga odrzucenia jako outdated.
- **Konflikt 3:** LangChain docs mowia ze thinking blocks "nigdy nie beda cached". Oficjalne Anthropic docs: thinking SA cached jezeli sa w poprzednich assistant turns z tool_result blocks. LangChain to uproszczenie.

### Gaps (czego nie znalazlem w docs)
- **Gap 1:** Nie ma wzmianki o tym czy prompt_caching ma tiery dostepu (Free vs Pro vs Enterprise). Nie mozna wykluczyc ze Free tier ma ograniczenia, ale docs milcza.
- **Gap 2:** Brak oficjalnej danych ile sekund wynosi faktyczny p50/p95 TTL dla 5m cache. Docs pisza "5 minutes" ale community (Reddit, GitHub issues) donosi ze TTL resetuje sie przy kazdym hit, co moze wydluzyc efektywny czas zycia.
- **Gap 3:** Brak danych na temat pool size - czy jest limit ile unikalnych prefiksow mozna trzymac jednoczesnie. Budowanie 1000 roznych prefiksow moze miec kary nieudokumentowane.
- **Gap 4:** Workspace isolation (feb 2026) - niejasne czy migracja byla automatyczna czy tez wymagala akcji per klient.

### Warnings
- **Uwaga 1:** Opus 4.7 ma nowy tokenizer "may use up to 35% more tokens for the same fixed text". Oznacza ze Twoje oszczednosci w tokenach vs poprzedni tokenizer moga byc mniejsze.
- **Uwaga 2:** Cache entries sa tworzone asynchronicznie. W burst scenariuszach (parallel requests tuz po pierwszym) drugi request moze jeszcze nie widziec cache pierwszego - trzeba poczekac na response pierwszego.

## Recommendation

1. **Default stack:** uzyj automatic caching dla 90% przypadkow. Top-level `cache_control={"type": "ephemeral"}` daje dobrze z dzialajacym breakpointem na ostatnim statycznym bloku.
2. **Explicit tylko gdy masz 2+ granice zmian:** np. CLAUDE.md rzadko, tool results czesto - 2 breakpointy.
3. **Monitoruj response.usage w produkcji:** loguj `cache_read_input_tokens` i `cache_creation_input_tokens`. Jezeli read = 0 przez 3+ requesty - diagnostyka.
4. **Pilnuj minimum tokens:** Sonnet 2048, Opus/Haiku 4.5 4096. Krotki system prompt nie cachuje sie nawet z `cache_control`.
5. **Nigdy nie dodawaj timestampu do system prompt.** To auto-invalidator.

GO z rekomendacja: API caching jest dojrzale (GA ~1.5 roku), dobrze dokumentowane, z jednoznacznymi kontraktami. Idzie wprowadzic do produkcji bez checkow beta.

## Source links

- [Prompt caching - Claude API Docs (canonical)](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)
- [Anthropic Pricing Docs](https://platform.claude.com/docs/en/about-claude/pricing)
- [Anthropic Cookbook - prompt_caching.ipynb](https://github.com/anthropics/anthropic-cookbook/blob/main/misc/prompt_caching.ipynb)
- [Prompt caching with Claude - blog](https://claude.com/blog/prompt-caching)
