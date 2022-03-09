const { User } = require('../../models/User.model');

const requestHandler = {
  get: async function (req, res) {
    res.send('hello world!', data);
  },
  post: async function (req, res) {
    try {
      const {
        username, password, email, role, designation
      } = req.body;

      const user = new User({
        username, password, email, role, designation
      });
      const savedUser = await user.save();
      res.send(savedUser);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  put: async function (req, res) {
    console.log('hit');
  },
  delete: async function (req, res) {
    console.log('hit');
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET': {
      return requestHandler.get(req, res);
    }

    case 'POST': {
      return requestHandler.post(req, res);
    }

    case 'PUT': {
      return requestHandler.put(req, res);
    }

    case 'DELETE': {
      return requestHandler.delete(req, res);
    }
  }
}
