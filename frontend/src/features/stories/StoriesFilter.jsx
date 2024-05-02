import Filter from "../../ui/Filter.jsx";

function StoriesFilter() {
  return (
    <Filter
      filterField="category"
      options={[
        { value: "all", label: "All" },
        { value: "food", label: "food" },
        { value: "health-and-fitness", label: "health and fitness" },
        { value: "travel", label: "travel" },
        { value: "movie", label: "movie" },
        { value: "education", label: "education" },
      ]}
    />
  );
}

export default StoriesFilter;
