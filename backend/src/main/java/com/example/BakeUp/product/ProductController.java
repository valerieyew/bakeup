package com.example.BakeUp.product;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.security.*;
import com.example.BakeUp.shop.*;
import com.example.BakeUp.user.*;
import com.example.BakeUp.file.*;
// import lombok.extern.slf4j.Slf4j;

// @Slf4j
@RestController
public class ProductController {
    private ProductService ProductService;

    @Autowired
    private ShopRepository shops;

    @Autowired
    private ShopService ShopService;

    @Autowired
    private UserRepository users;

    public ProductController(ProductService cs) {
        this.ProductService = cs;
    }

    @PostMapping("/products/save/{id}")
    public Product savePhoto(@PathVariable int id, @RequestParam("image") MultipartFile multipartFile)
            throws IOException {

        Product product = ProductService.getProduct(id);
        String fileName = "product_" + product.getProduct_id() + "." + multipartFile.getOriginalFilename()
                .substring(multipartFile.getOriginalFilename().lastIndexOf(".") + 1);
        // StringUtils.cleanPath(multipartFile.getOriginalFilename());
        String uploadDir = "frontend/public/images/";
//        product.setImage_url("product_" + product.getProduct_id());
        product.setImage_url(fileName);
        Product savedProduct = ProductService.updateProductUrl(id, product);

        // savedProduct.getProduct_id();

        FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);

        return savedProduct;
        // return "OK";

    }

    @GetMapping("/search/{keyword}")
    public List<Object> showSearchResults(@PathVariable String keyword, Authentication authentication) {
        ArrayList<Object> productsList = ProductService.listSearchResults(keyword);
        ArrayList<Object> shopsList = ShopService.listSearchResults(keyword);
        ArrayList<Object> finalList = new ArrayList<>();

        if (productsList.isEmpty() && shopsList.isEmpty()) {
            ArrayList<Object> emptyProduct = ProductService.listAllSearchProducts();
            ArrayList<Object> emptyShop = new ArrayList<>();
            finalList.add(emptyShop);
            finalList.add(emptyProduct);
        } else {
            finalList.add(shopsList);
            finalList.add(productsList);
        }

        return finalList;
    }

    @GetMapping("/products")
    public List<Product> getProducts(Authentication authentication, Principal principal) {
        User user = users.findByUsername(principal.getName()).orElse(null);
        Shop shop = shops.findByHomeBakerId(user.getId());
        return ProductService.listProducts(shop.getId());
    }

    @GetMapping("/products/all")
    public List<Product> getProducts(Authentication authentication) {
        return ProductService.listAllProducts();
    }

    @GetMapping("/products/{id}")
    public Product getProduct(@PathVariable int id, Authentication authentication) {
        Product Product = ProductService.getProduct(id);
        if (Product == null)
            throw new ProductNotFoundException(id);

        return Product;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/products")
    public Product addProduct(@RequestBody Product Product, Authentication authentication) {
        // authentication for sellers only
        // if (roleChecker("ROLE_SELLER", authentication)) {
        // Product.setApproved(false);
        // }
        User user = users.findByUsername(authentication.getName()).orElse(null);
        Shop shop = shops.findByHomeBakerId(user.getId());
        Product.setShopId(shop.getId());
        Product.setShopName(shop.getShopName());
        return ProductService.addProduct(Product);
    }

    @PutMapping("/products/{id}")
    public Product updateProduct(@PathVariable int id, @RequestBody Product newProductInfo,
            Authentication authentication) {

        Product Product = ProductService.getProduct(id);
        if (Product == null)
            throw new ProductNotFoundException(id);
        // update using service
        // if (roleChecker("ROLE_SELLER", authentication)) {
        // Product = ProductService.updateProduct(id, newProductInfo);
        // } else {
        // Product = ProductService.analystProductUpdate(id, newProductInfo);
        // }

        return Product;
    }

    @DeleteMapping("/products/{id}")
    public void deleteProduct(@PathVariable int id) {
        try {
            ProductService.deleteProduct(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ProductNotFoundException(id);
        }
    }

    private boolean roleChecker(String expectedRole, Authentication authentication) {
        return expectedRole.equals(authentication.getAuthorities().iterator().next().toString());
    }
}