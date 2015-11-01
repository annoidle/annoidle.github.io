var module = angular.module('indexApp.resources', ['indexApp.game', 'indexApp.controller_enricher']);

module.controller('ResourcesController', ['Resources', 'ControllerEnricher', function(Resources, ControllerEnricher) {
	ControllerEnricher.enrich(this, Resources.getResourceTypes(), 'resource');
}]);