import Link from 'next/link';
import styles from './CarCard.module.css';

export default function CarCard({ car }) {
  return (
    <Link href={`/cars/${car.id}`} style={{ textDecoration: 'none' }}>
      <div className={styles.carCard}>
        <img src={car.image} alt={car.model} className={styles.carImage} />
        
        <div className={styles.carInfo}>
          <h3 className={styles.carTitle}>{car.make} {car.model}</h3>
          <div className={styles.carDetails}>
            <span>{car.year}</span>
            <span>•</span>
            <span>{car.mileage.toLocaleString()} km</span>
            <span>•</span>
            <span>{car.fuelType}</span>
          </div>
          <div className={styles.carPrice}>
            ₹{car.price.toLocaleString('en-IN')}
          </div>
        </div>
      </div>
    </Link>
  );
}
