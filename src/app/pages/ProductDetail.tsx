import { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  ChevronDown,
  Truck,
  RotateCcw,
  Shield,
  Share2,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';

const ACCORDION_ITEMS: { key: string; label: string }[] = [
  { key: 'details', label: 'PRODUCT DETAILS' },
  { key: 'materials', label: 'MATERIALS & CARE' },
  { key: 'delivery', label: 'DELIVERY & RETURNS' },
  { key: 'sizeguide', label: 'SIZE GUIDE' },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3 h-3 ${star <= rating ? 'fill-black text-black' : 'fill-gray-200 text-gray-200'}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();

  const product = products.find((p) => p.id === Number(id));

  // Gallery: main product image + up to 3 images from same-category products
  const galleryImages = useMemo(() => {
    if (!product) return [];
    const extras = products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 3)
      .map((p) => p.image);
    return [product.image, ...extras];
  }, [product]);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>('details');
  const [copied, setCopied] = useState(false);

  // Reset UI state when navigating to a different product
  useEffect(() => {
    setActiveImage(0);
    setSelectedColor(0);
    setSelectedSize(null);
    setQuantity(1);
    setAdded(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!product) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xs tracking-[0.4em] text-gray-300 mb-6">404</p>
          <h1 className="text-3xl font-light mb-8">Product not found</h1>
          <Link
            to="/products"
            className="text-xs tracking-[0.25em] border border-black px-10 py-3.5 hover:bg-black hover:text-white transition-colors"
          >
            BACK TO PRODUCTS
          </Link>
        </div>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const accordionContent: Record<string, string> = {
    details: product.description,
    materials:
      'Composition: 95% long-staple Egyptian cotton, 5% elastane.\n\nMachine wash at 30°C. Do not tumble dry. Iron on low heat. Do not bleach. Wash dark colours separately. Store folded, away from direct sunlight.',
    delivery:
      'Standard Delivery (3–5 working days): £3.95, free on orders over £75.\nExpress Delivery (next working day, order before 1pm): £7.95.\n\nFree returns within 30 days of purchase. Items must be unworn, unwashed and in original packaging with all tags attached.',
    sizeguide:
      'XS — Chest 32–34″ · Waist 24–26″\nS — Chest 34–36″ · Waist 26–28″\nM — Chest 36–38″ · Waist 28–30″\nL — Chest 38–40″ · Waist 30–32″\nXL — Chest 40–42″ · Waist 32–34″\nXXL — Chest 42–44″ · Waist 34–36″\n\nFor a relaxed fit, size up one. For a close, tailored silhouette, take your usual size.',
  };

  const handleAddToBag = () => {
    if (!selectedSize) return;
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        color: product.colorNames[selectedColor],
        size: selectedSize,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isLightColor = (hex: string) => {
    const light = ['#FFFFFF', '#F5F0E8', '#D4C5B5', '#D4B8A0', '#FFFFFF'];
    return light.includes(hex.toUpperCase());
  };

  return (
    <div className="pt-16 min-h-screen bg-white">
      {/* ── Breadcrumb ── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-100">
        <nav className="flex items-center gap-2 text-[0.65rem] tracking-[0.12em] text-gray-400 flex-wrap">
          <Link to="/" className="hover:text-black transition-colors">HOME</Link>
          <span className="text-gray-200">/</span>
          <Link to="/products" className="hover:text-black transition-colors">ALL PRODUCTS</Link>
          <span className="text-gray-200">/</span>
          <Link
            to={`/products?category=${product.category}`}
            className="hover:text-black transition-colors"
          >
            {product.category.toUpperCase()}
          </Link>
          <span className="text-gray-200">/</span>
          <span className="text-gray-600 truncate max-w-[180px]">{product.name.toUpperCase()}</span>
        </nav>
      </div>

      {/* ── Main Layout ── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] xl:grid-cols-[1fr_500px] gap-10 lg:gap-16 xl:gap-24">

          {/* ────────── LEFT: Gallery ────────── */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            {/* Main image */}
            <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden mb-3 group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={galleryImages[activeImage]}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 bg-black text-white text-[0.6rem] px-3 py-1.5 tracking-[0.3em] z-10">
                  {product.badge}
                </div>
              )}

              {/* Prev / Next arrows */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImage((i) => (i - 1 + galleryImages.length) % galleryImages.length)
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/85 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveImage((i) => (i + 1) % galleryImages.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/85 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Image counter pill */}
              {galleryImages.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-[0.6rem] px-2.5 py-1 tracking-widest z-10">
                  {activeImage + 1} / {galleryImages.length}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`aspect-square bg-gray-50 overflow-hidden border-b-[2px] transition-all duration-200 ${
                      activeImage === i
                        ? 'border-black'
                        : 'border-transparent opacity-50 hover:opacity-90 hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ────────── RIGHT: Product Info ────────── */}
          <div>
            {/* Header: subcategory + title + share */}
            <div className="mb-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[0.65rem] tracking-[0.35em] text-gray-400 uppercase mb-2">
                    {product.subcategory}
                  </p>
                  <h1 className="font-light leading-tight mb-4" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
                    {product.name}
                  </h1>
                </div>
                <button
                  onClick={handleShare}
                  className="p-2 text-gray-400 hover:text-black transition-colors flex-shrink-0 mt-6"
                  title={copied ? 'Link copied!' : 'Share this product'}
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Stars + review count */}
              <div className="flex items-center gap-3 mb-5">
                <StarRating rating={4} />
                <span className="text-xs text-gray-500 tracking-wide">4.8</span>
                <span className="text-gray-200 text-xs select-none">|</span>
                <button className="text-xs text-gray-400 hover:text-black transition-colors tracking-wide underline underline-offset-2">
                  124 reviews
                </button>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-light tracking-wide">£{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-sm text-gray-400 line-through">£{product.originalPrice}</span>
                    <span className="text-[0.65rem] bg-red-50 text-red-500 px-2 py-0.5 tracking-[0.12em]">
                      SAVE £{product.originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Short description */}
            <p className="text-sm text-gray-500 leading-7 pb-6 border-b border-gray-100 mb-6">
              {product.description}
            </p>

            {/* Colour selector */}
            <div className="mb-6">
              <p className="text-[0.7rem] tracking-[0.25em] uppercase mb-3">
                Colour —{' '}
                <span className="text-gray-400 font-light normal-case tracking-normal">
                  {product.colorNames[selectedColor]}
                </span>
              </p>
              <div className="flex gap-3">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    title={product.colorNames[i]}
                    className={`relative w-8 h-8 rounded-full transition-all duration-200 ${
                      selectedColor === i
                        ? 'ring-2 ring-offset-2 ring-black scale-105'
                        : 'ring-1 ring-gray-200 hover:ring-gray-400'
                    }`}
                    style={{ backgroundColor: color }}
                  >
                    {selectedColor === i && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <Check
                          className="w-3 h-3"
                          style={{ color: isLightColor(color) ? '#000' : '#fff' }}
                        />
                      </span>
                    )}
                    {isLightColor(color) && (
                      <span className="absolute inset-0 rounded-full border border-gray-200 pointer-events-none" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div className="mb-7">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[0.7rem] tracking-[0.25em] uppercase">
                  Size{selectedSize ? ` — ${selectedSize}` : ''}
                </p>
                <button className="text-[0.65rem] text-gray-400 hover:text-black transition-colors tracking-[0.1em] underline underline-offset-2">
                  SIZE GUIDE
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[52px] px-3.5 py-2.5 text-xs tracking-[0.15em] border transition-all duration-150 ${
                      selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-black border-gray-200 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-[0.6rem] text-gray-400 mt-2 tracking-[0.1em]">
                  Please select a size to continue
                </p>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-5 mb-5">
              <p className="text-[0.7rem] tracking-[0.25em] uppercase text-gray-700">Qty</p>
              <div className="flex items-center border border-gray-200 divide-x divide-gray-200">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-9 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-12 text-center text-sm tabular-nums select-none">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="w-10 h-9 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-2.5 mb-8">
              <motion.button
                onClick={handleAddToBag}
                disabled={!selectedSize}
                whileTap={selectedSize ? { scale: 0.985 } : {}}
                className={`w-full py-4 text-xs tracking-[0.3em] transition-all duration-200 ${
                  added
                    ? 'bg-gray-700 text-white'
                    : selectedSize
                    ? 'bg-[#0a0a0a] text-white hover:bg-gray-800'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {added ? '✓   ADDED TO BAG' : 'ADD TO BAG'}
              </motion.button>

              <button
                onClick={() => setWishlisted((v) => !v)}
                className="w-full py-3.5 text-xs tracking-[0.25em] border border-gray-200 hover:border-black transition-colors flex items-center justify-center gap-2.5"
              >
                <Heart
                  className="w-3.5 h-3.5 transition-all"
                  style={{
                    fill: wishlisted ? '#000' : 'none',
                    color: '#000',
                  }}
                />
                {wishlisted ? 'SAVED TO WISHLIST' : 'SAVE TO WISHLIST'}
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 py-5 border-t border-b border-gray-100 mb-8">
              {[
                { icon: Truck, label: 'Free Delivery', sub: 'on orders over £75' },
                { icon: RotateCcw, label: 'Free Returns', sub: 'within 30 days' },
                { icon: Shield, label: 'Secure Payment', sub: 'encrypted & protected' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center gap-2">
                  <Icon className="w-[1.1rem] h-[1.1rem] text-gray-400" strokeWidth={1.5} />
                  <div>
                    <p className="text-[0.6rem] tracking-[0.15em] uppercase text-gray-600 leading-snug">
                      {label}
                    </p>
                    <p className="text-[0.55rem] text-gray-400 mt-0.5 leading-snug">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Accordion */}
            <div className="divide-y divide-gray-100">
              {ACCORDION_ITEMS.map(({ key, label }) => (
                <div key={key}>
                  <button
                    onClick={() => setOpenSection((prev) => (prev === key ? null : key))}
                    className="w-full flex items-center justify-between py-4 group text-left"
                  >
                    <span className="text-[0.7rem] tracking-[0.25em] text-gray-700 group-hover:text-gray-400 transition-colors">
                      {label}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                        openSection === key ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {openSection === key && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-gray-500 leading-7 pb-5 whitespace-pre-line pr-6">
                          {accordionContent[key]}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Editorial strip ── */}
      <div className="bg-[#f7f5f2] py-14 my-4">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                title: 'Crafted in Europe',
                body: 'Every piece is manufactured in partner workshops across Portugal and Italy, where artisan traditions meet modern precision.',
              },
              {
                title: 'Responsible Materials',
                body: 'We source only GOTS-certified organic cotton, cruelty-free wool, and recycled fibres for a lower environmental footprint.',
              },
              {
                title: 'Considered Packaging',
                body: 'Shipped in 100% recyclable tissue and kraft paper. Zero single-use plastic in every order.',
              },
            ].map(({ title, body }) => (
              <div key={title} className="px-4">
                <div className="w-6 h-px bg-black mx-auto mb-5" />
                <h3 className="text-sm tracking-[0.2em] uppercase mb-3">{title}</h3>
                <p className="text-sm text-gray-500 leading-7">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── You May Also Like ── */}
      {related.length > 0 && (
        <section className="border-t border-gray-100 py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[0.65rem] tracking-[0.35em] text-gray-400 uppercase mb-1">
                  Curated For You
                </p>
                <h2 className="text-2xl font-light">You May Also Like</h2>
              </div>
              <Link
                to={`/products?category=${product.category}`}
                className="text-[0.65rem] tracking-[0.2em] hover:underline text-gray-500 hover:text-black transition-colors"
              >
                VIEW ALL
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  image={p.image}
                  name={p.name}
                  price={p.price}
                  originalPrice={p.originalPrice}
                  badge={p.badge}
                  colors={p.colors}
                  onAddToCart={() =>
                    addItem({
                      id: p.id,
                      name: p.name,
                      price: p.price,
                      image: p.image,
                      color: p.colorNames[0],
                      size: p.sizes[0],
                    })
                  }
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
