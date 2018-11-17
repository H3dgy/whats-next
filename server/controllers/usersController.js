const usersController = {};
const userModule = require('../modules/userModule');


usersController.get = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModule.getUser(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send();
  }
};

usersController.create = async (req,res) => {
  const {name, password, email, avatar} = req.body;
  if(!name || !password || !email) {
    res.status(400).send();
    return;
  }
  try {
    const user = await userModule.createUser(name,password,email,avatar);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send();
  }
}

module.exports = usersController;
