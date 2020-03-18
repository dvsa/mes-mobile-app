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
    When I choose category "AM" test
    And I complete the waiting room to car page
    Then I should see the "Test report - Deanna Wolf" page
    And I enter recorded speed for Emergency Stop
    When I end the test
    Then the legal requirements pop up is present
    And the required test observation is present "NS (normal start)"
    And the required test observation is present "UH (uphill start)"
    And the required test observation is present "AS/CS (angled start/ controlled stop)"
    And the required test observation is present "Manoeuvres"
    And the required test observation is present "Eco (control and planning)"
    And the required test observation is present "Uncouple / Recouple"
    Then I return to the test report page
    And I should see the "Test report - Dillon Jennings" page
    And I enter the legal requirements