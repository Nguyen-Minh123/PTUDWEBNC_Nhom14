# Lab 7 â€” FR-TST-009: Integration tests cho Auth, Search vÃ  Recipe Detail

## Má»¥c tiÃªu

Bá»• sung kiá»ƒm thá»­ HTTP integration cho cÃ¡c luá»“ng xÃ¡c thá»±c cÆ¡ báº£n, tÃ¬m kiáº¿m vÃ  xem chi tiáº¿t cÃ´ng thá»©c, Ä‘á»“ng thá»i táº­n dá»¥ng test host vÃ  fixture hiá»‡n cÃ³ Ä‘á»ƒ khÃ´ng phá»¥ thuá»™c database khi cháº¡y cÃ¡c test Ä‘Æ°á»£c thÃªm.

## Hiá»‡n tráº¡ng

- `RecipeAuthorizationMatrixTests` Ä‘Ã£ kiá»ƒm tra anonymous cÃ³ thá»ƒ gá»i list/detail/search vÃ  ngÆ°á»i dÃ¹ng khÃ´ng Ä‘Äƒng nháº­p khÃ´ng thá»ƒ thá»±c hiá»‡n cÃ¡c mutation Ä‘Æ°á»£c báº£o vá»‡.
- `RecipeEndpointValidationTests` Ä‘Ã£ kiá»ƒm tra validation query, 404 theo ID/slug vÃ  problem-details response.
- `RecipeNutritionContractTests` Ä‘Ã£ kiá»ƒm tra sÃ¡u trÆ°á»ng dinh dÆ°á»¡ng cá»§a response detail.
- Frontend chÆ°a cÃ³ script/test framework Playwright; backend integration test dÃ¹ng `WebApplicationFactory` cÃ¹ng stub in-memory.
- CÃ¡c endpoint login/register tráº£ HTTP 400 sá»›m khi email/password rá»—ng; nhÃ¡nh nÃ y cÃ³ thá»ƒ kiá»ƒm tra qua HTTP mÃ  khÃ´ng gá»i database hoáº·c handler xÃ¡c thá»±c.

## Pháº¡m vi triá»ƒn khai

- Bá»• sung test HTTP cho payload Ä‘Äƒng nháº­p/Ä‘Äƒng kÃ½ thiáº¿u trÆ°á»ng báº¯t buá»™c.
- Bá»• sung kiá»ƒm tra contract cá»§a response tÃ¬m kiáº¿m há»£p lá»‡: status, danh sÃ¡ch vÃ  metadata phÃ¢n trang.
- Bá»• sung kiá»ƒm tra response detail theo ID gá»“m nháº­n diá»‡n Ä‘Ãºng cÃ´ng thá»©c vÃ  cÃ¡c trÆ°á»ng quan trá»ng; tÃ¡i sá»­ dá»¥ng fixture cÃ³ sáºµn.
- Giá»¯ cÃ¡c test authorization, 404 vÃ  nutrition Ä‘ang cÃ³; trÃ¡nh kiá»ƒm tra trÃ¹ng chá»©c nÄƒng.
- Sá»­a trong test file hiá»‡n cÃ³, khÃ´ng táº¡o test source file má»›i vÃ  khÃ´ng thÃªm package.

## File dá»± kiáº¿n sá»­a/thÃªm

| File | Thay Ä‘á»•i |
| --- | --- |
| `culinary-blog/src/backend/tests/CulinaryBlog.IntegrationTests/RecipeEndpointValidationTests.cs` | ThÃªm integration tests cho validation Auth, Search response vÃ  Recipe Detail response. |
| `docs/KeHoachTrienKhai/Lab7/Lab7_README_FR-TST-009.md` | Ghi pháº¡m vi, cÃ¡ch tÃ¡i sá»­ dá»¥ng test fixture vÃ  lá»‡nh xÃ¡c minh. |

## Luá»“ng kiá»ƒm thá»­

