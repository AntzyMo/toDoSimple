import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import style from './index.scss'
import  Main from '../index/index.jsx'
const { Header, Content, Sider } = Layout;

function LayoutPage() {
  return (
    <Layout className={style.layoutPage} >
      <Sider
        className={style.sibg}
        width={70}
      >
        11
      </Sider>

      <Layout>
        <Header className={style.sibg} style={{ padding: 0, height: '50px' }} />
        <Content className={style.contentbox} >
          <div className={style.contentbox} style={{ padding: 24, minHeight: 360 }}>
            <Main/>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

LayoutPage.propTypes = {
};

export default connect()(LayoutPage);
