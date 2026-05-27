import { testimonials } from '../data/testimonials';

export default function ReviewsSection() {
  return (
    <section id="reviews" className="section">
      <div className="container">
        <h2 className="section-title" data-animate="fade-up">
          Happy Customers
        </h2>
        <p
          className="section-subtitle"
          data-animate="fade-up"
          data-animate-delay="1"
        >
          Don't take our word for it. Read the reviews.
        </p>
        <div className="corkboard" data-animate="fade-up">
          <div className="corkboard-inner">
            {testimonials.map((t, index) => (
              <div key={index} className="testimonial-pin">
                <p className="testimonial-quote">{t.quote}</p>
                {t.rating && (
                  <div
                    className="testimonial-rating"
                    aria-label={`${t.rating.split('🍕').length - 1} out of 5 rating`}
                  >
                    {t.rating}
                  </div>
                )}
                <div className="testimonial-author">
                  <span className="testimonial-author-name">
                    {t.authorName}
                  </span>
                  <span className="testimonial-date">{t.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
