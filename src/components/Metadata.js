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
        fetch("https://5b38-2409-40f2-200b-6a6f-f5c2-dc87-cb25-3aea.ngrok-free.app/metadata")
            .then((response) => response)
            .then((data) => {
                data = [
                    {
                      "Album": {
                        "columns": [
                          {
                            "name": "AlbumId",
                            "type": "INTEGER",
                            "nullable": false
                          },
                          {
                            "name": "Title",
                            "type": "NVARCHAR(160)",
                            "nullable": false
                          },
                          {
                            "name": "ArtistId",
                            "type": "INTEGER",
                            "nullable": false
                          }
                        ],
                        "primary_key": [
                          "AlbumId"
                        ],
                        "foreign_keys": [
                          {
                            "constrained_columns": [
                              "ArtistId"
                            ],
                            "referred_table": "Artist",
                            "referred_columns": [
                              "ArtistId"
                            ]
                          }
                        ]
                      }
                    },
                    {
                      "Artist": {
                        "columns": [
                          {
                            "name": "ArtistId",
                            "type": "INTEGER",
                            "nullable": false
                          },
                          {
                            "name": "Name",
                            "type": "NVARCHAR(120)",
                            "nullable": true
                          }
                        ],
                        "primary_key": [
                          "ArtistId"
                        ],
                        "foreign_keys": []
                      }
                    },
                    {
                      "Customer": {
                        "columns": [
                          {
                            "name": "CustomerId",
                            "type": "INTEGER",
                            "nullable": false
                          },
                          {
                            "name": "FirstName",
                            "type": "NVARCHAR(40)",
                            "nullable": false
                          },
                          {
                            "name": "LastName",
                            "type": "NVARCHAR(20)",
                            "nullable": false
                          },
                          {
                            "name": "Company",
                            "type": "NVARCHAR(80)",
                            "nullable": true
                          },
                          {
                            "name": "Address",
                            "type": "NVARCHAR(70)",
                            "nullable": true
                          },
                          {
                            "name": "City",
                            "type": "NVARCHAR(40)",
                            "nullable": true
                          },
                          {
                            "name": "State",
                            "type": "NVARCHAR(40)",
                            "nullable": true
                          },
                          {
                            "name": "Country",
                            "type": "NVARCHAR(40)",
                            "nullable": true
                          },
                          {
                            "name": "PostalCode",
                            "type": "NVARCHAR(10)",
                            "nullable": true
                          },
                          {
                            "name": "Phone",
                            "type": "NVARCHAR(24)",
                            "nullable": true
                          },
                          {
                            "name": "Fax",
                            "type": "NVARCHAR(24)",
                            "nullable": true
                          },
                          {
                            "name": "Email",
                            "type": "NVARCHAR(60)",
                            "nullable": false
                          },
                          {
                            "name": "SupportRepId",
                            "type": "INTEGER",
                            "nullable": true
                          }
                        ],
                        "primary_key": [
                          "CustomerId"
                        ],
                        "foreign_keys": [
                          {
                            "constrained_columns": [
                              "SupportRepId"
                            ],
                            "referred_table": "Employee",
                            "referred_columns": [
                              "EmployeeId"
                            ]
                          }
                        ]
                      }
                    },
                    {
                      "Employee": {
                        "columns": [
                          {
                            "name": "EmployeeId",
                            "type": "INTEGER",
                            "nullable": false
                          },
                          {
                            "name": "LastName",
                            "type": "NVARCHAR(20)",
                            "nullable": false
                          },
                          {
                            "name": "FirstName",
                            "type": "NVARCHAR(20)",
                            "nullable": false
                          },
                          {
                            "name": "Title",
                            "type": "NVARCHAR(30)",
                            "nullable": true
                          },
                          {
                            "name": "ReportsTo",
                            "type": "INTEGER",
                            "nullable": true
                          },
                          {
                            "name": "BirthDate",
                            "type": "DATETIME",
                            "nullable": true
                          },
                          {
                            "name": "HireDate",
                            "type": "DATETIME",
                            "nullable": true
                          },
                          {
                            "name": "Address",
                            "type": "NVARCHAR(70)",
                            "nullable": true
                          },
                          {
                            "name": "City",
                            "type": "NVARCHAR(40)",
                            "nullable": true
                          },
                          {
                            "name": "State",
                            "type": "NVARCHAR(40)",
                            "nullable": true
                          },
                          {
                            "name": "Country",
                            "type": "NVARCHAR(40)",
                            "nullable": true
                          },
                          {
                            "name": "PostalCode",
                            "type": "NVARCHAR(10)",
                            "nullable": true
                          },
                          {
                            "name": "Phone",
                            "type": "NVARCHAR(24)",
                            "nullable": true
                          },
                          {
                            "name": "Fax",
                            "type": "NVARCHAR(24)",
                            "nullable": true
                          },
                          {
                            "name": "Email",
                            "type": "NVARCHAR(60)",
                            "nullable": true
                          }
                        ],
                        "primary_key": [
                          "EmployeeId"
                        ],
                        "foreign_keys": [
                          {
                            "constrained_columns": [
                              "ReportsTo"
                            ],
                            "referred_table": "Employee",
                            "referred_columns": [
                              "EmployeeId"
                            ]
                          }
                        ]
                      }
                    },
                    {
                      "Genre": {
                        "columns": [
                          {
                            "name": "GenreId",
                            "type": "INTEGER",
                            "nullable": false
                          },
                          {
                            "name": "Name",
                            "type": "NVARCHAR(120)",
                            "nullable": true
                          }
                        ],
                        "primary_key": [
                          "GenreId"
                        ],
                        "foreign_keys": []
                      }
                    },
                    {
                      "Invoice": {
                        "columns": [
                          {
                            "name": "InvoiceId",
                            "type": "INTEGER",
                            "nullable": false
                          },
                          {
                            "name": "CustomerId",
                            "type": "INTEGER",
                            "nullable": false
                          },
                          {
                            "name": "InvoiceDate",
                            "type": "DATETIME",
                            "nullable": false
                          },
                          {
                            "name": "BillingAddress",
                            "type": "NVARCHAR(70)",
                            "nullable": true
                          },
                          {
                            "name": "BillingCity",
                            "type": "NVARCHAR(40)",
                            "nullable": true
                          },
                          {
                            "name": "BillingState",
                            "type": "NVARCHAR(40)",
                            "nullable": true
                          },
                          {
                            "name": "BillingCountry",
                            "type": "NVARCHAR(40)",
                            "nullable": true
                          },
                          {
                            "name": "BillingPostalCode",
                            "type": "NVARCHAR(10)",
                            "nullable": true
                          },
                          {
                            "name": "Total",
                            "type": "NUMERIC(10, 2)",
                            "nullable": false
                          }
                        ],
                        "primary_key": [
                          "InvoiceId"
                        ],
                        "foreign_keys": [
                          {
                            "constrained_columns": [
                              "CustomerId"
                            ],
                            "referred_table": "Customer",
                            "referred_columns": [
                              "CustomerId"
                            ]
                          }
                        ]
                      }
                    },
                    {
                      "InvoiceLine": {
                        "columns": [
                          {
                            "name": "InvoiceLineId",
                            "type": "INTEGER",
                            "nullable": false
                          },
                          {
                            "name": "InvoiceId",
                            "type": "INTEGER",
                            "nullable": false
                          },
                          {
                            "name": "TrackId",
                            "type": "INTEGER",
                            "nullable": false
                          },
                          {
                            "name": "UnitPrice",
                            "type": "NUMERIC(10, 2)",
                            "nullable": false
                          },
                          {
                            "name": "Quantity",
                            "type": "INTEGER",
                            "nullable": false
                          }
                        ],
                        "primary_key": [
                          "InvoiceLineId"
                        ],
                        "foreign_keys": [
                          {
                            "constrained_columns": [
                              "TrackId"
                            ],
                            "referred_table": "Track",
                            "referred_columns": [
                              "TrackId"
                            ]
                          },
                          {
                            "constrained_columns": [
                              "InvoiceId"
                            ],
                            "referred_table": "Invoice",
                            "referred_columns": [
                              "InvoiceId"
                            ]
                          }
                        ]
                      }
                    },
                    {
                      "MediaType": {
                        "columns": [
                          {
                            "name": "MediaTypeId",
                            "type": "INTEGER",
                            "nullable": false
                          },
                          {
                            "name": "Name",
                            "type": "NVARCHAR(120)",
                            "nullable": true
                          }
                        ],
                        "primary_key": [
                          "MediaTypeId"
                        ],
                        "foreign_keys": []
                      }
                    },
                    {
                      "Playlist": {
                        "columns": [
                          {
                            "name": "PlaylistId",
                            "type": "INTEGER",
                            "nullable": false
                          },
                          {
                            "name": "Name",
                            "type": "NVARCHAR(120)",
                            "nullable": true
                          }
                        ],
                        "primary_key": [
                          "PlaylistId"
                        ],
                        "foreign_keys": []
                      }
                    },
                    {
                      "PlaylistTrack": {
                        "columns": [
                          {
                            "name": "PlaylistId",
                            "type": "INTEGER",
                            "nullable": false
                          },
                          {
                            "name": "TrackId",
                            "type": "INTEGER",
                            "nullable": false
                          }
                        ],
                        "primary_key": [
                          "PlaylistId",
                          "TrackId"
                        ],
                        "foreign_keys": [
                          {
                            "constrained_columns": [
                              "TrackId"
                            ],
                            "referred_table": "Track",
                            "referred_columns": [
                              "TrackId"
                            ]
                          },
                          {
                            "constrained_columns": [
                              "PlaylistId"
                            ],
                            "referred_table": "Playlist",
                            "referred_columns": [
                              "PlaylistId"
                            ]
                          }
                        ]
                      }
                    },
                    {
                      "Track": {
                        "columns": [
                          {
                            "name": "TrackId",
                            "type": "INTEGER",
                            "nullable": false
                          },
                          {
                            "name": "Name",
                            "type": "NVARCHAR(200)",
                            "nullable": false
                          },
                          {
                            "name": "AlbumId",
                            "type": "INTEGER",
                            "nullable": true
                          },
                          {
                            "name": "MediaTypeId",
                            "type": "INTEGER",
                            "nullable": false
                          },
                          {
                            "name": "GenreId",
                            "type": "INTEGER",
                            "nullable": true
                          },
                          {
                            "name": "Composer",
                            "type": "NVARCHAR(220)",
                            "nullable": true
                          },
                          {
                            "name": "Milliseconds",
                            "type": "INTEGER",
                            "nullable": false
                          },
                          {
                            "name": "Bytes",
                            "type": "INTEGER",
                            "nullable": true
                          },
                          {
                            "name": "UnitPrice",
                            "type": "NUMERIC(10, 2)",
                            "nullable": false
                          }
                        ],
                        "primary_key": [
                          "TrackId"
                        ],
                        "foreign_keys": [
                          {
                            "constrained_columns": [
                              "MediaTypeId"
                            ],
                            "referred_table": "MediaType",
                            "referred_columns": [
                              "MediaTypeId"
                            ]
                          },
                          {
                            "constrained_columns": [
                              "GenreId"
                            ],
                            "referred_table": "Genre",
                            "referred_columns": [
                              "GenreId"
                            ]
                          },
                          {
                            "constrained_columns": [
                              "AlbumId"
                            ],
                            "referred_table": "Album",
                            "referred_columns": [
                              "AlbumId"
                            ]
                          }
                        ]
                      }
                    }
                  ]
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
                        style: { stroke: "#B794F4", strokeWidth: 5 },
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