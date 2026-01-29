import { Injectable, signal, computed } from '@angular/core';
import { Land, LandStatus, LandType, LandFilter } from './land.model';

@Injectable({
  providedIn: 'root'
})
export class LandService {
  private landsSignal = signal<Land[]>(this.getInitialLands());
  
  // Public read-only signals
  lands = this.landsSignal.asReadonly();
  
  // Computed signal for available lands
  availableLands = computed(() => 
    this.landsSignal().filter(land => land.status === LandStatus.AVAILABLE)
  );

  constructor() {
    this.loadFromLocalStorage();
  }

  private getInitialLands(): Land[] {
    return [
      {
        id: '1',
        title: 'Prime Residential Land in Abdoun',
        description: 'Beautiful residential plot in the heart of Abdoun with stunning views. Perfect for building your dream home.',
        location: 'Abdoun, Amman',
        area: 1000,
        price: 500000,
        status: LandStatus.AVAILABLE,
        type: LandType.RESIDENTIAL,
        features: ['Mountain View', 'Close to Schools', 'Quiet Neighborhood', 'Utilities Available'],
        images: ['🏡'],
        ownerName: 'Ahmad Mansour',
        ownerContact: '+962-79-1234567',
        datePosted: new Date('2026-01-15'),
        coordinates: { lat: 31.9567, lng: 35.8782 }
      },
      {
        id: '2',
        title: 'Commercial Land - City Center',
        description: 'Strategic commercial location perfect for retail or office development. High foot traffic area.',
        location: 'Downtown, Amman',
        area: 2500,
        price: 1200000,
        status: LandStatus.AVAILABLE,
        type: LandType.COMMERCIAL,
        features: ['Main Street', 'High Traffic', 'Public Transport', 'Parking Available'],
        images: ['🏢'],
        ownerName: 'Sara Al-Khalil',
        ownerContact: '+962-77-9876543',
        datePosted: new Date('2026-01-20'),
        coordinates: { lat: 31.9539, lng: 35.9106 }
      },
      {
        id: '3',
        title: 'Agricultural Land - Jordan Valley',
        description: 'Fertile agricultural land with water access. Ideal for farming or agricultural projects.',
        location: 'Jordan Valley',
        area: 10000,
        price: 300000,
        status: LandStatus.AVAILABLE,
        type: LandType.AGRICULTURAL,
        features: ['Water Source', 'Fertile Soil', 'Irrigation System', 'Road Access'],
        images: ['🌾'],
        ownerName: 'Mohammed Rashid',
        ownerContact: '+962-78-5555555',
        datePosted: new Date('2026-01-10'),
        coordinates: { lat: 32.0523, lng: 35.6157 }
      },
      {
        id: '4',
        title: 'Industrial Plot - Sahab',
        description: 'Large industrial plot suitable for factories or warehouses. Easy highway access.',
        location: 'Sahab, Amman',
        area: 5000,
        price: 800000,
        status: LandStatus.PENDING,
        type: LandType.INDUSTRIAL,
        features: ['Highway Access', 'Industrial Zone', 'Three-Phase Power', 'Large Area'],
        images: ['🏭'],
        ownerName: 'Khalid Omar',
        ownerContact: '+962-79-7777777',
        datePosted: new Date('2026-01-05'),
        coordinates: { lat: 31.8699, lng: 36.0015 }
      },
      {
        id: '5',
        title: 'Mixed-Use Development Land',
        description: 'Perfect for mixed-use development project. Residential and commercial zoning approved.',
        location: 'Sweifieh, Amman',
        area: 3000,
        price: 950000,
        status: LandStatus.AVAILABLE,
        type: LandType.MIXED_USE,
        features: ['Mixed Zoning', 'Modern Area', 'Shopping Nearby', 'Investment Opportunity'],
        images: ['🏘️'],
        ownerName: 'Layla Haddad',
        ownerContact: '+962-77-3333333',
        datePosted: new Date('2026-01-25'),
        coordinates: { lat: 31.9342, lng: 35.8641 }
      }
    ];
  }

  private loadFromLocalStorage(): void {
    const stored = localStorage.getItem('lands');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        const lands = parsed.map((land: any) => ({
          ...land,
          datePosted: new Date(land.datePosted)
        }));
        this.landsSignal.set(lands);
      } catch (error) {
        console.error('Error loading lands from localStorage:', error);
      }
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('lands', JSON.stringify(this.landsSignal()));
  }

  getAllLands(): Land[] {
    return this.landsSignal();
  }

  getLandById(id: string): Land | undefined {
    return this.landsSignal().find(land => land.id === id);
  }

  addLand(land: Omit<Land, 'id' | 'datePosted'>): Land {
    const newLand: Land = {
      ...land,
      id: this.generateId(),
      datePosted: new Date()
    };
    
    this.landsSignal.update(lands => [...lands, newLand]);
    this.saveToLocalStorage();
    return newLand;
  }

  updateLand(id: string, updates: Partial<Land>): boolean {
    const index = this.landsSignal().findIndex(land => land.id === id);
    if (index === -1) return false;

    this.landsSignal.update(lands => {
      const newLands = [...lands];
      newLands[index] = { ...newLands[index], ...updates };
      return newLands;
    });
    
    this.saveToLocalStorage();
    return true;
  }

  deleteLand(id: string): boolean {
    const initialLength = this.landsSignal().length;
    this.landsSignal.update(lands => lands.filter(land => land.id !== id));
    
    if (this.landsSignal().length < initialLength) {
      this.saveToLocalStorage();
      return true;
    }
    return false;
  }

  filterLands(filter: LandFilter): Land[] {
    return this.landsSignal().filter(land => {
      if (filter.searchTerm) {
        const term = filter.searchTerm.toLowerCase();
        const matchesSearch = 
          land.title.toLowerCase().includes(term) ||
          land.description.toLowerCase().includes(term) ||
          land.location.toLowerCase().includes(term);
        if (!matchesSearch) return false;
      }

      if (filter.status && land.status !== filter.status) return false;
      if (filter.type && land.type !== filter.type) return false;
      if (filter.location && !land.location.toLowerCase().includes(filter.location.toLowerCase())) return false;
      if (filter.minPrice !== undefined && land.price < filter.minPrice) return false;
      if (filter.maxPrice !== undefined && land.price > filter.maxPrice) return false;
      if (filter.minArea !== undefined && land.area < filter.minArea) return false;
      if (filter.maxArea !== undefined && land.area > filter.maxArea) return false;

      return true;
    });
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  }

  formatArea(area: number): string {
    return `${area.toLocaleString()} m²`;
  }

  getStatusLabel(status: LandStatus): string {
    const labels = {
      [LandStatus.AVAILABLE]: 'Available',
      [LandStatus.PENDING]: 'Pending',
      [LandStatus.SOLD]: 'Sold'
    };
    return labels[status];
  }

  getTypeLabel(type: LandType): string {
    const labels = {
      [LandType.RESIDENTIAL]: 'Residential',
      [LandType.COMMERCIAL]: 'Commercial',
      [LandType.AGRICULTURAL]: 'Agricultural',
      [LandType.INDUSTRIAL]: 'Industrial',
      [LandType.MIXED_USE]: 'Mixed Use'
    };
    return labels[type];
  }
}
