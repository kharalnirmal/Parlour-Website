# CRITICAL RULES - MUST FOLLOW

## RESPONSES

- Keep responses concise and to the point — unless the user asks otherwise

## PLANNING MODE

- Always ask clarifying questions
- Never assume design, tech stack, or features
- Use deep-dive sub-agents to assist with research
- Use deep-dive sub-agents to review different aspects of the plan before presenting to the user

## CHANGE / EDIT MODE

- Never implement features yourself when possible — use sub-agents!
- Identify changes from the plan that can be implemented in parallel, and use sub-agents to implement features efficiently
- When using sub-agents to implement features, act as a coordinator only
- Use the best model for the task — premium models for complex tasks (like coding) and mid-tier models for simpler tasks, like documentation
- After completing features (large or small), always run commands like lint, type check, and next build to check code quality

## MOTION (GSAP + LENIS)

- All scroll-driven animation goes through GSAP ScrollTrigger + Lenis — never mix in native CSS scroll-snap or competing scroll libraries
- Keep entrance/reveal timelines refined (300-600ms range) — this is a luxury storefront, not an entertainment showcase
- Every scroll-triggered or Lenis-driven effect must respect `prefers-reduced-motion` — provide a simplified/disabled fallback, never skip this
- Clean up GSAP ScrollTrigger instances and Lenis raf loops on unmount to avoid memory leaks / duplicate triggers on route change

## PRODUCT GRID

- Product cards display perfume bottles with centered image, name (Playfair Display), price, and "SHOP NOW" link in rose-gold
- Grid layout: 5 columns on desktop, 3 on tablet, 1 on mobile
- Use staggered entrance animation via GSAP ScrollTrigger as grid scrolls into view

## TESTING

- Use any testing tools, libraries available to the project for testing your changes
- Never assume your changes simply work — always test!
- If the project does not have any testing tools, scripts, MCP tools, skills, etc. available for testing, ask the user whether testing should be skipped.

## UI DESIGN

- Always follow the UI design system when creating or reviewing components or pages.
- Design System: @DESIGN.md
- Fonts: Cormorant Garamond (display, weights 300/400/600) + DM Sans (body/UI, weights 400/500/600) imported from Google Fonts via next/font
- Color palette: Cream background, charcoal text, rose-gold accents, deep burgundy footer
- No cart functionality in v1 scope — icon can be added for future use, but no cart logic
- All motion must be refined and luxury-paced (300-600ms), never frantic or playful
- Newsletter section is dark burgundy background with centered form — stands out from cream sections
