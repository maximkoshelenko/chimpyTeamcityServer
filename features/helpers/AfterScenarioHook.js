module.exports = function () {
    this.After((scenario) => {
        if (scenario.isFailed()) {
            scenario.attach(browser.saveScreenshot(), 'image/png');
            scenario.attach(`Current URL is: ${browser.getUrl()}`, 'text/html');
        }
    });
};