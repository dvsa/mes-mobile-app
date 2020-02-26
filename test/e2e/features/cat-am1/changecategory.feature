@catam1
Feature: changecategory
    
  Scenario: User logs into the application
    Given I am logged in as "desexamineram1" and I have a test for "Miss Sheila Kirk"
    When I start the test for "Miss Sheila Kirk"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Sheila Kirk" page
    When the candidate requests to receive results by post
    And I proceed to the car
    Then I should see the "Sheila Kirk" page
    When I choose category "A1" test
    And I complete the waiting room to car page
    Then I should see the "Test report - Sheila Kirk" page
    

