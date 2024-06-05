import { useState, useEffect } from 'react';
import './Search.css';
import Card from '../../Card.jsx';

export default function Search(props) {
  const [selectedBp, setSelectedBp] = useState("");
  const [bpData, setBpData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setIsSubmitted(false);
    setSelectedBp(e.target.value);
  };

  const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${selectedBp}?limit=15`;
  const API_KEY = "90e977b5d8mshf5f1067f878f899p12c888jsnc176b90ca77c";
  
  const getBpData = async () => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
      }
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setBpData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedBp && isSubmitted) {
      getBpData();
    }
  }, [selectedBp, isSubmitted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedBp) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="">
      <h1 className='m-5 heading '>Choose your <span id='title'>Exercise</span></h1>
      <form className="form my-3 py-5" onSubmit={handleSubmit}>
        <select placeholder='Select option' className="w-50 p-2 m-2" onChange={handleChange}>
          {props.bodyParts.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
        <input className="btn-submit " value="Search" type="submit" />
      </form>
      <div className='container p-0 '>
        {isSubmitted && bpData ? (
          bpData.length > 0 ? (
            <Card bpData={bpData} setBpData={setBpData} />
          ) : (
            <h2>Loading Exercises for {selectedBp}</h2>
          )
        ) : (
          <h3>Please select a body part and click Search</h3>
        )}
      </div>
    </div>
  );
}
