package dev.patbla.warehousemanagementsystem.product.unit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface UnitRepository extends JpaRepository<Unit, Long> {
    Optional<Unit> findUnitByName(String name);
}