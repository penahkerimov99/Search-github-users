import { useState, useEffect } from 'react';
import { useRef } from 'react';
import './App.css';
import axios from "axios";
import icon from './img/icon7.png'

function App() {

  const [username, setUsername] = useState("");

  let ref = useRef(null)


  var url1 = `https://api.github.com/users/${username}`
  const url2 = `https://api.github.com/users/${username}/repos`


  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url1, {
        headers: {
          "Authorization": `Bearer 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`
        }
      });
      const jsonData = await response.json();
      setData(jsonData);
    }
    fetchData();
  }, [url1]);



  const [repo, setRepo] = useState({});

  useEffect(() => {
    async function fetchRepo() {
      const response2 = await fetch(url2, {
        headers: {
          "Authorization": `Bearer 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`
        }
      });
      const jsonData2 = await response2.json();
      setRepo(jsonData2);
    }
    fetchRepo();
  }, [url2]);



  console.log(repo)


  return (
    <>
      <div className="App">
        <div className='search-section'>
          <h3>Search username</h3>
          <div className='github-icon'>
            <img src={icon} />
          </div>
          <input value={username} ref={ref} onChange={(e) => setUsername(e.target.value)} type='text' />
        </div>
      </div>

      <div className='results'>
        <div className='user-img'>
          <img src={data.avatar_url} />
        </div>
        <h3 className='name-user'>{data.login}</h3>
        <div className='repos'>
          <ul>
            {repo.length > 0 && repo?.map((repoItem, index) => (
              <li key={index}>
                <p>{repoItem.name}</p>
                <p className='created'>Description: {repoItem.description}</p>
                <p className='created'>Created: {repoItem.created_at}</p>
                <p className='created'>Language: {repoItem.language}</p>
                <p className='created'>Visibility: {repoItem.visibility}</p>
                <p className='created'>Default branch: {repoItem.default_branch}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
