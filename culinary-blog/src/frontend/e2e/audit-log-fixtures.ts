import type { Page } from '@playwright/test';
import { encode } from '@auth/core/jwt';

export interface AuditLogFixture {
  id: string;
  occurredAtUtc: string;
  actorId: string | null;
  action: 'Added' | 'Modified' | 'Deleted' | 'SoftDeleted';
  entityName: string;
  entityId: string;
  oldValues: Record<string, unknown> | null;
  newValues: Record<string, unknown> | null;
}

export function createAuditLog(
  overrides: Partial<AuditLogFixture> = {}
): AuditLogFixture {
  return {
    id: '00000000-0000-0000-0000-000000000101',
    occurredAtUtc: '2026-11-01T04:30:00Z',
    actorId: 'admin-e2e',
    action: 'Modified',
    entityName: 'Recipe',
    entityId: 'recipe-e2e-101',
    oldValues: { Title: 'Tên cũ' },
    newValues: { Title: 'Tên mới' },
    ...overrides,
  };
}

export async function seedDashboardSession(page: Page, roles: string[]): Promise<void> {
  const sessionCookie = await encode({
    token: {
      sub: 'audit-e2e-user',
      name: 'Audit E2E User',
      email: 'audit-e2e@example.test',
    },
    secret: 'lab8-playwright-e2e-secret-with-at-least-thirty-two-bytes',
    salt: 'authjs.session-token',
  });

  await page.context().addCookies([
    {
      name: 'authjs.session-token',
      value: sessionCookie,
      url: 'http://127.0.0.1:3100',
    },
  ]);

  await page.addInitScript((userRoles) => {
    localStorage.setItem(
      'culinary-blog-auth',
      JSON.stringify({
        state: {
          user: {
            id: 'audit-e2e-user',
            email: 'audit-e2e@example.test',
            displayName: 'Audit E2E User',
            roles: userRoles,
          },
          accessToken: 'audit-e2e-access-token',
          refreshToken: null,
          expiresAt: null,
          isAuthenticated: true,
        },
        version: 0,
      })
    );
  }, roles);
}

export function paginatedAuditLogs(
  items: AuditLogFixture[],
  page: number,
  totalCount: number
) {
  return {
    items,
    totalCount,
    page,
    pageSize: 20,
  };
}
