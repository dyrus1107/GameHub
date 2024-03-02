import { Suspense } from "react";
import { Container } from "./_components/container";
import Navbar from "./_components/navbar";
import SideBar, { SidebarSkeleton } from "./_components/sidebar";
import { Toaster } from "sonner";

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Suspense fallback={<SidebarSkeleton />}>
          <SideBar />
        </Suspense>
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default BrowseLayout;
