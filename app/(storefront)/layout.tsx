import Footer from "@/components/storefront/Footer";
import NavBar from "@/components/storefront/NavBar";
import { type ReactNode } from "react";
/**
 * Functional component for the storefront layout.
 * Renders the navigation bar, main content area, and footer.
 *
 * @param {ReactNode} children - The content to be displayed in the main area.
 * @returns {JSX.Element} JSX element representing the storefront layout.
 */
const StoreFrontLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="max-w-7xl  px-4 mx-auto sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default StoreFrontLayout;
