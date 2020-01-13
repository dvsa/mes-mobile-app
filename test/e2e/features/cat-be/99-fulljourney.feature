@catbe
Feature: Full end to end journey for Cat B+E

   # @smoke
   # Scenario: Examiner completes a passed test with no faults
   #    Given I am logged in as "mobexaminer2" and I have a test for "Mr Callahan Eaton"
   #    When I check candidate details for "Mr Callahan Eaton"
   #    And I start the test for "Mr Callahan Eaton"
   #    And the candidate completes the declaration page
   #    And the candidate confirms their declaration
   #    Then I should see the "Declaration - Callahan Eaton" page
   #    And the candidate enters a new email address
   #    And I proceed to the car
   #    Then I should see the "Callahan Eaton" page
   #    And I complete the waiting room to car page
   #    Then I should see the "Test report - Callahan Eaton" page
   #    And I complete the test
   #    And I continue to debrief
   #    Then I should see the Debrief page with outcome "Passed"
   #    When I end the debrief
   #    Then I should see the "Test debrief - Callahan Eaton" page
   #    And I complete the pass details
   #    And I complete the health declaration
   #    Then I am on the back to office page
   #    And I continue to the office write up
   #    Then I should see the "Office" page
   #    And the office page test outcome is "Passed"
   #    When I complete the office write up
   #    And I upload the test
   #    Then I should see the "Journal" page
   #    And the test result for "Mr Callahan Eaton" is "1"

   Scenario Outline: Examiner completes a failed test with various faults
      Given I am logged in as "mobexaminer2" and I have a test for "Mr Dixon Clayton"
      When I check candidate details for "Mr Dixon Clayton"
      And I start the test for "Mr Dixon Clayton"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - Dixon Clayton" page
      And the candidate enters a new email address
      And I proceed to the car
      Then I should see the "Callahan Eaton" page
      And I complete the waiting room to car page
      Then I should see the "Test report - Callahan Eaton" page
      And I complete the test
      And I continue to debrief
      Then I should see the Debrief page with outcome "Passed"
      When I end the debrief
      Then I should see the "Test debrief - Callahan Eaton" page
      And I complete the pass details
      And I complete the health declaration
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Passed"
      When I complete the office write up
      And I upload the test
      Then I should see the "Journal" page
      And the test result for "Mr Callahan Eaton" is "1"
      Then I should see the "Dixon Clayton" page
      And I complete the waiting room to car page with a tell me driver fault


  Scenario: Examiner terminates a test on the test report due to mechanical failure
    Given I am logged in as "mobexaminer2" and I have a test for "Mr Dixon Clayton"
    When I check candidate details for "Mr Dixon Clayton"
    And I start the test for "Mr Dixon Clayton"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Dixon Clayton" page
    And the candidate enters a new email address
    And I proceed to the car
    Then I should see the "Dixon Clayton" page
    And I complete the waiting room to car page
    Then I should see the "Test report - Dixon Clayton" page
    When I terminate the test from the test report page
    Then I should see the Debrief page with outcome "Terminated"
    When I end the debrief
    Then I am on the post debrief holding page
    When I continue to the non pass finalisation page
    Then I should see the "Finalise outcome BE - Dixon Clayton" page
    When I select activity code "11 - Mechanical failure"
    And I continue to the back to office page
    Then I am on the back to office page
    And I continue to the office write up
    Then I should see the "Office" page
    And the office page test outcome is "Terminated"
    And I try to upload the test
    Then validation item "office-route-number-validation-text" should be "Enter the route number (max 2 digits)"
    And validation item "office-route-number-validation-text" should be visible
    And validation item "office-independent-driving-validation-text" should be "Select the method of independent driving"
    And validation item "office-independent-driving-validation-text" should be visible
    And validation item "office-candidate-description-validation-text" should be "Describe the candidate"
    And validation item "office-candidate-description-validation-text" should be visible
    And validation item "office-weather-validation-text" should be "Select weather conditions"
    And validation item "office-weather-validation-text" should be visible
    When I complete the office write up
    And I upload the test
    Then I should see the "Journal" page
    And the test result for "Mr Dixon Clayton" is "11"
      
      Examples: Faults
      | Header 1 | Header 2 | Header 3 |
      | Value 1  | Value 2  | Value 3  |
