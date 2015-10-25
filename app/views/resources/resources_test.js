'use strict';

describe("Resources suite", function() {
	var scope, resourceCtrl, playerData, buildings;

	beforeEach(function() {
		angular.mock.module('indexApp.resources');

		inject(function($rootScope, $controller, PlayerData, Buildings) {
			scope = $rootScope.$new();
			playerData = PlayerData;
			buildings = Buildings;
			resourceCtrl = $controller('ResourcesController', {
				$scope: scope
			});
		});
		scope.resources = resourceCtrl;
	});

	describe("At the start of the application", function() {
		it("should initialise the number of gold properly", function() {
			expect(resourceCtrl.gold).toBe(3000);
		});
	});
});