const express = require("express");
const router = express.Router();
const controller = require("../controllers/estabelecimento");

router.route("/estabelecimentos").get((req, res, next) => {
  controller
    .getAll()
    .then(estabelecimentos => {
      res.json(estabelecimentos);
    })
    .catch(error => {
      next(error);
    });
});

router
  .route("/estabelecimentos/:id")
  .get((req, res, next) => {
    let id = req.params.id;
    controller
      .getInfoEstabelecimento(id)
      .then(estabelecimentoInfo => {
        res.json(estabelecimentoInfo);
      })
      .catch(error => {
        next(error);
      });
  })
  .post((req, res, next) => {
    let id = req.params.id;
    let cookies = req.cookies;
    let avaliacao = req.body;
    let type = avaliacao.type;
    delete avaliacao.type;
    if (type in cookies) {
      throw new Error("Avaliação Duplicada");
    } else {
      controller
        .get(id)
        .then(estabelecimento => {
          controller
            .save(estabelecimento, type, avaliacao)
            .then(estab => {
              res.cookie(type, "", {
                maxAge: 24 * 60 * 60 * 1000,
                path: `/estabelecimentos/${id}`
              });
              res.sendStatus(200);
            })
            .catch(error => {
              next(error);
            });
        })
        .catch(error => {
          next(error);
        });
    }
  });

module.exports = router;
