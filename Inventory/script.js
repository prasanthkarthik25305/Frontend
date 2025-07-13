// API Configuration
const API_BASE_URL = 'http://localhost:8080/Inventory';

// Mock data for testing when backend is not available
const mockProducts = [
  {
    id: '1',
    products: 'Chocolate Cone',
    category: 'Dairy',
    name: 'Chocolate Cone',
    brand: 'Cornetto',
    cost: 90,
    quantity: 2
  },
  {
    id: '2',
    products: 'Vanilla Cookie',
    category: 'Dairy',
    name: 'Vanilla Cookie',
    brand: 'Breyers',
    cost: 75,
    quantity: 12
  },
  {
    id: '3',
    products: 'Strawberry Shortcake',
    category: 'Dairy',
    name: 'Strawberry Shortcake',
    brand: 'Good Humor',
    cost: 85,
    quantity: 8
  },
  {
    id: '4',
    products: 'Mint Chocolate Chip',
    category: 'Dairy',
    name: 'Mint Chocolate Chip',
    brand: 'Häagen-Dazs',
    cost: 120,
    quantity: 15
  },
  {
    id: '5',
    products: 'Coffee Crunch',
    category: 'Dairy',
    name: 'Coffee Crunch',
    brand: 'Ben & Jerry\'s',
    cost: 135,
    quantity: 4
  },
  {
    id: '6',
    products: 'Mango Sorbet',
    category: 'Non-Dairy',
    name: 'Mango Sorbet',
    brand: 'Ciao Bella',
    cost: 95,
    quantity: 7
  },
  {
    id: '7',
    products: 'Coconut Milk Ice Cream',
    category: 'Non-Dairy',
    name: 'Coconut Milk Ice Cream',
    brand: 'So Delicious',
    cost: 110,
    quantity: 9
  }
];

// State Management
let products = [];
let filteredProducts = [];
let selectedProduct = null;






// DOM Elements
const productsTableBody = document.getElementById('productsTableBody');
const productsGrid = document.getElementById('productsGrid');
const viewProductBtn = document.getElementById('viewProductBtn');
const productIdInput = document.getElementById('productIdInput');
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const addProductBtn = document.getElementById('addProductBtn');
const updateProductBtn = document.getElementById('updateProductBtn');
const deleteProductBtn = document.getElementById('deleteProductBtn');
const exportCsvBtn = document.getElementById('exportCsvBtn');
const refreshBtn = document.getElementById('refreshBtn');
const viewBtns = document.querySelectorAll('.view-btn');
const viewContents = document.querySelectorAll('.view-content');
const applyFilterBtn = document.getElementById('applyFilterBtn');
const resetFilterBtn = document.getElementById('resetFilterBtn');

