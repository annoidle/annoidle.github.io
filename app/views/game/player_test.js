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
		var alertable = null;
		var alertable2 = null;

		beforeEach(function() {
			alertable = {
				housesUpdated: function(value) {},
				woodUpdated: function(value) {}
			};

			alertable2 = {
				housesUpdated: function(value) {},
				woodUpdated: function(value) {}
			};

			spyOn(alertable, 'housesUpdated');
			spyOn(alertable, 'woodUpdated');
			spyOn(alertable2, 'housesUpdated');
			spyOn(alertable2, 'woodUpdated');
		});


		it("player gain a house", inject(function(PlayerData) {
			PlayerData.buyHouses(1);
			expect(PlayerData.getHouses()).toBe(1);
		}));

		it("player loses 3 WOOD", inject(function(PlayerData) {
			PlayerData.buyHouses(1);
			expect(PlayerData.getWood()).toBe(3000 - 3);
		}));

		it("alerts registed HOUSES observers", inject(function(PlayerData) {
			PlayerData.registerHouses(alertable);
			PlayerData.registerHouses(alertable2);
			PlayerData.buyHouses(1);
			 expect(alertable.housesUpdated).toHaveBeenCalled();
			 expect(alertable2.housesUpdated).toHaveBeenCalled();
		}));

		it("alerts registed WOOD observers", inject(function(PlayerData) {
			PlayerData.registerWood(alertable);
			PlayerData.registerWood(alertable2);
			PlayerData.buyHouses(1);
			 expect(alertable.woodUpdated).toHaveBeenCalled();
			 expect(alertable2.woodUpdated).toHaveBeenCalled();
		}));
	});
});