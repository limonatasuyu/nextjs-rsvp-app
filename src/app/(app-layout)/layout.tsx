import { Navbar } from "@/components/layout/navbar";
import { ToastProvider } from "@/contexts/toast-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ToastProvider>
      <Navbar />
      {children}
    </ToastProvider>
  );
}
