package dev.patbla.warehousemanagementsystem.product;

import dev.patbla.warehousemanagementsystem.product.category.CategoryRepository;
import dev.patbla.warehousemanagementsystem.product.dtos.ProductToFormDto;
import dev.patbla.warehousemanagementsystem.product.packagingtype.PackagingTypeRepository;
import dev.patbla.warehousemanagementsystem.product.pallet.PalletRepository;
import dev.patbla.warehousemanagementsystem.product.quantity.Quantity;
import dev.patbla.warehousemanagementsystem.product.unit.UnitRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final UnitRepository unitRepository;
    private final PackagingTypeRepository packagingTypeRepository;
    private final PalletRepository palletRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository, UnitRepository unitRepository, PackagingTypeRepository packagingTypeRepository, PalletRepository palletRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.unitRepository = unitRepository;
        this.packagingTypeRepository = packagingTypeRepository;
        this.palletRepository = palletRepository;
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
}