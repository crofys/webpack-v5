import React from 'react'
import { Link } from 'react-router-dom'

interface IDefaultProps {}

const Default: React.FC<IDefaultProps> = props => {
  return (
    <div className="default">
      <ul>
        <li>
          <Link to="/home">首页</Link>
        </li>
        <li>
          <Link to="/about">关于我</Link>
        </li>
      </ul>
      这是layout
      <br />
      {props?.children}
    </div>
  )
}
export default Default
