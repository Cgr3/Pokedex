//IIFE to stop global state
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

  function showDialog(title, text) {
    showModal(pokemon.name, pokemon.height);

    let modal = modalContainer.querySelector('.modal');

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

  function loadDetails(item) {
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
      modalContainer.innerHTML = '';

      //creating modal
      let modal = document.createElement('div');
      modal.classList.add('modal');

      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);

      //creating text in modal
      let titleElement = document.createElement('h1');
      titleElement.innerText = 'pokemon.item';

      let contentElement = document.createElement('p');
      contentElement.innerText = 'pokemon.height';

      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modalContainer.appendChild(modal);

      //changing visibility
      modalContainer.classList.add('is-visible');
    }

    //Hiding modal
    function hideModal() {
      modalContainer.classList.remove('is-visible');
    }

    //allowing escape to close modal
    window.addEventListener('keydown', (e) => {
     if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
       hideModal();
     }
   });

    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
       hideModal();
      }
    });

    document.querySelector('#show-modal').addEventListener('click', () => {
      showModal('Pokemon');
    });

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
