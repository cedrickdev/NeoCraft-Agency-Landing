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
      <Preview>Nouvelle demande de contact - {clientName}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <div style={logoContainer}>
              <div style={logo}>
                <Text style={logoText}>NeoCraft</Text>
              </div>
            </div>
            <Text style={headerSubtitle}>Nouvelle demande de contact</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h1}>Nouvelle demande de {clientName}</Heading>

            {/* Client Info Card */}
            <Section style={clientCard}>
              <Text style={cardTitle}>👤 Informations du client</Text>
              <div style={clientInfo}>
                <div style={infoRow}>
                  <Text style={infoLabel}>Nom :</Text>
                  <Text style={infoValue}>{clientName}</Text>
                </div>
                <div style={infoRow}>
                  <Text style={infoLabel}>Email :</Text>
                  <Text style={infoValue}>
                    <Link href={`mailto:${clientEmail}`} style={emailLink}>
                      {clientEmail}
                    </Link>
                  </Text>
                </div>
                <div style={infoRow}>
                  <Text style={infoLabel}>Sujet :</Text>
                  <Text style={infoValue}>{subject}</Text>
                </div>
                <div style={infoRow}>
                  <Text style={infoLabel}>Date :</Text>
                  <Text style={infoValue}>
                    {submittedAt.toLocaleDateString("fr-FR", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </div>
              </div>
            </Section>

            {/* Message Card */}
            <Section style={messageCard}>
              <Text style={cardTitle}>Message du client</Text>
              <div style={messageContent}>
                <Text style={messageText}>{message}</Text>
              </div>
            </Section>

            {/* Quick Actions */}
            <Section style={actionsSection}>
              <Text style={actionsTitle}>Actions rapides</Text>
              <div style={buttonContainer}>
                <Link
                  href={`mailto:${clientEmail}?subject=Re: ${subject}`}
                  style={primaryButton}
                >
                  📧 Répondre par email
                </Link>
                <Link
                  href="https://neocraft.dev/admin/contacts"
                  style={secondaryButton}
                >
                  📋 Voir dans l'admin
                </Link>
              </div>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Hr style={hr} />
            <Text style={footerText}>
              <strong>NeoCraft</strong> - Système de notification automatique
            </Text>
            <Text style={footerSmall}>
              Cet email a été généré automatiquement suite à une soumission du
              formulaire de contact sur neocraft.dev
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
  maxWidth: "700px",
};

const header = {
  padding: "32px 24px 24px",
  backgroundColor: "#1f2937",
  borderRadius: "12px 12px 0 0",
  textAlign: "center" as const,
};

const logoContainer = {
  marginBottom: "16px",
};

const logo = {
  display: "inline-block",
  padding: "12px 24px",
  backgroundColor: "rgba(59, 130, 246, 0.2)",
  borderRadius: "12px",
  border: "2px solid #3b82f6",
};

const logoText = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0",
};

const headerSubtitle = {
  color: "#d1d5db",
  fontSize: "16px",
  margin: "0",
};

const alertBanner = {
  backgroundColor: "#fef3c7",
  border: "1px solid #f59e0b",
  borderRadius: "8px",
  padding: "16px 24px",
  margin: "0 24px",
};

const alertText = {
  color: "#92400e",
  fontSize: "14px",
  margin: "0",
  textAlign: "center" as const,
};

const content = {
  padding: "32px 24px",
};

const h1 = {
  color: "#1f2937",
  fontSize: "28px",
  fontWeight: "bold",
  margin: "0 0 32px",
  textAlign: "center" as const,
};

const clientCard = {
  backgroundColor: "#f8fafc",
  border: "2px solid #e2e8f0",
  borderRadius: "12px",
  padding: "24px",
  margin: "24px 0",
};

const messageCard = {
  backgroundColor: "#f0f9ff",
  border: "2px solid #0ea5e9",
  borderRadius: "12px",
  padding: "24px",
  margin: "24px 0",
};

const cardTitle = {
  color: "#1e293b",
  fontSize: "18px",
  fontWeight: "600",
  margin: "0 0 16px",
};

const clientInfo = {
  display: "block",
};

const infoRow = {
  display: "flex",
  alignItems: "center",
  marginBottom: "12px",
  gap: "12px",
};

const infoLabel = {
  color: "#64748b",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0",
  minWidth: "60px",
};

const infoValue = {
  color: "#1e293b",
  fontSize: "14px",
  margin: "0",
  flex: "1",
};

const emailLink = {
  color: "#0ea5e9",
  textDecoration: "none",
  fontWeight: "500",
};

const messageContent = {
  backgroundColor: "#ffffff",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  padding: "16px",
};

const messageText = {
  color: "#374151",
  fontSize: "15px",
  lineHeight: "24px",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const actionsSection = {
  textAlign: "center" as const,
  margin: "32px 0",
  padding: "24px",
  backgroundColor: "#f1f5f9",
  borderRadius: "12px",
};

const actionsTitle = {
  color: "#1e293b",
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

const primaryButton = {
  backgroundColor: "#0ea5e9",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "14px 28px",
  margin: "4px",
};

const secondaryButton = {
  backgroundColor: "transparent",
  border: "2px solid #64748b",
  borderRadius: "8px",
  color: "#64748b",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 26px",
  margin: "4px",
};

const prioritySection = {
  backgroundColor: "#ecfdf5",
  border: "1px solid #10b981",
  borderRadius: "8px",
  padding: "20px",
  margin: "24px 0",
};

const priorityTitle = {
  color: "#065f46",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0 0 12px",
};

const priorityText = {
  color: "#047857",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0",
};

const footer = {
  padding: "24px",
  textAlign: "center" as const,
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "32px 0 24px",
};

const footerText = {
  color: "#6b7280",
  fontSize: "14px",
  margin: "8px 0",
};

const footerSmall = {
  color: "#9ca3af",
  fontSize: "12px",
  lineHeight: "16px",
  margin: "16px 0 0",
};
