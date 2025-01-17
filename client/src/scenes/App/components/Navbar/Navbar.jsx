import React from 'react'
import { Link } from 'react-router-dom'

import { useIntl } from 'services'
import { useConfiguration } from 'contexts'
import { Authenticated, Button, Icon } from 'components'

import { GithubIcon, UserMenu } from './components'

import './Navbar.scss'

const Navbar = () => {
  const intl = useIntl(Navbar)

  const conf = useConfiguration()

  return (
    <div className="navbar">
      <div className="brand">
        <Link to="/" className="title">
          <img alt="emoji" src="/img/favicon/favicon-64.png" />
          FAQ {conf.title || ''}
        </Link>
      </div>
      <div className="navigation">
        {conf.bugReporting === 'GITHUB' ? (
          <a
            href="https://github.com/zenika-open-source/FAQ/issues/new?template=bug_report.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
            <span>{intl('report_bug')}</span>
          </a>
        ) : (
          <a
            href={
              'mailto:thibaud.courtoison@zenika.com' // Using this address until bug@faq.team works again
              /* `mailto:bug@${process.env.REACT_APP_FAQ_URL}` */
            }
          >
            <Icon material="mail" style={{ fontSize: '14px' }} />
            <span>{intl('report_bug')}</span>
          </a>
        )}
        <Authenticated>
          <UserMenu />
          <Link to="/q/new">
            <Button label={<b>{intl('new_question')}</b>} primary fixed />
          </Link>
        </Authenticated>
      </div>
    </div>
  )
}

Navbar.translations = {
  en: { report_bug: 'report a bug', new_question: 'New question' },
  fr: { report_bug: 'signaler un bug', new_question: 'Nouvelle question' }
}

export default Navbar
