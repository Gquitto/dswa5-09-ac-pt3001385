module.exports = function (app) {

    let Contato = app.models.contato;
    let controller = {};

    controller.listaContatos = (req, res) => {
        Contato.find().exec().then((contatos) => {
            res.json(contatos);
        }, (erro) => {
            console.error(erro);
            res.status(500).json(erro);
        });
    };

    controller.obtemContato = (req, res) => {
        const _id = req.params.id;
        Contato.findById(_id).exec().then((contato) => {
            if (!contato) throw new Error('Contato não encontrado');
            res.json(contato);
        }, (erro) => {
            console.error(erro);
            res.status(404).json(erro);
        });
    };

    controller.removeContato = (req, res) => {
        const _id = req.params.id;
        Contato.deleteOne({ '_id': _id }).exec().then(() => {
            res.end();
        }, (erro) => {
            return console.error(erro);
        });
    };

    controller.salvaContato = (req, res) => {
        const _id = req.params.id;
        if (_id) {
            Contato.findByIdAndUpdate(_id, req.body).exec().then((contato) => {
                res.json(contato);
            }, (erro) => {
                console.error(erro);
                res.status(500).json(erro);
            });
        } else {
            Contato.create(req.body).then((contato) => {
                res.status(201).json(contato);
            }, (erro) => {
                console.error(erro);
                res.status(500).json(erro);
            });
        }
    };

    return controller;
};