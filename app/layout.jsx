import '@styles/globals.css'
import { Children } from 'react'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
    title: 'Promptopia',
    description: 'Discover & Share AI Prompt'
}

const RootLayout = ({children}) => {
  return (
    <html lang='en'>
        <Provider>
            <body>
                <div className="main">
                    <div className="gradient"/>
                </div>
                <div className="app">
                    <Nav/>
                    {children}
                </div>
            </body>
        </Provider>
    </html>
  )
}

export default RootLayout