import React, {useState, useEffect, useRef, useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Child_DropDown from './components/Child_DropDown';
import Parent_DropDown from './components/Parent_DropDown';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component'
import AppContext, { AppProvider } from './AppContext';
import axios from 'axios';
import './App.css';

 const App = React.memo(() =>  {
  const [isChecked, setCheck] = useState(false);
  const [countries, setCountries] = useState();
  const [flag, setFlag] = useState(false);
  const { ctx, setCtx }  = useContext(AppContext);

  const handleChange = () => {
   setCheck(!isChecked);
  }
  const displayMessage = (title, type, msg) => {
    store.addNotification({
      title: title,
      message: msg,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 4000,
        onScreen: true
      }
    });
  }

    useEffect(() => {
    axios.get('http://13.57.235.126:5000/countries')
      .then(res => {
        setCountries(res.data)
      })
      .catch(function (error) {       
      });
  }, [])
  // useEffect(() => {
  //   setFlag(true);
  // }, [ctx.status]);
  console.log("From Context" + " " + ctx.status + " " + ctx.flag)
  // if (ctx.status === "200")
  //   setFlag(true);
  
  const inputRef = useRef(null);
    return (
      <Container fluid="md" style={{ marginTop: "35px" }}>
        <ReactNotification />
        <Row>
          <label>
            <input ref={inputRef} checked={isChecked} onChange={handleChange} className="switch" type="checkbox" />
            <div>
              <div></div>
            </div>
          </label>
          <label style={{ paddingLeft: "20px", "font-size": "30px", color: "#3b89ec" }}>{isChecked ? 'User with Add privilege' : 'User without Add privilege'}</label>
        </Row>
        <Row style={{ marginTop: "35px" }}>
          <Col style={{ width: "100%" }}>
            <Child_DropDown countries={countries} />
          </Col>
          <Col>{isChecked && <Parent_DropDown countries={countries} displayMessage={displayMessage} />}</Col>
        </Row>
      </Container>
    );
})

export default App;