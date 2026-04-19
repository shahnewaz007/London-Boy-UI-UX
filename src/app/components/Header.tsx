import { Search, User, ShoppingBag, Menu, X, Heart } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { useCart } from '../context/CartContext';
import { COLOR, FAMILY, TEXT, TRACKING } from '../lib/design';
import { CartHoverPanel } from './CartHoverPanel';

const PROMO_MESSAGES = [
  'Join London Boy and get 10% off your first order',
  'Free UK delivery on all orders over £50',
  'Free returns within 30 days — no questions asked',
  'New SS 2025 collection — premium socks & innerwear',
];

const NAV_LINKS = [
  { label: 'NEW', to: '/products?filter=new' },
  { label: 'MEN', to: '/products?gender=men' },
  { label: 'WOMEN', to: '/products?gender=women' },
  { label: 'KIDS', to: '/products?gender=kids' },
  { label: 'SALE', to: '/products?filter=sale', accent: true },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [promoIndex, setPromoIndex] = useState(0);
  const [promoVisible, setPromoVisible] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const cartHideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { totalItems } = useCart();
  const { pathname } = useLocation();

  const openCart = () => {
    if (cartHideTimer.current) clearTimeout(cartHideTimer.current);
    setCartOpen(true);
  };
  const closeCart = () => {
    cartHideTimer.current = setTimeout(() => setCartOpen(false), 120);
  };

  // Auto-cycle promo messages with fade transition
  useEffect(() => {
    const timer = setInterval(() => {
      setPromoVisible(false);
      setTimeout(() => {
        setPromoIndex((i) => (i + 1) % PROMO_MESSAGES.length);
        setPromoVisible(true);
      }, 280);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      {/* ── Top promo bar ── */}
      <div className="bg-[#0a0a0a] text-white h-10 flex items-center justify-center">
        <p
          className="text-center select-none transition-opacity duration-[300ms]"
          style={{
            fontSize: '0.8rem',
            letterSpacing: '0.01em',
            fontWeight: 400,
            opacity: promoVisible ? 1 : 0,
          }}
        >
          {PROMO_MESSAGES[promoIndex]}
        </p>
      </div>

      {/* ── White navigation bar ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 lg:h-20 relative">

            {/* Left: mobile = hamburger + search | desktop = nav links */}
            <div className="flex items-center flex-1 min-w-0">
              {/* Mobile hamburger */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 -ml-1 text-black flex-shrink-0"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Mobile search (left side, next to hamburger — matches CK pattern) */}
              <button
                onClick={() => setSearchOpen((v) => !v)}
                className="lg:hidden p-2 text-black flex-shrink-0"
                aria-label="Search"
              >
                <Search style={{ width: 18, height: 18 }} />
              </button>

              {/* Desktop nav */}
              <nav className="hidden lg:flex items-center gap-7">
                {NAV_LINKS.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="tracking-[0.12em] hover:opacity-55 transition-opacity"
                    style={{
                      ...TEXT.navLink,
                      color: item.accent ? COLOR.accent : COLOR.primary,
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Centre: Logo — absolutely centered so it never competes with side content */}
            <Link
              to="/"
              className="absolute left-1/2 -translate-x-1/2 text-black hover:opacity-70 transition-opacity whitespace-nowrap pointer-events-auto"
              style={{
                fontFamily: FAMILY.display,
                fontWeight: 400,
                letterSpacing: TRACKING.logo,
                fontSize: 'clamp(0.95rem, 3.5vw, 1.25rem)',
                textDecoration: 'none',
              }}
            >
              LONDON BOY
            </Link>

            {/* Right: mobile = user + bag | desktop = search + user + heart + bag */}
            <div className="flex items-center flex-1 justify-end gap-0.5 text-black">
              {/* Desktop-only: search */}
              <button
                onClick={() => setSearchOpen((v) => !v)}
                className="hidden lg:flex p-2 hover:opacity-55 transition-opacity"
                aria-label="Search"
              >
                <Search style={{ width: 18, height: 18 }} />
              </button>

              {/* Desktop-only: account */}
              <Link to="/profile" className="hidden lg:flex p-2 hover:opacity-55 transition-opacity text-black" aria-label="My account">
                <User style={{ width: 18, height: 18 }} />
              </Link>

              {/* Desktop-only: wishlist */}
              <Link to="/profile" className="hidden lg:flex p-2 hover:opacity-55 transition-opacity text-black" aria-label="Wishlist">
                <Heart style={{ width: 18, height: 18 }} />
              </Link>

              {/* Mobile-only: account */}
              <Link to="/profile" className="lg:hidden p-2 hover:opacity-55 transition-opacity text-black" aria-label="My account">
                <User style={{ width: 18, height: 18 }} />
              </Link>

              {/* Bag — always visible; hover opens panel, click goes to /cart */}
              <div
                className="relative"
                onMouseEnter={openCart}
                onMouseLeave={closeCart}
              >
                <Link to="/cart" className="p-2 hover:opacity-55 transition-opacity text-black relative flex" aria-label={`Cart (${totalItems} items)`}>
                  <ShoppingBag style={{ width: 18, height: 18 }} />
                  {totalItems > 0 && (
                    <span
                      className="absolute top-0.5 right-0.5 bg-black text-white rounded-full flex items-center justify-center"
                      style={{ fontSize: 9, width: 15, height: 15, fontWeight: 600 }}
                    >
                      {totalItems > 9 ? '9+' : totalItems}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="py-3 border-t border-gray-100">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products…"
                  autoFocus
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 focus:outline-none focus:border-black transition-colors bg-white"
                />
              </div>
            </div>
          )}
        </div>

        {/* Mobile nav drawer */}
        {isMenuOpen && (
          <nav className="lg:hidden border-t border-gray-100">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-5 flex flex-col">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="py-3 border-b border-gray-100 hover:opacity-60 transition-opacity"
                  style={{ ...TEXT.mobileNavLink, color: item.accent ? COLOR.accent : COLOR.primary }}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-5 flex gap-6">
                <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="text-xs tracking-[0.18em] text-gray-500 hover:text-black transition-colors">
                  MY ACCOUNT
                </Link>
                <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="text-xs tracking-[0.18em] text-gray-500 hover:text-black transition-colors">
                  BAG ({totalItems})
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>

      <CartHoverPanel isOpen={cartOpen} onMouseEnter={openCart} onMouseLeave={closeCart} />

    </header>
  );
}
