var module = angular.module('indexApp.controller_enricher', ['indexApp.game']);


module.service('ControllerEnricher', ['Player', function(Player) {

	var addResourcesAttributes = function(controller, resourceKey, type) {
		controller[resourceKey] = Player.get(type, resourceKey);
	};

	var addUpdateFunctions = function(controller, resourceKey, type) {
		var functionName = resourceKey + 'Updated';
		controller[functionName] = function() {
			controller[resourceKey] = Player.get(type, resourceKey);
		};
		Player.addObserver(resourceKey, controller[functionName]);
	};

	var addResourceList = function(controller, resources){
		controller['resources'] = resources;
	}

	return {
		enrich: function(controller, resources, type) {
			addResourceList(controller, resources);
			resources.forEach(function(resourceKey) {
				addResourcesAttributes(controller, resourceKey, type);
				addUpdateFunctions(controller, resourceKey, type);
			});
		}
	}
}]);