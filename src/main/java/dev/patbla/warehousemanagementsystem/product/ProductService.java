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
        var category = categoryRepository.findCategoryByName(productToFormDto.getCategory()).orElseThrow();
        var unit = unitRepository.findUnitByName(productToFormDto.getUnit()).orElseThrow();
        var productToAdd = Product.builder()
                .index(productToFormDto.getIndex())
                .name(productToFormDto.getName())
                .ean(productToFormDto.getEan())
                .category(category)
                .unit(unit)
                .build();
        productRepository.save(productToAdd);
        var quantity = new Quantity(productToFormDto.getInCollectivePackage(), productToFormDto.getStackedOnPallet(),
                productToFormDto.getMinimumLevelOfStocks());
        productToAdd.setQuantity(quantity);

        if (!productToFormDto.getPreferredPalletType().equals("")) {
            productToAdd.setPreferredPalletType(palletRepository.findPalletByName(productToFormDto.getPreferredPalletType()).orElseThrow());
        }

        if (!productToFormDto.getPackagingType().equals("")) {
            productToAdd.setPackagingType(packagingTypeRepository.findPackagingTypeByName(productToFormDto.getPackagingType()).orElseThrow());
        }
    }

    @Transactional
    public void updateProduct(Long id, ProductToFormDto productToFormDto) {
        var category = categoryRepository.findCategoryByName(productToFormDto.getCategory()).orElseThrow();
        var product = productRepository.findById(id).orElseThrow();
        product.setIndex(productToFormDto.getIndex());
        product.setName(productToFormDto.getName());
        product.setEan(productToFormDto.getEan());
        product.setCategory(category);
    }
}