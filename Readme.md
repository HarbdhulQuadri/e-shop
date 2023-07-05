# E-SHOP

E-Shop is a simple web application that allows users to scan a product's URL(Barcode) and generate an invoice for that product. It is designed to simplify the process of creating invoices for purchased products, making it convenient for both individuals and businesses. It is also designed for participation in #APISecurityHackathon organised by Treblle.

## Features

- **URL Scanning**: The app provides a user-friendly interface where users can enter the URL of the product they want to generate an invoice for.
- **Product Information Retrieval**: Once the URL is submitted, the app retrieves relevant information about the product, such as its name, description, price, and any additional details available.
- **Automatic Invoice Generation**: The app uses the retrieved product information to generate a professional-looking invoice automatically.
- **Customization Options**: Users can customize the generated invoice by adding their own company logo, address, contact details, and any other necessary information.
- **Download and Print**: The generated invoice can be downloaded as a PDF file or directly printed from the app.

## How to Use

1. Clone the repository to your local machine.
2. Install the required dependencies by running `npm install`.
3. Start the application by running `npm start`.
4. Access the app in your web browser by navigating to `http://localhost:8080`.
5. Scan the product's barcode by clicking the camera button on the home page.
6. Click the "Generate Invoice" button to initiate the process.
7. Review the retrieved product information on the preview page.
8. Customize the invoice if desired.
9. Click the "Download Invoice" button to save the invoice as a PDF file or use the print functionality of your browser to print the invoice directly.

## Technology Stack

E-Shop is built using the following technologies:

- **Back-end**: Node.js, Express.js

# API Setup Guide

This guide will walk you through the steps to set up and run the API server for your application.

## Prerequisites

Before you begin, ensure that you have the following prerequisites installed:

- Node.js 
- MongoDB 

## Installation

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/HarbdhulQuadri/e-shop/
Navigate to the project directory:

shell
Copy code
cd e-shop
Install the dependencies:

shell
npm install

Set up the environment variables:

Rename the .env.example file to .env.
Open the .env file and update the values according to your configuration.
Start the MongoDB server:

shell
# Replace <mongodb-uri> with the MongoDB connection URI
mongod --dbpath <mongodb-uri>
Start the API server:

shell
Copy code
npm start
The server will start running on the specified port (default: 8080) and establish a connection to the MongoDB database.

API Endpoints
The following API endpoints are available:

- POST /api/v1/auth/register - Register a new user.
- POST /api/v1/auth/login - User login.
- POST /api/v1/product - Create a new product.
- PATCH /api/v1/product/:productID - Update a product by ID.
- GET /api/v1/product/:productID - Get a product by ID.
- GET /api/v1/product - Get all products.
- DELETE /api/v1/product/:productID - Delete a product by ID.

Testing
To run the test suite, use the following command:

## License

E-Shop is open-source and released under the [MIT License](LICENSE). Feel free to modify and distribute it as per the terms of the license.

## Contact

If you have any questions, suggestions, or feedback, please feel free to reach out to us. We would be happy to assist you.
