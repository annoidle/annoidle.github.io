var module = angular.module('indexApp.peasants', ['indexApp.game']);

module.controller('PeasantsController', ['PlayerData', 'Buildings', 'ControllerEnricher', function(PlayerData, Buildings, ControllerEnricher) {

	var isPositiveInteger = function(number) {
		return !isNaN(number) && parseInt(number) == number;
	};

	this.buy = function(building, numberToBuy) {
		if (isPositiveInteger(numberToBuy)) {
			PlayerData.buy(building, parseInt(numberToBuy));
		}
	};

	ControllerEnricher.enrich(this, Buildings.getBuildings(), 'building');
}]);