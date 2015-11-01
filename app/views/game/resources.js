var module = angular.module('indexApp.game.resources', []);

module.service('Resources', function() {
	return {
		getResourceTypes: function() {
			return ["gold", "wood", "tool"];
		}
	};
});
