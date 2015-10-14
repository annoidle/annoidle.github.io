var module = angular.module('indexApp');

module.controller('PeasantsController', function($scope, PlayerData) {
	PlayerData.registerHouses(this);

	this.buyHouse = function(housesToBuy) {
		if (isNaN(housesToBuy)) {
			return;
		}
		if (parseInt(housesToBuy) != housesToBuy) {
			return;
		}
		PlayerData.buyHouses(parseInt(housesToBuy));
	}

	this.housesUpdated = function() {
		this.houses = PlayerData.getHouses();
	}

	this.housesUpdated();
});