const loginBtn=document.getElementById("loginBtn");
const signupBtn=document.getElementById("signupBtn");

const loginForm=document.getElementById("loginForm");
const signupForm=document.getElementById("signupForm");

loginBtn.onclick=()=>{

loginBtn.classList.add("active");
signupBtn.classList.remove("active");

loginForm.style.display="block";
signupForm.style.display="none";

}

signupBtn.onclick=()=>{

signupBtn.classList.add("active");
loginBtn.classList.remove("active");

signupForm.style.display="block";
loginForm.style.display="none";

}

function toggleLogin(){

const pass=document.getElementById("loginPassword");

pass.type=pass.type==="password"?"text":"password";

}

function toggleSignup(){

const pass=document.getElementById("signupPassword");

pass.type=pass.type==="password"?"text":"password";

}