'use strict';

var module = angular.module('indexApp.clock', ['indexApp.game']);

module.controller('ClockController', function($timeout, $scope, Player) {
	var tick = function() {
		$scope.clock.time = new Date();
		Player.tick();
		$timeout(tick, 1000);
	}
	tick();
});