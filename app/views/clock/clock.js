'use strict';

var module = angular.module('indexApp.clock', []);

module.controller('ClockController', function($timeout, $scope) {
	var tick = function() {
		$scope.clock.time = new Date();
		$timeout(tick, 1000);
	}
	tick();
});