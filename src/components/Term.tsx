// React counterpart of Term.astro — identical markup so the global delegated
// handler in src/layouts/terms.client.ts drives both. Use this inside React
// islands (e.g. the maintainer mockups/modals); use Term.astro in `.astro`
// files. See src/data/glossary.ts for the treatment rules and Term.astro for
// how the native Popover API supplies the open/close behaviour.
import { useId } from "react"
import { type GlossaryKey, glossary } from "@/data/glossary"

interface TermProps {
  /** Key into the glossary registry. */
  term: GlossaryKey
  /** Visible text override, e.g. "PRs" or "LTV/30". Defaults to the term. */
  label?: string
}

export function Term({ term, label }: TermProps) {
  const entry = glossary[term]
  const popId = useId()
  return (
    <span className="gloss">
      <button
        type="button"
        className="gloss-term"
        popoverTarget={popId}
        aria-describedby={popId}
        aria-expanded="false"
      >
        {label ?? entry.term}
      </button>
      <span
        id={popId}
        popover="auto"
        className="gloss-pop"
        role="tooltip"
        data-placement="bottom"
      >
        {entry.gloss}
        <span className="gloss-caret" aria-hidden="true" />
      </span>
    </span>
  )
}
