#!/bin/sh
set -eu

backup_interval="${BACKUP_INTERVAL_SECONDS:-86400}"
retention_days="${BACKUP_RETENTION_DAYS:-7}"

while :; do
  until pg_isready -h postgres -U "$POSTGRES_USER" -d "$POSTGRES_DB" >/dev/null 2>&1; do
    sleep 2
  done

  until redis-cli -h redis ping >/dev/null 2>&1; do
    sleep 2
  done

  timestamp="$(date -u +%Y%m%dT%H%M%SZ)"
  backup_dir="/backups/${timestamp}"
  mkdir -p "$backup_dir"

  PGPASSWORD="$POSTGRES_PASSWORD" pg_dump \
    --host=postgres \
    --username="$POSTGRES_USER" \
    --dbname="$POSTGRES_DB" \
    --format=custom \
    --file="$backup_dir/postgres.dump"

  redis-cli -h redis --rdb "$backup_dir/redis.rdb"
  tar -czf "$backup_dir/minio-data.tar.gz" -C /source/minio .
  printf '%s\n' "$timestamp" > "$backup_dir/created-at.txt"

  find /backups -mindepth 1 -maxdepth 1 -type d -mtime "+$retention_days" -exec rm -rf {} \;
  sleep "$backup_interval"
done