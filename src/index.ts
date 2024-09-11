import express,{Request, Response} from "express";
import path from "path";


const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "/views"));

app.get('/', function(request: Request, response: Response){
    response.render("index", {pokemon: null, error: null})
})

// para buscar por ID
// estudar (app, res. req, querry, render)
app.get('/buscarPorId', function (request: Request, response: Response){
    const pokemonId = request.query.id as string;

    if(pokemonId){
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then(res => res.json())
            .then(pokemon => {
                console.log("ID do pokémon:",pokemon)
                response.render("index", {pokemon, error: null})
            })
            .catch(error =>{
                response.render("index", {pokemon: null, error: "Pokémon não encontrado."})
            })
    } else {
        response.render("index",{error: "ID não informado."})
    }
})

// para buscar por Nome
// estudar as mesmas coisas
app.get('/buscarPorNome', function(request: Request, response: Response){
    const pokemonName = request.query.nome as string;

    if(pokemonName){
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(res => res.json())
        .then(pokemon => {
            console.log("Nome do pokémon:",pokemon)
            response.render("index", {pokemon ,error:null})
        })
        .catch(error =>{
            response.render("index", {pokemon: null, error: "Pokémon não encontrado."})
        })
    } else {
        response.render("index", {pokemon: null, error: "Nome não informado."})
    }
})

app.listen(3000, function () {
    console.log("Server is running");
})