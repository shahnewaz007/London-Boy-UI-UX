import { useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Package, Heart, Settings, ChevronRight, LogOut, ArrowRight, Check, Edit2 } from 'lucide-react';

type Tab = 'orders' | 'wishlist' | 'settings';

const ORDERS = [
  {
    id: 'LB-48291',
    date: 'April 2, 2025',
    status: 'Delivered',
    total: 127,
    items: [
      { name: 'Premium Cotton Vest — White', size: 'M', qty: 2, price: 34, image: 'https://images.unsplash.com/photo-1608568516718-ff5318b81464?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200' },
      { name: 'Silk Camisole — Ivory', size: 'S', qty: 1, price: 59, image: 'https://images.unsplash.com/photo-1629745572658-598ae487d4ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200' },
    ],
  },
  {
    id: 'LB-39847',
    date: 'March 15, 2025',
    status: 'Delivered',
    total: 89,
    items: [
      { name: 'Sculpt Bodysuit — Black', size: 'S', qty: 1, price: 89, image: 'https://images.unsplash.com/photo-1748244191109-cee74e56ec4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200' },
    ],
  },
  {
    id: 'LB-27563',
    date: 'February 28, 2025',
    status: 'Delivered',
    total: 162,
    items: [
      { name: 'Modal Sleeveless Vest — Sand', size: 'L', qty: 2, price: 45, image: 'https://images.unsplash.com/photo-1765045768265-e3eb8471fce3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200' },
      { name: 'Merino Ankle Socks — 3 Pack', size: 'M/L', qty: 2, price: 42, image: 'https://images.unsplash.com/photo-1577988932535-e1f04b4969b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200' },
    ],
  },
];

const WISHLIST = [
  { id: 17, name: 'Merino Thermal Vest', price: 79, image: 'https://images.unsplash.com/photo-1763844072520-e480cb2cec8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400', subcategory: 'Thermal Sets' },
  { id: 3, name: 'Performance Mesh Vest', price: 39, image: 'https://images.unsplash.com/photo-1774803695865-df38602596f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400', subcategory: 'Active Innerwear' },
  { id: 13, name: 'Silk Layer Camisole', price: 75, image: 'https://images.unsplash.com/photo-1766056278842-b754f1e093c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400', subcategory: 'Camisoles & Tanks' },
  { id: 16, name: 'Cashmere Bed Socks', price: 55, image: 'https://images.unsplash.com/photo-1641399050826-9616c90427bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400', subcategory: 'Bed Socks' },
];

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    Delivered: { bg: '#F0FDF4', text: '#166534' },
    Processing: { bg: '#FFF7ED', text: '#9A3412' },
    Shipped: { bg: '#EFF6FF', text: '#1E40AF' },
  };
  const c = colors[status] ?? { bg: '#F9FAFB', text: '#6B7280' };
  return (
    <span className="text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: c.bg, color: c.text, fontWeight: 500 }}>
      {status}
    </span>
  );
}

