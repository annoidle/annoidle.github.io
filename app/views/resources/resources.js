var module = angular.module('indexApp');

module.controller('ResourcesController', function(PlayerData) {
	this.woodUpdated = function() {
		this.wood = PlayerData.getWood();
	}
	PlayerData.registerWood(this);

	this.gold = PlayerData.getGold();
	this.food = PlayerData.getFood();
	this.tools = PlayerData.getTools();
	this.woodUpdated();
});