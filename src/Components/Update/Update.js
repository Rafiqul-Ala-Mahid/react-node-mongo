import React, { useState } from 'react';
import { Navigate, useLoaderData, useNavigate } from 'react-router-dom';

const Update = () => {
  const storedUser = useLoaderData();
  const navigate = useNavigate();
    const [user, setUser] = useState(storedUser);
    const handleUpdate = async(event) => {
        event.preventDefault();
        // console.log(user);
      fetch(`http://localhost:4000/users/${storedUser._id}`, {
        method: 'PUT',
        headers: {
          'content-type':'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(res => res.json())
        .then(data => {
          if(data.modifiedCount) {
             alert('successfully user updated!')
            console.log(data);
            navigate("../../users");
          }
      })
    };
  
  
  
    const handleChange = (event) => {
      const value = event.target.value;
      const field = event.target.name;
      const newUser = { ...user };
      newUser[field] = value;
      setUser(newUser);
    };
    return (
      <div>
        <h2>Please Update here: {storedUser.name}</h2>
        <form onSubmit={handleUpdate}>
          <input
            onChange={handleChange}
                    type="text"
                    name="name"
                    defaultValue={storedUser.name}
                    placeholder="name"
                    required
          />
          <br></br>
          <input
            onChange={handleChange}
                    type="text"
                    name="email"
                    defaultValue={storedUser.email}
                    placeholder="email"
                    required
          />
          <br></br>
          <button>Update User</button>
        </form>
      </div>
    );
};

export default Update;