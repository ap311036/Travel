
export function checkFacebookUserAuth() {
  return new Promise((resolve, reject) => {
    window.fbAsyncInit = function () {
      console.log('run fbAsync')
      window.FB.init({
        appId: '2223578957716686',
        cookie: true,
        xfbml: true,
        version: 'v3.1'
      });

      window.FB.getLoginStatus(function (response) {
        // resolve(response)
        console.log('getLoginStatus', response);
      });

      window.FB.Event.subscribe('auth.statusChange', (response) => {
        if (response.AuthResponse) {
          console.log('response true', response);
          // this.updataLoggedInState(response);
        } else {
          console.log('response false', response);
          // this.updataLoggedOutState();
        }
      })
    }.bind(this);

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/zh_TW/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  })
}