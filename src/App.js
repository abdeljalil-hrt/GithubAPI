import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [userInput, setUserInput] = useState('');
  const [followers, setFollowers] = useState('');
  const [avatar, setAvatar] = useState('');
  const [following, setFollowing] = useState('');
  const [repos, setRepos] = useState('');
  const [error, setError] = useState(null);
  const [fetchErr, setFetchErr] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      fetch('https://api.github.com/users/example')
        .then(res => {
          return res.json();
        })
        .then(data => {
          setData(data);
          setLoading(false);
        })
        .catch(err => {
          setFetchErr(err.message)
          setLoading(false)
        })
    }, 2000)

  }, [])

  const setData = ({ name, login, followers, following, public_repos, avatar_url }) => {
    setName(name);
    setUserName(login);
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
  }

  const handleSearch = (e) => {
    setUserInput(e.target.value);
  }

  const handleSubmit = () => {

    fetch(`https://api.github.com/users/${userInput}`)
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          setError("Can not find the user")
        }
        else {
          setData(data);
          setError(null)
        }
      })
  };

  return (
    <div className="App">
      <div className="nav-bar">
        <h2>Github Search</h2>
      </div>

      <div className="searchArea">

        <input placeholder='Github User' onChange={handleSearch} required />
        <button onClick={handleSubmit}>Search</button>

      </div>
      {loading ? <h1 className="error">...Loading</h1> :
        fetchErr ? <h1 className="error">{fetchErr}</h1>
          : error ? <h1 className="error">{error}</h1>
            : <div className="items">

              <img className="img" src={avatar} />
              <div id="content">
                <h3 className="name" name='user'>{name}</h3>
                <div className="underline"></div>
                <h3 className="usname" name='user'>{userName}</h3>
                <div className="underline"></div>
                <p className="followers" name='user'>{followers} Followers</p>
                <div className="underline"></div>
                <p className="repos" name='user'>{repos} Repos</p>
                <div className="underline"></div>
                <p className="following" name='user'>{following} Following</p>
              </div>
            </div>
      }


    </div >

  );
}

export default App;
