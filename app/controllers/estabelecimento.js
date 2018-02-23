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
  ]).then(estab => {
    return estab[0];
  });
};

exports.save = (estabelecimento, type, avaliacao) => {
  estabelecimento.avaliacoes[type].push(avaliacao);
  return estabelecimento.save();
};
