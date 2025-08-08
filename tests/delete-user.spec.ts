import { test, expect } from "@playwright/test";

test.describe('Delete user (DELETE)', () => {
  test("Should return acknowledgement successfully", async ({ request }) => {
    const startTime = Date.now();

    const response = await request.delete(`/api/users/3`);
    
    const responseTime = Date.now() - startTime;

    expect(response.status()).toBe(204);
    expect(responseTime).toBeLessThanOrEqual(1000);
  });

  test.skip("Should fail if user ID doesn't exist", async ({ request }) => {

    const response = await request.delete(`/api/users/58585858`);

    expect(response.status()).toBe(404);
  });

  test.skip("Should fail if deleting user twice", async ({ request }) => {

    const id = 4;
    const response = await request.delete(`/api/users/${4}`);

    expect(response.status()).toBe(204);

    const responseTwo = await request.delete(`/api/users/${4}`);

    expect(responseTwo.status()).toBe(404);

  });

  test.skip("Should fail if invalid JSON format", async ({ request }) => {});

  test.skip("Should fail if missing required fields", async ({ request }) => {});

  test.skip("Verify user has been deleted (via GET)", async ({ request }) => {
    const emailAddress = 'automationTest@gmail.com';
    const startTime = Date.now();
    const id = 3;

    const response = await request.delete(`/api/users/${id}`);

    expect(response.status()).toBe(204);

    // Verify User has been deleted

    const responseFromGet = await request.get(`/api/users/`, {
      params: {
        'per_page': 100
      }
    });

    const responseJsonFromGet = await responseFromGet.json();
    const data = responseJsonFromGet.data;

    // Verify email address is not in list of results.
    let found = false;
    for (let i=0; i<data.length; i++) {
      if (data[i].id === id) {
        found = true;
      }
    }

    expect(found).toBe(false);

  });
});
