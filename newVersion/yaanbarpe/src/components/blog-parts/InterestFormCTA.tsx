import React from 'react';
import ReactGA from 'react-ga4';



const GOOGLE_FORM_LINK = "https://docs.google.com/forms/d/e/1FAIpQLScQQHmsWq1TLg0ccUu8FggRR1qZh6y0Ep7Iwdk-WadZWGa3dw/viewform"; // Replace this

const InterestFormCTA = () => {
  return (
    <section className="bg-muted py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-tulu-blue mb-4">
          Help Us Craft Tulu Nadu Experiences
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground mb-8">
          We're building something unique — curated cultural journeys through the heart of Tulu Nadu. 
          While our travel experiences are still being shaped, we’d love your input.
          Tell us what excites you — temples, traditions, food, or folklore — and you could be part of the first to experience it.
        </p>
        <a
          href={GOOGLE_FORM_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-tulu-red hover:bg-tulu-blue text-white text-lg font-semibold px-8 py-4 rounded-md transition-colors"
        
        >
  Join Survey
        </a>
      </div>
    </section>
  );
};

export default InterestFormCTA;