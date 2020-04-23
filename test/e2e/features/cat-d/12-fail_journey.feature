@catd @full_smoke @regression
Feature: A Driving Examiner Completes a Welsh Failed User Journey in Category D

  Scenario: Candidate fails a test with 16 driver faults
    Given I am logged in as "desexaminerd" and I have a test for "Mr Right Ford"
    When I start the test for "Mr Right Ford"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Right Ford" page
    And I proceed to the car
    Then I should see the "Right Ford" page
    And I complete the waiting room to car page
    Then I should see the "Test report - Right Ford" page
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
    And I add a "Signalling" driver fault
    Then the driver fault count is "16"
    When I complete the test
    And I continue to debrief
    Then I should see the Debrief page with outcome "Unsuccessful"
    And I see a "driving" fault for "Use of mirrors - Signalling"
    And I see a "driving" fault for "Move off - Safety"
    And I see a "driving" fault for "Positioning - Lane discipline"
    And I see a "driving" fault for "Controls - Accelerator"
    And I see a "driving" fault for "Junctions - Approach speed"
    And I see a "driving" fault for "Signals - Timed"
    And I see a "driving" fault for "Clearance"
    When I end the debrief
    Then I am on the post debrief holding page
    When I continue to the non pass finalisation page
    Then I should see the "Finalise outcome - Right Ford" page
    When I continue to the back to office page
    And I am on the back to office page
    And I continue to the office write up
    Then I should see the "Office" page
    And the office page test outcome is "Unsuccessful"
    And I complete the office write up
    And I enter a comment for "driving" fault "Use of mirrors - Signalling"
    And I enter a comment for "driving" fault "Move off - Safety"
    And I enter a comment for "driving" fault "Positioning - Lane discipline"
    And I enter a comment for "driving" fault "Controls - Accelerator"
    And I enter a comment for "driving" fault "Junctions - Approach speed"
    And I enter a comment for "driving" fault "Signals - Timed"
    And I enter a comment for "driving" fault "Clearance"
    And I upload the test
    Then I should see the "Journal" page
    And the test result for "Mr Right Ford" is "2"
