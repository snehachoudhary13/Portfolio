import type { CSSProperties } from 'react';

const ORBIT_SLIDES = [
  {
    title: 'CybeRECON',
    kicker: 'Threat Intel',
    src: '/cyberecon_preview.png',
    fit: 'cover',
  },
  {
    title: 'Email Header Tool',
    kicker: 'Forensics',
    src: '/email_header_preview.png',
    fit: 'cover',
  },
  {
    title: 'Infosys Springboard',
    kicker: 'Certification',
    src: '/infosys_cert.png',
    fit: 'contain',
  },
  {
    title: 'HackWithVertos',
    kicker: 'Participation',
    src: '/hackathon_cert.png',
    fit: 'contain',
  },
  {
    title: 'Mail Forensics UI',
    kicker: 'Interface',
    src: '/email_forensics.png',
    fit: 'cover',
  },
];

export const ImageOrbitSlider = () => {
  return (
    <div className="hero-orbit-shell">
      <div className="hero-orbit-grid" />
      <div className="hero-orbit-scan" />

      <div className="hero-orbit-copy">
        <p className="hero-orbit-kicker">3D Asset Slider</p>
        <h3 className="hero-orbit-title">Projects and certifications in orbit</h3>
        <p className="hero-orbit-text">
          A rotating carousel built from your live portfolio assets. Hover to pause and inspect each frame.
        </p>
      </div>

      <div
        className="hero-orbit-slider"
        style={{ '--quantity': ORBIT_SLIDES.length } as CSSProperties}
      >
        {ORBIT_SLIDES.map((slide, index) => (
          <div
            key={slide.title}
            className="hero-orbit-item"
            style={{ '--position': index + 1 } as CSSProperties}
          >
            <article className="hero-orbit-card">
              <img
                src={slide.src}
                alt={slide.title}
                loading="lazy"
                className={`hero-orbit-image ${
                  slide.fit === 'contain' ? 'hero-orbit-image--contain' : ''
                }`}
              />
              <div className="hero-orbit-overlay" />
              <div className="hero-orbit-meta">
                <span>{slide.kicker}</span>
                <strong>{slide.title}</strong>
              </div>
            </article>
          </div>
        ))}
      </div>

      <div className="hero-orbit-base" />

      <div className="hero-orbit-footer">
        <span className="hero-orbit-dot" />
        Auto-rotating showcase
      </div>
    </div>
  );
};
