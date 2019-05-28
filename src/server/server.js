import { MongoClient } from "mongodb";
import path from "path";

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import "./initialize-db";
import { authenticationRoute } from "./authenticate";

import { connectDB } from "./connect-db";
// import { addNewTask, updateTask } from "./communicate-db";

let port = process.env.PORT || 7777;
let app = express();

app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json());
app.listen(port, console.info("Server running, listening on port ", port));

// app.get("/", (req, res) => {
//   res.sendFile("hello res");
// });

export const addNewTask = async task => {
  let db = await connectDB();
  let collection = db.collection(`tasks`);
  await collection.insertOne(task);
};

authenticationRoute(app);

if (process.env.NODE_ENV == `production`) {
  app.use(express.static(path.resolve(__dirname, "../../dist")));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve("index.html"));
  });
}

app.post("/task/new", async (req, res) => {
  // let task = req.body.task;
  await addNewTask(req.body.task);
  res.status(200).send();
});

export const updateTask = async task => {
  let { id, group, isComplete, name } = task;
  let db = await connectDB();
  let collection = db.collection(`tasks`);
  if (group) {
    await collection.updateOne({ id }, { $set: { group } });
  }
  if (name) {
    await collection.updateOne({ id }, { $set: { name } });
  }
  if (isComplete !== undefined) {
    await collection.updateOne({ id }, { $set: { isComplete } });
  }
};

app.post("/task/update", async (req, res) => {
  let db = await connectDB();
  await updateTask(req.body.task);
  res.status(200).send();
});

// app.post("/comment/new", async (req, res) => {
//   let comment = req.body.comment;
//   let db = await connectDB();
//   let collection = db.collection(`comments`);
//   await collection.insertOne(comment);
//   res.status(200).send();
// });
