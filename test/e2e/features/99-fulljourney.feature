Feature: Full end to end journey

   Scenario: Examiner completes a passed test with no faults
      Given I am logged in as "mobexaminer1" and I have a test for "Miss Florence Pearson"
      When I start the test for "Miss Florence Pearson"
      And the candidate enters a new email address
      And the candidate confirms their communication preference
      Then I should see the "Declaration - Florence Pearson" page
      And the candidate completes the declaration page
      And I proceed to the car
      Then I should see the "Florence Pearson" page
      And I complete the waiting room to car page
      Then I should see the "Test report - Florence Pearson" page
      And I complete the test
      Then I should see the Debrief page with outcome "Passed"
      When I end the debrief
      Then I should see the "Test debrief - Florence Pearson" page
      And I complete the pass details
      And I complete the health declaration
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And I complete the office write up
      And I upload the test
      Then I should see the "Journal" page

   Scenario: Examiner completes a failed test with various faults
      Given I am logged in as "mobexaminer1" and I have a test for "Mrs Jane Doe"
      When I start the test for "Mrs Jane Doe"
      And the candidate enters a new email address
      And the candidate confirms their communication preference
      Then I should see the "Declaration - Jane Doe" page
      And the candidate completes the declaration page
      And I proceed to the car
      Then I should see the "Jane Doe" page
      And I complete the waiting room to car page
      Then I should see the "Test report - Jane Doe" page
      When I add a "Accelerator" driver fault
      Then the driver fault count is "1"
      And the competency "Accelerator" driver fault count is "1"
      When I add a "Safety" driver fault
      Then the driver fault count is "2"
      And the competency "Safety" driver fault count is "1"
      When I add a "Safety" driver fault
      Then the driver fault count is "3"
      And the competency "Safety" driver fault count is "2"
      When I add a "Lane discipline" driver fault
      Then the driver fault count is "4"
      And the competency "Lane discipline" driver fault count is "1"
      And I add a "Accelerator" serious fault
      And I add a "Use of speed" dangerous fault
      And I complete the test
      Then I should see the Debrief page with outcome "Unsuccessful"
      When I end the debrief
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And I complete the office write up
      And I enter a comment for "dangerous" fault "Use of speed"
      And I enter a comment for "serious" fault "Controls - Accelerator"
      And I upload the test
      Then I should see the "Journal" page

   Scenario: Examiner terminates test as candidate failed to attend (No mandatory office fields)
      Given I am logged in as "mobexaminer1" and I have a test for "Miss Theresa Shaw"
      When I start the test for "Miss Theresa Shaw"
      Then I should see the "Declaration - Theresa Shaw" page
      And I terminate the test
      Then I should see the Debrief page with outcome "Terminated"
      When I end the debrief
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      When I select activity code "51 - Candidate failed to attend at test centre"
      And I upload the test
      Then I should see the "Journal" page

   Scenario: Examiner terminates test as candidate failed to present ID (Only physical description mandatory)
      Given I am logged in as "mobexaminer1" and I have a test for "Mr Ali Campbell"
      When I start the test for "Mr Ali Campbell"
      And the candidate requests to receive results by post
      And the candidate confirms their communication preference
      Then I should see the "Declaration - Ali Campbell" page
      And I terminate the test
      Then I should see the Debrief page with outcome "Terminated"
      When I end the debrief
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      When I select activity code "20 - Documents not produced"
      And I try to upload the test
      Then validation item "office-candidate-description-validation-text" should be "Describe the candidate"
      And validation item "office-candidate-description-validation-text" should be visible
      When I enter a candidate description
      And I upload the test
      Then I should see the "Journal" page

   Scenario: Examiner terminates test as candidate failed eye sight test
      Given I am logged in as "mobexaminer1" and I have a test for "Mr James Brown"
      When I start the test for "Mr James Brown"
      And the candidate requests to receive results by calling the support centre
      And the candidate confirms their communication preference
      Then I should see the "Declaration - James Brown" page
      And the candidate completes the declaration page
      And I proceed to the car
      Then I should see the "James Brown" page
      And I fail the eye sight test
      Then I should see the Debrief page with outcome "Unsuccessful"
      When I end the debrief
      Then I am on the back to office page
      And I continue to the office write up
      Then I should see the "Office" page
      And the activity code should be "3 - Fail due to eyesight"
      When I enter a candidate description
      And I complete the debrief witnessed
      And I complete the weather conditions
      And I upload the test
      Then I should see the "Journal" page