'use strict';

describe("A suite", function() {

	beforeEach(angular.mock.module('indexApp.game'));

	describe("At the start of the application", function() {
		it("player has 3k GOLD", inject(function(PlayerData) {
			expect(PlayerData.getGold()).toBe(3000);
		}));
		it("player has 3k FOOD", inject(function(PlayerData) {
			expect(PlayerData.getFood()).toBe(3000);
		}));
		it("player has 3k WOOD", inject(function(PlayerData) {
			expect(PlayerData.getWood()).toBe(3000);
		}));
		it("player has 3k TOOLS", inject(function(PlayerData) {
			expect(PlayerData.getTools()).toBe(3000);
		}));
		it("player has 0 HOUSES", inject(function(PlayerData) {
			expect(PlayerData.getHouses()).toBe(0);
		}));
	});

	describe("When you buy a house", function() {
		it("player gain a house", inject(function(PlayerData) {
			PlayerData.buyHouses(1);
			expect(PlayerData.getHouses()).toBe(1);
		}));

		it("player loses 3 WOOD", inject(function(PlayerData) {
			PlayerData.buyHouses(1);
			expect(PlayerData.getWood()).toBe(3000 - 3);
		}));
	});
});