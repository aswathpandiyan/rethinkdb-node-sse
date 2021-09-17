import './style.css';
import React, { useState, useEffect } from 'react';

const useEventSource = (url) => {
  const [data, updateData] = useState([]);

  useEffect(() => {
    const source = new EventSource(url);

    source.onmessage = function logEvents(event) {
      updateData([...data, JSON.parse(event.data)]);
    };
  }, []);

  return data;
};

export default function App() {
  const data = useEventSource('http://localhost:5000/errors');
  if (data.length <= 0) {
    return <div>No data found</div>;
  }
  return (
    <div>
      {data.map((row, index) => {
        return <div key={index}>{row.new_value}</div>;
      })}
    </div>
  );
}
