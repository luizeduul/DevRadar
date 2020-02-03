import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

//import api from '../../services/api'; fix issue later
import Axios from "axios";

import './styles.css'

function DevUpdate({ history }) {
  const [devEdit, setDevEdit] = useState(['']);
  const [techs, setTechs] = useState('');
  const [bio, setBio] = useState('');
  const [name, setName] = useState('');

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const pathname = window.location.pathname;
  pathname.split('/devs/');

  useEffect(() => {
    async function loadData() {
      const response = await Axios.get(`http://localhost:3333${pathname}`);
      setDevEdit(response.data);
    }
    loadData();
  }, []);

  let dev = {
    name: devEdit.name,
    bio: devEdit.bio,
    techs: [devEdit.techs],
    location: {
      coordinates: [
        latitude,
        longitude
      ]
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000
      }
    )
  }, []);

  async function handleUpdateDev(e) {
    e.preventDefault();
    try {
      await Axios.put(`http://localhost:3333${pathname}`, {
        name,
        bio,
        techs,
        latitude,
        longitude,
      });

    } catch (error) {
      console.log("Ocorreu um erro");
    }
    history.push('/');
  }

  return (
    <div className="container">
      <form onSubmit={handleUpdateDev}>
        <div>
          <h1 id="updateDev" htmlFor="updateDev">Alteração de dados</h1>
        </div>
        <div>
          <img id="avatar_url" src={devEdit.avatar_url} alt={`img_${devEdit.github_username}`} />
        </div>
        <div>
          <h1 id="github_username">{devEdit.github_username}</h1>
        </div>

        <div className="input-block">
          <label htmlFor="name">Nome</label>
          <input
            name="name"
            id="name"
            required
            defaultValue={dev.name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="bio">Bio</label>
          <input
            name="bio"
            id="bio"
            required
            defaultValue={dev.bio}
            onChange={e => setBio(e.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="techs">Tecnologias</label>
          <input
            name="techs"
            id="techs"
            required
            value={dev.techs}
            onChange={e => setTechs(e.target.value)}
          />
        </div>

        <div className="input-group">
          <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input
              type="number"
              name="latitude"
              id="latitude"
              required
              value={latitude}
              onChange={e => setLatitude(e.target.value)} />
          </div>

          <div className="input-block">
            <label htmlFor="longitude">Longitude</label>
            <input
              type="number"
              name="longitude"
              id="longitude"
              required
              value={longitude}
              onChange={e => setLongitude(e.target.value)} />
          </div>
        </div>
        <button id="buttonSave">Salvar</button>
        <Link to="/"><button id="buttonExit">Cancelar</button></Link>
      </form>
    </div>
  )
}

export default DevUpdate;