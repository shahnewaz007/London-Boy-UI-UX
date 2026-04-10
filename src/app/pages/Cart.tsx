import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Minus, Plus, X, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function Cart() {
  const { items, removeItem, updateQuantity, subtotal, totalItems } = useCart();

  const delivery = subtotal >= 50 ? 0 : 4.99;
  const total = subtotal + delivery;

  return (
    <div className="pt-16 min-h-screen bg-white">
      {/* Header strip */}
      <div className="border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-end gap-4">
            <Link to="/products" className="text-gray-400 hover:text-black transition-colors mb-1">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <p className="text-xs tracking-[0.3em] text-gray-400 mb-1 uppercase">London Boy</p>
              <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 300, letterSpacing: '-0.01em' }}>
                Your Bag {totalItems > 0 && <span className="text-gray-400" style={{ fontSize: '0.5em' }}>({totalItems})</span>}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 flex flex-col items-center gap-6"
          >
            <ShoppingBag className="w-16 h-16 text-gray-200" />
            <div>
              <p className="text-gray-500 mb-1">Your bag is empty</p>
              <p className="text-sm text-gray-400">Add some essentials to get started</p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 text-xs tracking-[0.2em] hover:bg-gray-900 transition-colors"
            >
              SHOP NOW <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Items */}
            <div className="flex-1">
              {/* Delivery banner */}
              {subtotal < 50 && (
                <div className="bg-gray-50 border border-gray-100 px-5 py-3.5 mb-6 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" />
                  <p className="text-xs text-gray-600 tracking-wide">
                    Add <span className="text-black" style={{ fontWeight: 500 }}>£{(50 - subtotal).toFixed(2)}</span> more for free UK delivery
                  </p>
                </div>
              )}
              {subtotal >= 50 && (
                <div className="bg-black px-5 py-3.5 mb-6 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                  <p className="text-xs text-white tracking-wide">You qualify for free UK delivery ✓</p>
                </div>
              )}

              <div className="divide-y divide-gray-100">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.color}-${item.size}`}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.25 }}
                      className="py-6"
                    >
                      <div className="flex gap-5">
                        {/* Image */}
                        <div className="w-24 sm:w-28 aspect-[3/4] bg-gray-50 flex-shrink-0 overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-sm mb-1" style={{ fontWeight: 400 }}>{item.name}</h3>
                              <p className="text-xs text-gray-400 tracking-wider">
                                {item.color} · Size {item.size}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.id, item.color, item.size)}
                              className="text-gray-300 hover:text-black transition-colors p-1 -mr-1"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            {/* Quantity */}
                            <div className="flex items-center border border-gray-200">
                              <button
                                onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)}
                                className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-10 text-center text-sm">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
                                className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Price */}
                            <p className="text-sm" style={{ fontWeight: 500 }}>
                              £{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Continue shopping */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 text-xs tracking-[0.2em] text-gray-500 hover:text-black transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  CONTINUE SHOPPING
                </Link>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:w-80 xl:w-96 flex-shrink-0">
              <div className="bg-gray-50 p-6 sticky top-24">
                <p className="text-xs tracking-[0.3em] uppercase mb-6">Order Summary</p>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal ({totalItems} items)</span>
                    <span>£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Delivery</span>
                    <span>{delivery === 0 ? <span className="text-green-700">Free</span> : `£${delivery.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Estimated Duties</span>
                    <span>—</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-sm tracking-wide">Total</span>
                    <span className="text-sm" style={{ fontWeight: 500 }}>£{total.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Including VAT</p>
                </div>

                {/* Promo code */}
                <div className="flex gap-2 mb-6">
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="flex-1 border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                  <button className="border border-black px-4 py-2.5 text-xs tracking-[0.15em] hover:bg-black hover:text-white transition-colors">
                    APPLY
                  </button>
                </div>

                <Link
                  to="/checkout"
                  className="w-full bg-black text-white py-4 flex items-center justify-center gap-2 text-xs tracking-[0.2em] hover:bg-gray-900 transition-colors"
                >
                  CHECKOUT <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <p className="text-center text-xs text-gray-400 mt-4">
                  Secure checkout · Free returns within 30 days
                </p>

                {/* Trust icons */}
                <div className="flex justify-center gap-4 mt-5 pt-5 border-t border-gray-100">
                  {['VISA', 'MC', 'AMEX', 'PAYPAL'].map((m) => (
                    <span key={m} className="text-xs text-gray-300 tracking-wider">{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
