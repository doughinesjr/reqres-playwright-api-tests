import { test, expect } from "@playwright/test";
import { validateSchema } from "../helpers/validateSchema";

const schema = require("../schemas/createUserResponse.json");

test.describe('Update user (PUT)', () => {
  test("Should return acknowledgement successfully", async ({ request }) => {
    const emailAddress = "automationTest@gmail.com";
    const firstName = "Automation";
    const lastName = "Test";

    const startTime = Date.now();

    const response = await request.put(`/api/users/3`, {
      data: {
        'email': emailAddress,
        'first_name': firstName,
        'last_name': lastName
      }
    });
    
    const responseTime = Date.now() - startTime;

    const responseJson = await response.json();

    expect(response.status()).toBe(200);
    expect(responseTime).toBeLessThanOrEqual(1000);
    expect(responseJson.email).toBe(emailAddress);
    expect(responseJson.first_name).toBe(firstName);
    expect(responseJson.last_name).toBe(lastName);
    validateSchema(responseJson, schema);
  });

  test("Should fail if user ID doesn't exist", async ({ request }) => {

    const response = await request.put(`/api/users/58585858`, {
      data: {
        'email': 'test@test.com',
        'first_name': 'newFirstName',
      }
    });

    expect(response.status()).toBe(404);
  });

  test.skip("Should fail if invalid JSON format", async ({ request }) => {});

  test("Should fail if missing required fields", async ({ request }) => {
    const response = await request.put(`/api/users/3`, {
      data: {}
    });

    expect(response.status()).toBe(400);
  });

  test("Should pass if additional fields are passed", async ({ request }) => {
    const response = await request.put(`/api/users/3`, {
      data: {
        'email': 'test@test.com',
        'first_name': 'newFirstName',
        'additional_field': 'additional field 1'
      }
    });

    expect(response.status()).toBe(200);
  });

  test("Verify user has been created (via GET)", async ({ request }) => {
    const emailAddress = 'automationTest@gmail.com';
    const startTime = Date.now();

    const response = await request.post(`/api/users/`, {
      data: {
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

    // Verify User has been created via GET

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
