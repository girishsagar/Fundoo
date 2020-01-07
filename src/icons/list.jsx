import React from "react";

const SvgList = props => (
  <svg width={24} height={24} {...props}>
    <g fill="none" fillRule="evenodd">
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        d="M20 9H4V5h16v4zm0 10H4v-4h16v4zM3 3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H3zm0 10c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h18c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1H3z"
        fill="#000"
        fillRule="nonzero"
      />
    </g>
  </svg>
);

export default SvgList;