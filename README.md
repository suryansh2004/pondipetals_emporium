# Pondipetals Emporium

Welcome to **Pondipetals Emporium**, your one-stop shop for handmade goods! This project is a modern e-commerce web application built using Remix, Zustand (for state management), and a Tailwind CSS-based UI.

## Features

- **Dynamic Product Listing**: Displays a collection of handmade products.
- **Category-Based Filtering**: Users can filter products by category.
- **Shopping Cart Management**: Fetches and manages the shopping cart.
- **Responsive UI**: Uses Tailwind CSS for a seamless design across devices.

## Tech Stack

- **Remix**: React framework for full-stack web applications.
- **Zustand**: Lightweight state management.
- **Tailwind CSS**: Utility-first CSS framework for styling.

## Installation

1. **Clone the Repository**

   ```sh
   git clone https://github.com/suryansh2004/pondipetals_emporium
   cd pondipetals-emporium
   ```

2. **Install Dependencies**

   ```sh
   npm install
   ```

3. **Run the Application**

   ```sh
   npm run dev
   ```

## State Management

The application uses Zustand for state management. The store contains:
- `products` - List of all available products.
- `category` - Currently selected category.
- `categories` - List of available categories.
- `fetchProducts()` - Fetches the products from an API.
- `fetchCart()` - Fetches the shopping cart items.
- `fetchCategories()` - Fetches the list of product categories.
- `setCategory(category)` - Sets the currently active category.

## How It Works

1. On page load, `useEffect` triggers `fetchProducts()`, `fetchCart()`, and `fetchCategories()`.
2. Products are filtered based on the selected category.
3. Clicking a category updates the state and displays relevant products.

## Contributing

Feel free to contribute by submitting issues or pull requests. Let's build something amazing together!