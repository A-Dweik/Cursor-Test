import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LandService } from './land.service';
import { Land, LandStatus, LandType, LandFilter } from './land.model';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private landService = inject(LandService);
  
  // View state
  currentView = signal<'list' | 'add' | 'details'>('list');
  selectedLand = signal<Land | null>(null);
  
  // Filter state
  searchTerm = signal('');
  filterStatus = signal<LandStatus | ''>('');
  filterType = signal<LandType | ''>('');
  minPrice = signal<number | null>(null);
  maxPrice = signal<number | null>(null);
  
  // Form state for adding new land
  newLand = signal({
    title: '',
    description: '',
    location: '',
    area: 0,
    price: 0,
    status: LandStatus.AVAILABLE,
    type: LandType.RESIDENTIAL,
    features: '',
    ownerName: '',
    ownerContact: ''
  });
  
  // Computed filtered lands
  filteredLands = computed(() => {
    const filter: LandFilter = {
      searchTerm: this.searchTerm() || undefined,
      status: this.filterStatus() || undefined,
      type: this.filterType() || undefined,
      minPrice: this.minPrice() ?? undefined,
      maxPrice: this.maxPrice() ?? undefined
    };
    
    return this.landService.filterLands(filter);
  });
  
  // Expose enums to template
  LandStatus = LandStatus;
  LandType = LandType;
  
  // Expose service methods to template
  formatPrice = this.landService.formatPrice.bind(this.landService);
  formatArea = this.landService.formatArea.bind(this.landService);
  getStatusLabel = this.landService.getStatusLabel.bind(this.landService);
  getTypeLabel = this.landService.getTypeLabel.bind(this.landService);
  
  showAddForm(): void {
    this.currentView.set('add');
    this.resetForm();
  }
  
  showList(): void {
    this.currentView.set('list');
    this.selectedLand.set(null);
  }
  
  showDetails(land: Land): void {
    this.selectedLand.set(land);
    this.currentView.set('details');
  }
  
  addLand(): void {
    const form = this.newLand();
    
    // Validation
    if (!form.title || !form.location || !form.ownerName || !form.ownerContact) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (form.area <= 0 || form.price <= 0) {
      alert('Area and price must be greater than 0');
      return;
    }
    
    const features = form.features
      .split(',')
      .map(f => f.trim())
      .filter(f => f.length > 0);
    
    this.landService.addLand({
      title: form.title,
      description: form.description,
      location: form.location,
      area: form.area,
      price: form.price,
      status: form.status,
      type: form.type,
      features: features,
      images: [this.getTypeEmoji(form.type)],
      ownerName: form.ownerName,
      ownerContact: form.ownerContact
    });
    
    this.showList();
    alert('Land listing added successfully!');
  }
  
  deleteLand(id: string): void {
    if (confirm('Are you sure you want to delete this land listing?')) {
      this.landService.deleteLand(id);
      this.showList();
    }
  }
  
  updateLandStatus(id: string, status: LandStatus): void {
    this.landService.updateLand(id, { status });
    if (this.selectedLand()?.id === id) {
      const updated = this.landService.getLandById(id);
      if (updated) {
        this.selectedLand.set(updated);
      }
    }
  }
  
  clearFilters(): void {
    this.searchTerm.set('');
    this.filterStatus.set('');
    this.filterType.set('');
    this.minPrice.set(null);
    this.maxPrice.set(null);
  }
  
  private resetForm(): void {
    this.newLand.set({
      title: '',
      description: '',
      location: '',
      area: 0,
      price: 0,
      status: LandStatus.AVAILABLE,
      type: LandType.RESIDENTIAL,
      features: '',
      ownerName: '',
      ownerContact: ''
    });
  }
  
  private getTypeEmoji(type: LandType): string {
    const emojis = {
      [LandType.RESIDENTIAL]: '🏡',
      [LandType.COMMERCIAL]: '🏢',
      [LandType.AGRICULTURAL]: '🌾',
      [LandType.INDUSTRIAL]: '🏭',
      [LandType.MIXED_USE]: '🏘️'
    };
    return emojis[type];
  }
  
  contactOwner(land: Land): void {
    alert(`Contact ${land.ownerName} at:\n${land.ownerContact}`);
  }
}
