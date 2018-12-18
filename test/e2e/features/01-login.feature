Feature: Login

   Scenario: User launches application
    Given I am a mobile app user 
    When I launch the mobile app
    Then I should see the "Login" page
    
   Scenario: User logs in to the application
    Given I am on the login page
     When I log in to the application
     Then I should see the "Journal" page
