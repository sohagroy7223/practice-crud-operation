import { use } from "react";

const Users = ({ userPromise }) => {
  const users = use(userPromise);
  //   console.log(users);

  const handleAddUser = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    console.log(name, email);

    const newUser = { name, email };

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after fetch user", data);
        if (data.insertedId) {
          alert("add user successfully");
          e.target.reset();
        }
      });
  };
  return (
    <div>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder="your name" />
        <br />
        <input type="email" name="email" id="" placeholder="email" />
        <br />
        <input type="submit" value="add user" />
      </form>
      <div>
        <h3>all users here {users.length}</h3>
        {users.map((user) => (
          <p key={user._id}>
            {user.name}: {user.email}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Users;
