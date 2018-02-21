var express = require("express");
var router = express.Router();
var controller = require("../controllers/estabelecimento");

router.route("/").get((req, res, next) => {
  Promise.all([
    controller.getAvaliacoes("presencaEquipe"),
    controller.getAvaliacoes("tempoEspera"),
    controller.getAvaliacoes("qualidadeAtendimento"),
    controller.getAvaliacoes("medicamentos"),
    controller.getAvaliacoes("equipamentos"),
    controller.getAvaliacoes("infraestrutura")
  ])
    .then(ranking => {
      res.json(ranking);
    })
    .catch(error => {
      res.sendStatus(500);
    });
});

router.route("/:id").get((req, res, next) => {
  controller
    .getLista(req.params.id)
    .then(list => {
      res.json(list);
    })
    .catch(error => {
      res.sendStatus(500);
    });
});

module.exports = router;
