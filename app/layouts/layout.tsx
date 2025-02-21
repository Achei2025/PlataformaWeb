import Navbar from "@/app/Navbar/Navbar";
import Footer from "@/app/Hero/Footer";

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}