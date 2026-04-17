import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then(res => {
        if (!res.ok) throw new Error("Hálózati hiba");
        return res.json();
      })
      .then(data => {
        console.log("Megérkezett az oldal:", page, data.results); 
        setCharacters(data.results);
        setTotalPages(data.info.pages);
      })
      .catch(err => {
        console.error("Hiba történt:", err);
      });
  }, [page]);


  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <header>
        <h1>Rick & Morty Universe</h1>
        <p>Select a character to see their profile</p>
      </header>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ 
            padding: '10px', 
            width: '100%', 
            maxWidth: '300px', 
            borderRadius: '8px', 
            border: '1px solid #ddd' 
          }}
        />
      </div>

      <div className="pagination" style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setPage(p => p - 1)} 
          disabled={page === 1}
        >
          Previous
        </button>
        <span style={{ margin: '0 15px' }}>Page {page} of {totalPages}</span>
        <button 
          onClick={() => setPage(p => p + 1)} 
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>

      <div className="table-wrapper">
        <table className="character-table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Species</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCharacters.map((char) => (
              <tr key={char.id}>
                <td>
                  <img src={char.image} alt={char.name} className="avatar-img" />
                </td>
                <td>
                  <Link to={`/character/${char.id}`} className="char-link">
                    {char.name}
                  </Link>
                </td>
                <td>{char.species}</td>
                <td>
                  <span className={`status-badge ${char.status.toLowerCase()}`}>
                    {char.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredCharacters.length === 0 && (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>No characters found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;