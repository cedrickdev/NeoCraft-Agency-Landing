import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";

interface ClientConfirmationEmailProps {
  clientName: string;
  clientEmail: string;
  subject: string;
}

const baseUrl = "neocraftdev.vercel.app";
const blogUrl = `${baseUrl}/blog`;

export default function ClientConfirmationEmail({
  clientName = "Client",
  clientEmail = "client@example.com",
  subject = "Votre demande",
}: ClientConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Nous avons bien reçu votre message - NeoCraft</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <div style={logoContainer}>
              <div style={logo}>
                <Text style={logoText}>NeoCraft</Text>
              </div>
            </div>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h1}>Message bien reçu !</Heading>

            <Text style={text}>
              Bonjour <strong>{clientName}</strong>,
            </Text>

            <Text style={text}>
              Nous vous remercions pour votre message concernant "
              <strong>{subject}</strong>". Votre demande a été transmise à notre
              équipe et nous vous répondrons dans les plus brefs délais.
            </Text>

            <Text style={text}>
              <strong>⏱️ Temps de réponse habituel :</strong> Moins de 24 heures
            </Text>

            <Text style={text}>
              En attendant, n'hésitez pas à consulter nos derniers projets sur
              notre site web ou à nous suivre sur nos réseaux sociaux.
            </Text>

            <Hr style={hr} />

            {/* CTA Section */}
            <Section style={ctaSection}>
              <Text style={ctaTitle}>En attendant notre réponse</Text>
              <div style={buttonContainer}>
                <Link href={`${baseUrl}`} style={button}>
                  Voir nos projets
                </Link>
                <Link href={`${blogUrl}`} style={buttonSecondary}>
                  Lire notre blog
                </Link>
              </div>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              <strong>NeoCraft</strong> - L'artisanat du code, réinventé
            </Text>
            <Text style={footerText}>
              📧 contact@neocraft.dev | 📞 +33 1 23 45 67 89 | 📍 Paris, France
            </Text>
            <Text style={footerLinks}>
              <Link href={`${baseUrl}`} style={link}>
                Site web
              </Link>{" "}
              •
              <Link href="https://linkedin.com/company/neocraft" style={link}>
                {" "}
                LinkedIn
              </Link>{" "}
              •
              <Link href="https://github.com/neocraft" style={link}>
                {" "}
                GitHub
              </Link>
            </Text>
            <Hr style={hr} />
            <Text style={footerSmall}>
              Vous recevez cet email car vous avez contacté NeoCraft via notre
              formulaire de contact.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const header = {
  padding: "32px 24px",
  backgroundColor: "#1f2937",
  borderRadius: "12px 12px 0 0",
};

const logoContainer = {
  textAlign: "center" as const,
};

const logo = {
  display: "inline-block",
  padding: "12px 24px",
  backgroundColor: "linear-gradient(135deg, #3b82f6 0%, #10b981 100%)",
  borderRadius: "12px",
};

const logoText = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0",
};

const content = {
  padding: "32px 24px",
};

const h1 = {
  color: "#1f2937",
  fontSize: "28px",
  fontWeight: "bold",
  margin: "0 0 24px",
  textAlign: "center" as const,
};

const text = {
  color: "#374151",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
};

const infoBox = {
  backgroundColor: "#f3f4f6",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  padding: "20px",
  margin: "24px 0",
};

const infoTitle = {
  color: "#1f2937",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0 0 12px",
};

const infoText = {
  color: "#4b5563",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0",
};

const ctaSection = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const ctaTitle = {
  color: "#1f2937",
  fontSize: "18px",
  fontWeight: "600",
  margin: "0 0 20px",
};

const buttonContainer = {
  display: "flex",
  gap: "12px",
  justifyContent: "center",
  flexWrap: "wrap" as const,
};

const button = {
  backgroundColor: "#3b82f6",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
  margin: "4px",
};

const buttonSecondary = {
  backgroundColor: "transparent",
  border: "2px solid #3b82f6",
  borderRadius: "8px",
  color: "#3b82f6",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "10px 22px",
  margin: "4px",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "32px 0",
};

const footer = {
  padding: "24px",
  backgroundColor: "#f9fafb",
  borderRadius: "0 0 12px 12px",
  textAlign: "center" as const,
};

const footerText = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "8px 0",
};

const footerLinks = {
  color: "#6b7280",
  fontSize: "14px",
  margin: "16px 0",
};

const link = {
  color: "#3b82f6",
  textDecoration: "none",
};

const footerSmall = {
  color: "#9ca3af",
  fontSize: "12px",
  lineHeight: "16px",
  margin: "16px 0 0",
};
