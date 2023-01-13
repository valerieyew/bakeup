package com.example.BakeUp.shop;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ShopServiceImpl implements ShopService {
    
    private ShopRepository shops;

    public ShopServiceImpl(ShopRepository shops) {
        this.shops = shops;
    }

    public ArrayList<Object> listSearchResults(String keyword){
        if (keyword != null){
            List<Shop> result = shops.findAll(keyword);
            ArrayList<Object> newResult = new ArrayList<Object>();
            for (Shop shop : result){
                newResult.add((Object) shop);
            }
            return newResult;
        } 
        return null;
    }

    @Override
    public Shop getShop(int id) {
        return shops.findById(id).map(shop -> {
            return shop;
        }).orElse(null);
    }

    // @Override
    // public Shop getShop(String shopName) {
    //     return shops.findByShopName(shopName).map(shop -> {
    //         return shop;
    //     }).orElse(null);
    // }

    @Override
    public Shop addShop(Shop shop) {
        // shops.save(shop);
        // shop.setHomeBakerId(userId);
        return shops.save(shop);
    }

    @Override
    public Shop updateShop(int id, Shop newShopInfo) {
        return shops.findById(id).map(shop -> {
            shop.setShopName(newShopInfo.getShopName());
            shop.setDescription(newShopInfo.getDescription());
            shop.setVerified(newShopInfo.isVerified());
            shop.setLocation(newShopInfo.getLocation());
            shop.setProfilePicFilename(newShopInfo.getProfilePicFilename());
            return shops.save(shop);
        }).orElse(null);
    }

    @Override
    public Shop updateShopUrl(int id, Shop newShopInfo) {
        return shops.findById(id).map(shop -> {
            shop.setProfilePicFilename(newShopInfo.getProfilePicFilename());
            return shops.save(shop);
        }).orElse(null);
    }

    @Override
    public void deleteShop(int id) {
        shops.deleteById(id);
    }
}
