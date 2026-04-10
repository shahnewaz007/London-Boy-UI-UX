import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

const MEN_HERO_IMAGE =
  'https://images.unsplash.com/photo-1618248945468-e07f3e70cdf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200';

const WOMEN_HERO_IMAGE =
  'https://images.unsplash.com/photo-1641724646783-630fc4c12de0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200';

const MOBILE_HERO_IMAGE =
  'https://images.unsplash.com/photo-1737839177847-24eac37fcc1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200';

const MARQUEE_ITEMS = [
  'FREE UK DELIVERY ON ORDERS OVER £50',
  'PREMIUM EUROPEAN QUALITY',
  'SUSTAINABLE FABRICS',
  'NEW SS 2025 COLLECTION',
  'ETHICALLY CRAFTED',
  'INNERWEAR FOR MEN & WOMEN',
  'FREE RETURNS WITHIN 30 DAYS',
  'CRAFTED IN EUROPE',
  'LUXURY ESSENTIALS',
];

const categories = [
  {
    label: "MEN'S ESSENTIALS",
    sublabel: 'Vests & Undershirts',
    href: '/products?category=men',
    image:
      'https://images.unsplash.com/photo-1608568516718-ff5318b81464?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
  },
  {
    label: 'CAMISOLES & TANKS',
    sublabel: "Women's Layers",
    href: '/products?category=women',
    image:
      'https://images.unsplash.com/photo-1629745572658-598ae487d4ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
  },
  {
    label: 'SHAPEWEAR',
    sublabel: 'Sculpt & Support',
    href: '/products?category=shapewear',
    image:
      'https://images.unsplash.com/photo-1662874614737-37ffb9c8aa3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
  },
];

