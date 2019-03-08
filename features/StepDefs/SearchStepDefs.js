import { BlogPage } from './../Pages/BlogPage';

import { assert } from 'chai';

module.exports = function () {

    this.Given(/^I open Blog page$/, function () {
        this.blogPage = new BlogPage();
        this.blogPage.openBlogPage();
    });

    this.When(/^I search for (.*) posts$/, function (searchString) {
        this.searchPage = this.blogPage.searchPosts(searchString);
    });

    this.Then(/^I see search results$/, function () {
        assert.isTrue(this.searchPage.isSearchResultExisting(), "Verify there are search results on the page");
    });

    this.Then(/^The result contains (.*)$/, function (expectedString) {
        assert.isTrue(this.searchPage.getSearchResult(0).toLowerCase().includes(expectedString.toLowerCase()), "Verify first search result contains desired string");
    });

    this.Then(/^I see all of the following in the results$/, function (expectedResults) {
        const results = expectedResults.raw();
        for (var i = 0; i < results.length; i++) {
            var result = results[i].toString();
            assert.isTrue(this.searchPage.getSearchResult(0).toLowerCase().includes(result.toLowerCase()), "Verify first search result contains '" + result + "'");
        }

    });
}

