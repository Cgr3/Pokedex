let a=function(){let e=[];function b(){return e}function c(a){"object"==typeof a&&"name"in a?e.push(a):console.log("pokemon is not correct")}function d(b){a.loadDetails(b).then(function(){f(b),console.log(b)})}function f(a){let b=$(".modal-body"),c=$(".modal-title"),f=$("<h1>"+a.name+"</h1>"),d=$('<img class="modal-img" style="width:50%">');d.attr("src",a.imageUrl);let g=$("<p>height : "+a.height+"</p>"),h=$("<p>weight : "+a.weight+"</p>"),e=document.createElement("p");e.innerText+="types: ",a.types.forEach((b,c)=>{c===a.types.length-1?e.innerText+=b.type.name:e.innerText+=b.type.name+", "}),c.empty(),b.empty(),c.append(f),b.append(d),b.append(g),b.append(h),b.append(e)}return{add:c,getAll:b,addListItem:function(c){let e=document.querySelector(".pokemon-list"),b=document.createElement("li");b.classList.add("group-pokemon-list"),b.classList.add("list-group-item");let a=document.createElement("button");a.innerText=c.name,a.classList.add("button-class"),a.classList.add("btn"),a.classList.add("btn-primary"),a.setAttribute("data-toggle","modal"),a.setAttribute("data-target","#pokemonModal"),b.appendChild(a),e.appendChild(b),function(a,b){a.addEventListener("click",function(){d(b)})}(a,c)},showDetails:d,loadList:function(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(a){return a.json()}).then(function(a){a.results.forEach(function(a){c({name:a.name,height:a.name,detailsUrl:a.url})})}).catch(function(a){console.log(a)})},loadDetails:function(a){return fetch(a.detailsUrl).then(function(a){return a.json()}).then(function(b){a.imageUrl=b.sprites.front_default,a.height=b.height,a.weight=b.weight,a.types=b.types}).catch(function(a){console.error(a)})}}}();a.loadList().then(function(){a.getAll().forEach(function(b){a.addListItem(b)})})
