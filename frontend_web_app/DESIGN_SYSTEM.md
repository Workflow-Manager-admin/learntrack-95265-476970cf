# Learning Tracker - Modern Design System

## Overview

This document outlines the comprehensive design system implemented for the Learning Progress Tracker application. The design system provides a modern, minimal, and fully responsive foundation built with CSS custom properties, utility classes, and reusable components.

## Design Principles

### 1. Modern Minimalism
- Clean, uncluttered interfaces
- Thoughtful use of whitespace
- Focused content hierarchy
- Subtle visual effects and shadows

### 2. Professional Polish
- Consistent spacing and typography
- High-quality visual design
- Smooth animations and transitions
- Attention to micro-interactions

### 3. Responsive First
- Mobile-first approach
- Fluid layouts across all breakpoints
- Touch-friendly interface elements
- Scalable components

## Color System

### Brand Colors
```css
--color-primary: #1976d2     /* Primary brand blue */
--color-secondary: #424242   /* Secondary gray */
--color-accent: #ffb300      /* Accent amber */
```

### Status Colors
```css
--color-success: #10b981     /* Success green */
--color-warning: #f59e0b     /* Warning amber */
--color-error: #ef4444       /* Error red */
--color-info: #3b82f6        /* Info blue */
```

### Learning Status Colors
```css
--color-status-not-started: #e5e7eb   /* Light gray */
--color-status-in-progress: #fbbf24   /* Amber */
--color-status-completed: #10b981     /* Green */
```

## Typography

### Font Stack
- **Primary**: 'Inter' with system font fallbacks
- **Monospace**: 'JetBrains Mono' for code elements

### Scale (rem-based)
- `--font-size-xs`: 0.75rem (12px)
- `--font-size-sm`: 0.875rem (14px)
- `--font-size-base`: 1rem (16px)
- `--font-size-lg`: 1.125rem (18px)
- `--font-size-xl`: 1.25rem (20px)
- `--font-size-2xl`: 1.5rem (24px)
- `--font-size-3xl`: 1.875rem (30px)
- `--font-size-4xl`: 2.25rem (36px)
- `--font-size-5xl`: 3rem (48px)

## Spacing System

All spacing uses a consistent rem-based scale:

```css
--space-1: 0.25rem   /* 4px */
--space-2: 0.5rem    /* 8px */
--space-3: 0.75rem   /* 12px */
--space-4: 1rem      /* 16px */
--space-5: 1.25rem   /* 20px */
--space-6: 1.5rem    /* 24px */
--space-8: 2rem      /* 32px */
--space-10: 2.5rem   /* 40px */
--space-12: 3rem     /* 48px */
--space-16: 4rem     /* 64px */
--space-20: 5rem     /* 80px */
--space-24: 6rem     /* 96px */
--space-32: 8rem     /* 128px */
```

## Component Library

### Buttons

#### Basic Usage
```html
<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-secondary">Secondary Button</button>
<button class="btn btn-accent">Accent Button</button>
```

#### Sizes
```html
<button class="btn btn-xs">Extra Small</button>
<button class="btn btn-sm">Small</button>
<button class="btn">Default</button>
<button class="btn btn-lg">Large</button>
<button class="btn btn-xl">Extra Large</button>
```

#### Variants
```html
<button class="btn btn-ghost">Ghost</button>
<button class="btn btn-success">Success</button>
<button class="btn btn-icon">🔍</button>
<button class="btn btn-block">Full Width</button>
```

### Cards

#### Basic Card
```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Card Title</h3>
    <p class="card-subtitle">Card subtitle</p>
  </div>
  <div class="card-body">
    Card content goes here
  </div>
  <div class="card-footer">
    Footer content
  </div>
</div>
```

#### Interactive Card
```html
<div class="card card-interactive">
  <!-- Card content -->
</div>
```

### Forms

#### Form Structure
```html
<div class="form-group">
  <label class="form-label required" for="input-id">
    Label Text
  </label>
  <input 
    id="input-id"
    type="text" 
    class="form-input"
    placeholder="Placeholder text"
  />
  <div class="form-help">Helper text</div>
</div>
```

#### Form Controls
- `.form-input` - Text inputs
- `.form-textarea` - Textareas
- `.form-select` - Select dropdowns
- `.form-checkbox` - Checkboxes
- `.form-radio` - Radio buttons

#### Validation States
- `.error` - Error state with red styling
- `.success` - Success state with green styling

### Badges

```html
<span class="badge badge-primary">Primary</span>
<span class="badge badge-secondary">Secondary</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-error">Error</span>

<!-- Status badges -->
<span class="badge badge-status-not-started">Not Started</span>
<span class="badge badge-status-in-progress">In Progress</span>
<span class="badge badge-status-completed">Completed</span>
```

