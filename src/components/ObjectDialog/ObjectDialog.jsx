import { Info, Loader2, X } from 'lucide-react';
import './ObjectDialog.css'
import PropTypes from 'prop-types';

const ObjectsDialog = ({
  isOpen,
  onClose,
  onOpen,
  objects,
  selectedObject,
  onSelectObject,
  loading,
  error,
  onRetry,
}) => {
  if (!isOpen) {
    return (
      <button className="toggle-dialog-btn" onClick={onOpen}>
        <Info size={24} />
      </button>
    );
  }

  if (error) {
    return (
      <div className="dialog-error">
        <p>{error}</p>
        <button onClick={onRetry}>Retry</button>
      </div>
    );
  }

  return (
    <div className="floating-dialog">
      <div className="dialog-content">
        <div className="dialog-header">
          <h2 className="dialog-title">Celestial Objects</h2>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        {loading ? (
          <div className="loading-container">
            <Loader2 className="loading-spinner" size={24} />
          </div>
        ) : (
          <ul className="object-list">
            {objects.map((object) => (
              <li
                key={object.name}
                className={`object-item ${selectedObject?.name === object.name ? 'selected' : ''}`}
                onClick={() => onSelectObject(object)}
              >
                <div className="object-header">
                  <div className="object-info">
                    <div 
                      className="object-color-dot"
                      style={{ background: object.color }}
                    />
                    <span className="object-name">{object.name}</span>
                  </div>
                  <Info size={16} className="info-icon" />
                </div>
                {selectedObject?.name === object.name && (
                  <p className="object-description">
                    {object.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

ObjectsDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onOpen: PropTypes.func.isRequired,
    objects: PropTypes.array.isRequired,
    selectedObject: PropTypes.object,
    onSelectObject: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    onRetry: PropTypes.func.isRequired,
}

export default ObjectsDialog;