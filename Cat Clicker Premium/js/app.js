'use strict';

document.addEventListener('DOMContentLoaded', (event) => {
	octopus.init();
});

var model = {
	currentCat: null,
	cats: [{name:'cat',clickCount: 0,image:'img/cat.jpg',description:'picture of a cat by name cat'},
		   {name:'catte',clickCount: 0,image:'img/catte.jpg',description:'picture of a cat by name catte'},
		   {name:'claws',clickCount: 0,image:'img/claws.jpg',description:'picture of a cat by name claws'},
		   {name:'cuddles',clickCount: 0,image:'img/cuddles.jpg',description:'picture of a cat by name cuddles'},
		   {name:'meow',clickCount: 0,image:'img/meow.jpg',description:'picture of a cat by name meow'},
		   {name:'purr',clickCount: 0,image:'img/purr.jpg',description:'picture of a cat by name purr'} ],
};

var octopus = {
	init: function() {
		model.currentCat =  model.cats[0];
 		catListView.init();
 		catView.init();
 	},

	getcats: function() {
		return model.cats;
	},

	setCurrentCat: function(cat) {
		model.currentCat =  cat;
	},

	getCurrentCat: function() {
		return model.currentCat;
	},

	updateClickCounter: function() {
		var catNow = this.getCurrentCat();
		catNow.clickCount++;
		catView.disaplayCounter(catNow);
		// catView.render();
	}
};

var catView = {
	init: function() {
		this.currentCatTag = document.querySelector('#currentCat');
		this.createFigCapTag = document.createElement('figcaption');
		this.imgTag = document.createElement('img');
		this.counterSpan = document.querySelector('#clickCounter');
		this.currentCatTag.addEventListener('click',function() {
        	octopus.updateClickCounter();
        });
        this.render();
    },

    render: function() {
    	this.currentCatTag.innerHTML ='';
    	this.counterSpan.innerHTML =0;
        this.currentCatTag.appendChild(this.createFigCapTag);
        this.currentCatTag.appendChild(this.imgTag);
		const currentCat = octopus.getCurrentCat();
		this.createFigCapTag.setAttribute('title',currentCat.name);
		this.createFigCapTag.innerHTML = '<h3>Hello!! - My name is <i>'+ currentCat.name + '</i></h3>';
		this.imgTag.setAttribute('src',currentCat.image);
		this.imgTag.setAttribute('class','currentCatImage');
		this.imgTag.setAttribute('title',currentCat.name);
		this.imgTag.setAttribute('alt',currentCat.description);
    },

    disaplayCounter: function(cat) {
    	this.counterSpan.innerHTML = cat.clickCount;
    }
};

var catListView = {

	init: function() {
		this.catList = document.querySelector('#catsSelectionList');
		this.render();
	},

	render: function() {
		this.catList.innerHTML = '';
		const createUlTag = document.createElement('ul');
		createUlTag.setAttribute('class', 'cats');
		var catsArray = octopus.getcats();
		catsArray.forEach( function(cat) {
			var createLiTag = document.createElement('li');
			var createImgTag = document.createElement('img');
			createImgTag.setAttribute('class','catSmlPicture');
			createImgTag.setAttribute('src',cat.image);
			createImgTag.setAttribute('title',cat.name);
			createImgTag.setAttribute('alt',cat.description);
			createLiTag.appendChild(createImgTag);
			createUlTag.appendChild(createLiTag);
			createImgTag.addEventListener('click', (function(currentCat) {
        		return function() {
        			octopus.setCurrentCat(currentCat);
					catView.render();
       			};
    	})(cat));
		});
		this.catList.appendChild(createUlTag);
	}
};









// function displaycatsList(array) {
// 	document.querySelector('.playerList').innerHTML ="";
// 	const createUlTag = document.createElement('ul');
// 	createUlTag.setAttribute('class', 'cats');

// 	array.forEach(function(element) {
// 		const createLiTag = document.createElement('li');
// 		const createImgTag = document.createElement('img');
// 		createImgTag.setAttribute('class','playerPic');
// 		createImgTag.setAttribute('src',element);
// 		createImgTag.setAttribute('alt',element.substr(4,4) +" picture");
// 		createLiTag.appendChild(createImgTag);
// 		createUlTag.appendChild(createLiTag);
// 		createImgTag.addEventListener('click', (function(ele) {
//         return function() {
//         	document.querySelector('#currentCat').innerHTML ='';
//         	clickCount.innerHTML = 0;
//         	counter =0;
//         	const createFigCapTag = document.createElement('figcaption');
//         	createFigCapTag.setAttribute('id',element.substr(4,4) +" name")
//         	const imgTag = document.createElement('img');
// 			imgTag.setAttribute('src',element);
// 			imgTag.setAttribute('alt',element.substr(4,4) +" picture");
//             document.querySelector('#currentCat').appendChild(createFigCapTag);
//             document.querySelector('#currentCat').appendChild(imgTag);
//             document.querySelector('#currentCat').addEventListener('click',increment);
//         };
//     	})(element));

// 	});
// 	document.querySelector('.playerList').appendChild(createUlTag);
// };