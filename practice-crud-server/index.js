const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
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

    app.post("/users", async (req, res) => {
      const newUser = req.body;
      const result = await myCollection.insertOne(newUser);
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
