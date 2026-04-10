import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Check, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';

type Step = 'shipping' | 'payment' | 'review' | 'confirmed';

const STEPS = [
  { key: 'shipping', label: 'Shipping' },
  { key: 'payment', label: 'Payment' },
  { key: 'review', label: 'Review' },
];

function StepIndicator({ current }: { current: Step }) {
  const idx = STEPS.findIndex((s) => s.key === current);
  return (
    <div className="flex items-center gap-0 mb-10">
      {STEPS.map((step, i) => (
        <div key={step.key} className="flex items-center">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs transition-colors"
              style={{
                backgroundColor: i <= idx ? '#000' : 'transparent',
                color: i <= idx ? '#fff' : '#9CA3AF',
                border: `1px solid ${i <= idx ? '#000' : '#D1D5DB'}`,
              }}
            >
              {i < idx ? <Check className="w-3.5 h-3.5" /> : i + 1}
            </div>
            <span
              className="text-xs tracking-[0.12em] hidden sm:block"
              style={{ color: i <= idx ? '#000' : '#9CA3AF', fontWeight: i === idx ? 500 : 400 }}
            >
              {step.label.toUpperCase()}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className="w-12 sm:w-20 h-px mx-3" style={{ backgroundColor: i < idx ? '#000' : '#E5E7EB' }} />
          )}
        </div>
      ))}
    </div>
  );
}

function InputField({ label, type = 'text', placeholder, half = false }: { label: string; type?: string; placeholder: string; half?: boolean }) {
  return (
    <div className={half ? 'flex-1 min-w-0' : 'w-full'}>
      <label className="block text-xs tracking-[0.15em] text-gray-500 mb-1.5 uppercase">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
      />
    </div>
  );
}

