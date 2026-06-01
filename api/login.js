// File: api/login.js

export default async function handler(req, res) {
  // Hanya izinkan metode POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  // Ambil URL GAS dari Environment Variables Vercel
  // Nanti Anda atur ini di dashboard Vercel: Settings -> Environment Variables
  const GAS_URL = process.env.GAS_API_URL;

  if (!GAS_URL) {
    return res.status(500).json({ success: false, message: 'Server configuration error' });
  }

  try {
    const { email, deviceId } = req.body;

    // Vercel (Server) yang menembak ke Google Apps Script
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ email, deviceId })
    });

    const data = await response.json();

    // Kembalikan respons dari GAS ke Frontend
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ success: false, message: 'Gagal terhubung ke database server.' });
  }
}
