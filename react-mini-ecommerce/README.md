# React Mini E-Commerce Application

A production-grade, highly responsive Mini E-Commerce application built with **React**, **Vite**, **React Router DOM v6**, and **Context API + useReducer** with persistent `localStorage` support.

---

## 🌟 Features

- **Product Catalog Listing:** Responsive grid layout showcasing 16 products across 4 categories (Electronics, Fashion, Home & Living, Books).
- **Combined Search & Category Filter:** Live string search by title merged with single-click category filters.
- **Product Details Page (`/product/:id`):** Deep route viewing with rating, description, stock status, and add-to-cart functionality.
- **Persistent Shopping Cart (`/cart`):** Add, remove, increment, decrement items with automatic removal when quantity reaches zero (`qty < 1`). Instant calculations of total item count, subtotal, estimated tax, and grand total.
- **State Management & Persistence:** Handled via custom `useReducer` and automatically mirrored to browser `localStorage`.
- **UI States & Component Architecture:** Fully modular reusable component design featuring explicit loading spinners, empty search/cart states, and error handling states.

---

## 📂 Project Structure

```
react-mini-ecommerce/
├── public/
├── src/
│   ├── components/
│   │   ├── CartItem.jsx          # Single item row in cart with quantity controls
│   │   ├── CartSummary.jsx       # Order pricing breakdown & checkout trigger
│   │   ├── CategoryFilter.jsx    # Horizontal category pill buttons
│   │   ├── EmptyState.jsx        # Customizable empty cart & empty search state UI
│   │   ├── ErrorState.jsx        # Clean error message card with retry action
│   │   ├── Header.jsx            # Sticky navbar with live cart item counter
│   │   ├── Loader.jsx            # Animated spinner loading state
│   │   ├── ProductCard.jsx       # Catalog item card with image hover effect
│   │   ├── ProductDetail.jsx     # Full product layout with back button
│   │   ├── ProductGrid.jsx       # Responsive grid renderer for product cards
│   │   └── SearchBar.jsx         # Input field with clear search functionality
│   ├── context/
│   │   ├── CartContext.jsx       # React Context Provider + localStorage sync hook
│   │   └── cartReducer.js        # Pure reducer handling cart state mutations
│   ├── data/
│   │   └── products.json         # 16 products dummy JSON dataset
│   ├── pages/
│   │   ├── CartPage.jsx          # Cart route container page
│   │   ├── Home.jsx              # Main catalog & search/filter container page
│   │   ├── NotFound.jsx          # 404 handler page
│   │   └── ProductDetailsPage.jsx# Parametric product detail route container
│   ├── styles/
│   │   └── index.css             # Design tokens & glassmorphic dark theme CSS
│   ├── App.jsx                   # Route configuration & app shell
│   └── main.jsx                  # React StrictMode & Provider bootstrapping
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

## 🛠️ Setup & Execution Instructions

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

3. **Build for Production:**
   ```bash
   npm run build
   ```

4. **Preview Production Build:**
   ```bash
   npm run preview
   ```
