@catc		
 Feature: Full Welsh end to end journey		

      @full_smoke		
     Scenario: Examiner completes a passed welsh test with no faults		
         Given I am logged in as "desexaminerw" and I have a test for "Miss Luella Lowery"		
         When I start the test for "Miss Luella Lowery"		
         And the candidate completes the declaration page		
         And the candidate confirms their declaration		
         Then I should see the "Datganiad - Luella Lowery" page		
         And the candidate enters a new email address		
         And I proceed to the car		
         Then I should see the "Luella Lowery" page		
         And I complete the waiting room to car page		
         Then I should see the "Test report - Luella Lowery" page		
         And I complete the test		
         And I continue to debrief		
         Then I should see the Debrief page with outcome "Wedi pasio"		
         When I end the welsh debrief		
         Then I should see the "Test debrief - Luella Lowery" page		
         And I complete the pass details		
         Then I should see the "Ôl-drafodaeth y prawf - Luella Lowery" page		
         And I complete the health declaration		
         Then I am on the back to office page		
         And I continue to the office write up		
         Then I should see the "Office" page		
         And the office page test outcome is "Passed"		
         When I complete the office write up		
         And I upload the test		
         Then I should see the "Journal" page		
         And the test result for "Miss Luella Lowery" is "1" 