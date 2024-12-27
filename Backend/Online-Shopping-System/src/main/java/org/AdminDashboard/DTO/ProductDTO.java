package org.AdminDashboard.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {

    private Long id;
    private String title;
    private String description;
    private String category;
    private double price;
    private String image;
    private double rating;
}
