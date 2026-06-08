# [React Forms](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/forms.md)

Form handling with two approaches: uncontrolled components and React Hook Form, accessible modals via React Portals, Yup validation, and Zustand state management.

## Stack

- **React 19** + **TypeScript**
- **React Hook Form** + **Yup** — form handling and validation
- **Zustand** — global state (submissions history, countries list)
- **Tailwind CSS** — styling
- **Vitest** + **React Testing Library** — unit tests

## Features

- Modal via `createPortal` with focus trap, ESC, click-outside
- Uncontrolled form — reads data via `FormData`, validates on submit only
- React Hook Form — live validation, submit disabled while invalid
- Password strength indicator
- Country autocomplete (`<datalist>`) from store
- Image upload (PNG/JPG, max 2 MB) → converted to base64 → stored and displayed
- Submission history displayed as cards with highlight animation

## Scripts

```bash
npm run dev          # dev server
npm run build        # production build
npm run lint         # ESLint
npm run format       # Prettier
npm test             # run tests
npm run test:coverage # run tests with coverage report
```
