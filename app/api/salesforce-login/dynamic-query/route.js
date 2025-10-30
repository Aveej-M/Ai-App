import { NextResponse } from "next/server";

export async function POST(req) {
    function capitalizeFirstLetter(str) {
    // Check if the string is empty or not a string
    if (typeof str !== 'string' || str.length === 0) {
        return str; // Return the original value if not a valid string
    }

    // Capitalize the first character and concatenate it with the rest of the string
    return str.charAt(0).toUpperCase() + str.slice(1);
    }

// Example usage:
const originalString = "hello world";
const capitalizedString = capitalizeFirstLetter(originalString);
console.log(capitalizedString); // Output: Hello world
  try {
    const { token, selectedObject, fieldNames, fieldsForObject, objectValues } = await req.json();
    console.log("Dynamic Query Request:", { token, selectedObject, fieldNames, fieldsForObject, objectValues });

    if (!token || !selectedObject || !fieldNames || fieldNames.length === 0) {
      return NextResponse.json({ error: "Missing token, selectedObject, or fieldNames" }, { status: 400 });
    }

    // Normalize field names: remove spaces & lowercase
    const normalizedFields = objectValues.map(f =>
      f.replace(/\s+/g, "").toLowerCase()
    );
    const objectName = capitalizeFirstLetter(selectedObject);

    // Build query
    const query = `SELECT+${normalizedFields.join(",")}+FROM+${selectedObject}`;
    console.log(selectedObject, 'OBJECT name')

    const where = `https://orgfarm-7882ba5be5-dev-ed.develop.my.salesforce.com/services/data/v64.0/query/?q=SELECT+${normalizedFields}+FROM+${objectName}`;

    console.log("Final Query:", where);

    // Call Salesforce API
    const response = await fetch(where, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return NextResponse.json({
      message: `Records for ${selectedObject}`,
      records: data
    });

  } catch (error) {
    console.error("Dynamic Query Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
