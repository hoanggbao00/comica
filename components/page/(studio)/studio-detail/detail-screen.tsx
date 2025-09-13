interface Props {
  id: string;
}

export default function DetailScreen(props: Props) {
  return <div>{props.id}</div>;
}
