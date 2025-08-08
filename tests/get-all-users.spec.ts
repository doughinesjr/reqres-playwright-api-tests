import { test, expect } from "@playwright/test";
import { validateSchema } from "../helpers/validateSchema";

const schema = require("../schemas/userSchemaFull.json");

test.describe('Get all users (GET)', () => {
  test("Should return successfully", async ({ request }) => {
    const startTime = Date.now();

    const userList = await request.get("/api/users");
    const responseTime = Date.now() - startTime;

    expect(userList.status()).toBe(200);

    validateSchema(await userList.json(), schema);

    expect(responseTime).toBeLessThanOrEqual(1000);
  });

  test("Should return successfully if page number is given", async ({ request }) => {
    const startTime = Date.now();
    const userList = await request.get("/api/users", {
      params: {
        'page':2 
      }
    });
    const responseTime = Date.now() - startTime;
    const responseJson = await userList.json();

    expect(userList.status()).toBe(200);
    expect(responseJson.page).toBe(2);

    validateSchema(await responseJson, schema);
    expect(responseTime).toBeLessThanOrEqual(1000);
  });

  test("Should not return any users if page number is too large", async ({ request }) => {
    const userList = await request.get("/api/users", {
      params: {
        'page':5 
      }
    });
    const responseJson = await userList.json();
    
    expect(userList.status()).toBe(200);

    expect(responseJson.data).toEqual([]);

    validateSchema(await responseJson, schema);
  });

  test("Should return first page if page value is in the wrong format", async ({ request }) => {
    const userList = await request.get("/api/users", {
      params: {
        'page':'abc'
      }
    });
    const responseJson = await userList.json();
    
    expect(userList.status()).toBe(200);

    expect(responseJson.page).toBe(1);
    validateSchema(await responseJson, schema);
  });

  test("Should return the specified amount of results per page", async ({ request }) => {
    const userList = await request.get("/api/users", {
      params: {
        'per_page': 4
      }
    });
    const responseJson = await userList.json();
    
    expect(userList.status()).toBe(200);

    expect(responseJson.per_page).toBe(4);

    expect(responseJson.data.length).toBe(4);
    validateSchema(await responseJson, schema);
  });

  test("Should return first page if per page value is in the wrong format", async ({ request }) => {
     const userList = await request.get("/api/users", {
      params: {
        'per_page': 'fasfjlks'
      }
    });
    const responseJson = await userList.json();
    
    expect(userList.status()).toBe(200);
    expect(responseJson.page).toBe(1);
    validateSchema(await responseJson, schema);
  });

});
