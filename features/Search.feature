@All
Feature: Search

    Background: Initial setup
        Given I open Blog page

    @smoke
    Scenario: Verify search at the blog page
        When I search for Selenium posts
        Then I see search results

    @regression
    Scenario Outline: Verify search results at the blog page
        When I search for <searchItem> posts
        Then The result contains <searchItem>
        Examples:
            | searchItem        |
            | Selenium          |
            | Jmeter            |

    @regression
    Scenario: Verify multiple word search at the blog page
        When I search for Tests in Docker posts
        Then I see all of the following in the results
            | tests  |
            | in     |
            | docker |