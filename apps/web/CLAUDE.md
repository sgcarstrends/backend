# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- Build: `pnpm build` (uses Turbopack)
- Dev: `pnpm dev` (uses Turbopack)
- Lint: `pnpm lint`
- Test: `pnpm test:coverage` (Vitest with jsdom and coverage reporting)
- Test single file: `pnpm test -- path/to/file.test.ts`
- Test watch mode: `pnpm test:watch`
- E2E tests: `pnpm test:e2e` (Playwright)
- E2E tests UI: `pnpm test:e2e:ui`
- DB migrations: `pnpm migrate`

## Architecture Overview

### Tech Stack

- **Next.js 15** with App Router and React 19
- **TypeScript** with strict type checking
- **Tailwind CSS** (v4) with prettier-plugin-tailwindcss for class sorting
- **Drizzle ORM** with PostgreSQL (Neon Database)
- **Zustand** for state management with persistence
- **shadcn/ui** + Radix UI components
- **Vitest** for unit tests, **Playwright** for E2E tests
- **SST** for AWS deployment with CloudFlare DNS

### Project Structure

- `src/app/` - Next.js App Router with route-based organization
- `src/components/` - React components (shadcn/ui + custom)
- `src/config/` - Database and application configuration
- `src/utils/` - Utility functions with comprehensive test coverage
- `src/types/` - TypeScript type definitions
- `src/schema/` - Drizzle database schema definitions

### Business Domain

Singapore car market analytics:

- Car registration data by make, fuel type, vehicle type
- COE (Certificate of Entitlement) bidding results and premiums
- Month-over-month and year-over-year trend analysis
- Geographic user analytics

### Key Patterns

#### State Management

- Zustand store with modular slices (COE, Date, Notification)
- Selective persistence with storage middleware
- URL state management via nuqs for shareable links

#### API Integration

- Custom `fetchApi` utility with authentication headers
- RESTful API endpoints in `src/app/api/`
- Upstash Redis for caching with Next.js revalidation tags

#### Data Visualization

- Recharts for interactive charts
- D3.js for data manipulation
- Responsive design with mobile-first approach

## Code Style

- File naming: kebab-case for utils and components
- Import order: built-in > external > internal > parent > sibling
- React functional components with TypeScript
- Error handling: try/catch blocks with meaningful messages
- Absolute imports with `@/` alias
- Follow ESLint rules configured in project
- Use British English spelling

## Testing

- Unit tests: Vitest with jsdom environment, @testing-library/react
- E2E tests: Playwright (Chromium only)
- Test files excluded from Vitest: `tests/` directory (reserved for E2E)
- Setup file: `setup-tests.ts`
- **Focus on basic functionality testing only** - test core component behaviour, prop handling, and essential user interactions rather than comprehensive edge cases
- **Write tests to increase code coverage** - prioritise coverage of untested components and utilities, but keep tests simple and focused on core functionality

## Database

- Drizzle ORM with type-safe queries
- Simple analytics schema for page views and geolocation
- Migrations managed via drizzle-kit

## Deployment

- SST on AWS with ARM64 architecture
- Environment-specific configurations (dev/staging/prod)
- Lambda warming to reduce cold starts

## Excluded Areas

- `components/ui/**` - shadcn/ui code which should not be modified