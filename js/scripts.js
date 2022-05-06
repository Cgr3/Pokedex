//IIFE to stop global state
let pokemonRepository = (function() {

  let pokemonList = [
    // pokemon height is in meters
    {
      name: 'Alakazam',
      height: 1.5,
      type: 'Psychic',
      evolutions: ['Abra', ' Kadabra', ' Alakazam']
    },
    {
      name: 'Dragonite',
      height: 2.2,
      type: ['Dragon', 'Flying'],
      evolutions: ['Dratini', ' Dragonair', ' Dragonite']
    },
    {
      name: 'Blaziken',
      height: 1.9,
      type: ['Fire', 'Fighting'],
      evolutions: ['Torchic', ' Combusken', ' Blaziken']
    },
    {
      name: 'Raichu',
      height: .8,
      type: 'Electric',
      evolutions: ['Pichu', ' Pikachu', ' Raichu']
    }
  ];

  // Add pokemon to list
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  //Pull list of all pokemon
  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokedex = document.querySelector(".poke-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokedex.appendChild(listpokemon);
    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    console.log(pokemon.name);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
  }
})()

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
