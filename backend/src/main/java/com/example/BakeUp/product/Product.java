package com.example.BakeUp.product;
import lombok.*;
import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private int product_id;
    private String product_name;
    private String product_type;
    // link with shop later
    @Column(name = "shop_id", nullable = true)
    private int shopId;

    @Column(name = "shop_name", nullable = true)
    private String shopName;

    private String product_description;
    private String[] variations;
    private Long date_listed;

    private Double price;

    private String[] dietary_restrictions;

    private String ingredients;
    private boolean available;
    private String image_url = "logo_bakeup.png";

    public Product (String product_name, String product_type, String product_description, String[] variations, int shop_id, Double price,
                    String[] dietary_restrictions, String ingredients, boolean available, String image_url) {

        this.product_name = product_name;
        this.product_type = product_type;
        this.product_description = product_description;
        this.variations = variations;
        this.price = price;
        this.shopId = shop_id;
        this.date_listed = new Date().getTime();
        this.dietary_restrictions = dietary_restrictions;
        this.ingredients = ingredients;
        this.available = available;
        this.image_url = image_url;

    }
}
