import "./App.css";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import DroppableCell from "./droppableCell";
import { useState } from "react";
import DraggableItem from "./draggableItem";
import { EditableProTable } from "@ant-design/pro-table";
import _ from "lodash";
import DragTableBox from "./dragTableBox";

function App() {
  const [dataSource] = useState([
    { id: "1", name: "John Doe", age: 3231231242 },
    { id: "2", name: "Jane Smith", age: 28 },
    { id: "3", name: "Jane Smith", age: 28 },
    { id: "4", name: "Jane Smith", age: 28 },
    { id: "5", name: "Jane Smith", age: 28 },
    { id: "6", name: "Jane Smith", age: 28 },
    { id: "7", name: "Jane Smith", age: 28 },
    { id: "8", name: "Jane Smith", age: 28 },
  ]);
  const boxData = [
    "1",
    "2",
    "3341234124",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
  ];
  return <DragTableBox tableData={dataSource} boxData={boxData} />;
}

export default App;