export function Hero() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const animRef = useRef<number>(0);
  const posRef = useRef(0);

  useEffect(() => {
    const speed = 0.55;
    const step = () => {
      posRef.current -= speed;
      const el = marqueeRef.current;
      if (el) {
        const halfWidth = el.scrollWidth / 2;
        if (Math.abs(posRef.current) >= halfWidth) posRef.current = 0;
        setTranslateX(posRef.current);
      }
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <>
      {/* ── HERO SECTION ── */}
      <section className="relative w-full overflow-hidden" style={{ height: '100vh', minHeight: '640px' }}>

        {/* Mobile background */}
        <div className="absolute inset-0 lg:hidden">
          <img src={MOBILE_HERO_IMAGE} alt="London Boy Collection" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/20" />
        </div>

        {/* Desktop: Split editorial panels */}
        <div className="absolute inset-0 hidden lg:grid grid-cols-2">
          {/* Men's panel */}
          <div className="relative overflow-hidden">
            <motion.img
              src={MEN_HERO_IMAGE}
              alt="Men's Premium Innerwear"
              className="w-full h-full object-cover object-top"
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />

            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 1.0 }}
              className="absolute bottom-14 left-10"
            >
              <p className="text-white/55 tracking-[0.35em] mb-1" style={{ fontSize: '0.65rem' }}>MEN'S</p>
              <p className="text-white tracking-[0.18em]" style={{ fontSize: '0.8rem', fontWeight: 300 }}>Vests & Undershirts</p>
              <div className="h-px w-8 bg-white/40 mt-2" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.3 }}
              className="absolute top-24 left-8 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2"
            >
              <p className="text-white/80 tracking-[0.2em]" style={{ fontSize: '0.6rem' }}>FROM £29</p>
            </motion.div>
          </div>

          {/* Women's panel */}
          <div className="relative overflow-hidden">
            <motion.img
              src={WOMEN_HERO_IMAGE}
              alt="Women's Camisoles & Shapewear"
              className="w-full h-full object-cover object-top"
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-l from-black/10 to-transparent" />

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 1.0 }}
              className="absolute bottom-14 right-10 text-right"
            >
              <p className="text-white/55 tracking-[0.35em] mb-1" style={{ fontSize: '0.65rem' }}>WOMEN'S</p>
              <p className="text-white tracking-[0.18em]" style={{ fontSize: '0.8rem', fontWeight: 300 }}>Camisoles & Shapewear</p>
              <div className="h-px w-8 bg-white/40 mt-2 ml-auto" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.3 }}
              className="absolute top-24 right-8 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2"
            >
              <p className="text-white/80 tracking-[0.2em]" style={{ fontSize: '0.6rem' }}>FROM £39</p>
            </motion.div>
          </div>
        </div>

        {/* Center divider */}
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/15 hidden lg:block z-10" />

        {/* Central overlay content */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="h-px w-6 bg-white/60" />
            <span className="text-white/75 tracking-[0.4em] uppercase" style={{ fontSize: '0.6rem' }}>SS 2025 Collection</span>
            <span className="h-px w-6 bg-white/60" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-white mb-4"
            style={{ fontSize: 'clamp(2.8rem, 7.5vw, 6.5rem)', fontWeight: 200, lineHeight: 1.0, letterSpacing: '-0.025em' }}
          >
            Refined<br />
            <span style={{ fontStyle: 'italic', fontWeight: 300 }}>Comfort.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="text-white/70 mb-8 max-w-xs"
            style={{ fontSize: '0.85rem', lineHeight: 1.75, fontWeight: 300 }}
          >
            Premium innerwear and foundations for men and women. Crafted in Europe.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="flex flex-col sm:flex-row gap-3 pointer-events-auto"
          >
            <Link
              to="/products?category=men"
              className="group inline-flex items-center justify-center gap-2 bg-white text-black px-7 py-3 hover:bg-gray-100 transition-colors tracking-[0.14em]"
              style={{ fontWeight: 500, fontSize: '0.7rem' }}
            >
              SHOP MEN
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/products?category=women"
              className="group inline-flex items-center justify-center gap-2 border border-white/60 text-white px-7 py-3 hover:bg-white/10 transition-colors tracking-[0.14em]"
              style={{ fontWeight: 400, fontSize: '0.7rem' }}
            >
              SHOP WOMEN
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.7 }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
        >
          <div className="w-px h-10 bg-white/25 overflow-hidden relative">
            <motion.div
              className="absolute top-0 left-0 w-full h-1/2 bg-white/60"
              animate={{ y: ['0%', '200%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            />
          </div>
          <span className="text-white/45 tracking-[0.3em] uppercase" style={{ fontSize: '0.55rem' }}>Scroll</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-7 left-8 z-30 hidden lg:block"
        >
          <p className="text-white/40 tracking-[0.3em]" style={{ fontSize: '0.6rem' }}>LONDON · EST. 2020</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-7 right-8 z-30 hidden lg:block"
        >
          <p className="text-white/40 tracking-[0.3em]" style={{ fontSize: '0.6rem' }}>FREE UK DELIVERY · £50+</p>
        </motion.div>
      </section>

      {/* Marquee Strip */}
      <div className="bg-[#0a0a0a] py-3 overflow-hidden select-none">
        <div
          ref={marqueeRef}
          className="flex gap-0 whitespace-nowrap"
          style={{ transform: `translateX(${translateX}px)`, willChange: 'transform' }}
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4">
              <span className="text-white/80 tracking-[0.28em] px-6" style={{ fontSize: '0.65rem' }}>{item}</span>
              <span className="text-white/25" style={{ fontSize: '0.6rem' }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Category Tiles */}
      <section className="grid grid-cols-1 sm:grid-cols-3">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.14 }}
            className="relative group overflow-hidden cursor-pointer"
            style={{ height: 'clamp(340px, 42vw, 540px)' }}
          >
            <Link to={cat.href} className="block w-full h-full">
              <motion.img
                src={cat.image}
                alt={cat.label}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-500" />
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 to-transparent" />

              <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 px-6 text-center">
                <p className="text-white/65 tracking-[0.3em] mb-2 uppercase" style={{ fontSize: '0.6rem' }}>{cat.sublabel}</p>
                <h3 className="text-white mb-5" style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)', fontWeight: 300, letterSpacing: '0.12em' }}>
                  {cat.label}
                </h3>
                <span className="inline-flex items-center gap-2 text-white tracking-[0.22em] border-b border-white/40 pb-0.5 group-hover:border-white transition-colors" style={{ fontWeight: 400, fontSize: '0.65rem' }}>
                  SHOP <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>

            {i < categories.length - 1 && (
              <div className="absolute top-0 right-0 w-px h-full bg-white/15 hidden sm:block pointer-events-none" />
            )}
          </motion.div>
        ))}
      </section>
    </>
  );
}
