export function validatePostFormFields({ title, body, userId }) {
  let errors = {}

  // Get title and check if it is empty.
  if (title.length === 0) {
    errors["title"] = "Title is required"
  }

  // Get body and check if it is empty.
  if (body.length === 0) {
    errors["body"] = "Body is required"
  }

  // Get author and check if it is empty.
  if (userId.length === 0) {
    errors["userId"] = "Author is required"
  }

  return errors
}
