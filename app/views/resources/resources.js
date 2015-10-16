var module = angular.module('indexApp.resources', ['indexApp.game']);

module.controller('ResourcesController', function($scope, PlayerData) {
	this.woodUpdated = function() {
		$scope.resources.wood = PlayerData.getWood();
	}
	PlayerData.addObserver('wood', this.woodUpdated);

	this.gold = PlayerData.getGold();
	this.food = PlayerData.getFood();
	this.tools = PlayerData.getTools();
	this.woodUpdated();
});