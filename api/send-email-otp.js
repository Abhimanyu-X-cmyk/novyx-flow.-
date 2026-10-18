
export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      message: "Method not allowed. Use POST."
    });
  }

  const email = req.body?.email;

  if (
    typeof email !== "string" ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return res.status(400).json({
      ok: false,
      message: "Please provide a valid email address."
    });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(503).json({
      ok: false,
      message: "Email verification is not configured yet.",
      emailDelivery: false
    });
  }

  return res.status(501).json({
    ok: false,
    message: "Email delivery is not implemented yet.",
    emailDelivery: false
  });
}
