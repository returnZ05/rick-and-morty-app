import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(res => res.json())
      .then(data => setCharacter(data));
  }, [id]);

  if (!character) return null;

  return (
    <div className="profile-wrapper">
      <button className="back-btn" onClick={() => navigate(-1)}>
        Back to the table
      </button>
      
      <div className="profile-card-modern">
        <div className="profile-header">
          <img src={character.image} alt={character.name} className="profile-img" />
          <h1>{character.name}</h1>
          <span className={`status-badge ${character.status.toLowerCase()}`}>
            {character.status}
          </span>
        </div>

        <div className="profile-details">
          <div className="detail-item">
            <label>Species</label>
            <p>{character.species}</p>
          </div>
          <div className="detail-item">
            <label>Gender</label>
            <p>{character.gender}</p>
          </div>
          <div className="detail-item">
            <label>Origin</label>
            <p>{character.origin?.name}</p>
          </div>
          <div className="detail-item">
            <label>Last Known Location</label>
            <p>{character.location?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;