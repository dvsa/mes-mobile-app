@catb @full_smoke @regression
Feature: A Driving Examiner Completes a Terminated Journey For Category B in Welsh

   Scenario: Examiner terminates test as candidate failed eye sight test

      Given I am logged in as "desexaminerw" and I have a test for "Mr Vance English"
      When I check candidate details for "Mr Vance English"
      And I start the test for "Mr Vance English"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Datganiad - Vance English" page
      And the candidate requests to receive results by post
      And I proceed to the car
      Then I should see the "Vance English" page
      And I fail the eye sight test
      Then I should see the Debrief page with outcome "Aflwyddiannus"
      And I see a "serious" fault for "Prawf Golwg"
      When I end the welsh debrief
      Then I am on the post debrief holding page
      When I continue to the non pass finalisation page
      Then I should see the "Finalise outcome - Vance English" page
      When I continue to the back to office page
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Unsuccessful"
      And the office activity code should be "3 - Fail due to eyesight"
      When I enter a candidate description
      And I complete the weather conditions
      And I enter a comment for "serious" fault "Eyesight Test"
      And I upload the test
      Then I should see the "Journal" page
      And the test result for "Mr Vance English" is "3"
