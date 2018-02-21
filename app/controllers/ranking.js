const Estabelecimento = require("../models/estabelecimento");

exports.getAvaliacoes = type => {
  return Estabelecimento.aggregate([
    {
      $project: {
        _id: "$id",
        nome: "$nome",
        cidade: "$endereco.municipio",
        avgNota: { $avg: "$avaliacoes." + type + ".nota" }
      }
    },
    {
      $match: { avgNota: { $exists: true, $ne: null } }
    },
    {
      $sort: { avgNota: -1 }
    },
    { $limit: 5 }
  ]).then(ranking => {
    return { [type]: ranking };
  });
};

exports.getLista = function(type) {
  return Estabelecimento.aggregate([
    {
      $project: {
        _id: "$id",
        nome: "$nome",
        cidade: "$endereco.municipio",
        bairro: "$endereco.bairro",
        rua: "$endereco.logradouro",
        avgNota: { $avg: "$avaliacoes." + type + ".nota" }
      }
    },
    {
      $match: {
        avgNota: { $exists: true, $ne: null }
      }
    },
    { $sort: { avgNota: -1 } }
  ]);
};
