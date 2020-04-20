@cata
Feature: A Driving Examiner Completes pass test's for Mod1

  Scenario: Examiner changes test category to A
    Given I am logged in as "desexamineram1" and I have a test for "Ms Alisa Garza"
    When I start the test for "Ms Alisa Garza"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Alisa Garza" page
    When the candidate requests to receive results by post
    And I proceed to the bike
    Then I should see the "Alisa Garza" page
    And I complete the waiting room to bike page with confirmed cat type "A"
    Then I should see the "Test report - Alisa Garza" page
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
    Then I should see the "Test debrief - Alisa Garza" page
    And I complete the pass details
    And I complete the health declaration
    Then I am on the back to office page
    And I continue to the office write up
    Then I should see the "Office" page
    And the office page test outcome is "Passed"
    When I complete the office write up
    And I upload the test
    Then I should see the "Journal" page
    And the test result for "Ms Alisa Garza" is "1"

  Scenario: Examiner changes test category to A1
    Given I am logged in as "desexamineram1" and I have a test for "Mr Denny Carlson"
    When I start the test for "Mr Denny Carlson"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Denny Carlson" page
    When the candidate requests to receive results by post
    And I proceed to the bike
    Then I should see the "Denny Carlson" page
    And I complete the waiting room to bike page with confirmed cat type "A1"
    Then I should see the "Test report - Denny Carlson" page
    When I add a "Use of stand" driver fault
    And the driver fault count is "1"
    And I add a "Safety" driver fault
    And the driver fault count is "2"
    And I enter "Emergency Stop" first value "44" and second value "-"
    And I enter "Avoidance Stop" first value "54" and second value "-"
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
    Then I should see the "Test debrief - Denny Carlson" page
    And I complete the pass details
    And I complete the health declaration
    Then I am on the back to office page
    And I continue to the office write up
    Then I should see the "Office" page
    And the office page test outcome is "Passed"
    When I complete the office write up
    And I upload the test
    Then I should see the "Journal" page
    And the test result for "Mr Denny Carlson" is "1"

