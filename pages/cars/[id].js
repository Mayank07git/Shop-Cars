import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/CarDetails.module.css';

export default function CarDetails() {
  const router = useRouter();
  const { id } = router.query;
  
  const [car, setCar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal State Logic
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Handling Form Submission visually!
  const handleTestDriveSubmit = (e) => {
    e.preventDefault();
    alert(`Test Drive officially booked for the ${car.make} ${car.model}! The seller will call you shortly.`);
    toggleModal(); 
  };

  useEffect(() => {
    if (!id) return; 
    
    async function fetchCar() {
      try {
        const response = await fetch('/api/cars');
        const data = await response.json();
        const foundCar = data.find(c => c.id === id);
        
        setTimeout(() => {
          setCar(foundCar);
          setIsLoading(false);
        }, 500); 
      } catch (error) {
        console.error("Failed to fetch car data", error);
        setIsLoading(false);
      }
    }
    fetchCar();
  }, [id]);

    if (isLoading) {
    return (
      <div className={styles.container}>
        <button className={styles.backBtn} disabled style={{ opacity: 0.5 }}>
          ← Loading...
        </button>

        <div className={styles.splitLayout}>
          {/* Left Side: Skeleton Image Placeholder */}
          <div className={styles.imageContainer}>
            <div className={`${styles.skeleton} ${styles.skelImage}`}></div>
          </div>

          {/* Right Side: Skeleton Data Placeholders */}
          <div className={styles.detailsContainer}>
            <div className={`${styles.skeleton} ${styles.skelTitle}`}></div>
            <div className={`${styles.skeleton} ${styles.skelPrice}`}></div>
            
            <div className={styles.divider}></div>

            {/* Simulated Grid of 6 Specification Passports */}
            <div className={styles.specsGrid}>
              {[1, 2, 3, 4, 5, 6].map(n => (
                <div key={n} className={`${styles.skeleton} ${styles.skelBadge}`}></div>
              ))}
            </div>

            {/* Simulated CTA Buttons */}
            <div className={styles.ctaGroup}>
              <div className={`${styles.skeleton} ${styles.skelBtn}`} style={{ flex: 1 }}></div>
              <div className={`${styles.skeleton} ${styles.skelBtn}`} style={{ flex: 1 }}></div>
            </div>
            
          </div>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className={styles.container}>
        <h2>Car not found!</h2>
        <button onClick={() => router.back()} className={styles.backBtn}>← Go Back</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button onClick={() => router.back()} className={styles.backBtn}>
        ← Back to Inventory
      </button>

      <div className={styles.splitLayout}>
        {/* Left Side: Image */}
        <div className={styles.imageContainer}>
          <img src={car.image} alt={car.model} className={styles.mainImage} />
        </div>

        {/* Right Side: Data & CTAs */}
        <div className={styles.detailsContainer}>
          <h1 className={styles.title}>{car.make} {car.model}</h1>
          <div className={styles.price}>₹{car.price.toLocaleString('en-IN')}</div>
          
          <div className={styles.divider}></div>

          {/* Grid of Specifications (Car ID Removed) */}
          <div className={styles.specsGrid}>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Year</span>
              <span className={styles.specValue}>{car.year}</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Mileage</span>
              <span className={styles.specValue}>{car.mileage.toLocaleString()} km</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Fuel Type</span>
              <span className={styles.specValue}>{car.fuelType}</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Transmission</span>
              <span className={styles.specValue}>{car.transmission}</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Body Type</span>
              <span className={styles.specValue}>{car.bodyType}</span>
            </div>
          </div>

          {/* New Dual CTA Strategy */}
          <div className={styles.ctaGroup}>
            {/* The <a> link uses tel: which opens the iPhone/Android Dial-Pad natively! */}
            <a href="tel:7986903727" className={styles.btnSecondary}>
              Contact Seller
            </a>
            
            <button className={styles.btnPrimary} onClick={toggleModal}>
              Book Test Drive
            </button>
          </div>
        </div>
      </div>

      {/* --- TEST DRIVE MODAL POPUP OVERLAY --- */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={toggleModal}>
          
          {/* We stop propagation so clicking INSIDE the white box doesn't accidentally trigger the grey overlay and close the modal */}
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeModalBtn} onClick={toggleModal}>×</button>
            <h2 className={styles.modalTitle}>Book Test Drive</h2>
            {/* Dynamically loads exactly which car they clicked */}
            <p className={styles.modalSubtitle}>For: {car.make} {car.model} (₹{car.price.toLocaleString('en-IN')})</p>

            <form onSubmit={handleTestDriveSubmit}>
              <div className={styles.formGroup}>
                <label>Full Name</label>
                <input type="text" placeholder="Rahul Verma" required />
              </div>
              
              <div className={styles.formGroup}>
                <label>Mobile Number</label>
                <input type="tel" placeholder="+91 XXXXX XXXXX" required />
              </div>

              <div className={styles.formGroup}>
                <label>Preferred Date</label>
                <input type="date" required />
              </div>
              
              <div className={styles.formGroup}>
                <label>Preferred Time</label>
                <input type="time" required />
              </div>

              <button type="submit" className={styles.submitBtn}>
                Confirm Booking
              </button>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}
