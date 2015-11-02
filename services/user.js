var userStore = require('../stores/user.js');

module.exports.LinkApp = function(app) {
  app.get('/api/users', function(req, res) {
    userStore.getAll(function(users) {
        res.json(users);
    });
  });

  app.get('/api/users/:id', function(req, res) {
    var userId = req.params.id;
    userStore.get(userId, function(user, error) {
      if (error) {
        return res.sendStatus(400);
      }
      res.json(user);
    });
  });

  app.post('/api/users', function(req, res) {
    var user = req.body;
    if (!user || Object.keys(user).length <= 0) {
      return res.sendStatus(400);
    }
    userStore.save(user, function(user, error) {
      if (error) {
        return res.sendStatus(400);
      }
      res.json(user);
    });
  });

  app.put('/api/users/:id', function(req, res) {
    var userId = req.params.id;
    var userNew = req.body;
    if (! userNew || Object.keys(userNew).length <= 0) {
      return res.sendStatus(400);
    }
    userStore.get(userId, function(user, error) {
      if (error) {
        return res.sendStatus(400);
      }
      userNew.id = user.id;
      userStore.save(userNew, function(user, error) {
        if (error) {
          return res.sendStatus(400);
        }
        res.json(user);
      });
    });
  });

  app.delete('/api/users/:id', function(req, res) {
    var userId = req.params.id;
    userStore.get(userId, function(user, error) {
      if (error) {
        return res.sendStatus(400);
      }
      userStore.delete(user, function(user, error) {
        if (error) {
          return res.sendStatus(400);
        }
        res.json(user);
      });
    });
  });
};
