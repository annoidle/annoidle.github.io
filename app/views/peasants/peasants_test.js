'use strict';

describe("Peasant suite", function() {
	var scope, peasantsCtrl, player;

	beforeEach(function() {
		angular.mock.module('indexApp.peasants');

		inject(function($rootScope, $controller, Player) {
			scope = $rootScope.$new();
			player = Player;
			peasantsCtrl = $controller('PeasantsController', {
				$scope: scope
			});
		});
		scope.peasants = peasantsCtrl;
		spyOn(player, 'buy').and.callThrough();
	});

	describe("At the start of the application", function() {
		it("should initialise the number of houses properly", function() {
			expect(peasantsCtrl.house).toBe(0);
		});
	});

	describe("When I buy houses", function() {
		it("calls player with 3 if I bought 3 houses", function() {
			peasantsCtrl.buy('house', 3);
			expect(player.buy).toHaveBeenCalledWith('house', 3);
		});
		it("updates the number of houses", function() {
			peasantsCtrl.buy('house', 3);
			expect(peasantsCtrl.house).toBe(3);
		});
	});
});