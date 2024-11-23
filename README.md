# eMercado eCommerce frontend

eMercado is a front-end eCommerce simulation that mimics the user experience of an online store. It showcases products across various categories, with options to filter by price, category, and item count, and to sort by different criteria. Users can view detailed product pages with images, descriptions, and related items. The platform includes a simulated user login system, profile management, shopping cart, and a product review system. Product data is fetched via a simple API for a realistic browsing experience.


## Key Features

- **Product Listing**: Displays products from multiple categories such as Autos, Juguetes (Toys), and Muebles (Furniture).
- **Filtering & Sorting**: Allows users to filter products by price range and sort them by name or number of products in each category.
- **Product Detail Pages**: Displays detailed information for each product, including images, descriptions, and related products.
- **User Authentication**: Simulated login system where users can create and store profiles.
- **Carousel & Responsive Design**: A carousel for featured items and responsive layout for different screen sizes.
- **Image Zoom**: Desktop and mobile zoom functionality for product images.
- **Review System**: Users can rate products and leave comments.
- **Form Validation**: Added client-side validation for login and user profile forms to ensure data integrity and improve the user experience.

## Demo

You can try out a live version of the project [here](https://ignatiosdev.github.io/eMercado-ecommerce-frontend/).

## Technologies Used

- HTML5, CSS3 (with Bootstrap 5)
- JavaScript (ES6+)
- Responsive Design (Bootstrap Grid System)
- Local Storage for Profile and Cart Management

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/emercado.git
2. Navigate into the project directory:
   
   ```bash
   cd emercado
3. Open `index.html` in VSCode or your preferred IDE.
4. Use [live-server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) to serve the files and start the development environment

## Usage

- Homepage: The homepage features a carousel and links to product categories. Users can click on categories to view products.
- Product Filtering: Use the range sliders to filter products by their count in each category.
- Sorting: Sort products by name (ascending or descending) or by the number of items in a category.
- Product Details: Clicking on a product will take you to the product detail page where you can view images, descriptions, and related items.
- Cart & Profile: Users can add products to the shopping cart and manage their profile (though the cart and profile are stored in local storage and are not persistent beyond the session).


## Acknowledgments
This project was built as part of the "Jóvenes a Programar" initiative in 2022.
