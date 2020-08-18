import React, { PureComponent} from "react";
import Select, { components } from "react-select";
import { useDispatch } from 'react-redux'
import axios from 'axios';

const { MenuList} = components;
const CustomMenuList = React.memo((props) => {
  const value = props.selectProps.inputValue;
  const dispatch = useDispatch()
  // Copied from source
  const keySave = async (value) => {
    await axios
      .get('http://13.57.235.126:5000/addcountry?name=' + value)
        .then(res => {
        // Try this => set only if not equal to 200
         dispatch({ type: 'Update status' })
        // console.log(res.response.status)
      })
        .catch(err => {
        // console.log(err.response.status)
      })
  }
  const ariaAttributes = {
    "aria-autocomplete": "list",
    "aria-label": props.selectProps["aria-label"],
    "aria-labelledby": props.selectProps["aria-labelledby"]
  };
  const handleChange = e => {
    props.selectProps.onInputChange(e.currentTarget.value)
  }
  return (
    <div>
      <div style={{ padding: 5, boxSizing: "border-box" }}>
        <div class="input-group" style={{ display: "grid", "grid-template-columns": "1fr 24fr 1fr", "grid-gap": "4px" }}>
          <i class="fas fa-search" style={{ float: "left", "font-size": "20px", marginTop: "8px" }}></i>
          <div class="input-group-append" style={{ "line-height": "35px" }}>
            <input
              style={{
                width: "100%",
                paddingLeft: "8px",
                boxSizing: "border-box",
                "font-family": "Arial, FontAwesome"
              }}
              type="text"
              autoCorrect="off"
              autoComplete="off"
              spellCheck="false"
              value={value}
              placeholder="Search..."
              // onChange={e =>
              //   props.selectProps.onInputChange(e.currentTarget.value, {
              //     action: "input-change"
              //   })
              // }
              onChange={e => {
                // don't nullify the event object
                // e.persist();
                // debounce(1000, () => handleChange(e))();
                handleChange(e);
              }
              }
              onMouseDown={e => {
                e.stopPropagation();
                e.target.focus();
              }}
              onTouchEnd={e => {
                e.stopPropagation();
                e.target.focus();
              }}
              onFocus={props.selectProps.onMenuInputFocus}
              {...ariaAttributes}
            />
          </div>
          <div class="input-group-append" style={{ "line-height": "35px" }}>
            <button style={{ paddingLeft: "5px", "background-color": "#fff", "border": "none", "font-size": "20px" }} onClick={() => keySave(value)}>
              <i class="fas fa-save"></i>
            </button>
          </div>
        </div>
      </div>
      <div style={{ "text-align": "left" }}>
        <MenuList  {...props} />
      </div>
    </div>
  );
}
)

export default class Parent_DropDown extends PureComponent {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.toObject = this.toObject.bind(this);
  }
  state = { isFocused: false };
  inputFocus = e => this.setState({ isFocused: true });
  onChange = option => this.setState({ isFocused: false });
  onInputChange = val => this.setState({ inputValue: val });
  onDocumentClick = e => {
    // e.persist();
    var menu = this.containerRef.current.querySelector(".select__menu");

    if (
      !this.containerRef.current.contains(e.target) ||
      !menu ||
      !menu.contains(e.target)
    ) {
      this.setState({ isFocused: false, inputValue: "" });
    }
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.onDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.onDocumentClick);
  }
  toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
      rv[arr[i]] = arr[i];
    return rv;
  }

  render() {
    var props = {
      isFocused: this.state.isFocused || undefined,
      menuIsOpen: this.state.isFocused || undefined
    };
    if (this.props.countries) {
      const { countries: counlist } = this.props.countries;
      let objCountries = counlist.map(item => { return { value: item, label: item } })
      return (
        <div ref={this.containerRef}>
          <Select
            className="basic-single"
            classNamePrefix="select"
            name="color"
            options={objCountries}
            components={{
              MenuList: CustomMenuList
            }}
            inputValue={this.state.inputValue}
            isSearchable={false}
            onMenuInputFocus={this.inputFocus.bind(this)}
            onChange={this.onChange.bind(this)}
            onInputChange={this.onInputChange.bind(this)}
            {...props}
          />
        </div>
      );
    }
    else { return false }
  }
}
