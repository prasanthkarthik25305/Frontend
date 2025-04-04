package Inventory.src.Inventory;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Utility class for database operations
 */
public class DatabaseUtil {
    // Database connection settings - update with your actual settings
    private static final String DB_URL = "jdbc:mysql://localhost:3306/IMS";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "Opkv@1754"; // Use your actual password
    
    static {
        try {
            // Load the JDBC driver
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            throw new RuntimeException("Failed to load MySQL JDBC driver", e);
        }
    }
    
    /**
     * Get a connection to the database
     * 
     * @return Connection object
     * @throws SQLException if a database error occurs
     */
    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
    }
    
    /**
     * Close the connection quietly
     * 
     * @param conn Connection to close
     */
    public static void closeQuietly(AutoCloseable closeable) {
        if (closeable != null) {
            try {
                closeable.close();
            } catch (Exception e) {
                // Log this but don't propagate
                e.printStackTrace();
            }
        }
    }
}
