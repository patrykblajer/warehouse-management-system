package dev.patbla.warehousemanagementsystem.product.domain;

import dev.patbla.warehousemanagementsystem.product.domain.category.CategoryRepository;
import dev.patbla.warehousemanagementsystem.product.domain.packagingtype.PackagingTypeRepository;
import dev.patbla.warehousemanagementsystem.product.domain.pallet.PalletRepository;
import dev.patbla.warehousemanagementsystem.product.domain.unit.UnitRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

@Configuration
class ProductConfiguration {

    @Bean
    ProductFacade productFacade(ProductRepository productRepository,
                                CategoryRepository categoryRepository,
                                UnitRepository unitRepository,
                                PackagingTypeRepository packagingTypeRepository,
                                PalletRepository palletRepository,
                                JdbcTemplate jdbcTemplate) {
        ProductService productService = new ProductService(productRepository, categoryRepository, unitRepository,
                packagingTypeRepository, palletRepository, jdbcTemplate);
        return new ProductFacade(productService);
    }
}