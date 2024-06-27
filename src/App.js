import { useState } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import data from "./assets/data.json";
import JobCard from "./components/JobCard/JobCardComponent";
import logo from "./assets/images/Ofertaz.svg";
import SearchCard from "./components/SearchCard/SearchCardComponent";

function App() {
  const [searchText, setSearchText] = useState("");
  const tags = useSelector((state) => state.tags);

  // Filter Tags
  const filters = tags.length > 0 ? tags : [];
  let filteredArr = data.filter((user) => {
    // Concat keys and make tags
    const tags = [user.role, user.level].concat(user.tools, user.languages);
    const matchesTags = filters.every(f => tags.includes(f));
    const matchesSearchText = user.position.toLowerCase().includes(searchText.toLowerCase()) ||
      user.company.toLowerCase().includes(searchText.toLowerCase()) ||
      tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase()));
    return matchesTags && matchesSearchText;
  });

  return (
    <div className="App">
      <nav className="navbar">
        <img className="navbar__logo" src={logo} alt="Ofertaz Logo" />
      </nav>
      <main>
        <SearchCard setSearchText={setSearchText} />
        {filteredArr.map((job) =>
          <JobCard
            key={job.id}
            new={job.new}
            featured={job.featured}
            postedAt={job.postedAt}
            contract={job.contract}
            location={job.location}
            logo={job.logo}
            company={job.company}
            role={job.role}
            position={job.position}
            level={job.level}
            tools={job.tools}
            languages={job.languages}
          />
        )}
        <div className="attribution">
          Coded by <a href="https://github.com/AndresBojaca/">@AndresBojaca</a>.
        </div>
      </main>
    </div>
  );
}

export default App;
