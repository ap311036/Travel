import React, { Component } from 'react';
import Card from "../components/card";
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import PaginationList from "../components/pagination";
import CheckBox from "../components/checkbox";

const filterArr = [
  { ch: '熱門度', en: 'hdesc' },
  { ch: '價格: 低到高', en: 'pasc' },
  { ch: 'Custom dropdown item', en: 'pasca' },
  { ch: 'Custom dropdown item', en: 'pascb' }
]
class SearchContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filter: '熱門度',
      dropdownOpen: false,
      check: {}
    }
  }
  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  getFilter = (filter) => {
    const result = filterArr.filter(item => item.en === filter)
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      filter: result[0].ch
    });
    this.props.onChangeSort(result[0].en);
  }
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    // const newState = 
    this.setState({
      check: { ...this.state.check, [name]: value }
    });
    console.log({ [name]: value })
  }
  buildList = () => {
    let result = new Set();
    this.props.products.data.forEach(item => {
      result.add(item.show_city_name);
    })
    let obj = {};
    result = [...result].forEach((item) => {
      console.log(this.state.check)
      obj[item] = true;
    });
    this.setState({
      check: obj
    })
  }
  render() {
    const { products,
            startPage,
            onChangePage,
          } = this.props;
    const {
      dropdownOpen,
      check,
    } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-lg-4 filter">
            <div className={dropdownOpen ? "filter-container open" : "filter-container"}>
              <h4 className="col-12">篩選排序</h4>
              {
                Object.keys(check).map((item, i) => {
                  return <div className="col-12 col-md-6" key={i}>
                    <CheckBox
                      className="default"
                      label={item}
                      name={item}
                      checked={check[item] || false}
                      onChange={(e) => this.handleInputChange(e)}
                    />
                  </div>
                })
              }
              <Dropdown isOpen={dropdownOpen} toggle={this.toggle} className="col-12">
                <DropdownToggle
                  tag="span"
                  onClick={this.toggle}
                  data-toggle="dropdown"
                  aria-expanded={dropdownOpen}
                  className="dropdown-toggle"
                >
                  {this.state.filter}
                </DropdownToggle>
                <DropdownMenu className="col-12 boxShadow">
                  <div className="pt-2">
                    <div className="dropdown-item" onClick={() => this.getFilter('hdesc')}>熱門度</div>
                    <div className="dropdown-item" onClick={() => this.getFilter('pasc')}>價格: 低到高</div>
                  </div>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div className="col-sm-12 col-lg-8 searchContainer">
            {
              products.data.filter(item => { return !check[item.show_city_name] }).map(item => (
                <Card
                  className="col-12"
                  uid={item.id}
                  url={item.img_url}
                  price={item.price_c}
                  title={item.name}
                  sample={item.rating_count}
                  line={item.show_country_name}
                  city={item.show_city_name}
                  star={item.rating_star}
                  introduction={item.introduction}
                  key={item.id}
                />
              ))
            }
          </div>
          <div className="col-sm-12 col-lg-12">
            <PaginationList
              currentPage={products.page}
              startPage={startPage}
              totalPage={products.total_page}
              onChangePage={onChangePage}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default SearchContainer