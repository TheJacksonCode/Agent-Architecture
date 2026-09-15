# 00 FUNDAMENTALS - Prompt Caching w Claude w 15 minut

**Cel:** przeczytaj ten dokument jezeli slyszysz "prompt caching" pierwszy raz lub chcesz odswiezyc fundamenty. Po przeczytaniu rozumiesz: co to jest, jak to dziala mechanicznie, jakie sa 4 kluczowe pola API do monitorowania, i co moze pojsc nie tak.

**Czas czytania:** 12-15 minut. **Poziom:** developer znajacy REST API + podstawy LLM.

## 1. Co to jest prompt caching

Prompt caching to mechanizm Anthropic API ktory pozwala **zapisac statyczny prefiks requesta** (system prompt, tools, historia konwersacji) w cache po stronie Anthropic i **placic 10x mniej** za jego ponowne odczytanie w kolejnych requestach.

**Proste wyjasnienie na przykladzie:**

Bez cache, kazdy request o te same 50,000 tokenow context placisz full rate. 100 requestow = 100x ten sam koszt.

Z cache, **pierwszy request placi 1.25x** (bo zapisuje do cache), **nastepne 99 placa 0.1x** (bo czytaja z cache). Po paru requestach wyraznie wygrywasz. Na duzych liczbach (case Du'An Lightfoot, 100 req/day, 81k tokens prefix) **90% redukcja kosztow, $720/m -> $72/m**.

## 2. Trzy wymiary: cena, czas zycia, jawnosc

Cache u Anthropic charakteryzuje sie trzema wymiarami:

**CENA (multipliers):**
- Write 5m TTL: 1.25x base input price
- Write 1h TTL: 2x base input price  
- Read (hit): 0.1x base input price (90% oszczednosc)

**CZAS ZYCIA (TTL):**
- 5 minut (default)
- 1 godzina (extended, `"ttl": "1h"`)
- TTL resetuje sie przy kazdym cache hit - aktywna sesja z requestami co 2 min moze trzymac 5m cache **godzinami** za darmo

**JAWNOSC:**
- Anthropic uzywa **explicite** cache_control (inaczej niz OpenAI automatic)
- Musisz sam oznaczyc gdzie konczy sie cacheable prefix
- Kontrola w zamian za 90% savings (vs OpenAI 50% zero-config)

## 3. Skladnia cache_control

Kazdy block content w systemie moze miec `cache_control` znacznik. Syntax:

```json
{
  "type": "text",
  "text": "Your large static content...",
  "cache_control": {
    "type": "ephemeral",
    "ttl": "5m"
  }
}
```

- `type` - zawsze "ephemeral" (brak permanent options)
- `ttl` - opcjonalne, "5m" (default) lub "1h"

Maksimum **4 explicit breakpointy per request**. Dodatkowo 1 automatic jezeli uzywasz top-level `cache_control`.

## 4. Hierarchia cacheowania: tools -> system -> messages

Cache jest budowany liniowo od poczatku requesta:

```
[tools array]    <- najbardziej static
[system array]   <- semi-static (rules, examples, RAG docs)
[messages array] <- dynamic (history, current query)
```

**Kluczowa zasada:** zmiana w wyzszej warstwie kasuje cache dla niej i wszystkich ponizszych. Przyklady:

- Dodanie tool (nawet jednego) -> kasuje tools + system + messages
- Zmiana system prompt -> kasuje system + messages (tools pozostaje)
- Dodanie wiadomosci na koncu messages -> CACHE ZACHOWANY, nowa wiadomosc po breakpoincie (regular rate)

**To jest fundament wszystkich patternow ktore omowisz w 01_PATTERNS.**

## 5. Minimum token thresholds - WAZNE

Kazdy model ma minimum tokens dla cache do zadzialania:

| Model | Minimum |
|-------|---------|
| Opus 4.7, Haiku 4.5 | **4096 tokens** |
| Sonnet 4.6 | **2048 tokens** |
| Sonnet 4.5/4, Haiku 3.5/3 | 1024 tokens |

**Kluczowe ostrzezenie:** ponizej progu cache "fails silently" - API NIE zwraca bledu. Response przychodzi normalnie, ale `usage.cache_creation_input_tokens = 0`. Deweloperzy bez tej wiedzy moga tygodniami placic regular rate myslac ze cache dziala.

**Remediacja:** po pierwszym requescie sprawdz `response.usage.cache_creation_input_tokens > 0`.

## 6. Response.usage - 4 pola ktore musisz znac

Kazda odpowiedz Anthropic API zwraca `usage`:

```json
"usage": {
  "input_tokens": 50,
  "cache_read_input_tokens": 100000,
  "cache_creation_input_tokens": 248,
  "output_tokens": 503,
  "cache_creation": {
    "ephemeral_5m_input_tokens": 148,
    "ephemeral_1h_input_tokens": 100
  }
}
```

**Semantyka:**
- `input_tokens` - po breakpoincie, regular rate
- `cache_read_input_tokens` - z cache, 0.1x = 90% taniej
- `cache_creation_input_tokens` - nowo zapisane, 1.25x lub 2x
- `cache_creation.ephemeral_5m_input_tokens` - ile z write na 5m slot
- `cache_creation.ephemeral_1h_input_tokens` - ile na 1h slot

**Total input formula:**
```
total_input = input_tokens + cache_read_input_tokens + cache_creation_input_tokens
```

## 7. Break-even math - kiedy cache sie oplaca

**5m TTL break-even:**
- Write cost = 1.25x = 2500 extra tokens za 10000
- Savings per read = 10000 * 0.9 = 9000 saved tokens
- 2500 < 9000 -> **break-even po 1 hit**

**1h TTL break-even:**
- Write cost = 2x = 10000 extra tokens
- 2 hits * 9000 saved = 18000 > 10000 extra
- **Break-even po 2 hitach**

**Regula praktyczna:**
- 5m: uzyj ZAWSZE jezeli oczekujesz >=2 requestow w 5 min
- 1h: uzyj jezeli oczekujesz >=3 requestow w godzinie

## 8. Kluczowe warnings

**Warning 1 - timestamp w system prompt = anti-pattern #1**

To klasyka:
```python
system=f"You are assistant. Today is {datetime.now()}. Rules..."
# Kazdy request ma inny timestamp = invalidation co request
```

Zamiast:
```python
system=[{"type": "text", "text": "Rules...", "cache_control": {"type": "ephemeral"}}]
messages=[{"role": "user", "content": f"[timestamp: {now()}] My question..."}]
```

**Warning 2 - cache zawodzi "silently"**

Brak erroru nie znaczy ze cache dziala. Zawsze weryfikuj `cache_creation_input_tokens > 0` w pierwszym requescie.

**Warning 3 - model switch = full rebuild**

Opus -> Sonnet = 0% hit. Kazdy patch version tez (Opus 4.5 -> 4.6).

**Warning 4 - capitalization drift**

Zmiana 2 liter w static bloku kasuje 2727-token cache. Fredze static content, nie generuj dynamicznie.

**Warning 5 - od 5 lutego 2026 workspace isolation**

Cache jest isolowany **per workspace**, nie per organization. Multi-team shared prefix wymaga jednego workspace.

## 9. Cena bazowa (kwiecien 2026)

Pricing per milion tokenow:

| Model | Base input | 5m write | 1h write | Cache read |
|-------|-----------|----------|----------|-------------|
| Opus 4.7/4.6/4.5 | $5 | $6.25 | $10 | $0.50 |
| Sonnet 4.6 | $3 | $3.75 | $6 | $0.30 |
| Haiku 4.5 | $1 | $1.25 | $2 | $0.10 |

**Output tokens NIE sa cache'owane** - placisz zawsze full rate. Optymalizuj input (gdzie cache pomaga), minimuj output length.

## 10. Czego nie dotyka cache

Cache NIE pomaga w tych sytuacjach:
1. **Single-shot request** - 1 write at 1.25x, 0 reads = 25% ekstra za nic
2. **Unique requests** - kazdy user pyta inaczej, brak shared prefix
3. **Output-heavy generation** - 10k output to dominant cost, input cache nieistotny
4. **Rapidly evolving prompts** - A/B testing system prompts co deploy
5. **Gap miedzy requestami > TTL** - cache wygasa przed kolejnym hit

## 11. Gdzie dalej

**Jezeli chcesz patterny (jak strukturyzowac prompty):** przejdz do `01_PATTERNS.md`.

**Jezeli chcesz konkretna decyzje (czy uzywac cache w moim przypadku):** `02_DECISION_GUIDE.md`.

**Jezeli chcesz material do prezentacji/social:** `03_MEDIA_PROMPTS.md`.

**Jezeli chcesz deep dive z citations:** `plans/SYNTHESIS.md` (11k slow, 136 claimow).

**Jezeli chcesz raw research:** `research/R1..R7_*.md` (14k slow raw).

## 12. Pie ciasta: co zapamietac

Gdyby ten dokument zostawil tylko 5 faktow:

1. **Cache daje 90% savings na read ale wymaga 1.25x ekstra na write** (break-even po 1 hit dla 5m)
2. **Hierarchia tools -> system -> messages**: zmiana gory kasuje dol
3. **Minimum 4096 tokens dla Opus 4.7/Haiku 4.5, 2048 dla Sonnet 4.6** (ponizej fails silently)
4. **Response.usage ma 4 pola cache** - musisz je logowac per request
5. **Timestamp w system = anti-pattern #1** (uzyj system-reminder w messages)

---

**Nastepny krok:** `01_PATTERNS.md` - 7 design patternow + 10 anti-patternow + decision tree.
