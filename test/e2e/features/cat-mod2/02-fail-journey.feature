@catam2
Feature: A Driving Examiner Completes failed tests

  Scenario: Examiner completes failed test with 11 faults
    Given I am logged in as "desexamineram2" and I have a test for "Mr Richard Rhys"
    When I start the test for "Mr Richard Rhys"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Richard Rhys" page
    When the candidate requests to receive results by post
    And I proceed to the bike
    Then I should see the "Richard Rhys" page
    And I complete the waiting room to bike page with confirmed cat type "A2"
    Then I should see the "Test report - Richard Rhys" page
    And I add a "Safety" driver fault
    And the driver fault count is "1"
    When I add a "Control" driver fault
    And the driver fault count is "2"
    When I add a "Turning left" driver fault
    And the driver fault count is "3"
    When I add a "Timed" driver fault
    And the driver fault count is "4"
    When I add a "Precautions" driver fault
    And the driver fault count is "5"
    And I add a "Necessary" driver fault
    And the driver fault count is "6"
    And I add a "Turning right" driver fault
    And the driver fault count is "7"
    And I add a "Cutting corners" driver fault
    And the driver fault count is "8"
    And I add a "Overtaking" driver fault
    And the driver fault count is "9"
    And I add a "Meeting" driver fault
    And the driver fault count is "10"
    And I add a "Crossing" driver fault
    And the driver fault count is "11"
    When I complete the test with all legal requirements clicked
    And I continue to debrief
    Then I should see the Debrief page with outcome "Unsuccessful"
    And I see a "riding" fault for "Move Off - Safety"
    And I see a "riding" fault for "Move Off - Control"
    And I see a "riding" fault for "Junctions - Turning left"
    And I see a "riding" fault for "Signals - Timed"
    And I see a "riding" fault for "Precautions"
    And I see a "riding" fault for "Signals - Necessary"
    And I see a "riding" fault for "Junctions - Turing right"
    And I see a "riding" fault for "Junctions - Cutting corners"
    And I see a "riding" fault for "Judgement - Overtaking"
    And I see a "riding" fault for "Judgement - Meeting"
    And I see a "riding" fault for "Judgement - Crossing"
    Then I should see the "Debrief - Richard Rhys" page
    When I end the debrief
    Then I am on the post debrief holding page
    When I continue to the non pass finalisation page
    And I complete the fail details
    And I am on the back to office page
    And I continue to the office write up
    Then I should see the "Office" page
    And the office page test outcome is "Unsuccessful"
    When I complete the office write up
    And I see a "driving" fault for "Move Off - Safety"
    And I see a "driving" fault for "Move Off - Control"
    And I see a "driving" fault for "Junctions - Turning left"
    And I see a "driving" fault for "Signals - Timed"
    And I see a "driving" fault for "Precautions"
    And I see a "driving" fault for "Signals - Necessary"
    And I see a "driving" fault for "Junctions - Turing right"
    And I see a "driving" fault for "Junctions - Cutting corners"
    And I see a "driving" fault for "Judgement - Overtaking"
    And I see a "driving" fault for "Judgement - Meeting"
    And I see a "driving" fault for "Judgement - Crossing"
    And I upload the test
    Then I should see the "Journal" page
    And the test result for "Mr Richard Rhys" is "2"
