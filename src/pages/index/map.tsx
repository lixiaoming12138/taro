import { CoverView, Map, View,CoverImage } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './map.less'
import rings from './rings.svg'
import {useEffect, useState} from "react";

const normalCallout = {
  id: 1,
  latitude: 23.098994,
  longitude: 113.32252,
  iconPath:'https://mapapi.qq.com/web/lbs/javascriptV2/demo/img/center.gif',
  callout: {
    content: '文本内容',
    color: '#ff0000',
    fontSize: 14,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#000000',
    bgColor: '#fff',
    padding: 5,
    display: 'ALWAYS',
    textAlign: 'center',
  }
}

const customCallout1 = {
  id: 2,
  latitude: 23.097994,
  longitude: 113.32352,
  iconPath:'https://mapapi.qq.com/web/lbs/javascriptV2/demo/img/center.gif',
  customCallout: {
    anchorY: 0,
    anchorX: 0,
    display: 'ALWAYS',
  },
}

const customCallout2 = {
  id: 3,
  latitude: 23.096994,
  longitude: 113.32452,
  iconPath:'https://mapapi.qq.com/web/lbs/javascriptV2/demo/img/center.gif',
  customCallout: {
    anchorY: 0,
    anchorX: 0,
    display: 'ALWAYS',
  },
}

const customCallout3 = {
  id: 4,
  latitude: 23.195994,
  longitude: 113.32552,
  alpha: 0.5,
  iconPath:'https://mapapi.qq.com/web/lbs/javascriptV2/demo/img/center.gif',
  customCallout: {
    anchorY: 0,
    anchorX: 0,
    display: 'ALWAYS',
  },
}

const customMarkers = [
  customCallout1,
  customCallout2,
  customCallout3,
]

const mapMarkers:any = [
  normalCallout,
  ...customMarkers
]

export default function Index() {

  const [local, setLocal] = useState<any>({})
  const [mapMarkers, setMapMarkers] = useState<any>([])
  setTimeout(()=>{
    const mapCtx = Taro.createMapContext('myMap')
    mapCtx.translateMarker({
      markerId: 2,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude:23.10229,
        longitude:113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })


    mapCtx.addVisualLayer({
      layerId:'addbaa2760b0',
      interval:20,
      zIndex: 1000000,
      opacity: 1,
      success:(res,a,b,c)=>{
        console.log(1,res,a,b,c)
      },
      fail:(err)=>{
        console.log(err);
      },
      complete:(res)=>{
        console.log(111,res,mapCtx.addVisualLayer)
      }
    })
    // Taro.request({
    //   url:'https://apis.map.qq.com/mydata/data/create',
    //   data:{
    //     "key": "KBKBZ-UYUCX-EYG4Z-TKMNG-72SA2-3TBPY",
    //     "table_id": "0osSb42QCBiFlt0GG3",
    //     "action_type": 1,
    //     "data": [[23.098994,113.32252,23.198994,113.42252,1.0],[23.298994,113.52252,23.298994,113.52252,1.0]]
    //   },
    //   method:'POST',
    //   success:(res)=>{
    //     console.log(22,res);
    //   }
    // })
    // 获取图层信息
    // Taro.request({
    //   url:'https://apis.map.qq.com/mydata/table/list',
    //   data:{
    //     "key": "KBKBZ-UYUCX-EYG4Z-TKMNG-72SA2-3TBPY",
    //     "table_id": "0osSb42QCBiFlt0GG3",
    //     "table_type": 3,
    //     page_index:1,
    //     page_size:10,
    //
    //   },
    //   method:'GET',
    //   success:(res)=>{
    //     console.log(22,res);
    //   }
    // })
    // 图层发布
    // Taro.request({
    //   url:'https://apis.map.qq.com/data_layer/v1/publish',
    //   data:{
    //     "layerid": "KBKBZ-UYUCX-EYG4Z-TKMNG-72SA2-3TBPY",
    //     "table_id": "0osSb42QCBiFlt0GG3",
    //     "table_type": 3,
    //     page_index:1,
    //     page_size:10,
    //
    //   },
    //   method:'GET',
    //   success:(res)=>{
    //     console.log(22,res);
    //   }
    // })

  },2000)
  Taro.onLocationChange = (res)=>{
    console.log(33,res)
  }
  useEffect(()=>{
    Taro.getLocation({
    }).then(res=>{
      console.log(2222,res);
      setLocal({latitude:res.latitude,longitude:res.longitude})
    })
  },[])
  useEffect(()=>{
    if(local.latitude){
      let mapMarkersList:any = [
        normalCallout,
        ...customMarkers
      ]
      mapMarkersList.push({
        id: 5,
        latitude: local.latitude,
        longitude: local.longitude,
        alpha: 0.1,
        width: 800,
        height: 800,
        anchor:{x: .5, y: 0.5} ,
        iconPath:'https://mapapi.qq.com/web/lbs/javascriptV2/demo/img/center.gif',
        customCallout: {
          anchorY: 0,
          anchorX: 0,
          display: 'ALWAYS',
        },
      })
      setMapMarkers(mapMarkersList)
      console.log(12,mapMarkers)
    }
  },[local.latitude])
  return (
    <Map
      id='myMap'
      // subkey='KBKBZ-UYUCX-EYG4Z-TKMNG-72SA2-3TBPY'
      markers={mapMarkers}
      latitude={local?.latitude}
      longitude={local?.longitude}
      show-location
      style={{ height: '100vh', width: '100vw' }}
    >
      <CoverView slot='callout'>
        {
          customMarkers.map(item => (
            /** 自定义样式的 callout */
            <CoverView marker-id={item.id} key={item.id} >
              <View className={`${item.id}_color`}>导航{item.id}</View>
            </CoverView>
          ))
        }
      </CoverView>
    </Map>
  )
}
