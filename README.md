<a name="readme-top"></a>
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![Netlify Status](https://api.netlify.com/api/v1/badges/d896ff9f-5121-460e-b7e3-ced55066fd60/deploy-status)](https://food-explorer-gabriel-stertz.netlify.app/)

<br />
<div align="center">
  <a style="text-decoration: none" href="https://github.com/gabrielStertz/foodexplorer-back-end">
    <h1>Food Explorer</h1>
  </a>

  <h3 align="center">Server</h3>

  <p align="center">
    Project Stage "Desafio Final" - Program Explorer - Rocketseat
    <br />
    <br />
    <br />
    <a href="https://food-explorer-gabriel-stertz.netlify.app/">View Demo</a>
    ·
    <a href="https://github.com/gabrielStertz/foodexplorer-back-end/issues">Report Bug</a>
    ·
    <a href="https://github.com/gabrielStertz/foodexplorer-back-end/issues">Request Feature</a>
  </p>
</div>


<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#admin-account">Admin account</a></li>
      </ul>
    </li>
    <li>
      <a href="#end-points">End Points</a>
      <ul>
        <li><a href="#users-routes">Users routes</a></li>
        <li><a href="#sessions-routes">Sessions routes</a></li>
        <li><a href="#menu-routes">Menu routes</a></li>
        <li><a href="#orders-routes">Orders routes</a></li>
        <li><a href="#favorites-routes">Favorites routes</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#author">Author</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>


## About the Project

This project is for the final stage of the program **Explorer** of the [Rocketseat](https://rocketseat.com.br) platform, where we learned how to create Front and Back end, using Javascript, React and others development tools.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Built With

This are the technologies used in these project:

- [![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=plastic&logo=node.js&logoColor=white)](https://nodejs.org/en/)
- [![Express](https://img.shields.io/badge/Express-%23646CFF.svg?style=plastic&logo=express)](https://expressjs.com/pt-br/)
- [![Knex.js](https://img.shields.io/badge/Knex.js-%23ff8144.svg?style=plastic)](https://knexjs.org/)
- [![SQLite](https://img.shields.io/badge/SQLite-%23044a64.svg?style=plastic&logo=sqlite)](https://www.sqlite.org/index.html)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Getting Started

### Prerequisites

Before we start, you will need to have installed this:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).
And is good to have an editor to work with de code [VSCode](https://code.visualstudio.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Installation

```bash
# Clone this repository
$ git clone <https://github.com/gabrielStertz/foodExplorer-back-end.git>

# Access the folder of the project in terminal/cmd
$ cd foodExplorer-back-end

# Install dependencies
$ npm install

# Run the migrations to create the database
$ npm run migrate

# Run the application in development environment
$ npm run dev

# The server will run in localhost:3333 - <http://localhost:3333>
```
#### The last command will create an User Admin:

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Admin account

>
> ### **e-mail:** gabriel@gmail.com
>
> ### **password:** 123
>

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## End-points

### Users routes

>
>to create user: `POST` in `http://localhost:3333/users` in JSON:
>

```json
  {
    "name": "User name",
    "email": "User e-mail",
    "password": "User password"
  }
```

### Sessions Routes

>
> to create a token to authenticate: 
> `POST` in `http://localhost:3333/sessions` in JSON:
>

```json
  {
    "email": "E-mail valid",
    "password": "Password valid"
  }
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Menu routes

>
> #### All Users:
>
> To get **index** of the menu: `GET` in `http://localhost:3333/menu`
>
> To **show** an item: `GET` in `http://localhost:3333/menu/<menu_id>`
>
> #### User Admin:
>
> To **create** an item: `POST` in `http://localhost:3333/menu` in JSON:
>
```json
  {
    "name": "Name of the item",
    "type": "Type of the item",
    "description": "Description of the item",
    "price": "Price of the item",
    "ingredients": ["ingredient 1", "ingredient 2"]
  }  
```
>
> To **delete** an item: `DELETE` in `http://localhost:3333/menu/<menu_id>`
>
> To **update** an item: `PATCH` in `http://localhost:3333/menu/<menu_id>`
> in JSON:
>
```json
  {
    "name": "Name of the item",
    "type": "Type of the item",
    "description": "Description of the item",
    "price": "Price of the item",
    "ingredients": ["ingredient 1", "ingredient 2"]
  }
```
>
> To **update** the picture of the item:
> `PATCH` in `http://localhost:3333/menu/picture/<menu_id>`
>
> send append FormData() "picture"
>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Orders routes

>
> #### All users:
>
> To **create** an order: `POST` in `http://localhost:3333/orders` in JSON:
>
```json
  {
    "order_menu_list": ["menu_id", "menu_id", "menu_id"]
  }
```
>
> To **index** the orders: `GET` in `http://localhost:3333/orders`
>
>
> To **show** an order: `GET` in `http://localhost:3333/orders/<orders_id>`
>
> #### User Admin:
>
> To **index** all the orders with status different than "Entregue":
> `GET` in `http://localhost:3333/order-admin`
>
> To **update** the status of the order:
> `PUT` in `http://localhost:3333/order-admin/<order_id>` in JSON:
>
```json
  {
    "status": "new status"
  }
```
>
> To **show** if the order is paid:
> `GET` in `http://localhost:3333/order-payment/<order_id>`
>
> To **update** the order if is paid or not:
> `PUT` in `http://localhost:3333/order-payment/<order_id>`
>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Favorites routes

>
> To **create** a favorite:
> `POST` in `http://localhost:3333/favorites/<menu_id>`
>
> To **delete** a favorite:
> `DELETE` in `http://localhost:3333/favorites/<menu_id>`
>
> To **index** a favorite:
> `GET` in `http://localhost:3333/favorites`
>

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Roadmap

- [x] Users
  - [x] Create users
- [x] Sessions
  - [x] Create token  
- [x] Menu
  - [x] Create menu items
  - [x] Update menu items
  - [x] Update menu picture
  - [x] Delete menu items
- [x] Favorites  
  - [x] Create favorites
  - [x] Delete favorites
- [x] Orders
  - [x] Create orders
  - [x] Update status of orders

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## License

Distributed under the MIT License. See [LICENSE.txt](https://github.com/gabrielStertz/foodexplorer-back-end/blob/main/LICENSE.txt) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Author
---

<img src="https://avatars.githubusercontent.com/u/105811058?v=4" alt="Foto Gabriel" width=100px/>

 #### **Gabriel Stertz** 🚀

Feito com ❤️ por Gabriel Stertz 👋🏽 Entre em contato!

[![GitHub](https://img.shields.io/badge/-Github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/gabrielStertz) [![Linkedin Badge](https://img.shields.io/badge/-Gabriel-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/gabrielstertz/)](https://www.linkedin.com/in/gabrielstertz/) 
[![Gmail Badge](https://img.shields.io/badge/-gabrielStertz2012@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:gabrielstertz2012@gmail.com)](mailto:gabrielstertz2012@gmail.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Acknowledgments

I would like to acknowledge the help of the following:

* [othneildrew/Best-README-Template](https://github.com/othneildrew/Best-README-Template)
* [MDN Web Docs](https://developer.mozilla.org/pt-BR/)
* [Visual Studio Code](https://code.visualstudio.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[forks-shield]: https://img.shields.io/github/forks/gabrielStertz/foodexplorer-back-end.svg?style=plastic
[forks-url]: https://github.com/gabrielStertz/foodexplorer-back-end/network/members
[stars-shield]: https://img.shields.io/github/stars/gabrielStertz/foodexplorer-back-end.svg?style=plastic
[stars-url]: https://github.com/gabrielStertz/foodexplorer-back-end/stargazers
[issues-shield]: https://img.shields.io/github/issues/gabrielStertz/foodexplorer-back-end.svg?style=plastic
[issues-url]: https://github.com/gabrielStertz/foodexplorer-back-end/issues
[license-shield]: https://img.shields.io/github/license/gabrielStertz/foodexplorer-back-end.svg?style=plastic
[license-url]: https://github.com/gabrielStertz/foodexplorer-back-end/blob/main/LICENSE.txt
