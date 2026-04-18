import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, SlidersHorizontal, X, Minus, Plus, Check } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { COLOR, LAYOUT, SIZE, TEXT, TRACKING, WEIGHT } from '../lib/design';

//  Navigation categories (tabs + sidebar) 
const NAV_CATS = [
  { value: 'all',    label: 'All' },
  { value: 'men',    label: "Men's Socks" },
  { value: 'women',  label: "Women's Socks" },
  { value: 'kids',   label: "Kids' Socks" },
  { value: 'new',    label: 'New Arrivals' },
  { value: 'sale',   label: 'Sale' },
];

//  Sidebar sort options (radio buttons) 
const SORT_OPTIONS = [
  { value: 'featured',   label: 'Recommended' },
  { value: 'newest',     label: 'New arrivals' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'price-asc',  label: 'Price: Low to High' },
];

//  Collapsible sidebar section 
function SidebarSection({
  title, open, onToggle, children,
}: {
  title: string; open: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div className="border-b border-gray-100">
      <button
        className="flex items-center justify-between w-full py-4 text-left"
        onClick={onToggle}
      >
        <span style={{ ...TEXT.filterLabel, fontWeight: WEIGHT.semibold, color: COLOR.surfaceDark }}>
          {title}
        </span>
        {open
          ? <Minus className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          : <Plus  className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
        }
      </button>
      {open && <div className="pb-5">{children}</div>}
    </div>
  );
}

//  Checkbox row 
function FilterCheckbox({ label, count, active, onToggle }: {
  label: string; count?: number; active: boolean; onToggle: () => void;
}) {
  return (
    <button onClick={onToggle} className="flex items-center gap-2.5 w-full text-left py-1 group">
      <div
        className="w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-colors"
        style={{
          borderColor:     active ? '#000' : '#d1d5db',
          backgroundColor: active ? '#000' : 'transparent',
        }}
      >
        {active && <Check className="w-2.5 h-2.5 text-white" />}
      </div>
      <span style={{ fontSize: SIZE.body, color: COLOR.primary, fontWeight: active ? WEIGHT.medium : 300 }}>
        {label}
      </span>
      {count !== undefined && (
        <span className="ml-auto" style={{ fontSize: SIZE.label, color: COLOR.textMuted }}>({count})</span>
      )}
    </button>
  );
}

