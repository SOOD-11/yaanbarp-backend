
import { useState } from 'react';
import { packages, packageTiers, Package } from '@/lib/packageData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Check, X, Clock, Users, MapPin, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface PackageComparisonProps {
  preselectedPackages?: string[];
  onPackageSelect: (pkg: Package) => void;
}

const PackageComparison = ({ preselectedPackages = [], onPackageSelect }: PackageComparisonProps) => {
  const [selectedPackages, setSelectedPackages] = useState<string[]>(preselectedPackages);

  const togglePackage = (packageId: string) => {
    setSelectedPackages(prev => 
      prev.includes(packageId) 
        ? prev.filter(id => id !== packageId)
        : prev.length < 3 
          ? [...prev, packageId] 
          : prev
    );
  };

  const comparisonPackages = packages.filter(pkg => selectedPackages.includes(pkg.id));

  const formatPrice = (min: number, max: number) => {
    if (min === max) return `₹${min.toLocaleString()}`;
    return `₹${min.toLocaleString()} - ₹${max.toLocaleString()}`;
  };

  const getFeatureValue = (pkg: Package, feature: string) => {
    switch (feature) {
      case 'Duration': return pkg.duration;
      case 'Group Size': return pkg.groupSize;
      case 'Difficulty': return pkg.difficulty;
      case 'Transportation': return pkg.includes.includes('Transportation') || pkg.includes.includes('Private transportation');
      case 'Meals': return pkg.includes.some(item => item.toLowerCase().includes('meal') || item.toLowerCase().includes('lunch') || item.toLowerCase().includes('dinner'));
      case 'Accommodation': return pkg.includes.some(item => item.toLowerCase().includes('accommodation'));
      case 'Guide': return pkg.includes.some(item => item.toLowerCase().includes('guide'));
      case 'Workshops': return pkg.includes.some(item => item.toLowerCase().includes('workshop'));
      case 'Cultural Shows': return pkg.includes.some(item => item.toLowerCase().includes('show') || item.toLowerCase().includes('performance'));
      default: return false;
    }
  };

  const comparisonFeatures = [
    'Duration',
    'Group Size', 
    'Difficulty',
    'Transportation',
    'Meals',
    'Accommodation',
    'Guide',
    'Workshops',
    'Cultural Shows'
  ];

  return (
    <div className="space-y-6">
      {/* Package Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Packages to Compare (Max 3)</CardTitle>
          <p className="text-muted-foreground">Choose up to 3 packages to compare side by side</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {packages.map(pkg => (
              <div key={pkg.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                <Checkbox
                  checked={selectedPackages.includes(pkg.id)}
                  onCheckedChange={() => togglePackage(pkg.id)}
                  disabled={!selectedPackages.includes(pkg.id) && selectedPackages.length >= 3}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={packageTiers[pkg.tier].color}>
                      {packageTiers[pkg.tier].icon}
                    </Badge>
                    {pkg.featured && <Star className="w-4 h-4 text-yellow-500" />}
                  </div>
                  <h4 className="font-medium text-sm">{pkg.title}</h4>
                  <p className="text-xs text-muted-foreground">{formatPrice(pkg.price.min, pkg.price.max)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      {comparisonPackages.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Package Comparison</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 min-w-[200px]">Feature</th>
                    {comparisonPackages.map(pkg => (
                      <th key={pkg.id} className="text-center p-4 min-w-[250px]">
                        <div className="space-y-2">
                          <img 
                            src={pkg.image} 
                            alt={pkg.title}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <Badge className={packageTiers[pkg.tier].color}>
                            {packageTiers[pkg.tier].icon} {packageTiers[pkg.tier].name}
                          </Badge>
                          <h3 className="font-semibold">{pkg.title}</h3>
                          <p className="text-tulu-green font-semibold">
                            {formatPrice(pkg.price.min, pkg.price.max)}
                          </p>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map(feature => (
                    <tr key={feature} className="border-b">
                      <td className="p-4 font-medium">{feature}</td>
                      {comparisonPackages.map(pkg => {
                        const value = getFeatureValue(pkg, feature);
                        return (
                          <td key={pkg.id} className="p-4 text-center">
                            {typeof value === 'boolean' ? (
                              value ? (
                                <Check className="w-5 h-5 text-green-500 mx-auto" />
                              ) : (
                                <X className="w-5 h-5 text-red-500 mx-auto" />
                              )
                            ) : (
                              <span className="text-sm">{value}</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  
                  {/* Highlights */}
                  <tr className="border-b">
                    <td className="p-4 font-medium">Key Highlights</td>
                    {comparisonPackages.map(pkg => (
                      <td key={pkg.id} className="p-4">
                        <ul className="text-sm space-y-1">
                          {pkg.highlights.slice(0, 3).map((highlight, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-green-500 mr-1">•</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Action Row */}
                  <tr>
                    <td className="p-4 font-medium">Actions</td>
                    {comparisonPackages.map(pkg => (
                      <td key={pkg.id} className="p-4">
                        <div className="space-y-2">
                          <Button 
                            onClick={() => onPackageSelect(pkg)}
                            className="w-full bg-tulu-blue hover:bg-tulu-green"
                          >
                            View Details
                          </Button>
                          <Button variant="outline" className="w-full">
                            Book Now
                          </Button>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {comparisonPackages.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-muted-foreground">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-lg font-semibold mb-2">No packages selected</h3>
              <p>Select packages above to see a detailed comparison</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PackageComparison;
