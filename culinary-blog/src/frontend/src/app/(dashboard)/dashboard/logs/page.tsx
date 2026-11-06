'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  History,
  RefreshCw,
  Search,
  ShieldAlert,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import LoadingState from '@/components/dashboard/LoadingState';
import { parseApiError } from '@/lib/api/error-handler';
import { useAuthStore } from '@/stores/auth-store';
import {
  auditLogService,
  type AuditLogAction,
  type AuditLogQuery,
  type AuditLogRecord,
  type PaginatedAuditLogs,
} from '@/services/auditLogService';

const PAGE_SIZE = 20;

const ACTION_LABELS: Record<AuditLogAction, string> = {
  Added: 'Tạo mới',
  Modified: 'Cập nhật',
  Deleted: 'Xóa',
  SoftDeleted: 'Xóa mềm',
};

const ACTION_STYLES: Record<AuditLogAction, string> = {
  Added: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Modified: 'border-amber-200 bg-amber-50 text-amber-800',
  Deleted: 'border-rose-200 bg-rose-50 text-rose-700',
  SoftDeleted: 'border-orange-200 bg-orange-50 text-orange-800',
};

interface AuditLogFilters {
  action: AuditLogAction | '';
  entityName: string;
  entityId: string;
  actorId: string;
  fromDate: string;
  toDate: string;
}

const EMPTY_FILTERS: AuditLogFilters = {
  action: '',
  entityName: '',
  entityId: '',
  actorId: '',
  fromDate: '',
  toDate: '',
};

