import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

// ── Socks-focused hero images ────────────────────────────────────────
const MEN_HERO_IMAGE =
  'https://images.unsplash.com/photo-1618338054411-5341de249394?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200';

const WOMEN_HERO_IMAGE =
  'https://images.unsplash.com/photo-1641399050826-9616c90427bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200';

const MOBILE_HERO_IMAGE =
  'https://images.unsplash.com/photo-1577988932535-e1f04b4969b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200';

// ── Marquee ──────────────────────────────────────────────────────────
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

// ── Category tiles ───────────────────────────────────────────────────
const CATEGORY_TILES = [
  {
    label: "MEN'S SOCKS",
    sublabel: 'Merino · Cotton · Bamboo',
    href: '/products?category=socks',
    image:
      'https://images.unsplash.com/photo-1618338054411-5341de249394?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
  },
  {
    label: "WOMEN'S SOCKS",
    sublabel: 'Ankle · Knee-High · No-Show',
    href: '/products?category=socks',
    image:
      'https://images.unsplash.com/photo-1577988932535-e1f04b4969b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
  },
  {
    label: 'INNERWEAR',
    sublabel: 'Vests, Camisoles & Shapewear',
    href: '/products?category=men',
    image:
      'https://images.unsplash.com/photo-1662874614737-37ffb9c8aa3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
  },
];

