const _ = global._ =  require('lodash')
const Color = global.Color = require('color')
const React = require('react')
const ReactDOM = require('react-dom')
const {Render} = require('./visor')

function updateHASHLink (txt) {
  // document?.location?.hash = txt
  try {
    if (document.location.hash !== txt) {
      document.location.hash = txt
    }
  } catch (ex) {}

  return txt
}

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      theme: {
        color: updateHASHLink(document.location.hash === '' ? Color.rgb(_.random(0, 255), _.random(0, 255), _.random(0, 255)).hex() : Color(document.location.hash).hex()),
        colorTextLight: '#FFF',
        colorTextDark: '#000'
      },
      paletteView: false,
      colors: [],
    }

    this.inputColor = null
  }

  componentWillMount () {
    window.onhashchange = () => {
       // do something awesome here
       this.updateColor(Color(document.location.hash).hex())
    }
    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 32) {
        this.randomColor()
      }
    })
  }

  getColors = () => {
    return [
      ...this.state.colors,
      this.state.theme.color
    ]
  }

  handleAddColor = () => {
    this.setState(({colors, theme: { color }}) => {

      return {
        paletteView: true,
        colors: [
          ...colors,
          color
        ]
      }

    })
  }

  updateColor = (color) => {
    updateHASHLink(color)

    this.setState((state) => ({
      theme: {
        ...state.theme,
        color
      }
    }))
  }

  randomColor = () => {
    this.updateColor(Color.rgb(_.random(0, 255), _.random(0, 255), _.random(0, 255)).hex())
  }

  handleChangeColor = (event) => {
    const newColor = event.target.value

    this.updateColor(newColor)
  }

  EditColor = () => {
    console.log(this.refs)
    this.refcolor.click()
  }

  handleToggleViewPalette = () => {
    this.setState(({paletteView}) => ({
      paletteView: !paletteView
    }))
  }

  render () {
    return (
      <Render
        paletteView={this.state.paletteView}
        theme={this.state.theme}
        colors={this.getColors()}
        randomColor={this.randomColor}
        handleAddColor={this.handleAddColor}
        handleToggleViewPalette={this.handleToggleViewPalette}
      />
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#app')
)
