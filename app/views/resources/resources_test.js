'use strict';

describe("Resources suite", function() {
	var scope, resourceCtrl, player, buildings;

	beforeEach(function() {
		angular.mock.module('indexApp.resources');

		inject(function($rootScope, $controller, Player, Buildings) {
			scope = $rootScope.$new();
			player = Player;
			buildings = Buildings;
			resourceCtrl = $controller('ResourcesController', {
				$scope: scope
			});
		});
		scope.resources = resourceCtrl;
		spyOn(player, 'addObserver').and.callThrough();
	});

	describe("At the start of the application", function() {
		it("should initialise the number of gold properly", function() {
			expect(resourceCtrl.gold).toBe(3000);
		});
	});

});