import "./App.css";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import DroppableCell from "./droppableCell";
import { useState } from "react";
import DraggableItem from "./draggableItem";
import { EditableProTable } from "@ant-design/pro-table";
import _ from "lodash";

function DragTableBox(props) {
  const { tableData, boxData } = props;
  const [dataSource, setDataSource] = useState(tableData);
  const [hiddenItems, setHiddenItems] = useState([]);
  const [activeId, setActiveId] = useState(null);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
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
    const prevHiddenItems = _.cloneDeep(hiddenItems);
    setDataSource((prevDataSource) =>
      prevDataSource.map((item) => {
        if (item.id === record.id) {
          const coveredData = record[dataIndex];
          const coveredIndex = prevHiddenItems.indexOf(coveredData);
          if (coveredIndex !== -1) {
            prevHiddenItems.splice(coveredIndex, 1);
          }
          if (prevHiddenItems.indexOf(draggedItemId) === -1) {
            prevHiddenItems.push(draggedItemId);
          }

          return { ...item, [dataIndex]: draggedItemId };
        }
        return item;
      })
    );
    setHiddenItems(prevHiddenItems);
  };

  const handleClear = (id, dataIndex) => {
    setDataSource((prevDataSource) =>
      prevDataSource.map((item) => {
        if (item.id === id) {
          setHiddenItems((prevHiddenItems) =>
            prevHiddenItems.map((hideItem) => {
              if (hideItem !== item[dataIndex]) {
                return hideItem;
              }
            })
          );
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
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={({ active }) => setActiveId(active.id)}
    >
      <div
        style={{
          marginTop: 150,
          background: "#f5f5f5",
          position: "relative",
          display: "flex",
          flexDirection: "row",
          overflow: "auto",
        }}
      >
        <div
          style={{
            background: "#001",
            overflow: "auto",
            flex: 1,
          }}
        >
          <EditableProTable
            rowKey="id"
            columns={columns}
            value={dataSource}
            onChange={setDataSource}
            editable={{
              type: "multiple",
            }}
            recordCreatorProps={false}
            scroll={{ y: 254 }}
          />
        </div>

        <div
          style={{
            flex: 1,
            backgroundColor: "#888",
            height: 300,
            overflow: "auto",
          }}
        >
          <div
            style={{
              background: "#999",
              display: "flex",
              flexWrap: "wrap",
              overflow: "auto",
            }}
          >
            {boxData.map(
              (item, index) =>
                !hiddenItems.includes(item) && (
                  // <div
                  //   style={{
                  //     background: "#333",
                  //     padding: 2,
                  //     marginRight: 2,
                  //     height: 100,
                  //     width: 100,
                  //   }}
                  // >
                  <DraggableItem key={index} id={item}>
                    {item}
                  </DraggableItem>
                  // </div>
                )
            )}
          </div>
        </div>
      </div>
      <DragOverlay>
        {activeId ? (
          <div style={{ textAlign: "center" }}> {activeId}</div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default DragTableBox;
