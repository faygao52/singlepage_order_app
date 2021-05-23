# MX51 Integration APP

This repo contains backend and React App for MX51 integration interview

## Get Started

Install dependencies for both React app and backend server
```bash
npm install
cd /app
npm install
```

After installation complete run `npm start` to start whole application

## Architecture

Backend server live in `server` folder

React app live in `app` folder

Electron configruation live in `electron`

Output file can be found under root folder with name `output.json`, you can change name and path by seting environment variable `OUTPUT_PATH`

## Usage

Run server `npm run server`

Run React application  `npm run react`

Run test `npm test`

Run server test `npm run server:test"`

Run Front End test `npm run react:test"`

## Configuration

If you want to change categories and items, you could find JSON file in under `server/utils`


## APIs

### GET /categories

Retrieve all categories

Response body:

```javascript
{
  "id" : number,
  "name" : string
}
```

Example:

```javascript
{
  "id" : 1,
  "name" : "Burger"
}
```

### GET /categories/:id/items

Retreive all items in category

```javascript
{
  "id" : number,
  "name" : string,
  "img": string,
  "price": number,
  "categoryId": number
}
```

Example:

```javascript
{
    "id": 1,
    "name": "Chicken Burger",
    "img": "https://assets.grilld.com.au/images/Products/Burgers/Chicken-Burgers/_crop185/CHICKEN_BirdAndBrie_Trad_1500x1200px.jpg?mtime=20210429162929",
    "price": 15.99,
    "categoryId": 1
}
```

### POST /checkout

Request body:

```javascript
{
  "items" : object[],
  "totalAmount" : price
}
```

Example:


```javascript
{
    "item": [
        {
            "id": 1,
            "quantity": 2,
            "total": 24
        },
        {
            "id": 2,
            "quantity":1,
            "total": 7
        }
    ],
    "totalAmount": 31
}
```
