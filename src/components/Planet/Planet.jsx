import './Planet.css';
import { calculateOrbitPosition, getZIndex } from '../../utils/calculations';
import PropTypes from 'prop-types';

const Planet = ({ 
  size, 
  color, 
  orbitRadius = 0, 
  rotation, 
  speed = 1, 
  isSelected,
  name,
  isSun = false 
}) => {
  const angle = (rotation * speed) * (Math.PI / 180);
  const { x, z } = calculateOrbitPosition(angle, orbitRadius);
  
  return (
    <div
      className={`planet ${isSelected ? 'selected' : ''} ${isSun ? 'sun' : ''}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: isSun 
          ? 'translate(-50%, -50%)' 
          : `translate3d(${x}px, 0, ${z}px) translate(-50%, -50%)`,
        zIndex: getZIndex(z, isSun),
      }}
    >
      <div 
        className="planet-body"
        style={{ background: color }}
      />
      {isSelected && (
        <div className="planet-label">
          <span className="planet-label-text">{name}</span>
        </div>
      )}
    </div>
  );
};
Planet.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  orbitRadius: PropTypes.number,
  rotation: PropTypes.number.isRequired,
  speed: PropTypes.number,
  isSelected: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  isSun: PropTypes.bool,
};

export default Planet;