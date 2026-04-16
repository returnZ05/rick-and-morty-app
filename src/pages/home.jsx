import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then(res => res.json())
      .then(data => setCharacters(data.results));
  }, []);

  return (
    <div className="home-container">
      <header>
        <h1>Rick & Morty Universe</h1>
        <p>Select a character to see their profile</p>
      </header>

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
            {characters.map((char) => (
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
      </div>
    </div>
  );
};

export default Home;