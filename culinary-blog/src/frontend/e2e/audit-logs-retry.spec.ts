import { expect, test } from '@playwright/test';
import {
  createAuditLog,
  paginatedAuditLogs,
  seedDashboardSession,
} from './audit-log-fixtures';

test('Admin can retry after an audit-log request fails', async ({ page }) => {
  let requestCount = 0;
  await page.route('**/api/v1/audit-logs**', async (route) => {
    requestCount += 1;

    if (requestCount === 1) {
      await route.fulfill({
        status: 503,
        contentType: 'application/problem+json',
        body: JSON.stringify({
          status: 503,
          title: 'Dịch vụ tạm thời không khả dụng',
          detail: 'Vui lòng thử lại.',
        }),
      });
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(
        paginatedAuditLogs(
          [createAuditLog({ entityId: 'recipe-retry-success' })],
          1,
          1
        )
      ),
    });
  });

  await seedDashboardSession(page, ['Admin']);
  await page.goto('/dashboard/logs');

  await expect(page.locator('p[role="alert"]')).toContainText('Vui lòng thử lại.');
  await page.getByRole('button', { name: 'Thử lại' }).click();

  await expect(page.getByText('recipe-retry-success')).toBeVisible();
  expect(requestCount).toBe(2);
});
