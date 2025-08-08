import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';

export function validateSchema<T>(
    jsonObject: Record<string, unknown>,
    schema: JSONSchemaType<T>
) {
    const ajv = new Ajv();
    addFormats(ajv);

    const validate = ajv.compile(schema);
    const validSchema = validate(jsonObject);
    return validSchema as boolean;
}
