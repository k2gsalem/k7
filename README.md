# K7 Platform Monorepo

This repository hosts the multi-channel K7 platform, including administrative web apps, marketing site, and React Native mobile applications for customers, staff, delivery partners, catalog managers, and in-store credit workflows.

## Structure
- `apps/`
  - `admin-dashboard/` – React admin interface with analytics, catalog, credit, and notification management.
  - `public-website/` – Marketing and online ordering funnel.
  - `mobile/` – Expo-based React Native apps for ordering, order management, delivery, catalog updates, and in-store credit.
- `packages/`
  - `amplify-config/` – Amplify Gen 2 backend definition and exported client configuration.
  - `shared-models/` – Shared TypeScript models for products, orders, credit accounts, and delivery tasks.
  - `testing/` – Shared testing utilities.
- `docs/` – Deployment and testing guides.
- `amplify/` – Amplify backend metadata and resource mapping.

## Getting Started
1. Install dependencies: `yarn install`
2. Start web apps: `yarn turbo run dev --filter=admin-dashboard` or `--filter=public-website`
3. Start a mobile app: `cd apps/mobile/customer-ordering && yarn start`
4. Run tests: `yarn test`

## AWS Amplify Integration
Amplify is configured via the TypeScript backend definition in `packages/amplify-config`. Resources cover Cognito authentication, AppSync and API Gateway APIs, DynamoDB/Aurora databases, S3 buckets for asset storage, SNS/Pinpoint for notifications, and Amazon Location Service for geospatial queries. Provision infrastructure using `amplify sandbox` followed by `amplify push` once configurations are finalized.

## CI/CD
Use Amplify Hosting Gen 2 to deploy the admin dashboard and marketing site. For mobile apps, integrate with EAS Build and distribute via App/Play stores. Refer to `docs/DEPLOYMENT.md` for details.

## Tenancy & Onboarding
Role-based access control is enforced via Cognito user groups. Onboarding flows assign roles (`admin`, `staff`, `merchant`, `finance`, `delivery`) and seed tenant-specific data in DynamoDB tables. Customize the onboarding lambda in `packages/amplify-config` when adding new modules.

## Testing & Quality
Vitest and Jest are wired for fast feedback. Add more scenario tests under each app's `src` directory. Refer to `docs/TESTING.md` for guidance.
