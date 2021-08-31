import { FC, useEffect, useState } from 'react';
// NOTE: todo: wrap up libs
import axios from 'axios';

type Props = {};
type CalculatedValue = { key: number; value: string };

const Fib: FC<Props> = (props) => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState<CalculatedValue[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    axios.get('/api/values/current').then((res) => setValues(res.data));
    axios.get('/api/values/all').then((res) => setSeenIndexes(res.data));
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await axios.post('/api/values', {
      index,
    });
    setIndex(index);
  };
  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIndex(parseInt(event.target.value) || 0);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input value={index} onChange={handleChangeValue} />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {seenIndexes.map(({ number }) => number).join(', ')}

      <h3>Calculated values:</h3>
      {Object.entries(values).map(([key, value]) => {
        return (
          <div key={key}>
            For index {key} I calculated {value}
          </div>
        );
      })}
    </div>
  );
};

export default Fib;
