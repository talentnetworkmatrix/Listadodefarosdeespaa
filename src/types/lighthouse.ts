export interface Lighthouse {
  id: string;
  name: string;
  location: string;
  region: string;
  province: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  height: number; // meters
  yearBuilt: number;
  status: 'active' | 'inactive' | 'museum';
  description: string;
  imageUrl: string;
  visited?: boolean;
}
