import CardCom from '@/components/cardCom/index'
import { FireFilled } from '@ant-design/icons'
import { Drawer, Input, Button } from 'antd'
import { useState, useRef, useEffect } from 'react'
const { ipcRenderer } = require('electron')
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
import './index.less'

const createaddToList = () => ({
  id: Math.random() + 30,
  text: '',
  checked: false,// 显示打钩状态
  showCheckIcon: false, // 显示打钩图片
  class: '',  // 动画
  upclass: ''// 向上动画
})

const Index = () => {
  const [visible, setVisible] = useState(false)
  const contRef = useRef()
  const [addList, setaddList] = useState([createaddToList()])
  const [List, setList] = useState([])
  const [showdelBtn, setshowdelBtn] = useState(false)
  
  const [bglist, setbgList] = useState([
    {
      title: '内容区背景颜色',
      active: false
    }
  ])

  // 打开主题弹窗
  const openColorBox = () => {
    setVisible(true)
  }


  // inpuit框获取值
  const changeInput = (e, index) => {
    let { value } = e.target
    let list = [...addList]
    list[index].text = value
    setaddList(list)
  }

  // 回车
  const clickEnter = e => {
    let { value } = e.target
    if (!value) return
    let list = [...addList]
    let newList = createaddToList()
    newList.id = Math.random() + 2
    list.push(newList)
    setaddList(list)
    contRef.current.scrollTo(0, contRef.current.scrollHeight)
  }

  // 点击保存
  const clickSave = () => {
    if (addList.length == 1 && addList[0].text == '') return

    let params = {
      id: Math.random(),
      title: dayjs().format('YYYY-MM-DD'),
      progress: 0, //进度条
      showDel: false, //显示删除按钮
      list: addList[addList.length - 1].text == '' ? addList.slice(0, -1) : addList
    }

    // 写入本地
    ipcRenderer.send('writeFile', params)

    // 监听本地写入成功
    ipcRenderer.once('onWrite', (event, { status, msg }) => {
      if (status) {
        setaddList([createaddToList()])
        getToDoList()
        return
      }
    })

  }

  // 打勾
  const checkCard = (title, list, progress) => {
    ipcRenderer.send('updateFile', { title, list, progress })
  }

  // 点击显示删除按钮
  const clickDelBtn = () => {
    setshowdelBtn(v => !v)
    let list = [...List]
    list.forEach(item => item.showDel = !item.showDel)
    console.log(list, 'list')
    setList(list)
  }

  // 删除卡片
  const deleteCard = (title) => {
    ipcRenderer.send('deleteFile', title)
    ipcRenderer.once('onDelete', (event, { status, msg }) => {
      if (status) {
        getToDoList()
      } else {
        console.log(msg, 'delmsg')
      }
    })
  }



  // 获取list
  const getToDoList = () => {
    ipcRenderer.send('getFiles')
    ipcRenderer.once('getFile', (event, arg) => {
      let arr = [...arg]
      console.log(arr, 'arr')
      setList(arr)
    })
  }

  useEffect(() => {
    getToDoList()
  }, [])

  return (
    <>
      <div className="header">
        <div className=""></div>
        <div className="operate">
          <Button type="link" onClick={clickDelBtn}>{showdelBtn ? '隐藏删除按钮' : '显示删除按钮'}</Button>
        </div>

      </div>

      {/* addList */}
      <div className="box">
        <div className="addCardBox">
          <div className="header">
            <div className="cardTitle">
              <div className="title-txt">{dayjs().format('DD dddd')} </div>
            </div>
          </div>

          <div className="content" ref={contRef}>

            {addList.map((item, index) => (
              <div key={item.id} className="addcrad" >
                <div className="square" />
                <Input className="input" autoFocus onChange={e => changeInput(e, index)} placeholder="请输入待办事项" onPressEnter={e => clickEnter(e, index)} />
              </div>
            ))}


          </div>
          <div className="saveBtn">
            <Button onClick={clickSave} type="link" >保存</Button>
          </div>

        </div>

        {/* list */}
        <div className="cardList">
          {List.map((item, index) => (
            <div key={item.id} className="cardboxout">
              <CardCom
                title={item.title}
                list={item.list}
                progress={item.progress}
                showDel={item.showDel}
                checkCard={checkCard}
                deleteCard={deleteCard} />
            </div>
          ))}
        </div>
      </div>

      {/* 换肤 */}
      <div className="colorBox" onClick={openColorBox}>
        <FireFilled style={{ fontSize: '24px', color: 'skyblue' }} />
      </div>

      {/* <Drawer
        title="主题换肤"
        placement="right"
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
      >

      </Drawer> */}

    </>

  )
}

export default Index