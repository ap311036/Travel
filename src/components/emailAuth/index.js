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
import { envelopeO } from 'react-icons-kit/fa/envelopeO';
import { lock } from 'react-icons-kit/fa/lock';
import { user } from 'react-icons-kit/fa/user';
import firebase from 'firebase';
import { writeUserData } from "../../saga/firebase";
import PropTypes from 'prop-types';
import "./index.scss";
class EmailAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: '',
      email: '',
      password: '',
      passwordAgain: '',
      isEmailValid: false,
      isPasswordValid: false,
      error: '',
      signupShow: false,
      forgotPwd: false,
      inputDisabled: false,
      btnDisabled: false,
    };
  }

  componentDidMount = () => {

  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  }

  login = () => {
    const {
      email,
      password,
    } = this.state;
    this.setState({
      isEmailValid: this.validateEmail(email),
      isPasswordValid: password.length >= 8,
      error: this.validateEmail(email) || { message: '請輸入email正確格式' }
    });
    (this.validateEmail(email) && password.length >= 8) && this.validateLoginAccount(email, password);
  }

  validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateLoginAccount(email, password) {
    this.setState({ btnDisabled: true });
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          this.props.loginMemberSaga(user.user);
          this.setState({ btnDisabled: false })
          console.log(user.user);
        })
        .catch((res) => {
          this.setState({ error: res });
          console.log(res)
        })
    })
  }

  validateSignupAccount = () => {
    const {
      email,
      password,
      passwordAgain,
    } = this.state;
    (password && passwordAgain) && firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        writeUserData(this.state.name, email);
        this.validateLoginAccount(email, password);
        this.state.name && firebase.auth().currentUser.updateProfile({
          displayName: this.state.name,
        }).then(function () {
          // Update successful.
        }).catch(function (error) {
          // An error happened.
        });
      })
      .catch(() => {
        this.setState({ error: 'Authentication failed' });
      })

    this.setState({ btnDisabled: false })
  }

  sendPwdResetEmail = () => {
    const { email } = this.state;
    this.setState({ btnDisabled: true });
    firebase.auth().sendPasswordResetEmail(email).then(() => {
      // Email sent.
      alert('請至信箱收取密碼重設信，並且重新登入');
      this.setState({
        modal: false,
        forgotPwd: false,
        btnDisabled: false,
      });
    }).catch(function (error) {
      // An error happened.
      alert(error)
    });
  }

  toggleNested = () => {
    this.setState({ signupShow: !this.state.signupShow });
  }

  toggleforgotPwd = () => {
    this.setState({ forgotPwd: !this.state.forgotPwd });
  }

  render() {
    return (
      <div className={this.props.containerClass}>
        <div id="fireBaseAuth" style={{ display: 'none' }} />
        <div className="d-flex align-items-center" onClick={this.toggle}> 登入 / 註冊
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="emailAuth" >
          <ModalHeader toggle={this.toggle}>登入</ModalHeader>
          <ModalBody>
            <div className="d-flex justify-content-between flex-column flex-md-row">
              <div className="p-3">
                {
                  this.state.error.message &&
                  <div className="text-warning">
                    {this.state.error.message}
                  </div>
                }
                <InputGroup>
                  <InputGroupAddon addonType="prepend"><Icon size={32} icon={envelopeO} style={{ paddingRight: 10 }} /></InputGroupAddon>
                  <Input placeholder="E-mail" onChange={(e) => { this.setState({ email: e.target.value }); }} value={this.state.email} />
                </InputGroup>
                <br />
                <InputGroup>
                  <InputGroupAddon addonType="prepend"><Icon size={32} icon={lock} style={{ paddingRight: 10 }} /></InputGroupAddon>
                  <Input placeholder="Password" type="password" disabled={this.state.inputDisabled} onChange={(e) => { this.setState({ password: e.target.value }); }} value={this.state.password} />
                </InputGroup>
                <br />
              </div>
              <div className="m-border-left p-3 d-flex flex-column">
                <Button color="success" className="btn" onClick={this.toggleNested}>我還沒有帳號</Button>
                <br />
                <Button color="success" className="btn" onClick={this.toggleforgotPwd}>忘記密碼</Button>
                <Modal isOpen={this.state.signupShow} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
                  <ModalHeader>註冊新帳號</ModalHeader>
                  <ModalBody>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend"><Icon size={32} icon={user} style={{ paddingRight: 10 }} /></InputGroupAddon>
                      <Input placeholder="Name" onChange={(e) => { this.setState({ name: e.target.value }); }} value={this.state.name} />
                    </InputGroup>
                    <br />
                    <InputGroup>
                      <InputGroupAddon addonType="prepend"><Icon size={32} icon={envelopeO} style={{ paddingRight: 10 }} /></InputGroupAddon>
                      <Input placeholder="E-mail" onChange={(e) => { this.setState({ email: e.target.value }); }} value={this.state.email} />
                    </InputGroup>
                    <br />
                    <InputGroup>
                      <InputGroupAddon addonType="prepend"><Icon size={32} icon={lock} style={{ paddingRight: 10 }} /></InputGroupAddon>
                      <Input placeholder="Password" type="password" disabled={this.state.inputDisabled} onChange={(e) => { this.setState({ password: e.target.value }); }} value={this.state.password} />
                    </InputGroup>
                    <br />
                    <InputGroup>
                      <InputGroupAddon addonType="prepend"><Icon size={32} icon={lock} style={{ paddingRight: 10 }} /></InputGroupAddon>
                      <Input placeholder="Password Again" type="password" disabled={this.state.inputDisabled} onChange={(e) => { this.setState({ passwordAgain: e.target.value }); }} value={this.state.passwordAgain} />
                    </InputGroup>
                    <br />
                  </ModalBody>
                  <ModalFooter>
                    <Button color={this.state.btnDisabled ? 'secondary' : 'primary'} onClick={this.validateSignupAccount}>SignUp</Button>{' '}
                    <Button color="secondary" onClick={this.toggleNested}>Cancel</Button>
                  </ModalFooter>
                </Modal>


                <Modal isOpen={this.state.forgotPwd} toggle={this.toggleforgotPwd} onClosed={this.state.closeAll ? this.toggle : undefined}>
                  <ModalHeader>忘記密碼[寄送重設密碼信]</ModalHeader>
                  <ModalBody>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend"><Icon size={32} icon={envelopeO} style={{ paddingRight: 10 }} /></InputGroupAddon>
                      <Input placeholder="E-mail" onChange={(e) => { this.setState({ email: e.target.value }); }} value={this.state.email} />
                    </InputGroup>
                    <br />
                  </ModalBody>
                  <ModalFooter>
                    <Button color={this.state.btnDisabled ? 'secondary' : 'primary'} onClick={this.sendPwdResetEmail}>Send</Button>{' '}
                    <Button color="secondary" onClick={this.toggleforgotPwd}>Cancel</Button>
                  </ModalFooter>
                </Modal>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color={this.state.btnDisabled ? 'secondary' : 'primary'} onClick={this.login}>SignIn</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
EmailAuth.propTypes = {
  containerClass: PropTypes.string.isRequired,
};
EmailAuth.defaultProps = {
  containerClass: '',
};


export default EmailAuth;
