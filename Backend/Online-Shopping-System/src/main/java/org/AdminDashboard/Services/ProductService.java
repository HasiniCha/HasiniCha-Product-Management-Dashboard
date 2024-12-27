package org.AdminDashboard.Services;



import org.AdminDashboard.DTO.ProductDTO;
import org.AdminDashboard.Models.CategoryName;
import org.AdminDashboard.Models.Product;
import org.AdminDashboard.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ProductDTO getProductById(Long id) {
        Optional<Product> productOptional = productRepository.findById(id);
        return productOptional.map(this::convertToDTO).orElse(null);
    }

    public ProductDTO addProduct(ProductDTO productDTO) {
        Product product = convertToEntity(productDTO);
        Product savedProduct = productRepository.save(product);
        return convertToDTO(savedProduct);
    }

    public ProductDTO updateProduct(Long id, ProductDTO productDTO) {
        if (productRepository.existsById(id)) {
            Product product = convertToEntity(productDTO);
            product.setId(id);
            Product updatedProduct = productRepository.save(product);
            return convertToDTO(updatedProduct);
        }
        return null;
    }

    public boolean deleteProduct(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private ProductDTO convertToDTO(Product product) {
        return new ProductDTO(
                product.getId(),
                product.getTitle(),
                product.getDescription(),
                product.getCategory().name(),
                product.getPrice(),
                product.getImage(),
                product.getRating()
        );
    }

    private Product convertToEntity(ProductDTO productDTO) {
        CategoryName category = CategoryName.valueOf(productDTO.getCategory().toUpperCase());
        return new Product(
                productDTO.getId(),
                productDTO.getTitle(),
                productDTO.getDescription(),
                category,
                productDTO.getPrice(),
                productDTO.getImage(),
                productDTO.getRating()
        );
    }

}
