const {injectGlobal, default: styled, ThemeProvider} = require('styled-components')
const _ = global._ =  require('lodash')
const Color = global.Color = require('color')
const React = require('react')
const ReactDOM = require('react-dom')

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

const InputSelectColors = styled.input`
  display: none;
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
  }

  RandomColor = () => {

  }

  componentWillMount () {
    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 32) {
        this.setState((state) => ({
          theme: {
            ...state.theme,
            color: Color.rgb(_.random(0, 255), _.random(0, 255), _.random(0, 255)).hex()
          }
        }))
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

  render () {
    return (
      <div>
        <ThemeProvider theme={this.state.theme}>
          <BodyContainer>

            <Header>
              <Brand>Colorized</Brand>
              <InputSelectColors id="select-color" type='color' value={this.state.theme.color} onChange={this.handleChangeColor} />
            </Header>

            <ContainerTextColor>
              <TextColor htmlFor='select-color'>{this.state.theme.color}</TextColor>
            </ContainerTextColor>

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
