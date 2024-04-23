/* eslint-disable max-len */
/* eslint-disable camelcase */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});
admin.initializeApp();

const db = admin.firestore();

// GET
exports.readItems = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "GET") {
      res.status(405).send({error: true, message: "Method not allowed"});
      return;
    }

    const {id, uid} = req.query;

    try {
      let query = db.collection("users");

      if (id) {
        query = query.where("id", "==", id);
      }
      if (uid) {
        query = query.where("uid", "==", uid);
      }

      const snapshot = await query.get();

      if (snapshot.empty) {
        res.status(404).send({error: true, message: "No matching documents."});
        return;
      }

      const users = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));

      res.status(200).send(users);
    } catch (error) {
      console.error("Error reading item:", error);
      res.status(500).send({error: true, message: "Error reading item: " + error});
    }
  });
});

exports.updateItem = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "PUT") {
      res.status(405).send({error: true, message: "Method not allowed"});
      return;
    }

    const {id} = req.query; 
    const updates = req.body;

    if (!id) {
      res.status(400).send({error: true, message: "Missing document id"});
      return;
    }

    try {
      const documentRef = db.collection("users").doc(id);
      await documentRef.update(updates);
      res.status(200).send({success: true, message: "Document updated successfully"});
    } catch (error) {
      console.error("Error updating document:", error);
      res.status(500).send({error: true, message: "Error updating document: " + error});
    }
  });
});


