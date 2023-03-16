import { useEffect, useState } from "react";
import "./Entries.css";

export default function Entries() {
  const [entries, setEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const EntriesPerPage = 10;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://api.publicapis.org/entries");
        const data = await res.json();
        setEntries(data.entries);
        setLoading(false);
      } catch (err) {
        alert("failed to load data");
        console.error(err);
      }
    fetchData()
    }
  },[]);

  if (loading) {
    return <div>Loading...</div>;
  }
  const totalEntries = entries.length;
  const lastEntryIndex = currentPage * EntriesPerPage;
  const firstEntryIndex = lastEntryIndex - EntriesPerPage;
  const currentEntries = entries.slice(firstEntryIndex, lastEntryIndex);
  let totalPages = totalEntries / EntriesPerPage;

  function Ascending() {
    entries.sort((a, b) => a.Description.localeCompare(b.Description));
    setEntries([...entries]);
  }
  function Descending() {
    entries.sort((a, b) => b.Description.localeCompare(a.Description));
    setEntries([...entries]);
  }
  return (
    <div className="entries">
      <div className="buttons">
      <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === totalPages}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <div className="table">
        <table className="my__table">
          <thead>
            <tr>
              <th>API</th>
              <th>Category</th>
              <th>Description
                <button
                  href="#" onClick={Ascending}
                >
                  &#8593;
                </button>
                <button
                  href="#" onClick={Descending}
                >
                  &#8595;
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((entry, index) => (
              <tr key={index}>
                <td>{entry.API}</td>
                <td>{entry.Category}</td>
                <td>{entry.Description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
