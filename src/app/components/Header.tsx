import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { useCart } from '../context/CartContext';

const NAV_LINKS = [
  { label: 'NEW', to: '/products?filter=new' },
  { label: 'MEN', to: '/products?category=men' },
  { label: 'WOMEN', to: '/products?category=women' },
  { label: 'SOCKS', to: '/products?category=socks' },
  { label: 'SALE', to: '/products?category=thermal' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems } = useCart();
  const { pathname } = useLocation();

  // Only transparent on homepage hero
  const isHomePage = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on nav
  useEffect(() => {
    setIsMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const isTransparent = isHomePage && !scrolled && !isMenuOpen && !searchOpen;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: isTransparent ? 'transparent' : '#ffffff',
        borderBottom: isTransparent ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.08)',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 transition-colors"
            style={{ color: isTransparent ? '#ffffff' : '#000000' }}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 transition-colors duration-300"
            style={{
              color: isTransparent ? '#ffffff' : '#000000',
              fontWeight: 300,
              letterSpacing: '0.25em',
              fontSize: '1.25rem',
              textDecoration: 'none',
            }}
          >
            LONDON BOY
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex space-x-8">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="text-xs tracking-[0.15em] transition-colors duration-300 hover:opacity-60"
                style={{
                  color: isTransparent ? 'rgba(255,255,255,0.9)' : '#000000',
                  fontWeight: 400,
                  textDecoration: 'none',
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div
            className="flex items-center space-x-1"
            style={{ color: isTransparent ? '#ffffff' : '#000000' }}
          >
            {/* Search */}
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="p-2 transition-opacity hover:opacity-60"
            >
              <Search style={{ width: 18, height: 18 }} />
            </button>

            {/* Profile */}
            <Link to="/profile" className="p-2 transition-opacity hover:opacity-60" style={{ color: 'inherit' }}>
              <User style={{ width: 18, height: 18 }} />
            </Link>

            {/* Cart */}
            <Link to="/cart" className="p-2 transition-opacity hover:opacity-60 relative" style={{ color: 'inherit' }}>
              <ShoppingBag style={{ width: 18, height: 18 }} />
              {totalItems > 0 && (
                <span
                  className="absolute top-0.5 right-0.5 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: isTransparent ? 'white' : 'black',
                    color: isTransparent ? 'black' : 'white',
                    fontSize: 9,
                    width: 15,
                    height: 15,
                    fontWeight: 600,
                  }}
                >
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div
            className="py-3 border-t"
            style={{ borderColor: isTransparent ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.08)' }}
          >
            <div className="relative max-w-md mx-auto">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: isTransparent ? 'rgba(255,255,255,0.6)' : '#9CA3AF' }}
              />
              <input
                type="text"
                placeholder="Search products…"
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 text-sm focus:outline-none bg-transparent"
                style={{
                  color: isTransparent ? '#fff' : '#000',
                  border: `1px solid ${isTransparent ? 'rgba(255,255,255,0.3)' : '#E5E7EB'}`,
                }}
              />
            </div>
          </div>
        )}

        {/* Mobile nav */}
        {isMenuOpen && (
          <nav
            className="lg:hidden py-6 border-t bg-white"
            style={{ borderColor: 'rgba(0,0,0,0.08)' }}
          >
            <div className="flex flex-col space-y-1">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm tracking-[0.2em] text-black hover:text-gray-500 transition-colors py-2.5 border-b border-gray-50"
                  style={{ fontWeight: 400 }}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 flex gap-4">
                <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="text-xs tracking-[0.2em] text-gray-500 hover:text-black transition-colors">MY ACCOUNT</Link>
                <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="text-xs tracking-[0.2em] text-gray-500 hover:text-black transition-colors">BAG ({totalItems})</Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
