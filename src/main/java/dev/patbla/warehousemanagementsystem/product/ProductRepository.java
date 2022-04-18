package dev.patbla.warehousemanagementsystem.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT DISTINCT product FROM Product product JOIN FETCH product.quantity quantity")
    List<Product> findAllProducts();
}