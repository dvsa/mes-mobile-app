@catb
Feature: Login

   Scenario: User presented login screen
    Given I am not logged in 
    When I launch the mobile app
    Then I should see the Microsoft login page
    
  Scenario: User logs into the application
    Given I am not logged in
    When I log in to the application as "mobexaminer1"
    Then I should see the "My dashboard" page
