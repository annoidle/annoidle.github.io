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

module.directive('resources', function() {
	return {
		restrict: 'E',
		templateUrl: 'resources/resources.html',
		controller: 'ResourcesController',
		controllerAs: 'resources'
	}
});

module.directive('peasants', function() {
	return {
		restrict: 'E',
		templateUrl: 'peasants/peasants.html',
		controller: 'PeasantsController',
		controllerAs: 'peasants'
	}
});