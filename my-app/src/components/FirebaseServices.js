import firebase from 'firebase';

export  function createUser(email,password,obj,callback) {
     firebase.auth().createUserWithEmailAndPassword(email,password)
     .then((success) => {
         console.log("success",JSON.stringify(success));
         localStorage.setItem('uid', success.user.uid)
        //  callback(JSON.stringify(success))
         putUserData(obj, success.user.uid)
         
         var actionCodeSettings = {
            url: 'https://www.example.com/finishSignUp?cartId=1234',
            iOS: {
              bundleId: 'com.example.ios'
            },
            android: {
              packageName: 'com.example.android',
              installApp: true,
              minimumVersion: '12'
            },
            // This must be true.
            handleCodeInApp: true
          };
        firebase.auth().sendSignInLinkToEmail(email,actionCodeSettings).then((success)=>{
           
            alert("Email send on Register email Id")
            callback(JSON.stringify(success))
        });
     })
     .catch((error)=>{
         console.log("error:",JSON.stringify(error));
         callback(error);
     })
 }

 function putUserData( obj , uid ) 
 {
     firebase.database().ref('/users/'+uid+'/userData/').set(obj)
 }

 export function createUserNote( obj ) {
  const uid = localStorage.getItem('uid')
  console.log(uid + ' : uid ');
  console.log(" Trash " + obj.trash);
  console.log(" Archive " + obj.ArchiveStatus)
  console.log(" Pin " + obj.pin)
  firebase.database().ref('/users/' + uid + '/notes').push(obj);
 }
 
 export function updateUserNote( obj , key ) {
  const uid = localStorage.getItem( 'uid' )
  console.log(uid + ' : uid ');
  console.log(" Trash " + obj.trash);
  console.log(" Archive " + obj.ArchiveStatus)
  console.log(" Pin " + obj.pin)
  console.log(" Title " + obj.titleOfNote);
  console.log(" Data " + obj.dataOfNote)
  firebase.database().ref('/users/'+uid+'/notes/'+key).update(obj);
 }
 
 export function getNotes(callback) {
    firebase.database().ref('/users/'+localStorage.getItem('uid')+'/notes/')
    .on('value',(snapshot)=>{
    console.log("get Notes NOtes:",snapshot.val());
      callback(snapshot.val())
   })
 }
 
 export function updateNote(key , obj) {
   const uid = localStorage.getItem('uid');
   console.log(uid + " Uid is ")
   console.log(" Key is : " + key)
   console.log("Object "+JSON.stringify(obj));
   firebase.database().ref('/users/'+uid+'/notes/'+key).update(obj)
 }


//  export function getArchiveNotes (callback) {
//    const uid = localStorage.getItem('uid');
//    console.log(uid + " Uis is ");
//    firebase.database().ref('/users/' + uid + '/notes/').orderByChild('ArchiveStatus')
//    .equalTo(true).on('value',(snapshot)=>{
//      snapshot.val()
//      callback(snapshot.val())
//    })
//  }