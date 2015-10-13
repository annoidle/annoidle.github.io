var module = angular.module('indexApp');

module.controller('PeasantsController', function() {
	this.houses = 0;

	this.buyHouse = function(housesToBuy) {
		if(isNaN(housesToBuy)) {
			return;
		}
		if(parseInt(housesToBuy) != housesToBuy) {
			return;
		}
		this.houses = parseInt(this.houses) + parseInt(housesToBuy);
	}
});