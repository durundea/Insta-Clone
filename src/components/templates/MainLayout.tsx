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
      <div className="mx-auto w-full max-w-5xl px-4 py-4">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
          <Sidebar />
          <main className="min-w-0">{children}</main>
        </div>
      </div>
      <CreatePostModal />
    </div>
  );
}
