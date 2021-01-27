@catm2 @full_smoke @regression

  Feature: Driver Examiner complete the pass journey for Mod2

      Scenario: Driving Examiner completes a passed test for category A with no faults
        Given I am logged in as "desexamineram2" and I have a test for "Dr Fox Farrell"
        When I start the test for "Dr Fox Farrell"
        And the candidate completes the declaration page
        And the candidate confirms their declaration
        Then I should see the "Declaration - Fox Farrell" page
        When the candidate requests to receive results by post
        And I proceed to the bike
        Then I should see the "Fox Farrell" page
        And I select the test category "A"
        And I select the Transmission Type "Manual"
        And I select the Eyesight test result "Pass"
        And I enter the vehicle registration number "AB12CDE"
        And I select the "Safety and Balance Questions - Fox Farrell" page
          |M4 - Lights|M11 - Engine Cut Out Switch|B3 - Balance with passenger|
          |true       |true                       |true                     |
        Then I continue to test report
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
      Given I am logged in as "desexamineram2" and I have a test for "Dr Fox Farrell"
      When I start the test for "Dr Fox Farrell"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - Fox Farrell" page
      When the candidate requests to receive results by post
      And I proceed to the bike
      Then I should see the "Fox Farrell" page
      And I select the test category "AM"
      And I select the Transmission Type "Manual"
      And I select the Eyesight test result "Pass"
      And I enter the vehicle registration number "AB12CDE"
      And I select the "Safety and Balance Questions - Fox Farrell" page
        |M4 - Lights|M11 - Engine Cut Out Switch|B3 - Balance with passenger|
        |false      |false                      |false                      |
      Then I continue to test report
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


