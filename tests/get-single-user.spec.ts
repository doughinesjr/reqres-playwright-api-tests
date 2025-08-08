import { test, expect } from "@playwright/test";
import { validateSchema } from "../helpers/validateSchema";

const schema = require("../schemas/userSchemaSingle.json");

test.describe('Get single user (GET)', () => {
  test("Should return successfully", async ({ request }) => {
    const startTime = Date.now();
    const id = 3;

    const userList = await request.get(`/api/users/${id}`);
    const responseTime = Date.now() - startTime;
    
    const responseJson = await userList.json();

    expect(userList.status()).toBe(200);
    expect(responseTime).toBeLessThanOrEqual(1000);
    expect(responseJson.data.id).toBe(id);
    expect(responseJson.data.first_name).toBe("Emma");
    expect(responseJson.data.last_name).toBe("Wong");
    expect(responseJson.data.avatar).toBe(`https://reqres.in/img/faces/${id}-image.jpg`);
    validateSchema(responseJson, schema);
  });

 test("Should fail if user ID is not found", async ({ request }) => {
    const startTime = Date.now();
    const id = 3;

    const userList = await request.get('/api/users/33848483284');

    expect(userList.status()).toBe(404);
  });

  test.skip("Should fail if user ID is not in the correct format", async ({ request }) => {});
  
});
