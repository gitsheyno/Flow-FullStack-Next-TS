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
  // Accessing the context
  const ctx = useContext(StoreContext);

  // State to manage node data
  const [newData, setData] = useState<Node[]>([]);

  // Update node data based on context changes

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

  // Define initial edges

  const initialEdges: Edge[] = [
    { id: "e1-2", source: "1", target: "2", animated: true },
    { id: "e1-3", source: "1", target: "3", animated: true },
  ];

  // Define node types

  const nodeTypes = useMemo(
    () => ({
      custom: CustomNode,
    }),
    []
  );

  // Access node and edge state hooks

  const [nodes, setNode, onNodesChange] = useNodesState(newData);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update node state when newData changes

  useEffect(() => {
    setNode(newData);
  }, [newData, setNode]);

  // Callback for connecting nodes

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
