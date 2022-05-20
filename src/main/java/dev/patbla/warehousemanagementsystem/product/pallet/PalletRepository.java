package dev.patbla.warehousemanagementsystem.product.pallet;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PalletRepository extends JpaRepository<Pallet, Long> {

    Optional<Pallet> findPalletByName(String name);
}