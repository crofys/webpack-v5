import React from 'react'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

export const BaseAnts: React.FC = props => {
  return <ConfigProvider locale={zhCN}>{props?.children}</ConfigProvider>
}
