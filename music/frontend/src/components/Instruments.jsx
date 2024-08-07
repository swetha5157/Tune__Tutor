/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm } from '../redux/searchSlice';
import InstrumentCard from './InstrumentCard';

const Instruments = ({ setCartItem, cartItem }) => {
  const search = useSelector((state) => state.search.searchTerm); // Make sure to access the correct property
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <>
      <div className="search">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Enter the instrument you want..."
            value={search}
            onChange={handleSearchChange}
          />
        </form>
      </div>
      <InstrumentCard setCartItem={setCartItem} cartItem={cartItem} search={search} />
    </>
  );
};

export default Instruments;
