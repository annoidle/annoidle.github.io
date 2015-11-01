var module = angular.module('indexApp.resources', ['indexApp.game']);

module.controller('ResourcesController', ['Resources', 'ControllerEnricher', function(Resources, ControllerEnricher) {
	ControllerEnricher.enrich(this, Resources.getResourceTypes(), 'resource');
}]);