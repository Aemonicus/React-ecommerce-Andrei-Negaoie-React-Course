import { useState } from "react"
import { createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword
 } from "../../utils/firebase/firebase.utils"
import ButtonComponent from "../button/button.component"
import FormInput from "../form-input/form-input.component"
import "./sign-in-form.styles.scss"

const defaultFormFields = {
  email: "",
  password: "",
}

export const SignInForm = () => {
  
  const [formFields, setFormFields] = useState(defaultFormFields)

  const { email, password} = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password)
      resetFormFields()
    } catch (error) {
      switch(error.code) {
        case "auth/wrong-password":
          alert("Incorrect password or email")
          break
        case "auth/user-not-found":
          alert("No user associated with this email")
          break
        
        default:
          console.log(error)
      }      
    }
  }

  const handleChange = e => {
    const {name, value} = e.target
    setFormFields({...formFields,[name]: value})
  }

  const signInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup()
    await createUserDocumentFromAuth(user)
  }

  return (
    <div className="sign-up-container">
      <h2>Already have an account ?</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
        <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>    
        
        <div className="buttons-container">
          <ButtonComponent type='submit'>Sign In</ButtonComponent>
          <ButtonComponent type="button" buttonType='google' onClick={signInWithGoogle}>Google Sign In</ButtonComponent>
        </div>
      </form>
    </div>
  )
}
