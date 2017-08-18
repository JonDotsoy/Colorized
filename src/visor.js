const {keyframes, injectGlobal, default: styled, ThemeProvider, css} = require('styled-components')
const MdClear = require('react-icons/lib/md/clear')
const Color = global.Color = require('color')
const React = require('react')

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto+Mono:100,300,400,500,700');
  @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700');

  html {
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
  }

  body {
    padding: 0px;
    margin: 0px;
  }
`

const LoadColorText = props => (
  Color(props.theme.color).dark()
    ? props.theme.colorTextLight
    : props.theme.colorTextDark
)

const TextColorStyle = css`
  color: ${LoadColorText};
`

const Header = styled.div`
    
`

const BodyContainer = styled.div`
  padding: 0px;
  min-height: 100vh;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  flex-direction: column;
`

const Brand = styled.label`
  font-family: 'Roboto', sans-serif;
  text-transform: uppercase;
  font-size: 1.2em;
  font-weight: 400;
  margin: 0px;
  ${TextColorStyle};
`

const TextColor = styled.label`
  font-family: 'Roboto Mono', monospace;
  ${TextColorStyle};
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
  position: relative;
`

const Footer = styled.div`
  text-transform: none;
  text-decoration: none;
  ${TextColorStyle};
  a:visited,
  a:link,
  a {
    ${TextColorStyle};
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

const keyframesHidden = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

const MessagePressEspaceToRandomColor = styled.span`
  position: absolute;
  font-size: 1em;
  text-transform: none;
  text-decoration: none;
  ${TextColorStyle};
  bottom: 0px;
  font-weight: 300;
  opacity: 0;
  animation-delay: 4s;
  animation: ${keyframesHidden} 2s linear 1;
`

const LeftActionsHeader = styled.div`
  float: right;
`

const ContainerListColors = styled.div`
  display: flex;
  position: relative;
  flex: 1;
`

const ColorItem = styled.div`
  background-color: red;
  flex: 1;
  ${TextColorStyle};
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  text-align: center;
`

const ColorItemText = styled.div`
  display: inline-block;
`

const ColorItemBtnRemove = styled.button`
  right: 0px;
  border: none;
  background-color: transparent;
  ${TextColorStyle};
`

const BtnAction = styled.button`
  border: none;
  ${TextColorStyle};
  background-color: transparent;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 0.8em;
  margin: 5px 10px;
  padding: 0px;
`

const DatePickerContainer = styled.div`
  ${TextColorStyle};
  position: absolute;
  width: 200px;
  border: solid 1px ${LoadColorText};
  left: 0px;
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

const DatePicker = function DatePicker (props) {
  const refs = {}
  const color = Color(props.value).color

  const handleChangeR = (event) => {
    color[0] = Number(event.target.value)
    props.onChange && props.onChange(Color.rgb(color).hex())
  }

  const handleChangeG = (event) => {
    color[1] = Number(event.target.value)
    props.onChange && props.onChange(Color.rgb(color).hex())
  }

  const handleChangeB = (event) => {
    color[2] = Number(event.target.value)
    props.onChange && props.onChange(Color.rgb(color).hex())
  }

  return (
    <DatePickerContainer>
      <DatePickerLabel>RED</DatePickerLabel>
      <DatePickerRange ref={e=>refs.iptr=e} type="range" onChange={handleChangeR} min={0} max={255} defaultValue={color[0]}/>
      <DatePickerLabel>GREEN</DatePickerLabel>
      <DatePickerRange ref={e=>refs.iptg=e} type="range" onChange={handleChangeG} min={0} max={255} defaultValue={color[1]}/>
      <DatePickerLabel>BLUE</DatePickerLabel>
      <DatePickerRange ref={e=>refs.iptb=e} type="range" onChange={handleChangeB} min={0} max={255} defaultValue={color[2]}/>
    </DatePickerContainer>
  )
}

const Render = (props) => (
  <ThemeProvider theme={props.theme}>
    <BodyContainer style={{
      backgroundColor: props.theme.color
    }}>

      <Header>
        <Brand>Colorized</Brand>
        <LeftActionsHeader>
          <BtnAction onClick={props.handleToggleColorPicker}>Picker</BtnAction>
          <BtnAction onClick={props.randomColor}>random</BtnAction>
        </LeftActionsHeader>

        {props.colorPickerVisible &&
          <DatePicker onChange={props.updateColor} value={props.theme.color}></DatePicker>
        }

      </Header>

      {(props.paletteView) === false &&
        <RenderViewSelectColor {...props} />
      }

      {props.paletteView === true &&
        <RenderViewColors {...props} />
      }

      <Footer>
        <a href='https://github.com/JonDotsoy/Colorized' target='_blank'>Github</a>
        <a href='https://jon.soy/' target='_blank'>JON.SOY</a>
      </Footer>

    </BodyContainer>
  </ThemeProvider>
)

const RenderViewSelectColor = ({theme, handleToggleViewPalette, handleAddColor}) => (
  <ContainerTextColor>
    <TextColor>
      {theme.color}
    </TextColor>
    <MessagePressEspaceToRandomColor>Use space key to change color</MessagePressEspaceToRandomColor>
  </ContainerTextColor>
)

const RenderViewColors = ({theme, handleToggleViewPalette, colors}) => (
  <ContainerListColors>
    { colors.map((color, index) => (
      <ThemeProvider key={index} theme={{...theme, color}}>
        <ColorItem key={index} style={{backgroundColor: color}}>
          <ColorItemText>{color}</ColorItemText>
          <ColorItemBtnRemove><MdClear /></ColorItemBtnRemove>
        </ColorItem>
      </ThemeProvider>
    )) }
  </ContainerListColors>
)

module.exports.Render = Render
