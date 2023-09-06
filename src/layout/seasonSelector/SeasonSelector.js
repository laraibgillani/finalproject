import "./seasonSelector.css";
const SeasonSelector = ({ seasons, onSelect }) => {
  const handleChange = (event) => {
    const selectedSeason = event.target.value;
    onSelect(selectedSeason);
  };

  return (
    <div>
      <select className="select-season" id="season" onChange={handleChange}>
        <option value="">All Seasons</option>
        {seasons.map((season) => (
          <option key={season} value={season}>
            {season}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SeasonSelector;
