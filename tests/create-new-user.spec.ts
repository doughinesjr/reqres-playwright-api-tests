import { test, expect } from "@playwright/test";
import { validateSchema } from "../helpers/validateSchema";

const schema = require("../schemas/createUserResponse.json");

test.describe('Create new user (POST)', () => {
  test("Should return acknowledgement successfully", async ({ request }) => {
    const emailAddress = "automationTest@gmail.com";
    const startTime = Date.now();

    const response = await request.post(`/api/users/`, {
      data: {
        'email': emailAddress
      }
    });
    
    const responseTime = Date.now() - startTime;
    const responseJson = await response.json();
    console.log(responseJson);
    console.log('Request URL:', response.url());

    expect(response.status()).toBe(201);
    expect(responseTime).toBeLessThanOrEqual(1000);
    expect(responseJson.email).toBe(emailAddress);
    validateSchema(responseJson, schema);
  });


  test("Should fail if no API key is given", async ({ request }) => {
    const emailAddress = "automationTest@gmail.com";

    const response = await request.post(`/api/users/`, {
      data: {
        'email': emailAddress
      },
      headers: {
        'x-api-key': 'badKey'
      }
    });

    expect(response.status()).toBe(403);
  });

  test.skip("Should fail if invalid JSON format", async ({ request }) => {});

  test.skip("Should fail if missing required fields", async ({ request }) => {});

  test.skip("Should pass if additional fields are passed", async ({ request }) => {});

  test.skip("Verify user has been created (via GET)", async ({ request }) => {
    const emailAddress = 'automationTest@gmail.com';
    const startTime = Date.now();

    const response = await request.post(`/api/users/`, {
      params: {
        'email': emailAddress
      }
    });
    const responseTime = Date.now() - startTime;
    debugger;
    const responseJson = await response.json();

    expect(response.status()).toBe(201);
    expect(responseTime).toBeLessThanOrEqual(1000);
    expect(responseJson.email).toBe(emailAddress);
    validateSchema(responseJson, schema);

    // Verify User has been created

    const responseFromGet = await request.get(`/api/users/`, {
      params: {
        'per_page': 100
      }
    });

    const responseJsonFromGet = await responseFromGet.json();
    const data = responseJsonFromGet.data;

    // Search for email address in results.
    let found = false;
    for (let i=0; i<data.length; i++) {
      if (data[i].email === emailAddress) {
        found = true;
      }
    }

    expect(found).toBe(true);

  });
});
