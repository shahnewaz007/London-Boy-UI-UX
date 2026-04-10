import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, SlidersHorizontal, X, ChevronDown, Check } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const CATEGORIES = [
  { value: 'all', label: 'All Products' },
  { value: 'men', label: "Men's" },
  { value: 'women', label: "Women's" },
  { value: 'socks', label: 'Socks' },
  { value: 'thermal', label: 'Thermal' },
];

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
];

const SUBCATEGORIES: Record<string, string[]> = {
  men: ['Vests & Undershirts', 'Active Innerwear'],
  women: ['Camisoles & Tanks', 'Shapewear'],
  socks: ['Dress Socks', 'Ankle Socks', 'Bed Socks'],
  thermal: ['Thermal Sets'],
};

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [sort, setSort] = useState('featured');
  const [sortOpen, setSortOpen] = useState(false);
  const [activeSubcats, setActiveSubcats] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState(200);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const categoryParam = searchParams.get('category') || 'all';
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState<number | null>(null);

  const setCategory = (cat: string) => {
    setSearchParams(cat === 'all' ? {} : { category: cat });
    setActiveSubcats([]);
  };

  const toggleSubcat = (sub: string) => {
    setActiveSubcats((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handleQuickAdd = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: product.colorNames[0],
      size: product.sizes[0],
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const filtered = useMemo(() => {
    let result = products;
    if (categoryParam !== 'all') result = result.filter((p) => p.category === categoryParam);
    if (activeSubcats.length > 0) result = result.filter((p) => activeSubcats.includes(p.subcategory));
    result = result.filter((p) => p.price <= priceMax);
    if (sort === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    if (sort === 'newest') result = [...result].filter((p) => p.isNew).concat([...result].filter((p) => !p.isNew));
    return result;
  }, [categoryParam, activeSubcats, priceMax, sort]);

  const subOptions = SUBCATEGORIES[categoryParam] || [];

  return (
    <div className="pt-16 min-h-screen bg-white">
      {/* Page header */}
      <div className="border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs tracking-[0.3em] text-gray-400 mb-1 uppercase">London Boy</p>
              <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 300, letterSpacing: '-0.01em' }}>
                {CATEGORIES.find((c) => c.value === categoryParam)?.label ?? 'All Products'}
              </h1>
            </div>
            <p className="text-sm text-gray-400 hidden sm:block">{filtered.length} products</p>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-10">
          {/* Sidebar filters — desktop */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              <div>
                <p className="text-xs tracking-[0.25em] uppercase mb-4 text-gray-500">Category</p>
                <div className="space-y-2">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => setCategory(c.value)}
                      className="flex items-center justify-between w-full text-left py-1 group"
                    >
                      <span
                        className="text-sm transition-colors"
                        style={{
                          color: categoryParam === c.value ? '#000' : '#9CA3AF',
                          fontWeight: categoryParam === c.value ? 500 : 400,
                        }}
                      >
                        {c.label}
                      </span>
                      {categoryParam === c.value && <Check className="w-3.5 h-3.5 text-black" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subcategories */}
              {subOptions.length > 0 && (
                <div>
                  <p className="text-xs tracking-[0.25em] uppercase mb-4 text-gray-500">Type</p>
                  <div className="space-y-2">
                    {subOptions.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => toggleSubcat(sub)}
                        className="flex items-center gap-2.5 w-full text-left py-1"
                      >
                        <div
                          className="w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-colors"
                          style={{ borderColor: activeSubcats.includes(sub) ? '#000' : '#D1D5DB', backgroundColor: activeSubcats.includes(sub) ? '#000' : 'transparent' }}
                        >
                          {activeSubcats.includes(sub) && <Check className="w-2.5 h-2.5 text-white" />}
                        </div>
                        <span className="text-sm text-gray-600">{sub}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price */}
              <div>
                <p className="text-xs tracking-[0.25em] uppercase mb-4 text-gray-500">Max Price</p>
                <input
                  type="range"
                  min={20}
                  max={200}
                  step={5}
                  value={priceMax}
                  onChange={(e) => setPriceMax(+e.target.value)}
                  className="w-full accent-black"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-400">£20</span>
                  <span className="text-xs text-black">£{priceMax}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              {/* Mobile filter button */}
              <button
                onClick={() => setFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 text-sm tracking-wider border border-gray-200 px-4 py-2 hover:border-black transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                FILTER
              </button>

              {/* Category tabs — desktop pill */}
              <div className="hidden lg:flex gap-1">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setCategory(c.value)}
                    className="text-xs tracking-[0.12em] px-4 py-1.5 transition-colors"
                    style={{
                      backgroundColor: categoryParam === c.value ? '#000' : 'transparent',
                      color: categoryParam === c.value ? '#fff' : '#6B7280',
                      border: '1px solid',
                      borderColor: categoryParam === c.value ? '#000' : 'transparent',
                    }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen((v) => !v)}
                  className="flex items-center gap-2 text-xs tracking-[0.12em] text-gray-500 hover:text-black transition-colors"
                >
                  SORT: {SORT_OPTIONS.find((s) => s.value === sort)?.label?.toUpperCase()}
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 top-8 bg-white border border-gray-100 shadow-lg z-50 w-52 py-2">
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setSort(opt.value); setSortOpen(false); }}
                        className="flex items-center justify-between w-full px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                      >
                        {opt.label}
                        {sort === opt.value && <Check className="w-3.5 h-3.5 text-black" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Grid */}
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-[3/4] bg-gray-50 mb-3 overflow-hidden">
                      {/* Navigation overlay */}
                      <Link
                        to={`/products/${product.id}`}
                        className="absolute inset-0 z-[1]"
                        aria-label={`View ${product.name}`}
                      />
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {product.badge && (
                        <div
                          className="absolute top-3 left-3 text-white text-xs px-2 py-1 tracking-wider z-[2]"
                          style={{ backgroundColor: product.badge === 'SALE' ? '#000' : '#1a1a1a', fontSize: '0.6rem' }}
                        >
                          {product.badge}
                        </div>
                      )}
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id); }}
                        className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-[2]"
                      >
                        <Heart
                          className="w-3.5 h-3.5"
                          style={{ fill: wishlist.includes(product.id) ? '#000' : 'none', color: '#000' }}
                        />
                      </button>
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleQuickAdd(product); }}
                        className="absolute bottom-0 left-0 right-0 py-3 text-white text-xs tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity z-[2]"
                        style={{ backgroundColor: addedId === product.id ? '#333' : '#000' }}
                      >
                        {addedId === product.id ? '✓ ADDED' : 'QUICK ADD'}
                      </button>
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.15em] text-gray-400 mb-0.5 uppercase" style={{ fontSize: '0.6rem' }}>
                        {product.subcategory}
                      </p>
                      <Link to={`/products/${product.id}`} className="hover:underline block">
                        <h3 className="text-sm mb-1" style={{ fontWeight: 400 }}>{product.name}</h3>
                      </Link>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">£{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">£{product.originalPrice}</span>
                        )}
                      </div>
                      <div className="flex gap-1 mt-2">
                        {product.colors.map((color, idx) => (
                          <div
                            key={idx}
                            title={product.colorNames[idx]}
                            className="w-4 h-4 rounded-full border border-gray-200 cursor-pointer hover:scale-110 transition-transform"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
              <div className="text-center py-24">
                <p className="text-gray-400 tracking-wider text-sm">No products match your filters.</p>
                <button onClick={() => { setCategory('all'); setActiveSubcats([]); setPriceMax(200); }} className="mt-4 text-xs tracking-[0.2em] underline text-black">
                  CLEAR FILTERS
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50 lg:hidden"
              onClick={() => setFilterOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <p className="text-xs tracking-[0.3em] uppercase">Filters</p>
                <button onClick={() => setFilterOpen(false)}><X className="w-5 h-5" /></button>
              </div>

              <div className="space-y-8">
                <div>
                  <p className="text-xs tracking-[0.25em] uppercase mb-4 text-gray-500">Category</p>
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => { setCategory(c.value); setFilterOpen(false); }}
                      className="flex items-center justify-between w-full py-2 text-sm border-b border-gray-50"
                      style={{ fontWeight: categoryParam === c.value ? 500 : 400, color: categoryParam === c.value ? '#000' : '#6B7280' }}
                    >
                      {c.label}
                      {categoryParam === c.value && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>

                {subOptions.length > 0 && (
                  <div>
                    <p className="text-xs tracking-[0.25em] uppercase mb-4 text-gray-500">Type</p>
                    {subOptions.map((sub) => (
                      <button key={sub} onClick={() => toggleSubcat(sub)} className="flex items-center gap-3 w-full py-2 text-sm border-b border-gray-50">
                        <div className="w-4 h-4 border flex items-center justify-center" style={{ borderColor: activeSubcats.includes(sub) ? '#000' : '#D1D5DB', backgroundColor: activeSubcats.includes(sub) ? '#000' : 'transparent' }}>
                          {activeSubcats.includes(sub) && <Check className="w-2.5 h-2.5 text-white" />}
                        </div>
                        {sub}
                      </button>
                    ))}
                  </div>
                )}

                <div>
                  <p className="text-xs tracking-[0.25em] uppercase mb-4 text-gray-500">Max Price: £{priceMax}</p>
                  <input type="range" min={20} max={200} step={5} value={priceMax} onChange={(e) => setPriceMax(+e.target.value)} className="w-full accent-black" />
                </div>

                <button onClick={() => setFilterOpen(false)} className="w-full bg-black text-white py-3 text-xs tracking-[0.2em]">
                  APPLY FILTERS ({filtered.length})
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
