@catb @regression
Feature: A Driving Examiner Completes Multiple Terminated Journeys For Category B

   @smoke
   Scenario: Examiner terminates test as candidate failed to attend (No mandatory office fields)
      Given I am logged in as "mobexaminer1" and I have a test for "Miss Theresa Shaw"
      When I check candidate details for "Miss Theresa Shaw"
      And I start the test for "Miss Theresa Shaw"
      Then I should see the "Declaration - Theresa Shaw" page
      And the waiting room candidate name should be "Miss Theresa Shaw"
      And the waiting room candidate driver number should be "SHAWX 744220 A99HC"
      And I terminate the test
      Then I should see the Debrief page with outcome "Terminated"
      When I end the debrief
      Then I am on the post debrief holding page
      When I continue to the non pass finalisation page
      Then I should see the "Finalise outcome - Theresa Shaw" page
      When I select activity code "51 - Candidate failed to attend at test centre"
      And I click continue to proceed to the back to office page
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Terminated"
      And I upload the test
      Then I should see the "Journal" page
      And the test result for "Miss Theresa Shaw" is "51"

   Scenario: Examiner terminates test as candidate failed to present ID (Only physical description mandatory)
      Given I am logged in as "mobexaminer1" and I have a test for "Mr Ali Campbell"
      When I check candidate details for "Mr Ali Campbell"
      And I start the test for "Mr Ali Campbell"
      Then I should see the "Declaration - Ali Campbell" page
      And I terminate the test
      Then I should see the Debrief page with outcome "Terminated"
      When I end the debrief
      Then I am on the post debrief holding page
      When I continue to the non pass finalisation page
      Then I should see the "Finalise outcome - Ali Campbell" page
      When I select activity code "20 - Documents not produced"
      And I click continue to proceed to the back to office page
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Terminated"
      And I try to upload the test
      Then validation item "office-candidate-description-validation-text" should be "Describe the candidate"
      And validation item "office-candidate-description-validation-text" should be visible
      When I enter a candidate description
      And I upload the test
      Then I should see the "Journal" page
      And the test result for "Mr Ali Campbell" is "20"

   Scenario: Examiner terminates test as candidate failed eye sight test
      Given I am logged in as "mobexaminer1" and I have a test for "Mr James Brown"
      When I check candidate details for "Mr James Brown"
      And I start the test for "Mr James Brown"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - James Brown" page
      And the candidate requests to receive results by post
      And I proceed to the car
      Then I should see the "James Brown" page
      And I fail the eye sight test
      Then I should see the Debrief page with outcome "Unsuccessful"
      When I end the debrief
      Then I am on the post debrief holding page
      When I continue to the non pass finalisation page
      Then I should see the "Finalise outcome - James Brown" page
      And the D255 Radio is pre-selected to yes
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
      And the test result for "Mr James Brown" is "3"

   Scenario: Examiner terminates the test in the interests of public safety
      Given I am logged in as "mobexaminer1" and I have a test for "Mr James Brown"
      When I check candidate details for "Mr James Brown"
      And I start the test for "Mr James Brown"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - James Brown" page
      And the candidate enters a new email address
      And I proceed to the car
      Then I should see the "James Brown" page
      And I complete the waiting room to car page
      Then I should see the "Test report - James Brown" page
      When I add a "Use of speed" dangerous fault
      And I end and terminate the test
      Then I should see the Debrief page with outcome "Terminated"
      And I see a "dangerous" fault for "Use of speed"
      When I end the debrief
      Then I am on the post debrief holding page
      When I continue to the non pass finalisation page
      Then I should see the "Finalise outcome - James Brown" page
      When I select activity code "4 - Fail in the interests of public safety"
      And I continue to the back to office page
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      Then the office page test outcome is "Unsuccessful"
      When I complete the office write up with Not applicable to independent driving and show me question
      And I enter a comment for "dangerous" fault "Use of speed"
      And I upload the test
      Then I should see the "Journal" page
      And the test result for "Mr James Brown" is "4"