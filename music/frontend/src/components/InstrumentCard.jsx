// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { addtoWishList, removeFromWishList } from '../redux/wishlistSlice';
import { instruments } from '../data';
import { Link } from 'react-router-dom';
import { setSelectedCategory } from '../redux/searchSlice';
import '../App.css';

const InstrumentCard = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.searchTerm);
  const selectedCategory = useSelector((state) => state.search.selectedCategory);
  const itemsInCart = useSelector((state) => state.cart.items || []);
  const itemsInWish = useSelector((state) => state.wishlist.items || []);

  const addReduxCart = (id) => {
    const instrument = instruments.find((instrument) => instrument.id === id);
    dispatch(addToCart(instrument));
    console.log('Added to cart:', instrument);
  };

  const isInWish = (i) => itemsInWish.some((item) => item.id === i.id);
  const isInCart = (id) => itemsInCart.some((item) => item.id === id);

  const addWish = (i) => {
    if (isInWish(i)) {
      dispatch(removeFromWishList(i));
      console.log('Removed from wishlist:', i);
    } else {
      dispatch(addtoWishList(i));
      console.log('Added to wishlist:', i);
    }
  };

  const handleCategoryClick = (category) => {
    dispatch(setSelectedCategory(category));
  };

  const filteredInstruments = instruments.filter((instrument) =>
    (selectedCategory === '' || instrument.category.toLowerCase() === selectedCategory.toLowerCase()) &&
    instrument.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className='filter'>
        <div className='cat-items'>
          <button onClick={() => handleCategoryClick('')}>All</button>
          <button onClick={() => handleCategoryClick('Guitars')}>
            <img src='src/assets/guitar-instrument.png' alt='Guitar' />
          </button>
          <button onClick={() => handleCategoryClick('Drums')}>
            <img src='src/assets/drum.png' alt='Drum' />
          </button>
          <button onClick={() => handleCategoryClick('Keyboards')}>
            <img src='src/assets/keyboard.png' alt='Keyboard' />
          </button>
          <button onClick={() => handleCategoryClick('Ukuleles')}>
            <img src='src/assets/ukuele.png' alt='Ukulele' />
          </button>
          <button onClick={() => handleCategoryClick('Cymbals')}>
            <img src='src/assets/cymbals.png' alt='Cymbals' />
          </button>
          <button onClick={() => handleCategoryClick('Violins')}>
            <img src='src/assets/violin.png' alt='Violin' />
          </button>
          <button onClick={() => handleCategoryClick('Synthesizers')}>
            <img src='src/assets/synthesizer.png' alt='Synthesizer' />
          </button>
          <button onClick={() => handleCategoryClick('Microphones')}>
            <img src='src/assets/microphone.png' alt='Microphone' />
          </button>
        </div>
      </div>

      <div className="main">
        {filteredInstruments.length > 0 ? (
          filteredInstruments.map((i) => (
            <div className="card" key={i.id}>
              <img src={i.image_url} alt={i.name} />
              <Link to={"/product/" + i.id}><h2>{i.name}</h2></Link>
              <h3>{i.category}</h3>
              <p>{i.description}</p>
              <h5>{i.pricing}</h5>
              <div className='rr'>
                <h3>🌟: {i.rating}</h3>
                <h3>🔖: {i.review_count}</h3>
              </div>
              <button className={isInWish(i) ? 'unwish' : 'wish'} onClick={() => addWish(i)}>
                <img 
                  src={!isInWish(i) ? 'src/assets/heart.png' : 'src/assets/filled.png'} 
                  height={40} 
                  width={40} 
                  alt='Heart' 
                />
              </button>
              {isInCart(i.id) ? (
                <Link to="/cart">
                  <button className="goto-cart">
                    <img src='src/assets/bulk-buying.png' height={40} width={40} alt='Cart' />
                  </button>
                </Link>
              ) : (
                <button className="redux-btn" onClick={() => addReduxCart(i.id)}>
                  <img src='src/assets/shopping-cart.png' height={40} width={40} alt='Add to Cart' />
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No instruments found.</p>
        )}
      </div>
    </>
  );
};

export default InstrumentCard;
