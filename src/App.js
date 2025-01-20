import logo from "./logo.svg";
import "./App.css";
import { DndContext } from "@dnd-kit/core";
import Draggable from "./draggableItem";
import Droppable from "./droppableCell";
import DroppableCell from "./droppableCell";
import { useState } from "react";
import DraggableItem from "./draggableItem";
import { EditableProTable } from "@ant-design/pro-table";

function App() {
  const [dataSource, setDataSource] = useState([
    { id: "1", name: "John Doe", age: 32 },
    { id: "2", name: "Jane Smith", age: 28 },
  ]);
  const [hiddenItems, setHiddenItems] = useState([]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (_, record) => (
        <DroppableCell
          record={record}
          dataIndex="name"
          handleDrop={handleDrop}
          handleClear={handleClear}
        />
      ),
    },
    {
      title: "Age",
      dataIndex: "age",
      render: (_, record) => (
        <DroppableCell
          record={record}
          dataIndex="age"
          handleDrop={handleDrop}
          handleClear={handleClear}
        />
      ),
    },
  ];

  const handleDrop = (record, dataIndex, draggedItemId) => {
    setDataSource((prevDataSource) =>
      prevDataSource.map((item) => {
        if (item.id === record.id) {
          return { ...item, [dataIndex]: draggedItemId };
        }
        return item;
      })
    );
    setHiddenItems((prevHiddenItems) => [...prevHiddenItems, draggedItemId]);
  };

  const handleClear = (id, dataIndex) => {
    setDataSource((prevDataSource) =>
      prevDataSource.map((item) => {
        if (item.id === id) {
          return { ...item, [dataIndex]: null };
        }
        return item;
      })
    );
  };

  const handleDragEnd = (event) => {
    const { over, active } = event;
    if (over) {
      const [recordId, dataIndex] = over.id.split("-");
      handleDrop(
        dataSource.find((item) => item.id === recordId),
        dataIndex,
        active.id
      );
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        {["Draggable Item 1", "Draggable Item 2"].map(
          (item, index) =>
            !hiddenItems.includes(item) && (
              <DraggableItem key={index} id={item}>
                {item}
              </DraggableItem>
            )
        )}
      </div>
      <EditableProTable
        rowKey="id"
        headerTitle="EditableProTable with Drag and Drop"
        columns={columns}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: "multiple",
        }}
      />
    </DndContext>
  );
}

export default App;
