import { Resend } from "resend";
import ClientConfirmationEmail from "@/components/emails/client-confirmation-email";
import CompanyNotificationEmail from "@/components/emails/company-notification-email";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactFormEmails(formData: ContactFormData) {
  try {
    const emailResult = await resend.batch.send([
      // Send confirmation email to client
      {
        from: process.env.SEND_FORM_EMAIL!,
        to: [formData.email],
        subject: "Confirmation de réception - NeoCraft",
        react: ClientConfirmationEmail({
          clientName: formData.name,
          clientEmail: formData.email,
          subject: formData.subject,
        }),
      },

      // Send notification email to company
      {
        from: process.env.SEND_FORM_EMAIL!,
        to: [process.env.COMPANY_EMAIL!],
        subject: "Nouvelle demande de contact",
        react: CompanyNotificationEmail({
          clientName: formData.name,
          clientEmail: formData.email,
          subject: formData.subject,
          message: formData.message,
          submittedAt: new Date(),
        }),
      },
    ]);

    return {
      success: true,
      data: emailResult.data,
    };
  } catch (error) {
    console.error("Error sending emails:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
