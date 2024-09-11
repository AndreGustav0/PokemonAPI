import express, { Request, Response } from "express";
import path from "path";

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "/views"));

// Rota para a página inicial
app.get('/', function (request: Request, response: Response) {
    response.render("index", { pokemon: null, error: null });
});

// Rota para buscar por ID e redirecionar para a página do Pokémon
app.get('/pokemon/id', function (request: Request, response: Response) {
    const pokemonId = request.query.id as string;
    if (pokemonId) {
        response.redirect(`/pokemon/${pokemonId}`);
    } else {
        response.redirect('/');
    }
});

// Rota para buscar por Nome e redirecionar para a página do Pokémon
app.get('/pokemon/nome', function (request: Request, response: Response) {
    const pokemonName = request.query.nome as string;
    if (pokemonName) {
        response.redirect(`/pokemon/${pokemonName.toLowerCase()}`);
    } else {
        response.redirect('/');
    }
});

// Rota para mostrar informações do Pokémon baseado na URL
app.get('/pokemon/:identifier', function (request: Request, response: Response) {
    const identifier = request.params.identifier;

    fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`)
        .then(res => res.json())
        .then(pokemon => {
            response.render("index", { pokemon, error: null });
        })
        .catch(error => {
            console.error("Erro ao buscar Pokémon:", error);
            response.render("index", { pokemon: null, error: "Pokémon não encontrado." });
        });
});

app.listen(3000, function () {
    console.log("Server is running");
});
