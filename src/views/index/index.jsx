import CardCom from '@/components/cardCom/index'
import { FireFilled } from '@ant-design/icons'
import { Drawer } from 'antd'
import ColorPicker from '@/components/colorPicker/index'
import { useState } from 'react'
import './index.less'
const Index = (porps) => {
  console.log(porps,'porps')
  const [visible, setVisible] = useState(false)
  const [list, setList] = useState([
    {
      title: '内容区背景颜色',
      active: false
    },
    {
      title: '内容区字体颜色',
      active: false
    },
  ])


  const openColorBox = () => {
    setVisible(true)
  }





  return (
    <>
      <CardCom  />


      {/* 换肤 */}
      <div className="colorBox" onClick={openColorBox}>
        <FireFilled style={{ fontSize: '24px', color: 'skyblue' }} />
      </div>

      <Drawer
        title="主题换肤"
        placement="right"
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        {list.map(item=>( <div key={item.title} className="colorItem">
          <h3>{item.title}</h3>
          <div className="linebox" style={{ background: 'skybule' }}>
            <div className="line" />
          </div>
          {/* <ColorPicker /> */}
        </div>))}
       
      </Drawer>

    </>

  )
}

export default Index