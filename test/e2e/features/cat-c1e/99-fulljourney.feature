@catc1e
Feature: Full end to end journey for C1E

  Scenario: Examiner completes a passed test with no faults
    Given I am logged in as "mobexaminer5" and I have a test for "Mr Denny Carlson"
    When I start the test for "Mr Denny Carlson"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Denny Carlson" page
    And the candidate enters a new email address
    And I proceed to the car
    Then I should see the "Denny Carlson" page
    And I complete the waiting room to car page
    Then I should see the "Test report - Denny Carlson" page
    When I open the reversing diagram
    Then I should see the reversing diagram modal
    And I close the reversing diagram modal
    Then I close the revresing diagram drop down
    And I complete the test with uncouple recouple
    And I continue to debrief
    Then I should see the Debrief page with outcome "Passed"
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
