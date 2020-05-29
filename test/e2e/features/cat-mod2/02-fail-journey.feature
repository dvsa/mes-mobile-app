@catm2

Feature: Driver Examiner complete the pass journey for Mod2

  Background:
    Given I am logged in as "desexamineram2" and I have a test for "Mr Richard Rhys"
    When I start the test for "Mr Richard Rhys"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Richard Rhys" page
    When the candidate requests to receive results by post
    And I proceed to the bike

  Scenario: Examiner fail the candidate with 11 driving faults
    Given I should see the "Richard Rhys" page
    And I select the test category "A2"
    And I select the Transmission Type "Manual"
    And I select the Eyesight test result "Pass"
    And I enter the vehicle registration number "AB12CDE"
    And I select the "Safety and Balance Questions - Richard Rhys" page
      |M4 - Lights|M11 - Engine Cut Out Switch|B3 - Balance with passenger|
    |true       |true                       |false                      |
    Then I continue to test report
    Then I should see the "Test report - Richard Rhys" page
    When I add a "Precautions" driver fault
    And I add a "Change Speed" driver fault
    And I add a "Safety" driver fault
    And I add a "Safety" driver fault
    And I add a "Approach speed" driver fault
    And I add a "Precautions" driver fault
    And I add a "Approach speed" driver fault
    And I add a "Signalling" driver fault
    And I add a "Timed" driver fault
    And I add a "Signalling" driver fault
    And I add a "Signalling" dangerous fault
    Then the driver fault count is "11"
    When I complete the test
    And I continue to debrief
    Then I should see the Debrief page with outcome "Unsuccessful"
    And I see a "driving" fault for "Move Away - Safety"
    And I see a "driving" fault for "Junctions - Approach speed"
    And I see a "driving" fault for "Precautions"
    And I see a "driving" fault for "Rear Observation - Signalling"
    And I see a "driving" fault for "Rear Observation - Change Speed"
    And I see a "driving" fault for "Signals - Timed"
    And I see a "driving" fault for "Safety and balance questions"
    And I see a "dangerous" fault for "Rear Observation - Signalling"
    And I see a "safety-and-balance" questions for "B3 - Balance with passenger"
    When I end the debrief
    Then I am on the post debrief holding page
    When I continue to the non pass finalisation page
    And I complete the fail details
    And I am on the back to office page
    And I continue to the office write up
    Then I should see the "Office" page
    And the office page test outcome is "Unsuccessful"
    When I complete the office write up
    And I enter a comment for "dangerous" fault "Rear Observation - Signalling"
    And I upload the test
    Then I should see the "Journal" page
    And the test result for "Mr Richard Rhys" is "2"