// 
export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterOpen, setFilterOpen]     = useState(false);
  const [sort, setSort]                 = useState('featured');
  const [activeSubcats, setActiveSubcats] = useState<string[]>([]);
  const [activeColors, setActiveColors]   = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(200);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [addedId, setAddedId]   = useState<number | null>(null);
  const { addItem } = useCart();

  const [openSec, setOpenSec] = useState({ sortBy: true, category: true, productType: true, colour: true, price: true });
  const toggleSec = (k: keyof typeof openSec) => setOpenSec((s) => ({ ...s, [k]: !s[k] }));

  const genderParam    = searchParams.get('gender')   || '';
  const filterParam    = searchParams.get('filter')   || '';
  const legacyCatParam = searchParams.get('category') || '';
  const categoryParam  = genderParam || (filterParam === 'new' ? 'new' : filterParam === 'sale' ? 'sale' : legacyCatParam || 'all');
  const pageLabel      = NAV_CATS.find((c) => c.value === categoryParam)?.label ?? 'All Products';

  const setCategory = (cat: string) => {
    if (cat === 'all')       setSearchParams({});
    else if (cat === 'new')  setSearchParams({ filter: 'new' });
    else if (cat === 'sale') setSearchParams({ filter: 'sale' });
    else                     setSearchParams({ gender: cat });
    setActiveSubcats([]);
    setActiveColors([]);
  };

  const toggleSubcat = (s: string) =>
    setActiveSubcats((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  const toggleColor  = (c: string) =>
    setActiveColors((prev)  => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]);
  const toggleWish   = (id: number) =>
    setWishlist((prev)      => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const clearAll = () => {
    setSearchParams({});
    setActiveSubcats([]);
    setActiveColors([]);
    setPriceMin(0);
    setPriceMax(200);
    setSort('featured');
  };

  const handleQuickAdd = (p: typeof products[0]) => {
    addItem({ id: p.id, name: p.name, price: p.price, image: p.image, color: p.colorNames[0], size: p.sizes[0] });
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const baseFiltered = useMemo(() => {
    if (genderParam)                                return products.filter((p) => p.gender === genderParam);
    if (filterParam === 'new')                      return products.filter((p) => p.isNew);
    if (filterParam === 'sale')                     return products.filter((p) => p.isSale);
    if (legacyCatParam && legacyCatParam !== 'all') return products.filter((p) => p.category === legacyCatParam);
    return products;
  }, [genderParam, filterParam, legacyCatParam]);

  const productTypeOptions = useMemo(() => {
    const counts = new Map<string, number>();
    baseFiltered.forEach((p) => counts.set(p.subcategory, (counts.get(p.subcategory) || 0) + 1));
    return Array.from(counts.entries()).map(([label, count]) => ({ label, count }));
  }, [baseFiltered]);

  const sidebarCats = useMemo(() => [
    { value: 'men',   label: "Men's Socks",   count: products.filter((p) => p.gender === 'men').length },
    { value: 'women', label: "Women's Socks", count: products.filter((p) => p.gender === 'women').length },
    { value: 'kids',  label: "Kids' Socks",   count: products.filter((p) => p.gender === 'kids').length },
  ], []);

  const colorOptions = useMemo(() => {
    const hexMap = new Map<string, string>();
    const countMap = new Map<string, number>();
    baseFiltered.forEach((p) => p.colorNames.forEach((name, i) => {
      if (!hexMap.has(name)) hexMap.set(name, p.colors[i]);
      countMap.set(name, (countMap.get(name) || 0) + 1);
    }));
    return Array.from(hexMap.entries()).map(([name, hex]) => ({ name, hex, count: countMap.get(name) || 1 }));
  }, [baseFiltered]);

  const filtered = useMemo(() => {
    let r = baseFiltered;
    if (activeSubcats.length)  r = r.filter((p) => activeSubcats.includes(p.subcategory));
    if (activeColors.length)   r = r.filter((p) => p.colorNames.some((c) => activeColors.includes(c)));
    r = r.filter((p) => p.price >= priceMin && p.price <= priceMax);
    if (sort === 'price-asc')  r = [...r].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') r = [...r].sort((a, b) => b.price - a.price);
    if (sort === 'newest')     r = [...r].filter((p) => p.isNew).concat([...r].filter((p) => !p.isNew));
    return r;
  }, [baseFiltered, activeSubcats, activeColors, priceMin, priceMax, sort]);

  const filterChips = [
    ...(genderParam           ? [{ label: NAV_CATS.find((c) => c.value === genderParam)?.label || genderParam, onRemove: () => { setSearchParams({}); setActiveSubcats([]); } }] : []),
    ...(filterParam === 'new' ? [{ label: 'New Arrivals', onRemove: () => setSearchParams({}) }] : []),
    ...(filterParam === 'sale'? [{ label: 'Sale',         onRemove: () => setSearchParams({}) }] : []),
    ...activeSubcats.map((s)  => ({ label: s, onRemove: () => toggleSubcat(s) })),
    ...activeColors.map((c)   => ({ label: c, onRemove: () => toggleColor(c)  })),
  ];

  //  Sidebar JSX 
  const sidebarJSX = (
    <div>
      {filterChips.length > 0 && (
        <div className="mb-1 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <span style={{ ...TEXT.filterLabel, fontWeight: WEIGHT.semibold, color: COLOR.surfaceDark }}>Active Filters</span>
            <button onClick={clearAll} style={{ fontSize: SIZE.label, color: COLOR.textSecondary, textDecoration: 'underline' }}>Reset All</button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {filterChips.map((chip) => (
              <button key={chip.label} onClick={chip.onRemove} className="flex items-center gap-1 px-2.5 py-1" style={{ fontSize: SIZE.micro, letterSpacing: TRACKING.button, backgroundColor: COLOR.surfaceDark, color: COLOR.inverse }}>
                {chip.label} <X className="w-2.5 h-2.5" />
              </button>
            ))}
          </div>
        </div>
      )}

      <SidebarSection title="Sort By" open={openSec.sortBy} onToggle={() => toggleSec('sortBy')}>
        <div className="space-y-3">
          {SORT_OPTIONS.map((opt) => (
            <button key={opt.value} onClick={() => setSort(opt.value)} className="flex items-center gap-2.5 w-full text-left">
              <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0" style={{ borderColor: COLOR.primary }}>
                {sort === opt.value && <div className="w-2 h-2 rounded-full bg-black" />}
              </div>
              <span style={{ fontSize: SIZE.body, color: COLOR.primary, fontWeight: sort === opt.value ? WEIGHT.medium : 300 }}>{opt.label}</span>
            </button>
          ))}
        </div>
      </SidebarSection>

      <SidebarSection title="Category" open={openSec.category} onToggle={() => toggleSec('category')}>
        <div className="space-y-1">
          {sidebarCats.map((cat) => (
            <FilterCheckbox key={cat.value} label={cat.label} count={cat.count} active={categoryParam === cat.value} onToggle={() => setCategory(categoryParam === cat.value ? 'all' : cat.value)} />
          ))}
        </div>
      </SidebarSection>

      {productTypeOptions.length > 0 && (
        <SidebarSection title="Product Type" open={openSec.productType} onToggle={() => toggleSec('productType')}>
          <div className="space-y-1">
            {productTypeOptions.map(({ label, count }) => (
              <FilterCheckbox key={label} label={label} count={count} active={activeSubcats.includes(label)} onToggle={() => toggleSubcat(label)} />
            ))}
          </div>
        </SidebarSection>
      )}

      {colorOptions.length > 0 && (
        <SidebarSection title="Colour" open={openSec.colour} onToggle={() => toggleSec('colour')}>
          <div className="space-y-1">
            {colorOptions.map(({ name, hex, count }) => {
              const isActive = activeColors.includes(name);
              return (
                <button key={name} onClick={() => toggleColor(name)} className="flex items-center gap-2.5 w-full text-left py-1">
                  <div className="w-5 h-5 flex-shrink-0" style={{ backgroundColor: hex, border: (hex === '#FFFFFF' || hex === '#F5F0E8' || hex === '#F5D5B8') ? '1px solid #d1d5db' : '1px solid transparent', outline: isActive ? '2px solid #000' : '2px solid transparent', outlineOffset: '2px' }} />
                  <span style={{ fontSize: SIZE.body, color: COLOR.primary, fontWeight: isActive ? WEIGHT.medium : 300 }}>{name}</span>
                  <span className="ml-auto" style={{ fontSize: SIZE.label, color: COLOR.textMuted }}>({count})</span>
                </button>
              );
            })}
          </div>
        </SidebarSection>
      )}

      <SidebarSection title="Price Range" open={openSec.price} onToggle={() => toggleSec('price')}>
        <div>
          <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 border border-gray-200 px-2 py-1.5 text-center" style={{ fontSize: SIZE.body, color: COLOR.primary }}>£{priceMin}</div>
            <span style={{ color: COLOR.border }}>—</span>
            <div className="flex-1 border border-gray-200 px-2 py-1.5 text-center" style={{ fontSize: SIZE.body, color: COLOR.primary }}>£{priceMax}</div>
          </div>
          <div className="space-y-3">
            <div>
              <span style={{ ...TEXT.eyebrow, color: COLOR.primary }}>Min</span>
              <input type="range" min={0} max={200} step={5} value={priceMin} onChange={(e) => { const v = +e.target.value; if (v < priceMax) setPriceMin(v); }} className="w-full accent-black mt-1" />
            </div>
            <div>
              <span style={{ ...TEXT.eyebrow, color: COLOR.primary }}>Max</span>
              <input type="range" min={0} max={200} step={5} value={priceMax} onChange={(e) => { const v = +e.target.value; if (v > priceMin) setPriceMax(v); }} className="w-full accent-black mt-1" />
            </div>
          </div>
        </div>
      </SidebarSection>
    </div>
  );

  return (
    <div className="pt-[var(--header-h)] min-h-screen bg-white">

      {/* Page title bar */}
      <div className="border-b border-gray-100">
        <div className={`${LAYOUT.container} ${LAYOUT.px} pt-8 pb-6`}>
          <nav className="flex items-center gap-1.5 mb-3">
            <Link to="/" style={{ fontSize: SIZE.body, color: COLOR.textMuted }} className="hover:text-black transition-colors">Home</Link>
            {categoryParam !== 'all' && (
              <>
                <span style={{ fontSize: SIZE.body, color: COLOR.textMuted }}>›</span>
                <span style={{ fontSize: SIZE.body, color: COLOR.primary }}>{pageLabel}</span>
              </>
            )}
          </nav>
          <div className="flex items-end justify-between">
            <h1 style={{ ...TEXT.pageTitle, lineHeight: 1.1 }}>
              {pageLabel}
            </h1>
            <p style={{ fontSize: SIZE.body, color: COLOR.primary }}>{filtered.length} {filtered.length === 1 ? 'item' : 'items'}</p>
          </div>
        </div>
      </div>

      <div className={`${LAYOUT.container} ${LAYOUT.px} py-8`}>
        <div className="flex gap-8 lg:gap-12">

          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <div className="sticky overflow-y-auto pr-1" style={{ top: 'calc(var(--header-h) + 2rem)', maxHeight: 'calc(100vh - var(--header-h) - 4rem)', scrollbarWidth: 'thin', scrollbarColor: '#e5e7eb transparent' }}>
              {sidebarJSX}
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">

            {/* Category tabs + mobile filter button */}
            <div className="flex items-center gap-3 mb-7">
              <button onClick={() => setFilterOpen(true)} className="lg:hidden flex items-center gap-2 border border-gray-300 px-4 py-2 hover:border-black transition-colors flex-shrink-0" style={{ ...TEXT.buttonLabel, fontWeight: WEIGHT.medium }}>
                <SlidersHorizontal className="w-4 h-4" />
                FILTER{filterChips.length > 0 ? ` (${filterChips.length})` : ''}
              </button>
              <div className="flex items-center gap-1.5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                {NAV_CATS.map((c) => {
                  const isActive = categoryParam === c.value;
                  return (
                    <button key={c.value} onClick={() => setCategory(c.value)} className="flex-shrink-0 px-4 py-1.5 transition-all" style={{ fontSize: SIZE.body, letterSpacing: TRACKING.nav, fontWeight: isActive ? WEIGHT.medium : 300, color: isActive ? COLOR.inverse : COLOR.primary, backgroundColor: isActive ? COLOR.surfaceDark : 'transparent', border: '1px solid', borderColor: isActive ? COLOR.surfaceDark : COLOR.border, whiteSpace: 'nowrap' }}>
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Product grid */}
            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10">
              <AnimatePresence mode="popLayout">
                {filtered.map((product) => (
                  <motion.div key={product.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="group">
                    <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden mb-3">
                      <Link to={`/products/${product.id}`} className="absolute inset-0 z-[1]" aria-label={`View ${product.name}`} />
                      <img src={product.image} alt={product.name} loading="lazy" className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${product.hoverImage ? 'group-hover:opacity-0' : 'group-hover:scale-105'}`} />
                      {product.hoverImage && (
                        <img src={product.hoverImage} alt={product.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
                      )}
                      {product.badge && (
                        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 z-[2]" style={{ ...TEXT.badge, backgroundColor: product.badge === 'SALE' ? COLOR.accent : COLOR.surfaceDark }}>
                          {product.badge}
                        </div>
                      )}
                      <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWish(product.id); }} className="absolute top-2.5 right-2.5 p-1.5 bg-white/90 hover:bg-white transition-colors z-[2]">
                        <Heart className="w-4 h-4" style={{ fill: wishlist.includes(product.id) ? '#000' : 'none', color: '#000' }} />
                      </button>
                      <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleQuickAdd(product); }} className="absolute bottom-0 left-0 right-0 py-2.5 text-white tracking-[0.15em] opacity-0 group-hover:opacity-100 transition-opacity z-[2]" style={{ fontSize: '0.72rem', fontWeight: 500, backgroundColor: addedId === product.id ? '#333' : '#000' }}>
                        {addedId === product.id ? ' ADDED TO BAG' : 'QUICK ADD'}
                      </button>
                    </div>
                    <div>
                      <Link to={`/products/${product.id}`} className="hover:underline block">
                        <h3 style={{ ...TEXT.productName, lineHeight: 1.4 }} className="mb-1">{product.name}</h3>
                      </Link>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span style={TEXT.price}>£{product.price}</span>
                        {product.originalPrice && <span style={{ ...TEXT.priceOriginal, textDecoration: 'line-through' }}>£{product.originalPrice}</span>}
                      </div>
                      {product.colors.length > 1 && (
                        <p style={{ fontSize: SIZE.label, color: COLOR.textSecondary }}>+ {product.colors.length - 1} More Colour{product.colors.length > 2 ? 's' : ''}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
              <div className="text-center py-24">
                <p style={{ fontSize: '0.95rem', color: '#9ca3af' }}>No products match your filters.</p>
                <button onClick={clearAll} className="mt-4 underline" style={{ fontSize: '0.8rem', letterSpacing: '0.15em', color: '#000' }}>CLEAR ALL FILTERS</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-50 lg:hidden" onClick={() => setFilterOpen(false)} />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'tween', duration: 0.28 }} className="fixed left-0 top-0 bottom-0 w-[85vw] max-w-sm bg-white z-50 flex flex-col">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
                <p style={{ ...TEXT.filterLabel, fontWeight: WEIGHT.semibold, color: COLOR.surfaceDark }}>Filters</p>
                <button onClick={() => setFilterOpen(false)}><X className="w-5 h-5" /></button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-4">{sidebarJSX}</div>
              <div className="flex-shrink-0 border-t border-gray-100 p-4">
                <button onClick={() => setFilterOpen(false)} className="w-full bg-black text-white py-3" style={{ ...TEXT.buttonLabel, fontWeight: WEIGHT.medium, letterSpacing: TRACKING.wide }}>
                  VIEW {filtered.length} {filtered.length === 1 ? 'ITEM' : 'ITEMS'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}