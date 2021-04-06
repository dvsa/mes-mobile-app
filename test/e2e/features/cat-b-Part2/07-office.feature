@catb @full_smoke @regression
Feature: Office page

  Scenario: Office page validation for pass

    Given I am logged in as "mobexaminer1" and I have a test for "Mr Craig Daniel"
    When I start the test for "Mr Craig Daniel"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Craig Daniel" page
    And the candidate enters a new email address
    And I proceed to the car
    Then I should see the "Craig Daniel" page
    And I complete the waiting room to car page
    Then I should see the "Test report - Craig Daniel" page
    And I complete the test
    And I continue to debrief
    Then I should see the Debrief page with outcome "Passed"
    When I end the debrief
    Then I should see the "Test debrief - Craig Daniel" page
    And I complete the pass details
    And I complete the health declaration
    And I should see the "Confirm test details - Craig Daniel" page
    And I complete the Confirmation page
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

    Given I am logged in as "mobexaminer1" and I have a test for "Mr Daniel Daniels"
    When I start the test for "Mr Daniel Daniels"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Daniel Daniels" page
    And the candidate enters a new email address
    And I proceed to the car
    Then I should see the "Daniel Daniels" page
    And I complete the waiting room to car page with automatic transmission
    Then I should see the "Test report - Daniel Daniels" page
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
    Then I should see the "Finalise outcome - Daniel Daniels" page
    And I complete the fail details
    And I should see the "Confirm test details - Daniel Daniels" page
    And I complete the Confirmation page
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
    And I have a "serious" fault for "Control - Accelerator" requiring a comment
