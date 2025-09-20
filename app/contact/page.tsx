"use client"

import { MainLayout } from "@/components/main-layout"
import { LegalPage } from "@/components/legal/legal-page"

export default function ContactPage() {
  return (
    <MainLayout>
      <LegalPage
        title="Contact Us"
        lastUpdated="December 13, 2024"
        content="This is a placeholder for the Contact Us page content. In a real application, this would contain contact information, support channels, office addresses, and a contact form for user inquiries."
      />
    </MainLayout>
  )
}
