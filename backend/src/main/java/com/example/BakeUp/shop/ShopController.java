package com.example.BakeUp.shop;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import javax.validation.Valid;

import com.example.BakeUp.file.FileUploadUtil;
import com.example.BakeUp.user.User;
import com.example.BakeUp.user.UserRepository;

@RestController
public class ShopController {
    private ShopService shopService;
    private ShopRepository shops;
    private UserRepository users;

    public ShopController(ShopService ss, ShopRepository shops, UserRepository users) {
        this.shopService = ss;
        this.shops = shops;
        this.users = users;
    }

    @PostMapping("/shop/save/{id}")
    public Shop savePhoto(@PathVariable int id, @RequestParam("image") MultipartFile multipartFile) throws IOException {
        
        Shop shop = shopService.getShop(id);
        String fileName = "shop_"+shop.getId() + "."+ multipartFile.getOriginalFilename().substring(multipartFile.getOriginalFilename().lastIndexOf(".") + 1);
        //StringUtils.cleanPath(multipartFile.getOriginalFilename());
        String uploadDir = "frontend/public/images/";
        shop.setProfilePicFilename("shop_"+shop.getId());
         
        Shop savedShop = shopService.updateShopUrl(1, shop);
 
        //savedProduct.getProduct_id();
 
        FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
         
       return savedShop;
       //return "OK";

    }

    // no authentication for getShop as everyone can see
    @GetMapping("/shop/{id}")
    public Shop getShop(@PathVariable int id) {
        // check if shop exists
        Shop shop = shopService.getShop(id);
        if (shop == null)
            throw new ShopNotFoundException(id);

        return shop;
    }

    @GetMapping("/shopexist")
    public boolean userHasShop(Authentication authentication) {
        // check if user already has a shop
        User user = users.findByUsername(authentication.getName()).orElse(null);
        int userId = user.getId();
        System.out.println(user.getUsername());
        Shop findShop = shops.findById(userId).orElse(null);

        if (findShop != null) {
            return true;
        }

        return false;
    }

    // get shop using shopName instead
    // @GetMapping("/shop/{shopName}")
    // public Shop getShop(@PathVariable String shopName) {
    //     Shop shop = shopService.getShop(shopName);
    //     if (shop == null)
    //         throw new ShopNotFoundException(shopName);

    //     return shop;
    // }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/shop")
    public Shop addShop(@Valid @RequestBody Shop shop, Authentication authentication) {

        // check if user already has a shop
        User user = users.findByUsername(authentication.getName()).orElse(null);
        int userId = user.getId();
        Shop findShop = shops.findById(userId).orElse(null);

        // if the user has a shop already
        if (findShop != null) {
            throw new ShopAlrExistsException(userId);
        }

        shop.setHomeBakerId(userId);

        return shopService.addShop(shop);
    }

    // not checking if shop belongs to user because idt there's anything on front end that can edit other users' shop anyway
    @PutMapping("/shop")
    public Shop updateShop(@Valid @RequestBody Shop newShopInfo, Authentication authentication) {

        // check if user already has a shop
        User user = users.findByUsername(authentication.getName()).orElse(null);
        int userId = user.getId();
        Shop findShop = shops.findById(userId).orElse(null);

        // if the user has a shop already
        if (findShop == null) {
            throw new ShopNotFoundException(userId);
        }

        return shopService.updateShop(userId, newShopInfo);
    }

    @DeleteMapping("/shop")
    public void deleteShop(Authentication authentication) {

        // check if user already has a shop
        User user = users.findByUsername(authentication.getName()).orElse(null);
        int userId = user.getId();

        try {
            shopService.deleteShop(userId);
        } catch (EmptyResultDataAccessException e) {
            throw new ShopNotFoundException(userId);
        }
    }

}
