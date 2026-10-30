# Lab 7 â€” FR-FTE-038: Hiá»ƒn thá»‹ nguyÃªn liá»‡u, cÃ¡c bÆ°á»›c vÃ  dinh dÆ°á»¡ng

## Má»¥c tiÃªu

Hiá»ƒn thá»‹ nguyÃªn liá»‡u, hÆ°á»›ng dáº«n tá»«ng bÆ°á»›c vÃ  sÃ¡u chá»‰ sá»‘ dinh dÆ°á»¡ng báº±ng dá»¯ liá»‡u chi tiáº¿t do API tráº£ vá». Ná»™i dung cáº§n Ä‘Ãºng thá»© tá»±, khÃ´ng tá»± sinh dá»¯ liá»‡u máº«u khi API khÃ´ng cÃ³ thÃ´ng tin.

## Hiá»‡n tráº¡ng

- Trang `culinary-blog/src/frontend/src/app/(main)/recipes/[id]/page.tsx` Ä‘Ã£ truyá»n `ingredients`, `steps` vÃ  `nutrition` tá»« `RecipeDetailDto` sang ba component chi tiáº¿t.
- DTO nguyÃªn liá»‡u khá»›p vá»›i response backend á»Ÿ cÃ¡c trÆ°á»ng `id`, `name`, `quantity`, `unit` vÃ  `orderIndex`; backend cÃ²n tráº£ `notes`, hiá»‡n frontend chÆ°a thá»ƒ hiá»‡n.
- Backend tráº£ bÆ°á»›c náº¥u theo `title`, `description`, `timerMinutes` vÃ  `imageUrl`, nhÆ°ng frontend `RecipeStepDto`/`RecipeSteps` láº¡i Ä‘á»c `instruction`; vÃ¬ váº­y ná»™i dung hÆ°á»›ng dáº«n API cÃ³ thá»ƒ bá»‹ trá»‘ng.
- `RecipeNutrition` Ä‘Ã£ hiá»ƒn thá»‹ calories, protein, carbohydrates, fat, fiber vÃ  sodium; trÆ°á»ng thiáº¿u Ä‘Æ°á»£c bÃ¡o lÃ  â€œChÆ°a cÃ³ dá»¯ liá»‡uâ€, khÃ´ng thay báº±ng sá»‘ liá»‡u giáº£.

## Pháº¡m vi triá»ƒn khai

- Äá»“ng bá»™ kiá»ƒu dá»¯ liá»‡u bÆ°á»›c náº¥u vá»›i contract backend: `title`, `description`, `timerMinutes` vÃ  `imageUrl`.
- Hiá»ƒn thá»‹ tiÃªu Ä‘á», ná»™i dung, thá»i lÆ°á»£ng náº¿u cÃ³ vÃ  áº£nh minh há»a cá»§a tá»«ng bÆ°á»›c; sáº¯p xáº¿p theo `stepNumber`.
- Bá»• sung `notes` tÃ¹y chá»n cho nguyÃªn liá»‡u, hiá»ƒn thá»‹ ghi chÃº náº¿u backend cÃ³ tráº£; sáº¯p xáº¿p theo `orderIndex`.
- CÃ³ ná»™i dung tráº¡ng thÃ¡i rá»—ng cho danh sÃ¡ch nguyÃªn liá»‡u hoáº·c bÆ°á»›c náº¿u API tráº£ máº£ng rá»—ng.
- Giá»¯ nguyÃªn component dinh dÆ°á»¡ng Ä‘ang Ä‘á»c dá»¯ liá»‡u tháº­t vÃ  hiá»ƒn thá»‹ rÃµ trÆ°á»ng chÆ°a cÃ³ dá»¯ liá»‡u.
- KhÃ´ng lÃ m FR-FTE-039 (phÃ³ng to áº£nh/Ä‘Ã¡nh giÃ¡-bÃ¬nh luáº­n) hoáº·c FR-TST-009 trong task nÃ y.

## File dá»± kiáº¿n sá»­a/thÃªm

| File | Thay Ä‘á»•i |
| --- | --- |
| `culinary-blog/src/frontend/src/types/step.dto.ts` | Cáº­p nháº­t `RecipeStepDto` theo response backend. |
| `culinary-blog/src/frontend/src/types/ingredient.dto.ts` | ThÃªm `notes` tÃ¹y chá»n cho nguyÃªn liá»‡u response. |
| `culinary-blog/src/frontend/src/components/recipe-detail/RecipeSteps.tsx` | Render Ä‘Ãºng title/description/timer, sáº¯p xáº¿p bÆ°á»›c vÃ  thá»ƒ hiá»‡n danh sÃ¡ch rá»—ng. |
| `culinary-blog/src/frontend/src/components/recipe-detail/RecipeIngredients.tsx` | Sáº¯p xáº¿p nguyÃªn liá»‡u, hiá»‡n notes vÃ  thá»ƒ hiá»‡n danh sÃ¡ch rá»—ng. |
| `docs/KeHoachTrienKhai/Lab7/Lab7_README_FR-FTE-038.md` | Ghi káº¿ hoáº¡ch, contract dá»¯ liá»‡u vÃ  cÃ¡ch kiá»ƒm tra task. |

