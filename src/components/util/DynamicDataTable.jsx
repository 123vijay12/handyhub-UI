import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const DynamicTable = ({
  columns,
  rows,
  title,
  onEdit,
  onDelete,
  onRowClick,
  containerHeight = "500px", // parent can override height
}) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        maxHeight: containerHeight,
        overflow: "auto", // vertical scroll
        width: "100%",
      }}
    >
      {title && (
        <Typography
          variant="h6"
          p={2}
          fontWeight="bold"
          sx={{ borderBottom: "1px solid #eee", textAlign: "center" }}
        >
          {title}
        </Typography>
      )}
      <div style={{ overflowX: "auto" }}> {/* horizontal scroll wrapper */}
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.field}
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#1f2937",
                    color: "#fff",
                    width: col.width,
                    textAlign: "center",
                  }}
                >
                  {col.headerName}
                </TableCell>
              ))}
              {(onEdit || onDelete) && (
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#1f2937",
                    color: "#fff",
                    minWidth: "120px",
                  }}
                >
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  No records found
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, index) => (
                <TableRow
                  key={index}
                  hover
                  sx={{
                    cursor: onRowClick ? "pointer" : "default",
                    "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
                    "&:hover": { backgroundColor: "#f1f1f1" },
                  }}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((col) => {
                    const rawValue = row[col.field];
                    const displayValue =
                      col.valueFormatter?.({ value: rawValue, row }) ??
                      rawValue ??
                      "-";
                    return (
                      <TableCell
                        key={col.field}
                        align="center" // center all cell text
                      >
                        {displayValue}
                      </TableCell>
                    );
                  })}
                  {(onEdit || onDelete) && (
                    <TableCell
                      align="center"
                      onClick={(e) => e.stopPropagation()} // avoid row click
                    >
                      {onEdit && (
                        <Tooltip title="Edit">
                          <IconButton color="primary" onClick={() => onEdit(row)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      {onDelete && (
                        <Tooltip title="Delete">
                          <IconButton color="error" onClick={() => onDelete(row)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </TableContainer>
  );
};

export default DynamicTable;
