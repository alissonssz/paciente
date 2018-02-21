const express = require("express");
const router = express.Router();
const controller = require("../controllers/estabelecimento");

router.route("/").get((req, res, next) => {
  controller
    .getAll()
    .then(estabelecimentos => {
      res.json(estabelecimentos);
    })
    .catch(error => {
      res.json(500);
    });
});

router
  .route("/:id")
  .get((req, res, next) => {
    let id = req.params.id;
    controller
      .getInfoEstabelecimento(id)
      .then(estabelecimentoInfo => {
        res.json(estabelecimentoInfo);
      })
      .catch(error => {
        res.sendStatus(500);
      });
  })
  .post((req, res, next) => {
    let id = req.params.id;
    let cookies = req.cookies;
    let avaliacao = req.body;
    let type = avaliacao.type;
    delete avaliacao.type;
    if (type in cookies) {
      res.sendStatus(401);
    } else {
      controller
        .get(id)
        .then(estabelecimento => {
          controller
            .save(estabelecimento, type, avaliacao)
            .then(estab => {
              res.cookie(type, "", {
                maxAge: 24 * 60 * 60 * 1000,
                path: "/estabelecimentos/" + id
              });
              res.sendStatus(200);
            })
            .catch(error => {
              res.sendStatus(500);
            });
        })
        .catch(error => {
          res.sendStatus(500);
        });
    }
  });

module.exports = router;
