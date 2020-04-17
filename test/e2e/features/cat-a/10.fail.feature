@cata
Feature: Driving Examiner Completes a Failed Journey on Category A for Mod1

  Scenario: Examiner completes a passed test with no faults
    Given I am logged in as "desexaminera" and I have a test for "Ms Alisa Garza"
    When I start the test for "Ms Alisa Garza"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Alisa Garza" page
    And the candidate enters a new email address
    And I proceed to the car
    Then I should see the "Alisa Garza" page
    And I complete the waiting room to car page with confirmed cat type
    Then I should see the "Test report - Alisa Garza" page
#      And I complete the test as a Mod1 user
    When I add a "Use of stand" driver fault
    And the driver fault count is "1"
    When I add a "Safety" driver fault
    And the driver fault count is "2"
    And I continue to debrief
    Then I should see the Debrief page with outcome "Failed"
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

