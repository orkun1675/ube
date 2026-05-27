/* TopNav.jsx (publisher) — Publisher tab is active, Maintainer links
   to the maintainer page. */

const PublisherTopNav = ({ wordmarkAccent = "bracket", onRequestAccess }) => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`topnav ${scrolled ? "scrolled" : ""}`}>
      <div className="container topnav-inner">
        <a href="#top" className="wordmark-link" style={{ textDecoration: "none" }}>
          <Wordmark accent={wordmarkAccent} size={30} />
        </a>
        <div className="nav-center">
          <a href="#top" className="nav-link active">Publisher</a>
          <a href="Ube Maintainer.html" className="nav-link">Maintainer</a>
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
  );
};

window.PublisherTopNav = PublisherTopNav;
