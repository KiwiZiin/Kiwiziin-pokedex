const pokemonImage = document.querySelector(".pokemon__image");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonName = document.querySelector(".pokemon__name");
const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

let searchPokemon = 1;

// CONECTAR E CAPTURAR AS INFORMAÇÕES DA POKEAPI

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {

        const data = await APIResponse.json();

        return data;

    }

};

const renderPokemon = async (pokemon) => {

    pokemonName.textContent = "loading...";
    pokemonNumber.textContent = "";
    pokemonImage.src = "https://media.tenor.com/4K2_dLLq-pwAAAAj/charmander-chases-tail.gif";

    const data = await fetchPokemon(pokemon);

    console.log(data);

    if (data) {
        // caso tudo de certo
        pokemonImage.src = data.sprites.versions["generation-v"]["black-white"].animated.front_default;
        pokemonImage.style.width = "18%";
        pokemonNumber.textContent = data.id;
        pokemonName.textContent = data.name;
        input.value = "";
        searchPokemon = data.id;

    } else {
        // caso de errado
        pokemonImage.src = "https://forums.pokemon-vortex.com/uploads/monthly_2016_03/56f16ff80f575_giphy(4).gif.4e8a96608bac442188c05b7ceff38b72.thumb.gif.6d35b3761778a1673ccef95fa379d028.gif";
        pokemonImage.style.width = "18%";
        pokemonNumber.textContent = "";
        pokemonName.textContent = "not found :(";

    }




};
form.addEventListener('submit', (event) => {

    event.preventDefault();

    renderPokemon(input.value.toLowerCase());

});

buttonPrev.addEventListener("click", () => {

    if (searchPokemon > 1) {

        searchPokemon -= 1


        renderPokemon(searchPokemon);
    }

});

buttonNext.addEventListener("click", () => {
    searchPokemon += 1;

    renderPokemon(searchPokemon)
})



renderPokemon(searchPokemon);
