package dev.patbla.warehousemanagementsystem.product.domain;

import dev.patbla.warehousemanagementsystem.product.domain.dtos.ProductToFormDto;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Map;

@AllArgsConstructor
public class ProductFacade {

    ProductService productService;

    public void addNewProduct(ProductToFormDto productToFormDto) {
        productService.addNewProduct(productToFormDto);
    }

    public List<Product> findAllProducts() {
        return productService.findAllProducts();
    }

    public Product findProductById(Long id) {
        return productService.findProductById(id);
    }

    public void updateProduct(Long id, ProductToFormDto productToFormDto) {
        productService.updateProduct(id, productToFormDto);
    }

    public void deleteProductById(Long id) {
        productService.deleteProductById(id);
    }

    public Map<String, List<Map<String, Object>>> getProductProperties() {
        return productService.getProductProperties();
    }

    public Map<String, Integer> getAvailableProducts() {
        return productService.getAvailableProducts();
    }
}