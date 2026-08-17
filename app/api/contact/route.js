import { NextResponse } from "next/server";
import { Resend } from "resend";

const CONTACT_TO = "coessing@gmail.com";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function asText(value) {
  return String(value || "").trim();
}

function siteHost(siteLink) {
  try {
    return new URL(siteLink).host.replace(/^www\./, "");
  } catch {
    return siteLink.replace(/^https?:\/\//, "").replace(/^www\./, "");
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const name = asText(body.name);
    const email = asText(body.email);
    const phone = asText(body.phone);
    const location = asText(body.location);
    const message = asText(body.message);
    const siteName = asText(body.siteName);
    const siteLink = asText(body.siteLink);

    if (!name || !email || !phone || !location || !message || !siteName || !siteLink) {
      return NextResponse.json(
        { success: false, message: "Please fill in all fields." },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { success: false, message: "Email is not configured." },
        { status: 500 }
      );
    }

    const schoolLine = `${siteName} (${siteHost(siteLink)})`;
    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromEmail = process.env.RESEND_FROM || "noreply@coessing.org";
    const from = fromEmail.includes("<")
      ? fromEmail
      : `${siteName} <${fromEmail}>`;

    const { error } = await resend.emails.send({
      from,
      to: CONTACT_TO,
      replyTo: email,
      subject: `Contact from ${siteName}: ${name}`,
      text: [
        `School: ${schoolLine}`,
        `Site: ${siteLink}`,
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Location: ${location}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <p><strong>School:</strong> ${escapeHtml(siteName)} (<a href="${escapeHtml(siteLink)}">${escapeHtml(siteHost(siteLink))}</a>)</p>
          <hr />
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
          <p><strong>Location:</strong> ${escapeHtml(location)}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message || "Failed to send message." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Message sent." });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to send message." },
      { status: 500 }
    );
  }
}
