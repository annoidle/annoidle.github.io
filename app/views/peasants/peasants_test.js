'use strict';

describe("Peasant suite", function() {
	var scope, peasantsCtrl, playerData;

	beforeEach(function() {
		angular.mock.module('indexApp.peasants');

		inject(function($rootScope, $controller, PlayerData) {
			scope = $rootScope.$new();
			playerData = PlayerData;
			peasantsCtrl = $controller('PeasantsController', {
				$scope: scope
			});
		});
		scope.peasants = peasantsCtrl;
		spyOn(playerData, 'buy').and.callThrough();
	});

	describe("At the start of the application", function() {
		it("should initialise the number of houses properly", function() {
			expect(peasantsCtrl.houses).toBe(0);
		});
	});

	describe("When I buy houses", function() {
		it("calls playerData with 3 if I bought 3 houses", function() {
			peasantsCtrl.buyHouse(3);
			expect(playerData.buy).toHaveBeenCalledWith('house', 3);
		});
	});
});