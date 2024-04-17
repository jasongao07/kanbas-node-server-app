import * as dao from "./dao.js";
let globalCurrentUser;

export default function UserRoutes(app) {
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };
  const deleteUser = async (req, res) => { 
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };
  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };
  
  const findUserById = async (req, res) => { };
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    currentUser = await dao.findUserById(userId);
    res.json(status);
  };

  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already taken" });
    }
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;

    res.json(currentUser);
  };

  const signin = async (req, res) => {   
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.sendStatus(401);
    }

    // if (currentUser) {
    //   req.session["currentUser"] = currentUser;
    //   globalCurrentUser = currentUser;
    //   res.json(currentUser);
    // }
    // else {
    //   res.sendStatus(401);
    // }
  };
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }

  };

  app.post("https://kanbas-node-server-app-1-26is.onrender.com/api/users", createUser);
  app.get("https://kanbas-node-server-app-1-26is.onrender.com/api/users", findAllUsers);
  app.get("https://kanbas-node-server-app-1-26is.onrender.com/api/users/:userId", findUserById);
  app.put("https://kanbas-node-server-app-1-26is.onrender.com/api/users/:userId", updateUser);
  app.delete("https://kanbas-node-server-app-1-26is.onrender.com/api/users/:userId", deleteUser);
  app.post("https://kanbas-node-server-app-1-26is.onrender.com/api/users/signup", signup);
  app.post("https://kanbas-node-server-app-1-26is.onrender.com/api/users/signin", signin);
  app.post("https://kanbas-node-server-app-1-26is.onrender.com/api/users/signout", signout);
  app.post("https://kanbas-node-server-app-1-26is.onrender.com/api/users/profile", profile);
}
