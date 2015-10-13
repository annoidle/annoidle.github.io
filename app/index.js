'use strict';

angular.module('indexApp', [])

.controller('ClockController', ['$timeout', '$scope', function($timeout, $scope) {
	var tick = function() {
		$scope.clock.time = new Date();
		$timeout(tick, 1000);
	}
	tick();
}]);