Feature: Journal page
    
   Scenario: Journey has expected past test
    Given I am logged in and on the journal page
    Then I have a slot at "08:10" for "Chris Nappin"

   Scenario: Journey has expected past non-completion
    Given I am logged in and on the journal page
    Then I have a slot at "10:14" for "Matt Murray"

   Scenario: Journey has expected future test
    Given I am logged in and on the journal page
    Then I have a slot at "13:35" for "Ammar Haider"