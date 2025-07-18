# SG Cars Trends Backend - Developer Reference Guide

## Project Overview

SG Cars Trends is a full-stack platform providing access to Singapore vehicle registration data and Certificate of Entitlement (COE) bidding results. The monorepo includes:

- **API Service**: RESTful endpoints for accessing car registration and COE data (Hono framework)
- **Web Application**: Next.js frontend with interactive charts and analytics
- **Integrated Updater**: Workflow-based data update system with scheduled jobs that fetch and process data from LTA DataMall (QStash workflows)
- **Social Media Integration**: Automated posting to Discord, LinkedIn, Telegram, and Twitter when new data is available
- **Documentation**: Comprehensive developer documentation using Mintlify

## Commands

### Common Commands

- Build all: `pnpm build`
- Develop: `pnpm dev`
- Lint: `pnpm lint` (uses Biome)
- Test all: `pnpm test`
- Test watch: `pnpm test:watch`
- Test coverage: `pnpm test:coverage`
- E2E tests: `pnpm test:e2e`
- E2E tests with UI: `pnpm test:e2e:ui`
- Run single test: `pnpm -F @sgcarstrends/api test -- src/utils/__tests__/slugify.test.ts`
- Package-specific test: `pnpm -F @sgcarstrends/<package> test`

### Web Application Commands

- Web dev server: `pnpm web:dev`
- Web build: `pnpm web:build`
- Web start: `pnpm web:start`

### Database Commands

- Run migrations: `pnpm migrate`
- Check pending migrations: `pnpm migrate:check`

### Release Commands

- Test release (dry run): `pnpm release:dry`
- Test all packages release: `pnpm release:all:dry`
- Manual release (use with caution): `pnpm release`
- Release all packages: `pnpm release:all`

### Deployment Commands

- Deploy API (includes updater functionality): `pnpm -F @sgcarstrends/api deploy`
- Deploy to specific stage: `pnpm -F @sgcarstrends/api deploy --stage <stage-name>`
- Deploy web to dev: `pnpm web:deploy:dev`
- Deploy web to staging: `pnpm web:deploy:staging`
- Deploy web to production: `pnpm web:deploy:prod`

## Code Structure

- **apps/api**: Unified API service using Hono framework with integrated updater workflows
  - **src/v1**: API endpoints for data access
  - **src/updater**: Workflow-based data update system and social media integration
- **apps/web**: Next.js frontend application
  - **src/app**: Next.js App Router pages and layouts
  - **src/components**: React components with tests
  - **src/utils**: Web-specific utility functions
- **apps/docs**: Mintlify documentation site
- **packages/types**: Shared TypeScript type definitions
- **packages/utils**: Shared utility functions

## Code Style

- TypeScript with strict type checking (noImplicitAny, strictNullChecks)
- Use double quotes for strings (Biome enforced)
- Use spaces for indentation (2 spaces, Biome enforced)
- Organize imports automatically (Biome enforced)
- Function/variable naming: camelCase
- Class naming: PascalCase
- Constants: UPPER_CASE for true constants
- Error handling: Use try/catch for async operations with specific error types
- Use workspace imports for shared packages: `@sgcarstrends/utils`, etc.
- Path aliases: Use `@api/` for imports in API app, `@api/updater/` for updater functionality
- Avoid using `any` type - prefer unknown with type guards
- Group imports by: 1) built-in, 2) external, 3) internal

## Testing

- Testing framework: Vitest
- Tests should be in `__tests__` directories next to implementation
- Test file suffix: `.test.ts`
- Aim for high test coverage, especially for utility functions
- Use mock data where appropriate, avoid hitting real APIs in tests
- Coverage reports generated with V8 coverage
- Test both happy and error paths
- For component tests, focus on functionality rather than implementation details

## API Endpoints

### Data Access Endpoints
- **/v1/cars**: Car registration data (filterable by month, make, fuel type)
- **/v1/coe**: COE bidding results
- **/v1/coe/pqp**: COE Prevailing Quota Premium rates
- **/v1/makes**: List of car manufacturers
- **/v1/months/latest**: Get the latest month with data

### Updater Endpoints
- **/workflows/trigger**: Trigger data update workflows (authenticated)
- **/workflow/cars**: Car data update workflow endpoint
- **/workflow/coe**: COE data update workflow endpoint
- **/linkedin**: LinkedIn posting webhook
- **/twitter**: Twitter posting webhook
- **/discord**: Discord posting webhook
- **/telegram**: Telegram posting webhook

## Environment Setup

Required environment variables (store in .env.local for local development):

- DATABASE_URL: PostgreSQL connection string
- SG_CARS_TRENDS_API_TOKEN: Authentication token for API access
- UPSTASH_REDIS_REST_URL: Redis URL for caching
- UPSTASH_REDIS_REST_TOKEN: Redis authentication token
- UPDATER_API_TOKEN: Updater service token for scheduler
- LTA_DATAMALL_API_KEY: API key for LTA DataMall (for updater service)

## Deployment

- AWS Region: ap-southeast-1 (Singapore)
- Architecture: arm64
- Domains: sgcarstrends.com (with environment subdomains)
- Cloudflare for DNS management
- SST framework for infrastructure

## Data Models

- **cars**: Car registrations by make, fuel type, and vehicle type
- **coe**: COE bidding results (quota, bids, premium by category)
- **coePQP**: Prevailing Quota Premium rates
- **months**: Available data months
- **makes**: Vehicle manufacturers

## Workflow Architecture

The integrated updater service uses a workflow-based architecture with:

### Key Components
- **Workflows** (`src/updater/lib/workflows/`): Cars and COE data processing workflows
- **Task Processing** (`src/updater/lib/workflow.ts`): Common processing logic with Redis-based timestamp tracking
- **Updater Core** (`src/updater/lib/updater.ts`): File download, checksum verification, CSV processing, and database updates
- **Social Media** (`src/updater/lib/*/`): Platform-specific posting functionality (Discord, LinkedIn, Telegram, Twitter)
- **QStash Integration** (`src/updater/config/qstash.ts`): Message queue functionality for workflow execution

### Workflow Flow
1. Workflows triggered via HTTP endpoints or scheduled QStash cron jobs
2. Files downloaded and checksums verified to prevent redundant processing
3. New data inserted into database in batches
4. Updates published to configured social media platforms when data changes
5. Comprehensive error handling with Discord notifications for failures

### Design Principles
- Modular and independent workflows
- Checksum-based redundancy prevention
- Batch database operations for efficiency
- Conditional social media publishing based on environment and data changes

## Contribution Guidelines

- Create feature branches from main branch
- **Use conventional commit messages** (see SEMANTIC_RELEASE.md for details)
- Submit PRs with descriptive titles and summaries
- Ensure CI passes (tests, lint, typecheck) before requesting review
- Maintain backward compatibility for public APIs
- Use `feat!:` or `BREAKING CHANGE:` footer for breaking changes
- **Automated releases** happen on merge to main based on commit messages