## Luá»“ng dá»¯ liá»‡u

1. `useRecipeDetail` láº¥y `RecipeDetailDto` tá»« API; route Ä‘Ã£ truyá»n ba pháº§n dá»¯ liá»‡u sang component tÆ°Æ¡ng á»©ng.
2. `RecipeIngredients` sáº¯p xáº¿p theo `orderIndex`, hiá»ƒn thá»‹ lÆ°á»£ng, Ä‘Æ¡n vá»‹ vÃ  ghi chÃº; tráº¡ng thÃ¡i Ä‘Ã£ chá»n váº«n lÃ  state cá»¥c bá»™ cá»§a giao diá»‡n.
3. `RecipeSteps` sáº¯p xáº¿p theo `stepNumber`, hiá»ƒn thá»‹ `title`, `description`, thá»i lÆ°á»£ng vÃ  áº£nh tá»« response.
4. `RecipeNutrition` nháº­n object nutrition cÃ³ thá»ƒ null; tá»«ng trÆ°á»ng null/undefined hiá»‡n â€œChÆ°a cÃ³ dá»¯ liá»‡uâ€, khÃ´ng dÃ¹ng giÃ¡ trá»‹ máº«u.

## Ghi chÃº giáº£i thÃ­ch code

- DTO pháº£n Ã¡nh chÃ­nh xÃ¡c tÃªn trÆ°á»ng JSON cá»§a backend Ä‘á»ƒ TypeScript phÃ¡t hiá»‡n contract mismatch thay vÃ¬ render chuá»—i `undefined`.
- Sáº¯p xáº¿p báº£n sao máº£ng trÆ°á»›c khi render giÃºp giao diá»‡n á»•n Ä‘á»‹nh mÃ  khÃ´ng mutate dá»¯ liá»‡u/cache React Query.
- `notes`, áº£nh bÆ°á»›c vÃ  thá»i lÆ°á»£ng Ä‘á»u lÃ  tÃ¹y chá»n; chá»‰ render pháº§n tÆ°Æ¡ng á»©ng khi API cung cáº¥p.
- Dá»¯ liá»‡u dinh dÆ°á»¡ng thiáº¿u khÃ´ng Ä‘á»“ng nghÄ©a giÃ¡ trá»‹ báº±ng 0, vÃ¬ váº­y component cáº§n phÃ¢n biá»‡t null/undefined vá»›i sá»‘ 0.

## Kiá»ƒm tra sau triá»ƒn khai

- Cháº¡y ESLint cho DTO vÃ  hai component Ä‘Æ°á»£c sá»­a.
- Cháº¡y production build frontend Ä‘á»ƒ kiá»ƒm tra kiá»ƒu dá»¯ liá»‡u vÃ  route.
- Khi backend cÃ³ dá»¯ liá»‡u, kiá»ƒm tra má»™t cÃ´ng thá»©c cÃ³ Ä‘áº§y Ä‘á»§ thÃ´ng tin vÃ  má»™t cÃ´ng thá»©c thiáº¿u optional fields; xÃ¡c nháº­n thá»© tá»± nguyÃªn liá»‡u/bÆ°á»›c vÃ  giÃ¡ trá»‹ dinh dÆ°á»¡ng.
- KhÃ´ng thay Ä‘á»•i tráº¡ng thÃ¡i hoáº·c file chÆ°a commit cÃ³ sáºµn trong `CulinaryBlog.Domain/Entities/BaseEntity.cs`.

## CÃ´ng cá»¥/mÃ´i trÆ°á»ng

- DÃ¹ng React, TypeScript vÃ  component hiá»‡n cÃ³; khÃ´ng cáº§n cÃ i thÃªm package.
- Smoke test vá»›i dá»¯ liá»‡u tháº­t cáº§n backend/API vÃ  database cháº¡y; khÃ´ng báº¯t buá»™c Docker/WSL cho lint/build.

## Git

- NhÃ¡nh lÃ m viá»‡c: `2312634-Huy`; `origin/main` hiá»‡n khÃ´ng cÃ³ commit má»›i cáº§n tÃ­ch há»£p, nÃªn khÃ´ng merge nhÃ¡nh nÃ o.
- TÃ´n trá»ng thay Ä‘á»•i chÆ°a commit hiá»‡n cÃ³ trong `CulinaryBlog.Domain/Entities/BaseEntity.cs`.
- Chá»‰ lÃ m FR-FTE-038; chá»‰ commit/push task nÃ y sau khi chá»§ task xÃ¡c nháº­n ná»™p.
