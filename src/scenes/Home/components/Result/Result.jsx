import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { markdown } from 'services'

import Avatar from 'components/Avatar'
import Card, { CardTitle, CardText } from 'components/Card'
import Flags from 'components/Flags'

import './Result.css'

class Result extends Component {
  constructor (props) {
    super(props)

    this.state = {
      collapsed: props.collapsed || false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.collapsed !== this.state.collapsed) {
      this.setState({ collapsed: nextProps.collapsed })
    }
  }

  render () {
    const { node } = this.props
    const { collapsed } = this.state

    return (
      <Card className="result">
        <CardTitle onClick={() => this.setState({ collapsed: !collapsed })}>
          <div className="grow">
            {!node.highlight ? (
              <h1>{markdown.title(node.question.title)}</h1>
            ) : (
              <h1
                dangerouslySetInnerHTML={{
                  __html: markdown.title(node.highlight.question.title.value)
                }}
              />
            )}
            <div className="meta">
              <Avatar image={node.question.user.picture} />
              <i className="user">
                Asked by {node.question.user.name},&nbsp;
                {moment(node.question.createdAt).fromNow()}
              </i>
            </div>
          </div>
          <Flags node={node} withLabels={false} />
          <Link to={`/q/${node.question.slug}`} className="open-card">
            <i className="material-icons">keyboard_arrow_right</i>
          </Link>
        </CardTitle>
        <CardText collapsed={collapsed}>
          {node.answer ? (
            markdown.html(
              node.highlight
                ? node.highlight.answer.content.value
                : node.answer.content
            )
          ) : (
            <p style={{ textAlign: 'center' }}>
              <i>No answer yet...</i>
            </p>
          )}
        </CardText>
      </Card>
    )
  }
}

Result.propTypes = {
  node: PropTypes.object.isRequired,
  collapsed: PropTypes.bool
}

export default Result