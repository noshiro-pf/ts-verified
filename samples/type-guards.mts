import { isNonNullObject, isRecord, hasKey } from 'ts-verified';

function processData(data: unknown) {
    if (isRecord(data)) {
        // data is now UnknownRecord (= Readonly<Record<string, unknown>>)
        if (
            hasKey(data, 'name') &&
            // data is now ReadonlyRecord<"name", unknown> & UnknownRecord
            typeof data.name === 'string'
        ) {
            console.log(`Hello, ${data.name}!`);
        }
    }
}

// Non-null object checking
declare const value: unknown;
if (isNonNullObject(value)) {
    // value is guaranteed to be a non-null object
    console.log(Object.keys(value));
}