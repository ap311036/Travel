import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputGroupAddon,
  Input,
} from 'reactstrap';
import { Icon } from 'react-icons-kit';
import { phone } from 'react-icons-kit/fa/phone';
import { lock } from 'react-icons-kit/fa/lock';
// import { user } from 'react-icons-kit/fa/user';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import "./index.scss";

// import config from '../../config/config';
// firebase.initializeApp(config);

class PhoneAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      // phone: '0987978978',
      btnText: '請輸入驗證碼',
      otpCode: '',
      disabled: true,
      inputDisabled: true,
      btnPlaceHolder: 'Send OTP'
    };
    this.toggle = this.toggle.bind(this);
    this.validateLoginAccount = this.validateLoginAccount.bind(this);
  }

  componentDidMount() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('fireBaseAuth', {
      size: 'invisible',
      callback: (res) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log('res', res);
      }
    });
    // window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('fireBaseAuth');
    console.log(window.parent.opener)
  }
  sendOtp = () => {
    // let recaptchaResponse = grecaptcha.getResponse(window.recaptchaWidgetId);
    // Send a verification code to the user's phone
    const phoneNumber = `+886${this.state.phone.trim()}`;
    const appVerifier = window.recaptchaVerifier;
    this.setState({btnPlaceHolder: '寄送中...'})
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log('confirmationResult 驗證碼送出', confirmationResult);
        this.setState({ inputDisabled: false, btnPlaceHolder: '已送出' });
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log('sendOtp error', error);
      });
   
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  validateLoginAccount() {
    const code = this.state.otpCode.trim();
    this.setState({ disabled: true, btnText: '請稍後...' })
    window.confirmationResult.confirm(code)
      .then((result) => {
        // User signed in successfully.
        // const user = result.user;
        const { user } = result;
        console.log('OTP驗證完成');
        console.log('user Data', user.providerData);

        // Get the intermediate AuthCredential object
        // const credential = firebase.auth.PhoneAuthProvider.credential(window.confirmationResult.verificationId, code);
        // console.log('credential', credential);

        // Then, you can sign in the user with the credential:
        // firebase.auth().signInAndRetrieveDataWithCredential(credential);

        window.parent.opener.postMessage({ pay: true }, window.location.href);
        window.close();
        return { userObj: user.providerData };
      })
      .then((stateData) => {
        this.setState({ modal: !this.state.modal },
          // () => this.props.loginMemberSaga(stateData.userObj[0])
        );
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        alert('驗證碼輸入錯誤，請重新輸入');
        console.log('OTP驗證error', error);
      });
  }

  validateCodeLength = (e) => {
    if (e.target.value.length >= 6 && window.confirmationResult) {
      this.setState({ otpCode: e.target.value, disabled: false, btnText: '確定' });
    } else {
      this.setState({ disabled: true, btnText: '請輸入驗證碼' });
    }
  }

  render() {
    return (
      <div className={this.props.containerClass}>
        <div id="fireBaseAuth" style={{ display: 'none' }} />
        <div className="d-flex align-items-center" onClick={this.toggle}>
          <Button color="info" size="lg">前往結帳</Button>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>結帳驗證碼</ModalHeader>
          <ModalBody>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend"><Icon size={32} icon={phone} style={{ paddingRight: 10 }} /></InputGroupAddon>
              <Input placeholder="PhoneNumber" onChange={(e) => { this.setState({ phone: e.target.value }); }} value={this.state.phone} />
              <InputGroupAddon addonType="prepend">
                <Button color="secondary" onClick={this.sendOtp}>{this.state.btnPlaceHolder}</Button>
              </InputGroupAddon>
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend"><Icon size={32} icon={lock} style={{ paddingRight: 10 }} /></InputGroupAddon>
              <Input placeholder="Code" disabled={this.state.inputDisabled} onChange={(e) => { this.validateCodeLength(e); }} />
            </InputGroup>
            <br />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.validateLoginAccount} disabled={this.state.disabled}>{this.state.btnText}</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
PhoneAuth.propTypes = {
  containerClass: PropTypes.string.isRequired,
};
PhoneAuth.defaultProps = {
  containerClass: '',
};


export default PhoneAuth;
