@catHome @full_smoke @regression

Feature: Driver Examiner complete the fail journey for Home test H

  Scenario: Driving Examiner fail the Eyesight test

    Given I am logged in as "desexaminerbe" and I have a test for "Mrs Carly Doe"
    When I check candidate details for "Mrs Carly Doe"
    And I start the test for "Mrs Carly Doe"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Carly Doe" page
    When the candidate requests to receive results by post
    And I proceed to the car
    Then I should see the "Carly Doe" page
    And I fail the eye sight test
    Then I should see the Debrief page with outcome "Unsuccessful"
    And I should see the "Debrief - Carly Doe" page
    When I end the debrief
    Then I am on the post debrief holding page
    When I continue to the non pass finalisation page
    Then I should see the "Finalise outcome - Carly Doe" page
    And I complete the fail details
    And I continue to the office write up
    Then I should see the "Office" page
    And the office page test outcome is "Unsuccessful"
    When I complete the office write up
    And I enter a comment for "serious" fault "Eyesight Test"
    And I upload the test
    Then I should see the "Journal" page
    And the test result for "Mrs Carly Doe" is "3"

  Scenario: Driving Examiner fail the test for category H with 16 faults

    Given I am logged in as "desexaminerbe" and I have a test for "Miss Alice Cooper"
    When I check candidate details for "Miss Alice Cooper"
    And I start the test for "Miss Alice Cooper"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Alice Cooper" page
    When the candidate requests to receive results by post
    And I proceed to the car
    Then I should see the "Alice Cooper" page
    And I select the Eyesight test result "Pass"
    And I enter the vehicle registration number "AB12CDE"
    And I select the "Vehicle checks - Alice Cooper" page
      |H1 - Direction indicators |H15 - Tyre pressures |
      |false                     |false                |
    Then I continue to test report
    Then I should see the "Test report - Alice Cooper" page
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
    And I see a "driving" fault for "Move off - Safety"
    And I see a "driving" fault for "Use of mirrors - Signalling"
    And I see a "driving" fault for "Junctions - Approach speed"
    And I see a "driving" fault for "Signals - Timed"
    And I see a "driving" fault for "Vehicle checks"
    And I see a vehicle check fault for "H1 - Direction indicators"
    And I see a vehicle check fault for "H15 - Tyre pressures"
    When I end the debrief
    Then I am on the post debrief holding page
    When I continue to the non pass finalisation page
    Then I should see the "Finalise outcome - Alice Cooper" page
    And I complete the fail details
    And I am on the back to office page
    And I continue to the office write up
    Then I should see the "Office" page
    And the office page test outcome is "Unsuccessful"
    When I complete the office write up
    And I enter a comment for "driving" fault "Control - Accelerator"
    And I enter a comment for "driving" fault "Move off - Safety"
    And I enter a comment for "driving" fault "Use of mirrors - Signalling"
    And I enter a comment for "driving" fault "Junctions - Approach speed"
    And I enter a comment for "driving" fault "Signals - Timed"
    And I enter a comment for "driving" fault "Vehicle checks"
    And I upload the test
    Then I should see the "Journal" page
    And the test result for "Miss Alice Cooper" is "2"

  Scenario: Driving Examiner fail the test for category H with 1 serious fault

    Given I am logged in as "desexaminerbe" and I have a test for "Miss Anna Shaw"
    When I check candidate details for "Miss Anna Shaw"
    And I start the test for "Miss Anna Shaw"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Anna Shaw" page
    When the candidate requests to receive results by post
    And I proceed to the car
    Then I should see the "Anna Shaw" page
    And I select the Eyesight test result "Pass"
    And I enter the vehicle registration number "AB12CDE"
    And I select the "Vehicle checks - Anna Shaw" page
      |H1 - Direction indicators |H15 - Tyre pressures |
      |true                      |true                 |
    Then I continue to test report
    Then I should see the "Test report - Anna Shaw" page
    And I add a "Accelerator" serious fault
    When I complete the test
    And I continue to debrief
    Then I should see the Debrief page with outcome "Unsuccessful"
    And I see a "serious" fault for "Control - Accelerator"
    When I end the debrief
    Then I am on the post debrief holding page
    When I continue to the non pass finalisation page
    Then I should see the "Finalise outcome - Anna Shaw" page
    And I complete the fail details
    And I am on the back to office page
    And I continue to the office write up
    Then I should see the "Office" page
    And the office page test outcome is "Unsuccessful"
    When I complete the office write up
    And I enter a comment for "serious" fault "Control - Accelerator"
    And I upload the test
    Then I should see the "Journal" page
    And the test result for "Miss Anna Shaw" is "2"

  Scenario: Driving Examiner fail the test for category H with 1 dangerous fault

    Given I am logged in as "desexaminerbe" and I have a test for "Mr Buxton Phil"
    When I check candidate details for "Mr Buxton Phil"
    And I start the test for "Mr Buxton Phil"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Buxton Phil" page
    When the candidate requests to receive results by post
    And I proceed to the car
    Then I should see the "Buxton Phil" page
    And I select the Eyesight test result "Pass"
    And I enter the vehicle registration number "AB12CDE"
    And I select the "Vehicle checks - Buxton Phil" page
      |H1 - Direction indicators |H15 - Tyre pressures |
      |true                      |true                 |
    Then I continue to test report
    Then I should see the "Test report - Buxton Phil" page
    And I add a "Signalling" dangerous fault
    When I complete the test
    And I continue to debrief
    Then I should see the Debrief page with outcome "Unsuccessful"
    And I see a "dangerous" fault for "Use of mirrors - Signalling"
    When I end the debrief
    Then I am on the post debrief holding page
    When I continue to the non pass finalisation page
    Then I should see the "Finalise outcome - Buxton Phil" page
    And I complete the fail details
    And I am on the back to office page
    And I continue to the office write up
    Then I should see the "Office" page
    And the office page test outcome is "Unsuccessful"
    When I complete the office write up
    And I enter a comment for "dangerous" fault "Use of mirrors - Signalling"
    And I upload the test
    Then I should see the "Journal" page
    And the test result for "Mr Buxton Phil" is "2"

