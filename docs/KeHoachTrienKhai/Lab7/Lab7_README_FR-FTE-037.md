# Lab 7 â€” FR-FTE-037: TÃ­ch há»£p dá»¯ liá»‡u trang chi tiáº¿t cÃ´ng thá»©c

## Má»¥c tiÃªu

Káº¿t ná»‘i trang `/recipes/[id]` vá»›i dá»¯ liá»‡u chi tiáº¿t tá»« Backend API. Trang pháº£i dÃ¹ng Ä‘Ãºng cÃ´ng thá»©c theo ID hoáº·c slug trÃªn URL, hiá»ƒn thá»‹ tráº¡ng thÃ¡i táº£i vÃ  xá»­ lÃ½ trÆ°á»ng há»£p khÃ´ng tÃ¬m tháº¥y hoáº·c API gáº·p lá»—i thay vÃ¬ Ã¢m tháº§m hiá»ƒn thá»‹ mÃ³n Ä‘áº§u tiÃªn trong dá»¯ liá»‡u máº«u.

## Hiá»‡n tráº¡ng

- Route `culinary-blog/src/frontend/src/app/(main)/recipes/[id]/page.tsx` Ä‘ang tÃ¬m cÃ´ng thá»©c trong `INITIAL_RECIPES`, tá»± gÃ¡n mÃ³n Ä‘áº§u tiÃªn náº¿u ID khÃ´ng khá»›p vÃ  táº¡o nguyÃªn liá»‡u/bÆ°á»›c náº¥u báº±ng dá»¯ liá»‡u máº«u.
- `useRecipeDetail` trong `culinary-blog/src/frontend/src/hooks/queries/useRecipes.ts` Ä‘Ã£ gá»i `GET /api/v1/recipes/{idOrSlug}` nhÆ°ng báº¯t má»i lá»—i vÃ  tráº£ `null`, khiáº¿n giao diá»‡n khÃ´ng phÃ¢n biá»‡t Ä‘Æ°á»£c lá»—i máº¡ng/server vá»›i tÃ i nguyÃªn khÃ´ng tá»“n táº¡i.
- Backend khai bÃ¡o endpoint chi tiáº¿t theo GUID vÃ  endpoint theo slug; cáº£ hai tráº£ `RecipeDetailDto` hoáº·c HTTP 404.
- `RecipeDetailSkeleton` Ä‘Ã£ cÃ³ thá»ƒ tÃ¡i sá»­ dá»¥ng Ä‘á»ƒ hiá»ƒn thá»‹ lÃºc táº£i.

## Pháº¡m vi triá»ƒn khai

- DÃ¹ng `useRecipeDetail` lÃ m nguá»“n dá»¯ liá»‡u cho route chi tiáº¿t; bá» fallback sang `INITIAL_RECIPES[0]` vÃ  dá»¯ liá»‡u chi tiáº¿t hard-code.
- Hiá»ƒn thá»‹ skeleton trong khi truy váº¥n; hiá»ƒn thá»‹ tráº¡ng thÃ¡i khÃ´ng tÃ¬m tháº¥y khi API tráº£ 404; hiá»ƒn thá»‹ thÃ´ng bÃ¡o lá»—i cÃ³ thá»ƒ thá»­ táº£i láº¡i khi gáº·p lá»—i máº¡ng/server.
- DÃ¹ng dá»¯ liá»‡u tráº£ vá» cho tiÃªu Ä‘á», breadcrumb, áº£nh, thÃ´ng tin cÃ´ng thá»©c vÃ  cÃ¡c component chi tiáº¿t hiá»‡n cÃ³.
- Táº¡o danh sÃ¡ch cÃ´ng thá»©c liÃªn quan tá»« danh sÃ¡ch tÃ³m táº¯t hiá»‡n cÃ³, loáº¡i cÃ´ng thá»©c hiá»‡n táº¡i.
- KhÃ´ng triá»ƒn khai FR-FTE-038, FR-FTE-039 hoáº·c FR-TST-009 trong task nÃ y.

## File dá»± kiáº¿n sá»­a/thÃªm

| File | Thay Ä‘á»•i |
| --- | --- |
| `culinary-blog/src/frontend/src/hooks/queries/useRecipes.ts` | Giá»¯ truy váº¥n detail vÃ  Ä‘á»ƒ lá»—i ngoÃ i 404 Ä‘i lÃªn React Query; 404 Ä‘Æ°á»£c thá»ƒ hiá»‡n nhÆ° khÃ´ng cÃ³ dá»¯ liá»‡u. |
| `culinary-blog/src/frontend/src/app/(main)/recipes/[id]/page.tsx` | Äá»c `id` tá»« route, render tráº¡ng thÃ¡i táº£i/lá»—i/khÃ´ng tÃ¬m tháº¥y vÃ  hiá»ƒn thá»‹ dá»¯ liá»‡u tráº£ vá» tá»« API thay cho dá»¯ liá»‡u giáº£. |
| `docs/KeHoachTrienKhai/Lab7/Lab7_README_FR-FTE-037.md` | LÆ°u káº¿ hoáº¡ch vÃ  ghi chÃº giáº£i thÃ­ch task. |

