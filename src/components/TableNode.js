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
                backgroundColor: "#f9f9f9", // Keeping the background light for contrast
                border: "1px solid #9F7AEA", // Light purple border
                borderRadius: "8px",
                minWidth: "400px",
                color: "#4A5568", // Neutral dark gray for primary text
                fontFamily: "'Inter', sans-serif", // Modern, sharp appearance
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
        >
            <h3
                style={{
                    margin: "0 0 16px",
                    borderBottom: "1px solid #B794F4", // Border with a lighter purple shade
                    paddingBottom: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontWeight: "bold",
                    color: "#6B46C1", // Dark purple for the title
                    fontSize: "18px",
                }}
            >
                <FaTable style={{ color: "#805AD5" }} /> {data.label}
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
                            padding: "8px",
                            marginBottom: "4px",
                            height: "30px",
                            borderRadius: "4px",
                            backgroundColor: data.primaryKey.includes(col.name)
                                ? "#FAF5FF" // Light purple for primary keys
                                : "transparent",
                            color: data.primaryKey.includes(col.name) ? "#6B46C1" : "#4A5568", // Purple for primary keys, gray for others
                            border: data.primaryKey.includes(col.name)
                                ? "1px solid #805AD5"
                                : "1px solid transparent", // Purple border only for primary keys
                            position: "relative",
                        }}
                    >
                        <Handle
                            type="source"
                            position={Position.Right}
                            id={`${data.label}-${col.name}`}
                            style={{
                                background: "#9F7AEA", // Light purple for handles
                                width: "10px",
                                height: "10px",
                            }}
                        />
                        <Handle
                            type="target"
                            position={Position.Left}
                            id={`${data.label}-${col.name}`}
                            style={{
                                background: "#9F7AEA", // Matching the purple handles
                                width: "10px",
                                height: "10px",
                            }}
                        />
                        <span
                            style={{
                                display: "inline-block",
                                width: `${columnNameWidth}px`,
                                fontWeight: data.primaryKey.includes(col.name) ? "bold" : "normal",
                                color: data.primaryKey.includes(col.name) ? "#6B46C1" : "#444",
                            }}
                        >
                            {data.primaryKey.includes(col.name) && (
                                <FaKey style={{ marginRight: "5px", color: "#6B46C1", display: "inline" }} />
                            )}
                            {col.name}
                        </span>
                        <span
                            style={{
                                display: "inline-block",
                                width: `${columnTypeWidth}px`,
                                fontStyle: "italic",
                                color: "#9F7AEA", // Light purple for column types
                            }}
                        >
                            {col.type}
                        </span>
                        <span
                            style={{
                                display: "inline-block",
                                width: `${nullableWidth}px`,
                                fontWeight: "lighter",
                                color: col.nullable ? "#6B46C1" : "#E53E3E", // Purple for nullable, red for not null
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