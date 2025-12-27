import { useState, useMemo } from 'react';
import { Anchor } from 'lucide-react';
import { lighthouses as initialLighthouses } from './data/lighthouses';
import { Lighthouse } from './types/lighthouse';
import { LighthouseCard } from './components/LighthouseCard';
import { SearchBar } from './components/SearchBar';
import { FilterBar } from './components/FilterBar';
import { StatsBar } from './components/StatsBar';

export default function App() {
  const [lighthouses, setLighthouses] = useState<Lighthouse[]>(initialLighthouses);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Get unique regions
  const regions = useMemo(() => {
    return Array.from(new Set(lighthouses.map(l => l.region))).sort();
  }, [lighthouses]);

  // Filter lighthouses
  const filteredLighthouses = useMemo(() => {
    return lighthouses.filter(lighthouse => {
      const matchesSearch = 
        lighthouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lighthouse.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lighthouse.province.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRegion = !selectedRegion || lighthouse.region === selectedRegion;
      const matchesStatus = !selectedStatus || lighthouse.status === selectedStatus;

      return matchesSearch && matchesRegion && matchesStatus;
    });
  }, [lighthouses, searchTerm, selectedRegion, selectedStatus]);

  // Calculate stats
  const visitedCount = lighthouses.filter(l => l.visited).length;
  const regionsCount = regions.length;

  // Toggle visited status
  const handleToggleVisited = (id: string) => {
    setLighthouses(prevLighthouses =>
      prevLighthouses.map(lighthouse =>
        lighthouse.id === id
          ? { ...lighthouse, visited: !lighthouse.visited }
          : lighthouse
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-3 rounded-lg">
              <Anchor className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900">Faros de España</h1>
              <p className="text-gray-600 text-sm mt-1">
                Explora y descubre los faros más emblemáticos de la costa española
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="mb-8">
          <StatsBar
            totalLighthouses={lighthouses.length}
            visitedCount={visitedCount}
            regionsCount={regionsCount}
          />
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 space-y-4">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <FilterBar
            selectedRegion={selectedRegion}
            selectedStatus={selectedStatus}
            onRegionChange={setSelectedRegion}
            onStatusChange={setSelectedStatus}
            regions={regions}
          />
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Mostrando <span className="font-medium text-gray-900">{filteredLighthouses.length}</span> {filteredLighthouses.length === 1 ? 'faro' : 'faros'}
          </p>
        </div>

        {/* Lighthouses Grid */}
        {filteredLighthouses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLighthouses.map(lighthouse => (
              <LighthouseCard
                key={lighthouse.id}
                lighthouse={lighthouse}
                onToggleVisited={handleToggleVisited}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Anchor className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">No se encontraron faros</h3>
            <p className="text-gray-600">
              Intenta ajustar los filtros o el término de búsqueda
            </p>
          </div>
        )}
      </main>
    </div>
  );
}