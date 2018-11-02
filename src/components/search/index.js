import React, { Component } from 'react';
import {
	InputGroup,
	InputGroupAddon,
	Input,
	Button,
	Dropdown,
	DropdownMenu,
	DropdownToggle
} from 'reactstrap';
import { isChrome, isSafari } from '../../untils';
import { Icon } from 'react-icons-kit';
import { search } from 'react-icons-kit/fa/search';
import { fire } from 'react-icons-kit/fa/fire'
import './index.scss';

const OgData = [
  {
    name: '日本',
    id: 'A01-003',
    hot: true
  }, {
    name: '韓國',
    id: 'A01-004',
    hot: true
  }, {
    name: '中國',
    id: 'A01-002',
    hot: false
  }, {
    name: '港澳',
    id: 'A01-005',
    hot: false
  }, {
    name: '美國',
    id: 'A05-001',
    hot: false
  }, {
    name: '加拿大',
    id: 'A01-002',
    hot: false
  }, {
    name: '澳洲',
    id: 'A06-001',
    hot: false
  }
];
console.log(!!isChrome, !!isSafari)
export default class Search extends Component {
	state = {
    dropdownOpen: false,
    data: OgData,
    inputValue: '',
    innerValue: ''
  }
  componentWillUpdate = () => {

  }
	toggle = () => {
		this.setState({
      dropdownOpen: !this.state.dropdownOpen,
		});
	}
	historyPush = (id) => {
		const location = {
			pathname: `/search/${id}`,
			search: '?sort=hdesc',
			state: { fromDashboard: true }
		}
		this.props.history.push(location);
  }
  processData = (text) => {
    let newData = OgData.filter((item) => {
      return item.name.indexOf(text) >= 0;
    });
    if (text === '') {
      newData = OgData;
    }
    return newData;
  }
	render() {
    let isOnComposition = false;
    let isInnerChangeFromOnChange = false;
    const isChrome = !!window.chrome && !!window.chrome.webstore;

    const onChange = (e) => {
      if (!(e.target instanceof HTMLInputElement)) return

      if (isInnerChangeFromOnChange) {
        this.setState({ inputValue: e.target.value, innerValue: e.target.value });
        isInnerChangeFromOnChange = false
        return
      }
      if (!isOnComposition) {
        this.setState({
          inputValue: e.target.value,
          innerValue: e.target.value,
        });
      } else {
        this.setState({ inputValue: e.target.value });
      }
    }
		const handleComposition = (e) => {
      if (!(e.target instanceof HTMLInputElement)) return

      if (e.type === 'compositionend') {
        if (isChrome) {
          this.setState({ innerValue: e.target.value })
        }
        if (isSafari) {
          isInnerChangeFromOnChange = true
        }

        isOnComposition = false
      } else {
        isOnComposition = true
      }
		}

    let item = () => {
      const { innerValue } = this.state;
      const data = this.processData(innerValue);
      if (data.length === 0) {
        return null;
      }else{
        return data.map((item, i)=>{
          return (
            <div className="listItem col-4" key={i} onClick={() => this.historyPush(`${item.id}`)}>
              {item.name}
              {
                item.hot && <Icon size={12} icon={fire} />
              }
            </div>
          )
        })
      }
    }

		return (
			<div className="container d-flex justify-content-center">
				<div className="kksearch col-12">
					<h5>Where to go?</h5>
					<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
						<DropdownToggle
							tag="div"
							onClick={this.toggle}
							data-toggle="dropdown"
							aria-expanded={this.state.dropdownOpen}
						>
							<div>
								<InputGroup>
									<Input
                    type="text"
                    value={this.state.inputValue}
										onCompositionStart={handleComposition}
										onCompositionUpdate={handleComposition}
										onCompositionEnd={handleComposition}
										onChange={onChange}
										onFocus={() => console.log('onFocus')}
										onBlur={() => console.log('onBlur')}
										placeholder="輸入城市、景點、體驗行程或活動名稱"
									/>
									<InputGroupAddon addonType="prepend">
										<Button color="primary">
											<Icon size={19} icon={search} />
										</Button>
									</InputGroupAddon>
								</InputGroup>
							</div>
						</DropdownToggle>
						<DropdownMenu className="container mt-0">
							<div className="d-flex flex-wrap pt-2">
								<div className="col-12">
									<h5>熱門地點</h5>
								</div>
                {item() || <div className="listItem col-12">查無資料，請重新輸入。</div>}
							</div>
						</DropdownMenu>
					</Dropdown>
				</div>
			</div>
		);
	}
}
