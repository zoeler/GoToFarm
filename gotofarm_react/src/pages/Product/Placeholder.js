import React from 'react'
import ContentLoader from 'react-content-loader'

const Placeholder = (props) => (
  <ContentLoader
    speed={2}
    width={222}
    height={170}
    viewBox="0 0 222 170"
    backgroundColor="#fff8eb"
    foregroundColor="#fbefdf"
    {...props}
  >
    <rect x="10" y="10" rx="10" ry="10" width="212" height="160" />
  </ContentLoader>
)

export default Placeholder
