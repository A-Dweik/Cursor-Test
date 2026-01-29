export interface Land {
  id: string;
  title: string;
  description: string;
  location: string;
  area: number; // in square meters
  price: number;
  status: LandStatus;
  type: LandType;
  features: string[];
  images: string[];
  ownerName: string;
  ownerContact: string;
  datePosted: Date;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export enum LandStatus {
  AVAILABLE = 'AVAILABLE',
  PENDING = 'PENDING',
  SOLD = 'SOLD'
}

export enum LandType {
  RESIDENTIAL = 'RESIDENTIAL',
  COMMERCIAL = 'COMMERCIAL',
  AGRICULTURAL = 'AGRICULTURAL',
  INDUSTRIAL = 'INDUSTRIAL',
  MIXED_USE = 'MIXED_USE'
}

export interface LandFilter {
  searchTerm?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  status?: LandStatus;
  type?: LandType;
  location?: string;
}
