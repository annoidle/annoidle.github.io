'use strict';

describe("Player suite", function() {
	var playerData;
	var buildings;

	beforeEach(function() {
		angular.mock.module('indexApp.game');
		inject(function(PlayerData, Buildings) {
			playerData = PlayerData;
			buildings = Buildings;
		});
	});

	describe("At the start of the application", function() {
		it("player has 3k GOLD", function() {
			expect(playerData.getResource('gold')).toBe(3000);
		});
		it("player has 3k WOOD", function() {
			expect(playerData.getResource('wood')).toBe(3000);
		});
		it("player has 3k TOOLS", function() {
			expect(playerData.getResource('tool')).toBe(3000);
		});
		it("player has 0 HOUSES", function() {
			expect(playerData.getBuilding('house')).toBe(0);
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
			playerData.buy('house', 1);
			expect(playerData.getBuilding('house')).toBe(1);
		});

		it("player loses 3 WOOD", function() {
			playerData.buy('house', 1);
			expect(playerData.getResource('wood')).toBe(3000 - 3);
		});

		it("alerts registed HOUSES observers", function() {
			playerData.addObserver('house', alertable.housesUpdated);
			playerData.addObserver('house', alertable2.housesUpdated);
			playerData.buy('house', 1);
			expect(alertable.housesUpdated).toHaveBeenCalled();
			expect(alertable2.housesUpdated).toHaveBeenCalled();
		});

		it("alerts registed WOOD observers", function() {
			playerData.addObserver('wood', alertable.woodUpdated);
			playerData.addObserver('wood', alertable2.woodUpdated);
			playerData.buy('house', 1);
			expect(alertable.woodUpdated).toHaveBeenCalled();
			expect(alertable2.woodUpdated).toHaveBeenCalled();
		});
	});

	describe("When you buy a lumberjacks hut", function() {
		it("gives you a lumberjacks hut", function() {
			playerData.buy('lumberjacksHut', 1);
			expect(playerData.getBuilding('lumberjacksHut')).toBe(1);
		});
		it("you lose 50 gold and 2 tools", function() {
			playerData.buy('lumberjacksHut', 1);
			expect(playerData.getResource('gold')).toBe(3000 - 50);
			expect(playerData.getResource('tool')).toBe(3000 - 2);
		});
	});


	describe("When one ask for the list of buildings", function() {
		it("house is part of the list", function() {
			var buildingsList = buildings.getBuildings();
			var index = buildingsList.indexOf('house');
			expect(index).toBeDefined();
			expect().not.toBe(-1);
		});
	});

});