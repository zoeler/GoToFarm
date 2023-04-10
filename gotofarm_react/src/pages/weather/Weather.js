// 載入元件
import React, { useEffect, useState, useCallback } from 'react'
import '../../css/weather.css'
import styled from '@emotion/styled'
import { ThemeProvider } from '@emotion/react'
import dayjs from 'dayjs'

// 載入圖示
import { ReactComponent as AirFlowIcon } from './images/airFlow.svg'
import { ReactComponent as RainIcon } from './images/rain.svg'
import { ReactComponent as RefreshIcon } from './images/refresh.svg'
import { ReactComponent as LoadingIcon } from './images/loading.svg'
import WeatherIcon from './Weathericon'
const theme = {
  light: {
    backgroundColor: '#ededed',
    foregroundColor: '#f9f9f9',
    boxShadow: '0 1px 3px 0 #999999',
    titleColor: '#212121',
    temperatureColor: '#757575',
    textColor: '#828282',
  },
  dark: {
    backgroundColor: '#1F2022',
    foregroundColor: '#121416',
    boxShadow:
      '0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)',
    titleColor: '#f9f9fa',
    temperatureColor: '#dddddd',
    textColor: '#cccccc',
  },
}

//卡片大小
const WeatherCard = styled.div`
  position: relative;
  width: 100%;
  height: 272px;
  aspect-ratio: 1/1;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.foregroundColor};
  box-sizing: border-box;
  border-radius: 20px;
  padding: 15px;
`
//縣市
const Location = styled.div`
  font-size: 28px;
  color: ${({ theme }) => theme.titleColor};
`
//天氣狀況
const Description = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.textColor};
`
//控制氣溫及氣象icon
const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
//氣溫
const Temperature = styled.div`
  color: ${({ theme }) => theme.temperatureColor};
  font-size: 24px;
  font-weight: 300;
  display: flex;
`
//度c
const Celsius = styled.div`
  font-weight: normal;
  font-size: 24px;
`
//風速
const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};
  ${'' /* margin-bottom: 20px; */}

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`
//雨量
const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 300;
  margin-top: 10px;
  color: ${({ theme }) => theme.textColor};

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`
//重整大小
const Refresh = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: ${({ theme }) => theme.textColor};

  svg {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    /*使用rotate動畫效果在svg圖示上 */
    animation: rotate infinite 1.5s linear;
    animation-duration: ${({ isLoading }) => (isLoading ? '1.5s' : '0s')};
  }
  /* STEP 1：定義旋轉的動畫效果，並取名為 rotate */
  @keyframes rotate {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
`

const LOCATION_NAME = '臺北' // STEP 1：定義 LOCATION_NAME
const LOCATION_NAME_FORECAST = '臺北市'

// const fetchCurrentWeather = () => {
//   return fetch(
//     `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${AUTHORIZATION_KEY}&locationName=${LOCATION_NAME}`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       const locationData = data.records.location[0]

//       const weatherElements = locationData.weatherElement.reduce(
//         (neededElements, item) => {
//           if (['WDSD', 'TEMP'].includes(item.elementName)) {
//             neededElements[item.elementName] = item.elementValue
//           }
//           return neededElements
//         },
//         {}
//       )

//       return {
//         observationTime: locationData.time.obsTime,
//         locationName: locationData.locationName,
//         temperature: weatherElements.TEMP,
//         windSpeed: weatherElements.WDSD,
//       }
//     })
// }
// const fetchWeatherForecast = () => {
//   return fetch(
//     `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${AUTHORIZATION_KEY}&locationName=${LOCATION_NAME_FORECAST}`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       const locationData = data.records.location[0]
//       const weatherElements = locationData.weatherElement.reduce(
//         (neededElements, item) => {
//           if (['Wx', 'PoP', 'CI'].includes(item.elementName)) {
//             neededElements[item.elementName] = item.time[0].parameter
//           }
//           return neededElements
//         },
//         {}
//       )

//       return {
//         description: weatherElements.Wx.parameterName,
//         weatherCode: weatherElements.Wx.parameterValue,
//         rainPossibility: weatherElements.PoP.parameterName,
//         comfortability: weatherElements.CI.parameterName,
//       }
//     })
// }

function Weather() {
  const [currentTheme, setCurrentTheme] = useState('light')
  // 定義會使用到的資料狀態
  const [weatherElenment, setWeatherElement] = useState({
    observationTime: new Date(),
    locationName: '',
    description: '',
    windSpeed: 0,
    temperature: 0,
    rainPossibility: 0,
    comfortability: '',
    weatherCode: 0,
    isLoading: true,
  })
  // const fetchData = useCallback(async () => {
  //   setWeatherElement((prevState) => ({
  //     ...prevState,
  //     isLoading: true,
  //   }))

  // const [currentWeather, weatherForecast] = await Promise.all([
  //   fetchCurrentWeather(),
  //   fetchWeatherForecast(),
  // ])

  //   setWeatherElement({
  //     ...currentWeather,
  //     ...weatherForecast,
  //     isLoading: false,
  //   })
  // }, [])

  // useEffect(() => {
  //   fetchData()
  //   // console.log(observationTime)
  // }, [fetchData])

  const {
    observationTime,
    locationName,
    description,
    windSpeed,
    temperature,
    rainPossibility,
    isLoading,
    comfortability,
    weatherCode,
  } = weatherElenment

  return (
    <>
      <div>
        <div className="f-Brown">天氣</div>
        <ThemeProvider theme={theme[currentTheme]}>
          {/* {console.log('render,isLoading:,isLoading')} */}
          <WeatherCard>
            <Location>{locationName}</Location>
            <Description>
              {description}
              {comfortability}
            </Description>
            <CurrentWeather>
              <Temperature>
                {Math.round(temperature)}
                <Celsius>℃</Celsius>
              </Temperature>
              <WeatherIcon weatherCode={weatherCode} moment="night" />
            </CurrentWeather>
            <AirFlow>
              <AirFlowIcon />
              {windSpeed} m/h
            </AirFlow>
            <Rain>
              <RainIcon />
              {rainPossibility}%
            </Rain>
            {/* <Refresh onClick={fetchData} isLoading={isLoading}>
              最後觀測時間：
              {new Intl.DateTimeFormat('zh-TW', {
                hour: 'numeric',
                minute: 'numeric',
              }).format(dayjs(observationTime))}{' '}
              {isLoading ? <LoadingIcon /> : <RefreshIcon />}
            </Refresh> */}
          </WeatherCard>
        </ThemeProvider>
      </div>
    </>
  )
}

export default Weather
