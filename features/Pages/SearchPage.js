import { Page } from './Page';

export class SearchPage extends Page {
    constructor() {
        super();
        this.pageUrl = 'https://www.blazemeter.com/search';
        this.pageTitle = 'Search';
        this.searchForm_selector = '.search-form';
        this.searchResults_selector = '.search-results';
        this.searchResult_selector = 'li.search-result';
    }

    initSearchPage() {
        this.waitForElementToBeClickable(browser.element(this.searchForm_selector));
        return this;
    }

    openSearchPage() {
        super.navigateToPage(this.pageUrl, this.pageTitle);
        return this.initSearchPage();
    }

    isSearchResultExisting() {
        return browser.element(this.searchResults_selector).isExisting();
    }

    getSearchResult(index) {
        const searchResultItems = browser.elements(this.searchResult_selector);
        return searchResultItems.value[index].getText();
    }

}