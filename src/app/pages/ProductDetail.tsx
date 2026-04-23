import { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { COLOR, LAYOUT, SIZE, TEXT, TRACKING, WEIGHT } from '../lib/design';

const DETAIL_SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL'];

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const product = products.find((p) => p.id === Number(id));

  // Gallery: main product image + hoverImage + up to 3 related product images
  const galleryImages = useMemo(() => {
    if (!product) return [];
    const imgs = [product.image];
    if (product.hoverImage) imgs.push(product.hoverImage);
    products
      .filter((p) => p.gender === product.gender && p.id !== product.id)
      .slice(0, 4 - imgs.length)
      .forEach((p) => imgs.push(p.image));
    return imgs;
  }, [product]);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize]   = useState<string | null>(null);
  const [wishlisted, setWishlisted]       = useState(false);
  const [added, setAdded]                 = useState(false);
  const [openSection, setOpenSection]     = useState<string | null>('details');

  useEffect(() => {
    setActiveImage(0);
    setSelectedColor(0);
    setSelectedSize(null);
    setAdded(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!product) {
    return (
      <div className="pt-[var(--header-h)] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p style={{ fontSize: SIZE.micro, letterSpacing: TRACKING.wide, color: COLOR.textMuted }} className="mb-6">404</p>
          <h1 style={{ fontSize: '1.8rem', fontWeight: WEIGHT.regular }} className="mb-8">Product not found</h1>
          <Link to="/products" style={{ fontSize: SIZE.small, letterSpacing: TRACKING.button }} className="border border-black px-10 py-3.5 hover:bg-black hover:text-white transition-colors">
            BACK TO PRODUCTS
          </Link>
        </div>
      </div>
    );
  }

  const related = products
    .filter((p) => p.gender === product.gender && p.id !== product.id)
    .slice(0, 4);

  const genderLabel = product.gender
    ? product.gender.charAt(0).toUpperCase() + product.gender.slice(1)
    : 'All';

  const accordionItems = [
    {
      key: 'details',
      label: 'Details',
      content: (
        <div style={{ fontSize: SIZE.body, color: COLOR.textBody, lineHeight: 1.8 }} className="pb-6">
          <p className="mb-5">{product.description}</p>
          <p style={{ fontWeight: WEIGHT.medium, color: COLOR.primary }} className="mb-2">Highlights</p>
          <ul className="space-y-1 mb-5">
            {[
              `100% ${product.subcategory.toLowerCase()} construction`,
              'Hand-linked toe seam for comfort',
              'Reinforced heel and toe',
              'Non-binding elasticated cuff',
            ].map((item) => (
              <li key={item}> {item}</li>
            ))}
          </ul>
          <p style={{ fontWeight: WEIGHT.medium, color: COLOR.primary }} className="mb-2">Shape &amp; Fit</p>
          <ul className="space-y-1 mb-5">
            <li> relaxed fit</li>
            <li> mid-calf length</li>
          </ul>
          <p style={{ fontWeight: WEIGHT.medium, color: COLOR.primary }} className="mb-2">Composition &amp; Care</p>
          <p>80% Egyptian cotton, 15% polyamide, 5% elastane</p>
          <p>machine wash at 30C</p>
          <p className="mt-3" style={{ color: COLOR.textMuted }}>country of origin: Portugal</p>
        </div>
      ),
    },
    {
      key: 'shipping',
      label: 'Shipping &amp; Returns',
      content: (
        <div style={{ fontSize: SIZE.body, color: COLOR.textBody, lineHeight: 1.8 }} className="pb-6">
          <p>Standard delivery is usually within 35 working days. Returns are always free within 30 days of purchase. Items must be unworn and in original packaging.</p>
        </div>
      ),
    },
  ];

  const handleAddToBag = () => {
    if (!selectedSize) return;
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image, color: product.colorNames[selectedColor], size: selectedSize });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const isLightHex = (hex: string) =>
    ['#FFFFFF', '#F5F0E8', '#D4C5B5', '#D4B8A0', '#F5D5B8', '#F5F5F5'].includes(hex.toUpperCase());

  return (
    <div className="pt-[var(--header-h)] min-h-screen bg-white">

      {/* Breadcrumb */}
      <div className={`${LAYOUT.container} ${LAYOUT.px} py-4`}>
        <nav style={{ fontSize: SIZE.small, color: COLOR.textMuted }} className="flex items-center gap-1.5 flex-wrap">
          <Link to="/" className="hover:text-black transition-colors">{genderLabel}</Link>
          <span>-</span>
          <Link to="/products" className="hover:text-black transition-colors">Socks</Link>
          <span>-</span>
          <Link to={`/products?gender=${product.gender}`} className="hover:text-black transition-colors">{product.subcategory}</Link>
        </nav>
      </div>

      {/* Main layout */}
      <div className={`${LAYOUT.container} ${LAYOUT.px} pb-16`}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] xl:grid-cols-[1fr_500px] gap-10 lg:gap-16 xl:gap-20">

          {/*  Left: Gallery  */}
          <div className="lg:sticky lg:top-[128px] lg:self-start">
            {/*
              Mobile : main image (aspect-3/4) on top, horizontal thumbnail row below
              Desktop: thumbnail strip on the LEFT (vertical), main image fills remaining
                       viewport height so both are always visible without scrolling
            */}
            <div className="flex flex-col lg:flex-row lg:gap-3 lg:h-[calc(100vh-160px)]">

              {/* ── Thumbnail strip ── */}
              {galleryImages.length > 1 && (
                <div className="
                  order-2 lg:order-first
                  flex flex-row lg:flex-col
                  gap-2 mt-3 lg:mt-0
                  overflow-x-auto lg:overflow-x-hidden lg:overflow-y-auto
                  lg:w-[68px] flex-shrink-0
                  scrollbar-none
                ">
                  {galleryImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`
                        flex-shrink-0 overflow-hidden transition-all duration-200
                        border-b-2 bg-gray-50
                        w-[60px] h-[75px] lg:w-full lg:h-[86px]
                        ${activeImage === i
                          ? 'border-black opacity-100'
                          : 'border-transparent opacity-50 hover:opacity-85 hover:border-gray-300'}
                      `}
                      aria-label={`View image ${i + 1}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* ── Main image ── */}
              <div className="order-1 lg:order-last flex-1 relative aspect-[3/4] lg:aspect-auto bg-gray-50 overflow-hidden group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={galleryImages[activeImage]}
                    alt={product.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10 px-2.5 py-1" style={{ ...TEXT.badge, backgroundColor: product.badge === 'SALE' ? COLOR.accent : COLOR.surfaceDark }}>
                    {product.badge}
                  </div>
                )}
                {galleryImages.length > 1 && (
                  <>
                    <button onClick={() => setActiveImage((i) => (i - 1 + galleryImages.length) % galleryImages.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/85 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-10" aria-label="Previous">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button onClick={() => setActiveImage((i) => (i + 1) % galleryImages.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/85 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-10" aria-label="Next">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

            </div>
          </div>

          {/*  Right: Product info  */}
          <div>

            {/* Title + price */}
            <h1 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: WEIGHT.regular, lineHeight: 1.25 }} className="mb-3">
              {product.name}
            </h1>

            {/* Price row */}
            <div className="flex items-baseline gap-2.5 mb-6">
              {product.originalPrice && (
                <span style={{ fontSize: SIZE.body, color: COLOR.textMuted, textDecoration: 'line-through' }}>
                  {product.originalPrice.toFixed(2)}
                </span>
              )}
              <span style={{ fontSize: SIZE.body, color: product.originalPrice ? COLOR.accent : COLOR.primary, fontWeight: WEIGHT.regular }}>
                {product.price.toFixed(2)}
              </span>
              <span style={{ fontSize: SIZE.body, color: COLOR.textMuted }}>(inc. VAT)</span>
            </div>

            {/* Colour selector */}
            <div className="mb-6">
              <p style={{ fontSize: SIZE.body, color: COLOR.primary }} className="mb-3">
                Colour: <span style={{ fontWeight: WEIGHT.regular }}>{product.colorNames[selectedColor]}</span>
              </p>
              <div className="flex gap-2">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    title={product.colorNames[i]}
                    className="w-10 h-10 transition-all duration-200 flex-shrink-0"
                    style={{
                      backgroundColor: color,
                      border: selectedColor === i ? '2px solid #000' : isLightHex(color) ? '1px solid #d1d5db' : '1px solid transparent',
                      outline: selectedColor === i ? '1px solid #000' : 'none',
                      outlineOffset: '2px',
                    }}
                    aria-label={product.colorNames[i]}
                  />
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p style={{ fontSize: SIZE.body, color: COLOR.primary }}>Size:</p>
                <button style={{ fontSize: SIZE.body, color: COLOR.primary, textDecoration: 'underline' }} className="hover:text-gray-500 transition-colors">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {DETAIL_SIZE_OPTIONS.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      fontSize: SIZE.body,
                      fontWeight: selectedSize === size ? WEIGHT.medium : WEIGHT.regular,
                      backgroundColor: selectedSize === size ? '#0a0a0a' : 'transparent',
                      border: `1px solid ${selectedSize === size ? '#0a0a0a' : '#e5e7eb'}`,
                      minWidth: '72px',
                    }}
                    className={`px-4 py-3 transition-colors duration-150 hover:border-black text-center ${selectedSize === size ? 'text-white' : 'text-black'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p style={{ fontSize: SIZE.body, color: COLOR.textMuted }} className="mt-2">
                  Please select a size
                </p>
              )}
            </div>

            {/* Add To Bag + Wishlist */}
            <div className="flex gap-2.5 mb-4">
              <motion.button
                onClick={handleAddToBag}
                disabled={!selectedSize}
                whileTap={selectedSize ? { scale: 0.985 } : {}}
                style={{ fontSize: SIZE.body, letterSpacing: TRACKING.button }}
                className={`flex-1 py-4 transition-all duration-200 ${
                  added ? 'bg-gray-700 text-white' :
                  selectedSize ? 'bg-black text-white hover:bg-gray-900' :
                  'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {added ? '   Added to Bag' : 'Add To Bag'}
              </motion.button>
              <button
                onClick={() => setWishlisted((v) => !v)}
                className="w-[52px] border transition-colors flex items-center justify-center hover:border-black"
                style={{ borderColor: wishlisted ? COLOR.primary : COLOR.border }}
                aria-label="Save to wishlist"
              >
                <Heart className="w-4 h-4" style={{ fill: wishlisted ? '#000' : 'none', color: '#000' }} />
              </button>
            </div>

            {/* Klarna */}
            <div className="mb-6" style={{ fontSize: SIZE.body, color: COLOR.textBody }}>
              <p>3 payments at 0% interest with <strong>Klarna</strong> <button className="underline hover:text-gray-500 transition-colors">Learn more</button></p>
              <p style={{ fontSize: SIZE.body, color: COLOR.textMuted, marginTop: '0.25rem' }}>18+, T&amp;C apply. Credit subject to status.</p>
            </div>

            {/* Trust perks */}
            <div className="py-5 border-t border-b mb-6 space-y-3" style={{ borderColor: COLOR.border }}>
              {[
                { Icon: Truck, text: 'Free delivery on all orders over 50' },
                { Icon: RotateCcw, text: '30-day free returns' },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-3" style={{ fontSize: SIZE.body, color: COLOR.textBody }}>
                  <Icon className="w-4 h-4 flex-shrink-0" style={{ color: COLOR.textSecondary }} strokeWidth={1.5} />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Promo card — same as Home hero sale banner */}
            <div
              className="relative overflow-hidden p-6 mb-8 text-left"
              style={{
                background: 'linear-gradient(150deg, #3d6475 0%, #5c8a9f 55%, #70a0b5 100%)',
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
              />

              <h3
                className="text-white relative z-10 mb-2"
                style={{
                  fontSize: 'clamp(1.55rem, 2.8vw, 2.25rem)',
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                }}
              >
                Summer Sale<br />
                Extra 10% Off
              </h3>

              <p
                className="text-white relative z-10 mb-4"
                style={{ fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.7 }}
              >
                Up to 30% off. Plus, extra 10% off when you spend £45 or more on discounted items with code SALE10. Online only.
              </p>

              <Link
                to="/products"
                className="group inline-flex items-center gap-2 text-white border-b border-white/70 hover:border-white pb-0.5 transition-colors duration-300 relative z-10"
                style={{ fontSize: '1rem', fontWeight: 500, letterSpacing: '0.04em' }}
              >
                Shop Now
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Details accordion */}
            <div className="divide-y" style={{ borderColor: COLOR.border }}>
              {accordionItems.map(({ key, label, content }) => {
                const isOpen = openSection === key;
                return (
                  <div key={key} className="border-t" style={{ borderColor: COLOR.border }}>
                    <button
                      onClick={() => setOpenSection(isOpen ? null : key)}
                      className="w-full flex items-center justify-between py-4 text-left group"
                    >
                      <span style={{ fontSize: SIZE.body, color: COLOR.primary, fontWeight: WEIGHT.regular }}>
                        {label}
                      </span>
                      {isOpen
                        ? <Minus className="w-3.5 h-3.5 flex-shrink-0" style={{ color: COLOR.textMuted }} />
                        : <Plus  className="w-3.5 h-3.5 flex-shrink-0" style={{ color: COLOR.textMuted }} />
                      }
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          {content}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              <div className="border-t" style={{ borderColor: COLOR.border }} />
            </div>

          </div>
        </div>
      </div>

      {/* You May Also Like */}
      {related.length > 0 && (
        <section className="border-t py-16" style={{ borderColor: COLOR.borderLight }}>
          <div className={`${LAYOUT.container} ${LAYOUT.px}`}>
            <div className="flex items-end justify-between mb-10">
              <div>
                <p style={{ ...TEXT.eyebrow }} className="mb-1">Curated For You</p>
                <h2 style={{ fontSize: SIZE.sectionHeading, fontWeight: WEIGHT.regular }}>You May Also Like</h2>
              </div>
              <Link to={`/products?gender=${product.gender}`} style={{ fontSize: SIZE.small, letterSpacing: TRACKING.button, color: COLOR.textSecondary }} className="hover:text-black transition-colors">
                VIEW ALL
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  image={p.image}
                  hoverImage={p.hoverImage}
                  name={p.name}
                  price={p.price}
                  originalPrice={p.originalPrice}
                  badge={p.badge}
                  colors={p.colors}
                  onAddToCart={() => addItem({ id: p.id, name: p.name, price: p.price, image: p.image, color: p.colorNames[0], size: p.sizes[0] })}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}