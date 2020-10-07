module.exports = function (app) {

    let Curso = app.models.curso;
    let controller = {};

    controller.listaCursos = (req, res) => {
        Curso.find().exec().then((cursos) => {
            res.json(cursos);
        }, (erro) => {
            console.error(erro);
            res.status(500).json(erro);
        });
    };

    controller.obtemCurso = (req, res) => {
        const _id = req.params.id;
        Curso.findById(_id).exec().then((curso) => {
            if (!curso) throw new Error('Curso não encontrado');
            res.json(curso);
        }, (erro) => {
            console.error(erro);
            res.status(404).json(erro);
        });
    };

    controller.removeCurso = (req, res) => {
        const _id = req.params.id;
        Curso.deleteOne({ '_id': _id }).exec().then(() => {
            res.end();
        }, (erro) => {
            return console.error(erro);
        });
    };

    controller.salvaCurso = (req, res) => {
        const _id = req.params.id;
        if (_id) {
            Curso.findByIdAndUpdate(_id, req.body).exec().then((curso) => {
                res.json(curso);
            }, (erro) => {
                console.error(erro);
                res.status(500).json(erro);
            });
        } else {
            Curso.create(req.body).then((curso) => {
                res.status(201).json(curso);
            }, (erro) => {
                console.error(erro);
                res.status(500).json(erro);
            });
        }
    };

    return controller;
};