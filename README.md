# protractor-saucelabs-testname-per-spec
Enable Protractor tests run in Sauce Labs to update the test name to match the spec name

You can use a custom Jasmine reporter to call the Sauce Labs javascript executor onPrepare


	```
	onPrepare: function() {
		jasmine.getEnv().addReporter({
			specStarted: function(result) {
				browser.executeScript("sauce:job-name=" + result.fullName);
			}
		});
	}
	```
