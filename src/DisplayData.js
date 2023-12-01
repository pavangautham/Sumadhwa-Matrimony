// DisplayData.js
import React, { useState, useEffect } from 'react';
import { database, ref, get, child } from './firebase';

const DisplayData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const dataRef = ref(database, 'data');

    const fetchData = async () => {
      const snapshot = await get(child(dataRef, '/'));
      const dataVal = snapshot.val();

      console.log('Fetched Data:', dataVal);

      if (dataVal) {
        const dataArray = Object.entries(dataVal).map(([key, value]) => ({ id: key, ...value }));
        setData(dataArray);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Data from Firebase:</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <p>Name: {item.name}</p>
            <p>Email: {item.email}</p>
            {item.photo && (
              <img src={item.photo} alt={`User: ${item.name}`} style={{ width: '100px', height: 'auto' }} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayData;
