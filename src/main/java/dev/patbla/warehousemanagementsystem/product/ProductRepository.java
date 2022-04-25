package dev.patbla.warehousemanagementsystem.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT product FROM Product product " +
            "LEFT JOIN FETCH product.unit unit " +
            "LEFT JOIN FETCH product.quantity quantity " +
            "LEFT JOIN FETCH product.category category " +
            "LEFT JOIN FETCH product.packagingType packagingType " +
            "LEFT JOIN FETCH product.location location")
    List<Product> findAllProducts();
}