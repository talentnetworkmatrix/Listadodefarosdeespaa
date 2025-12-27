import { Lighthouse } from '../types/lighthouse';
import { MapPin, Calendar, Ruler, CheckCircle2, Circle } from 'lucide-react';

interface LighthouseCardProps {
  lighthouse: Lighthouse;
  onToggleVisited: (id: string) => void;
}

export function LighthouseCard({ lighthouse, onToggleVisited }: LighthouseCardProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    museum: 'bg-blue-100 text-blue-800'
  };

  const statusLabels = {
    active: 'Activo',
    inactive: 'Inactivo',
    museum: 'Museo'
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={lighthouse.imageUrl}
          alt={lighthouse.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs ${statusColors[lighthouse.status]}`}>
            {statusLabels[lighthouse.status]}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-gray-900">{lighthouse.name}</h3>
          <button
            onClick={() => onToggleVisited(lighthouse.id)}
            className="ml-2 flex-shrink-0 text-gray-400 hover:text-green-600 transition-colors"
            title={lighthouse.visited ? 'Marcar como no visitado' : 'Marcar como visitado'}
          >
            {lighthouse.visited ? (
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            ) : (
              <Circle className="w-6 h-6" />
            )}
          </button>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{lighthouse.location}, {lighthouse.province}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>Construido en {lighthouse.yearBuilt}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Ruler className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{lighthouse.height} metros de altura</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm line-clamp-3">
          {lighthouse.description}
        </p>
      </div>
    </div>
  );
}
