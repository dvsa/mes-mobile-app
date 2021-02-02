@catbe @full_smoke @regression
Feature: Autosave end to end terminate journey for Category B+E

   Scenario: Examiner terminates test as candidate failed eye sight test and completes write-up later using auto save

      Given I am logged in as "mobexaminer2" and I have a test for "Mr Cucumber Water"
      When I check candidate details for "Mr Cucumber Water"
      And I start the test for "Mr Cucumber Water"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - Cucumber Water" page
      And the candidate requests to receive results by post
      And I proceed to the car
      Then I should see the "Cucumber Water" page
      And I fail the eye sight test
      Then I should see the Debrief page with outcome "Unsuccessful"
      When I end the debrief
      Then I am on the post debrief holding page
      When I continue to the non pass finalisation page
      Then I should see the "Finalise outcome BE - Cucumber Water" page
      And the D255 Radio is pre-selected to yes
      When I continue to the back to office page
      Then I return to the Journal Page
      And I should see the "Journal" page
      When I click the back button
      Then I should see the "My dashboard" page
      When I click search completed tests
      When I search for a completed test with the application reference of "11654328011"
      And the search result is clicked
      Then I should see the "Test information" page
      And the test result outcome is "Unsuccessful"
      And the test result has the following data present
         | label                             | value                       |
         | Application reference             | 11654328011                 |
         | Test category                     | B+E                         |
         | Slot type                         | Special Needs Extra Time    |
         | ETA                               | None                        |
         | Route number                      | None                        |
         | Physical description of candidate | None                        |
         | Weather conditions                | None                        |
      When I click the close button
      Then I should see the "Search submitted test" page
      When I click the back button on the search submitted test page
      Then I should see the "My dashboard" page
      When I click go to my Journal
      And I should see the "Journal" page
      Then I continue the write up for "Mr Cucumber Water"
      Then I should see the "Office" page
      And the office page test outcome is "Unsuccessful"
      And the office activity code should be "3 - Fail due to eyesight"
      When I enter a candidate description
      And I complete the weather conditions
      And I enter a comment for "serious" fault "Eyesight Test"
      And I upload the test
      Then I should see the "Journal" page
      And the test result for "Mr Cucumber Water" is "3"
