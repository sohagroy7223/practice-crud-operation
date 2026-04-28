const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://sohagroy7223_db_user:nZ1SM80jGVeFAiaS@crud-practice-cluster.l3ixzxm.mongodb.net/?appName=crud-practice-cluster";

app.get("/", (req, res) => {
  res.send("practice crud server running");
});

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const userDB = client.db("usersDb");
    const myCollection = userDB.collection("users");

    // send user database
    app.post("/users", async (req, res) => {
      const newUser = req.body;
      const result = await myCollection.insertOne(newUser);
      res.send(result);
    });

    // find all users
    app.get("/users", async (req, res) => {
      const cursor = myCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // find single user
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const user = { _id: new ObjectId(id) };
      const result = await myCollection.findOne(user);
      res.send(result);
    });

    // update user
    app.patch("/users/:id", async (req, res) => {
      const updateUser = req.body;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const update = {
        $set: {
          name: updateUser.name,
          email: updateUser.email,
        },
      };
      const options = {};
      const result = await myCollection.updateOne(query, update, options);
      res.send(result);
    });

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const user = { _id: new ObjectId(id) };
      const result = await myCollection.deleteOne(user);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`practice app listening on port ${port}`);
});
