import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">

      {/* ── Newsletter offer ──────────────────────────────────────────── */}
      <div className="py-20 border-b border-white/8">
        <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-4" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 400 }}>
            Get 10% Off When You Sign Up
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
            {['15% off on your birthday', 'Early access to sales', 'Exclusive discounts'].map((perk) => (
              <span key={perk} className="flex items-center gap-2" style={{ fontSize: '0.95rem', color: '#ffffff', lineHeight: 1.8 }}>
                <span style={{ color: '#ffffff' }}>&#x2713;</span> {perk}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3.5 bg-white/5 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition-colors"
              style={{ fontSize: '0.95rem' }}
            />
            <button
              className="bg-white text-black px-8 py-3.5 hover:bg-gray-100 transition-colors whitespace-nowrap"
              style={{ fontSize: '0.95rem', fontWeight: 500, letterSpacing: '0.06em' }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* ── Footer grid ───────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block text-white tracking-[0.25em] text-xl mb-5" style={{ fontWeight: 400 }}>
              LONDON BOY
            </Link>
            <p className="mb-6" style={{ fontSize: '0.95rem', lineHeight: 1.8, color: '#fff' }}>
              Premium innerwear for men and women. Crafted in Europe from the finest sustainable materials.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="hover:opacity-70 transition-opacity" style={{ color: '#fff' }}>
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="text-sm tracking-[0.2em] uppercase mb-5 text-white" style={{ fontWeight: 500 }}>Shop</p>
            <ul className="space-y-3 text-white/70" style={{ fontSize: '0.95rem' }}>
              {[
                { label: 'New Arrivals', to: '/products?filter=new' },
                { label: "Men's Innerwear", to: '/products?category=men' },
                { label: 'Camisoles & Tanks', to: '/products?category=women' },
                { label: 'Shapewear', to: '/products?category=women' },
                { label: 'Socks', to: '/products?category=socks' },
                { label: 'Thermal Sets', to: '/products?category=thermal' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="hover:opacity-70 transition-opacity" style={{ color: '#fff' }}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <p className="text-sm tracking-[0.2em] uppercase mb-5 text-white" style={{ fontWeight: 500 }}>Customer Care</p>
            <ul className="space-y-3 text-white/70" style={{ fontSize: '0.95rem' }}>
              {['Contact Us', 'Shipping & Delivery', 'Returns & Exchanges', 'Size Guide', 'FAQs', 'Sustainability'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:opacity-70 transition-opacity" style={{ color: '#fff' }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-sm tracking-[0.2em] uppercase mb-5 text-white" style={{ fontWeight: 500 }}>Newsletter</p>
            <p className="mb-5" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#fff' }}>
              New arrivals, exclusive offers, and style notes.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-white/5 border border-white/15 px-4 py-2.5 focus:outline-none focus:border-white/40 transition-colors text-white placeholder-white/30"
                style={{ fontSize: '0.9rem' }}
              />
              <button className="bg-white text-black px-5 py-2.5 hover:bg-gray-200 transition-colors" style={{ fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.1em' }}>
                JOIN
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p style={{ color: '#fff' }}>© 2025 London Boy. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a key={item} href="#" className="hover:opacity-70 transition-opacity" style={{ color: '#fff' }}>{item}</a>
            ))}
          </div>
          <div className="flex gap-3 tracking-wider" style={{ fontSize: '0.75rem', color: '#fff' }}>
            {['VISA', 'MASTERCARD', 'AMEX', 'PAYPAL'].map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
