import { portfolioItems } from '../data/portfolio';

export default function PortfolioSection() {
  return (
    <section id="chef-specials" className="section">
      <div className="container">
        <h2 className="section-title" data-animate="fade-up">
          Chef's Specials
        </h2>
        <p
          className="section-subtitle"
          data-animate="fade-up"
          data-animate-delay="1"
        >
          Our finest creations. Made with love and late nights.
        </p>
        <div className="polaroid-grid">
          {portfolioItems.map((item, index) => (
            <article
              key={index}
              className="polaroid"
              data-animate="pop-in"
              data-animate-delay={item.animateDelay}
            >
              <div className="polaroid-image">
                <div
                  className="polaroid-image-placeholder"
                  aria-label={item.linkLabel}
                >
                  <img
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    className="logo"
                  />
                </div>
                <div className="polaroid-overlay">
                  <a
                    href={item.link}
                    className="btn btn-neon"
                    aria-label={item.linkLabel}
                  >
                    👀 Taste It
                  </a>
                </div>
              </div>
              <div className="polaroid-caption">
                <h3 className="polaroid-dish-name">{item.dishName}</h3>
                <span className="polaroid-real-name">{item.realName}</span>
                <p className="polaroid-description">{item.description}</p>
                <div className="polaroid-tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="polaroid-meta">
                  <span>{item.duration}</span>
                  <span className="polaroid-flavor">{item.flavor}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
