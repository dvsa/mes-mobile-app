@catb @full_smoke @regression
Feature: A Driving Examiner Rekeys Category B tests

  Scenario: User can rekey a test pass for the previous day
    Given I am logged in as "mobexaminer1" and I have a test for "Miss Doris Pearson"
    When I navigate to 1 day previously
    And I rekey a test for "Miss Doris Pearson"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Doris Pearson" page
    And the candidate enters a new email address
    And I proceed to the car
    Then I should see the "Doris Pearson" page
    And I complete the waiting room to car page
    Then I should see the "Test report - Doris Pearson" page
    When I add a "Undue hesitation" driver fault
    And I add a "Traffic lights" driver fault
    And I add a "Crossing" driver fault
    And I add a "Ancillary controls" driver fault
    And I add a "Gears" driver fault
    Then the driver fault count is "5"
    And I complete the test
    And I continue to debrief
    Then I should see the Debrief page with outcome "Passed"
    And I see a "driving" fault for "Progress - Undue hesitation"
    And I see a "driving" fault for "Response to signs / signals - Traffic lights"
    And I see a "driving" fault for "Judgement - Crossing"
    And I see a "driving" fault for "Control - Ancillary Controls"
    And I see a "driving" fault for "Control - Gears"
    When I end the debrief
    Then I should see the "Test debrief - Doris Pearson" page
    And I complete the pass details
    And I complete the health declaration
    Then I am on the back to office page
    And I continue to the office write up
    Then I should see the "Office" page
    And the office page test outcome is "Passed"
    And there is "1" driver fault listed for "Progress - Undue hesitation"
    And there is "1" driver fault listed for "Response to signs / signals - Traffic lights"
    And there is "1" driver fault listed for "Judgement - Crossing"
    And there is "1" driver fault listed for "Control - Ancillary Controls"
    And there is "1" driver fault listed for "Control - Gears"
    When I complete the office write up
    And I complete the rekey
    Then the rekey is successfully uploaded
    And I return to the journal
    Then I should see the "Journal" page
    And the test result for "Miss Doris Pearson" is "1"

  Scenario: Driving Examiner rekeys a failed test for two days ago
    Given I am logged in as "mobexaminer1" and I have a test for "Mrs Carly Doe"
    When I navigate to 2 day previously
    And I rekey a test for "Mrs Carly Doe"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Carly Doe" page
    And I proceed to the car
    Then I should see the "Carly Doe" page
    And I complete the waiting room to car page with a tell me driver fault
    Then I should see the "Test report - Carly Doe" page
    When I add a "Turning right" driver fault
    And I add a "Cutting corners" serious fault
    And I add a "Following distance" driver fault
    Then the driver fault count is "3"
    When I complete the test
    And I continue to debrief
    Then I should see the Debrief page with outcome "Unsuccessful"
    And I see a "serious" fault for "Junctions - Cutting corners"
    And I see a "driving" fault for "Junctions - Turning right"
    And I see a "driving" fault for "Following distance"
    And I see a "driving" fault for "Vehicle checks"
    When I end the debrief
    Then I am on the post debrief holding page
    When I continue to the non pass finalisation page
    Then I should see the "Finalise outcome - Carly Doe" page
    When I continue to the back to office page
    Then I am on the back to office page
    And I continue to the office write up
    Then I should see the "Office" page
    And the office page test outcome is "Unsuccessful"
    And there is "1" driver fault listed for "Junctions - Turning right"
    And there is "1" driver fault listed for "Following distance"
    And there is "1" driver fault listed for "Show Me/Tell Me"
    And I complete the office write up
    And I enter a comment for "serious" fault "Junctions - Cutting corners"
    When I complete the rekey
    Then the rekey is successfully uploaded
    And I return to the journal
    Then I should see the "Journal" page
    And the test result for "Mrs Carly Doe" is "2"

  Scenario: Driver Examiner rekeys a late test from paper
    Given I am logged in as "mobexaminer1" and I have a test for "Miss Florence Pearson"
    And I rekey a late test for "Miss Florence Pearson"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Florence Pearson" page
    And the candidate enters a new email address
    And I proceed to the car
    Then I should see the "Florence Pearson" page
    And I complete the waiting room to car page
    Then I should see the "Test report - Florence Pearson" page
    When I add a "Undue hesitation" driver fault
    And I add a "Traffic lights" driver fault
    And I add a "Crossing" driver fault
    And I add a "Ancillary controls" driver fault
    And I add a "Gears" driver fault
    Then the driver fault count is "5"
    And I complete the test
    And I continue to debrief
    Then I should see the Debrief page with outcome "Passed"
    And I see a "driving" fault for "Progress - Undue hesitation"
    And I see a "driving" fault for "Response to signs / signals - Traffic lights"
    And I see a "driving" fault for "Judgement - Crossing"
    And I see a "driving" fault for "Control - Ancillary Controls"
    And I see a "driving" fault for "Control - Gears"
    When I end the debrief
    Then I should see the "Test debrief - Florence Pearson" page
    And I complete the pass details
    And I complete the health declaration
    Then I am on the back to office page
    And I continue to the office write up
    Then I should see the "Office" page
    And the office page test outcome is "Passed"
    And there is "1" driver fault listed for "Progress - Undue hesitation"
    And there is "1" driver fault listed for "Response to signs / signals - Traffic lights"
    And there is "1" driver fault listed for "Judgement - Crossing"
    And there is "1" driver fault listed for "Control - Ancillary Controls"
    And there is "1" driver fault listed for "Control - Gears"
    When I complete the office write up
    And I complete the rekey
    Then the rekey is successfully uploaded
    And I return to the journal
    Then I should see the "Journal" page
    And the test result for "Miss Florence Pearson" is "1"
