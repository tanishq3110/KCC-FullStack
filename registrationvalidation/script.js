const form = document.getElementById("form")

const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email")
const phoneInput = document.getElementById("phone")
const passwordInput = document.getElementById("password")

const togglePassword = document.getElementById("togglePassword")
const strengthBar = document.getElementById("strengthBar")

const nameError = document.getElementById("nameError")
const emailError = document.getElementById("emailError")
const phoneError = document.getElementById("phoneError")
const passwordError = document.getElementById("passwordError")

/* Name validation */
nameInput.addEventListener("input", () => {

if(nameInput.value.length < 3)
nameError.textContent = "Name must be at least 3 characters"
else
nameError.textContent = ""

})

/* Email validation */

emailInput.addEventListener("input", () => {

const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/

if(!pattern.test(emailInput.value))
emailError.textContent = "Invalid Email"
else
emailError.textContent = ""

})

/* Phone validation */

phoneInput.addEventListener("input", () => {

const pattern = /^[0-9]{10}$/

if(!pattern.test(phoneInput.value))
phoneError.textContent = "Enter 10 digit phone"
else
phoneError.textContent = ""

})

/* Password strength */

passwordInput.addEventListener("input", () => {

let strength = 0
const val = passwordInput.value

if(val.length >= 6) strength++
if(/[A-Z]/.test(val)) strength++
if(/[0-9]/.test(val)) strength++
if(/[^A-Za-z0-9]/.test(val)) strength++

strengthBar.style.width = strength*25 + "%"

if(strength <=1) strengthBar.style.background="red"
else if(strength ==2) strengthBar.style.background="orange"
else if(strength ==3) strengthBar.style.background="yellow"
else strengthBar.style.background="green"

})

/* Show Hide password */

togglePassword.addEventListener("click", () => {

if(passwordInput.type === "password"){
passwordInput.type = "text"
togglePassword.textContent="Hide"
}
else{
passwordInput.type = "password"
togglePassword.textContent="Show"
}

})

/* Form submit */

form.addEventListener("submit",(e)=>{

e.preventDefault()

const data = {

name: nameInput.value,
email: emailInput.value,
phone: phoneInput.value,
password: passwordInput.value

}

let submissions = JSON.parse(localStorage.getItem("submissions")) || []

submissions.push(data)

localStorage.setItem("submissions", JSON.stringify(submissions))

alert("Registration Successful")

form.reset()

strengthBar.style.width="0%"

})