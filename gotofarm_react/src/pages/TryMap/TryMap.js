import React, { useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './../../css/map.css'
import { Link } from 'react-router-dom'
const zoom = 12
function TryMap() {
  const [map, setMap] = useState(null)
  // 移動座標
  const [markerPlace, setmarKerPlace] = useState([25.033913, 121.5434129])
  // 點擊對象
  const [farmer, setFarmer] = useState('')
  // 點擊對象地址
  const [address, setAddress] = useState('')
  // 點擊對象電話
  const [phone, setPhone] = useState('')
  // 點擊對象網址sid
  const [sid, setSid] = useState('')

  // 地標
  const icon = L.icon({
    iconSize: [36, 52],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: './../../Icons/marker.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
  })
  // 地標(小農遊)
  const iconF = L.icon({
    iconSize: [34, 40],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: './../../Icons/markerF.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
  })

  // 品牌
  const brands_r = [
    '阿瑋農園',
    '彬哥農園',
    '李家果園',
    '美雲蔬果',
    '阿賢農場',
    '洪家農場',
  ]
  const brands_r_place = [
    [[22.7066474, 120.4161401], '高雄市大樹區和山路82號', '0933-023-567'],
    [[23.5128415, 120.4697398], '嘉義縣民雄鄉大崎村', '0920-870-780'],
    [[23.4361216, 120.3453066], '嘉義縣太保市17之3號', '0921-506-009'],
    [[22.8815171, 120.6157422], '高雄市六龜區三民路12號', '0925-925-886'],
    [[24.7120968, 120.9260912], '苗栗縣竹南鎮中華路78巷90號', '0932-423-594'],
    [[24.689186, 121.4178142], '桃園市復興區中心路8之12號', '0921-333-654'],
  ]
  const brands_l = ['陳哥農園', '阿邦農園', '郭哥農園', '芬楊果園']

  const brands_l_place = [
    [[23.5197012, 120.1869271], '雲林縣水林鄉新塭7-20號', '0922-936-588'],
    [[24.3550587, 120.9281154], '苗栗縣泰安鄉5鄰32之15號', '0920-775-570'],
    [[24.2786728, 120.8438111], '台中市東勢區東新里', '0933-322-200'],
    [[24.0296628, 120.6220722], '彰化縣芬園鄉彰南路五段8號', '0925-587-780'],
  ]

  return (
    <>
      <div id="MAP" className="MAP-card d-flex align-items-center">
        <img
          className="MAP-img d-none d-md-block"
          src="./../../Images/map_left.png"
          alt=""
        />
        <div className="MAP-farmer-wrap font-B">
          <img
            className="MAP-farmer"
            src="./../../Icons/gotofarm-logo-big.png"
            alt=""
            onClick={() => {
              map.flyTo([24.7051215, 121.2023128], zoom)
            }}
          />
        </div>
        <div className="MAP-body">
          <MapContainer
            center={[23.684788726029662, 120.93430194359614]}
            scrollWheelZoom={false}
            zoom="7"
            style={{ width: '100%', height: '100%' }}
            ref={setMap}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {brands_r.map((v, i) => {
              return (
                <div key={i}>
                  <Marker position={brands_r_place[i][0]} icon={icon}>
                    <Popup>
                      {
                        <>
                          <h5 className="font-R" style={{ color: '#57AC6F' }}>
                            {v}
                          </h5>
                          <p
                            className="font-R m-0"
                            style={{ color: '#A88686', width: 'fit-content' }}
                          >
                            <img
                              src="./../../Images/map_pin.png"
                              alt=""
                              width={20}
                              className="me-1"
                            />
                            {brands_r_place[i][1]}
                          </p>
                          <p
                            className="font-R m-0"
                            style={{ color: '#A88686', width: 'fit-content' }}
                          >
                            <img
                              src="./../../Images/denwa.png"
                              alt=""
                              width={20}
                              className="me-1"
                            />
                            {brands_r_place[i][2]}
                          </p>
                          <Link
                            to={`http://localhost:3000/product/?brand=${i + 1}`}
                          >
                            <button className="font-R d-block mx-auto">
                              <img
                                src="./../../Images/find.png"
                                alt=""
                                width={20}
                                className="me-1"
                              />
                              逛逛農產品
                            </button>
                          </Link>
                        </>
                      }
                    </Popup>
                  </Marker>
                </div>
              )
            })}
            {brands_l.map((v, i) => {
              return (
                <div key={i}>
                  <Marker position={brands_l_place[i][0]} icon={icon}>
                    <Popup>
                      {
                        <>
                          <h5 className="font-R" style={{ color: '#57AC6F' }}>
                            {v}
                          </h5>
                          <p
                            className="font-R m-0"
                            style={{ color: '#A88686', width: 'fit-content' }}
                          >
                            <img
                              src="./../../Images/map_pin.png"
                              alt=""
                              width={20}
                              className="me-1"
                            />
                            {brands_l_place[i][1]}
                          </p>
                          <p
                            className="font-R m-0"
                            style={{ color: '#A88686', width: 'fit-content' }}
                          >
                            <img
                              src="./../../Images/denwa.png"
                              alt=""
                              width={20}
                              className="me-1"
                            />
                            {brands_l_place[i][2]}
                          </p>
                          <Link
                            to={`http://localhost:3000/product/?brand=${i + 7}`}
                          >
                            <button className="font-R d-block mx-auto">
                              <img
                                src="./../../Images/find.png"
                                alt=""
                                width={20}
                                className="me-1"
                              />
                              逛逛農產品
                            </button>
                          </Link>
                        </>
                      }
                    </Popup>
                  </Marker>
                </div>
              )
            })}

            {/* <Marker position={markerPlace} icon={icon}>
              <Popup>
                {
                  <>
                    <h5 className="font-R" style={{ color: '#57AC6F' }}>
                      {farmer}
                    </h5>
                    <p
                      className="font-R m-0"
                      style={{ color: '#A88686', width: 'fit-content' }}
                    >
                      <img
                        src="./../../Images/map_pin.png"
                        alt=""
                        width={20}
                        className="me-1"
                      />
                      {address}
                    </p>
                    <p
                      className="font-R m-0"
                      style={{ color: '#A88686', width: 'fit-content' }}
                    >
                      <img
                        src="./../../Images/denwa.png"
                        alt=""
                        width={20}
                        className="me-1"
                      />
                      {phone}
                    </p>
                    <Link to={`http://localhost:3000/product/?brand=${sid}`}>
                      <button className="font-R d-block mx-auto">
                        <img
                          src="./../../Images/find.png"
                          alt=""
                          width={20}
                          className="me-1"
                        />
                        逛逛農產品
                      </button>
                    </Link>
                  </>
                }
              </Popup>
            </Marker> */}
            <Marker position={[24.7051215, 121.2023128]} icon={iconF}>
              <Popup>
                {
                  <>
                    <img
                      src="./../../Icons/GoToFarmLOGO-sm.png"
                      alt=""
                      width={120}
                      className="d-block mx-auto mb-2"
                    />
                    <p
                      className="font-R m-0"
                      style={{ color: '#A88686', width: 'fit-content' }}
                    >
                      <img
                        src="./../../Images/map_pin.png"
                        alt=""
                        width={20}
                        className="me-1"
                      />
                      新竹縣尖石鄉嘉樂村2鄰70號
                    </p>
                    <p
                      className="font-R m-0"
                      style={{ color: '#A88686', width: 'fit-content' }}
                    >
                      <img
                        src="./../../Images/denwa.png"
                        alt=""
                        width={20}
                        className="me-1"
                      />
                      0921-222-222
                    </p>
                  </>
                }
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        {/* 電腦版 */}
        <ul className="list-unstyled MAP-label label-right d-none d-md-block">
          {brands_r.map((v, i) => {
            return (
              <li
                key={i}
                className={farmer === v ? 'active' : ''}
                onClick={() => {
                  map.flyTo(brands_r_place[i][0], zoom)
                  // setmarKerPlace(brands_r_place[i][0])
                  // setFarmer(v)
                  // setAddress(brands_r_place[i][1])
                  // setPhone(brands_r_place[i][2])
                  // setSid(i + 1)
                }}
              >
                {v}
              </li>
            )
          })}
        </ul>
        <ul className="list-unstyled MAP-label label-left d-none d-md-block">
          {brands_l.map((v, i) => {
            return (
              <li
                key={i}
                className={farmer === v ? 'active' : ''}
                onClick={() => {
                  map.flyTo(brands_l_place[i][0], zoom)
                  // setmarKerPlace(brands_l_place[i][0])
                  // setFarmer(v)
                  // setAddress(brands_l_place[i][1])
                  // setPhone(brands_l_place[i][2])
                  // setSid(i + 7)
                }}
              >
                {v}
              </li>
            )
          })}
        </ul>
      </div>

      {/* 手機板 */}
      <div className="d-md-none d-flex gap-5">
        <ul className="list-unstyled  MAP-label label-right">
          {brands_r.map((v, i) => {
            return (
              <li
                key={i}
                className={farmer === v ? 'active' : ''}
                onClick={() => {
                  map.flyTo(brands_r_place[i][0], zoom)
                }}
              >
                {v}
              </li>
            )
          })}
        </ul>
        <ul className="list-unstyled  MAP-label label-right">
          {brands_l.map((v, i) => {
            return (
              <li
                key={i}
                className={farmer === v ? 'active' : ''}
                onClick={() => {
                  map.flyTo(brands_l_place[i][0], zoom)
                }}
              >
                {v}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default TryMap
