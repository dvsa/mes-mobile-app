@catH  @full_smoke @regression

Feature: Driver Examiner complete the fail journey for Home test H

  Background:
    Given I am logged in as "desexaminerbe" and I have a test for "Miss Florence Pearson"
    When I start the test for "Miss Florence Pearson"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Florence Pearson" page
    When the candidate requests to receive results by post
    And I proceed to the bike

  Scenario: Driving Examiner completes a passed test for category H with 16 faults
    Given I should see the "Florence Pearson" page
    And I select the Eyesight test result "Pass"
    And I enter the vehicle registration number "AB12CDE"
    And I select the "Vehicle checks - Florence Pearson" page
      |H1 - Direction indicators |H15 - Tyre pressures |
      |false                     |false                |
    Then I continue to test report
    Then I should see the "Test report - Florence Pearson" page
    When I add a "Accelerator" driver fault
    When I add a "Accelerator" driver fault
    When I add a "Accelerator" driver fault
    When I add a "Accelerator" driver fault
    And I add a "Signalling" driver fault
    And I add a "Safety" driver fault
    And I add a "Safety" driver fault
    And I add a "Safety" driver fault
    And I add a "Safety" driver fault
    And I add a "Approach speed" driver fault
    And I add a "Accelerator" driver fault
    And I add a "Approach speed" driver fault
    And I add a "Signalling" driver fault
    And I add a "Timed" driver fault
    And I add a "Signalling" driver fault
    When I complete the test
    And I continue to debrief
    Then I should see the Debrief page with outcome "Unsuccessful"
    And I see a "driving" fault for "Control - Accelerator"
    And I see a "driving" fault for "Move Away - Safety"
    And I see a "driving" fault for "Use of mirrors - Signalling"
    And I see a "driving" fault for "Junctions - Approach speed"
    And I see a "driving" fault for "Signals - Timed"
    And I see a "driving" fault for "Vehicle checks"
    And I see a vehicle check fault for "H1 - Direction indicators"
    And I see a vehicle check fault for "H15 - Tyre pressures"
    When I end the debrief
    Then I am on the post debrief holding page
    When I continue to the non pass finalisation page
    And I complete the fail details
    And I am on the back to office page
    And I continue to the office write up
    Then I should see the "Office" page
    And the office page test outcome is "Unsuccessful"
    When I complete the office write up
   And I enter a comment for "driving" fault "Control - Accelerator"
    And I enter a comment for "driving" fault "Move Away - Safety"
    And I enter a comment for "driving" fault "Use of mirrors - Signalling"
    And I enter a comment for "driving" fault "Junctions - Approach speed"
    And I enter a comment for "driving" fault "Signals - Timed"
    And I enter a comment for "driving" fault "Vehicle checks"
    And I upload the test
    Then I should see the "Journal" page
    And the test result for "Miss Florence Pearson" is "2"
