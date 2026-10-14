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
    <footer className="bg-white border-t border-gray-200/80 py-8 px-4 text-center text-xs text-gray-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🍲</span>
          <span className="font-bold text-gray-800">Culinary Blog - Nhóm 14</span>
          <span className="text-gray-400">© 2026 PTUDWeb Nâng Cao</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-gray-400">
          <span>FR-DOM-007 (UnsupportedSortFieldException)</span>
          <span>•</span>
          <span>FR-FTE-005 (Tìm kiếm &amp; Comment)</span>
          <span>•</span>
          <span>FR-FTE-006 (Mapster ProjectToType DTOs)</span>
        </div>
      </div>
    </footer>
  );
}
