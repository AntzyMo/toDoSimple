import React from 'react'
import { Card, Button, Image } from 'antd';
import  './index.less'


const CardCom = () => {

  return (
    <>
      <Card
        className="cardBox"
        bodyStyle={{ padding: '10px 20px' }}
        hoverable
        bordered={false}
        title={
          <div className="cardTitle">
            <Image width={20} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
            <h1 className="cfff">周一</h1>
          </div>
        } extra={<Button type="link" >删除</Button>}
      >

        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </>
  )
}

export default CardCom
