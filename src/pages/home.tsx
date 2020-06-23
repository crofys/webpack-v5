import React from 'react'

interface IHomeProps {}

const Home: React.FC<IHomeProps> = props => {
  console.log(props, '-=------')
  return <div className="home">首页</div>
}
export default Home
