package dev.patbla.warehousemanagementsystem.product.unit;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "api/v1/units")
public class UnitController {

    public UnitController(UnitRepository unitRepository) {
        this.unitRepository = unitRepository;
    }

    private final UnitRepository unitRepository;

    @GetMapping
    @PreAuthorize("hasAuthority('administrator systemu')")
    public ResponseEntity<List<Unit>> findAll() {
        return ResponseEntity.ok(unitRepository.findAll());
    }
}