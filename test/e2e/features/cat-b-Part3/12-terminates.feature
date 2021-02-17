@catb @full_smoke @regression
Feature: A Driving Examiner Completes Multiple Terminated Journeys For Category B

   @smoke
   Scenario: Examiner terminates test as candidate failed to attend (No mandatory office fields)

      Given I am logged in as "mobexaminer1" and I have a test for "Mr Potts Bill"
      When I start the test for "Mr Potts Bill"
      Then I should see the "Declaration - Potts Bill" page
      And the waiting room candidate name should be "Mr Potts Bill"
      And the waiting room candidate driver number should be "COOPE 015220 A99HC"
      And I terminate the test
      Then I should see the Debrief page with outcome "Terminated"
      When I end the debrief
      Then I am on the post debrief holding page
      When I continue to the non pass finalisation page
      Then I should see the "Finalise outcome - Potts Bill" page
      When I select activity code "51 - Candidate failed to attend at test centre"
      And I click continue to proceed to the back to office page
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the office page test outcome is "Terminated"
      And I upload the test
      Then I should see the "Journal" page
      And the test result for "Mr Potts Bill" is "51"

   Scenario: Examiner terminates test as candidate failed to present ID (Only physical description mandatory)
      Given I am logged in as "mobexaminer1" and I have a test for "Mr Base Wolf"
      When I check candidate details for "Mr Base Wolf"
      And I start the test for "Mr Base Wolf"
      Then I should see the "Declaration - Base Wolf" page
      And I terminate the test
      Then I should see the Debrief page with outcome "Terminated"
      When I end the debrief
      Then I am on the post debrief holding page
      When I continue to the non pass finalisation page
      Then I should see the "Finalise outcome - Base Wolf" page
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
      And the test result for "Mr Base Wolf" is "20"

   Scenario: Examiner terminates test as candidate failed eye sight test
      Given I am logged in as "mobexaminer1" and I have a test for "Mrs Doe Jane"
      When I check candidate details for "Mrs Doe Jane"
      And I start the test for "Mrs Doe Jane"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - Doe Jane" page
      And the candidate requests to receive results by post
      And I proceed to the car
      Then I should see the "Doe Jane" page
      And I fail the eye sight test
      Then I should see the Debrief page with outcome "Unsuccessful"
      And I should see the "Debrief - Doe Jane" page
      When I end the debrief
      Then I am on the post debrief holding page
      When I continue to the non pass finalisation page
      Then I should see the "Finalise outcome - Doe Jane" page
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
      And the test result for "Mrs Doe Jane" is "3"

   Scenario: Examiner terminates the test in the interests of public safety
      Given I am logged in as "mobexaminer1" and I have a test for "Mr Corvo Attano"
      When I check candidate details for "Mr Corvo Attano"
      And I start the test for "Mr Corvo Attano"
      And the candidate completes the declaration page
      And the candidate confirms their declaration
      Then I should see the "Declaration - Corvo Attano" page
      And the candidate enters a new email address
      And I proceed to the car
      Then I should see the "Corvo Attano" page
      And I complete the waiting room to car page
      Then I should see the "Test report - Corvo Attano" page
      When I add a "Use of speed" dangerous fault
      And I end and terminate the test
      Then I should see the Debrief page with outcome "Terminated"
      And I see a "dangerous" fault for "Use of speed"
      When I end the debrief
      Then I am on the post debrief holding page
      When I continue to the non pass finalisation page
      Then I should see the "Finalise outcome - Corvo Attano" page
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
      And the test result for "Mr Corvo Attano" is "4"
