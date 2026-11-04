import { apiClient } from '@/lib/api/axios';

export type AuditLogAction = 'Added' | 'Modified' | 'Deleted' | 'SoftDeleted';

export interface AuditLogRecord {
  id: string;
  occurredAtUtc: string;
  actorId: string | null;
  action: AuditLogAction;
  entityName: string;
  entityId: string | null;
  oldValues: Record<string, unknown> | null;
  newValues: Record<string, unknown> | null;
}

export interface PaginatedAuditLogs {
  items: AuditLogRecord[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface AuditLogQuery {
  action?: AuditLogAction;
  entityName?: string;
  entityId?: string;
  actorId?: string;
  fromUtc?: string;
  toUtc?: string;
  page: number;
  pageSize: number;
}

export const auditLogService = {
  async getAuditLogs(
    query: AuditLogQuery,
    signal?: AbortSignal
  ): Promise<PaginatedAuditLogs> {
    const response = await apiClient.get<PaginatedAuditLogs>('/api/v1/audit-logs', {
      params: query,
      signal,
    });

    return response.data;
  },
};
