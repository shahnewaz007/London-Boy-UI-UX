import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'react-router';
import { useCart } from '../context/CartContext';

export function AddedToBagNotification() {
  const { lastAdded, clearLastAdded } = useCart();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (lastAdded) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => clearLastAdded(), 4000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [lastAdded, clearLastAdded]);

  return (
    <AnimatePresence>
      {lastAdded && (
        <motion.div
          key="added-to-bag"
          initial={{ opacity: 1, y: '-100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 1, y: '-100%' }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: 'fixed',
            top: 'var(--header-h, 104px)',
            right: 0,
            zIndex: 9999,
            width: 420,
            background: '#fff',
            borderLeft: '1px solid #e5e5e5',
            borderBottom: '1px solid #e5e5e5',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          }}
          role="status"
          aria-live="polite"
        >
          {/* Header bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px 14px',
              borderBottom: '1px solid #e5e5e5',
            }}
          >
            <span style={{ fontSize: '0.95rem', fontWeight: 500, letterSpacing: '0.04em' }}>
              Added To Bag
            </span>
            <button
              onClick={clearLastAdded}
              aria-label="Close notification"
              style={{ lineHeight: 0, background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
            >
              <X size={16} strokeWidth={1.5} />
            </button>
          </div>

          {/* Body */}
          <div style={{ display: 'flex', gap: 18, padding: '18px 20px 20px' }}>
            {/* Product image */}
            <div
              style={{
                flexShrink: 0,
                width: 110,
                height: 138,
                background: '#f5f5f5',
                overflow: 'hidden',
              }}
            >
              <img
                src={lastAdded.image}
                alt={lastAdded.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Details */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, paddingTop: 2 }}>
              <p
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 400,
                  lineHeight: 1.35,
                  margin: 0,
                  color: '#000',
                }}
              >
                {lastAdded.name}
              </p>
              <p style={{ fontSize: '0.95rem', fontWeight: 400, margin: 0, color: '#000' }}>
                £{lastAdded.price.toFixed(2)}
              </p>
              <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <p style={{ fontSize: '0.85rem', color: '#555', margin: 0 }}>
                  Colour: {lastAdded.color}
                </p>
                <p style={{ fontSize: '0.85rem', color: '#555', margin: 0 }}>
                  Size: {lastAdded.size}
                </p>
                <p style={{ fontSize: '0.85rem', color: '#555', margin: 0 }}>Quantity: 1</p>
              </div>
            </div>
          </div>

          {/* View Bag CTA */}
          <div style={{ padding: '0 20px 20px' }}>
            <Link
              to="/cart"
              onClick={clearLastAdded}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'center',
                padding: '11px 0',
                background: '#000',
                color: '#fff',
                fontSize: '0.85rem',
                letterSpacing: '0.08em',
                textDecoration: 'none',
                fontWeight: 400,
              }}
            >
              VIEW BAG
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
