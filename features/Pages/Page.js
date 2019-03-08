export class Page {
  constructor() {

    this.DEFAULT_TIMEOUT_MS = 20000;
  }

  navigateToPage(pageUrl, pageTitle) {
    console.log(`URL: ${pageUrl}`);
    browser.url(pageUrl);
    browser.windowHandleSize({width:1280,height:1024});

    if (!browser.getTitle().toLowerCase().includes(pageTitle.toLowerCase()) || !browser.getUrl().includes(pageUrl)) {
      throw new Error(`--FAIL: Expected page title is '${pageTitle}', but was '${browser.getTitle()}'; expected URL is '${pageUrl}', but it was '${browser.getUrl()}'.`);
    }
  }

  waitForElementToBeClickable(element) {
    try {
      element.waitForExist(this.DEFAULT_TIMEOUT_MS);
      element.waitForVisible(this.DEFAULT_TIMEOUT_MS);
      element.waitForEnabled(this.DEFAULT_TIMEOUT_MS);
    } catch (exc) {
      throw new Error(`--FAIL: Element didn't become clickable in alloted time.${exc}`);
    }
  }

  waitForElementToDisappear(element) {
    try {
      element.waitForExist(this.DEFAULT_TIMEOUT_MS, true);
    } catch (exc) {
      throw new Error(`--FAIL: Element didn't disappear in alloted time.${exc}`);
    }
  }

  webAction(element, text) {
    this.waitForElementToBeClickable(element);
    if (text != null) {
      try {
        switch (element.getTagName().toLowerCase()) {
          case 'input':
          case 'textarea':
            element.clearElement();
            element.setValue(text);
            break;
          case 'select':
          case 'option':
            element.selectByVisibleText(text);
            break;
          default:
            console.error(`--FAIL: webAction on element '${element.getTagName()}' is not implemented.`);
            break;
        }
      } catch (exc) {
        throw new Error(`--FAIL: Unexpected exception: ${exc}`);
      }
    } else {
      try {
        element.click();
      } catch (exc) {
        throw new Error(`--FAIL: Failed to click on the element. ${exc}`);
      }
    }
  }

}