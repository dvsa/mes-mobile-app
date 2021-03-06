@catADI2  @full_smoke @regression

Feature: Driver Examiner complete the fail journey for ADI2

  Scenario: Driving Examiner completes a failed test for category ADI2 with wrong tell me answers.

    Given I am logged in as "desexaminerbe" and I have a test for "Mr Brendan Money"
    When I view candidate details for "Mr Brendan Money"
    When I close the candidate test details modal
    Then I should see the "Journal" page
    When I start the test for "Mr Brendan Money"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Brendan Money" page
    When the candidate requests to receive results by post
    And I proceed to the car
    Then I should see the "Brendan Money" page
    And I select the Eyesight test result "Pass"
    And I enter the vehicle registration number "AB12CDE"
    And I select the "Tell me questions - Brendan Money" page
      |T4 - Sufficient tread |T11 - Dipped to main beam |T13 - Engine coolant |
      |false                 |false                     |false                |
    And I select the Transmission Type "Manual"
    And I select the ordit trainer outcome "Pass"
    And I select the training records outcome "Pass"
    Then I continue to test report
    Then I should see the "Test report - Brendan Money" page
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
    And I should see the "Debrief - Brendan Money" page
    When I end the debrief
    Then I am on the post debrief holding page
    When I continue to the non pass finalisation page
    Then I should see the "Finalise outcome ADI Part 2 - Brendan Money" page
    And I complete the fail details
    And I should see the "Confirm test details - Brendan Money" page
    And I complete the Confirmation page
    Then I am on the back to office page
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
    And the test result for "Mr Brendan Money" is "2"

