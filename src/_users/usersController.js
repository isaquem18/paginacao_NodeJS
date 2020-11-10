const express = require('express');
const router = express.Router();
const Users = require('./users');


router.get('/users/:id?', (req, res) => {
  let $offset;
  let $id = req.params.id;
  if ($id != undefined) {
    $id = Number.parseInt(req.params.id);
    if ($id == 0 || $id == 1) {
      $offset = 0;
    } else {
      $offset = ($id - 1) * 4;
    }
    Users.findAndCountAll({
      limit: 4,
      offset: $offset
    }).then(item => {
      if (item.rows.length < 4) {
        if (item.rows.length < 1) {
          return res.json({item, pagina: 'ESTA PAGINA NAO EXISTE'});
        } else {
          return res.json({ item, pagina: 'ULTIMA PAGINA!' });
        }
      } else {
        return res.json(item);
      }
    }).catch(() => {
      return res.json({ res: 'zero resultados!' })
    })
  } else {
    Users.findAll({ raw: true })
      .then(item => {
        return res.json(item)
      }).catch(() => {
        return res.json({ res: 'zero resultados!' })
      })
  }
});


router.post('/users', (req, res) => {
  let $username = req.body.username;
  let $password = req.body.password;
  Users.create({
    username: $username,
    password: $password
  }).then(item => {
    return res.json(item)
  }).catch(item => {
    return res.json({ res: 'fail' })
  });
});


router.put('/users/:id', (req, res) => {
  let $id = req.params.id;
  let $username = req.body.username;
  let $password = req.body.password;
  Users.update({ username: $username, password: $password }, { where: { id: $id } })
    .then(item => res.json(item));
})


router.delete('/users/:id', (req, res) => {
  let $id = req.params.id;
  Users.destroy({ where: { id: $id } })
    .then(item => {
      return res.json(item)
    })
})


module.exports = router;