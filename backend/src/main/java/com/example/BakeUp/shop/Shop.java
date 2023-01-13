package com.example.BakeUp.shop;
import lombok.*;
import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Entity
public class Shop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @JsonProperty("shop_name")
    private String shopName;

    @JsonProperty("home_baker_id")
    // @Column(name = "shop_id", nullable = true)
    private int homeBakerId;

    private String description;
    private boolean verified;
    private String location;

    // not sure what data type to use for profile pics
    @JsonProperty("profile_pic_filename")
    private String profilePicFilename;

    public Shop (String shopName, int homeBakerId, String description, boolean verified, String location, String profilePicFilename) {
        this.shopName = shopName;
        this.homeBakerId = homeBakerId;
        this.description = description;
        this.verified = verified;
        this.location = location;
        this.profilePicFilename = profilePicFilename;
    }
}
