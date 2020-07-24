@cata @full_smoke @regression
Feature: A Driving Examiner Rekeys Category Mod1 tests

  Scenario: User can rekey a test pass for the previous day
    Given I am logged in as "desexamineram1" and I have a test for "Ms Shelia Cantu"
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
    And I see a "driving" fault for "Move away - Safety"
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

  Scenario: Driving Examiner rekeys a failed test for two days ago
    Given I am logged in as "desexamineram1" and I have a test for "Mr Mcdowell Goff"
    When I navigate to 2 day previously
    When I view candidate details for "Mr Mcdowell Goff"
    Then I should see the "Test details - Mr Mcdowell Goff" page
    And I should see the "Slot type" contains "Special Needs Extra Time"
    And I should see the "Driver number" contains "CATA112345678925"
    When I close the candidate test details modal
    And I rekey a test for "Mr Mcdowell Goff"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Mcdowell Goff" page
    When the candidate requests to receive results by post
    And I proceed to the bike
    Then I should see the "Mcdowell Goff" page
    And I complete the waiting room to bike page with confirmed cat type "A1"
    Then I should see the "Test report - Mcdowell Goff" page
    When I add a "Manual handling" driver fault
    And the driver fault count is "1"
    And I add a "Safety" driver fault
    And the driver fault count is "2"
    And I enter "Emergency Stop" first value "23" and second value "45"
    And I enter "Avoidance Stop" first value "34" and second value "55"
    When I add a "Use of stand" driver fault
    And the driver fault count is "3"
    When I add a "Controlled stop" driver fault
    And the driver fault count is "4"
    When I add a "Control" driver fault
    And the driver fault count is "5"
    When I add a "Precautions" driver fault
    And the driver fault count is "6"
    And I add a "Slow control" driver fault
    And the driver fault count is "7"
    And I add a "Emergency stop" driver fault
    And the driver fault count is "8"
    And I add a "Avoidance ex. C/Stop" driver fault
    And the driver fault count is "9"
    When I end the test
    And I continue to debrief
    Then I should see the Debrief page with outcome "Unsuccessful"
    And I see a "driving" fault for "Move away - Safety"
    And I see a "driving" fault for "Move away - Control"
    And I see a "driving" fault for "Precautions"
    And I see a "driving" fault for "Manual handling"
    And I see a "driving" fault for "Use of stand"
    And I see a "driving" fault for "Slow control"
    And I see a "driving" fault for "Controlled stop"
    Then I should see the "Debrief - Mcdowell Goff" page
    When I end the debrief
    Then I am on the post debrief holding page
    When I continue to the non pass finalisation page
    And I complete the fail details
    And I am on the back to office page
    And I continue to the office write up
    Then I should see the "Office" page
    And the office page test outcome is "Unsuccessful"
    When I complete the office write up
    And I enter a comment for "driving" fault "Move away - Safety"
    And I enter a comment for "driving" fault "Move away - Control"
    And I enter a comment for "driving" fault "Precautions"
    And I enter a comment for "driving" fault "Manual handling"
    And I enter a comment for "driving" fault "Use of stand"
    And I enter a comment for "driving" fault "Controlled stop"
    And I enter a comment for "driving" fault "Slow control"
    And I enter a comment for "driving" fault "Emergency stop"
    And I enter a comment for "driving" fault "Avoidance ex. C/Stop"
    And I complete the rekey
    Then the rekey is successfully uploaded
    And I return to the journal
    Then I should see the "Journal" page
    And the test result for "Mr Mcdowell Goff" is "2"

