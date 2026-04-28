import { useLoaderData } from "react-router";

const Update = () => {
  const user = useLoaderData();
  //   console.log(user);

  const handelUpdateUser = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    // console.log(name, email);
    const updateUser = { name, email };

    fetch(`http://localhost:3000/users/${user._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after update user", data);
        if (data.modifiedCount) {
          alert("user update successfully");
        }
      });
  };

  return (
    <div>
      <h3>update user</h3>

      <form onSubmit={handelUpdateUser}>
        <input
          type="text"
          name="name"
          placeholder="your name"
          defaultValue={user.name}
          required
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="your email"
          defaultValue={user.email}
          required
        />
        <br />
        <input type="submit" value="update user" />
      </form>
    </div>
  );
};

export default Update;
