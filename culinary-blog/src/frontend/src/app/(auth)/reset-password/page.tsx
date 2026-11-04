'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';
import { authService } from '@/services/authService';
import { extractErrorMessage } from '@/lib/api/error-handler';

function ResetPasswordFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [token, setToken] = useState(searchParams.get('token') || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Tính độ mạnh mật khẩu (Password Strength Meter)
  const passwordStrength = useMemo(() => {
    if (!newPassword) return { score: 0, label: '', color: 'bg-stone-200', width: 'w-0' };
    let score = 0;
    if (newPassword.length >= 6) score += 1;
    if (newPassword.length >= 8) score += 1;
    if (/[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword)) score += 1;
    if (/[0-9]/.test(newPassword)) score += 1;
    if (/[^A-Za-z0-9]/.test(newPassword)) score += 1;

    if (score <= 2) return { score, label: 'Mật khẩu yếu', color: 'bg-rose-500', width: 'w-1/3' };
    if (score <= 4) return { score, label: 'Mật khẩu vừa phải', color: 'bg-amber-500', width: 'w-2/3' };
    return { score, label: 'Mật khẩu mạnh & an toàn', color: 'bg-emerald-500', width: 'w-full' };
  }, [newPassword]);

  const passwordsMatch = !confirmPassword || newPassword === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !token.trim() || !newPassword.trim()) {
      setErrorMessage('Vui lòng điền đầy đủ Email, Mã token và Mật khẩu mới.');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage('Mật khẩu mới phải có tối thiểu 6 ký tự.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Mật khẩu xác nhận không khớp với mật khẩu mới.');
      return;
    }

    setLoading(true);

    try {
      await authService.resetPassword({
        email: email.trim(),
        token: token.trim(),
        newPassword,
        confirmPassword,
      });

      setIsSuccess(true);
    } catch (err) {
      setErrorMessage(
        extractErrorMessage(err) || 'Không thể đặt lại mật khẩu. Mã token có thể không hợp lệ hoặc đã hết hạn.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-amber-950/5 border border-stone-200/80 p-8 sm:p-10">
      {/* Icon & Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/60 text-amber-600 mb-4 shadow-xs">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-bold text-stone-900 tracking-tight">Đặt lại mật khẩu</h1>
        <p className="mt-2 text-xs sm:text-sm text-stone-500 max-w-xs mx-auto">
          Nhập mã token khôi phục và thiết lập mật khẩu mới cho tài khoản của bạn.
        </p>
      </div>

      {/* Thông báo lỗi */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-start gap-3 text-xs leading-relaxed animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Trạng thái thành công */}
      {isSuccess ? (
        <div className="space-y-6 text-center">
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs leading-relaxed flex items-start gap-3 text-left">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-emerald-900 mb-1">Đặt lại mật khẩu thành công!</p>
              <p>Mật khẩu của bạn đã được cập nhật. Bạn có thể đăng nhập ngay với mật khẩu mới.</p>
            </div>
          </div>

          <Link
            href="/login"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm transition-all shadow-md shadow-amber-600/20"
          >
            <span>Đăng nhập ngay</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        /* Form Reset Password */
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-stone-700 mb-1.5">
              Địa chỉ Email <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="chef@culinary.vn"
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-200 bg-stone-50/50 text-sm focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all placeholder:text-stone-400"
              />
            </div>
          </div>

          <div>
            <label htmlFor="token" className="block text-xs font-semibold text-stone-700 mb-1.5">
              Mã Token khôi phục <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                id="token"
                type="text"
                required
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Dán mã token khôi phục vào đây"
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-200 bg-stone-50/50 text-sm font-mono focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all placeholder:text-stone-400 text-xs"
              />
            </div>
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-xs font-semibold text-stone-700 mb-1.5">
              Mật khẩu mới <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="newPassword"
                type={showNewPassword ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Tối thiểu 6 ký tự, có hoa, thường, số"
                className="w-full pl-10 pr-10 py-2 rounded-xl border border-stone-200 bg-stone-50/50 text-sm focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all placeholder:text-stone-400"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-600 transition-colors"
                aria-label={showNewPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Thanh đo độ mạnh mật khẩu */}
            {newPassword && (
              <div className="mt-2 space-y-1">
                <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${passwordStrength.color} ${passwordStrength.width}`}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] text-stone-500">
                  <span>{passwordStrength.label}</span>
                  <span>Chữ hoa, thường, số, ký tự đặc biệt</span>
                </div>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-xs font-semibold text-stone-700 mb-1.5">
              Xác nhận mật khẩu mới <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Nhập lại mật khẩu mới"
                className={`w-full pl-10 pr-10 py-2 rounded-xl border bg-stone-50/50 text-sm focus:outline-none focus:bg-white transition-all placeholder:text-stone-400 ${
                  passwordsMatch
                    ? 'border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                    : 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-600 transition-colors"
                aria-label={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {!passwordsMatch && (
              <p className="mt-1 text-[11px] text-rose-500">Mật khẩu xác nhận chưa khớp.</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !passwordsMatch}
            className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm transition-all shadow-md shadow-amber-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Đang xử lý...</span>
              </>
            ) : (
              <>
                <span>Đặt lại mật khẩu</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="text-center pt-2">
            <Link
              href="/login"
              className="text-xs font-semibold text-stone-600 hover:text-amber-600 transition-colors"
            >
              Hủy và quay lại Đăng nhập
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[400px] flex items-center justify-center text-sm text-stone-500">
          Đang tải trang đặt lại mật khẩu...
        </div>
      }
    >
      <ResetPasswordFormContent />
    </Suspense>
  );
}
