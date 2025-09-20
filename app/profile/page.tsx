"use client"

import { MainLayout } from "@/components/main-layout"
import { UserProfile } from "@/components/profile/user-profile"

export default function ProfilePage() {
  return (
    <MainLayout>
      <UserProfile />
    </MainLayout>
  )
}
