package dev.patbla.warehousemanagementsystem.product;

import dev.patbla.warehousemanagementsystem.product.domain.ProductFacade;
import dev.patbla.warehousemanagementsystem.product.domain.dtos.ProductToFormDto;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/products")
class ProductController {

    private final ProductFacade facade;

    @GetMapping
    @PreAuthorize("hasAuthority('administrator systemu')")
    public ResponseEntity<List<?>> findAll() {
        return ResponseEntity.ok(facade.findAllProducts());
    }

    @PostMapping
    @PreAuthorize("hasAuthority('administrator systemu')")
    public ResponseEntity<Object> addProduct(@Valid @RequestBody ProductToFormDto productToFormDto) {
        facade.addNewProduct(productToFormDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{id}")
    ResponseEntity<Object> findProductById(@PathVariable Long id) {
        return ResponseEntity.ok(facade.findProductById(id));
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasAuthority('administrator systemu')")
    public ResponseEntity<Object> updateProduct(@PathVariable Long id, @RequestBody ProductToFormDto productToFormDto) {
        facade.updateProduct(id, productToFormDto);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('administrator systemu')")
    public ResponseEntity<Object> deleteProduct(@PathVariable Long id) {
        facade.deleteProductById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/properties")
    @PreAuthorize("hasAuthority('administrator systemu')")
    public ResponseEntity<Object> getProductProperties() {
        return ResponseEntity.ok(facade.getProductProperties());
    }

    @GetMapping("/stats")
    @PreAuthorize("hasAuthority('administrator systemu')")
    public ResponseEntity<Object> getCountAvailableProducts() {
        return ResponseEntity.ok(facade.getAvailableProducts());
    }
}