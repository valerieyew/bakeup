package com.example.BakeUp;

import java.util.Date;

import com.example.BakeUp.order.Order;
import com.example.BakeUp.order.OrderRepository;
import com.example.BakeUp.user.User;
import com.example.BakeUp.user.UserRepository;
import com.example.BakeUp.product.Product;
import com.example.BakeUp.product.ProductRepository;
import com.example.BakeUp.shop.Shop;
import com.example.BakeUp.shop.ShopRepository;

import com.example.BakeUp.product.Product;
import com.example.BakeUp.product.ProductRepository;
import com.example.BakeUp.shop.Shop;
import com.example.BakeUp.shop.ShopRepository;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class BakeUpApplication {
	private static ConfigurableApplicationContext ctx;

	public static void main(String[] args) {
		ctx = SpringApplication.run(BakeUpApplication.class, args);
		init();
	}

	public static void init() {
        UserRepository userRepo = ctx.getBean(UserRepository.class);
		OrderRepository orderRepo = ctx.getBean(OrderRepository.class);
		BCryptPasswordEncoder encoder = ctx.getBean(BCryptPasswordEncoder.class);

		String b_USERNAME = "user_01";
        String b_PASSWORD = "01_user_01";
		String s_USERNAME = "user_02";
        String s_PASSWORD = "02_user_02";
        userRepo.save(createEncodedUser(b_USERNAME, b_PASSWORD, "John", "ROLE_USER", encoder));
		userRepo.save(createEncodedUser(s_USERNAME, s_PASSWORD, "Bob", "ROLE_USER", encoder));
		
		createDefaultShops(userRepo);

		// Order order1 = new Order(1, 1, 1, 10, 15.5, "first remark", "Pending", false, new Date(), new Date());
		// Order order2 = new Order(1, 1, 2, 20, 25.5, "second remark", "Processing", false, new Date(), new Date());
		// Order order3 = new Order(1, 1, 3, 30, 35.5, "third remark", "Completed", false, new Date(), new Date());
		// orderRepo.save(order1);
		// orderRepo.save(order2);
		// orderRepo.save(order3);

		// Order order4 = new Order(2, 2, 4, 40, 45.5, "4 remark", "Pending", false, new Date(), new Date());
		// Order order5 = new Order(2, 2, 5, 50, 55.5, "5 remark", "Processing", false, new Date(), new Date());
		// Order order6 = new Order(2, 2, 6, 60, 65.5, "6 remark", "Completed", false, new Date(), new Date());
		// orderRepo.save(order4);
		// orderRepo.save(order5);
		// orderRepo.save(order6);

//		Order order1 = new Order(1, 2, "User 1", "User 2", "The Daily Scone Bakery", "Tampines", 1, "Yummy scones", "scone.png", 10, 15.5, "user1 sell1, user2 buy1", "Pending", false, new Date(), new Date());
//		Order order2 = new Order(1, 2, "User 1", "User 2", "The Daily Scone Bakery", "Tampines", 2, "Choco chips", "choc_chip_cookies.jpg", 20, 25.5, "user1 sell2, user2 buy2", "Processing", false, new Date(), new Date());
//		Order order3 = new Order(1, 2, "User 1", "User 2", "The Daily Scone Bakery", "Tampines", 3, "Amazing Macarons", "assorted_macarons.jpg", 30, 35.5, "user1 sell3, user2 buy3", "Completed", false, new Date(), new Date());
//		orderRepo.save(order1);
//		orderRepo.save(order2);
//		orderRepo.save(order3);
//		Order order4 = new Order(2, 1, "User 2", "User 1", "Desserts Hub", "Hougang", 4, "Yummy scones", "scone.png", 40, 45.5, "user2 sell1, user1 buy1", "Pending", false, new Date(), new Date());
//		Order order5 = new Order(2, 1, "User 2", "User 1", "Desserts Hub", "Hougang", 5, "Choco chips", "choc_chip_cookies.jpg", 50, 55.5, "user2 sell2, user1 buy2", "Processing", false, new Date(), new Date());
//		Order order6 = new Order(2, 1, "User 2", "User 1", "Desserts Hub", "Hougang", 6, "Amazing Macarons", "assorted_macarons.jpg", 60, 65.5, "user2 sell3, user1 buy3", "Completed", false, new Date(), new Date());
//		orderRepo.save(order4);
//		orderRepo.save(order5);
//		orderRepo.save(order6);
	}

	public static User createEncodedUser(String username, String password, String alias, String authority,
            BCryptPasswordEncoder encoder) {
        return new User(username, encoder.encode(password), alias, authority);
    }

    public static void createDefaultShops(UserRepository userRepo) {
		ShopRepository shopRepo = ctx.getBean(ShopRepository.class);
		ProductRepository prodRepo = ctx.getBean(ProductRepository.class);

		Shop shop1 = new Shop("The Daily Scone Bakery", 1, "We bake every day and deliver to our customers as fast as we can!",
				true, "Tampines", "tampResident.jpeg");
		Shop shop2 = new Shop("Desserts Hub", 2, "Always ready to customize. Email us at abc@hmail.com for more info.",
				false, "Hougang", "hgResident.jpeg");
		shopRepo.save(shop1);
		shopRepo.save(shop2);

		// add 3 products of Duke Bakery to The Daily Bakery shop:

		// https://www.dukebakery.sg/our-bread?sort=p2co.sort_order%2C%20p.sort_order%2C%20pd.name&order=p2co.sort_order%2C%20p.sort_order%2C%20pd.name&limit=99999
		// not rly sure if scones is a product type
		String[] variations_01_01 = {"Blueberry", "Chocolate", "Cranberry", "Raisin", "Salted"};
		Product shop1_01 = new Product("Japanese Scone", "Scones", "Who can resist this little scone treat?",
										variations_01_01, 1, 4.50, null,
									"Egg, Butter, Milk Powder, Cheese", true, "scone.png");

		String[] variations_01_02 = {"Chocolate", "Garlic", "Sugar"};
		Product shop1_02 = new Product("Duke Slice", "Cakes", "A crunchy snack, perfect for your breaks.",
										variations_01_02, 1, 4.00, null,
									"Egg, Cream, Butter, Sugar, Mixed Dried Fruits, Walnut", true, "duke_slice.png");

		String[] variations_01_03 = {"Almond Banana", "Black Forest", "Choc Fudge", "Citrus Cheesecake", "Tiramisu (Alcohol)"};
		String[] restrictions_01_03 = {"Nut-free", "Gluten free"};
		Product shop1_03 = new Product("Fancy Cakes", "Cakes", "The best cake you can give to your loved ones.",
										variations_01_03, 1, 30.80, restrictions_01_03,
									"Mascarpone Cheese, Coffee, Kahlua, Baileys, Vanilla", true, "homemade_cakes.jpg");
		shop1_01.setShopName("The Daily Scone Bakery");
		shop1_02.setShopName("The Daily Scone Bakery");
		shop1_03.setShopName("The Daily Scone Bakery");
		prodRepo.save(shop1_01);
		prodRepo.save(shop1_02);
		prodRepo.save(shop1_03);

		// add 3 products of Cake Glace to Desserts Hub:

		// https://www.cakeglace.com/Hazel-Dazzle-p238639289
		String[] variations_02_01 = {"4 pax 12x13cm", "6 pax 12x16cm (+$7.50)", "10 pax 18x16cm (+$22.50)", "12 pax 18x19cm (+$33.20)", "15 pax 18x26cm (+$63.20)"};
		Product shop2_01 = new Product("Hazel Dazzle", "Cakes", "This is it! For chocolate lovers, soft choco-roll, Belgian dark chocolate ganache with the most delicious pure hazelnut paste.",
										variations_02_01, 2, 31.0, null,
									"Egg, Butter, Milk Powder, Cheese", true, "hazel_dazzle.jpg");

		String[] variations_02_02 = {"Original", "Blueberry", "Chocolate", "Earl Grey", "Lemon & Honey"};
		Product shop2_02 = new Product("Ice Cheese Tart", "Tarts", "There is more than one way to savour this delicacy: eat it frozen or chilled from the fridge, the perfect treat for Singapore.",
										variations_02_02, 2, 3.80, null,
									"Egg, Cream, Butter, Sugar", true, "ice_cheese_tart.jpg");

		String[] restrictions_02_03 = {"Nut-free", "Gluten free"};
		String[] variations_02_03 = {"Original", "More choco"};
		Product shop2_03 = new Product("Choco-Madeleine", "Cakes", "Novelist Marcel Proust famously described the Madeleine as \"a seashell cake so strictly pleated outside and so sensual inside.\"",
										variations_02_03, 2, 3.90, null,
								 	"Chocolate, Egg, Cream, Sugar, Butter", true, "choco_madeleine.jpg");
			shop2_01.setShopName("Desserts Hub");
			shop2_02.setShopName("Desserts Hub");
			shop2_03.setShopName("Desserts Hub");
		prodRepo.save(shop2_01);
		prodRepo.save(shop2_02);
		prodRepo.save(shop2_03);
	}
}
