# Module Overview

## Admin Dashboard
- Built with React + Vite under `apps/admin-dashboard`.
- Provides analytics dashboards (Chart.js + React Query), catalog management, credit monitoring, notifications, and user administration.
- Role-based access control through Cognito groups using the `RequireRole` component.

## Public Website
- Static marketing experience with optional checkout flow.
- Integrates Amplify Geo for store lookup and Amplify API for menu and checkout endpoints.

## Customer Ordering App
- React Native (Expo) app with navigation stack (`Home`, `Checkout`, `OrderTracking`).
- DataStore provides real-time catalog updates and offline resilience via `useOfflineSync`.
- Push notifications configured through Expo Notifications tied to Amplify Pinpoint.

## Order Manager App
- Real-time order feed for store staff, allowing status updates via Amplify API Gateway.
- Supports staff notifications through Amplify configured endpoints.

## Delivery App
- Delivery task list with Amazon Location Service integration for permissioned location tracking.
- Allows couriers to update order state (PickedUp/Delivered) and request navigation data.

## Catalog Management App
- Enables offline-first product updates using DataStore and AsyncStorage.
- Supports barcode scanning extensions via Expo Camera (to be implemented).

## In-Store Credit App
- Front-of-house experience for managing customer credit, balances, and adjustments.
- Powered by Amplify REST endpoints backed by DynamoDB/Aurora.

For setup and deployment instructions, refer to `docs/DEPLOYMENT.md` and `docs/TESTING.md`.
