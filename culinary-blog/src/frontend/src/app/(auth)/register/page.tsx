'use client';

import React, { useState, Suspense, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  UserPlus,
} from 'lucide-react';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/stores/auth-store';
import { extractErrorMessage } from '@/lib/api/error-handler';

function RegisterFormContent() {
  const router = useRouter();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const setSession = useAuthStore((state) => state.setSession);

  // Tính độ mạnh mật khẩu (Password Strength)
  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, label: '', color: 'bg-stone-200' };
    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 2) return { score, label: 'Mật khẩu yếu', color: 'bg-rose-500', width: 'w-1/3' };
    if (score <= 4) return { score, label: 'Mật khẩu vừa phải', color: 'bg-amber-500', width: 'w-2/3' };
    return { score, label: 'Mật khẩu mạnh & an toàn', color: 'bg-emerald-500', width: 'w-full' };
  }, [password]);

  const passwordsMatch = !confirmPassword || password === confirmPassword;

  // Xử lý nộp form Đăng Ký
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!displayName.trim() || !email.trim() || !password.trim()) {
      setErrorMessage('Vui lòng điền đầy đủ các thông tin bắt buộc.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Mật khẩu phải có độ dài tối thiểu 6 ký tự.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Mật khẩu xác nhận không khớp với mật khẩu đã nhập.');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage('Vui lòng đọc và đồng ý với Điều khoản sử dụng & Chính sách bảo mật.');
      return;
    }

    setLoading(true);

    try {
      // 1. Gọi authService.register
      const authResult = await authService.register(email, password, displayName);

      // 2. Lưu thông tin vào Auth Store
      setSession({
        accessToken: authResult.accessToken,
        refreshToken: authResult.refreshToken,
        user: {
          id: authResult.user.id,
          email: authResult.user.email,
          displayName: authResult.user.displayName,
          avatarUrl: authResult.user.avatarUrl,
          bio: authResult.user.bio,
          roles: authResult.user.roles || ['User'],
        },
      });

      setSuccessMessage('Đăng ký tài khoản thành công! Đang chuyển hướng vào hệ thống...');

      // 3. Tự động đăng nhập
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/dashboard',
      });

      setTimeout(() => {
        router.push('/dashboard');
        router.refresh();
      }, 900);
    } catch (err) {
      setErrorMessage(extractErrorMessage(err) || 'Không thể tạo tài khoản. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  // Đăng nhập nhanh bằng Google
  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const authResult = await authService.loginWithGoogle('mock_google_id_token');

      setSession({
        accessToken: authResult.accessToken,
        refreshToken: authResult.refreshToken,
        user: {
          id: authResult.user.id,
          email: authResult.user.email,
          displayName: authResult.user.displayName,
          avatarUrl: authResult.user.avatarUrl,
          bio: authResult.user.bio,
          roles: authResult.user.roles || ['User'],
        },
      });

      await signIn('credentials', {
        email: authResult.user.email,
        redirect: false,
        callbackUrl: '/dashboard',
      });

      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setErrorMessage(extractErrorMessage(err) || 'Không thể kết nối dịch vụ Google OAuth.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl shadow-amber-900/5 border border-amber-100/80 p-6 sm:p-8">
        {/* Header Form */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-50 text-orange-600 mb-3 shadow-inner">
            <UserPlus className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">Tạo Tài Khoản Mới</h1>
          <p className="text-xs text-stone-500 mt-1">
            Gia nhập cộng đồng Culinary Blog và chia sẻ công thức tuyệt đỉnh.
          </p>
        </div>

        {/* Thông báo lỗi & thành công */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2.5 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div className="leading-relaxed">{errorMessage}</div>
          </div>
        )}

        {successMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 flex items-start gap-2.5 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div className="leading-relaxed">{successMessage}</div>
          </div>
        )}

        {/* Form Đăng Ký */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Họ và Tên / Biệt danh đầu bếp
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Đầu bếp Tuấn Khang"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all bg-stone-50/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Địa chỉ Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tuan.khang@gmail.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all bg-stone-50/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Mật khẩu
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ít nhất 6 ký tự"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all bg-stone-50/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Thanh đo độ mạnh mật khẩu */}
            {password && (
              <div className="mt-2 space-y-1">
                <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${passwordStrength.color} ${passwordStrength.width} transition-all duration-300`}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] text-stone-500">
                  <span>{passwordStrength.label}</span>
                  <span>{password.length} ký tự</span>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Xác nhận Mật khẩu
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Nhập lại mật khẩu"
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none transition-all bg-stone-50/30 ${
                  !passwordsMatch
                    ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10'
                    : 'border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600 focus:outline-none"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {!passwordsMatch && (
              <p className="text-[11px] text-rose-500 mt-1">Mật khẩu xác nhận không khớp.</p>
            )}
          </div>

          {/* Điều khoản dịch vụ */}
          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 rounded border-stone-300 text-amber-600 focus:ring-amber-500 mt-0.5"
              />
              <span className="text-xs text-stone-600 leading-relaxed select-none">
                Tôi đồng ý với{' '}
                <span className="text-amber-700 font-medium underline underline-offset-2">
                  Điều khoản sử dụng
                </span>{' '}
                và{' '}
                <span className="text-amber-700 font-medium underline underline-offset-2">
                  Chính sách bảo mật
                </span>{' '}
                của Culinary Blog.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || !passwordsMatch}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all shadow-md shadow-orange-600/20 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Đang xử lý đăng ký...</span>
              </>
            ) : (
              <>
                <span>Hoàn Tất Đăng Ký</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider Hoặc */}
        <div className="my-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-stone-400 font-medium">Hoặc đăng ký nhanh với</span>
            </div>
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="mt-4 w-full flex items-center justify-center gap-2.5 py-2.5 px-4 border border-stone-200 hover:border-stone-300 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-all shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Đăng ký với Google</span>
          </button>
        </div>

        {/* Footer chuyển sang Login */}
        <div className="pt-4 border-t border-stone-100 text-center">
          <p className="text-xs text-stone-500">
            Đã có tài khoản?{' '}
            <Link
              href="/login"
              className="font-semibold text-amber-600 hover:text-amber-700 transition-colors inline-flex items-center gap-0.5"
            >
              Đăng nhập ngay <ArrowRight className="w-3 h-3" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[400px] flex items-center justify-center text-sm text-stone-500">
          Đang tải trang đăng ký...
        </div>
      }
    >
      <RegisterFormContent />
    </Suspense>
  );
}
