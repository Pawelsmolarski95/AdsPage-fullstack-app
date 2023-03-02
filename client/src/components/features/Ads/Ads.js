import Ad from "../Ad/Ad";
import styles from './Ads.module.scss';
const Ads = ({ ads }) => {
  return (
    <section
      className={styles.section}
    >
      {ads.map((ad) => (
        <Ad key={ad._id} {...ad} />
      ))}
    </section>
  );
};

export default Ads;
