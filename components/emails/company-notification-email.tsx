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
    Text,
} from "@react-email/components";

interface CompanyNotificationEmailProps {
  clientName: string;
  clientEmail: string;
  subject: string;
  message: string;
  submittedAt?: Date;
}

export default function CompanyNotificationEmail({
  clientName = "Client",
  clientEmail = "client@example.com",
  subject = "Nouvelle demande",
  message = "Message du client...",
  submittedAt = new Date(),
}: CompanyNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Nouvelle demande de contact de {clientName}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={brandName}>NEOCRAFT</Text>
            <Text style={headerSubtitle}>NOTIFICATION DE CONTACT</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h1}>Un nouveau projet se profile</Heading>

            <Section style={dataCard}>
              <Text style={cardTitle}>Détails du contact</Text>
              
              <Section style={infoGrid}>
                <table style={{ width: "100%" }}>
                  <tr>
                    <td style={labelCell}>Nom</td>
                    <td style={valueCell}>{clientName}</td>
                  </tr>
                  <tr>
                    <td style={labelCell}>Email</td>
                    <td style={valueCell}>
                      <Link href={`mailto:${clientEmail}`} style={link}>{clientEmail}</Link>
                    </td>
                  </tr>
                  <tr>
                    <td style={labelCell}>Sujet</td>
                    <td style={valueCell}>{subject}</td>
                  </tr>
                  <tr>
                    <td style={labelCell}>Date</td>
                    <td style={valueCell}>
                        {submittedAt.toLocaleString('fr-FR', {
                            dateStyle: 'medium',
                            timeStyle: 'short'
                        })}
                    </td>
                  </tr>
                </table>
              </Section>
            </Section>

            <Section style={messageSection}>
              <Text style={cardTitle}>Message</Text>
              <Text style={messageContent}>{message}</Text>
            </Section>

            <Section style={ctaSection}>
                <Link href={`mailto:${clientEmail}`} style={button}>
                    Répondre au client
                </Link>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Hr style={hr} />
            <Text style={footerSmall}>
              Cet email a été généré automatiquement par le système NeoCraft.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f3f4f6",
  fontFamily: '-apple-system,BlinkMacSystemFont,"SF Pro Display","Segoe UI",Roboto,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "40px auto",
  maxWidth: "640px",
  borderRadius: "24px",
  overflow: "hidden" as const,
  border: "1px solid #e5e7eb",
};

const header = {
  padding: "40px",
  backgroundColor: "#050505",
  textAlign: "center" as const,
};

const brandName = {
  color: "#ffffff",
  fontSize: "20px",
  fontWeight: "900",
  letterSpacing: "4px",
  margin: "0 0 8px",
};

const headerSubtitle = {
  color: "rgba(255,255,255,0.4)",
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "2px",
  margin: "0",
};

const content = {
  padding: "48px 40px",
};

const h1 = {
  color: "#111827",
  fontSize: "24px",
  fontWeight: "700",
  margin: "0 0 32px",
  textAlign: "center" as const,
};

const dataCard = {
  backgroundColor: "#f9fafb",
  borderRadius: "16px",
  padding: "32px",
  margin: "0 0 24px",
  border: "1px solid #f3f4f6",
};

const cardTitle = {
  color: "#111827",
  fontSize: "14px",
  fontWeight: "800",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
  margin: "0 0 16px",
};

const infoGrid = {
  width: "100%",
};

const labelCell = {
  color: "#6b7280",
  fontSize: "13px",
  fontWeight: "600",
  padding: "8px 0",
  width: "80px",
};

const valueCell = {
  color: "#111827",
  fontSize: "14px",
  fontWeight: "500",
  padding: "8px 0",
};

const messageSection = {
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "32px",
  border: "1px solid #f3f4f6",
  margin: "0 0 32px",
};

const messageContent = {
  color: "#4b5563",
  fontSize: "15px",
  lineHeight: "24px",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const ctaSection = {
  textAlign: "center" as const,
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
  borderColor: "#f3f4f6",
  margin: "32px 0 24px",
};

const link = {
  color: "#050505",
  textDecoration: "underline",
};

const footer = {
  padding: "0 40px 48px",
  textAlign: "center" as const,
};

const footerSmall = {
  color: "#9ca3af",
  fontSize: "12px",
  lineHeight: "16px",
};
