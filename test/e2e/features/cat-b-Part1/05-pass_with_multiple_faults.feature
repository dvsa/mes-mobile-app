@catb @full_smoke @regression
Feature: A Driving Examiner Completes pass test's for Category B with multiple faults

   @smoke
   Scenario: Examiner completes a passed test with driver faults

      Given I am logged in as "mobexaminer1" and I have a test for "Mrs Pearson Doris"
      When I start the test for "Mrs Pearson Doris"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - Pearson Doris" page
      And the candidate enters a new email address
      And I proceed to the car
      Then I should see the "Pearson Doris" page
      And I complete the waiting room to car page
      Then I should see the "Test report - Pearson Doris" page
      When I add a "Accelerator" driver fault
      And I add a "Timed" driver fault
      And I add a "Clearance" driver fault
      And I add a "Signalling" driver fault
      And I add a "Timed" driver fault
      Then the driver fault count is "5"
      And I complete the test
      And I continue to debrief
      Then I should see the Debrief page with outcome "Passed"
      And I should see the "Debrief - Pearson Doris" page
      When I end the debrief
      Then I should see the "Test debrief - Pearson Doris" page
      And I complete the pass details
      And I complete the health declaration
      And I should see the "Confirm test details - Pearson Doris" page
      And I complete the Confirmation page
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Passed"
      And there are "2" driver faults listed for "Signals - Timed"
      And there is "1" driver fault listed for "Control - Accelerator"
      And there is "1" driver fault listed for "Clearance"
      And there is "1" driver fault listed for "Use of mirrors - Signalling"
      And I complete the office write up
      And I upload the test
      Then I should see the "Journal" page
      And the test result for "Mrs Pearson Doris" is "1"

   Scenario: Candidate passes a test with 15 driver faults

      Given I am logged in as "mobexaminer1" and I have a test for "Mrs Doe Carly"
      When I check candidate details for "Mrs Doe Carly"
      And I start the test for "Mrs Doe Carly"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - Doe Carly" page
      And the candidate enters a new email address
      And I proceed to the car
      Then I should see the "Doe Carly" page
      And I complete the waiting room to car page
      Then I should see the "Test report - Doe Carly" page
      When I add a "Accelerator" driver fault
      And I add a "Safety" driver fault
      And I add a "Safety" driver fault
      And I add a "Lane discipline" driver fault
      And I add a "Accelerator" driver fault
      And I add a "Safety" driver fault
      And I add a "Lane discipline" driver fault
      And I add a "Lane discipline" driver fault
      And I add a "Approach speed" driver fault
      And I add a "Approach speed" driver fault
      And I add a "Signalling" driver fault
      And I add a "Timed" driver fault
      And I add a "Clearance" driver fault
      And I add a "Signalling" driver fault
      And I add a "Signalling" driver fault
      Then the driver fault count is "15"
      When I complete the test
      And I continue to debrief
      Then I should see the Debrief page with outcome "Passed"
      And I see a "driving" fault for "Use of mirrors - Signalling"
      And I see a "driving" fault for "Move off - Safety"
      And I see a "driving" fault for "Positioning - Lane discipline"
      And I see a "driving" fault for "Control - Accelerator"
      And I see a "driving" fault for "Junctions - Approach speed"
      And I see a "driving" fault for "Signals - Timed"
      And I see a "driving" fault for "Clearance"
      When I end the debrief
      Then I should see the "Test debrief - Doe Carly" page
      And I complete the pass details
      And I complete the health declaration
      And I should see the "Confirm test details - Doe Carly" page
      And I complete the Confirmation page
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Passed"
      And there are "3" driver faults listed for "Move off - Safety"
      And there are "3" driver faults listed for "Positioning - Lane discipline"
      And there are "3" driver faults listed for "Use of mirrors - Signalling"
      And there are "2" driver faults listed for "Control - Accelerator"
      And there are "2" driver faults listed for "Junctions - Approach speed"
      And there is "1" driver fault listed for "Signals - Timed"
      And there is "1" driver fault listed for "Clearance"
      And I complete the office write up
      And I upload the test
      Then I should see the "Journal" page
      And the test result for "Mrs Doe Carly" is "1"
