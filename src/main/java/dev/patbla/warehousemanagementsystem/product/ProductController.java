package dev.patbla.warehousemanagementsystem.product;

import dev.patbla.warehousemanagementsystem.product.dtos.ProductToFormDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "api/v1/products")
public class ProductController {

    private final ProductRepository productRepository;
    private final ProductService productService;

    public ProductController(ProductRepository productRepository, ProductService productService) {
        this.productRepository = productRepository;
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> findAll() {
        return ResponseEntity.ok(productRepository.findAllProducts());
    }

    @PostMapping
    public ResponseEntity<Object> addProduct(@RequestBody ProductToFormDto productToFormDto) {
        productService.addProduct(productToFormDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productRepository.findById(id).orElseThrow());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Object> updateProduct(@PathVariable Long id, @RequestBody ProductToFormDto productToFormDto) {
        productService.updateProduct(id, productToFormDto);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}