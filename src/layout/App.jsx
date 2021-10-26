import { useState } from 'react'
import'./App.less'
import 'antd/dist/antd.css';
import CardCom from '@/components/cardCom/index'
import { Layout } from 'antd';
const { Header, Content, Sider } = Layout;

function App() {
  return (
    <div className="App">
      <Layout className="layoutPage" >
        <Sider
          style={{ background: '#16191D' }}
          width={70}
        >
          11
        </Sider>

        <Layout>
          <Header style={{ padding: 0, height: '50px', background: '#16191D' }} />
          <Content style={{ background: ' #1a1b20' }}>
            <div style={{ padding: 24, background: ' #1a1b20' }}>
              <CardCom />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default App
