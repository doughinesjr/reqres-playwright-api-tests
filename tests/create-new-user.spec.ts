import { test, expect } from '@playwright/test';
import { validateSchema } from '../helpers/validateSchema';
import { USER_MANAGEMENT_PATH } from '../helpers/apiLocations';
import { createUserResponseSchema } from '../schemas/createUserResponse';

test.describe('Create new user (POST)', () => {
    test('Should return acknowledgement successfully', async ({ request }) => {
        const emailAddress = 'automationTest@gmail.com';
        const startTime = Date.now();

        const response = await request.post(USER_MANAGEMENT_PATH, {
            data: {
                email: emailAddress,
            },
        });

        const responseTime = Date.now() - startTime;
        const responseJson = await response.json();

        expect(response.status()).toBe(201);
        expect(responseTime).toBeLessThanOrEqual(1000);
        expect(responseJson.email).toBe(emailAddress);
        validateSchema(responseJson, createUserResponseSchema);
    });

    test('Should fail if no API key is given', async ({ request }) => {
        const emailAddress = 'automationTest@gmail.com';

        const response = await request.post(USER_MANAGEMENT_PATH, {
            data: {
                email: emailAddress,
            },
            headers: {
                'x-api-key': 'badKey',
            },
        });

        expect(response.status()).toBe(403);
    });

    test('Should fail if invalid JSON format', async ({ request }) => {
        const response = await request.post(USER_MANAGEMENT_PATH, {
            data: 'kdsljflsdaklfjksaf',
        });

        expect(response.status()).toBe(400);
    });

    test.skip('Should fail if missing required fields', async ({
        request,
    }) => {});

    test('Should pass if additional fields are passed', async ({ request }) => {
        const emailAddress = 'automationTest@gmail.com';

        const response = await request.post(USER_MANAGEMENT_PATH, {
            data: {
                email: emailAddress,
                additionalField1: 'additional value 1',
            },
        });

        const responseJson = await response.json();

        expect(response.status()).toBe(201);
        expect(responseJson.email).toBe(emailAddress);
        validateSchema(responseJson, createUserResponseSchema);
    });

    test('Verify user has been created (via GET)', async ({ request }) => {
        const emailAddress = 'automationTest@gmail.com';
        const startTime = Date.now();

        const response = await request.post(USER_MANAGEMENT_PATH, {
            data: {
                email: emailAddress,
            },
        });
        const responseTime = Date.now() - startTime;
        const responseJson = await response.json();

        expect(response.status()).toBe(201);
        expect(responseTime).toBeLessThanOrEqual(1000);
        expect(responseJson.email).toBe(emailAddress);
        validateSchema(responseJson, createUserResponseSchema);

        // Verify User has been created (via GET)

        const responseFromGet = await request.get(USER_MANAGEMENT_PATH, {
            params: {
                per_page: 100,
            },
        });

        const responseJsonFromGet = await responseFromGet.json();
        const data = responseJsonFromGet.data;

        // Search for email address in results.
        let found = false;
        for (let i = 0; i < data.length; i++) {
            if (data[i].email === emailAddress) {
                found = true;
            }
        }

        expect(found).toBe(true);
    });
});
