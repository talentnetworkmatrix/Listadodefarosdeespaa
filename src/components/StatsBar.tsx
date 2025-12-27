import { Anchor, MapPin, CheckCircle2 } from 'lucide-react';

interface StatsBarProps {
  totalLighthouses: number;
  visitedCount: number;
  regionsCount: number;
}

export function StatsBar({ totalLighthouses, visitedCount, regionsCount }: StatsBarProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Total de Faros</p>
            <p className="text-gray-900 mt-1">{totalLighthouses}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg">
            <Anchor className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Visitados</p>
            <p className="text-gray-900 mt-1">{visitedCount} de {totalLighthouses}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-lg">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Regiones</p>
            <p className="text-gray-900 mt-1">{regionsCount}</p>
          </div>
          <div className="bg-purple-100 p-3 rounded-lg">
            <MapPin className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
}