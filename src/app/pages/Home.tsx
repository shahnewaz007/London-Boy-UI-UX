import { Link } from 'react-router';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { CategoryBanner } from '../components/CategoryBanner';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { TEXT, LAYOUT } from '../lib/design';

const menSocksProducts = products.filter((p) => p.category === 'socks' && p.gender === 'men').slice(0, 4);
const womenSocksProducts = products.filter((p) => p.category === 'socks' && p.gender === 'women').slice(0, 4);
const kidsSocksProducts = products.filter((p) => p.category === 'socks' && p.gender === 'kids').slice(0, 4);

export function Home() {
  const { addItem } = useCart();

  return (
    <>
      <Hero />

      {/* ── Men's Socks ─────────────────────────────────────────────── */}
      <section className={`${LAYOUT.container} ${LAYOUT.px} ${LAYOUT.sectionY}`}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="mb-1" style={TEXT.eyebrow}>Men's</p>
            <h2 style={TEXT.sectionTitle}>Men's Socks</h2>
          </div>
          <Link to="/products?gender=men" style={TEXT.ctaLink} className="hover:underline">VIEW ALL</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {menSocksProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              hoverImage={product.hoverImage}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              badge={product.badge}
              colors={product.colors}
              onAddToCart={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image, color: product.colorNames[0], size: product.sizes[0] })}
            />
          ))}
        </div>
      </section>

      {/* ── Editorial Banner 1 — Men ────────────────────────────────── */}
      <section className={`${LAYOUT.container} ${LAYOUT.px} ${LAYOUT.sectionYSm}`}>
        <CategoryBanner
          title="Step Into Comfort"
          subtitle="Premium men's socks in merino wool, Egyptian cotton, and bamboo. Engineered for all-day wear — from desk to gym to everything in between."
          image="https://images.unsplash.com/photo-1738700347451-7b680aaf42f0?q=80&w=1080&auto=format&fit=crop"
          href="/products?gender=men"
        />
      </section>

      {/* ── Women's Socks ───────────────────────────────────────────── */}
      <section className={`${LAYOUT.container} ${LAYOUT.px} ${LAYOUT.sectionY}`}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="mb-1" style={TEXT.eyebrow}>Women's</p>
            <h2 style={TEXT.sectionTitle}>Women's Socks</h2>
          </div>
          <Link to="/products?gender=women" style={TEXT.ctaLink} className="hover:underline">EXPLORE</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {womenSocksProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              hoverImage={product.hoverImage}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              badge={product.badge}
              colors={product.colors}
              onAddToCart={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image, color: product.colorNames[0], size: product.sizes[0] })}
            />
          ))}
        </div>
      </section>

      {/* ── Editorial Banner 2 — Women ──────────────────────────────── */}
      <section className={`${LAYOUT.container} ${LAYOUT.px} ${LAYOUT.sectionYSm}`}>
        <CategoryBanner
          title="Elegance, Every Step."
          subtitle="Women's socks in cashmere, merino, and delicate sheers — designed to feel as beautiful as they look, from morning to evening."
          image="https://images.unsplash.com/photo-1641482851820-bd7f7589f62b?q=80&w=1170&auto=format&fit=crop"
          href="/products?gender=women"
          reverse
        />
      </section>

      {/* ── Kids' Socks ─────────────────────────────────────────────── */}
      <section className={`${LAYOUT.container} ${LAYOUT.px} ${LAYOUT.sectionY}`}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="mb-1" style={TEXT.eyebrow}>Kids'</p>
            <h2 style={TEXT.sectionTitle}>Kids' Socks</h2>
          </div>
          <Link to="/products?gender=kids" style={TEXT.ctaLink} className="hover:underline">VIEW ALL</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {kidsSocksProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              hoverImage={product.hoverImage}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              badge={product.badge}
              colors={product.colors}
              onAddToCart={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image, color: product.colorNames[0], size: product.sizes[0] })}
            />
          ))}
        </div>
      </section>

    </>
  );
}
