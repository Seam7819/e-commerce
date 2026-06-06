import { useState, useEffect } from "react";

const products = [
  { id: 1, name: "Obsidian Desk Lamp", price: 129, category: "Lighting", rating: 4.8, reviews: 124, badge: "Bestseller", img: "🪔", desc: "Minimalist matte black lamp with adjustable arm and warm LED." },
  { id: 2, name: "Ivory Linen Throw", price: 89, category: "Textiles", rating: 4.6, reviews: 87, badge: "New", img: "🧣", desc: "Handwoven 100% linen throw blanket in natural ivory tones." },
  { id: 3, name: "Ceramic Pour-Over Set", price: 64, category: "Kitchen", rating: 4.9, reviews: 210, badge: "Top Rated", img: "☕", desc: "Artisanal ceramic pour-over dripper with matching mug." },
  { id: 4, name: "Walnut Floating Shelf", price: 155, category: "Furniture", rating: 4.7, reviews: 63, badge: null, img: "🪵", desc: "Solid walnut shelf with invisible wall mount hardware." },
  { id: 5, name: "Lava Stone Diffuser", price: 48, category: "Wellness", rating: 4.5, reviews: 199, badge: "Sale", img: "🌿", desc: "Natural lava stone ultrasonic aroma diffuser, 400ml." },
  { id: 6, name: "Brass Desk Organizer", price: 72, category: "Office", rating: 4.8, reviews: 156, badge: "New", img: "🗂️", desc: "Polished brass desk organizer with modular compartments." },
  { id: 7, name: "Handmade Soy Candle", price: 38, category: "Wellness", rating: 4.7, reviews: 341, badge: "Bestseller", img: "🕯️", desc: "100% soy wax candle with cedarwood & vanilla fragrance." },
  { id: 8, name: "Terracotta Planter Set", price: 95, category: "Decor", rating: 4.6, reviews: 78, badge: null, img: "🪴", desc: "Set of 3 handcrafted terracotta planters in varying sizes." },
];

const categories = ["All", "Lighting", "Textiles", "Kitchen", "Furniture", "Wellness", "Office", "Decor"];

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

function StarRating({ rating }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
      {[1, 2, 3, 4, 5].map(s => (
        <span key={s} style={{ fontSize: 13, color: s <= Math.round(rating) ? "#d97706" : "#d1d5db" }}>★</span>
      ))}
      <span style={{ fontSize: 12, color: "#6b7280", marginLeft: 4 }}>{rating}</span>
    </div>
  );
}

