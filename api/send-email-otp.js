
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      message: "Method not allowed"
    });
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return res.status(503).json({
      ok: false,
      message: "Resend is not configured"
    });
  }

  try {
    const response = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "NOVYX Flow <onboarding@resend.dev>",
          to: ["delivered@resend.dev"],
          subject: "NOVYX Flow — Email Connection Test",
          text: "Your NOVYX Flow email API connection test succeeded."
        })
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Resend request failed:", response.status);

      return res.status(502).json({
        ok: false,
        message: "Resend could not accept the test email",
        providerStatus: response.status
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Resend accepted the test email",
      emailId: result.id
    });
  } catch (error) {
    console.error("Email connection failed");

    return res.status(502).json({
      ok: false,
      message: "Could not connect to the email provider"
    });
  }
}
