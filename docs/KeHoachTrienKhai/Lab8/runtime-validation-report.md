# Runtime Validation Report

**Generated:** 2026-11-01T11:26:35+07:00
**Target:** Lab 8 audit logging in `culinary-blog`
**Branch:** `2312634-Huy`

## Summary

| Step | Status | Exit Code | Details |
|---|---|---:|---|
| Startup | PASS | 0 | API started with the Testing environment; `/health/live` returned HTTP 200 on port 5182. |
| Backend build and tests | PASS | 0 | 20 unit tests and 47 integration tests passed against an isolated PostgreSQL test database (67 total). |
| Browser E2E | PASS | 0 | Three Playwright tests passed on Chromium. |
| Frontend lint | PASS | 0 | Changed audit-log UI, API client, Playwright config, and E2E files linted successfully. |
| Frontend build | PASS | 0 | `npm run build` completed, including TypeScript checks and route generation. |

**Overall:** PASS

## Validation scope

- Admin can view audit entries, inspect old/new JSON values, filter, and paginate.
- A non-admin user cannot see the audit-log navigation item or query the audit-log API.
- The UI displays an API error and succeeds after retry.
- PostgreSQL integration tests verify persistence, filtering, authorization, soft-delete
  auditing, and exclusion of nested audit records.
- Playwright uses deterministic API fixtures; persistence and API authorization are
  exercised by the backend integration tests.

## Environment and data isolation

- Docker Desktop and Node.js were available; Chromium was installed for Playwright.
- PostgreSQL integration tests used the dedicated test database on port 5433.
- The application health check ran with the Testing environment and the same isolated
  test database; the main application database was not targeted by Lab 8 migration
  tests.
- No production credentials are used by the browser tests. The Auth.js cookie is signed
  with a test-only secret.

## Known issues and gaps

- Next.js emits a deprecation warning for the existing `middleware` convention and
  recommends migration to `proxy`; the build and tests still pass. The middleware
  migration is unrelated to the audit-log task.
- `npm install` reported 22 dependency advisories (17 moderate, 4 high, 1 critical).
  They were not auto-fixed because dependency upgrades are outside this task and can
  introduce unrelated breaking changes.
