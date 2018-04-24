//keyclockオブジェクトの作成
var keycloak = Keycloak('keycloak.json');

// ログインしているかの判定
keycloak.init().success(function(authenticated) {
    if(authenticated) {
        alert("ログインしています");
        var authInfo = document.getElementById("authInfo");
        authInfo.innerHTML = `<p>ログインしています</p><input type="button" value="ログアウト" onclick="logoutfunc()">`;
    } else {
        var authInfo = document.getElementById("authInfo");
        authInfo.innerHTML = `<input type="button" value="ログイン" onclick="loginfunc()">`;
    }
}).error(function() {
    alert('failed to initialize');
});

//ログイン処理
var loginfunc = function(){
    keycloak.login();
}

//ログアウト処理
var logoutfunc = function(){
    keycloak.logout();
}
