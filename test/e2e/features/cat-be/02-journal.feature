@catbe
Feature: Cat B+E Journal

   Scenario: Examiner has a Cat B + E test with dimensions
    Given I am on the journal page as "mobexaminer2"
     Then I should have a category "B+E" test for "Miss Jeannette Bender"
     And The vehicle for "Miss Jeannette Bender" has length "5.5", width "6", height "3.5" and seats "4"
