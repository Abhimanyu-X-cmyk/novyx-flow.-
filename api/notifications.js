
export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      ok: false,
      message: "Method not allowed"
    });
  }

  const notifications = [
    {
      id: 1,
      type: "payment",
      title: "Payment demo",
      message: "This is a sample payment notification.",
      status: "demo"
    },
    {
      id: 2,
      type: "security",
      title: "Security update",
      message: "NOVYX Flow is running in development mode.",
      status: "demo"
    },
    {
      id: 3,
      type: "system",
      title: "Notifications",
      message: "Email and SMS are not connected yet.",
      status: "demo"
    }
  ];

  return res.status(200).json({
    ok: true,
    service: "NOVYX Flow Notifications",
    mode: "development",
    notifications
  });
}
