import { FloatButton } from 'antd';

export default function IFloatButton({
  icon = <></>,
  path = '/home',
  onClick,
  ...props
}) {
  const handleClick = () => {
    if (onClick) onClick(path, props);
  };
  return (
    <FloatButton
      icon={icon}
      onClick={() => {
        handleClick();
      }}
      {...props}
    />
  );
}
