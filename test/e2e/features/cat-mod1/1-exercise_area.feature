@catmod1 @full_smoke @regression
Feature: A Driving Examiner Starts a test for Modular 1

  Scenario: Examiner starts a test for Modular 1 exercise area
    Given I am logged in as "desexamineram1" and I have a test for "Ms Alisa Garza"
    When I check candidate details for "Ms Alisa Garza"
    When I start the test for "Ms Alisa Garza"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Alisa Garza" page
    And the candidate
