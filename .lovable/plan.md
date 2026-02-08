

# Luv's Portfolio Website - Implementation Plan

## Overview
A premium, dark-themed AI/ML engineer portfolio with sophisticated animations, custom interactions, and an AI-powered chat assistant powered by Lovable AI.

---

## 🎨 Design Foundation

### Visual Identity
- **Pure black (#000000)** background with glassmorphism cards
- **Peach/Gold (#F5DEB3 / #FFA500)** accent colors for highlights and interactions
- **Elegant serif + sans-serif** typography pairing
- **Subtle grain texture** overlay for premium feel

### Layout
- Full-height hero section with animated title "Luv" + "AI/ML ENGINEER"
- Horizontally scrollable 4-card grid (About, Skills, Projects, Contact)
- Decorative floating elements on right side
- Bottom-fixed chat interface with "Ask LuvGPT"

---

## 📦 Feature Breakdown

### 1. Header Section
- Large animated title with serif font
- Uppercase subtitle with letter-spacing
- Staggered fade-in entrance animation
- Optional triple-click confetti easter egg

### 2. Interactive Cards (4 Cards)

**About Card**
- User icon with hover glow effect
- Education details (SIT, B.E. CSE AI/ML, 8.65 CGPA)
- Expandable modal with full bio and achievements

**Skills & Expertise Card**
- Briefcase icon with hover pulse
- Core languages, cloud systems, AI/ML tech
- Expandable modal with categorized skill lists

**Projects Card**
- Folder icon with interactive glow
- Horizontal tech stack logo carousel (React, TypeScript, Cardano, Firebase, Docker, etc.)
- Modal with detailed Nebula & SentiHeal project info
- Metrics and GitHub/Demo links

**Contact Card**
- Paper plane icon with send animation
- Email, phone, location quick view
- Modal with all social links + competitive programming stats

### 3. Card Interactions
- Scale(1.03) on hover with gold border glow
- Icon color shift to gold with subtle pulse
- Smooth 400ms transitions
- Optional 3D tilt effect on edge hover

### 4. Tech Logo Carousel
- Horizontal scroll with hidden scrollbar
- Edge fade gradients
- Individual logo hover: scale(1.1) + shadow + slight rotation
- Using devicon SVGs for tech logos

### 5. Custom Cursor
- White hand pointer SVG replacing default cursor
- Smooth lag-follow effect (100ms delay)
- Scale changes on hover and click
- Disabled on mobile/tablet

### 6. Decorative Elements
- Vertical dot progress indicator (8-10 dots)
- Active dot based on scroll/section with gold glow
- Floating animated chat bubbles (blue/green)
- Staggered float animations

### 7. Ask LuvGPT Chat Interface
- **Real AI Integration** using Lovable AI (Google Gemini)
- Context-aware responses based on Luv's resume data
- Streaming responses with typing indicator
- Sample suggestion pills with click-to-ask
- Microphone icon placeholder + animated send button

### 8. Suggestion Pills
- Pre-defined questions matching resume content
- Horizontal scroll with hover effects
- Click animation + auto-populate input
- Questions like "Tell me about Nebula project", "What are Luv's coding ratings?"

---

## 🎬 Animation Sequences

### Page Load (0-1600ms)
1. Black screen → Title fade-in (0-200ms)
2. "Luv" slides up (200-600ms)
3. "AI/ML ENGINEER" fade-in (400-600ms)
4. Cards cascade left-to-right (600-1200ms)
5. Decorative elements appear (1000-1400ms)
6. Chat interface slides up (1200-1600ms)

### Interactions
- All hover transitions: 300-400ms ease-out
- Card scaling: transform scale(1.03)
- Icon glow: gold color + pulse animation
- Send button: rotate(15deg) + scale(1.05)

---

## 📱 Responsive Design

### Desktop (1440px+)
- 4 cards visible in row
- Custom cursor enabled
- All decorative elements visible

### Tablet (768px-1439px)
- 2 cards visible, horizontal scroll
- Default cursor
- Reduced chat bubbles

### Mobile (<768px)
- Single column stack
- Simplified animations
- Chat bubbles hidden
- Cards stack vertically

---

## ⚙️ Technical Implementation

### Backend (Lovable Cloud)
- Edge function for AI chat using Lovable AI Gateway
- System prompt containing Luv's full resume data
- Streaming SSE responses
- Rate limiting & error handling

### Frontend Components
- `CustomCursor` - Mouse tracking cursor replacement
- `AnimatedTitle` - Staggered text entrance
- `CardSection` - Card grid with hover states
- `ProjectCard` - Individual card with modal
- `TechCarousel` - Logo horizontal scroll
- `DecorativeElements` - Dots + floating bubbles
- `ChatInterface` - Input + suggestions + messages
- `SuggestionPills` - Quick question chips

### Libraries
- CSS keyframe animations (no additional deps needed)
- Lucide icons for UI elements
- Simple SVG tech icons for carousel

---

## 🔗 Links Needed From You

When you're ready, please provide:
- GitHub profile URL
- LinkedIn profile URL
- Live demo links for Nebula and SentiHeal
- GitHub repo links for projects
- Portfolio website URL
- LeetCode, CodeChef, Codeforces profiles

---

## ✨ Special Touches

- Grain texture overlay (opacity: 0.03)
- Vignette effect on corners
- Smooth scroll behavior
- Preloaded fonts
- Accessibility: keyboard nav, ARIA labels, focus indicators
- Reduced motion support for accessibility

