var module = angular.module('indexApp.peasants', ['indexApp.game']);

module.controller('PeasantsController', ['$scope', 'PlayerData', 'Buildings', function($scope, PlayerData, Buildings) {

	var controller = this;

	var isPositiveInteger = function(number) {
		return !isNaN(number) && parseInt(number) == number;
	};

	this.buy = function(building, numberToBuy) {
		if (isPositiveInteger(numberToBuy)) {
			PlayerData.buy(building, parseInt(numberToBuy));
		}
	}

	this.buildings = Buildings.getBuildings();

	this.buildings.forEach(function(building) {
		var functionName = building + 'Updated';
		controller[functionName] = function() {
			$scope.peasants[building] = PlayerData.getBuilding(building);
		};
		PlayerData.addObserver(building, controller[functionName]);

		controller[building] = PlayerData.getBuilding(building);
	});
}]);