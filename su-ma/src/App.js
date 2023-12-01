// src/App.js
import React from 'react';
import MyForm from './MyForm';
import DisplayData from './DisplayData';
import StoreDataFirebase from './Form/StoreDataFirebase'
import StoreDataSendWhatsapp from './Form/StoreDataSendWhatsapp'

const App = () => {
  return (
    <div>
      {/* <MyForm />
      <DisplayData /> */}
      {/* <StoreDataFirebase /> */}
      <StoreDataSendWhatsapp />
    </div>
  );
};

export default App;
