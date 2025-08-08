import { JSONSchemaType } from "ajv";
import { CreateUserResponse } from "../types/user";

export const createUserResponseSchema: JSONSchemaType<CreateUserResponse> = {
  "type": "object",
  "properties": {
    "email": {
      "type": "string"
    },
    "id": {
      "type": "string"
    },
    "createdAt": {
      "type": "string",
      "format": "date-time"
    }
  },
  "required": [
    "email",
    "id",
    "createdAt"
  ]
}