// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react"

// 2. Call `extendTheme` and pass your custom values
export default extendTheme({
  styles: {
    global: {
      'html, body': {
        margin: 0,
        padding: 0
      },
      '*': {
        boxSizing: 'border-box'
      }
    }
  },
  colors: {
    transparent: "transparent",
    pdftron: '#00a5e4',
    black: "#000",
    white: "#fff",
    'yellow-faded': '#FFFDF4',
    yellow: '#FFD80A',
    error: 'red',
    green: '#15CD83',
    gradient: {
      yellow: {
        1: 'radial-gradient(51.35% 161.37% at 12.3% 105.79%, #FFEBD8 0%, #FFFAED 33.38%, rgba(255, 255, 255, 0) 100%), radial-gradient(56.44% 135.64% at 81.92% 114.15%, #FFE6C1 0%, #FFF9E6 54.17%, #FFF9E6 100%);',
        2: 'radial-gradient(104.52% 43.5% at -7.3% 97.26%, #FEECE7 0%, #FFF7E3 60.5%, #FFFCF3 100%);'
      },
      blue: {
        // dark blue
        1: 'linear-gradient(180deg, #071028 0%, #1F3058 100%);'
      }
    },
    gray: {
      0: '#FFFFFF',
      100: '#F8F9FA',
      200: '#F1F3F5',
      300: '#E7EBEE',
      400: '#DEE2E6',
      500: '#CFD4DA',
      600: '#ADB5BD',
      700: '#868E96',
      800: '#69737C',
      900: '#485056',
      1000: '#343A40',
      1100: '#21242A',
      1200: '#101214',
      1300: '#000000'
    },
    blue: {
      0: '#F5F8FA',
      50: '#F5F8FA', 
      100: '#E7EDF3',
      200: '#DDE6EE',
      300: '#CFD8E0',
      400: '#C7D2DD',
      500: '#3183C8',
      600: '#1A4971',
      700: '#334758',
      800: '#334250',
      900: '#1B2B3A',
      1000: '#192530'
    }
  }
})