import { axios } from '@modules'
import { capitalize } from '@helpers'

import {
  RAPIDAPI_EMAIL_KEY,
  APP_EMAIL,
  APP_NAME,
  RAPIDAPI_EMAIL_URL,
  RAPIDAPI_EMAIL_HOST,
} from '@config'


const email = async (message: string, emailTo: string): Promise<boolean> => {
  let isSuccess = false

  const data = {
    personalizations: [{
      to: [{ email: emailTo }],
      subject: "API Key Request New"
    }],
    from: {
      email: APP_EMAIL,
      name: capitalize(APP_NAME)
    },
    content: [{
      type: 'text/html',
      value: message
    }]
  }

  const options = {
    method: 'POST',
    url: RAPIDAPI_EMAIL_URL,
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': RAPIDAPI_EMAIL_KEY,
      'X-RapidAPI-Host': RAPIDAPI_EMAIL_HOST
    },
    data: data
  };

  await axios.request(options).then((res: any) => {
    isSuccess = true;
  }).catch((error: Error | any) => {
    throw new Error(error)
  })
  return isSuccess
}

export default email