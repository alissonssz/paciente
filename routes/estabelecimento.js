var express = require('express');
var router = express.Router();
var controller = require('../controllers/estabelecimento')

router.route('/')
  .get(function(req, res) {
    controller.getAll(function(estabelecimentos) {
      res.json(estabelecimentos);
    })
  })

router.route('/:id')
  .get(function(req, res) {
    var id = req.params.id;
    controller.get(id, function(err, estabelecimento) {
      var data = { id: estabelecimento.id,
                   nome: estabelecimento.nome,
                   endereco: estabelecimento.endereco.logradouro }
      res.render('estabelecimento', data);
    });
  })
  .post(function(req, res) {
    var id = req.params.id;
    var avaliacao = req.body;
    var type = avaliacao.type;
    var cookies = req.cookies;
    if (type in cookies) {
      res.sendStatus(403);
    } else {
      controller.avalia(id, avaliacao, function(err, avaliacaoId) {
        if(err) {
          res.sendStatus(403);
        }
        res.cookie(type, avaliacaoId, { maxAge: 24 * 60 * 60 * 1000, path: '/estabelecimentos/' + id });
        res.sendStatus(200);
      });
    }
  })

module.exports = router;
