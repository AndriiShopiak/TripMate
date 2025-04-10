export interface Trip {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    members: string[]; // uid користувачів
    locations: TripLocation[];
    budget?: number;
  }
  
  export interface TripLocation {
    id: string;
    name: string;
    lat: number;
    lng: number;
    notes?: string;
    photoUrl?: string;
  }
  