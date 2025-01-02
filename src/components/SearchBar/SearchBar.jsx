import { Search } from 'lucide-react';
import './SearchBar.css'
import PropTypes from 'prop-types'

const SearchBar = ({ value, onChange, disabled }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder="Search celestial objects..."
        className={`search-input ${disabled ? 'disabled' : ''}`}
      />
      <Search className="search-icon" />
    </div>
  );
};

SearchBar.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
}

export default SearchBar;