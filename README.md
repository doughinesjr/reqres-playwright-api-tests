# Reqres Playwright API Tests

This repository contains API tests for the [Reqres](https://reqres.in/) public API using [Playwright](https://playwright.dev/docs/test-api-testing).

## Table of Contents

- [Installation](#installation)
- [Running Tests via Github](#running-tests-via-github)
- [Running Tests Locally](#running-tests-locally)
- [Viewing Test Reports](#viewing-test-reports)
- [Troubleshooting](#troubleshooting)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/doughinesjr/reqres-playwright-api-tests.git
   cd reqres-playwright-api-tests
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following line, including your ReqRes API Key. If you don't have a ReqRes API Key, you can get one from ReqRes [here](https://reqres.in/signup).
   ```
   API_KEY=<reqres_api_key_here>
   ```

---

## Running Tests via Github

To run all tests via Github Actions:

1. Click Actions tab at the top of Github while in this Github repository.

2. Click "Playwright Tests" in the "Actions" section on the left.

3. Click dropdown for "Run workflow" in the workflow runs section.

4. Click green "Run workflow" button.

The run should show on the page within 10-20 seconds. Click [here](#viewing-test-reports) to learn how to open reports through Github.

---
## Running Tests Locally

To run all tests:
```bash
npm test
```

After running tests in the command line, you will see a report in the command line. You can also view an HTML report using the following command. This will serve an HTML report on your local host, and load the report in your web browser. You'll need to Press Ctrl+C on the command line to continue using your command line.
```bash
npm run report
```

---

## Viewing Test Reports

After pushing your changes, GitHub Actions will automatically run the tests.

To view the test report:

1. Go to the **Actions** tab in your GitHub repository.
2. Click on the most recent workflow run.
3. In the "Artifacts" section, under the job steps, find the artifact named **playwright-report**.
4. Download and unzip the artifact (Using download button to the right).
5. Open the `index.html` file inside the `playwright-report` folder in your browser.