// Modal Elements
const addProductModal = document.getElementById('addProductModal');
const updateProductModal = document.getElementById('updateProductModal');
const deleteProductModal = document.getElementById('deleteProductModal');
const viewProductModal = document.getElementById('viewProductModal');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// Forms
const addProductForm = document.getElementById('addProductForm');
const updateProductForm = document.getElementById('updateProductForm');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const logoutSection = document.getElementById("logoutSection");
    const loginError = document.getElementById("loginError");
    const loggedInUser = document.getElementById("loggedInUser");
    const container = document.querySelector(".container");

    // Admin buttons
    const addProductBtn = document.getElementById("addProductBtn");
    const updateProductBtn = document.querySelector("#updateProductModal .submit-btn");
    const deleteProductBtn = document.getElementById("confirmDeleteBtn");

    // Mock user database
    const users = {
        "admin": { password: "admin123", role: "admin" },
        "user": { password: "user123", role: "user" }
    };

    function checkAuth() {
        console.log("Running checkAuth()...");

        const username = sessionStorage.getItem("username");
        const role = sessionStorage.getItem("role");

        console.log("Stored Username:", username);
        console.log("Stored Role:", role);

        if (username) {
            console.log("User is logged in.");
            loginForm.style.display = "none"; 
            container.style.display = "block";
            logoutSection.style.display = "block";

            loggedInUser.textContent = username;

            if (role === "admin") {
                console.log("User is admin, enabling buttons.");
                enableAdminButtons();
            } else {
                console.log("User is NOT admin, disabling buttons.");
                disableAdminButtons();
            }

            waitForProductsAndSetup(); // Ensure products are ready
        } else {
            console.log("No user logged in, hiding main content.");
            loginForm.style.display = "flex"; 
            container.style.display = "none"; 
            logoutSection.style.display = "none"; 

            disableAdminButtons();
        }
    }

    function disableAdminButtons() {
        if (addProductBtn) addProductBtn.disabled = true;
        if (updateProductBtn) updateProductBtn.disabled = true;
        if (deleteProductBtn) deleteProductBtn.disabled = true;
    }

    function enableAdminButtons() {
        if (addProductBtn) addProductBtn.disabled = false;
        updateButtonStates(); // Ensure selection affects buttons correctly
    }

    function setupProductSelection() {
        console.log("⏳ Waiting for products to load...");
    
        const productContainer = document.getElementById("productContainer");
        if (!productContainer) {
            console.error("❌ Error: #productContainer not found!");
            return;
        }

        const checkProducts = setInterval(() => {
            const productRows = document.querySelectorAll(".product");
    
            console.log("📌 Checking for products:", productRows.length);
    
            if (productRows.length > 0) {
                clearInterval(checkProducts); // Stop checking once products exist
                console.log("✅ Products found! Setting up selection...");

                productContainer.addEventListener("click", (event) => {
                    const clickedProduct = event.target.closest(".product");
                    if (!clickedProduct) return;

                    console.log("✅ Product clicked:", clickedProduct);

                    // Remove "selected" class from all products
                    document.querySelectorAll(".product").forEach(p => p.classList.remove("selected"));

                    // Add "selected" class to clicked product
                    clickedProduct.classList.add("selected");

                    updateButtonStates(); // Ensure buttons update correctly
                });

                console.log("✅ Product selection enabled via event delegation.");
            }
        }, 500); // Check every 500ms
    }

    function waitForProductsAndSetup() {
        console.log("⏳ Checking if products exist...");

        const checkProducts = setInterval(() => {
            const productRows = document.querySelectorAll(".product");
            if (productRows.length > 0) {
                clearInterval(checkProducts);
                console.log("✅ Products loaded, setting up selection.");
                setupProductSelection();
            }
        }, 500);
    }

    
    loginBtn.addEventListener("click", () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (users[username] && users[username].password === password) {
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("role", users[username].role);
            checkAuth();
        } else {
            loginError.textContent = "Invalid username or password.";
        }
    });

    logoutBtn.addEventListener("click", () => {
        sessionStorage.clear();
        location.reload();
    });

    checkAuth(); // Check authentication when the page loads
});


// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Load initial data
    loadProducts();
    
    // Set up event listeners
    setupEventListeners();
    
    console.log('Application initialized. Connecting to Java backend at:', API_BASE_URL);
});

// API Functions
async function fetchAllProducts() {
    try {
        console.log('Fetching all products from Java backend...');
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Products fetched successfully:', data.length, 'items');
        return data;
    } catch (error) {
        console.error('Error fetching products from Java backend:', error);
        showToast('Failed to connect to Java backend. Using mock data instead.', 'error');
        return mockProducts;
    }
}

async function fetchProductById(id) {
    try {
        console.log(`Fetching product ID ${id} from Java backend...`);
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        if (!response.ok) {
            if (response.status === 404) {
                console.log(`Product ID ${id} not found in database`);
                return null;
            }
            throw new Error(`Server responded with status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Product fetched successfully:', data);
        return data;
    } catch (error) {
        console.error(`Error fetching product with ID ${id} from Java backend:`, error);
        // Try to find product in mock data
        const product = mockProducts.find(p => p.id === id);
        if (product) {
            showToast('Using mock data as Java backend is not available', 'error');
        }
        return product || null;
    }
}

async function addProduct(product) {
    try {
        console.log('Adding new product to Java backend:', product);

        // Remove 'id' before sending to backend (MySQL will generate it)
        const { id, ...productData } = product;

        const response = await fetch(`${API_BASE_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData), // Send product data without 'id'
        });

        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Product added successfully:', data);
        return data;
    } catch (error) {
        console.error('Error adding product to Java backend:', error);
        showToast('Failed to add product. Java backend is not responding.', 'error');
        return null;
    }
}


