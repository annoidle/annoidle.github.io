'use strict';

var module = angular.module('indexApp.game', []);
module.service('PlayerData', function() {

	var player = {
		gold: 3000,
		food: 3000,
		tools: 3000,
		wood: 3000,
		house: 0,
		lumberjacksHut: 0,
		woodCostForAHouse: 3
	};

	var observers = {
		'wood': [],
		'house': [],
		'tools': [],
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
			tools: 2,
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
		buy : function(buildingName, number) {
			buy(buildingName, number);
		},
		getLumberjacksHut: function() {
			return player.lumberjacksHut;
		},
		getGold: function() {
			return player.gold;
		},
		getFood: function() {
			return player.food;
		},
		getTools: function() {
			return player.tools;
		},
		getWood: function() {
			return player.wood;
		},
		getHouses: function() {
			return player.house;
		},
		addObserver: function(variable, notifyMethod) {
			observers[variable].push(notifyMethod);
		},
	}
})