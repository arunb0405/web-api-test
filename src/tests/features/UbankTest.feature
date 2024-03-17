Feature: Customer logins to Bank

  @ubankUiTest
  Scenario Outline: Customer login to bank with in-valid credentials
    Given the customer navigates to "<website>"
    Then the customer clicks on Logon button
    When the customer enters "<client_id>"
    When the customer enters password "<password>"
    When the customer clicks on the Logon to netbank button
    Then an error message is displayed

    Examples: 
      | website                  | client_id | password   |
      | https://commbank.com.au/ |  88088018 | JohnDoe143 |

  @postApiTest
  Scenario Outline: Create a new pet and verify its existence
    Given a pet is created with the details "<petName>" "<petCategory>" and "<petStatus>"
    Then the post API response status code should be 200
    And validate the created pet API response of "<petName>" "<petCategory>" and "<petStatus>"

    Examples: 
      | petName | petCategory | petStatus |
      | koala   | Animal      | available |
      # | Cockatoos | Bird        | available |
  # Insert Pet data (call @postApiTest) before the GET test.  

  @getApiTest
  Scenario: Retrieve the Pet details with Get API
    Given there exists a pet in the system
    When I retrieve the pet details using a GET API request
    Then the response status code should be 200
    And the response body should contain the pet details

  @putApiTest
  Scenario Outline: Delete the Pet details with delete API
    Given I update the pet details using PUT API request "<petName>" "<petCategory>" and "<petStatus>"
    Then there exists a pet in the system
    Then the response status code of PUT API should be 200

    Examples: 
      | petName       | petCategory    | petStatus |
      | updateToKoala | updateToAnimal | available |

  # Insert Pet data (call @postApiTest) before the GET test.
  @deleteApiTest
  Scenario: Delete the Pet details with delete API
    Given there exists a pet in the system
    When I delete the pet details using a DELETE API request
    Then the response status code of delete API should be 200
    And the response body should contain the deleted pet details