async function updateProduct(id, product) {
    try {
        console.log(`Updating product ID ${id} in Java backend:`, product);
        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Product updated successfully:', data);
        return data;
    } catch (error) {
console.error(`Error updating product with ID ${id} in Java backend:`, error);
showToast('Failed to update product. Java backend is not responding.', 'error');
// Mock successful update
const mockResponse = {
    id,
    ...product
};
console.log('Using mock data instead:', mockResponse);
return mockResponse;
}
}
async function deleteProduct(id) {
    try {
        console.log(`Deleting product ID ${id} from Java backend`);
        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: 'DELETE',
        });
if (!response.ok) {
    throw new Error(`Server responded with status: ${response.status}`);
}
console.log(`Product ID ${id} deleted successfully`);
return true;
} catch (error) {
console.error(`Error deleting product with ID ${id} from Java backend:`, error);
showToast('Failed to delete product. Java backend is not responding.', 'error');
return true; // Mock successful deletion
}
}

// UI Functions
async function loadProducts() {
try {
showToast('Loading products...', 'info');
products = await fetchAllProducts();
filteredProducts = [...products];
renderProducts();
showToast('Products loaded successfully', 'success');
} catch (error) {
console.error('Error loading products:', error);
showToast('Error loading products', 'error');
}
}

function renderProducts() {
renderTableView();
renderCardView();
updateButtonStates();
}

function renderTableView() {
productsTableBody.innerHTML = '';

if (filteredProducts.length === 0) {
const row = document.createElement('tr');
row.innerHTML = `
    <td colspan="7" class="text-center">No products found</td>
`;
productsTableBody.appendChild(row);
return;
}

filteredProducts.forEach(product => {
const row = document.createElement('tr');
row.dataset.id = product.id;
if (selectedProduct && selectedProduct.id === product.id) {
    row.classList.add('selected');
}

row.innerHTML = `
    <td>${product.id}</td>
    <td>${product.name}</td>
    <td>${product.brand}</td>
    <td>${product.category}</td>
    <td>${product.cost}</td>
    <td>${product.quantity}</td>
    <td>
        <button class="view-item-btn" data-id="${product.id}">View</button>
    </td>
`;

row.addEventListener('click', () => {
    setSelectedProduct(product);
});

productsTableBody.appendChild(row);
});

// Add event listeners to view buttons
document.querySelectorAll('.view-item-btn').forEach(btn => {
btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const productId = btn.dataset.id;
    const product = products.find(p => p.id === productId);
    if (product) {
        showViewProductModal(product);
    }
});
});
}

function renderCardView() {
productsGrid.innerHTML = '';

if (filteredProducts.length === 0) {
const message = document.createElement('div');
message.className = 'no-products';
message.textContent = 'No products found';
productsGrid.appendChild(message);
return;
}

filteredProducts.forEach(product => {
const card = document.createElement('div');
card.className = 'product-card';
card.dataset.id = product.id;

if (selectedProduct && selectedProduct.id === product.id) {
    card.classList.add('selected');
}

card.innerHTML = `
    <h3>${product.name}</h3>
    <div class="product-info">Brand: ${product.brand}</div>
    <div class="product-info">Category: ${product.category}</div>
    <div class="product-price">Price: $${product.cost}</div>
    <div class="product-quantity">Quantity: ${product.quantity}</div>
`;

card.addEventListener('click', () => {
    setSelectedProduct(product);
});

productsGrid.appendChild(card);
});
}



