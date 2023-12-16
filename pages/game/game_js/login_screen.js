document.getElementById('usernameForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const usernameInput = document.getElementById('username');
    const username = usernameInput.value.trim();
  
    if (username !== '') {
      sessionStorage.setItem('username', username);
  
      window.location.href = '../game/main_screen.html';
    } else {
      alert('Введите ваше имя!');
    }
  });