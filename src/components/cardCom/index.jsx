import React from 'react'
import { Checkbox, Button, Image } from 'antd';
import './index.less'
import { CSSTransition } from 'react-transition-group'
import { Component } from 'react'
import 'animate.css'
import { CheckOutlined } from '@ant-design/icons'
export default class CardCom extends Component {
  constructor(props) {
    super(props)
    console.log(ReactEmoji, 'ReactEmoji')
    this.state = {
      list: [{
        id: 0,
        text: '村上春树',
        checked: false
      },
      {
        id: 1,
        text: '村上春树测试',
        checked: false
      }]
    }
  }


  clickCheck(e, item, index) {
    let { list } = this.state
    e.preventDefault() //阻止默认行为
    let arr = [...list]
    arr[index].checked = true
    this.setState({ list: arr })
    setTimeout(() => {
      arr.push(arr.splice(index, 1)[0])
      this.setState({ list: arr })
    }, 500)
  }




  render() {
    const { list } = this.state
    return (
      <>
        <div className="cardBox">
          <div className="header">
            <div className="cardTitle">
              <Image width={20} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
              <div className="title-txt">周一</div>
            </div>
            <Button type="link" size="small">删除</Button>
          </div>

          <div className="content">
            {list.map((item, index) => (
              <CSSTransition
                key={index}
                in={true}
                timeout={200}
                classNames="animate__animated animate__animated"
                unmountOnExit
              >
                <div className="checkbox " onClick={(e) => this.clickCheck(e, item, index)}>
                  <Checkbox checked={item.checked} style={{ color: 'skyblue' }}>{item.text}</Checkbox>
                  <div className="checkedbox">
                    <div className="acText">{item.text}</div>
                    <CheckOutlined style={{ color: '#17f917', fontWeight: 'bold' }} />
                  </div>
                </div>
              </CSSTransition>
            ))}

          </div>
        </div>

      </>
    )
  }



}



