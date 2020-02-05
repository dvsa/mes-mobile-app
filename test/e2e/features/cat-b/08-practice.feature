@catb
Feature: Practice mode
  
  @full_smoke
  Scenario: User can start marking practice test without a driver fault
    Given I am on the landing page as "mobexaminer1"
    When I start marking a practice test without a driving fault
    Then I should see the "Test report - Practice Mode" page
    And the driver fault count is "0"

  Scenario: User can start marking practice test with a driver fault
    Given I am on the landing page as "mobexaminer1"
    When I start marking a practice test with a driving fault
    Then I should see the "Test report - Practice Mode" page
    And the driver fault count is "1"
    And the competency "Show me / Tell me" driver fault count is "1"

  Scenario: User completes a full practice test pass
    Given I am on the landing page as "mobexaminer1"
    And I start full practice mode
    When I start the test for "Captain Jeremy Craig"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Jeremy Craig" page
    And the candidate enters a new email address
    And I proceed to the car
    Then I should see the "Jeremy Craig" page
    And I complete the waiting room to car page
    Then I should see the "Test report - Jeremy Craig" page
    And I complete the test with controlled stop
    And I continue to debrief
    Then I should see the Debrief page with outcome "Passed"
    When I end the debrief
    Then I should see the "Test debrief - Jeremy Craig" page
    And I complete the pass details
    And I complete the health declaration
    Then I am on the back to office page
    And I continue to the office write up
    Then I should see the "Office" page
    And the office page test outcome is "Passed"
    When I complete the office write up
    And I upload the test
    Then I should see the "Journal" page

  Scenario: User completes a full practice test fail
    Given I am on the landing page as "mobexaminer1"
    And I start full practice mode
    When I start the test for "Captain Jeremy Craig"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Jeremy Craig" page
    And the candidate enters a new email address
    And I proceed to the car
    Then I should see the "Jeremy Craig" page
    And I complete the waiting room to car page with a tell me driver fault
    Then I should see the "Test report - Jeremy Craig" page
    And the driver fault count is "1"
    When I add a "Accelerator" driver fault
    Then the driver fault count is "2"
    And the competency "Accelerator" driver fault count is "1"
    When I add a "Safety" driver fault
    Then the driver fault count is "3"
    And the competency "Safety" driver fault count is "1"
    When I add a "Safety" driver fault
    Then the driver fault count is "4"
    And the competency "Safety" driver fault count is "2"
    When I add a "Accelerator" serious fault
    Then the "Accelerator" button displays the serious badge
    When I add a "Use of speed" dangerous fault
    Then the "Use of speed" button displays the dangerous badge
    When I add a "Approach speed" serious fault with a long press
    Then the "Approach speed" button displays the serious badge
    When I remove a serious fault for "Approach speed" with a tap
    Then the "Approach speed" button does not display the serious badge
    When I complete the test
    And I continue to debrief
    Then I should see the Debrief page with outcome "Unsuccessful"
    And I see a "dangerous" fault for "Use of speed"
    And I see a "serious" fault for "Controls - Accelerator"
    And I see a "driving" fault for "Move off - Safety"
    And I see a "driving" fault for "Controls - Accelerator"
    And I see a "driving" fault for "Vehicle checks"
    When I end the debrief
    Then I am on the post debrief holding page
    When I continue to the non pass finalisation page
    Then I should see the "Finalise outcome - Jeremy Craig" page
    When I continue to the back to office page
    Then I am on the back to office page
    And I continue to the office write up
    Then I should see the "Office" page
    And the office page test outcome is "Unsuccessful"
    And there are "2" driver faults listed for "Move off - Safety"
    And there is "1" driver fault listed for "Controls - Accelerator"
    And there is "1" driver fault listed for "Show Me/Tell Me"
    When I complete the office write up
    And I enter a comment for "dangerous" fault "Use of speed"
    And I enter a comment for "serious" fault "Controls - Accelerator"
    And I upload the test
    Then I should see the "Journal" page

  Scenario: User completes a full practice test terminate
    Given I am on the landing page as "mobexaminer1"
    And I start full practice mode
    When I start the test for "Captain Jeremy Craig"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Jeremy Craig" page
    And the candidate requests to receive results by post
    And I proceed to the car
    Then I should see the "Jeremy Craig" page
    And I terminate the test
    Then I should see the Debrief page with outcome "Terminated"
    When I end the debrief
    Then I am on the post debrief holding page
    When I continue to the non pass finalisation page
    Then I should see the "Finalise outcome - Jeremy Craig" page
    When I select activity code "21 - Vehicle / gear not suitable or no vehicle for test"
    And I complete d255
    And I click continue to proceed to the back to office page
    Then I am on the back to office page
    And I continue to the office write up
    Then I should see the "Office" page
    And the office page test outcome is "Terminated"
    And I try to upload the test
    Then validation item "office-candidate-description-validation-text" should be "Describe the candidate"
    And validation item "office-candidate-description-validation-text" should be visible
    And validation item "office-weather-validation-text" should be "Select weather conditions"
    And validation item "office-weather-validation-text" should be visible
    When I enter a candidate description
    And I complete the weather conditions
    And I upload the test
    Then I should see the "Journal" page

  Scenario: Examiner can terminate full practice mode midway through journey
    Given I am on the landing page as "mobexaminer1"
    And I start full practice mode
    When I start the test for "Captain Jeremy Craig"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Jeremy Craig" page
    And the candidate enters a new email address
    And I proceed to the car
    Then I should see the "Jeremy Craig" page
    And I complete the waiting room to car page
    Then I should see the "Test report - Jeremy Craig" page
    When I exit practice mode
    Then I should see the "My dashboard" page