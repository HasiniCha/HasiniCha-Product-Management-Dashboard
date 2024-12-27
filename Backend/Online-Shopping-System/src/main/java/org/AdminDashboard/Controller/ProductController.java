package org.AdminDashboard.Controller;

import org.AdminDashboard.DTO.ProductDTO;
import org.AdminDashboard.Models.CategoryName;
import org.AdminDashboard.Services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Get all products
    @GetMapping
    public List<ProductDTO> getAllProducts() {
        return productService.getAllProducts();
    }

    // Get a single product by ID
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        ProductDTO productDTO = productService.getProductById(id);
        return productDTO != null ? ResponseEntity.ok(productDTO) : ResponseEntity.notFound().build();
    }

    // Add a new product
    @PostMapping
    public ResponseEntity<ProductDTO> addProduct(@RequestBody ProductDTO productDTO) {
        ProductDTO savedProductDTO = productService.addProduct(productDTO);
        return ResponseEntity.ok(savedProductDTO);
    }

    // Update an existing product by ID
    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        ProductDTO updatedProductDTO = productService.updateProduct(id, productDTO);
        return updatedProductDTO != null ? ResponseEntity.ok(updatedProductDTO) : ResponseEntity.notFound().build();
    }

    // Delete a product by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        return productService.deleteProduct(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
    @GetMapping("/categories")
    public CategoryName[] getCategories() {
        return CategoryName.values();
    }
}
