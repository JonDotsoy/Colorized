const {injectGlobal, default: styled, ThemeProvider} = require('styled-components')
const _ = global._ =  require('lodash')
const Color = global.Color = require('color')
const React = require('react')
const ReactDOM = require('react-dom')
const MdContentCopy = require('react-icons/lib/md/content-copy')
const MdAutorenew = require('react-icons/lib/md/autorenew')
const MdCreate = require('react-icons/lib/md/create')

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto+Mono:100,300,400,500,700');
  @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700');
  html {
    font-family: 'Roboto', sans-serif;
    font-weight: 200;
  }

  body {
    padding: 0px;
    margin: 0px;
  }
`

const Header = styled.div`
    
`

const BodyContainer = styled.div`
  background-color: ${props => props.theme.color};
  padding: 0px;
  min-height: 100vh;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  flex-direction: column;
`

const LoadColorText = props => (
  Color(props.theme.color).dark()
    ? props.theme.colorTextLight
    : props.theme.colorTextDark
)

const Brand = styled.label`
  font-family: 'Roboto', sans-serif;
  text-transform: uppercase;
  font-size: 1.2em;
  font-weight: 400;
  margin: 0px;
  color: ${LoadColorText};
`

const TextColor = styled.label`
  font-family: 'Roboto Mono', monospace;
  color: ${LoadColorText};
  font-weight: 100;
  font-size: 3em;
  margin: 0px;
  text-transform: uppercase;
  text-align: center;
  display: block;
  align-self: center;
`

const ContainerTextColor = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`

const InputSelectColors = styled.div`
  display: none;
`

const Footer = styled.div`
  text-transform: none;
  text-decoration: none;
  color: ${LoadColorText};
  a:visited,
  a:link,
  a {
    color: ${LoadColorText};
    text-decoration: none;
    font-weight: 300;
  }
  a:after {
    content: ' — ';
  }
  a:last-child:after {
    content: '';
  }
`

const BtnClipColor = styled.button`
  display: inline-block;
  border: none;
  background: none;
  font-size:2em;
  margin: 0px;
  padding: 0px;
  color: ${LoadColorText};
  opacity: 0.7;
`

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      theme: {
        color: Color.rgb(_.random(0, 255), _.random(0, 255), _.random(0, 255)).hex(),
        colorTextLight: '#FFF',
        colorTextDark: '#000'
      }
    }
    this.inputColor = null
  }

  RandomColor = () => {
    this.setState((state) => ({
      theme: {
        ...state.theme,
        color: Color.rgb(_.random(0, 255), _.random(0, 255), _.random(0, 255)).hex()
      }
    }))
  }

  componentWillMount () {
    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 32) {
        this.RandomColor()
      }
    })
  }

  handleChangeColor = (event) => {
    const newColor = event.target.value

    this.setState((state) => ({
      theme: {
        ...state.theme,
        color: newColor
      }
    }))
  }

  EditColor = () => {
    console.log(this.refs)
    this.refcolor.click()
  }

  render () {
    return (
      <div>
        <ThemeProvider theme={this.state.theme}>
          <BodyContainer>

            <Header>
              <Brand>Colorized</Brand>
              <InputSelectColors>
                <input ref={r=>this.refcolor=r} id="select-color" type='color' value={this.state.theme.color} onChange={this.handleChangeColor} />
              </InputSelectColors>
            </Header>

            <ContainerTextColor>
              <BtnClipColor onClick={this.RandomColor}><MdAutorenew></MdAutorenew></BtnClipColor>
              <TextColor>{this.state.theme.color}</TextColor>
              <BtnClipColor onClick={this.EditColor}><MdCreate></MdCreate></BtnClipColor>
            </ContainerTextColor>

            <Footer>
              <a href="https://github.com/JonDotsoy/Colorized" target="_blank">Github</a>
              <a href="https://jon.soy/" target="_blank">JON.SOY</a>
            </Footer>

          </BodyContainer>
        </ThemeProvider>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#app')
)
