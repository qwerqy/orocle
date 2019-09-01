import React from 'react';

export const TagsList = (props: any) => {
  return (
    <ul
      style={{
        ...props.style,
        marginLeft: 0,
        listStyle: 'none',
        margin: '10px 0',
      }}
    >
      {props.children}
    </ul>
  );
};

export const Tag = (props: any) => {
  return (
    <li key={props._key} style={{ display: 'inline' }}>
      <div
        style={{
          display: 'inline-block',
          padding: '5px 8px',
          margin: '5px 5px',
          borderRadius: '5px',
          marginLeft: props._key === 0 ? '0' : '5px',
          marginRight: props._key === props.data.length - 1 ? '0' : '5px',
          backgroundColor: '#D08770          ',
          color: '#ECEFF4',
        }}
      >
        {props.children}
      </div>
    </li>
  );
};
