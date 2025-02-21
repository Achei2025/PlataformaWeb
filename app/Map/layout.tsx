import Navbar from "@/app/Navbar/Navbar";

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}