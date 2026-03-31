import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import CarCard from '../components/CarCard';

export default function Home() {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Fetch data when the component loads
  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await fetch('/api/cars');
        const data = await response.json();
        
        // Simulating a slight network delay so you can see your cool skeleton loader work!
        setTimeout(() => {
          setCars(data);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Failed to fetch cars", error);
        setIsLoading(false);
      }
    }
    fetchCars();
  }, []);

  const filteredCars = cars.filter(car => {
    const searchLow = searchTerm.toLowerCase();
    return (
      car.make.toLowerCase().includes(searchLow) || 
      car.model.toLowerCase().includes(searchLow)
    );
  });

  return (
    <div className={styles.container}>
      
      {/* --- HERO SECTION --- */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Find your dream car today.</h1>
          <p className={styles.heroSubtitle}>Thousands of inspected used cars with money-back guarantees.</p>
          
          <div className={styles.searchBox}>
            <input 
              type="text" 
              placeholder="Search by Make & Model..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className={styles.searchBtn}>Search</button>
          </div>
        </div>
      </section>

      {/* --- FEATURED CARS API SECTION --- */}
      <section className={styles.featuredSection}>
        <h2 className={styles.sectionTitle}>Featured Used Cars</h2>
        
        <div className={styles.carGrid}>
          {isLoading ? (
            /* IF LOADING: Show 4 skeleton placeholders */
            [1, 2, 3, 4].map(n => (
              <div key={n} className={`${styles.skeleton} ${styles.skeletonCard}`}></div>
            ))
          ) : (
            /* IF LOADED: Map through the backend data and render the cards! */
            filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
