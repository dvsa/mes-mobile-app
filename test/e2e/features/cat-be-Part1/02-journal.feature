@catbe @full_smoke @regression
Feature: Cat B+E Journal

   Scenario: Examiner has a Cat B + E test with dimensions

    Given I am on the journal page as "mobexaminer2"
    When I should have a category "B+E" test for "Miss Jeannette Bender"
     And I view candidate details for "Miss Jeannette Bender"
    Then The vehicle for "Miss Jeannette Bender" has length "5.5", width "6", height "3.5" and seats "4"

  Scenario: Examiner has a Cat B + E test with dimensions

    Given I am on the journal page as "mobexaminer2"
    When I view candidate details for "Mr Clayton Dixon"
    And I should see the "Business name" contains "Steam"
    When I close the candidate test details modal
    Then I should see the "Journal" page

  Scenario: Examiner has a Cat B + E test with dimensions

    Given I am on the journal page as "mobexaminer2"
    When I view candidate details for "Mr Dixon Clayton"
    Then I should see the "Slot type" contains "Standard Test"
    And I should see the "Business name" contains "Imant"
    When I close the candidate test details modal
    Then I should see the "Journal" page
