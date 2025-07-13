package Inventory.src.Inventory;
/**
 * Represents a product in the inventory management system
 */
public class Product {
    private String id;
    private String products;
    private String category;
    private String name;
    private String brand;
    private int cost;
    private int quantity;
    
    // Default constructor
    public Product() {
    }
    
    // Full constructor
    public Product(String id, String products, String category, String name, String brand, int cost, int quantity) {
        this.id = id;
        this.products = products;
        this.category = category;
        this.name = name;
        this.brand = brand;
        this.cost = cost;
        this.quantity = quantity;
    }
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getProducts() {
        return products;
    }
    
    public void setProducts(String products) {
        this.products = products;
    }
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getBrand() {
        return brand;
    }
    
    public void setBrand(String brand) {
        this.brand = brand;
    }
    
    public int getCost() {
        return cost;
    }
    
    public void setCost(int cost) {
        this.cost = cost;
    }
    
    public int getQuantity() {
        return quantity;
    }
    
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    
    @Override
    public String toString() {
        return "Product [id=" + id + ", products=" + products + ", category=" + category + ", name=" + name + ", brand="
                + brand + ", cost=" + cost + ", quantity=" + quantity + "]";
    }
}
