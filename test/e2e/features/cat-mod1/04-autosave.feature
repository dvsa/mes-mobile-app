@cata
Feature: A Driving Examiner Completes a Passed Journey for Category Mod1 Using Autosave

  Scenario: Examiner complete the pass test for autosave
    Given I am logged in as "desexamineram1" and I have a test for "Ms Diaz Barber"
    When I start the test for "Ms Diaz Barber"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Diaz Barber" page
    When the candidate requests to receive results by post
    And I proceed to the bike
    Then I should see the "Diaz Barber" page
    And I complete the waiting room to bike page with confirmed cat type "AM"
    Then I should see the "Test report - Diaz Barber" page
    And I enter "Emergency Stop" first value "23" and second value "-"
    And I enter "Avoidance Stop" first value "34" and second value "-"
    When I end the test
    And I continue to debrief
    Then I should see the Debrief page with outcome "Passed"
    When I end the debrief
    Then I should see the "Test debrief - Diaz Barber" page
    And I complete the pass details
    And I complete the health declaration
    Then I am on the back to office page
    And I continue to the office write up
    Then I should see the "Office" page
    And the office page test outcome is "Passed"
    When I complete the office write up
    And I upload the test
    Then I should see the "Journal" page
    When I click the back button
    Then I should see the "My dashboard" page
    When I click search completed tests
    When I search for a completed test with the application reference of "20123022011"
    And the search result is clicked
    Then I should see the "Test information" page
    And the test result outcome is "Passed"
    And the test result has the following data present
      | label                             | value                    |
      | Application reference             | 20123022011              |
      | Test category                     | EUAM1                    |
      | Slot type                         | Standard Test            |
      | Examiner number                   | 10000010                 |
      | Route number                      | 88                       |
      | Physical description of candidate | None                     |
      | Weather conditions                | Bright / wet roads and Showers|
      | Certificate number                | A123456                  |
      | Test centre                       | EXTC1                    |
    When I click the close button
    Then I should see the "Search submitted test" page
    When I click the back button on the search submitted test page
    Then I should see the "My dashboard" page

  Scenario: Examiner complete the pass test for autosave for second candidate
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
    And I enter "Emergency Stop" first value "45" and second value "-"
    And I enter "Avoidance Stop" first value "44" and second value "-"
    When I end the test
    And I continue to debrief
    Then I should see the Debrief page with outcome "Passed"
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
    When I click the back button
    Then I should see the "My dashboard" page
    When I click search completed tests
    When I search for a completed test with the application reference of "20123400011"
    And the search result is clicked
    Then I should see the "Test information" page
    And the test result outcome is "Passed"
    And the test result has the following data present
      | label                             | value                    |
      | Application reference             | 20123400011              |
      | Test category                     | EUAM1                    |
      | Slot type                         | Standard Test            |
      | Examiner number                   | 10000010                 |
      | Route number                      | 88                       |
      | Physical description of candidate | None                     |
      | Weather conditions                | Bright / wet roads and Showers|
      | Certificate number                | A123456                  |
    When I click the close button
    Then I should see the "Search submitted test" page
    When I click the back button on the search submitted test page
    Then I should see the "My dashboard" page
