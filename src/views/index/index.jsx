import CardCom from '@/components/cardCom/index'
import { FireFilled } from '@ant-design/icons'
import { Drawer, Input } from 'antd'
import ColorPicker from '@/components/colorPicker/index'
import { useState,useEffect } from 'react'
import './index.less'
const Index = (porps) => {
  const [visible, setVisible] = useState(false)
  const [todoList, settodoList] = useState([
    {
      title: '28 周一',
      list: [
        {
          id: 0,
          text: '村上春树',
          checked: false,
          showCheckIcon: false,
          class: '',
          upclass: ''
        },
        {
          id: 1,
          text: '村上春树测试',
          checked: false,
          showCheckIcon: false,
          class: '',
          upclass: ''
        }
      ]
    }
  ])
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

  // 打开主题弹窗
  const openColorBox = () => {
    setVisible(true)
  }
  useEffect(() => {
    window.electron.doThing()
  })

  const clickEnter = (e) => {
    let { value } = e.target
    console.log(value, 'value')
    // ipcRenderer.send('writeFile', value)
  }

  // console.log(node-version,'node-version')
  return (
    <>

      <div className="addCardBox">
        <div className="header">
          <div className="cardTitle">
            <div className="title-txt">28 周一</div>
          </div>
        </div>

        <div className="content">
          <div className="addcrad">
            <div className="square" />
            <Input placeholder="请输入待办事项" />
          </div>

        </div>
      </div>

      {/* <div className="cardList">
        {todoList.map((item, index) => (
          <div className="cardbox">
            <CardCom key={index} title={item.title} list={item.list} onPressEnter={clickEnter} />
          </div>
        ))}
      </div> */}

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
        {list.map(item => (<div key={item.title} className="colorItem">
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