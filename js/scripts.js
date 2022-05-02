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

pokemonList.forEach(function(pokemon) {
  document.write(pokemon.name + ': ' + pokemon.height + ' ' + pokemon.type + ' ' + pokemon.evolutions + ' ')
});

// For loop to list all pokemon name and height in pokemonList
//for (i = 0; i < pokemonList.length; i++) {
//  // If else statement to determine if the height of the pokemon is over 2
//  if (pokemonList[i].height > 2) {
//    document.write(pokemonList[i].name + ": (" + pokemonList[i].height + ") " + " - Wow that's a LARGE Pokemon! ")
//  } else {
//    document.write(pokemonList[i].name + ": (" + pokemonList[i].height + ") " );
//  }
//}
