package dev.patbla.warehousemanagementsystem.product;

import dev.patbla.warehousemanagementsystem.product.dtos.ProductToFormDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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
    @PreAuthorize("hasAuthority('administrator')")
    public ResponseEntity<List<Product>> findAll() {
        return ResponseEntity.ok(productRepository.findAllProducts());
    }

    @PostMapping
    @PreAuthorize("hasAuthority('administrator')")
    public ResponseEntity<Object> addProduct(@Valid @RequestBody ProductToFormDto productToFormDto) {
        productService.addProduct(productToFormDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productRepository.findById(id).orElseThrow());
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasAuthority('administrator')")
    public ResponseEntity<Object> updateProduct(@PathVariable Long id, @RequestBody ProductToFormDto productToFormDto) {
        productService.updateProduct(id, productToFormDto);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('administrator')")
    public ResponseEntity<Object> deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}