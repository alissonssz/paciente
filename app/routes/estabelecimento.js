var express = require("express");
var router = express.Router();
var controller = require("../controllers/estabelecimento");

router.route("/").get((req, res, next) => {
  controller
    .getAll()
    .then(estabelecimentos => {
      res.json(estabelecimentos);
    })
    .catch(error => {
      next();
    });
});

router
  .route("/:id")
  .get((req, res, next) => {
    var id = req.params.id;
    controller
      .get(id)
      .then(estabelecimento => {
        controller.getNotas(estabelecimento, function(notas) {
          var data = {
            id: estabelecimento.id,
            nome: estabelecimento.nome,
            endereco: estabelecimento.endereco.logradouro,
            bairro: estabelecimento.endereco.bairro,
            municipio: estabelecimento.endereco.municipio,
            numero: estabelecimento.endereco.numero,
            notas: notas
          };
          res.json(data);
        });
      })
      .catch(error => {
        next();
      });
  })
  .post(function(req, res) {
    var id = req.params.id;
    var avaliacao = req.body;
    var type = avaliacao.type;
    var cookies = req.cookies;
    if (type in cookies) {
      res.sendStatus(401);
    } else {
      controller.avalia(id, avaliacao, function(err) {
        if (err) {
          res.sendStatus(403);
        }
        res.cookie(type, "", {
          maxAge: 24 * 60 * 60 * 1000,
          path: "/estabelecimentos/" + id
        });
        res.sendStatus(200);
      });
    }
  });

module.exports = router;
