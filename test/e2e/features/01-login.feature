Feature: Login

   Scenario: Viewing login page
    Given I am a mobile app user 
    When I launch the mobile app
    Then I should see the login screen
    
# TEMPORARILY REPLACED WITH WELCOME PAGE
   Scenario: User logs in to MES
    Given I am on the login page
#    When I click the "Login" button
    When I click the Ok button
    Then I am on the journal page
