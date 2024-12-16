
---

# ShopRight

Welcome to **ShopRight**, the ultimate e-commerce platform for all your shopping needs. This project provides a modern, responsive shopping experience with features like product browsing, cart management, wishlist functionality, user authentication, and more.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technologies Used](#technologies-used)
3. [API Endpoints](#api-endpoints)
4. [Folder Structure](#folder-structure)
5. [Features](#features)
6. [How to Run the Project](#how-to-run-the-project)
7. [Future Improvements](#future-improvements)
8. [Contact](#contact)

---

## Project Overview

ShopRight is built with a focus on simplicity, scalability, and modern design. It incorporates the following core features:
- **Product Listing** with filtering and sorting options.
- **Single Product View** with size selection, quantity adjustment, and Add to Cart/Wishlist functionality.
- **Cart Management** with dynamic quantity updates and removal of items.
- **Wishlist Management** to save favorite products.
- **User Authentication** for Login and Registration.
- **Responsive Design** ensuring usability across all devices.
- **Protected Routes** for secure access.
- **Toast Notifications** for user feedback.
- **Shimmer Loading Effects** for better user experience during API calls.

---

## Technologies Used

### Frontend
- **React**: For building the user interface.
- **Zustand**: For state management (cart, wishlist, and authentication).
- **Tailwind CSS**: For fast and customizable styling.
- **Vite**: For efficient development and build setup.
- **EnqueueBar**: For toast notifications.
- **Font Awesome**: For scalable icons.

### Backend
- **MongoDB**: Planned database integration for persistent storage.

### Tools & Utilities
- **React Router**: For smooth navigation.
- **Axios**: For handling API calls.

---

## API Endpoints

This project uses [Fake Store API](https://fakestoreapi.com) for fetching product and category data.

| Endpoint                           | Method | Description                           |
|------------------------------------|--------|---------------------------------------|
| `/products`                        | GET    | Fetch all products                    |
| `/products/{id}`                   | GET    | Fetch a single product by ID          |
| `/products/categories`             | GET    | Fetch all product categories          |

---

## Folder Structure

```
src
├── assets
│   └── logo.webp              # ShopRight logo
├── components
│   ├── Header.jsx             # Header component
│   ├── Footer.jsx             # Footer component
│   ├── LoadingComponent.jsx   # Shimmer/loading effect
│   ├── FilterComponent.jsx    # Filter UI component
│   ├── Rating.jsx             # Star rating display
│   ├── ProtectedRoute.jsx     # Wrapper for protected routes
├── pages
│   ├── Cart.jsx               # Cart page
│   ├── LoginPage.jsx          # Login page
│   ├── RegisterPage.jsx       # Registration page
│   ├── ProductListing.jsx     # Product listing with filters/sorting
│   ├── SingleProduct.jsx      # Single product view
│   ├── WishlistPage.jsx       # Wishlist page
├── services
│   └── fakestore.js           # API calls for products
├── store
│   ├── authStore.js           # Zustand store for authentication
│   ├── cartStore.js           # Zustand store for cart management
│   └── wishlistStore.js       # Zustand store for wishlist management
├── utils
│   └── persistStore.js        # Zustand persistence utility
├── styles
│   └── tailwind.css           # Tailwind setup
├── App.jsx                    # Main App component
├── main.jsx                   # Entry point
```

---

## Features

### Header
- Fixed navigation bar with links to:
  - **Home**: Redirects to the Product Listing page.
  - **Cart**: View cart items.
  - **Wishlist**: View saved favorite products.
  - **Login**: User authentication.

### Product Pages
- **Product Listing**: View products with filtering and sorting options.
- **Single Product View**:
  - Product details.
  - Size selection (Small, Medium, Large).
  - Quantity adjustment.
  - Add to Cart/Wishlist.

### Cart Management
- View cart items, total cost, and adjust quantities dynamically.

### Wishlist Management
- Add/remove products to/from the wishlist.

### Authentication
- Simple **Login** and **Registration** system with `localStorage` for storing user data.

### Loading States
- **Shimmer Loading Effect** during API calls for a smooth user experience.

### Toast Notifications
- Feedback for actions like "Add to Cart" or "Wishlist."

---

## How to Run the Project

### Prerequisites
Ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/rakeshroshanray/E-Commerce_Assignment.git
   cd ecommerce-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the app in your browser at:
   ```text
   http://localhost:5173
   ```

---

## Future Improvements

- **Backend Integration**:
  - Connect to MongoDB for persistent storage.
  - User profiles and order history management.

- **Advanced Features**:
  - Payment Gateway Integration (e.g., Stripe or Razorpay).
  - Real-time inventory updates.
  - Product Reviews and Ratings.

- **Performance**:
  - Optimize loading times and API calls.

---

## Contact

For any inquiries or feedback, feel free to contact me:

- **Email**: [rakeshroshan878@gmail.com](mailto:rakeshroshan878@gmail.com)
- **LinkedIn**: [Rakesh Roshan](https://linkedin.com/in/rakeshroshan)
- **LeetCode**: [Rakesh Roshan's Profile](https://leetcode.com/u/rakesh878/)

---

&copy; 2024 Rakesh Roshan. All rights reserved.

---
