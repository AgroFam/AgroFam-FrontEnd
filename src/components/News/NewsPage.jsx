import { Container } from '@material-ui/core'
import React from 'react'
import News from './News'

const NewsPage = () => {
  return (
    <Container maxWidth="lg" style={{ margin: '100px auto 20px' }}>
      <News />
    </Container>
  )
}

export default NewsPage