import { useState, useEffect } from 'react';
import SolarSystem from './components/SolarSystem/SolarSystem';
import SearchBar from './components/SearchBar/SearchBar';
import ObjectsDialog from './components/ObjectDialog/ObjectDialog';
import { MOCK_CELESTIAL_OBJECTS } from './data/mockData';
import './App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [celestialObjects, setCelestialObjects] = useState(MOCK_CELESTIAL_OBJECTS);
  const [loading, setLoading] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCelestialObjects(MOCK_CELESTIAL_OBJECTS);
    } catch (error) {
      setError('Failed to load celestial objects. Please try again.');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (!query.trim()) {
      setCelestialObjects(MOCK_CELESTIAL_OBJECTS);
      setSelectedObject(null);
      return;
    }

    const filtered = MOCK_CELESTIAL_OBJECTS.filter(obj => 
      obj.name.toLowerCase().includes(query) ||
      obj.description.toLowerCase().includes(query)
    );
    
    setCelestialObjects(filtered);
    
    if (filtered.length > 0) {
      setSelectedObject(filtered[0]);
    } else {
      setSelectedObject(null);
    }
  };

  const handleSelectObject = (object) => {
    setSelectedObject(object);
    if (window.innerWidth < 768) {
      setIsDialogOpen(false);
    }
  };

  const handleRetry = () => {
    fetchData();
  };

  return (
    <div className="app">
      <div className="header">
        <h1 className="app-title">Solar System Explorer</h1>
        <SearchBar 
          value={searchQuery}
          onChange={handleSearch}
          disabled={loading}
        />
      </div>

      <SolarSystem 
        selectedObject={selectedObject}
        error={error}
        onRetry={handleRetry}
      />

      <ObjectsDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onOpen={() => setIsDialogOpen(true)}
        objects={celestialObjects}
        selectedObject={selectedObject}
        onSelectObject={handleSelectObject}
        loading={loading}
        error={error}
        onRetry={handleRetry}
      />

      {error && (
        <div className="error-toast">
          <p>{error}</p>
          <button onClick={handleRetry}>Retry</button>
        </div>
      )}
    </div>
  );
};

export default App;