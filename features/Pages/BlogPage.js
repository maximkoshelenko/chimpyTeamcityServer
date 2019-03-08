import { Page } from './Page';
import { SearchPage } from './SearchPage';

export class BlogPage extends Page {
    constructor() {
        super();
        this.searchField_selector = '#search_blog_field';
        this.searchButton_selector = '#search_blog_button';
        this.blog_post = '.blog_post'
        this.pageUrl = 'https://www.blazemeter.com/blog';
        this.pageTitle = 'Performance Testing';
    }

    openBlogPage() {
        super.navigateToPage(this.pageUrl, this.pageTitle);
        this.waitForElementToBeClickable(browser.element(this.blog_post));
        return this;
    }

    searchPosts(searchCriteria) {
        this.searchField = browser.element(this.searchField_selector);
        this.searchButton = browser.element(this.searchButton_selector);
        this.webAction(this.searchField, searchCriteria);
        this.webAction(this.searchButton);
        const searchPage = new SearchPage();
        return searchPage.initSearchPage();
    }

}