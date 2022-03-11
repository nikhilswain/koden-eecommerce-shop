const requestHandler = {
  get: async function (req, res) {
    res.send('hello world!');
  },
  post: async function (req, res) {
    res.send('hello world!');
  },
  put: async function (req, res) {
    res.send('hit!');
  },
  delete: async function (req, res) {
    res.send('hit!');
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
