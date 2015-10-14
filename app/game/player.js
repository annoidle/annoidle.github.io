'use strict';

var module = angular.module('indexApp');
module.service('PlayerData', function() {

	var gold = 3000;
	var food = 3000;
	var tools = 3000;
	var wood = 3000;
	var houses = 0;
	var woodCostForAHouse = 3;
	var registeredForHouses = [];
	var registeredForWood = [];

	var alertHouses = function() {
		registeredForHouses.forEach(function(alertable) {
			alertable.housesUpdated();
		});
	};
	var alertWood = function() {
		registeredForWood.forEach(function(alertable) {
			alertable.woodUpdated();
		});
	};

	return {
		buyHouses: function(numberOfHousesToBuy) {
			houses = houses + numberOfHousesToBuy;
			wood = wood - numberOfHousesToBuy * woodCostForAHouse;
			alertHouses();
			alertWood();
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
		registerHouses: function(alertable) {
			registeredForHouses.push(alertable);
		},
		registerWood: function(alertable) {
			registeredForWood.push(alertable);
		}
	}
})