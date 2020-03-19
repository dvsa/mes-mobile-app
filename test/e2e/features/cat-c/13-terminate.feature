@catc @full_smoke @regression
Feature: Driving Examiner Completes Terminated Tests for Category C

  Scenario: Examiner terminates test as candidate failed to attend (No mandatory office fields)
    Given I am logged in as "mobexaminer5" and I have a test for "Mr Right Ford"
    When I check candidate details for "Mr Right Ford"
    And I start the test for "Mr Right Ford"
    Then I should see the "Declaration - Right Ford" page
    And the waiting room candidate name should be "Mr Right Ford"
    And the waiting room candidate driver number should be "CATCX 123456 78901"
    And I terminate the test
    Then I should see the Debrief page with outcome "Terminated"
    When I end the debrief
    Then I am on the post debrief holding page
    When I continue to the non pass finalisation page
    Then I should see the "Finalise outcome C - Right Ford" page
    When I select activity code "51 - Candidate failed to attend at test centre"
#    And I click continue to proceed to the back to office page
#    Then I am on the back to office page
#    And I continue to the office write up
#    Then I should see the "Office" page
#    And the office page test outcome is "Terminated"
#    And I upload the test
#    Then I should see the "Journal" page
#    And the test result for "Mr Right Ford" is "51"
