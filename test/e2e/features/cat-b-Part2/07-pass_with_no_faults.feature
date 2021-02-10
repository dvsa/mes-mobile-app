@catb @smoke @regression
Feature: A Driving Examiner Completes a pass test for category B

  Scenario: Examiner completes a passed test with no faults

    Given I am logged in as "mobexaminer1" and I have a test for "Miss Mcclain Misha"
    When I start the test for "Miss Mcclain Misha"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Mcclain Misha" page
    And the candidate enters a new email address
    And I proceed to the car
    Then I should see the "Mcclain Misha" page
    And I complete the waiting room to car page
    Then I should see the "Test report - Mcclain Misha" page
    And I complete the test with controlled stop
    And I continue to debrief
    Then I should see the Debrief page with outcome "Passed"
    And I should see the "Debrief - Mcclain Misha" page
    When I end the debrief
    Then I should see the "Test debrief - Mcclain Misha" page
    And I complete the pass details
    And I complete the health declaration
    Then I am on the back to office page
    And I continue to the office write up
    Then I should see the "Office" page
    And the office page test outcome is "Passed"
    When I complete the office write up
    And I upload the test
    Then I should see the "Journal" page
    And the test result for "Miss Mcclain Misha" is "1"
