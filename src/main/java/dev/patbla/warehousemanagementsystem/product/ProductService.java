package dev.patbla.warehousemanagementsystem.product;

import dev.patbla.warehousemanagementsystem.product.dtos.ProductDto;
import org.springframework.stereotype.Service;


@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product addProduct(Product product) {
        productRepository.save(product);
        return product;
    }
}