# Lab 7 â€” FR-FTE-039: Xem áº£nh phÃ³ng to vÃ  Ä‘Ã¡nh giÃ¡/bÃ¬nh luáº­n

## Má»¥c tiÃªu

Cho phÃ©p ngÆ°á»i xem má»Ÿ áº£nh cÃ´ng thá»©c á»Ÿ kÃ­ch thÆ°á»›c lá»›n vÃ  sá»­ dá»¥ng giao diá»‡n Ä‘Ã¡nh giÃ¡, bÃ¬nh luáº­n cÆ¡ báº£n ngay trÃªn trang chi tiáº¿t cÃ´ng thá»©c.

## Hiá»‡n tráº¡ng

- `RecipeHero` Ä‘ang hiá»ƒn thá»‹ áº£nh bÃ¬a tÄ©nh, chÆ°a cÃ³ thao tÃ¡c má»Ÿ áº£nh lá»›n; API detail Ä‘Ã£ tráº£ danh sÃ¡ch `images` gá»“m áº£nh gá»‘c, medium, thumbnail, alt text vÃ  cá» áº£nh chÃ­nh.
- `RecipeReviews` hiá»ƒn thá»‹ danh sÃ¡ch review hard-code vÃ  chá»‰ lÆ°u review má»›i trong state cá»§a component.
- `CommentSection` Ä‘Ã£ cÃ³ form chá»n sao, gá»­i bÃ¬nh luáº­n, danh sÃ¡ch bÃ¬nh luáº­n, lÆ°á»£t thÃ­ch vÃ  tráº¡ng thÃ¡i rá»—ng; component dÃ¹ng `commentService` hiá»‡n táº¡i Ä‘á»ƒ giá»¯ dá»¯ liá»‡u trong bá»™ nhá»› phiÃªn cháº¡y.
- Trang detail Ä‘ang gáº¯n `RecipeReviews`; `CommentSection` hiá»‡n chá»‰ Ä‘Æ°á»£c dÃ¹ng á»Ÿ modal xem nhanh.
- Next Image Ä‘Ã£ cho phÃ©p cÃ¡c nguá»“n hiá»‡n cÃ³ gá»“m Unsplash, MinIO localhost vÃ  API production.

## Pháº¡m vi triá»ƒn khai

- ThÃªm nÃºt má»Ÿ áº£nh bÃ¬a/áº£nh cÃ´ng thá»©c trong `RecipeHero`; má»Ÿ dialog phÃ³ng to, hiá»ƒn thá»‹ alt text, há»— trá»£ Ä‘Ã³ng báº±ng Escape/backdrop vÃ  Ä‘iá»u hÆ°á»›ng áº£nh khi cÃ³ nhiá»u áº£nh.
- DÃ¹ng áº£nh API theo thá»© tá»± vÃ  Æ°u tiÃªn áº£nh chÃ­nh; dÃ¹ng áº£nh bÃ¬a hoáº·c áº£nh máº·c Ä‘á»‹nh lÃ m fallback khi danh sÃ¡ch áº£nh trá»‘ng.
- Thay `RecipeReviews` báº±ng `CommentSection` trÃªn trang detail, truyá»n ID vÃ  tÃªn mÃ³n Ä‘á»ƒ gáº¯n bÃ¬nh luáº­n Ä‘Ãºng cÃ´ng thá»©c.
- Giá»¯ nguyÃªn `commentService` hiá»‡n há»¯u; pháº§n bÃ¬nh luáº­n nÃ y lÃ  giao diá»‡n cÆ¡ báº£n vÃ  dá»¯ liá»‡u Ä‘ang á»Ÿ bá»™ nhá»› client, chÆ°a pháº£i lÆ°u trá»¯ bá»n vá»¯ng trÃªn backend.
- KhÃ´ng chá»‰nh sá»­a/xÃ³a component `RecipeReviews.tsx` hoáº·c cÃ¡c file ngoÃ i pháº¡m vi; khÃ´ng lÃ m FR-TST-009.

## File dá»± kiáº¿n sá»­a/thÃªm

| File | Thay Ä‘á»•i |
| --- | --- |
| `culinary-blog/src/frontend/src/components/recipe-detail/RecipeHero.tsx` | Dá»±ng danh sÃ¡ch áº£nh, má»Ÿ lightbox vÃ  Ä‘iá»u hÆ°á»›ng áº£nh trong dialog. |
| `culinary-blog/src/frontend/src/app/(main)/recipes/[id]/page.tsx` | DÃ¹ng `CommentSection` hiá»‡n cÃ³ thay cho danh sÃ¡ch review máº«u. |
| `docs/KeHoachTrienKhai/Lab7/Lab7_README_FR-FTE-039.md` | Ghi káº¿ hoáº¡ch, hÃ nh vi vÃ  giá»›i háº¡n lÆ°u trá»¯ bÃ¬nh luáº­n. |

## Luá»“ng hoáº¡t Ä‘á»™ng

