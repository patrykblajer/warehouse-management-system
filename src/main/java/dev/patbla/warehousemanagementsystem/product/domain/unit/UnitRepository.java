package dev.patbla.warehousemanagementsystem.product.domain.unit;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UnitRepository extends JpaRepository<Unit, Long> {
    Optional<Unit> findUnitByName(String name);
}