export function Profile() {
  const [activeTab, setActiveTab] = useState<Tab>('orders');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [savedSettings, setSavedSettings] = useState(false);
  const [wishlisted, setWishlisted] = useState(WISHLIST.map((w) => w.id));

  const TABS = [
    { key: 'orders', label: 'Orders', icon: Package },
    { key: 'wishlist', label: 'Wishlist', icon: Heart },
    { key: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  return (
    <div className="pt-[var(--header-h)] min-h-screen bg-white">
      {/* Profile hero */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl" style={{ fontWeight: 300 }}>J</span>
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] text-gray-400 mb-0.5 uppercase">My Account</p>
              <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 300 }}>James Wilson</h1>
              <p className="text-gray-400 mt-0.5" style={{ fontSize: '0.85rem', fontWeight: 400 }}>james.wilson@example.com · Member since Jan 2024</p>
            </div>
            <button className="ml-auto hidden sm:flex items-center gap-2 text-xs tracking-[0.15em] text-gray-400 hover:text-black transition-colors">
              <LogOut className="w-3.5 h-3.5" />
              SIGN OUT
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-8 pt-8 border-t border-gray-200">
            {[
              { label: 'Orders', value: ORDERS.length },
              { label: 'Wishlist', value: wishlisted.length },
              { label: 'Total Spent', value: `£${ORDERS.reduce((s, o) => s + o.total, 0)}` },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-xl mb-0.5" style={{ fontWeight: 300 }}>{stat.value}</p>
                <p className="text-xs text-gray-400 tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Tabs */}
        <div className="flex gap-0 border-b border-gray-100 mb-10">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="flex items-center gap-2 px-5 py-3.5 text-xs tracking-[0.15em] transition-colors relative"
                style={{ color: activeTab === tab.key ? '#000' : '#9CA3AF', fontWeight: activeTab === tab.key ? 500 : 400 }}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label.toUpperCase()}
                {activeTab === tab.key && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-px bg-black" />
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {/* ORDERS */}
          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {ORDERS.map((order) => (
                <div key={order.id} className="border border-gray-100 overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors text-left"
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  >
                    <div className="flex items-center gap-6">
                      <div>
                      <p style={{ fontWeight: 500, fontSize: '0.95rem' }}>#{order.id}</p>
                      <p className="text-gray-400 mt-0.5" style={{ fontSize: '0.85rem', fontWeight: 400 }}>{order.date}</p>
                      </div>
                      <StatusBadge status={order.status} />
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-500 hidden sm:block" style={{ fontSize: '0.95rem', fontWeight: 400 }}>£{order.total.toFixed(2)}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400 transition-transform" style={{ transform: expandedOrder === order.id ? 'rotate(90deg)' : 'none' }} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedOrder === order.id && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 border-t border-gray-100">
                          <div className="space-y-4 mt-4">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex gap-4">
                                <img src={item.image} alt={item.name} className="w-16 aspect-[3/4] object-cover bg-gray-50" />
                                <div className="flex-1">
                                <p style={{ fontSize: '0.95rem', fontWeight: 400 }}>{item.name}</p>
                                <p className="text-gray-400 mt-0.5" style={{ fontSize: '0.85rem', fontWeight: 400 }}>Size {item.size} · Qty {item.qty}</p>
                                <p className="mt-1" style={{ fontSize: '0.85rem', fontWeight: 400 }}>£{(item.price * item.qty).toFixed(2)}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-3 mt-5 pt-4 border-t border-gray-100">
                            <button className="text-xs tracking-[0.15em] border border-gray-200 px-4 py-2 hover:border-black transition-colors">
                              TRACK ORDER
                            </button>
                            <button className="text-xs tracking-[0.15em] text-gray-400 hover:text-black transition-colors px-4 py-2">
                              REQUEST RETURN
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          )}

          {/* WISHLIST */}
          {activeTab === 'wishlist' && (
            <motion.div
              key="wishlist"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {wishlisted.length === 0 ? (
                <div className="text-center py-20">
                  <Heart className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4" style={{ fontSize: '0.95rem', fontWeight: 400 }}>Your wishlist is empty</p>
                  <Link to="/products" className="text-xs tracking-[0.2em] underline">BROWSE PRODUCTS</Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                  {WISHLIST.filter((w) => wishlisted.includes(w.id)).map((item) => (
                    <div key={item.id} className="group cursor-pointer">
                      <div className="relative aspect-[3/4] bg-gray-50 mb-3 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <button
                          onClick={() => setWishlisted((prev) => prev.filter((i) => i !== item.id))}
                          className="absolute top-3 right-3 p-2 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                        >
                          <Heart className="w-3.5 h-3.5" style={{ fill: '#000' }} />
                        </button>
                        <Link
                          to="/products"
                          className="absolute bottom-0 left-0 right-0 bg-black text-white py-3 text-xs tracking-[0.2em] text-center opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5"
                        >
                          ADD TO BAG <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                      <p className="text-xs text-gray-400 tracking-wider mb-0.5" style={{ fontSize: '0.6rem' }}>{item.subcategory}</p>
                      <p className="group-hover:underline" style={{ fontWeight: 400, fontSize: '0.95rem' }}>{item.name}</p>
                      <p className="mt-0.5" style={{ fontSize: '0.95rem', fontWeight: 400 }}>£{item.price}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* SETTINGS */}
          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-lg"
            >
              <div className="space-y-8">
                {/* Personal */}
                <div>
                  <p className="text-xs tracking-[0.25em] uppercase text-gray-400 mb-4">Personal Information</p>
                  <div className="space-y-4">
                    {[
                      { label: 'First Name', val: 'James' },
                      { label: 'Last Name', val: 'Wilson' },
                      { label: 'Email', val: 'james.wilson@example.com' },
                      { label: 'Phone', val: '+44 7700 123 456' },
                    ].map((f) => (
                      <div key={f.label}>
                        <label className="block text-xs tracking-[0.15em] text-gray-400 mb-1.5 uppercase">{f.label}</label>
                        <div className="flex items-center border border-gray-200 focus-within:border-black transition-colors">
                          <input defaultValue={f.val} className="flex-1 px-4 py-3 focus:outline-none" style={{ fontSize: '0.95rem', fontWeight: 400 }} />
                          <button className="px-4 text-gray-300 hover:text-black transition-colors">
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <p className="text-xs tracking-[0.25em] uppercase text-gray-400 mb-4">Default Address</p>
                  <div className="space-y-4">
                    {[
                      { label: 'Address Line 1', val: '12 Mayfair Lane' },
                      { label: 'City', val: 'London' },
                      { label: 'Postcode', val: 'W1K 1AA' },
                    ].map((f) => (
                      <div key={f.label}>
                        <label className="block text-xs tracking-[0.15em] text-gray-400 mb-1.5 uppercase">{f.label}</label>
                        <input defaultValue={f.val} className="w-full border border-gray-200 px-4 py-3 focus:outline-none focus:border-black transition-colors" style={{ fontSize: '0.95rem', fontWeight: 400 }} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preferences */}
                <div>
                  <p className="text-xs tracking-[0.25em] uppercase text-gray-400 mb-4">Email Preferences</p>
                  <div className="space-y-3">
                    {[
                      { label: 'New arrivals & collections', on: true },
                      { label: 'Sale & exclusive offers', on: true },
                      { label: 'Order updates & tracking', on: true },
                      { label: 'Style editorial & lookbooks', on: false },
                    ].map((pref) => (
                      <label key={pref.label} className="flex items-center justify-between cursor-pointer py-2 border-b border-gray-50">
                        <span className="text-gray-600" style={{ fontSize: '0.95rem', fontWeight: 400 }}>{pref.label}</span>
                        <input type="checkbox" defaultChecked={pref.on} className="accent-black" />
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => { setSavedSettings(true); setTimeout(() => setSavedSettings(false), 2000); }}
                  className="flex items-center gap-2 bg-black text-white px-8 py-3 text-xs tracking-[0.2em] hover:bg-gray-900 transition-colors"
                >
                  {savedSettings ? <><Check className="w-3.5 h-3.5" /> SAVED</> : 'SAVE CHANGES'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
