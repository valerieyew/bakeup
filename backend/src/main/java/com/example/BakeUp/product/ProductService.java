package com.example.BakeUp.product;

import java.util.ArrayList;
import java.util.List;

public interface ProductService {
    List<Product> listProducts(int shop_id);
    
    List<Product> listAllProducts();
    
    Product getProduct(int id);

    Product addProduct(Product Product);

    Product updateProductUrl(int id, Product Product);

    void deleteProduct(int id);

    ArrayList<Object> listSearchResults(String keyword);

    ArrayList<Object> listAllSearchProducts();
}