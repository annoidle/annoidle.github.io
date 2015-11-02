'use strict';

describe("Player suite", function() {
	var player;
	var buildings;

	beforeEach(function() {
		angular.mock.module('indexApp.game');
		inject(function(Player, Buildings) {
			player = Player;
			buildings = Buildings;
		});
	});

	describe("At the start of the application", function() {
		it("player has 3k GOLD", function() {
			expect(player.get('resource', 'gold')).toBe(3000);
		});
		it("player has 3k WOOD", function() {
			expect(player.get('resource', 'wood')).toBe(3000);
		});
		it("player has 3k TOOLS", function() {
			expect(player.get('resource', 'tool')).toBe(3000);
		});
		it("player has 0 HOUSES", function() {
			expect(player.get('building', 'house')).toBe(0);
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
			player.buy('house', 1);
			expect(player.get('building', 'house')).toBe(1);
		});

		it("player loses 3 WOOD", function() {
			player.buy('house', 1);
			expect(player.get('resource', 'wood')).toBe(3000 - 3);
		});

		it("alerts registed HOUSES observers", function() {
			player.addObserver('house', alertable.housesUpdated);
			player.addObserver('house', alertable2.housesUpdated);
			player.buy('house', 1);
			expect(alertable.housesUpdated).toHaveBeenCalled();
			expect(alertable2.housesUpdated).toHaveBeenCalled();
		});

		it("alerts registed WOOD observers", function() {
			player.addObserver('wood', alertable.woodUpdated);
			player.addObserver('wood', alertable2.woodUpdated);
			player.buy('house', 1);
			expect(alertable.woodUpdated).toHaveBeenCalled();
			expect(alertable2.woodUpdated).toHaveBeenCalled();
		});
	});

	describe("When you buy a lumberjacks hut", function() {
		it("gives you a lumberjacks hut", function() {
			player.buy('lumberjacksHut', 1);
			expect(player.get('building', 'lumberjacksHut')).toBe(1);
		});
		it("you lose 50 gold and 2 tools", function() {
			player.buy('lumberjacksHut', 1);
			expect(player.get('resource', 'gold')).toBe(3000 - 50);
			expect(player.get('resource', 'tool')).toBe(3000 - 2);
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

	describe("When tick", function() {
		it("add 0.025 wood if one LumberjacksHut", function() {
			player.buy('lumberjacksHut', 1);
			player.tick();
			expect(player.get('resource', 'wood')).toEqual(3000 + 0.025);
		});
		it("add 0.05 wood if two LumberjacksHut", function() {
			player.buy('lumberjacksHut', 2);
			player.tick();
			expect(player.get('resource', 'wood')).toEqual(3000 + 0.05);
		});
		it("notifies woodUpdated", function() {
			var alertable = {
				woodUpdated: function(value) {}
			};
			spyOn(alertable, 'woodUpdated');
			player.addObserver('wood', alertable.woodUpdated);
			player.buy('lumberjacksHut', 2);
			
			player.tick();
			
			expect(alertable.woodUpdated).toHaveBeenCalled();
		});
		it("does not notify if no change", function() {
			var alertable = {
				woodUpdated: function(value) {}
			};
			spyOn(alertable, 'woodUpdated');
			player.addObserver('wood', alertable.woodUpdated);
			
			player.tick();
			
			expect(alertable.woodUpdated).not.toHaveBeenCalled();
		});
	});

});