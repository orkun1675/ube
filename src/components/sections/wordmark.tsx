// =====================================================================
//  Wordmark
// =====================================================================
type WordmarkProps = {
  accent?: string
  size?: number
}

export const Wordmark = ({ accent = "cursor", size = 22 }: WordmarkProps) => {
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
  if (accent === "bracket") {
    return (
      <span className="wordmark wordmark-bracket" style={style}>
        <span className="wm-bracket wm-bracket-l" aria-hidden="true" />
        <span className="wm-word">ube</span>
        <span className="wm-bracket wm-bracket-r" aria-hidden="true" />
      </span>
    )
  }
  // legacy fallthrough — preserved so old saved values still render
  return (
    <span className={`wordmark wordmark-${accent}`} style={style}>
      {accent === "fill" ? (
        <>
          <span className="wm-u">u</span>be
        </>
      ) : (
        <>ube</>
      )}
    </span>
  )
}
