Feature: Journal page
    
   Scenario: Journal has expected past test
    Given I am logged in and on the journal page
    Then I have a slot at "08:10" for "Christina Alexandria Garcia Gonzalesesi"

   Scenario: Journal has expected past non-completion
    Given I am logged in and on the journal page
    Then I have a slot at "12:38" for "Bob Gentile"

   Scenario: Journal has expected future test
    Given I am logged in and on the journal page
    Then I have a slot at "14:32" for "Florence  Pearson"