/**
 * This file is part of the 1st Solidity Gas Golfing Contest.
 *
 * This work is licensed under Creative Commons Attribution ShareAlike 3.0.
 * https://creativecommons.org/licenses/by-sa/3.0/
 */

var testdata = require('../data/BrainFuck.json');
const BrainFuck = require('Embark/contracts/BrainFuck');

config({
	contracts: {
		BrainFuck: {}
	}
});

contract("BrainFuck", function() {
  this.timeout(0);

  testdata.vectors.forEach(function(v, i) {
    it("Passes test vector " + i, async function() {
      var result = await BrainFuck.methods.execute(web3.utils.asciiToHex(v.input[0]), v.input[1]).call({gas: v.gas});
      assert.deepEqual(result || "0x", v.output[0]);
    });
  });

  after(async function() {
    var totalGas = 0;
    for(var v of testdata.vectors) {
      totalGas += await BrainFuck.methods.execute(web3.utils.asciiToHex(v.input[0]), v.input[1]).estimateGas({gas: v.gas}) - 21000;
    }
    console.log("Total gas for Unique: " + totalGas);
  });

});