function toQuery(filters: AuditLogFilters, page: number): AuditLogQuery {
  return {
    page,
    pageSize: PAGE_SIZE,
    ...(filters.action ? { action: filters.action } : {}),
    ...(filters.entityName.trim() ? { entityName: filters.entityName.trim() } : {}),
    ...(filters.entityId.trim() ? { entityId: filters.entityId.trim() } : {}),
    ...(filters.actorId.trim() ? { actorId: filters.actorId.trim() } : {}),
    ...(filters.fromDate ? { fromUtc: `${filters.fromDate}T00:00:00.000Z` } : {}),
    ...(filters.toDate ? { toUtc: `${filters.toDate}T23:59:59.999Z` } : {}),
  };
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function formatJson(value: Record<string, unknown> | null): string {
  return value ? JSON.stringify(value, null, 2) : 'Không có dữ liệu';
}

function AuditLogDetails({ log }: { log: AuditLogRecord }) {
  return (
    <details className="group border-t border-stone-100 pt-3">
      <summary className="cursor-pointer list-none text-sm font-semibold text-amber-700 hover:text-amber-800">
        <span className="group-open:hidden">Xem dữ liệu thay đổi</span>
        <span className="hidden group-open:inline">Ẩn dữ liệu thay đổi</span>
      </summary>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div>
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-stone-500">
            Trước khi thay đổi
          </h3>
          <pre className="max-h-80 overflow-auto rounded-lg bg-stone-950 p-4 text-xs leading-relaxed text-stone-100">
            {formatJson(log.oldValues)}
          </pre>
        </div>
        <div>
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-stone-500">
            Sau khi thay đổi
          </h3>
          <pre className="max-h-80 overflow-auto rounded-lg bg-stone-950 p-4 text-xs leading-relaxed text-stone-100">
            {formatJson(log.newValues)}
          </pre>
        </div>
      </div>
    </details>
  );
}

function AuditLogCard({ log }: { log: AuditLogRecord }) {
  return (
    <Card>
      <CardContent className="space-y-4 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <Badge className={ACTION_STYLES[log.action]} variant="outline">
              {ACTION_LABELS[log.action]}
            </Badge>
            <span className="font-semibold text-stone-900">{log.entityName}</span>
            <span className="break-all font-mono text-xs text-stone-500">
              {log.entityId ?? '—'}
            </span>
          </div>
          <time
            className="text-xs text-stone-500"
            dateTime={log.occurredAtUtc}
          >
            {formatDate(log.occurredAtUtc)}
          </time>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-stone-600">
          <span>
            <strong className="font-medium text-stone-800">Người thực hiện:</strong>{' '}
            {log.actorId ?? 'Tác vụ hệ thống'}
          </span>
          <span className="font-mono text-xs text-stone-400">ID: {log.id}</span>
        </div>

        <AuditLogDetails log={log} />
      </CardContent>
    </Card>
  );
}

export default function AuditLogsPage() {
  const user = useAuthStore((state) => state.user);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const isAdmin = user?.roles.includes('Admin') === true;

  const [draftFilters, setDraftFilters] = useState<AuditLogFilters>(EMPTY_FILTERS);
  const [filters, setFilters] = useState<AuditLogFilters>(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<PaginatedAuditLogs | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadVersion, setReloadVersion] = useState(0);

  useEffect(() => {
    if (!isHydrated || !isAdmin) {
      return;
    }

    const controller = new AbortController();

    auditLogService
      .getAuditLogs(toQuery(filters, page), controller.signal)
      .then(setResult)
      .catch((requestError: unknown) => {
        if (!controller.signal.aborted) {
          setError(parseApiError(requestError).message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [filters, isAdmin, isHydrated, page, reloadVersion]);

  const updateDraft = <K extends keyof AuditLogFilters>(
    key: K,
    value: AuditLogFilters[K]
  ) => {
    setDraftFilters((current) => ({ ...current, [key]: value }));
  };

  const applyFilters = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setPage(1);
    setFilters({ ...draftFilters });
  };

  const clearFilters = () => {
    setLoading(true);
    setError(null);
    setDraftFilters(EMPTY_FILTERS);
    setFilters(EMPTY_FILTERS);
    setPage(1);
  };

  const retryRequest = () => {
    setLoading(true);
    setError(null);
    setReloadVersion((version) => version + 1);
  };

  const changePage = (nextPage: number) => {
    setLoading(true);
    setError(null);
    setPage(nextPage);
  };

  if (!isHydrated) {
    return <LoadingState message="Đang kiểm tra quyền truy cập..." rows={2} />;
  }

  if (!isAdmin) {
    return (
      <Card className="mx-auto max-w-2xl">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <ShieldAlert className="h-10 w-10 text-rose-600" aria-hidden="true" />
          <div>
            <h1 className="text-xl font-bold text-stone-900">Không có quyền truy cập</h1>
            <p className="mt-2 text-sm text-stone-600">
              Trang nhật ký hệ thống chỉ dành cho tài khoản quản trị viên.
            </p>
          </div>
          <Link href="/dashboard" className={buttonVariants({ variant: 'outline' })}>
            Quay lại Dashboard
          </Link>
        </CardContent>
      </Card>
    );
  }

  const totalPages = result ? Math.ceil(result.totalCount / result.pageSize) : 0;

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-amber-700">
            <History className="h-5 w-5" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-[0.16em]">
              Quản trị hệ thống
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
            Nhật ký hệ thống
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-stone-600">
            Theo dõi ai đã thay đổi dữ liệu, thời điểm thực hiện và chi tiết trước/sau.
          </p>
        </div>
        <Badge variant="secondary">
          {result?.totalCount ?? 0} bản ghi
        </Badge>
      </header>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-base">
            <Search className="h-4 w-4 text-amber-700" aria-hidden="true" />
            Bộ lọc nhật ký
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={applyFilters} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <label className="space-y-1.5 text-sm font-medium text-stone-700">
              Hành động
              <select
                value={draftFilters.action}
                onChange={(event) => updateDraft('action', event.target.value as AuditLogFilters['action'])}
                className="h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <option value="">Tất cả hành động</option>
                <option value="Added">Tạo mới</option>
                <option value="Modified">Cập nhật</option>
                <option value="Deleted">Xóa</option>
                <option value="SoftDeleted">Xóa mềm</option>
              </select>
            </label>

            <label className="space-y-1.5 text-sm font-medium text-stone-700">
              Loại dữ liệu
              <Input
                value={draftFilters.entityName}
                onChange={(event) => updateDraft('entityName', event.target.value)}
                placeholder="Ví dụ: Recipe"
              />
            </label>

            <label className="space-y-1.5 text-sm font-medium text-stone-700">
              ID dữ liệu
              <Input
                value={draftFilters.entityId}
                onChange={(event) => updateDraft('entityId', event.target.value)}
                placeholder="ID entity"
              />
            </label>

            <label className="space-y-1.5 text-sm font-medium text-stone-700">
              Người thực hiện
              <Input
                value={draftFilters.actorId}
                onChange={(event) => updateDraft('actorId', event.target.value)}
                placeholder="Actor ID"
              />
            </label>

            <label className="space-y-1.5 text-sm font-medium text-stone-700">
              Từ ngày (UTC)
              <Input
                type="date"
                value={draftFilters.fromDate}
                onChange={(event) => updateDraft('fromDate', event.target.value)}
              />
            </label>

            <label className="space-y-1.5 text-sm font-medium text-stone-700">
              Đến ngày (UTC)
              <Input
                type="date"
                value={draftFilters.toDate}
                onChange={(event) => updateDraft('toDate', event.target.value)}
              />
            </label>

            <div className="flex flex-wrap gap-2 sm:col-span-2 xl:col-span-3">
              <Button type="submit" disabled={loading}>
                <Search className="mr-2 h-4 w-4" aria-hidden="true" />
                Áp dụng bộ lọc
              </Button>
              <Button type="button" variant="outline" onClick={clearFilters}>
                Xóa bộ lọc
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between gap-4">
        <h2 className="font-semibold text-stone-900">Lịch sử hoạt động</h2>
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={loading}
          onClick={retryRequest}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />
          Tải lại
        </Button>
      </div>

      {error && (
        <Card className="border-rose-200">
          <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p role="alert" className="text-sm text-rose-700">{error}</p>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={retryRequest}
            >
              Thử lại
            </Button>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <LoadingState message="Đang tải nhật ký..." rows={4} />
      ) : result?.items.length ? (
        <div className="space-y-3">
          {result.items.map((log) => <AuditLogCard key={log.id} log={log} />)}
        </div>
      ) : !error ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 p-10 text-center">
            <History className="h-9 w-9 text-stone-300" aria-hidden="true" />
            <div>
              <h2 className="font-semibold text-stone-800">Chưa có nhật ký phù hợp</h2>
              <p className="mt-1 text-sm text-stone-500">
                Thử bỏ bớt bộ lọc hoặc kiểm tra lại sau khi có hoạt động mới.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {result && result.totalCount > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3">
          <p className="text-sm text-stone-600">
            Trang {result.page} / {totalPages} · {result.totalCount} bản ghi
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={loading || page <= 1}
              onClick={() => changePage(page - 1)}
            >
              <ChevronLeft className="mr-1 h-4 w-4" aria-hidden="true" />
              Trước
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={loading || page >= totalPages}
              onClick={() => changePage(page + 1)}
            >
              Sau
              <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
