import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // 🔹 read JSON body
    const { token } = await req.json();
    console.log("Token", token)
    if (!token) {
      return NextResponse.json({ error: "Missing Salesforce token" }, { status: 400 });
    }

    let where = "https://orgfarm-7882ba5be5-dev-ed.develop.my.salesforce.com/services/data/v64.0/query/?q=SELECT+Id,Name,Email+FROM+Contact"
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
      message: "Contact records",
      records: data
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
  
 