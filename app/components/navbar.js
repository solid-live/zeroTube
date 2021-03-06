import React, { Component } from 'react'
import Constants from '../util/constants'
import Login from './login'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as videosActions from '../videos/actions'

class Navbar extends Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleQueryChange = this.handleQueryChange.bind(this)
    this.state = {}
  }

  handleQueryChange (e) {
    this.setState({query: e.target.value})
  }

  handleSubmit (e) {
    e.preventDefault()
    if (this.state.query) {
      this.props.actions.searchVideos(this.state.query)
      this.context.router.push({pathname: '/search'})
    }
  }

  render () {
    let style = {
      right: '6rem'
    }
    return (
      <nav className="navbar navbar-light bg-faded">
        <Link to={`${Constants.APP_ID}`} className="navbar-brand col-xs-1" ><img src="public/img/zerotube-logo.svg" height="35" /></Link>
        <div>
          <form className="form-inline" name="searchForm" onSubmit={this.handleSubmit} >
            <input className="form-control" value={this.state.query} onChange={this.handleQueryChange} type="text" name="query" placeholder="Search" />
            <input className="btn-glass" type="submit" value="Submit" />
          </form>
        </div>
        <ul style={style} className="nav navbar-nav">
          <Login />
          <li className="nav-item">
            <Link className="nav-link" to="/upload">Upload</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/how">How it works</Link>
          </li>
        </ul>
      </nav>
    )
  }
}

Navbar.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    videos: state.videos
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(videosActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar)
