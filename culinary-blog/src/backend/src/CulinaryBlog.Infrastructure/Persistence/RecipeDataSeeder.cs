using CulinaryBlog.Application.Common.Security;
using CulinaryBlog.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CulinaryBlog.Infrastructure.Persistence;

/// <summary>
/// Bộ khởi tạo dữ liệu ẩm thực Việt Nam thực tế (12 Danh mục & 55 Công thức món ăn chi tiết).
/// Toàn bộ dữ liệu ngẫu nhiên (Bogus/Faker) đã được loại bỏ hoàn toàn theo yêu cầu nghiệm thu.
/// </summary>
public sealed class RecipeDataSeeder(CulinaryBlogDbContext dbContext)
{
    private const string SeederUserId = "seeder-user-id";

    private sealed record SeedCategoryData(
        Guid Id,
        string Name,
        string Slug,
        string Description,
        string ImageUrl,
        int OrderIndex);

    private sealed record SeedIngredientData(
        Guid Id,
        string Name,
        decimal Quantity,
        string Unit,
        string Notes,
        int OrderIndex);

    private sealed record SeedStepData(
        Guid Id,
        int StepNumber,
        string Title,
        string Description,
        int TimerMinutes,
        string ImageUrl);

    private sealed record SeedRecipeData(
        Guid Id,
        string Title,
        string Slug,
        string Description,
        int PrepTime,
        int CookTime,
        int Servings,
        RecipeDifficulty Difficulty,
        Guid CategoryId,
        string AuthorId,
        string CoverImageUrl,
        decimal Calories,
        decimal Protein,
        decimal Carbohydrates,
        decimal Fat,
        decimal Fiber,
        decimal Sodium,
        SeedIngredientData[] Ingredients,
        SeedStepData[] Steps);

    private static readonly SeedCategoryData[] CategoryDefinitions =
    [
        new(Guid.Parse("11111111-1111-4111-8111-000000000001"), "Món Nước & Bún Phở", "mon-nuoc-bun-pho", "Tinh hoa bún, phở, hủ tiếu và bánh canh ba miền với nước dùng ninh xương ngọt thanh, đậm đà hương vị truyền thống Việt Nam.", "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=80", 1),
        new(Guid.Parse("11111111-1111-4111-8111-000000000002"), "Món Cơm & Xôi", "mon-com-xoi", "Các món cơm gia đình, cơm tấm, cơm chiên và xôi dẻo thơm cung cấp năng lượng dồi dào cho bữa ăn chính hàng ngày.", "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80", 2),
        new(Guid.Parse("11111111-1111-4111-8111-000000000003"), "Món Kho & Rim", "mon-kho-rim", "Tuyển tập các món cá kho tộ, thịt kho tàu, sườn rim mặn ngọt đậm đà đưa cơm đúng chuẩn hương vị bếp nhà.", "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80", 3),
        new(Guid.Parse("11111111-1111-4111-8111-000000000004"), "Món Canh & Súp", "mon-canh-sup", "Các món canh thanh mát giải nhiệt và súp bổ dưỡng giúp cân bằng hương vị cho mâm cơm gia đình Việt.", "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80", 4),
        new(Guid.Parse("11111111-1111-4111-8111-000000000005"), "Món Xào & Áp Chảo", "mon-xao-ap-chao", "Món xào nhanh gọn trên lửa lớn, giữ trọn độ giòn ngọt tự nhiên của rau củ và độ mềm mọng của thịt, hải sản.", "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80", 5),
        new(Guid.Parse("11111111-1111-4111-8111-000000000006"), "Món Nướng & Quay", "mon-nuong-quay", "Công thức ướp thịt nướng, gà nướng, hải sản nướng than hoa và nồi chiên không dầu thơm lừng hấp dẫn.", "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80", 6),
        new(Guid.Parse("11111111-1111-4111-8111-000000000007"), "Món Chiên & Rán", "mon-chien-ran", "Các món chả giò, cánh gà chiên nước mắm, bánh xèo vàng giòn rụm kích thích vị giác mọi thành viên trong gia đình.", "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80", 7),
        new(Guid.Parse("11111111-1111-4111-8111-000000000008"), "Món Gỏi, Nộm & Cuốn", "mon-goi-nom-cuon", "Món gỏi trộn chua ngọt thanh mát, gỏi cuốn, phở cuốn tươi ngon chống ngán tuyệt vời cho các bữa tiệc.", "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80", 8),
        new(Guid.Parse("11111111-1111-4111-8111-000000000009"), "Món Lẩu & Hấp", "mon-lau-hap", "Các món lẩu sum vầy cuối tuần và món hấp giữ nguyên vị ngọt tự nhiên của hải sản, cá và thịt tươi sống.", "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80", 9),
        new(Guid.Parse("11111111-1111-4111-8111-000000000010"), "Món Chay Thanh Đạm", "mon-chay-thanh-dam", "Thực đơn chay thực dưỡng từ nấm, đậu hũ và rau củ tươi ngon, tốt cho sức khỏe và thanh lọc cơ thể.", "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80", 10),
        new(Guid.Parse("11111111-1111-4111-8111-000000000011"), "Bánh Ngọt & Tráng Miệng", "banh-ngot-trang-mieng", "Các món chè truyền thống, bánh flan, sữa chua nếp cẩm và tráng miệng ngọt dịu khép lại bữa ăn trọn vẹn.", "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80", 11),
        new(Guid.Parse("11111111-1111-4111-8111-000000000012"), "Thức Uống & Sinh Tố", "thuc-uong-sinh-to", "Công thức pha chế trà trái cây, cà phê Việt Nam, sữa hạt và sinh tố mát lạnh bổ sung vitamin mỗi ngày.", "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80", 12),
    ];

