import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block text-white tracking-[0.25em] text-xl mb-5" style={{ fontWeight: 300 }}>
              LONDON BOY
            </Link>
            <p className="text-gray-500 text-sm mb-6" style={{ lineHeight: 1.8 }}>
              Premium innerwear for men and women. Crafted in Europe from the finest sustainable materials.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="text-gray-500 hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="text-xs tracking-[0.25em] uppercase mb-5 text-gray-400">Shop</p>
            <ul className="space-y-3 text-sm text-gray-500">
              {[
                { label: 'New Arrivals', to: '/products?filter=new' },
                { label: "Men's Innerwear", to: '/products?category=men' },
                { label: 'Camisoles & Tanks', to: '/products?category=women' },
                { label: 'Shapewear', to: '/products?category=women' },
                { label: 'Socks', to: '/products?category=socks' },
                { label: 'Thermal Sets', to: '/products?category=thermal' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <p className="text-xs tracking-[0.25em] uppercase mb-5 text-gray-400">Customer Care</p>
            <ul className="space-y-3 text-sm text-gray-500">
              {['Contact Us', 'Shipping & Delivery', 'Returns & Exchanges', 'Size Guide', 'FAQs', 'Sustainability'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-xs tracking-[0.25em] uppercase mb-5 text-gray-400">Newsletter</p>
            <p className="text-gray-500 text-sm mb-5" style={{ lineHeight: 1.7 }}>
              New arrivals, exclusive offers, and style notes.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-white/5 border border-white/15 px-4 py-2.5 text-sm focus:outline-none focus:border-white/40 transition-colors text-white placeholder-white/30"
              />
              <button className="bg-white text-black px-5 py-2.5 hover:bg-gray-200 transition-colors text-xs tracking-[0.15em]">
                JOIN
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">© 2025 London Boy. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-gray-600">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a key={item} href="#" className="hover:text-gray-400 transition-colors">{item}</a>
            ))}
          </div>
          <div className="flex gap-3 text-xs text-gray-700 tracking-wider">
            {['VISA', 'MASTERCARD', 'AMEX', 'PAYPAL'].map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
