import React, { useState } from 'react';

const Form = () => {
    const [user, setUser] = useState();
    const [objects, setObjects] = useState([]);
    const handleSubmit = event => {
        event.preventDefault()
        event.target.reset();
        fetch("http://localhost:4000/users", {
            method: "POST",
            headers: {
                'Content-Type':"application/json",
            },
            body: JSON.stringify(user),
        })
            .then(res => res.json())
            .then(data => {
                if (data._id!==null) {
                    alert('Successfully added to database!')
                    const newData = [...objects, data];
                    setObjects(newData);
                }
        })
    }
    const handleBlur = event => {
        const value = event.target.value;
        const field = event.target.name;
        const newUser = { ...user }
        newUser[field] = value;
        setUser(newUser);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onBlur={handleBlur} type="text" name='name' placeholder='name' required />
                <br></br>
                <input onBlur={handleBlur} type="text" name='email' placeholder='email' required />
                <br></br>
                <button>Add User</button>
            </form>
            <h1>{objects.length}</h1>
        </div>
    );
};

export default Form;