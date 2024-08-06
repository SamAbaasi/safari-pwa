// This a service worker file for receiving push notifitications.
// See `Access registration token section` @ https://firebase.google.com/docs/cloud-messaging/js/client#retrieve-the-current-registration-token

// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');


// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyCxJ3Zwdp29EBhYG9Z3mTCGHoXQsd35C4Y",
  authDomain: "fcm-safari-a962a.firebaseapp.com",
  projectId: "fcm-safari-a962a",
  storageBucket: "fcm-safari-a962a.appspot.com",
  messagingSenderId: "367917936686",
  appId: "1:367917936686:web:3b19900c26e99c02c86fbf",
  measurementId: "G-40VD45MSTS"
};

self.addEventListener("notificationclick", function (event) {
  console.log("[firebase-messaging-sw.js] Notification click Received", event);
  event.notification.close();
  console.log("samira event in notificationclick", event);
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(clientList => {
      if (clientList.length > 0) {
        const client = clientList[0];
        console.log(" Notification click Received, in then  and if,clientList length is more than 0 ", client);

        client.focus();
        setTimeout(() => {
          client.postMessage({ message: event.notification.data.FCM_MSG, message_type: "fcm" });
        }, 2000);
      } else {
        console.log(" Notification click Received, in then and else,clientList length is 0 ", client);

        clients
          .openWindow("/")
          .then(client => {
            setTimeout(() => {
              const broadcast = new BroadcastChannel("sw-messages");
              broadcast.postMessage({ message: event.notification.data.FCM_MSG, message_type: "fcm" });
            }, 2000);
          })
          .catch(error => {
            console.error("Error opening window:", error);
          });
      }
    })
  );
});


firebase.initializeApp(firebaseConfigQC);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(`notification is received in background mode ${payload}`);

  const db = indexedDB.open("MyIrancell");
  db.onsuccess = () => {
    const txn = db.result.transaction("notifications", "readwrite");
    const store = txn.objectStore("notifications");
    store.put({ readed: false, ...payload.data });
    txn.oncomplete = function () {
      db.result.close();
    };
  };
  console.log("payload.data?.isSilent", payload.data?.isSilent);
  // if (payload.data?.isSilent === false) {
    // TODO: show notification with preffered language
    /* 
      you have to store language in indexedDB and get it from there
      then show notification with that language
    */
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      image: payload.notification.image,
      title: payload.notification.title,
      data: payload.data
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
  // }
});
