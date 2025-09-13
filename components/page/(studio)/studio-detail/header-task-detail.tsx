interface Props {
  id: string;
}

export default function HeaderTaskDetail(props: Props) {
  return (
    <div className="flex h-full items-center gap-2 border-r-2 px-2 font-comic">
      <div className="text-left">
        <div className="max-w-[200px] truncate font-bold text-sm">
          {props.id === "new-comic" ? "New Comic" : "Spider man fight with uncle Ben"}
        </div>
        <div className="text-muted-foreground text-xs">Episode 1</div>
      </div>
    </div>
  );
}
