import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      
      {/* flex: 1 tells the main content to grow and push the footer down */}
      <main style={{ flex: 1 }}>
        {children}
      </main>
      
      <Footer />
    </div>
  );
}
