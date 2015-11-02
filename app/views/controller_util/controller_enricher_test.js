'use strict';

describe("Controller Enricher suite", function() {
	var player;
	var enricher;

	beforeEach(function() {
		angular.mock.module('indexApp.controller_enricher');
		inject(function(Player, ControllerEnricher) {
			player = Player;
			enricher = ControllerEnricher;
		});
	});

	describe("After enrichement", function() {
		it("has a resources as attribute", function() {
			var controller = {};
			var resources = ["gold", "tool"];
			var type = 'resource';

			enricher.enrich(controller, resources, type);

			expect(controller.gold).toBe(3000);
			expect(controller.tool).toBe(3000);
		});

		it("has a list of resources as attribute", function() {
			var controller = {};
			var resources = ["gold", "tool"];
			var type = 'resource';

			enricher.enrich(controller, resources, type);

			expect(controller.resources).toEqual(["gold", "tool"]);
		});

		it("has update methods defined", function() {
			var controller = {};
			var resources = ["gold", "tool"];
			var type = 'resource';

			enricher.enrich(controller, resources, type);

			expect(controller.goldUpdated).toBeDefined();
			expect(controller.toolUpdated).toBeDefined();
		});

		it("update methods update controller's attributes", function() {
			var controller = {};
			var resources = ["gold", "tool"];
			var type = 'resource';
			enricher.enrich(controller, resources, type);

			spyOn(player, 'get').and.returnValue(2);

			controller.goldUpdated();
			expect(controller.gold).toBe(2);
		});
	})
});