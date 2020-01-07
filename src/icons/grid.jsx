import React from "react";

const SvgGrid = props => (
  <svg width={24} height={24} {...props}>
    <defs>
      <path
        d="M3 3h7c.55 0 1 .45 1 1v6c0 .55-.45 1-1 1H3c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1zm0 10h7c.55 0 1 .45 1 1v6c0 .55-.45 1-1 1H3c-.55 0-1-.45-1-1v-6c0-.55.45-1 1-1zM14 3h7c.55 0 1 .45 1 1v6c0 .55-.45 1-1 1h-7c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1zm0 10h7c.55 0 1 .45 1 1v6c0 .55-.45 1-1 1h-7c-.55 0-1-.45-1-1v-6c0-.55.45-1 1-1zM9 9V5H4v4h5zm0 10v-4H4v4h5zM20 9V5h-5v4h5zm0 10v-4h-5v4h5z"
        id="grid_svg__a"
      />
    </defs>
    <g fill="none" fillRule="evenodd">
      <path fill="none" d="M0 0h24v24H0z" />
      <use fill="#000" fillRule="nonzero" xlinkHref="#grid_svg__a" />
    </g>
  </svg>
);

export default SvgGrid;