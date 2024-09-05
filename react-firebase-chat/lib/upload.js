

// const storage = getStorage();
// const storageRef = ref(storage, 'images/rivers.jpg');

// const uploadTask = uploadBytesResumable(storageRef, file);

// return new Promise((resolve, reject) => {
//   uploadTask.on('state_changed', 
//     (snapshot) => {
//       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       console.log('Upload is ' + progress + '% done');
//       switch (snapshot.state) {
//         case 'paused':
//           console.log('Upload is paused');
//           break;
//         case 'running':
//           console.log('Upload is running');
//           break;
//       }
//     }, 
//     (error) => {
//       reject("Something Went Wrong!" + error.code);  // Call reject in case of an error
//     }, 
//     () => {
//       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//         console.log('File available at', downloadURL);
//         resolve(downloadURL);  // Resolve the promise with the download URL
//       });
//     }
//   );
// });


// export default upload;


// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// const upload = (file) => {
//   const storage = getStorage();
//   const storageRef = ref(storage, 'images/rivers.jpg');
//   const uploadTask = uploadBytesResumable(storageRef, file);

//   return new Promise((resolve, reject) => {
//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log('Upload is ' + progress + '% done');

//         switch (snapshot.state) {
//           case 'paused':
//             console.log('Upload is paused');
//             break;
//           case 'running':
//             console.log('Upload is running');
//             break;
//         }
//       },
//       (error) => {
//         reject('Something went wrong: ' + error.code); // Call reject in case of an error
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           console.log('File available at', downloadURL);
//           resolve(downloadURL); // Resolve the promise with the download URL
//         });
//       }
//     );
//   });
// };

// export default upload;


// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// const upload =  async (file) => {
//   const  date  = new Date()
//   const storage = getStorage();
//   const storageRef = ref(storage, `images/${date + file.name}`);
//   const uploadTask = uploadBytesResumable(storageRef, file);

//   return new Promise((resolve, reject) => {
//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log('Upload is ' + progress + '% done');
//       },
//       (error) => {
//         reject('Something went wrong: ' + error.code); // Call reject in case of an error
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           console.log('File available at', downloadURL);
//           resolve(downloadURL); // Resolve the promise with the download URL
//         });
//       }
//     );
//   });
// };

// export default upload;


import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const upload = async (file) => {
  try {
    const date = new Date();
    const storage = getStorage();
    const storageRef = ref(storage, `images/${date.getTime()}_${file.name}`); // Use timestamp for unique naming
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error('Upload failed:', error); // Log the error details
          reject('Something went wrong: ' + error.code); // Reject the promise in case of an error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log('File available at', downloadURL);
              resolve(downloadURL); // Resolve the promise with the download URL
            })
            .catch((error) => {
              console.error('Failed to get download URL:', error); // Handle any errors from getDownloadURL
              reject('Failed to get download URL: ' + error.code);
            });
        }
      );
    });
  } catch (error) {
    console.error('Unexpected error during upload:', error); // Log unexpected errors
    throw new Error('Unexpected error during upload');
  }
};

export default upload;
