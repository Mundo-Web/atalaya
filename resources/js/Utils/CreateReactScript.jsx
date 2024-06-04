import { createInertiaApp } from '@inertiajs/react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Cookies, FetchParams } from 'sode-extend-react'
import Adminto from '../components/Adminto'

const CreateReactScript = (render) => {

  createInertiaApp({
    resolve: name => `./${name}.jsx`,
    setup: ({ el, props }) => {
      const properties = props.initialPage.props
      FetchParams.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Xsrf-Token': decodeURIComponent(Cookies.get('XSRF-TOKEN'))
      }
      render(el, properties)
    },
  });
}

export default CreateReactScript