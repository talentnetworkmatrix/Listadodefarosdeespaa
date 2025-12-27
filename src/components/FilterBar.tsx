interface FilterBarProps {
  selectedRegion: string;
  selectedStatus: string;
  onRegionChange: (region: string) => void;
  onStatusChange: (status: string) => void;
  regions: string[];
}

export function FilterBar({
  selectedRegion,
  selectedStatus,
  onRegionChange,
  onStatusChange,
  regions
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <label htmlFor="region" className="block text-sm text-gray-700 mb-1">
          Región
        </label>
        <select
          id="region"
          value={selectedRegion}
          onChange={(e) => onRegionChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        >
          <option value="">Todas las regiones</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label htmlFor="status" className="block text-sm text-gray-700 mb-1">
          Estado
        </label>
        <select
          id="status"
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        >
          <option value="">Todos los estados</option>
          <option value="active">Activo</option>
          <option value="inactive">Inactivo</option>
          <option value="museum">Museo</option>
        </select>
      </div>
    </div>
  );
}
