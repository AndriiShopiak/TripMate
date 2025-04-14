// src/components/LocationMarkers.tsx
import {
    Marker,
    Popup,
    useMapEvents,
  } from "react-leaflet";
  import { useEffect, useState } from "react";
  import { collection, onSnapshot } from "firebase/firestore";
  import { db } from "../../lib/firebase";
import AddLocationModal from "../modal/AddLocationModal";
  
  type Props = {
    tripId: string;
  };
  
  type Location = {
    id: string;
    name: string;
    lat: number;
    lng: number;
  };
  
  export default function LocationMarkers({ tripId }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [newPosition, setNewPosition] = useState<{ lat: number; lng: number } | null>(null);

    const [locations, setLocations] = useState<Location[]>([]);
  
    // Загрузка локацій з Firestore
    useEffect(() => {
      const locRef = collection(db, "trips", tripId, "locations");
      const unsubscribe = onSnapshot(locRef, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Location, "id">),
        }));
        setLocations(data);
      });
  
      return () => unsubscribe();
    }, [tripId]);
  
    // Додавання нової точки при кліку
    useMapEvents({
      click: (e) => {
        setNewPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
        setShowModal(true);
      },
    });
    
  
    return (
      <>
      {showModal && newPosition && (
        <AddLocationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        tripId={tripId}
        position={newPosition}
      />
)}
        {locations.map((loc) => (
          <Marker key={loc.id} position={[loc.lat, loc.lng]}>
            <Popup>{loc.name}</Popup>
          </Marker>
        ))}
      </>
    );
  }
  