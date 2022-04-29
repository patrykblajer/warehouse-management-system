package dev.patbla.warehousemanagementsystem.product;

import dev.patbla.warehousemanagementsystem.product.category.CategoryRepository;
import dev.patbla.warehousemanagementsystem.product.dtos.ProductDto;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Transactional
    public void addProduct(ProductDto productDto) {
        var category = categoryRepository.findCategoryByName(productDto.getCategory()).orElseThrow();
        var product = Product.builder()
                .index(productDto.getIndex())
                .name(productDto.getName())
                .ean(productDto.getEan())
                .category(category)
                .build();
        productRepository.save(product);
    }

    @Transactional
    public void updateProduct(Long id, ProductDto productDto) {
        var category = categoryRepository.findCategoryByName(productDto.getCategory()).orElseThrow();
        var product = productRepository.findById(id).orElseThrow();
        product.setIndex(productDto.getIndex());
        product.setName(productDto.getName());
        product.setEan(productDto.getEan());
        product.setCategory(category);
    }
}