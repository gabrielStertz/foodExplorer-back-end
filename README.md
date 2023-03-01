# Stage Desafio Final :rocket:

## Project with Express, Knex, sqlite, Node.js

Back-end for restaurants, with menu and orders :curry:


## Start

>
> To **Run** the project: 
>
> First type the command `npm install` to install the **dependencies**
>
> Then type the command `npm run migrate` to create the **database.db**
>
> Then type the command `npm start` to create local server, this will also > create the admin account:
>
> **e-mail:** gabriel@gmail.com
>
> **password:** 123
>

## End-points

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
>
> To **delete** an order:
> `DELETE` in `http://localhost:3333/orders/<orders_id>`
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