import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [avilablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        })


      } catch (error) {
        setError({ message: error.message || 'Could not fetch places, please try again later.' });
        setIsFetching(false);
      }
    };
    fetchPlaces();

    // way 2 for fetching data
    // fetch('http://localhost:3000/places')
    //   .then(res => res.json())
    //   .then((resData) => {
    //     setAvailablePlaces(resData.places);
    //   })
  }, []);

  if (error) {
    return <Error title="An error occured!" message={error.message} />
  }

  return (
    <Places
      title="Available Places"
      places={avilablePlaces}
      isLoading={isFetching}
      loadingText="Fetching Place Data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
