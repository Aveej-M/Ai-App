import type { Metadata } from "next";
import ClientLayoutWrapper from "./ClientLayout";


export const metadata: Metadata = {
  title: "Chat Bot",
  description: "Ai platform created by winfomi",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <div className="flex w-full pt-16">
      <ClientLayoutWrapper>
        {children}
      </ClientLayoutWrapper>

    </div>
  );
}
