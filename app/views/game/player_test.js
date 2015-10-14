'use strict';

describe("A suite", function() {

	beforeEach(angular.mock.module('indexApp.game'));

	describe("A suite", function() {
		it("contains spec with an expectation", inject(function(PlayerData) {
			expect(PlayerData.getGold()).toBe(3000);
		}));
	});
});