function setSelectedProduct(product) {
selectedProduct = product;

// Update UI to reflect selection
document.querySelectorAll('.product-card.selected, tr.selected').forEach(el => {
el.classList.remove('selected');
});

const selectedRow = document.querySelector(`tr[data-id="${product.id}"]`);
const selectedCard = document.querySelector(`.product-card[data-id="${product.id}"]`);

if (selectedRow) selectedRow.classList.add('selected');
if (selectedCard) selectedCard.classList.add('selected');

updateButtonStates();
}

function updateButtonStates() {
    const role = sessionStorage.getItem("role");
    //const selectedProduct = document.querySelector(".product.selected");
    
    if (role !== "admin") {
        console.log("🚫 User is NOT an admin. Keeping buttons disabled.");
        updateProductBtn.disabled = true;
        deleteProductBtn.disabled = true;
        return;
    }
    if (!selectedProduct) {
        console.warn("⚠️ No product selected. Keeping buttons disabled.");
    } else {
        console.log("✅ Selected product:", selectedProduct);
    }

    // If the user is not an admin, keep the buttons disabled

    // If user is admin, enable buttons only when a product is selected
    if (selectedProduct) {
        console.log("✅ Admin detected and product selected. Enabling buttons.");
        updateProductBtn.disabled = false;
        deleteProductBtn.disabled = false;
    } else {
        console.log("ℹ️ No product selected. Keeping buttons disabled.");
        updateProductBtn.disabled = true;
        deleteProductBtn.disabled = true;
    }
}

// function updateButtonStates() {
//     if (selectedProduct) {
//     updateProductBtn.disabled = false;
//     deleteProductBtn.disabled = false;
//     } else {
//     updateProductBtn.disabled = true;
//     deleteProductBtn.disabled = true;
//     }
//     }

function showViewProductModal(product) {
const productDetails = document.getElementById('productDetails');
productDetails.innerHTML = `
<div class="product-detail"><strong>ID:</strong> ${product.id}</div>
<div class="product-detail"><strong>Name:</strong> ${product.name}</div>
<div class="product-detail"><strong>Brand:</strong> ${product.brand}</div>
<div class="product-detail"><strong>Category:</strong> ${product.category}</div>
<div class="product-detail"><strong>Cost:</strong> $${product.cost}</div>
<div class="product-detail"><strong>Quantity:</strong> ${product.quantity}</div>
`;

viewProductModal.style.display = 'block';
}

function showAddProductModal() {
addProductForm.reset();
addProductModal.style.display = 'block';
}

function showUpdateProductModal() {
if (!selectedProduct) return;

document.getElementById('updateProductId').value = selectedProduct.id;
document.getElementById('updateProductName').value = selectedProduct.name;
document.getElementById('updateProductBrand').value = selectedProduct.brand;
document.getElementById('updateProductCategory').value = selectedProduct.category;
document.getElementById('updateProductCost').value = selectedProduct.cost;
document.getElementById('updateProductQuantity').value = selectedProduct.quantity;

updateProductModal.style.display = 'block';
}

function showDeleteProductModal() {
if (!selectedProduct) return;

document.getElementById('deleteProductId').textContent = selectedProduct.id;
document.getElementById('deleteProductName').textContent = selectedProduct.name;
document.getElementById('deleteProductBrand').textContent = selectedProduct.brand;
document.getElementById('deleteProductCategory').textContent = selectedProduct.category;

deleteProductModal.style.display = 'block';
}

function showToast(message, type = 'info') {
toastMessage.textContent = message;
toast.className = 'toast show';

if (type === 'success') toast.classList.add('success');
if (type === 'error') toast.classList.add('error');

setTimeout(() => {
toast.className = 'toast';
}, 3000);
}


//
async function checkLowStock() {
    try {
        const response = await fetch('http://localhost:8080/Inventory/products?action=low-stock');
        const products = await response.json();

        if (products.length > 0) {
            let message = "⚠️ Low Stock Alert:\n";
            products.forEach(p => {
                message += `🔸 ${p.name} (Category: ${p.category}, Stock: ${p.quantity})\n`;
            });

            showNotification(message);
        }
    } catch (error) {
        console.error("Error fetching low-stock products:", error);
    }
}

