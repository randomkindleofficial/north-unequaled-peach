
const admin = require("firebase-admin");

const serviceAccount = require("./key");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hsemanagertrial-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.firestore();

async function getAllDocuments(collectionName) {
  const snapshot = await db.collection(collectionName).get();
  const documents = [];

  snapshot.forEach((doc) => {
    documents.push(doc.data());
  });

  return documents;
}

async function getDocumentById(collectionName, documentId) {
  const docRef = db.collection(collectionName).doc(documentId);
  const doc = await docRef.get();

  if (!doc.exists) {
    return null;
  }

  return doc.data();
}

async function createDocumentWithId(collectionName, documentId, data) {
  const collectionRef = db.collection(collectionName);
  const docRef = collectionRef.doc(documentId);
  await docRef.set(data);
  return documentId;
}

async function createDocument(collectionName, data) {
  const docRef = db.collection(collectionName).doc();
  await docRef.set(data);
  return docRef.id;
}

async function updateDocument(collectionName, documentId, data) {
  const docRef = db.collection(collectionName).doc(documentId);
  await docRef.update(data);
  return docRef.id;
}

async function deleteDocument(collectionName, documentId) {
  const docRef = db.collection(collectionName).doc(documentId);
  await docRef.delete();
  return docRef.id;
}

async function deleteField(collectionName, documentId, fieldName) {
  const dJson = await getDocumentById(collectionName, documentId)
  delete dJson[fieldName];
  const i =  await createDocumentWithId(collectionName, documentId, dJson);
  return i
}

module.exports = {
  getAllDocuments,
  getDocumentById,
  createDocument,
  createDocumentWithId,
  updateDocument,
  deleteField,
  deleteDocument
};
