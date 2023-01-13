package com.example.BakeUp.shop;

import java.util.ArrayList;
import java.util.List;

public interface ShopService {
    Shop getShop(int id);

    // Shop getShop(String shopName);

    Shop addShop(Shop shop);

    Shop updateShop(int id, Shop shop);
    Shop updateShopUrl(int id, Shop newShopInfo);

    void deleteShop(int id);

    ArrayList<Object> listSearchResults(String keyword);
}
