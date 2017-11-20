exports.config = {
	specs: ['test/**/*spec.js'],

	sauceUser: process.env.SAUCE_USERNAME,
	sauceKey: process.env.SAUCE_ACCESS_KEY,

	// restartBrowserBetweenTests: true,

	multiCapabilities: [
		{
			browserName: "chrome",
			name: "chrome-tests:",
			shardTestFiles: true,
			maxInstances: 25
		},
		{
			browserName: "firefox",
			name: "firefox-tests:",
			shardTestFiles: true,
			maxInstances: 25
		}
	],

	onPrepare: function () {
		browser.ignoreSynchronization = true;	// if not an Angular app

		jasmine.getEnv().addReporter({
			specStarted: function(result) {
				browser.getCapabilities().then(function (capabilities) {
					var browserName = capabilities.get("browserName");
					browser.executeScript("sauce:job-name=" + browserName + ":" + result.fullName);
				});
			}
		});
	},

	onComplete: function () {
		var printSessionId = function (jobName) {
			browser.getSession().then(function (session) {
				console.log('SauceOnDemandSessionID=' + session.getId() + ' job-name=' + jobName);
			});
		}
		
		printSessionId("Insert Job Name Here");
	}
};