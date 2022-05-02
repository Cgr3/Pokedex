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

  //Add pokemon to list
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  //Pull list of all pokemon
  function getAll() {
    return pokemonList;
  }
  
  return {
    add: add,
    getAll: getAll
  }
})()

pokemonRepository.getAll().forEach(function(pokemon) {
  document.write(pokemon.name + ' ' + pokemon.height + ' ' + pokemon.type + ' ' + pokemon.evolutions);
});
