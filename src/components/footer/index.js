import React, { Component } from 'react';
import './index.scss';
import { facebookF } from 'react-icons-kit/fa/facebookF';
import { youtube } from 'react-icons-kit/fa/youtube';
import { instagram } from 'react-icons-kit/fa/instagram';
import { twitter } from 'react-icons-kit/fa/twitter';
import { bold } from 'react-icons-kit/fa/bold';
import { pinterest } from 'react-icons-kit/fa/pinterest';
import { tumblr } from 'react-icons-kit/fa/tumblr';
import { Icon } from 'react-icons-kit';
import { Friend } from 'react-line-social';

export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6 d-none d-sm-block">
                            <h4>認識KKmonth</h4>
                            <ul className="list-unstyled">
                                <li className="p"><a>關於KKmonth</a></li>
                                <li className="p"><a>聯絡我們</a></li>
                                <li className="p"><a>隱私權保護政策</a></li>
                                <li className="p"><a>常見問題與幫助</a></li>
                                <li className="p"><a>媒體報導</a></li>
                            </ul>
                        </div>
                        <div className="col-12 col-md-6 d-none d-sm-block">
                            <h4>給旅人</h4>
                            <ul className="list-unstyled">
                                <li className="p"><a>三大保證</a></li>
                                <li className="p"><a>合作夥伴</a></li>
                                <li className="p"><a>官方部落格</a></li>
                            </ul>
                        </div>
                        <div className="col-12 col-md-6 d-none d-sm-block">
                            <h4>KKmonth 合作夥伴</h4>
                            <ul className="list-unstyled">
                                <li className="p"><a>駐站特派員</a></li>
                                <li className="p"><a>成為我們的夥伴</a></li>
                                <li className="p"><a>聯盟行銷</a></li>
                                <li className="p"><a>工作機會</a></li>
                                <li className="p"><a>部落客/攝影師合作計畫</a></li>
                                <li className="p"><a>企業福委旅遊合作</a></li>
                            </ul>
                        </div>
                        <div className="col-12 col-md-6">
                            <h4>聯絡我們</h4>
                            <div className="iconList">
                                <div className="">
                                  <Friend lineid="@sim1246v" />
                                </div>
                                <div className="mt-3 mb-3 d-sm-none d-md-block">
                                  <img src={`${require('../../img/ERkmAG5pU8.png')}`} alt="QRCode"/>
                                </div>
                                <ul className="list-unstyled">
                                    <li><a><Icon size={21} icon={facebookF} /></a></li>
                                    <li><a><Icon size={21} icon={youtube} /></a></li>
                                    <li><a><Icon size={21} icon={instagram} /></a></li>
                                    <li><a><Icon size={21} icon={twitter} /></a></li>
                                    <li><a><Icon size={21} icon={bold} /></a></li>
                                    <li><a><Icon size={21} icon={pinterest} /></a></li>
                                    <li><a><Icon size={21} icon={tumblr} /></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="copyright text-right">
                            <span>COPYRIGHT © 2018 KKmonth All rights reserved.</span>
                        </div>
                    </div>
                </div>
                <div className="second-footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <ul className="list-unstyled">
                                    <li>遨遊天國際旅行社股份有限公司</li>
                                    <li>甲種旅行業</li>
                                    <li>交觀甲04137</li>
                                    <li>統一編號 2497 7417</li>
                                </ul>
                            </div>
                            <div className="col-12 col-md-6">
                                <ul className="list-unstyled">
                                    <li>地址 台北市南港區八德路四段769巷15號13樓之11</li>
                                    <li>電話 02-7777-8888</li>
                                    <li>手機 0988-888-888</li>
                                    <li>傳真 02-8888-8888</li>
                                    <li>e-mail service＠kkmonth.com</li>
                                </ul>
                            </div>
                            <div className="col-12 col-md-6">
                                <ul className="list-unstyled">
                                    <li>代表人 張凱倫</li>
                                    <li>聯絡人 蘇凱倫</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
