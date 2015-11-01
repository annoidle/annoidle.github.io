'use strict';

var module = angular.module('indexApp.game', ['indexApp.game.buildings', 'indexApp.game.resources']);

module.service('Player', function(Buildings) {

	var player = {
		resource: {
			gold: 3000,
			tool: 3000,
			wood: 3000
		},
		building: {
			house: 0,
			lumberjacksHut: 0
		}
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

	var spend = function(resourceKey, amount) {
		player['resource'][resourceKey] -= amount;
	}

	var buy = function(buildingKey, amount) {
		player['building'][buildingKey] += amount;
		var resourceList = Buildings.resourcesNeeded(buildingKey);
		resourceList.forEach(function(resourceKey) {
			spend(resourceKey, Buildings.costs(buildingKey, resourceKey) * amount);
			notify(resourceKey);
		});
		notify(buildingKey);
	}

	return {
		buy: function(buildingKey, amount) {
			buy(buildingKey, amount);
		},
		get: function(type, attributeName) {
			return player[type][attributeName];
		},
		addObserver: function(variable, notifyMethod) {
			observers[variable].push(notifyMethod);
		}
	}
})