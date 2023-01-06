interface TabPanelProps {
  children?: React.ReactNode;
  value: string;
  tab: string;
}

export default function TabPanel(props: TabPanelProps) {
  const { children, value, tab, ...other } = props;

  if (value !== tab) {
    return null;
  }

  return (
    <div id={`tabpanel-${value}`} aria-labelledby={`tab-${value}`} {...other} tw="w-full">
      {value === tab && <div>{children}</div>}
    </div>
  );
}
