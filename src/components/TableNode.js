import React from "react";
import { Handle, Position } from "reactflow";
import { FaArrowLeft, FaKey, FaTable } from "react-icons/fa";

const TableNode = ({ data }) => {
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
                            position: "relative",
                        }}
                    >
                        <Handle
                            type="source"
                            position={Position.Right}
                            id={`${data.label}-${col.name}`}
                            style={{ background: "#555", width: "10px", height: "10px" }}
                        />
                        <Handle
                            type="target"
                            position={Position.Left}
                            id={`${data.label}-${col.name}`}
                            style={{ background: "#555", width: "10px", height: "10px" }}
                        />
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

export default TableNode;