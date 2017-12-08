// spec.js

/* 
describe('Protractor Demo App', function() {
  it('should have a title', function() {
    browser.get('http://juliemr.github.io/protractor-demo/');

    expect(browser.getTitle()).toEqual('Super Calculator');
	
	
 
	
  });
});  
  
   
  
describe('another title', function() {
  it('should have a title', function() {
    browser.get('https://localhost:3443');
    
    expect(browser.getTitle()).toEqual('Angular Basics 101a');
  });  
});

describe('another title2', function() {
  it('should have a title', function() {
	browser.waitForAngularEnabled(false);  
    browser.get('https://www.wit.ie/');
    
    expect(browser.getTitle()).toEqual('Waterford Institute of Technology');
  });  
});

*/
function eventual(expectedCondition) { // https://stackoverflow.com/questions/37139499/protractor-expectation-that-element-is-eventually-present
  return browser.wait(expectedCondition, 2000).then(function() {
    return true;
  }, function() {
    return false;
  });
}

beforeEach(function() {
    browser.wait(function() {
        console.log('1 - BeforeEach WAIT');
        return true;
    }).then(function () {
        console.log('2 - BeforeEach after wait');
    });
});

 
 
describe('expect cookie law prompt', function() {
  it('understand button', function() {
	browser.get('https://localhost:3443');
    
	var EC = protractor.ExpectedConditions;
	var yourElement = element(by.css('.cl-accept')); // check for cookie law prompt
	
	browser.wait(EC.presenceOf(yourElement), 5000);
//	console.log(yourElement.getInnerHtml());
//	console.log(yourElement)
   expect(yourElement.getText()).toEqual('I Understand');
	
	// expect(eventual(protractor.ExpectedConditions.presenceOf(yourElement))).toBe(true);
	//expect('I Understand').toEqual('I Understand');
  });  
});
 
 
 

