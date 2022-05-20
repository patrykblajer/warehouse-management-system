package dev.patbla.warehousemanagementsystem.product.packagingtype;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path = "api/v1/packagingtype")
public class PackagingTypeController {

    private final PackagingTypeRepository packagingTypeRepository;

    public PackagingTypeController(PackagingTypeRepository packagingTypeRepository) {
        this.packagingTypeRepository = packagingTypeRepository;
    }

    @GetMapping
    public ResponseEntity<List<PackagingType>> findAll() {
        return ResponseEntity.ok(packagingTypeRepository.findAll());
    }
}