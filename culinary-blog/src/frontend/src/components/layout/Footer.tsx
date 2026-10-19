import React from 'react';
import Link from 'next/link';
import { MainContainer } from './MainContainer';
import { Heart, ChefHat, Mail, Globe, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type FooterProps = {
  variant?: 'main' | 'compact';
};

export function Footer({ variant = 'main' }: FooterProps) {
  if (variant === 'compact') {
    return (
      <footer className="w-full text-center py-6 text-xs text-stone-400">
        © 2026 CulinaryBlog • PTUD Web Nâng Cao Nhóm 14
      </footer>
    );
  }

  return (
    <footer className="w-full bg-stone-900 text-stone-300 border-t border-stone-800 mt-auto">
      <MainContainer size="default" className="py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Logo & Giới thiệu */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center text-white shadow-md">
                <ChefHat className="h-6 w-6" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Culinary<span className="text-amber-500">Blog</span>
              </span>
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              Nền tảng chia sẻ và khám phá công thức ẩm thực hàng đầu. Nơi hội tụ tinh hoa ẩm thực Việt Nam và thế giới cùng cộng đồng đầu bếp gia đình.
            </p>
            <div className="flex items-center gap-3 pt-2 text-stone-400">
              <a
                href="https://github.com/Nguyen-Minh123/PTUDWEBNC_Nhom14"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-all"
                aria-label="GitHub Repository"
              >
                <Code2 className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-all"
                aria-label="Website"
              >
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Cột 1: Khám phá */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider text-white uppercase">
              Khám Phá
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/recipes" className="hover:text-amber-400 transition-colors">
                  Tất cả công thức
                </Link>
              </li>
              <li>
                <Link href="/recipes?sort=-reviewCount" className="hover:text-amber-400 transition-colors">
                  Món ăn phổ biến
                </Link>
              </li>
              <li>
                <Link href="/recipes?difficulty=Easy" className="hover:text-amber-400 transition-colors">
                  Món ngon dễ làm
                </Link>
              </li>
              <li>
                <Link href="/recipes?sort=-createdAt" className="hover:text-amber-400 transition-colors">
                  Công thức mới nhất
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 2: Danh mục */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider text-white uppercase">
              Chuyên Mục
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/recipes?category=mon-viet" className="hover:text-amber-400 transition-colors">
                  Món Việt Truyền Thống
                </Link>
              </li>
              <li>
                <Link href="/recipes?category=mon-chay" className="hover:text-amber-400 transition-colors">
                  Món Ăn Chay Thanh Đạm
                </Link>
              </li>
              <li>
                <Link href="/recipes?category=trang-mieng" className="hover:text-amber-400 transition-colors">
                  Bánh & Tráng Miệng
                </Link>
              </li>
              <li>
                <Link href="/recipes?category=thuc-uong" className="hover:text-amber-400 transition-colors">
                  Đồ Uống & Nước Ép
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Bản tin ẩm thực */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider text-white uppercase">
              Bản Tin Ẩm Thực
            </h4>
            <p className="text-xs text-stone-400">
              Đăng ký để nhận công thức mới và bí quyết nấu ăn vào mỗi tuần.
            </p>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Email của bạn..."
                  className="bg-stone-800 border-stone-700 text-stone-100 placeholder:text-stone-500 h-9 text-xs focus-visible:ring-amber-500"
                />
              </div>
              <Button size="sm" className="w-full bg-amber-600 hover:bg-amber-700 text-xs font-semibold h-9">
                <Mail className="h-3.5 w-3.5 mr-1.5" />
                Đăng ký nhận tin
              </Button>
            </div>
          </div>
        </div>

        {/* Bản quyền & ghi chú */}
        <div className="mt-12 pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>
            © {new Date().getFullYear()} CulinaryBlog. Dự án Phát triển Ứng dụng Web Nâng Cao - Nhóm 14.
          </p>
          <p className="flex items-center gap-1">
            Được phát triển với <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 inline" /> bởi Nhóm 14
          </p>
        </div>
      </MainContainer>
    </footer>
  );
}