1. Trang detail truyá»n `RecipeDetailDto` Ä‘áº§y Ä‘á»§ sang `RecipeHero`.
2. `RecipeHero` Æ°u tiÃªn áº£nh `isPrimary`, sau Ä‘Ã³ theo `orderIndex`; ngÆ°á»i dÃ¹ng báº¥m áº£nh Ä‘á»ƒ má»Ÿ dialog phÃ³ng lá»›n, dÃ¹ng nÃºt trÆ°á»›c/sau Ä‘á»ƒ Ä‘á»•i áº£nh vÃ  Escape/backdrop/nÃºt Ä‘Ã³ng Ä‘á»ƒ thoÃ¡t.
3. Trang detail truyá»n `fullRecipe.id` vÃ  `fullRecipe.title` cho `CommentSection`.
4. `CommentSection` táº£i bÃ¬nh luáº­n theo recipe ID, tÃ­nh Ä‘iá»ƒm trung bÃ¬nh tá»« cÃ¡c bÃ¬nh luáº­n hiá»‡n cÃ³; khi gá»­i, thÃªm bÃ¬nh luáº­n vÃ  cáº­p nháº­t giao diá»‡n ngay qua `commentService`.

## Ghi chÃº giáº£i thÃ­ch code

- DÃ¹ng `Dialog` hiá»‡n cÃ³ Ä‘á»ƒ giá»¯ cÃ¡ch Ä‘Ã³ng vÃ  lá»›p phá»§ thá»‘ng nháº¥t vá»›i component UI trong dá»± Ã¡n.
- Chá»‰ táº¡o danh sÃ¡ch áº£nh má»›i cho trÃ¬nh bÃ y; khÃ´ng mutate `recipe.images` Ä‘Æ°á»£c React Query cache.
- `isPrimary` vÃ  `orderIndex` Ä‘áº£m báº£o áº£nh Ä‘áº¡i diá»‡n á»•n Ä‘á»‹nh; fallback trÃ¡nh trang máº¥t áº£nh khi API chÆ°a cÃ³ gallery.
- TÃ¡i sá»­ dá»¥ng `CommentSection` giÃºp trÃ¡nh nhÃ¢n Ä‘Ã´i form, state Ä‘Ã¡nh giÃ¡, logic like vÃ  tÃ­nh trung bÃ¬nh.
- `commentService` hiá»‡n lÆ°u trong bá»™ nhá»› á»©ng dá»¥ng; reload trang cÃ³ thá»ƒ lÃ m máº¥t bÃ¬nh luáº­n do chÆ°a káº¿t ná»‘i API/persistence.

## Kiá»ƒm tra sau triá»ƒn khai

- Cháº¡y ESLint trÃªn `RecipeHero.tsx` vÃ  trang detail.
- Cháº¡y production build frontend.
- Kiá»ƒm tra má»™t cÃ´ng thá»©c cÃ³ nhiá»u áº£nh, má»™t cÃ´ng thá»©c chá»‰ cÃ³ áº£nh bÃ¬a vÃ  má»™t cÃ´ng thá»©c khÃ´ng cÃ³ áº£nh.
- Thá»­ má»Ÿ/Ä‘Ã³ng dialog báº±ng nÃºt, backdrop, Escape; thá»­ Ä‘á»•i áº£nh náº¿u gallery cÃ³ nhiá»u áº£nh.
- Thá»­ gá»­i bÃ¬nh luáº­n, Ä‘á»•i rating, like bÃ¬nh luáº­n vÃ  xÃ¡c nháº­n chá»‰ dá»¯ liá»‡u Ä‘Ãºng recipe Ä‘Æ°á»£c hiá»ƒn thá»‹.

## CÃ´ng cá»¥/mÃ´i trÆ°á»ng

- DÃ¹ng React, Next Image, Dialog, Lucide vÃ  `commentService` hiá»‡n cÃ³; khÃ´ng cáº§n package má»›i.
- Kiá»ƒm tra giao diá»‡n cáº§n cháº¡y frontend; dá»¯ liá»‡u bÃ¬nh luáº­n cÆ¡ báº£n dÃ¹ng Ä‘Æ°á»£c cá»¥c bá»™. Kiá»ƒm tra áº£nh API cáº§n endpoint/backend cÃ³ dá»¯ liá»‡u áº£nh.
- KhÃ´ng báº¯t buá»™c Docker/WSL cho lint/build frontend.

## Git

- NhÃ¡nh lÃ m viá»‡c: `2312634-Huy`; khÃ´ng merge `main` (origin/main hiá»‡n khÃ´ng cÃ³ commit má»›i) hoáº·c nhÃ¡nh nÃ o khÃ¡c.
- Giá»¯ nguyÃªn thay Ä‘á»•i chÆ°a commit trong `CulinaryBlog.Domain/Entities/BaseEntity.cs`.
- Chá»‰ lÃ m FR-FTE-039; commit/push task nÃ y sau khi chá»§ task xÃ¡c nháº­n ná»™p.
