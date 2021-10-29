import React from 'react'
import { Checkbox, Button } from 'antd';
import './index.less'
import { Component } from 'react'
import PropTypes from 'prop-types'

class CardCom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.title,
      list: props.list
    }
  }


  clickCheck(e, item, index) {
    e.preventDefault() //阻止默认行为
    let { list } = this.state
    let arr = [...list]
    let fileds = arr[index]
    let lastChild = index != arr.length - 1
    if (fileds.checked) return

    fileds.checked = true
    fileds.class = 'fadeOutLeft'
    this.setState({ list: arr })

    setTimeout(() => {
      fileds.showCheckIcon = true
      fileds.class = "fadeInLeft"
      lastChild && (arr[index + 1].upclass = 'slideInUp')
      arr.push(arr.splice(index, 1)[0])
      this.setState({ list: arr })
    }, 500)
  }

  render() {
    const { title, list } = this.state
    return (
      <>
        <div className="cardBox">
          <div className="header">
            <div className="cardTitle">
              {/* <img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" /> */}
              <div className="title-txt">{title}</div>
            </div>
            <Button type="link" size="small">删除</Button>
          </div>

          <div className="content">
            {list.map((item, index) => (
              <div key={index} className={`checkbox animate__animated animate__${item.upclass}`} onClick={(e) => this.clickCheck(e, item, index)}>
                {
                  item.showCheckIcon ?
                    (<div className={`checkedbox animate__animated animate__${item.class}`} >
                      <div className="acText">{item.text}</div>
                      <img className="checkicon" src="/src/assets/check.png" />
                    </div>)
                    :
                    <Checkbox className={`animate__animated animate__${item.class}`} checked={item.checked} style={{ color: 'skyblue' }}>{item.text}</Checkbox>

                }

              </div>
            ))}

          </div>
        </div>

      </>
    )
  }

}

CardCom.propTypes = {
  list: PropTypes.array.isRequired,
  title:PropTypes.string.isRequired
}

export default CardCom