export function Hero() {
  // Marquee
  const marqueeRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef(0);

  // Marquee animation (DOM mutation, no state)
  useEffect(() => {
    const speed = 0.55;
    const step = () => {
      posRef.current -= speed;
      const el = marqueeRef.current;
      if (el) {
        const halfWidth = el.scrollWidth / 2;
        if (Math.abs(posRef.current) >= halfWidth) posRef.current = 0;
        el.style.transform = `translateX(${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          UNIFIED HERO — sale offer + editorial panels in one viewport
          paddingTop: 120px accounts for the fixed header
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full flex flex-col overflow-hidden"
        style={{ height: '100vh', minHeight: '600px', paddingTop: 'var(--header-h, 120px)' }}
      >
        {/* ── SALE PANEL (top ~40% of remaining space) ── */}
        <div
          className="flex-none relative overflow-hidden flex flex-col items-center justify-center text-center px-6 py-8"
          style={{
            flex: '0 0 40%',
            background: 'linear-gradient(150deg, #3d6475 0%, #5c8a9f 55%, #70a0b5 100%)',
          }}
        >
          {/* Subtle dot-grid texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          {/* Headline — two lines, large */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-white relative z-10 mb-2"
            style={{
              fontSize: 'clamp(2.4rem, 3.8vw, 3.6rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
            }}
          >
            Summer Sale<br />
            Extra 10% Off
          </motion.h2>

          {/* Body paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white relative z-10 mb-4 max-w-lg text-center"
            style={{ fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.7 }}
          >
            Up to 30% off. Plus, extra 10% off when you spend £45 or more on discounted items with code SALE10. Online only.
          </motion.p>

          {/* CTA — underline style */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="relative z-10"
          >
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 text-white border-b border-white/70 hover:border-white pb-0.5 transition-colors duration-300"
              style={{ fontSize: '1rem', fontWeight: 500, letterSpacing: '0.04em' }}
            >
              Shop Now
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* ── EDITORIAL IMAGE PANELS (remaining ~60%) ── */}
        <div className="flex-1 relative overflow-hidden">

          {/* Mobile background */}
          <div className="absolute inset-0 lg:hidden">
            <img
              src={MOBILE_HERO_IMAGE}
              alt="London Boy Socks Collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/15" />
          </div>

          {/* Desktop: side-by-side panels */}
          <div className="absolute inset-0 hidden lg:grid grid-cols-2">

            {/* Men's panel */}
            <div className="relative overflow-hidden group">
              <motion.img
                src={MEN_HERO_IMAGE}
                alt="Men's Premium Socks"
                className="w-full h-full object-cover object-center"
                initial={{ scale: 1.06 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />

              {/* Price badge */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="absolute top-5 left-6"
              >
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white tracking-[0.2em]" style={{ fontSize: '0.57rem', fontWeight: 500 }}>FROM £12</span>
                </div>
              </motion.div>

              {/* Bottom label */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.85 }}
                className="absolute bottom-6 left-8"
              >
                <p className="text-white/40 tracking-[0.4em] mb-1" style={{ fontSize: '0.5rem' }}>FOR HIM</p>
                <p className="text-white tracking-[0.05em]" style={{ fontSize: '0.95rem', fontWeight: 400 }}>Men's Socks</p>
                <p className="text-white/50 tracking-[0.12em] mt-0.5" style={{ fontSize: '0.58rem', fontWeight: 300 }}>Merino · Cotton · Bamboo</p>
              </motion.div>
            </div>

            {/* Women's panel */}
            <div className="relative overflow-hidden group">
              <motion.img
                src={WOMEN_HERO_IMAGE}
                alt="Women's Premium Socks"
                className="w-full h-full object-cover object-top"
                initial={{ scale: 1.06 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />

              {/* Price badge */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="absolute top-5 right-6 flex justify-end"
              >
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                  <span className="text-white tracking-[0.2em]" style={{ fontSize: '0.57rem', fontWeight: 500 }}>FROM £14</span>
                </div>
              </motion.div>

              {/* Bottom label */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.85 }}
                className="absolute bottom-6 right-8 text-right"
              >
                <p className="text-white/40 tracking-[0.4em] mb-1" style={{ fontSize: '0.5rem' }}>FOR HER</p>
                <p className="text-white tracking-[0.05em]" style={{ fontSize: '0.95rem', fontWeight: 400 }}>Women's Socks</p>
                <p className="text-white/50 tracking-[0.12em] mt-0.5" style={{ fontSize: '0.58rem', fontWeight: 300 }}>Ankle · Knee-High · No-Show</p>
              </motion.div>
            </div>
          </div>

          {/* Vertical divider */}
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/15 hidden lg:block z-10" />

          {/* Centre overlay — brand statement + CTAs */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-white mb-4"
              style={{
                fontSize: 'clamp(1.8rem, 4.2vw, 3.6rem)',
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                textShadow: '0 2px 20px rgba(0,0,0,0.45)',
              }}
            >
              Elevated Comfort
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-white mb-7 max-w-sm"
              style={{ fontSize: '1.05rem', lineHeight: 1.7, fontWeight: 400 }}
            >
              Premium socks and innerwear for men and women,<br className="hidden sm:block" /> crafted in Europe.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="flex flex-col sm:flex-row gap-3 pointer-events-auto"
            >
              <Link
                to="/products?category=socks"
                className="group inline-flex items-center justify-center gap-2 bg-white text-black px-7 py-2.5 hover:bg-gray-100 transition-colors tracking-[0.14em]"
                style={{ fontWeight: 500, fontSize: '0.67rem' }}
              >
                SHOP SOCKS <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/products"
                className="group inline-flex items-center justify-center gap-2 border border-white/55 text-white px-7 py-2.5 hover:bg-white/10 transition-colors tracking-[0.14em]"
                style={{ fontWeight: 400, fontSize: '0.67rem' }}
              >
                ALL COLLECTIONS <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Corner stamps */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="absolute bottom-4 left-6 z-30 hidden lg:block"
          >
            <p className="text-white/28 tracking-[0.3em]" style={{ fontSize: '0.52rem' }}>LONDON · EST. 2020</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="absolute bottom-4 right-6 z-30 hidden lg:block"
          >
            <p className="text-white/28 tracking-[0.3em]" style={{ fontSize: '0.52rem' }}>FREE UK DELIVERY · £50+</p>
          </motion.div>
        </div>
      </section>

      {/* ── MARQUEE STRIP ── */}
      <div className="bg-[#0a0a0a] py-3 overflow-hidden select-none">
        <div
          ref={marqueeRef}
          className="flex gap-0 whitespace-nowrap"
          style={{ willChange: 'transform' }}
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4">
              <span className="text-white/80 tracking-[0.28em] px-6" style={{ fontSize: '0.65rem' }}>{item}</span>
              <span className="text-white/25" style={{ fontSize: '0.6rem' }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── CATEGORY TILES ── */}
      <section className="grid grid-cols-1 sm:grid-cols-3">
        {CATEGORY_TILES.map((cat, i) => (
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
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors duration-500" />
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 to-transparent" />

              <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 px-6 text-center">
                <p className="text-white/60 tracking-[0.3em] mb-2 uppercase" style={{ fontSize: '0.6rem' }}>{cat.sublabel}</p>
                <h3 className="text-white mb-5" style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)', fontWeight: 400, letterSpacing: '0.1em' }}>
                  {cat.label}
                </h3>
                <span className="inline-flex items-center gap-2 text-white tracking-[0.22em] border-b border-white/40 pb-0.5 group-hover:border-white transition-colors" style={{ fontWeight: 400, fontSize: '0.65rem' }}>
                  SHOP <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>

            {i < CATEGORY_TILES.length - 1 && (
              <div className="absolute top-0 right-0 w-px h-full bg-white/15 hidden sm:block pointer-events-none" />
            )}
          </motion.div>
        ))}
      </section>
    </>
  );
}
