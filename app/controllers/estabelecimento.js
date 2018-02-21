const Estabelecimento = require("../models/estabelecimento");

exports.getAll = () => {
  return Estabelecimento.find(
    {},
    {
      id: 1,
      nome: 1,
      coordenadas: 1,
      "endereco.logradouro": 1,
      "endereco.municipio": 1,
      "endereco.bairro": 1,
      _id: 0
    }
  );
};

exports.get = id => {
  return Estabelecimento.findOne({ id: id });
};

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

exports.getInfoEstabelecimento = estabelecimentoId => {
  return Estabelecimento.aggregate([
    {
      $match: { id: Number(estabelecimentoId) }
    },
    {
      $project: {
        _id: "$id",
        nome: "$nome",
        rua: "$endereco.logradouro",
        bairro: "$endereco.bairro",
        municipio: "$endereco.municio",
        numero: "$endereco.numero",
        notas: {
          presencaEquipe: {
            $avg: "$avaliacoes.presencaEquipe.nota"
          },
          tempoEspera: {
            $avg: "$avaliacoes.tempoEspera.nota"
          },
          qualidadeAtendimento: {
            $avg: "$avaliacoes.qualidadeAtendimento.nota"
          },
          equipamentos: {
            $avg: "$avaliacoes.equipamentos.nota"
          },
          medicamentos: {
            $avg: "$avaliacoes.medicamentos.nota"
          },
          infraestrutura: {
            $avg: "$avaliacoes.infraestrutura.nota"
          }
        }
      }
    }
  ]);
};

exports.save = (estabelecimento, type, avaliacao) => {
  estabelecimento.avaliacoes[type].push(avaliacao);
  return estabelecimento.save();
};

// db.estabelecimentos.find({ "avaliacoes.medicamentos._id": ObjectId("596d3171876d34388a04b06a")}, {"avaliacoes.medicamentos.$": true}).pretty()
