# Deployment Guide

## Prerequisites
- AWS account with Amplify Gen 2 enabled
- Amplify CLI (`npm install -g @aws-amplify/cli@latest`)
- Yarn 1.x for workspace management

## Bootstrap Amplify Backend
1. Install dependencies: `yarn install`
2. Initialize Amplify sandbox: `amplify sandbox`
3. Apply backend definition from `packages/amplify-config`: `amplify pull`
4. Deploy shared resources: `amplify push`

## Web CI/CD with Amplify Hosting
1. Connect the repository to Amplify Hosting Gen 2.
2. Add two app targets:
   - `apps/admin-dashboard` with build command `yarn turbo run build --filter=admin-dashboard`
   - `apps/public-website` with build command `yarn turbo run build --filter=public-website`
3. Configure environment variables for API endpoints and Cognito IDs.
4. Enable previews for pull requests.

## Mobile Delivery Pipeline
- Use EAS (Expo Application Services) with Amplify-managed environment variables.
- Configure environment secrets for Cognito and API endpoints.
- Automate builds per workspace using `eas build --profile production` from each mobile app directory.

## Tenancy & Onboarding
- Provision tenants via the Admin dashboard multi-store wizard.
- Amplify backend defines group-based authorization for `admin`, `staff`, `merchant`, `finance`, and `delivery` roles.
- Extend the backend functions (`orderWorkflow`, `notificationsDispatcher`) with tenant-aware logic or add new onboarding handlers as needed.
