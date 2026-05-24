// Wordmark (React) — sibling of `Wordmark.astro`. Used by React islands
// that need to render the brand mark on the client (currently just Nav,
// for the mobile-menu portal). The Astro version is preferred wherever the
// caller is itself `.astro`; this React variant exists because `.tsx`
// callers cannot import `.astro` components.
//
// Both files emit the same DOM so the CSS in `styles.css` matches either
// rendering path. Once slice 0005 converts Nav to `.astro`, this file can
// be deleted in favor of the single Astro component.
import type { WordmarkAccent } from "../data/tweak-defaults"

type WordmarkProps = {
  accent: WordmarkAccent
  size?: number
}

export const Wordmark = ({ accent, size = 30 }: WordmarkProps) => {
  const style = { fontSize: size }
  if (accent === "umlaut") {
    return (
      <span className="wordmark wordmark-umlaut" style={style}>
        <span className="wm-u-wrap">
          u
          <span className="wm-umlaut" aria-hidden="true">
            <i />
            <i />
          </span>
        </span>
        be
      </span>
    )
  }
  if (accent === "cursor") {
    return (
      <span className="wordmark wordmark-cursor" style={style}>
        <span className="wm-word">ube</span>
        <span className="wm-cursor" aria-hidden="true" />
      </span>
    )
  }
  return (
    <span className="wordmark wordmark-bracket" style={style}>
      <span className="wm-bracket wm-bracket-l" aria-hidden="true" />
      <span className="wm-word">ube</span>
      <span className="wm-bracket wm-bracket-r" aria-hidden="true" />
    </span>
  )
}
