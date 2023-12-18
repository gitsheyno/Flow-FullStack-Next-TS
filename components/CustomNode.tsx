import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";

const CustomNode = ({
  data,
  isConnectable,
  targetPosition = Position.Top,
  sourcePosition = Position.Bottom,
  ...props
}: NodeProps) => {
  console.log(props, "prop");
  return (
    <>
      <div className=" relative rounded-lg shadow-md p-8 bg-gradient-to-br from-blue-400 to-blue-500">
        {/* Node content */}
        <div className=""></div>
        <div className="flex items-center justify-between">
          <Handle
            type="target"
            position={targetPosition}
            isConnectable={isConnectable}
            className="bg-blue-500 rounded-full "
          />
          {/* Your node data */}
          <p className="text-base font-bold">{data.label}</p>
          <Handle
            type="source"
            position={sourcePosition}
            isConnectable={isConnectable}
            className="bg-blue-500 rounded-full h-4 w-4"
          />
        </div>
      </div>
      {/* <Handle
        type="target"
        position={targetPosition}
        isConnectable={isConnectable}
      />
      <div
        className={`border-slate-700 p-6 border-2 bg-${
          data?.type === "Predictor" ? "red" : "green"
        }`}
      >
        <label htmlFor="text">Text:</label>

        {data?.label}
      </div>
      {/* {data?.label} */}
      {/* <Handle
        type="source"
        position={sourcePosition}
        isConnectable={isConnectable}
      /> */}
    </>
  );
};

CustomNode.displayName = "CustomNode";

export default memo(CustomNode);
