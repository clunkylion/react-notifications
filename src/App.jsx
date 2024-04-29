import { useEffect } from 'react';
import './App.css';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from './firebase/firebaseConfig';
import { toast, ToastContainer } from 'react-toastify';
import Message from './components/Message';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { VITE_APP_VAPID_KEY } = import.meta.env;

  async function requestPermission() {
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: VITE_APP_VAPID_KEY,
      });

      //We can send token to server
      console.log('Token generated : ', token);
    } else if (permission === 'denied') {
      //notifications are blocked
      alert('You denied for the notification');
    }
  }

  useEffect(() => {
    requestPermission();
  }, []);

  onMessage(messaging, (payload) => {
    console.log('incoming msg');
    toast(<Message notification={payload.notification} />);
  });

  return (
    <>
      <h1>Push Notifications</h1>
      <ToastContainer />
    </>
  );
}

export default App;
