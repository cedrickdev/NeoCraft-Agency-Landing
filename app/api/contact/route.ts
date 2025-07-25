import { type NextRequest, NextResponse } from "next/server";
import { sendContactFormEmails } from "@/lib/email-service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    // Send emails
    const emailResult = await sendContactFormEmails({
      name,
      email,
      subject,
      message,
    });

    if (!emailResult.success) {
      return NextResponse.json(
        { error: "Erreur lors de l'envoi des emails" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message envoyé avec succès",
      data: emailResult.data,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
