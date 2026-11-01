import { expect, test } from '@playwright/test';
import {
  createAuditLog,
  paginatedAuditLogs,
  seedDashboardSession,
} from './audit-log-fixtures';

test('Admin filters audit logs, inspects change details, and moves between pages', async ({ page }) => {
  const requestedUrls: URL[] = [];

  await page.route('**/api/v1/audit-logs**', async (route) => {
    const requestUrl = new URL(route.request().url());
    requestedUrls.push(requestUrl);

    const currentPage = Number(requestUrl.searchParams.get('page') ?? '1');
    const filtered = requestUrl.searchParams.get('action') === 'Added';
    const log = createAuditLog(
      filtered
        ? {
            id: '00000000-0000-0000-0000-000000000102',
            action: 'Added',
            entityId: 'recipe-e2e-added',
            oldValues: null,
            newValues: { Title: 'Công thức mới' },
          }
        : currentPage === 2
          ? {
              id: '00000000-0000-0000-0000-000000000103',
              entityId: 'recipe-e2e-103',
            }
          : {}
    );

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(paginatedAuditLogs([log], currentPage, filtered ? 1 : 21)),
    });
  });

  await seedDashboardSession(page, ['Admin']);
  await page.goto('/dashboard/logs');

  await expect(page.getByRole('heading', { name: 'Nhật ký hệ thống' })).toBeVisible();
  await expect(page.getByText('recipe-e2e-101')).toBeVisible();
  await page.getByText('Xem dữ liệu thay đổi').click();
  await expect(page.locator('pre').nth(0)).toContainText('Tên cũ');
  await expect(page.locator('pre').nth(1)).toContainText('Tên mới');

  await page.getByLabel('Hành động').selectOption('Added');
  await page.getByLabel('Loại dữ liệu').fill('Recipe');
  await page.getByRole('button', { name: 'Áp dụng bộ lọc' }).click();
  await expect(page.getByText('recipe-e2e-101')).toHaveCount(0);
  await expect(page.getByText('recipe-e2e-added')).toBeVisible();
  expect(requestedUrls.at(-1)?.searchParams.get('action')).toBe('Added');
  expect(requestedUrls.at(-1)?.searchParams.get('entityName')).toBe('Recipe');

  await page.getByRole('button', { name: 'Xóa bộ lọc' }).click();
  await expect(page.getByText('recipe-e2e-101')).toBeVisible();
  await page.getByRole('button', { name: 'Sau' }).click();
  await expect(page.getByText('recipe-e2e-103')).toBeVisible();
  expect(requestedUrls.at(-1)?.searchParams.get('page')).toBe('2');
});
