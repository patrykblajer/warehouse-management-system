package dev.patbla.warehousemanagementsystem.product.packagingtype;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PackagingTypeRepository extends JpaRepository<PackagingType, Long> {
    Optional<PackagingType> findPackagingTypeByName(String name);
}