import React, { PropsWithChildren, ReactComponentElement } from 'react';

interface Props {
  type: 'button' | 'submit' | 'reset';
  disabled: boolean;
  className: string;
}

const CustomButton: React.FC<PropsWithChildren<Props>> = ({
  type,
  disabled,
  className,
  children,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={className}
      style={{ opacity: `${disabled ? '0.5' : 1}` }}
    >
      {children}
    </button>
  );
};

export default CustomButton;
