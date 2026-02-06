import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Link,
    Preview,
    Section,
    Text
} from "@react-email/components";

interface ClientConfirmationEmailProps {
  clientName: string;
  clientEmail: string;
  subject: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://neocraft.dev";

export default function ClientConfirmationEmail({
  clientName = "Client",
  clientEmail: _clientEmail = "client@example.com",
  subject = "Votre projet digital",
}: ClientConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>NeoCraft - Nous avons bien reçu votre demande</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={brandName}>NEOCRAFT</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h1}>Bonjour {clientName},</Heading>

            <Text style={text}>
               Merci de nous avoir contactés au sujet de &quot;<strong>{subject}</strong>&quot;.
            </Text>

            <Text style={text}>
              Nous avons bien reçu vos informations. Un membre de notre équipe analysera votre demande et <strong>vous rappellera très prochainement</strong> pour discuter de la suite de votre projet.
            </Text>

            <Section style={infoBox}>
              <Text style={infoTitle}>⏱️ Prochaine étape</Text>
              <Text style={infoText}>
                Nous traitons votre demande. Temps de réponse estimé : moins de 24h.
              </Text>
            </Section>

            <Text style={text}>
              En attendant, vous pouvez découvrir nos dernières réalisations sur notre site.
            </Text>

            <Section style={ctaSection}>
                <Link href={`${baseUrl}`} style={button}>
                    Visiter notre site
                </Link>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              <strong>NeoCraft</strong> — L&apos;excellence digitale, au service de vos ambitions.
            </Text>
            <Hr style={hr} />
            <Text style={footerLinks}>
              <Link href={`${baseUrl}`} style={link}>Site Web</Link> •{" "}
              <Link href="https://linkedin.com/company/neocraft" style={link}>LinkedIn</Link> •{" "}
              <Link href="https://github.com/neocraft" style={link}>GitHub</Link>
            </Text>
            <Text style={footerSmall}>
              © {new Date().getFullYear()} NeoCraft. Tous droits réservés.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f9fafb",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"SF Pro Display","Segoe UI",Roboto,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "40px auto",
  maxWidth: "600px",
  borderRadius: "24px",
  overflow: "hidden" as const,
  border: "1px solid #e5e7eb",
};

const header = {
  padding: "40px 0",
  textAlign: "center" as const,
  backgroundColor: "#050505",
};

const brandName = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "900",
  letterSpacing: "4px",
  margin: "0",
};

const content = {
  padding: "48px 40px",
};

const h1 = {
  color: "#111827",
  fontSize: "24px",
  fontWeight: "700",
  lineHeight: "32px",
  margin: "0 0 24px",
};

const text = {
  color: "#4b5563",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "16px 0",
};

const infoBox = {
  backgroundColor: "#f3f4f6",
  borderRadius: "16px",
  padding: "24px",
  margin: "32px 0",
};

const infoTitle = {
  color: "#111827",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0 0 8px",
};

const infoText = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "0",
};

const ctaSection = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#050505",
  borderRadius: "12px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "16px 32px",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "32px 0",
};

const footer = {
  padding: "0 40px 48px",
  textAlign: "center" as const,
};

const footerText = {
  color: "#9ca3af",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 16px",
};

const footerLinks = {
  fontSize: "14px",
  margin: "16px 0",
};

const link = {
  color: "#050505",
  textDecoration: "none",
  fontWeight: "600",
};

const footerSmall = {
  color: "#d1d5db",
  fontSize: "12px",
  lineHeight: "16px",
  margin: "16px 0 0",
};