// Function to Show Notification
function showNotification(message) {
    // Show system notification if allowed
    if (Notification.permission === "granted") {
        new Notification("Low Stock Alert", { body: message });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification("Low Stock Alert", { body: message });
            }
        });
    } 
    
    // Always show on-page alert
    showOnPageNotification(message);
}

// Function to show alert inside the webpage
function showOnPageNotification(message) {
    let alertBox = document.getElementById("lowStockAlert");
    
    if (!alertBox) {
        alertBox = document.createElement("div");
        alertBox.id = "lowStockAlert";
        alertBox.style.background = "red";
        alertBox.style.color = "white";
        alertBox.style.padding = "10px";
        alertBox.style.position = "fixed";
        alertBox.style.top = "10px";
        alertBox.style.right = "10px";
        alertBox.style.zIndex = "1000";
        alertBox.style.borderRadius = "5px";
        alertBox.style.fontSize = "14px";
        alertBox.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
        document.body.appendChild(alertBox);
    }
    
    alertBox.innerHTML = `<strong>⚠ Low Stock Alert:</strong> ${message}`;
    
    // Remove alert after 5 seconds
    setTimeout(() => alertBox.remove(), 5000);
}

// Run checkLowStock every 10 seconds
setInterval(checkLowStock, 10000);


function handleSearch() {
const term = searchInput.value.toLowerCase();

filteredProducts = products.filter(product =>
product.name.toLowerCase().includes(term) ||
product.category.toLowerCase().includes(term) ||
product.brand.toLowerCase().includes(term)
);

renderProducts();
}

function handleFilter() {
const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;
const category = document.getElementById('categoryFilter').value.toLowerCase();

filteredProducts = products.filter(product => {
const priceMatch = product.cost >= minPrice && product.cost <= maxPrice;
const categoryMatch = category ? product.category.toLowerCase().includes(category) : true;
return priceMatch && categoryMatch;
});

renderProducts();
showToast(`Showing ${filteredProducts.length} products matching filter criteria`, 'info');
}

function resetFilter() {
document.getElementById('minPrice').value = 0;
document.getElementById('maxPrice').value = 1000;
document.getElementById('categoryFilter').value = '';

filteredProducts = [...products];
renderProducts();
showToast('Filter reset', 'info');
}

function exportToCsv() {
// Create CSV content
let csvContent = 'ID,Name,Brand,Category,Cost,Quantity\n';

filteredProducts.forEach(product => {
csvContent += `${product.id},"${product.name}","${product.brand}","${product.category}",${product.cost},${product.quantity}\n`;
});

// Create download link
const encodedUri = encodeURI('data:text/csv;charset=utf-8,' + csvContent);
const link = document.createElement('a');
link.setAttribute('href', encodedUri);
link.setAttribute('download', 'products.csv');
document.body.appendChild(link);

// Trigger download and cleanup
link.click();
document.body.removeChild(link);
showToast('CSV file exported successfully', 'success');
}

// Event Setup
function setupEventListeners() {
// View switching
viewBtns.forEach(btn => {
btn.addEventListener('click', () => {
    const view = btn.dataset.view;
    
    // Update active button
    viewBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Show active view
    viewContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === `${view}View`) {
            content.classList.add('active');
        }
    });
});
});

// Search functionality
searchInput.addEventListener('input', handleSearch);
clearSearchBtn.addEventListener('click', () => {
searchInput.value = '';
filteredProducts = [...products];
renderProducts();
});

// Filter functionality
applyFilterBtn.addEventListener('click', handleFilter);
resetFilterBtn.addEventListener('click', resetFilter);

// Product ID search
viewProductBtn.addEventListener('click', async () => {
const id = productIdInput.value.trim();
if (!id) {
    showToast('Please enter a product ID', 'error');
    return;
}

const product = await fetchProductById(id);
if (product) {
    showViewProductModal(product);
} else {
    showToast(`No product found with ID: ${id}`, 'error');
}
});

