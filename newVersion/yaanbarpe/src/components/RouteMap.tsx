
import { useState, useEffect } from 'react';
import { routes, PackageRoute, RoutePoint } from '@/lib/packageData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Navigation, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface RouteMapProps {
  routeId: string;
  onBack: () => void;
}

const RouteMap = ({ routeId, onBack }: RouteMapProps) => {
  const [selectedPoint, setSelectedPoint] = useState<RoutePoint | null>(null);
  const [route, setRoute] = useState<PackageRoute | null>(null);

  useEffect(() => {
    const foundRoute = routes.find(r => r.id === routeId);
    if (foundRoute) {
      setRoute(foundRoute);
      setSelectedPoint(foundRoute.points[0]);
    }
  }, [routeId]);

  if (!route) {
    return (
      <div className="text-center py-8">
        <h3 className="text-xl font-semibold mb-2">Route not found</h3>
        <Button onClick={onBack}>Go Back</Button>
      </div>
    );
  }

  const getTypeIcon = (type: RoutePoint['type']) => {
    switch (type) {
      case 'temple': return '🏛️';
      case 'beach': return '🏖️';
      case 'cultural': return '🎭';
      case 'culinary': return '🍽️';
      case 'heritage': return '🏛️';
      default: return '📍';
    }
  };

  const getTypeColor = (type: RoutePoint['type']) => {
    switch (type) {
      case 'temple': return 'bg-orange-100 text-orange-800';
      case 'beach': return 'bg-blue-100 text-blue-800';
      case 'cultural': return 'bg-purple-100 text-purple-800';
      case 'culinary': return 'bg-green-100 text-green-800';
      case 'heritage': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{route.name}</h2>
          <p className="text-muted-foreground">{route.description}</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          ← Back to Packages
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Placeholder */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="w-5 h-5" />
                Interactive Route Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-96 flex items-center justify-center border-2 border-dashed border-blue-200">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-blue-600 mb-2">Interactive Map</h3>
                  <p className="text-blue-500 mb-4">Distance: {route.totalDistance}</p>
                  <p className="text-sm text-muted-foreground">
                    Map integration will show route points, distances, and navigation
                  </p>
                </div>
              </div>
              
              {/* Route Points Timeline */}
              <div className="mt-6">
                <h4 className="font-semibold mb-4">Route Timeline</h4>
                <div className="space-y-4">
                  {route.points.map((point, index) => (
                    <motion.div
                      key={point.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedPoint?.id === point.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedPoint(point)}
                    >
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{getTypeIcon(point.type)}</span>
                          <h5 className="font-medium">{point.name}</h5>
                          <Badge className={getTypeColor(point.type)}>
                            {point.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{point.description}</p>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        {point.duration}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selected Point Details */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5" />
                Point Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedPoint ? (
                <motion.div
                  key={selectedPoint.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <img 
                      src={selectedPoint.image} 
                      alt={selectedPoint.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className={getTypeColor(selectedPoint.type)}>
                        {getTypeIcon(selectedPoint.type)} {selectedPoint.type}
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg mb-2">{selectedPoint.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {selectedPoint.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {selectedPoint.duration}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {selectedPoint.coordinates[0].toFixed(4)}, {selectedPoint.coordinates[1].toFixed(4)}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">What to Expect</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Professional guide explanation</li>
                      <li>• Photo opportunities</li>
                      <li>• Cultural insights</li>
                      <li>• Interactive experiences</li>
                    </ul>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Select a point on the route to view details</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Route Statistics */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Route Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Points:</span>
                <span className="font-semibold">{route.points.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Distance:</span>
                <span className="font-semibold">{route.totalDistance}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Est. Duration:</span>
                <span className="font-semibold">
                  {route.points.reduce((total, point) => {
                    const hours = parseInt(point.duration);
                    return total + (isNaN(hours) ? 1 : hours);
                  }, 0)} hours
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RouteMap;
