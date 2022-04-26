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

    public void addProduct(ProductDto productDto) {
        var product = Product.builder()
                .index(productDto.getIndex())
                .name(productDto.getName())
                .ean(productDto.getEan())
                .category(categoryRepository.findCategoryByName(productDto.getCategory()))
                .build();
        productRepository.save(product);
    }

    @Transactional
    public void updateProduct(Long id, ProductDto productDto) {
        var product = productRepository.findById(id).orElseThrow();
        product.setIndex(productDto.getIndex());
        product.setName(productDto.getName());
        product.setEan(productDto.getEan());
        product.setCategory(categoryRepository.findCategoryByName(productDto.getCategory()));
    }
}