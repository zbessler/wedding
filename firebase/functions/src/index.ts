import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';

const corsHandler = cors({origin: true});
admin.initializeApp();

exports.addGuest = functions.https.onRequest((req, res) => {
  corsHandler(req, res, () => { null });

  return admin.firestore().collection('guests').doc(req.body.data.email).set(req.body.data)
    .then(() => {
       res.status(200).send({data: {success: true, version: 'v1.2'}});
    })
    .catch(err => {
       res.status(400).send({error: err});
    });
});


exports.getSummary = functions.https.onRequest((req, res) => {
  corsHandler(req, res, () => { null });

  return admin.firestore().collection('guests').get()
    .then((data) => {
      const docs = data.docs.entries;

      const summaryData = {
        totalResponses: 0,
        emailList: [],
        nameList: [],
        attending: {
          japan: {
            adults: 0,
            children: 0,
            total: 0
          },
          maine: {
            adults: 0,
            children: 0,
            total: 0
          },
          wisconsin: {
            adults: 0,
            children: 0,
            total: 0
          },
        },
        totalAdults: 0,
        totalChildren: 0,
        fullList: [],
        version: 'v1.5'
      }

      data.forEach(doc => {
        summaryData.fullList.push(doc.data());

        summaryData.totalResponses++;
        summaryData.emailList.push(doc.get('email'));
        summaryData.nameList.push(doc.get('name'));

        if (doc.get('attending').includes('japan')) {
          summaryData.attending.japan.children += parseInt(doc.get('children'));
          summaryData.attending.japan.adults += parseInt(doc.get('adults'));
          summaryData.attending.japan.total += parseInt(doc.get('children')) + parseInt(doc.get('adults'));
        }
        if (doc.get('attending').includes('wis')) {
          summaryData.attending.wisconsin.children += parseInt(doc.get('children'));
          summaryData.attending.wisconsin.adults += parseInt(doc.get('adults'));
          summaryData.attending.wisconsin.total += parseInt(doc.get('children')) + parseInt(doc.get('adults'));
        }
        if (doc.get('attending').includes('maine')) {
          summaryData.attending.maine.children += parseInt(doc.get('children'));
          summaryData.attending.maine.adults +=parseInt( doc.get('adults'));
          summaryData.attending.maine.total += parseInt(doc.get('children')) + parseInt(doc.get('adults'));
        }
        summaryData.totalAdults += parseInt(doc.get('adults'));
        summaryData.totalChildren += parseInt(doc.get('children'));

      });

      res.status(200).send({data: summaryData});
    })
    .catch(err => {
       res.status(400).send({error: err});
    });
});
