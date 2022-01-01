import React from 'react';
import '../../styles/Loader.css';

interface Props {
  size: 'small' | 'large';
}

const Loader = ({ size }: Props) => {
  return <div className={`loader ${size}`}></div>;
};

export default Loader;
