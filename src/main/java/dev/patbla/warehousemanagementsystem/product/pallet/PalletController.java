package dev.patbla.warehousemanagementsystem.product.pallet;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "api/v1/pallets")
public class PalletController {

    private final PalletRepository palletRepository;

    public PalletController(PalletRepository palletRepository) {
        this.palletRepository = palletRepository;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('administrator systemu')")
    public ResponseEntity<List<Pallet>> findAll() {
        return ResponseEntity.ok(palletRepository.findAll());
    }
}