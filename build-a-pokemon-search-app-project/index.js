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

// freeCodeCamp solution
// const pokemonID = document.getElementById('pokemon-id');
// const pokemonName = document.getElementById('pokemon-name');
// const spriteContainer = document.getElementById('sprite-container');
// const types = document.getElementById('types');
// const height = document.getElementById('height');
// const weight = document.getElementById('weight');
// const hp = document.getElementById('hp');
// const attack = document.getElementById('attack');
// const defense = document.getElementById('defense');
// const specialAttack = document.getElementById('special-attack');
// const specialDefense = document.getElementById('special-defense');
// const speed = document.getElementById('speed');
// const searchForm = document.getElementById('search-form');
// const searchInput = document.getElementById('search-input');

// const getPokemon = async () => {
//   try {
//     const pokemonNameOrId = searchInput.value.toLowerCase();
//     const response = await fetch(
//       `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`
//     );
//     const data = await response.json();

//     // Set Pokémon info
//     pokemonName.textContent = `${data.name.toUpperCase()}`;
//     pokemonID.textContent = `#${data.id}`;
//     weight.textContent = `Weight: ${data.weight}`;
//     height.textContent = `Height: ${data.height}`;
//     spriteContainer.innerHTML = `
//       <img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">
//     `;

//     // Set stats
//     hp.textContent = data.stats[0].base_stat;
//     attack.textContent = data.stats[1].base_stat;
//     defense.textContent = data.stats[2].base_stat;
//     specialAttack.textContent = data.stats[3].base_stat;
//     specialDefense.textContent = data.stats[4].base_stat;
//     speed.textContent = data.stats[5].base_stat;

//     // Set types
//     types.innerHTML = data.types
//       .map(obj => `<span class="type ${obj.type.name}">${obj.type.name}</span>`)
//       .join('');
//   } catch (err) {
//     resetDisplay();
//     alert('Pokémon not found');
//     console.log(`Pokémon not found: ${err}`);
//   }
// };

// const resetDisplay = () => {
//   const sprite = document.getElementById('sprite');
//   if (sprite) sprite.remove();

//   // reset stats
//   pokemonName.textContent = '';
//   pokemonID.textContent = '';
//   types.innerHTML = '';
//   height.textContent = '';
//   weight.textContent = '';
//   hp.textContent = '';
//   attack.textContent = '';
//   defense.textContent = '';
//   specialAttack.textContent = '';
//   specialDefense.textContent = '';
//   speed.textContent = '';
// };

// searchForm.addEventListener('submit', e => {
//   e.preventDefault();
//   getPokemon();
// });
