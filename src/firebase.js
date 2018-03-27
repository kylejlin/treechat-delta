import * as firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyCPNrcV7qmO_YbkQOmiOloLU64WbkHymOA",
  authDomain: "treechat-delta.firebaseapp.com",
  databaseURL: "https://treechat-delta.firebaseio.com",
  projectId: "treechat-delta",
  storageBucket: "",
  messagingSenderId: "174424899791"
}

firebase.initializeApp(config)

export default firebase
