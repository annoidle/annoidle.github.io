'use strict';

var module = angular.module('indexApp.game', []);
module.service('PlayerData', function() {

	var gold = 3000;
	var food = 3000;
	var tools = 3000;
	var wood = 3000;
	var houses = 0;
	var woodCostForAHouse = 3;
	var observers = {
		'wood':[],
		'houses':[],
	};
	var registeredForHouses = [];
	var registeredForWood = [];

	var notify = function(variable) {
		observers[variable].forEach(function(notifyMethod) {
			notifyMethod();
		});
	};

	return {
		buyHouses: function(numberOfHousesToBuy) {
			houses = houses + numberOfHousesToBuy;
			wood = wood - numberOfHousesToBuy * woodCostForAHouse;
			notify('houses');
			notify('wood');
		},
		getGold: function() {
			return gold;
		},
		getFood: function() {
			return food;
		},
		getTools: function() {
			return tools;
		},
		getWood: function() {
			return wood;
		},
		getHouses: function() {
			return houses;
		},
		addObserver: function(variable, notifyMethod){
			observers[variable].push(notifyMethod);
		},
	}
})