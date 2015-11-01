var module = angular.module('indexApp.game.buildings', []);

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