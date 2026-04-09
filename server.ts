import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import multer from "multer";

dotenv.config();

// Configure Multer for file uploads
const upload = multer({ dest: "uploads/" });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dfa5fy1hh",
  api_key: process.env.CLOUDINARY_API_KEY || "471835125174896",
  api_secret: process.env.CLOUDINARY_API_SECRET || "rxgJs6DelYrg7YRKRCS7429ViCY",
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Logging middleware
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // API Route: Ping
  app.get("/api/ping", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // API Route: Contact Form with Email Delivery
  app.post("/api/contact", upload.single("attachment"), async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      const file = req.file;

      console.log(`Received message from ${name} (${email}) with subject: ${subject}`);

      // Configure Nodemailer
      // NOTE: You must set EMAIL_USER and EMAIL_PASS in your environment variables.
      // For Gmail, use an App Password.
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER || "rakayf308@gmail.com",
          pass: process.env.EMAIL_PASS, // This MUST be set for it to work
        },
      });

      const mailOptions: any = {
        from: email,
        to: "rakayf308@gmail.com",
        subject: `[Portfolio Contact] ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        attachments: [],
      };

      if (file) {
        mailOptions.attachments.push({
          filename: file.originalname,
          path: file.path,
        });
      }

      // If credentials are not provided, we simulate success for the demo
      if (!process.env.EMAIL_PASS) {
        console.warn("EMAIL_PASS not set. Simulating email delivery success.");
        // Cleanup uploaded file
        if (file) fs.unlinkSync(file.path);
        return res.json({ success: true, message: "Demo mode: Message received (but not sent via SMTP)." });
      }

      await transporter.sendMail(mailOptions);

      // Cleanup uploaded file
      if (file) fs.unlinkSync(file.path);

      res.json({ success: true, message: "Email sent successfully!" });
    } catch (error: any) {
      console.error("Email error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // API Route: Migrate local images to Cloudinary
  app.post("/api/migrate", async (req, res) => {
    try {
      const localImages = [
        "banner.jpg", "banner.png", "cv 1.png", "cv 2.png", "cv 3.jpeg", "cv 4.jpeg", 
        "Favicon.png", "gambar 1.png", "Gambar 2.png", "gambar 3.png", "gambar 4.png", 
        "gambar 5.png", "gambar 6.png", "gambar 7.png", "gambar 8.png", "gambar 9.jpeg",
        "foto.jpeg"
      ];

      const results = [];

      for (const imageName of localImages) {
        const filePath = path.join(process.cwd(), "public", imageName);
        if (fs.existsSync(filePath)) {
          console.log(`Uploading ${imageName}...`);
          const result = await cloudinary.uploader.upload(filePath, {
            public_id: imageName.split('.')[0].replace(/\s+/g, '_').toLowerCase(),
            folder: "portfolio_migration",
            overwrite: true,
          });
          results.push({ name: imageName, url: result.secure_url });
        } else {
          console.warn(`File not found: ${filePath}`);
        }
      }

      res.json({ success: true, migrated: results });
    } catch (error: any) {
      console.error("Migration error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // API Route: Get Cloudinary Image URL with optimization
  app.get("/api/image/:publicId", (req, res) => {
    const { publicId } = req.params;
    // Optimization: auto format, auto quality, responsive width
    const url = cloudinary.url(`portfolio_migration/${publicId}`, {
      fetch_format: "auto",
      quality: "auto",
      responsive: true,
      width: "auto",
      crop: "scale"
    });
    res.json({ url });
  });

  // Catch-all for API routes to prevent falling through to Vite/SPA fallback
  app.all("/api/*", (req, res) => {
    console.warn(`404 - API route not found: ${req.method} ${req.url}`);
    res.status(404).json({ 
      success: false, 
      error: `API route ${req.method} ${req.url} not found` 
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Global error handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ 
      success: false, 
      error: "Internal Server Error",
      message: err.message 
    });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
