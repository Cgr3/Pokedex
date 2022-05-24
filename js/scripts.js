//IIFE to stop global state
let pokemonRepository = (function() {
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

	//Pull list of all pokemon
	function getAll() {
		return pokemonList;
	}

	// Add pokemon to list
	function add(pokemon) {
		if (typeof pokemon === 'object' && 'name' in pokemon) {
			pokemonList.push(pokemon);
		} else {
			console.log('pokemon is not correct');
		}
	}

	function addListItem(pokemon) {
		let pokedex = document.querySelector('.pokemon-list');
		//creating li
		let pokeItem = document.createElement('li');
		//adding classList to li
		pokeItem.classList.add('group-pokemon-list');
		//creating button
		let button = document.createElement('button');
		button.innerText = pokemon.name;
		button.classList.add('button-class');
		button.setAttribute('data-toggle', 'modal');
		button.setAttribute('data-target', '#pokemonModal');
		pokeItem.appendChild(button);
		pokedex.appendChild(pokeItem);
		addEvent(button, pokemon);
	}

	//onclick function
	function addEvent(button, pokemon) {
		button.addEventListener('click', function() {
			showDetails(pokemon);
		});
	}

	function loadList() {
		return fetch(apiUrl)
			.then(function(response) {
				return response.json();
			})
			.then(function(json) {
				json.results.forEach(function(item) {
					let pokemon = {
						name: item.name,
						height: item.name,
						detailsUrl: item.url,
					};
					add(pokemon);
				});
			})
			.catch(function(e) {
				console.log(e);
			});
	}

	function loadDetails(item) {
		let url = item.detailsUrl;
		return fetch(url)
			.then(function(response) {
				return response.json();
			})
			.then(function(details) {
				//now we add details for addListItem
				item.imageUrl = details.sprites.front_default;
				item.height = details.height;
				item.weight = details.weight;
				item.types = details.types;
			})
			.catch(function(e) {
				console.error(e);
			});
	}

	function showDetails(item) {
		pokemonRepository.loadDetails(item).then(function() {
			showModal(item);
			console.log(item);
		});
	}

	/* eslint-disable */
	//function showing pokemon modal
	function showModal(pokemon) {
		//Modal classes
		let modalBody = $('.modal-body');
		let modalTitle = $('.modal-title');

		//creating name in modal
		let pokemonName = $('<h1>' + pokemon.name + '</h1>');
		//Creating Image in modal
		let imageUrl = $('<img class="modal-img" style="width:50%">');
		imageUrl.attr('src', pokemon.imageUrl);

		//Creating height element in modal
		let pokemonHeight = $('<p>' + 'height : ' + pokemon.height + '</p>');

		//creating weight element in modal
		let pokemonWeight = $('<p>' + 'weight : ' + pokemon.weight + '</p>');
		let modalText = document.createElement('p');
		/* eslint-enable */

		//ForEach loop creating pokemon
		pokemon.types.forEach((type, index) => {
			if (index === pokemon.types.length - 1) {
				modalText.innerText += type.type.name;
			} else {
				modalText.innerText += type.type.name + ', ';
			}
		});

		//remove data from in modal
		modalTitle.empty();
		modalBody.empty();

		modalTitle.append(pokemonName);
		modalBody.append(imageUrl);
		modalBody.append(pokemonHeight);
		modalBody.append(pokemonWeight);
	}

	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		showDetails: showDetails,
		loadList: loadList,
		loadDetails: loadDetails,
	};
})();

pokemonRepository.loadList().then(function() {
	pokemonRepository.getAll().forEach(function(pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});
