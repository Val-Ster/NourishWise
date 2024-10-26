const forgotBtn = document.querySelector('.forgotbtn');
forgotBtn.addEventListener('click', () => {
  const emailForReset = document.querySelector('#forgotinp').value.trim();
  if (emailForReset.length > 0) {
    auth.sendPasswordResetEmail(emailForReset)
      .then(() => {
        alert('Password reset email sent. Please check your inbox to reset your password.');
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
        forgotForm.style.display = 'none';
      })
      .catch((error) => {
        alert('Error sending password reset email: ' + error.message);
      });
  }
});