// CRUD operations
addProductBtn.addEventListener('click', showAddProductModal);
updateProductBtn.addEventListener('click', showUpdateProductModal);
deleteProductBtn.addEventListener('click', showDeleteProductModal);

// Modal close buttons
document.querySelectorAll('.close, .cancel-btn, .close-btn').forEach(btn => {
btn.addEventListener('click', () => {
    addProductModal.style.display = 'none';
    updateProductModal.style.display = 'none';
    deleteProductModal.style.display = 'none';
    viewProductModal.style.display = 'none';
});
});

// Form submissions
addProductForm.addEventListener('submit', async (e) => {
e.preventDefault();

const newProduct = {
    name: document.getElementById('productName').value,
    brand: document.getElementById('productBrand').value,
    category: document.getElementById('productCategory').value,
    cost: parseFloat(document.getElementById('productCost').value),
    quantity: parseInt(document.getElementById('productQuantity').value),
    products: document.getElementById('productName').value // For API compatibility
};

try {
    const addedProduct = await addProduct(newProduct);
    products.push(addedProduct);
    filteredProducts = [...products];
    renderProducts();
    addProductModal.style.display = 'none';
    showToast(`${newProduct.name} has been added successfully`, 'success');
} catch (error) {
    console.error('Error adding product:', error);
    showToast('Failed to add product', 'error');
}
});

updateProductForm.addEventListener('submit', async (e) => {
e.preventDefault();

const id = document.getElementById('updateProductId').value;
const updatedProduct = {
    id,
    name: document.getElementById('updateProductName').value,
    brand: document.getElementById('updateProductBrand').value,
    category: document.getElementById('updateProductCategory').value,
    cost: parseFloat(document.getElementById('updateProductCost').value),
    quantity: parseInt(document.getElementById('updateProductQuantity').value),
    products: document.getElementById('updateProductName').value // For API compatibility
};

try {
    await updateProduct(id, updatedProduct);
    
    // Update local data
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index] = updatedProduct;
    }
    
    filteredProducts = filteredProducts.map(p => 
        p.id === id ? updatedProduct : p
    );
    
    selectedProduct = updatedProduct;
    renderProducts();
    updateProductModal.style.display = 'none';
    showToast(`${updatedProduct.name} has been updated successfully`, 'success');
} catch (error) {
    console.error('Error updating product:', error);
    showToast('Failed to update product', 'error');
}
});

confirmDeleteBtn.addEventListener('click', async () => {
if (!selectedProduct) return;

try {
    const success = await deleteProduct(selectedProduct.id);
    if (success) {
        const productName = selectedProduct.name;
        
        // Update local data
        products = products.filter(p => p.id !== selectedProduct.id);
        filteredProducts = filteredProducts.filter(p => p.id !== selectedProduct.id);
        selectedProduct = null;
        
        renderProducts();
        deleteProductModal.style.display = 'none';
        showToast(`${productName} has been deleted successfully`, 'success');
    } else {
        showToast('Failed to delete product', 'error');
    }
} catch (error) {
    console.error('Error deleting product:', error);
    showToast('Failed to delete product', 'error');
}
});

// Refresh button
refreshBtn.addEventListener('click', loadProducts);

// Export button
exportCsvBtn.addEventListener('click', exportToCsv);

function waitForProductsAndSetup() {
    const observer = new MutationObserver(mutations => {
        if (document.querySelector(".product")) {
            console.log("✅ Products found! Setting up selection...");
            observer.disconnect(); // Stop observing once products exist
            setupProductSelection();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}




// Close modals when clicking outside
window.addEventListener('click', (e) => {
if (e.target === addProductModal) addProductModal.style.display = 'none';
if (e.target === updateProductModal) updateProductModal.style.display = 'none';
if (e.target === deleteProductModal) deleteProductModal.style.display = 'none';
if (e.target === viewProductModal) viewProductModal.style.display = 'none';
});
}