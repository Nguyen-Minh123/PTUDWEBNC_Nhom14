'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, KeyRound, ChefHat } from 'lucide-react';
import { authService } from '@/services/authService';
import { extractErrorMessage } from '@/lib/api/error-handler';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{
    message: string;
    resetToken?: string | null;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessInfo(null);

    if (!email.trim()) {
      setErrorMessage('Vui lòng nhập địa chỉ Email của bạn.');
      return;
    }

    setLoading(true);

    try {
      const result = await authService.forgotPassword(email.trim());
      setSuccessInfo({
        message: result.message || 'Nếu email này tồn tại trong hệ thống, hướng dẫn đặt lại mật khẩu đã được gửi.',
        resetToken: result.resetToken,
      });
    } catch (err) {
      setErrorMessage(
        extractErrorMessage(err) || 'Không thể gửi yêu cầu đặt lại mật khẩu. Vui lòng thử lại sau.'
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
          <KeyRound className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-bold text-stone-900 tracking-tight">Quên mật khẩu?</h1>
        <p className="mt-2 text-xs sm:text-sm text-stone-500 max-w-xs mx-auto">
          Nhập email tài khoản của bạn để nhận mã token và hướng dẫn đặt lại mật khẩu.
        </p>
      </div>

      {/* Thông báo lỗi */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-start gap-3 text-xs leading-relaxed animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Trạng thái gửi thành công */}
      {successInfo ? (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs leading-relaxed flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-emerald-900 mb-1">Yêu cầu đã được tiếp nhận!</p>
              <p>{successInfo.message}</p>
            </div>
          </div>

          {/* Hộp tiện ích Token trong môi trường phát triển / Demo */}
          {successInfo.resetToken && (
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs space-y-3">
              <div className="flex items-center gap-2 font-semibold text-amber-900">
                <ChefHat className="w-4 h-4 text-amber-600" />
                <span>Môi trường Thử nghiệm (Dev Demo Token):</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-amber-200 text-[11px] font-mono text-stone-700 break-all select-all">
                {successInfo.resetToken}
              </div>
              <Link
                href={`/reset-password?email=${encodeURIComponent(email)}&token=${encodeURIComponent(
                  successInfo.resetToken
                )}`}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold transition-all shadow-xs"
              >
                <span>Chuyển tới trang Đặt lại mật khẩu ngay</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          <div className="pt-2 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-amber-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại trang Đăng nhập</span>
            </Link>
          </div>
        </div>
      ) : (
        /* Form gửi yêu cầu */
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-stone-700 mb-1.5">
              Địa chỉ Email tài khoản <span className="text-rose-500">*</span>
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-sm focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all placeholder:text-stone-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm transition-all shadow-md shadow-amber-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Đang gửi yêu cầu...</span>
              </>
            ) : (
              <>
                <span>Gửi yêu cầu khôi phục</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="text-center pt-2">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-amber-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại trang Đăng nhập</span>
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
