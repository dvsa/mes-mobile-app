@catb @regression
Feature: A Driving Examiner  Creates a Lone Worker Incident

    Scenario: Creates a Red Incident
        Given I am logged in as "mobexaminer1" and I have a test for "Miss Florence Pearson"
        When I start the test for "Miss Florence Pearson"
        And I click the SOS button on the Test Report 
        Then I click and hold the red alert button
        When I see the incident has been sent
        And I close the create incident modal
        Then I can see the incident sent icon on the test report page

    Scenario: Creates a Amber Incident
        Given I am logged in as "mobexaminer1" and I have a test for "Mrs Jane Doe"
        When I start the test late for "Mrs Jane Doe"
        And I click the SOS button on the Test Report 
        Then I click and hold the amber alert button
        When I see the incident has been sent
        And I close the create incident modal
        Then I can see the incident sent icon on the test report page
        
    Scenario: Creates a Amber incident and a Red incident
        Given I am logged in as "mobexaminer1" and I have a test for "Mrs Jane Doe"
        When I start the test late for "Mrs Jane Doe"
        Then I click the SOS button on the Test Report Page

    Scenario: SOS button is not present on any customer facing screen
        Given I am logged in as "mobexaminer1" and I have a test for "Miss Florence Pearson"
        When I start the test for "Miss Florence Pearson"
        And the candidate completes the declaration page
        And the candidate confirms their declaration
        Then I should see the "Declaration - Florence Pearson" page
        And the SOS button is not present
        And the candidate enters a new email address
        And I proceed to the car
        Then I should see the "Florence Pearson" page
        And I complete the waiting room to car page
        Then I should see the "Test report - Florence Pearson" page
        And I complete the test with controlled stop
        And I continue to debrief
        Then I should see the Debrief page with outcome "Passed"
        And the SOS button is not present
        And I should see the "Debrief - Florence Pearson" page
        When I end the debrief
        Then I should see the "Test debrief - Florence Pearson" page
        And I complete the pass details
        And I complete the health declaration
        Then I am on the back to office page
        And I continue to the office write up
        Then I should see the "Office" page
        And the office page test outcome is "Passed"
        When I complete the office write up
        And I upload the test
        Then I should see the "Journal" page
        And the test result for "Miss Florence Pearson" is "1"

