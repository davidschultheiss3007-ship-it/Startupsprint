import { useState } from 'react'
import { validateInquiry } from '../lib/validation.js'
import { submitInquiry } from '../lib/submitInquiry.js'

const initialValues = {
  name: '',
  email: '',
  phone: '',
  request: '',
  budget: '',
  contactVia: 'email',
  marketingOptIn: false, // freiwillige Einwilligung in weitere E-Mails
  website: '', // Honeypot gegen Spam-Bots – bleibt für Menschen unsichtbar
}

export default function useContactForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const setField = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors(({ [name]: _removed, ...rest }) => rest)
  }

  const onChange = (e) => {
    const { name, type, value, checked } = e.target
    setField(name, type === 'checkbox' ? checked : value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (values.website) return // Bot erkannt

    const nextErrors = validateInquiry(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      const first = Object.keys(nextErrors)[0]
      document.querySelector(`[name="${first}"]`)?.focus()
      return
    }

    setStatus('sending')
    try {
      await submitInquiry(values)
      setStatus('success')
      setValues(initialValues)
    } catch {
      setStatus('error')
    }
  }

  return { values, errors, status, onChange, setField, onSubmit, reset: () => setStatus('idle') }
}
