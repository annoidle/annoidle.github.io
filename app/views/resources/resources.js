var module = angular.module('indexApp.resources', ['indexApp.game']);

module.controller('ResourcesController', function($scope, PlayerData) {
	this.woodUpdated = function() {
		$scope.resources.wood = PlayerData.get('wood');
	}
	PlayerData.addObserver('wood', this.woodUpdated);

	this.gold = PlayerData.get('gold');
	this.food = PlayerData.get('food');
	this.tool = PlayerData.get('tool');
	this.woodUpdated();
});