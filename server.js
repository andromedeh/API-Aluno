const express = require('express');
const { create, findAll, findById, update, remove } = require('./repositories/alunosRepository');

const app = express();
const port = 3000;

app.use(express.json());

//Rota para criar um novo aluno
app.post('/alunos', (req, res) => {
    const { nome, email, nome_curso } = req.body;
    const aluno = create({ nome, email, nome_curso });
    res.status(201).json(aluno);
});

//Rota para listar todos os alunos
app.get('/alunos', (req, res) => {
    const alunos = findAll();
    res.json(alunos);
});

//Rota para buscar um aluno especifico pelo ID
app.get('/alunos/:id', (req, res) => {
    const { id } = req.params;
    const aluno = findById(id);
    if (aluno) {
        res.json(aluno);
    } else {
        res.status(404).json({ message: 'Aluno não encontrado' });
    }
});


//Rota para atualizar informacoes de um aluno
app.put('/alunos/:id', (req, res) => {
    const {id} = req.params;
    const {nome, email, nome_curso} = req.body;
    const aluno = update(id, {nome, email, nome_curso});
    if (aluno) {
        res.json(aluno);
    } else {
        res.status(404).json({ message: 'Aluno não encontrado' });
    }
});

//Rota para deletar um aluno
app.delete('/alunos/:id', (req, res) => {
    const {id} = req.params;
    const deleted = remove(id);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Aluno não encontrado' });
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
