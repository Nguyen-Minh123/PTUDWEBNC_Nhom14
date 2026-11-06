import { expect, test } from '@playwright/test';
import { seedDashboardSession } from './audit-log-fixtures';

test('non-admin users cannot see or query system audit logs', async ({ page }) => {
  let auditRequestCount = 0;
  await page.route('**/api/v1/audit-logs**', async (route) => {
    auditRequestCount += 1;
    await route.fulfill({ status: 403, body: '' });
  });

  await seedDashboardSession(page, ['Author']);
  await page.goto('/dashboard/logs');

  await expect(page.getByRole('heading', { name: 'Không có quyền truy cập' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Nhật ký hệ thống' })).toHaveCount(0);
  expect(auditRequestCount).toBe(0);
  await expect(page.getByRole('link', { name: 'Quay lại Dashboard' }))
    .toHaveAttribute('href', '/dashboard');
});
