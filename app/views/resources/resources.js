var module = angular.module('indexApp.resources', ['indexApp.game']);

module.controller('ResourcesController', function($scope, PlayerData, Resources) {
	var controller = this;

	var resources = Resources.getResourceTypes();

	resources.forEach(function(resourceKey) {
		controller[resourceKey] = PlayerData.getResource(resourceKey);

		var functionName = resourceKey + 'Updated';
		controller[functionName] = function() {
			$scope.resources[resourceKey] = PlayerData.getResource(resourceKey);
		};
		PlayerData.addObserver(resourceKey, controller[functionName]);
	});

});