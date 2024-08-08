const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const sprite = document.getElementById("sprite-container");

const apiUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

searchButton.addEventListener("click", async () => {
  // searchInput.value = 'pikachu'
  const search = searchInput.value;
  const pokemon = await searchPokemon(search);
  renderPokemon(pokemon);
});

const searchPokemon = async (search) => {
  try {
    const response = await fetch(apiUrl.concat(search.trim().toLowerCase()));
    const pokemon = await response.json();
    return pokemon;
  } catch (error) {
    alert("Pokémon not found");
  }
};

const renderPokemon = (pokemon) => {
  console.log(pokemon);
  pokemonName.textContent = pokemon.name.toUpperCase();
  pokemonId.textContent = "#" + pokemon.id;
  weight.textContent = "Weight: " + pokemon.weight;
  height.textContent = "Height: " + pokemon.height;
  types.innerHTML = pokemon.types
    .map(
      (type) => `<span class="type ${type.type.name}">${type.type.name}</span>`
    )
    .join("");
  hp.textContent = getStat(pokemon, "hp");
  attack.textContent = getStat(pokemon, "attack");
  defense.textContent = getStat(pokemon, "defense");
  specialAttack.textContent = getStat(pokemon, "special-attack");
  specialDefense.textContent = getStat(pokemon, "special-defense");
  speed.textContent = getStat(pokemon, "speed");
  sprite.innerHTML = `<img src="${pokemon.sprites.front_default}" id="sprite"/>`;
};

const getStat = (pokemon, stat) => {
  return pokemon.stats.find((currentStat) => currentStat.stat.name === stat)
    .base_stat;
};
