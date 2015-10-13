'use strict';

var module = angular.module('indexApp');

module.directive('clock', function() {
	return {
		restrict: 'E',
		templateUrl: 'clock/clock.html',
		controller: 'ClockController',
		controllerAs: 'clock'
	}
});