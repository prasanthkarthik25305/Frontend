# Inventory Management System (Java + HTML/CSS/JS + MySQL)

A full-stack Inventory Management System built completely from scratch without frameworks. It features a Java backend (Servlets + JDBC + MySQL) and a frontend using only HTML, CSS, and JavaScript. The system is deployed locally on **Apache Tomcat 11** and designed to be easily cloud-deployable.

---

## 🚀 Features

### 🔐 Authentication
- **Admin**: Can add, update, delete products.
- **User**: Can only view, filter, and download products as CSV.

### 📦 Product Management (CRUD)
- Add new products
- Edit existing product details
- Delete products
- View all products

### 📉 Low Stock Alert
- If product quantity < 5:
  - A visible warning is displayed
  - Desktop notification (laptop alert) is triggered

### 📊 Filtering & CSV Export
- Real-time product filtering by name or category
- One-click download of product list as CSV

### 🔗 Tomcat Deployment
- Manual WAR deployment on Apache Tomcat 11
- Servlet integration without Spring Boot

### ☁️ Cloud-Ready
- Easily adaptable to cloud deployment by changing DB username and password

---

## 🛠️ Tech Stack

| Layer       | Technology                     |
|-------------|--------------------------------|
| Frontend    | HTML, CSS, JavaScript         |
| Backend     | Java Servlets, JDBC           |
| Database    | MySQL                         |
| Web Server  | Apache Tomcat 11              |
| Build Tool  | Manual compilation & WAR      |

---

## 🗂️ Project Structure
```
Inventory/
├── src/Inventory/
│   ├── Product.java
│   ├── ProductServlet.java
│   ├── DatabaseUtil.java
│   └── CORSFilter.java
├── WEB-INF/
│   ├── web.xml
│   └── lib/ (gson + json jars)
├── index.html
├── script.js
├── styles.css
```

---

## 📷 Preview
👉 [Attach a video/demo screenshot here]

---

## ✅ Future Improvements
- Login system with sessions/cookies
- Responsive mobile UI
- Hosting on Render/Vercel
- Analytics dashboard (charts using Chart.js or Recharts)

---

## 🧠 Developer Note
> This project was developed while learning Java backend and web technologies line-by-line, without using Spring Boot or frontend libraries. All integrations are manual to build deep understanding.

---

## 📬 Contact
Feel free to reach out or contribute!

---

> Built with ❤️ from Java Swing to Full Web Stack