function ProductCard({ product, onAdd, inCart }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 16,
        border: "1px solid #f0ece6",
        overflow: "hidden",
        transition: "box-shadow 0.2s, transform 0.2s",
        boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.10)" : "0 2px 8px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-4px)" : "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{
        background: "linear-gradient(135deg, #fdf8f4 0%, #f5ede3 100%)",
        height: 160,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 64,
        position: "relative",
        flexShrink: 0,
      }}>
        {product.img}
        {product.badge && (
          <span style={{
            position: "absolute", top: 10, left: 10,
            background: product.badge === "Sale" ? "#ef4444" : product.badge === "New" ? "#3b82f6" : product.badge === "Top Rated" ? "#10b981" : "#f59e0b",
            color: "#fff", fontSize: 10, fontWeight: 700,
            padding: "3px 9px", borderRadius: 20,
            letterSpacing: "0.05em", textTransform: "uppercase",
          }}>{product.badge}</span>
        )}
      </div>
      <div style={{ padding: "14px 16px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
        <span style={{ fontSize: 10, color: "#a8906e", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{product.category}</span>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: "#1a1109", margin: 0, lineHeight: 1.3 }}>{product.name}</h3>
        <p style={{ fontSize: 12, color: "#78716c", margin: 0, lineHeight: 1.5, flex: 1 }}>{product.desc}</p>
        <StarRating rating={product.rating} />
        <span style={{ fontSize: 11, color: "#a1a1aa" }}>{product.reviews} reviews</span>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#1a1109" }}>${product.price}</span>
          <button
            onClick={() => onAdd(product)}
            style={{
              background: inCart ? "#1a1109" : "#c9a97a",
              color: "#fff", border: "none", borderRadius: 10,
              padding: "7px 14px", fontSize: 12, fontWeight: 600,
              cursor: "pointer", transition: "background 0.15s",
              letterSpacing: "0.03em", whiteSpace: "nowrap",
            }}
          >
            {inCart ? "✓ Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Cart({ cart, onClose, onRemove, onCheckout, isMobile }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <div style={{
      position: "fixed", top: 0, right: 0, bottom: 0,
      width: isMobile ? "100vw" : 380,
      background: "#fff",
      boxShadow: "-8px 0 40px rgba(0,0,0,0.12)",
      zIndex: 1000, display: "flex", flexDirection: "column",
    }}>
      <div style={{ padding: "20px 20px 14px", borderBottom: "1px solid #f0ece6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, margin: 0, color: "#1a1109" }}>Your Cart</h2>
        <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#78716c", padding: "4px 8px" }}>✕</button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 20px" }}>
        {cart.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#a1a1aa" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🛍️</div>
            <p style={{ fontSize: 15 }}>Your cart is empty</p>
          </div>
        ) : cart.map(item => (
          <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid #f5f0eb" }}>
            <div style={{ width: 48, height: 48, background: "#fdf8f4", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{item.img}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, fontWeight: 700, color: "#1a1109", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</p>
              <p style={{ fontSize: 12, color: "#a8906e", margin: "2px 0 0" }}>${item.price} × {item.qty}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
              <span style={{ fontWeight: 700, color: "#1a1109", fontSize: 14 }}>${item.price * item.qty}</span>
              <button onClick={() => onRemove(item.id)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 11, padding: 0 }}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div style={{ padding: "18px 20px", borderTop: "1px solid #f0ece6" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
            <span style={{ fontSize: 14, color: "#78716c" }}>Total</span>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#1a1109" }}>${total}</span>
          </div>
          <button onClick={onCheckout} style={{
            width: "100%", background: "#1a1109", color: "#f5ede3",
            border: "none", borderRadius: 12, padding: "14px",
            fontSize: 15, fontWeight: 700, cursor: "pointer", letterSpacing: "0.04em",
          }}>Checkout →</button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const width = useWindowWidth();
  const isMobile = width < 640;
  const isTablet = width < 1024;

  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [page, setPage] = useState("home");
  const [orderDone, setOrderDone] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const filtered = products.filter(p =>
    (category === "All" || p.category === category) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
  );

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setToast(product.name);
    setTimeout(() => setToast(null), 2200);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const handleCheckout = () => {
    setCart([]);
    setCartOpen(false);
    setOrderDone(true);
    setTimeout(() => setOrderDone(false), 4000);
  };

  const navLinks = ["Shop", "About", "Contact"];

  const px = isMobile ? "16px" : isTablet ? "24px" : "40px";

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", background: "#faf7f3" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* ── NAVBAR ── */}
      <nav style={{
        background: "#1a1109", position: "sticky", top: 0, zIndex: 100,
        padding: `0 ${px}`, height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <button onClick={() => { setPage("home"); setMobileMenuOpen(false); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 18 : 22, fontWeight: 800, color: "#c9a97a", letterSpacing: "-0.02em" }}>MAISON</span>
        </button>

        {/* Desktop nav links */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: isTablet ? 16 : 28 }}>
            {navLinks.map(link => (
              <button key={link} onClick={() => setPage(link.toLowerCase())} style={{
                background: "none", border: "none",
                color: page === link.toLowerCase() ? "#c9a97a" : "#d6cfc4",
                fontSize: 13, fontWeight: 500, cursor: "pointer",
                letterSpacing: "0.06em", textTransform: "uppercase", transition: "color 0.15s",
              }}>{link}</button>
            ))}
          </div>
        )}

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 12 }}>
          {/* Search — desktop inline, mobile icon */}
          {!isMobile ? (
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage("home"); }}
              placeholder="Search..."
              style={{
                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 8, padding: "6px 12px", color: "#fff", fontSize: 13,
                width: isTablet ? 150 : 200, outline: "none",
              }}
            />
          ) : (
            <button onClick={() => setSearchOpen(v => !v)} style={{ background: "none", border: "none", color: "#d6cfc4", fontSize: 20, cursor: "pointer", padding: "4px" }}>🔍</button>
          )}

          {/* Cart button */}
          <button onClick={() => setCartOpen(true)} style={{
            background: "#c9a97a", border: "none", borderRadius: 10,
            padding: isMobile ? "7px 12px" : "7px 16px",
            cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
            color: "#1a1109", fontWeight: 700, fontSize: 13,
          }}>
            🛍️
            {cartCount > 0 && (
              <span style={{
                background: "#1a1109", color: "#c9a97a", borderRadius: "50%",
                width: 18, height: 18, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 10, fontWeight: 700,
              }}>{cartCount}</span>
            )}
          </button>

          {/* Mobile hamburger */}
          {isMobile && (
            <button onClick={() => setMobileMenuOpen(v => !v)} style={{ background: "none", border: "none", color: "#d6cfc4", fontSize: 22, cursor: "pointer", padding: "4px" }}>
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile search bar */}
      {isMobile && searchOpen && (
        <div style={{ background: "#2d1f0e", padding: "10px 16px" }}>
          <input
            autoFocus
            value={search}
            onChange={e => { setSearch(e.target.value); setPage("home"); }}
            placeholder="Search products..."
            style={{
              width: "100%", background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8,
              padding: "8px 14px", color: "#fff", fontSize: 14,
              outline: "none", boxSizing: "border-box",
            }}
          />
        </div>
      )}

      {/* Mobile menu dropdown */}
      {isMobile && mobileMenuOpen && (
        <div style={{ background: "#2d1f0e", padding: "8px 0", borderBottom: "1px solid rgba(201,169,122,0.2)" }}>
          {navLinks.map(link => (
            <button key={link} onClick={() => { setPage(link.toLowerCase()); setMobileMenuOpen(false); }} style={{
              display: "block", width: "100%", background: "none", border: "none",
              color: page === link.toLowerCase() ? "#c9a97a" : "#d6cfc4",
              fontSize: 15, fontWeight: 500, cursor: "pointer",
              padding: "12px 20px", textAlign: "left",
              letterSpacing: "0.06em", textTransform: "uppercase",
            }}>{link}</button>
          ))}
        </div>
      )}

      {/* ── HOME PAGE ── */}
      {page === "home" && (
        <>
          {/* Hero */}
          <div style={{
            background: "linear-gradient(135deg, #1a1109 0%, #2d1f0e 50%, #3d2910 100%)",
            padding: isMobile ? "48px 16px 40px" : isTablet ? "64px 24px" : "80px 40px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: isMobile ? 32 : 40,
          }}>
            <div style={{ maxWidth: 540, textAlign: isMobile ? "center" : "left" }}>
              <p style={{ color: "#c9a97a", fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>Curated Home Goods</p>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: isMobile ? 36 : isTablet ? 44 : 54,
                fontWeight: 800, color: "#fdf8f4", lineHeight: 1.1, marginBottom: 18,
              }}>
                Objects Made to Last a Lifetime
              </h1>
              <p style={{ color: "#c4b49e", fontSize: isMobile ? 14 : 16, lineHeight: 1.7, marginBottom: 28, maxWidth: 420, margin: isMobile ? "0 auto 28px" : "0 0 28px" }}>
                We source exceptional everyday objects from artisans around the world — crafted with intention, built to endure.
              </p>
              <button
                onClick={() => document.getElementById("shop-section").scrollIntoView({ behavior: "smooth" })}
                style={{
                  background: "#c9a97a", color: "#1a1109", border: "none", borderRadius: 12,
                  padding: isMobile ? "12px 24px" : "14px 32px",
                  fontSize: isMobile ? 14 : 15, fontWeight: 700, cursor: "pointer", letterSpacing: "0.04em",
                }}
              >Shop the Collection →</button>
            </div>

            {/* Hero emoji grid — hide on mobile */}
            {!isMobile && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, flexShrink: 0 }}>
                {products.slice(0, 4).map(p => (
                  <div key={p.id} style={{
                    background: "rgba(255,255,255,0.06)", borderRadius: 14, padding: "16px",
                    width: isTablet ? 90 : 110, height: isTablet ? 90 : 110,
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", gap: 6,
                    border: "1px solid rgba(201,169,122,0.2)",
                  }}>
                    <span style={{ fontSize: isTablet ? 30 : 36 }}>{p.img}</span>
                    <span style={{ fontSize: 10, color: "#c4b49e", textAlign: "center", fontWeight: 500 }}>{p.name.split(" ").slice(0, 2).join(" ")}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Stats Banner */}
          <div style={{
            background: "#c9a97a",
            padding: isMobile ? "16px 12px" : "20px 40px",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: isMobile ? "16px 24px" : "0 80px",
          }}>
            {[["2,400+", "Happy Customers"], ["100%", "Handcrafted"], ["Free", "Shipping $100+"], ["30-day", "Returns"]].map(([val, label]) => (
              <div key={label} style={{ textAlign: "center", minWidth: isMobile ? "40%" : "auto" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 18 : 22, fontWeight: 800, color: "#1a1109" }}>{val}</div>
                <div style={{ fontSize: isMobile ? 10 : 12, color: "#5c3d1a", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Shop Section */}
          <div id="shop-section" style={{ padding: isMobile ? "32px 16px" : isTablet ? "48px 24px" : "60px 40px" }}>
            {/* Header + filters */}
            <div style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "flex-start" : "center",
              justifyContent: "space-between",
              gap: 16,
              marginBottom: 28,
            }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 26 : 34, fontWeight: 800, color: "#1a1109", margin: 0 }}>
                {search ? `Results for "${search}"` : "The Collection"}
              </h2>
              {/* Category scroll on mobile */}
              <div style={{
                display: "flex", gap: 8, flexWrap: isMobile ? "nowrap" : "wrap",
                overflowX: isMobile ? "auto" : "visible",
                paddingBottom: isMobile ? 4 : 0,
                width: isMobile ? "100%" : "auto",
              }}>
                {categories.map(cat => (
                  <button key={cat} onClick={() => setCategory(cat)} style={{
                    background: category === cat ? "#1a1109" : "#fff",
                    color: category === cat ? "#c9a97a" : "#78716c",
                    border: "1px solid " + (category === cat ? "#1a1109" : "#e5e0d8"),
                    borderRadius: 20, padding: "5px 14px", fontSize: 12,
                    fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
                    transition: "all 0.15s", flexShrink: 0,
                  }}>{cat}</button>
                ))}
              </div>
            </div>

            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0", color: "#a1a1aa" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
                <p>No products found. Try a different search.</p>
              </div>
            ) : (
              <div style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "repeat(2, 1fr)"
                  : isTablet
                    ? "repeat(3, 1fr)"
                    : "repeat(4, 1fr)",
                gap: isMobile ? 12 : 20,
              }}>
                {filtered.map(p => (
                  <ProductCard key={p.id} product={p} onAdd={addToCart} inCart={cart.some(i => i.id === p.id)} />
                ))}
              </div>
            )}
          </div>

          {/* Features */}
          <div style={{ background: "#1a1109", padding: isMobile ? "48px 16px" : isTablet ? "56px 24px" : "60px 40px" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 26 : 32, color: "#fdf8f4", textAlign: "center", marginBottom: 36, fontWeight: 800 }}>Why Choose Maison</h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
              gap: isMobile ? 12 : 20,
              maxWidth: 900, margin: "0 auto",
            }}>
              {[
                ["🎨", "Artisan Crafted", "Each piece made by skilled craftspeople using traditional techniques."],
                ["🌍", "Ethically Sourced", "We partner with fair-trade certified suppliers worldwide."],
                ["♻️", "Sustainable", "Natural, renewable, and recycled materials only."],
                ["💫", "Lifetime Quality", "Built to last decades, not seasons."],
              ].map(([icon, title, desc]) => (
                <div key={title} style={{
                  background: "rgba(201,169,122,0.08)", borderRadius: 16,
                  padding: isMobile ? "20px 14px" : "28px 20px",
                  border: "1px solid rgba(201,169,122,0.15)", textAlign: "center",
                }}>
                  <div style={{ fontSize: isMobile ? 28 : 36, marginBottom: 10 }}>{icon}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#c9a97a", fontSize: isMobile ? 14 : 17, fontWeight: 700, marginBottom: 6 }}>{title}</h3>
                  <p style={{ color: "#c4b49e", fontSize: isMobile ? 11 : 13, lineHeight: 1.6, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ── SHOP PAGE ── */}
      {page === "shop" && (
        <div style={{ padding: isMobile ? "32px 16px" : isTablet ? "48px 24px" : "60px 40px" }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 30 : 42, fontWeight: 800, color: "#1a1109", marginBottom: 6 }}>The Collection</h1>
          <p style={{ color: "#78716c", fontSize: 14, marginBottom: 28 }}>Handpicked objects for the modern home.</p>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : isTablet ? "repeat(3, 1fr)" : "repeat(4, 1fr)",
            gap: isMobile ? 12 : 20,
          }}>
            {products.map(p => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} inCart={cart.some(i => i.id === p.id)} />
            ))}
          </div>
        </div>
      )}

      {/* ── ABOUT PAGE ── */}
      {page === "about" && (
        <div style={{ padding: isMobile ? "40px 16px" : isTablet ? "60px 24px" : "80px 40px", maxWidth: 800, margin: "0 auto" }}>
          <p style={{ color: "#c9a97a", fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Our Story</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 32 : 48, fontWeight: 800, color: "#1a1109", marginBottom: 24, lineHeight: 1.1 }}>Built on the Belief That Objects Matter</h1>
          <p style={{ fontSize: isMobile ? 14 : 16, color: "#57534e", lineHeight: 1.8, marginBottom: 18 }}>Maison was founded in 2018 by two designers who were tired of mass-produced, disposable homewares. We believe that the objects you surround yourself with shape how you feel every day.</p>
          <p style={{ fontSize: isMobile ? 14 : 16, color: "#57534e", lineHeight: 1.8, marginBottom: 18 }}>Every product in our collection is sourced directly from artisans — makers who have devoted their lives to mastering their craft. We travel the world to find these creators, build long-term relationships, and ensure fair compensation.</p>
          <p style={{ fontSize: isMobile ? 14 : 16, color: "#57534e", lineHeight: 1.8 }}>When you buy from Maison, you're not just getting a beautiful object. You're supporting a tradition, a family, and a way of making things that the world is at risk of losing.</p>
          <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: isMobile ? 12 : 24 }}>
            {[["2018", "Founded"], ["47", "Artisan Partners"], ["2,400+", "Customers"]].map(([num, label]) => (
              <div key={label} style={{ background: "#fff", borderRadius: 16, padding: isMobile ? "20px 12px" : "28px", border: "1px solid #f0ece6", textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 26 : 36, fontWeight: 800, color: "#c9a97a" }}>{num}</div>
                <div style={{ fontSize: isMobile ? 11 : 13, color: "#78716c", fontWeight: 600, marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── CONTACT PAGE ── */}
      {page === "contact" && (
        <div style={{ padding: isMobile ? "40px 16px" : isTablet ? "60px 24px" : "80px 40px", maxWidth: 600, margin: "0 auto" }}>
          <p style={{ color: "#c9a97a", fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Get in Touch</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 30 : 44, fontWeight: 800, color: "#1a1109", marginBottom: 28, lineHeight: 1.1 }}>We'd Love to Hear From You</h1>
          <div style={{ background: "#fff", borderRadius: 20, padding: isMobile ? "24px 16px" : "36px", border: "1px solid #f0ece6", display: "flex", flexDirection: "column", gap: 18 }}>
            {["Name", "Email"].map(f => (
              <div key={f}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#57534e", display: "block", marginBottom: 6 }}>{f}</label>
                <input type={f === "Email" ? "email" : "text"} placeholder={`Your ${f.toLowerCase()}`} style={{
                  width: "100%", padding: "10px 14px", border: "1px solid #e5e0d8",
                  borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box", color: "#1a1109",
                }} />
              </div>
            ))}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#57534e", display: "block", marginBottom: 6 }}>Message</label>
              <textarea rows={4} placeholder="How can we help?" style={{
                width: "100%", padding: "10px 14px", border: "1px solid #e5e0d8",
                borderRadius: 10, fontSize: 14, outline: "none", resize: "vertical",
                boxSizing: "border-box", color: "#1a1109",
              }} />
            </div>
            <button style={{
              background: "#1a1109", color: "#c9a97a", border: "none", borderRadius: 12,
              padding: "14px", fontSize: 15, fontWeight: 700, cursor: "pointer", letterSpacing: "0.04em",
            }}>Send Message →</button>
          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0f0a06", padding: isMobile ? "32px 16px 20px" : "40px 40px 24px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "2fr 1fr 1fr 1fr",
          gap: isMobile ? "24px 16px" : 32,
          marginBottom: 28,
        }}>
          <div style={{ gridColumn: isMobile ? "1 / -1" : "auto" }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 800, color: "#c9a97a" }}>MAISON</span>
            <p style={{ color: "#78716c", fontSize: 13, marginTop: 8, maxWidth: 240, lineHeight: 1.6 }}>Curated home goods from artisans around the world.</p>
          </div>
          {[["Shop", ["All Products", "Lighting", "Textiles", "Kitchen"]], ["Company", ["About Us", "Our Artisans", "Sustainability"]], ["Support", ["Contact", "FAQ", "Returns"]]].map(([title, links]) => (
            <div key={title}>
              <h4 style={{ color: "#c9a97a", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>{title}</h4>
              {links.map(l => <p key={l} style={{ color: "#78716c", fontSize: 12, margin: "5px 0", cursor: "pointer" }}>{l}</p>)}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 18, display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, color: "#57534e" }}>© 2025 Maison. All rights reserved.</span>
          <span style={{ fontSize: 12, color: "#57534e" }}>Crafted with care 🤍</span>
        </div>
      </footer>

      {/* ── CART DRAWER ── */}
      {cartOpen && (
        <>
          <div onClick={() => setCartOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 999 }} />
          <Cart cart={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} onCheckout={handleCheckout} isMobile={isMobile} />
        </>
      )}

      {/* ── TOAST ── */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
          background: "#1a1109", color: "#c9a97a", padding: "11px 20px",
          borderRadius: 12, fontSize: 13, fontWeight: 600, zIndex: 2000,
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)", whiteSpace: "nowrap",
          maxWidth: "90vw", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          ✓ {toast} added to cart
        </div>
      )}

      {/* ── ORDER CONFIRMATION ── */}
      {orderDone && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 2000,
          display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
        }}>
          <div style={{
            background: "#fff", borderRadius: 24,
            padding: isMobile ? "36px 24px" : "48px 40px",
            textAlign: "center", width: "100%", maxWidth: 360,
            boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
          }}>
            <div style={{ fontSize: 56, marginBottom: 14 }}>🎉</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 24 : 28, fontWeight: 800, color: "#1a1109", marginBottom: 12 }}>Order Placed!</h2>
            <p style={{ color: "#78716c", fontSize: 14, lineHeight: 1.6 }}>Thank you for shopping with Maison. Your order is confirmed and will ship within 2–3 business days.</p>
          </div>
        </div>
      )}
    </div>
  );
}
