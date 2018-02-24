var express = require("express");
var router = express.Router();
var controller = require("../controllers/ranking");

router.route("/ranking").get((req, res, next) => {
  Promise.all([
    controller.getAvaliacoes("presencaEquipe"),
    controller.getAvaliacoes("tempoEspera"),
    controller.getAvaliacoes("qualidadeAtendimento"),
    controller.getAvaliacoes("medicamentos"),
    controller.getAvaliacoes("equipamentos"),
    controller.getAvaliacoes("infraestrutura")
  ])
    .then(result => {
      let ranking = Object.assign({}, ...result);
      res.json(ranking);
    })
    .catch(error => {
      next(error);
    });
});

router.route("/ranking/:id").get((req, res, next) => {
  controller
    .getLista(req.params.id)
    .then(list => {
      res.json(list);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
