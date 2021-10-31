import CardCom from '@/components/cardCom/index'
import { FireFilled } from '@ant-design/icons'
import { Drawer, Input, Button } from 'antd'
import ColorPicker from '@/components/colorPicker/index'
import { useState, useRef, useEffect } from 'react'
const { ipcRenderer } = require('electron')
import './index.less'

const createaddToList = () => ({
  text: '',
  checked: false,
  showCheckIcon: false,
  class: '',
  upclass: ''
})

const Index = () => {
  const [visible, setVisible] = useState(false)
  const contRef = useRef()
  const [addToList, setaddToList] = useState([createaddToList()])
  const [todoList, settodoList] = useState([])
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
 

  // inpuit框获取值
  const changeInput = (e, index) => {
    let { value } = e.target
    let list = [...addToList]
    list[index].text = value
    setaddToList(list)
  }

  // 回车
  const clickEnter = e => {
    let { value } = e.target
    let list = [...addToList]
    if (!value) return
    list.push(createaddToList())
    setaddToList(list)
    contRef.current.scrollTo(0, contRef.current.scrollHeight)
  }

    // 点击保存
  const clickSave = () => {
    console.log(addToList, 'add')
    if (addToList.length == 1 && addToList[0].text == '') return

    let params = {
      title: new Date().toISOString().slice(0, 10),
      list: addToList[addToList.length - 1].text == '' ? addToList.slice(0, -1) : addToList
    }

    // 写入本地
    ipcRenderer.send('writeFile', params)

      // 监听本地写入成功
      ipcRenderer.on('onWrite', (event, {status,msg}) => {
        if(status){
            console.log(1111)
          // setaddToList([createaddToList()])
          
          getToDoList()
          return 
        }
      })
  
  }

    // 删除卡片
  const deleteCard=(title)=>{
    ipcRenderer.send('deleteFile', title)
    ipcRenderer.on('onDelete',(event,{status,msg})=>{
      if(status){
        getToDoList()
      }else{
        console.log(msg,'delmsg')
      }
    })
  }

  // 获取list
  const getToDoList =()=>{
    ipcRenderer.send('getFiles')
    ipcRenderer.on('getFile', (event, arg) => {
      console.log(arg,'ar11g')
      settodoList(arg)
    })
  }

  useEffect(() => {
    getToDoList()
  }, [])

  return (
    <>
      <div className="box">
        <div className="addCardBox">
          <div className="header">
            <div className="cardTitle">
              <div className="title-txt">28 周一</div>
            </div>
          </div>

          <div className="content" ref={contRef}>

            {addToList.map((item, index) => (
              <div key={index} className="addcrad" >
                <div className="square" />
                <Input className="input" autoFocus onChange={e => changeInput(e, index)} placeholder="请输入待办事项" onPressEnter={e => clickEnter(e, index)} />
              </div>
            ))}


          </div>

          <Button className="saveBtn" onClick={clickSave} type="link" >保存</Button>
        </div>

        <div className="cardList">
          {todoList.map((item, index) => (
            <div key={index} className="cardboxout">
              <CardCom title={item.title} list={item.list} deleteCard={deleteCard} />
            </div>
          ))}
        </div>
      </div>

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