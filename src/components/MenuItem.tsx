type Props = {
  title: string;
  id: string;
  data: any;
  onClick: (e: Event | undefined, id: string) => void;
};

export const MenuItem = (props: Props) => {
  const { title, id, total_photos } = props.data;
  return (
    <div
      onClick={() => props.onClick(event, props.id)}
      className="p.25 mt-4 flex items-center rounded-md align-middle px-2 py-1 duration-300 cursor-pointer  text-white relative border-l-[1px] border-b-[2px] border-blue-500 hover:bg-blue-600 hover:border-b-[2px] hover:border-blue-500"
    >
      <span className="text-lg text-gray-200 font-medium">{props.title}</span>
      <span className="text-xs bg-gray-200 text-right place-self-center text-blue-800 font-medium rounded-full absolute right-1 py-0 px-2">
        {total_photos}
      </span>
    </div>

    // <div onClick={() => props.onClick(event, props.id)} data-id={props.id} className="mt-4">
    //   <h3 className="mx-6 mb-2 text-lg text-gray-200 font-semibold cursor-pointer bg-rose-600 px-3 py-1 rounded-md">
    //     {props.title}
    //   </h3>
    // </div>
  );
};
