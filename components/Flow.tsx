"use client";
import {
  useContext,
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
} from "react";
import { StoreContext } from "@/context/context";

import ReactFlow, {
  Node,
  addEdge,
  Background,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
} from "reactflow";
import CustomNode from "./CustomNode";

import "reactflow/dist/style.css";

export default function Flow() {
  const ctx = useContext(StoreContext);
  const [newData, setData] = useState<Node[]>([]);

  useEffect(() => {
    if (ctx?.data) {
      const updatedData = ctx.data.map((item, index) => ({
        id: `${index + 1}`,
        source: item.type,
        type: "custom",
        data: { label: item.name },

        position: { x: 250, y: index * 100 },
      }));
      setData(updatedData);
    } else {
      setData([]);
    }
  }, [ctx?.data]);

  //   const initialNodes: Node[] = [
  //     {
  //       id: "1",
  //       type: "input",
  //       data: { label: "Node 1" },
  //       position: { x: 250, y: 5 },
  //     },
  //     { id: "2", data: { label: "Node 2" }, position: { x: 100, y: 100 } },
  //     { id: "3", data: { label: "Node 3" }, position: { x: 400, y: 100 } },
  //     {
  //       id: "4",
  //       type: "custom",
  //       data: { label: "Custom Node" },
  //       position: { x: 400, y: 200 },
  //     },
  //   ];

  const initialEdges: Edge[] = [
    { id: "e1-2", source: "1", target: "2", animated: true },
    { id: "e1-3", source: "1", target: "3" },
  ];

  const nodeTypes = useMemo(
    () => ({
      custom: CustomNode,
    }),
    []
  );

  const [nodes, setNode, onNodesChange] = useNodesState(newData);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  useEffect(() => {
    setNode(newData);
  }, [newData]);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
    >
      <Background />
    </ReactFlow>
  );
}
