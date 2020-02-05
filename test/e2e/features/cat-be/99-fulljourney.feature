@catbe @morning_build
Feature: Full end to end journey for Cat B+E

   Scenario: Examiner completes a passed test with no faults
      Given I am logged in as "mobexaminer2" and I have a test for "Mr Callahan Eaton"
      When I check candidate details for "Mr Callahan Eaton"
      And I start the test for "Mr Callahan Eaton"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - Callahan Eaton" page
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

   Scenario: Examiner completes a failed test with various faults
      Given I am logged in as "mobexaminer2" and I have a test for "Mr Dillon Jennings"
      When I check candidate details for "Mr Dillon Jennings"
      And I start the test for "Mr Dillon Jennings"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - Dillon Jennings" page
      And the candidate enters a new email address
      And I proceed to the car
      Then I should see the "Dillon Jennings" page
      And I complete the waiting room to car page with the following vehicle checks
        | show_me_1   | show_me_2   | show_me_3   | show_me_4   | show_me_5   |
        | true        | true        | true        | false       | false       |   
      Then I should see the "Test report - Dillon Jennings" page
      And the driver fault count is "3"
      When I end the test
      Then the legal requirements pop up is present
      And the required test observation is present "NS (normal start)"
      And the required test observation is present "UH (uphill start)"
      And the required test observation is present "AS/CS (angled start/ controlled stop)"
      And the required test observation is present "Manoeuvres"
      And the required test observation is present "Eco (control and planning)"
      And the required test observation is present "Uncouple / Recouple"
      Then I return to the test report page
      And I should see the "Test report - Dillon Jennings" page
      And I enter the legal requirements
      When I add a "Timed" driver fault
      And the driver fault count is "4"
      When I add a "Correctly" driver fault
      And the driver fault count is "5"
      When I add a "Safety" driver fault
      And the driver fault count is "6"
      When I add the Uncouple and Recouple fault
      And the driver fault count is "7"
      When I add a "Clearance" serious fault with a long press
      Then the "Clearance" button displays the serious badge
      When I end the test
      And I continue to debrief
      Then I should see the Debrief page with outcome "Unsuccessful"
      And I see a "serious" fault for "Clearance"
      And I see a "driving" fault for "Signals - Timed"
      And I see a "driving" fault for "Signals - Correctly"
      And I see a "driving" fault for "Move off - Safety"
      And I see a "driving" fault for "Uncouple / Recouple"
      And I see a "driving" fault for "Vehicle checks"
      When I end the debrief
      Then I am on the post debrief holding page
      When I continue to the non pass finalisation page
      And I complete the fail details
      And I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Unsuccessful"
      When I complete the office write up
      And I enter a comment for "serious" fault "Clearance"
      And I upload the test
      Then I should see the "Journal" page
      And the test result for "Mr Dillon Jennings" is "2"

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

   @smoke
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
