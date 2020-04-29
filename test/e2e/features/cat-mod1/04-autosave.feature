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
#    And the test result outcome is "Passed"
