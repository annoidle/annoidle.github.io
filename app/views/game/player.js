'use strict';

var module = angular.module('indexApp.game', []);
module.service('Buildings', function() {
	var buildings = {
		house: {
			name: "House",
			cost: {
				wood: 3
			}
		},
		lumberjacksHut: {
			name: "Lumberjack's hut",
			cost: {
				tool: 2,
				gold: 50
			}
		}
	};

	return {
		resourcesNeeded: function(buildingKey) {
			return Object.keys(buildings[buildingKey]['cost']);
		},
		costs: function(buildingKey, resource) {
			return buildings[buildingKey]['cost'][resource];
		},
		getBuildings: function() {
			return Object.keys(buildings);
		}
	}
});

module.service('Resources', function(){
	return {
		getResourceTypes:function(){
			return ["gold", "wood", "tool"];
		}
	};
});

module.service('PlayerData', function(Buildings) {

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
		getResource: function(attributeName) {
			return player['resource'][attributeName];
		},
		getBuilding: function(attributeName) {
			return player['building'][attributeName];
		},
		addObserver: function(variable, notifyMethod) {
			observers[variable].push(notifyMethod);
		}
	}
})