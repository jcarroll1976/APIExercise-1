// require the express module
import express from "express";
import Shop from "../models/shops";
 
// create a new Router object
const routes = express.Router();

const shops: Shop[] = [
    { id: 111, name: "Pepper's Pizza", rating: 4.5 },
    { id: 222, name: "Clive's Chives", rating: 3.4 },
    { id: 333, name: "Betty's Brews", rating: 4.3 },
    { id: 444, name: "Sylvester's Shoes", rating: 3.8 },
    { id: 555, name: "Teddy's Tunes", rating: 4.7 }
];


routes.get('/api/shops',(req,res) => {
    let results = shops;
    const minRating = Number(req.query.minRating);

    if(!isNaN(minRating)) {
        results = results.filter(shop => shop.rating >= minRating);
        res.json(results);
    } else {
        res.json(shops);
    }
})

routes.get('/api/shops/:id',(req,res) => {
    const id = Number(req.params.id);
    const foundShop = shops.find(shop => shop.id === id);
    if(foundShop) {
        res.status(200);
        res.json(foundShop);
    } else {
        res.status(404);
        res.json({"error":`Shop not found: ${id}`});
    }
})



routes.post('/api/shops',(req,res) => {
    const newShop: Shop = req.body;
    shops.push(newShop);
    res.status(201);
    res.json(newShop);
})

routes.put('/api/shops/:id',(req,res) => {
    const id = Number(req.params.id);
    const updatedShop: Shop = req.body;
    updatedShop.id = id;

   const index = shops.findIndex(shop => shop.id === id);
   shops[index] = updatedShop;
   res.status(200);
   res.json(updatedShop);
})

routes.delete('/api/shops/:id',(req,res) => {
    const id = Number(req.params.id);

    const index = shops.findIndex(shop => shop.id === id);

    shops.splice(index,1);

    res.status(204);
    res.json();
})

export default routes;
