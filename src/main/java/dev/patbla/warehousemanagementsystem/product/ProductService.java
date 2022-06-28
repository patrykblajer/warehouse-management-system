package dev.patbla.warehousemanagementsystem.product;

import dev.patbla.warehousemanagementsystem.product.category.CategoryRepository;
import dev.patbla.warehousemanagementsystem.product.dtos.ProductToFormDto;
import dev.patbla.warehousemanagementsystem.product.packagingtype.PackagingTypeRepository;
import dev.patbla.warehousemanagementsystem.product.pallet.PalletRepository;
import dev.patbla.warehousemanagementsystem.product.quantity.Quantity;
import dev.patbla.warehousemanagementsystem.product.unit.UnitRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final UnitRepository unitRepository;
    private final PackagingTypeRepository packagingTypeRepository;
    private final PalletRepository palletRepository;
    private final JdbcTemplate jdbcTemplate;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository, UnitRepository unitRepository, PackagingTypeRepository packagingTypeRepository, PalletRepository palletRepository, JdbcTemplate jdbcTemplate) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.unitRepository = unitRepository;
        this.packagingTypeRepository = packagingTypeRepository;
        this.palletRepository = palletRepository;
        this.jdbcTemplate = jdbcTemplate;
    }

    @Transactional
    public void addProduct(ProductToFormDto productToFormDto) {
        var category = categoryRepository.findCategoryByName(productToFormDto.getCategory().getName()).orElseThrow();
        var unit = unitRepository.findUnitByName(productToFormDto.getUnit().getName()).orElseThrow();
        var productToAdd = Product.builder()
                .index(productToFormDto.getIndex())
                .name(productToFormDto.getName())
                .ean(productToFormDto.getEan())
                .description(productToFormDto.getDescription())
                .category(category)
                .unit(unit)
                .build();
        productRepository.save(productToAdd);
        var quantity = new Quantity(productToFormDto.getInCollectivePackage(), productToFormDto.getStackedOnPallet(),
                productToFormDto.getMinimumLevelOfStocks());
        productToAdd.setQuantity(quantity);

        if (productToFormDto.getPreferredPalletType().getName() != null) {
            productToAdd.setPreferredPalletType(palletRepository.findPalletByName(productToFormDto.getPreferredPalletType().getName()).orElseThrow());
        }

        if (productToFormDto.getPackagingType().getName() != null) {
            productToAdd.setPackagingType(packagingTypeRepository.findPackagingTypeByName(productToFormDto.getPackagingType().getName()).orElseThrow());
        }
    }

    @Transactional
    public void updateProduct(Long id, ProductToFormDto productToFormDto) {
        var category = categoryRepository.findCategoryByName(productToFormDto.getCategory().getName()).orElseThrow();
        var product = productRepository.findById(id).orElseThrow();
        var unit = unitRepository.findUnitByName(productToFormDto.getUnit().getName()).orElseThrow();
        product.setIndex(productToFormDto.getIndex());
        product.setName(productToFormDto.getName());
        product.setEan(productToFormDto.getEan());
        product.setCategory(category);
        product.setUnit(unit);
        product.setDescription(productToFormDto.getDescription());

        product.getQuantity().setInCollectivePackage(productToFormDto.getInCollectivePackage());
        product.getQuantity().setMinimumLevelOfStocks(productToFormDto.getMinimumLevelOfStocks());
        product.getQuantity().setStackedOnPallet(productToFormDto.getStackedOnPallet());

        if (productToFormDto.getPreferredPalletType() != null) {
            product.setPreferredPalletType(palletRepository.findPalletByName(productToFormDto.getPreferredPalletType().getName()).orElseThrow());
        }

        if (productToFormDto.getPackagingType() != null) {
            product.setPackagingType(packagingTypeRepository.findPackagingTypeByName(productToFormDto.getPackagingType().getName()).orElseThrow());
        }
    }

    public Map<String, List<Map<String, Object>>> getProductProperties() {
        List<Map<String, Object>> units = jdbcTemplate.queryForList("SELECT * FROM Unit unit");
        List<Map<String, Object>> categories = jdbcTemplate.queryForList("SELECT * FROM Category category");
        List<Map<String, Object>> packagingTypes = jdbcTemplate.queryForList("SELECT * FROM Packaging_Type pt");
        List<Map<String, Object>> palletTypes = jdbcTemplate.queryForList("SELECT * FROM Pallet pallet");
        Map<String, List<Map<String, Object>>> options = new HashMap<>();
        options.put("units", units);
        options.put("categories", categories);
        options.put("packagingTypes", packagingTypes);
        options.put("palletTypes", palletTypes);
        return options;
    }

    public Map<String, Integer> getAvailableProducts() {
        Integer availableProductCounter
                = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM Quantity quantity WHERE quantity.available > 0", Integer.class);
        Map<String, Integer> stats = new HashMap<>();
        stats.put("availableProducts", availableProductCounter);
        return stats;
    }
}