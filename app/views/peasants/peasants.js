var module = angular.module('indexApp.peasants', ['indexApp.game']);

module.controller('PeasantsController', ['$scope', 'PlayerData', function($scope, PlayerData) {

	var controller = this;

	var isPositiveInteger = function(number) {
		return !isNaN(number) && parseInt(number) == number;
	};

	this.buy = function(building, numberToBuy) {
		if (isPositiveInteger(numberToBuy)) {
			PlayerData.buy(building, parseInt(numberToBuy));
		}
	}

	PlayerData.getBuildings().forEach(function(building) {
		var functionName = building + 'Updated';
		controller[functionName] = function() {
			$scope.peasants[building] = PlayerData.get(building);
		};
		PlayerData.addObserver(building, controller[functionName]);

		controller[building] = PlayerData.get(building);
	});
}]);