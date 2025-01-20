import { useDroppable } from "@dnd-kit/core";
import { Button } from "antd";

const DroppableCell = ({ record, dataIndex, handleDrop, handleClear }) => {
  const { setNodeRef } = useDroppable({
    id: `${record.id}-${dataIndex}`,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        padding: "8px",
        border: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span>{record[dataIndex]}</span>
      {dataIndex === "age" && (
        <Button size="small" onClick={() => handleClear(record.id, dataIndex)}>
          关闭
        </Button>
      )}
    </div>
  );
};

export default DroppableCell;
