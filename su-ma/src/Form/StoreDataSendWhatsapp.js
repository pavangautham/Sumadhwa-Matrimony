import React, { useEffect, useState } from "react";
import { imgDB, txtDB } from "./storeDataConfig";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";

const StoreDataSendWhatsapp = () => {
  const [txt, setTxt] = useState("");
  const [img, setImg] = useState("");
  const [data, setData] = useState([]);

  const handleUpload = (e) => {
    const imgs = ref(imgDB, `Imgs/${v4()}`);
    uploadBytes(imgs, e.target.files[0])
      .then(async (data) => {
        console.log(data, "imgs");
  
        // Get photo URL
        const photoURL = await getDownloadURL(data.ref);
        console.log('Image URL:', photoURL);
  
        // Set photo URL
        setImg(photoURL);
      })
      .catch((error) => {
        console.error('Error uploading photo:', error.message);
      });
  };

  const handleClick = async () => {
    const valRef = collection(txtDB, "txtData");
    await addDoc(valRef, { txtVal: txt, imgUrl: img });
    alert("Data added successfully");
  };

  const getData = async () => {
    const valRef = collection(txtDB, "txtData");
    const dataDb = await getDocs(valRef);
    const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
    setData(allData);
    console.log(dataDb);
  };

  const handleSendToWhatsAppWeb = (value) => {
    const message = `Text: ${value.txtVal}\nImage URL: ${value.imgUrl}`;
    const phoneNumber = '7259691900';
    // const whatsappURL = `https://api.whatsapp.com/send?phone=${receiverPhone}&text= ${message}`;
    const whatsappWebLink = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappWebLink, '_blank');
  };

  const handleSendToWhatsAppMobile = (value) => {
    const message = `Text: ${value.txtVal}\nImage URL: ${value.imgUrl}`;
    const phoneNumber = '7259691900'; // Replace with the recipient's phone number
    const whatsappMobileLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappMobileLink, '_blank');
  };

  useEffect(() => {
    getData();
  },[]);
  console.log(data, "datadata");

  return (
    <div>
      <input onChange={(e) => setTxt(e.target.value)} />
      <br />
      <input type="file" onChange={(e) => handleUpload(e)} />
      <br />
      <br />
      <button onClick={handleClick}>Add</button>

      {data.map((value) => (
        <div>
          <h1>{value.txtVal}</h1>
          <img src={value.imgUrl} height="200px" width="200px" />
          <br />
          <button onClick={() => handleSendToWhatsAppWeb(value)}>Send to WhatsApp Web</button>
          <button onClick={() => handleSendToWhatsAppMobile(value)}>Send to WhatsApp Mobile</button>
        </div>
      ))}
    </div>
  );
}

export default StoreDataSendWhatsapp;