### Modals

```html
<div class="modal-overlay">
  <div class="modal">
    <div class="modal-header">
      <h3 class="modal-title">Modal Title</h3>
      <button class="modal-close">×</button>
    </div>
    <div class="modal-body">
      Modal content
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary">Cancel</button>
      <button class="btn btn-primary">Confirm</button>
    </div>
  </div>
</div>
```

## Utility Classes

### Layout
- `.container` - Responsive container with max-width
- `.grid` - CSS Grid container
- `.flex` - Flexbox container
- `.grid-cols-1` to `.grid-cols-4` - Grid columns
- `.gap-1` to `.gap-8` - Grid/flex gap

### Spacing
- `.m-{size}` - Margin (all sides)
- `.p-{size}` - Padding (all sides)
- `.mb-{size}` - Margin bottom
- `.space-y-{size}` - Vertical spacing between children

### Typography
- `.text-{size}` - Font sizes (xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl)
- `.font-{weight}` - Font weights (light, normal, medium, semibold, bold)
- `.text-{color}` - Text colors (primary, secondary, tertiary, inverse)
- `.text-{align}` - Text alignment (left, center, right)

### Display
- `.block`, `.inline`, `.inline-block`, `.flex`, `.grid`, `.hidden`
- `.sm:hidden`, `.md:hidden` - Responsive display utilities

### Background & Borders
- `.bg-{variant}` - Background colors
- `.border` - Border utilities
- `.rounded-{size}` - Border radius
- `.shadow-{size}` - Box shadows

## Responsive Breakpoints

```css
/* Small devices (640px and up) */
@media (min-width: 640px) { ... }

/* Medium devices (768px and up) */
@media (min-width: 768px) { ... }

/* Large devices (1024px and up) */
@media (min-width: 1024px) { ... }

/* Extra large devices (1280px and up) */
@media (min-width: 1280px) { ... }
```

### Responsive Prefixes
- `sm:` - Small screens and up
- `md:` - Medium screens and up
- `lg:` - Large screens and up
- `xl:` - Extra large screens and up

## Dark Mode Support

The design system includes built-in dark mode support using CSS custom properties and `prefers-color-scheme` media query.

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-primary: var(--color-bg-primary-dark);
    --color-text-primary: var(--color-text-primary-dark);
    /* ... other dark mode variables */
  }
}
```

## Accessibility Features

### Focus Management
- Clear focus indicators with `:focus-visible`
- Keyboard navigation support
- Screen reader friendly markup

### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Semantic HTML
- Proper heading hierarchy
- ARIA labels and roles
- Semantic form controls

## Best Practices

### 1. Component Structure
- Use semantic HTML elements
- Apply utility classes for styling
- Keep component-specific styles minimal
- Use CSS custom properties for theming

### 2. Responsive Design
- Design mobile-first
- Use flexible units (rem, em, %)
- Test across multiple screen sizes
- Consider touch interactions

### 3. Performance
- Minimize CSS bundle size
- Use efficient selectors
- Optimize for critical rendering path
- Leverage browser caching

### 4. Maintainability
- Use consistent naming conventions
- Document complex components
- Keep utility classes atomic
- Regular design system audits

## File Structure

```
src/
├── global.css           # Global styles and design tokens
├── components.css       # Component library styles
├── routes/
│   ├── styles.css      # Legacy compatibility layer
│   └── index.tsx       # Main dashboard with modern design
└── components/
    └── starter/        # Updated component library
```

## Usage Examples

### Dashboard Layout
The main dashboard demonstrates the design system in action:
- Responsive grid layout
- Modern card components
- Interactive form elements
- Status badges and progress indicators
- Modal interfaces

### Quick Start
1. Import the design system CSS files
2. Use utility classes for layout and spacing
3. Apply component classes for interactive elements
4. Customize using CSS custom properties

```tsx
import globalStyles from "./global.css?inline";
import componentStyles from "./components.css?inline";

export default component$(() => {
  useStyles$(globalStyles);
  useStyles$(componentStyles);
  
  return (
    <div class="container py-6">
      <div class="card">
        <div class="card-body">
          <h2 class="text-xl font-semibold mb-4">Modern Design</h2>
          <button class="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
});
```

## Migration Notes

### From Old System
- Replace CSS modules with utility classes
- Update color variables to new naming scheme
- Use new component structure for cards and forms
- Apply responsive utilities instead of custom media queries

### Breaking Changes
- Old CSS module files are deprecated
- Updated color variable names
- New spacing scale (rem-based)
- Modified component structure

This design system provides a solid foundation for building modern, accessible, and maintainable user interfaces while ensuring consistency across the entire Learning Progress Tracker application.
