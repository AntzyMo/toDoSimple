import React, { Component } from 'react'
import { Checkbox, Button, Progress } from 'antd'
import './index.less'
import checkImg from '../../assets/check.png'
class CardCom extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: props.title,
      list: props.list,
      progress: props.progress
    }
  }

  componentDidUpdate (preProps) {
    if (this.props.list !== preProps.list) {
      this.setState({ list: this.props.list })
    }
  }

  clickCheck (e, item, index) {
    e.preventDefault() // 阻止默认行为
    const { list, title, progress } = this.state
    const arr = [...list]
    const num = Math.round(100 / arr.length)
    const fileds = arr[index]
    const lastChild = index != arr.length - 1
    if (fileds.checked) return

    fileds.checked = true
    fileds.class = 'fadeOutLeft'
    this.setState({ list: arr })

    setTimeout(() => {
      fileds.showCheckIcon = true
      fileds.class = 'fadeInLeft'
      lastChild && (arr[index + 1].upclass = 'slideInUp')
      arr.push(arr.splice(index, 1)[0])
      let proenum = progress + num
      // 处理临界值
      const istrue = arr.every(item => item.checked)
      if (istrue) proenum = 100
      this.setState({ list: arr, progress: proenum })
      this.props.checkCard(title, arr, this.state.progress)
    }, 500)
  }

  render () {
    const { title, list, progress } = this.state
    const { showDel } = this.props
    return (
      <>
        <div className="cardBox">
          <div className="header">
            <div className="cardTitle">
              {/* <img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" /> */}
              <div className="title-txt">{title}</div>
            </div>

            {showDel
              ? (<Button type="link" size="small" onClick={() => this.props.deleteCard(title)}>删除</Button>)
              : (<Progress className="Progress" type="circle" percent={progress} width={25} />)
            }

          </div>

          <div className="content">
            {list.map((item, index) => (
              <div key={item.id}
                className={`checkbox animate__animated animate__${item.upclass || ''}`}
                onClick={(e) => this.clickCheck(e, item, index)}>
                {
                  item.showCheckIcon
                    ? (<div className={`checkedbox animate__animated animate__${item.class || ''}`} >
                      <div className="acText">{item.text}</div>
                      {showDel
                        ? (<Button type="link" size="small" onClick={(e) => this.props.deleteCard(e, title, index)}>删除</Button>)
                        : (<img className="checkicon" src={checkImg} />)
                      }

                    </div>)
                    : (<div className={`checkedbox animate__animated animate__${item.class || ''}`}>
                      <Checkbox checked={item.checked} style={{ color: 'skyblue' }}>{item.text}</Checkbox>
                      {showDel && <Button type="link" size="small" onClick={(e) => this.props.deleteCard(e, title, index)}>删除</Button>}

                    </div>)

                }

              </div>
            ))}

          </div>
        </div>

      </>
    )
  }
}

export default CardCom
