import { Hero } from '../components/Hero';

export function LandingPage() {
  return (
    <main>
      <Hero />
      <section>
        <h2>Why choose K7?</h2>
        <ul>
          <li>Multi-store, multi-tenant ready</li>
          <li>Real-time order tracking</li>
          <li>Loyalty and credit integration</li>
        </ul>
      </section>
    </main>
  );
}
