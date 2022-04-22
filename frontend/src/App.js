import React, { useEffect, useState } from "react";
import "./App.css";

const url = "http://localhost:8000";

function App() {
  const [users, setUsers] = useState();
  const [isFetching, setFetching] = useState(false);

  const [name, setName] = useState("");

  const fetchUsers = async () => {
    setFetching(true);

    let json;
    try {
      const data = await fetch(url + "/users/");
      json = await data.json();
      console.log(json);
    } catch (err) {
      console.log(err);
      window.alert(err);
    }

    if (json) {
      setUsers(json);
    }

    setFetching(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    //check input isn't empty
    if(name == ""){
      alert("Please enter a name")
      return
    }

    let json;
    try {
      const data = await fetch(url + "/users/add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: name}),
      });
      json = await data.json();
    } catch (err) {
      console.log(err);
      window.alert(err);
    }

    //update users to show new list
    if (json) {
      setUsers(json);
    }
    
    setName("")

  }

  return (
    <div className="App">
      <header className="App-header">
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <div>
            <ul>
              {users?.map((user, index) => (
                <li key={index}>{user.fields.name}</li>
              ))}
            </ul>
            <form onSubmit={ (e) => handleSubmit(e) }>
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <input type="submit" value="Add User" />
            </form>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
