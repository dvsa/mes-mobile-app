@cata @full_smoke @regression
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
    And I see a "driving" fault for "Move away - Safety"
    And I see a "driving" fault for "Move away - Control"
    And I see a "driving" fault for "Precautions"
    And I see a "driving" fault for "Manual handling"
    And I see a "driving" fault for "Use of stand"
    And I see a "driving" fault for "Slow control"
    And I see a "driving" fault for "Controlled stop"
    Then I should see the "Debrief - Right Ford" page
    When I end the debrief
    Then I am on the post debrief holding page
    When I continue to the non pass finalisation page
    Then I should see the "Finalise outcome - Right Ford" page
    And I complete the fail details
    And I should see the "Confirm test details - Right Ford" page
    And I complete the Confirmation page
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
    And I upload the test
    Then I should see the "Journal" page
    And the test result for "Mr Right Ford" is "2"

  Scenario: Examiner fail candidate by no meeting emergency stop requirements

    Given I am logged in as "desexamineram1" and I have a test for "Ms Deanna Wolf"
    When I start the test for "Ms Deanna Wolf"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Deanna Wolf" page
    When the candidate requests to receive results by post
    And I proceed to the bike
    Then I should see the "Deanna Wolf" page
    And I complete the waiting room to bike page with confirmed cat type "A"
    Then I should see the "Test report - Deanna Wolf" page
    And I enter "Emergency Stop" first value "23" and second value "45"
    And I enter "Avoidance Stop" first value "34" and second value "55"
    And I click Emergency Stop Not Met
    When I end the test with the speed requirements not met
    Then I should see the Debrief page with outcome "Unsuccessful"
    Then I should see the "Debrief - Deanna Wolf" page
    When I end the debrief
    Then I am on the post debrief holding page
    When I continue to the non pass finalisation page
    Then I should see the "Finalise outcome - Deanna Wolf" page
    And I complete the fail details
    And I should see the "Confirm test details - Deanna Wolf" page
    And I complete the Confirmation page
    And I am on the back to office page
    And I continue to the office write up
    Then I should see the "Office" page
    And the office page test outcome is "Unsuccessful"
    When I complete the office write up
    And I enter a comment for "serious" fault "Emergency stop - Speed requirement not met"
    And I upload the test
    Then I should see the "Journal" page
    And the test result for "Ms Deanna Wolf" is "4"

  Scenario: A Driving Examiner Completes a fail test for auto save

    Given I am on the "Journal" page
    And  I click the back button
    Then I should see the "My dashboard" page
    When I click search completed tests
    When I search for a completed test with the application reference of "20100023011"
    And the search result is clicked
    Then I should see the "Test information" page
    And the test result outcome is "Unsuccessful"
    And the test result has the following data present
      | label                             | value                                  |
      | Application reference             | 20100023011                            |
      | Test category                     | EUA2M1                                  |
      | Test centre                       | EXTC1                                  |
      | D255                              | No                                     |
      | Route number                      | 88                                     |
      | Physical description of candidate | None                                   |
      | Weather conditions                | Bright / wet roads and Showers         |
    When I click the close button
    Then I should see the "Search submitted test" page
    When I click the back button on the search submitted test page
    Then I should see the "My dashboard" page
