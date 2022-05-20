//IIFE to stop global state
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  //Pull list of all pokemon
  function getAll() {
    return pokemonList;
  }

  // Add pokemon to list
  function add(pokemon) {
    if (
      typeof pokemon === "object" && "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function addListItem(pokemon) {
    let pokedex = document.querySelector(".list-group");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    button.classList.add("group-list-item");
    listpokemon.appendChild(button);
    pokedex.appendChild(listpokemon);
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          height: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.log(e);
    })
  }

  function loadDetails(pokemon) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      //now we add details for addListItem
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  //function showing pokemon modal
  function showModal(pokemon) {
    //Modal classes
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

    //remove data from in modal
    modalTitle.empty();
    modalBody.empty();

    //creating name in modal
    let nameElement = $("<h1>" + item.name + "</h1>");
    //Creating Image in modal
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", item.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr("src", item.imageUrlBack);

    //Creating height element in modal
    let heightElement = $("<p>" + "height : " + item.height + "</p>");

    //creating weight element in modal
    let weightElement = $("<p>" + "weight : " + item.weight + "</p>");

    //creating element for type in modal
    let typesElement = $("<p>" + "types : " + item.types + "</p>");

    //creating element for abilities in modal
    let abilitiesElement = $("<p>" + "abilities : " + item.abilities + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
