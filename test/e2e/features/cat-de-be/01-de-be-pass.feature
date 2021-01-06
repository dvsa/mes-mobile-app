Feature: Login to My dashboard page and continue to the rekey delegated examiner test

  Scenario: Examiner enter reference number in the Rekey Delegated Examiner test
    Given I am not logged in
    When I log in to the application as "delegatedexaminer"
    Then I should see the "My dashboard" page
    And I click on the test rekey delegated examiner test
    Then I should see the "Search test rekey backlog" page
    When I search for a completed test with the application reference "24306742010"
    And I click on Search booked tests button
    Then I view candidate details for "Dave Gorman"
    And I rekey a test for "Dave Gorman"
    Then I should see the "Dave Gorman" page
    And I complete the waiting room to car page
    Then I should see the "Test report - Dave Gorman" page
    And I complete the test
    And I continue to debrief
    Then I should see the Debrief page with outcome "Passed"
    And I should see the "Debrief - Dave Gorman" page
    When I end the debrief
    Then I should see the "Test debrief - Dave Gorman" page
    And I complete the pass details
    And I complete the health declaration
    Then I am on the back to office page
    And I continue to the office write up
    Then I should see the "Office" page
    And the office page test outcome is "Passed"
    When I complete the office write up
    And I upload the test
    Then I should see the "Journal" page
    And the test result for "Dave Gorman" is "1"
