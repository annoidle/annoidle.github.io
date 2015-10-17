'use strict';

var module = angular.module('indexApp.game', []);
module.service('PlayerData', function() {

	var player = {
		gold: 3000,
		food: 3000,
		tool: 3000,
		wood: 3000,
		house: 0,
		lumberjacksHut: 0,
		woodCostForAHouse: 3
	};

	var observers = {
		'wood': [],
		'house': [],
		'tool': [],
		'gold': [],
		'lumberjacksHut': []
	};

	var notify = function(variable) {
		observers[variable].forEach(function(notifyMethod) {
			notifyMethod();
		});
	};

	var buildings = {
		house: {
			wood: 3
		},
		lumberjacksHut: {
			tool: 2,
			gold: 50
		}
	}

	var buy = function(buildingName, number) {
		player[buildingName] += number;
		for (var key in buildings[buildingName]) {
			player[key] = player[key] - buildings[buildingName][key] * number;
			notify(key);
		}
		notify(buildingName);
	}

	return {
		buy: function(buildingName, number) {
			buy(buildingName, number);
		},
		get: function(attributeName) {
			return player[attributeName];
		},
		addObserver: function(variable, notifyMethod) {
			observers[variable].push(notifyMethod);
		},
		getBuildings: function(){
			return Object.keys(buildings);
		}
	}
})