package com.huynhvanhoa.exercise01.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="products")
public class Product {
    //Ten trong entity phai trung voi ten truong co so du lieu
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ProductID;
    
    @Column(nullable = false, unique = true, length = 50)
    private String product_sku;
    
    @Column(nullable = false, length = 100)
    private String product_name;
    
    @Column(nullable = false)
    private float product_price;
    
    @Column( nullable = false)
    private float product_weight;
    
    @Column(nullable = false, length = 250)
    private String product_cart_desc;
    
    @Column(nullable = false, length = 1000)
    private String product_short_desc;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String product_long_desc;
    
    @Column(nullable = false, length = 100) 
    private String product_thumb;
    
    @Column(nullable = false, length = 100) 
    private String product_image;
    
    @Column(nullable = false)
    private int product_category_id;
    
    @Column(nullable = false)
    private LocalDateTime product_update_date;
    
    @Column(nullable = false) 
    private float product_stock;
    
    @Column(nullable = false)
    private boolean product_live;
    
    @Column(nullable = false)
    private boolean product_unlimited;
    
    @Column(nullable = false, length = 250)
    private String product_location;
}
