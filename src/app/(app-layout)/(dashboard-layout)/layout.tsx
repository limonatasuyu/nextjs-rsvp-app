import { Sidebar } from "@/components/page/events/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <Sidebar />
      {children}
    </div>
  );
}