export function Checkout() {
  const [step, setStep] = useState<Step>('shipping');
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const delivery = subtotal >= 50 ? 0 : 4.99;
  const total = subtotal + delivery;

  const handleConfirm = () => {
    clearCart();
    setStep('confirmed');
    window.scrollTo({ top: 0 });
  };

  if (step === 'confirmed') {
    return (
      <div className="pt-16 min-h-screen bg-white flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="w-8 h-8 text-white" />
          </div>
          <p className="text-xs tracking-[0.4em] text-gray-400 mb-3 uppercase">Order Confirmed</p>
          <h1 className="mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 300 }}>
            Thank you.
          </h1>
          <p className="text-gray-500 text-sm mb-2" style={{ lineHeight: 1.7 }}>
            Your order <span style={{ fontWeight: 500, color: '#000' }}>#LB-{Math.floor(Math.random() * 90000) + 10000}</span> has been placed successfully.
          </p>
          <p className="text-gray-400 text-sm mb-10">
            A confirmation will be sent to your email address.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/profile"
              className="inline-flex items-center justify-center gap-2 bg-black text-white px-7 py-3 text-xs tracking-[0.2em] hover:bg-gray-900 transition-colors"
            >
              VIEW ORDERS
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 border border-gray-200 text-black px-7 py-3 text-xs tracking-[0.2em] hover:border-black transition-colors"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-end gap-4">
            <button
              onClick={() => step === 'shipping' ? navigate('/cart') : setStep(step === 'payment' ? 'shipping' : 'payment')}
              className="text-gray-400 hover:text-black transition-colors mb-1"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <p className="text-xs tracking-[0.3em] text-gray-400 mb-1 uppercase">London Boy</p>
              <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 300, letterSpacing: '-0.01em' }}>
                Checkout
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: Form */}
          <div className="flex-1">
            <StepIndicator current={step} />

            <AnimatePresence mode="wait">
              {step === 'shipping' && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="mb-6" style={{ fontSize: '1.1rem', fontWeight: 300, letterSpacing: '0.05em' }}>
                    Delivery Information
                  </h2>

                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <InputField label="First Name" placeholder="James" half />
                      <InputField label="Last Name" placeholder="Wilson" half />
                    </div>
                    <InputField label="Email" type="email" placeholder="james@example.com" />
                    <InputField label="Phone" type="tel" placeholder="+44 7700 000000" />
                    <InputField label="Address Line 1" placeholder="12 Mayfair Lane" />
                    <InputField label="Address Line 2" placeholder="Apartment, suite (optional)" />
                    <div className="flex gap-4">
                      <InputField label="City" placeholder="London" half />
                      <InputField label="Postcode" placeholder="W1K 1AA" half />
                    </div>
                    <div>
                      <label className="block text-xs tracking-[0.15em] text-gray-500 mb-1.5 uppercase">Country</label>
                      <select className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors bg-white appearance-none">
                        <option>United Kingdom</option>
                        <option>France</option>
                        <option>Germany</option>
                        <option>Italy</option>
                        <option>Netherlands</option>
                        <option>Spain</option>
                        <option>Sweden</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 border border-gray-100">
                    <p className="text-xs tracking-wide text-gray-500 mb-3">Delivery Method</p>
                    {[
                      { label: 'Standard UK Delivery', sub: '3–5 working days', price: subtotal >= 50 ? 'Free' : '£4.99' },
                      { label: 'Express Delivery', sub: 'Next working day', price: '£9.99' },
                    ].map((opt, i) => (
                      <label key={i} className="flex items-center gap-3 cursor-pointer py-2">
                        <input type="radio" name="delivery" defaultChecked={i === 0} className="accent-black" />
                        <div className="flex-1">
                          <p className="text-sm">{opt.label}</p>
                          <p className="text-xs text-gray-400">{opt.sub}</p>
                        </div>
                        <span className="text-sm">{opt.price}</span>
                      </label>
                    ))}
                  </div>

                  <button
                    onClick={() => setStep('payment')}
                    className="mt-8 w-full bg-black text-white py-4 flex items-center justify-center gap-2 text-xs tracking-[0.2em] hover:bg-gray-900 transition-colors"
                  >
                    CONTINUE TO PAYMENT <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              )}

              {step === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="mb-6" style={{ fontSize: '1.1rem', fontWeight: 300, letterSpacing: '0.05em' }}>
                    Payment Details
                  </h2>

                  <div className="flex gap-2 mb-6">
                    {['Card', 'PayPal', 'Apple Pay'].map((m) => (
                      <button
                        key={m}
                        className="flex-1 border border-gray-200 py-2.5 text-xs tracking-wide hover:border-black transition-colors"
                        style={{ borderColor: m === 'Card' ? '#000' : undefined }}
                      >
                        {m}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <InputField label="Cardholder Name" placeholder="James Wilson" />
                    <div>
                      <label className="block text-xs tracking-[0.15em] text-gray-500 mb-1.5 uppercase">Card Number</label>
                      <div className="flex items-center border border-gray-200 px-4 py-3 gap-3 focus-within:border-black transition-colors">
                        <input type="text" placeholder="4242 4242 4242 4242" className="flex-1 text-sm focus:outline-none" />
                        <div className="flex gap-1">
                          {['VISA', 'MC'].map((c) => (
                            <span key={c} className="text-xs text-gray-300 tracking-wider">{c}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <InputField label="Expiry" placeholder="MM / YY" half />
                      <InputField label="CVV" placeholder="•••" half />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-6 text-xs text-gray-400">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Your payment information is encrypted and secure.</span>
                  </div>

                  <button
                    onClick={() => setStep('review')}
                    className="mt-8 w-full bg-black text-white py-4 flex items-center justify-center gap-2 text-xs tracking-[0.2em] hover:bg-gray-900 transition-colors"
                  >
                    REVIEW ORDER <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              )}

              {step === 'review' && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="mb-6" style={{ fontSize: '1.1rem', fontWeight: 300, letterSpacing: '0.05em' }}>
                    Review Your Order
                  </h2>

                  <div className="space-y-4 mb-6">
                    {[
                      { label: 'Shipping to', value: '12 Mayfair Lane, London W1K 1AA' },
                      { label: 'Delivery', value: 'Standard UK · 3–5 working days' },
                      { label: 'Payment', value: '•••• •••• •••• 4242' },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between py-3 border-b border-gray-50">
                        <span className="text-xs tracking-wide text-gray-400 uppercase">{row.label}</span>
                        <span className="text-sm text-right max-w-xs">{row.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 p-4 divide-y divide-gray-100">
                    <p className="text-xs tracking-[0.25em] uppercase pb-3 text-gray-500">Items</p>
                    {items.map((item) => (
                      <div key={`${item.id}-${item.color}`} className="flex gap-4 py-3">
                        <img src={item.image} alt={item.name} className="w-14 aspect-[3/4] object-cover bg-gray-100" />
                        <div className="flex-1">
                          <p className="text-sm">{item.name}</p>
                          <p className="text-xs text-gray-400">{item.color} · Size {item.size} · Qty {item.quantity}</p>
                        </div>
                        <p className="text-sm">£{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleConfirm}
                    className="mt-8 w-full bg-black text-white py-4 flex items-center justify-center gap-2 text-xs tracking-[0.2em] hover:bg-gray-900 transition-colors"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    PLACE ORDER — £{total.toFixed(2)}
                  </button>

                  <p className="text-center text-xs text-gray-400 mt-3">
                    By placing your order you agree to our Terms & Privacy Policy.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Mini order summary */}
          <div className="lg:w-72 xl:w-80 flex-shrink-0">
            <div className="border border-gray-100 p-6 sticky top-24">
              <p className="text-xs tracking-[0.3em] uppercase mb-5 text-gray-500">Order Summary</p>
              <div className="space-y-4 mb-5">
                {items.map((item) => (
                  <div key={`${item.id}-${item.color}`} className="flex gap-3">
                    <div className="relative">
                      <img src={item.image} alt={item.name} className="w-14 aspect-[3/4] object-cover bg-gray-50" />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-black text-white rounded-full flex items-center justify-center" style={{ fontSize: '0.6rem' }}>
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs" style={{ fontWeight: 400 }}>{item.name}</p>
                      <p className="text-xs text-gray-400">{item.color} · {item.size}</p>
                      <p className="text-xs mt-1">£{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Delivery</span>
                  <span>{delivery === 0 ? 'Free' : `£${delivery.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span style={{ fontWeight: 500 }}>£{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
