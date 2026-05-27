/* TopNav.jsx — sticky top nav with backdrop blur.
   `Publisher` and `Pricing` are coming-soon (muted, tooltip). */

const TopNav = ({ wordmarkAccent = "bracket", onRequestAccess }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <React.Fragment>
      <nav className={`topnav ${scrolled ? "scrolled" : ""}`}>
        <div className="container topnav-inner">
          <a href="#top" className="wordmark-link" style={{ textDecoration: "none" }}>
            <Wordmark accent={wordmarkAccent} size={30} />
          </a>
          <div className="nav-center">
            <a href="Ube Publisher.html" className="nav-link">Publisher</a>
            <a href="#top" className="nav-link active">Maintainer</a>
            <span className="nav-link coming-soon">
              Pricing<span className="tooltip">Coming soon</span>
            </span>
          </div>
          <div className="nav-right-actions">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => onRequestAccess?.("nav")}
            >
              Request access
            </button>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

window.TopNav = TopNav;
