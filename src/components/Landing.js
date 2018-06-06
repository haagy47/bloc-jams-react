import React from 'react';

const Landing = () => (
  <section className="landing">
    <img className="landing-img" src="https://images.unsplash.com/photo-1525708029787-c1aed4839066?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6a5137e7443c63df2951200a93c4ea84&auto=format&fit=crop&w=2250&q=80" alt="Playing Records"/>
    <h2 className="hero-title">Turn the music up!</h2>
    <section className="selling-points">
      <div className="point">
        <h3 className="point-title">Choose your music.</h3>
        <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
      </div>
      <div className="point">
        <h3 className="point-title">Unlimited, streaming, ad-free.</h3>
        <p className="point-description">No arbitrary limits. No distractions.</p>
      </div>
      <div className="point">
        <h3 className="point-title">Mobile enabled.</h3>
        <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
      </div>
    </section>
  </section>
);

export default Landing;
