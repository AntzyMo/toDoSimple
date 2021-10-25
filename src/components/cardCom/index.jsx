import React from 'react'
import { Card,Button } from 'antd';
import style from './index.scss'
const CardCom = () => {
  return (
    <>
      <Card 
      className={style.cardBox} 
      hoverable
      bordered={false}
      extra={<Button type="link" >删除</Button>}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </>
  )
}

export default CardCom
