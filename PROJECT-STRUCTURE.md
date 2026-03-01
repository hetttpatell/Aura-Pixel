# Aura Pixel - Production-Grade Project Structure

This document describes the organized, production-grade folder structure for the Aura Pixel React application.

## 📁 Directory Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Shared/common components
│   │   ├── OptimizedImage.jsx
│   │   ├── SkipToContent.jsx
│   │   └── index.js     # Barrel exports
│   ├── layout/          # Layout components (Navbar, Footer)
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── index.js
│   ├── sections/        # Page section components
│   │   ├── Hero.jsx
│   │   ├── Services.jsx
│   │   ├── WhyChooseUs.jsx
│   │   ├── Portfolio.jsx
│   │   ├── ScrollingCompany.jsx
│   │   ├── Testimonials.jsx
│   │   ├── Blog.jsx
│   │   ├── LeadCapture.jsx
│   │   └── index.js
│   └── ui/              # UI primitive components (buttons, inputs, etc.)
│
├── features/            # Feature-based modules
│   ├── about/           # About page feature
│   │   └── AboutUs.jsx
│   ├── blog/            # Blog feature
│   │   └── BlogPage.jsx
│   └── services/        # Services feature
│       ├── ServicesDetail.jsx
│       ├── servicesContent.js
│       └── index.js
│
├── hooks/               # Custom React hooks
│   ├── useSEO.js
│   ├── useReducedMotion.js
│   └── index.js
│
├── constants/           # Application constants
│   ├── blogs.js
│   ├── services.js
│   └── index.js
│
├── utils/               # Utility functions
│   └── (helpers, formatters, validators)
│
├── config/              # Configuration files
│   └── (app config, feature flags)
│
├── types/               # TypeScript types/interfaces
│   └── (if using TypeScript)
│
├── styles/              # Additional styles
│   └── (if needed beyond index.css)
│
├── assets/              # Static assets
│   └── (images, fonts, etc.)
│
├── App.jsx              # Main App component
├── main.jsx             # Entry point
└── index.css            # Global styles
```

## 🎯 Import Conventions

### ✅ Recommended: Use Barrel Exports
```jsx
// Good: Clean imports using barrel exports
import { Navbar, Footer } from './components/layout';
import { SkipToContent } from './components/common';
import { Hero, Services } from './components/sections';
import { useSEO } from './hooks';
```

### ❌ Avoid: Deep Relative Paths
```jsx
// Bad: Hard to maintain deep paths
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
```

## 📦 Feature-Based Organization

Features are self-contained modules that include all related components, hooks, and utilities:

```
features/
└── services/
    ├── ServicesDetail.jsx      # Main feature component
    ├── servicesContent.js      # Feature-specific data
    └── index.js                # Public API exports
```

## 🔧 Path Aliases (Vite Config)

The following path aliases are configured in `vite.config.js`:

| Alias | Path |
|-------|------|
| `@` | `/src` |
| `@components` | `/src/components` |
| `@components/common` | `/src/components/common` |
| `@components/layout` | `/src/components/layout` |
| `@components/sections` | `/src/components/sections` |
| `@features` | `/src/features` |
| `@hooks` | `/src/hooks` |
| `@constants` | `/src/constants` |
| `@utils` | `/src/utils` |
| `@config` | `/src/config` |
| `@assets` | `/src/assets` |

## 📋 Component Categories

### Common Components (`components/common/`)
Reusable components used across the application:
- `OptimizedImage` - Lazy-loading image component
- `SkipToContent` - Accessibility skip link

### Layout Components (`components/layout/`)
Structural components that appear on every page:
- `Navbar` - Navigation bar
- `Footer` - Page footer

### Section Components (`components/sections/`)
Page section components that make up the homepage:
- `Hero` - Hero/banner section
- `Services` - Services overview
- `WhyChooseUs` - Value proposition
- `Portfolio` - Work showcase
- `Testimonials` - Client reviews
- `Blog` - Blog preview
- `LeadCapture` - Contact form
- `ScrollingCompany` - Logo ticker

### Feature Components (`features/*/`)
Complete page features with their own data and logic:
- `about/AboutUs` - About page
- `blog/BlogPage` - Blog listing page
- `services/ServicesDetail` - Services detail page

## 🔐 Environment Configuration

Environment files manage different configurations:

| File | Purpose |
|------|---------|
| `.env.example` | Template with all variables |
| `.env.development` | Development environment |
| `.env.production` | Production environment |
| `.env.local` | Local overrides (gitignored) |

## 📊 SEO & Performance Files

### SEO Configuration
- `index.html` - Meta tags, structured data
- `public/robots.txt` - Crawler instructions
- `public/sitemap.xml` - URL sitemap
- `src/hooks/useSEO.js` - Dynamic SEO management

### Performance
- `vite.config.js` - Build optimization, code splitting
- `public/.htaccess` - Server compression, caching
- `public/manifest.json` - PWA manifest

## 🚀 Build Output

After running `npm run build`, the `dist/` folder contains:

```
dist/
├── index.html
├── assets/
│   ├── js/        # JavaScript chunks
│   ├── css/       # Stylesheets
│   └── images/    # Optimized images
├── AURA-PIXEL.PNG
├── robots.txt
├── sitemap.xml
└── manifest.json
```

## ✅ Best Practices

1. **Use barrel exports** for cleaner imports
2. **Keep components small** and focused on one task
3. **Organize by feature** for scalability
4. **Use path aliases** for maintainable imports
5. **Lazy load** heavy components
6. **Separate concerns** - UI vs Logic vs Data
7. **Document** complex components and utilities

## 🔍 File Naming Conventions

- **Components**: PascalCase (e.g., `Hero.jsx`, `Navbar.jsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useSEO.js`)
- **Utilities**: camelCase (e.g., `formatDate.js`)
- **Constants**: camelCase (e.g., `services.js`)
- **Styles**: kebab-case (e.g., `button-styles.css`)
- **Index files**: `index.js` for barrel exports

## 📈 Scaling the Project

To add new features:

1. **New Page Section**: Add to `components/sections/`
2. **New Feature Page**: Create folder in `features/`
3. **New Reusable Component**: Add to `components/common/` or `components/ui/`
4. **New Hook**: Add to `hooks/`
5. **New Utility**: Add to `utils/`

Always update the corresponding `index.js` barrel export file!
