import React from 'react'
import ReactDOM from 'react-dom'
import { Main } from '@aragon/ui'

import AddressField from './apps/AddressField'
import AppBarTabs from './apps/AppBarTabs'
import AppView from './apps/AppView'
import Button from './apps/Button'
import Checkbox from './apps/Checkbox'
import EmptyStateCard from './apps/EmptyStateCard'
import EthIdenticon from './apps/EthIdenticon'
import IdentityBadge from './apps/IdentityBadge'
import Input from './apps/Input'
import LineChart from './apps/LineChart'
import LinkedSliders from './apps/LinkedSliders'
import Modal from './apps/Modal'
import NavigationBar from './apps/NavigationBar'
import PartitionBar from './apps/PartitionBar'
import Popover from './apps/Popover'
import Radio from './apps/Radio'
import Scratchpad from './apps/Scratchpad'
import SidePanel from './apps/SidePanel'
import TabBar from './apps/TabBar'
import Timer from './apps/Timer'
import TransactionBadge from './apps/TransactionBadge'
import TransactionProgress from './apps/TransactionProgress'
import Viewport from './apps/Viewport'

const APPS = {
  AddressField,
  AppBarTabs,
  AppView,
  Button,
  Checkbox,
  EmptyStateCard,
  EthIdenticon,
  IdentityBadge,
  Input,
  LineChart,
  LinkedSliders,
  Modal,
  NavigationBar,
  PartitionBar,
  Popover,
  Radio,
  SidePanel,
  TabBar,
  Timer,
  TransactionBadge,
  TransactionProgress,
  Viewport,
}

class Index extends React.Component {
  state = {
    appName: '',
  }
  componentDidMount() {
    this.handleHashChange()
    window.addEventListener('hashchange', this.handleHashChange)
  }
  componentWillUnmount() {
    window.removeEventListener('hashchange', this.handleHashChange)
  }
  appNameFromHash(hash) {
    return hash.replace(/^#/, '')
  }
  handleHashChange = () => {
    const appName = this.appNameFromHash(window.location.hash)
    this.setState({ appName })
  }
  render() {
    const { appName } = this.state
    const CurrentApp = appName === 'Scratchpad' ? Scratchpad : APPS[appName]
    return CurrentApp ? (
      <Main>
        <CurrentApp />
      </Main>
    ) : (
      <React.Fragment>
        <style>{STYLES}</style>
        <main>
          <h1>Devbox</h1>
          <ul>
            <li>
              <a href="#Scratchpad">Scratchpad</a>
            </li>

            {Object.keys(APPS)
              .sort()
              .map(appName => (
                <li key={appName}>
                  <a href={`#${appName}`}>{appName}</a>
                </li>
              ))}
          </ul>
        </main>
      </React.Fragment>
    )
  }
}

const STYLES = `
*, *:before, *:after {
  box-sizing: border-box;
}
body {
  margin: 0;
  --background: hsl(48, 94%, 98%);
  --text-color: #111;
  --button-text: #111;
  --button: #FFF;
  --button-shadow: #111;
}
main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  padding: 0 20px 60px;
  font: 400 24px/1.5 sans-serif;
  color: var(--text-color);
  background: var(--background);
}
h1 {
  text-transform: lowercase;
  font-weight: 300;
  font-size: 60px;
  margin: -10px 0 100px;
  padding: 100px 80px 40px;
  border: 3px solid currentColor;
  border-radius: 5px;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  max-width: 600px;
  justify-content: center;
}
li a {
  display: inline-block;
  margin: 20px 10px;
  padding: 10px 20px;
  color: var(--button-text);
  text-decoration: none;
  border-radius: 5px;
  background: var(--button);
  border: 1px solid #000;
  transition-duration: 50ms;
  transition-timing-function: ease-in-out;
  transition-property: transform, box-shadow;
  box-shadow: 2px 2px var(--button-shadow);
}
li a:focus {
  outline: 0;
  box-shadow: 2px 3px var(--button-shadow);
  transform: translate(0, -1px);
}
li a:hover {
  box-shadow: 2px 2.5px var(--button-shadow);
  transform: translate(0, -0.5px);
}
li a:active {
  box-shadow: 1px 1px var(--button-shadow);
  transform: translate(1px, 1px);
}
`

ReactDOM.render(
  <Index />,
  document.body.appendChild(document.createElement('div'))
)
