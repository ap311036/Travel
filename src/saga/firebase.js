import firebase from 'firebase';
import config from '../config/config';

firebase.initializeApp(config);

const database = firebase.database();
export function checkFirebaseUserAuth() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        reject(new Error('Ops! 還沒有用戶登入喔'));
      }
    });
  });
}

export function writeUserData(name = '', email) {
  database.ref().child('users/').push().set({
    username: name || 'Anonymous',
    email: email,
  });
}

export function getProduct() {
  return new Promise((resolve) => {
    database.ref(`/product/`)
      .once('value')
      .then((snapshot) => {
        let newData = JSON.parse(JSON.stringify(snapshot.val()));
        resolve(newData);
      });
  })
}

export function visitorRecord () {
  let NowDate = new Date();
  let h = NowDate.getHours();
  let m = NowDate.getMinutes();
  let s = NowDate.getSeconds();
  let dateTime = `${NowDate.getFullYear()}/${NowDate.getMonth() + 1}/${NowDate.getDate()}  ${h}:${m}:${s}`
  // console.log('run')
  firebase.database().ref().child('visitorRecord/').push().set({
    dateTime,
    from: window.location.href
  })
}

export async function addOrder(member, cart) {
  let NowDate = new Date();
  let h = NowDate.getHours();
  let m = NowDate.getMinutes();
  let s = NowDate.getSeconds();
  let uid = member.uid;
  let orderNumber = uid.substr(0, 5).toUpperCase() + h + m + s;
  return new Promise((resolve) => {
    firebase.database().ref('order').child(orderNumber).set({
      orderNumber,
      customer: uid,
      product: { ...cart },
      dateTime: `${NowDate.getFullYear()}/${NowDate.getMonth() + 1}/${NowDate.getDate()}  ${h}:${m}:${s}`
    })
      .then(() => {
        database.ref(`/order/${orderNumber}`).once('value').then((snap) => {
          resolve(snap.val())
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  })
}