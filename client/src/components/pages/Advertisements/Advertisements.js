import { getAllAds } from "../../../redux/adsRedux";
import { useSelector } from 'react-redux';

const Advertisements = () => {
  
  const ads = useSelector(getAllAds);
  
  console.log(ads)
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};
export default Advertisements;
