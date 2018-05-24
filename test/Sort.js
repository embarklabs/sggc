/**
 * This file is part of the 1st Solidity Gas Golfing Contest.
 *
 * This work is licensed under Creative Commons Attribution ShareAlike 3.0.
 * https://creativecommons.org/licenses/by-sa/3.0/
 */

var testdata = require('../data/Sort.json');

describe("Sort", function() {
  this.timeout(0);
  before(function(done) {
    EmbarkSpec.deployAll({"Sort": {}}, () => { done() });
  });

  testdata.vectors.forEach(function(v, i) {
    it("Passes test vector " + i, async function() {
      var result = await Sort.methods.sort(v.input[0]).call({gas: v.gas});
      assert.deepEqual(result, v.output[0]);
    });
  });

  after(async function() {
    var totalGas = 0;
    for(var v of testdata.vectors) {
      totalGas += await Sort.methods.sort(v.input[0]).estimateGas({gas: v.gas}) - 21000;
    }
    console.log("Total gas for Unique: " + totalGas);
  });

});

