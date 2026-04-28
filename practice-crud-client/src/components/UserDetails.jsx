import { useLoaderData } from "react-router";

const UserDetails = () => {
  const user = useLoaderData();
  console.log(user);
  return (
    <div>
      <h3>user details</h3>
      <h3>name: {user.name}</h3>
      <p>email: {user.email}</p>
    </div>
  );
};

export default UserDetails;
