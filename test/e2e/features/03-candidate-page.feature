Feature: Candidate page
    
   Scenario: I can view the candidate details for a past test
    Given I am logged in and on the journal page
    When I view candidate details for "Christina Alexandria Garcia Gonzalesesi"
    Then I am on the view candidate page
    And The page contains "Christina Alexandria Garcia Gonzalesesi"
    And The page contains "GONZA 123456 CG9EG"

   Scenario: I can view the candidate details for a past non-completion
    Given I am logged in and on the journal page
    When I view candidate details for "Bob Gentile"
    Then I am on the view candidate page
    And The page contains "Bob Gentile"
    And The page contains "GENTI 123456 BO9EG"

   Scenario: I can view the candidate details for a future test
    Given I am logged in and on the journal page
    When I view candidate details for "Florence  Pearson"
    Then I am on the view candidate page
    And The page contains "Florence  Pearson"
    And The page contains "PHIL6 767655 777BN"