import { AnimatePresence, motion } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import { COLOR } from '../lib/design';

interface Props {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function CartHoverPanel({ isOpen, onMouseEnter, onMouseLeave }: Props) {
  const { items, totalItems, subtotal } = useCart();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="cart-hover-panel"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{
            position: 'fixed',
            top: 'var(--header-h, 104px)',
            right: 0,
            bottom: 0,
            width: 400,
            background: '#fff',
            borderLeft: '1px solid #e5e5e5',
            zIndex: 9998,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '-4px 0 24px rgba(0,0,0,0.08)',
          }}
          role="dialog"
          aria-label="Shopping Bag"
        >
          {/* Header */}
          <div
            style={{
              padding: '20px 24px 16px',
              borderBottom: '1px solid #e5e5e5',
              flexShrink: 0,
            }}
          >
            <h2 style={{ fontSize: '0.95rem', fontWeight: 400, letterSpacing: '0.02em', margin: 0 }}>
              Shopping Bag
            </h2>
          </div>

          {/* Items list — scrollable */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
            {items.length === 0 ? (
              <p style={{ padding: '24px', fontSize: '0.95rem', color: '#888', textAlign: 'center' }}>
                Your bag is empty.
              </p>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.id}-${item.color}-${item.size}`}
                  style={{
                    display: 'flex',
                    gap: 14,
                    padding: '14px 24px',
                    borderBottom: '1px solid #f0f0f0',
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      flexShrink: 0,
                      width: 72,
                      height: 90,
                      background: '#f5f5f5',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <p style={{ fontSize: '0.95rem', fontWeight: 400, lineHeight: 1.35, margin: 0, color: '#000' }}>
                      {item.name}
                    </p>

                    {/* Prices */}
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      {item.originalPrice ? (
                        <>
                          <span style={{ fontSize: '0.95rem', color: COLOR.accent, fontWeight: 400 }}>
                            £{item.price.toFixed(2)}
                          </span>
                          <span style={{ fontSize: '0.95rem', color: '#999', textDecoration: 'line-through' }}>
                            £{(item as typeof item & { originalPrice?: number }).originalPrice!.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span style={{ fontSize: '0.95rem', color: '#000', fontWeight: 400 }}>
                          £{item.price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 1, marginTop: 2 }}>
                      <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>Colour: {item.color}</p>
                      <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>Size: {item.size}</p>
                      <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer — sticky */}
          {items.length > 0 && (
            <div
              style={{
                flexShrink: 0,
                padding: '16px 24px 24px',
                borderTop: '1px solid #e5e5e5',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              {/* Total */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                <span style={{ fontSize: '0.95rem', color: '#000' }}>
                  Total ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                  <span style={{ fontSize: '0.85rem', color: '#888', marginLeft: 6 }}>inc. VAT</span>
                </span>
                <span style={{ fontSize: '0.95rem', fontWeight: 400 }}>£{subtotal.toFixed(2)}</span>
              </div>

              {/* View Shopping Bag */}
              <Link
                to="/cart"
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'center',
                  padding: '12px 0',
                  border: '1px solid #000',
                  background: '#fff',
                  color: '#000',
                  fontSize: '0.85rem',
                  letterSpacing: '0.1em',
                  textDecoration: 'none',
                  fontWeight: 400,
                }}
              >
                VIEW SHOPPING BAG
              </Link>

              {/* Proceed To Checkout */}
              <button
                onClick={() => navigate('/checkout')}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '12px 0',
                  border: 'none',
                  background: '#000',
                  color: '#fff',
                  fontSize: '0.85rem',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  fontWeight: 400,
                }}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
