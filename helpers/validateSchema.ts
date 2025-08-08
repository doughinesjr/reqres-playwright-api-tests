import Ajv from "ajv"
import addFormats from 'ajv-formats';

export const validateSchema = (jsonObject, schema) =>  {
    const ajv = new Ajv();
    addFormats(ajv);

    const validate = ajv.compile(schema);
    const validSchema = validate(jsonObject);
    return validSchema;
}