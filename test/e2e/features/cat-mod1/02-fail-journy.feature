@cata
Feature: A Driving Examiner Completes failed tests

  Scenario: Examiner completes failed test with more than 6 faults
    Given I am logged in as "desexamineram1" and I have a test for "Mr Right Ford"
    When I start the test for "Mr Right Ford"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Right Ford" page
    When the candidate requests to receive results by post
    And I proceed to the bike
    Then I should see the "Right Ford" page
    And I complete the waiting room to bike page with confirmed cat type "A2"
    Then I should see the "Test report - Right Ford" page
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
    And I see a "driving" fault for "Move Away - Safety"
    And I see a "driving" fault for "Move Away - Control"
    And I see a "driving" fault for "Precautions"
    And I see a "driving" fault for "Manual handling"
    And I see a "driving" fault for "Use of stand"
    And I see a "driving" fault for "Slow control"
    And I see a "driving" fault for "Controlled stop"
    Then I should see the "Debrief - Right Ford" page
    When I end the debrief
    Then I am on the post debrief holding page
    When I continue to the non pass finalisation page
    And I complete the fail details
    And I am on the back to office page
    And I continue to the office write up
    Then I should see the "Office" page
    And the office page test outcome is "Unsuccessful"
    When I complete the office write up
    And I enter a comment for "driving" fault "Move Away - Safety"
    And I enter a comment for "driving" fault "Move Away - Control"
    And I enter a comment for "driving" fault "Precautions"
    And I enter a comment for "driving" fault "Manual handling"
    And I enter a comment for "driving" fault "Use of stand"
    And I enter a comment for "driving" fault "Controlled stop"
    And I enter a comment for "driving" fault "Slow control"
    And I enter a comment for "driving" fault "Emergency stop"
    And I enter a comment for "driving" fault "Avoidance ex. C/Stop"
    And I upload the test
    Then I should see the "Journal" page
    And the test result for "Mr Right Ford" is "2"

  Scenario: Examiner fail candidate by no meeting emergency stop requirements
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
    And I enter "Emergency Stop" first value "23" and second value "45"
    And I enter "Avoidance Stop" first value "34" and second value "55"
    And I click Emergency Stop Not Met
    When I end the test with the speed requirements not met
    Then I should see the Debrief page with outcome "Unsuccessful"
    Then I should see the "Debrief - Alisa Garza" page
    When I end the debrief
    Then I am on the post debrief holding page
    When I continue to the non pass finalisation page
    And I complete the fail details
    And I am on the back to office page
    And I continue to the office write up
    Then I should see the "Office" page
    And the office page test outcome is "Unsuccessful"
    When I complete the office write up
    And I enter a comment for "serious" fault "Emergency stop - Speed requirement not met"
    And I upload the test
    Then I should see the "Journal" page
    And the test result for "Ms Alisa Garza" is "4"
