import React, { PureComponent, useState, useRef } from "react";
import Select, { components } from "react-select";
import { debounce } from 'throttle-debounce';
const { MenuList } = components;
const CustomMenuList = props => {
  const [fullListFlag, setFlag] = useState(false);
  const fullListRef = useRef();
  let count = 0;
  const countrylist = props.options || [];
  if (countrylist.length > 0)
    count = countrylist.length - 5;
  const ariaAttributes = {
    "aria-autocomplete": "list",
    "aria-label": props.selectProps["aria-label"],
    "aria-labelledby": props.selectProps["aria-labelledby"]
  };
  const handleChange = e => {
    props.selectProps.onInputChange(e.currentTarget.value)
  }
  return (
    <div >
      <div style={{ padding: 5, boxSizing: "border-box" }}>
        <div class="input-group" style={{ display: "block" }}>
          <i class="fas fa-search" style={{ float: "left", "font-size": "20px", marginTop: "8px" }}></i>
          <div class="input-group-append" style={{ "line-height": "35px" }}>
            <input
              style={{
                width: "100%",
                boxSizing: "border-box",
                marginLeft: "4px",
                "font-family": "Arial, FontAwesome"
              }}
              type="text"
              autoCorrect="off"
              autoComplete="off"
              spellCheck="false"
              value={props.selectProps.inputValue}
              placeholder="Search..."
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
        </div>
      </div>
      <div style={{ "text-align": "left" }}>
        {fullListFlag === false ? <MenuList {...props}>
          {Array.isArray(props.children) ? props.children.slice(0, 5) : props.children}
          <button ref={fullListRef} style={{ float: "right", paddingRight: "9%", "border": "none", "background-color": "#fff", "font-size": "17px", fontWeight: "bold", fontStyle: "italic" }} onClick={() => setFlag(fullListRef.current.fullListFlag)}>
            {count} more
            </button>
        </MenuList> :
          <MenuList  {...props} />}
      </div>
    </div>
  );
};

export default class User extends PureComponent {
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
            defaultMenuIsOpen={true}
            isSearchable={false}
            noOptionsMessage={() => "\"" + this.state.inputValue + "\"" + " " + "not found"}
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
