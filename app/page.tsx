/** @format */

"use client";

import { useState } from "react";
import ProfilePanel from "@/components/ProfilePanel";
import ChatWindow from "@/components/ChatWindow";

export default function Home() {
  const [avatarUrl, setAvatarUrl] = useState("/eprofile.png");
  const [cvText, setCvText] = useState<string | null>(null);
  const [cvName, setCvName] = useState<string | null>(null);

  return (
    <main className="flex h-screen w-screen flex-col overflow-hidden bg-void sm:flex-row">
      <ProfilePanel
        avatarUrl={avatarUrl}
        onAvatarChange={setAvatarUrl}
        onCVChange={(text, name) => {
          setCvText(text || null);
          setCvName(name);
        }}
        cvName={cvName}
      />
      <ChatWindow cvText={cvText} />
    </main>
  );
}
