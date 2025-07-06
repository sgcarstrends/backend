# SG Cars Trends

A comprehensive analytics platform for Singapore's car market, providing insights into car registrations, COE (
Certificate of Entitlement) bidding results, and market trends.

## Features

- **Car Registration Analytics**: Track registrations by make, fuel type, and vehicle type
- **COE Bidding Results**: Monitor COE premiums and bidding trends
- **Trend Analysis**: Month-over-month and year-over-year comparisons
- **Interactive Charts**: Responsive data visualisation with Recharts
- **Geographic Insights**: User analytics by location

## Tech Stack

- **Next.js 15** with App Router and React 19
- **TypeScript** with strict type checking
- **Tailwind CSS v4** for styling
- **Drizzle ORM** with PostgreSQL (Neon Database)
- **Zustand** for state management
- **shadcn/ui** + Radix UI components
- **Vitest** for unit testing, **Playwright** for E2E testing
- **SST** for AWS deployment

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended package manager)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd web

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run database migrations
pnpm migrate
```

### Development

```bash
# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

- `pnpm build` - Build for production (uses Turbopack)
- `pnpm dev` - Start development server (uses Turbopack)
- `pnpm lint` - Run ESLint
- `pnpm test:coverage` - Run unit tests with coverage
- `pnpm test:e2e` - Run E2E tests with Playwright
- `pnpm test:e2e:ui` - Run E2E tests with Playwright UI
- `pnpm migrate` - Run database migrations

## Project Structure

```
src/
├── app/           # Next.js App Router pages and API routes
├── components/    # React components
├── config/        # Database and app configuration
├── schema/        # Drizzle database schemas
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run tests and linting: `pnpm test:coverage && pnpm lint`
6. Submit a pull request

## Deployment

This application is deployed on AWS using SST with CloudFlare DNS. The deployment process is automated through the
configured CI/CD pipeline.

## Repo Activity

![Alt](https://repobeats.axiom.co/api/embed/a95b438e1fccbaeed2d9128859b7b13f6b6d531f.svg "Repobeats analytics image")