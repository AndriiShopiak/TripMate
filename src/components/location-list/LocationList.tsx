// src/components/LocationList.tsx
import { useEffect, useState } from "react";
import { collection, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";
import { Location } from "../../types/location";
import EditLocationModal from "../edit-modal/EditModal";
import {IconButton} from "@mui/material";

type Props = {
  tripId: string;
};

export default function LocationList({ tripId }: Props) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [showEdit, setShowEdit] = useState<boolean>(false);

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

  const handleDelete = async (id: string) => {
    if (confirm("Ви дійсно хочете видалити цю локацію?")) {
      await deleteDoc(doc(db, "trips", tripId, "locations", id));
    }
  };
  const handleEdit = () => {
    setShowEdit(true);
  };
  

  return (
    <>
      <div className="flex flex-col gap-2 mt-4">
        <h2 className="text-lg font-semibold">📍 Локації подорожі</h2>
        {locations.map((loc) => (
          <div key={loc.id} className="border rounded p-3 bg-gray-50 flex justify-between items-center">
          <div>
            <p className="font-bold">{loc.name}</p>
            <p className="text-sm text-gray-600">{loc.description}</p>
            <span className="text-xs bg-blue-100 text-blue-700 rounded px-2 py-0.5 inline-block mt-1">
              {loc.type}
            </span>
          </div>
          <IconButton
                onClick={() => handleEdit()}
                sx={{ cursor: 'pointer', color: '#1976d2', marginLeft: 'auto' }}
              >
              <EditIcon />
          </IconButton>
          <IconButton
                onClick={() => handleDelete(loc.id)}
                sx={{cursor: 'pointer' , color: '#d32f2f', marginLeft: '10px'}}
              >
              <DeleteIcon />
          </IconButton>
          <EditLocationModal isOpen={showEdit} onClose={() => setShowEdit(false)} tripId={loc.id} position={loc} />
        </div>
        ))}
      </div>
    </>
  );
}