    private static readonly SeedRecipeData[] RecipeDefinitions =
    [
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000001"),
            "Phở Bò Tái Nạm Truyền Thống Hà Nội",
            "pho-bo-tai-nam-ha-noi",
            "Hương vị phở bò chuẩn Hà Thành với nước dùng ninh xương ống trong vắt, thơm dịu thảo quả, hoa hồi, quế chi hòa quyện cùng thịt bò tái mềm ngọt và nạm bò giòn béo.",
            30, 120, 4, RecipeDifficulty.Medium,
            Guid.Parse("11111111-1111-4111-8111-000000000001"), "seeder-user-id",
            "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=900&auto=format&fit=crop&q=80",
            485m, 34m, 52m, 14m, 3m, 820m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000001000001"), "Xương ống bò", 1500m, "g", "Chặt khúc, ngâm nước muối loãng khử mùi", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000001000002"), "Thịt thăn bò tươi", 400m, "g", "Thái lát mỏng ngang thớ làm bò tái", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000001000003"), "Nạm bò ngon", 400m, "g", "Để nguyên khối luộc chín cùng nước phở", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000001000004"), "Bánh phở tươi", 800m, "g", "Trụng sơ nước sôi trước khi dùng", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000001000005"), "Hành tây, gừng tươi, hành tím", 200m, "g", "Để nguyên vỏ nướng xém thơm", 5),
                new(Guid.Parse("33333333-3333-4333-8333-000001000006"), "Quế chi, hoa hồi, thảo quả", 25m, "g", "Rang thơm, bọc trong túi vải lọc", 6),
                new(Guid.Parse("33333333-3333-4333-8333-000001000007"), "Hành lá, ngò gai, giá đỗ, chanh ớt", 150m, "g", "Rửa sạch, thái nhỏ ăn kèm", 7),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000001000001"), 1, "Sơ chế và chần xương bò", "Rửa sạch xương ống bò và nạm bò với nước muối gừng. Cho xương vào nồi nước sôi chần kỹ 7 phút để loại bỏ hoàn toàn bọt bẩn và mùi gây, sau đó rửa lại bằng nước ấm.", 10, "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000001000002"), 2, "Nướng gia vị và ninh nước dùng", "Nướng xém vỏ gừng, hành tím, hành tây rồi cạo rửa sạch. Rang thơm hoa hồi, thảo quả, thanh quế cho vào túi vải. Cho xương bò, nạm bò cùng nguyên liệu nướng vào nồi hầm lửa nhỏ trong 90 phút, thường xuyên hớt bọt để nước trong.", 90, "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000001000003"), 3, "Chế biến thịt bò và nêm nước phở", "Vớt phần nạm bò đã chín mềm ra ngâm nước đá 5 phút rồi thái lát mỏng. Nêm nước mắm cốt, đường phèn và muối hạt vào nồi nước dùng cho vừa miệng. Thịt thăn bò thái lát mỏng, đập dập nhẹ cho mềm.", 15, "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000001000004"), 4, "Trình bày tô phở và thưởng thức", "Trụng bánh phở qua nước sôi rồi xếp vào tô. Xếp nạm bò và thịt bò tái lên trên, rắc hành lá, hành tây thái mỏng và ngò gai. Chan nước dùng đang sôi thật ngập để làm chín tái thịt bò, thưởng thức nóng cùng quẩy giòn và tương ớt.", 5, "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000002"),
            "Bún Bò Huế Giò Heo Đậm Đà Cố Đô",
            "bun-bo-hue-gio-heo-co-do",
            "Tô bún bò chuẩn vị xứ Huế với nước dùng đỏ cam bắt mắt từ dầu điều, dậy mùi sả tươi và mắm ruốc Huế đặc trưng, ăn kèm bắp bò hoa, giò heo mềm rục và chả cua thơm béo.",
            40, 90, 6, RecipeDifficulty.Hard,
            Guid.Parse("11111111-1111-4111-8111-000000000001"), "seeder-user-id",
            "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=900&auto=format&fit=crop&q=80",
            560m, 38m, 56m, 19m, 4m, 950m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000002000001"), "Bắp bò hoa", 600m, "g", "Cuộn chỉ chặt để khi thái lát đẹp mắt", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000002000002"), "Chân giò heo trước", 700m, "g", "Chặt khoanh tròn vừa ăn", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000002000003"), "Chả cua Huế & chả lụa", 300m, "g", "Nặn viên tròn hoặc cắt lát", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000002000004"), "Bún sợi to truyền thống", 1000m, "g", "Trụng nước ấm để ráo", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000002000005"), "Mắm ruốc Huế nguyên chất", 3m, "muỗng canh", "Hòa tan với nước lạnh, lắng lấy nước trong", 5),
                new(Guid.Parse("33333333-3333-4333-8333-000002000006"), "Sả cây, gừng, tỏi, ớt, hạt điều màu", 150m, "g", "Đập dập sả, thắng dầu màu điều", 6),
                new(Guid.Parse("33333333-3333-4333-8333-000002000007"), "Bắp chuối bào, rau muống chẻ, giá, rau răm", 250m, "g", "Ngâm nước chanh loãng cho trắng giòn", 7),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000002000001"), 1, "Sơ chế giò heo và bắp bò", "Chần sơ giò heo và bắp bò với nước sôi cùng chút muối và sả đập dập trong 5 phút để khử mùi hôi, sau đó vớt ra rửa sạch lại với nước lạnh.", 15, "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000002000002"), 2, "Hầm thịt và pha mắm ruốc Huế", "Xếp sả cây đập dập dưới đáy nồi, cho bắp bò và giò heo vào hầm lửa vừa 60 phút. Hòa mắm ruốc Huế với 200ml nước lạnh, khuấy đều rồi để lắng, chỉ gạn lấy phần nước trong cho vào nồi hầm.", 60, "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000002000003"), 3, "Thắng sa tế màu điều và nêm nếm", "Phi thơm hành tỏi băm và sả băm với dầu hạt điều màu, thêm ớt bột tạo màu đỏ cam óng ánh rồi đổ vào nồi nước dùng. Thả viên chả cua vào nấu chín nổi lên, nêm nước mắm, đường phèn cho đậm vị.", 10, "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000002000004"), 4, "Hoàn thiện tô bún bò Huế", "Trụng bún sợi to cho vào tô, xếp lát bắp bò hoa, khoanh giò heo, chả cua, rắc hành tây và rau răm. Chan nước dùng sôi ngập bún và thưởng thức cùng rau chuối bào, chanh tươi.", 5, "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000003"),
            "Bún Riêu Cua Đồng Bắp Bò Đậu Hũ",
            "bun-rieu-cua-dong-bap-bo",
            "Tô bún riêu cua đồng dân dã với gạch cua đóng tảng béo ngậy, vị chua dịu thanh thoát từ giấm bỗng và cà chua chín mọng, kết hợp đậu hũ chiên vàng và bắp bò tươi.",
            35, 45, 4, RecipeDifficulty.Medium,
            Guid.Parse("11111111-1111-4111-8111-000000000001"), "seeder-user-id",
            "https://images.unsplash.com/photo-1555126634-323283e090fa?w=900&auto=format&fit=crop&q=80",
            440m, 29m, 48m, 13m, 4m, 780m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000003000001"), "Cua đồng xay nhuyễn", 500m, "g", "Tách riêng gạch cua và lọc kỹ lấy nước thịt cua", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000003000002"), "Bắp bò tươi thái mỏng", 250m, "g", "Ướp chút tiêu và gừng băm", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000003000003"), "Đậu hũ trắng chiên phồng", 3m, "miếng", "Cắt khối vuông vừa ăn", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000003000004"), "Cà chua chín đỏ", 4m, "quả", "Bổ múi cau xào tạo màu", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000003000005"), "Giấm bỗng nếp & mắm tôm", 4m, "muỗng canh", "Tạo vị chua thanh và hương thơm đặc trưng", 5),
                new(Guid.Parse("33333333-3333-4333-8333-000003000006"), "Bún rối tươi", 800m, "g", "Trụng sơ nước sôi", 6),
                new(Guid.Parse("33333333-3333-4333-8333-000003000007"), "Rau sống kinh giới, tía tô, xà lách, hoa chuối", 200m, "g", "Rửa sạch để ráo ăn kèm", 7),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000003000001"), 1, "Lọc cua đồng và chưng gạch cua", "Hòa thịt cua đồng xay với 1.5 lít nước và 1 muỗng cà phê muối, bóp nhẹ rồi lọc qua rây 2 lần để loại bỏ hoàn toàn mảnh vỏ. Phi thơm hành tím băm, cho phần gạch cua vào xào nhanh tay rồi múc ra bát riêng.", 15, "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000003000002"), 2, "Nấu đông tảng riêu cua", "Bắc nồi nước lọc cua lên bếp đun lửa vừa, khuấy nhẹ theo một chiều. Khi nước ấm dần và thịt cua kết tủa nổi lên thành tảng riêu dày thì hạ nhỏ lửa, dùng muôi vớt riêu cua ra đĩa để không bị vỡ.", 15, "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000003000003"), 3, "Xào cà chua và hoàn thiện nước dùng", "Xào mềm cà chua bổ múi cau với chút dầu màu điều, trút vào nồi nước riêu. Nêm giấm bỗng, nước mắm, chút mắm tôm và đường phèn, thả đậu hũ chiên vào đun sôi nhẹ 10 phút.", 10, "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000003000004"), 4, "Trình bày bún riêu cua đồng", "Cho bún tươi vào tô, trụng chín bắp bò xếp lên cùng tảng riêu cua, đậu hũ, cà chua và rưới gạch cua chưng hành phi lên mặt. Chan nước dùng nóng hổi, ăn kèm rau kinh giới và tía tô.", 5, "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000004"),
            "Hủ Tiếu Nam Vang Tôm Thịt Nước Trong",
            "hu-tieu-nam-vang-tom-thit",
            "Sợi hủ tiếu dai mềm kết hợp nước lèo hầm xương heo cùng mực khô, tôm khô ngọt lịm tự nhiên, đầy đặn topping tôm sú tươi, thịt bằm, trứng cút và tỏi phi vàng giòn.",
            30, 75, 4, RecipeDifficulty.Medium,
            Guid.Parse("11111111-1111-4111-8111-000000000001"), "seeder-user-id",
            "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&auto=format&fit=crop&q=80",
            470m, 32m, 54m, 12m, 3m, 760m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000004000001"), "Xương ống heo & thịt nạc thăn", 1000m, "g", "Xương hầm nước lèo, nạc thăn luộc thái lát", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000004000002"), "Tôm sú tươi & thịt heo xay", 400m, "g", "Tôm bóc vỏ chừa đuôi, thịt xay xào săn", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000004000003"), "Trứng cút luộc bóc vỏ", 12m, "quả", "Luộc chín bóc sạch vỏ", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000004000004"), "Mực khô nướng & tôm khô", 50m, "g", "Nướng thơm mực khô giúp nước dùng ngọt thanh", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000004000005"), "Sợi hủ tiếu dai Nam Vang", 600m, "g", "Trụng nhanh rồi trộn chút dầu tỏi phi", 5),
                new(Guid.Parse("33333333-3333-4333-8333-000004000006"), "Củ cải trắng, cà rốt, cần tàu, hẹ", 250m, "g", "Hầm lấy vị ngọt tự nhiên cho nước dùng", 6),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000004000001"), 1, "Ninh xương cùng mực khô và củ cải", "Chần sạch xương ống heo rồi cho vào nồi hầm cùng củ cải trắng, mực khô nướng và tôm khô trên lửa nhỏ 60 phút. Thả miếng thịt nạc thăn vào luộc chín khoảng 20 phút rồi vớt ra thái lát.", 60, "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000004000002"), 2, "Xào thịt bằm và luộc tôm sú", "Phi thơm tỏi băm với dầu ăn, vớt 1 phần tỏi vàng ra để riêng, phần còn lại cho thịt heo xay vào đảo chín tơi với chút nước mắm và tiêu. Tôm sú luộc chín đỏ trong nồi nước dùng rồi vớt ra.", 10, "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000004000003"), 3, "Trụng sợi hủ tiếu trộn dầu tỏi", "Đun sôi nồi nước riêng, trụng nhanh sợi hủ tiếu khoảng 20 giây cho mềm dai rồi vớt ra tô, rưới nửa muỗng dầu tỏi phi trộn đều để sợi hủ tiếu bóng mượt không bị dính.", 5, "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000004000004"), 4, "Trình bày và chan nước lèo", "Xếp tôm sú, thịt nạc thái lát, thịt bằm, trứng cút, hẹ cắt khúc và cần tàu lên mặt tô hủ tiếu. Rắc nhiều tỏi phi vàng giòn rồi chan nước lèo trong vắt đang sôi vào thưởng thức.", 5, "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000005"),
            "Mì Quảng Tôm Thịt Trứng Cút Xứ Quảng",
            "mi-quang-tom-thit-trung-cut",
            "Món mì trứ danh miền Trung với sợi mì nghệ vàng ươm, phần nước nhân tôm thịt rim dầu điều sánh đậm chan xâm xấp, ăn kèm bánh đa nướng giòn rụm và đậu phộng rang.",
            25, 40, 4, RecipeDifficulty.Medium,
            Guid.Parse("11111111-1111-4111-8111-000000000001"), "seeder-user-id",
            "https://images.unsplash.com/photo-1552611052-33e04de081de?w=900&auto=format&fit=crop&q=80",
            510m, 31m, 55m, 17m, 4m, 790m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000005000001"), "Sợi mì Quảng tươi", 800m, "g", "Tơi sợi mì trước khi bày ra tô", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000005000002"), "Thịt ba chỉ heo & tôm đất tươi", 600m, "g", "Thịt thái miếng mỏng, tôm cắt râu rửa sạch", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000005000003"), "Trứng cút luộc", 12m, "quả", "Bóc vỏ kho cùng thịt tôm", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000005000004"), "Củ nén (hành tăm), nghệ tươi, dầu điều", 60m, "g", "Giã nhuyễn ướp thịt và phi thơm", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000005000005"), "Đậu phộng rang & bánh tráng mè nướng", 150m, "g", "Đập dập đậu phộng, bẻ miếng bánh đa", 5),
                new(Guid.Parse("33333333-3333-4333-8333-000005000006"), "Bắp chuối bào, cải con, rau húng, ớt xanh", 200m, "g", "Rửa sạch để ráo lót đáy tô", 6),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000005000001"), 1, "Ướp tôm thịt với củ nén và nghệ", "Ướp thịt ba chỉ và tôm tươi với củ nén giã dập, nước cốt nghệ tươi, nước mắm, tiêu và chút đường trong 20 phút cho thấm vị đặc trưng xứ Quảng.", 20, "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000005000002"), 2, "Rim nhân tôm thịt và nước nhưn", "Phi thơm củ nén với dầu hạt điều màu, cho thịt ba chỉ vào xào săn trước rồi cho tôm và trứng cút vào đảo đều. Chế 600ml nước dùng xương hoặc nước dừa tươi vào rim lửa vừa 25 phút cho nước sánh đậm.", 25, "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000005000003"), 3, "Chuẩn bị rau sống và sợi mì", "Xếp lớp rau sống tươi (cải con, xà lách, bắp chuối bào) dưới đáy tô, sau đó rải sợi mì Quảng lên trên.", 5, "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000005000004"), 4, "Chan nước nhưn xâm xấp và thưởng thức", "Xếp tôm, thịt ba chỉ, trứng cút lên mặt mì, chan nước nhưn đậm đà vừa xâm xấp sợi mì. Rắc đậu phộng rang, hành lá và bẻ bánh tráng mè nướng giòn ăn kèm ớt xanh.", 5, "https://images.unsplash.com/photo-1552611052-33e04de081de?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000006"),
            "Bánh Canh Cua Giò Heo Nước Dùng Sánh Đậm",
            "banh-canh-cua-gio-heo",
            "Sợi bánh canh bột lọc dai trong hòa quyện trong làn nước dùng sánh mịn tự nhiên, ngập tràn thịt cua biển tươi bóc múi, khoanh giò heo, tôm sú và chả cá thu.",
            35, 50, 4, RecipeDifficulty.Medium,
            Guid.Parse("11111111-1111-4111-8111-000000000001"), "seeder-user-id",
            "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
            530m, 36m, 58m, 16m, 2m, 840m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000006000001"), "Thịt cua biển gỡ sẵn", 300m, "g", "Phi thơm với hành tỏi và dầu màu điều", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000006000002"), "Giò heo rút xương hoặc chặt khoanh", 500m, "g", "Chần sạch và hầm mềm", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000006000003"), "Tôm sú tươi & nấm rơm", 300m, "g", "Tôm bóc vỏ, nấm rơm cắt đôi", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000006000004"), "Sợi bánh canh bột gạo pha bột năng", 700m, "g", "Luộc sơ nước sôi cho hết bột chua", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000006000005"), "Bột năng tạo độ sánh", 3m, "muỗng canh", "Hòa tan với nước lọc", 5),
                new(Guid.Parse("33333333-3333-4333-8333-000006000006"), "Hành lá, ngò rí, tiêu xay, dầu điều", 50m, "g", "Rắc lên bề mặt tô bánh canh", 6),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000006000001"), 1, "Hầm giò heo và nấu nước dùng", "Chần sạch giò heo rồi hầm với 2 lít nước và củ cải trắng trong 40 phút cho giò mềm và nước ngọt. Vớt giò heo ra ngâm nước mát.", 40, "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000006000002"), 2, "Xào thịt cua với dầu màu điều", "Phi thơm hành tím và tỏi băm với 2 muỗng dầu màu điều, cho thịt cua biển vào đảo nhẹ tay trên lửa vừa cùng chút nước mắm và tiêu để thịt cua săn thơm mà không bị nát.", 8, "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000006000003"), 3, "Nấu nấm rơm, tôm và tạo độ sánh", "Thả nấm rơm và tôm sú vào nồi nước dùng nấu sôi 5 phút. Cho sợi bánh canh đã trụng vào đun sôi lại, từ từ rót nước bột năng vào khuấy nhẹ cho nước dùng sánh bóng và lên màu cam nhẹ.", 10, "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000006000004"), 4, "Múc bánh canh cua ra tô", "Múc bánh canh ra tô, xếp thịt cua biển, khoanh giò heo, tôm sú lên trên, rắc hành ngò, hành phi và tiêu xay, dùng nóng với nước mắm ớt cắt lát.", 5, "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000007"),
            "Cơm Tấm Sườn Bì Chả Trứng Sài Gòn",
            "com-tam-suon-bi-cha-sai-gon",
            "Đĩa cơm tấm trứ danh Sài Thành với hạt cơm tấm dẻo tơi, miếng sườn cốt lết nướng mật ong vàng óng mềm mọng, bì thính giòn dai, chả trứng hấp béo ngậy và nước mắm kẹo chua ngọt.",
            30, 35, 4, RecipeDifficulty.Medium,
            Guid.Parse("11111111-1111-4111-8111-000000000002"), "seeder-user-id",
            "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=900&auto=format&fit=crop&q=80",
            640m, 38m, 68m, 22m, 3m, 890m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000007000001"), "Sườn cốt lết heo bản to", 600m, "g", "Dùng búa dần mềm thớ thịt để sườn không khô", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000007000002"), "Gạo tấm thơm", 500m, "g", "Vo sạch, nấu ít nước cho hạt cơm tơi dẻo", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000007000003"), "Bì heo trộn thính & thịt xay làm chả", 300m, "g", "Chả hấp cùng bún tàu, mộc nhĩ và lòng đỏ trứng", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000007000004"), "Mật ong, sữa đặc, dầu hào, nước mắm", 80m, "ml", "Hỗn hợp ướp sườn mềm bóng", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000007000005"), "Đồ chua cà rốt củ cải, dưa leo, cà chua", 200m, "g", "Ăn kèm chống ngán", 5),
                new(Guid.Parse("33333333-3333-4333-8333-000007000006"), "Hành lá làm mỡ hành & tóp mỡ", 100m, "g", "Cắt nhỏ đổ dầu nóng vào tạo màu xanh", 6),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000007000001"), 1, "Ướp sườn cốt lết mềm mọng", "Dần nhẹ hai mặt miếng sườn cốt lết rồi ướp với nước cốt hành tỏi sả, mật ong, sữa đặc, nước mắm, dầu hào và chút dầu ăn tối thiểu 30 phút để thớ thịt thấm vị và mềm ngọt.", 30, "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000007000002"), 2, "Hấp chả trứng và nấu cơm tấm", "Trộn thịt heo xay với nấm mèo băm, bún tàu, hành tím, trứng vịt rồi đem hấp 20 phút, sau đó phết lòng đỏ trứng gà lên mặt hấp mở nắp thêm 5 phút. Nấu gạo tấm chín dẻo tơi.", 25, "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000007000003"), 3, "Nướng sườn và thắng nước mắm kẹo", "Nướng sườn trên bếp than hoa hoặc nồi chiên không dầu ở 190 độ C mỗi mặt 8 phút, phết nước ướp để sườn vàng óng. Nấu sôi nước mắm, đường và nước lọc theo tỉ lệ 1:1:1 để nguội rồi pha chanh tỏi ớt.", 15, "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000007000004"), 4, "Trình bày đĩa cơm tấm Sài Gòn", "Đơm cơm tấm ra đĩa, rưới mỡ hành tóp mỡ lên cơm, xếp miếng sườn nướng, bì thính, miếng chả trứng, dưa leo, đồ chua và chén nước mắm kẹo chua ngọt bên cạnh.", 5, "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000008"),
            "Cơm Gà Xối Mỡ Da Giòn Nước Mắm Tỏi",
            "com-ga-xoi-mo-da-gion",
            "Đùi gà góc tư được luộc chín mềm bên trong rồi xối dầu sôi cho lớp da nổ giòn tan vàng rụm, dùng kèm cơm rang săn hạt màu đỏ cam đẹp mắt và sốt mắm tỏi đậm đà.",
            20, 30, 4, RecipeDifficulty.Medium,
            Guid.Parse("11111111-1111-4111-8111-000000000002"), "seeder-user-id",
            "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=900&auto=format&fit=crop&q=80",
            615m, 36m, 62m, 23m, 2m, 810m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000008000001"), "Đùi gà góc tư", 4m, "cái", "Chà xát muối gừng rửa sạch, để ráo", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000008000002"), "Cơm trắng nấu bằng nước luộc gà", 600m, "g", "Để nguội bớt trước khi chiên", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000008000003"), "Tỏi băm, gừng, hoa hồi, ngũ vị hương", 40m, "g", "Ướp và tạo hương thơm cho gà", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000008000004"), "Tương cà, dầu màu điều, trứng gà", 50m, "g", "Tạo màu vàng cam óng cho hạt cơm chiên", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000008000005"), "Xà lách, dưa leo, cà chua, ngò rí", 200m, "g", "Trang trí và ăn kèm", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000008000001"), 1, "Hấp chín đùi gà và làm khô da", "Ướp đùi gà với chút muối, ngũ vị hương và gừng rồi hấp chín 15 phút. Lấy gà ra để thật ráo và quét một lớp giấm mạch nha mỏng lên da để khi xối mỡ da giòn rụm.", 20, "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000008000002"), 2, "Chiên cơm đảo lửa lớn", "Phi thơm tỏi băm với dầu điều, cho cơm nấu nước luộc gà vào đảo đều trên lửa lớn cùng 1 quả trứng gà và chút tương cà cho hạt cơm săn tơi và lên màu cam đẹp mắt.", 10, "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000008000003"), 3, "Xối mỡ nóng giòn da gà", "Đun nóng dầu trong chảo sâu lòng, đặt đùi gà lên vợt rồi liên tục múc dầu sôi dội đều lên mặt da gà cho đến khi lớp da phồng giòn vàng óng.", 10, "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000008000004"), 4, "Rưới sốt mắm tỏi và bày đĩa", "Chặt đùi gà xối mỡ xếp cạnh phần cơm chiên, rưới một muỗng sốt nước mắm tỏi ớt kẹo lên da gà, dùng nóng cùng dưa leo, cà chua và chén canh nước luộc gà.", 5, "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000009"),
            "Cơm Chiên Dương Châu Tôm Lạp Xưởng",
            "com-chien-duong-chau-tom-lap-xuong",
            "Món cơm chiên ngũ sắc bắt mắt với từng hạt cơm áo trứng vàng ươm săn tơi, hòa quyện vị ngọt của tôm tươi, lạp xưởng Mai Quế Lộ, đậu Hà Lan, cà rốt và bắp ngọt.",
            15, 15, 4, RecipeDifficulty.Easy,
            Guid.Parse("11111111-1111-4111-8111-000000000002"), "seeder-user-id",
            "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=900&auto=format&fit=crop&q=80",
            520m, 24m, 64m, 18m, 4m, 720m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000009000001"), "Cơm trắng để nguội", 600m, "g", "Nên dùng cơm nấu hơi khô để hạt cơm tơi", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000009000002"), "Tôm tươi bóc vỏ & lạp xưởng", 250m, "g", "Thái hạt lựu đều nhau", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000009000003"), "Trứng gà tươi", 3m, "quả", "Đánh tan 2 lòng đỏ trộn cơm, 1 quả chiên cắt sợi", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000009000004"), "Đậu Hà Lan, cà rốt, bắp ngọt", 150m, "g", "Cắt hạt lựu, chần sơ nước sôi 2 phút", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000009000005"), "Hành lá, tỏi băm, dầu mè, nước tương", 40m, "g", "Tạo hương thơm dậy vị", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000009000001"), 1, "Trộn cơm với lòng đỏ trứng gà", "Đánh tan 2 lòng đỏ trứng gà với 1 muỗng dầu ăn rồi trộn thật đều vào tô cơm nguội để từng hạt cơm đều được áo lớp trứng vàng óng.", 5, "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000009000002"), 2, "Xào nhân tôm, lạp xưởng và rau củ", "Phi thơm tỏi băm, cho lạp xưởng và tôm cắt hạt lựu vào xào săn, tiếp tục cho cà rốt, đậu Hà Lan, bắp ngọt đã chần sơ vào đảo 3 phút rồi trút ra đĩa.", 8, "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000009000003"), 3, "Chiên cơm săn hạt trên lửa lớn", "Làm nóng chảo với chút dầu ăn, cho cơm đã trộn trứng vào đảo nhanh tay liên tục trên lửa lớn khoảng 6 phút cho đến khi hạt cơm khô ráo và nhảy tơi trên mặt chảo.", 6, "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000009000004"), 4, "Kết hợp nhân và hoàn tất", "Trút toàn bộ phần nhân tôm, lạp xưởng, rau củ vào chảo cơm, nêm hạt nêm, nước tương, dầu mè và hành lá cắt nhỏ, đảo đều 2 phút rồi múc ra đĩa thưởng thức.", 3, "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000010"),
            "Xôi Gà Xé Phay Hành Phi Trứng Non",
            "xoi-ga-xe-phay-trung-non",
            "Xôi nếp cái hoa vàng đồ dẻo thơm bóng bẩy kết hợp thịt gà ta xé phay trộn hành tây chua ngọt, trứng gà non rim mặn ngọt và lớp hành phi mỡ gà giòn rụm.",
            35, 40, 4, RecipeDifficulty.Medium,
            Guid.Parse("11111111-1111-4111-8111-000000000002"), "seeder-user-id",
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&auto=format&fit=crop&q=80",
            550m, 30m, 68m, 16m, 3m, 690m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000010000001"), "Gạo nếp cái hoa vàng", 500m, "g", "Ngâm nước ấm 4 giờ cùng chút bột nghệ", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000010000002"), "Thịt đùi và ức gà ta", 500m, "g", "Luộc chín rồi xé phay vừa ăn", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000010000003"), "Trứng gà non", 200m, "g", "Rim nước tương, dầu hào đậm đà", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000010000004"), "Hành tím thái lát & mỡ gà", 100m, "g", "Phi vàng giòn tạo hương thơm", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000010000005"), "Rau răm, hành lá, chanh, tiêu", 50m, "g", "Trộn gỏi gà xé phay", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000010000001"), 1, "Đồ xôi nếp dẻo bóng", "Gạo nếp sau khi ngâm vớt ra để ráo, xóc với nửa muỗng cà phê muối và 1 muỗng mỡ gà. Cho vào xửng hấp chín dẻo trong 30 phút, thỉnh thoảng xới đều để hạt xôi chín tơi.", 30, "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000010000002"), 2, "Luộc gà và trộn gà xé phay", "Luộc chín thịt gà ta với gừng và hành tím, để nguội rồi xé miếng vừa ăn. Trộn thịt gà với muối tiêu chanh, hành tây thái mỏng ngâm đá và rau răm cắt nhỏ.", 15, "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000010000003"), 3, "Rim trứng non và làm mỡ hành", "Phi thơm hành tỏi, cho trứng gà non vào rim với nước tương, dầu hào, đường và chút nước luộc gà trong 10 phút cho thấm màu nâu bóng.", 10, "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000010000004"), 4, "Trình bày xôi gà trứng non", "Đơm xôi nóng ra bát hoặc lá chuối, xếp gà xé phay và trứng non rim lên trên, rưới mỡ hành và rắc thật nhiều hành tím phi giòn rụm.", 5, "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000011"),
            "Xôi Xéo Đậu Xanh Mỡ Hành Hà Thành",
            "xoi-xeo-dau-xanh-mo-hanh",
            "Thức quà sáng kinh điển của Hà Nội với hạt xôi vàng óng dẻo thơm màu nghệ, những lát đậu xanh nắm mịn màng cắt xéo, quyện cùng mỡ gà béo ngậy và hành phi thơm nức.",
            30, 35, 4, RecipeDifficulty.Easy,
            Guid.Parse("11111111-1111-4111-8111-000000000002"), "seeder-user-id",
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
            480m, 14m, 74m, 13m, 5m, 420m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000011000001"), "Gạo nếp nhung hạt tròn", 500m, "g", "Ngâm với nước nghệ tươi tạo màu vàng tự nhiên", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000011000002"), "Đậu xanh cà vỏ", 250m, "g", "Ngâm mềm, hấp chín rồi giã nhuyễn nắm tròn", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000011000003"), "Hành tím ta thái lát đều", 150m, "g", "Phơi hơi héo trước khi phi để giòn lâu", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000011000004"), "Mỡ gà hoặc dầu ăn, muối hạt", 80m, "ml", "Dùng phi hành và rưới lên xôi", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000011000005"), "Chả quế hoặc ruốc thịt heo", 150m, "g", "Ăn kèm tăng hương vị", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000011000001"), 1, "Ngâm gạo nếp với nước nghệ và đồ xôi", "Gạo nếp ngâm cùng 2 muỗng nước cốt nghệ tươi trong 4 tiếng cho hạt nếp ngậm màu vàng tươi. Vớt ra để ráo, xóc chút muối rồi đồ trong xửng 30 phút cho xôi chín dẻo.", 30, "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000011000002"), 2, "Hấp đậu xanh và nắm quả đậu", "Đậu xanh hấp chín bở với chút muối,趁 lúc còn nóng đem giã thật mịn cùng 1 muỗng mỡ gà rồi nắm chặt lại thành những nắm tròn chắc tay.", 15, "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000011000003"), 3, "Phi hành tím với mỡ gà", "Đun nóng mỡ gà trên lửa vừa, thả hành tím thái lát vào đảo đều tay. Khi hành chuyển màu vàng tươi thì tắt bếp ngay và vớt hành ra giấy thấm dầu để hành giòn tan.", 10, "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000011000004"), 4, "Xéo đậu xanh và thưởng thức", "Xới xôi vàng ra đĩa, dùng dao sắc thái xéo những lát đậu xanh mỏng phủ lên mặt xôi. Rưới 2 muỗng mỡ gà nóng hổi, rắc hành phi giòn và dùng kèm chả quế.", 5, "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000012"),
            "Thịt Kho Tàu Trứng Vịt Nước Dừa Tươi",
            "thit-kho-tau-trung-vit-nuoc-dua",
            "Món thịt kho tàu truyền thống với những khối thịt ba chỉ vuông vắn mềm rục, lớp mỡ trong veo không ngấy, trứng vịt thấm vị nâu cánh gián nhờ kho chậm với nước dừa xiêm tươi.",
            25, 75, 6, RecipeDifficulty.Easy,
            Guid.Parse("11111111-1111-4111-8111-000000000003"), "seeder-user-id",
            "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80",
            580m, 32m, 18m, 41m, 1m, 920m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000012000001"), "Thịt ba chỉ heo rút sườn", 800m, "g", "Cắt khối vuông dày 4cm", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000012000002"), "Trứng vịt luộc bóc vỏ", 6m, "quả", "Luộc chín tới bóc vỏ khéo léo", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000012000003"), "Nước dừa xiêm tươi", 800m, "ml", "Tạo màu nâu đỏ tự nhiên và vị ngọt thanh", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000012000004"), "Nước mắm cốt nhĩ 40 độ đạm", 5m, "muỗng canh", "Gia vị chính tạo hương thơm", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000012000005"), "Đường vàng, hành tím, tỏi, ớt trái", 60m, "g", "Thắng nước màu và ướp thịt", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000012000001"), 1, "Chần sơ và ướp thịt ba chỉ", "Chần khối thịt ba chỉ trong nước sôi có gừng 3 phút rồi rửa sạch để lớp da trong. Ướp thịt với hành tỏi băm, nước mắm cốt, đường vàng, tiêu và 1 muỗng nước màu dừa trong 30 phút.", 30, "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000012000002"), 2, "Xào săn thịt và đổ nước dừa tươi", "Bắc nồi lên bếp, cho thịt đã ướp vào đảo lửa vừa cho các mặt thịt săn lại. Đổ nước dừa xiêm tươi ngập mặt thịt, đun sôi rồi hớt sạch bọt.", 15, "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000012000003"), 3, "Kho nhỏ lửa cho thịt mềm rục", "Hạ lửa nhỏ liu riu, đậy lá chuối hoặc mở hé nắp kho trong 50 phút cho thịt mềm trong và nước kho sánh màu cánh gián đẹp mắt.", 50, "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000012000004"), 4, "Cho trứng vịt vào kho thấm vị", "Thả trứng vịt luộc và vài quả ớt nguyên trái vào kho thêm 15 phút để trứng ngấm đều màu nâu bóng. Múc ra tô dùng nóng với cơm trắng và dưa giá chua.", 15, "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000013"),
            "Cá Lóc Kho Tộ Tiêu Xanh Miền Tây",
            "ca-loc-kho-to-tieu-xanh",
            "Khúc cá lóc đồng kho trong nồi đất săn chắc, thấm đẫm nước sốt kẹo sánh màu hổ phách, thơm nồng mùi tiêu xanh, hành lá và tóp mỡ giòn béo chuẩn vị dân dã miền Tây.",
            20, 35, 4, RecipeDifficulty.Easy,
            Guid.Parse("11111111-1111-4111-8111-000000000003"), "seeder-user-id",
            "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=80",
            390m, 34m, 16m, 20m, 2m, 860m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000013000001"), "Cá lóc đồng làm sạch", 700m, "g", "Chà muối chanh sạch nhớt, cắt khoanh dày 2cm", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000013000002"), "Thịt mỡ heo thái hạt lựu", 100m, "g", "Thắng lấy tóp mỡ và mỡ nước kho cá", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000013000003"), "Tiêu xanh nguyên nhánh & ớt hiểm", 30m, "g", "Tạo vị cay thơm nồng nàn", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000013000004"), "Nước mắm ngon, đường thốt nốt", 4m, "muỗng canh", "Tạo màu caramel và vị mặn ngọt hài hòa", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000013000005"), "Hành tím, tỏi băm, hành lá", 50m, "g", "Phi thơm và rắc mặt nồi cá", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000013000001"), 1, "Sơ chế khử tanh và ướp cá lóc", "Rửa sạch cá lóc với nước muối và chanh tươi để hết sạch nhớt, để ráo. Ướp cá trong nồi đất với nước mắm, đường thốt nốt, hành tỏi băm và tiêu xay trong 20 phút.", 20, "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000013000002"), 2, "Thắng tóp mỡ và nước màu caramel", "Cho mỡ heo vào chảo thắng vàng giòn lấy tóp mỡ. Dùng 2 muỗng mỡ nước thắng đường thốt nốt lên màu nâu cánh gián rồi phi thơm hành tỏi, rưới đều vào nồi cá.", 10, "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000013000003"), 3, "Kho cá lóc trong tộ đất", "Bắc tộ cá lên bếp đun lửa vừa cho cá săn hai mặt, thêm 150ml nước sôi và nhánh tiêu xanh, ớt hiểm vào. Hạ lửa nhỏ kho liu riu 25 phút cho nước kho sánh kẹo.", 25, "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000013000004"), 4, "Rắc tóp mỡ và hành lá", "Khi nước kho sệt lại bám đều từng khoanh cá, rắc tóp mỡ giòn, hành lá cắt khúc và tiêu xay lên trên, bắc nguyên tộ đất đang sôi lăn tăn ra bàn ăn cùng cơm nóng.", 3, "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000014"),
            "Gà Kho Gừng Sả Ớt Ấm Nồng Ngày Mưa",
            "ga-kho-gung-sa-ot",
            "Thịt gà ta săn chắc được kho thấm đẫm hương thơm ấm nồng của gừng tươi thái sợi và sả ớt băm nhuyễn, nước kho sánh vàng cực kỳ bắt cơm trong những ngày se lạnh.",
            20, 30, 4, RecipeDifficulty.Easy,
            Guid.Parse("11111111-1111-4111-8111-000000000003"), "seeder-user-id",
            "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=900&auto=format&fit=crop&q=80",
            420m, 35m, 14m, 24m, 2m, 780m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000014000001"), "Thịt gà ta chặt miếng vừa ăn", 700m, "g", "Chà muối gừng rửa sạch để ráo", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000014000002"), "Gừng già tươi", 60m, "g", "Một nửa băm nhỏ ướp gà, một nửa thái sợi", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000014000003"), "Sả cây & ớt sừng đỏ", 4m, "cây", "Băm nhuyễn sả và ớt", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000014000004"), "Nước mắm, đường nâu, bột nghệ", 4m, "muỗng canh", "Ướp gà lên màu vàng đẹp", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000014000005"), "Hành tím, tỏi, tiêu đen", 30m, "g", "Phi thơm dạy mùi", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000014000001"), 1, "Ướp thịt gà với gừng và bột nghệ", "Chặt thịt gà thành miếng vuông vừa ăn, ướp với gừng băm, nửa phần sả ớt, nước mắm, đường nâu, bột nghệ và tiêu trong 20 phút.", 20, "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000014000002"), 2, "Phi thơm sả gừng và xào săn gà", "Đun nóng dầu ăn, phi thơm hành tỏi, phần sả băm và gừng thái sợi cho dậy mùi. Trút thịt gà vào đảo đều trên lửa lớn cho miếng gà săn chắc và da gà vàng bóng.", 10, "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000014000003"), 3, "Kho gà thấm vị trên lửa nhỏ", "Chế thêm 150ml nước dừa hoặc nước ấm vào nồi, đậy nắp kho lửa nhỏ 20 phút cho thịt gà chín mềm và nước sốt cạn sệt lại.", 20, "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000014000004"), 4, "Nêm lại và trình bày", "Cho ớt thái lát và một ít gừng sợi tươi lên trên, đảo đều 1 phút rồi tắt bếp. Dọn món gà kho gừng sả ớt ra đĩa sâu lòng ăn kèm cơm trắng nóng.", 3, "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000015"),
            "Sườn Non Rim Mặn Ngọt Nước Dừa",
            "suon-non-rim-man-ngot",
            "Những dẻ sườn non nhiều sụn được rim chậm trong nước dừa tươi và sốt mắm tỏi ớt cho đến khi mềm róc xương, áo lớp sốt nâu đỏ bóng mượt mặn ngọt hài hòa.",
            20, 35, 4, RecipeDifficulty.Easy,
            Guid.Parse("11111111-1111-4111-8111-000000000003"), "seeder-user-id",
            "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80",
            490m, 31m, 19m, 32m, 1m, 830m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000015000001"), "Sườn non heo nhiều sụn", 600m, "g", "Chặt miếng dài 4cm vừa ăn", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000015000002"), "Nước dừa tươi", 300m, "ml", "Giúp sườn mềm ngọt và lên màu tự nhiên", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000015000003"), "Nước mắm, dầu hào, mật ong", 4m, "muỗng canh", "Tạo lớp sốt bóng mượt", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000015000004"), "Tỏi băm, hành tím băm, ớt", 40m, "g", "Phi thơm tạo hương vị đậm đà", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000015000005"), "Hành lá, mè trắng rang", 15m, "g", "Rắc trang trí khi hoàn tất", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000015000001"), 1, "Chần sườn non và ướp gia vị", "Chần sườn non qua nước sôi có chút muối trong 3 phút rồi rửa sạch để ráo. Ướp sườn với hành tỏi băm, nước mắm, dầu hào và mật ong trong 15 phút.", 18, "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000015000002"), 2, "Áp chảo vàng hai mặt sườn", "Làm nóng chảo với 1 muỗng dầu ăn, cho sườn vào áp chảo lửa vừa đến khi các cạnh sườn xém vàng thơm lừng.", 8, "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000015000003"), 3, "Rim sườn với nước dừa tươi", "Đổ 300ml nước dừa tươi cùng phần nước ướp vào chảo, đậy nắp rim lửa nhỏ trong 25 phút cho sườn chín mềm và nước dừa rút cạn thành sốt kẹo.", 25, "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000015000004"), 4, "Đảo sốt áo đều và rắc mè rang", "Mở nắp, tăng lửa vừa đảo đều 2 phút để lớp sốt nâu đỏ bóng mượt bám chặt quanh từng miếng sườn. Rắc hành lá và mè trắng rang lên trên rồi bày ra đĩa.", 3, "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000016"),
            "Cá Bống Sông Kho Tiêu Nồi Đất",
            "ca-bong-song-kho-tieu-noi-dat",
            "Con cá bống sông kho khô săn chắc đến tận xương, ngấm vị mặn ngọt của nước mắm truyền thống và vị cay thơm của tiêu đen đập dập, ăn cùng cháo trắng hay cơm nóng đều tuyệt hảo.",
            15, 40, 4, RecipeDifficulty.Easy,
            Guid.Parse("11111111-1111-4111-8111-000000000003"), "seeder-user-id",
            "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=900&auto=format&fit=crop&q=80",
            340m, 32m, 15m, 16m, 1m, 880m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000016000001"), "Cá bống sông tươi", 500m, "g", "Làm sạch vảy, xóc muối cho thân cá săn cứng", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000016000002"), "Thịt ba chỉ thái con chì", 100m, "g", "Kho cùng cá bống giúp cá bóng béo không khô", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000016000003"), "Nước mắm nhĩ, đường cát vàng", 4m, "muỗng canh", "Ướp cá lên màu cánh gián", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000016000004"), "Tiêu sọ đập dập & ớt trái", 20m, "g", "Tạo hương cay nồng đặc trưng", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000016000005"), "Hành tím, tỏi, dầu ăn", 30m, "g", "Phi thơm lót đáy nồi đất", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000016000001"), 1, "Xóc muối làm săn cá bống", "Cá bống làm sạch ruột và vảy, rửa qua nước trà xanh hoặc muối loãng rồi để ráo. Ướp cá với đường, nước mắm, tiêu sọ đập dập trong 20 phút cho thân cá săn cứng lại.", 20, "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000016000002"), 2, "Xào thịt ba chỉ và xếp cá vào nồi đất", "Thắng chút đường làm nước màu trong nồi đất, cho thịt ba chỉ thái nhỏ và hành tỏi vào đảo săn rồi xếp từng con cá bống lên trên.", 8, "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000016000003"), 3, "Kho cá bống hai lửa cho săn chắc", "Đun sôi nồi cá trên lửa nhỏ 15 phút rồi tắt bếp để nguội cho cá dẻo thịt. Sau đó bật bếp kho lửa thật nhỏ lần 2 thêm 20 phút cho đến khi nước kho cạn sánh.", 35, "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000016000004"), 4, "Rắc tiêu sọ và thưởng thức", "Rưới thêm 1 muỗng dầu ăn hoặc mỡ nước để con cá bóng đẹp, rắc tiêu sọ đập dập và ớt hiểm lên mặt, dùng ngay với cơm trắng hoặc cơm cháy.", 3, "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000017"),
            "Canh Chua Cá Lóc Bạc Hà Đậu Bắp Nam Bộ",
            "canh-chua-ca-loc-nam-bo",
            "Tô canh chua chuẩn vị miền sông nước Nam Bộ với vị chua thanh từ nước cốt me chín, vị ngọt của dứa, cà chua, bạc hà, đậu bắp, giá đỗ và hương thơm nức mũi của ngò ôm, ngò gai, tỏi phi.",
            20, 25, 4, RecipeDifficulty.Easy,
            Guid.Parse("11111111-1111-4111-8111-000000000004"), "seeder-user-id",
            "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=900&auto=format&fit=crop&q=80",
            285m, 27m, 22m, 9m, 5m, 680m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000017000001"), "Cá lóc đồng tươi", 600m, "g", "Làm sạch, cắt khoanh vừa ăn", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000017000002"), "Me vắt chín", 50m, "g", "Dầm với nước ấm lọc lấy nước cốt me", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000017000003"), "Thơm (dứa), cà chua, đậu bắp, bạc hà", 400m, "g", "Thái lát xéo vừa ăn", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000017000004"), "Giá đỗ tươi", 100m, "g", "Rửa sạch để ráo", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000017000005"), "Ngò ôm (rau ngổ), ngò gai, tỏi phi, ớt", 50m, "g", "Thái nhỏ rắc lên mặt canh", 5),
                new(Guid.Parse("33333333-3333-4333-8333-000017000006"), "Nước mắm, đường phèn, muối", 3m, "muỗng canh", "Cân bằng vị chua ngọt", 6),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000017000001"), 1, "Sơ chế cá lóc và các loại rau canh chua", "Cá lóc rửa sạch với muối chanh, cắt khoanh rồi ướp nhẹ chút nước mắm và tiêu. Bạc hà tước vỏ cắt xéo, đậu bắp cắt xéo, thơm cắt miếng quạt, cà chua bổ múi cau.", 15, "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000017000002"), 2, "Phi tỏi và nấu nước canh me", "Phi vàng tỏi băm với dầu ăn, vớt phân nửa tỏi phi ra chén. Phần còn lại cho cà chua và thơm vào xào 3 phút rồi chế 1.2 lít nước sôi cùng nước cốt me vào đun sôi.", 10, "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000017000003"), 3, "Nấu chín cá lóc và nêm gia vị", "Khi nước canh sôi mạnh, thả cá lóc vào nấu khoảng 10 phút trên lửa vừa, hớt bọt kỹ. Nêm đường, muối và nước mắm cho đạt vị chua thanh ngọt dịu đặc trưng Nam Bộ.", 10, "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000017000004"), 4, "Cho rau vào và rắc ngò ôm tỏi phi", "Cho đậu bắp vào nấu 2 phút, tiếp tục cho bạc hà và giá đỗ vào đảo nhẹ rồi tắt bếp ngay để rau giữ độ giòn. Múc ra tô, rắc ngò ôm, ngò gai, ớt lát và tỏi phi vàng.", 5, "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000018"),
            "Canh Sườn Non Hầm Củ Sen Táo Đỏ",
            "canh-suon-non-ham-cu-sen",
            "Món canh hầm dưỡng sinh thanh ngọt tự nhiên từ sườn non heo, củ sen bùi bở, táo đỏ và kỷ tử, giúp bồi bổ sức khỏe và an thần giấc ngủ cho cả gia đình.",
            20, 50, 4, RecipeDifficulty.Easy,
            Guid.Parse("11111111-1111-4111-8111-000000000004"), "seeder-user-id",
            "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
            350m, 25m, 28m, 14m, 4m, 540m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000018000001"), "Sườn non heo", 500m, "g", "Chặt miếng vừa ăn, chần sạch bọt", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000018000002"), "Củ sen tươi", 400m, "g", "Gọt vỏ, thái lát tròn dày 0.7cm, ngâm nước muối", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000018000003"), "Táo đỏ Hàn Quốc & hạt sen tươi", 120m, "g", "Rửa sạch để ráo", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000018000004"), "Cà rốt tỉa hoa", 1m, "củ", "Cắt khoanh vừa ăn", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000018000005"), "Hành lá, ngò rí, gừng tươi, hạt nêm", 30m, "g", "Nêm thanh vị", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000018000001"), 1, "Chần sườn non và sơ chế củ sen", "Chần sườn non trong nước sôi có vài lát gừng khoảng 4 phút rồi rửa sạch. Củ sen gọt vỏ, thái khoanh tròn, ngâm qua nước pha chút giấm để củ sen trắng đẹp.", 15, "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000018000002"), 2, "Hầm sườn non và củ sen", "Cho sườn non và củ sen vào nồi cùng 1.5 lít nước, đun sôi rồi hạ lửa nhỏ hầm trong 30 phút cho sườn mềm và củ sen bở bùi.", 30, "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000018000003"), 3, "Thêm hạt sen, táo đỏ và cà rốt", "Cho hạt sen tươi, cà rốt và táo đỏ vào hầm tiếp 15 phút. Nêm muối, hạt nêm và nửa muỗng nước mắm ngon cho nước canh ngọt dịu.", 15, "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000018000004"), 4, "Múc canh ra tô thưởng thức nóng", "Rắc hành lá, ngò rí và chút tiêu xay lên mặt tô canh, dùng nóng trong bữa cơm gia đình.", 3, "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000019"),
            "Canh Cua Rau Đay Mồng Tơi Cà Pháo",
            "canh-cua-rau-day-mong-toi",
            "Bát canh cua đồng nấu rau đay, mồng tơi và mướp hương thơm mát với lớp thịt cua đóng tảng dày dặn, dùng kèm đĩa cà pháo muối giòn tan gợi nhớ hương vị quê nhà.",
            25, 15, 4, RecipeDifficulty.Easy,
            Guid.Parse("11111111-1111-4111-8111-000000000004"), "seeder-user-id",
            "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
            210m, 19m, 15m, 7m, 5m, 590m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000019000001"), "Cua đồng làm sạch xay nhuyễn", 400m, "g", "Lọc lấy nước thịt cua và khêu gạch riêng", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000019000002"), "Rau đay & rau mồng tơi tươi", 300m, "g", "Nhặt lá non, rửa sạch thái nhỏ", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000019000003"), "Mướp hương non", 1m, "quả", "Gọt vỏ, bổ đôi thái lát xéo", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000019000004"), "Hành tím phi & chút mắm tôm", 20m, "g", "Tạo mùi thơm dậy vị", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000019000005"), "Gia vị muối, bột ngọt, nước mắm", 2m, "muỗng canh", "Nêm vừa khẩu vị", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000019000001"), 1, "Lọc nước cua đồng và sơ chế rau", "Hòa cua xay với 1.2 lít nước và nửa muỗng muối, bóp đều rồi lọc qua rây 2 lần lấy nước cua mịn. Rau đay, mồng tơi thái nhỏ; mướp hương thái miếng vừa ăn.", 15, "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000019000002"), 2, "Đun kết tảng gạch cua", "Bắc nồi nước cua lên bếp đun lửa vừa, khuấy nhẹ đều tay. Khi thịt cua bắt đầu đóng tảng nổi lên mặt nước thì hạ nhỏ lửa và gạt tảng riêu cua sang một bên nồi.", 8, "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000019000003"), 3, "Cho mướp và rau đay mồng tơi vào nấu", "Thả mướp hương, rau đay và mồng tơi vào phần nước sôi bên cạnh tảng cua, ấn nhẹ cho rau ngập nước rồi đun sôi 3 phút đến khi rau chín xanh mềm.", 4, "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000019000004"), 4, "Rưới gạch cua chưng và thưởng thức", "Phi thơm hành tím với gạch cua rồi rưới lên mặt nồi canh, nêm lại vừa ăn. Múc canh ra tô dùng nóng với cơm trắng và cà pháo muối giòn.", 3, "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000020"),
            "Canh Khổ Qua Nhồi Thịt Cá Thác Lác",
            "canh-kho-qua-nhoi-thit",
            "Khổ qua xanh mướt được hầm vừa chín tới giữ vị đắng thanh mát dịu nhẹ, bên trong là phần nhân thịt heo quết cùng chả cá thác lác dai giòn ngọt đậm đà.",
            25, 30, 4, RecipeDifficulty.Easy,
            Guid.Parse("11111111-1111-4111-8111-000000000004"), "seeder-user-id",
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80",
            310m, 26m, 16m, 15m, 4m, 650m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000020000001"), "Khổ qua (mướp đắng) trái gai nở", 4m, "quả", "Cắt khúc hoặc bổ dọc móc sạch ruột", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000020000002"), "Thịt nạc vai xay & cá thác lác nạo", 350m, "g", "Quết dẻo tạo độ dai giòn cho nhân", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000020000003"), "Nấm mèo (mộc nhĩ) & bún tàu", 30m, "g", "Ngâm nở, băm nhỏ trộn vào nhân", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000020000004"), "Nước dùng xương heo", 1200m, "ml", "Giúp nước canh ngọt đậm", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000020000005"), "Hành lá, ngò rí, tiêu sọ, nước mắm", 30m, "g", "Ướp nhân và rắc mặt canh", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000020000001"), 1, "Quết nhân thịt và cá thác lác", "Trộn đều thịt nạc xay, cá thác lác nạo, nấm mèo, bún tàu băm nhỏ cùng đầu hành băm, tiêu, hạt nêm và 1 muỗng nước mắm. Dùng muỗng quết mạnh 5 phút cho nhân dẻo dai.", 15, "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000020000002"), 2, "Sơ chế khổ qua giảm đắng và nhồi nhân", "Khổ qua cắt khúc 4cm, bỏ sạch ruột và lớp màng trắng bên trong để giảm vị đắng gắt. Nhồi chặt phần nhân thịt cá thác lác vào lòng từng khúc khổ qua.", 10, "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000020000003"), 3, "Hầm khổ qua trong nước dùng sôi", "Đun sôi nồi nước dùng xương, thả nhẹ các khúc khổ qua nhồi thịt vào hầm trên lửa vừa không đậy kín nắp khoảng 25 phút để khổ qua chín mềm mà vẫn giữ màu xanh.", 25, "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000020000004"), 4, "Nêm nếm và rắc hành ngò tiêu xay", "Hớt sạch bọt, nêm lại chút nước mắm cốt cho dậy hương rồi tắt bếp. Múc canh ra tô, rắc nhiều hành ngò và tiêu xay thưởng thức nóng.", 3, "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000021"),
            "Súp Cua Trứng Bắc Thảo Nấm Đông Cô",
            "sup-cua-trung-bac-thao",
            "Chén súp cua nóng hổi sánh mịn thơm lừng dầu mè, đầy ắp thịt cua biển tươi, nấm đông cô, bắp Mỹ ngọt, trứng cút và trứng bắc thảo bùi béo giàu dinh dưỡng.",
            20, 25, 4, RecipeDifficulty.Easy,
            Guid.Parse("11111111-1111-4111-8111-000000000004"), "seeder-user-id",
            "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=900&auto=format&fit=crop&q=80",
            295m, 24m, 26m, 10m, 2m, 620m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000021000001"), "Thịt cua biển tươi gỡ múi", 250m, "g", "Xào sơ với hành tím cho thơm", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000021000002"), "Ức gà luộc xé sợi & nước luộc gà", 1200m, "ml", "Làm nền nước súp ngọt thanh", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000021000003"), "Trứng bắc thảo & trứng cút luộc", 10m, "quả", "Trứng bắc thảo bổ múi cau", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000021000004"), "Nấm đông cô tươi & hạt bắp ngọt", 150m, "g", "Nấm thái lát mỏng, bắp tách hạt", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000021000005"), "Trứng gà đánh tan & bột năng", 80m, "g", "Tạo vân trứng và độ sánh mịn", 5),
                new(Guid.Parse("33333333-3333-4333-8333-000021000006"), "Dầu mè thơm, ngò rí, tiêu, sa tế", 25m, "g", "Ăn kèm khi múc ra chén", 6),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000021000001"), 1, "Nấu nước dùng gà với bắp ngọt và nấm", "Đun sôi 1.2 lít nước luộc gà, cho hạt bắp ngọt và nấm đông cô thái lát vào nấu 10 phút cho tiết vị ngọt tự nhiên.", 10, "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000021000002"), 2, "Cho thịt cua và gà xé sợi vào nồi", "Thêm thịt ức gà xé sợi, thịt cua biển đã xào thơm và trứng cút luộc vào nồi, nêm muối, hạt nêm và chút đường phèn vừa ăn.", 8, "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000021000003"), 3, "Xuống bột năng và kéo vân trứng", "Từ từ rót nước bột năng vào khuấy đều đến khi súp đạt độ sánh mượt. Tiếp tục rót chậm trứng gà đánh tan qua rây đồng thời khuấy một chiều để tạo vân trứng đẹp mắt.", 5, "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000021000004"), 4, "Bày trứng bắc thảo và dầu mè", "Múc súp cua nóng ra chén, đặt miếng trứng bắc thảo lên trên, rưới vài giọt dầu mè thơm, ngò rí, tiêu xay và chút sa tế.", 2, "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000022"),
            "Bò Lúc Lắc Khoai Tây Áp Chảo Bơ Tỏi",
            "bo-luc-lac-khoai-tay-bo-toi",
            "Những khối thịt thăn bò vuông vức được áp chảo lửa lớn xém cạnh thơm lừng bơ tỏi nhưng bên trong vẫn mềm mọng hồng đào, xóc đều cùng ớt chuông giòn ngọt và khoai tây chiên.",
            20, 15, 4, RecipeDifficulty.Medium,
            Guid.Parse("11111111-1111-4111-8111-000000000005"), "seeder-user-id",
            "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80",
            540m, 37m, 38m, 26m, 4m, 740m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000022000001"), "Thịt thăn nội bò (Tenderloin)", 500m, "g", "Thái khối vuông quân cờ 2.5cm", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000022000002"), "Khoai tây vàng", 400m, "g", "Cắt thanh dài, chiên vàng giòn", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000022000003"), "Ớt chuông xanh đỏ & hành tây", 300m, "g", "Cắt miếng vuông tương đương miếng thịt bò", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000022000004"), "Bơ lạt, tỏi đập dập, dầu hào, nước tương", 60m, "g", "Ướp bò và tạo sốt bơ tỏi bóng mượt", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000022000005"), "Xà lách xoăn & cà chua bi", 150m, "g", "Lót đĩa ăn kèm", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000022000001"), 1, "Ướp thịt thăn bò mềm ngọt", "Thịt bò thấm khô nước, cắt khối vuông 2.5cm. Ướp với tỏi băm, dầu hào, nước tương, tiêu đen và 1 muỗng dầu ô liu trong 15 phút (không ướp muối sớm để thịt không ra nước).", 15, "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000022000002"), 2, "Chiên vàng khoai tây và xào ớt chuông", "Chiên khoai tây vàng giòn rồi vớt ra giấy thấm dầu. Dùng chảo nóng xào nhanh hành tây và ớt chuông trên lửa lớn trong 90 giây để rau củ chín tới mà vẫn giòn bóng.", 10, "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000022000003"), 3, "Áp chảo bò lúc lắc lửa lớn với bơ tỏi", "Đun chảo gang thật nóng, cho thịt bò vào áp chảo mỗi mặt 1 phút cho xém cạnh. Cho 20g bơ lạt và tỏi đập dập vào lắc đều chảo để bơ tỏi áo quanh miếng bò.", 4, "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000022000004"), 4, "Kết hợp rau củ và trình bày", "Trút ớt chuông, hành tây vào chảo bò đảo nhanh 30 giây rồi tắt bếp. Bày xà lách xoăn, khoai tây chiên và bò lúc lắc ra đĩa, chấm kèm muối tiêu chanh hoặc tương ớt.", 3, "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000023"),
            "Mực Xào Chua Ngọt Dứa Cà Chua Cần Tây",
            "muc-xao-chua-ngot-dua-ca-chua",
            "Mực ống tươi khía vảy rồng trắng giòn sần sật được xào lửa lớn cùng dứa chín, cà chua, dưa leo và cần tây tạo nên món xào đầy màu sắc, chua ngọt kích thích vị giác.",
            20, 12, 4, RecipeDifficulty.Easy,
            Guid.Parse("11111111-1111-4111-8111-000000000005"), "seeder-user-id",
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80",
            320m, 28m, 24m, 11m, 3m, 690m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000023000001"), "Mực ống tươi dày mình", 500m, "g", "Làm sạch, khía vảy rồng chéo và cắt miếng", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000023000002"), "Thơm (dứa) & cà chua chín", 250m, "g", "Thơm cắt lát, cà chua bổ múi cau", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000023000003"), "Dưa leo & hành tây", 200m, "g", "Dưa leo bỏ ruột cắt xéo, hành tây bổ múi", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000023000004"), "Cần tây, hành lá, gừng, tỏi", 80m, "g", "Cắt khúc vừa ăn", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000023000005"), "Nước mắm, dầu hào, tương ớt, đường", 3m, "muỗng canh", "Pha sốt xào chua ngọt", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000023000001"), 1, "Khía vảy rồng và chần nhanh mực tươi", "Mực ống rửa với rượu gừng khử tanh, khía caro nhẹ mặt trong rồi cắt miếng vừa ăn. Chần nhanh mực qua nước sôi có gừng trong 30 giây rồi vớt ngay vào tô nước đá để mực giòn và không ra nước khi xào.", 10, "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000023000002"), 2, "Xào nhanh mực với tỏi gừng", "Phi thơm tỏi và gừng trên lửa lớn, cho mực đã ráo nước vào đảo nhanh 1 phút với 1 muỗng nước mắm rồi trút ra đĩa riêng.", 3, "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000023000003"), 3, "Xào thơm, cà chua và rau củ", "Cho thơm, cà chua vào chảo xào 2 phút với sốt dầu hào, tương ớt và đường, sau đó cho dưa leo và hành tây vào đảo trên lửa lớn thêm 2 phút.", 4, "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000023000004"), 4, "Kết hợp mực và cần tây", "Trút mực và cần tây, hành lá cắt khúc vào chảo, đảo đều tay 1 phút cho sốt chua ngọt áo đều miếng mực rồi tắt bếp, rắc tiêu xay dùng nóng.", 2, "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000024"),
            "Rau Muống Xào Tỏi Xanh Giòn Chuẩn Quán",
            "rau-muong-xao-toi-xanh-gion",
            "Đĩa rau muống xào tỏi xanh mướt bóng bẩy, cọng rau giòn sần sật ngập tràn hương tỏi đập dập phi thơm vàng, bí quyết nằm ở bước chần sơ và sốc nhiệt nước đá.",
            15, 8, 4, RecipeDifficulty.Easy,
            Guid.Parse("11111111-1111-4111-8111-000000000005"), "seeder-user-id",
            "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
            180m, 5m, 12m, 12m, 6m, 520m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000024000001"), "Rau muống cọng non", 600m, "g", "Nhặt bớt lá, ngắt khúc vừa ăn rửa sạch", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000024000002"), "Tỏi ta củ nhỏ thơm", 2m, "củ", "Bóc vỏ, đập dập không băm quá vụn", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000024000003"), "Dầu hào, nước mắm cốt, hạt nêm", 2m, "muỗng canh", "Nêm đậm đà vừa miệng", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000024000004"), "Mỡ heo hoặc dầu ăn", 2m, "muỗng canh", "Giúp cọng rau bóng mượt", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000024000005"), "Chanh tươi hoặc sấu luộc", 1m, "quả", "Vắt vào nước luộc rau làm canh chua", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000024000001"), 1, "Chần rau muống và ngâm nước đá", "Đun thật sôi nồi nước với 1 muỗng cà phê muối, thả rau muống vào chần đúng 1 phút rồi vớt ngay ra thau nước đá lạnh ngâm 3 phút, sau đó vớt ra để thật ráo nước.", 8, "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000024000002"), 2, "Phi thơm một nửa lượng tỏi đập dập", "Đun nóng chảo gang với 2 muỗng mỡ heo trên lửa lớn nhất, cho phân nửa lượng tỏi đập dập vào phi dậy mùi thơm vàng.", 2, "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000024000003"), 3, "Xào rau muống trên lửa lớn", "Thả rau muống đã ráo nước vào chảo, nêm dầu hào, hạt nêm và 1 muỗng nước mắm cốt, dùng đũa đảo nhanh tay liên tục trên lửa lớn trong 2 phút.", 2, "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000024000004"), 4, "Thêm tỏi tươi lần hai và bày ra đĩa", "Cho nốt phần tỏi đập dập còn lại vào đảo đều 20 giây để hương tỏi bốc lên nồng nàn rồi tắt bếp, gắp ra đĩa thưởng thức ngay khi còn nóng.", 1, "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000025"),
            "Miến Xào Cua Biển Giá Hẹ Tơi Ngon",
            "mien-xao-cua-bien-gia-he",
            "Sợi miến dong dai bóng không hề bị dính cục hay đứt gãy, thấm đẫm vị ngọt đậm đà từ thịt cua biển gỡ múi, nấm hương, cà rốt, giá đỗ và lá hẹ xanh tươi.",
            25, 15, 4, RecipeDifficulty.Medium,
            Guid.Parse("11111111-1111-4111-8111-000000000005"), "seeder-user-id",
            "https://images.unsplash.com/photo-1552611052-33e04de081de?w=900&auto=format&fit=crop&q=80",
            430m, 28m, 50m, 13m, 4m, 710m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000025000001"), "Miến dong nguyên chất", 300m, "g", "Ngâm nước ấm 10 phút, cắt khúc vừa ăn", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000025000002"), "Thịt cua biển tươi gỡ sẵn", 250m, "g", "Ướp chút tiêu và hành tím băm", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000025000003"), "Nấm hương, mộc nhĩ, cà rốt thái sợi", 150m, "g", "Tạo độ giòn và màu sắc bắt mắt", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000025000004"), "Giá đỗ, lá hẹ, hành tây", 150m, "g", "Cho vào sau cùng giữ độ tươi giòn", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000025000005"), "Dầu hào, nước tương, dầu mè, lòng trắng trứng", 40m, "ml", "Trộn miến giúp sợi tơi bóng", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000025000001"), 1, "Bí quyết xử lý sợi miến tơi không dính", "Ngâm miến dong trong nước ấm 10 phút cho mềm rồi vớt ra để thật ráo. Trộn miến với 1 muỗng dầu mè, 1 muỗng nước tương và nửa lòng trắng trứng gà để sợi miến dai bóng khi xào.", 12, "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000025000002"), 2, "Xào săn thịt cua biển và rau củ", "Phi thơm hành tỏi, cho thịt cua biển vào xào săn 2 phút rồi trút ra bát. Tiếp tục xào nấm hương, mộc nhĩ và cà rốt thái sợi với chút dầu hào.", 6, "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000025000003"), 3, "Áp chảo xào miến dong", "Cho miến vào chảo lớn đảo đều trên lửa vừa, rưới từ từ 4 muỗng nước dùng gà để sợi miến chín mềm trong suốt mà vẫn tơi rời từng sợi.", 5, "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000025000004"), 4, "Trộn thịt cua, giá hẹ và thưởng thức", "Cho phần thịt cua, nấm, cà rốt cùng giá đỗ và lá hẹ cắt khúc vào chảo miến, đảo nhanh trên lửa lớn 2 phút. Rắc tiêu xay và hành phi lên mặt đĩa.", 3, "https://images.unsplash.com/photo-1552611052-33e04de081de?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000026"),
            "Thịt Bò Xào Bông Thiên Lý Giòn Ngọt",
            "thit-bo-xao-bong-thien-ly",
            "Sự kết hợp hoàn hảo giữa thịt thăn bò mềm ngọt ướp dầu hào tỏi và những chùm bông thiên lý xanh non giòn mát, mang lại món xào thanh nhiệt giàu dưỡng chất cho bữa cơm chiều.",
            15, 10, 4, RecipeDifficulty.Easy,
            Guid.Parse("11111111-1111-4111-8111-000000000005"), "chef-hieu-id",
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
            340m, 30m, 14m, 18m, 4m, 640m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000026000001"), "Thịt thăn bò mềm", 350m, "g", "Thái lát mỏng ngang thớ", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000026000002"), "Bông thiên lý tươi", 400m, "g", "Nhặt bỏ cuống già, rửa nhẹ với nước muối loãng", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000026000003"), "Tỏi băm & hành tím", 30m, "g", "Phi thơm dạy vị", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000026000004"), "Dầu hào, hạt nêm, tiêu xay, dầu ăn", 3m, "muỗng canh", "Ướp bò và nêm khi xào", 4),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000026000001"), 1, "Sơ chế bông thiên lý và ướp thịt bò", "Bông thiên lý ngâm nước muối loãng 5 phút rồi xả nhẹ dưới vòi nước để không bị dập. Ướp thịt bò thái mỏng với tỏi băm, 1 muỗng dầu hào, chút tiêu và 1 muỗng dầu ăn trong 15 phút.", 15, "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000026000002"), 2, "Xào tái thịt bò trên lửa lớn", "Đun chảo thật nóng với dầu ăn, phi thơm tỏi rồi trút thịt bò vào đảo nhanh tay 90 giây đến khi thịt vừa chín tái thì trút ngay ra đĩa.", 3, "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000026000003"), 3, "Xào bông thiên lý xanh giòn", "Thêm chút dầu vào chảo, cho bông thiên lý vào xào lửa lớn cùng 1 muỗng dầu hào và 2 muỗng nước lọc trong 2 phút cho bông chín xanh bóng.", 3, "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000026000004"), 4, "Đảo chung với thịt bò và bày đĩa", "Đổ thịt bò tái trở lại chảo bông thiên lý, đảo đều 30 giây rồi tắt bếp ngay để thịt bò mềm ngọt không bị dai. Bày ra đĩa rắc tiêu xay.", 2, "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000027"),
            "Bún Chả Hà Nội Thịt Nướng Than Hoa",
            "bun-cha-ha-noi-thit-nuong",
            "Đệ nhất ẩm thực Hà Thành với chả viên và chả miếng ba chỉ nướng vỉ than hoa xém vàng thơm lừng, ngâm trong bát nước chấm chua ngọt ấm nóng điểm xuyết đu đủ xanh giòn.",
            35, 25, 4, RecipeDifficulty.Medium,
            Guid.Parse("11111111-1111-4111-8111-000000000006"), "chef-hieu-id",
            "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80",
            580m, 35m, 58m, 22m, 4m, 850m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000027000001"), "Thịt ba chỉ heo & nạc vai xay", 700m, "g", "350g ba chỉ thái lát làm chả miếng, 350g nạc vai làm chả viên", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000027000002"), "Bún rối sợi nhỏ Hà Nội", 800m, "g", "Bày ra mẹt hoặc đĩa", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000027000003"), "Đu đủ xanh & cà rốt", 200m, "g", "Tỉa hoa thái mỏng, bóp muối rồi ngâm giấm đường", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000027000004"), "Nước mắm, mật ong, dầu hào, nước hàng", 80m, "ml", "Ướp thịt nướng lên màu cánh gián thơm lừng", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000027000005"), "Rau sống tía tô, kinh giới, xà lách, tỏi ớt", 250m, "g", "Rửa sạch để ráo ăn kèm", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000027000001"), 1, "Ướp chả miếng và nặn chả viên", "Ướp riêng thịt ba chỉ thái lát và thịt nạc vai xay với nước cốt hành tỏi, nước mắm, mật ong, dầu hào, chút nước hàng và tiêu trong 30 phút. Nặn thịt xay thành các viên tròn dẹt đều nhau.", 30, "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000027000002"), 2, "Làm dưa góp đu đủ cà rốt và pha nước chấm", "Đu đủ xanh và cà rốt tỉa hoa bóp muối rửa sạch, ngâm với giấm đường cho giòn. Nấu ấm hỗn hợp nước lọc, nước mắm, đường và giấm theo tỉ lệ 5:1:1:1 cho vị thanh dịu.", 15, "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000027000003"), 3, "Nướng chả trên than hoa hoặc nồi chiên", "Xếp chả viên và chả miếng lên vỉ nướng trên than hoa (hoặc nồi chiên không dầu 195 độ C trong 15 phút), lật đều hai mặt cho đến khi thịt xém vàng dậy mùi thơm.", 15, "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000027000004"), 4, "Trình bày mẹt bún chả Hà Nội", "Múc nước chấm ấm ra bát tô, thả dưa góp đu đủ cà rốt cùng chả viên, chả miếng nóng hổi vào bát, thêm tỏi ớt băm và dùng kèm bún rối, rau sống.", 5, "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000028"),
            "Gà Nướng Mật Ong Lá Chanh Da Giòn",
            "ga-nuong-mat-ong-la-chanh",
            "Gà ta nguyên con hoặc đùi gà được ướp thấm sốt mật ong, nghệ và sả tỏi rồi nướng chín vàng óng ả, lớp da căng bóng giòn thơm hương lá chanh thái chỉ.",
            25, 35, 4, RecipeDifficulty.Medium,
            Guid.Parse("11111111-1111-4111-8111-000000000006"), "chef-hieu-id",
            "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=900&auto=format&fit=crop&q=80",
            510m, 42m, 18m, 28m, 1m, 760m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000028000001"), "Gà ta làm sạch (hoặc 4 đùi gà lớn)", 1200m, "g", "Khứa nhẹ phần đùi để thấm gia vị", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000028000002"), "Mật ong rừng nguyên chất", 4m, "muỗng canh", "Tạo màu vàng óng và vị ngọt dịu", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000028000003"), "Sả, tỏi, hành tím, ngũ vị hương, dầu hào", 60m, "g", "Xay nhuyễn làm sốt ướp", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000028000004"), "Lá chanh non & ớt sừng", 20m, "g", "Thái chỉ mịn rắc lên gà nướng", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000028000005"), "Muối ớt chanh xanh", 50m, "g", "Nước chấm đi kèm", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000028000001"), 1, "Pha sốt ướp mật ong thảo mộc", "Xay nhuyễn sả, hành tím, tỏi cùng 2 muỗng dầu hào, 2 muỗng mật ong, 1 muỗng nước mắm, nửa muỗng ngũ vị hương và 1 muỗng dầu điều.", 10, "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000028000002"), 2, "Massage gia vị ướp gà", "Xát đều hỗn hợp sốt ướp lên toàn bộ mặt trong và ngoài thân gà, ướp tối thiểu 30 phút cho gia vị ngấm sâu vào từng thớ thịt.", 30, "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000028000003"), 3, "Nướng gà và phết mật ong", "Nướng gà ở nhiệt độ 185 độ C trong 25 phút cho gà chín đều từ bên trong. Sau đó phết hỗn hợp mật ong pha chút nước cốt chanh lên da gà, tăng nhiệt 200 độ C nướng thêm 8 phút cho da vàng giòn.", 33, "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000028000004"), 4, "Rắc lá chanh thái chỉ và thưởng thức", "Chặt gà nướng thành miếng vừa ăn bày ra đĩa, rắc lá chanh non thái chỉ lên trên và chấm cùng muối ớt xanh.", 5, "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000029"),
            "Sườn Cây Nướng Ngũ Vị Sốt BBQ Mật Ong",
            "suon-cay-nuong-ngu-vi-bbq",
            "Những dẻ sườn heo bản dài được ướp ngũ vị hương, mật ong và sốt BBQ đậm đà, nướng chậm đến khi thịt mềm mọng róc xương và bề mặt cháy cạnh hấp dẫn.",
            30, 40, 4, RecipeDifficulty.Medium,
            Guid.Parse("11111111-1111-4111-8111-000000000006"), "chef-hieu-id",
            "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop&q=80",
            590m, 39m, 22m, 37m, 2m, 870m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000029000001"), "Sườn cây heo tươi", 900m, "g", "Lột bỏ lớp màng gân mặt sau để sườn mềm", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000029000002"), "Sốt BBQ, tương cà, mật ong, dầu hào", 100m, "g", "Pha hỗn hợp sốt nướng bóng mượt", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000029000003"), "Ngũ vị hương, bột tỏi, bột hành, tiêu", 20m, "g", "Gia vị khô xát lên sườn", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000029000004"), "Bắp ngọt nướng & xà lách", 250m, "g", "Nướng kèm ăn đỡ ngấy", 4),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000029000001"), 1, "Sơ chế và ướp sườn cây", "Rửa sạch sườn cây, lột bỏ lớp màng trắng mặt dưới xương rồi thấm khô. Xát đều bột tỏi, ngũ vị hương và một nửa lượng sốt BBQ mật ong lên sườn, ướp 30 phút.", 30, "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000029000002"), 2, "Bọc giấy bạc nướng mềm sườn", "Bọc kín tảng sườn trong giấy bạc, cho vào lò nướng hoặc nồi chiên không dầu ở 175 độ C trong 25 phút để thịt sườn chín mềm mọng nước từ bên trong.", 25, "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000029000003"), 3, "Phết sốt BBQ nướng xém mặt", "Mở lớp giấy bạc, phết đều phần sốt BBQ mật ong còn lại lên hai mặt sườn, tăng nhiệt 200 độ C nướng thêm 12 phút cho sốt keo lại và xém cạnh thơm phức.", 12, "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000029000004"), 4, "Cắt dẻ sườn và bày đĩa", "Để sườn nghỉ 5 phút rồi cắt rời từng dẻ sườn, bày ra đĩa gỗ cùng bắp ngọt nướng bơ và salad rau tươi.", 5, "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000030"),
            "Nem Nướng Nha Trang Cuốn Bánh Tráng",
            "nem-nuong-nha-trang",
            "Lụi nem thịt heo quết dẻo nướng vàng thơm lừng trên than hồng, cuốn cùng bánh tráng chiên giòn, xoài xanh, dưa leo, rau thơm và chấm sốt tương nếp thịt bằm béo bùi đặc trưng Nha Trang.",
            35, 25, 4, RecipeDifficulty.Hard,
            Guid.Parse("11111111-1111-4111-8111-000000000006"), "chef-hieu-id",
            "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&auto=format&fit=crop&q=80",
            530m, 31m, 49m, 22m, 4m, 810m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000030000001"), "Giò sống & thịt nạc vai xay có mỡ", 600m, "g", "Quết lạnh cùng tỏi băm và nước mắm", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000030000002"), "Sả cây làm que xiên nướng", 12m, "cây", "Rửa sạch để bọc nem quanh thân sả", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000030000003"), "Gạo nếp, tương hột, tôm thịt bằm, đậu phộng", 200m, "g", "Nấu sốt chấm nem nướng đặc trưng", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000030000004"), "Bánh tráng cuốn & ram chiên giòn", 200m, "g", "Tạo độ giòn rụm trong mỗi cuốn nem", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000030000005"), "Xoài xanh, dưa leo, khế, chuối chát, rau sống", 300m, "g", "Thái thanh dài để cuốn", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000030000001"), 1, "Quết giò nem và bọc cây sả", "Trộn giò sống, thịt nạc vai xay, mỡ hạt lựu với tỏi băm, đường, nước mắm và tiêu, để ngăn đá 30 phút rồi quết thật dẻo. Bọc hỗn hợp thịt quanh đầu từng cây sả thành lụi nem.", 30, "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000030000002"), 2, "Nấu nước chấm tương nếp Nha Trang", "Nấu cháo gạo nếp thật nhừ rồi xay mịn cùng tương hột. Phi thơm hành tỏi với dầu điều, xào săn tôm thịt bằm rồi đổ hỗn hợp cháo nếp tương vào đun sánh, rắc đậu phộng giã dập.", 15, "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000030000003"), 3, "Nướng vàng lụi nem sả", "Nướng các cây nem trên bếp than hoặc nồi chiên không dầu ở 185 độ C trong 15 phút, trở đều tay và phết dầu điều cho lụi nem vàng bóng thơm mùi sả.", 15, "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000030000004"), 4, "Trình bày mẹt nem nướng Nha Trang", "Xếp nem nướng, bánh tráng chiên giòn (ram), bún tươi, xoài xanh, dưa leo, rau thơm ra mẹt lớn cùng bát sốt chấm tương nếp nóng hổi.", 5, "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000031"),
            "Tôm Càng Xanh Nướng Phô Mai Bơ Tỏi",
            "tom-cang-xanh-nuong-pho-mai",
            "Tôm càng xanh tươi sống chẻ đôi lưng được phủ lớp sốt bơ tỏi ngò tây và phô mai Mozzarella kéo sợi béo ngậy, nướng chín đỏ au giữ trọn vị ngọt chắc của thịt tôm.",
            20, 15, 4, RecipeDifficulty.Medium,
            Guid.Parse("11111111-1111-4111-8111-000000000006"), "chef-hieu-id",
            "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=900&auto=format&fit=crop&q=80",
            460m, 38m, 8m, 30m, 1m, 780m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000031000001"), "Tôm càng xanh loại lớn", 800m, "g", "Cắt râu, chẻ dọc sống lưng lấy chỉ đen", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000031000002"), "Phô mai Mozzarella bào sợi", 200m, "g", "Phủ lên lưng tôm tạo độ kéo sợi", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000031000003"), "Bơ lạt & tỏi băm nhuyễn", 80m, "g", "Đun chảy làm sốt bơ tỏi", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000031000004"), "Ngò rí hoặc mùi tây (Parsley) băm, tiêu", 20m, "g", "Trộn vào sốt bơ tỏi", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000031000005"), "Chanh tươi & muối tiêu xanh", 30m, "g", "Chấm kèm hải sản", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000031000001"), 1, "Sơ chế và chẻ đôi lưng tôm càng xanh", "Rửa sạch tôm càng xanh, dùng dao sắc chẻ dọc phần lưng tôm từ đầu xuống đuôi nhưng không đứt rời, rút bỏ chỉ đen rồi mở phẳng phần thịt tôm lên trên.", 12, "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000031000002"), 2, "Làm sốt bơ tỏi thảo mộc", "Đun chảy bơ lạt trên lửa nhỏ, cho tỏi băm vào phi thơm vàng dịu, nêm chút muối, tiêu và ngò tây băm nhỏ rồi tắt bếp.", 5, "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000031000003"), 3, "Phủ sốt bơ tỏi và phô mai Mozzarella", "Xếp tôm càng xanh lên khay nướng, rưới đều sốt bơ tỏi thấm vào thịt và gạch tôm, sau đó phủ đầy phô mai Mozzarella bào sợi lên mặt.", 5, "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000031000004"), 4, "Nướng tôm chảy phô mai vàng óng", "Đưa khay tôm vào lò nướng hoặc nồi chiên ở 200 độ C trong 10 phút cho đến khi vỏ tôm đỏ au và lớp phô mai tan chảy xém vàng thơm lừng. Thưởng thức ngay khi còn nóng.", 10, "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000032"),
            "Chả Giò Rế Tôm Thịt Khoai Môn Giòn Rụm",
            "cha-gio-re-tom-thit-khoai-mon",
            "Từng cuốn chả giò (nem rán) vàng ươm với lớp vỏ bánh tráng rế giòn tan lâu ỉu, bao bọc phần nhân tôm tươi, thịt nạc vai, khoai môn bùi béo và mộc nhĩ thơm giòn.",
            30, 20, 4, RecipeDifficulty.Medium,
            Guid.Parse("11111111-1111-4111-8111-000000000007"), "chef-hieu-id",
            "https://images.unsplash.com/photo-1562967914-608f82629710?w=900&auto=format&fit=crop&q=80",
            490m, 24m, 42m, 25m, 3m, 680m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000032000001"), "Bánh tráng rế hoặc bánh đa nem", 25m, "lá", "Giúp cuốn chả giò có lớp vỏ lưới giòn rụm", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000032000002"), "Thịt nạc vai xay & tôm tươi băm", 400m, "g", "Trộn theo tỉ lệ 1:1", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000032000003"), "Khoai môn & cà rốt bào sợi", 200m, "g", "Giúp nhân chả giò bùi ngọt và khô ráo", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000032000004"), "Miến dong, mộc nhĩ, lòng đỏ trứng gà", 80m, "g", "Kết dính phần nhân", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000032000005"), "Rau sống, bún tươi, nước mắm chua ngọt", 200m, "g", "Ăn kèm chả giò", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000032000001"), 1, "Trộn nhân tôm thịt khoai môn", "Trộn đều thịt nạc vai xay, tôm băm, khoai môn bào sợi, cà rốt, mộc nhĩ, miến cắt ngắn cùng 1 lòng đỏ trứng gà, hành tím băm, hạt nêm và tiêu xay.", 15, "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000032000002"), 2, "Cuốn chả giò đều tay", "Trải bánh tráng rế ra thớt, múc 1 muỗng nhân đặt vào góc, gấp hai mép bên rồi cuộn tròn vừa tay (không cuốn quá chặt để tránh vỡ vỏ khi chiên).", 15, "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000032000003"), 3, "Chiên chả giò hai lửa cho giòn lâu", "Chiên chả giò ngập dầu ở lửa vừa 7 phút cho nhân chín tới rồi vớt ra để nguội bớt. Trước khi ăn chiên lại lửa hơi cao 3 phút cho vỏ vàng giòn rụm.", 12, "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000032000004"), 4, "Pha nước mắm chua ngọt và trình bày", "Xếp chả giò vàng ươm ra đĩa có giấy thấm dầu, dùng nóng cùng rau xà lách, rau thơm và nước mắm chua ngọt pha đồ chua.", 5, "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000033"),
            "Cánh Gà Chiên Nước Mắm Tỏi Ớt Đậm Đà",
            "canh-ga-chien-nuoc-mam-toi-ot",
            "Cánh gà chiên lớp vỏ ngoài giòn nhẹ, bên trong thịt vẫn mềm ngọt, được xóc đều trong lớp sốt nước mắm đường tỏi ớt phi vàng thơm phức, mặn ngọt quyến rũ.",
            15, 20, 4, RecipeDifficulty.Easy,
            Guid.Parse("11111111-1111-4111-8111-000000000007"), "chef-hieu-id",
            "https://images.unsplash.com/photo-1562967914-608f82629710?w=900&auto=format&fit=crop&q=80",
            520m, 33m, 20m, 34m, 1m, 840m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000033000001"), "Cánh gà tươi khúc giữa", 600m, "g", "Rửa muối gừng, khứa nhẹ để nhanh chín", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000033000002"), "Bột chiên giòn hoặc bột bắp", 3m, "muỗng canh", "Áo lớp mỏng giúp da gà giòn", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000033000003"), "Nước mắm nhĩ, đường, tương ớt", 4m, "muỗng canh", "Khuấy tan làm sốt nước mắm", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000033000004"), "Tỏi băm, ớt sừng băm, hành lá", 40m, "g", "Phi vàng thơm xóc cùng cánh gà", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000033000005"), "Xà lách, dưa leo, cà chua", 150m, "g", "Lót đĩa trang trí", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000033000001"), 1, "Sơ chế và áo bột mỏng cánh gà", "Rửa sạch cánh gà với nước muối gừng, dùng khăn giấy thấm thật khô rồi xóc đều với 2 muỗng bột bắp mỏng để khi chiên da gà giòn mà không bắn dầu.", 10, "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000033000002"), 2, "Chiên vàng giòn cánh gà", "Đun nóng dầu ăn trên lửa vừa, thả cánh gà vào chiên khoảng 12 phút đến khi chín vàng đều hai mặt thì vớt ra để ráo dầu.", 12, "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000033000003"), 3, "Phi tỏi ớt và nấu sốt nước mắm kẹo", "Phi vàng thơm tỏi băm và ớt băm với 1 muỗng dầu, vớt một nửa tỏi phi ra riêng. Đổ hỗn hợp 2 muỗng nước mắm, 2 muỗng đường và 1 muỗng tương ớt vào đun sôi sệt.", 4, "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000033000004"), 4, "Xóc cánh gà áo đều sốt", "Trút cánh gà chiên vào chảo sốt nước mắm, đảo nhanh trên lửa vừa 1 phút cho sốt bám bóng đều từng chiếc cánh gà, rắc tỏi phi vàng lên trên rồi bày ra đĩa.", 3, "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000034"),
            "Bánh Xèo Miền Tây Vỏ Giòn Nhân Tôm Thịt",
            "banh-xeo-mien-tay-tom-thit",
            "Chiếc bánh xèo vàng nghệ vành mỏng giòn rụm thơm béo nước cốt dừa, bên trong đầy đặn nhân tôm đất, thịt ba chỉ, đậu xanh, củ hủ dừa và giá đỗ, cuốn cùng rau rừng tươi mát.",
            25, 25, 4, RecipeDifficulty.Medium,
            Guid.Parse("11111111-1111-4111-8111-000000000007"), "chef-hieu-id",
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&auto=format&fit=crop&q=80",
            540m, 26m, 56m, 23m, 5m, 750m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000034000001"), "Bột bánh xèo & bột nghệ", 400m, "g", "Pha cùng nước cốt dừa và chút bia cho vỏ giòn lâu", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000034000002"), "Nước cốt dừa tươi", 200m, "ml", "Tạo độ béo thơm cho vỏ bánh", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000034000003"), "Tôm đất tươi & thịt ba chỉ thái mỏng", 400m, "g", "Xào săn sơ trước khi đổ bánh", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000034000004"), "Đậu xanh hấp chín, giá đỗ, hành lá", 250m, "g", "Nhân bánh xèo truyền thống", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000034000005"), "Cải bẹ xanh, xà lách, lá cách, rau thơm", 300m, "g", "Cuốn bánh xèo chấm nước mắm", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000034000001"), 1, "Pha bột bánh xèo giòn lâu", "Hòa bột bánh xèo với nước cốt dừa, nước lọc, bột nghệ, hành lá cắt nhỏ và 50ml bia (bí quyết giúp vành bánh xèo giòn rụm), để bột nghỉ 20 phút.", 20, "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000034000002"), 2, "Xào sơ nhân tôm thịt", "Phi thơm hành tím, cho thịt ba chỉ thái mỏng và tôm đất vào xào săn với chút hạt nêm và tiêu rồi múc ra bát.", 8, "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000034000003"), 3, "Tráng bánh xèo vành mỏng giòn", "Đun thật nóng chảo rộng với chút mỡ heo, xếp vài miếng tôm thịt vào rồi múc 1 vá bột láng xoay tròn thật mỏng khắp lòng chảo. Rải đậu xanh, giá đỗ vào giữa, đậy nắp 2 phút rồi mở nắp chiên lửa vừa cho vành bánh tróc giòn.", 15, "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000034000004"), 4, "Gấp đôi bánh và cuốn rau rừng", "Gấp đôi chiếc bánh xèo vàng giòn bày ra đĩa, cuốn trong lá cải bẹ xanh cùng rau thơm và chấm nước mắm chua ngọt pha đồ chua.", 5, "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000035"),
            "Chả Cá Lã Vọng Thì Là Mắm Tôm Hà Nội",
            "cha-ca-la-vong-thi-la",
            "Đặc sản trứ danh đất Kinh Kỳ với những miếng cá lăng ướp riềng mẻ nghệ vàng ươm, nướng thơm rồi đảo trên chảo nóng cùng thật nhiều thì là, hành hoa, ăn kèm bún rối và lạc rang.",
            30, 20, 4, RecipeDifficulty.Medium,
            Guid.Parse("11111111-1111-4111-8111-000000000007"), "chef-hieu-id",
            "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=80",
            480m, 36m, 38m, 20m, 3m, 770m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000035000001"), "Phi lê cá lăng tươi", 600m, "g", "Cắt miếng vuông dày vừa ăn, thịt chắc không xương dăm", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000035000002"), "Riềng giã, mẻ ngấu, nước cốt nghệ, mắm tôm", 80m, "g", "Lọc lấy nước ướp cá chuẩn vị cổ truyền", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000035000003"), "Rau thì là & hành hoa (hành lá)", 250m, "g", "Cắt khúc dài 5cm, chẻ trắng đầu hành", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000035000004"), "Bún rối tươi & đậu phộng rang", 500m, "g", "Ăn kèm chả cá nóng", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000035000005"), "Mắm tôm ngon, chanh, rượu trắng, ớt", 50m, "g", "Đánh sủi bọt làm nước chấm", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000035000001"), 1, "Ướp cá lăng với riềng, mẻ, nghệ", "Cắt phi lê cá lăng thành miếng vuông 3cm. Ướp cá với nước cốt riềng, mẻ lọc mịn, nước nghệ tươi, 1 muỗng mắm tôm và chút đường trong 30 phút.", 30, "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000035000002"), 2, "Nướng sơ cá cho săn vàng", "Xếp cá lên vỉ nướng ở 190 độ C trong 10 phút cho miếng cá săn chắc và xém vàng thơm lừng mùi riềng mẻ.", 10, "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000035000003"), 3, "Đảo cá trên chảo nóng cùng thì là hành hoa", "Đặt chảo gang lên bếp với 3 muỗng mỡ/dầu nóng, cho cá đã nướng vào đảo vàng rồi phủ đầy hành hoa, đầu hành trắng và rau thì là lên trên cho rau vừa chín tái dậy hương.", 6, "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000035000004"), 4, "Đánh mắm tôm sủi bọt và thưởng thức", "Pha mắm tôm với nước cốt chanh, đường, chút rượu trắng và mỡ nóng đánh sủi bọt. Cho bún vào bát, gắp cá lăng, thì là, rắc lạc rang và rưới mắm tôm thưởng thức ngay.", 4, "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000036"),
            "Gỏi Cuốn Tôm Thịt Bún Tươi Chấm Tương Đen",
            "goi-cuon-tom-thit-cham-tuong",
            "Những cuốn gỏi trong trẻo thấy rõ con tôm sú đỏ au bên cạnh lát thịt ba chỉ luộc mềm, bún tươi, hẹ xanh và rau thơm, chấm cùng chén tương đen xay bơ đậu phộng béo bùi.",
            25, 15, 4, RecipeDifficulty.Easy,
            Guid.Parse("11111111-1111-4111-8111-000000000008"), "chef-hieu-id",
            "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
            350m, 25m, 42m, 9m, 4m, 580m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000036000001"), "Tôm sú tươi & thịt ba chỉ heo", 500m, "g", "Luộc chín, tôm chẻ đôi, thịt thái lát mỏng", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000036000002"), "Bánh tráng dẻo cuốn gỏi & bún tươi", 400m, "g", "Thấm nhẹ nước ấm trước khi cuốn", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000036000003"), "Xà lách, húng lủi, tía tô, lá hẹ, dưa leo", 250m, "g", "Rửa sạch để thật ráo nước", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000036000004"), "Tương đen (Hoisin), bơ đậu phộng, tỏi phi", 100m, "g", "Nấu sốt tương chấm gỏi cuốn", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000036000005"), "Đậu phộng rang giã dập & đồ chua", 50m, "g", "Rắc lên mặt chén sốt tương", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000036000001"), 1, "Luộc tôm sú và thịt ba chỉ", "Luộc thịt ba chỉ với hành tím và chút muối trong 20 phút cho chín mềm, ngâm nước đá rồi thái lát mỏng. Tôm sú hấp cùng chút sả cho đỏ đẹp, bóc vỏ và chẻ đôi dọc sống lưng.", 20, "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000036000002"), 2, "Cuốn gỏi cuốn chắc tay", "Thấm ướt nhẹ bánh tráng, xếp xà lách, rau thơm, dưa leo và bún tươi vào góc dưới, cuộn 1 vòng rồi xếp thịt ba chỉ, cọng hẹ và mặt đỏ của tôm úp xuống, gấp hai đầu cuốn chặt tay.", 12, "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000036000003"), 3, "Nấu sốt tương đen bơ đậu phộng", "Phi thơm tỏi băm, cho 3 muỗng tương đen, 1 muỗng bơ đậu phộng và 100ml nước luộc thịt vào khuấy đều trên lửa nhỏ đến khi sốt sánh mịn.", 5, "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000036000004"), 4, "Bày đĩa và thưởng thức", "Cắt đôi hoặc để nguyên các cuốn gỏi xếp ra đĩa, múc tương đen ra chén, rắc đậu phộng rang, đồ chua và ớt xay lên trên.", 3, "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000037"),
            "Gỏi Ngó Sen Tôm Thịt Tai Heo Giòn Sần Sật",
            "goi-ngo-sen-tom-thit",
            "Món khai vị tiệc cưới quốc dân với cọng ngó sen trắng ngần giòn sần sật, trộn thấm nước mắm cốt chanh chua ngọt cùng tôm sú, tai heo thái mỏng, cà rốt, rau răm và phồng tôm.",
            25, 15, 4, RecipeDifficulty.Easy,
            Guid.Parse("11111111-1111-4111-8111-000000000008"), "chef-hieu-id",
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80",
            330m, 26m, 28m, 12m, 5m, 670m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000037000001"), "Ngó sen tươi non", 400m, "g", "Cắt khúc, chẻ đôi ngâm nước đá chanh cho trắng giòn", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000037000002"), "Tôm sú tươi & tai heo (hoặc thịt ba chỉ)", 350m, "g", "Luộc chín, ngâm đá rồi thái mỏng", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000037000003"), "Cà rốt, hành tây, cần tàu, rau răm", 200m, "g", "Thái sợi mỏng", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000037000004"), "Nước mắm cốt, nước cốt chanh, đường, tỏi ớt", 80m, "ml", "Pha sốt trộn gỏi chua cay mặn ngọt", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000037000005"), "Đậu phộng rang, hành phi, bánh phồng tôm", 120m, "g", "Ăn kèm gỏi ngó sen", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000037000001"), 1, "Sơ chế ngó sen trắng giòn", "Ngó sen rửa sạch bùn, cắt khúc 5cm, chẻ làm đôi hoặc làm tư rồi ngâm ngay vào thau nước đá có pha nước cốt chanh và 1 muỗng đường trong 15 phút để ngó sen trắng muốt và giòn.", 15, "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000037000002"), 2, "Luộc tôm và tai heo", "Tai heo luộc chín cùng gừng và sả, vớt ra ngâm nước đá lạnh cho giòn rồi thái lát thật mỏng. Tôm sú luộc chín, bóc vỏ, chẻ đôi.", 15, "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000037000003"), 3, "Pha nước sốt trộn gỏi chuẩn vị", "Khuấy tan 3 muỗng đường với 3 muỗng nước mắm cốt và 3 muỗng nước cốt chanh, thêm tỏi băm và ớt sừng băm tạo hỗn hợp sốt sánh kẹo.", 5, "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000037000004"), 4, "Trộn gỏi ngó sen và bày cùng phồng tôm", "Vắt ráo ngó sen, cà rốt, hành tây rồi trộn đều với tôm, tai heo và nước sốt gỏi. Thêm rau răm, hành phi, đậu phộng rang lên trên và dùng kèm bánh phồng tôm chiên giòn.", 5, "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000038"),
            "Nộm Bò Khô Đu Đủ Xanh Rau Kinh Giới",
            "nom-bo-kho-du-du-xanh",
            "Món ăn vặt trứ danh phố cổ với sợi đu đủ xanh và cà rốt bào giòn sần sật, thịt bò khô xé sợi cay ngọt, lạc rang bùi béo và nước nộm chua thanh thơm nức rau kinh giới.",
            20, 5, 4, RecipeDifficulty.Easy,
            Guid.Parse("11111111-1111-4111-8111-000000000008"), "chef-hieu-id",
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
            290m, 18m, 32m, 10m, 5m, 640m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000038000001"), "Đu đủ xanh & cà rốt", 500m, "g", "Gọt vỏ, bào sợi dài giòn", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000038000002"), "Thịt bò khô sợi hoặc miếng", 150m, "g", "Xé sợi vừa ăn", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000038000003"), "Đậu phộng (lạc) rang chín", 80m, "g", "Xát vỏ, để nguyên hạt hoặc đập dập nhẹ", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000038000004"), "Rau kinh giới, húng bạc hà, ngò gai", 60m, "g", "Thái rối tạo hương thơm đặc trưng", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000038000005"), "Giấm gạo, đường, nước mắm, tỏi ớt", 80m, "ml", "Pha nước nộm chua ngọt thanh mát", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000038000001"), 1, "Bào sợi đu đủ xanh và ngâm đá", "Đu đủ xanh gọt vỏ, bỏ hạt, bào sợi dài cùng cà rốt. Ngâm vào thau nước đá lạnh có vài hạt muối trong 15 phút rồi vớt ra vắt thật khô ráo để sợi đu đủ giòn tan.", 15, "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000038000002"), 2, "Pha nước trộn nộm phố cổ", "Hòa tan 3 muỗng đường, 2 muỗng nước mắm, 3 muỗng giấm gạo, 4 muỗng nước đun sôi để nguội cùng tỏi băm và ớt tươi thái lát.", 5, "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000038000003"), 3, "Trộn đu đủ với rau thơm", "Cho đu đủ, cà rốt vào âu lớn, rưới một nửa nước nộm vào đảo đều 3 phút, sau đó cho rau kinh giới và rau húng thái rối vào trộn nhẹ.", 3, "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000038000004"), 4, "Bày bò khô và lạc rang thưởng thức", "Gắp nộm đu đủ ra đĩa, xếp đầy thịt bò khô xé sợi và lạc rang lên trên, chan thêm nước nộm chua ngọt tùy khẩu vị.", 2, "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000039"),
            "Phở Cuốn Thịt Bò Xào Ngũ Sắc Hà Thành",
            "pho-cuon-thit-bo-ha-thanh",
            "Đặc sản hồ Trúc Bạch với lá bánh phở vuông trắng mềm ôm trọn phần thịt bò xào tỏi nóng hổi, trứng chiên, cà rốt, dưa leo và các loại rau thơm chấm nước mắm đu đủ xanh.",
            20, 10, 4, RecipeDifficulty.Easy,
            Guid.Parse("11111111-1111-4111-8111-000000000008"), "chef-hieu-id",
            "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
            380m, 27m, 44m, 11m, 3m, 630m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000039000001"), "Bánh phở cuốn bản vuông", 500m, "g", "Gỡ từng lá bánh phở mềm dẻo", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000039000002"), "Thịt thăn bò thái mỏng", 350m, "g", "Ướp tỏi băm, dầu hào và tiêu", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000039000003"), "Trứng gà, dưa leo, cà rốt", 200m, "g", "Trứng tráng mỏng thái sợi, dưa leo cà rốt thái thanh", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000039000004"), "Xà lách, ngò rí, húng lủi, kinh giới", 150m, "g", "Rửa sạch vẩy ráo", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000039000005"), "Nước mắm, giấm, đường, tỏi ớt", 80m, "ml", "Pha nước chấm phở cuốn", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000039000001"), 1, "Ướp và xào thịt bò lửa lớn", "Ướp thịt bò với tỏi băm, dầu hào, hạt nêm và chút dầu ăn 10 phút. Đun chảo thật nóng, phi thơm tỏi rồi xào thịt bò trên lửa lớn trong 2 phút cho thịt chín mềm không ra nước.", 12, "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000039000002"), 2, "Chuẩn bị rau củ và trứng thái sợi", "Tráng mỏng 2 quả trứng gà rồi thái sợi dài. Dưa leo và cà rốt thái thanh dài bằng chiều rộng lá phở.", 8, "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000039000003"), 3, "Cuốn bánh phở mềm dẻo", "Trải lá bánh phở lên đĩa phẳng, đặt lá xà lách, rau thơm, dưa leo, cà rốt, trứng sợi và thịt bò xào vào giữa rồi cuộn tròn vừa tay.", 8, "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000039000004"), 4, "Pha nước chấm chua ngọt và thưởng thức", "Pha nước mắm, đường, nước cốt chanh, nước ấm và tỏi ớt băm, xếp phở cuốn ra đĩa và thưởng thức ngay.", 2, "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000040"),
            "Lẩu Thái Hải Sản Chua Cay Nước Cốt Dừa",
            "lau-thai-hai-san-chua-cay",
            "Nồi lẩu Thái Tomyum chua cay nồng nàn hương sả, riềng, lá chanh Kaffir và vị béo nhẹ của nước cốt dừa, nhúng kèm tôm sú, mực tươi, nghêu, thịt bò Mỹ và nấm kim châm.",
            25, 30, 6, RecipeDifficulty.Medium,
            Guid.Parse("11111111-1111-4111-8111-000000000009"), "chef-hieu-id",
            "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&auto=format&fit=crop&q=80",
            510m, 40m, 45m, 18m, 5m, 890m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000040000001"), "Tôm sú, mực ống, nghêu sạch", 800m, "g", "Sơ chế sạch, bày ra đĩa đá", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000040000002"), "Thịt ba chỉ bò Mỹ thái cuộn", 400m, "g", "Nhúng tái trong nước lẩu sôi", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000040000003"), "Sả cây, củ riềng, lá chanh, ớt hiểm", 120m, "g", "Đập dập tạo hương thơm Tomyum đặc trưng", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000040000004"), "Sốt Tomyum Thái & nước cốt dừa", 150m, "ml", "Tạo vị chua cay béo hài hòa", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000040000005"), "Nấm kim châm, nấm đùi gà, rau muống, bắp thảo, bún", 600m, "g", "Nhúng lẩu ăn kèm", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000040000001"), 1, "Sơ chế hải sản và rau nấm", "Tôm cắt râu, mực cắt khoanh tròn, nghêu ngâm nhả sạch cát. Các loại nấm cắt gốc rửa sạch, rau muống và cải thảo cắt khúc vừa ăn.", 15, "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000040000002"), 2, "Phi thơm sả riềng lá chanh", "Phi thơm sả đập dập, riềng thái lát, hành tím và cà chua bổ múi cau với 2 muỗng dầu điều, thêm 3 muỗng sốt Tomyum xào dậy mùi.", 8, "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000040000003"), 3, "Nấu nước dùng lẩu Thái chua cay", "Chế 2 lít nước hầm xương vào nồi đun sôi, thả lá chanh vò nhẹ, ớt hiểm, nước cốt me/chanh, đường phèn và 100ml nước cốt dừa vào để nước lẩu có độ béo dịu.", 15, "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000040000004"), 4, "Bày bàn lẩu và nhúng hải sản", "Đặt nồi lẩu lên bếp từ tại bàn, lần lượt nhúng tôm, mực, nghêu, bò Mỹ và nấm rau, ăn kèm bún tươi và muối ớt hải sản.", 5, "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000041"),
            "Lẩu Gà Lá É Phú Yên Cay The Thanh Ngọt",
            "lau-ga-la-e-phu-yen",
            "Đặc sản trứ danh Phú Yên - Đà Lạt với thịt gà ta chặt miếng nấu cùng măng củ tươi giòn ngọt, ớt xiêm xanh cay the và lá é thơm mát hương sả chanh độc đáo.",
            25, 35, 4, RecipeDifficulty.Medium,
            Guid.Parse("11111111-1111-4111-8111-000000000009"), "chef-khai-id",
            "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
            470m, 39m, 36m, 18m, 4m, 780m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000041000001"), "Gà ta thả vườn làm sạch", 1200m, "g", "Chặt miếng vừa ăn", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000041000002"), "Lá é trắng tươi", 300m, "g", "Nhặt lấy ngọn và lá non, giã 1 ít ướp gà", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000041000003"), "Măng củ tươi hoặc măng búp", 300m, "g", "Thái khối, luộc sơ khử độc", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000041000004"), "Nấm bào ngư trắng & سả cây", 250m, "g", "Rửa sạch để ráo", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000041000005"), "Ớt xiêm xanh Phú Yên & bún tươi", 500m, "g", "Giã dập ớt xiêm tạo vị cay the thanh", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000041000001"), 1, "Ướp thịt gà với lá é và ớt xiêm xanh", "Giã dập một nắm nhỏ gốc lá é với tỏi, hành tím và 5 quả ớt xiêm xanh, đem ướp với thịt gà cùng nước mắm, hạt nêm trong 20 phút.", 20, "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000041000002"), 2, "Xào săn gà và măng tươi", "Phi thơm sả cây đập dập, cho thịt gà vào xào săn, tiếp tục cho măng tươi đã luộc sơ vào đảo 5 phút cho thấm gia vị.", 10, "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000041000003"), 3, "Nấu nước lẩu ngọt thanh", "Chế 1.8 lít nước dừa tươi pha nước lọc vào nồi đun sôi 20 phút cho gà chín mềm, thả nấm bào ngư vào và nêm lại cho vừa miệng.", 20, "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000041000004"), 4, "Nhúng lá é tươi và chấm muối ớt xiêm", "Khi ăn mới nhúng lá é tươi vào nồi lẩu đang sôi khoảng 15 giây cho lá chín tái thơm lừng. Dùng kèm bún tươi và muối ớt xiêm xanh vắt chanh.", 5, "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000042"),
            "Cá Diêu Hồng Hấp Hồng Kông Xì Dầu Gừng Sợi",
            "ca-dieu-hong-hap-hong-kong",
            "Cá diêu hồng tươi nguyên con được hấp cách thủy giữ trọn thớ thịt trắng ngần ngọt lịm, phủ đầy gừng tươi, hành lá, ớt thái chỉ và rưới sốt xì dầu Hồng Kông nóng hổi.",
            20, 20, 4, RecipeDifficulty.Easy,
            Guid.Parse("11111111-1111-4111-8111-000000000009"), "chef-khai-id",
            "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=900&auto=format&fit=crop&q=80",
            360m, 38m, 12m, 16m, 2m, 750m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000042000001"), "Cá diêu hồng tươi sống", 900m, "g", "Đánh vảy, làm sạch màng đen trong bụng, khứa chéo thân", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000042000002"), "Nước tương (xì dầu), dầu hào, dầu mè, rượu nấu ăn", 80m, "ml", "Nấu sốt hấp kiểu Hồng Kông", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000042000003"), "Gừng tươi, hành lá, ngò rí, ớt sừng", 150m, "g", "Thái sợi mảnh ngâm nước đá cho cong đẹp", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000042000004"), "Nấm đông cô tươi", 100m, "g", "Thái lát xếp dọc thân cá", 4),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000042000001"), 1, "Sơ chế khử tanh cá diêu hồng", "Rửa sạch cá với muối và gừng, cạo sạch lớp màng đen trong bụng. Khứa 3 đường chéo mỗi bên thân cá, nhét vài lát gừng và gốc hành vào bụng cá.", 10, "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000042000002"), 2, "Hấp cá cách thủy chín tới", "Đặt cá lên đĩa sâu lòng cùng nấm đông cô, cho vào xửng nước đang sôi mạnh hấp lửa lớn trong 15 phút để thịt cá chín mềm mọng mà không bị bở.", 15, "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000042000003"), 3, "Nấu sốt xì dầu Hồng Kông", "Đun sôi nhẹ hỗn hợp 4 muỗng nước tương, 2 muỗng dầu hào, 1 muỗng đường, 1 muỗng dầu mè và 60ml nước dùng gà cho tan đều.", 5, "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000042000004"), 4, "Dội dầu nóng lên hành gừng thái chỉ", "Chắt bỏ bớt nước tanh tiết ra trên đĩa cá, phủ gừng sợi, hành lá và ớt thái chỉ lên thân cá. Đun thật sôi 2 muỗng dầu ăn dội trực tiếp lên hành gừng cho xèo thơm rồi rưới sốt xì dầu nóng xung quanh.", 3, "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000043"),
            "Nghêu Hấp Sả Ớt Lá Chanh Thơm Nồng",
            "ngheu-hap-sa-ot-la-chanh",
            "Thố nghêu hấp nóng hổi mở miệng đều tăm tắp, phần nước hấp chua cay ngọt lịm vị nghêu tự nhiên hòa quyện hương sả tươi, gừng, ớt hiểm và lá chanh xanh ngát.",
            20, 10, 4, RecipeDifficulty.Easy,
            Guid.Parse("11111111-1111-4111-8111-000000000009"), "chef-khai-id",
            "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=900&auto=format&fit=crop&q=80",
            240m, 26m, 14m, 6m, 2m, 680m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000043000001"), "Nghêu (ngao) tươi sống", 1000m, "g", "Ngâm nước muối ớt nhả sạch cát", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000043000002"), "Sả cây tươi & gừng", 100m, "g", "Đập dập cắt khúc lót đáy nồi", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000043000003"), "Lá chanh tươi & ớt hiểm đỏ", 30m, "g", "Xé nhỏ lá chanh cho dậy tinh dầu", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000043000004"), "Nước dừa tươi hoặc nước cốt me, đường, mắm", 200m, "ml", "Tạo nước hấp chua cay ngọt thanh", 4),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000043000001"), 1, "Ngâm nghêu nhả sạch cát", "Ngâm nghêu trong thau nước muối pha 2 quả ớt cắt lát khoảng 1 tiếng để nghêu nhả hết cát bẩn, sau đó chà rửa sạch vỏ và để ráo.", 15, "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000043000002"), 2, "Đun sôi nước dừa cùng sả gừng", "Lót sả cây đập dập và gừng thái lát dưới đáy nồi, đổ 200ml nước dừa tươi cùng 1 muỗng đường, 1 muỗng nước mắm và ớt đập dập vào đun sôi.", 5, "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000043000003"), 3, "Hấp nghêu vừa mở miệng", "Trút nghêu và lá chanh vò nhẹ vào nồi, đậy kín nắp đun lửa lớn khoảng 4 phút. Ngay khi nghêu vừa mở miệng đều thì tắt bếp ngay để thịt nghêu căng mọng không bị teo.", 4, "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000043000004"), 4, "Múc ra thố và chấm muối tiêu chanh", "Múc nghêu cùng nước hấp sả ớt nóng hổi ra thố đất, rắc thêm rau răm hoặc lá chanh thái sợi, thưởng thức nóng.", 2, "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000044"),
            "Đậu Hũ Kho Nấm Rơm Nước Tương Tiêu Đen",
            "dau-hu-kho-nam-rom-chay",
            "Món kho chay thanh đạm nhưng cực kỳ đậm đà với những miếng đậu hũ chiên vàng thấm nước sốt tương tỏi hành boa-rô sánh kẹo cùng nấm rơm búp tròn ngọt giòn tự nhiên.",
            15, 20, 4, RecipeDifficulty.Easy,
            Guid.Parse("11111111-1111-4111-8111-000000000010"), "chef-khai-id",
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80",
            280m, 18m, 22m, 14m, 4m, 610m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000044000001"), "Đậu hũ trắng non hoặc đậu hũ chiên", 4m, "bìa", "Cắt khối vuông vừa ăn", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000044000002"), "Nấm rơm búp tươi", 300m, "g", "Gọt gốc, ngâm nước muối loãng rửa sạch", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000044000003"), "Hành boa-rô (tỏi tây) & ớt trái", 40m, "g", "Thái lát phi thơm chuẩn chay", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000044000004"), "Nước tương đậm đặc, dầu hào chay, đường", 5m, "muỗng canh", "Pha sốt kho chay sánh đậm", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000044000005"), "Tiêu đen xay & dầu mè", 10m, "g", "Tạo hương thơm ấm áp", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000044000001"), 1, "Chiên vàng đều các mặt đậu hũ", "Cắt đậu hũ thành khối vuông 2.5cm, chiên vàng nhẹ các mặt để khi kho miếng đậu dai ngon và dễ ngấm nước sốt, vớt ra giấy thấm dầu.", 8, "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000044000002"), 2, "Sơ chế nấm rơm và phi thơm boa-rô", "Nấm rơm gọt sạch gốc, rửa qua nước muối loãng, quả lớn khứa nhẹ hình chữ thập trên đỉnh. Phi thơm phần gốc trắng hành boa-rô với 1 muỗng dầu ăn.", 5, "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000044000003"), 3, "Kho đậu hũ và nấm rơm trong nồi đất", "Cho nấm rơm vào đảo săn 2 phút, tiếp tục cho đậu hũ chiên cùng hỗn hợp nước tương, dầu hào chay, đường và 100ml nước dừa tươi vào kho lửa nhỏ 12 phút.", 14, "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000044000004"), 4, "Rắc tiêu đen và boa-rô xanh", "Khi nước kho sánh lại áo bóng quanh nấm và đậu hũ, rắc phần lá xanh boa-rô, ớt lát và nhiều tiêu đen xay lên mặt, dùng nóng với cơm trắng.", 2, "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000045"),
            "Canh Nấm Hạt Sen Táo Đỏ Bổ Dưỡng Thanh Mát",
            "canh-nam-hat-sen-tao-do-chay",
            "Tô canh chay dưỡng sinh trong vắt, kết hợp vị ngọt thanh từ bắp Mỹ, củ cải, hạt sen tươi bùi bở, táo đỏ, kỷ tử cùng các loại nấm đùi gà, nấm hương tươi giòn ngọt.",
            20, 30, 4, RecipeDifficulty.Easy,
            Guid.Parse("11111111-1111-4111-8111-000000000010"), "chef-khai-id",
            "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&auto=format&fit=crop&q=80",
            220m, 10m, 36m, 4m, 6m, 480m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000045000001"), "Hạt sen tươi Huế", 150m, "g", "Thông tâm sen để không bị đắng", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000045000002"), "Nấm hương tươi, nấm đùi gà, nấm kim châm", 250m, "g", "Rửa sạch cắt vừa ăn", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000045000003"), "Bắp ngọt, cà rốt, củ sen", 300m, "g", "Cắt khoanh ninh lấy nước ngọt", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000045000004"), "Táo đỏ, kỷ tử, đậu hũ non", 150m, "g", "Tăng hương vị thanh bổ", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000045000005"), "Ngò rí, hạt nêm nấm hương, muối hồng", 20m, "g", "Nêm thanh đạm", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000045000001"), 1, "Ninh nước dùng rau củ và hạt sen", "Cho bắp ngọt cắt khúc, củ sen và hạt sen tươi vào nồi cùng 1.4 lít nước, ninh lửa vừa 20 phút cho hạt sen mềm bùi và nước dùng ngọt thanh.", 20, "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000045000002"), 2, "Thêm cà rốt, táo đỏ và nấm tươi", "Cho cà rốt tỉa hoa, táo đỏ, nấm hương và nấm đùi gà vào nấu tiếp 8 phút trên lửa vừa.", 8, "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000045000003"), 3, "Cho đậu hũ non và kỷ tử", "Nhẹ nhàng thả đậu hũ non cắt khối vuông, nấm kim châm và kỷ tử vào đun sôi nhẹ 2 phút, nêm hạt nêm nấm và chút muối hồng.", 3, "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000045000004"), 4, "Múc ra tô và rắc ngò rí", "Múc canh hạt sen nấm ra tô lớn, rắc ngò rí và chút tiêu xay lên trên, thưởng thức khi còn nóng ấm.", 2, "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000046"),
            "Bún Huế Chay Nấm Đùi Gà Đậu Hũ Ky",
            "bun-hue-chay-nam-dui-ga",
            "Tô bún Huế chay thơm nức mùi sả và sa tế màu điều, nước dùng ngọt tự nhiên từ mía lau, củ đậu, táo, bắp ngọt cùng topping nấm đùi gà, chả chay, đậu hũ và tàu hũ ky chiên giòn.",
            30, 45, 4, RecipeDifficulty.Medium,
            Guid.Parse("11111111-1111-4111-8111-000000000010"), "chef-khai-id",
            "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=900&auto=format&fit=crop&q=80",
            420m, 17m, 58m, 13m, 6m, 690m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000046000001"), "Bún sợi to", 800m, "g", "Trụng sơ nước sôi", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000046000002"), "Củ sắn (củ đậu), bắp ngọt, cà rốt, mía lau, thơm", 600m, "g", "Hầm lấy nước dùng chay ngọt tự nhiên", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000046000003"), "Nấm đùi gà, nấm rơm, đậu hũ chiên, chả lụa chay", 400m, "g", "Cắt miếng vừa ăn", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000046000004"), "Tàu hũ ky (váng đậu) chiên giòn", 100m, "g", "Ăn kèm trên mặt tô bún", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000046000005"), "Sả cây, sa tế chay, dầu màu điều, tương Bần/chao", 60m, "g", "Tạo hương vị Huế chay đặc trưng", 5),
                new(Guid.Parse("33333333-3333-4333-8333-000046000006"), "Bắp chuối bào, giá, rau răm, chanh", 200m, "g", "Rau sống ăn kèm", 6),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000046000001"), 1, "Ninh nước dùng rau củ mía lau", "Cho mía lau chẻ đôi, củ sắn, cà rốt, bắp ngọt, nửa quả thơm và 3 cây sả đập dập vào 2 lít nước hầm trong 35 phút rồi vớt bỏ xác rau củ để lấy nước dùng trong ngọt.", 35, "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000046000002"), 2, "Xào nấm với sả và dầu màu điều", "Phi thơm sả băm và hành boa-rô với dầu màu điều, cho nấm đùi gà và nấm rơm vào xào săn cùng 1 muỗng nước tương và 1 muỗng sa tế chay.", 8, "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000046000003"), 3, "Hoàn thiện nồi nước lèo bún Huế chay", "Trút phần nấm xào và đậu hũ chiên vào nồi nước dùng rau củ, nêm hạt nêm nấm, muối, đường phèn và 1 muỗng nước tương cho đậm vị, đun sôi nhẹ 5 phút.", 7, "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000046000004"), 4, "Trình bày tô bún Huế chay", "Cho bún vào tô, xếp chả chay, nấm đùi gà, đậu hũ, tàu hũ ky chiên giòn và rau răm lên mặt. Chan nước dùng nóng hổi, ăn kèm rau chuối bào và chanh tươi.", 5, "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000047"),
            "Gỏi Cuốn Chay Ngũ Sắc Sốt Bơ Đậu Phộng",
            "goi-cuon-chay-sot-bo-dau-phong",
            "Những cuốn gỏi chay tươi mát đầy màu sắc từ bắp cải tím, cà rốt, dưa leo, bơ sáp, đậu hũ chiên sả và bún tươi, chấm cùng sốt bơ đậu phộng tương đen béo ngậy.",
            25, 10, 4, RecipeDifficulty.Easy,
            Guid.Parse("11111111-1111-4111-8111-000000000010"), "chef-khai-id",
            "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
            320m, 13m, 40m, 12m, 6m, 490m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000047000001"), "Bánh tráng dẻo & bún tươi", 400m, "g", "Cuốn gỏi", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000047000002"), "Đậu hũ chiên vàng & nấm đùi gà áp chảo", 250m, "g", "Thái thanh dài vừa cuốn", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000047000003"), "Bắp cải tím, cà rốt, dưa leo, ớt chuông vàng", 300m, "g", "Thái sợi dài đều đẹp mắt", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000047000004"), "Xà lách, húng lủi, tía tô, rau mùi", 150m, "g", "Rửa sạch để ráo", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000047000005"), "Bơ đậu phộng, tương đen chay, nước cốt dừa", 100m, "g", "Khuấy sốt chấm béo bùi", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000047000001"), 1, "Áp chảo đậu hũ và nấm đùi gà", "Cắt đậu hũ và nấm đùi gà thành thanh dài, áp chảo với chút dầu ăn, sả băm và nước tương cho vàng thơm hai mặt.", 8, "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000047000002"), 2, "Thái sợi ngũ sắc các loại rau củ", "Bào sợi bắp cải tím và cà rốt, dưa leo và ớt chuông vàng thái thanh dài bằng nhau.", 10, "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000047000003"), 3, "Cuốn gỏi chay ngũ sắc", "Làm mềm bánh tráng, xếp xà lách, rau thơm, bún tươi, các loại rau củ ngũ sắc, đậu hũ và nấm đùi gà vào rồi cuốn tròn chắc tay.", 10, "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000047000004"), 4, "Pha sốt bơ đậu phộng và thưởng thức", "Đun ấm bơ đậu phộng, tương đen chay, chút nước cốt dừa và đường cho sánh mịn, rắc mè rang và đậu phộng giã dập lên mặt chén sốt.", 4, "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000048"),
            "Chè Hạt Sen Long Nhãn Bọc Dừa Hưng Yên",
            "che-hat-sen-long-nhan-hung-yen",
            "Món chè cung đình thanh tao với từng hạt sen bở tơi bùi ngậy được lồng khéo léo trong cùi nhãn lồng Hưng Yên dày giòn ngọt lịm, ướp hương hoa nhài và đường phèn mát lành.",
            30, 35, 4, RecipeDifficulty.Medium,
            Guid.Parse("11111111-1111-4111-8111-000000000011"), "chef-khai-id",
            "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=900&auto=format&fit=crop&q=80",
            260m, 6m, 56m, 2m, 4m, 45m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000048000001"), "Hạt sen tươi Huế hoặc Đồng Tháp", 300m, "g", "Bóc vỏ, thông sạch tâm sen", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000048000002"), "Nhãn lồng cùi dày tươi", 500m, "g", "Bóc vỏ, khéo léo xoáy bỏ hạt giữ nguyên cùi", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000048000003"), "Đường phèn kết tinh", 150m, "g", "Tạo vị ngọt thanh không gắt cổ", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000048000004"), "Lá dứa (lá nếp) & hoa nhài tươi", 30m, "g", "Ướp hương thơm thanh khiết", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000048000005"), "Cơm dừa non thái sợi", 50m, "g", "Trang trí và ăn kèm", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000048000001"), 1, "Ninh hạt sen chín bở mà không nát", "Cho hạt sen tươi vào nồi nước cùng bó lá dứa, đun sôi rồi hạ lửa nhỏ ninh 25 phút cho đến khi hạt sen chín bở mềm nhưng vẫn nguyên hạt. Thêm đường phèn đun thêm 5 phút cho hạt sen ngấm ngọt.", 30, "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000048000002"), 2, "Tách hạt nhãn và lồng hạt sen", "Dùng đầu mũi dao nhọn khéo léo lách quanh cuống nhãn để lấy hạt ra mà cùi nhãn không bị rách. Vớt hạt sen đã nguội nhồi vào bên trong từng cùi nhãn.", 15, "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000048000003"), 3, "Chần long nhãn bọc sen trong nước đường phèn", "Đun sôi lại nồi nước đường phèn trong vắt, thả các viên nhãn bọc hạt sen vào đun đúng 2 phút rồi tắt bếp ngay để cùi nhãn giữ độ giòn.", 5, "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000048000004"), 4, "Ướp lạnh và thưởng thức", "Để chè nguội, thả vài bông hoa nhài rửa sạch hoặc ướp lạnh trong ngăn mát tủ lạnh, múc ra bát sứ rắc sợi dừa non thưởng thức.", 5, "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000049"),
            "Bánh Flan Trứng Sữa Caramel Mềm Mịn",
            "banh-flan-trung-sua-caramel",
            "Chiếc bánh flan vàng óng núng nính, mặt cắt láng mịn không một vết rỗ tổ ong, béo thơm mùi trứng gà tươi và sữa tươi hòa quyện lớp sốt caramel hổ phách đắng nhẹ.",
            20, 35, 6, RecipeDifficulty.Easy,
            Guid.Parse("11111111-1111-4111-8111-000000000011"), "chef-khai-id",
            "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&auto=format&fit=crop&q=80",
            245m, 8m, 32m, 9m, 0m, 95m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000049000001"), "Trứng gà tươi", 6m, "quả", "Dùng 4 quả nguyên và 2 lòng đỏ", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000049000002"), "Sữa tươi không đường & sữa đặc có đường", 600m, "ml", "500ml sữa tươi và 100ml sữa đặc", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000049000003"), "Đường cát trắng & nước cốt chanh", 100m, "g", "Thắng caramel láng đáy khuôn", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000049000004"), "Tinh chất vani nguyên chất", 1m, "muỗng cà phê", "Khử mùi tanh trứng", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000049000005"), "Cà phê đen pha phin & đá bào", 50m, "ml", "Rưới ăn kèm bánh flan", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000049000001"), 1, "Thắng caramel màu hổ phách", "Đun đường cát với 40ml nước trên lửa nhỏ không khuấy cho đến khi chuyển màu cánh gián đẹp mắt, vắt 1/2 muỗng nước cốt chanh vào rồi rót nhanh láng đều đáy các khuôn bánh.", 8, "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000049000002"), 2, "Khuấy hỗn hợp trứng sữa và lọc qua rây", "Khuấy nhẹ trứng gà với vani theo một chiều (không đánh bông bọt). Đun ấm sữa tươi với sữa đặc ở 60 độ C rồi rót từ từ vào tô trứng, lọc hỗn hợp qua rây mịn 2 lần để bánh không bị rỗ.", 10, "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000049000003"), 3, "Hấp bánh flan lửa nhỏ phủ khăn", "Rót hỗn hợp vào khuôn, phủ một chiếc khăn xô lên miệng xửng hấp để hơi nước không nhỏ xuống mặt bánh. Hấp ở lửa nhỏ nhất trong 30 phút đến khi xiên tăm vào bánh không dính.", 30, "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000049000004"), 4, "Làm lạnh và úp bánh ra đĩa", "Để bánh nguội rồi bảo quản ngăn mát tủ lạnh 3 tiếng. Dùng mũi dao lách nhẹ quanh thành khuôn, úp bánh ra đĩa và rưới chút cà phê đen cùng đá bào.", 5, "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000050"),
            "Chè Khúc Bạch Hạnh Nhân Nhãn Lồng Mát Lạnh",
            "che-khuc-bach-hanh-nhan",
            "Những viên thạch khúc bạch phô mai kem tươi mềm tan nơi đầu lưỡi với 3 sắc màu tự nhiên (trắng sữa, xanh trà xanh, hồng dâu), dùng kèm nước đường phèn, nhãn tươi và hạnh nhân lát nướng giòn.",
            25, 20, 4, RecipeDifficulty.Easy,
            Guid.Parse("11111111-1111-4111-8111-000000000011"), "chef-khai-id",
            "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=900&auto=format&fit=crop&q=80",
            310m, 7m, 38m, 15m, 2m, 80m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000050000001"), "Kem tươi (Whipping Cream) & sữa tươi", 500m, "ml", "250ml whipping cream và 250ml sữa tươi", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000050000002"), "Bột Gelatin & đường cát", 80m, "g", "20g gelatin ngâm nở với nước lạnh", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000050000003"), "Bột trà xanh Matcha", 1m, "muỗng cà phê", "Tạo viên khúc bạch vị trà xanh", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000050000004"), "Nhãn tươi hoặc vải thiều tách hạt", 300m, "g", "Nấu cùng nước đường phèn", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000050000005"), "Hạnh nhân lát rang vàng & hạt chia", 60m, "g", "Rắc lên trên bát chè", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000050000001"), 1, "Nấu hỗn hợp thạch khúc bạch kem sữa", "Ngâm nở gelatin trong 15 phút. Đun ấm sữa tươi, whipping cream và 60g đường trên lửa nhỏ, cho gelatin vào khuấy tan hoàn toàn rồi chia làm 2 khuôn (1 khuôn trắng sữa, 1 khuôn pha bột matcha). Để tủ lạnh 3 giờ cho đông.", 20, "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000050000002"), 2, "Nấu nước đường phèn lá dứa và nhãn", "Đun sôi 1 lít nước với đường phèn và lá dứa cho tan hết, thả cùi nhãn tươi vào đun 2 phút rồi tắt bếp để thật nguội.", 15, "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000050000003"), 3, "Rang vàng lát hạnh nhân", "Rang hạnh nhân thái lát trên chảo khô lửa nhỏ khoảng 3 phút cho đến khi dậy mùi thơm bùi và ngả màu vàng nhẹ.", 4, "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000050000004"), 4, "Cắt khúc bạch và trình bày bát chè", "Dùng dao lượn sóng cắt thạch khúc bạch thành từng viên vừa ăn, xếp vào bát cùng nhãn tươi, chan nước đường phèn lạnh, rắc hạt chia và hạnh nhân lát rang giòn.", 5, "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000051"),
            "Sữa Chua Nếp Cẩm Trân Châu Nước Cốt Dừa",
            "sua-chua-nep-cam-nuoc-cot-dua",
            "Sự hòa quyện tuyệt vời giữa phần xôi nếp cẩm tím than dẻo bùi nấu lá dứa, nước cốt dừa béo thơm và sữa chua trắng mịn chua dịu mát lạnh tốt cho hệ tiêu hóa.",
            20, 40, 4, RecipeDifficulty.Easy,
            Guid.Parse("11111111-1111-4111-8111-000000000011"), "admin-user-id",
            "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&auto=format&fit=crop&q=80",
            290m, 8m, 46m, 9m, 4m, 65m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000051000001"), "Gạo nếp cẩm (nếp than) Điện Biên", 250m, "g", "Vo sạch, ngâm nước ấm 3 giờ", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000051000002"), "Sữa chua sánh mịn", 4m, "hộp", "Để ngăn mát tủ lạnh", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000051000003"), "Nước cốt dừa & lá dứa tươi", 150m, "ml", "Nấu cùng nếp cẩm tạo độ béo", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000051000004"), "Đường thốt nốt hoặc đường nâu", 80m, "g", "Tạo vị ngọt trầm ấm cho nếp cẩm", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000051000005"), "Dừa khô hoặc trân châu trắng", 50m, "g", "Topping giòn vui miệng", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000051000001"), 1, "Nấu chín mềm nếp cẩm với lá dứa", "Cho gạo nếp cẩm đã ngâm cùng nước ngâm và bó lá dứa vào nồi, đun sôi rồi hạ lửa nhỏ ninh trong 30 phút cho hạt nếp cẩm nở mềm sánh dẻo.", 30, "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000051000002"), 2, "Rim nếp cẩm với đường và nước cốt dừa", "Vớt bỏ lá dứa, cho đường nâu và 100ml nước cốt dừa vào nồi nếp cẩm, khuấy đều trên lửa nhỏ thêm 10 phút cho hạt nếp bóng mượt rồi để nguội.", 10, "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000051000003"), 3, "Chuẩn bị sữa chua và đá bào", "Cho một lớp đá bào mịn xuống đáy ly thủy tinh, múc 3 muỗng nếp cẩm dẻo thơm lên trên.", 3, "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000051000004"), 4, "Rót sữa chua và thưởng thức", "Đổ 1 hộp sữa chua mát lạnh và rưới thêm 1 muỗng nước cốt dừa, rắc dừa khô và trân châu trắng lên mặt ly.", 2, "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000052"),
            "Trà Đào Cam Sả Mật Ong Thanh Nhiệt",
            "tra-dao-cam-sa-mat-ong",
            "Ly trà đào cam sả mát lạnh chuẩn vị quán cà phê với nền hồng trà ủ sả tươi thơm dịu, vị chua ngọt thanh mát của cam vàng, mật ong và những miếng đào ngâm giòn ngọt.",
            15, 10, 4, RecipeDifficulty.Easy,
            Guid.Parse("11111111-1111-4111-8111-000000000012"), "admin-user-id",
            "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=900&auto=format&fit=crop&q=80",
            145m, 1m, 35m, 0m, 2m, 15m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000052000001"), "Hồng trà hoặc trà đen túi lọc", 4m, "gói", "Ủ với nước sả sôi", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000052000002"), "Đào ngâm đóng hộp & nước ngâm đào", 300m, "g", "Cắt múi cau vừa ăn", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000052000003"), "Cam vàng tươi", 2m, "quả", "1 quả vắt lấy nước, 1 quả cắt lát trang trí", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000052000004"), "Sả cây tươi đập dập", 4m, "cây", "Nấu lấy nước thơm", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000052000005"), "Mật ong rừng & siro đào", 60m, "ml", "Tạo độ ngọt thanh và hương đào", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000052000001"), 1, "Nấu nước sả tươi và ủ hồng trà", "Đập dập 4 cây sả, đun sôi với 600ml nước trong 8 phút để chiết xuất tinh dầu sả. Tắt bếp, thả 4 gói hồng trà vào ủ 7 phút rồi vớt bỏ túi trà để nguội.", 15, "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000052000002"), 2, "Vắt cam vàng và cắt miếng đào ngâm", "Vắt lấy nước cốt 1 quả cam vàng, quả còn lại thái lát mỏng. Đào ngâm cắt thành những múi cau dày giòn.", 5, "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000052000003"), 3, "Lắc hỗn hợp trà đào cam sả", "Cho nước cốt hồng trà sả, nước cam tươi, nước đào ngâm, mật ong và đá viên vào bình shaker lắc mạnh 15 giây cho trà lên lớp bọt mịn mát lạnh.", 3, "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000052000004"), 4, "Trang trí ly trà và thưởng thức", "Rót trà ra ly cao, xếp 3-4 miếng đào ngâm, lát cam vàng, nhánh sả tươi và lá bạc hà lên miệng ly.", 2, "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000053"),
            "Cà Phê Muối Kem Béo Chuẩn Vị Cố Đô Huế",
            "ca-phe-muoi-kem-beo-hue",
            "Thức uống gây thương nhớ từ cố đô Huế với cốt cà phê Robusta pha phin đậm đặc, hòa quyện lớp kem sữa mặn béo mịn màng làm tôn lên vị ngọt hậu và hương thơm nồng nàn của cà phê.",
            10, 5, 2, RecipeDifficulty.Easy,
            Guid.Parse("11111111-1111-4111-8111-000000000012"), "admin-user-id",
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&auto=format&fit=crop&q=80",
            210m, 3m, 22m, 12m, 0m, 380m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000053000001"), "Bột cà phê nguyên chất pha phin", 50m, "g", "Ủ nước sôi 95 độ C lấy nước cốt đậm đặc", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000053000002"), "Sữa đặc có đường", 40m, "ml", "Đặt dưới đáy ly tạo vị ngọt", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000053000003"), "Kem béo thực vật (Rich's) & Whipping Cream", 100m, "ml", "Đánh bông sệt vừa phải", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000053000004"), "Muối hồng Himalaya hoặc muối biển mịn", 3m, "g", "Tạo vị mặn dịu hài hòa trong lớp kem", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000053000005"), "Bột cacao & đá viên", 10m, "g", "Rắc trang trí mặt kem", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000053000001"), 1, "Ủ cà phê phin truyền thống", "Tráng nóng phin cà phê, cho 50g bột cà phê vào nén vừa tay. Chế 30ml nước sôi ủ nở 2 phút, sau đó rót thêm 100ml nước sôi chờ cà phê nhỏ giọt hết.", 8, "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000053000002"), 2, "Đánh bông lớp kem muối mặn béo", "Cho kem béo, whipping cream và 3g muối mịn vào tô lạnh, dùng máy đánh trứng đánh ở tốc độ vừa khoảng 2 phút đến khi kem bông sánh mịn có độ chảy nhẹ.", 3, "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000053000003"), 3, "Tạo tầng sữa đặc và cà phê", "Cho 20ml sữa đặc vào đáy mỗi ly, thêm đá viên rồi rót nước cốt cà phê phin đã đánh tạo bọt lên trên.", 2, "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000053000004"), 4, "Phủ kem muối và rắc bột cacao", "Nhẹ nhàng rót lớp kem muối trắng mịn phủ đầy mặt ly cà phê, rắc một lớp mỏng bột cacao nguyên chất lên trên và thưởng thức.", 2, "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000054"),
            "Sinh Tố Bơ Sáp Đắk Lắk Sữa Đặc Dừa Khô",
            "sinh-to-bo-sap-sua-dac",
            "Ly sinh tố bơ sáp Đắk Lắk xanh mướt, sánh đặc mịn màng, béo ngậy hương sữa đặc và sữa tươi, điểm xuyết lớp dừa sấy giòn rụm và cơm dừa non hấp dẫn.",
            10, 0, 2, RecipeDifficulty.Easy,
            Guid.Parse("11111111-1111-4111-8111-000000000012"), "admin-user-id",
            "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=900&auto=format&fit=crop&q=80",
            340m, 6m, 34m, 21m, 7m, 65m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000054000001"), "Bơ sáp Đắk Lắk chín dẻo", 2m, "quả", "Bổ đôi bỏ hạt, nạo lấy phần thịt bơ vàng xanh", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000054000002"), "Sữa đặc có đường & sữa tươi lạnh", 160m, "ml", "60ml sữa đặc và 100ml sữa tươi", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000054000003"), "Nước cốt dừa sánh", 30m, "ml", "Tăng hương thơm béo ngậy", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000054000004"), "Đá bào mịn & dừa sấy giòn", 150m, "g", "Xay nhuyễn và rắc mặt ly", 4),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000054000001"), 1, "Bổ bơ sáp và tách lấy thịt bơ", "Chọn bơ sáp chín mềm đều, bổ dọc bỏ hạt, lột vỏ và cắt thịt bơ thành miếng vuông (lưu ý không nạo sát vỏ xanh đậm để bơ không bị đắng).", 4, "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000054000002"), 2, "Xay nhuyễn bơ cùng sữa và đá bào", "Cho thịt bơ, sữa tươi lạnh, sữa đặc và đá bào vào máy xay sinh tố, xay tốc độ cao trong 45 giây cho đến khi hỗn hợp sánh mịn hoàn toàn.", 2, "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000054000003"), 3, "Tạo vân sữa cốt dừa trên thành ly", "Rưới nhẹ một vòng sữa đặc và nước cốt dừa quanh thành ly thủy tinh rồi rót sinh tố bơ xanh mướt vào đầy ly.", 2, "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000054000004"), 4, "Rắc dừa sấy giòn và thưởng thức", "Phủ một lớp dừa khô sấy giòn hoặc vài hạt hạnh nhân lên mặt ly sinh tố bơ, dùng ngay khi còn lạnh.", 2, "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80"),
            ]),
        new(
            Guid.Parse("22222222-2222-4222-8222-000000000055"),
            "Nước Ép Cần Tây Táo Xanh Dứa Mật Detox",
            "nuoc-ep-can-tay-tao-xanh-detox",
            "Thức uống xanh thanh lọc cơ thể (Detox) giàu vitamin và chất chống oxy hóa, kết hợp cần tây tươi mát với vị ngọt dịu của táo xanh, dứa mật và hương gừng ấm nhẹ rất dễ uống.",
            15, 0, 2, RecipeDifficulty.Easy,
            Guid.Parse("11111111-1111-4111-8111-000000000012"), "admin-user-id",
            "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80",
            115m, 2m, 27m, 0m, 3m, 85m,
            [
                new(Guid.Parse("33333333-3333-4333-8333-000055000001"), "Bẹ cần tây Đà Lạt tươi non", 250m, "g", "Rửa sạch, cắt khúc 4cm", 1),
                new(Guid.Parse("33333333-3333-4333-8333-000055000002"), "Táo xanh (Granny Smith)", 2m, "quả", "Rửa muối, bỏ hạt cắt múi", 2),
                new(Guid.Parse("33333333-3333-4333-8333-000055000003"), "Dứa mật (thơm) chín", 150m, "g", "Gọt vỏ bỏ mắt, cắt miếng", 3),
                new(Guid.Parse("33333333-3333-4333-8333-000055000004"), "Gừng tươi & cốt chanh vàng", 15m, "g", "Khử mùi hăng của cần tây", 4),
                new(Guid.Parse("33333333-3333-4333-8333-000055000005"), "Mật ong nguyên chất & đá viên", 20m, "ml", "Tùy chọn thêm vị ngọt tự nhiên", 5),
            ],
            [
                new(Guid.Parse("44444444-4444-4444-8444-000055000001"), 1, "Ngâm rửa sạch cần tây và trái cây", "Ngâm cần tây và táo xanh trong nước muối loãng 10 phút rồi rửa sạch để ráo. Cắt khúc cần tây, táo xanh bỏ lõi hạt, dứa mật cắt miếng vừa miệng máy ép.", 10, "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000055000002"), 2, "Ép chậm giữ trọn enzyme và vitamin", "Lần lượt cho cần tây xen kẽ với táo xanh, dứa mật và lát gừng mỏng vào máy ép chậm để bã được đẩy ra hết và thu được lượng nước ép xanh ngọc tối đa.", 3, "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000055000003"), 3, "Pha nước cốt chanh và mật ong", "Thêm 1 muỗng cà phê nước cốt chanh vàng và chút mật ong vào bình nước ép, khuấy đều để giữ màu xanh tươi không bị oxy hóa.", 1, "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80"),
                new(Guid.Parse("44444444-4444-4444-8444-000055000004"), 4, "Rót ra ly đá lạnh thưởng thức", "Rót nước ép cần tây táo dứa ra ly có đá viên, trang trí với lát táo xanh và cọng cần tây non, uống ngay trong ngày.", 1, "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"),
            ]),
    ];

    public async Task SeedAsync(CancellationToken cancellationToken = default)
    {
        await EnsureUsersAndRolesAsync(cancellationToken);
        await CleanupLegacyRandomDataAsync(cancellationToken);

        var categoriesById = await EnsureCategoriesAsync(cancellationToken);
        await EnsureRecipesAsync(categoriesById, cancellationToken);
    }

    /// <summary>
    /// Xóa bỏ hoàn toàn các dữ liệu ngẫu nhiên tiếng Anh (Bogus/Faker) hoặc danh mục thử nghiệm cũ nếu có trong CSDL.
    /// </summary>
    private async Task CleanupLegacyRandomDataAsync(CancellationToken cancellationToken)
    {
        var validSlugs = RecipeDefinitions.Select(r => r.Slug).ToHashSet(StringComparer.OrdinalIgnoreCase);
        var validCategorySlugs = CategoryDefinitions.Select(c => c.Slug).ToHashSet(StringComparer.OrdinalIgnoreCase);

        var existingRecipes = await dbContext.Recipes
            .Where(r => r.AuthorId == SeederUserId)
            .ToListAsync(cancellationToken);

        var legacyRecipes = existingRecipes
            .Where(r => !validSlugs.Contains(r.Slug))
            .ToList();

        if (legacyRecipes.Count > 0)
        {
            var legacyIds = legacyRecipes.Select(r => r.Id).ToList();
            var oldIngredients = await dbContext.RecipeIngredients.Where(i => legacyIds.Contains(i.RecipeId)).ToListAsync(cancellationToken);
            var oldSteps = await dbContext.RecipeSteps.Where(s => legacyIds.Contains(s.RecipeId)).ToListAsync(cancellationToken);
            var oldImages = await dbContext.RecipeImages.Where(img => legacyIds.Contains(img.RecipeId)).ToListAsync(cancellationToken);

            dbContext.RecipeIngredients.RemoveRange(oldIngredients);
            dbContext.RecipeSteps.RemoveRange(oldSteps);
            dbContext.RecipeImages.RemoveRange(oldImages);
            dbContext.Recipes.RemoveRange(legacyRecipes);
            await dbContext.SaveChangesAsync(cancellationToken);
        }

        var existingCategories = await dbContext.Categories.ToListAsync(cancellationToken);
        var legacyCategories = existingCategories
            .Where(c => !validCategorySlugs.Contains(c.Slug))
            .ToList();

        if (legacyCategories.Count > 0)
        {
            foreach (var oldCat in legacyCategories)
            {
                var hasAnyRecipe = await dbContext.Recipes.AnyAsync(r => r.CategoryId == oldCat.Id, cancellationToken);
                if (!hasAnyRecipe)
                {
                    dbContext.Categories.Remove(oldCat);
                }
            }
            await dbContext.SaveChangesAsync(cancellationToken);
        }
    }

    private async Task EnsureUsersAndRolesAsync(CancellationToken cancellationToken)
    {
        var hasher = new PasswordHasher<ApplicationUser>();

        var demoUsers = new (string Id, string Email, string DisplayName, string FirstName, string LastName, string Bio, string AvatarUrl, string Role)[]
        {
            (
                SeederUserId,
                "seeder@culinaryblog.local",
                "Chef Nguyễn Nhất Minh",
                "Minh",
                "Nguyễn Nhất",
                "Đầu bếp trưởng với hơn 12 năm kinh nghiệm nghiên cứu ẩm thực truyền thống Việt Nam và Á Âu.",
                "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&auto=format&fit=crop&q=80",
                UserRoleHelper.Author
            ),
            (
                "admin-user-id",
                "admin@culinary.com",
                "Quản Trị Viên Hệ Thống",
                "Admin",
                "Culinary",
                "Quản trị viên hệ thống Culinary Blog - phụ trách kiểm duyệt nội dung và quản lý cộng đồng đầu bếp.",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
                UserRoleHelper.Admin
            ),
            (
                "chef-hieu-id",
                "chef.hieu@culinary.com",
                "Chef Bùi Trung Hiếu",
                "Hiếu",
                "Bùi Trung",
                "Chuyên gia các món nước và phở truyền thống Hà Nội, đam mê chia sẻ bí quyết nấu ăn gia đình.",
                "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&auto=format&fit=crop&q=80",
                UserRoleHelper.Author
            ),
            (
                "chef-khai-id",
                "chef.khai@culinary.com",
                "Chef Nguyễn Thế Khải",
                "Khải",
                "Nguyễn Thế",
                "Đầu bếp chuyên món chay thanh đạm và thực dưỡng hiện đại dành cho người bận rộn.",
                "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?w=400&auto=format&fit=crop&q=80",
                UserRoleHelper.Author
            ),
            (
                "member-huy-id",
                "member.huy@culinary.com",
                "Phan Thanh Huy",
                "Huy",
                "Phan Thanh",
                "Người yêu ẩm thực đường phố Sài Gòn và thích sưu tầm các công thức bánh ngọt dễ làm.",
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80",
                UserRoleHelper.User
            )
        };

        var anyChanged = false;
        foreach (var item in demoUsers)
        {
            var existing = await dbContext.Users
                .FirstOrDefaultAsync(u => u.Id == item.Id || u.Email == item.Email, cancellationToken);

            if (existing is null)
            {
                existing = new ApplicationUser(item.Email, item.DisplayName, item.Bio, item.AvatarUrl)
                {
                    Id = item.Id,
                    FirstName = item.FirstName,
                    LastName = item.LastName,
                    EmailConfirmed = true
                };
                existing.PasswordHash = hasher.HashPassword(existing, "Password123!");
                await dbContext.Users.AddAsync(existing, cancellationToken);
                await UserRoleHelper.AssignRoleAsync(dbContext, existing.Id, item.Role, cancellationToken);
                anyChanged = true;
            }
        }

        if (anyChanged)
        {
            await dbContext.SaveChangesAsync(cancellationToken);
        }
    }

    private async Task<Dictionary<Guid, Category>> EnsureCategoriesAsync(CancellationToken cancellationToken)
    {
        var existingCategories = await dbContext.Categories.ToListAsync(cancellationToken);
        var bySlug = existingCategories.ToDictionary(c => c.Slug, StringComparer.OrdinalIgnoreCase);
        var result = new Dictionary<Guid, Category>();
        var anyChanged = false;

        foreach (var def in CategoryDefinitions)
        {
            if (bySlug.TryGetValue(def.Slug, out var existing))
            {
                if (string.IsNullOrWhiteSpace(existing.ImageUrl) || existing.OrderIndex != def.OrderIndex)
                {
                    existing.UpdateDetails(def.Name, def.Slug, def.Description, def.ImageUrl, def.OrderIndex);
                    anyChanged = true;
                }
                result[def.Id] = existing;
                continue;
            }

            var category = new Category(def.Name, def.Slug, def.Description, def.ImageUrl, def.OrderIndex)
            {
                Id = def.Id
            };
            await dbContext.Categories.AddAsync(category, cancellationToken);
            result[def.Id] = category;
            anyChanged = true;
        }

        if (anyChanged)
        {
            await dbContext.SaveChangesAsync(cancellationToken);
        }

        return result;
    }

    private async Task EnsureRecipesAsync(
        Dictionary<Guid, Category> categoriesById,
        CancellationToken cancellationToken)
    {
        var existingSlugs = (await dbContext.Recipes
            .Select(r => r.Slug)
            .ToListAsync(cancellationToken))
            .ToHashSet(StringComparer.OrdinalIgnoreCase);

        var newRecipes = new List<Recipe>();

        foreach (var def in RecipeDefinitions)
        {
            if (existingSlugs.Contains(def.Slug))
            {
                continue;
            }

            var actualCategoryId = categoriesById.TryGetValue(def.CategoryId, out var cat)
                ? cat.Id
                : def.CategoryId;

            var instructionsText = string.Join(
                Environment.NewLine,
                def.Steps.Select(s => $"Bước {s.StepNumber} ({s.Title}): {s.Description}"));

            var recipe = new Recipe(
                title: def.Title,
                slug: def.Slug,
                description: def.Description,
                instructions: instructionsText,
                prepTime: def.PrepTime,
                cookTime: def.CookTime,
                servings: def.Servings,
                difficulty: def.Difficulty,
                categoryId: actualCategoryId,
                authorId: def.AuthorId,
                nutrition: new RecipeNutrition
                {
                    Calories = def.Calories,
                    Protein = def.Protein,
                    Carbohydrates = def.Carbohydrates,
                    Fat = def.Fat,
                    Fiber = def.Fiber,
                    Sodium = def.Sodium
                })
            {
                Id = def.Id
            };

            foreach (var ing in def.Ingredients)
            {
                recipe.AddIngredient(new RecipeIngredient(
                    recipeId: recipe.Id,
                    name: ing.Name,
                    quantity: ing.Quantity,
                    unit: ing.Unit,
                    notes: ing.Notes,
                    orderIndex: ing.OrderIndex)
                {
                    Id = ing.Id
                });
            }

            foreach (var st in def.Steps)
            {
                recipe.AddStep(new RecipeStep(
                    recipeId: recipe.Id,
                    stepNumber: st.StepNumber,
                    title: st.Title,
                    description: st.Description,
                    timerMinutes: st.TimerMinutes,
                    imageUrl: st.ImageUrl)
                {
                    Id = st.Id
                });
            }

            recipe.AddImage(new RecipeImage(
                recipeId: recipe.Id,
                originalUrl: def.CoverImageUrl,
                altText: def.Title,
                orderIndex: 0,
                isPrimary: true,
                mediumUrl: def.CoverImageUrl,
                thumbnailUrl: def.CoverImageUrl));

            for (var i = 0; i < Math.Min(2, def.Steps.Length); i++)
            {
                var stepImg = def.Steps[i].ImageUrl;
                if (!string.IsNullOrWhiteSpace(stepImg) && !string.Equals(stepImg, def.CoverImageUrl, StringComparison.OrdinalIgnoreCase))
                {
                    recipe.AddImage(new RecipeImage(
                        recipeId: recipe.Id,
                        originalUrl: stepImg,
                        altText: $"{def.Title} - Bước {i + 1}",
                        orderIndex: i + 1,
                        isPrimary: false,
                        mediumUrl: stepImg,
                        thumbnailUrl: stepImg));
                }
            }

            recipe.Publish();
            newRecipes.Add(recipe);
        }

        if (newRecipes.Count > 0)
        {
            await dbContext.Recipes.AddRangeAsync(newRecipes, cancellationToken);
            await dbContext.SaveChangesAsync(cancellationToken);
        }
    }
}
