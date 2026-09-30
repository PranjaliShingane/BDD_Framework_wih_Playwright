# This feature file describes the login behavior of the SauceDemo application.
# Each scenario is written in Gherkin so business-readable tests are easy to understand.
Feature: Login functionality
  As a SauceDemo user
  I want to log in to the application
  So that I can access the inventory page

  @smoke
  Scenario: Successful login with valid credentials
    Given I navigate to the login page
    When I enter valid username and password
    And I click the login button
    Then I should be successfully logged in

  @regression
  Scenario: Login with invalid credentials
    Given I navigate to the login page
    When I enter invalid username and password
    And I click the login button
    Then I should see an error message for invalid credentials