1. `WebApplicationFactory` dá»±ng API pipeline trong mÃ´i trÆ°á»ng `Testing`, thay cÃ¡c collaborator báº±ng fixture/stub Ä‘Ã£ cÃ³.
2. POST login/register vá»›i body thiáº¿u email/password pháº£i tráº£ 400 trÆ°á»›c khi gá»­i command.
3. GET search há»£p lá»‡ pháº£i tráº£ 200 vÃ  JSON chá»©a `items` cÃ¹ng metadata trang.
4. GET detail theo ID fixture pháº£i tráº£ 200, ID Ä‘Ãºng vÃ  nested collections/nutrition phÃ¹ há»£p vá»›i DTO hiá»‡n táº¡i.
5. Test hiá»‡n há»¯u tiáº¿p tá»¥c xÃ¡c nháº­n quyá»n truy cáº­p cÃ´ng khai, quyá»n mutation vÃ  trÆ°á»ng há»£p khÃ´ng tÃ¬m tháº¥y.

## Ghi chÃº giáº£i thÃ­ch test

- DÃ¹ng HTTP client cá»§a `WebApplicationFactory` Ä‘á»ƒ cháº¡y qua routing, binding, middleware vÃ  endpoint tháº­t; stub chá»‰ thay database/handler ngoÃ i pháº¡m vi endpoint.
- Kiá»ƒm tra JSON theo tÃªn property camelCase cá»§a API Ä‘á»ƒ giá»¯ contract tÆ°Æ¡ng thÃ­ch vá»›i frontend.
- CÃ¡c test auth trong task nÃ y kiá»ƒm tra validation request; hÃ nh vi authorization cá»§a endpoint recipe Ä‘Ã£ cÃ³ trong `RecipeAuthorizationMatrixTests`.
- KhÃ´ng dÃ¹ng `UnitTest1` cho cÃ¡c test nÃ y vÃ¬ file Ä‘Ã³ cÃ³ test cáº§n PostgreSQL Ä‘ang cháº¡y.

## Kiá»ƒm tra sau triá»ƒn khai

- Cháº¡y Ä‘Ãºng project integration tests, lá»c `RecipeEndpointValidationTests` trÆ°á»›c.
- Cháº¡y toÃ n bá»™ `CulinaryBlog.IntegrationTests` náº¿u mÃ´i trÆ°á»ng PostgreSQL cáº§n cho cÃ¡c test cÃ²n láº¡i Ä‘Ã£ sáºµn sÃ ng.
- Kiá»ƒm tra diff/status Ä‘á»ƒ khÃ´ng Ä‘Æ°a `CulinaryBlog.Domain/Entities/BaseEntity.cs` Ä‘ang cÃ³ chá»‰nh sá»­a chÆ°a commit vÃ o commit task.

## CÃ´ng cá»¥/mÃ´i trÆ°á»ng

- .NET SDK vÃ  cÃ¡c package Ä‘Ã£ cÃ³ trong `CulinaryBlog.IntegrationTests.csproj`.
- CÃ¡c test má»›i dá»± kiáº¿n khÃ´ng cáº§n Docker/WSL/PostgreSQL; má»™t sá»‘ integration tests cÅ© trong project cáº§n PostgreSQL.
- KhÃ´ng cÃ i Playwright vÃ¬ dá»± Ã¡n chÆ°a cÃ³ test runner frontend vÃ  task cÃ³ thá»ƒ kiá»ƒm tra cÃ¡c HTTP contract á»Ÿ integration layer.

## Git

- NhÃ¡nh lÃ m viá»‡c: `2312634-Huy`; khÃ´ng merge nhÃ¡nh nÃ o khÃ¡c. `origin/main` khÃ´ng cÃ³ commit má»›i Ä‘á»ƒ tÃ­ch há»£p.
- Giá»¯ nguyÃªn thay Ä‘á»•i chÆ°a commit trong `CulinaryBlog.Domain/Entities/BaseEntity.cs`.
- Chá»‰ lÃ m FR-TST-009; commit/push riÃªng task nÃ y sau khi chá»§ task xÃ¡c nháº­n ná»™p.
