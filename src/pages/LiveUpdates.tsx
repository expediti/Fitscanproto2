import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { AlertTriangle, Activity, Shield, TrendingUp, Calendar, Globe, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HealthUpdate {
  id: string;
  title: string;
  description: string;
  category: 'covid' | 'vaccination' | 'outbreak' | 'policy' | 'esanjeevani' | 'who_guidelines';
  priority: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  publishedAt: Date;
  location?: string;
  actionRequired?: boolean;
  sourceUrl?: string;
}

const LiveUpdates = () => {
  const [updates, setUpdates] = useState<HealthUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Mock data for hackathon demo (replace with real API later)
  const fetchLiveHealthData = async () => {
    try {
      setLoading(true);
      setConnected(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock health updates data for demo
      const mockUpdates: HealthUpdate[] = [
        {
          id: `live_${Date.now()}_1`,
          title: "eSanjeevani Crosses 34 Crore Consultations Milestone",
          description: "National telemedicine service achieves historic milestone serving patients across 176,534 Ayushman Arogya Mandirs with 57% women beneficiaries. Platform continues to bridge healthcare gaps in rural areas.",
          category: 'esanjeevani',
          priority: 'medium',
          source: 'Ministry of Health & Family Welfare',
          publishedAt: new Date(Date.now() - Math.random() * 600000), // Random time within last 10 minutes
          location: 'National',
          actionRequired: false,
          sourceUrl: 'https://esanjeevani.mohfw.gov.in/'
        },
        {
          id: `live_${Date.now()}_2`,
          title: "Dengue Alert: 47% Increase in Cases This Week",
          description: "Health authorities report significant rise in dengue cases across Maharashtra, Karnataka, and Delhi. Citizens advised to eliminate stagnant water sources and use preventive measures.",
          category: 'outbreak',
          priority: 'high',
          source: 'IDSP - Disease Surveillance Programme',
          publishedAt: new Date(Date.now() - Math.random() * 1800000), // Random time within last 30 minutes
          location: 'Maharashtra, Karnataka, Delhi',
          actionRequired: true
        },
        {
          id: `live_${Date.now()}_3`,
          title: "Updated COVID-19 Vaccination Guidelines for 60+ Age Group",
          description: "Health Ministry releases new vaccination schedule for senior citizens with updated booster recommendations. Free vaccination available at all government health centers.",
          category: 'vaccination',
          priority: 'medium',
          source: 'MOHFW Immunization Division',
          publishedAt: new Date(Date.now() - Math.random() * 3600000), // Random time within last hour
          location: 'National',
          actionRequired: false
        },
        {
          id: `live_${Date.now()}_4`,
          title: "WHO Updates Global Health Emergency Preparedness Guidelines",
          description: "World Health Organization releases updated emergency preparedness protocols for healthcare systems worldwide. India aligns national guidelines with WHO standards.",
          category: 'who_guidelines',
          priority: 'medium',
          source: 'World Health Organization',
          publishedAt: new Date(Date.now() - Math.random() * 7200000), // Random time within last 2 hours
          location: 'Global',
          actionRequired: false,
          sourceUrl: 'https://www.who.int/'
        },
        {
          id: `live_${Date.now()}_5`,
          title: "National Digital Health Mission Updates",
          description: "NDHM achieves 50 crore ABHA registrations. Digital health records integration expanded to 25,000+ hospitals nationwide.",
          category: 'policy',
          priority: 'low',
          source: 'National Health Authority',
          publishedAt: new Date(Date.now() - Math.random() * 10800000), // Random time within last 3 hours
          location: 'National',
          actionRequired: false
        }
      ];

      // Sort by priority and time
      const sortedUpdates = mockUpdates.sort((a, b) => {
        const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority] || 
               new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      });

      setUpdates(sortedUpdates);
      setLastUpdate(new Date());
      setLoading(false);
      
    } catch (error) {
      console.error('Error fetching health data:', error);
      setConnected(false);
      setLoading(false);
    }
  };

  // Auto-refresh every 2 minutes
  useEffect(() => {
    fetchLiveHealthData();
    
    const interval = setInterval(fetchLiveHealthData, 120000); // 2 minutes
    return () => clearInterval(interval);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'covid': return <Activity className="h-4 w-4" />;
      case 'vaccination': return <Shield className="h-4 w-4" />;
      case 'outbreak': return <AlertTriangle className="h-4 w-4" />;
      case 'esanjeevani': return <TrendingUp className="h-4 w-4" />;
      case 'who_guidelines': return <Globe className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const criticalAlerts = updates.filter(update => update.priority === 'critical');

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20 px-4 py-6">
          <div className="w-full max-w-7xl mx-auto text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-muted-foreground">Loading live health updates...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 px-4 py-6">
        <div className="w-full max-w-7xl mx-auto">
          {/* Live Status Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                🏥 Live Health Updates
              </h1>
              <p className="text-muted-foreground">
                Real-time health information from Government of India & WHO
              </p>
            </div>
            
            {/* Live Indicator */}
            <div className="flex items-center gap-3 bg-card p-3 rounded-lg shadow-md border">
              <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <div className="text-sm">
                <div className="font-semibold text-foreground">
                  {connected ? '🔴 LIVE' : 'Disconnected'}
                </div>
                <div className="text-muted-foreground">
                  Updated: {lastUpdate.toLocaleTimeString()}
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={fetchLiveHealthData}
                disabled={loading}
                className="ml-2"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Critical Alerts Banner */}
          {criticalAlerts.length > 0 && (
            <div className="mb-6 bg-red-600 text-white p-4 rounded-lg shadow-lg animate-pulse">
              <div className="flex items-center justify-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-semibold text-lg">🚨 CRITICAL HEALTH ALERT</span>
              </div>
              <p className="text-center mt-2">{criticalAlerts[0].title}</p>
              <div className="text-center mt-3">
                <Button variant="secondary" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          )}

          {/* Live Updates Feed */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {updates.map((update, index) => (
              <Card 
                key={update.id} 
                className={`border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-300 ${
                  index === 0 ? 'ring-2 ring-blue-200 bg-blue-50/50 dark:bg-blue-950/20' : ''
                }`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <Badge 
                      variant="outline" 
                      className={`${getPriorityColor(update.priority)} text-white border-none`}
                    >
                      <div className="flex items-center gap-1">
                        {getCategoryIcon(update.category)}
                        {update.category.toUpperCase().replace('_', ' ')}
                      </div>
                    </Badge>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">
                        {new Date(update.publishedAt).toLocaleTimeString()}
                      </div>
                      {index === 0 && (
                        <div className="text-xs text-green-600 font-medium animate-pulse">
                          • JUST NOW
                        </div>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{update.title}</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {update.description}
                  </p>
                  
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs text-blue-600 font-medium">{update.source}</span>
                    {update.actionRequired && (
                      <Badge variant="destructive" className="text-xs">
                        Action Required
                      </Badge>
                    )}
                  </div>
                  
                  {update.location && (
                    <div className="mb-3 text-xs text-muted-foreground">
                      📍 {update.location}
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Read More
                    </Button>
                    {update.sourceUrl && (
                      <Button size="sm" variant="ghost" asChild>
                        <a href={update.sourceUrl} target="_blank" rel="noopener noreferrer">
                          Source
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Data Sources Footer */}
          <div className="mt-8 p-4 bg-muted rounded-lg border">
            <div className="text-sm text-muted-foreground">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">📊 Data Sources:</p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={fetchLiveHealthData}
                  disabled={loading}
                >
                  🔄 Refresh Data
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                <div>• Ministry of Health & Family Welfare</div>
                <div>• eSanjeevani Platform</div>
                <div>• WHO Health Guidelines</div>
                <div>• Disease Surveillance (IDSP)</div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Updates refresh automatically every 2 minutes • Last refresh: {lastUpdate.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Demo Notice */}
          <div className="mt-6 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Demo Mode:</strong> This shows sample health updates for hackathon demonstration. 
              In production, this will connect to live government health APIs and real-time data feeds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveUpdates;
