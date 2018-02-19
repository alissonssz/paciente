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
      next();
    });
});

router.route("/:id").get(function(req, res) {
  var nome;
  if (req.params.id === "presencaEquipe") {
    nome = "Presença de Profissionais de Saúde";
  } else if (req.params.id === "tempoEspera") {
    nome = "Tempo de Espera";
  } else if (req.params.id === "qualidadeAtendimento") {
    nome = "Qualidade do Atendimento";
  } else if (req.params.id === "medicamentos") {
    nome = "Disponibilidade de Medicamentos";
  } else if (req.params.id === "equipamentos") {
    nome = "Disponibilidade de Equipamentos";
  } else {
    nome = "Infraestrutura";
  }
  var order;
  if (req.query.order === "true") {
    order = -1;
  } else {
    order = 1;
  }
  controller.getLista(req.params.id, order, req.query.cidade, function(
    ranking
  ) {
    res.render("listaCompleta", {
      data: {
        ranking: ranking,
        nome: nome
      }
    });
  });
});

module.exports = router;
