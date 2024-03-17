Pre-requisite for test -
 Node and Node js are installed and available
 Preferably Nodejs version of 18 and above, at the moment I used Node - v20.11.1

- git clone https://github.com/arunb0405/web-api-test.git
- cd web-api-test
- npm install

To run browser based test - 
- npm test (by default runs the UI test in headless chrome)

To run API, 1st run the Post API test, then finally delete API in below order -

- npm run postApiTest (inserts pet in the Json file)
- npm run getApiTest  (get pet by ID for API)
- npm run putApiTest  (updates pet by ID for API)
- npm run delApiTest  (deletes pet by ID in the Json file)

Video recordings of Playwright tests are available in videos folder.
Cucumber Test results in test-results folder.

(Please ignore browser pop-up for API test, as this is because of beforeAll cucumber hooks, I agree APi need to be another repo, but due to time constraints, i ended up adding in same repo but in a different folder.)

