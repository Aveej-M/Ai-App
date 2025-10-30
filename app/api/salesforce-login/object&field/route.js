import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // 🔹 read JSON body
    const { token, objectName } = await req.json();
    console.log("Token", token)

    if (!token) {
      return NextResponse.json({ error: "Missing Salesforce token" }, { status: 400 });
    }
    
       

    let where = `https://orgfarm-7882ba5be5-dev-ed.develop.my.salesforce.com/services/apexrest/ObjectAndFields/`
    if (objectName) {
      const cleanName = objectName.replace(/\s+/g, "");
      where += cleanName;  
    }
    console.log(where, 'Link API')
    // 🔹 make Salesforce query
    const response = await fetch(
      where,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return NextResponse.json({
      message: objectName ? `Reocrds for ${objectName}` : "Object and Field records",
      records: data
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
  
 