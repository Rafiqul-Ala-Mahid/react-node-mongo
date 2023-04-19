import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch("http://localhost:4000/users")
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                // setDisplayUsers(data)
        })
    },[])
    // const [displayUsers, setDisplayUsers] = useState(users);
    const handleButton = (user) => {
        const agree = window.confirm(`Are you want to delete the - ${user.name}`)
        if (agree) {
            console.log("you are deleting the user:", user);
            fetch(`http://localhost:4000/users/${user._id}`, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                if (data.deletedCount > 0) {
                    alert("Successfully deleted!");
                    console.log("successfully deleted the account");
                    const remainingUsers = users.filter(usr => usr._id !== user._id)
                    setUsers(remainingUsers);
                    // window.location.reload(false);
                }
              });
        }
    }
    return (
      <div>
        <h1>{users.length} Users are here !</h1>
        <div>
          {users.map(user => 
            <p key={user._id}>
              {user.name}@{user.email}
              <Link to={`/update/${user._id}`}>
                <button>Update</button>
              </Link>
                  <button onClick={() => handleButton(user)}>Delete Now</button>
            </p>
              
          )}
        </div>
      </div>
    );
};

export default UserList;