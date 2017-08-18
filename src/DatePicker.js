const {default: styled, css} = require('styled-components')
const React = require('react')


const LoadColorText = props => (
  Color(props.theme.color).dark()
    ? props.theme.colorTextLight
    : props.theme.colorTextDark
)

const TextColorStyle = css`
  color: ${LoadColorText};
`

const DatePickerContainer = styled.div`
  ${TextColorStyle};
  position: absolute;
  width: 200px;
  border: solid 1px ${LoadColorText};
  right: 10px;
  top: 40px;
  background-color: ${props=>props.color};
  z-index: 1;
  padding: 10px;
  @media (max-width: 400px) {
    width: 100%;
  }
`

const DatePickerLabel = styled.label`
  ${TextColorStyle};
  display: block;
  width: 100%;
  font-weight: 400;
  padding: 0px;
  margin: 0px;
`

const DatePickerRange = styled.input`
  width: 100%;

  &::-webkit-slider-thumb {
    margin-top: -10px;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 1px;
    cursor: pointer;
    background: ${LoadColorText};
    border-radius: 1.3px;
    border: none;
  }
`

class DatePicker extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: props.value,
      color: Color(props.value).color
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.color !== this.state.color) {
      this.setState({
        color: Color(nextProps.value).color
      })
    }
  }

  handleChangeR = (event) => {
    const newColor = Number(event.target.value)

    if (newColor !== this.state.color[0]) {
      const color = [
        newColor,
        this.state.color[1],
        this.state.color[2],
      ]

      this.setState({ color })

      this.props.onChange && this.props.onChange( Color.rgb(color).hex() )
    }
  }

  handleChangeG = (event) => {
    const newColor = Number(event.target.value)

    if (newColor !== this.state.color[1]) {
      const color = [
        this.state.color[0],
        newColor,
        this.state.color[2],
      ]

      this.setState({ color })

      this.props.onChange && this.props.onChange( Color.rgb(color).hex() )
    }
  }

  handleChangeB = (event) => {
    const newColor = Number(event.target.value)

    if (newColor !== this.state.color[2]) {
      const color = [
        this.state.color[0],
        this.state.color[1],
        newColor,
      ]

      this.setState({ color })

      this.props.onChange && this.props.onChange( Color.rgb(color).hex() )
    }
  }

  render () {
      return (
        <DatePickerContainer>
          <DatePickerLabel>RED</DatePickerLabel>
          <DatePickerRange ref={e=>this.iptr=e} type="range" onChange={this.handleChangeR} min={0} max={255} value={this.state.color[0]}/>
          <DatePickerLabel>GREEN</DatePickerLabel>
          <DatePickerRange ref={e=>this.iptg=e} type="range" onChange={this.handleChangeG} min={0} max={255} value={this.state.color[1]}/>
          <DatePickerLabel>BLUE</DatePickerLabel>
          <DatePickerRange ref={e=>this.iptb=e} type="range" onChange={this.handleChangeB} min={0} max={255} value={this.state.color[2]}/>
        </DatePickerContainer>
      )

  }
}

// const DatePicker = function DatePicker (props) {
//   const refs = {}
// }

module.exports = {
  DatePicker,
}