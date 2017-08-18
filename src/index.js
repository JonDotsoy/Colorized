const _ = global._ =  require('lodash')
const Color = global.Color = require('color')
const React = require('react')
const ReactDOM = require('react-dom')
const {Render} = require('./visor')
const debounce = require('lodash/debounce')

const updateHASHLink = debounce(function updateHASHLink (txt) {
  var _document, _document$location;

  (_document = document) == null ? void 0 : (_document$location = _document.location) == null ? void 0 : _document$location.hash = txt;
}, 200)

class App extends React.Component {
  constructor (props) {
    super(props)

    const color = document.location.hash === '' ? Color.rgb(_.random(0, 255), _.random(0, 255), _.random(0, 255)).hex() : Color(document.location.hash).hex()

    updateHASHLink(color)

    this.state = {
      theme: {
        color,
        colorTextLight: '#FFF',
        colorTextDark: '#000'
      },
      paletteView: false,
      colorPickerVisible: !false,
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

  handleToggleColorPicker = () => {
    this.setState(({colorPickerVisible}) => ({colorPickerVisible: !colorPickerVisible}))
  }

  render () {
    return (
      <Render
        paletteView={this.state.paletteView}
        theme={this.state.theme}
        randomColor={this.randomColor}
        updateColor={this.updateColor}
        handleAddColor={this.handleAddColor}
        colorPickerVisible={this.state.colorPickerVisible}
        handleToggleColorPicker={this.handleToggleColorPicker}
        handleToggleViewPalette={this.handleToggleViewPalette}
      />
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#app')
)
