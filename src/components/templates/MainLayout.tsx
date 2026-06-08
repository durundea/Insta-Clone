import { CreatePostModal } from "../organisms/CreatePostModal";
import { Header } from "../organisms/Header";
import { Sidebar } from "../organisms/Sidebar";

export interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <div className="mx-auto max-w-6xl p-4">
        <div className="grid grid-cols-[220px_1fr] gap-6">
          <Sidebar />
          <main>{children}</main>
        </div>
      </div>
      <CreatePostModal />
    </div>
  );
}
