import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = await fetch("https://login.salesforce.com/services/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "password", // or "authorization_code"
        client_id: "3MVG9dAEux2v1sLtlNZ_Qpf9pTeCuPq6qaPl6dvdo_mjkrtiQ6hQn2nbQZFlfZnu7gdQnrK19gKI5nBcUIQbJ",
        client_secret: "CB9FD6B3C18444EE2B12901CA4C333A2B1CFB9DD7A86828D0E10D638746A29C2",
        username: "jashwanthvm3400@agentforce.com",
        password: "Jash@0437",
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
