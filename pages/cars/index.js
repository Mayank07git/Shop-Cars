import { useState, useEffect } from 'react';
import CarCard from '../../components/CarCard';
import styles from '../../styles/Inventory.module.css';

export default function Inventory() {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for Mobile Filter Drawer
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  // --- NEW: THE UNIFIED FILTER STATE ARCHITECTURE ---
  const [filters, setFilters] = useState({
    make: [],
    year: [],
    fuelType: [],
    bodyType: [],
    transmission: [],
    budget: []
  });

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await fetch('/api/cars');
        const data = await response.json();
        
        setTimeout(() => {
          setCars(data);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error("Failed to fetch", error);
        setIsLoading(false);
      }
    }
    fetchCars();
  }, []);

  // --- NEW: THE TOGGLE FUNCTION ---
  // If a category value is already checked, remove it. If not, add it!
  const handleFilterChange = (category, value) => {
    setFilters(prevFilters => {
      const isAlreadySelected = prevFilters[category].includes(value);
      if (isAlreadySelected) {
        return { ...prevFilters, [category]: prevFilters[category].filter(item => item !== value) };
      } else {
        return { ...prevFilters, [category]: [...prevFilters[category], value] };
      }
    });
  };

  // --- NEW: THE CENTRALIZED FILTER ENGINE ---
  const filteredCars = cars.filter(car => {
    // 1. Make (Exact String Match)
    if (filters.make.length > 0 && !filters.make.includes(car.make)) return false;

    // 2. Fuel Type
    if (filters.fuelType.length > 0 && !filters.fuelType.includes(car.fuelType)) return false;

    // 3. Body Type
    if (filters.bodyType.length > 0 && !filters.bodyType.includes(car.bodyType)) return false;

    // 4. Transmission
    if (filters.transmission.length > 0 && !filters.transmission.includes(car.transmission)) return false;

    // 5. Year (Dynamic Range Bounds)
    if (filters.year.length > 0) {
      const matchYear = filters.year.some(range => {
        if (range === '2022+') return car.year >= 2022;
        if (range === '2018-2021') return car.year >= 2018 && car.year <= 2021;
        if (range === 'pre-2018') return car.year < 2018;
        return false;
      });
      if (!matchYear) return false;
    }

    // 6. Budget (Dynamic Pricing Numeric Bounds)
    if (filters.budget.length > 0) {
      const matchBudget = filters.budget.some(range => {
        if (range === 'under5') return car.price < 500000;
        if (range === '5to15') return car.price >= 500000 && car.price <= 1500000;
        if (range === 'over15') return car.price > 1500000;
        return false;
      });
      if (!matchBudget) return false; // Thrown out if it doesn't match budget!
    }

    // SURVIVED: This perfectly matching car is allowed on screen!
    return true; 
  });


  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Used Cars for Sale</h1>
      
      <div className={styles.layout}>
        
        {/* Left Sidebar Filter */}
        <aside className={`${styles.sidebar} ${isFilterOpen ? styles.open : ''}`}>
          
          <button className={styles.closeFilterBtn} onClick={toggleFilter}></button>

          <div className={styles.filterGroup}>
            <h4>Make & Model</h4>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" checked={filters.make.includes('Hyundai')} onChange={() => handleFilterChange('make', 'Hyundai')} /> Hyundai
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" checked={filters.make.includes('Honda')} onChange={() => handleFilterChange('make', 'Honda')} /> Honda
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" checked={filters.make.includes('Maruti Suzuki')} onChange={() => handleFilterChange('make', 'Maruti Suzuki')} /> Maruti Suzuki
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" checked={filters.make.includes('Toyota')} onChange={() => handleFilterChange('make', 'Toyota')} /> Toyota
            </label>
          </div>

          <div className={styles.filterGroup}>
            <h4>Year</h4>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" checked={filters.year.includes('2022+')} onChange={() => handleFilterChange('year', '2022+')} /> 2022 & newer
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" checked={filters.year.includes('2018-2021')} onChange={() => handleFilterChange('year', '2018-2021')} /> 2018 - 2021
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" checked={filters.year.includes('pre-2018')} onChange={() => handleFilterChange('year', 'pre-2018')} /> Before 2018
            </label>
          </div>
          
          <div className={styles.filterGroup}>
            <h4>Fuel Type</h4>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" checked={filters.fuelType.includes('Petrol')} onChange={() => handleFilterChange('fuelType', 'Petrol')} /> Petrol
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" checked={filters.fuelType.includes('Diesel')} onChange={() => handleFilterChange('fuelType', 'Diesel')} /> Diesel
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" checked={filters.fuelType.includes('Electric')} onChange={() => handleFilterChange('fuelType', 'Electric')} /> Electric
            </label>
          </div>

          <div className={styles.filterGroup}>
            <h4>Body Type</h4>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" checked={filters.bodyType.includes('SUV')} onChange={() => handleFilterChange('bodyType', 'SUV')} /> SUV
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" checked={filters.bodyType.includes('Sedan')} onChange={() => handleFilterChange('bodyType', 'Sedan')} /> Sedan
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" checked={filters.bodyType.includes('Hatchback')} onChange={() => handleFilterChange('bodyType', 'Hatchback')} /> Hatchback
            </label>
          </div>

          <div className={styles.filterGroup}>
            <h4>Transmission</h4>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" checked={filters.transmission.includes('Automatic')} onChange={() => handleFilterChange('transmission', 'Automatic')} /> Automatic
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" checked={filters.transmission.includes('Manual')} onChange={() => handleFilterChange('transmission', 'Manual')} /> Manual
            </label>
          </div>

          <div className={styles.filterGroup}>
            <h4>Budget</h4>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" checked={filters.budget.includes('under5')} onChange={() => handleFilterChange('budget', 'under5')} /> Under ₹5 Lakh
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" checked={filters.budget.includes('5to15')} onChange={() => handleFilterChange('budget', '5to15')} /> ₹5 Lakh - ₹15 Lakh
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" checked={filters.budget.includes('over15')} onChange={() => handleFilterChange('budget', 'over15')} /> Over ₹15 Lakh
            </label>
          </div>
        </aside>

        {/* Real Dynamic Data Grid */}
        <main className={styles.mainContent}>
          <div className={styles.grid}>
            {isLoading ? (
              [1, 2, 3, 4, 5, 6].map(n => (
                <div key={n} className={`${styles.skeleton} ${styles.skeletonCard}`}></div>
              ))
            ) : filteredCars.length === 0 ? (
              /* --- NEW: Empty State Handled! --- */
              <h3 style={{ gridColumn: '1 / -1', color: 'var(--text-muted)' }}>
                No cars found matching these exact filters. Try clearing some selections!
              </h3>
            ) : (
              filteredCars.map(car => (
                <CarCard key={car.id} car={car} />
              ))
            )}
          </div>
        </main>

      </div>

      {/* Floating Filters Button (Mobile Only) */}
      <button className={styles.mobileFilterBtn} onClick={toggleFilter}>
        Filters
      </button>

      {/* Background Overlay (Mobile Only) */}
      {isFilterOpen && <div className={styles.filterOverlay} onClick={toggleFilter}></div>}
    </div>
  );
}
