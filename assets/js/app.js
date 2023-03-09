// app.js
// 구글 로그인 버튼 클릭 시 이벤트 핸들러
import URL_VARIABLE from './export.js';

document.querySelector('#googleLoginButton').addEventListener('click', () => {
    // 구글 OAuth2 로그인 요청
    const provider = 'google';
    const redirectUri = encodeURIComponent(URL_VARIABLE + 'oauth2/callback/google');
    window.location.href = URL_VARIABLE + `oauth2/authorization/google?redirect_uri=${redirectUri}`;
  });
  
  // 로그아웃 버튼 클릭 시 이벤트 핸들러
  document.querySelector('#logoutButton').addEventListener('click', () => {
    // localStorage에서 accessToken, refreshToken, username 제거
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
  
    // 기본 인덱스 페이지로 이동
    window.location.href = 'index.html';
  });
  
  // OAuth2 로그인 후 처리
  if (window.location.search.includes('code')) {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
  
    fetch('/oauth2/callback/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: code
      })
    })
      .then(response => response.json())
      .then(data => {
        // 받아온 access token, refresh token, username을 localStorage에 저장
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('username', data.username);
      });
  }
  
  // API 요청 시 access token을 Authorization 헤더에 담아서 요청
  const accessToken = localStorage.getItem('accessToken');
  fetch('/api/some-endpoint', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Refresh': `Bearer ${refreshToken}`
    }
  })
    .then(response => {
      // API 응답 처리
      console.log(response);
    })
    .catch(error => {
      // API 에러 처리
      console.error(error);
    });
