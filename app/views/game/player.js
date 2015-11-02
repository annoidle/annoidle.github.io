'use strict';

var module = angular.module('indexApp.game', ['indexApp.game.buildings', 'indexApp.game.resources']);

module.service('Player', function(Buildings) {

	var player = {
		resource: {
			gold: 3000,
			tool: 3000,
			wood: 3000,
			peasant: 0,
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
		'peasant' : [],
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

	var checkResources = function(buildingKey, amount, resourceList) {
		var success = true;
		resourceList.forEach(function(resourceKey) {
			var price = Buildings.costs(buildingKey, resourceKey) * amount;
			success = success && price < get('resource', resourceKey);
		});
		return success;
	};

	var buyBuilding = function(buildingKey, amount, resourceList) {
		player['building'][buildingKey] += amount;
		resourceList.forEach(function(resourceKey) {
			var price = Buildings.costs(buildingKey, resourceKey) * amount;
			spend(resourceKey, price);
			notify(resourceKey);
		});
		notify(buildingKey);
	};

	var buy = function(buildingKey, amount) {
		var resourceList = Buildings.resourcesNeeded(buildingKey);
		if (checkResources(buildingKey, amount, resourceList)) {
			buyBuilding(buildingKey, amount, resourceList);
		}
	}

	var tick = function() {
		var lumberjacksHutOwned = player['building']['lumberjacksHut'];
		if (lumberjacksHutOwned > 0) {
			player['resource']['wood'] += 0.025 * player['building']['lumberjacksHut'];
			notify('wood');
		}
	};

	var get = function(type, attributeName) {
		return player[type][attributeName];
	}

	return {
		tick: function() {
			tick();
		},
		buy: function(buildingKey, amount) {
			buy(buildingKey, amount);
		},
		get: function(type, attributeName) {
			return get(type, attributeName);
		},
		set: function(type, attributeName, value) {
			player[type][attributeName] = value;
		},
		addObserver: function(variable, notifyMethod) {
			observers[variable].push(notifyMethod);
		}
	}
})