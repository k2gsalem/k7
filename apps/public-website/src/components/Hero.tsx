import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="hero">
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        Delicious meals, delivered fast.
      </motion.h1>
      <p>Discover local favorites and get them to your doorstep in minutes.</p>
      <a className="cta" href="/checkout">
        Order Now
      </a>
    </section>
  );
}
