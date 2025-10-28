# Testing Strategy

The monorepo uses Turborepo to orchestrate linting and testing across workspaces.

## Commands
- `yarn test` - runs Vitest/Jest suites for all packages and apps (headless)
- `yarn lint` - runs ESLint where configured

## Mobile Testing
- Each React Native workspace is preconfigured with Jest and React Native preset.
- Add Detox or E2E suites per app under `__e2e__` directories when devices are available.

## Web Testing
- Web applications rely on Vitest and Testing Library for component-level tests. Extend coverage by adding tests in `src/**/*.test.tsx`.

## Continuous Integration
- Use Amplify Hosting build hooks to run `yarn test` before artifacts are deployed.
