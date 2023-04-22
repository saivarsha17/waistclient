import './App.css';
import { useState } from 'react';
function App() {
  const [modal, setModal] = useState(false);
  const [popup, setPopup] = useState(false);
  const [popupText, setPopupText] = useState('');
  const [data, setData] = useState({
    Max: '',
    Min: '',
  });
  const [inputData, setInputData] = useState({
    height: '',
    weight: '',
    age: '',
    waist: '',
  });
  const handleRange = () => {
    console.log('modal');
    setModal(false);
    if (
      inputData.height.length === 0 ||
      inputData.weight.length === 0 ||
      inputData.age.length === 0
    ) {
      setPopup(true);
      setPopupText('Invalid input Value');
      setTimeout(() => setPopup(false), 2000);
      return;
    }
    var formdata = new FormData();
    formdata.append('height', inputData.height);
    formdata.append('weight', inputData.weight);
    formdata.append('age', inputData.age);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
      'Access-Control-Allow-Origin': '*',
    };

    fetch('http://127.0.0.1:4000/range', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result, typeof result);
        const range = JSON.parse(result);
        setData({ Max: range.Max, Min: range.Min });
        setModal(true);
      })
      .catch((error) => console.log('error', error));
  };
  const handleSubmit = () => {
    console.log('Submit', inputData, inputData.waist.length);
    if (inputData.waist.length === 0) {
      setPopup(true);
      setPopupText('Invalid input Value');
      setTimeout(() => setPopup(false), 2000);
      return;
    }
    var formdata = new FormData();
    formdata.append('age', inputData.age);
    formdata.append('height', inputData.height);
    formdata.append('weight', inputData.weight);
    formdata.append('waist', inputData.waist);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch('http://127.0.0.1:4000/insert', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setPopup(true);
        setPopupText('Done Submitting');
        setTimeout(() => setPopup(false), 2000);
      })
      .catch((error) => console.log('error', error));
    setModal(false);
    setInputData({
      height: '',
      weight: '',
      age: '',
      waist: '',
    });
  };
  return (
    <div className="mainContainer">
      <div className="fieldContainer">
        {popup && <div className="popupContainer">{popupText}</div>}
        <div className="headingContainer"> Height:</div>
        <input
          className="inputContainer"
          placeholder="Enter your height in cm"
          value={inputData.height}
          onChange={(e) => {
            setInputData((prev) => ({ ...prev, height: e.target.value }));
            setModal(false);
          }}
        />
      </div>
      <div className="fieldContainer">
        <div className="headingContainer">Weight:</div>
        <input
          className="inputContainer"
          value={inputData.weight}
          placeholder="Enter your weight in kgs"
          onChange={(e) => {
            setInputData((prev) => ({ ...prev, weight: e.target.value }));
            setModal(false);
          }}
        />
      </div>
      <div className="fieldContainer">
        <div className="headingContainer">Age:</div>
        <input
          className="inputContainer"
          value={inputData.age}
          placeholder="Enter your Age "
          onChange={(e) => {
            setInputData((prev) => ({ ...prev, age: e.target.value }));
            setModal(false);
          }}
        />
      </div>
      <div className="rangeButtonContainer" onClick={() => handleRange()}>
        Expected Range
      </div>
      {modal && (
        <>
          <div className="headingContainer">
            Your waist measurement is in range {data.Min}cm to {data.Max}cm
          </div>
          <div className="headingContainer">OR</div>
          <div className="headingContainer">Enter your waist size in cm</div>

          <input
            className="inputContainer"
            placeholder="Enter your waist size "
            style={{ marginBottom: '20px' }}
            value={inputData.waist}
            onChange={(e) => {
              setInputData((prev) => ({ ...prev, waist: e.target.value }));
            }}
          />
          <div className="rangeButtonContainer" onClick={() => handleSubmit()}>
            Submit
          </div>
        </>
      )}
    </div>
  );
}

export default App;
