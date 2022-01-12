import { Component } from 'react'
import { View, Text,Image,CoverView } from '@tarojs/components'
const QQMapWX = require('../../../sdk/qqmap-wx-jssdk.js');
import rings from './rings.svg'
import Map from './map'
import './index.less'

export default class Index extends Component {

  componentWillMount () {

    const qqmapsdk = new QQMapWX({
      key: 'KBKBZ-UYUCX-EYG4Z-TKMNG-72SA2-3TBPY'
    });
    console.log(22,qqmapsdk)

  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Map></Map>
      </View>
    )
  }
}
