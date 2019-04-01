Feature: Journal

   Scenario: Examiner views candidate details
    Given I am on the journal page as "mobexaminer1"
     When I view candidate details for "Mrs Jane Doe"
     Then I should see the "Test details - Mrs Jane Doe" page
      And I should see the "Driver number" contains "DOEXX625220A99HC"
      And I should see the "Slot type" contains "Standard Test"
      And I should see the "Additional information" contains "Previous cancellations"
      And I should see the "Additional information" contains "- DSA"
      And I should see the "Additional information" contains "- Act of nature"

   @smoke
   Scenario: Examiner is informed of a special needs slot
    Given I am on the journal page as "mobexaminer1"
     Then I have a special needs slot for "Miss Theresa Shaw"
     When I view candidate details for "Miss Theresa Shaw"
     Then I should see the "Slot type" contains "Special Needs Extra Time"
      And I should see the "Special requirements" contains "- Candidate has dyslexia"

   Scenario: Examiner is informed of a welsh test
    Given I am on the journal page as "mobexaminer1"
     Then I have a welsh slot for "Captain Montague Smythe"

   Scenario: Examiner is informed that the test is Extended Test
    Given I am on the journal page as "mobexaminer1"
     When I view candidate details for "Mr Ali Campbell"
     Then I should see the "Slot type" contains "Extended Test"

   Scenario: Examiner is informed that the test is Extended Test Special Needs
    Given I am on the journal page as "mobexaminer1"
     When I view candidate details for "Mr James Brown"
     Then I should see the "Slot type" contains "Extended Test Special Needs"
   
   Scenario: Examiner is informed that the test is Single Slot (Special Needs)
    Given I am on the journal page as "mobexaminer1"
     When I navigate to next day
      And I view candidate details for "Mr Bill Pots"
     Then I should see the "Slot type" contains "Single Slot (Special Needs)"

   Scenario: Examiner is informed that the test is Single Slot (Special Needs)
    Given I am on the journal page as "mobexaminer1"
     When I navigate to next day
      And I view candidate details for "Mr Buxton Phil"
     Then I should see the "Slot type" contains "Single Slot (Special Needs)"

   Scenario: Examiner goes to the waiting room to meet the candidate
    Given I am on the journal page as "mobexaminer1"
     When I refresh the journal
      And I start the test for "Captain Montague Smythe"
     Then I should see the "Declaration - Montague Smythe" page

  @smoke
  Scenario: Examiner cannot start a test that isn't today
    Given I am on the journal page as "mobexaminer1"
    When I navigate to next day
     And I start the test for "Miss Alice Cooper"
    Then I should see the "Journal" page