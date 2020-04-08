@catb @full_smoke @regression
Feature: A Driving Examiner Completes a Passed Journey for Category B Using Autosave

  Scenario: Examiner completes a passed test for autosave
    Given I am logged in as "mobexaminer1" and I have a test for "Miss Florence Pearson"
    When I start the test for "Miss Florence Pearson"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Florence Pearson" page
    And the candidate enters a new email address
    And I proceed to the car
    Then I should see the "Florence Pearson" page
    And I complete the waiting room to car page with automatic transmission
    Then I should see the "Test report - Florence Pearson" page
    And I complete the test with controlled stop
    And I continue to debrief
    Then I should see the Debrief page with outcome "Passed"
    And I should see the "Debrief - Florence Pearson" page
    When I end the debrief
    Then I should see the "Test debrief - Florence Pearson" page
    And I complete the pass details with an automatic transmission
    And I complete the health declaration
    Then I am on the back to office page
    Then I return to the Journal Page
    And I should see the "Journal" page
    When I click the back button
    Then I should see the "My dashboard" page
    When I click search completed tests
    When I search for a completed test with the application reference of "1234567031"
    And the search result is clicked
    Then I should see the "Test information" page
    And the test result outcome is "Passed"
    And the test result has the following data present
      | label                             | value                |
      | Transmission                      | Automatic            |
      | Application reference             | 1234567031           |
      | Vehicle registration number       | AB12CDE              |
      | Test category                     | B                    |
      | Slot type                         | Standard Test        |
      | ETA                               | None                 |
      | Licence provided                  | Yes                  |
      | Route number                      | None                 |
      | Physical description of candidate | None                 |
      | Weather conditions                | None                 |
    And the Debrief has the correct test information, "T1", " - Brakes"
    When I click the close button
    Then I should see the "Search submitted test" page
    When I click the back button on the search submitted test page
    Then I should see the "My dashboard" page
    When I click go to my Journal
    And I should see the "Journal" page
    Then I continue the write up for "Miss Florence Pearson"
    Then I should see the "Office" page
    And the office page test outcome is "Passed"
    When I complete the office write up
    And I upload the test
    Then I should see the "Journal" page
    And the test result for "Miss Florence Pearson" is "1"