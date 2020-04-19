@cata
Feature: A Driving Examiner Rekeys Category Mod1 tests

  Scenario: User can rekey a test pass for the previous day
    Given I am on the journal page as "desexamineram1"
    When I navigate to 1 day previously
    When I view candidate details for "Ms Shelia Cantu"
    Then I should see the "Test details - Ms Shelia Cantu" page
    And I should see the "Slot type" contains "Special Needs Extra Time"
    And I should see the "Driver number" contains "CATA112345678918"
    When I close the candidate test details modal
    And I rekey a test for "Ms Shelia Cantu"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Shelia Cantu" page
    When the candidate requests to receive results by post
    And I proceed to the bike
    Then I should see the "Shelia Cantu" page
    And I complete the waiting room to bike page with confirmed cat type "A2"
    Then I should see the "Test report - Shelia Cantu" page
    When I add a "Use of stand" driver fault
    And the driver fault count is "1"
    And I add a "Safety" driver fault
    And the driver fault count is "2"
    And I enter "Emergency Stop" first value "23" and second value "-"
    And I enter "Avoidance Stop" first value "34" and second value "-"
    And I add a "Slow control" driver fault
    And the driver fault count is "3"
    And I add a "Emergency stop" driver fault
    And the driver fault count is "4"
    And I add a "Avoidance ex. C/Stop" driver fault
    And the driver fault count is "5"
    When I end the test
    And I continue to debrief
    Then I should see the Debrief page with outcome "Passed"
    And I see a "driving" fault for "Move off - Safety"
    And I see a "driving" fault for "Use of stand"
    And I see a "driving" fault for "Slow control"
    And I see a "driving" fault for "Emergency Stop"
    And I see a "driving" fault for "Avoidance ex. control stop"
    When I end the debrief
    Then I should see the "Test debrief - Shelia Cantu" page
    And I complete the pass details
    And I complete the health declaration
    Then I am on the back to office page
    And I continue to the office write up
    Then I should see the "Office" page
    And the office page test outcome is "Passed"
    When I complete the office write up
    And I complete the rekey
    Then the rekey is successfully uploaded
    And I return to the journal
    Then I should see the "Journal" page
    And the test result for "Ms Shelia Cantu" is "1"