## Luá»“ng dá»¯ liá»‡u dá»± kiáº¿n

1. Next.js cung cáº¥p tham sá»‘ `[id]` cho trang; giÃ¡ trá»‹ nÃ y cÃ³ thá»ƒ lÃ  GUID hoáº·c slug.
2. `useRecipeDetail(id)` táº¡o truy váº¥n React Query vá»›i query key gá»“m `RECIPE_DETAIL_QUERY_KEY` vÃ  giÃ¡ trá»‹ route, gá»i API qua `apiClient`.
3. API tráº£ `RecipeDetailDto`: trang chuyá»ƒn dá»¯ liá»‡u sang hero, thá»‘ng kÃª, nguyÃªn liá»‡u, cÃ¡c bÆ°á»›c, dinh dÆ°á»¡ng vÃ  Ä‘Ã¡nh giÃ¡.
4. HTTP 404 Ä‘Æ°á»£c coi lÃ  khÃ´ng tÃ¬m tháº¥y; lá»—i khÃ¡c Ä‘Æ°á»£c giá»¯ láº¡i Ä‘á»ƒ trang hiá»ƒn thá»‹ thÃ´ng bÃ¡o lá»—i thay vÃ¬ giáº£ vá» ráº±ng cÃ´ng thá»©c khÃ´ng tá»“n táº¡i.

## Ghi chÃº giáº£i thÃ­ch code

- React Query quáº£n lÃ½ tráº¡ng thÃ¡i `isLoading`, `isError`, `data` vÃ  cache theo ID/slug; component khÃ´ng cáº§n tá»± viáº¿t `useEffect` Ä‘á»ƒ Ä‘á»“ng bá»™ request.
- Query key cÃ³ cáº£ ID/slug giÃºp cache tÃ¡ch biá»‡t giá»¯a tá»«ng cÃ´ng thá»©c.
- KhÃ´ng dÃ¹ng pháº§n tá»­ Ä‘áº§u tiÃªn cá»§a `INITIAL_RECIPES` lÃ m fallback vÃ¬ viá»‡c Ä‘Ã³ cÃ³ thá»ƒ khiáº¿n URL sai hiá»ƒn thá»‹ nháº§m ná»™i dung.
- PhÃ¢n biá»‡t 404 vá»›i lá»—i káº¿t ná»‘i giÃºp giao diá»‡n Ä‘Æ°a ra thÃ´ng tin Ä‘Ãºng: khÃ´ng cÃ³ tÃ i nguyÃªn khÃ¡c vá»›i chÆ°a truy cáº­p Ä‘Æ°á»£c mÃ¡y chá»§.

## Kiá»ƒm tra sau triá»ƒn khai

- Cháº¡y ESLint cho page vÃ  hook Ä‘Ã£ sá»­a.
- Cháº¡y production build frontend Ä‘á»ƒ kiá»ƒm tra TypeScript, route vÃ  component.
- Khi Backend kháº£ dá»¥ng, kiá»ƒm tra URL báº±ng ID há»£p lá»‡, slug há»£p lá»‡ vÃ  ID/slug khÃ´ng tá»“n táº¡i; kiá»ƒm tra lá»—i khi API khÃ´ng truy cáº­p Ä‘Æ°á»£c.
- Äáº£m báº£o khÃ´ng thay Ä‘á»•i luá»“ng hiá»ƒn thá»‹ thÃ nh pháº§n cá»§a FR-FTE-038 vÃ  khÃ´ng triá»ƒn khai cÃ¡c task Lab 7 cÃ²n láº¡i.

## CÃ´ng cá»¥/mÃ´i trÆ°á»ng

- DÃ¹ng Next.js, React Query, Axios vÃ  component hiá»‡n cÃ³ trong frontend; khÃ´ng cáº§n thÃªm package.
- Kiá»ƒm thá»­ API end-to-end cáº§n Backend cháº¡y vÃ  cÃ³ dá»¯ liá»‡u cÃ´ng thá»©c; khÃ´ng báº¯t buá»™c Docker/WSL cho kiá»ƒm tra lint/build frontend.

## Git

- NhÃ¡nh lÃ m viá»‡c: `2312634-Huy`; Ä‘Ã£ fast-forward nhÃ¡nh nÃ y theo `origin/main`, khÃ´ng thao tÃ¡c ghi lÃªn `main`.
- Chá»‰ lÃ m FR-FTE-037 trong lÆ°á»£t nÃ y; task Lab 7 khÃ¡c Ä‘á»ƒ sau.
- Chá»‰ commit/push pháº§n FR-FTE-037 sau khi chá»§ task xÃ¡c nháº­n ná»™p.
