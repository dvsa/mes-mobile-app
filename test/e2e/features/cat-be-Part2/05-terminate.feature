@catbe @full_smoke @regression
Feature: Driving Examiner Completes Terminated Tests for Category B+E

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

   Scenario: Examiner terminates test as candidate failed eye sight test
      Given I am logged in as "mobexaminer2" and I have a test for "Miss Jeannette Bender"
      When I check candidate details for "Miss Jeannette Bender"
      And I start the test for "Miss Jeannette Bender"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - Jeannette Bender" page
      And the candidate requests to receive results by post
      And I proceed to the car
      Then I should see the "Jeannette Bender" page
      And I fail the eye sight test
      Then I should see the Debrief page with outcome "Unsuccessful"
     And I should see the "Debrief - Jeannette Bender" page
      When I end the debrief
      Then I am on the post debrief holding page
      When I continue to the non pass finalisation page
      Then I should see the "Finalise outcome BE - Jeannette Bender" page
      And the D255 Radio is pre-selected to yes
      When I continue to the back to office page
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Unsuccessful"
      And the office activity code should be "3 - Fail due to eyesight"
      When I enter a candidate description
      And I complete the weather conditions
      And I enter a comment for "serious" fault "Eyesight Test"
      And I upload the test
      Then I should see the "Journal" page
      And the test result for "Miss Jeannette Bender" is "3"
