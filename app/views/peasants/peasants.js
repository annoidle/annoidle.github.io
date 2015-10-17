var module = angular.module('indexApp.peasants', ['indexApp.game']);

module.controller('PeasantsController', ['$scope', 'PlayerData', function($scope, PlayerData) {

	this.buyHouse = function(housesToBuy) {
		if (isNaN(housesToBuy)) {
			return;
		}
		if (parseInt(housesToBuy) != housesToBuy) {
			return;
		}
		PlayerData.buy('house', parseInt(housesToBuy));
	}

	this.housesUpdated = function() {
		$scope.peasants.houses = PlayerData.getHouses();
	}

	PlayerData.addObserver('house', this.housesUpdated);
	this.houses = PlayerData.getHouses();
}]);