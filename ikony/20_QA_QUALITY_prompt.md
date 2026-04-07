# QA Quality — Prompt do generowania ikony

## Agent: QA Quality
**Rola**: Audytor jakosci. Sprawdza zgodnosc z wymaganiami, identyfikuje brakujace testy, edge cases, code smells. Pokrycie testami, N+1 queries.
**Kolor**: #34D399 — szmaragdowy/emerald green
**Model**: Claude Opus 4.6

---

## PROMPT

```
Create a premium cosmic icon for "The Quality Auditor" — a code quality guardian in a multi-agent AI system.

CONCEPT: A cosmic verification seal — a circular certification mark floating in space, containing a checkmark that says "APPROVED." This agent is the scientific peer reviewer — methodical, thorough, checking every claim against evidence. The checkmark isn't given freely; it's EARNED through rigorous inspection.

VISUAL DESCRIPTION:
- Central element: A large circle — the inspection lens / certification boundary. Clean, precise, perfectly round. This circle represents the scope of quality review: everything inside it has been examined.
- Verification mark: Inside the circle, a bold checkmark (polyline) — the classic ✓ shape, slightly off-center toward the bottom-right for visual weight. The checkmark stroke is slightly thicker (2px) than the circle — it's the VERDICT, the most important element.
- The checkmark has a decisive angle — short stroke going down-right, then a longer stroke going up-right. Not timid. A CONFIDENT approval.
- Quality metrics: Outside the circle, at the 10 o'clock position, a tiny number or small horizontal line — suggesting a quality score (like "8.5/10"). Barely visible at small sizes but adds depth on zoom.
- Scan sweep: A very subtle arc segment outside the circle at the 4 o'clock position — like the circle was "scanned" and this is the sweep trail. The review is systematic, not random.

STYLE:
- Galactic aesthetic — cosmic certification seal, orbital inspection mark
- Emerald palette: primary #34D399, deep #059669, light #6EE7B7, accent #D1FAE5
- AUTHORITATIVE, clean, DEFINITIVE — this icon says "I checked everything"
- NOTE: Same color as Backend Dev — MUST be visually distinct: Backend = stacked rectangles, Quality = circle with checkmark
- Circular composition vs Backend's rectangular composition — unmistakable difference

MOOD: Thorough validation, earned approval — "Test coverage: 87%. Edge cases: covered. Code smells: 0. APPROVED."

TECHNICAL: SVG viewBox="0 0 24 24", stroke-width 1.5-2, currentColor, transparent bg.
```
