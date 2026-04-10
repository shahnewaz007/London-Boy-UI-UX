import { Link } from 'react-router';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { CategoryBanner } from '../components/CategoryBanner';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const menProducts = products.filter((p) => p.category === 'men').slice(0, 4);
const womenProducts = products.filter((p) => p.category === 'women').slice(0, 4);
const socksProducts = products.filter((p) => p.category === 'socks');

export function Home() {
  const { addItem } = useCart();

  return (
    <>
      <Hero />

      {/* Men's Essentials */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs tracking-[0.3em] text-gray-400 mb-1 uppercase">Men's</p>
            <h2 className="text-3xl">Essential Innerwear</h2>
          </div>
          <Link to="/products?category=men" className="text-sm tracking-wider hover:underline">VIEW ALL</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {menProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
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

      {/* Category Banner 1 */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryBanner
          title="The Art of Underdressing"
          subtitle="Precision-cut vests and undershirts in long-staple cotton and micro-modal. Invisible beneath your clothes, exceptional against your skin."
          image="https://images.unsplash.com/photo-1765045768265-e3eb8471fce3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          href="/products?category=men"
        />
      </section>

      {/* Women's Collection */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs tracking-[0.3em] text-gray-400 mb-1 uppercase">Women's</p>
            <h2 className="text-3xl">Camisoles & Shapewear</h2>
          </div>
          <Link to="/products?category=women" className="text-sm tracking-wider hover:underline">EXPLORE</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {womenProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
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

      {/* Sale Banner */}
      <section className="relative overflow-hidden text-white py-24 my-4">
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1660810555665-4e25adde8d7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/72" />

        {/* Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-xs tracking-[0.4em] text-white/50 mb-4 uppercase">Limited Time</p>
              <div className="flex items-baseline gap-4 mb-4">
                <span style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 200, lineHeight: 1 }}>−40%</span>
              </div>
              <h2 className="text-white mb-3" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', fontWeight: 300 }}>Winter Collection Sale</h2>
              <p className="text-white/50 text-sm" style={{ lineHeight: 1.7 }}>Premium thermal sets and winter essentials.<br />While stocks last.</p>
            </div>
            <Link
              to="/products?category=thermal"
              className="inline-flex items-center gap-3 border border-white/40 text-white px-10 py-4 text-xs tracking-[0.25em] hover:bg-white hover:text-black transition-colors whitespace-nowrap"
            >
              SHOP SALE
            </Link>
          </div>
        </div>
      </section>

      {/* Socks */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl">Socks & Accessories</h2>
          <Link to="/products?category=socks" className="text-sm tracking-wider hover:underline">VIEW ALL</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl">
          {socksProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
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

      {/* Category Banner 2 */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryBanner
          title="Form. Function. Femininity."
          subtitle="Camisoles and shapewear designed to move with you — silhouette-refining foundations in breathable, second-skin fabrics."
          image="https://images.unsplash.com/photo-1641724646783-630fc4c12de0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          href="/products?category=women"
          reverse
        />
      </section>

      {/* Newsletter */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-[600px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs tracking-[0.3em] text-gray-400 mb-3 uppercase">Newsletter</p>
          <h2 className="text-3xl mb-3">Stay Connected</h2>
          <p className="text-gray-500 mb-8 text-sm" style={{ lineHeight: 1.7 }}>
            Subscribe to receive exclusive offers, new product launches, and style notes delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-black transition-colors"
            />
            <button className="bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors tracking-[0.15em] text-xs whitespace-nowrap">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
