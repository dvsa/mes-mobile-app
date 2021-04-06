@catc @full_smoke @regression
Feature: Driving Examiner Completes Terminated Tests for Category C

  Scenario: Examiner terminates a test on the test report due to mechanical failure

    Given I am logged in as "mobexaminer5" and I have a test for "Mr Jorden Tanner"
    When I check candidate details for "Mr Jorden Tanner"
    And I start the test for "Mr Jorden Tanner"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Jorden Tanner" page
    And the candidate enters a new email address
    And I proceed to the car
    Then I should see the "Jorden Tanner" page
    And I complete the waiting room to car page
    Then I should see the "Test report - Jorden Tanner" page
    When I terminate the test from the test report page
    Then I should see the Debrief page with outcome "Terminated"
    When I end the debrief
    Then I am on the post debrief holding page
    When I continue to the non pass finalisation page
    Then I should see the "Finalise outcome C - Jorden Tanner" page
    When I select activity code "11 - Mechanical failure"
    Then the transmission is selected
    And I continue to the back to office page
    And I should see the "Confirm test details - Jorden Tanner" page
    And I complete the Confirmation page
    Then I am on the back to office page
    And I continue to the office write up
    Then I should see the "Office" page
    And the office page test outcome is "Terminated"
    When I complete the office write up
    And I upload the test
    Then I should see the "Journal" page
    And the test result for "Mr Jorden Tanner" is "11"
