import Ad from "../Ad/Ad";

const Ads = ({ ads }) => {
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: 20,
        marginTop: "3rem",
      }}
    >
      {ads.map((ad) => (
        <Ad key={ad._id} {...ad} />
      ))}
    </section>
  );
};

export default Ads;
