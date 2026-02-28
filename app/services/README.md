# Services Page - GTA Tech Solutions

## Overview
A modern, responsive Services page built with Next.js 16 (App Router), React 19, Tailwind CSS 4, and GSAP animations.

## Features

### ✨ UI/UX
- **Premium Design**: Modern minimal layout with tech-focused aesthetic
- **Glassmorphism Effects**: Backdrop blur and transparency on service cards
- **Gradient Borders**: Dynamic gradient borders matching the brand palette
- **Smooth Animations**: GSAP-powered scroll animations and interactions
- **Responsive Grid**: 1/2/3 column layout adapting to screen sizes
- **Hover Effects**: Scale, glow, and color transitions on service cards

### 🎬 GSAP Animations
- **Hero Section**: Staggered fade-in for badge, title, and description
- **Service Cards**: Scroll-triggered slide-up with stagger effect
- **Section Headers**: Text reveal with decorative line animation
- **CTA Section**: Scale and fade-in on scroll
- **Smooth Scrolling**: Enhanced anchor link scrolling with easing

### 🎨 Design System
**Color Palette:**
- Primary: `#d489ff` (Light Blue)
- Secondary: `#a200ff` (Medium Blue)
- Dark: `#001E5F` (Navy)
- Background: `#000000` (Black)

**Gradients:**
- Dynamic gradients per service card
- Consistent with homepage design language

### 📱 Services Included
1. **Custom Software Development** - FaCode icon
2. **Web Development** - FaLaptopCode icon
3. **Mobile App Development** - FaMobileAlt icon
4. **Business Automation** - FaCogs icon
5. **Digital Marketing** - FaBullhorn icon
6. **Branding & Creative Design** - FaPaintBrush icon
7. **Cloud & DevOps** - FaCloud icon
8. **IT Consulting** - FaChalkboardTeacher icon
9. **Cybersecurity Solutions** - FaShieldAlt icon

### 🔍 SEO Optimization
- Comprehensive metadata (title, description, keywords)
- Open Graph tags for social sharing
- Semantic HTML (`<section>`, `<article>`, `<header>`)
- Accessible markup with ARIA labels
- Optimized for search engines

### ⚡ Performance
- **Lazy Loading**: Images and components load on demand
- **Code Splitting**: Automatic with Next.js App Router
- **Reusable Components**: ServiceCard and SectionHeader
- **Optimized Animations**: RequestAnimationFrame-based
- **Clean Code**: Well-organized and maintainable

## File Structure
```
app/
├── services/
│   ├── page.js                    # Main page with metadata
│   └── ServicesPageContent.jsx    # Client component with logic
├── components/
│   └── services/
│       ├── ServiceCard.jsx        # Reusable service card
│       └── SectionHeader.jsx      # Animated section header
└── hooks/
    └── useSmoothScroll.js         # Smooth scroll utility
```

## Components

### ServiceCard
Glassmorphism card with:
- Gradient border
- Icon container with hover scale
- Title and description
- Animated "Learn More" indicator
- Background glow effect on hover

### SectionHeader
Animated section header with:
- Scroll-triggered text reveal
- Subtitle support
- Decorative gradient line
- Responsive typography

## Usage

### Navigate to Services
The page is accessible at `/services` route.

### Customizing Services
Edit the `services` array in `ServicesPageContent.jsx`:

```javascript
const services = [
  {
    id: 1,
    icon: FaCode, // React Icon component
    title: "Service Title",
    description: "Service description...",
    gradient: "from-[#d489ff] to-[#a200ff]", // Tailwind gradient
  },
  // ... more services
];
```

### Adjusting Animations
Modify GSAP timelines in component `useEffect` hooks:

```javascript
gsap.from(element, {
  scrollTrigger: {
    trigger: triggerElement,
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 60,
  duration: 0.7,
  stagger: 0.1,
});
```

## Dependencies

### Installed Packages
```json
{
  "gsap": "^3.x.x",        // Animation library
  "react-icons": "^5.x.x"  // Icon library
}
```

### Existing Dependencies
- Next.js 16.0.5
- React 19.2.0
- Tailwind CSS 4

## Performance Metrics
Expected Lighthouse scores:
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 95+
- **SEO**: 100

## Browser Support
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## Accessibility
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast ratio meets WCAG AA
- Focus indicators on interactive elements

## Future Enhancements
- [ ] Add individual service detail pages
- [ ] Implement service filtering/search
- [ ] Add case studies/testimonials per service
- [ ] Integrate with CMS for dynamic content
- [ ] Add service comparison tool
- [ ] Implement contact form per service

## Credits
- Design: GTA Tech Solutions Design System
- Icons: React Icons (Font Awesome)
- Animations: GSAP (GreenSock)
- Framework: Next.js + React
- Styling: Tailwind CSS
