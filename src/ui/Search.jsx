import PropTypes from 'prop-types';

const Search = ({placeholder = 'Search...', query, setQuery, wrapperClass, onChange}) => {
    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setQuery(inputValue); // Cập nhật state query trong component cha
        if (onChange) {
          onChange(inputValue); // Gọi hàm onChange được truyền từ component cha
        }
      };
    return (
        <div className={`relative ${wrapperClass || ''}`}>
            <input className="field-input !pr-[60px]"
                   type="search"
                   placeholder={placeholder}
                   value={query}
                   onChange={handleInputChange}/>
            <button className={`field-btn text-red !right-[40px] transition ${query ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setQuery('')}
                    aria-label="Clear all">
                <i className="icon-xmark-regular"/>
            </button>
            <button className="field-btn icon" aria-label="Search">
                <i className="icon-magnifying-glass-solid"/>
            </button>
        </div>
    )
}

Search.propTypes = {
    placeholder: PropTypes.string,
    query: PropTypes.string,
    setQuery: PropTypes.func,
    wrapperClass: PropTypes.string
}

export default Search