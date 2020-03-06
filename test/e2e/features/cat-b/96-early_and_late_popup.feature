@catb @regression
Feature: A Driving Examiner starts an early and late test to see is appropriate dialog appears

  Scenario: Early start popup
    Given I am logged in as "mobexaminer1" and I have a test for "Mr James Brown"
    When I check candidate details for "Mr James Brown"
    And I start the test early for "Mr James Brown"
    Then I should see the "Declaration - James Brown" page

  Scenario: Late start popup
    Given I am logged in as "mobexaminer1" and I have a test for "Miss Florence Pearson"
    When I start the test late for "Miss Florence Pearson"
    Then I should see the "Declaration - Florence Pearson" page
