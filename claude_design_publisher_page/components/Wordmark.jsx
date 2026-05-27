/* Wordmark.jsx — the brand mark.
   Three variants: bracket (production default), umlaut, cursor. */

const Wordmark = ({ accent = "bracket", size = 30 }) => {
  const sizeStyle = { fontSize: `${size}px`, "--wm-size": `${size}px` };
  if (accent === "umlaut") {
    return (
      <span className="wordmark wordmark-umlaut" style={sizeStyle}>
        <span className="wm-u-wrap">u<span className="wm-umlaut" aria-hidden="true"><i /><i /></span></span>be
      </span>
    );
  }
  if (accent === "cursor") {
    return (
      <span className="wordmark wordmark-cursor" style={sizeStyle}>
        <span className="wm-word">ube</span>
        <span className="wm-cursor" aria-hidden="true" />
      </span>
    );
  }
  return (
    <span className="wordmark wordmark-bracket" style={sizeStyle}>
      <span className="wm-bracket wm-bracket-l" aria-hidden="true" />
      <span className="wm-word">ube</span>
      <span className="wm-bracket wm-bracket-r" aria-hidden="true" />
    </span>
  );
};

window.Wordmark = Wordmark;
