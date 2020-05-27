@catm2

  Feature: Driver Examiner complete the pass journey for Mod2

    Background:
      Given I am logged in as "desexamineram2" and I have a test for "Dr Fox Farrell"
      When I start the test for "Dr Fox Farrell"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - Fox Farrell" page
      When the candidate requests to receive results by post
      And I proceed to the bike

      Scenario: Examiner changes test category to A
        Given I should see the "Fox Farrell" page
        And I complete the waiting room to bike page with confirmed cat type "A"
        Then I should see the "Test report - Fox Farrell" page
        And I complete the test
        And I continue to debrief
        Then I should see the Debrief page with outcome "Passed"
        And I should see the "Debrief - Fox Farrell" page
        When I end the debrief
        Then I should see the "Test debrief - Fox Farrell" page
        And I complete the pass details
        And I complete the health declaration
        Then I am on the back to office page
        And I continue to the office write up
        Then I should see the "Office" page
        And the office page test outcome is "Passed"
        When I complete the office write up
        And I upload the test
        Then I should see the "Journal" page
        And the test result for "Dr Fox Farrell" is "1"

    Scenario: Driver Examiner Pass the candidate on wrong answer for Safety and Balance Questions
      Given I should see the "Fox Farrell" page
      And I complete the waiting room to car page with a Safety And Balance Question faults and cat type "AM"
      Then I should see the "Test report - Fox Farrell" page
      And I complete the test
      And I continue to debrief
      Then I should see the Debrief page with outcome "Passed"
      And I should see the "Debrief - Fox Farrell" page
      When I end the debrief
      Then I should see the "Test debrief - Fox Farrell" page
      And I complete the pass details
      And I complete the health declaration
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Passed"
      When I complete the office write up
      And I upload the test
      Then I should see the "Journal" page
      And the test result for "Dr Fox Farrell" is "1"


