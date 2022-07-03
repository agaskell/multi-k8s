import { useEffect, useState } from 'react';
import axios from 'axios';

function Fib() {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState('');

  useEffect(() => {
    const getSeenIndexes = async () => {
      const indexes = await fetchIndexes();
      setSeenIndexes(indexes);
    }

    getSeenIndexes();
  }, [])

  useEffect(() => {
    const getValues = async () => {
      const values = await fetchValues();
      setValues(values);
    }

    getValues();
  }, [])

  const fetchValues = async () => {
    const values = await axios.get('/api/values/current');
    return values.data;
  };

  const fetchIndexes = async () => {
    const values = await axios.get('/api/values/all');
    return values.data;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post('/api/values', { index });

    setIndex('');
  }

  const renderSeenIndexes = () => {
    return seenIndexes.map((i) => i.number).join(', ')
  }

  const renderValues = () => {
    return Object.entries(values).map(([k, v]) =>
      <div key={k}>For index {k} I calculated {v}</div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input
          value={index}
          onChange={e => setIndex(e.target.value)}
        />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}

      <h3>Calculated Values:</h3>
      {renderValues()}
    </div>
  );
}

export default Fib;
