@catbe @smoke
Feature: Cat B+E Journal

   Scenario: Examiner has a Cat B + E test with dimensions
    Given I am on the journal page as "mobexaminer2"
     Then I should have a category "B+E" test for "Mr Gilliam Mckee"
     And The vehicle for "Mr Gilliam Mckee" has length "6", width "5", height "3" and seats "1"
