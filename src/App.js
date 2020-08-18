import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Child_DropDown from './components/Child_DropDown';
import Parent_DropDown from './components/Parent_DropDown';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import { connect, useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import './App.css';

const App = React.memo(() => {
  const [isChecked, setCheck] = useState(false);
  const [countries, setCountries] = useState();
  const globalStore = useSelector(globalStore => globalStore);
  const dispatch = useDispatch();
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
  const fetchList = async () => {
    await axios.get('http://13.57.235.126:5000/countries')
      .then(res => {
        setCountries(res.data)
        // console.log(res.response.status);
      })
      .catch(function (error) {
      });
  }
  // const createFunction = useCallback(
  //   () => {
  //     fetchList();
  //   },
  //   [globalStore.status]
  // )
  // useEffect(() => {
  //   createFunction();
  // }, [createFunction])

  useEffect(() => {
    fetchList();
  }, [])
  useEffect(() => {
    if (globalStore.status === '200')
      fetchList();
    return () => {
      dispatch({ type: 'Init status' })
    };
  }, [globalStore.status])

  if (globalStore.status === '200')
    displayMessage("Saved!", "success", "Country name added to the list.");
  
  console.log("From Redux Store" + " " + globalStore.status);
  const inputRef = useRef(null);
  // return useMemo(() => {
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
  // }, [globalStore.status])
})

const mapStatetoProps = state => {
  return {
    status: state.status
  }
}
const mapDispatchtoProps = dispatch => {
  return {
    statusChange: () => dispatch({ type: 'Update status' }),
    statusInit: () => dispatch({ type: 'Init status' })
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(App);