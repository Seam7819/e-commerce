# MAISON — Portfolio E-Commerce Website

A modern, fully responsive e-commerce web application built with **React**, **Vite**, and custom inline styles. Designed with a luxury home goods aesthetic — warm tones, serif typography, and smooth interactions across all screen sizes.

---

## Live Preview
https://magnificent-klepon-4ac647.netlify.app/

> Deploy on [Vercel](https://vercel.com) or [Netlify](https://netlify.com) for a live URL.

---

## Screenshots

| Desktop | Mobile |
|--------|--------|
| Hero, product grid, cart drawer | Hamburger nav, 2-col grid, full-screen cart |

---

## Features

- **Multi-page navigation** — Home, Shop, About, Contact
- **Product catalog** with category filters and live search
- **Shopping cart** — add, remove, quantity tracking, order total
- **Sliding cart drawer** — full-screen on mobile, 380px panel on desktop
- **Order confirmation** modal with success animation
- **Toast notifications** on add-to-cart
- **Fully responsive** — mobile (< 640px), tablet (< 1024px), desktop (1024px+)
- **Mobile hamburger menu** with animated open/close
- **Collapsible search bar** on mobile
- **Hover animations** on product cards
- **Google Fonts** — Playfair Display + DM Sans

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| [React 18](https://react.dev) | UI framework |
| [Vite](https://vitejs.dev) | Build tool & dev server |
| JavaScript (ES2022) | Logic & state management |
| CSS-in-JS (inline styles) | Responsive styling, no config needed |
| Google Fonts | Typography |

> No Tailwind or DaisyUI config required — all styles are self-contained inline styles with a `useWindowWidth` responsive hook.

---

## Project Structure

```
maison-shop/
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx          ← Main app (all components live here)
│   └── main.jsx         ← React entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- npm v9 or higher

Check your versions:
```bash
node -v
npm -v
```

### Installation

**Step 1 — Create a new Vite + React project**
```bash
cd D:\Projects
npm create vite@latest maison-shop -- --template react
cd maison-shop
```

**Step 2 — Install dependencies**
```bash
npm install
```

**Step 3 — Replace the App file**

Copy the contents of `index.jsx` into `src/App.jsx`, replacing everything that was there.

**Step 4 — Start the development server**
```bash
npm run dev
```

Open your browser at:
```
http://localhost:5173
```

---

## Available Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start local development server |
| `npm run build` | Build for production (outputs to `/dist`) |
| `npm run preview` | Preview the production build locally |

---

## Responsive Breakpoints

| Breakpoint | Layout |
|-----------|--------|
| `< 640px` (Mobile) | Hamburger menu, 2-column product grid, full-screen cart, stacked hero |
| `640px – 1023px` (Tablet) | Visible nav links, 3-column product grid, scaled typography |
| `≥ 1024px` (Desktop) | Full nav + inline search, 4-column grid, 380px cart drawer |

---

## Customization

### Adding Products

Edit the `products` array at the top of `src/App.jsx`:

```js
const products = [
  {
    id: 9,
    name: "Your Product Name",
    price: 99,
    category: "Decor",       // Must match a value in `categories` array
    rating: 4.7,
    reviews: 50,
    badge: "New",            // "New" | "Sale" | "Bestseller" | "Top Rated" | null
    img: "🖼️",              // Emoji or replace with <img> tag
    desc: "Short product description.",
  },
];
```

### Changing the Color Palette

The primary colors are defined inline. Search for these hex values to update the brand:

| Variable | Hex | Usage |
|---------|-----|-------|
| Dark Brown | `#1a1109` | Navbar, buttons, headings |
| Gold | `#c9a97a` | Accents, CTA buttons, badges |
| Cream | `#faf7f3` | Page background |
| Warm White | `#fdf8f4` | Card backgrounds |

### Adding Real Images

Replace the `img` emoji field with an image URL and update `ProductCard` to render an `<img>` tag:

```jsx
// In ProductCard, replace the emoji display with:
<img src={product.img} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
```

---

## Deployment

### Deploy to Vercel (Recommended)

```bash
npm run build
npx vercel --prod
```

Or connect your GitHub repo directly at [vercel.com](https://vercel.com).

### Deploy to Netlify

```bash
npm run build
# Drag and drop the /dist folder to netlify.com/drop
```

---

## Roadmap

- [ ] Connect to a real backend / REST API
- [ ] Stripe payment integration
- [ ] Product detail pages with routing (React Router)
- [ ] User authentication
- [ ] Wishlist feature
- [ ] Product image support
- [ ] Dark mode toggle

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Author

Built with ❤️ using React + Vite.  
Feel free to fork, customize, and deploy as your own portfolio project.
