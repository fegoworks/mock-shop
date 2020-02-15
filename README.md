# Mock-Shop

Mock Shop is a simple backend API for a shopping outlet

# Table of Contents

- [Technology Stack](#tstack)
- [Features](#features)
- [Getting Started](#started)
- [Pre-requisites](#require)
- [Installation](#installation)
- [Running tests](#tests)
- [API Endpoints](#endpoints)

## Technology Stack<a name="tstack"></a>

- Nodejs
- PostgreSQL
- Sequelize
- Redis
- Docker

## Features<a name="features"></a>

- Users can
  - Sign in
  - Add products to carts
  - Remove products from carts
  - view carts
- Admin can
  - Sign in
  - manage products (add, remove, edit, view)

## Getting Started<a name="started"></a>

To run this API locally simply follow the instructions below:

#### Prerequisites<a name="require"></a>

You need to have or install the following:

1. Git bash
2. Npm
3. Postman

#### Installation<a name="installation"></a>

- clone repo
  ```
  git clone https://github.com/fegoworks/mock-shop.git
  ```
- navigate to api folder
- run installation
  ```
  npm install
  ```
- create a `.env` file with this template

  ```
  DATABASE_URL = 'Your postgres database url'
  DATABASE_URL_TEST = 'Your postgres test database url'
  DATABASE_URL_DEVELOPMENT = 'Your postgres database url'
  PORT = 'Your local port'
  SECRET = 'Your secret phrase'
  CLOUD_NAME = 'Your cloudinary cloud name'
  CLOUDINARY_API_KEY = 'cloudinary api key'
  CLOUDINARY_API_SECRET = 'cloudinary api secret'
  ```

- run migrations and seeding

  ```
  sequelize db:migrate
  ```

  ```
  sequelize db:seed:all
  ```

- start app
  ```
  npm run start:dev
  ```
- you can now make requests using postman to `localhost:3000/api/v1/`

## Running Tests<a name="tests"></a>

To run tests simply run the following command in your git bash or command line

```
npm run test
```

### API endpoints

Heroku: [Mock-Shop-API](https://mock-shop-fe.herokuapp.com/)
Documentation: [Mock-EPL-API-Docs]()

| Endpoints                         | Functionality               |
| --------------------------------- | --------------------------- |
| POST /auth/create-user            | Create new user account     |
| POST /auth/signin                 | Login a user                |
| POST /products                    | Create a product            |
| POST /carts                       | Add products to a cart      |
| PATCH /products/:productId        | Edit a product              |
| PATCH /products/:productId/upload | Update a product with image |
| DELETE /carts/:productId          | Remove a product from cart  |
| DELETE /products/:productId       | Delete a specific product   |
| GET /carts/                       | View cart                   |
| GET /products/                    | View all products           |

### Sign up<a name="endpoints"></a>

Send a `POST` request to `/api/v1/auth/create-user` with the following JSON structure:

```json
{
  "firstName": "Sensei",
  "lastName": "Saitama",
  "email": "saitama@mail.com",
  "password": "password",
  "isAdmin": "true"
}
```

For admins `isAdmin` is provided with `true` while for users it is set to `false`. `POST` and `PATCH` requests to `/products` are restricted to only the admin accounts. User accounts can send requests to `/carts`.

### Sign in with the user

Send a `POST` request to `/api/v1/auth/signin`, with the following:

```json
{
	"email": ,
	"password":
}
```

When you signin you'll receive a `Bearer token`. You'll need this token to send any request related to products and carts.

> Frow now on, every request described here will require you send
> the Bearer token

### Create a new product

Send a `POST` request to `/api/v1/products`, with the following:

```json
{
  "name": "bread",
  "description": "food",
  "category": "Bromate free",
  "price": 350,
  "inStock": true
}
```

### View products

Send a `GET` request to `/api/v1/products/`

### Edit a product

Send a `PATCH` request to `/api/v1/products/:productId`, with the following:

```json
{
  "name": "burger",
  "description": "food",
  "category": "Bromate free",
  "price": 650,
  "inStock": false
}
```

### Update a product with an image

Send a `PATCH` request in a multipart form to `/api/v1/products/:productId/upload`, with `image` as the field name and a picture file

### Delete a product

Delete a team by placing its id in the `DELETE` request URL
`/api/v1/products/:productId`.

### Create and add a product to a cart

Send a `POST` request to `/carts/:productId`

### View cart

Send a `GET` request to `/api/v1/carts/`

### Delete a product from a cart

Delete a product by placing its id in the `DELETE` request URL
`/carts/:productId`.

## Author

Edafe Oghenefego
[@realFego](https://twitter.com/realFego)
