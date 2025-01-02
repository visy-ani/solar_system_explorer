import React from 'react';
import Planet from '../Planet/Planet'
import { useAnimation } from '../../hooks/useAnimation';
import { MOCK_CELESTIAL_OBJECTS } from '../../data/mockData';
import './SolarSystem.css';
import PropTypes from 'prop-types';

const SolarSystem = ({ selectedObject , error, onRetry}) => {
  const rotation = useAnimation();
  
  const sun = MOCK_CELESTIAL_OBJECTS.find(obj => obj.type === "star");
  const planets = MOCK_CELESTIAL_OBJECTS.filter(obj => obj.type === "planet");

  if (error) {
    return (
      <div className="solar-system error-state">
        <p>Failed to load solar system</p>
        <button onClick={onRetry}>Retry</button>
      </div>
    );
  }

  return (
    <div className="solar-system">
      <div className="star-background">
        {[...Array(200)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.5,
            }}
          />
        ))}
      </div>

      <Planet
        {...sun}
        isSun={true}
        isSelected={selectedObject?.name === sun.name}
      />

      {planets.map((planet) => (
        <React.Fragment key={planet.name}>
          <div
            className="orbit-ring"
            style={{
              width: planet.orbitRadius * 2,
              height: planet.orbitRadius * 2,
            }}
          />
          <Planet
            {...planet}
            rotation={rotation}
            isSelected={selectedObject?.name === planet.name}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

SolarSystem.propTypes = {
    selectedObject: PropTypes.object,
    error: PropTypes.string,
    onRetry: PropTypes.func,
};

export default SolarSystem;