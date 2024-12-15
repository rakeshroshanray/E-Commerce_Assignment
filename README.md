# ShopRight

Welcome to **ShopRight**, the ultimate e-commerce platform for all your shopping needs. This project provides a modern, responsive shopping experience with features like product browsing, cart management, wishlist functionality, user authentication, and more.

## Project Overview
ShopRight is built with a focus on simplicity, scalability, and modern design. It incorporates the following core features:
- **Product Listing** with filtering and sorting options.
- **Single Product View** with size selection, quantity adjustment, and Add to Cart/Wishlist functionality.
- **Cart Page** with dynamic quantity updates.
- **Wishlist Management** to save favorite products.
- **User Authentication** for Login and Registration.
- **Protected Routes** for secure access.
- **Responsive Design** to ensure usability across devices.
- **Toast Notifications** for user feedback.
- **Shimmer Loading Effects** for better user experience.

## Technologies Used

### Frontend
- **React**: For building the user interface.
- **Zustand**: For state management (cart, wishlist, and authentication).
- **Tailwind CSS**: For styling the application with minimal effort.
- **EnqueueBar**: For toast notifications.
- **Font Awesome**: For icons, including LeetCode and social media.

### Backend
- **MongoDB**: For database management (to be integrated later).

### Tools & Utilities
- **Vite**: For fast development and building.
- **React Router**: For navigation between pages.

## Folder Structure
```
src
├── assets
│   └── logo.webp          # ShopRight logo
├── components
│   ├── Header.jsx         # Header component
│   ├── Footer.jsx         # Footer component
│   ├── LoadingComponent.jsx # Loading spinner/shimmer component
│   ├── FilterComponent.jsx # Product filter UI
│   ├── Rating.jsx         # Rating component for products
│   ├── ProtectedRoute.jsx # Route protection component
├── pages
│   ├── Cart.jsx           # Cart page
│   ├── LoginPage.jsx      # Login page
│   ├── RegisterPage.jsx   # Registration page
│   ├── ProductListing.jsx # Product listing page with sorting/filtering
│   ├── SingleProduct.jsx  # Single Product view page
│   ├── WishlistPage.jsx   # Wishlist page
├── services
│   └── fakestore.js       # API services for product data
├── store
│   ├── authStore.js       # Zustand store for authentication
│   ├── cartStore.js       # Zustand store for cart management
│   └── wishlistStore.js   # Zustand store for wishlist management
├── utils
│   └── persistStore.js    # Utility for persisting Zustand store
├── styles
│   └── tailwind.css       # Tailwind CSS setup
├── App.jsx                # Main App component
├── main.jsx               # Entry point
```

## Features

### Header
- Fixed at the top with links to Home, Cart, Wishlist, and Login.

### Footer
- Contains brand logo, quick links, contact information, and social media links.
- Includes:
  - **Email**: [rakeshroshan878@gmail.com](mailto:rakeshroshan878@gmail.com)
  - **LeetCode Profile**: [LeetCode](https://leetcode.com/u/rakesh878/)
  - **LinkedIn**: [LinkedIn Profile](https://linkedin.com/in/rakeshroshan)

### Product Pages
- **Product Listing**: Browse products with filtering and sorting options.
- **Single Product View**: View details, select size, adjust quantity, and add to cart or wishlist.

### Cart Management
- Adjust quantities, view total cost, and remove items from the cart.

### Wishlist Management
- Add or remove items from the wishlist.

### Authentication
- Simple Login and Registration.
- User data is stored in `localStorage` for this project.

### Protected Routes
- Secure routes for authenticated users.

### Loading States
- **Shimmer Loading Effect**: Used on pages and product cards during API calls.

## How to Run the Project

### Prerequisites
Ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/rakeshroshanray/E-Commerce_Assignment.git cd ecommerce-platform
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the app in your browser at `http://localhost:5173`.

## Future Improvements
- Backend Integration:
  - Connect to MongoDB for persistent storage.
  - Use TypeScript for backend development.
- Advanced Features:
  - Payment Gateway Integration.
  - User Profile and Order History.
  - Real-time inventory updates.

## Contact
For any inquiries, contact:
- **Email**: [rakeshroshan878@gmail.com](mailto:rakeshroshan878@gmail.com)
- **LinkedIn**: [Rakesh Roshan](https://linkedin.com/in/rakeshroshan)
- **LeetCode**: [Profile](https://leetcode.com/u/rakesh878/)

---

&copy; {new Date().getFullYear()} Rakesh Roshan. All rights reserved.

