import { useState } from 'react'
import './App.less'
import 'antd/dist/antd.css';
import Index from '@/views/index/index'
import { Layout } from 'antd';
const { Header, Content, Sider } = Layout;

function App() {


  return (
    <div className="App">
      <Layout className="layoutPage" >
        {/* <Sider
          style={{ background: '#16191D' }}
          width={70}
        >

        </Sider> */}

        <Layout>
          <Content style={{ background: ' #1a1b20' }}>
            <div style={{ padding: '24px 24px 24px 50px', background: ' #1a1b20' }}>
              <Index />
            </div>
          </Content>
        </Layout>
      </Layout>


    </div>
  )
}

export default App
