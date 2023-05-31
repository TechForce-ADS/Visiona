const {Router} = require("express");
const UserController = require("./controllers/UserController");
 
const routes = Router();

routes.get("/health", (req, res) => {
    return res.status(200).json({message: "Server on"});
});

routes.get('/users/email/:email', UserController.showByEmail);
routes.post('/users/email', UserController.authenticate);
routes.post('/users/email', UserController.authenticate);
routes.post('/users/register', UserController.store);
routes.get("/users", UserController.index);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.update);
routes.delete("/users/:id", UserController.destroy);

module.exports = routes;