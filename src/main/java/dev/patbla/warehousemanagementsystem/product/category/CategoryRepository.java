package dev.patbla.warehousemanagementsystem.product.category;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findCategoryByName(String name);
}