export function validateEmail(email) {
  const errors = []

  if (email.length == 0) {
    errors.push("Email is required")
  }

  if (!email.endsWith("@webdevsimplified.com")) {
    errors.push("Must end with @webdevsimplified.com")
  }

  return errors
}

export function validatePassword(password) {
  const errors = []

  if (password.length == 0) {
    errors.push("Password is required")
  }

  if (password.length < 10) {
    errors.push("Password must be 10 characters long")
  }
  if (!password.match(/[a-z]/)) {
    errors.push("Password must include at least 1 lowercase letter")
  }
  if (!password.match(/[A-Z]/)) {
    errors.push("Password must include at least 1 uppercase letter")
  }
  if (!password.match(/[0-9]/)) {
    errors.push("Password must include at least 1 number")
  }

  return errors
}
