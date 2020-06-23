import React from 'react'

import { BaseAnts, RouterView } from '@/common/core'
import Routes from './config/router'

const App = () => {
  return (
    <BaseAnts>
      <RouterView routes={Routes} />
    </BaseAnts>
  )
}

export default App
