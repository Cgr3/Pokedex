let pokemonRepository = (function() {
	let t = [], e = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
	function n(e) {
		'object' == typeof e && 'name' in e ? t.push(e) : console.log('pokemon is not correct');
	}
	function o(t) {
		pokemonRepository.loadDetails(t).then(function() {
			!(function(t) {
				let e = $('.modal-body'),
					n = $('.modal-title'),
					o = $('<h1>' + t.name + '</h1>'),
					i = $('<img class="modal-img" style="width:50%">');
				i.attr('src', t.imageUrl);
				let l = $('<p>height : ' + t.height + '</p>'),
					a = $('<p>weight : ' + t.weight + '</p>'),
					c = document.createElement('p');
				t.types.forEach((e, n) => {
					n === t.types.length - 1 ? c.innerText += e.type.name : c.innerText += e.type.name + ', ';
				}), n.empty(), e.empty(), n.append(o), e.append(i), e.append(l), e.append(a);
			})(t), console.log(t);
		});
	}
	return {
		add: n,
		getAll: function() {
			return t;
		},
		addListItem: function(t) {
			let e = document.querySelector('.pokemon-list'), n = document.createElement('li');
			n.classList.add('group-pokemon-list');
			let i = document.createElement('button');
			i.innerText = t.name, i.classList.add('button-class'), i.setAttribute('data-toggle', 'modal'), i.setAttribute(
				'data-target',
				'#pokemonModal'
			), n.appendChild(i), e.appendChild(n), (function(t, e) {
				t.addEventListener('click', function() {
					o(e);
				});
			})(i, t);
		},
		showDetails: o,
		loadList: function() {
			return fetch(e)
				.then(function(t) {
					return t.json();
				})
				.then(function(t) {
					t.results.forEach(function(t) {
						n({ name: t.name, height: t.name, detailsUrl: t.url });
					});
				})
				.catch(function(t) {
					console.log(t);
				});
		},
		loadDetails: function(t) {
			let e = t.detailsUrl;
			return fetch(e)
				.then(function(t) {
					return t.json();
				})
				.then(function(e) {
					t.imageUrl = e.sprites.front_default, t.height = e.height, t.weight = e.weight, t.types = e.types;
				})
				.catch(function(t) {
					console.error(t);
				});
		},
	};
})();
pokemonRepository.loadList().then(function() {
	pokemonRepository.getAll().forEach(function(t) {
		pokemonRepository.addListItem(t);
	});
});
