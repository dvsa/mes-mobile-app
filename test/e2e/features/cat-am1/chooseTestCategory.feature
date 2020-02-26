@catam1
Feature: Choose test subcategory
    
  Scenario: Examiner changes test category to A1
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
    When I complete the test
    Then the legal requirements pop up is present

  Scenario: Examiner changes test category to A
    Given I am logged in as "desexamineram1" and I have a test for "Ms Alisa Garza"
    When I start the test for "Ms Alisa Garza"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Alisa Garza" page
    When the candidate requests to receive results by post
    And I proceed to the car
    Then I should see the "Alisa Garza" page
    When I choose category "A" test
    And I complete the waiting room to car page
    Then I should see the "Test report - Alisa Garza" page
    When I complete the test
    Then the legal requirements pop up is present

  Scenario: Examiner changes test category to A2
    Given I am logged in as "desexamineram1" and I have a test for "Mr Right Ford"
    When I start the test for "Mr Right Ford"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Right Ford" page
    When the candidate requests to receive results by post
    And I proceed to the car
    Then I should see the "Right Ford" page
    When I choose category "A2" test
    And I complete the waiting room to car page
    Then I should see the "Test report - Right Ford" page
    When I complete the test
    Then the legal requirements pop up is present

  Scenario: Examiner changes test category to AM
    Given I am logged in as "desexamineram1" and I have a test for "Ms Deanna Wolf"
    When I start the test for "Ms Deanna Wolf"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Deanna Wolf" page
    When the candidate requests to receive results by post
    And I proceed to the car
    Then I should see the "Deanna Wolf" page
    When I choose category "AM" test
    And I complete the waiting room to car page
    Then I should see the "Test report - Deanna Wolf" page
    When I complete the test
    Then the legal requirements pop up is present


