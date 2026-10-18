
export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    service: "NOVYX Flow API",
    mode: "development",
    emailNotifications: "not configured",
    smsNotifications: "not configured",
    realPayments: false
  });
}
