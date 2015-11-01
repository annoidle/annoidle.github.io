var module = angular.module('indexApp.peasants', ['indexApp.game', 'indexApp.controller_enricher']);

module.controller('PeasantsController', ['Player', 'Buildings', 'ControllerEnricher', function(Player, Buildings, ControllerEnricher) {

	var isPositiveInteger = function(number) {
		return !isNaN(number) && parseInt(number) == number;
	};

	this.buy = function(building, numberToBuy) {
		if (isPositiveInteger(numberToBuy)) {
			Player.buy(building, parseInt(numberToBuy));
		}
	};

	ControllerEnricher.enrich(this, Buildings.getBuildings(), 'building');
}]);