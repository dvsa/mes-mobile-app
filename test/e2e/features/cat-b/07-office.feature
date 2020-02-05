@catb @morning_build
Feature: Office page

   Scenario: Office page validation for pass
      Given I am logged in as "mobexaminer1" and I have a test for "Miss Florence Pearson"
      When I start the test for "Miss Florence Pearson"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - Florence Pearson" page
      And the candidate enters a new email address
      And I proceed to the car
      Then I should see the "Florence Pearson" page
      And I complete the waiting room to car page
      Then I should see the "Test report - Florence Pearson" page
      And I complete the test
      And I continue to debrief
      Then I should see the Debrief page with outcome "Passed"
      When I end the debrief
      Then I should see the "Test debrief - Florence Pearson" page
      And I complete the pass details
      And I complete the health declaration
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office activity code should be "1 - Pass"
      And I try to upload the test
      Then the tell me question should be "T5 - Headlights & tail lights"
      And validation item "office-route-number-validation-text" should be "Enter the route number (max 2 digits)"
      And validation item "office-route-number-validation-text" should be visible
      And validation item "office-independent-driving-validation-text" should be "Select the method of independent driving"
      And validation item "office-independent-driving-validation-text" should be visible
      And validation item "office-candidate-description-validation-text" should be "Describe the candidate"
      And validation item "office-candidate-description-validation-text" should be visible
      And validation item "office-show-me-validation-text" should be "Select the show me question"
      And validation item "office-show-me-validation-text" should be visible
      And validation item "office-weather-validation-text" should be "Select weather conditions"
      And validation item "office-weather-validation-text" should be visible

   Scenario: Office page validation for fail
      Given I am logged in as "mobexaminer1" and I have a test for "Mrs Jane Doe"
      When I check candidate details for "Mrs Jane Doe"
      And I start the test for "Mrs Jane Doe"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - Jane Doe" page
      And the candidate enters a new email address
      And I proceed to the car
      Then I should see the "Jane Doe" page
      And I complete the waiting room to car page with automatic transmission
      Then I should see the "Test report - Jane Doe" page
      When I add a "Accelerator" driver fault
      And the competency "Accelerator" driver fault count is "1"
      When I add a "Safety" driver fault
      And the competency "Safety" driver fault count is "1"
      When I add a "Safety" driver fault
      And the competency "Safety" driver fault count is "2"
      When I add a "Lane discipline" driver fault
      And the competency "Lane discipline" driver fault count is "1"
      And I add a "Accelerator" serious fault
      And I add a "Use of speed" dangerous fault
      And I complete the test
      And I continue to debrief
      Then I should see the Debrief page with outcome "Unsuccessful"
      When I end the debrief
      Then I am on the post debrief holding page
      When I continue to the non pass finalisation page
      Then I should see the "Finalise outcome - Jane Doe" page
      When I continue to the back to office page
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office activity code should be "2 - Fail"
      And I try to upload the test
      Then the tell me question should be "T1 - Brakes"
      And validation item "office-route-number-validation-text" should be "Enter the route number (max 2 digits)"
      And validation item "office-route-number-validation-text" should be visible
      And validation item "office-independent-driving-validation-text" should be "Select the method of independent driving"
      And validation item "office-independent-driving-validation-text" should be visible
      And validation item "office-candidate-description-validation-text" should be "Describe the candidate"
      And validation item "office-candidate-description-validation-text" should be visible
      And validation item "office-show-me-validation-text" should be "Select the show me question"
      And validation item "office-show-me-validation-text" should be visible
      And validation item "office-weather-validation-text" should be "Select weather conditions"
      And validation item "office-weather-validation-text" should be visible
      And I have a "dangerous" fault for "Use of speed" requiring a comment
      And I have a "serious" fault for "Controls - Accelerator" requiring a comment