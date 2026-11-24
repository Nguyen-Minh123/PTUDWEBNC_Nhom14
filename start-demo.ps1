# ==============================================================================
# KỊCH BẢN KHỞI CHẠY DEMO CUỐI KỲ 1-CLICK - DỰ ÁN CULINARY BLOG (NHÓM 14)
# Tự động bật hạ tầng Docker, khởi chạy Backend .NET 10 (tự động nạp 12 Category
# & 55 Công thức món ăn thật, xóa dữ liệu test cũ) và khởi chạy Frontend Next.js 16
# ==============================================================================

$ErrorActionPreference = "Continue"
$RepoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host "   KHOI DONG HE THONG DEMO CULINARY BLOG - NHOM 14 (LAB 01 - 08) " -ForegroundColor Yellow
Write-Host "   Du lieu thuc te: 12 Categories & 55 Cong thuc Am thuc Viet Nam" -ForegroundColor Green
Write-Host "=================================================================" -ForegroundColor Cyan

# 1. Khởi chạy Docker Desktop (nếu chưa bật) & Docker Compose (PostgreSQL 16, Redis 7, MinIO S3)
Write-Host "`n[1/3] Dang kiem tra Docker Desktop va khoi dong cum dich vu (PostgreSQL, Redis, MinIO)..." -ForegroundColor Cyan
docker info --format '{{.ServerVersion}}' 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) {
    $dockerExe = "C:\Users\admin\AppData\Local\Programs\DockerDesktop\Docker Desktop.exe"
    if (Test-Path $dockerExe) {
        Write-Host "  -> Dang bat Docker Desktop..." -ForegroundColor Yellow
        Invoke-CimMethod -ClassName Win32_Process -MethodName Create -Arguments @{ CommandLine = "`"$dockerExe`"" } | Out-Null
        for ($i = 0; $i -lt 30; $i++) {
            Start-Sleep -Seconds 2
            docker info --format '{{.ServerVersion}}' 2>$null | Out-Null
            if ($LASTEXITCODE -eq 0) { break }
        }
    }
}
docker compose -f "$RepoRoot\culinary-blog\docker-compose.yml" up -d
Start-Sleep -Seconds 2

# 2. Khởi chạy Backend Web API (.NET 10) trong cửa sổ PowerShell mới
Write-Host "`n[2/3] Dang khoi dong Backend Web API (.NET 10 Minimal APIs) tai http://localhost:5075 ..." -ForegroundColor Cyan
$BackendCmd = "cd '$RepoRoot'; dotnet run --project culinary-blog/src/backend/src/CulinaryBlog.API/CulinaryBlog.API.csproj --launch-profile http"
Start-Process powershell -ArgumentList "-NoExit", "-Command", $BackendCmd

# 3. Khởi chạy Frontend (Next.js 16 App Router) trong cửa sổ PowerShell mới
Write-Host "`n[3/3] Dang khoi dong Frontend (Next.js 16 App Router) tai http://localhost:3000 ..." -ForegroundColor Cyan
$FrontendCmd = "cd '$RepoRoot\culinary-blog\src\frontend'; npm run dev"
Start-Process powershell -ArgumentList "-NoExit", "-Command", $FrontendCmd

Write-Host "`nHe thong dang khoi dong! Trong giay lat hay mo trinh duyet tai:" -ForegroundColor Green
Write-Host "  -> Giao dien chinh (Frontend): http://localhost:3000" -ForegroundColor Yellow
Write-Host "  -> Trang Dang nhap 1-Click:    http://localhost:3000/login" -ForegroundColor Yellow
Write-Host "  -> Tai lieu API (Scalar UI):   http://localhost:5075/scalar/v1" -ForegroundColor Yellow
