import React from 'react'
import { Helmet } from 'react-helmet'
const Meta = ({ title, description, keyword }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description}></meta>
      <meta name='keyword' content={keyword}></meta>
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome to Smol',
  description: 'We sell the hightest quality products at the cheapest rate',
  keyword: 'high quality,cheap rate,buy electronics',
}
export default Meta
