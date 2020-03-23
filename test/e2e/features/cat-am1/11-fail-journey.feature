@catam1
Feature: Driving Examiner Completes 

  Scenario: Examiner changes test category to AM
    Given I am logged in as "desexamineram1" and I have a test for "Ms Deanna Wolf"
    When I start the test for "Ms Deanna Wolf"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Deanna Wolf" page
    When the candidate requests to receive results by post
    And I proceed to the bike
    Then I should see the "Deanna Wolf" page
    When I choose category "A1" test
    And I complete the waiting room to car page
    Then I should see the "Test report - Deanna Wolf" page
    And I enter recorded speed for Emergency Stop
    And I enter recorded speed for Avoidance
    And I add a "Manual handling" dangerous fault
    Then I should see the "Test report - Deanna Wolf" page
    When I end the test
    And I continue to debrief
    Then I should see the Debrief page with outcome "Unsuccessful"
    And I see a "serious" fault for "Clearance"