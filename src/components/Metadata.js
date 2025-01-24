import React, { useEffect } from "react";
import ReactFlow, {
    Background,
    Controls,
    useNodesState,
    useEdgesState,
} from "reactflow";
import {FaArrowLeft, FaKey, FaTable} from "react-icons/fa";
import "reactflow/dist/style.css";
import { useNavigate } from "react-router-dom";
import TableNode from "./TableNode"; // For navigation

const TableNode1 = ({ data }) => {
    const columnNameWidth = 150;
    const columnTypeWidth = 120;
    const nullableWidth = 80;

    return (
        <div
            style={{
                padding: "16px",
                backgroundColor: "#f9f9f9",
                border: "1px solid #ddd",
                borderRadius: "8px",
                minWidth: "400px",
                color: "#333",
                fontFamily: "Arial, sans-serif",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
        >
            <h3
                style={{
                    margin: "0 0 16px",
                    borderBottom: "1px solid #ddd",
                    paddingBottom: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontWeight: "bold",
                    color: "#444",
                    fontSize: "18px",
                }}
            >
                <FaTable /> {data.label}
            </h3>
            <ul
                style={{
                    padding: 0,
                    margin: 0,
                    listStyleType: "none",
                }}
            >
                {data.columns.map((col) => (
                    <li
                        key={col.name}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            fontSize: "14px",
                            padding: "8px 0",
                            marginBottom: "4px",
                            height: "30px",
                            borderRadius: "4px",
                            backgroundColor: data.primaryKey.includes(col.name)
                                ? "#ffefea"
                                : "transparent",
                            color: data.primaryKey.includes(col.name) ? "#d9534f" : "#555",
                            border: data.primaryKey.includes(col.name)
                                ? "1px solid #d9534f"
                                : "1px solid transparent",
                        }}
                    >
            <span
                style={{
                    display: "inline-block",
                    width: `${columnNameWidth}px`,
                    fontWeight: data.primaryKey.includes(col.name) ? "bold" : "normal",
                }}
            >
              {data.primaryKey.includes(col.name) && <FaKey style={{ marginRight: "5px" }} />}
                {col.name}
            </span>
                        <span
                            style={{
                                display: "inline-block",
                                width: `${columnTypeWidth}px`,
                                fontStyle: "italic",
                                color: "#777",
                            }}
                        >
              {col.type}
            </span>
                        <span
                            style={{
                                display: "inline-block",
                                width: `${nullableWidth}px`,
                                fontWeight: "lighter",
                                color: col.nullable ? "#008000" : "#d9534f",
                                textAlign: "right",
                            }}
                        >
              {col.nullable ? "null" : "not null"}
            </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const nodeTypes = {
    table: TableNode,
};

export default function Metadata() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8000/metadata")
            .then((response) => response.json())
            .then((data) => {
                const processedNodes = data.map((tableObj, index) => {
                    const tableName = Object.keys(tableObj)[0];
                    const table = tableObj[tableName];
                    const columnCount = table.columns.length;

                    return {
                        id: tableName,
                        type: 'table',
                        position: {
                            x: index % 3 * 550, // Arrange in 3 columns
                            y: Math.floor(index / 3) * (columnCount * 60 + 100), // Adjust y-position based on column count
                        },
                        data: {
                            label: tableName,
                            columns: table.columns,
                            primaryKey: table.primary_key,
                        },
                    };
                });
                const processedEdges = data.flatMap((tableObj) => {
                    const tableName = Object.keys(tableObj)[0];
                    const table = tableObj[tableName];

                    return table.foreign_keys.map((fk) => ({
                        id: `edge-${tableName}-${fk.constrained_columns[0]}-${fk.referred_table}-${fk.referred_columns[0]}`,
                        source: fk.referred_table,
                        target: tableName,
                        sourceHandle: `${fk.referred_table}-${fk.referred_columns[0]}`,
                        targetHandle: `${tableName}-${fk.constrained_columns[0]}`,
                        style: { stroke: "#B794F4", strokeWidth: 2 },
                        markerEnd: {
                            type: "arrowclosed",
                            color: "#B794F4",
                        },
                    }));
                });

                setNodes(processedNodes);
                setEdges(processedEdges);
            });
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-gray-100">
            {/* Schema Visualizer */}
            <div className="w-full h-full">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    fitView
                >
                    <Controls />
                    <Background color="#e0e0e0" gap={20} />
                </ReactFlow>
            </div>
        </div>
    );
}