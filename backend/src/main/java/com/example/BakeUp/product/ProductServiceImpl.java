package com.example.BakeUp.product;

import java.util.ArrayList;
import java.util.List;

import org.apache.tomcat.util.security.KeyStoreUtil;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {
    private ProductRepository products;

    public ProductServiceImpl(ProductRepository products) {
        this.products = products;
    }

    public ArrayList<Object> listSearchResults(String keyword){
        if (keyword != null){
            List<Product> result = products.findAll(keyword);
            ArrayList<Object> newResult = new ArrayList<Object>();
            for (Product product : result){
                newResult.add((Object) product);
            }
            return newResult;
        } 
        return null;
    }

    public ArrayList<Object> listAllSearchProducts() {
        List<Product> empty = products.findAll();
        ArrayList<Object> newResult = new ArrayList<Object>();
        for (Product product : empty) {
            newResult.add((Object) product);
        }
        return newResult;
    }

    @Override
    public List<Product> listProducts(int shop_id) {
        return products.findByShopId(shop_id);
    }

    @Override
    public List<Product> listAllProducts() {
        return products.findAll();
    }

    @Override
    public Product getProduct(int id) {
        return products.findById(id).map(product -> {
            return product;
        }).orElse(null);
    }

    @Override
    public Product addProduct(Product product) {
        return products.save(product);
    }

    @Override
    public Product updateProductUrl(int id, Product newProductInfo) {
        return products.findById(id).map(product -> {
            product.setImage_url(newProductInfo.getImage_url());
            // product = basicProductSetting(product, newProductInfo);
            return products.save(product);
        }).orElse(null);
    }


    @Override
    public void deleteProduct(int id) {
        products.deleteById(id);
    }

    private Product basicProductSetting (Product product, Product newProductInfo) {
        product.setProduct_name(newProductInfo.getProduct_name());
        product.setProduct_type(newProductInfo.getProduct_type());
        product.setProduct_description(newProductInfo.getProduct_description());
        product.setImage_url(newProductInfo.getImage_url());
        return product;
    }

}