require('jsdom-global')();
global.window = window;
global.$ = require('jquery');
global.jQuery = $;
const fs = require('fs');

const chai = require('chai')
const expect = chai.expect
const {getNextClass, getGuideString} = require('../../src/player.js');
let guideJSON;

describe('player tests', function () {
 
  before(function(done){
    fs.readFile('./test/mocks/guideJSON.txt', 'utf8', function(err, fileContents) {
      if (err) throw err;
      guideJSON = fileContents;
      done();
    });
});

  
  it('expect getNextClass to return empty string when no followers are given', function() {
    expect(getNextClass()).eql('');
  });

  it('expect getNextClass to return class name of next tooltip', function() {
    const followers = [
      {
          "condition": "true",
          "next": "3"
      }
    ]
    expect(getNextClass(followers)).eql('.step3');
  });

  it('expect guideString to remove func', function() {
    const guideURL = "https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=function&refresh=true&env=dev&type=startPanel&vars%5Btype%5D=startPanel&sid=none&_=1582203987867";
    expect(getGuideString(guideJSON, guideURL).includes("func")).eql(false);
  });
 
});