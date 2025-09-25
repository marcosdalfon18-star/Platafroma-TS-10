import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const getUsers = functions.https.onRequest((req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  const users = [
    {id: 1, name: "Marcos", role: "consultor"},
    {id: 2, name: "Daniel", role: "empresario"},
    {id: 3, name: "Alfonso", role: "empleado"},
    {id: 4, name: "Lucía", role: "gestor"},
  ];

  res.status(200).json(users);
});
