'use strict';

describe("Player suite", function() {
	var playerData;

	beforeEach(function() {
		angular.mock.module('indexApp.game');
		inject(function(PlayerData) {
			playerData = PlayerData;
		});
	});

	describe("At the start of the application", function() {
		it("player has 3k GOLD", function() {
			expect(playerData.getGold()).toBe(3000);
		});
		it("player has 3k FOOD", function() {
			expect(playerData.getFood()).toBe(3000);
		});
		it("player has 3k WOOD", function() {
			expect(playerData.getWood()).toBe(3000);
		});
		it("player has 3k TOOLS", function() {
			expect(playerData.getTools()).toBe(3000);
		});
		it("player has 0 HOUSES", function() {
			expect(playerData.getHouses()).toBe(0);
		});
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


		it("player gain a house", function() {
			playerData.buyHouses(1);
			expect(playerData.getHouses()).toBe(1);
		});

		it("player loses 3 WOOD", function() {
			playerData.buyHouses(1);
			expect(playerData.getWood()).toBe(3000 - 3);
		});

		it("alerts registed HOUSES observers", function() {
			playerData.addObserver('houses', alertable.housesUpdated);
			playerData.addObserver('houses', alertable2.housesUpdated);
			playerData.buyHouses(1);
			expect(alertable.housesUpdated).toHaveBeenCalled();
			expect(alertable2.housesUpdated).toHaveBeenCalled();
		});

		it("alerts registed WOOD observers", function() {
			playerData.addObserver('wood', alertable.woodUpdated);
			playerData.addObserver('wood', alertable2.woodUpdated);
			playerData.buyHouses(1);
			expect(alertable.woodUpdated).toHaveBeenCalled();
			expect(alertable2.woodUpdated).toHaveBeenCalled();
		});
	});

	describe("When you buy a lumberjacks hut", function() {
		it("gives you a lumberjacks hut", function() {
			playerData.buyLumberjacksHuts(1);
			expect(playerData.getLumberjacksHut()).toBe(1);
		});
		it("you lose 50 gold and 2 tools", function() {
			playerData.buyLumberjacksHuts(1);
			expect(playerData.getGold()).toBe(3000 - 50);
			expect(playerData.getTools()).toBe(3000 - 2);
		});
	});


});