import Link from "next/link";

const siteLogoUrl =
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698d55d552c9526c6c263eb3.png";

export const metadata = {
  title: "AE Moments Print Design Templates",
  robots: {
    index: false,
    follow: false
  }
};

export default function PrintDesignPage() {
  return (
    <main className="page-shell printdesign-page">
      <header className="top-nav printdesign-nav">
        <Link className="brand" href="/" aria-label="Go to AE Moments homepage">
          <img className="brand-logo" src={siteLogoUrl} alt="AE Moments" />
        </Link>
        <nav className="nav-center" aria-label="Primary">
          <Link href="/">Home</Link>
          <a href="/#studiobooth">Open Air Booth</a>
          <a href="/#packages">Packages</a>
          <Link href="/quote">Quote</Link>
        </nav>
        <Link className="nav-cta" href="/">
          <span>Back Home</span>
          <span className="nav-cta-arrow" aria-hidden="true">
            ←
          </span>
        </Link>
      </header>

      <section className="section printdesign-section">
        <div className="container printdesign-intro">
          <p className="section-pill printdesign-pill">
            <span aria-hidden="true">✱</span>
            <span>Print Design</span>
          </p>
          <h1>Choose your print template style</h1>
          <p className="section-lead">
            Browse and select your preferred print layout first, then we&apos;ll
            finalise your event details and custom branding in your quote.
          </p>
          <div className="printdesign-actions">
            <Link href="/quote" className="button solid">
              <span>Continue to Quote Form</span>
              <span className="button-arrow">→</span>
            </Link>
            <Link href="/" className="button outline">
              Back to Home
            </Link>
          </div>
        </div>

        <div className="container printdesign-frame-wrap">
          <article className="card printdesign-frame">
            <iframe
              title="AE Moments Print Design Templates"
              src="https://templatesbooth.com/widget-embed/?key=OTU3"
              scrolling="yes"
              width="100%"
              height="2200"
              frameBorder="0"
              loading="lazy"
              className="printdesign-iframe"
            />
          </article>
        </div>
      </section>
    </main>
  );
}
