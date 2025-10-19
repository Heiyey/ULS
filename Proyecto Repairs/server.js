const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000; // Cambia el puerto a 5000

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta para manejar solicitudes GET en la raíz
app.get("/", (req, res) => {
  res.send("Server is running and ready to handle requests.");
});

// Ruta para manejar el envío del formulario
app.post("/send-email", async (req, res) => {
  const { name, email, serial, subject, message } = req.body;

  console.log("Request received:", req.body); // Log para verificar los datos recibidos

  if (!name || !email || !serial || !subject || !message) {
    console.log("Validation failed: Missing fields");
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "candrevis1706@gmail.com", // Tu correo
        pass: "linw rszd pimm ogma", // Contraseña de aplicación
      },
    });

    const mailOptions = {
      from: `${name} <${email}>`, // El remitente será el correo ingresado en el formulario
      to: "heiyeywolf25@gmail.com", // Cambia esto al correo donde quieres recibir el mensaje
      subject: `Service Request: ${subject}`,
      html: `
        <h3>New Service Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Serial Number:</strong> ${serial}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    console.log("Sending email to:", mailOptions.to);
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
