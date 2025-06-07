import { Sidebar } from "@/components/page/dashboard/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <Sidebar />
      {children}
    </div>
  );
}
