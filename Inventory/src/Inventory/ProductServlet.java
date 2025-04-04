package Inventory.src.Inventory;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.sql.Statement;

@WebServlet("/products/*")
public class ProductServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    // Database connection settings - update with your actual settings
    private String dbUrl = "jdbc:mysql://localhost:3306/IMS";
    private String dbUser = "root";
    private String dbPassword = "Opkv@1754"; // Use your actual password

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        enableCors(response);  // Enable CORS
        response.setContentType("application/json");
        
        String pathInfo = request.getPathInfo();
        String action = request.getParameter("action");  // Get 'action' parameter from request
        PrintWriter out = response.getWriter();
        
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");  // Load the MySQL JDBC driver
            
            if (pathInfo != null && pathInfo.length() > 1) {
                String productId = pathInfo.substring(1);  // Extract product ID
                getProductById(out, productId, response);
            } 
            // Check if action is 'low-stock'
            else if ("low-stock".equals(action)) {
                getLowStockProducts(out, response);
            }
            // Default: Fetch all products
            else {
                getAllProducts(out, response);
            }
        } catch (ClassNotFoundException e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"error\": \"Database driver not found\"}");
            e.printStackTrace();
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"error\": \"" + e.getMessage() + "\"}");
            e.printStackTrace();
        }
    }
    
    
    private void getAllProducts(PrintWriter out, HttpServletResponse response) {
        try (Connection conn = DriverManager.getConnection(dbUrl, dbUser, dbPassword)) {
            String sql = "SELECT * FROM Product ORDER BY ID ASC";
            try (PreparedStatement stmt = conn.prepareStatement(sql);
                 ResultSet rs = stmt.executeQuery()) {
                
                JSONArray jsonArray = new JSONArray();
                
                while (rs.next()) {
                    JSONObject jsonObject = new JSONObject();
                    jsonObject.put("id", rs.getString("ID"));
                    jsonObject.put("products", rs.getString("Products"));
                    jsonObject.put("category", rs.getString("Category"));
                    jsonObject.put("name", rs.getString("Name"));
                    jsonObject.put("brand", rs.getString("Brand"));
                    jsonObject.put("cost", rs.getInt("Cost"));
                    jsonObject.put("quantity", rs.getInt("Quantity"));
                    jsonArray.put(jsonObject);
                }
                
                out.print(jsonArray.toString());
            }
        } catch (SQLException | JSONException e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"error\": \"Database error: " + e.getMessage() + "\"}");
            e.printStackTrace();
        }
    }
    
    private void getProductById(PrintWriter out, String productId, HttpServletResponse response) {
        try (Connection conn = DriverManager.getConnection(dbUrl, dbUser, dbPassword)) {
            String sql = "SELECT * FROM Product WHERE ID = ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setString(1, productId);
                
                try (ResultSet rs = stmt.executeQuery()) {
                    if (rs.next()) {
                        JSONObject jsonObject = new JSONObject();
                        jsonObject.put("id", rs.getString("ID"));
                        jsonObject.put("products", rs.getString("Products"));
                        jsonObject.put("category", rs.getString("Category"));
                        jsonObject.put("name", rs.getString("Name"));
                        jsonObject.put("brand", rs.getString("Brand"));
                        jsonObject.put("cost", rs.getInt("Cost"));
                        jsonObject.put("quantity", rs.getInt("Quantity"));
                        
                        out.print(jsonObject.toString());
                    } else {
                        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                        out.print("{}"); // Empty JSON object if product not found
                    }
                }
            }
        } catch (SQLException | JSONException e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"error\": \"Database error: " + e.getMessage() + "\"}");
            e.printStackTrace();
        }
    }
    
    @Override
protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    enableCors(response);
    response.setContentType("application/json");
    PrintWriter out = response.getWriter();
    
    try {
        // Read JSON data from request body
        StringBuilder requestBody = new StringBuilder();
        BufferedReader reader = request.getReader();
        String line;
        while ((line = reader.readLine()) != null) {
            requestBody.append(line);
        }
        
        JSONObject productJson = new JSONObject(requestBody.toString());

        // Insert new product into database WITHOUT specifying ID (MySQL will generate it)
        try (Connection conn = DriverManager.getConnection(dbUrl, dbUser, dbPassword)) {
            String sql = "INSERT INTO Product (Products, Category, Name, Brand, Cost, Quantity) VALUES (?, ?, ?, ?, ?, ?)"; 
            // Removed 'ID' from the query
            
            try (PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
                stmt.setString(1, productJson.getString("products"));
                stmt.setString(2, productJson.getString("category"));
                stmt.setString(3, productJson.getString("name"));
                stmt.setString(4, productJson.getString("brand"));
                stmt.setInt(5, productJson.getInt("cost"));
                stmt.setInt(6, productJson.getInt("quantity"));
                
                int rowsAffected = stmt.executeUpdate();
                if (rowsAffected > 0) {
                    // Get the generated ID from MySQL
                    ResultSet generatedKeys = stmt.getGeneratedKeys();
                    if (generatedKeys.next()) {
                        int generatedId = generatedKeys.getInt(1); // Get auto-incremented ID
                        productJson.put("id", generatedId);
                    }
                    out.print(productJson.toString());
                } else {
                    response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                    out.print("{\"error\": \"Failed to insert product\"}");
                }
            }
        }
    } catch (Exception e) {
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        out.print("{\"error\": \"" + e.getMessage() + "\"}");
        e.printStackTrace();
    }
}

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        enableCors(response);
        response.setContentType("application/json");
        
        String pathInfo = request.getPathInfo();
        PrintWriter out = response.getWriter();
        
        if (pathInfo == null || pathInfo.length() <= 1) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print("{\"error\": \"Product ID is required\"}");
            return;
        }
        
        String productId = pathInfo.substring(1); // Remove leading slash
        
        try {
            // Read JSON data from request body
            StringBuilder requestBody = new StringBuilder();
            BufferedReader reader = request.getReader();
            String line;
            while ((line = reader.readLine()) != null) {
                requestBody.append(line);
            }
            
            JSONObject productJson = new JSONObject(requestBody.toString());
            
            // Update product in database
            try (Connection conn = DriverManager.getConnection(dbUrl, dbUser, dbPassword)) {
                // First check if product exists
                String checkSql = "SELECT COUNT(*) FROM Product WHERE ID = ?";
                try (PreparedStatement checkStmt = conn.prepareStatement(checkSql)) {
                    checkStmt.setString(1, productId);
                    ResultSet rs = checkStmt.executeQuery();
                    if (rs.next() && rs.getInt(1) == 0) {
                        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                        out.print("{\"error\": \"Product not found\"}");
                        return;
                    }
                }
                
                // Proceed with update if product exists
                StringBuilder sqlBuilder = new StringBuilder("UPDATE Product SET ");
                boolean hasChanges = false;
                
                if (productJson.has("products")) {
                    sqlBuilder.append("Products = ?, ");
                    hasChanges = true;
                }
                if (productJson.has("category")) {
                    sqlBuilder.append("Category = ?, ");
                    hasChanges = true;
                }
                if (productJson.has("name")) {
                    sqlBuilder.append("Name = ?, ");
                    hasChanges = true;
                }
                if (productJson.has("brand")) {
                    sqlBuilder.append("Brand = ?, ");
                    hasChanges = true;
                }
                if (productJson.has("cost")) {
                    sqlBuilder.append("Cost = ?, ");
                    hasChanges = true;
                }
                if (productJson.has("quantity")) {
                    sqlBuilder.append("Quantity = ?, ");
                    hasChanges = true;
                }
                
                if (!hasChanges) {
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    out.print("{\"error\": \"No fields to update\"}");
                    return;
                }
                
                // Remove trailing comma and space
                String sql = sqlBuilder.substring(0, sqlBuilder.length() - 2) + " WHERE ID = ?";
                
                try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                    int paramIndex = 1;
                    
                    if (productJson.has("products")) {
                        stmt.setString(paramIndex++, productJson.getString("products"));
                    }
                    if (productJson.has("category")) {
                        stmt.setString(paramIndex++, productJson.getString("category"));
                    }
                    if (productJson.has("name")) {
                        stmt.setString(paramIndex++, productJson.getString("name"));
                    }
                    if (productJson.has("brand")) {
                        stmt.setString(paramIndex++, productJson.getString("brand"));
                    }
                    if (productJson.has("cost")) {
                        stmt.setInt(paramIndex++, productJson.getInt("cost"));
                    }
                    if (productJson.has("quantity")) {
                        stmt.setInt(paramIndex++, productJson.getInt("quantity"));
                    }
                    
                    // Set the WHERE clause parameter
                    stmt.setString(paramIndex, productId);
                    
                    int rowsAffected = stmt.executeUpdate();
                    
                    if (rowsAffected > 0) {
                        // Fetch the updated product and return it
                        getProductById(out, productId, response);
                    } else {
                        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                        out.print("{\"error\": \"Product not found or no changes made\"}");
                    }
                }
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print("{\"error\": \"" + e.getMessage() + "\"}");
            e.printStackTrace();
        }
    }

    private void getLowStockProducts(PrintWriter out, HttpServletResponse response) throws SQLException {
    try (Connection conn = DatabaseUtil.getConnection();
         PreparedStatement stmt = conn.prepareStatement("SELECT * FROM Product WHERE Quantity < 5");
         ResultSet rs = stmt.executeQuery()) {

        List<Map<String, Object>> products = new ArrayList<>();
        while (rs.next()) {
            Map<String, Object> product = new HashMap<>();
            product.put("id", rs.getInt("ID"));  // Match column name
            product.put("product", rs.getString("Products"));  // Match column name
            product.put("category", rs.getString("Category"));
            product.put("name", rs.getString("Name"));
            product.put("brand", rs.getString("Brand"));
            product.put("cost", rs.getDouble("Cost"));
            product.put("quantity", rs.getInt("Quantity"));
            products.add(product);
            
        }

        out.print(new Gson().toJson(products));  // Convert list to JSON and send response
        out.flush();
    } catch (SQLException e) {
        response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        out.print("{\"error\": \"" + e.getMessage() + "\"}");
    }
}

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        enableCors(response);
        response.setContentType("application/json");
        
        String pathInfo = request.getPathInfo();
        PrintWriter out = response.getWriter();
        
        if (pathInfo == null || pathInfo.length() <= 1) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print("{\"error\": \"Product ID is required\"}");
            return;
        }
        
        String productId = pathInfo.substring(1); // Remove leading slash
        
        try {
            // Delete product from database
            try (Connection conn = DriverManager.getConnection(dbUrl, dbUser, dbPassword)) {
                String sql = "DELETE FROM Product WHERE ID = ?";
                try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                    stmt.setString(1, productId);
                    
                    int rowsAffected = stmt.executeUpdate();
                    
                    if (rowsAffected > 0) {
                        out.print("{\"success\": true, \"message\": \"Product deleted successfully\"}");
                    } else {
                        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                        out.print("{\"error\": \"Product not found\"}");
                    }
                }
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"error\": \"" + e.getMessage() + "\"}");
            e.printStackTrace();
        }
    }
    
    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Enable CORS
        enableCors(response);
        response.setStatus(HttpServletResponse.SC_OK);
    }
    
    private void enableCors(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setHeader("Access-Control-Max-Age", "3600");
    }
}
